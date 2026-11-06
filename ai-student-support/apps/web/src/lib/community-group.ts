// Posts that stay inside a private site's group (Miller AI Plays). They live
// only in that site's own Supabase project, never in this public repository,
// and are read on each request behind the access gate. A maintainer publishes
// one by setting its status to "approved" in Supabase (see SITES.md).

import { communityPostSchema, type CommunityPost } from "./community-schema";
import { selectRows } from "./supabase-rest";

type Row = {
  id: string;
  created_at: string;
  cohort: string;
  category: string;
  exam_context: string[];
  title: string;
  tool: string;
  prompt: string;
  outcome: string | null;
  usefulness: number | null;
};

// The intake form's exam labels (EXAM_CONTEXTS in community-intake.ts), lowercased.
const EXAM_KEYS: Record<string, string> = {
  "step 1": "step1",
  "step 2 ck": "step2",
  "step 3": "step3",
  comlex: "comlex",
  shelf: "shelf",
  osce: "osce",
  clerkship: "clerkship",
  coursework: "coursework",
};

/** Turn a stored submission into the shape the Community Board renders. */
export function rowToPost(row: Row): (CommunityPost & { content: string }) | null {
  const day = row.created_at.slice(0, 10);
  const parsed = communityPostSchema.safeParse({
    id: `group-${row.id}`,
    submittedAt: day,
    authorCohort: row.cohort,
    authorDisplayName: `${row.cohort} student`,
    category: row.category,
    examContext: [...new Set(row.exam_context.map((e) => EXAM_KEYS[e.toLowerCase()]).filter(Boolean))],
    toolUsed: row.tool,
    title: row.title,
    body: row.outcome ?? "",
    promptText: row.prompt,
    selfRatedUsefulness: row.usefulness ?? undefined,
    status: "approved",
    reviewDate: day,
  });
  return parsed.success ? { ...parsed.data, content: "" } : null;
}

export async function getGroupPosts(): Promise<(CommunityPost & { content: string })[]> {
  const rows = await selectRows<Row>(
    "community_submissions",
    "select=id,created_at,cohort,category,exam_context,title,tool,prompt,outcome,usefulness&status=eq.approved&order=created_at.desc&limit=200"
  );
  return (rows ?? []).map(rowToPost).filter((p): p is NonNullable<typeof p> => p !== null);
}
