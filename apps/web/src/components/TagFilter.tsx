"use client";

import { Badge } from "@/components/ui/badge";

export function TagFilter({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((tag) => (
        <Badge
          key={tag}
          variant={selected.has(tag) ? "default" : "outline"}
          className={`cursor-pointer transition-colors ${
            selected.has(tag)
              ? "bg-[#00543C] hover:bg-[#003d2c] text-white"
              : "hover:bg-muted"
          }`}
          onClick={() => onToggle(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
