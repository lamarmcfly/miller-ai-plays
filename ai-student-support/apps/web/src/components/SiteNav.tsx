"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { isActive, moreLinks, navLinks, searchLink, startLink } from "@/lib/nav";
import { SITE } from "@/lib/site";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function SiteNav() {
  const pathname = usePathname();
  // The menu is "open for" the path it was opened on, so it closes by itself
  // when the route changes.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const onStart = isActive(pathname, startLink.href);
  // On a private site's sign-in page every link would lead back here.
  const signIn = pathname === "/access";

  return (
    <nav aria-label="Main" className="mx-auto max-w-6xl px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className={`flex items-center gap-2.5 rounded-md ${focusRing}`}>
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight leading-none">
            {SITE.logo[0]} <span className="bg-marker px-1 -mx-0.5">{SITE.logo[1]}</span>
          </span>
        </Link>

        {!signIn && (
          <ul className="hidden lg:flex items-center gap-1 text-sm">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`px-2.5 py-1.5 transition-colors ${focusRing} ${
                      active
                        ? "text-brand font-semibold underline decoration-marker decoration-4 underline-offset-[6px]"
                        : "text-muted-foreground hover:text-brand hover:underline hover:decoration-marker hover:decoration-4 hover:underline-offset-[6px]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {!signIn && (
          <div className="flex items-center gap-2">
            <Link
              href={searchLink.href}
              aria-label={searchLink.label}
              aria-current={isActive(pathname, searchLink.href) ? "page" : undefined}
              className={`inline-flex size-9 items-center justify-center text-muted-foreground hover:text-brand hover:bg-marker/40 aria-[current=page]:bg-marker aria-[current=page]:text-brand ${focusRing}`}
            >
              <Search className="size-[18px]" aria-hidden="true" />
            </Link>
            <Link
              href={startLink.href}
              aria-current={onStart ? "page" : undefined}
              className={`hidden sm:inline-flex items-center bg-brand text-white hover:bg-brand-light px-4 py-2 text-sm font-semibold transition-colors ${focusRing}`}
            >
              {startLink.label}
            </Link>
            <button
              type="button"
              className={`lg:hidden border border-brand px-3 py-1.5 text-sm font-medium cursor-pointer ${focusRing}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpenFor(open ? null : pathname)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        )}
      </div>

      {open && !signIn && (
        <div id="mobile-menu" className="lg:hidden mt-3 border-t border-border/60 pt-3 space-y-3">
          <Link
            href={startLink.href}
            aria-current={onStart ? "page" : undefined}
            className="flex items-center justify-between bg-brand text-white px-4 py-3 text-sm font-semibold"
          >
            <span>{startLink.label}</span>
            <span className="font-normal text-stone-300">3 quick questions &rarr;</span>
          </Link>
          <ul className="grid gap-1 text-sm">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block px-2 py-2.5 ${
                      active ? "text-brand font-semibold bg-marker" : "text-foreground hover:bg-marker/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            {moreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block py-1.5 hover:text-brand hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
