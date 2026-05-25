import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { getAllCommunityPosts } from "@/lib/community";
import { CommunityPostCard } from "@/components/CommunityPostCard";
import { CommunitySubmitForm } from "@/components/CommunitySubmitForm";
import { CommunityFilter } from "./community-filter";

export const metadata: Metadata = {
  title: "Community Board",
  description:
    "Prompts, workflows, and tips shared by Miller medical students. Reviewed by the Council for safety.",
};

export default function CommunityPage() {
  const posts = getAllCommunityPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Community Board</h1>
        <p className="text-lg text-muted-foreground">
          Prompts, workflows, and tips shared by Miller students. Everything
          here is a suggestion from a fellow student, not an official Workflow.
          Reviewed by the Council for safety.
        </p>
      </header>

      <CommunityFilter posts={posts} />

      <Separator />

      <CommunitySubmitForm />

      <div className="rounded-lg border border-dashed border-border bg-muted/20 p-4 text-center text-xs text-muted-foreground">
        <p>
          Community submissions are personal use cases shared by students. They
          are not official Miller AI Workflows and have not been tested to the same
          standard. Always verify AI output against trusted sources.
        </p>
      </div>
    </div>
  );
}
