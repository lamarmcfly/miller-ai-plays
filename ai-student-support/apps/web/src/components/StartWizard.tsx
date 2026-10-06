"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  decodeAnswers,
  encodeAnswers,
  experiences,
  goals,
  needs,
  recommend,
  type ExperienceId,
  type GoalId,
  type NeedId,
} from "@/lib/start-path";
import { toolJobs, toolLabels } from "@/lib/tool-chooser";
import { ShareButton } from "@/components/ShareButton";

export type PlayInfo = { slug: string; title: string; oneLiner: string; estimatedTime: string };

const choiceClass =
  "flex cursor-pointer flex-col gap-0.5 border border-border bg-card p-3 text-sm transition-colors hover:border-brand has-checked:border-brand has-checked:bg-marker/40 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring";

export function StartWizard({ plays }: { plays: PlayInfo[] }) {
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [xp, setXp] = useState<ExperienceId | null>(null);
  const [picked, setPicked] = useState<NeedId[]>([]);
  const [done, setDone] = useState(false);

  // A shared link (?goal=...&xp=...) opens straight on the result.
  useEffect(() => {
    const a = decodeAnswers(window.location.search);
    if (!a) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    setGoal(a.goal);
    setXp(a.xp);
    setPicked(a.needs);
    setDone(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const playBySlug = useMemo(() => new Map(plays.map((p) => [p.slug, p])), [plays]);
  const result = useMemo(
    () => (goal && xp ? recommend(goal, xp, picked) : null),
    [goal, xp, picked]
  );

  const toggle = (id: NeedId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  function showResult() {
    if (!goal || !xp) return;
    window.history.replaceState(null, "", `/start?${encodeAnswers(goal, xp, picked)}`);
    setDone(true);
    window.scrollTo({ top: 0 });
  }

  function restart() {
    window.history.replaceState(null, "", "/start");
    setDone(false);
  }

  if (done && goal && xp && result) {
    const goalLabel = goals.find((g) => g.id === goal)?.label ?? "";
    const steps = result.steps.filter((s) => playBySlug.has(s.slug));
    const jobs = toolJobs.filter((j) => result.toolJobIds.includes(j.id));
    return (
      <div className="space-y-10">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Your path &middot; {goalLabel}
          </p>
          <h2 className="text-3xl font-medium">Do these in order.</h2>
          <p className="text-muted-foreground">
            Each one takes about five minutes to learn. Start with step 1 today.
          </p>
        </div>

        <ol className="space-y-3">
          {steps.map((s, i) => {
            const play = playBySlug.get(s.slug)!;
            return (
              <li key={s.slug}>
                <Link
                  href={`/plays/${s.slug}`}
                  className="group flex gap-4 border border-border bg-card p-4 transition-colors hover:border-brand hover:bg-marker/30"
                >
                  <span aria-hidden="true" className="font-mono text-2xl text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="space-y-1">
                    <span className="block font-semibold leading-snug group-hover:text-brand">
                      {play.title}
                    </span>
                    <span className="block text-sm text-muted-foreground">{s.reason || play.oneLiner}</span>
                    <span className="block font-mono text-xs text-muted-foreground">{play.estimatedTime}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {result.builderHref && (
          <section className="border border-brand bg-marker/30 p-5 space-y-2">
            <h3 className="text-lg font-semibold">Then practice with questions built for you</h3>
            <p className="text-sm text-muted-foreground">
              The Question Builder is already set to your exam. Add your topic and weak spots, copy the prompt, and
              paste it into any AI tool.
            </p>
            <Link
              href={result.builderHref}
              className="inline-flex items-center bg-brand text-white hover:bg-brand-light px-4 py-2 text-sm font-semibold transition-colors"
            >
              Open the Question Builder
            </Link>
          </section>
        )}

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Which AI tool should you open?</h3>
          <p className="text-sm text-muted-foreground">
            Every prompt here works in any tool. These are the best fits for the jobs on your path.
          </p>
          <ul className="space-y-2">
            {jobs.map((j) => (
              <li key={j.id} className="border border-border p-3 text-sm">
                <span className="font-medium">{j.job}:</span>{" "}
                <a
                  href={toolLabels[j.tool].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-highlight font-medium hover:underline"
                >
                  {toolLabels[j.tool].name}
                </a>{" "}
                <span className="text-muted-foreground">({toolLabels[j.tool].examples}). {j.why}</span>
              </li>
            ))}
          </ul>
          <Link href="/toolkit" className="text-sm text-highlight hover:underline font-medium">
            See the full tool guide &rarr;
          </Link>
        </section>

        <div className="flex flex-wrap items-center gap-4 border-t border-border pt-5">
          <ShareButton
            title="My Med AI Plays study path"
            text="Here's the AI study path I got from Med AI Plays:"
            path={`/start?${encodeAnswers(goal, xp, picked)}`}
            label="Share my path"
          />
          <button
            type="button"
            onClick={restart}
            className="text-sm underline decoration-marker decoration-4 underline-offset-[6px] hover:bg-marker/50 cursor-pointer"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  const ready = goal !== null && xp !== null;

  return (
    <form
      className="space-y-10"
      onSubmit={(e) => {
        e.preventDefault();
        showResult();
      }}
    >
      <fieldset className="space-y-3 min-w-0">
        <legend className="pb-1 font-[family-name:var(--font-display)] text-xl font-semibold">
          <span aria-hidden="true" className="mr-2 font-mono text-sm text-muted-foreground">01</span>
          What are you working toward right now?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g) => (
            <label key={g.id} className={choiceClass}>
              <input
                type="radio"
                name="goal"
                value={g.id}
                checked={goal === g.id}
                onChange={() => setGoal(g.id)}
                className="sr-only"
              />
              <span className="font-medium leading-snug">{g.label}</span>
              <span className="text-xs text-muted-foreground leading-snug">{g.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="pb-1 font-[family-name:var(--font-display)] text-xl font-semibold">
          <span aria-hidden="true" className="mr-2 font-mono text-sm text-muted-foreground">02</span>
          How much have you used AI for studying?
        </legend>
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
              <span className="font-medium leading-snug">{x.label}</span>
              <span className="text-xs text-muted-foreground leading-snug">{x.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3 min-w-0">
        <legend className="pb-1 font-[family-name:var(--font-display)] text-xl font-semibold">
          <span aria-hidden="true" className="mr-2 font-mono text-sm text-muted-foreground">03</span>
          What&apos;s hardest right now? <span className="text-sm font-normal text-muted-foreground">(optional, pick any)</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {needs.map((n) => (
            <label key={n.id} className={choiceClass}>
              <input
                type="checkbox"
                checked={picked.includes(n.id)}
                onChange={() => toggle(n.id)}
                className="sr-only"
              />
              <span className="font-medium leading-snug">{n.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <button
          type="submit"
          disabled={!ready}
          className="inline-flex items-center bg-brand text-white hover:bg-brand-light px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Show my path
        </button>
        {!ready && <p className="text-xs text-muted-foreground">Answer the first two questions to continue.</p>}
      </div>
    </form>
  );
}
