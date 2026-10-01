import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PhasePractice } from "@/components/PhasePractice";

export const metadata: Metadata = {
  title: "Phase 3 - Specialties + Advanced Clinical",
  description: "AI workflows and practice questions for advanced clinical students: electives, sub-internships, research, Step 3 readiness, and residency prep.",
};

const corePlaybooks = [
  {
    slug: "rounds-prep",
    title: "Rounds Prep",
    why: "Works across every specialty rotation. Adapt the prompts to your current service.",
    tag: "Daily habit",
  },
  {
    slug: "clinical-note",
    title: "Clinical Note Writer",
    why: "Specialty notes vary widely. The Play adapts to your rotation's documentation style.",
    tag: "Efficiency",
  },
  {
    slug: "research-speed-read",
    title: "Research Speed Read",
    why: "Phase 3 research requirements mean more papers to screen. Read smart, not more.",
    tag: "Research",
  },
  {
    slug: "deficit-tracker",
    title: "Deficit Tracker",
    why: "If you're still prepping for boards or remediating, track your persistent weak spots.",
    tag: "Score gains",
  },
  {
    slug: "concept-coach",
    title: "Concept Coach",
    why: "Specialty topics are deep and narrow. Use Socratic drilling for subspecialty concepts.",
    tag: "Deep learning",
  },
];

export default function Phase3Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <Badge className="bg-purple-100 text-purple-800">Phase 3</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Specialties + Advanced Clinical
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Phase 3 (advanced clinical, also called post-clerkship or the final
          year) is about going deeper. You&apos;re in electives and
          sub-internships, doing research, and preparing for residency. The Plays you use shift from
          broad shelf prep to targeted specialty knowledge, efficient
          documentation, and research productivity.
        </p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Your Phase 3 Plays</h2>
        <div className="space-y-3">
          {corePlaybooks.map((play) => (
            <Link key={play.slug} href={`/plays/${play.slug}`}>
              <div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-brand/30 transition-all cursor-pointer space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{play.title}</h3>
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-highlight/10 text-highlight"
                  >
                    {play.tag}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{play.why}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PhasePractice
        intro="Questions at this level should include ambiguity, comorbidities, and follow-up decisions, not just a single classic presentation."
        links={[
          { label: "Step 3 sequential cases", blurb: "Multi-step management with new data at each step", href: "/question-builder?preset=step3-sequential" },
          { label: "Challenging mixed block", blurb: "Close distractors, atypical presentations", href: "/question-builder?exam=step2ck&phase=3" },
          { label: "Oral exam practice", blurb: "Sub-internship and interview-style questions", href: "/question-builder?exam=oral&phase=3" },
          { label: "OSCE for advanced encounters", blurb: "Counseling, handoffs, difficult conversations", href: "/question-builder?exam=osce&phase=3" },
        ]}
      />

      <section className="rounded-xl border-l-4 border-purple-400 bg-purple-50 p-5 space-y-2">
        <h3 className="font-semibold">Phase 3 pro tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>Adapt Rounds Prep prompts to your specialty&apos;s question style</li>
          <li>Use Research Speed Read before every journal club and research meeting</li>
          <li>Share your specialty-specific prompts on the Community Board</li>
          <li>If you develop a workflow that works, submit it as a new Workflow proposal</li>
        </ul>
      </section>

      <div className="flex gap-3">
        <Link
          href="/phase/2"
          className="text-sm text-muted-foreground hover:underline"
        >
          &larr; Phase 2
        </Link>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          Browse all Plays
        </Link>
      </div>
    </div>
  );
}
