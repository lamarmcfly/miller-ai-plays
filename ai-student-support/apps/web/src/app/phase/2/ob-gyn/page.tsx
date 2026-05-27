import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = { title: "OB/GYN Clerkship", description: "AI workflows for your OB/GYN rotation at Miller." };

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "OB/GYN attendings test timing, contraindications, and labor management. Know the key decision points." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "OB notes have unique structure: G/P status, gestational age, fetal monitoring. Get the format right fast." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "Build a source-grounded OB/GYN notebook with Beckmann, your clerkship guide, and review materials." },
  { slug: "osce-encounter-sim", title: "OSCE Encounter Sim", why: "Practice sensitive conversations: contraception counseling, abnormal pap results, pregnancy loss." },
];

const rotationPrompts = [
  { label: "OB/GYN rounds prep", prompt: "I'm a Phase 2 student on my OB/GYN clerkship. Today's patients include: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my attending will ask. Focus on gestational timing, contraindications, management algorithms, and when to escalate." },
  { label: "OB/GYN shelf review", prompt: "I'm preparing for my OB/GYN shelf. Give me a high-yield review of [TOPIC] organized by: pathophysiology, clinical presentation, diagnostic criteria, management by trimester (if applicable), complications, and contraindications." },
];

export default function ObGynPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2"><Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">Phase 2</Link><span className="text-muted-foreground">/</span></div>
        <div className="flex items-center gap-3">
          <div><h1 className="text-3xl font-bold tracking-tight">OB/GYN</h1><p className="text-muted-foreground">AI workflows for your OB/GYN rotation</p></div>
        </div>
      </header>
      <Separator />
      <section className="space-y-4"><h2 className="text-xl font-bold">Recommended Workflows</h2><div className="space-y-3">{plays.map((play) => (<Link key={play.slug} href={`/plays/${play.slug}`}><div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-[#00543C]/30 transition-all cursor-pointer space-y-1"><h3 className="font-semibold">{play.title}</h3><p className="text-sm text-muted-foreground">{play.why}</p></div></Link>))}</div></section>
      <Separator />
      <section className="space-y-4"><h2 className="text-xl font-bold">OB/GYN-specific starter prompts</h2><div className="space-y-3">{rotationPrompts.map((rp) => (<div key={rp.label} className="rounded-xl border border-border bg-card p-5 space-y-3"><div className="flex items-center justify-between"><span className="text-sm font-semibold">{rp.label}</span><CopyButton text={rp.prompt} label="Copy" /></div><pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-muted/50 rounded-lg p-3">{rp.prompt}</pre></div>))}</div></section>
      <div className="flex gap-3"><Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">&larr; All rotations</Link></div>
    </div>
  );
}
