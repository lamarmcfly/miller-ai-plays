"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

/**
 * A prompt template whose [BRACKETED] placeholders become form fields.
 * The same placeholder text anywhere in the prompt shares one field.
 * Unfilled placeholders are left as-is so the copied prompt is still usable.
 * `appendix` (the faculty standard) is added to what is copied and shown below.
 */

const TOKEN = /\[([^\[\]\n]{2,80})\]/g;
const LONG_FIELD = /paste|notes|source|passage|text|list|draft|objectives|question|pearl|mistake|material/i;

export function extractFields(template: string): string[] {
  const seen = new Set<string>();
  for (const m of template.matchAll(TOKEN)) seen.add(m[1]);
  return [...seen];
}

export function fillPrompt(template: string, values: Record<string, string>): string {
  return template.replace(TOKEN, (whole, key: string) => {
    const v = values[key]?.trim();
    return v ? v : whole;
  });
}

function toLabel(token: string): string {
  const t = token.replace(/\s+/g, " ").trim();
  return t.charAt(0) + t.slice(1).toLowerCase();
}

export function FillablePrompt({
  label,
  prompt,
  appendix,
}: {
  label: string;
  prompt: string;
  appendix?: string;
}) {
  const id = useId();
  const fields = useMemo(() => extractFields(prompt), [prompt]);
  const [values, setValues] = useState<Record<string, string>>({});

  const filled = fillPrompt(prompt, values);
  const remaining = extractFields(filled).length;
  const copied = appendix ? `${filled}\n\n${appendix}` : filled;

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <h3 className="text-sm font-semibold">{label}</h3>
          <p className="text-xs text-muted-foreground">
            {remaining > 0
              ? `Fill in the ${remaining === 1 ? "blank" : `${remaining} blanks`}, or copy and replace the [BRACKETS] yourself.`
              : "All blanks filled. Ready to copy."}
          </p>
        </div>
        <CopyButton text={copied} label="Copy" />
      </div>

      {fields.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((f, i) => {
            const fieldId = `${id}-f${i}`;
            const long = LONG_FIELD.test(f);
            const common = {
              id: fieldId,
              value: values[f] ?? "",
              className:
                "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
            };
            return (
              <div key={f} className={long ? "sm:col-span-2 space-y-1" : "space-y-1"}>
                <label htmlFor={fieldId} className="text-xs font-medium text-foreground">
                  {toLabel(f)}
                </label>
                {long ? (
                  <textarea
                    {...common}
                    rows={4}
                    onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                  />
                ) : (
                  <input
                    {...common}
                    type="text"
                    onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <pre className="text-xs text-muted-foreground whitespace-pre-wrap [overflow-wrap:anywhere] font-mono leading-relaxed bg-muted/50 rounded-lg p-3">
        {filled}
      </pre>
      {appendix && (
        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer font-medium text-highlight hover:text-highlight-dark">
            Faculty content standard (added to what you copy)
          </summary>
          <pre className="mt-2 whitespace-pre-wrap [overflow-wrap:anywhere] font-mono leading-relaxed bg-muted/50 rounded-lg p-3">{appendix}</pre>
        </details>
      )}
    </div>
  );
}
