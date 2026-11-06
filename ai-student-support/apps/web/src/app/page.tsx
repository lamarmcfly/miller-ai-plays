import Link from "next/link";
import { getAllPlays } from "@/lib/plays";
import { SITE, stageLabel, type StageId } from "@/lib/site";

// One chooser replaces the four overlapping "where do I start" sections the
// home page used to have. Each situation leads to one best first step, plus
// one "also try" so none of those sections' recommendations are lost.
type Dest = { slug: string } | { href: string; title: string; detail?: string };
const needs: { situation: string; first: Dest; also: Dest }[] = [
  {
    situation: "I've never used AI to study.",
    first: { slug: "first-ai-session" },
    also: { slug: "verify-the-ai" },
  },
  {
    situation: "I need practice questions on a topic.",
    first: { href: "/question-builder", title: "Build practice questions", detail: "Pick your exam and topic" },
    also: { slug: "custom-practice-questions" },
  },
  {
    situation: "I bombed a Qbank block.",
    first: { slug: "error-engine" },
    also: { slug: "deficit-tracker" },
  },
  {
    situation: "I just sat through a lecture.",
    first: { slug: "lecture-compressor" },
    also: { slug: "concept-coach" },
  },
  {
    situation: "I'm forgetting what I studied.",
    first: { slug: "spaced-review-planner" },
    also: { href: "/question-builder?exam=flashcards", title: "Flashcards from my notes" },
  },
  {
    situation: "My shelf or Step exam is coming up.",
    first: { slug: "exam-countdown-planner" },
    also: { slug: "shelf-review-notebook" },
  },
  {
    situation: "I'm on the wards and short on time.",
    first: { slug: "rounds-prep" },
    also: { slug: "clinical-note" },
  },
  {
    situation: "I have an OSCE coming up.",
    first: { slug: "osce-encounter-sim" },
    also: { slug: "case-presentation-coach" },
  },
  {
    situation: "I have a paper to read for journal club.",
    first: { slug: "research-speed-read" },
    also: { slug: "biostats-translator" },
  },
];

const steps = [
  {
    title: "Pick a Play",
    body: "A Play is a ready-made AI workflow for one study task, like turning a lecture into Anki cards or learning from the questions you missed.",
  },
  {
    title: "Copy the prompt",
    body: "One tap. Each Play shows you what to paste and what to add, like your notes or a missed question.",
  },
  {
    title: "Paste it into any AI tool",
    body: "ChatGPT, Claude, Gemini, Copilot, or NotebookLM. Free plans work. No account here, nothing to install.",
  },
];

