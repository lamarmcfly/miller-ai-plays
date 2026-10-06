import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PromptBlock } from "@/components/PromptBlock";
import { StarterPrompts } from "@/components/StarterPrompts";
import { getAllSlugs, getPlayBySlug } from "@/lib/plays";
import { audienceLabels, difficultyColors } from "@/lib/schema";
import { ShareButton } from "@/components/ShareButton";
import { newIssueUrl } from "@/lib/community-submit";

const bodyComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-xl font-semibold mt-6 mb-2 first:mt-0" {...props} />
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

export default async function PlayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const play = getPlayBySlug(slug);
  if (!play) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      {/* Section 1 - Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{play.title}</h1>
        <p className="text-lg italic text-muted-foreground">{play.hook}</p>
      </header>

      {/* Section 2 - At-a-glance */}
      <div className="rounded-lg border border-border p-4 space-y-3">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <div>
            <span className="text-muted-foreground">Audience</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {play.audience.map((a) => (
                <Badge key={a} variant="outline" className="text-xs">
                  {audienceLabels[a] || a}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Year</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {play.year.map((y) => (
                <Badge key={y} variant="outline" className="text-xs">
                  {y}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Time</span>
            <p className="font-medium">{play.estimatedTime}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Difficulty</span>
            <div className="mt-1">
              <Badge className={difficultyColors[play.difficulty]}>
                {play.difficulty}
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Tool</span>
            <div className="flex gap-1 mt-1">
              {play.tools.map((t) => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-highlight hover:underline"
                >
                  {t.name} ({t.plan})
                </a>
              ))}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Author</span>
            <p className="font-medium">{play.author}</p>
          </div>
        </div>
      </div>

      {/* Section 3 - Video placeholder */}
      <section className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Demo video ({play.video.durationSeconds}s) - coming soon
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Captions enabled. Watch on mobile or desktop.
        </p>
      </section>

      {/* Learning note - why this works */}
      {play.learningNote && (
        <section className="rounded-lg bg-muted border border-border p-4 flex gap-3">
          <span className="text-highlight text-lg shrink-0">&#9432;</span>
          <div>
            <p className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">
              Why this works
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {play.learningNote}
            </p>
          </div>
        </section>
      )}

      <Separator />

      {/* Section 4 - What it does */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">What it does</h2>
        <p className="text-muted-foreground leading-relaxed">
          {play.oneLiner}
        </p>
      </section>

      {/* Section 5 - How to set it up */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Quick setup</h2>
        <div className="rounded-lg bg-muted/30 p-4 text-sm space-y-1">
          <p className="font-medium">Clone instructions:</p>
          <p className="text-muted-foreground">
            {play.artifact.cloneInstructions}
          </p>
        </div>
      </section>

      <Separator />

      {/* Section 6 - The Prompt */}
      <PromptBlock prompt={play.artifact.systemPrompt} />

      {/* Starter prompts - lower barrier for beginners */}
      {play.starterPrompts && play.starterPrompts.length > 0 && (
        <StarterPrompts prompts={play.starterPrompts} />
      )}

      <Separator />

      {/* Section 7 - When to use this */}
      <section className="rounded-lg border-l-4 border-brand bg-muted p-4 space-y-2">
        <h2 className="text-xl font-semibold">When to use this</h2>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {play.whenToUse}
        </p>
      </section>

      {/* Section 8 - Success signal */}
      <section className="rounded-lg border-l-4 border-brand bg-muted p-4 space-y-2">
        <h2 className="text-xl font-semibold">Success signal</h2>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {play.successSignal}
        </p>
      </section>

      <Separator />

      {/* Section 9 - Details and pitfalls (Markdown body) */}
      {play.content.trim() && (
        <section className="space-y-2">
          <MDXRemote
            source={play.content}
            options={{ mdxOptions: { format: "md" } }}
            components={bodyComponents}
          />
        </section>
      )}

      <Separator />

      {/* Section 10 - Related Plays */}
      {play.relatedPlays.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Related Plays</h2>
          <div className="flex flex-wrap gap-2">
            {play.relatedPlays.map((slug) => (
              <Link key={slug} href={`/plays/${slug}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted transition-colors"
                >
                  {slug.replace(/-/g, " ")}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Share + feedback */}
      <section className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-sm">
        <ShareButton
          title={play.title}
          text={`${play.title} (Med AI Plays):`}
          path={`/plays/${play.slug}`}
          label="Share this Play"
        />
        <a
          href={newIssueUrl(
            `[Play feedback] ${play.title}`,
            `About the Play "${play.title}" (${play.slug}, v${play.version}):\n\n**What didn't work, or what would make it better?**\n\n`,
            "play-feedback"
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="text-highlight hover:underline font-medium"
        >
          This didn&apos;t work for me
        </a>
        <Link href="/community" className="text-highlight hover:underline font-medium">
          Share your version
        </Link>
      </section>

      {/* Custom practice questions CTA */}
      <section className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        Want practice questions tailored to your exam and weak spots? Use the{" "}
        <Link href="/question-builder" className="text-highlight hover:underline font-medium">
          Question Builder
        </Link>
        .
      </section>

      {/* Footer */}
      <footer className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border">
        <p>
          Authored by {play.author}. Version {play.version}. Updated {play.updatedAt}.
        </p>
        <p>
          AI output can be wrong. Verify important facts, never enter patient
          identifiers, and follow your school&apos;s AI policy.
        </p>
      </footer>
    </article>
  );
}
