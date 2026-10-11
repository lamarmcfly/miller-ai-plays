import assert from "node:assert";
import path from "node:path";
import { listSlugs } from "../apps/web/src/lib/plays";
import {
  CHECK_PLAYS,
  FIRST_SESSION,
  allReferencedSlugs,
  decodeAnswers,
  encodeAnswers,
  experiences,
  makes,
  recommend,
} from "../apps/web/src/lib/start-path";

const existing = new Set(listSlugs(path.join(__dirname, "..", "content", "plays")));

for (const slug of allReferencedSlugs()) assert(existing.has(slug), `Start path references missing Play: ${slug}`);

let combos = 0;
for (const m of makes)
  for (const x of experiences) {
    const { steps } = recommend(m.id, x.id);
    const slugs = steps.map((s) => s.slug);
    const where = `${m.id}/${x.id}`;
    assert(slugs.length >= 3, `${where}: only ${slugs.length} steps`);
    assert(new Set(slugs).size === slugs.length, `${where}: duplicate steps`);
    assert(steps.every((s) => s.reason.trim()), `${where}: a step has no reason`);
    assert(
      slugs.some((s) => (CHECK_PLAYS as readonly string[]).includes(s)),
      `${where}: every path needs a checking Play`
    );
    if (x.id === "new") assert(slugs[0] === FIRST_SESSION, `${where}: new users start with the first session`);
    else assert(!slugs.includes(FIRST_SESSION), `${where}: experienced users skip the first session`);
    const d = decodeAnswers(encodeAnswers(m.id, x.id));
    assert(d && d.make === m.id && d.xp === x.id, `${where}: answers do not round-trip through the URL`);
    combos++;
  }

// Every Play is reachable from at least one path, so nothing is orphaned.
const referenced = new Set(allReferencedSlugs());
for (const slug of existing) assert(referenced.has(slug), `Play ${slug} is not on any Start Here path`);

assert(decodeAnswers("make=nope&xp=new") === null);
assert(decodeAnswers("make=pearls") === null);
console.log(`OK (${combos} answer combinations)`);
