/**
 * The faculty content standard.
 *
 * Every prompt on the site (full Plays and starter prompts) is copied with this
 * block appended, so a faculty member who has never written a prompt still gets
 * output held to the same rules as an experienced user. Plays must not restate
 * it; scripts/validate-plays.ts checks that.
 *
 * Keep the rule text free of square brackets: FillablePrompt treats [TEXT] as a
 * blank to fill in.
 */

export const STANDARD_VERSION = "1.0";

export const STANDARD_HEADING = "FACULTY CONTENT STANDARD";

export interface StandardRule {
  id: string;
  /** Short name shown on the Standard page. */
  title: string;
  /** The instruction the AI receives. */
  rule: string;
  /** Why the rule exists. Shown to faculty, not sent to the AI. */
  why: string;
}

export const standardRules: StandardRule[] = [
  {
    id: "original",
    title: "Original work only",
    rule: "Original work only. Do not reproduce or closely paraphrase items or passages from licensed question banks, NBME, USMLE or COMLEX materials, past exams, or textbooks. If I paste such material, use it only to understand the topic and write something new.",
    why: "Copied items are a rights problem for the school, and a learner who has seen the source item learns nothing from it.",
  },
  {
    id: "identifiers",
    title: "No patient or student identifiers",
    rule: "No identifiers. Do not ask for or repeat anything that could identify a real patient (names, dates, record numbers, rare details) or a student (names, IDs, grades, evaluations). If I paste any, stop and tell me to remove it before we continue.",
    why: "Consumer AI tools are not approved places for protected health information or student records. Cases for teaching should be invented.",
  },
  {
    id: "sources",
    title: "Never invent sources",
    rule: "Never invent sources. Do not make up citations, guideline names or years, links, or statistics. Name a source only if I gave it to you or you are confident it exists, and mark it VERIFY. If there is no source, write SOURCE NEEDED instead of guessing.",
    why: "Fabricated and inaccurate references are a documented failure of language models. A fluent sentence with a citation is not evidence.",
  },
  {
    id: "uncertainty",
    title: "Mark what is uncertain",
    rule: "Mark uncertainty. Tag any fact, threshold, dose, or guideline recommendation you are not sure of with VERIFY. Say where guidance differs between regions or professional bodies, and state whose guidance you are using.",
    why: "Thresholds, doses and recent guideline changes are where confident AI text is most often wrong.",
  },
  {
    id: "reasoning",
    title: "Teach the reasoning and the limits",
    rule: "Teach reasoning. Explain why something is true, not only that it is, and say when it does not apply (children, pregnancy, older adults, kidney or liver disease, other settings).",
    why: "A rule learned without its reason fails the first time a case looks different, and most harm from a teaching point comes from using it outside the group it was true for.",
  },
  {
    id: "teaching",
    title: "Teaching material, not patient care",
    rule: "Teaching material, not patient care. Write for learning. Do not phrase anything as instructions for treating a real patient.",
    why: "Learners should never mistake a handout or pearl for clinical direction.",
  },
  {
    id: "fair-cases",
    title: "Fair, realistic cases",
    rule: "Fair cases. Vary patient age, sex and background. Include race, ethnicity or other group membership only when it is clinically relevant and supported by evidence, and say why it is there.",
    why: "Demographic shortcuts that are not tied to evidence become biased rules, and repeated stereotypes teach them.",
  },
  {
    id: "level",
    title: "Pitched at your learners",
    rule: "Match the learners. Pitch everything to the learner level I give you. If I have not said, ask before writing.",
    why: "The same topic needs different depth for a first-year student and a resident.",
  },
  {
    id: "review-list",
    title: "A review list on every draft",
    rule: "Finish with a review list. Whenever you give me material to use, end with BEFORE YOU USE THIS: a short numbered list of the specific claims, answer keys and sources I must check myself, most important first. You draft; I am the reviewer.",
    why: "It turns \"check it\" into a concrete to-do list, which is what makes review happen for busy faculty.",
  },
];

export const STANDARD_BLOCK = [
  `${STANDARD_HEADING} (applies to everything you write for me)`,
  ...standardRules.map((r, i) => `${i + 1}. ${r.rule}`),
].join("\n");

/** The text a faculty member actually copies: the Play's prompt plus the standard. */
export function withStandard(prompt: string): string {
  return `${prompt.trimEnd()}\n\n${STANDARD_BLOCK}`;
}
