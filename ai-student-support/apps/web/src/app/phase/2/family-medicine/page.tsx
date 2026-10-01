import type { Metadata } from "next";
import { RotationPage } from "@/components/RotationPage";

export const metadata: Metadata = {
  title: "Family Medicine Clerkship",
  description: "AI workflows and practice questions for your Family Medicine clerkship.",
};

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "FM attendings test preventive medicine, chronic disease management, and screening guidelines." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "FM notes cover broad complaints. Draft comprehensive outpatient notes with appropriate assessments." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "FM shelf is broad. Build a notebook with Case Files FM, AAFP guidelines, and your clinic notes." },
  { slug: "concept-coach", title: "Concept Coach", why: "Drill preventive care guidelines, screening intervals, and chronic disease management algorithms." },
];

const rotationPrompts = [
  { label: "FM clinic prep", prompt: "I'm a clerkship student on my Family Medicine clerkship. Today I'm seeing patients with: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my preceptor will ask. Focus on USPSTF screening guidelines, chronic disease management, preventive counseling, and appropriate referrals." },
  { label: "FM shelf review", prompt: "I'm preparing for my Family Medicine shelf. Give me a high-yield review of [TOPIC] organized by: epidemiology, risk factors, screening guidelines (USPSTF), clinical presentation, outpatient workup, first-line management, and when to refer." },
];

export default function FamilyMedicinePage() {
  return (
    <RotationPage
      name="Family Medicine"
      plays={plays}
      prompts={rotationPrompts}
      questionSubject="fm"
    />
  );
}
