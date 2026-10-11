import { FillablePrompt } from "./FillablePrompt";
import { STANDARD_BLOCK } from "@/lib/standard";

export function StarterPrompts({ prompts }: { prompts: { label: string; prompt: string }[] }) {
  return (
    <section aria-labelledby="starter-prompts" className="space-y-3">
      <div className="space-y-1">
        <h2 id="starter-prompts" className="text-xl font-semibold">
          Short on time? Fill in the blanks
        </h2>
        <p className="text-sm text-muted-foreground">
          A shorter version for a quick job. Type your details into the boxes and copy. The same content standard is
          added automatically.
        </p>
      </div>
      {prompts.map((sp) => (
        <FillablePrompt key={sp.label} label={sp.label} prompt={sp.prompt} appendix={STANDARD_BLOCK} />
      ))}
    </section>
  );
}
