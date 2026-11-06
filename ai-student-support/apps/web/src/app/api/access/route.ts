import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { createRateLimiter, sameOrigin } from "@/lib/community-intake";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessToken, codeMatches, configuredCode, safeNext } from "@/lib/site-access";

// Ten tries per address every 15 minutes is plenty for a student and slows guessing.
const allow = createRateLimiter(10, 15 * 60 * 1000);

export async function POST(req: Request) {
  if (!SITE.private) return new NextResponse(null, { status: 404 });

  const back = (error: string, next: string) => {
    const to = new URL("/access", req.url);
    to.searchParams.set("error", error);
    if (next !== "/") to.searchParams.set("next", next);
    return NextResponse.redirect(to, 303);
  };

  if (!sameOrigin(req.headers.get("origin"), req.headers.get("host"))) return back("wrong", "/");

  const form = await req.formData().catch(() => null);
  const input = String(form?.get("code") ?? "");
  const next = safeNext(String(form?.get("next") ?? "/"));

  const code = configuredCode();
  if (!code) return back("closed", next);

  // Used only as an in-memory rate-limit key; never stored or logged.
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (!allow(ip)) return back("busy", next);

  if (!(await codeMatches(input, code))) return back("wrong", next);

  const response = NextResponse.redirect(new URL(next, req.url), 303);
  response.cookies.set(ACCESS_COOKIE, await accessToken(code), {
    httpOnly: true,
    secure: new URL(req.url).protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  return response;
}
