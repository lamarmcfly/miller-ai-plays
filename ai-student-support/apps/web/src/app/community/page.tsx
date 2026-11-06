import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { getAllCommunityPosts } from "@/lib/community";
import { getGroupPosts } from "@/lib/community-group";
import { CommunitySubmitForm } from "@/components/CommunitySubmitForm";
import { CommunityFilter } from "./community-filter";
import { TestimonialLink } from "@/components/TestimonialLink";
import { SITE } from "@/lib/site";
import { ACCESS_COOKIE, tokenGrantsAccess } from "@/lib/site-access";

export const metadata: Metadata = {
  title: SITE.community.heading,
  description: "Prompts, workflows, and tips shared by medical students. Reviewed by maintainers for safety.",
};

export default async function CommunityPage() {
  // National posts are reviewed files in the repository and show on both sites.
  const posts = getAllCommunityPosts();

  // A private site's own posts come from its own database on each request,
  // and only for someone who has entered the access code.
  const inGroup = SITE.private && (await tokenGrantsAccess((await cookies()).get(ACCESS_COOKIE)?.value));
  const groupPosts = inGroup ? await getGroupPosts() : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{SITE.community.heading}</h1>
        <p className="text-lg text-muted-foreground">{SITE.community.blurb}</p>
        <TestimonialLink className="inline-block text-sm text-highlight hover:underline font-medium">
          Has {SITE.name} helped you? Tell us how
        </TestimonialLink>
      </header>

      {SITE.community.groupHeading ? (
        <>
          <section aria-labelledby="group-heading" className="space-y-4">
            <div className="space-y-1">
              <h2 id="group-heading" className="text-2xl font-medium">
                {SITE.community.groupHeading}
              </h2>
              <p className="text-sm text-muted-foreground">{SITE.community.groupBlurb}</p>
            </div>
            {groupPosts.length > 0 ? (
              <CommunityFilter posts={groupPosts} />
            ) : (
              <p className="border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No posts from the group yet. Be the first to share below.
              </p>
            )}
          </section>

          <section aria-labelledby="national-heading" className="space-y-4">
            <div className="space-y-1">
              <h2 id="national-heading" className="text-2xl font-medium">
                From students nationwide
              </h2>
              <p className="text-sm text-muted-foreground">Reviewed posts from the national Med AI Plays community.</p>
            </div>
            <CommunityFilter posts={posts} />
          </section>
        </>
      ) : (
        <CommunityFilter posts={posts} />
      )}

      <Separator />

      <CommunitySubmitForm />

      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-center text-xs text-muted-foreground">
        <p>
          Community posts are real use cases shared by students and haven&apos;t
          been through the same testing as the core Plays. Always verify AI
          output against trusted sources.
        </p>
      </div>
    </div>
  );
}
