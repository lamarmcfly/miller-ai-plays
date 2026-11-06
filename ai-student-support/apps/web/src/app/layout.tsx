import type { Metadata, Viewport } from "next";
import { Newsreader, Instrument_Sans, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { UsageAnalytics } from "@/components/UsageAnalytics";
import { TestimonialLink } from "@/components/TestimonialLink";
import { HideOnSignIn } from "@/components/HideOnSignIn";
import { moreLinks, navLinks, startLink } from "@/lib/nav";
import { goals } from "@/lib/start-path";
import { SITE, SITE_NAME, SITE_TAGLINE, SITE_URL, stageLabel } from "@/lib/site";
import "./globals.css";

const footerGroups = [
  { title: "Use the site", links: [startLink, ...navLinks] },
  { title: "By stage", links: (Object.keys(SITE.stages) as (keyof typeof SITE.stages)[]).map((id) => ({ href: `/phase/${id}`, label: stageLabel(id) })) },
  { title: "By exam", links: goals.map((g) => ({ href: `/exams/${g.id}`, label: g.label })) },
  { title: "More", links: moreLinks },
];

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
  // A private site stays out of search engines (robots.ts and src/proxy.ts agree).
  ...(SITE.private ? { robots: { index: false, follow: false } } : {}),
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
          <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
            <div className="grid gap-8 grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_0.8fr]">
              <div className="col-span-2 lg:col-span-1">
                <p className="font-[family-name:var(--font-display)] text-2xl text-white leading-none">
                  {SITE.name}
                </p>
                <p className="text-xs mt-2 text-stone-400 max-w-xs">
                  {SITE.footerBlurb}
                </p>
              </div>
              <HideOnSignIn>
                {footerGroups.map((group) => (
                  <nav key={group.title} aria-label={group.title} className="space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500">{group.title}</p>
                    <ul className="space-y-1.5 text-sm">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-stone-300 hover:text-marker underline-offset-4 hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </HideOnSignIn>
            </div>
            <div className="border-t border-stone-700 pt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-stone-400">
              <p>
                Created by <span className="text-stone-200">Lamar Martin</span>
              </p>
              <TestimonialLink className="text-stone-300 hover:text-marker underline-offset-4 hover:underline">
                Tell us how {SITE.name} helped you
              </TestimonialLink>
            </div>
          </div>
        </footer>
        <UsageAnalytics />
      </body>
    </html>
  );
}
