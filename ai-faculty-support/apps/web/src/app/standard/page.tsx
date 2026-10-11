import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { STANDARD_BLOCK, STANDARD_VERSION, standardRules } from "@/lib/standard";

export const metadata: Metadata = {
  title: "The Standard",
  description:
    "The content standard built into every prompt on this site: original work, no identifiers, no invented sources, marked uncertainty, and a review list on every draft.",
};

export default function StandardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Content standard v{STANDARD_VERSION}
        </p>
        <h1 className="text-4xl font-medium leading-tight">
          One standard, <span className="italic bg-marker px-1.5 -mx-1">in every prompt.</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Every prompt you copy from this site ends with the same nine rules. You don&apos;t have to remember them or
          know how to write prompts: they travel with the Play, so a first-time user and an experienced one get
          drafts held to the same standard.
        </p>
      </header>

      <ol className="space-y-4">
        {standardRules.map((r, i) => (
          <li key={r.id} className="flex gap-4 border border-border bg-card p-4">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white"
            >
              {i + 1}
            </span>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{r.title}</h2>
              <p className="text-sm leading-relaxed">{r.rule}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Why: </span>
                {r.why}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Use it in your own prompts</h2>
          <CopyButton text={STANDARD_BLOCK} label="Copy the standard" />
        </div>
        <p className="text-sm text-muted-foreground">
          Writing your own prompt? Paste this at the end of it. Some tools let you save it as custom instructions so
          it applies to every chat.
        </p>
        <pre className="rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere] font-mono">
          {STANDARD_BLOCK}
        </pre>
      </section>

      <section className="rounded-lg border-l-4 border-brand bg-muted p-5 space-y-3">
        <h2 className="text-xl font-semibold">What the standard can&apos;t do</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li>
            <strong className="text-foreground">It can&apos;t make the AI right.</strong> It makes errors easier to
            find, by asking the AI to mark uncertainty and list what to check. The checking is yours.
          </li>
          <li>
            <strong className="text-foreground">It can&apos;t stop you pasting something you shouldn&apos;t.</strong>{" "}
            The AI is told to stop if it sees identifiers, but it may not notice. Remove patient and student information
            before you paste.
          </li>
          <li>
            <strong className="text-foreground">It doesn&apos;t replace your school&apos;s policy.</strong> Use the AI
            tool your school approves for work, and follow its rules on AI use and on saying when AI helped.
          </li>
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        New to AI?{" "}
        <Link href="/plays/first-ai-session" className="text-highlight font-medium hover:underline">
          Your First 20 Minutes with AI for Teaching
        </Link>{" "}
        walks you through it on your own subject.
      </p>
    </div>
  );
}
