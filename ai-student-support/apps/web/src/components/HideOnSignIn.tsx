"use client";

import { usePathname } from "next/navigation";

/** Hides its children on a private site's sign-in page, where site links only lead back. */
export function HideOnSignIn({ children }: { children: React.ReactNode }) {
  return usePathname() === "/access" ? null : <>{children}</>;
}
