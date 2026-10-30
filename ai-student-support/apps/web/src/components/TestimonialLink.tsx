import type { ReactNode } from "react";

// Site-wide "how has this helped you?" link. Opens the hosted feedback form
// (NEXT_PUBLIC_FEEDBACK_FORM_URL) with kind=site so testimonials land with the
// rest of the feedback. Hidden until that form is configured.

const FEEDBACK_FORM_URL = process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL;

export function testimonialUrl(): string | null {
  if (!FEEDBACK_FORM_URL) return null;
  const params = new URLSearchParams({ kind: "site", target: "med-ai-plays", title: "Med AI Plays" });
  return `${FEEDBACK_FORM_URL}${FEEDBACK_FORM_URL.includes("?") ? "&" : "?"}${params}`;
}

export function TestimonialLink({ className, children }: { className?: string; children: ReactNode }) {
  const url = testimonialUrl();
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
