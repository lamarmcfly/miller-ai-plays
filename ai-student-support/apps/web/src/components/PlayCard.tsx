import Link from "next/link";
import type { Play } from "@/lib/schema";

export function PlayCard({ play }: { play: Play }) {
  return (
    <Link
      href={`/plays/${play.slug}`}
      className="group flex h-full flex-col justify-between gap-4 border border-border bg-card p-5 transition-colors hover:border-brand hover:bg-marker/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-snug group-hover:underline decoration-marker decoration-4 underline-offset-4">
          {play.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{play.oneLiner}</p>
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        {play.estimatedTime} &middot; {play.difficulty}
      </p>
    </Link>
  );
}
