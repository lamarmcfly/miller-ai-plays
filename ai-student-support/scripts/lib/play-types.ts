// Shared Play type for scripts (mirrors apps/web/src/lib/schema.ts without path aliases)
export interface PlayTool {
  name: string;
  plan: "free" | "pro";
  url: string;
}

export interface PlayVideo {
  url: string;
  poster: string;
  durationSeconds: number;
  captions: string;
}

export interface PlayArtifact {
  type: "claude-project" | "notebooklm" | "copilot-agent" | "prompt";
  name: string;
  systemPrompt: string;
  cloneInstructions: string;
  cloneUrl: string | null;
}

export interface Play {
  slug: string;
  title: string;
  hook: string;
  oneLiner: string;
  audience: string[];
  year: string[];
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tools: PlayTool[];
  video: PlayVideo;
  artifact: PlayArtifact;
  whenToUse: string;
  successSignal: string;
  tags: string[];
  relatedPlays: string[];
  learningNote?: string;
  starterPrompts?: { label: string; prompt: string }[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  version: string;
}
