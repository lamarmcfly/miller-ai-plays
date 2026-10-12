// How the Community Board collects submissions and feedback. Chosen at build
// time from public env vars so server and client agree:
//   inline - the site's own API stores them (set NEXT_PUBLIC_COMMUNITY_BACKEND=inline
//            together with the Supabase server variables; see COMMUNITY.md)
//   form   - a hosted form such as Tally (NEXT_PUBLIC_COMMUNITY_FORM_URL)
//   github - a pre-filled GitHub issue (default; needs a GitHub account)

export type CommunityMode = "inline" | "form" | "github";

export const FORM_URL = process.env.NEXT_PUBLIC_COMMUNITY_FORM_URL;

export const communityMode: CommunityMode =
  process.env.NEXT_PUBLIC_COMMUNITY_BACKEND === "inline" ? "inline" : FORM_URL ? "form" : "github";
