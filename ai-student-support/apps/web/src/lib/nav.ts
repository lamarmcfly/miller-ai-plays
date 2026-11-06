// Site structure. A first-time visitor sees one front door (Start here) and
// five destinations. Everything else is reachable from the footer.

import { SITE } from "./site";

export type NavLink = { href: string; label: string };

/** The guided entry point, shown as the one button in the header. */
export const startLink: NavLink = { href: "/start", label: "Start here" };

/** The main destinations, in the header on every page. */
export const navLinks: NavLink[] = [
  { href: "/plays", label: "Plays" },
  { href: "/question-builder", label: "Practice Questions" },
  { href: "/prompts", label: "Prompt Templates" },
  { href: "/toolkit", label: "AI Tools" },
  { href: "/community", label: "Community" },
];

export const searchLink: NavLink = { href: "/search", label: "Search" };

/** Curated guides by stage of training, named the way each site names them. */
export const stageLinks: (NavLink & { blurb: string })[] = (["1", "2", "3"] as const).map((id) => ({
  href: `/phase/${id}`,
  label: SITE.stages[id].name,
  blurb: SITE.stages[id].blurb,
}));

/** Reference pages that do not need a header slot. */
export const moreLinks: NavLink[] = [
  { href: "/cheat-sheet", label: "One-page cheat sheet" },
  searchLink,
  { href: "/about", label: "About" },
];

/** Which header item a path belongs to. Phase guides live under Plays. */
export function isActive(pathname: string, href: string): boolean {
  if (href === "/plays") return pathname.startsWith("/plays") || pathname.startsWith("/phase");
  return pathname === href || pathname.startsWith(href + "/");
}
