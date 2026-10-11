"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  decodeAnswers,
  encodeAnswers,
  experiences,
  makes,
  recommend,
  type ExperienceId,
  type MakeId,
} from "@/lib/start-path";

export type PlayInfo = { slug: string; title: string; oneLiner: string; estimatedTime: string };

const choiceClass =
  "flex cursor-pointer flex-col gap-0.5 border border-border bg-card p-3 text-sm transition-colors hover:border-brand has-checked:border-brand has-checked:bg-marker/60 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring";

export function StartWizard({ plays }: { plays: PlayInfo[] }) {
  const [make, setMake] = useState<MakeId | null>(null);
  const [xp, setXp] = useState<ExperienceId | null>(null);
  const [done, setDone] = useState(false);

  // A shared link (?make=...&xp=...) opens straight on the result.
  useEffect(() => {
    const a = decodeAnswers(window.location.search);
    if (!a) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    setMake(a.make);
    setXp(a.xp);
    setDone(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const playBySlug = useMemo(() => new Map(plays.map((p) => [p.slug, p])), [plays]);
  const result = useMemo(() => (make && xp ? recommend(make, xp) : null), [make, xp]);

  function showResult() {
    if (!make || !xp) return;
    window.history.replaceState(null, "", `/start?${encodeAnswers(make, xp)}`);
    setDone(true);
    window.scrollTo({ top: 0 });
  }

  function restart() {
    window.history.replaceState(null, "", "/start");
    setDone(false);
  }

  if (done && make && xp && result) {
    const makeLabel = makes.find((m) => m.id === make)?.label ?? "";
    const steps = result.steps.filter((s) => playBySlug.has(s.slug));
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Your path &middot; {makeLabel}
          </p>
          <h2 className="text-3xl font-medium">Do these in order.</h2>
          <p className="text-muted-foreground">
            Each one is a prompt you copy into your school&apos;s AI tool. Start with step 1.
          </p>
        </div>

        <ol className="space-y-3">
          {steps.map((s, i) => {
            const p = playBySlug.get(s.slug)!;
            return (
              <li key={s.slug}>
                <Link
                  href={`/plays/${s.slug}`}
                  className="group flex gap-4 border border-border bg-card p-4 transition-colors hover:border-brand hover:bg-marker/30"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white"
                  >
                    {i + 1}
                  </span>
                  <span className="space-y-1">
                    <span className="block font-semibold group-hover:underline">{p.title}</span>
                    <span className="block text-sm text-muted-foreground">{s.reason}</span>
                    <span className="block text-xs text-muted-foreground">{p.estimatedTime}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div className="rounded-lg border-l-4 border-brand bg-muted p-4 text-sm leading-relaxed">
          Every prompt on this site carries the same{" "}
          <Link href="/standard" className="text-highlight font-medium hover:underline">
            content standard
          </Link>
          , so the AI drafts the same way whichever Play you use. You stay the reviewer: nothing reaches learners until
          you have checked it.
        </div>

        <button
          type="button"
          onClick={restart}
          className="text-sm font-medium text-highlight hover:underline cursor-pointer"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        showResult();
      }}
    >
      <fieldset className="space-y-3">
        <legend className="text-lg font-semibold mb-3">1. What are you making?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {makes.map((m) => (
            <label key={m.id} className={choiceClass}>
              <input
                type="radio"
                name="make"
                value={m.id}
                checked={make === m.id}
                onChange={() => setMake(m.id)}
                className="sr-only"
              />
              <span className="font-medium">{m.label}</span>
              <span className="text-muted-foreground">{m.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-lg font-semibold mb-3">2. How much have you used AI for work?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {experiences.map((x) => (
            <label key={x.id} className={choiceClass}>
              <input
                type="radio"
                name="xp"
                value={x.id}
                checked={xp === x.id}
                onChange={() => setXp(x.id)}
                className="sr-only"
              />
              <span className="font-medium">{x.label}</span>
              <span className="text-muted-foreground">{x.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!make || !xp}
        className="bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Show my path
      </button>
    </form>
  );
}
