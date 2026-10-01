"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";
import {
  MAX_COUNT,
  applyExam,
  buildQuestionPrompt,
  clampCount,
  configFromPreset,
  defaultConfig,
  depths,
  examOrder,
  exams,
  explanationOptions,
  formats,
  getSubject,
  modes,
  phases,
  presets,
  regions,
  subjects,
  type DepthId,
  type ExamId,
  type ExplanationId,
  type FormatId,
  type ModeId,
  type PhaseId,
  type QuestionConfig,
  type RegionId,
} from "@/lib/question-spec";

const STORAGE_KEY = "miller-ai-plays:question-builder:v1";

const fieldClass =
  "w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring";

const cardClass =
  "flex cursor-pointer flex-col gap-0.5 border border-border bg-card p-3 text-sm transition-colors hover:border-brand has-checked:border-brand has-checked:bg-marker/40 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring";

const chipClass =
  "border border-border bg-card px-3 py-1 text-xs font-medium transition-colors hover:border-brand hover:bg-marker/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer aria-pressed:border-brand aria-pressed:bg-marker";

/* ---------------------------- state persistence ---------------------------- */

function isExam(v: unknown): v is ExamId {
  return typeof v === "string" && v in exams;
}

/** Make sure a stored/URL config is internally consistent before using it. */
function sanitize(raw: Partial<QuestionConfig>): QuestionConfig {
  const exam = isExam(raw.exam) ? raw.exam : "shelf";
  const base = applyExam(defaultConfig(exam), exam);
  const merged: QuestionConfig = { ...base, ...raw, exam };
  if (!exams[exam].formats.includes(merged.format)) merged.format = exams[exam].defaultFormat;
  if (!phases.some((p) => p.id === merged.phase)) merged.phase = base.phase;
  if (!depths.some((d) => d.id === merged.depth)) merged.depth = "auto";
  if (!modes.some((m) => m.id === merged.mode)) merged.mode = "interactive";
  if (!regions.some((r) => r.id === merged.region)) merged.region = "us";
  merged.options = merged.options === 4 ? 4 : 5;
  merged.count = clampCount(Number(merged.count));
  merged.explanations = Array.isArray(merged.explanations)
    ? merged.explanations.filter((e) => explanationOptions.some((o) => o.id === e))
    : base.explanations;
  merged.topic = String(merged.topic ?? "");
  merged.weakSpots = String(merged.weakSpots ?? "");
  merged.source = String(merged.source ?? "");
  merged.examName = String(merged.examName ?? "");
  merged.diversity = merged.diversity !== false;
  merged.plainLanguage = merged.plainLanguage === true;
  return merged;
}

function loadSaved(): QuestionConfig | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return sanitize(JSON.parse(raw));
  } catch {
    return null;
  }
}

function fromUrl(search: string): QuestionConfig | null {
  const q = new URLSearchParams(search);
  const presetId = q.get("preset");
  const examParam = q.get("exam");
  let cfg: QuestionConfig | null = presetId ? configFromPreset(presetId) : null;
  if (!cfg && isExam(examParam)) cfg = applyExam(defaultConfig(examParam), examParam);
  if (!cfg) return null;
  const next: Partial<QuestionConfig> = { ...cfg };
  const subject = q.get("subject");
  if (subject && getSubject(subject)) next.subject = subject;
  const phase = q.get("phase");
  if (phase === "1" || phase === "2" || phase === "3") next.phase = phase;
  const topic = q.get("topic");
  if (topic) next.topic = topic.slice(0, 500);
  const count = Number(q.get("count"));
  if (count) next.count = count;
  return sanitize(next);
}

/* --------------------------------- pieces ---------------------------------- */

function Step({
  n,
  title,
  hint,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3 min-w-0">
      <legend className="flex items-baseline gap-2 pb-1">
        <span aria-hidden="true" className="font-mono text-sm text-muted-foreground">
          {String(n).padStart(2, "0")}
        </span>
        <span className="font-[family-name:var(--font-display)] text-xl font-semibold">{title}</span>
      </legend>
      {hint && <p className="text-xs text-muted-foreground -mt-1">{hint}</p>}
      {children}
    </fieldset>
  );
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  blurb,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  blurb?: string;
}) {
  return (
    <label className={cardClass}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="font-medium leading-snug">{title}</span>
      {blurb && <span className="text-xs text-muted-foreground leading-snug">{blurb}</span>}
    </label>
  );
}

