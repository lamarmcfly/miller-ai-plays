"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { TagFilter } from "./TagFilter";
import { PlayCard } from "./PlayCard";
import type { Play } from "@/lib/schema";
import { audienceLabels } from "@/lib/schema";

export function PlayGrid({ plays }: { plays: Play[] }) {
  const [search, setSearch] = useState("");
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [selectedAudience, setSelectedAudience] = useState<Set<string>>(
    new Set()
  );

  const allYears = useMemo(
    () => [...new Set(plays.flatMap((p) => p.year))].sort(),
    [plays]
  );
  const allAudience = useMemo(
    () => [...new Set(plays.flatMap((p) => p.audience))],
    [plays]
  );

  const filtered = useMemo(() => {
    return plays.filter((play) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        play.title.toLowerCase().includes(q) ||
        play.hook.toLowerCase().includes(q) ||
        play.oneLiner.toLowerCase().includes(q) ||
        play.tags.some((t) => t.toLowerCase().includes(q));

      const matchesYear =
        selectedYears.size === 0 ||
        play.year.some((y) => selectedYears.has(y));

      const matchesAudience =
        selectedAudience.size === 0 ||
        play.audience.some((a) => selectedAudience.has(a));

      return matchesSearch && matchesYear && matchesAudience;
    });
  }, [plays, search, selectedYears, selectedAudience]);

  function toggleYear(y: string) {
    setSelectedYears((prev) => {
      const next = new Set(prev);
      if (next.has(y)) next.delete(y);
      else next.add(y);
      return next;
    });
  }

  function toggleAudience(a: string) {
    setSelectedAudience((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <SearchBar value={search} onChange={setSearch} />

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Year
        </p>
        <TagFilter
          options={allYears}
          selected={selectedYears}
          onToggle={toggleYear}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Audience
        </p>
        <TagFilter
          options={allAudience.map((a) => audienceLabels[a] || a)}
          selected={
            new Set(
              [...selectedAudience].map((a) => audienceLabels[a] || a)
            )
          }
          onToggle={(label) => {
            const key = Object.entries(audienceLabels).find(
              ([, v]) => v === label
            )?.[0];
            if (key) toggleAudience(key);
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No plays match your filters.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((play) => (
            <PlayCard key={play.slug} play={play} />
          ))}
        </div>
      )}
    </div>
  );
}
