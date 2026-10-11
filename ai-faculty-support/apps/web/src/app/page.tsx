import Link from "next/link";
import { PlayCard } from "@/components/PlayCard";
import { getAllPlays } from "@/lib/plays";
import { categories } from "@/lib/schema";

const howItWorks = [
  {
    title: "Pick a Play",
    body: "Each one does one teaching job: pearls, exam questions, objectives, cases, or checking a draft.",
  },
  {
    title: "Paste it into your school's AI tool",
    body: "Copilot, ChatGPT, Claude or Gemini. It asks for your learners and material, then drafts.",
  },
  {
    title: "Check before learners see it",
    body: "Every draft ends with a list of exactly what to verify. You stay the reviewer.",
  },
];

export default function HomePage() {
  const plays = getAllPlays();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-14">
      <section className="space-y-5 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">For medical school faculty</p>
        <h1 className="text-4xl sm:text-5xl font-medium leading-tight">
          AI that drafts to one standard.{" "}
          <span className="italic bg-marker px-1.5 -mx-1">You stay the reviewer.</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Copy-paste workflows for the content you make over and over: teaching pearls, exam questions, learning
          objectives and small-group cases. Every prompt carries the same content standard, so the drafts hold to the
          same rules whether this is your first time using AI or your hundredth.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/start"
            className="bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Start here: two questions
          </Link>
          <Link
            href="/standard"
            className="border border-brand px-5 py-2.5 text-sm font-semibold hover:bg-marker/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Read the standard
          </Link>
        </div>
      </section>

      <section aria-labelledby="how-it-works" className="space-y-4">
        <h2 id="how-it-works" className="text-2xl font-medium">
          How it works
        </h2>
        <ol className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <li key={s.title} className="border border-border bg-card p-5 space-y-2">
              <span className="font-mono text-xs text-muted-foreground">Step {i + 1}</span>
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">
          No account and nothing to install. This site never sees what you type into your AI tool.
        </p>
      </section>

      {categories.map((c) => {
        const inCategory = plays.filter((p) => p.category === c.id);
        if (inCategory.length === 0) return null;
        return (
          <section key={c.id} aria-labelledby={`cat-${c.id}`} className="space-y-4">
            <h2 id={`cat-${c.id}`} className="text-2xl font-medium">
              {c.label}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inCategory.map((p) => (
                <PlayCard key={p.slug} play={p} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-lg border-l-4 border-brand bg-muted p-5 space-y-2 max-w-3xl">
        <h2 className="text-xl font-semibold">Using EAT?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The pearl Plays write in EAT&apos;s pearl format.{" "}
          <strong className="text-foreground">Draft Teaching Pearls</strong>
          {" gives you a file that EAT's \"Import from CSV\" panel turns into drafts, and "}
          <strong className="text-foreground">Pre-Check a Pearl</strong>
          {" asks the same 20 questions EAT's reviewers attest to. Approval still happens in EAT, by you or a colleague."}
        </p>
      </section>
    </div>
  );
}
