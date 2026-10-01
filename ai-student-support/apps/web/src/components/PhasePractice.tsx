import Link from "next/link";

export interface PracticeLink {
  label: string;
  blurb: string;
  href: string;
}

export function PhasePractice({
  heading = "Practice questions for this phase",
  intro,
  links,
}: {
  heading?: string;
  intro: string;
  links: PracticeLink[];
}) {
  return (
    <section className="space-y-3" aria-labelledby="phase-practice">
      <div className="space-y-1">
        <h2 id="phase-practice" className="text-xl font-bold">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{intro}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-xl border border-border p-4 hover:bg-marker/30 hover:border-brand transition-all space-y-1 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <p className="font-semibold text-sm text-brand">{l.label} &rarr;</p>
            <p className="text-xs text-muted-foreground">{l.blurb}</p>
          </Link>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Want something different?{" "}
        <Link href="/question-builder" className="text-highlight hover:underline">
          Open the full Question Builder
        </Link>{" "}
        or browse the{" "}
        <Link href="/prompts" className="text-highlight hover:underline">
          Prompt Library
        </Link>
        .
      </p>
    </section>
  );
}
