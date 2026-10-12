import assert from "node:assert/strict";
import {
  createRateLimiter,
  feedbackSchema,
  findIdentifiers,
  MIN_FILL_MS,
  sameOrigin,
  submissionSchema,
} from "../apps/web/src/lib/community-intake";
import { createIntakeHandler } from "../apps/web/src/lib/intake-route";

const valid = {
  cohort: "MS3",
  category: "prompt",
  examContext: ["Shelf"],
  title: "Quiz me from my notes",
  tool: "Claude",
  prompt: "Ask me one question at a time using only my notes.",
  outcome: "It caught two gaps.",
  usefulness: 4,
  confirm: true,
  website: "",
  elapsedMs: 30000,
};

// submissions: valid passes; each rule rejects
assert.ok(submissionSchema.safeParse(valid).success);
assert.ok(!submissionSchema.safeParse({ ...valid, confirm: false }).success, "must confirm no identifiers");
assert.ok(!submissionSchema.safeParse({ ...valid, website: "http://spam.example" }).success, "honeypot");
assert.ok(!submissionSchema.safeParse({ ...valid, elapsedMs: MIN_FILL_MS - 1 }).success, "too fast");
assert.ok(!submissionSchema.safeParse({ ...valid, examContext: [] }).success);
assert.ok(!submissionSchema.safeParse({ ...valid, tool: "Skynet" }).success);
assert.ok(!submissionSchema.safeParse({ ...valid, prompt: "x".repeat(6001) }).success);
assert.ok(!submissionSchema.safeParse({ ...valid, usefulness: 6 }).success);
assert.ok(!submissionSchema.safeParse({ ...valid, cohort: "Faculty" }).success);
assert.ok(submissionSchema.safeParse({ ...valid, outcome: "", usefulness: undefined }).success);

// feedback
const fb = { kind: "play", targetId: "error-engine", result: "worked" };
assert.ok(feedbackSchema.safeParse(fb).success);
assert.ok(feedbackSchema.safeParse({ ...fb, kind: "post", targetId: "community-001", note: "Helped." }).success);
assert.ok(!feedbackSchema.safeParse({ ...fb, targetId: "../etc/passwd" }).success);
assert.ok(!feedbackSchema.safeParse({ ...fb, result: "great" }).success);
assert.ok(!feedbackSchema.safeParse({ ...fb, note: "x".repeat(501) }).success);
assert.ok(!feedbackSchema.safeParse({ ...fb, website: "bot" }).success);

// identifier scan: catches the obvious, leaves ordinary clinical text alone
for (const bad of [
  "email me at student@example.com",
  "call 305-555-0142",
  "SSN 123-45-6789",
  "MRN: 00123456",
  "pt DOB is known",
  "seen on 3/14/2025",
]) assert.ok(findIdentifiers(bad).length > 0, `should flag: ${bad}`);
for (const fine of [
  "A 54-year-old man with chest pain, BP 130/90, HR 110.",
  "Give me 10 questions about heart failure at the Step 2 level.",
  "Review of systems: 1/2 pack per day for 20 years.",
]) assert.deepEqual(findIdentifiers(fine), [], `should not flag: ${fine}`);
const echoed = findIdentifiers("student@example.com");
assert.ok(!JSON.stringify(echoed).includes("student@example.com"), "matches are never echoed");

// rate limiter
let clock = 0;
const allow = createRateLimiter(2, 1000, () => clock);
assert.ok(allow("a") && allow("a") && !allow("a") && allow("b"));
clock = 1500;
assert.ok(allow("a"), "window slides");

// same-origin
assert.ok(sameOrigin(null, "site.example"));
assert.ok(sameOrigin("https://site.example", "site.example"));
assert.ok(!sameOrigin("https://evil.example", "site.example"));
assert.ok(!sameOrigin("not a url", "site.example"));

// route handler end to end with a stubbed Supabase
async function run() {
  const post = (body: unknown, headers: Record<string, string> = {}) =>
    new Request("https://site.example/api/community/submit", {
      method: "POST",
      headers: { "content-type": "application/json", host: "site.example", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  const make = (limit = 100) =>
    createIntakeHandler({
      schema: submissionSchema,
      table: "community_submissions",
      limit,
      windowMs: 60000,
      freeText: (s) => [s.title, s.prompt, s.outcome],
      toRow: (s) => ({ title: s.title, tool: s.tool }),
    });
  const status = async (res: Response) => ((await res.json()) as { error?: string }).error ?? "ok";

  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  assert.equal((await make()(post(valid))).status, 503, "not configured until Supabase env is set");

  process.env.SUPABASE_URL = "https://project.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";
  const realFetch = globalThis.fetch;
  const calls: { url: string; body: string; headers: Record<string, string> }[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: String(init.body), headers: init.headers as Record<string, string> });
    return new Response(null, { status: 201 });
  }) as typeof fetch;

  try {
    const handler = make();
    const ok = await handler(post(valid));
    assert.equal(ok.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://project.supabase.co/rest/v1/community_submissions");
    assert.deepEqual(JSON.parse(calls[0].body), { title: valid.title, tool: valid.tool }, "only mapped fields are stored");

    assert.equal(await status(await handler(post({ ...valid, prompt: "Email me student@example.com please" }))), "identifiers");
    assert.equal(await status(await handler(post({ ...valid, website: "bot" }))), "invalid");
    assert.equal(await status(await handler(post("{not json"))), "invalid");
    assert.equal((await handler(post(valid, { origin: "https://evil.example" }))).status, 403);
    assert.equal(calls.length, 1, "rejected requests never reach storage");

    const limited = make(1);
    assert.equal((await limited(post(valid, { "x-forwarded-for": "9.9.9.9" }))).status, 200);
    assert.equal((await limited(post(valid, { "x-forwarded-for": "9.9.9.9" }))).status, 429);

    globalThis.fetch = (async () => new Response(null, { status: 500 })) as typeof fetch;
    assert.equal((await make()(post(valid))).status, 502, "storage failure is reported, not hidden");
  } finally {
    globalThis.fetch = realFetch;
  }
}

run().then(() => console.log("Community intake checks passed."));
