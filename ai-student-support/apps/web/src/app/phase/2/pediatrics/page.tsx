import type { Metadata } from "next";
import { RotationPage } from "@/components/RotationPage";

export const metadata: Metadata = {
  title: "Pediatrics Clerkship",
  description: "AI workflows and practice questions for your Pediatrics clerkship.",
};

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "Peds attendings test developmental milestones, weight-based dosing, and age-specific differentials." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "Peds notes need growth charts context, vaccination status, and developmental screening. Draft them fast." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "Load BRS Pediatrics, your peds handbook, and OnlineMedEd for source-grounded review." },
  { slug: "osce-encounter-sim", title: "OSCE Encounter Sim", why: "Practice pediatric encounters: well-child visits, acute presentations, parent communication." },
];

const rotationPrompts = [
  { label: "Peds rounds prep", prompt: "I'm a clerkship student on my Pediatrics clerkship. Today's patients have: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my attending will ask. Focus on age-specific presentations, developmental milestones, weight-based dosing, and when to worry." },
  { label: "Peds shelf review", prompt: "I'm preparing for my Pediatrics shelf. Give me a high-yield review of [TOPIC] organized by: age-specific presentation, differential by age group, diagnostic workup (including age-appropriate norms), first-line treatment with pediatric dosing, and red flags." },
];

export default function PediatricsPage() {
  return (
    <RotationPage
      name="Pediatrics"
      plays={plays}
      prompts={rotationPrompts}
      questionSubject="peds"
    />
  );
}
