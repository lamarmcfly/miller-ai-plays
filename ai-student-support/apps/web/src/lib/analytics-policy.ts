// Only public content routes and fixed categories may enter analytics.
// Add new published routes here; unknown paths are grouped as /other.
const publicPaths = new Set([
  "/",
  "/about",
  "/cheat-sheet",
  "/community",
  "/exams/coursework",
  "/exams/osce",
  "/exams/practical",
  "/exams/residency",
  "/exams/shelf",
  "/exams/step1",
  "/exams/step2",
  "/exams/step3",
  "/exams/wards",
  "/phase/1",
  "/phase/2",
  "/phase/2/family-medicine",
  "/phase/2/internal-medicine",
  "/phase/2/ob-gyn",
  "/phase/2/pediatrics",
  "/phase/2/psychiatry",
  "/phase/2/surgery",
  "/phase/3",
  "/plays/biostats-translator",
  "/plays/case-presentation-coach",
  "/plays/clinical-note",
  "/plays/concept-coach",
  "/plays/custom-practice-questions",
  "/plays/deficit-tracker",
  "/plays/differential-drills",
  "/plays/error-engine",
  "/plays/exam-countdown-planner",
  "/plays/first-ai-session",
  "/plays/image-and-diagram-quiz",
  "/plays/lecture-compressor",
  "/plays/osce-encounter-sim",
  "/plays/research-speed-read",
  "/plays/residency-application-coach",
  "/plays/rounds-prep",
  "/plays/shelf-review-notebook",
  "/plays/spaced-review-planner",
  "/plays/verify-the-ai",
  "/prompts",
  "/question-builder",
  "/search",
  "/start",
  "/toolkit"
]);
const examIds = new Set(["coursework", "practical", "step1", "step2ck", "step3", "comlex1", "comlex2", "shelf", "osce", "oral", "flashcards", "other"]);
const goalIds = new Set(["coursework", "practical", "step1", "step2", "step3", "shelf", "osce", "wards", "residency"]);
const tools: Record<string, string> = {
  "chatgpt.com": "chatgpt", "chat.openai.com": "chatgpt",
  "claude.ai": "claude", "gemini.google.com": "gemini",
  "notebooklm.google.com": "notebooklm", "copilot.microsoft.com": "copilot",
};

export type UsageAction = "prompt_copied" | "builder_prompt_copied" | "start_completed" | "ai_tool_opened" | "print_requested";

export function safePage(rawUrl: string): string {
  try {
    const path = new URL(rawUrl, "https://analytics.invalid").pathname.replace(/\/$/, "") || "/";
    return publicPaths.has(path) ? path : "/other";
  } catch { return "/other"; }
}

export function redactAnalyticsUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin + safePage(rawUrl);
  } catch { return null; }
}

export function aiTool(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    return url.protocol === "https:" && Object.hasOwn(tools, url.hostname) ? tools[url.hostname] : null;
  } catch { return null; }
}

// Construct properties explicitly: never spread input objects or send prompt text.
export function usageProperties(action: UsageAction, rawUrl: string, category?: string): Record<string, string> | null {
  const page = safePage(rawUrl);
  switch (action) {
    case "prompt_copied":
    case "print_requested": return { page };
    case "builder_prompt_copied": return { page, exam: category && examIds.has(category) ? category : "other" };
    case "start_completed": return { page, goal: category && goalIds.has(category) ? category : "other" };
    case "ai_tool_opened": return category && Object.values(tools).includes(category) ? { page, tool: category } : null;
    default: return null;
  }
}
