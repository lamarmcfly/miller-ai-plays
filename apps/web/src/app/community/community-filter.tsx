"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CommunityPostCard } from "@/components/CommunityPostCard";
import type { CommunityPost } from "@/lib/community-schema";
import { categoryLabels } from "@/lib/community-schema";

const categories = [
  { key: "all", label: "All" },
  { key: "prompt", label: "Prompts" },
  { key: "question", label: "Questions" },
  { key: "workflow-tip", label: "Workflow Tips" },
];

export function CommunityFilter({
  posts,
}: {
  posts: (CommunityPost & { content: string })[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="cursor-pointer"
          >
            <Badge
              variant={activeCategory === cat.key ? "default" : "outline"}
              className={
                activeCategory === cat.key
                  ? "bg-[#00543C] hover:bg-[#003d2c] text-white"
                  : "hover:bg-muted"
              }
            >
              {cat.label}
              {cat.key !== "all" && (
                <span className="ml-1 opacity-60">
                  ({posts.filter((p) => p.category === cat.key).length})
                </span>
              )}
            </Badge>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No community posts yet in this category. Be the first to share!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
