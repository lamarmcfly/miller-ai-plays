"use client";

import { CopyButton } from "./CopyButton";

export function PromptBlock({ prompt }: { prompt: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">The Prompt</h2>
        <CopyButton text={prompt} />
      </div>
      <div className="relative rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
          {prompt}
        </pre>
      </div>
    </div>
  );
}
