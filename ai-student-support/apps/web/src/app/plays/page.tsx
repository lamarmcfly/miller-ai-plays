import type { Metadata } from "next";
import Link from "next/link";
import { getAllPlays } from "@/lib/plays";
import { stageLinks } from "@/lib/nav";
import { PlayGrid } from "@/components/PlayGrid";

export const metadata: Metadata = {
  title: "All Plays",
  description:
    "Every Med AI Plays workflow in one place: copy-paste AI prompts for lectures, Qbanks, shelf exams, clerkships, and residency prep.",
};

const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 } as const;
// The first Play a brand-new user should see.
const PINNED = "first-ai-session";

export default function PlaysPage() {
  const plays = getAllPlays().sort((a, b) => {
    if (a.slug === PINNED) return -1;
    if (b.slug === PINNED) return 1;
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty] || a.title.localeCompare(b.title);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <header className="space-y-3 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Library</p>
        <h1 className="text-4xl font-medium leading-tight">All Plays</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A Play is a ready-made AI workflow for one study task: a prompt to copy, plus how to use it. Each takes about
          five minutes to learn and works in any AI tool.
        </p>
      </header>

      <section aria-labelledby="stage-heading" className="space-y-3">
        <h2 id="stage-heading" className="text-xl font-semibold">
          Browse by stage
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {stageLinks.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group block h-full border border-border p-4 transition-colors hover:border-brand hover:bg-marker/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="block font-semibold group-hover:underline decoration-marker decoration-4 underline-offset-4">
                  {s.label} &rarr;
                </span>
                <span className="block text-sm text-muted-foreground">{s.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Not sure where to begin?{" "}
          <Link href="/start" className="font-medium text-highlight hover:underline">
            Answer three questions for a personal path
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="all-heading" className="space-y-4">
        <h2 id="all-heading" className="text-xl font-semibold">
          Search and filter
        </h2>
        <PlayGrid plays={plays} />
      </section>
    </div>
  );
}
