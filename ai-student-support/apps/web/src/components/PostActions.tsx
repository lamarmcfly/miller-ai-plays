"use client";

import { useEffect, useState } from "react";
import { newIssueUrl } from "@/lib/community-submit";

const KEY = "med-ai-plays:tried-posts:v1";

function readTried(): string[] {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * "I tried this" is saved on this device only (no accounts, no tracking), so
 * students can keep their own list of what they've tested. Real feedback goes
 * to the maintainers through a pre-filled GitHub issue.
 */
export function PostActions({ id, title }: { id: string; title: string }) {
  const [tried, setTried] = useState(false);

  useEffect(() => {
    // Browser-only state; read after mount to keep hydration consistent.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTried(readTried().includes(id));
  }, [id]);

  function toggle() {
    const current = readTried();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: the button still reflects this visit */
    }
    setTried(next.includes(id));
  }

  const reportUrl = newIssueUrl(
    `[Community feedback] ${title}`,
    `About the post "${title}" (${id}):\n\n**What happened when you tried it?**\n\n`,
    "community-feedback"
  );

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={tried}
        className={`border px-2 py-1 font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
          tried ? "border-brand bg-marker" : "border-border hover:border-brand"
        }`}
      >
        {tried ? "Tried it (saved on this device)" : "I tried this"}
      </button>
      <a
        href={reportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-highlight hover:underline"
      >
        Tell us how it went
      </a>
    </div>
  );
}
