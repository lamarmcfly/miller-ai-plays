import { z } from "zod";

export const toolSchema = z.object({
  name: z.string(),
  plan: z.enum(["free", "pro"]),
  url: z.string().url(),
});

export const videoSchema = z.object({
  url: z.string(),
  poster: z.string(),
  durationSeconds: z.number().int().positive(),
  captions: z.string(),
});

export const artifactSchema = z.object({
  type: z.enum(["claude-project", "notebooklm", "copilot-agent", "prompt"]),
  name: z.string(),
  systemPrompt: z.string(),
  cloneInstructions: z.string(),
  cloneUrl: z.string().url().nullable(),
});

export const pitfallSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const starterPromptSchema = z.object({
  label: z.string(),
  prompt: z.string(),
});

export const playSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  hook: z.string().min(1),
  oneLiner: z.string().min(1),

  audience: z.array(
    z.enum(["step1", "step2", "shelf", "osce", "clerkship", "coursework"])
  ),
  year: z.array(z.enum(["MS1", "MS2", "MS3", "MS4"])),
  estimatedTime: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),

  tools: z.array(toolSchema),

  video: videoSchema,

  artifact: artifactSchema,

  whenToUse: z.string(),
  successSignal: z.string(),

  learningNote: z.string().optional(),
  starterPrompts: z.array(starterPromptSchema).optional(),

  tags: z.array(z.string()),
  relatedPlays: z.array(z.string()),

  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  version: z.string(),
});

export type Play = z.infer<typeof playSchema>;

export const audienceLabels: Record<string, string> = {
  step1: "Step 1",
  step2: "Step 2 CK",
  shelf: "Shelf",
  osce: "OSCE",
  clerkship: "Clerkship",
  coursework: "Coursework",
};

export const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-amber-100 text-amber-800",
  advanced: "bg-red-100 text-red-800",
};
