import { z } from "zod";

export const categories = [
  { id: "getting-started", label: "Getting started" },
  { id: "pearls", label: "Teaching pearls" },
  { id: "assessment", label: "Exam questions" },
  { id: "curriculum", label: "Objectives and sessions" },
  { id: "quality", label: "Checking and review" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

const categoryIds = categories.map((c) => c.id) as [CategoryId, ...CategoryId[]];

export const learnerLabels = {
  "pre-clerkship": "Pre-clerkship",
  clerkship: "Clerkship",
  residents: "Residents",
} as const;

export const starterPromptSchema = z.object({
  label: z.string().min(1),
  prompt: z.string().min(1),
});

export const playSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  hook: z.string().min(1),
  oneLiner: z.string().min(1),

  category: z.enum(categoryIds),
  /** Position within its category on the home page, lowest first. */
  order: z.number().int().min(1).default(100),
  learners: z.array(z.enum(["pre-clerkship", "clerkship", "residents"])).min(1),
  estimatedTime: z.string().min(1),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  /** Shows the "Works with EAT" note. Set only when the output imports into EAT. */
  worksWithEat: z.boolean().default(false),

  /** The Play's own instructions. The faculty content standard is appended when copied. */
  prompt: z.string().min(200),
  starterPrompts: z.array(starterPromptSchema).optional(),

  whenToUse: z.string().min(1),
  successSignal: z.string().min(1),
  whyItWorks: z.string().optional(),

  tags: z.array(z.string()),
  relatedPlays: z.array(z.string()),

  author: z.string(),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  version: z.string(),
});

export type Play = z.infer<typeof playSchema>;

export const difficultyColors: Record<Play["difficulty"], string> = {
  beginner: "bg-[#e3efe6] text-[#24502f] border-[#b9d3bf]",
  intermediate: "bg-marker text-brand border-[#a9c4e2]",
  advanced: "bg-[#f3e1dc] text-[#7a2e22] border-[#dfb8ae]",
};
