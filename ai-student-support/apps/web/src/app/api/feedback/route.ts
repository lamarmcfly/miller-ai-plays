import { feedbackSchema } from "@/lib/community-intake";
import { createIntakeHandler } from "@/lib/intake-route";

export const POST = createIntakeHandler({
  schema: feedbackSchema,
  table: "play_feedback",
  limit: 30,
  windowMs: 60 * 60 * 1000,
  freeText: (f) => [f.note],
  toRow: (f) => ({
    kind: f.kind,
    target_id: f.targetId,
    result: f.result,
    note: f.note || null,
  }),
});
