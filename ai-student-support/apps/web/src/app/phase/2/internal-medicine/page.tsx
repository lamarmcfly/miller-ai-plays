import type { Metadata } from "next";
import { RotationPage } from "@/components/RotationPage";

export const metadata: Metadata = {
  title: "Internal Medicine Clerkship",
  description: "AI workflows and practice questions for your Internal Medicine clerkship.",
};

const plays = [
  {
    slug: "rounds-prep",
    title: "Rounds Prep",
    why: "IM attendings test pathophysiology and management. Get the top 5 questions per condition before rounds.",
  },
  {
    slug: "clinical-note",
    title: "Clinical Note Writer",
    why: "IM notes are the longest. Draft your admission H&Ps and progress notes in seconds.",
  },
  {
    slug: "shelf-review-notebook",
    title: "Shelf Review Notebook",
    why: "Build a source-grounded IM notebook. Load Step Up to Medicine, your IM handbook, and OnlineMedEd transcripts.",
  },
  {
    slug: "osce-encounter-sim",
    title: "OSCE Encounter Sim",
    why: "Practice IM-specific encounters: chest pain, dyspnea, new-onset diabetes, altered mental status.",
  },
];

const rotationPrompts = [
  {
    label: "IM rounds prep",
    prompt: "I'm a clerkship student on my Internal Medicine clerkship. Today's patients have: [CONDITION 1], [CONDITION 2], [CONDITION 3]. For each condition, give me the top 5 questions my attending will ask, with concise answers and one detail that shows depth. Focus on pathophysiology and evidence-based management.",
  },
  {
    label: "IM admission note",
    prompt: "I'm on Internal Medicine. I need to write an admission H&P. Patient is a [AGE] [SEX] presenting with [CC]. Here's what I have: [PASTE RAW NOTES]. Format this as a full admission note with appropriate IM-style assessment and problem-based plan.",
  },
  {
    label: "IM shelf quick review",
    prompt: "I'm preparing for my Internal Medicine shelf exam. Give me a high-yield review of [TOPIC] organized by: etiology, pathophysiology, clinical presentation, diagnostic workup, first-line management, and complications. Include the 3 most commonly tested associations.",
  },
];

export default function InternalMedicinePage() {
  return (
    <RotationPage
      name="Internal Medicine"
      plays={plays}
      prompts={rotationPrompts}
      questionSubject="im"
      rhythm={{
        title: "IM daily rhythm",
        items: [
          "Before rounds: Rounds Prep with today's patient list (5 min)",
          "After each patient: Clinical Note draft (3 min per note)",
          "Evening: Shelf Review Notebook for topics from today (15 min)",
          "After practice blocks: Error Engine for IM-specific misses",
        ],
      }}
    />
  );
}
