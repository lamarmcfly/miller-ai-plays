import type { Metadata } from "next";
import Link from "next/link";
import { QuestionBuilder } from "@/components/QuestionBuilder";
import { FillablePrompt } from "@/components/FillablePrompt";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Question Builder",
  description:
    "Build a custom, exam-realistic practice-question prompt for your phase, exam, subject, and weak spots. Works with any AI tool.",
};

const followUps = [
  {
    label: "Make the next set harder",
    description: "Same topic, one step up, no repeats.",
    prompt:
      "Give me [NUMBER] more questions on the same topic and in the same format, one step harder than the last set. Do not repeat any earlier question or its core concept.",
  },
  {
    label: "Variants of the ones I missed",
    description: "New questions on the same concepts from a different angle.",
    prompt:
      "For the questions I missed ([QUESTION NUMBERS]), write 2 new original questions each that test the same concept from a different angle (different patient, presentation, and question type). Do not just change numbers or names.",
  },
  {
    label: "Audit a question you wrote",
    description: "Catch ambiguity, cues, and factual errors before you memorize them.",
    prompt:
      "Review question [QUESTION NUMBER] as an item-writing editor: can it be answered before reading the options, is there exactly one defensible best answer, are the options free of cues, and is every fact current and correct? Mark anything you are unsure of as VERIFY and rewrite the question if it has problems.",
  },
  {
    label: "Explain one wrong option",
    description: "Understand why a tempting answer fails.",
    prompt:
      "In question [QUESTION NUMBER], explain why option [OPTION LETTER] is wrong using a short contrasting patient example. Then tell me what clue in the stem should have steered me away from it.",
  },
];

const checklist = [
  "You can answer it before looking at the options.",
  "Exactly one option is defensible, and it is clearly the best.",
  "The stem does not name the diagnosis or use giveaway buzzwords.",
  "Vitals, labs, units, and timeline are realistic and consistent.",
  "Options are the same kind of thing and about the same length.",
  "Each wrong option is tempting for a specific reason.",
  "The explanation names the reasoning, not just the fact.",
  "Anything surprising is checked against a trusted source.",
];

export default function QuestionBuilderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <header className="space-y-3 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Question Builder</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Build a custom practice-question prompt for your phase, exam, subject, and weak spots. Copy it into any AI
          tool and get questions written the way real exams are written.
        </p>
        <p className="text-sm text-muted-foreground">
          <a href="#your-prompt-heading" className="text-highlight hover:underline lg:hidden">
            Jump to your prompt
          </a>
        </p>
      </header>

      <QuestionBuilder />

      <Separator />

      <section className="space-y-4" aria-labelledby="followups">
        <div className="space-y-1">
          <h2 id="followups" className="text-xl font-semibold">
            After your first set
          </h2>
          <p className="text-sm text-muted-foreground">
            Paste these into the same chat to keep going. Fill in the blanks or replace the [BRACKETS] yourself.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {followUps.map((f) => (
            <FillablePrompt key={f.label} label={f.label} description={f.description} prompt={f.prompt} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border p-5 space-y-3">
          <h2 className="text-lg font-semibold">Is this AI question realistic?</h2>
          <p className="text-sm text-muted-foreground">
            Use this checklist on any question the AI writes. These are the same principles professional item writers
            follow.
          </p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {checklist.map((c) => (
              <li key={c} className="flex gap-2">
                <span aria-hidden="true" className="text-brand">
                  &#10003;
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border-l-4 border-flag bg-muted p-5 space-y-3">
          <h2 className="text-lg font-semibold">Use it responsibly</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>AI can be wrong.</strong> Treat every fact as a claim to verify, especially doses, thresholds, and
              guideline details.
            </li>
            <li>
              <strong>These are practice questions, not the real exam.</strong> They will not match any real exam item
              and are not a prediction of your score.
            </li>
            <li>
              <strong>Keep it original.</strong> Do not paste licensed exam or question-bank content into AI tools.
            </li>
            <li>
              <strong>No real patient information.</strong> Use fictional or fully de-identified cases only.
            </li>
            <li>
              <strong>Follow your school&apos;s policies</strong> on AI use for coursework and assessments.
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        Missed a question you want to learn from? Try the{" "}
        <Link href="/plays/error-engine" className="text-highlight hover:underline font-medium">
          Error Engine
        </Link>
        , then bring your weak spots back here. Want more templates (study plans, concept coaching, flashcards)? Browse
        the{" "}
        <Link href="/prompts" className="text-highlight hover:underline font-medium">
          Prompt Library
        </Link>
        .
      </section>
    </div>
  );
}
