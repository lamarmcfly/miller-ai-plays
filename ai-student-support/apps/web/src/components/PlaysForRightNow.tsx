"use client";

import Link from "next/link";

interface Item {
  title: string;
  slug?: string;
  href?: string;
}

const scenarios: { label: string; color: string; plays: Item[] }[] = [
  {
    label: "I need practice questions on a specific topic",
    color: "border-border bg-muted",
    plays: [
      { href: "/question-builder", title: "Question Builder" },
      { slug: "custom-practice-questions", title: "Custom Practice Questions" },
    ],
  },
  {
    label: "I bombed a UWorld block",
    color: "border-border bg-muted",
    plays: [
      { slug: "error-engine", title: "Error Engine" },
      { slug: "deficit-tracker", title: "Deficit Tracker" },
    ],
  },
  {
    label: "I have a shelf in 2 weeks",
    color: "border-border bg-muted",
    plays: [
      { slug: "shelf-review-notebook", title: "Shelf Review Notebook" },
      { slug: "lecture-compressor", title: "Lecture Compressor" },
    ],
  },
  {
    label: "I'm starting a new clerkship",
    color: "border-border bg-muted",
    plays: [
      { slug: "osce-encounter-sim", title: "OSCE Encounter Sim" },
      { slug: "rounds-prep", title: "Rounds Prep" },
    ],
  },
  {
    label: "I'm forgetting what I studied",
    color: "border-border bg-muted",
    plays: [
      { href: "/question-builder?exam=flashcards", title: "Flashcards from my notes" },
      { href: "/prompts", title: "Spaced-review calendar" },
    ],
  },
  {
    label: "I just sat through a lecture",
    color: "border-border bg-muted",
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
          Pick what matches your situation and we&apos;ll point you to the right Play.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-4 space-y-3 ${s.color}`}
          >
            <p className="text-sm font-semibold leading-snug">
              {s.label}
            </p>
            <div className="flex flex-col gap-1.5">
              {s.plays.map((p) => (
                <Link
                  key={p.href ?? p.slug}
                  href={p.href ?? `/plays/${p.slug}`}
                  className="text-xs font-medium text-brand hover:text-highlight transition-colors"
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
