import type { Metadata } from "next";
import { RotationPage } from "@/components/RotationPage";

export const metadata: Metadata = {
  title: "Psychiatry Clerkship",
  description: "AI workflows and practice questions for your Psychiatry clerkship.",
};

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "Psychiatry attendings test diagnostic criteria, medication mechanisms, and therapeutic approaches." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "Psych notes emphasize mental status exam and safety assessments. Get the structure right." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "Build a psych shelf notebook with First Aid Psychiatry, your clerkship guide, and DSM criteria summaries." },
  { slug: "osce-encounter-sim", title: "OSCE Encounter Sim", why: "Practice sensitive encounters: suicidal ideation assessment, substance use history, psychosis interviews." },
];

const rotationPrompts = [
  { label: "Psych rounds prep", prompt: "I'm a clerkship student on my Psychiatry clerkship. Today's patients have: [DIAGNOSIS 1], [DIAGNOSIS 2]. For each, give me the top 5 questions my attending will ask. Focus on DSM-5 criteria, first-line medications with mechanisms, therapy modalities, and safety assessment." },
  { label: "Psych shelf review", prompt: "I'm preparing for my Psychiatry shelf. Give me a high-yield review of [TOPIC] organized by: DSM-5 diagnostic criteria, epidemiology, neurobiology, first-line treatment (medication + therapy), side effects to monitor, and prognosis." },
];

export default function PsychiatryPage() {
  return (
    <RotationPage
      name="Psychiatry"
      plays={plays}
      prompts={rotationPrompts}
      questionSubject="psych"
    />
  );
}