/* -------------------------------- component -------------------------------- */

export function QuestionBuilder() {
  const uid = useId();
  const [cfg, setCfg] = useState<QuestionConfig>(() => defaultConfig("shelf"));
  const [ready, setReady] = useState(false);

  // Load URL preset (wins) or last-used settings after mount.
  useEffect(() => {
    // Browser-only state (URL and localStorage) can only be read after mount
    // to keep server and client markup identical during hydration.
    const next = fromUrl(window.location.search) ?? loadSaved();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (next) setCfg(next);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    } catch {
      /* storage unavailable (private mode, blocked): the builder still works */
    }
  }, [cfg, ready]);

  const set = <K extends keyof QuestionConfig>(key: K, value: QuestionConfig[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  const exam = exams[cfg.exam];
  const format = formats[cfg.format];
  const subject = getSubject(cfg.subject);
  const prompt = useMemo(() => buildQuestionPrompt(cfg), [cfg]);

  const showOptionsField = format.kind === "mcq" && cfg.format !== "emq";
  const showMode = cfg.format !== "ladder" && cfg.format !== "cloze";
  const showFeedback = cfg.format !== "cloze" && cfg.format !== "ladder" && cfg.format !== "casescript";
  const modeLabels: Record<ModeId, { title: string; blurb: string }> =
    cfg.format === "casescript"
      ? {
          interactive: {
            title: "Live simulation",
            blurb: "The AI plays the patient. Type END ENCOUNTER for feedback.",
          },
          batch: { title: "Written station", blurb: "Get the full case, script, and checklist on the page." },
          keyed: { title: "Written station", blurb: "Get the full case, script, and checklist on the page." },
        }
      : {
          interactive: { title: modes[0].label, blurb: modes[0].blurb },
          batch: { title: modes[1].label, blurb: modes[1].blurb },
          keyed: { title: modes[2].label, blurb: modes[2].blurb },
        };
  const visibleModes: ModeId[] = cfg.format === "casescript" ? ["interactive", "batch"] : ["interactive", "batch", "keyed"];

  const encoded = encodeURIComponent(prompt);
  const canPrefill = encoded.length < 7000;

  function toggleExplanation(id: ExplanationId) {
    setCfg((c) => ({
      ...c,
      explanations: c.explanations.includes(id)
        ? c.explanations.filter((e) => e !== id)
        : [...c.explanations, id],
    }));
  }

  function toggleIdea(idea: string) {
    setCfg((c) => {
      const parts = c.topic
        .split(/[,;\n]/)
        .map((p) => p.trim())
        .filter(Boolean);
      const next = parts.includes(idea) ? parts.filter((p) => p !== idea) : [...parts, idea];
      return { ...c, topic: next.join(", ") };
    });
  }

  const topicParts = cfg.topic
    .split(/[,;\n]/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start">
      <form
        className="space-y-8 min-w-0"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Question builder"
      >
        {/* Presets */}
        <section aria-labelledby={`${uid}-presets`} className="space-y-2">
          <h2 id={`${uid}-presets`} className="text-sm font-semibold">
            Quick start
          </h2>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                title={p.blurb}
                className={chipClass}
                onClick={() => {
                  const next = configFromPreset(p.id);
                  if (next) setCfg(sanitize(next));
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* 1. Exam */}
        <Step n={1} title="What are you preparing for?">
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {examOrder.map((id) => (
              <RadioCard
                key={id}
                name={`${uid}-exam`}
                value={id}
                checked={cfg.exam === id}
                onChange={() => setCfg((c) => applyExam(c, id))}
                title={exams[id].label}
                blurb={exams[id].blurb}
              />
            ))}
          </div>
          {cfg.exam === "other" && (
            <div className="space-y-1">
              <label htmlFor={`${uid}-examname`} className="text-sm font-medium">
                Name of the exam
              </label>
              <input
                id={`${uid}-examname`}
                type="text"
                value={cfg.examName}
                onChange={(e) => set("examName", e.target.value)}
                placeholder="e.g., UKMLA AKT, MCCQE Part I, a school's end-of-year exam"
                className={fieldClass}
              />
            </div>
          )}
        </Step>

        {/* 2. Phase */}
        <Step
          n={2}
          title="Where are you in training?"
          hint="Phases are labeled differently at different schools. Pick the closest match."
        >
          <div className="grid gap-2 sm:grid-cols-3">
            {phases.map((p) => (
              <RadioCard
                key={p.id}
                name={`${uid}-phase`}
                value={p.id}
                checked={cfg.phase === p.id}
                onChange={() => set("phase", p.id as PhaseId)}
                title={`${p.label}: ${p.short}`}
                blurb={p.blurb}
              />
            ))}
          </div>
        </Step>

        {/* 3. Focus */}
        <Step n={3} title="What do you want to be tested on?">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor={`${uid}-subject`} className="text-sm font-medium">
                Subject
              </label>
              <select
                id={`${uid}-subject`}
                value={cfg.subject}
                onChange={(e) => set("subject", e.target.value)}
                className={fieldClass}
              >
                {(["Basic science", "Clinical (clerkship)", "Cross-cutting"] as const).map((g) => (
                  <optgroup key={g} label={g}>
                    {subjects
                      .filter((s) => s.group === g)
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor={`${uid}-count`} className="text-sm font-medium">
                How many? (1-{MAX_COUNT})
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`${uid}-count`}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_COUNT}
                  value={cfg.count}
                  onChange={(e) => set("count", Number(e.target.value))}
                  onBlur={() => set("count", clampCount(cfg.count))}
                  className={`${fieldClass} max-w-24`}
                />
                {[5, 10, 20].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={cfg.count === n}
                    onClick={() => set("count", n)}
                    className={chipClass}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor={`${uid}-topic`} className="text-sm font-medium">
              Topic or learning objectives <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea
              id={`${uid}-topic`}
              rows={3}
              value={cfg.topic}
              onChange={(e) => set("topic", e.target.value)}
              placeholder="e.g., nephrotic vs nephritic syndromes; or paste your lecture objectives"
              className={fieldClass}
            />
            {subject && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-muted-foreground">Ideas:</span>
                {subject.ideas.map((idea) => (
                  <button
                    key={idea}
                    type="button"
                    aria-pressed={topicParts.includes(idea)}
                    onClick={() => toggleIdea(idea)}
                    className={chipClass}
                  >
                    {idea}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Step>

        {/* 4. Shape */}
        <Step n={4} title="How should the questions work?">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor={`${uid}-format`} className="text-sm font-medium">
                Format
              </label>
              <select
                id={`${uid}-format`}
                value={cfg.format}
                onChange={(e) => set("format", e.target.value as FormatId)}
                className={fieldClass}
              >
                {exam.formats.map((f) => (
                  <option key={f} value={f}>
                    {formats[f].label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">{format.blurb}</p>
            </div>
            {showOptionsField && (
              <div className="space-y-1">
                <label htmlFor={`${uid}-options`} className="text-sm font-medium">
                  Answer choices
                </label>
                <select
                  id={`${uid}-options`}
                  value={cfg.options}
                  onChange={(e) => set("options", Number(e.target.value) === 4 ? 4 : 5)}
                  className={fieldClass}
                >
                  <option value={5}>5 choices (A-E), like most licensing exams</option>
                  <option value={4}>4 choices (A-D)</option>
                </select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium" id={`${uid}-depth`}>
              Difficulty
            </p>
            <div role="radiogroup" aria-labelledby={`${uid}-depth`} className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {depths.map((d) => (
                <RadioCard
                  key={d.id}
                  name={`${uid}-depthr`}
                  value={d.id}
                  checked={cfg.depth === d.id}
                  onChange={() => set("depth", d.id as DepthId)}
                  title={d.label}
                  blurb={d.blurb}
                />
              ))}
            </div>
          </div>

          {showMode && (
            <div className="space-y-2">
              <p className="text-sm font-medium" id={`${uid}-mode`}>
                How do you want to practice?
              </p>
              <div role="radiogroup" aria-labelledby={`${uid}-mode`} className="grid gap-2 sm:grid-cols-3">
                {visibleModes.map((m) => (
                  <RadioCard
                    key={m}
                    name={`${uid}-moder`}
                    value={m}
                    checked={cfg.mode === m || (cfg.format === "casescript" && m === "batch" && cfg.mode === "keyed")}
                    onChange={() => set("mode", m)}
                    title={modeLabels[m].title}
                    blurb={modeLabels[m].blurb}
                  />
                ))}
              </div>
            </div>
          )}
        </Step>

        {/* 5. Feedback */}
        {showFeedback && (
          <Step n={5} title="What feedback do you want?">
            <div className="grid gap-2 sm:grid-cols-2">
              {explanationOptions.map((o) => (
                <label key={o.id} className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfg.explanations.includes(o.id)}
                    onChange={() => toggleExplanation(o.id)}
                    className="mt-0.5 size-4 accent-[var(--color-brand)]"
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
          </Step>
        )}

        {/* Advanced */}
        <details className="border border-border bg-muted/40 p-4 group">
          <summary className="cursor-pointer text-sm font-semibold rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Advanced: personalize further
          </summary>
          <div className="mt-4 space-y-5">
            <div className="space-y-1">
              <label htmlFor={`${uid}-weak`} className="text-sm font-medium">
                My weak spots
              </label>
              <textarea
                id={`${uid}-weak`}
                rows={2}
                value={cfg.weakSpots}
                onChange={(e) => set("weakSpots", e.target.value)}
                placeholder="e.g., acid-base interpretation, anticoagulant choice, reading stems too fast"
                className={fieldClass}
              />
              <p className="text-xs text-muted-foreground">
                About half the questions will lean on these. Your Error Engine or Deficit Tracker output works well here.
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor={`${uid}-source`} className="text-sm font-medium">
                Use only my own notes or lecture material
              </label>
              <textarea
                id={`${uid}-source`}
                rows={6}
                value={cfg.source}
                onChange={(e) => set("source", e.target.value)}
                placeholder="Paste your notes, slide text, or summary here. Leave empty to use general medical knowledge."
                className={`${fieldClass} font-mono`}
              />
              <p className="text-xs text-muted-foreground">
                Questions will be written only from this text. Do not paste patient information or copyrighted
                question-bank content. Your text stays in this browser and in the prompt you copy.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor={`${uid}-region`} className="text-sm font-medium">
                  Guidelines and units
                </label>
                <select
                  id={`${uid}-region`}
                  value={cfg.region}
                  onChange={(e) => set("region", e.target.value as RegionId)}
                  className={fieldClass}
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 pt-1 sm:pt-6">
                <label className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfg.diversity}
                    onChange={(e) => set("diversity", e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--color-brand)]"
                  />
                  <span>Vary patient demographics realistically</span>
                </label>
                <label className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfg.plainLanguage}
                    onChange={(e) => set("plainLanguage", e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--color-brand)]"
                  />
                  <span>Plain-language explanations (define jargon)</span>
                </label>
              </div>
            </div>
          </div>
        </details>
      </form>

      {/* Output */}
      <aside
        aria-labelledby="your-prompt-heading"
        className="lg:sticky lg:top-20 space-y-3 border border-brand bg-card p-4 min-w-0"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id="your-prompt-heading" className="text-base font-semibold">
            Your prompt
          </h2>
          <span className="text-xs text-muted-foreground" aria-live="polite">
            {prompt.length.toLocaleString()} characters
          </span>
        </div>

        <pre
          tabIndex={0}
          aria-label="Generated prompt"
          className="max-h-[26rem] overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-card p-3 font-mono text-xs leading-relaxed focus-visible:outline-2 focus-visible:outline-ring"
        >
          {prompt}
        </pre>

        <div className="flex flex-wrap items-center gap-2">
          <CopyButton text={prompt} label="Copy prompt" className="h-9 px-4" />
          {canPrefill && (
            <>
              <a
                href={`https://claude.ai/new?q=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Open in Claude
              </a>
              <a
                href={`https://chatgpt.com/?q=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Open in ChatGPT
              </a>
            </>
          )}
          <button
            type="button"
            onClick={() => setCfg(defaultConfig(cfg.exam))}
            className="ml-auto text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Reset
          </button>
        </div>

        <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1">
          <li>Copy the prompt, then paste it into a new chat in any AI tool.</li>
          <li>
            {cfg.mode === "interactive" || cfg.format === "ladder" || cfg.format === "casescript"
              ? "Answer in the chat. The AI waits for you each time."
              : "Attempt the questions on paper first, then reply with your answers."}
          </li>
          <li>Check anything surprising against a trusted source before you memorize it.</li>
        </ol>
        {exam.pacing && <p className="text-xs text-muted-foreground">Pacing tip: {exam.pacing}</p>}
        {!canPrefill && (
          <p className="text-xs text-muted-foreground">
            This prompt is too long for a one-click link. Use Copy.
          </p>
        )}
      </aside>
    </div>
  );
}
