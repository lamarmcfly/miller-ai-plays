"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { buildIssueLink } from "@/lib/community-submit";
import { communityMode, FORM_URL } from "@/lib/community-mode";
import { EXAM_CONTEXTS } from "@/lib/community-intake";

// Three ways to collect submissions (see lib/community-mode.ts): the site's own
// anonymous API ("inline"), a hosted form such as Tally ("form"), or a
// pre-filled GitHub issue ("github", needs a GitHub account).
const inline = communityMode === "inline";

export function CommunitySubmitForm() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ copied: boolean } | null>(null);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function submitInline(form: HTMLFormElement, data: FormData, examContext: string[]) {
    setSubmitting(true);
    try {
      const usefulness = Number(data.get("usefulness"));
      const res = await fetch("/api/community/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cohort: data.get("cohort"),
          category: data.get("category"),
          examContext,
          title: data.get("title"),
          tool: data.get("tool"),
          prompt: data.get("prompt"),
          outcome: data.get("outcome") ?? "",
          usefulness: usefulness >= 1 && usefulness <= 5 ? usefulness : undefined,
          confirm: data.get("confirm") === "on",
          website: data.get("website") ?? "",
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (res.ok && body?.ok) {
        setSaved(true);
        form.reset();
        openedAt.current = Date.now();
      } else {
        setError(body?.message ?? "We could not send that. Please try again.");
      }
    } catch {
      setError("We could not reach the site. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (communityMode === "form") return; // native submit to the configured endpoint
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const examContext = data.getAll("examContext").map(String);
    if (examContext.length === 0) {
      setError("Pick at least one exam or course.");
      return;
    }
    setError(null);
    setSaved(false);

    if (inline) {
      void submitInline(form, data, examContext);
      return;
    }

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

      {saved && (
        <div role="status" className="rounded-md border border-brand bg-marker/40 p-3 text-sm space-y-1">
          <p className="font-medium">Thanks, your workflow was sent.</p>
          <p className="text-muted-foreground">
            No account needed. Maintainers read every submission before anything is published.
          </p>
        </div>
      )}

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
        {...(communityMode === "form" && FORM_URL ? { action: FORM_URL, method: "GET", target: "_blank" } : {})}
        onSubmit={handleSubmit}
        className="relative space-y-4"
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

        {inline && (
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Leave this field empty
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
        )}

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
          disabled={submitting}
          className="rounded-md bg-brand hover:bg-brand-dark text-white px-6 py-2 text-sm font-medium transition-colors disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Share your workflow"}
        </button>

        <p className="text-xs text-muted-foreground">
          Submissions are reviewed by the maintainers before publishing.{" "}
          {inline
            ? "No account, name, or email is needed or stored with your submission."
            : communityMode === "form"
              ? ""
              : "Your submission opens as a public GitHub issue, so leave out anything personal."}
        </p>
      </form>
    </section>
  );
}
