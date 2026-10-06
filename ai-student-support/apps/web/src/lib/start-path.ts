// Recommendation logic for the Start Here page. Pure functions, no React, so
// scripts/check-start-path.ts can verify every answer combination.

export type GoalId =
  | "coursework"
  | "practical"
  | "step1"
  | "step2"
  | "step3"
  | "shelf"
  | "osce"
  | "wards"
  | "residency";

export type ExperienceId = "new" | "some" | "comfortable";

export type NeedId = "memorize" | "missing" | "plan" | "understand" | "reasoning" | "time";

export const goals: { id: GoalId; label: string; blurb: string }[] = [
  { id: "coursework", label: "Course exams", blurb: "Block or system exams in pre-clerkship" },
  { id: "practical", label: "Anatomy or lab practical", blurb: "Identify structures and slides" },
  { id: "step1", label: "Step 1 / COMLEX Level 1", blurb: "Basic science licensing exam" },
  { id: "step2", label: "Step 2 CK / COMLEX Level 2", blurb: "Clinical knowledge licensing exam" },
  { id: "step3", label: "Step 3 / COMLEX Level 3", blurb: "Final licensing exam" },
  { id: "shelf", label: "Shelf exams", blurb: "End-of-clerkship subject exams" },
  { id: "osce", label: "OSCEs and clinical skills", blurb: "Standardized patient encounters" },
  { id: "wards", label: "Surviving the wards", blurb: "Rounds, notes, presentations" },
  { id: "residency", label: "Residency applications", blurb: "Statement, experiences, interviews" },
];

export const experiences: { id: ExperienceId; label: string; blurb: string }[] = [
  { id: "new", label: "Brand new", blurb: "I haven't used AI for studying" },
  { id: "some", label: "I've dabbled", blurb: "I ask questions but have no real workflow" },
  { id: "comfortable", label: "Comfortable", blurb: "I use AI often and want better workflows" },
];

export const needs: { id: NeedId; label: string }[] = [
  { id: "memorize", label: "Too much to memorize" },
  { id: "missing", label: "Missing questions and not sure why" },
  { id: "plan", label: "I need a plan and a schedule" },
  { id: "understand", label: "Concepts won't stick" },
  { id: "reasoning", label: "Clinical reasoning and differentials" },
  { id: "time", label: "Not enough time" },
];

// Higher weight = earlier in the path.
const goalPlays: Record<GoalId, Record<string, number>> = {
  coursework: { "lecture-compressor": 6, "concept-coach": 5, "custom-practice-questions": 4, "spaced-review-planner": 3 },
  practical: { "image-and-diagram-quiz": 6, "lecture-compressor": 4, "spaced-review-planner": 3, "concept-coach": 2 },
  step1: { "error-engine": 6, "custom-practice-questions": 5, "deficit-tracker": 4, "exam-countdown-planner": 4, "spaced-review-planner": 3 },
  step2: { "error-engine": 6, "custom-practice-questions": 5, "deficit-tracker": 4, "exam-countdown-planner": 4, "shelf-review-notebook": 3 },
  step3: { "custom-practice-questions": 6, "differential-drills": 5, "biostats-translator": 4, "error-engine": 4, "exam-countdown-planner": 3 },
  shelf: { "shelf-review-notebook": 6, "custom-practice-questions": 5, "error-engine": 4, "differential-drills": 3 },
  osce: { "osce-encounter-sim": 6, "case-presentation-coach": 5, "differential-drills": 4 },
  wards: { "rounds-prep": 6, "case-presentation-coach": 5, "clinical-note": 4, "research-speed-read": 2 },
  residency: { "residency-application-coach": 6, "case-presentation-coach": 2, "research-speed-read": 1 },
};

const needPlays: Record<NeedId, Record<string, number>> = {
  memorize: { "lecture-compressor": 4, "spaced-review-planner": 3 },
  missing: { "error-engine": 4, "deficit-tracker": 3 },
  plan: { "exam-countdown-planner": 4, "spaced-review-planner": 2 },
  understand: { "concept-coach": 4 },
  reasoning: { "differential-drills": 4, "case-presentation-coach": 2 },
  time: { "rounds-prep": 2, "clinical-note": 2, "lecture-compressor": 1 },
};

