import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { playSchema, type Play } from "./schema";
import { expandEatTokens } from "./eat-format";

export type PlayWithBody = Play & { content: string };

// In the monorepo process.cwd() is apps/web, so content is at ../../content/plays.
// Scripts run from the site root, where it is ./content/plays.
export const CONTENT_DIR = (() => {
  const fromApp = path.join(process.cwd(), "..", "..", "content", "plays");
  if (fs.existsSync(fromApp)) return fromApp;
  return path.join(process.cwd(), "content", "plays");
})();

export type ReadResult =
  | { slug: string; ok: true; play: PlayWithBody }
  | { slug: string; ok: false; errors: string[] };

/**
 * Read and validate one Play. {{EAT_...}} tokens in the prompt and starter prompts
 * are expanded here, so pages and scripts see exactly the text a user copies
 * (before the faculty standard is appended).
 */
export function readPlay(dir: string, slug: string): ReadResult {
  const filePath = path.join(dir, slug, "play.mdx");
  if (!fs.existsSync(filePath)) return { slug, ok: false, errors: ["play.mdx is missing"] };
  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  const parsed = playSchema.safeParse(data);
  if (!parsed.success) {
    return { slug, ok: false, errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`) };
  }
  try {
    const play = parsed.data;
    return {
      slug,
      ok: true,
      play: {
        ...play,
        prompt: expandEatTokens(play.prompt),
        starterPrompts: play.starterPrompts?.map((s) => ({ ...s, prompt: expandEatTokens(s.prompt) })),
        content,
      },
    };
  } catch (e) {
    return { slug, ok: false, errors: [(e as Error).message] };
  }
}

export function listSlugs(dir: string = CONTENT_DIR): string[] {
  return fs
    .readdirSync(dir)
    .filter((d) => fs.statSync(path.join(dir, d)).isDirectory())
    .sort();
}

export function getAllPlays(): PlayWithBody[] {
  return listSlugs()
    .map((slug) => readPlay(CONTENT_DIR, slug))
    .flatMap((r) => {
      if (r.ok) return [r.play];
      console.warn(`Play ${r.slug} failed validation:`, r.errors);
      return [];
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getPlayBySlug(slug: string): PlayWithBody | null {
  if (!listSlugs().includes(slug)) return null;
  const r = readPlay(CONTENT_DIR, slug);
  return r.ok ? r.play : null;
}
