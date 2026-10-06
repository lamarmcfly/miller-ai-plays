import type { MetadataRoute } from "next";
import { getAllPlays } from "@/lib/plays";
import { SITE_URL } from "@/lib/site";
import { goals } from "@/lib/start-path";

const staticPaths = [
  "/",
  "/start",
  "/question-builder",
  "/prompts",
  "/toolkit",
  "/community",
  "/cheat-sheet",
  "/search",
  "/about",
  "/phase/1",
  "/phase/2",
  "/phase/3",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const plays = getAllPlays().map((p) => ({
    url: `${SITE_URL}/plays/${p.slug}`,
    lastModified: p.updatedAt,
    priority: 0.7,
  }));
  const exams = goals.map((g) => ({ url: `${SITE_URL}/exams/${g.id}`, priority: 0.8 }));
  return [...exams, ...staticPaths.map((p) => ({ url: `${SITE_URL}${p}`, priority: p === "/" ? 1 : 0.8 })), ...plays];
}
