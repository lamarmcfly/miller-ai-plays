// A private site (Miller AI Plays) is for its own students only. Its
// deployment sets SITE_ACCESS_CODE (server only, never NEXT_PUBLIC_). A student
// enters the code once per device and a cookie remembers it. Changing the code
// signs everyone out. src/proxy.ts applies this to every page and API route.
//
// This keeps the site within the group; it is not a substitute for school
// sign-in. See SITES.md for when to move to that.

import { SITE } from "./site";

export const ACCESS_COOKIE = "site_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 180; // about one semester
/** Short codes are easy to guess, so a shorter one counts as "not set up". */
export const MIN_CODE_LENGTH = 12;

/** Case and spacing do not matter when a student types the code. */
export function normalizeCode(code: string): string {
  return code.trim().toLowerCase().replace(/\s+/g, " ");
}

/** The configured code, or null if it is missing or too short. */
export function configuredCode(raw: string | undefined = process.env.SITE_ACCESS_CODE): string | null {
  const code = raw ? normalizeCode(raw) : "";
  return code.length >= MIN_CODE_LENGTH ? code : null;
}

async function hmacHex(key: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(message)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
}

function equalInConstantTime(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** The cookie value for a code. Only someone who knows the code can make it. */
export function accessToken(code: string): Promise<string> {
  return hmacHex(normalizeCode(code), `${SITE.id}-ai-plays access v1`);
}

/** Whether what a student typed matches the configured code. */
export async function codeMatches(input: string, code: string | null = configuredCode()): Promise<boolean> {
  if (!code || !input.trim()) return false;
  return equalInConstantTime(await accessToken(input), await accessToken(code));
}

/** Whether a cookie value grants access. A public site always does. */
export async function tokenGrantsAccess(
  token: string | undefined,
  opts: { isPrivate?: boolean; code?: string | null } = {}
): Promise<boolean> {
  const isPrivate = opts.isPrivate ?? SITE.private;
  if (!isPrivate) return true;
  const code = opts.code === undefined ? configuredCode() : opts.code;
  if (!code || !token) return false;
  return equalInConstantTime(token, await accessToken(code));
}

/** Read one cookie from a raw Cookie header. */
export function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

/** For API routes: does this request carry access? (Defense in depth behind src/proxy.ts.) */
export function requestHasAccess(req: Request): Promise<boolean> {
  return tokenGrantsAccess(readCookie(req.headers.get("cookie"), ACCESS_COOKIE));
}

/** Only same-site paths may be used as the after-sign-in destination. */
export function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/";
  if (next.startsWith("/access") || next.startsWith("/api/")) return "/";
  return next;
}
