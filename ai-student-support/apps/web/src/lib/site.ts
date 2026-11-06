// One codebase, two sites. Everything that differs between Miller AI Plays
// (Miller students only) and Med AI Plays (national, public) lives here.
// Each deployment picks its site with NEXT_PUBLIC_SITE_ID. See SITES.md.

export type SiteId = "med" | "miller";
export type StageId = "1" | "2" | "3";

type Stage = {
  /** What the site calls this stage, e.g. "Phase 1" or "Pre-clerkship". */
  name: string;
  /** A few words on what happens in it. */
  blurb: string;
  /** Opening words for the stage guide's intro sentence. */
  intro: string;
};

export type SiteProfile = {
  id: SiteId;
  name: string;
  /** The logo: the second part gets the marker highlight. */
  logo: [string, string];
  tagline: string;
  /** Short line above headlines, e.g. "For Miller students". */
  audience: string;
  footerBlurb: string;
  /** Production URL used when NEXT_PUBLIC_SITE_URL is not set. */
  defaultUrl: string;
  /**
   * Private sites need an access code on every page (src/proxy.ts), stay out
   * of search engines, and never send community posts to public GitHub issues.
   */
  private: boolean;
  /** Whether stage names are local labels worth adding in parentheses. */
  localStageNames: boolean;
  /** The everyday word for a stage: "phase" at Miller, "stage" nationally. */
  stageWord: string;
  stages: Record<StageId, Stage>;
  /** The About page's "Who it's for" paragraph. */
  aboutWhoFor: string;
  community: { heading: string; blurb: string; groupHeading?: string; groupBlurb?: string };
};

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const sites: Record<SiteId, SiteProfile> = {
  med: {
    id: "med",
    name: "Med AI Plays",
    logo: ["Med AI", "Plays"],
    tagline:
      "AI study workflows and custom practice questions for medical students. 90 seconds to learn. 5 minutes to use.",
    audience: "For medical students at any school",
    footerBlurb: "Free, copy-paste AI study workflows for medical students at any school. Works in any AI tool.",
    defaultUrl: vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000",
    private: false,
    localStageNames: false,
    stageWord: "stage",
    stages: {
      "1": {
        name: "Pre-clerkship",
        blurb: "Lectures, course exams, and Step 1",
        intro: "Pre-clerkship (also called foundations or the first two years)",
      },
      "2": {
        name: "Clerkships",
        blurb: "Rotations, shelf exams, and Step 2",
        intro: "The clerkship year (core clinical rotations)",
      },
      "3": {
        name: "Advanced clinical",
        blurb: "Sub-internships, electives, and residency prep",
        intro: "The advanced clinical year (also called post-clerkship or the final year)",
      },
    },
    aboutWhoFor:
      "Any medical student, at any school: pre-clerkship coursework, clerkships and shelf exams, advanced clinical rotations, and licensing exams such as USMLE Steps 1, 2 CK and 3 and COMLEX-USA. Schools name these stages differently, so this site uses plain terms: pre-clerkship, clerkships, and advanced clinical.",
    community: {
      heading: "Community Board",
      blurb:
        "Prompts, workflows, and tips from medical students who are already using AI well. Borrow what works, and add your own. Every post is reviewed for safety before it goes live.",
    },
  },
  miller: {
    id: "miller",
    name: "Miller AI Plays",
    logo: ["Miller AI", "Plays"],
    tagline:
      "AI study workflows and custom practice questions for Miller students. 90 seconds to learn. 5 minutes to use.",
    audience: "For Miller students",
    footerBlurb: "Copy-paste AI study workflows for Miller students. Works in any AI tool.",
    defaultUrl: "https://miller-ai-plays.vercel.app",
    private: true,
    localStageNames: true,
    stageWord: "phase",
    stages: {
      "1": { name: "Phase 1", blurb: "Pre-clerkship", intro: "Phase 1 (pre-clerkship)" },
      "2": { name: "Phase 2", blurb: "Clerkships and Step 2", intro: "Phase 2 (core clinical rotations)" },
      "3": { name: "Phase 3", blurb: "Advanced clinical and residency", intro: "Phase 3 (advanced clinical)" },
    },
    aboutWhoFor:
      "Miller students in every phase: Phase 1 coursework, Phase 2 clerkships and shelf exams, Phase 3 advanced clinical rotations, and licensing exams such as USMLE Steps 1, 2 CK and 3 and COMLEX-USA.",
    community: {
      heading: "Miller Community",
      blurb:
        "Prompts, workflows, and tips from Miller students. Borrow what works, and add your own. Every post is reviewed for safety before it goes live.",
      groupHeading: "From the Miller group",
      groupBlurb: "Shared by Miller students. These posts stay on this site and never appear on Med AI Plays.",
    },
  },
};

export function resolveSiteId(value: string | undefined): SiteId {
  if (!value) return "med";
  if (value === "med" || value === "miller") return value;
  // Fail the build rather than publish the wrong site, e.g. a private site as public.
  throw new Error(`NEXT_PUBLIC_SITE_ID must be "med" or "miller", not "${value}".`);
}

// Read literally so Next.js inlines it into browser code too.
export const SITE: SiteProfile = sites[resolveSiteId(process.env.NEXT_PUBLIC_SITE_ID)];

// Canonical public URL, used for social previews, the sitemap, and robots.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE.defaultUrl).replace(/\/$/, "");
export const SITE_NAME = SITE.name;
export const SITE_TAGLINE = SITE.tagline;

/** "Phase 2: Clerkships and Step 2" on Miller, "Clerkships" on Med. */
export function stageLabel(id: StageId, site: SiteProfile = SITE): string {
  const s = site.stages[id];
  return site.localStageNames ? `${s.name}: ${s.blurb}` : s.name;
}

/** " (Phase 2)" on Miller, "" on Med: for sentences that already name the stage generically. */
export function stageTag(id: StageId, site: SiteProfile = SITE): string {
  return site.localStageNames ? ` (${site.stages[id].name})` : "";
}
