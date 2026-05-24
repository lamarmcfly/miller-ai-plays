"use client";

export function CommunitySubmitForm() {
  return (
    <section className="rounded-xl border border-border bg-muted/30 p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Share your AI workflow</h2>
        <p className="text-sm text-muted-foreground">
          Used AI in a way that helped you study? Share it with your classmates.
          The Council reviews all submissions for safety before publishing.
        </p>
      </div>

      <form
        action="https://tally.so/r/YOUR_FORM_ID"
        method="GET"
        target="_blank"
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Your cohort *</label>
            <select
              name="cohort"
              required
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
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
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              <option value="prompt">I'm sharing a prompt</option>
              <option value="question">I have a question</option>
              <option value="workflow-tip">I'm sharing a workflow tip</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            What exam or course is this for? *
          </label>
          <div className="flex flex-wrap gap-2">
            {["Step 1", "Step 2 CK", "Shelf", "OSCE", "Clerkship", "Coursework"].map(
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
            className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm"
          >
            <option value="">Select...</option>
            <option value="any-llm">Any LLM (Claude, ChatGPT, Copilot, etc.)</option>
            <option value="notebooklm">NotebookLM</option>
            <option value="other">Other</option>
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

        <button
          type="submit"
          className="rounded-md bg-[#00543C] hover:bg-[#003d2c] text-white px-6 py-2 text-sm font-medium transition-colors"
        >
          Submit for review
        </button>

        <p className="text-xs text-muted-foreground">
          Submissions are reviewed by the Miller AI Plays Council before
          publishing. By submitting, you confirm this describes a real use case
          and contains no patient identifying information or copyrighted content.
        </p>
      </form>
    </section>
  );
}
