"use client";

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
      {options.map((tag) => {
        const on = selected.has(tag);
        return (
          <button
            key={tag}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(tag)}
            className={`inline-flex h-7 items-center rounded-sm border px-3 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              on
                ? "border-brand bg-brand text-white hover:bg-brand-dark"
                : "border-border bg-card hover:bg-muted"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
