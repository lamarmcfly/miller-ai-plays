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
    default: "Miller AI Workflows",
    template: "%s | Miller AI Workflows",
  },
  description:
    "AI workflows for medical students. 90 seconds. No fluff. A peer-curated library from Academic Enrichment Services at UM Miller School of Medicine.",
};

const navLinks = [
  { href: "/", label: "Browse" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/council", label: "Council" },
];

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
        <header className="border-b border-border/60 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
          <nav className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#00543C] flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-[#00543C] leading-none">
                  Miller AI Workflows
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                  Academic Enrichment Services
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-1 sm:gap-5 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border/60 bg-[#00543C] mt-auto">
          <div className="mx-auto max-w-5xl px-4 py-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white font-semibold text-sm">
                  Miller AI Workflows
                </p>
                <p className="text-green-200/70 text-xs mt-0.5">
                  Academic Enrichment Services
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-green-200/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t border-green-200/20 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-green-200/60">
              <p>
                Created by{" "}
                <span className="text-green-200/90">Lamar Martin</span>,
                University of Miami Miller School of Medicine
              </p>
              <p className="italic">
                Not an official University of Miami publication.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
