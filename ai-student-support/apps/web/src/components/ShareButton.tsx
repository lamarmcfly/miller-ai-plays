"use client";

import { useState } from "react";

/**
 * Shares a link with the native share sheet on phones, and copies it
 * elsewhere. `path` is site-relative so the link always points at this site.
 */
export function ShareButton({
  title,
  text,
  path,
  label = "Share",
  className,
}: {
  title: string;
  text: string;
  path: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        // otherwise fall through to copying the link
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <button
      type="button"
      onClick={share}
      className={
        className ??
        "inline-flex items-center border border-brand px-4 py-2 text-sm font-medium hover:bg-marker/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      }
    >
      <span aria-live="polite">
        {state === "copied" ? "Link copied" : state === "failed" ? "Copy the address bar link" : label}
      </span>
    </button>
  );
}
