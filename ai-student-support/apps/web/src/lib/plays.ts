import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { playSchema, type Play } from "./schema";
import { SITE, type SiteId } from "./site";

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

/** Whether a Play shows on a site. Untagged Plays show on both. */
export function availableOn(play: Pick<Play, "sites">, site: SiteId = SITE.id): boolean {
  return !play.sites || play.sites.includes(site);
}

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
    .filter((p): p is Play & { content: string } => p !== null && availableOn(p));
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
  return availableOn(parsed.data) ? { ...parsed.data, content } : null;
}

/** True once a Play's demo video file has been added under public/. */
export function hasVideo(play: Play): boolean {
  const url = play.video.url;
  if (!url.startsWith("/")) return /^https:\/\//.test(url);
  return [path.join(process.cwd(), "public"), path.join(process.cwd(), "apps", "web", "public")].some((dir) =>
    fs.existsSync(path.join(dir, url))
  );
}

export function getAllSlugs(): string[] {
  return getAllPlays().map((p) => p.slug);
}
