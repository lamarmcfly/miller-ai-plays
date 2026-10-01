import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { FillablePrompt } from "@/components/FillablePrompt";

export interface RotationPlay {
  slug: string;
  title: string;
  why: string;
}

export interface RotationPrompt {
  label: string;
  prompt: string;
}

export function RotationPage({
  name,
  plays,
  prompts,
  questionSubject,
  questionTopic,
  rhythm,
}: {
  name: string;
  plays: RotationPlay[];
  prompts: RotationPrompt[];
  /** Subject id from lib/question-spec (e.g., "surgery" -> "surgery"). */
  questionSubject: string;
  questionTopic?: string;
  rhythm?: { title: string; items: string[] };
}) {
  const params = new URLSearchParams({ exam: "shelf", subject: questionSubject, phase: "2" });
  if (questionTopic) params.set("topic", questionTopic);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <Link href="/phase/2" className="text-muted-foreground hover:underline">
            Phase 2
          </Link>
          <span aria-hidden="true" className="text-muted-foreground">
            /
          </span>
          <span aria-current="page" className="text-foreground">
            {name}
          </span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <p className="text-muted-foreground">AI workflows tailored for your {name} clerkship</p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Recommended Plays</h2>
        <div className="space-y-3">
          {plays.map((play) => (
            <Link key={play.slug} href={`/plays/${play.slug}`}>
              <div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-brand/30 transition-all cursor-pointer space-y-1">
                <h3 className="font-semibold">{play.title}</h3>
                <p className="text-sm text-muted-foreground">{play.why}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border-l-4 border-highlight bg-teal-50 p-5 space-y-2">
        <h2 className="text-lg font-semibold">Practice questions for {name}</h2>
        <p className="text-sm text-muted-foreground">
          Build a custom shelf-style question set for this rotation: choose the topic, difficulty, and how you want
          feedback.
        </p>
        <Link
          href={`/question-builder?${params.toString()}`}
          className="inline-block text-sm font-medium text-highlight hover:underline"
        >
          Build {name} practice questions &rarr;
        </Link>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">{name}-specific starter prompts</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the blanks, copy, and paste into your AI tool.
        </p>
        <div className="space-y-3">
          {prompts.map((rp) => (
            <FillablePrompt key={rp.label} label={rp.label} prompt={rp.prompt} />
          ))}
        </div>
      </section>

      {rhythm && (
        <section className="rounded-xl border-l-4 border-brand bg-indigo-50 p-5 space-y-2">
          <h2 className="font-semibold">{rhythm.title}</h2>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            {rhythm.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      )}

      <div>
        <Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">
          &larr; All rotations
        </Link>
      </div>
    </div>
  );
}
