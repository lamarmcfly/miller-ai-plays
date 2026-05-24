"use client";

import Link from "next/link";

const scenarios = [
  {
    icon: "\uD83D\uDCA5",
    label: "I bombed a UWorld block",
    color: "border-red-200 bg-red-50/50",
    plays: [
      { slug: "error-engine", title: "Error Engine" },
      { slug: "deficit-tracker", title: "Deficit Tracker" },
    ],
  },
  {
    icon: "\uD83D\uDCC5",
    label: "I have a shelf in 2 weeks",
    color: "border-amber-200 bg-amber-50/50",
    plays: [
      { slug: "shelf-review-notebook", title: "Shelf Review Notebook" },
      { slug: "lecture-compressor", title: "Lecture Compressor" },
    ],
  },
  {
    icon: "\uD83C\uDFE5",
    label: "I'm starting a new clerkship",
    color: "border-blue-200 bg-blue-50/50",
    plays: [
      { slug: "osce-encounter-sim", title: "OSCE Encounter Sim" },
      { slug: "rounds-prep", title: "Rounds Prep" },
    ],
  },
  {
    icon: "\uD83C\uDF93",
    label: "I just sat through a lecture",
    color: "border-green-200 bg-green-50/50",
    plays: [
      { slug: "lecture-compressor", title: "Lecture Compressor" },
      { slug: "first-ai-session", title: "First AI Session" },
    ],
  },
];

export function PlaysForRightNow() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">Plays for right now</h2>
        <p className="text-sm text-muted-foreground">
          Pick what matches your situation. We'll point you to the right workflow.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scenarios.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-4 space-y-3 ${s.color}`}
          >
            <p className="text-sm font-semibold leading-snug">
              <span className="mr-1.5 text-base">{s.icon}</span>
              {s.label}
            </p>
            <div className="flex flex-col gap-1.5">
              {s.plays.map((p) => (
                <Link
                  key={p.slug}
                  href={`/plays/${p.slug}`}
                  className="text-xs font-medium text-[#00543C] hover:text-[#F47321] transition-colors"
                >
                  {p.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
