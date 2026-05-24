import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  categoryLabels,
  categoryColors,
  type CommunityPost,
} from "@/lib/community-schema";
import { CopyButton } from "./CopyButton";

export function CommunityPostCard({
  post,
}: {
  post: CommunityPost & { content: string };
}) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug">
            {post.title}
          </h3>
          <Badge
            variant="outline"
            className={`shrink-0 text-xs ${categoryColors[post.category]}`}
          >
            {categoryLabels[post.category]}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{post.authorDisplayName}</span>
          <span>-</span>
          <span>{post.submittedAt}</span>
          {post.relatedPlay && (
            <>
              <span>-</span>
              <Link
                href={`/plays/${post.relatedPlay}`}
                className="text-[#F47321] hover:underline"
              >
                Related Play
              </Link>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{post.body}</p>

        {post.promptText && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Shared prompt
              </span>
              <CopyButton text={post.promptText} label="Copy" />
            </div>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono bg-muted/50 rounded-md p-3 border border-border">
              {post.promptText}
            </pre>
          </div>
        )}

        {post.outcomeDescription && (
          <div className="text-sm">
            <span className="font-medium">Result: </span>
            <span className="text-muted-foreground">
              {post.outcomeDescription}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          {post.selfRatedUsefulness && (
            <span className="text-xs text-muted-foreground">
              Usefulness: {post.selfRatedUsefulness}/5
            </span>
          )}
          <Badge
            variant="outline"
            className="text-xs bg-green-50 text-green-700 border-green-200"
          >
            Reviewed by Council
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
