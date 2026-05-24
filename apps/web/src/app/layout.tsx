import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
    "AI workflows for medical students. 90 seconds. No fluff. A peer-curated library from Academic Enrichment Services at UM Miller School of Medicine.",
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
        <header className="border-b border-border bg-white sticky top-0 z-50">
          <nav className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-[#00543C]">
                Miller AI Plays
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Browse
              </Link>
              <Link
                href="/toolkit"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Toolkit
              </Link>
              <Link
                href="/community"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Community
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/council"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Council
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border bg-muted/40 mt-auto">
          <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-muted-foreground space-y-1">
            <p>
              Created by{" "}
              <span className="font-medium text-foreground">
                Lamar Martin
              </span>
              , Academic Enrichment Services
            </p>
            <p>University of Miami Miller School of Medicine</p>
            <p className="italic">
              Not an official University of Miami publication.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
