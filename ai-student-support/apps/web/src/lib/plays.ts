import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { playSchema, type Play } from "./schema";

// In monorepo: process.cwd() is apps/web, content is at ../../content/plays
// On Vercel with root directory set: process.cwd() may vary
const CONTENT_DIR = (() => {
  const fromCwd = path.join(process.cwd(), "..", "..", "content", "plays");
  if (fs.existsSync(fromCwd)) return fromCwd;
  // Fallback: content dir relative to project root
  const fromRoot = path.join(process.cwd(), "content", "plays");
  if (fs.existsSync(fromRoot)) return fromRoot;
  return fromCwd;
})();

export function getAllPlays(): (Play & { content: string })[] {
  const slugs = fs
    .readdirSync(CONTENT_DIR)
    .filter((dir) => fs.statSync(path.join(CONTENT_DIR, dir)).isDirectory());

  return slugs
    .map((slug) => {
      const filePath = path.join(CONTENT_DIR, slug, "play.mdx");
      if (!fs.existsSync(filePath)) return null;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const parsed = playSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(`Schema validation failed for ${slug}:`, parsed.error.issues);
        return null;
      }
      return { ...parsed.data, content };
    })
    .filter(Boolean) as (Play & { content: string })[];
}

export function getPlayBySlug(slug: string): (Play & { content: string }) | null {
  const filePath = path.join(CONTENT_DIR, slug, "play.mdx");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const parsed = playSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Schema validation failed for ${slug}:`, parsed.error.issues);
    return null;
  }
  return { ...parsed.data, content };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((dir) => {
      const mdxPath = path.join(CONTENT_DIR, dir, "play.mdx");
      return fs.statSync(path.join(CONTENT_DIR, dir)).isDirectory() && fs.existsSync(mdxPath);
    });
}
