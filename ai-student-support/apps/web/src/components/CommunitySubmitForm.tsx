"use client";

import { useState, type FormEvent } from "react";
import { buildIssueLink } from "@/lib/community-submit";

// Optional: set NEXT_PUBLIC_COMMUNITY_FORM_URL to send submissions to your own
// form endpoint (e.g., Tally). Without it, submissions open as a pre-filled
// GitHub issue on the project repo, so the form works with no setup.
const FORM_URL = process.env.NEXT_PUBLIC_COMMUNITY_FORM_URL;

const EXAM_CONTEXTS = ["Step 1", "Step 2 CK", "Step 3", "COMLEX", "Shelf", "OSCE", "Clerkship", "Coursework"];

export function CommunitySubmitForm() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ copied: boolean } | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (FORM_URL) return; // native submit to the configured endpoint
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const examContext = data.getAll("examContext").map(String);
    if (examContext.length === 0) {
      setError("Pick at least one exam or course.");
      return;
    }
    setError(null);

    const link = buildIssueLink({
      cohort: String(data.get("cohort") ?? ""),
      category: String(data.get("category") ?? ""),
      examContext,
      title: String(data.get("title") ?? ""),
      tool: String(data.get("tool") ?? ""),
      prompt: String(data.get("prompt") ?? ""),
      outcome: String(data.get("outcome") ?? ""),
      usefulness: String(data.get("usefulness") ?? ""),
    });

    // Open synchronously so the browser treats it as a user-initiated popup.
    window.open(link.url, "_blank", "noopener,noreferrer");
    if (link.bodyCopied) {
      navigator.clipboard?.writeText(link.fullBody).catch(() => {});
    }
    setSent({ copied: link.bodyCopied });
    form.reset();
  }

  return (
    <section className="rounded-xl border border-border bg-muted/30 p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Share your AI workflow</h2>
        <p className="text-sm text-muted-foreground">
          Used AI in a way that helped you study? Share it with other students.
          Maintainers review all submissions for safety before publishing.
        </p>
      </div>

      {sent && (
        <div role="status" className="rounded-md border border-brand bg-marker/40 p-3 text-sm space-y-1">
          <p className="font-medium">Almost done: finish on GitHub.</p>
          <p className="text-muted-foreground">
            {sent.copied
              ? "Your submission is on your clipboard. Paste it into the new issue, then press Submit new issue."
              : "We opened your submission as a new issue. Review it, then press Submit new issue."}{" "}
            A free GitHub account is needed. Maintainers read every submission before anything is published.
          </p>
        </div>
      )}

      <form
        {...(FORM_URL ? { action: FORM_URL, method: "GET", target: "_blank" } : {})}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Your cohort *</label>
            <select
              name="cohort"
              required
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              <option value="MS1">MS1</option>
              <option value="MS2">MS2</option>
              <option value="MS3">MS3</option>
              <option value="MS4">MS4</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Category *</label>
            <select
              name="category"
              required
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              <option value="prompt">I&apos;m sharing a prompt</option>
              <option value="question">I have a question</option>
              <option value="workflow-tip">I&apos;m sharing a workflow tip</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            What exam or course is this for? *
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAM_CONTEXTS.map(
              (ctx) => (
                <label key={ctx} className="flex items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    name="examContext"
                    value={ctx}
                    className="rounded"
                  />
                  {ctx}
                </label>
              )
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Title *</label>
          <input
            type="text"
            name="title"
            required
            placeholder='e.g., "How I use AI to prep for anatomy practicals"'
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            What AI tool did you use? *
          </label>
          <select
            name="tool"
            required
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
          >
            <option value="">Select...</option>
            <option value="Claude">Claude</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Gemini">Gemini</option>
            <option value="Copilot">Copilot</option>
            <option value="NotebookLM">NotebookLM</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Your prompt or workflow *
          </label>
          <textarea
            name="prompt"
            required
            rows={5}
            placeholder="Paste the prompt you used, or describe the steps you followed..."
            className="w-full rounded-md border border-border px-3 py-2 text-sm font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            What happened when you used it?
          </label>
          <textarea
            name="outcome"
            rows={3}
            placeholder="Describe the output and whether it helped..."
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            How useful was this for you?
          </label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="flex items-center gap-1 text-sm">
                <input type="radio" name="usefulness" value={n} />
                {n}
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">1 = not useful, 5 = extremely useful</p>
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="confirm" required className="mt-1 rounded" />
          <span>
            This describes a real use case, and contains no patient identifying information or licensed exam
            content. *
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-brand hover:bg-brand-dark text-white px-6 py-2 text-sm font-medium transition-colors"
        >
          Share your workflow
        </button>

        <p className="text-xs text-muted-foreground">
          Submissions are reviewed by the maintainers before publishing.{" "}
          {FORM_URL ? "" : "Your submission opens as a public GitHub issue, so leave out anything personal."}
        </p>
      </form>
    </section>
  );
}
