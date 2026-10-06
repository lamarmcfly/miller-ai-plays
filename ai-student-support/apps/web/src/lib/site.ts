// Canonical public URL, used for social previews, the sitemap, and robots.
// Set NEXT_PUBLIC_SITE_URL when the site moves to a custom domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://miller-ai-plays.vercel.app").replace(/\/$/, "");
export const SITE_NAME = "Med AI Plays";
export const SITE_TAGLINE = "AI study workflows and custom practice questions for medical students. 90 seconds to learn. 5 minutes to use.";
