import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = { title: "Family Medicine Clerkship", description: "AI workflows for your Family Medicine rotation at Miller." };

const plays = [
  { slug: "rounds-prep", title: "Rounds Prep", why: "FM attendings test preventive medicine, chronic disease management, and screening guidelines." },
  { slug: "clinical-note", title: "Clinical Note Writer", why: "FM notes cover broad complaints. Draft comprehensive outpatient notes with appropriate assessments." },
  { slug: "shelf-review-notebook", title: "Shelf Review Notebook", why: "FM shelf is broad. Build a notebook with Case Files FM, AAFP guidelines, and your clinic notes." },
  { slug: "concept-coach", title: "Concept Coach", why: "Drill preventive care guidelines, screening intervals, and chronic disease management algorithms." },
];

const rotationPrompts = [
  { label: "FM clinic prep", prompt: "I'm a Phase 2 student on my Family Medicine clerkship. Today I'm seeing patients with: [CONDITION 1], [CONDITION 2]. For each, give me the top 5 questions my preceptor will ask. Focus on USPSTF screening guidelines, chronic disease management, preventive counseling, and appropriate referrals." },
  { label: "FM shelf review", prompt: "I'm preparing for my Family Medicine shelf. Give me a high-yield review of [TOPIC] organized by: epidemiology, risk factors, screening guidelines (USPSTF), clinical presentation, outpatient workup, first-line management, and when to refer." },
];

export default function FamilyMedicinePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2"><Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">Phase 2</Link><span className="text-muted-foreground">/</span></div>
        <div className="flex items-center gap-3">
          <div><h1 className="text-3xl font-bold tracking-tight">Family Medicine</h1><p className="text-muted-foreground">AI workflows for your FM rotation</p></div>
        </div>
      </header>
      <Separator />
      <section className="space-y-4"><h2 className="text-xl font-bold">Recommended Workflows</h2><div className="space-y-3">{plays.map((play) => (<Link key={play.slug} href={`/plays/${play.slug}`}><div className="rounded-xl border border-border p-5 hover:shadow-md hover:border-[#00543C]/30 transition-all cursor-pointer space-y-1"><h3 className="font-semibold">{play.title}</h3><p className="text-sm text-muted-foreground">{play.why}</p></div></Link>))}</div></section>
      <Separator />
      <section className="space-y-4"><h2 className="text-xl font-bold">FM-specific starter prompts</h2><div className="space-y-3">{rotationPrompts.map((rp) => (<div key={rp.label} className="rounded-xl border border-border bg-card p-5 space-y-3"><div className="flex items-center justify-between"><span className="text-sm font-semibold">{rp.label}</span><CopyButton text={rp.prompt} label="Copy" /></div><pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed bg-muted/50 rounded-lg p-3">{rp.prompt}</pre></div>))}</div></section>
      <div className="flex gap-3"><Link href="/phase/2" className="text-sm text-muted-foreground hover:underline">&larr; All rotations</Link></div>
    </div>
  );
}
