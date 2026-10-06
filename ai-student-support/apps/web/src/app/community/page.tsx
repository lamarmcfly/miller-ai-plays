import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { getAllCommunityPosts } from "@/lib/community";
import { CommunityPostCard } from "@/components/CommunityPostCard";
import { CommunitySubmitForm } from "@/components/CommunitySubmitForm";
import { CommunityFilter } from "./community-filter";

export const metadata: Metadata = {
  title: "Community Board",
  description:
    "Prompts, workflows, and tips shared by medical students. Reviewed by maintainers for safety.",
};

export default function CommunityPage() {
  const posts = getAllCommunityPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Community Board</h1>
        <p className="text-lg text-muted-foreground">
          Prompts, workflows, and tips from medical students who are already
          using AI well. Borrow what works, and add your own. Every post is
          reviewed for safety before it goes live.
        </p>
      </header>

      <CommunityFilter posts={posts} />

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
