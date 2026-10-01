import type { Metadata } from "next";
import { PromptLibrary } from "@/components/PromptLibrary";

export const metadata: Metadata = {
  title: "Prompt Library",
  description:
    "Fill-in-the-blank prompt templates for practice questions, study plans, concept explanations, clinical reasoning, and flashcards.",
};

export default function PromptsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Prompt Library</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Fill-in-the-blank prompts you can customize and copy. Fill the blanks, copy, and paste into any AI tool.
        </p>
      </header>
      <PromptLibrary />
    </div>
  );
}
