"use client";

import { useEffect, useState } from "react";
import { communityMode } from "@/lib/community-mode";
import { newIssueUrl } from "@/lib/community-submit";

type Result = "worked" | "partly" | "didnt";

const options: { id: Result; label: string }[] = [
  { id: "worked", label: "It worked" },
  { id: "partly", label: "Partly" },
  { id: "didnt", label: "Didn't work" },
];

const KEY = "med-ai-plays:feedback:v1";

// Optional hosted feedback form used until the site's own intake is set up.
const FEEDBACK_FORM_URL = process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL;

function remembered(id: string): boolean {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    return typeof v === "object" && v !== null && id in v;
  } catch {
    return false;
  }
}

function remember(id: string, result: Result) {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
    window.localStorage.setItem(KEY, JSON.stringify({ ...(typeof v === "object" && v ? v : {}), [id]: result }));
  } catch {
    /* storage blocked: the thank-you still shows for this visit */
  }
}

/**
 * Anonymous "did it work?" feedback for a Play or a community post. Stored
 * without a name, email, or account. When the site's own intake is not
 * configured, falls back to the old pre-filled GitHub issue link.
 */
export function FeedbackPrompt({
  kind,
  targetId,
  title,
  legacyLabel,
}: {
  kind: "play" | "post";
  targetId: string;
  title: string;
  /** Link text used when feedback falls back to GitHub. */
  legacyLabel: string;
}) {
  const [choice, setChoice] = useState<Result | null>(null);
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [already, setAlready] = useState(false);

  useEffect(() => {
    // Browser-only state; read after mount to keep hydration consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAlready(remembered(`${kind}:${targetId}`));
  }, [kind, targetId]);

  if (communityMode !== "inline") {
    const label = kind === "play" ? "Play feedback" : "Community feedback";
    // A hosted feedback form (e.g., Tally) avoids needing a GitHub account.
    const url = FEEDBACK_FORM_URL
      ? `${FEEDBACK_FORM_URL}${FEEDBACK_FORM_URL.includes("?") ? "&" : "?"}${new URLSearchParams({ kind, target: targetId, title })}`
      : newIssueUrl(
          `[${label}] ${title}`,
          `About "${title}" (${targetId}):\n\n**What happened when you tried it?**\n\n`,
          kind === "play" ? "play-feedback" : "community-feedback"
        );
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline font-medium">
        {legacyLabel}
      </a>
    );
  }

  if (state === "done" || (already && state === "idle" && !choice)) {
    return <span className="text-sm text-muted-foreground">Thanks, your feedback was sent.</span>;
  }

  async function send() {
    if (!choice) return;
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, targetId, result: choice, note: note.trim() || undefined, website: "" }),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (res.ok && body?.ok) {
        remember(`${kind}:${targetId}`, choice);
        setState("done");
      } else {
        setError(body?.message ?? "We could not send that. Please try again.");
        setState("idle");
      }
    } catch {
      setError("We could not reach the site. Please try again.");
      setState("idle");
    }
  }

  return (
    <div className="space-y-2 text-sm">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={`Did "${title}" work for you?`}>
        <span className="font-medium">Did it work for you?</span>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={choice === o.id}
            onClick={() => setChoice(o.id)}
            className={`border px-2 py-1 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              choice === o.id ? "border-brand bg-marker" : "border-border hover:border-brand"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {choice && (
        <div className="space-y-2">
          <label className="block text-xs text-muted-foreground" htmlFor={`fb-${kind}-${targetId}`}>
            What happened? Optional. No patient information, names, or emails.
          </label>
          <textarea
            id={`fb-${kind}-${targetId}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
            rows={2}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={send}
            disabled={state === "sending"}
            className="bg-brand text-white hover:bg-brand-dark px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60 cursor-pointer"
          >
            {state === "sending" ? "Sending..." : "Send feedback"}
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
