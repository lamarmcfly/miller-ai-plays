"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

interface StarterPrompt {
  label: string;
  prompt: string;
}

export function StarterPrompts({ prompts }: { prompts: StarterPrompt[] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-[#F47321] hover:text-[#d9641b] transition-colors cursor-pointer"
      >
        <span
          className="transition-transform inline-block"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          &#9654;
        </span>
        {open ? "Hide starter prompts" : "New to this? Try a starter prompt instead"}
      </button>

      {open && (
        <div className="space-y-3 pl-4 border-l-2 border-[#F47321]/20">
          <p className="text-xs text-muted-foreground">
            These are simpler prompts you can paste directly into a chat - no
            Project setup needed. Just replace the [BRACKETS] with your info.
          </p>
          {prompts.map((sp, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-white p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{sp.label}</span>
                <CopyButton text={sp.prompt} label="Copy" />
              </div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {sp.prompt}
              </pre>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
