import { CopyButton } from "./CopyButton";

/** The full prompt as copied: the Play's instructions followed by the faculty standard. */
export function PromptBlock({ prompt }: { prompt: string }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">The prompt</h2>
        <CopyButton text={prompt} />
      </div>
      <p className="text-xs text-muted-foreground">
        Includes the faculty content standard at the end. The copy button copies all of it; scroll the box to read it.
      </p>
      {/* Capped height keeps the rest of the page in reach; the region scrolls and takes keyboard focus. */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Full prompt text"
        className="max-h-[32rem] overflow-y-auto rounded-lg border border-border bg-muted/50 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <pre className="text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere] font-mono">{prompt}</pre>
      </div>
    </div>
  );
}
