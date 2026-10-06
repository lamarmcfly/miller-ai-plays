// Which AI tool for which job. Kept deliberately general (no feature or plan
// claims that change monthly); students are told to check current limits.

export type ToolId = "chatbot" | "notebooklm" | "copilot";

export type ToolJob = {
  id: string;
  job: string;
  tool: ToolId;
  why: string;
  playSlug?: string;
};

export const toolLabels: Record<ToolId, { name: string; examples: string; url: string }> = {
  chatbot: {
    name: "A general AI chat tool",
    examples: "Claude, ChatGPT, or Gemini",
    url: "https://claude.ai",
  },
  notebooklm: {
    name: "NotebookLM",
    examples: "Google's source-grounded notebook",
    url: "https://notebooklm.google.com",
  },
  copilot: {
    name: "Microsoft Copilot",
    examples: "Best inside Word, PowerPoint, and Outlook",
    url: "https://copilot.microsoft.com",
  },
};

export const toolJobs: ToolJob[] = [
  {
    id: "quiz",
    job: "Quiz me and explain what I got wrong",
    tool: "chatbot",
    why: "Back-and-forth questioning is what chat tools do best. Use any of them; pick the one you like.",
    playSlug: "custom-practice-questions",
  },
  {
    id: "own-notes",
    job: "Answer only from my own slides, notes, and PDFs, with citations",
    tool: "notebooklm",
    why: "It works from the sources you upload and points back to them, which makes errors easier to catch.",
    playSlug: "shelf-review-notebook",
  },
  {
    id: "concepts",
    job: "Explain a concept I keep forgetting, Socratic style",
    tool: "chatbot",
    why: "Tutoring needs conversation, and you can ask for a different angle until it clicks.",
    playSlug: "concept-coach",
  },
  {
    id: "paper",
    job: "Decide whether a research paper is worth reading",
    tool: "notebooklm",
    why: "Upload the paper and ask for the design, key numbers, and limits with citations. A chat tool with a PDF upload also works.",
    playSlug: "research-speed-read",
  },
  {
    id: "images",
    job: "Quiz me on my own diagrams or lab photos",
    tool: "chatbot",
    why: "Choose a chat tool that accepts image uploads. Use your own images, and confirm against your atlas.",
    playSlug: "image-and-diagram-quiz",
  },
  {
    id: "schedule",
    job: "Plan my study schedule or review calendar",
    tool: "chatbot",
    why: "Planning is a conversation: give it your dates and hours, then adjust.",
    playSlug: "exam-countdown-planner",
  },
  {
    id: "documents",
    job: "Work inside a Word, PowerPoint, or Outlook file",
    tool: "copilot",
    why: "It lives inside those apps. Your school may provide a managed version, so check yours.",
  },
];

export const toolTips: string[] = [
  "Use your school-provided account when one exists; managed accounts often have stronger privacy terms.",
  "Check privacy settings: look for options to turn off chat history or model training, and keep patient information out regardless.",
  "Free plans have usage limits that change. If you hit one, switch tools and paste the same prompt.",
  "Every prompt in this library is tool-neutral. The same prompt in two tools is a quick way to catch a wrong answer.",
];
