"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const experienceLevels = [
  {
    label: "Never used AI",
    description: "I haven't tried any AI tool for studying yet",
    plays: [
      { slug: "first-ai-session", title: "Your First AI Study Session", tag: "Start here" },
      { slug: "lecture-compressor", title: "Lecture Notes to Anki Cards", tag: "Beginner" },
    ],
  },
  {
    label: "I've tried AI a few times",
    description: "I've used AI for basic questions but don't have a real workflow",
    plays: [
      { slug: "error-engine", title: "Turn Wrong Questions Into a Study Plan", tag: "High impact" },
      { slug: "deficit-tracker", title: "Track Weak Spots Across Tests", tag: "Score gains" },
      { slug: "concept-coach", title: "Socratic Tutor for Sticky Concepts", tag: "Deep learning" },
    ],
  },
  {
    label: "I'm comfortable with AI",
    description: "I use AI tools regularly and want advanced workflows",
    plays: [
      { slug: "osce-encounter-sim", title: "OSCE Encounter Simulation", tag: "Clinical" },
      { slug: "rounds-prep", title: "5-Minute Rounds Prep", tag: "Daily habit" },
      { slug: "clinical-note", title: "Clinical Note in Half the Time", tag: "Efficiency" },
      { slug: "research-speed-read", title: "Screen Papers in 2 Minutes", tag: "Research" },
    ],
  },
];

export function QuickStart() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="rounded-xl border border-border bg-gradient-to-b from-green-50/50 to-white p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">What's your AI experience?</h2>
        <p className="text-sm text-muted-foreground">
          Pick your level and we'll point you to the right Plays.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {experienceLevels.map((level, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`text-left rounded-lg border p-4 transition-all cursor-pointer ${
              selected === i
                ? "border-[#00543C] bg-green-50 shadow-sm"
                : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
            }`}
          >
            <p className="font-medium text-sm">{level.label}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {level.description}
            </p>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="pt-2 space-y-3">
          <p className="text-sm font-medium text-[#00543C]">
            Recommended for you:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {experienceLevels[selected].plays.map((play) => (
              <Link key={play.slug} href={`/plays/${play.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">{play.title}</span>
                    <Badge
                      variant="secondary"
                      className="shrink-0 bg-[#F47321]/10 text-[#F47321] border-0"
                    >
                      {play.tag}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
