import path from "path";
import { listSlugs, readPlay } from "../apps/web/src/lib/plays";
import { STANDARD_BLOCK, STANDARD_HEADING, withStandard } from "../apps/web/src/lib/standard";

// Validates every Play against the schema, then the editorial rules the schema
// can't express. Run with `pnpm validate`.

const CONTENT_DIR = path.join(__dirname, "..", "content", "plays");
const BLANK = /\[([^\[\]\n]{2,80})\]/g;
const HAS_BLANK = /\[[^\[\]\n]{2,80}\]/;

let errors = 0;
const fail = (slug: string, msg: string) => {
  console.error(`[FAIL] ${slug}: ${msg}`);
  errors++;
};

const slugs = listSlugs(CONTENT_DIR);
const known = new Set(slugs);

for (const slug of slugs) {
  const r = readPlay(CONTENT_DIR, slug);
  if (!r.ok) {
    for (const e of r.errors) fail(slug, e);
    continue;
  }
  const play = r.play;
  const before = errors;

  if (play.slug !== slug) fail(slug, `frontmatter slug "${play.slug}" does not match its folder`);

  // The standard is appended on copy; a Play that restates it would send it twice.
  const texts = [play.prompt, ...(play.starterPrompts ?? []).map((s) => s.prompt)];
  if (texts.some((t) => t.includes(STANDARD_HEADING)))
    fail(slug, "prompt restates the faculty standard; it is appended automatically");

  // The main prompt is copied as-is, so it must not contain fill-in blanks.
  const blanks = [...play.prompt.matchAll(BLANK)].map((m) => m[0]);
  if (blanks.length) fail(slug, `main prompt has fill-in blanks ${blanks.join(", ")}; use starter prompts for those`);

  for (const sp of play.starterPrompts ?? []) {
    if (!HAS_BLANK.test(sp.prompt)) fail(slug, `starter prompt "${sp.label}" has no [BLANKS] to fill in`);
    if (/\[[^\]]*$|^[^\[]*\]/m.test(sp.prompt)) fail(slug, `starter prompt "${sp.label}" has an unbalanced bracket`);
  }

  if (/\[REPLACE|TODO|TBD/.test(play.prompt + play.content)) fail(slug, "placeholder text left in");

  for (const rel of play.relatedPlays) {
    if (rel === slug) fail(slug, "lists itself as related");
    else if (!known.has(rel)) fail(slug, `related Play "${rel}" does not exist`);
  }

  if (play.updatedAt < play.publishedAt) fail(slug, "updatedAt is before publishedAt");

  if (withStandard(play.prompt).split("\n").length > 120)
    console.warn(`[WARN] ${slug}: copied prompt is over 120 lines; consider trimming`);

  if (errors === before) console.log(`[OK] ${slug}`);
}

if (/[[\]]/.test(STANDARD_BLOCK)) {
  console.error("[FAIL] standard: contains square brackets, which would turn into fill-in blanks");
  errors++;
}

console.log(`\nPlays: ${slugs.length} | Errors: ${errors}`);
if (errors > 0) process.exit(1);
