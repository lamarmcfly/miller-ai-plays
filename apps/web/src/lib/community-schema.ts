import { z } from "zod";

export const communityPostSchema = z.object({
  id: z.string(),
  submittedAt: z.string(),
  authorCohort: z.enum(["MS1", "MS2", "MS3", "MS4"]),
  authorDisplayName: z.string(),
  category: z.enum(["prompt", "question", "workflow-tip"]),
  examContext: z.array(
    z.enum(["step1", "step2", "shelf", "osce", "clerkship", "coursework"])
  ),
  toolUsed: z.string(),
  title: z.string().min(1),
  body: z.string(),
  promptText: z.string().optional(),
  outcomeDescription: z.string().optional(),
  selfRatedUsefulness: z.number().min(1).max(5).optional(),
  relatedPlay: z.string().optional(),
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
  prompt: "bg-purple-100 text-purple-800",
  question: "bg-blue-100 text-blue-800",
  "workflow-tip": "bg-amber-100 text-amber-800",
};
