import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/site";
import { ACCESS_COOKIE, tokenGrantsAccess } from "@/lib/site-access";

// On a private site (Miller AI Plays), every page and API route needs the
// access cookie. Without it, pages go to /access and API calls get a 401. If no
// access code is configured, nobody gets in: the site fails closed.
// On a public site (Med AI Plays) this does nothing.

const OPEN_PATHS = new Set(["/access", "/api/access", "/robots.txt", "/manifest.webmanifest", "/icon"]);

export async function proxy(request: NextRequest) {
  if (!SITE.private) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const allowed =
    OPEN_PATHS.has(pathname) || (await tokenGrantsAccess(request.cookies.get(ACCESS_COOKIE)?.value));

  let response: NextResponse;
  if (allowed) {
    response = NextResponse.next();
  } else if (pathname.startsWith("/api/")) {
    response = NextResponse.json(
      { ok: false, error: "forbidden", message: "Enter the access code first." },
      { status: 401 }
    );
  } else {
    const to = new URL("/access", request.url);
    to.searchParams.set("next", pathname + search);
    response = NextResponse.redirect(to);
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  // Everything except build assets and static files in public/.
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|mp4|vtt)$).*)"],
};
