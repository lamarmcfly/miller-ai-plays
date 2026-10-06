import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPlays } from "@/lib/plays";
import { goals, recommend, type GoalId } from "@/lib/start-path";

const intro: Record<GoalId, { h1: string; body: string }> = {
  coursework: {
    h1: "AI study workflows for medical school course exams",
    body: "Turn lectures into flashcards, get tutoring on concepts that won't stick, and practice with questions written from your own course material.",
  },
  practical: {
    h1: "AI study workflows for anatomy and lab practicals",
    body: "Quiz yourself on structures and relationships using your own diagrams and notes, then space your review so it holds up on practical day.",
  },
  step1: {
    h1: "AI study workflows for USMLE Step 1 and COMLEX Level 1",
    body: "Diagnose why you miss questions, track weak spots across practice tests, and build a schedule that works backward from your exam date.",
  },
  step2: {
    h1: "AI study workflows for USMLE Step 2 CK and COMLEX Level 2",
    body: "Analyze your errors, practice next-best-step reasoning, and keep a clear plan through clerkships and dedicated study.",
  },
  step3: {
    h1: "AI study workflows for USMLE Step 3 and COMLEX Level 3",
    body: "Sharpen management decisions, brush up biostatistics, and plan study time around a busy intern-year schedule.",
  },
  shelf: {
    h1: "AI study workflows for clerkship shelf exams",
    body: "Build a shelf-ready notebook from your own sources, practice with shelf-style questions, and learn from every miss.",
  },
  osce: {
    h1: "AI study workflows for OSCEs and clinical skills exams",
    body: "Rehearse standardized-patient encounters, practice your case presentations, and drill differentials out loud.",
  },
  wards: {
    h1: "AI study workflows for the wards",
    body: "Prepare for rounds, draft notes faster, rehearse presentations, and decide quickly which papers are worth reading.",
  },
  residency: {
    h1: "AI feedback tools for residency applications",
    body: "Get honest feedback on your own writing and practice interviews, without handing your voice over to an AI.",
  },
};

export function generateStaticParams() {
  return goals.map((g) => ({ goal: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ goal: string }> }): Promise<Metadata> {
  const { goal } = await params;
  const g = goals.find((x) => x.id === goal);
  if (!g) return {};
  const i = intro[g.id];
  return { title: i.h1, description: i.body, openGraph: { title: i.h1, description: i.body } };
}

export default async function ExamPage({ params }: { params: Promise<{ goal: string }> }) {
  const { goal } = await params;
  const g = goals.find((x) => x.id === goal);
  if (!g) notFound();

  const path = recommend(g.id, "some", []);
  const plays = new Map(getAllPlays().map((p) => [p.slug, p]));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{g.label}</p>
        <h1 className="text-4xl font-medium leading-tight">{intro[g.id].h1}</h1>
        <p className="text-lg text-muted-foreground">{intro[g.id].body}</p>
      </header>

      <ol className="space-y-3">
        {path.steps
          .filter((s) => plays.has(s.slug))
          .map((s, i) => (
            <li key={s.slug}>
              <Link
                href={`/plays/${s.slug}`}
                className="flex gap-4 border border-border bg-card p-4 transition-colors hover:border-brand hover:bg-marker/30"
              >
                <span aria-hidden="true" className="font-mono text-2xl text-muted-foreground">{i + 1}</span>
                <span className="space-y-1">
                  <span className="block font-semibold leading-snug">{plays.get(s.slug)!.title}</span>
                  <span className="block text-sm text-muted-foreground">{s.reason}</span>
                </span>
              </Link>
            </li>
          ))}
      </ol>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {path.builderHref && (
          <Link
            href={path.builderHref}
            className="inline-flex items-center bg-brand text-white hover:bg-brand-light px-5 py-3 text-sm font-semibold transition-colors"
          >
            Build practice questions for this exam
          </Link>
        )}
        <Link
          href="/start"
          className="text-sm font-medium underline decoration-marker decoration-4 underline-offset-[6px] hover:bg-marker/50"
        >
          Get a path personalized to you
        </Link>
      </div>
    </div>
  );
}
