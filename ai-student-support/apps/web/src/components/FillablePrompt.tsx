"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

/**
 * A prompt template whose [BRACKETED] placeholders become form fields.
 * The same placeholder text anywhere in the prompt shares one field.
 * Unfilled placeholders are left as-is so the copied prompt is still usable.
 */

const TOKEN = /\[([^\[\]\n]{2,80})\]/g;
const LONG_FIELD = /paste|notes|source|text|list|examples?|data|summary/i;

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
  description,
  prompt,
  defaultOpen = false,
}: {
  label: string;
  description?: string;
  prompt: string;
  defaultOpen?: boolean;
}) {
  const fields = useMemo(() => extractFields(prompt), [prompt]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(defaultOpen);

  const filled = fillPrompt(prompt, values);
  const remaining = extractFields(filled).length;
  const id = useMemo(() => `fp-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`, [label]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <h3 className="text-sm font-semibold">{label}</h3>
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
        <CopyButton text={filled} label="Copy" />
      </div>

      {fields.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`${id}-fields`}
            className="text-xs font-medium text-highlight hover:text-highlight-dark cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {open ? "Hide" : "Fill in"} {fields.length} {fields.length === 1 ? "blank" : "blanks"}
            {remaining > 0 && !open ? ` (${remaining} still empty)` : ""}
          </button>
          {open && (
            <div id={`${id}-fields`} className="mt-3 grid gap-3 sm:grid-cols-2">
              {fields.map((f, i) => {
                const fieldId = `${id}-f${i}`;
                const long = LONG_FIELD.test(f);
                return (
                  <div key={f} className={long ? "sm:col-span-2 space-y-1" : "space-y-1"}>
                    <label htmlFor={fieldId} className="text-xs font-medium text-foreground">
                      {toLabel(f)}
                    </label>
                    {long ? (
                      <textarea
                        id={fieldId}
                        rows={3}
                        value={values[f] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                      />
                    ) : (
                      <input
                        id={fieldId}
                        type="text"
                        value={values[f] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
                        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-muted/50 rounded-lg p-3">
        {filled}
      </pre>
    </div>
  );
}
