import type { Metadata, Viewport } from "next";
import { Newsreader, Instrument_Sans, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { UsageAnalytics } from "@/components/UsageAnalytics";
import { navLinks } from "@/lib/nav";
import { goals } from "@/lib/start-path";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Newsreader({
  variable: "--font-display-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const body = Instrument_Sans({
  variable: "--font-body-face",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_TAGLINE },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "default" },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c1b19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <header className="border-b border-brand bg-background sticky top-0 z-50 print:hidden">
          <SiteNav />
        </header>

        <main id="main" className="flex-1">
          {children}
        </main>

        <footer className="bg-brand text-stone-300 mt-auto print:hidden">
          <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-white leading-none">
                  Med AI Plays
                </p>
                <p className="text-xs mt-2 text-stone-400">
                  A free study resource for medical students at any school
                </p>
              </div>
              <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-stone-300 hover:text-marker underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <nav aria-label="Study guides by exam" className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400">
              <span className="text-stone-500">By exam:</span>
              {goals.map((g) => (
                <Link key={g.id} href={`/exams/${g.id}`} className="hover:text-marker underline-offset-4 hover:underline">
                  {g.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-stone-700 pt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-stone-400">
              <p>
                Created by <span className="text-stone-200">Lamar Martin</span>
              </p>
            </div>
          </div>
        </footer>
        <UsageAnalytics />
      </body>
    </html>
  );
}