export default function HomePage() {
  const plays = getAllPlays();
  const bySlug = new Map(plays.map((p) => [p.slug, p]));

  const resolve = (d: Dest) => {
    if ("href" in d) return d;
    const play = bySlug.get(d.slug);
    return play ? { href: `/plays/${d.slug}`, title: play.title, detail: play.estimatedTime } : null;
  };

  const sections: { href: string; title: string; body: string; shortcuts?: { href: string; label: string }[] }[] = [
    {
      href: "/plays",
      title: "Plays",
      body: `${plays.length} step-by-step AI workflows for lectures, Qbanks, clerkships, and more. The heart of the site.`,
      shortcuts: (Object.keys(SITE.stages) as StageId[]).map((id) => ({ href: `/phase/${id}`, label: stageLabel(id) })),
    },
    {
      href: "/question-builder",
      title: "Practice Questions",
      body: "Choose your exam, subject, and difficulty. Get one prompt that makes any AI tool write realistic questions.",
      shortcuts: [
        { href: "/question-builder?preset=step1-pharm", label: "Step 1 pharmacology" },
        { href: "/question-builder?preset=shelf-im", label: "Internal medicine shelf" },
        { href: "/question-builder?preset=step3-sequential", label: "Step 3 cases" },
      ],
    },
    {
      href: "/prompts",
      title: "Prompt Templates",
      body: "Short fill-in-the-blank prompts for quick jobs: a study plan, an explanation, a set of flashcards.",
    },
    {
      href: "/toolkit",
      title: "AI Tools",
      body: "Which free AI tool to open for which job, and how each fits with Anki, UWorld, and the rest of your stack.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-brand">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {SITE.audience}
            </p>
            <h1 className="text-5xl sm:text-6xl font-medium leading-[1.02]">
              AI can do{" "}
              <span className="italic bg-marker px-1.5 -mx-1">far more</span>
              <br />
              for your studying than you think.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Short, copy-paste AI workflows for studying, plus practice questions built for your exam. Answer three
              questions and we&apos;ll show you where to start.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <Link
                href="/start"
                className="inline-flex items-center bg-brand text-white hover:bg-brand-light px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Start here
              </Link>
              <Link
                href="/plays"
                className="text-sm font-medium underline decoration-marker decoration-4 underline-offset-[6px] hover:bg-marker/50"
              >
                or browse all {plays.length} Plays
              </Link>
            </div>
            <p className="font-mono text-xs text-muted-foreground pt-2">
              3 questions &middot; about a minute &middot; any AI tool &middot; free &middot; no account
            </p>
          </div>

          <figure aria-label="Sample practice question" className="space-y-3">
            <div className="border border-brand bg-card p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>Question 1 of 10</span>
                <span>{SITE.stages["2"].name} &middot; foundational</span>
              </div>
              <p className="text-[15px] leading-relaxed">
                A 24-year-old woman presents with 3 days of dysuria and urinary frequency. She has no fever or flank
                pain. Temperature is 37.1&deg;C (98.8&deg;F). Urinalysis is positive for leukocyte esterase and
                nitrites. Which of the following is the most likely causal organism?
              </p>
              <ol className="space-y-1.5 text-[15px]">
                {[
                  ["A", "Enterococcus faecalis"],
                  ["B", "Escherichia coli"],
                  ["C", "Klebsiella pneumoniae"],
                  ["D", "Proteus mirabilis"],
                  ["E", "Staphylococcus saprophyticus"],
                ].map(([k, v]) => (
                  <li key={k} className={`flex gap-3 px-2 py-1 -mx-2 ${k === "B" ? "bg-marker" : ""}`}>
                    <span className="font-mono text-muted-foreground w-4">{k}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ol>
            </div>
            <figcaption className="text-xs text-muted-foreground">
              An example of what the{" "}
              <Link href="/question-builder" className="underline underline-offset-2 hover:text-brand">
                practice question builder
              </Link>{" "}
              gets an AI tool to write: no named diagnosis, one clear lead-in, five homogeneous options, and a reason each wrong answer tempts.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 space-y-16">
        {/* How it works */}
        <section aria-labelledby="how-heading" className="space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">How it works</p>
            <h2 id="how-heading" className="text-3xl font-medium">
              Five minutes to learn. Then it&apos;s yours.
            </h2>
          </div>
          <ol className="grid gap-px bg-brand border border-brand md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-background p-5 space-y-2">
                <p className="font-mono text-sm text-muted-foreground">0{i + 1}</p>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* One chooser */}
        <section aria-labelledby="need-heading" className="space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Jump in</p>
            <h2 id="need-heading" className="text-3xl font-medium">
              What do you need right now?
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((n) => {
              const first = resolve(n.first);
              const also = resolve(n.also);
              if (!first) return null;
              return (
                <li
                  key={n.situation}
                  className="group relative flex h-full flex-col justify-between gap-4 border border-border bg-card p-5 transition-colors hover:border-brand hover:bg-marker/30"
                >
                  <p className="font-[family-name:var(--font-display)] text-lg leading-snug">
                    &ldquo;{n.situation}&rdquo;
                  </p>
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      {/* The whole card opens the first step. */}
                      <Link
                        href={first.href}
                        className="block text-sm font-semibold text-brand group-hover:underline decoration-marker decoration-2 underline-offset-4 outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
                      >
                        {first.title} &rarr;
                      </Link>
                      {first.detail && <p className="font-mono text-xs text-muted-foreground">{first.detail}</p>}
                    </div>
                    {also && (
                      <p className="relative z-10 text-xs text-muted-foreground">
                        Also try:{" "}
                        <Link href={also.href} className="font-medium text-highlight hover:underline">
                          {also.title}
                        </Link>
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-muted-foreground">
            Not sure?{" "}
            <Link
              href="/start"
              className="font-medium text-foreground underline decoration-marker decoration-4 underline-offset-[6px] hover:bg-marker/50"
            >
              Answer three questions and get a path made for you
            </Link>
            .
          </p>
        </section>

        {/* Map of the site */}
        <section aria-labelledby="map-heading" className="space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">What&apos;s here</p>
            <h2 id="map-heading" className="text-3xl font-medium">
              Four parts, one goal: study smarter with AI.
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {sections.map((s) => (
              <li
                key={s.href}
                className="group relative h-full border border-border p-5 space-y-1.5 transition-colors hover:border-brand hover:bg-marker/30"
              >
                <h3 className="text-xl font-semibold">
                  <Link
                    href={s.href}
                    className="group-hover:underline decoration-marker decoration-4 underline-offset-4 outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
                  >
                    {s.title} &rarr;
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                {s.shortcuts && (
                  <p className="relative z-10 flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs">
                    <span className="text-muted-foreground">Jump to:</span>
                    {s.shortcuts.map((sc) => (
                      <Link key={sc.href} href={sc.href} className="font-medium text-highlight hover:underline">
                        {sc.label}
                      </Link>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Have a workflow that works for you?{" "}
            <Link href="/community" className="font-medium text-highlight hover:underline">
              Share it on the Community Board
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
