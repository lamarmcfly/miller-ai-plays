"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/plays") || pathname.startsWith("/phase");
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteNav() {
  const pathname = usePathname();
  // The menu is "open for" the path it was opened on, so it closes by itself
  // when the route changes.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;

  return (
    <nav aria-label="Main" className="mx-auto max-w-6xl px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <div aria-hidden="true" className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-brand leading-none">Miller AI Plays</span>
            <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
              AI study workflows for medical students
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-2.5 py-1.5 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                    active
                      ? "text-brand font-medium bg-brand/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="md:hidden rounded-md border border-border px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <ul id="mobile-menu" className="md:hidden mt-3 grid gap-1 border-t border-border/60 pt-3 text-sm">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block px-2 py-2.5 rounded-md ${
                    active ? "text-brand font-medium bg-brand/5" : "text-foreground hover:bg-muted/50"
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
