import type { MetadataRoute } from "next";
import { SITE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A private site asks every crawler to stay out; src/proxy.ts also blocks them.
  if (SITE.private) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
