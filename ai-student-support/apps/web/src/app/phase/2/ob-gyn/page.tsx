import type { Metadata } from "next";
import { RotationPage } from "@/components/RotationPage";

export const metadata: Metadata = {
  title: "OB/GYN Clerkship",
  description: "AI workflows and practice questions for your OB/GYN clerkship.",
};

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "OB/GYN attendings test timing, contraindications, and labor management. Know the key decision points." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "OB notes have unique structure: G/P status, gestational age, fetal monitoring. Get the format right fast." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "Build a source-grounded OB/GYN notebook with Beckmann, your clerkship guide, and review materials." },
  { slug: "osce-encounter-sim", title: "OSCE Encounter Sim", why: "Practice sensitive conversations: contraception counseling, abnormal pap results, pregnancy loss." },
];

const rotationPrompts = [
  { label: "OB/GYN rounds prep", prompt: "I'm a clerkship student on my OB/GYN clerkship. Today's patients include: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my attending will ask. Focus on gestational timing, contraindications, management algorithms, and when to escalate." },
  { label: "OB/GYN shelf review", prompt: "I'm preparing for my OB/GYN shelf. Give me a high-yield review of [TOPIC] organized by: pathophysiology, clinical presentation, diagnostic criteria, management by trimester (if applicable), complications, and contraindications." },
];

export default function ObGynPage() {
  return (
    <RotationPage
      name="OB/GYN"
      plays={plays}
      prompts={rotationPrompts}
      questionSubject="obgyn"
    />
  );
}
