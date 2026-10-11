const steps = [
  {
    title: "Open your school's approved AI tool",
    body: "Often Microsoft Copilot or another tool you sign in to with your school account. Start a new chat.",
  },
  { title: "Copy the prompt and paste it in", body: "All of it, including the standard at the end. Then send it." },
  { title: "Answer its questions", body: "It asks for what it needs first: your learners, topic, and material." },
  {
    title: "Work through its review list",
    body: "Every draft ends with BEFORE YOU USE THIS. Check those items yourself before learners see anything.",
  },
];

export function HowToUse() {
  return (
    <section aria-labelledby="how-to-use" className="space-y-3">
      <h2 id="how-to-use" className="text-xl font-semibold">
        How to use it
      </h2>
      <ol className="grid gap-3 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3 rounded-lg border border-border bg-card p-4">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white"
            >
              {i + 1}
            </span>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
