"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/plays");
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteNav() {
  const pathname = usePathname();
  // The menu is "open for" the path it was opened on, so it closes by itself
  // when the route changes.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  const linkClass = (active: boolean) =>
    `px-2.5 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
      active
        ? "text-brand font-semibold underline decoration-highlight decoration-2 underline-offset-[6px]"
        : "text-muted-foreground hover:text-brand hover:underline hover:decoration-highlight hover:decoration-2 hover:underline-offset-[6px]"
    }`;

  return (
    <nav aria-label="Main" className="mx-auto max-w-6xl px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight leading-none">
            Faculty <span className="bg-marker px-1 -mx-0.5">AI Plays</span>
          </span>
        </Link>

        <ul className="hidden sm:flex items-center gap-1 text-sm">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link href={link.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="sm:hidden border border-brand px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <ul id="mobile-menu" className="sm:hidden mt-3 grid gap-1 border-t border-border/60 pt-3 text-sm">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block px-2 py-2.5 rounded-md ${
                    active ? "text-brand font-semibold bg-marker" : "text-foreground hover:bg-marker/50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
