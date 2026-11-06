import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { PromptBlock } from "@/components/PromptBlock";
import { StarterPrompts } from "@/components/StarterPrompts";
import { getAllSlugs, getPlayBySlug, hasVideo } from "@/lib/plays";
import { audienceLabels } from "@/lib/schema";
import { ShareButton } from "@/components/ShareButton";
import { FeedbackPrompt } from "@/components/FeedbackPrompt";
import { SITE } from "@/lib/site";

const bodyComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-2xl font-medium mt-8 mb-3 first:mt-0" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="text-base font-semibold mt-4 mb-1" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-sm text-muted-foreground leading-relaxed my-2" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground my-2" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground my-2" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-highlight hover:underline" rel="noopener noreferrer" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs" {...props} />
  ),
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const play = getPlayBySlug(slug);
  if (!play) return {};
  return {
    title: play.title,
    description: play.oneLiner,
    openGraph: { title: play.title, description: play.oneLiner, type: "article" },
  };
}

function formatYears(years: string[]): string {
  const order = ["MS1", "MS2", "MS3", "MS4"];
  const idx = years.map((y) => order.indexOf(y)).sort((a, b) => a - b);
  const contiguous = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
  if (idx.length > 2 && contiguous) return `${order[idx[0]]}–${order[idx[idx.length - 1]]}`;
  return idx.map((i) => order[i]).join(", ");
}

const sectionHeading = "text-2xl font-medium";

export default async function PlayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const play = getPlayBySlug(slug);
  if (!play) notFound();

  const related = play.relatedPlays
    .map((s) => getPlayBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const tool = play.tools[0];
  const anyTool = !tool || /^any\b/i.test(tool.name);
  const toolText = !tool ? "Any AI tool" : tool.name.replace(/^Any LLM/i, "Any AI tool");

  const goodToKnow = [
    { term: "When to use it", detail: play.whenToUse },
    ...(play.learningNote ? [{ term: "Why it works", detail: play.learningNote }] : []),
    { term: "Signs it's working", detail: play.successSignal },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 space-y-12">
      <div className="space-y-5">
        <Link
          href="/plays"
          className="inline-block text-sm text-muted-foreground hover:text-brand hover:underline underline-offset-4"
        >
          &larr; All Plays
        </Link>

        {/* What it is, in three lines */}
        <header className="space-y-3">
          <h1 className="text-4xl font-medium leading-tight">{play.title}</h1>
          <p className="text-lg italic text-muted-foreground">{play.hook}</p>
          <p className="leading-relaxed">{play.oneLiner}</p>
          <div className="space-y-1 font-mono text-xs text-muted-foreground">
            <p>
              {play.estimatedTime} &middot; {play.difficulty} &middot; {formatYears(play.year)} &middot;{" "}
              {anyTool ? (
                toolText
              ) : (
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">
                  {toolText}
                </a>
              )}
              {tool?.plan === "free" && ", free plan works"}
            </p>
            {play.audience.length > 0 && (
              <p>For {play.audience.map((a) => audienceLabels[a] || a).join(", ")}</p>
            )}
          </div>
        </header>
      </div>

      {hasVideo(play) && (
        <video
          controls
          preload="none"
          poster={play.video.poster}
          className="w-full border border-border bg-muted"
          aria-label={`Demo of ${play.title}`}
        >
          <source src={play.video.url} />
          <track kind="captions" src={play.video.captions} srcLang="en" label="English" default />
        </video>
      )}

      {/* The job: how to use it, then the prompt */}
      <section aria-labelledby="use-heading" className="space-y-5">
        <div className="border border-brand bg-card p-5 space-y-2">
          <h2 id="use-heading" className={sectionHeading}>
            How to use it
          </h2>
          <p className="text-sm leading-relaxed">{play.artifact.cloneInstructions}</p>
        </div>

        {play.starterPrompts && play.starterPrompts.length > 0 && (
          <StarterPrompts prompts={play.starterPrompts} />
        )}

        <PromptBlock prompt={play.artifact.systemPrompt} />
      </section>

      <section aria-labelledby="know-heading" className="space-y-4">
        <h2 id="know-heading" className={sectionHeading}>
          Good to know
        </h2>
        <dl className="divide-y divide-border border-y border-border">
          {goodToKnow.map((row) => (
            <div key={row.term} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold">{row.term}</dt>
              <dd className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{row.detail.trim()}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Details and pitfalls (Markdown body) */}
      {play.content.trim() && (
        <section className="space-y-2">
          <MDXRemote
            source={play.content}
            options={{ mdxOptions: { format: "md" } }}
            components={bodyComponents}
          />
        </section>
      )}

      <section aria-labelledby="next-heading" className="space-y-4">
        <h2 id="next-heading" className={sectionHeading}>
          Keep going
        </h2>
        {related.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/plays/${r.slug}`}
                  className="group block h-full border border-border p-4 transition-colors hover:border-brand hover:bg-marker/30"
                >
                  <span className="block font-semibold leading-snug group-hover:underline decoration-marker decoration-4 underline-offset-4">
                    {r.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{r.oneLiner}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm text-muted-foreground">
          Want practice questions on this topic?{" "}
          <Link href="/question-builder" className="text-highlight hover:underline font-medium">
            Build them in the Question Builder
          </Link>
          .
        </p>
      </section>

      {/* Share + feedback */}
      <section
        aria-label="Share and feedback"
        className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm"
      >
        <ShareButton
          title={play.title}
          text={`${play.title} (${SITE.name}):`}
          path={`/plays/${play.slug}`}
          label="Share this Play"
        />
        <FeedbackPrompt kind="play" targetId={play.slug} title={play.title} legacyLabel="This didn't work for me" />
        <Link href="/community" className="text-highlight hover:underline font-medium">
          Share your version
        </Link>
      </section>

      <footer className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border">
        <p>
          Authored by {play.author}. Version{" "}
          {play.version}, updated {play.updatedAt}.
        </p>
        <p>
          AI output can be wrong. Verify important facts, never enter patient
          identifiers, and follow your school&apos;s AI policy.
        </p>
      </footer>
    </article>
  );
}
