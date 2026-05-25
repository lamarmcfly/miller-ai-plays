import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Internal Medicine Clerkship",
  description: "AI workflows tailored for your Internal Medicine rotation at Miller.",
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
    prompt: "I'm a Phase 2 student on my Internal Medicine clerkship. Today's patients have: [CONDITION 1], [CONDITION 2], [CONDITION 3]. For each condition, give me the top 5 questions my attending will ask, with concise answers and one detail that shows depth. Focus on pathophysiology and evidence-based management.",
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
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <Link
            href="/phase/2"
            className="text-sm text-muted-foreground hover:underline"
          >
            Phase 2
          </Link>
          <span className="text-muted-foreground">/</span>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Internal Medicine
            </h1>
            <p className="text-muted-foreground">
              AI workflows tailored for your IM rotation
            </p>
          </div>
        </div>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Recommended Workflows</h2>
        <div className="space-y-3">
          {plays.map((play) => (
            <Link key={play.slug} href={`/plays/${play.slug}`}>
              <div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-[#00543C]/30 transition-all cursor-pointer space-y-1">
                <h3 className="font-semibold">{play.title}</h3>
                <p className="text-sm text-muted-foreground">{play.why}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">IM-specific starter prompts</h2>
        <p className="text-sm text-muted-foreground">
          Copy any of these directly into your AI tool. Replace the [BRACKETS]
          with your info.
        </p>
        <div className="space-y-3">
          {rotationPrompts.map((rp) => (
            <div
              key={rp.label}
              className="rounded-xl border border-border bg-card p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{rp.label}</span>
                <CopyButton text={rp.prompt} label="Copy" />
              </div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-muted/50 rounded-lg p-3">
                {rp.prompt}
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border-l-4 border-[#00543C] bg-green-50 p-5 space-y-2">
        <h3 className="font-semibold">IM daily rhythm</h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>Before rounds: Rounds Prep with today's patient list (5 min)</li>
          <li>After each patient: Clinical Note draft (3 min per note)</li>
          <li>Evening: Shelf Review Notebook for topics from today (15 min)</li>
          <li>After UWorld blocks: Error Engine for IM-specific wrongs</li>
        </ul>
      </section>

      <div className="flex gap-3">
        <Link
          href="/phase/2"
          className="text-sm text-muted-foreground hover:underline"
        >
          &larr; All rotations
        </Link>
      </div>
    </div>
  );
}
