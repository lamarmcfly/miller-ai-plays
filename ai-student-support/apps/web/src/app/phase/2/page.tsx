import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PhasePractice } from "@/components/PhasePractice";

export const metadata: Metadata = {
  title: "Phase 2 - Clerkships + Step Prep",
  description:
    "AI workflows and practice questions for clerkship students: rotations, shelf exams, OSCEs, and Step 2 CK or Level 2 prep.",
};

const rotations = [
  { slug: "internal-medicine", label: "Internal Medicine" },
  { slug: "surgery", label: "Surgery" },
  { slug: "pediatrics", label: "Pediatrics" },
  { slug: "ob-gyn", label: "OB/GYN" },
  { slug: "psychiatry", label: "Psychiatry" },
  { slug: "family-medicine", label: "Family Medicine" },
];

const corePlaybooks = [
  {
    slug: "rounds-prep",
    title: "5-Minute Rounds Prep",
    why: "Every morning before rounds. Know what they'll ask before they ask it.",
    tag: "Daily habit",
  },
  {
    slug: "clinical-note",
    title: "Clinical Note in Half the Time",
    why: "Stop spending hours on SOAP notes. Get a draft in seconds, then edit.",
    tag: "Efficiency",
  },
  {
    slug: "osce-encounter-sim",
    title: "OSCE Encounter Simulation",
    why: "Practice encounters with a simulated patient before the real OSCE.",
    tag: "Clinical skills",
  },
  {
    slug: "shelf-review-notebook",
    title: "Shelf Review Notebook",
    why: "Build a source-grounded study notebook for each shelf. No hallucinations.",
    tag: "Shelf prep",
  },
  {
    slug: "deficit-tracker",
    title: "Track Weak Spots Across Tests",
    why: "Before Step 1 and 2: identify which content areas are dragging your score down.",
    tag: "Step prep",
  },
  {
    slug: "error-engine",
    title: "Error Engine",
    why: "After every UWorld block: diagnose whether your wrongs are knowledge gaps or reasoning errors.",
    tag: "Score gains",
  },
];

export default function Phase2Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <Badge className="bg-muted text-brand">Phase 2</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          Clerkships + Step Prep
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Phase 2 (core clinical rotations, also called clerkships or clinical
          years) is where AI goes from &ldquo;nice to have&rdquo; to a daily
          tool. Between rotations, shelf exams, and Step prep, you need
          workflows that save time and sharpen performance. Step 1 timing
          differs by school; use the Step 1 plays wherever it falls for you.
        </p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">By rotation</h2>
        <p className="text-sm text-muted-foreground">
          Each rotation has its own set of recommended Plays with
          rotation-specific starter prompts.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rotations.map((r) => (
            <Link key={r.slug} href={`/phase/2/${r.slug}`}>
              <div className="rounded-xl border border-border p-4 hover:bg-marker/30 hover:border-brand transition-all cursor-pointer text-center space-y-1">
                <p className="font-semibold text-sm">{r.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Core Phase 2 Plays</h2>
        <div className="space-y-3">
          {corePlaybooks.map((play) => (
            <Link key={play.slug} href={`/plays/${play.slug}`}>
              <div className="rounded-xl border border-border p-5 hover:bg-marker/30 hover:border-brand transition-all cursor-pointer space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{play.title}</h3>
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-marker text-brand"
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
        intro="Shelf and Step 2 CK questions reward the next best step. Practice with questions written like the real thing."
        links={[
          { label: "Internal medicine shelf set", blurb: "10 clinical vignettes, applied level", href: "/question-builder?preset=shelf-im" },
          { label: "Step 2 CK / Level 2 mixed block", blurb: "Management-focused questions", href: "/question-builder?preset=step2-mixed" },
          { label: "OSCE: chest pain encounter", blurb: "Live simulated patient with a scoring checklist", href: "/question-builder?preset=osce-chest-pain" },
          { label: "Oral exam: acute abdomen", blurb: "Attending-style questions that escalate", href: "/question-builder?preset=oral-surgery" },
        ]}
      />

      <section className="rounded-xl border-l-4 border-brand bg-muted p-5 space-y-2">
        <h3 className="font-semibold">Dedicated study: Step prep rhythm</h3>
        <p className="text-sm text-muted-foreground">
          During dedicated study, your daily rhythm should include Error Engine
          (after every practice block), Deficit Tracker (after every NBME
          practice test), and Concept Coach (for topics that won&apos;t stick). If
          your scores are plateauing, talk to your school&apos;s learning
          specialist or academic support office about an individualized plan.
        </p>
      </section>

      <div className="flex gap-3">
        <Link
          href="/phase/1"
          className="text-sm text-muted-foreground hover:underline"
        >
          &larr; Phase 1
        </Link>
        <Link
          href="/phase/3"
          className="text-sm text-highlight hover:underline font-medium"
        >
          Phase 3 &rarr;
        </Link>
      </div>
    </div>
  );
}
