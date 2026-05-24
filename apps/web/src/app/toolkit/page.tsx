import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "AI Toolkit",
  description:
    "Every AI tool Miller medical students can use for free, plus how they fit your existing study stack.",
};

const tools = [
  {
    name: "Claude",
    provider: "Anthropic",
    plan: "Free tier",
    url: "https://claude.ai",
    bestFor: "Strong reasoning, long-form analysis, custom instructions support",
  },
  {
    name: "ChatGPT",
    provider: "OpenAI",
    plan: "Free tier",
    url: "https://chat.openai.com",
    bestFor: "Versatile chat, browsing, image generation, wide plugin ecosystem",
  },
  {
    name: "Microsoft Copilot",
    provider: "Microsoft",
    plan: "Free via UM license",
    url: "https://copilot.microsoft.com",
    bestFor: "Microsoft 365 integration, document summarization, Teams integration",
  },
  {
    name: "NotebookLM",
    provider: "Google",
    plan: "Free (Google account)",
    url: "https://notebooklm.google.com",
    bestFor: "Source-grounded research with citations. Only answers from your uploaded sources.",
  },
];

const studyStackIntegrations = [
  {
    tool: "UWorld",
    arrow: "Error Engine + Deficit Tracker",
    description: "Analyze your wrongs per block, then track gaps across weeks",
  },
  {
    tool: "Anki",
    arrow: "Lecture Compressor",
    description: "Generate board-style cards from lectures in 5 minutes",
  },
  {
    tool: "NBME Practice Tests",
    arrow: "Deficit Tracker",
    description:
      "Paste content area breakdowns to find persistent weak spots",
  },
  {
    tool: "Pathoma / B&B",
    arrow: "Concept Coach",
    description:
      "When a concept from these resources won't stick, drill it Socratically",
  },
  {
    tool: "AMBOSS / UpToDate",
    arrow: "Shelf Review Notebook",
    description: "Load into NotebookLM for source-grounded shelf review",
  },
];

export default function ToolkitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Toolkit</h1>
        <p className="text-lg text-muted-foreground">
          Every AI tool you can use for free as a Miller medical student - plus
          how they connect to the study tools you already use.
        </p>
      </header>

      {/* Tool cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">AI tools you can use</h2>
        <p className="text-sm text-muted-foreground">
          All Plays in this library work with any of these tools. Pick whichever
          you prefer.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Card key={t.name} className="border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {t.plan}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{t.provider}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{t.bestFor}</p>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#F47321] hover:underline font-medium"
                >
                  Open {t.name} &rarr;
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Study stack integration */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          How AI fits your existing study stack
        </h2>
        <p className="text-sm text-muted-foreground">
          You're already using these tools. Here's how AI Plays make them
          better.
        </p>
        <div className="space-y-3">
          {studyStackIntegrations.map((s) => (
            <div
              key={s.tool}
              className="flex items-start gap-4 rounded-lg border border-border p-4"
            >
              <div className="shrink-0 w-28">
                <p className="font-semibold text-sm">{s.tool}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-[#00543C]">
                  &rarr; {s.arrow}
                </span>
                <p className="mt-1">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Boundaries */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          What NOT to put into AI tools
        </h2>
        <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-4 space-y-2">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong>No patient identifying information.</strong> No names,
              MRNs, DOBs, or any data that could identify a patient. HIPAA
              applies to AI tools. Use &ldquo;[Patient]&rdquo; as a placeholder.
            </li>
            <li>
              <strong>No copyrighted Qbank content.</strong> Don&apos;t paste
              full UWorld, NBME, or AMBOSS questions. Use your own notes and
              summaries from these resources instead.
            </li>
            <li>
              <strong>No exam questions or answers.</strong> Don&apos;t use AI
              to complete graded assessments. Academic integrity violations are
              non-negotiable.
            </li>
            <li>
              <strong>No clinical decision-making for real patients.</strong>{" "}
              AI Plays are for studying, not for diagnosing or treating. Never
              use AI output as the basis for a clinical decision.
            </li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* AES contact */}
      <section className="rounded-lg border border-border bg-muted/30 p-6 text-center space-y-3">
        <h2 className="text-xl font-semibold">Need individualized help?</h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          If your practice test scores are plateauing or you need a
          personalized study strategy, reach out to Academic Enrichment
          Services for individualized coaching.
        </p>
        <p className="text-sm font-medium text-[#00543C]">
          Academic Enrichment Services - University of Miami Miller School of
          Medicine
        </p>
      </section>

      {/* Browse plays CTA */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="text-sm text-[#F47321] hover:underline font-medium"
        >
          &larr; Browse all Plays
        </Link>
      </div>
    </div>
  );
}
