import Link from "next/link";
import { getAllPlays } from "@/lib/plays";

// One chooser replaces the four overlapping "where do I start" sections the
// home page used to have. Each situation goes to exactly one place.
const needs: { situation: string; slug?: string; href?: string; title?: string; detail?: string }[] = [
  { situation: "I've never used AI to study.", slug: "first-ai-session" },
  {
    situation: "I need practice questions on a topic.",
    href: "/question-builder",
    title: "Build practice questions",
    detail: "Pick your exam and topic",
  },
  { situation: "I keep missing the same kinds of Qbank questions.", slug: "error-engine" },
  { situation: "I just sat through a lecture.", slug: "lecture-compressor" },
  { situation: "My exam is a few weeks away.", slug: "exam-countdown-planner" },
  {
    situation: "I'm starting a clerkship rotation.",
    href: "/phase/2",
    title: "Clerkship guides",
    detail: "Plays and prompts for each rotation",
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

  const sections = [
    {
      href: "/plays",
      title: "Plays",
      body: `${plays.length} step-by-step AI workflows for lectures, Qbanks, clerkships, and more. The heart of the site.`,
    },
    {
      href: "/question-builder",
      title: "Practice Questions",
      body: "Choose your exam, subject, and difficulty. Get one prompt that makes any AI tool write realistic questions.",
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
              For medical students at any school
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
                <span>Phase 2 &middot; foundational</span>
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
              gets an AI tool to write: no named diagnosis, one clear lead-in, and five believable options.
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
              const play = n.slug ? bySlug.get(n.slug) : undefined;
              const href = n.href ?? `/plays/${n.slug}`;
              const title = n.title ?? play?.title;
              const detail = n.detail ?? play?.estimatedTime;
              if (!title) return null;
              return (
                <li key={n.situation}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col justify-between gap-4 border border-border bg-card p-5 transition-colors hover:border-brand hover:bg-marker/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="font-[family-name:var(--font-display)] text-lg leading-snug">
                      &ldquo;{n.situation}&rdquo;
                    </span>
                    <span className="space-y-0.5">
                      <span className="block text-sm font-semibold text-brand group-hover:underline decoration-marker decoration-2 underline-offset-4">
                        {title} &rarr;
                      </span>
                      {detail && <span className="block font-mono text-xs text-muted-foreground">{detail}</span>}
                    </span>
                  </Link>
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
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group block h-full border border-border p-5 space-y-1.5 transition-colors hover:border-brand hover:bg-marker/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <h3 className="text-xl font-semibold group-hover:underline decoration-marker decoration-4 underline-offset-4">
                    {s.title} &rarr;
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
