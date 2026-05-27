import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Phase 1 - Classroom Foundations",
  description:
    "AI workflows for Phase 1 students at Miller. Build study habits that compound from day one.",
};

const corePlaybooks = [
  {
    slug: "first-ai-session",
    title: "Your First AI Study Session",
    why: "Start here if you've never used AI for studying. Three minutes to your first useful output.",
    tag: "Start here",
  },
  {
    slug: "lecture-compressor",
    title: "Lecture Notes to Anki Cards",
    why: "Turn every lecture into board-style Anki cards in 5 minutes. Build a deck that compounds all year.",
    tag: "Daily habit",
  },
  {
    slug: "concept-coach",
    title: "Socratic Tutor for Sticky Concepts",
    why: "When re-reading doesn't work, Socratic questioning forces you to actually understand the mechanism.",
    tag: "Deep learning",
  },
  {
    slug: "research-speed-read",
    title: "Screen Papers in 2 Minutes",
    why: "Journal club and EBM courses require reading papers. Screen them fast, read the ones that matter.",
    tag: "Research",
  },
];

export default function Phase1Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <Badge className="bg-blue-100 text-blue-800">Phase 1</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Classroom Foundations
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Phase 1 is about building the study systems that carry you through the
          rest of medical school. These Plays help you turn lectures into lasting
          knowledge, build Anki decks efficiently, and develop the kind of
          conceptual understanding that survives board exams.
        </p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Your Phase 1 workflows</h2>
        <div className="space-y-3">
          {corePlaybooks.map((play) => (
            <Link key={play.slug} href={`/plays/${play.slug}`}>
              <div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-[#00543C]/30 transition-all cursor-pointer space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{play.title}</h3>
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-[#F47321]/10 text-[#F47321]"
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

      <section className="rounded-xl border-l-4 border-[#00543C] bg-green-50 p-5 space-y-2">
        <h3 className="font-semibold">Phase 1 study rhythm</h3>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>After every lecture: run Lecture Compressor (5 min)</li>
          <li>When a concept won't stick: open Concept Coach (10 min)</li>
          <li>Before journal club: run Research Speed Read (2 min per paper)</li>
          <li>Weekly: review your Anki deck growth and retention stats</li>
        </ul>
      </section>

      <div className="flex gap-3">
        <Link
          href="/phase/2"
          className="text-sm text-[#F47321] hover:underline font-medium"
        >
          Phase 2: Clerkships &rarr;
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
