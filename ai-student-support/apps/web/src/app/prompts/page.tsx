import type { Metadata } from "next";
import Link from "next/link";
import { PromptLibrary } from "@/components/PromptLibrary";

export const metadata: Metadata = {
  title: "Prompt Templates",
  description:
    "Fill-in-the-blank prompt templates for practice questions, study plans, concept explanations, clinical reasoning, and flashcards.",
};

export default function PromptsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Quick prompts</p>
        <h1 className="text-4xl font-medium leading-tight">Prompt Templates</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Short prompts for one-off jobs. Fill in the blanks, copy, and paste into any AI tool. For a full step-by-step
          workflow, see the{" "}
          <Link href="/plays" className="text-highlight hover:underline">
            Plays
          </Link>
          .
        </p>
      </header>
      <PromptLibrary />
    </div>
  );
}
