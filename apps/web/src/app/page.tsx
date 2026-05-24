import { getAllPlays } from "@/lib/plays";
import { PlayGrid } from "@/components/PlayGrid";
import { QuickStart } from "@/components/QuickStart";
import { PlaysForRightNow } from "@/components/PlaysForRightNow";

export default function HomePage() {
  const plays = getAllPlays();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Miller AI Plays
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          AI workflows for medical students. 90 seconds to learn, 5 minutes to
          use. No long guides. No theory. Just specific, repeatable workflows
          built for the way you actually study.
        </p>
      </section>

      <QuickStart />

      <PlaysForRightNow />

      <PlayGrid plays={plays} />
    </div>
  );
}
