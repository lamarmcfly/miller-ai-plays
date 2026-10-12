import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { allReferencedSlugs, builderHrefFor, experiences, goalSteps, goals, needs, recommend, encodeAnswers, decodeAnswers, type NeedId } from "../apps/web/src/lib/start-path";
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
  assert(slugs.length >= 2, `${g.id}/${x.id}/${ns.join("+")} only ${slugs.length} steps`);
  assert(new Set(slugs).size === slugs.length, `${g.id}/${x.id}: duplicate steps`);
  assert(x.id !== "new" || slugs[0] === "first-ai-session", "new users start with the first session");
  assert(slugs.includes("verify-the-ai"), "verification is always on the path");
  assert(r.steps.every((s) => s.reason), `${g.id}: step missing reason`);
  r.toolJobIds.forEach((id) => assert(toolJobs.some((j) => j.id === id), `unknown tool job ${id}`));
  const d = decodeAnswers(encodeAnswers(g.id, x.id, ns));
  assert(d && d.goal === g.id && d.xp === x.id && d.needs.join() === ns.join(), "answers round-trip through the URL");
  combos++;
}
// the by-exam pages show only Plays that belong to that goal: no generic
// on-ramp Plays and no study-skill Plays on the skills-and-career goals
const generic = new Set(["first-ai-session", "verify-the-ai"]);
for (const g of goals) {
  const slugs = goalSteps(g.id).map((s) => s.slug);
  assert(slugs.length >= 1, `${g.id}: no Plays`);
  assert(slugs.every((s) => !generic.has(s)), `${g.id}: by-exam page lists a generic Play`);
  assert(goalSteps(g.id).every((s) => s.reason), `${g.id}: by-exam step missing reason`);
  assert(builderHrefFor(g.id) === recommend(g.id, "some", []).builderHref, `${g.id}: builder link mismatch`);
}
const focused = ["osce", "wards", "residency"] as const;
for (const g of focused) {
  const base = goalSteps(g).map((s) => s.slug);
  const withNeeds = recommend(g, "comfortable", needs.map((n) => n.id)).steps.map((s) => s.slug);
  for (const slug of withNeeds) assert(base.includes(slug) || generic.has(slug), `${g}: needs pulled in off-topic Play ${slug}`);
}
assert(decodeAnswers("goal=nope&xp=new") === null);
console.log(`OK (${combos} answer combinations)`);
