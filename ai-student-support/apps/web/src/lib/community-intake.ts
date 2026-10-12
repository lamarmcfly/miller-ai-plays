// Validation for anonymous Community Board submissions and feedback. Pure
// functions, no React or network, so scripts/check-community.ts can test them
// and the API routes stay thin. Nothing here stores or logs what students write.

import { z } from "zod";

export const COHORTS = ["MS1", "MS2", "MS3", "MS4"] as const;
export const CATEGORIES = ["prompt", "question", "workflow-tip"] as const;
export const EXAM_CONTEXTS = ["Step 1", "Step 2 CK", "Step 3", "COMLEX", "Shelf", "OSCE", "Clerkship", "Coursework"] as const;
export const TOOLS = ["Claude", "ChatGPT", "Gemini", "Copilot", "NotebookLM", "Other"] as const;
export const FEEDBACK_RESULTS = ["worked", "partly", "didnt"] as const;

/** Submissions faster than this after the form opened are treated as bots. */
export const MIN_FILL_MS = 4000;

const text = (min: number, max: number) => z.string().trim().min(min).max(max);

export const submissionSchema = z.object({
  cohort: z.enum(COHORTS),
  category: z.enum(CATEGORIES),
  examContext: z.array(z.enum(EXAM_CONTEXTS)).min(1).max(EXAM_CONTEXTS.length),
  title: text(3, 120),
  tool: z.enum(TOOLS),
  prompt: text(10, 6000),
  outcome: text(0, 3000).optional(),
  usefulness: z.number().int().min(1).max(5).optional(),
  confirm: z.literal(true),
  /** Honeypot: real students never see or fill this. */
  website: z.string().max(0).optional(),
  /** Milliseconds between the form opening and submitting. */
  elapsedMs: z.number().min(MIN_FILL_MS).max(1000 * 60 * 60 * 24),
});
export type SubmissionInput = z.infer<typeof submissionSchema>;

export const feedbackSchema = z.object({
  kind: z.enum(["play", "post"]),
  targetId: z.string().regex(/^[a-z0-9][a-z0-9-]{0,79}$/),
  result: z.enum(FEEDBACK_RESULTS),
  note: text(0, 500).optional(),
  website: z.string().max(0).optional(),
});
export type FeedbackInput = z.infer<typeof feedbackSchema>;

// Obvious identifiers only. This is a safety net before human review, not a
// guarantee, and it never echoes what it matched.
const identifierPatterns: [string, RegExp][] = [
  ["an email address", /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i],
  ["a phone number", /(?<!\d)(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}(?!\d)/],
  ["a Social Security number", /(?<!\d)\d{3}-\d{2}-\d{4}(?!\d)/],
  ["a medical record number", /\b(?:MRN|medical record(?: number| no\.?)?)\b[\s:#-]*\w*\d{4,}/i],
  ["a date of birth", /\b(?:DOB|date of birth|born on)\b/i],
  ["a full date", /(?<!\d)(?:0?[1-9]|1[0-2])[/-](?:0?[1-9]|[12]\d|3[01])[/-](?:19|20)?\d{2}(?!\d)/],
];

/** Returns a plain-language description of each kind of identifier found. */
export function findIdentifiers(...fields: (string | undefined)[]): string[] {
  const joined = fields.filter(Boolean).join("\n");
  return identifierPatterns.filter(([, re]) => re.test(joined)).map(([label]) => label);
}

export function identifierMessage(found: string[]): string {
  return `Your text seems to include ${found.join(" and ")}. Remove anything that could identify a patient or a person, then submit again.`;
}

/** Sliding-window limiter. In-memory, so it is best-effort across serverless instances. */
export function createRateLimiter(limit: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, number[]>();
  return function allow(key: string): boolean {
    const t = now();
    const recent = (hits.get(key) ?? []).filter((x) => t - x < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(t);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.every((x) => t - x >= windowMs)) hits.delete(k);
    }
    return true;
  };
}

/** Reject cross-site posts. A missing Origin (same-origin fetch from older clients) is allowed. */
export function sameOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return true;
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}
