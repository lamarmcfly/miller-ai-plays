import Link from "next/link";

const items = [
  {
    problem: "I keep missing questions in the same topic and cannot tell why.",
    solution: "Deficit Tracker",
    href: "/plays/deficit-tracker",
  },
  {
    problem: "I need clinical notes done faster during clerkships.",
    solution: "Clinical Note Writer",
    href: "/plays/clinical-note",
  },
  {
    problem: "I want to know what the attending will ask before rounds.",
    solution: "Rounds Prep",
    href: "/plays/rounds-prep",
  },
  {
    problem: "I have never used AI to study and do not know where to start.",
    solution: "First AI Study Session",
    href: "/plays/first-ai-session",
  },
];

export function StudyProblems() {
  return (
    <section className="space-y-4" aria-labelledby="problems-heading">
      <div className="space-y-1">
        <h2 id="problems-heading" className="text-xl font-bold tracking-tight">
          Built around real study problems
        </h2>
        <p className="text-sm text-muted-foreground">
          Each Play solves one specific problem. Have a better idea?{" "}
          <Link href="/community" className="text-highlight hover:underline">
            Share it on the Community Board
          </Link>
          .
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-border p-4 hover:bg-marker/30 hover:border-brand transition-all h-full space-y-2 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <p className="text-sm text-muted-foreground italic">&ldquo;{item.problem}&rdquo;</p>
            <p className="text-sm font-semibold text-brand">Try: {item.solution} &rarr;</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
