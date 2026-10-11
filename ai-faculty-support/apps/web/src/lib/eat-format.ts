/**
 * A pinned copy of EAT's teaching-pearl format, so the pearl Plays produce text that
 * EAT's "Import from CSV" panel accepts and that answers the same questions EAT's
 * reviewers attest to.
 *
 * Source of truth is the EAT repository (lamarmcfly/eat-tracker):
 *   - lib/pearls/domain.ts   CSV_TEMPLATE, PEARL_MECHANISMS, SOURCE_KINDS, field limits
 *   - lib/pearls/review.ts   PEARL_REVIEW_GROUPS (the reviewer questions)
 * Pinned from EAT commit 0794f9d (2026-10-10).
 *
 * When EAT changes its pearl format, update this file and run
 *   EAT_REPO=/path/to/eat-tracker pnpm check:eat
 * which compares every value here with EAT's source and lists what differs.
 *
 * Play prompts use these values through {{TOKENS}} (see expandEatTokens) instead of
 * copying them, so a change here reaches every prompt that depends on it.
 */

export const EAT_PINNED_COMMIT = "0794f9d";

export const EAT_PEARL_CSV_HEADER =
  "system_id,topic,concept_label,takeaway,why,applies_when,limitations,mechanisms,source_citation,source_kind,source_year,source_url,effective_from,review_due_on,ai_assisted";

/** Kinds of misunderstanding a pearl can address, with the wording EAT's reviewers see. */
export const EAT_MECHANISMS = [
  { id: "RETRIEVAL", meaning: "could not recall it" },
  { id: "APPLICATION", meaning: "knew it but did not apply it" },
  { id: "DISCRIMINATION", meaning: "torn between close options" },
  { id: "RIGHT_WRONG_REASON", meaning: "right answer for the wrong reason" },
] as const;

export const EAT_SOURCE_KINDS = [
  "GUIDELINE",
  "SYSTEMATIC_REVIEW",
  "REVIEW",
  "TEXTBOOK",
  "COURSE_MATERIAL",
  "EXPERT_OPINION",
] as const;

/** Character limits EAT enforces on import and on save. */
export const EAT_LIMITS = {
  topic: { min: 1, max: 200 },
  takeaway: { min: 10, max: 200 },
  why: { min: 20, max: 800 },
  appliesWhen: { max: 400 },
  limitations: { min: 4, max: 600 },
  citation: { min: 5, max: 300 },
  stem: { min: 20, max: 1200 },
  explanation: { min: 10, max: 800 },
  option: { max: 300 },
  optionCount: { min: 2, max: 5 },
  transferItems: { max: 3 },
  reviewHorizonDays: 1096,
} as const;

/** EAT's pearl reviewer questions, in order (lib/pearls/review.ts). */
export const EAT_REVIEW_QUESTIONS: string[] = [
  "Is the takeaway true as written, for these learners' stage and for today's practice?",
  "Did you open each source, and does it support this specific claim, not just the topic?",
  "Is each source labelled for what it is (guideline, review, textbook, course material, expert opinion)?",
  "Is there a newer guideline or trial, or a body that disagrees (for example US versus European advice)? If so, does the pearl say whose rule it states?",
  "Does \"why it holds\" give the mechanism or reasoning, so a learner could work the pearl out again, and not only a rule to memorise?",
  "Have you thought through the exceptions: children, pregnancy, older adults, kidney or liver disease, immune suppression, other settings? Is \"None known\" really true?",
  "Could a learner read a likelihood or a typical pattern as a rule that always holds? Is the wording as strong as the evidence and no stronger?",
  "Is it clearly a teaching point and not an instruction for caring for a patient?",
  "What specific wrong belief or wrong answer does this correct? Write it in a sentence.",
  "Are the ticked kinds of misunderstanding the right ones (could not recall it, knew it but did not apply it, torn between close options, right answer for the wrong reason)?",
  "Does it repeat or contradict another approved pearl, or something taught in the course? Which, and how is it resolved?",
  "Is the topic worded exactly as in your curriculum mapping, and does the pearl serve a stated objective (or is it deliberately enrichment)?",
  "Is every practice question your own? Is none copied or lightly reworded from a licensed question bank, a past exam, or a textbook?",
  "Is there one best answer that the source supports, and would a second reviewer pick the same one?",
  "Does each question use the idea in a new setting, and not restate the pearl? Do the wrong options reflect real misconceptions?",
  "Does the explanation say why the tempting wrong answer fails, and not only why the right one is right?",
  "Is it plain and short enough to read between tasks? Are the example patients free of stereotype, and any use of race, sex or age stated as evidence-based and sourced?",
  "Is it free of anything that could identify a real patient, and free of copied passages?",
  "If AI helped draft it, is the box ticked, and have you checked every claim against the sources yourself?",
  "Is the review date right for how fast this field changes, and who will review it when the date comes?",
];

/** Question numbers (1-based) that only apply when the pearl has practice questions. */
export const EAT_PRACTICE_QUESTION_RANGE = { from: 13, to: 16 } as const;

const L = EAT_LIMITS;

const EAT_TOKENS: Record<string, string> = {
  EAT_PEARL_CSV_HEADER,
  EAT_MECHANISMS: EAT_MECHANISMS.map((m) => `${m.id} (${m.meaning})`).join(", "),
  EAT_SOURCE_KINDS: EAT_SOURCE_KINDS.join(", "),
  EAT_REVIEW_QUESTIONS: EAT_REVIEW_QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join("\n"),
  EAT_PRACTICE_QUESTIONS_FROM: String(EAT_PRACTICE_QUESTION_RANGE.from),
  EAT_PRACTICE_QUESTIONS_TO: String(EAT_PRACTICE_QUESTION_RANGE.to),
  EAT_TAKEAWAY_LIMIT: `${L.takeaway.min} to ${L.takeaway.max} characters`,
  EAT_WHY_LIMIT: `${L.why.min} to ${L.why.max} characters`,
  EAT_APPLIES_WHEN_LIMIT: `up to ${L.appliesWhen.max} characters`,
  EAT_LIMITATIONS_LIMIT: `up to ${L.limitations.max} characters`,
  EAT_TRANSFER_LIMITS: `stem ${L.stem.min} to ${L.stem.max} characters; ${L.optionCount.min} to ${L.optionCount.max} options of up to ${L.option.max} characters each; explanation ${L.explanation.min} to ${L.explanation.max} characters`,
  EAT_MAX_TRANSFER_ITEMS: String(L.transferItems.max),
  EAT_REVIEW_HORIZON: "three years",
};

const TOKEN = /\{\{([A-Z_]+)\}\}/g;

/** Replace {{EAT_...}} tokens. Throws on an unknown token so a typo cannot ship. */
export function expandEatTokens(text: string): string {
  return text.replace(TOKEN, (_, name: string) => {
    const value = EAT_TOKENS[name];
    if (value === undefined) throw new Error(`Unknown token {{${name}}}`);
    return value;
  });
}

export function eatTokenNames(): string[] {
  return Object.keys(EAT_TOKENS);
}
