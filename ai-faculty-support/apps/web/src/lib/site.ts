// Canonical public URL, used for social previews. Set NEXT_PUBLIC_SITE_URL in the
// faculty site's own Vercel project when it gets a custom domain; until then Vercel's
// production URL is used.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");
export const SITE_NAME = "Faculty AI Plays";
export const SITE_TAGLINE =
  "Copy-paste AI workflows for medical school faculty: pearls, exam questions, objectives and cases, with one content standard built into every prompt.";
