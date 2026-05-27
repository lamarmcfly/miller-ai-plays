import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { difficultyColors, type Play } from "@/lib/schema";

export function PlayCard({ play }: { play: Play }) {
  return (
    <Link href={`/plays/${play.slug}`} className="group block h-full">
      <div className="h-full rounded-xl border border-border bg-card p-5 space-y-3 transition-all group-hover:shadow-lg group-hover:border-[#00543C]/30 group-hover:-translate-y-0.5">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-snug group-hover:text-[#00543C] transition-colors">
              {play.title}
            </h3>
            <Badge
              variant="outline"
              className={`shrink-0 text-[10px] ${difficultyColors[play.difficulty]}`}
            >
              {play.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground italic leading-snug">
            {play.hook}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {play.oneLiner}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-wrap gap-1">
            {play.year.map((y) => (
              <span
                key={y}
                className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
              >
                {y}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {play.estimatedTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
