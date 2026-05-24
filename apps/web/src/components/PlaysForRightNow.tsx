"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const scenarios = [
  {
    emoji: "\uD83D\uDCA5",
    label: "I bombed a UWorld block",
    plays: [
      { slug: "error-engine", title: "Error Engine" },
      { slug: "deficit-tracker", title: "Deficit Tracker" },
    ],
  },
  {
    emoji: "\uD83D\uDCC5",
    label: "I have a shelf in 2 weeks",
    plays: [
      { slug: "shelf-review-notebook", title: "Shelf Review Notebook" },
      { slug: "lecture-compressor", title: "Lecture Compressor" },
    ],
  },
  {
    emoji: "\uD83C\uDFE5",
    label: "I'm starting a new clerkship",
    plays: [
      { slug: "osce-encounter-sim", title: "OSCE Encounter Sim" },
      { slug: "rounds-prep", title: "Rounds Prep" },
    ],
  },
  {
    emoji: "\uD83C\uDF93",
    label: "I just sat through a lecture",
    plays: [
      { slug: "lecture-compressor", title: "Lecture Compressor" },
      { slug: "first-ai-session", title: "First AI Session" },
    ],
  },
];

export function PlaysForRightNow() {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Plays for right now</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scenarios.map((s) => (
          <Card
            key={s.label}
            className="border-border hover:border-muted-foreground/30 transition-colors"
          >
            <CardContent className="p-4 space-y-2">
              <p className="text-sm font-medium">
                <span className="mr-1.5">{s.emoji}</span>
                {s.label}
              </p>
              <div className="flex flex-col gap-1">
                {s.plays.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/plays/${p.slug}`}
                    className="text-xs text-[#F47321] hover:underline"
                  >
                    {p.title} &rarr;
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
