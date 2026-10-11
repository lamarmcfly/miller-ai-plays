import type { Metadata } from "next";
import { getAllPlays } from "@/lib/plays";
import { StartWizard } from "@/components/StartWizard";

export const metadata: Metadata = {
  title: "Start Here",
  description: "Two questions, then the few AI workflows worth learning first for what you're making, in order.",
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
          Two questions. <span className="italic bg-marker px-1.5 -mx-1">One clear path.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Tell us what you&apos;re making and how much you&apos;ve used AI. You&apos;ll get the workflows to learn
          first, in order. If you&apos;re new to AI, the path starts with a guided 20-minute session.
        </p>
      </header>
      <StartWizard plays={plays} />
    </div>
  );
}
