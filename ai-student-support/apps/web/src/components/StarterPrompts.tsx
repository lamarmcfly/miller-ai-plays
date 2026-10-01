"use client";

import { useState } from "react";
import { FillablePrompt } from "./FillablePrompt";

interface StarterPrompt {
  label: string;
  prompt: string;
}

export function StarterPrompts({ prompts }: { prompts: StarterPrompt[] }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-2 text-sm font-medium text-highlight hover:text-highlight-dark transition-colors cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span
          aria-hidden="true"
          className="transition-transform inline-block"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          &#9654;
        </span>
        {open ? "Hide starter prompts" : "New to this? Try a starter prompt instead"}
      </button>

      {open && (
        <div className="space-y-3 pl-4 border-l-2 border-border">
          <p className="text-xs text-muted-foreground">
            Simpler prompts you can paste straight into a chat. Fill in the
            blanks below, or just copy and replace the [BRACKETS] yourself.
          </p>
          {prompts.map((sp) => (
            <FillablePrompt key={sp.label} label={sp.label} prompt={sp.prompt} defaultOpen />
          ))}
        </div>
      )}
    </section>
  );
}
