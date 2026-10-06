"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type SearchItem = {
  href: string;
  title: string;
  kind: "Play" | "Prompt" | "Topic" | "Community" | "Page";
  text: string;
};

// Students search with their own words; map common ones to what the library says.
const synonyms: Record<string, string[]> = {
  flashcard: ["anki", "cloze", "cards", "spaced"],
  card: ["anki", "flashcard", "cloze"],
  quiz: ["questions", "practice", "drill"],
  question: ["practice", "qbank", "quiz"],
  schedule: ["plan", "calendar", "countdown", "planner"],
  plan: ["schedule", "calendar", "planner"],
  weak: ["deficit", "pattern", "gaps"],
  wrong: ["error", "missed", "errors"],
  note: ["notes", "clinical-note", "soap"],
  stat: ["biostatistics", "epidemiology", "sensitivity"],
  residency: ["eras", "personal statement", "interview"],
  ai: ["verify", "llm", "chatgpt", "claude"],
};

function variants(term: string): string[] {
  const stem = term.length > 4 ? term.replace(/(es|s)$/, "") : term;
  return [...new Set([term, stem, ...(synonyms[stem] ?? synonyms[term] ?? [])])];
}

function score(item: SearchItem, terms: string[]): number {
  const title = item.title.toLowerCase();
  const text = item.text.toLowerCase();
  let total = 0;
  for (const t of terms) {
    let best = 0;
    variants(t).forEach((v, i) => {
      // exact word first, synonyms count for less
      const weight = i === 0 ? 1 : 0.5;
      const s = ((title.includes(v) ? 3 : 0) + (text.includes(v) ? 1 : 0)) * weight;
      if (s > best) best = s;
    });
    if (best === 0) return 0; // every word must match somewhere
    total += best;
  }
  return total;
}

export function SiteSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const terms = useMemo(
    () => q.toLowerCase().split(/\s+/).filter((t) => t.length > 1),
    [q]
  );

  const results = useMemo(() => {
    if (terms.length === 0) return [];
    return items
      .map((item) => ({ item, s: score(item, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map((r) => r.item);
  }, [items, terms]);

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="site-search" className="sr-only">
          Search Plays, prompts, topics, and community posts
        </label>
        <input
          id="site-search"
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try: flashcards, step 1, pharmacology, OSCE, schedule"
          className="w-full rounded-md border border-border bg-card px-4 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
        />
      </div>

      <div aria-live="polite" className="text-sm text-muted-foreground">
        {terms.length === 0
          ? `Searching ${items.length} Plays, prompts, topics, and posts.`
          : `${results.length} result${results.length === 1 ? "" : "s"}`}
      </div>

      {terms.length > 0 && results.length === 0 && (
        <div className="border border-dashed border-border p-5 text-sm space-y-2">
          <p>Nothing matched. Try a shorter or different word.</p>
          <p className="text-muted-foreground">
            Still stuck?{" "}
            <Link href="/start" className="text-highlight hover:underline font-medium">
              Get a personal path
            </Link>{" "}
            or{" "}
            <Link href="/question-builder" className="text-highlight hover:underline font-medium">
              build practice questions
            </Link>
            .
          </p>
        </div>
      )}

      <ul className="space-y-2">
        {results.map((r) => (
          <li key={r.href + r.title}>
            <Link
              href={r.href}
              className="block border border-border bg-card p-3 transition-colors hover:border-brand hover:bg-marker/30"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-semibold leading-snug">{r.title}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {r.kind}
                </span>
              </span>
              <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">{r.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
