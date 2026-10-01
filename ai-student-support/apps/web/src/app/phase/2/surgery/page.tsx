import type { Metadata } from "next";
import { RotationPage } from "@/components/RotationPage";

export const metadata: Metadata = {
  title: "Surgery Clerkship",
  description: "AI workflows and practice questions for your Surgery clerkship.",
};

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "Surgery attendings test anatomy, indications, and complications. Know the answers before pre-rounds." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "Surgery notes are terse. Get a focused post-op or progress note draft in bullet-point format." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "Build a surgery shelf notebook. Load Pestana, your surgical recall notes, and OnlineMedEd." },
  { slug: "concept-coach", title: "Concept Coach", why: "Drill surgical anatomy and operative indications Socratically when Netter alone doesn't cut it." },
];

const rotationPrompts = [
  { label: "Surgery rounds prep", prompt: "I'm a clerkship student on my Surgery clerkship. Today's patients have: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my attending will ask. Focus on anatomy, surgical indications, post-op complications, and when to consult. Keep answers brief: surgery attendings want bullet points." },
  { label: "Surgery post-op note", prompt: "I'm on Surgery. I need a brief post-op note. Patient had [PROCEDURE] today. Vitals stable, [EXAM FINDINGS]. Keep it concise: procedure, EBL, findings, drains, diet, activity, pain control, DVT prophylaxis, disposition." },
  { label: "Surgery shelf review", prompt: "I'm preparing for my Surgery shelf. Give me a high-yield review of [TOPIC] organized by: anatomy, pathophysiology, presentation (acute vs chronic), diagnostic workup, surgical indications, procedure of choice, and post-op complications." },
];

export default function SurgeryPage() {
  return (
    <RotationPage
      name="Surgery"
      plays={plays}
      prompts={rotationPrompts}
      questionSubject="surgery"
    />
  );
}
