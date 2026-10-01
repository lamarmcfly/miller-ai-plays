"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FillablePrompt } from "./FillablePrompt";
import { promptCategories, promptLibrary } from "@/lib/prompt-library";
import { phases, type PhaseId } from "@/lib/question-spec";

const chipClass =
  "border border-border bg-card px-3 py-1 text-xs font-medium transition-colors hover:border-brand hover:bg-marker/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer aria-pressed:border-brand aria-pressed:bg-marker";

export function PromptLibrary() {
  const [phase, setPhase] = useState<PhaseId | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return promptLibrary.filter((p) => {
      const inPhase = phase === "all" || p.phases.includes(phase);
      const inQuery =
        !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q);
      return inPhase && inQuery;
    });
  }, [phase, query]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="prompt-search" className="text-sm font-medium">
            Search prompts
          </label>
          <input
            id="prompt-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., schedule, flashcards, ethics"
            className="w-full max-w-sm rounded-md border border-border bg-card px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by phase">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phase</span>
          <button type="button" aria-pressed={phase === "all"} onClick={() => setPhase("all")} className={chipClass}>
            All
          </button>
          {phases.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={phase === p.id}
              onClick={() => setPhase(p.id)}
              className={chipClass}
            >
              {p.label}: {p.short}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Want questions tuned to a specific exam, difficulty, and your weak spots? Use the{" "}
          <Link href="/question-builder" className="text-highlight hover:underline font-medium">
            Question Builder
          </Link>
          .
        </p>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No prompts match. Try a different search or phase.</p>
      )}

      {promptCategories.map((cat) => {
        const items = filtered.filter((p) => p.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} className="space-y-3" aria-labelledby={`cat-${cat.id}`}>
            <div className="space-y-0.5">
              <h2 id={`cat-${cat.id}`} className="text-xl font-semibold">
                {cat.label}
              </h2>
              <p className="text-sm text-muted-foreground">{cat.blurb}</p>
            </div>
            <div className="space-y-3">
              {items.map((p) => (
                <FillablePrompt key={p.id} label={p.title} description={p.description} prompt={p.prompt} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
