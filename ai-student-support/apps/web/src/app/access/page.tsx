import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { configuredCode, safeNext } from "@/lib/site-access";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

const messages: Record<string, string> = {
  wrong: "That code didn't work. Check it and try again.",
  busy: "Too many tries from this network. Wait 15 minutes, then try again.",
  closed: "This site isn't open yet. Check back soon.",
};

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!SITE.private) notFound();

  const params = await searchParams;
  const next = safeNext(typeof params.next === "string" ? params.next : "/");
  const open = configuredCode() !== null;
  const error = typeof params.error === "string" ? messages[params.error] : undefined;

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24 space-y-8">
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{SITE.audience}</p>
        <h1 className="text-4xl font-medium leading-tight">
          {SITE.logo[0]} <span className="bg-marker px-1.5 -mx-1">{SITE.logo[1]}</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          This site is for {SITE.audience.replace(/^For /, "")} only. Enter the access code to continue. You only need
          to do this once on each device.
        </p>
      </header>

      {open ? (
        <form method="post" action="/api/access" className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <div className="space-y-1.5">
            <label htmlFor="code" className="text-sm font-medium">
              Access code
            </label>
            <input
              id="code"
              name="code"
              type="password"
              required
              autoComplete="off"
              autoFocus
              aria-describedby={error ? "code-error" : undefined}
              aria-invalid={error ? true : undefined}
              className="w-full border border-brand bg-card px-3 py-2.5 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            />
            {error && (
              <p id="code-error" role="alert" className="text-sm text-flag">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-brand text-white hover:bg-brand-light px-5 py-3 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Continue
          </button>
          <p className="text-xs text-muted-foreground">
            Don&apos;t have the code? Ask the person who shared this site with you.
          </p>
        </form>
      ) : (
        <p role="status" className="border border-border bg-card p-4 text-sm">
          {messages.closed}
        </p>
      )}
    </div>
  );
}
