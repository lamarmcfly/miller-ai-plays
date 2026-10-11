import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { difficultyColors, type Play } from "@/lib/schema";

export function PlayCard({ play }: { play: Play }) {
  return (
    <Link href={`/plays/${play.slug}`} className="group block h-full">
      <div className="h-full rounded-xl border border-border bg-card p-5 space-y-3 transition-colors group-hover:border-brand group-hover:bg-marker/30">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-snug">{play.title}</h3>
            <Badge variant="outline" className={`shrink-0 text-[10px] ${difficultyColors[play.difficulty]}`}>
              {play.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground italic leading-snug">{play.hook}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
          <span>{play.estimatedTime}</span>
          {play.worksWithEat && (
            <span className="rounded bg-marker px-1.5 py-0.5 font-medium text-brand">Works with EAT</span>
          )}
        </div>
      </div>
    </Link>
  );
}
