import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { HowToUse } from "@/components/HowToUse";
import { PromptBlock } from "@/components/PromptBlock";
import { StarterPrompts } from "@/components/StarterPrompts";
import { getAllPlays, getPlayBySlug, listSlugs } from "@/lib/plays";
import { categories, difficultyColors, learnerLabels } from "@/lib/schema";
import { STANDARD_VERSION, withStandard } from "@/lib/standard";

const bodyComponents = {
  h2: (props: React.ComponentProps<"h2">) => <h2 className="text-xl font-semibold mt-8 mb-2 first:mt-0" {...props} />,
  h3: (props: React.ComponentProps<"h3">) => <h3 className="text-base font-semibold mt-4 mb-1" {...props} />,
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
  strong: (props: React.ComponentProps<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-highlight hover:underline" rel="noopener noreferrer" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs" {...props} />
  ),
};

// Only the Plays in content/plays exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const play = getPlayBySlug(slug);
  if (!play) return {};
  return {
    title: play.title,
    description: play.oneLiner,
    openGraph: { title: play.title, description: play.oneLiner, type: "article" },
  };
}

export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const play = getPlayBySlug(slug);
  if (!play) notFound();

  const titles = new Map(getAllPlays().map((p) => [p.slug, p.title]));
  const category = categories.find((c) => c.id === play.category)?.label;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{category}</p>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">{play.title}</h1>
        <p className="text-lg italic text-muted-foreground">{play.hook}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline" className={difficultyColors[play.difficulty]}>
            {play.difficulty}
          </Badge>
          <Badge variant="outline">{play.estimatedTime}</Badge>
          {play.learners.map((l) => (
            <Badge key={l} variant="outline">
              {learnerLabels[l]}
            </Badge>
          ))}
          {play.worksWithEat && <Badge className="bg-marker text-brand">Works with EAT</Badge>}
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">What it does</h2>
        <p className="text-muted-foreground leading-relaxed">{play.oneLiner}</p>
      </section>

      <HowToUse />

      <PromptBlock prompt={withStandard(play.prompt)} />

      {play.starterPrompts && play.starterPrompts.length > 0 && <StarterPrompts prompts={play.starterPrompts} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-lg border-l-4 border-brand bg-muted p-4 space-y-2">
          <h2 className="text-lg font-semibold">When to use it</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{play.whenToUse}</p>
        </section>
        <section className="rounded-lg border-l-4 border-brand bg-muted p-4 space-y-2">
          <h2 className="text-lg font-semibold">What good looks like</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{play.successSignal}</p>
        </section>
      </div>

      {play.whyItWorks && (
        <section className="rounded-lg border border-border bg-card p-4 space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand">Why it works</h2>
          <p className="text-sm leading-relaxed">{play.whyItWorks}</p>
        </section>
      )}

      {play.content.trim() && (
        <section className="border-t border-border pt-8">
          <MDXRemote source={play.content} options={{ mdxOptions: { format: "md" } }} components={bodyComponents} />
        </section>
      )}

      {play.relatedPlays.length > 0 && (
        <section className="space-y-3 border-t border-border pt-8">
          <h2 className="text-xl font-semibold">Related Plays</h2>
          <ul className="flex flex-wrap gap-2">
            {play.relatedPlays.map((s) => (
              <li key={s}>
                <Link
                  href={`/plays/${s}`}
                  className="inline-block border border-border bg-card px-3 py-1.5 text-sm hover:border-brand hover:bg-marker/30"
                >
                  {titles.get(s) ?? s}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border">
        <p>
          By {play.author}. Version {play.version}, updated {play.updatedAt}. Content standard v{STANDARD_VERSION}.
        </p>
        <p>
          AI output can be wrong. Check it before learners see it, never enter patient or student identifiers, and
          follow your school&apos;s AI policy.
        </p>
      </footer>
    </article>
  );
}
