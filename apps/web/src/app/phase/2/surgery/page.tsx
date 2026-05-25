import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Surgery Clerkship",
  description: "AI workflows tailored for your Surgery rotation at Miller.",
};

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "Surgery attendings test anatomy, indications, and complications. Know the answers before pre-rounds." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "Surgery notes are terse. Get a focused post-op or progress note draft in bullet-point format." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "Build a surgery shelf notebook. Load Pestana, your surgical recall notes, and OnlineMedEd." },
  { slug: "concept-coach", title: "Concept Coach", why: "Drill surgical anatomy and operative indications Socratically when Netter alone doesn't cut it." },
];

const rotationPrompts = [
  { label: "Surgery rounds prep", prompt: "I'm a Phase 2 student on my Surgery clerkship. Today's patients have: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my attending will ask. Focus on anatomy, surgical indications, post-op complications, and when to consult. Keep answers brief: surgery attendings want bullet points." },
  { label: "Surgery post-op note", prompt: "I'm on Surgery. I need a brief post-op note. Patient had [PROCEDURE] today. Vitals stable, [EXAM FINDINGS]. Keep it concise: procedure, EBL, findings, drains, diet, activity, pain control, DVT prophylaxis, disposition." },
  { label: "Surgery shelf review", prompt: "I'm preparing for my Surgery shelf. Give me a high-yield review of [TOPIC] organized by: anatomy, pathophysiology, presentation (acute vs chronic), diagnostic workup, surgical indications, procedure of choice, and post-op complications." },
];

export default function SurgeryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">Phase 2</Link>
          <span className="text-muted-foreground">/</span>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Surgery</h1>
            <p className="text-muted-foreground">AI workflows tailored for your Surgery rotation</p>
          </div>
        </div>
      </header>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Recommended Workflows</h2>
        <div className="space-y-3">
          {plays.map((play) => (
            <Link key={play.slug} href={`/plays/${play.slug}`}>
              <div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-[#00543C]/30 transition-all cursor-pointer space-y-1">
                <h3 className="font-semibold">{play.title}</h3>
                <p className="text-sm text-muted-foreground">{play.why}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Surgery-specific starter prompts</h2>
        <p className="text-sm text-muted-foreground">Copy directly into your AI tool. Replace the [BRACKETS].</p>
        <div className="space-y-3">
          {rotationPrompts.map((rp) => (
            <div key={rp.label} className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{rp.label}</span>
                <CopyButton text={rp.prompt} label="Copy" />
              </div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-muted/50 rounded-lg p-3">{rp.prompt}</pre>
            </div>
          ))}
        </div>
      </section>
      <div className="flex gap-3">
        <Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">&larr; All rotations</Link>
      </div>
    </div>
  );
}
