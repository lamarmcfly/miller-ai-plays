import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built so medical students at any level, even those brand new to AI, can use it at a high level. Free AI study workflows and practice-question prompts.",
};

const steps = [
  { step: "1", title: "Pick", desc: "Choose a Play for your situation, or build practice questions for your exam" },
  { step: "2", title: "Copy", desc: "One-tap copy of the prompt into the AI tool you already use" },
  { step: "3", title: "Use", desc: "Run it on your own study material and check the output" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>
        <p className="text-lg text-muted-foreground">
          Med AI Plays is built so medical students at any level, even those brand new to AI, can use it at a high
          level. It is a free library of AI study workflows and practice-question prompts for any school.
        </p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Why this exists</h2>
        <p className="text-muted-foreground leading-relaxed">
          I work with medical students every day. Most of them use AI, and when I dig into how, they are barely
          touching the surface of what it can do. What changes the result is the approach to the prompt, so I find
          myself coaching that again and again.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          I built Med AI Plays to put that support in one place. Whatever your level, even if you are brand new to
          AI, you get the prompts, the structure, and the habits to use it the way an advanced user does. No
          technical background, no paid plan, no one to sit down with you required.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Few students will read a 20-page guide on prompt engineering, but many will adopt a workflow they can
          master in five minutes. So Med AI Plays is bite-sized: short workflows (&ldquo;Plays&rdquo;) that meet you
          where you are, on mobile and between other things. Each Play is a copy-paste prompt with the steps to use
          it. The{" "}
          <Link href="/question-builder" className="text-highlight hover:underline">
            Question Builder
          </Link>{" "}
          and{" "}
          <Link href="/prompts" className="text-highlight hover:underline">
            Prompt Library
          </Link>{" "}
          let you customize prompts to your exam, phase, and weak spots.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="rounded-lg border border-border p-4 text-center space-y-2">
              <div className="text-2xl font-bold text-highlight">{step}</div>
              <div className="font-semibold">{title}</div>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Who it&apos;s for</h2>
        <p className="text-muted-foreground leading-relaxed">
          Any medical student, at any school, in any phase: pre-clerkship coursework, clerkships and shelf exams,
          advanced clinical rotations, and licensing exams such as USMLE Steps 1, 2 CK and 3 and COMLEX-USA. Phases are
          labeled differently from school to school, so each page explains what it means by Phase 1, 2, and 3.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Ground rules</h2>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
          <li>Plays are for studying, never for making decisions about real patients.</li>
          <li>AI output can be wrong. Verify important facts against trusted sources.</li>
          <li>No patient identifying information in any AI tool, ever.</li>
          <li>Do not paste licensed exam or question-bank content into AI tools.</li>
          <li>Follow your own school&apos;s policy on AI use for coursework and assessments.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="text-muted-foreground leading-relaxed">
          No accounts and no cookies. What you type into the Question Builder and prompt templates stays in your
          browser. We count page views with privacy-friendly analytics so we know which Plays help, and we never
          collect your name or email. The only text that leaves your device is what you choose to send through the
          Community form or a feedback link.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Who makes this</h2>
        <p className="text-muted-foreground leading-relaxed">
          Med AI Plays was created by{" "}
          <span className="font-medium text-foreground">Lamar Martin</span>. Names of exams and tools are used only to
          describe what a Play is for.
        </p>
      </section>
    </div>
  );
}
