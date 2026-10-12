import { submissionSchema } from "@/lib/community-intake";
import { createIntakeHandler } from "@/lib/intake-route";

export const POST = createIntakeHandler({
  schema: submissionSchema,
  table: "community_submissions",
  limit: 5,
  windowMs: 60 * 60 * 1000,
  freeText: (s) => [s.title, s.prompt, s.outcome],
  toRow: (s) => ({
    cohort: s.cohort,
    category: s.category,
    exam_context: s.examContext,
    title: s.title,
    tool: s.tool,
    prompt: s.prompt,
    outcome: s.outcome || null,
    usefulness: s.usefulness ?? null,
  }),
});
