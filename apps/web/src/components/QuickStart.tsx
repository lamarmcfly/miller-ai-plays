"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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

const phases = [
  { href: "/phase/1", label: "Phase 1", desc: "Classroom foundations" },
  { href: "/phase/2", label: "Phase 2", desc: "Clerkships + Step prep" },
  { href: "/phase/3", label: "Phase 3", desc: "Specialties + advanced" },
];

export function QuickStart() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="space-y-6">
      {/* Phase navigation */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">Find your phase</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {phases.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-xl border border-border p-4 hover:shadow-md hover:border-[#00543C]/30 transition-all text-center"
            >
              <p className="font-semibold text-sm text-[#00543C]">{p.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Experience-based routing */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight">
          Or start by experience level
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {experienceLevels.map((level, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`text-left rounded-xl border p-5 transition-all cursor-pointer ${
                selected === i
                  ? "border-[#00543C] bg-[#00543C]/5 shadow-sm ring-1 ring-[#00543C]/20"
                  : "border-border hover:border-[#00543C]/30 hover:bg-muted/30"
              }`}
            >
              <p className="font-semibold text-sm">{level.label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {level.description}
              </p>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="rounded-xl border border-[#00543C]/20 bg-[#00543C]/5 p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-sm font-semibold text-[#00543C]">
              Recommended for you:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {experienceLevels[selected].plays.map((play) => (
                <Link
                  key={play.slug}
                  href={`/plays/${play.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white border border-border p-3 hover:shadow-md hover:border-[#00543C]/30 transition-all"
                >
                  <span className="text-sm font-medium">{play.title}</span>
                  <Badge
                    variant="secondary"
                    className="shrink-0 text-[10px] bg-[#F47321]/10 text-[#F47321] border-0"
                  >
                    {play.tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
