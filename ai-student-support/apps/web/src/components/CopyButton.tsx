"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers/contexts where the async clipboard API is blocked.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyButton({
  text,
  label = "Copy Prompt",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    const ok = await copyText(text);
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <Button
      onClick={handleCopy}
      variant={state === "copied" ? "secondary" : "default"}
      className={
        state === "idle"
          ? `bg-brand hover:bg-brand-light text-white ${className ?? ""}`
          : className
      }
    >
      <span aria-live="polite">
        {state === "copied" ? "Copied!" : state === "failed" ? "Copy failed - select the text" : label}
      </span>
    </Button>
  );
}
