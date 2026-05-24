"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyButton({
  text,
  label = "Copy Prompt",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? "secondary" : "default"}
      className={
        copied
          ? ""
          : "bg-[#F47321] hover:bg-[#d9641b] text-white"
      }
    >
      {copied ? "Copied!" : label}
    </Button>
  );
}
