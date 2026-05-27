import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

// Inline schema to avoid TS path alias issues in standalone script
const toolSchema = z.object({
  name: z.string(),
  plan: z.enum(["free", "pro"]),
  url: z.string().url(),
});

const videoSchema = z.object({
  url: z.string(),
  poster: z.string(),
  durationSeconds: z.number().int().positive(),
  captions: z.string(),
});

const artifactSchema = z.object({
  type: z.enum(["claude-project", "notebooklm", "copilot-agent", "prompt"]),
  name: z.string(),
  systemPrompt: z.string(),
  cloneInstructions: z.string(),
  cloneUrl: z.string().url().nullable(),
});

const playSchema = z.object({
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
  starterPrompts: z.array(z.object({ label: z.string(), prompt: z.string() })).optional(),
  tags: z.array(z.string()),
  relatedPlays: z.array(z.string()),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  version: z.string(),
});

const CONTENT_DIR = path.join(__dirname, "..", "content", "plays");

let errors = 0;
let validated = 0;

const slugs = fs
  .readdirSync(CONTENT_DIR)
  .filter((d) => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory());

for (const slug of slugs) {
  const filePath = path.join(CONTENT_DIR, slug, "play.mdx");
  if (!fs.existsSync(filePath)) {
    console.error(`[MISSING] ${slug}/play.mdx does not exist`);
    errors++;
    continue;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  const result = playSchema.safeParse(data);

  if (!result.success) {
    console.error(`[FAIL] ${slug}:`);
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
    errors++;
  } else {
    // Editorial standard checks
    if (result.data.video.durationSeconds > 90) {
      console.warn(
        `[WARN] ${slug}: Video duration ${result.data.video.durationSeconds}s exceeds 90s cap`
      );
    }
    if (result.data.tools.length > 1) {
      console.warn(
        `[WARN] ${slug}: Multiple tools listed - v1 standard is one tool per Play`
      );
    }
    console.log(`[OK] ${slug}`);
    validated++;
  }
}

console.log(`\nValidated: ${validated} | Errors: ${errors} | Total: ${slugs.length}`);
if (errors > 0) process.exit(1);
