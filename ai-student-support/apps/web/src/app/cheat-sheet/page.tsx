import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { ShareButton } from "@/components/ShareButton";

export const metadata: Metadata = {
  title: "One-Page Cheat Sheet",
  description:
    "A printable one-page guide to using AI for medical study: the five-part prompt, a verification routine, and what never to paste.",
};

const recipe = [
  ["Goal", "Say what you're studying for and your level. \"I'm an MS2 preparing for Step 1.\""],
  ["Material", "Paste your own notes, a missed question's reasoning, or a topic. Less is better than a whole textbook."],
  ["Task", "One clear job: quiz me, explain, find my pattern, build a schedule."],
  ["Format", "Say how you want it back: one question at a time, a table, three bullets."],
  ["Check", "Ask it to flag anything it is unsure of and name a reference to verify."],
];

const verify = [
  "Ask: \"How confident are you, and what should I double-check?\"",
  "Check doses, thresholds, contraindications, and guidelines against a trusted source.",
  "Ask for the strongest argument against the answer, then compare.",
  "Run a high-stakes fact through a second AI tool or your course materials.",
  "If it contradicts your lecture or textbook, your course materials win.",
];

const never = [
  "Patient names, MRNs, dates of birth, or any detail that identifies a patient.",
  "Licensed question-bank or exam content (UWorld, NBME, AMBOSS items).",
  "Graded assessments or anything your course forbids AI for.",
  "Anything you would use to make a real clinical decision.",
];

const quick = [
  ["First session", "/plays/first-ai-session"],
  ["Check AI answers", "/plays/verify-the-ai"],
  ["Wrong answers into a plan", "/plays/error-engine"],
  ["Notes into flashcards", "/plays/lecture-compressor"],
  ["Custom practice questions", "/question-builder"],
  ["Find your path", "/start"],
] as const;

export default function CheatSheetPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6 print:max-w-none print:p-0 print:space-y-4">
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <PrintButton />
        <ShareButton
          title="Med AI Plays one-page cheat sheet"
          text="A printable one-page guide to studying with AI:"
          path="/cheat-sheet"
        />
      </div>

      <header className="space-y-1 border-b border-brand pb-3">
        <h1 className="text-3xl font-medium">Study with AI: one page</h1>
        <p className="text-sm text-muted-foreground">Med AI Plays &middot; works in Claude, ChatGPT, Gemini, Copilot, NotebookLM</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">The five-part prompt</h2>
        <ol className="space-y-1.5 text-sm">
          {recipe.map(([k, v], i) => (
            <li key={k} className="flex gap-3">
              <span className="font-mono text-muted-foreground w-5">{i + 1}</span>
              <span>
                <strong>{k}.</strong> {v}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2 print:gap-4">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Verify before you trust it</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            {verify.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Never paste</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            {never.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Start with these</h2>
        <ul className="grid gap-1.5 text-sm sm:grid-cols-2 print:grid-cols-2">
          {quick.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="text-highlight hover:underline font-medium">
                {label}
              </Link>{" "}
              <span className="text-muted-foreground font-mono text-xs">{href}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-muted-foreground border-t border-border pt-3">
        For studying, not for decisions about real patients. Follow your school&apos;s policy on AI use.
      </p>
    </div>
  );
}
