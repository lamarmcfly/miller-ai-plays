// Recommendation logic for the Start Here page. Pure functions, no React, so
// scripts/check-start-path.ts can verify every answer combination.

export type MakeId = "pearls" | "questions" | "review" | "objectives" | "cases" | "unsure";
export type ExperienceId = "new" | "some" | "comfortable";

export const makes: { id: MakeId; label: string; blurb: string }[] = [
  { id: "pearls", label: "Teaching pearls", blurb: "Short takeaways for learners, including pearls for EAT" },
  { id: "questions", label: "Exam or quiz questions", blurb: "New single-best-answer vignettes" },
  { id: "review", label: "Improving questions I already have", blurb: "Fix flaws, or make sense of item statistics" },
  { id: "objectives", label: "Learning objectives", blurb: "For a lecture, a session, or a course" },
  { id: "cases", label: "A small-group or case-based session", blurb: "A case with a facilitator guide" },
  { id: "unsure", label: "Not sure yet", blurb: "Show me what AI can do for my teaching" },
];

export const experiences: { id: ExperienceId; label: string; blurb: string }[] = [
  { id: "new", label: "New to it", blurb: "I haven't used AI for work, or only once or twice" },
  { id: "some", label: "Some", blurb: "I've asked it questions but don't have a routine" },
  { id: "comfortable", label: "Comfortable", blurb: "I use it regularly and want a consistent standard" },
];

/** Plays whose job is to check a draft. Every path includes at least one. */
export const CHECK_PLAYS = ["pearl-check", "item-review", "check-the-draft"] as const;

export const FIRST_SESSION = "first-ai-session";

type Step = { slug: string; reason: string };

const paths: Record<MakeId, Step[]> = {
  pearls: [
    { slug: "pearl-drafter", reason: "Drafts pearls with a reason, limits and your sources, ready to import into EAT as drafts." },
    { slug: "pearl-check", reason: "Runs EAT's 20 reviewer questions on a draft so it reaches review in good shape." },
    { slug: "exam-item-writer", reason: "Writes the original practice questions that test whether a pearl transfers to a new case." },
  ],
  questions: [
    { slug: "learning-objectives", reason: "A good question tests one stated objective. Pin those down first." },
    { slug: "exam-item-writer", reason: "Writes original vignettes with distractors built from real misconceptions." },
    { slug: "item-review", reason: "Checks the set for cueing, ambiguity and weak distractors before learners see it." },
  ],
  review: [
    { slug: "item-review", reason: "Finds the flaws in questions you already have and suggests the smallest fix." },
    { slug: "exam-item-writer", reason: "Writes replacements for the questions worth retiring." },
    { slug: "check-the-draft", reason: "Turns any AI-written fix into a list of claims to verify." },
  ],
  objectives: [
    { slug: "learning-objectives", reason: "Turns your outline or slides into measurable objectives, each with a way to assess it." },
    { slug: "case-writer", reason: "Builds a session around the objectives you just wrote." },
    { slug: "check-the-draft", reason: "Lists the claims to verify before the material reaches learners." },
  ],
  cases: [
    { slug: "learning-objectives", reason: "The case should serve two to four clear objectives. Start there." },
    { slug: "case-writer", reason: "A case that unfolds in parts, with a facilitator guide and expected answers." },
    { slug: "check-the-draft", reason: "Checks the case's numbers, thresholds and guidance before you teach it." },
  ],
  unsure: [
    { slug: "learning-objectives", reason: "The quickest useful win: objectives for a session you already teach." },
    { slug: "check-the-draft", reason: "The habit that makes everything else safe: check before it reaches learners." },
    { slug: "exam-item-writer", reason: "Original exam questions, written to item-writing standards." },
    { slug: "pearl-drafter", reason: "Short teaching takeaways that explain why and say where they stop." },
  ],
};

const firstSessionStep: Step = {
  slug: FIRST_SESSION,
  reason: "A guided 20-minute first session: make something real, learn to push back, and catch an AI mistake.",
};

export function recommend(make: MakeId, xp: ExperienceId): { steps: Step[] } {
  const steps = xp === "new" ? [firstSessionStep, ...paths[make]] : [...paths[make]];
  return { steps };
}

export function encodeAnswers(make: MakeId, xp: ExperienceId): string {
  return new URLSearchParams({ make, xp }).toString();
}

export function decodeAnswers(search: string): { make: MakeId; xp: ExperienceId } | null {
  const q = new URLSearchParams(search);
  const make = q.get("make");
  const xp = q.get("xp");
  if (!makes.some((m) => m.id === make) || !experiences.some((x) => x.id === xp)) return null;
  return { make: make as MakeId, xp: xp as ExperienceId };
}

export function allReferencedSlugs(): string[] {
  const all = new Set<string>([FIRST_SESSION]);
  for (const steps of Object.values(paths)) for (const s of steps) all.add(s.slug);
  return [...all];
}
