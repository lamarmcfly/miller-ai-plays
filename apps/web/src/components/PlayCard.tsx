import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { audienceLabels, difficultyColors, type Play } from "@/lib/schema";

export function PlayCard({ play }: { play: Play }) {
  return (
    <Link href={`/plays/${play.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-border">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold leading-snug">{play.title}</h3>
          <p className="text-sm text-muted-foreground italic">{play.hook}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {play.oneLiner}
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className={difficultyColors[play.difficulty]}>
              {play.difficulty}
            </Badge>
            <Badge variant="outline">{play.estimatedTime}</Badge>
            {play.tools.map((t) => (
              <Badge key={t.name} variant="secondary">
                {t.name}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {play.audience.map((a) => (
              <span
                key={a}
                className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
              >
                {audienceLabels[a] || a}
              </span>
            ))}
            {play.year.map((y) => (
              <span
                key={y}
                className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
              >
                {y}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
