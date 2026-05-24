import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Council",
  description:
    "The Miller AI Plays Council operates the Play library. Learn about the team and how to apply.",
};

export default function CouncilPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">The Council</h1>
        <p className="text-lg text-muted-foreground">
          The Miller AI Plays Council is a team of 3-5 medical students who
          author, review, and maintain the Play library.
        </p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">What the Council does</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-[#F47321] font-bold">1.</span>
            Authors new Plays based on student demand and emerging AI tools
          </li>
          <li className="flex gap-2">
            <span className="text-[#F47321] font-bold">2.</span>
            Reviews submitted Plays against editorial standards
          </li>
          <li className="flex gap-2">
            <span className="text-[#F47321] font-bold">3.</span>
            Maintains existing Plays - updates, retires, or rewrites as tools
            change
          </li>
          <li className="flex gap-2">
            <span className="text-[#F47321] font-bold">4.</span>
            Meets monthly to review feedback and plan the library roadmap
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Current members</h2>
        <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">
          <p>Founding Council members will be announced at launch.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How to apply</h2>
        <p className="text-muted-foreground leading-relaxed">
          Council applications open each spring for the following academic year.
          Members serve a one-year term with the opportunity to continue.
          Interested students should demonstrate AI tool fluency,
          follow-through, and a willingness to commit 2-3 hours per month.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Benefits include AES service credit, letters of recommendation,
          authorship credit on Plays, and direct mentorship on AI and
          learning science.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Editorial standards</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Every Play must meet these criteria before publishing:
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>Solves a real, specific workflow medical students actually do</li>
          <li>Demo under 90 seconds (hard cap)</li>
          <li>One tool, one job (no cross-tool workflows in v1)</li>
          <li>Tested on real student work by the author</li>
          <li>No academic integrity violations</li>
          <li>No clinical decision-making content</li>
          <li>Last-reviewed within 90 days</li>
        </ul>
      </section>
    </div>
  );
}