const reasons: Record<string, string> = {
  "first-ai-session": "A 3-minute first session so everything else clicks.",
  "verify-the-ai": "AI is sometimes confidently wrong. This routine keeps mistakes from becoming memorized facts.",
  "lecture-compressor": "Turns lecture material into flashcards fast.",
  "concept-coach": "A Socratic tutor for the concepts that won't stick.",
  "custom-practice-questions": "Original, exam-style practice questions written for your exam and weak spots.",
  "spaced-review-planner": "Builds a spaced review calendar so material comes back before you forget it.",
  "image-and-diagram-quiz": "Quizzes you on structures and relationships using your own diagrams and notes.",
  "error-engine": "Turns every wrong answer into a diagnosis and one next step.",
  "deficit-tracker": "Finds the weak spots hiding across weeks of practice scores.",
  "exam-countdown-planner": "Plans backward from your exam date and re-plans when you fall behind.",
  "shelf-review-notebook": "A shelf-ready study notebook that answers from your own sources.",
  "differential-drills": "Practice ranking a differential and choosing next steps on fresh vignettes.",
  "biostats-translator": "Biostatistics and study design worked through with your own numbers.",
  "osce-encounter-sim": "Run a realistic standardized-patient encounter and get scored on it.",
  "case-presentation-coach": "Rehearse oral presentations and get feedback on structure and reasoning.",
  "rounds-prep": "Walk onto rounds knowing what you'll be asked.",
  "clinical-note": "Draft notes faster, then verify and edit them.",
  "research-speed-read": "Decide in two minutes whether a paper is worth your time.",
  "residency-application-coach": "Feedback on your own writing and interview practice, never ghostwriting.",
};

export function reasonFor(slug: string): string {
  return reasons[slug] ?? "";
}

export function allReferencedSlugs(): string[] {
  const set = new Set<string>(["first-ai-session", "verify-the-ai"]);
  for (const g of Object.values(goalPlays)) Object.keys(g).forEach((s) => set.add(s));
  for (const n of Object.values(needPlays)) Object.keys(n).forEach((s) => set.add(s));
  return [...set];
}

const builderExam: Partial<Record<GoalId, { exam: string; phase: "1" | "2" | "3" }>> = {
  coursework: { exam: "coursework", phase: "1" },
  practical: { exam: "practical", phase: "1" },
  step1: { exam: "step1", phase: "1" },
  step2: { exam: "step2ck", phase: "2" },
  step3: { exam: "step3", phase: "3" },
  shelf: { exam: "shelf", phase: "2" },
  osce: { exam: "osce", phase: "2" },
};

export type PathStep = { slug: string; reason: string };

export type StartPath = {
  steps: PathStep[];
  builderHref: string | null;
  toolJobIds: string[];
};

const PATH_LENGTH = 5;

export function recommend(goal: GoalId, xp: ExperienceId, picked: NeedId[]): StartPath {
  const score = new Map<string, number>();
  const add = (m: Record<string, number>) => {
    for (const [slug, w] of Object.entries(m)) score.set(slug, (score.get(slug) ?? 0) + w);
  };
  add(goalPlays[goal]);
  picked.forEach((n) => add(needPlays[n]));

  // Fixed entries come first for newer users and last for experienced ones.
  const lead: string[] = [];
  if (xp === "new") lead.push("first-ai-session");
  if (xp !== "comfortable") lead.push("verify-the-ai");
  lead.forEach((s) => score.delete(s));
  score.delete("first-ai-session");
  score.delete("verify-the-ai");

  const ranked = [...score.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([slug]) => slug);

  const tail = xp === "comfortable" ? ["verify-the-ai"] : [];
  const room = PATH_LENGTH - lead.length - tail.length;
  const slugs = [...lead, ...ranked.slice(0, room), ...tail];

  const be = builderExam[goal];
  const builderHref = be ? `/question-builder?exam=${be.exam}&phase=${be.phase}` : null;

  const toolJobIds = ["quiz"];
  if (goal === "coursework" || goal === "shelf" || goal === "step2") toolJobIds.push("own-notes");
  if (goal === "practical") toolJobIds.push("images");
  if (goal === "residency" || goal === "wards") toolJobIds.push("paper");
  if (picked.includes("plan")) toolJobIds.push("schedule");

  return {
    steps: slugs.map((slug) => ({ slug, reason: reasons[slug] ?? "" })),
    builderHref,
    toolJobIds,
  };
}

/* URL encoding so a result can be shared or bookmarked. */

export function encodeAnswers(goal: GoalId, xp: ExperienceId, picked: NeedId[]): string {
  const q = new URLSearchParams({ goal, xp });
  if (picked.length) q.set("needs", picked.join(","));
  return q.toString();
}

export function decodeAnswers(
  search: string
): { goal: GoalId; xp: ExperienceId; needs: NeedId[] } | null {
  const q = new URLSearchParams(search);
  const goal = q.get("goal");
  const xp = q.get("xp");
  if (!goals.some((g) => g.id === goal) || !experiences.some((e) => e.id === xp)) return null;
  const picked = (q.get("needs") ?? "")
    .split(",")
    .filter((n): n is NeedId => needs.some((x) => x.id === n));
  return { goal: goal as GoalId, xp: xp as ExperienceId, needs: [...new Set(picked)] };
}
