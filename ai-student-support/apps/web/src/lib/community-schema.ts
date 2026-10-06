import { z } from "zod";

export const communityPostSchema = z.object({
  id: z.string(),
  submittedAt: z.string(),
  authorCohort: z.enum(["MS1", "MS2", "MS3", "MS4"]),
  authorDisplayName: z.string(),
  category: z.enum(["prompt", "question", "workflow-tip"]),
  examContext: z.array(
    z.enum(["step1", "step2", "step3", "comlex", "shelf", "osce", "clerkship", "coursework"])
  ),
  toolUsed: z.string(),
  title: z.string().min(1),
  body: z.string(),
  promptText: z.string().optional(),
  outcomeDescription: z.string().optional(),
  selfRatedUsefulness: z.number().min(1).max(5).optional(),
  relatedPlay: z.string().optional(),
  // Set when maintainers turn a community post into an official Play.
  promotedToPlay: z.string().optional(),
  status: z.literal("approved"),
  reviewDate: z.string(),
});

export type CommunityPost = z.infer<typeof communityPostSchema>;

export const categoryLabels: Record<string, string> = {
  prompt: "Prompt",
  question: "Question",
  "workflow-tip": "Workflow Tip",
};

export const categoryColors: Record<string, string> = {
  prompt: "bg-muted text-brand",
  question: "bg-muted text-brand",
  "workflow-tip": "bg-muted text-brand",
};
