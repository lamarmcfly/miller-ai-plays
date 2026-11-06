// How the Community Board collects submissions and feedback. Chosen at build
// time from public env vars so server and client agree:
//   inline - the site's own API stores them (set NEXT_PUBLIC_COMMUNITY_BACKEND=inline
//            together with the Supabase server variables; see COMMUNITY.md)
//   form   - a hosted form such as Tally (NEXT_PUBLIC_COMMUNITY_FORM_URL)
//   github - a pre-filled public GitHub issue (default on a public site; needs a GitHub account)
//   off    - nothing configured on a private site. Its posts must stay in the
//            group, so it never falls back to public GitHub issues.

import { SITE } from "./site";

export type CommunityMode = "inline" | "form" | "github" | "off";

export const FORM_URL = process.env.NEXT_PUBLIC_COMMUNITY_FORM_URL;
export const FEEDBACK_FORM_URL = process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL;

export function resolveCommunityMode(opts: { backend?: string; formUrl?: string; isPrivate: boolean }): CommunityMode {
  if (opts.backend === "inline") return "inline";
  if (opts.formUrl) return "form";
  return opts.isPrivate ? "off" : "github";
}

export const communityMode: CommunityMode = resolveCommunityMode({
  backend: process.env.NEXT_PUBLIC_COMMUNITY_BACKEND,
  formUrl: FORM_URL,
  isPrivate: SITE.private,
});
