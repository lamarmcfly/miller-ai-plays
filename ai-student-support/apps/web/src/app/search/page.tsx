import type { Metadata } from "next";
import { SiteSearch, type SearchItem } from "@/components/SiteSearch";
import { getAllPlays } from "@/lib/plays";
import { getAllCommunityPosts } from "@/lib/community";
import { promptLibrary } from "@/lib/prompt-library";
import { subjects } from "@/lib/question-spec";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every Play, prompt template, practice-question topic, and community post.",
};

function buildItems(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const p of getAllPlays()) {
    items.push({
      href: `/plays/${p.slug}`,
      title: p.title,
      kind: "Play",
      text: `${p.oneLiner} ${p.hook} ${p.tags.join(" ")} ${p.audience.join(" ")} ${p.whenToUse} ${p.artifact.name}`,
    });
  }
  for (const t of promptLibrary) {
    items.push({ href: "/prompts", title: t.title, kind: "Prompt", text: t.description });
  }
  for (const s of subjects) {
    items.push({
      href: `/question-builder?subject=${s.id}`,
      title: `${s.label} practice questions`,
      kind: "Topic",
      text: `${s.group}. ${s.ideas.join(", ")}`,
    });
  }
  for (const c of getAllCommunityPosts()) {
    items.push({ href: "/community", title: c.title, kind: "Community", text: `${c.body} ${c.examContext.join(" ")}` });
  }
  items.push(
    { href: "/start", title: "Start Here: get a personal path", kind: "Page", text: "recommended order beginner first session exam" },
    { href: "/toolkit", title: "AI Toolkit: which tool for which job", kind: "Page", text: "Claude ChatGPT Gemini Copilot NotebookLM privacy" },
    { href: "/cheat-sheet", title: "One-page cheat sheet", kind: "Page", text: "printable five-part prompt verify never paste" }
  );
  return items;
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium">Search</h1>
        <p className="text-muted-foreground">Find a workflow, a prompt, or a practice-question topic.</p>
      </header>
      <SiteSearch items={buildItems()} />
    </div>
  );
}
