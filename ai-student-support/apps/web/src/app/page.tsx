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
      <section className="bg-gradient-to-br from-brand via-brand-light to-brand-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 space-y-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-indigo-200/90 text-sm font-medium tracking-wide uppercase">
              For medical students at any school
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
              AI workflows for
              <br />
              medical students
            </h1>
            <p className="text-lg text-indigo-100/90 leading-relaxed">
              90 seconds to learn. 5 minutes to use. Specific, repeatable
              workflows and custom practice questions built for the way you
              actually study.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/question-builder"
              className="inline-flex items-center rounded-lg bg-white text-brand hover:bg-indigo-50 px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Build practice questions
            </Link>
            <Link
              href="/plays/first-ai-session"
              className="inline-flex items-center rounded-lg bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 text-sm font-medium transition-colors border border-white/20"
            >
              Start your first AI session
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 pt-4 text-sm text-indigo-100/80">
            <span>{plays.length} Plays</span>
            <span>Free tools only</span>
            <span>Works with any AI tool</span>
            <span>Any school, any phase</span>
          </div>
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
