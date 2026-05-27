import Link from "next/link";
import { getAllPlays } from "@/lib/plays";
import { PlayGrid } from "@/components/PlayGrid";
import { QuickStart } from "@/components/QuickStart";
import { PlaysForRightNow } from "@/components/PlaysForRightNow";
import { YouAskedWeBuilt } from "@/components/YouAskedWeBuilt";

export default function HomePage() {
  const plays = getAllPlays();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00543C] via-[#006847] to-[#004530] text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20 space-y-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-green-200/80 text-sm font-medium tracking-wide uppercase">
              Academic Enrichment Services
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
              AI workflows for
              <br />
              medical students
            </h1>
            <p className="text-lg text-green-100/80 leading-relaxed">
              90 seconds to learn. 5 minutes to use. No long guides, no theory.
              Just specific, repeatable workflows built for the way you actually
              study.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/plays/first-ai-session"
              className="inline-flex items-center rounded-lg bg-[#F47321] hover:bg-[#d9641b] text-white px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Start your first AI session
            </Link>
            <Link
              href="/toolkit"
              className="inline-flex items-center rounded-lg bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 text-sm font-medium transition-colors border border-white/20"
            >
              View AI Toolkit
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-green-200/60">
            <span>{plays.length} Plays</span>
            <span>Free tools only</span>
            <span>Works with any LLM</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 space-y-12 pb-12">
        <QuickStart />
        <PlaysForRightNow />

        <YouAskedWeBuilt />

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">All Workflows</h2>
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
