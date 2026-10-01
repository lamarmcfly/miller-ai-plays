import Link from "next/link";
import { getAllPlays } from "@/lib/plays";
import { PlayGrid } from "@/components/PlayGrid";
import { QuickStart } from "@/components/QuickStart";
import { PlaysForRightNow } from "@/components/PlaysForRightNow";
import { StudyProblems } from "@/components/StudyProblems";
import { PracticeQuestionsTeaser } from "@/components/PracticeQuestionsTeaser";

export default function HomePage() {
  const plays = getAllPlays();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="border-b border-brand">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              For medical students at any school
            </p>
            <h1 className="text-5xl sm:text-6xl font-medium leading-[1.02]">
              Practice questions
              <br />
              that read like the{" "}
              <span className="italic bg-marker px-1.5 -mx-1">real exam.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Pick your exam, your phase, and the topic you keep missing. Get a
              prompt that makes any AI tool write original, exam-realistic
              questions. Plus short, copy-paste study workflows you can learn in
              90 seconds.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <Link
                href="/question-builder"
                className="inline-flex items-center bg-brand text-white hover:bg-brand-light px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Build practice questions
              </Link>
              <Link
                href="/plays/first-ai-session"
                className="text-sm font-medium underline decoration-marker decoration-4 underline-offset-[6px] hover:bg-marker/50"
              >
                or start your first AI session
              </Link>
            </div>
            <p className="font-mono text-xs text-muted-foreground pt-2">
              {plays.length} Plays &middot; any AI tool &middot; free &middot; no account
            </p>
          </div>

          <figure aria-label="Sample practice question" className="space-y-3">
            <div className="border border-brand bg-card p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>Question 1 of 10</span>
                <span>Phase 2 &middot; foundational</span>
              </div>
              <p className="text-[15px] leading-relaxed">
                A 24-year-old woman presents with 3 days of dysuria and urinary frequency. She has no fever or flank
                pain. Temperature is 37.1&deg;C (98.8&deg;F). Urinalysis is positive for leukocyte esterase and
                nitrites. Which of the following is the most likely causal organism?
              </p>
              <ol className="space-y-1.5 text-[15px]">
                {[
                  ["A", "Enterococcus faecalis"],
                  ["B", "Escherichia coli"],
                  ["C", "Klebsiella pneumoniae"],
                  ["D", "Proteus mirabilis"],
                  ["E", "Staphylococcus saprophyticus"],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className={`flex gap-3 px-2 py-1 -mx-2 ${k === "B" ? "bg-marker" : ""}`}
                  >
                    <span className="font-mono text-muted-foreground w-4">{k}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ol>
            </div>
            <figcaption className="text-xs text-muted-foreground">
              Illustrative sample. The Question Builder asks for stems like this: no named diagnosis, one clear lead-in,
              five homogeneous options, and a reason each wrong answer tempts.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 space-y-12 pb-12">
        <QuickStart />
        <PracticeQuestionsTeaser />
        <PlaysForRightNow />

        <StudyProblems />

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">All Plays</h2>
            <p className="text-sm text-muted-foreground">
              Browse the full library. Filter by year, audience, or search by
              keyword.
            </p>
          </div>
          <PlayGrid plays={plays} />
        </section>
      </div>
    </div>
  );
}
