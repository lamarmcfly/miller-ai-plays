// Shared request handling for the two anonymous intake routes.

import { NextResponse } from "next/server";
import type { z } from "zod";
import { createRateLimiter, findIdentifiers, identifierMessage, sameOrigin } from "./community-intake";
import { insertRow } from "./supabase-rest";

const MAX_BODY_BYTES = 20_000;

export function createIntakeHandler<S extends z.ZodType>(opts: {
  schema: S;
  table: string;
  limit: number;
  windowMs: number;
  /** Fields scanned for identifiers before storing. */
  freeText: (input: z.infer<S>) => (string | undefined)[];
  toRow: (input: z.infer<S>) => Record<string, unknown>;
}) {
  const allow = createRateLimiter(opts.limit, opts.windowMs);

  return async function POST(req: Request) {
    const fail = (status: number, error: string, message: string) =>
      NextResponse.json({ ok: false, error, message }, { status });

    if (!sameOrigin(req.headers.get("origin"), req.headers.get("host"))) {
      return fail(403, "forbidden", "This request was not allowed.");
    }
    const length = Number(req.headers.get("content-length") ?? 0);
    if (length > MAX_BODY_BYTES) return fail(413, "too_large", "That is too long. Please shorten it.");

    // Used only as an in-memory rate-limit key; never stored or logged.
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    if (!allow(ip)) return fail(429, "rate_limited", "Too many submissions. Please try again later.");

    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return fail(400, "invalid", "That did not look right. Please check the form and try again.");
    }
    const parsed = opts.schema.safeParse(json);
    if (!parsed.success) return fail(400, "invalid", "Please complete every required field and try again.");

    const found = findIdentifiers(...opts.freeText(parsed.data));
    if (found.length) return fail(422, "identifiers", identifierMessage(found));

    const result = await insertRow(opts.table, opts.toRow(parsed.data));
    if (result === "not_configured") return fail(503, "not_configured", "Sharing is not set up yet.");
    if (result === "error") return fail(502, "storage", "We could not save that. Please try again in a moment.");
    return NextResponse.json({ ok: true });
  };
}
