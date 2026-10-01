import Link from "next/link";

const cards = [
  {
    phase: "Phase 1",
    title: "Course exams and Step 1 / Level 1",
    body: "Mechanism-focused vignettes, anatomy practical stations, and quizzes built only from your own lecture notes.",
    href: "/question-builder?preset=step1-pharm",
  },
  {
    phase: "Phase 2",
    title: "Shelf exams and Step 2 CK / Level 2",
    body: "Clinical vignettes by clerkship, management-focused questions, OSCE encounters, and pimping practice.",
    href: "/question-builder?preset=shelf-im",
  },
  {
    phase: "Phase 3",
    title: "Step 3 and residency readiness",
    body: "Multi-step cases, follow-up and prevention decisions, and harder distractors that mirror real ambiguity.",
    href: "/question-builder?preset=step3-sequential",
  },
];

export function PracticeQuestionsTeaser() {
  return (
    <section className="space-y-4" aria-labelledby="pq-heading">
      <div className="space-y-1">
        <h2 id="pq-heading" className="text-xl font-bold tracking-tight">
          Practice questions made for you
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Choose your exam, phase, subject, and difficulty. The Question Builder writes a prompt that makes any AI tool
          produce realistic, original practice questions, with the feedback and follow-up you choose.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.phase}
            href={c.href}
            className="group rounded-xl border border-border bg-card p-5 space-y-2 hover:shadow-md hover:border-brand/30 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-highlight">{c.phase}</p>
            <h3 className="font-semibold leading-snug group-hover:text-brand transition-colors">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </Link>
        ))}
      </div>
      <div>
        <Link href="/question-builder" className="text-sm font-medium text-highlight hover:underline">
          Open the Question Builder &rarr;
        </Link>
      </div>
    </section>
  );
}
