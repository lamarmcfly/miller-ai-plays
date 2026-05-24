import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { communityPostSchema, type CommunityPost } from "./community-schema";

const COMMUNITY_DIR = (() => {
  const fromCwd = path.join(process.cwd(), "..", "..", "content", "community");
  if (fs.existsSync(fromCwd)) return fromCwd;
  const fromRoot = path.join(process.cwd(), "content", "community");
  if (fs.existsSync(fromRoot)) return fromRoot;
  return fromCwd;
})();

export function getAllCommunityPosts(): (CommunityPost & { content: string })[] {
  if (!fs.existsSync(COMMUNITY_DIR)) return [];

  const files = fs
    .readdirSync(COMMUNITY_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(COMMUNITY_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const parsed = communityPostSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(`Community post validation failed for ${file}:`, parsed.error.issues);
        return null;
      }
      return { ...parsed.data, content };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.submittedAt).getTime() - new Date(a!.submittedAt).getTime()) as (CommunityPost & { content: string })[];
}
