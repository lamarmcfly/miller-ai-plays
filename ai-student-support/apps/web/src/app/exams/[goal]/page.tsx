import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPlays } from "@/lib/plays";
import { goals, recommend, type GoalId } from "@/lib/start-path";

const intro: Record<GoalId, { h1: string; body: string; guardrails?: { title: string; items: string[] } }> = {
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
    h1: "Using AI on your residency application, without losing your voice",
    body: "Use AI as a second reader for your own drafts and as a mock interviewer. It gives feedback and questions. It never writes the application for you.",
    guardrails: {
      title: "Ground rules for AI on your application",
      items: [
        "Check first. Your school, each program, and the application service set their own AI-use policies, and you are responsible for following them. If a policy is unclear, ask your dean's office or advisor.",
        "Write the draft yourself. Bring AI a real first draft, then ask for feedback and questions, not rewrites. Every sentence you submit should be yours.",
        "Keep patients out of it. No names, initials, MRNs, dates, or identifiable stories in anything you paste.",
        "Verify what it tells you. AI can be wrong about requirements, deadlines, and norms. Confirm with official sources and a specialty advisor.",
      ],
    },
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

      {intro[g.id].guardrails && (
        <section aria-labelledby="guardrails-heading" className="border border-border bg-marker/30 p-4 space-y-2">
          <h2 id="guardrails-heading" className="font-semibold">{intro[g.id].guardrails!.title}</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {intro[g.id].guardrails!.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

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
