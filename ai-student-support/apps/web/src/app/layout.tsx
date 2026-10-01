import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { navLinks } from "@/lib/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Miller AI Plays",
    template: "%s | Miller AI Plays",
  },
  description:
    "AI study workflows and custom practice-question prompts for medical students at any school. 90 seconds to learn, 5 minutes to use.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <header className="border-b border-border/60 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
          <SiteNav />
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-border/60 bg-indigo-950 mt-auto">
          <div className="mx-auto max-w-6xl px-4 py-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm">Miller AI Plays</p>
                <p className="text-indigo-200/80 text-xs mt-0.5">
                  A free study resource for medical students at any school
                </p>
              </div>
              <nav aria-label="Footer" className="flex flex-wrap gap-4 text-xs">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-indigo-200/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t border-indigo-200/20 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-indigo-200/70">
              <p>
                Created by <span className="text-indigo-100">Lamar Martin</span>
              </p>
              <p className="italic">
                Independent project. Not affiliated with any medical school, exam provider, or AI company. For study
                only; not medical advice.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
