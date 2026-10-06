import type { Metadata } from "next";
import { getAllPlays } from "@/lib/plays";
import { StartWizard } from "@/components/StartWizard";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "Answer three quick questions and get a personal order to learn the AI study workflows that fit your exam and experience.",
};

export default function StartPage() {
  const plays = getAllPlays().map((p) => ({
    slug: p.slug,
    title: p.title,
    oneLiner: p.oneLiner,
    estimatedTime: p.estimatedTime,
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Start here</p>
        <h1 className="text-4xl font-medium leading-tight">
          Three questions.{" "}
          <span className="italic bg-marker px-1.5 -mx-1">One clear path.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Tell us what you&apos;re preparing for and how much AI you&apos;ve used. You&apos;ll get the few workflows worth
          learning first, in order, plus the right tool for each job.
        </p>
      </header>
      <StartWizard plays={plays} />
    </div>
  );
}
