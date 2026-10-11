import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { readPlay } from "../apps/web/src/lib/plays";
import {
  EAT_LIMITS,
  EAT_MECHANISMS,
  EAT_PEARL_CSV_HEADER,
  EAT_REVIEW_QUESTIONS,
  EAT_SOURCE_KINDS,
} from "../apps/web/src/lib/eat-format";

// Two checks, run with `pnpm check:eat`:
//  1. The Plays that produce EAT content carry the pinned format.
//  2. With EAT_REPO=/path/to/eat-tracker, the pinned format still matches EAT's
//     source. Run this whenever EAT's pearl format may have changed.

const CONTENT_DIR = path.join(__dirname, "..", "content", "plays");

function prompt(slug: string): string {
  const r = readPlay(CONTENT_DIR, slug);
  assert(r.ok, `${slug} failed to load: ${r.ok ? "" : r.errors.join("; ")}`);
  return r.play.prompt;
}

// 1. The Plays carry the pinned format.
const drafter = prompt("pearl-drafter");
assert(drafter.includes(EAT_PEARL_CSV_HEADER), "pearl-drafter: CSV header missing or altered");
for (const m of EAT_MECHANISMS) assert(drafter.includes(m.id), `pearl-drafter: mechanism ${m.id} missing`);
for (const k of EAT_SOURCE_KINDS) assert(drafter.includes(k), `pearl-drafter: source kind ${k} missing`);
assert(/ai_assisted is always true/.test(drafter), "pearl-drafter: must set ai_assisted to true");

const check = prompt("pearl-check");
EAT_REVIEW_QUESTIONS.forEach((q, i) =>
  assert(check.includes(`${i + 1}. ${q}`), `pearl-check: reviewer question ${i + 1} missing or altered`)
);

const writer = prompt("exam-item-writer");
const L = EAT_LIMITS;
for (const n of [L.stem.max, L.option.max, L.explanation.max, L.transferItems.max])
  assert(writer.includes(String(n)), `exam-item-writer: EAT limit ${n} missing`);

console.log("OK: pearl Plays carry the pinned EAT format");

// 2. The pinned format matches EAT's source.
const eatRepo = process.env.EAT_REPO;
if (!eatRepo) {
  console.log("Skipped comparison with EAT's source (set EAT_REPO=/path/to/eat-tracker to run it).");
  process.exit(0);
}

const read = (rel: string) => fs.readFileSync(path.join(eatRepo, rel), "utf8");
const domain = read("lib/pearls/domain.ts");
const review = read("lib/pearls/review.ts");
const problems: string[] = [];
const same = (what: string, pinned: unknown, actual: unknown) => {
  if (JSON.stringify(pinned) !== JSON.stringify(actual))
    problems.push(`${what}\n    pinned: ${JSON.stringify(pinned)}\n    EAT:    ${JSON.stringify(actual)}`);
};

const header = domain.match(/CSV_TEMPLATE\s*=\s*\n?\s*"([^"\\]*)\\n"/)?.[1];
same("CSV header (lib/pearls/domain.ts CSV_TEMPLATE)", EAT_PEARL_CSV_HEADER, header);

const list = (name: string) =>
  [...(domain.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]*)\\]`))?.[1] ?? "").matchAll(/"([A-Z_]+)"/g)].map(
    (m) => m[1]
  );
same("PEARL_MECHANISMS", EAT_MECHANISMS.map((m) => m.id), list("PEARL_MECHANISMS"));
same("SOURCE_KINDS", [...EAT_SOURCE_KINDS], list("SOURCE_KINDS"));

const constant = (name: string) => Number(domain.match(new RegExp(`${name}\\s*=\\s*(\\d+)`))?.[1]);
same("MAX_TRANSFER_ITEMS", L.transferItems.max, constant("MAX_TRANSFER_ITEMS"));
same("MAX_REVIEW_HORIZON_DAYS", L.reviewHorizonDays, constant("MAX_REVIEW_HORIZON_DAYS"));

// String fields: `name: z.string().trim()[.min(N, ...)].max(M)`, possibly across lines.
const stringLimits = (field: string) => {
  const m = domain.match(
    new RegExp(`\\b${field}:\\s*z\\s*\\.string\\(\\)\\s*\\.trim\\(\\)\\s*(?:\\.min\\(\\s*(\\d+)[^)]*\\)\\s*)?\\.max\\((\\d+)\\)`)
  );
  if (!m) return null;
  return m[1] === undefined ? { max: Number(m[2]) } : { min: Number(m[1]), max: Number(m[2]) };
};
for (const f of ["topic", "takeaway", "why", "appliesWhen", "limitations", "citation", "stem", "explanation"] as const)
  same(`${f} limits`, EAT_LIMITS[f], stringLimits(f));

const options = domain.match(/options:\s*z\.array\(z\.string\(\)\.trim\(\)\.min\(1\)\.max\((\d+)\)\)\.min\((\d+)\)\.max\((\d+)\)/);
same("option limits", { option: L.option.max, ...L.optionCount }, options && {
  option: Number(options[1]),
  min: Number(options[2]),
  max: Number(options[3]),
});

const questions: string[] = [...review.matchAll(/question:\s*"((?:[^"\\]|\\.)*)"/g)].map((m) =>
  JSON.parse(`"${m[1]}"`)
);
same("number of reviewer questions (lib/pearls/review.ts)", EAT_REVIEW_QUESTIONS.length, questions.length);
EAT_REVIEW_QUESTIONS.forEach((q, i) => {
  if (questions[i] !== undefined) same(`reviewer question ${i + 1} (lib/pearls/review.ts)`, q, questions[i]);
});

if (problems.length) {
  console.error(`EAT's pearl format has changed. Update apps/web/src/lib/eat-format.ts:\n\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`OK: pinned format matches EAT at ${eatRepo}`);
