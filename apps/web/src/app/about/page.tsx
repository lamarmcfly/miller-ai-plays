import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Miller AI Plays is an Academic Enrichment Services initiative at the University of Miami Miller School of Medicine.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>
        <p className="text-lg text-muted-foreground">
          Miller AI Plays is an Academic Enrichment Services initiative at the
          University of Miami Miller School of Medicine.
        </p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Why this exists</h2>
        <p className="text-muted-foreground leading-relaxed">
          Medical students know AI tools exist but lack practical, tested
          workflows to use them effectively. They won&apos;t read a 20-page guide on
          prompt engineering, but they will adopt a tool they can master in 5
          minutes if the value is obvious.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Miller AI Plays delivers bite-sized AI workflows (&ldquo;Plays&rdquo;)
          that meet students where they are: mobile, distracted, time-poor. Each
          Play pairs a 60-90 second demo with a copy-paste prompt and a clonable
          artifact.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How Plays work</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Watch",
              desc: "60-90 second demo shows the Play in action",
            },
            {
              step: "2",
              title: "Copy",
              desc: "One-tap copy of the prompt into your AI tool",
            },
            {
              step: "3",
              title: "Use",
              desc: "Run the workflow on your own study material",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="rounded-lg border border-border p-4 text-center space-y-2"
            >
              <div className="text-2xl font-bold text-[#F47321]">{step}</div>
              <div className="font-semibold">{title}</div>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Who runs this</h2>
        <p className="text-muted-foreground leading-relaxed">
          Miller AI Plays was created by{" "}
          <span className="font-medium text-foreground">Lamar Martin</span>,
          Academic Enrichment Services. The Play library is operated by the
          Miller AI Plays Council, a team of 3-5 medical students who author,
          review, and maintain Plays.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Who it&apos;s for</h2>
        <p className="text-muted-foreground leading-relaxed">
          All Miller medical students (MS1-MS4) preparing for coursework, USMLE
          Step 1/2 CK, shelf exams, OSCEs, and clerkships.
        </p>
      </section>
    </div>
  );
}
