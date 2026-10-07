"use client";

import { trackUsage } from "@/lib/analytics";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => { trackUsage("print_requested"); window.print(); }}
      className="inline-flex items-center bg-brand text-white hover:bg-brand-light px-4 py-2 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      Print or save as PDF
    </button>
  );
}
