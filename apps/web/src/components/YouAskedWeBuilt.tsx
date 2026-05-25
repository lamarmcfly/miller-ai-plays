"use client";

import Link from "next/link";

const feedbackItems = [
  {
    ask: "Students wanted a way to track weak spots across multiple practice tests, not just one block at a time.",
    built: "Deficit Tracker",
    slug: "deficit-tracker",
  },
  {
    ask: "Phase 2 students needed a faster way to write clinical notes during clerkships.",
    built: "Clinical Note Writer",
    slug: "clinical-note",
  },
  {
    ask: "Students asked for a way to prep for attending questions before rounds.",
    built: "Rounds Prep",
    slug: "rounds-prep",
  },
  {
    ask: "Phase 1 students wanted a zero-setup starting point for using AI to study.",
    built: "First AI Study Session",
    slug: "first-ai-session",
  },
];

export function YouAskedWeBuilt() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">
          You asked. We built.
        </h2>
        <p className="text-sm text-muted-foreground">
          These workflows came directly from student feedback and requests.
          Have an idea?{" "}
          <Link href="/community" className="text-[#F47321] hover:underline">
            Share it on the Community Board
          </Link>
          .
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {feedbackItems.map((item) => (
          <Link key={item.slug} href={`/plays/${item.slug}`}>
            <div className="rounded-xl border border-border p-4 hover:shadow-md hover:border-[#00543C]/30 transition-all cursor-pointer h-full space-y-2">
              <p className="text-sm text-muted-foreground italic">
                &ldquo;{item.ask}&rdquo;
              </p>
              <p className="text-sm font-semibold text-[#00543C]">
                Built: {item.built}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
