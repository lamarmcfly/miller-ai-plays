import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { allReferencedSlugs, experiences, goals, needs, recommend, encodeAnswers, decodeAnswers, type NeedId } from "../apps/web/src/lib/start-path";
import { toolJobs } from "../apps/web/src/lib/tool-chooser";

const playsDir = path.join(__dirname, "..", "content", "plays");
const existing = new Set(fs.readdirSync(playsDir));

// every slug the recommender can return is a real Play
for (const slug of allReferencedSlugs()) assert(existing.has(slug), `Start path references missing Play: ${slug}`);

// every tool job points at a real Play (when it has one)
for (const j of toolJobs) if (j.playSlug) assert(existing.has(j.playSlug), `Tool job ${j.id} -> missing Play ${j.playSlug}`);

// every answer combination gives a full, duplicate-free path
const needSets: NeedId[][] = [[], ...needs.map((n) => [n.id]), needs.map((n) => n.id)];
let combos = 0;
for (const g of goals) for (const x of experiences) for (const ns of needSets) {
  const r = recommend(g.id, x.id, ns);
  const slugs = r.steps.map((s) => s.slug);
  assert(slugs.length >= 4, `${g.id}/${x.id}/${ns.join("+")} only ${slugs.length} steps`);
  assert(new Set(slugs).size === slugs.length, `${g.id}/${x.id}: duplicate steps`);
  assert(x.id !== "new" || slugs[0] === "first-ai-session", "new users start with the first session");
  assert(slugs.includes("verify-the-ai"), "verification is always on the path");
  assert(r.steps.every((s) => s.reason), `${g.id}: step missing reason`);
  r.toolJobIds.forEach((id) => assert(toolJobs.some((j) => j.id === id), `unknown tool job ${id}`));
  const d = decodeAnswers(encodeAnswers(g.id, x.id, ns));
  assert(d && d.goal === g.id && d.xp === x.id && d.needs.join() === ns.join(), "answers round-trip through the URL");
  combos++;
}
assert(decodeAnswers("goal=nope&xp=new") === null);
console.log(`OK (${combos} answer combinations)`);
