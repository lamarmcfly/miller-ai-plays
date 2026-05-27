import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = { title: "Pediatrics Clerkship", description: "AI workflows for your Pediatrics rotation at Miller." };

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "Peds attendings test developmental milestones, weight-based dosing, and age-specific differentials." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "Peds notes need growth charts context, vaccination status, and developmental screening. Draft them fast." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "Load BRS Pediatrics, your peds handbook, and OnlineMedEd for source-grounded review." },
  { slug: "osce-encounter-sim", title: "OSCE Encounter Sim", why: "Practice pediatric encounters: well-child visits, acute presentations, parent communication." },
];

const rotationPrompts = [
  { label: "Peds rounds prep", prompt: "I'm a Phase 2 student on my Pediatrics clerkship. Today's patients have: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my attending will ask. Focus on age-specific presentations, developmental milestones, weight-based dosing, and when to worry." },
  { label: "Peds shelf review", prompt: "I'm preparing for my Pediatrics shelf. Give me a high-yield review of [TOPIC] organized by: age-specific presentation, differential by age group, diagnostic workup (including age-appropriate norms), first-line treatment with pediatric dosing, and red flags." },
];

export default function PediatricsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2"><Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">Phase 2</Link><span className="text-muted-foreground">/</span></div>
        <div className="flex items-center gap-3">
          <div><h1 className="text-3xl font-bold tracking-tight">Pediatrics</h1><p className="text-muted-foreground">AI workflows for your Peds rotation</p></div>
        </div>
      </header>
      <Separator />
      <section className="space-y-4"><h2 className="text-xl font-bold">Recommended Workflows</h2><div className="space-y-3">{plays.map((play) => (<Link key={play.slug} href={`/plays/${play.slug}`}><div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-[#00543C]/30 transition-all cursor-pointer space-y-1"><h3 className="font-semibold">{play.title}</h3><p className="text-sm text-muted-foreground">{play.why}</p></div></Link>))}</div></section>
      <Separator />
      <section className="space-y-4"><h2 className="text-xl font-bold">Peds-specific starter prompts</h2><div className="space-y-3">{rotationPrompts.map((rp) => (<div key={rp.label} className="rounded-xl border border-border bg-card p-5 space-y-3"><div className="flex items-center justify-between"><span className="text-sm font-semibold">{rp.label}</span><CopyButton text={rp.prompt} label="Copy" /></div><pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-muted/50 rounded-lg p-3">{rp.prompt}</pre></div>))}</div></section>
      <div className="flex gap-3"><Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">&larr; All rotations</Link></div>
    </div>
  );
}
