// Checks that Miller AI Plays and Med AI Plays stay separate while sharing one
// codebase: the profiles, the private site's access gate, community privacy,
// per-site Plays, and that shared content uses neutral stage names.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { resolveSiteId, sites, stageLabel, stageTag } from "../apps/web/src/lib/site";
import {
  accessToken,
  codeMatches,
  configuredCode,
  readCookie,
  safeNext,
  tokenGrantsAccess,
} from "../apps/web/src/lib/site-access";
import { resolveCommunityMode } from "../apps/web/src/lib/community-mode";
import { availableOn } from "../apps/web/src/lib/plays";
import { rowToPost } from "../apps/web/src/lib/community-group";

async function main() {
  // Choosing a site
  assert.equal(resolveSiteId(undefined), "med", "unset means the public national site");
  assert.equal(resolveSiteId("miller"), "miller");
  assert.throws(() => resolveSiteId("miler"), "a typo must fail the build, not publish the wrong site");

  // Profiles
  const { med, miller } = sites;
  assert.equal(med.private, false);
  assert.equal(miller.private, true, "Miller AI Plays is for Miller students only");
  for (const site of [med, miller]) {
    for (const [key, value] of Object.entries(site)) {
      if (typeof value === "string") assert.ok(value.trim(), `${site.id}.${key} is empty`);
    }
  }
  const medText = JSON.stringify(med);
  assert.ok(!/Phase [123]|\bMiller\b/.test(medText), "Med AI Plays must not use Miller's names or Phase 1/2/3");
  assert.deepEqual(
    (["1", "2", "3"] as const).map((id) => miller.stages[id].name),
    ["Phase 1", "Phase 2", "Phase 3"]
  );
  assert.equal(stageLabel("2", med), "Clerkships");
  assert.equal(stageLabel("2", miller), "Phase 2: Clerkships and Step 2");
  assert.equal(stageTag("1", med), "");
  assert.equal(stageTag("1", miller), " (Phase 1)");

  // Access gate
  assert.equal(configuredCode(undefined), null, "no code configured means nobody gets in");
  assert.equal(configuredCode("short"), null, "a short code counts as not set up");
  const code = configuredCode("Cane Study Lantern 2026");
  assert.ok(code);
  assert.ok(await codeMatches("  cane study   LANTERN 2026 ", code), "case and spacing do not matter");
  assert.ok(!(await codeMatches("cane study lantern 2025", code)));
  assert.ok(!(await codeMatches("", code)));
  assert.ok(!(await codeMatches("cane study lantern 2026", null)));
  const token = await accessToken(code);
  assert.ok(await tokenGrantsAccess(token, { isPrivate: true, code }));
  assert.ok(!(await tokenGrantsAccess(undefined, { isPrivate: true, code })));
  assert.ok(!(await tokenGrantsAccess("forged", { isPrivate: true, code })));
  assert.ok(!(await tokenGrantsAccess(token, { isPrivate: true, code: "a new semester code" })), "a new code signs everyone out");
  assert.ok(!(await tokenGrantsAccess(token, { isPrivate: true, code: null })), "fails closed without a code");
  assert.ok(await tokenGrantsAccess(undefined, { isPrivate: false }), "a public site is open");
  assert.equal(readCookie("a=1; site_access=abc%3D; b=2", "site_access"), "abc=");
  assert.equal(readCookie(null, "site_access"), undefined);
  for (const bad of ["//evil.example", "https://evil.example", "/\\evil.example", "plays", "/access?next=/", "/api/feedback", ""]) {
    assert.equal(safeNext(bad), "/", `unsafe next: ${bad}`);
  }
  assert.equal(safeNext("/plays/error-engine?x=1"), "/plays/error-engine?x=1");

  // Community: a private site never sends posts to public GitHub issues
  assert.equal(resolveCommunityMode({ isPrivate: true }), "off");
  assert.equal(resolveCommunityMode({ isPrivate: false }), "github");
  assert.equal(resolveCommunityMode({ isPrivate: true, formUrl: "https://tally.so/r/x" }), "form");
  assert.equal(resolveCommunityMode({ isPrivate: true, backend: "inline" }), "inline");
  const post = rowToPost({
    id: "7b0c",
    created_at: "2026-11-01T12:00:00Z",
    cohort: "MS2",
    category: "prompt",
    exam_context: ["Step 1", "Shelf", "Unknown"],
    title: "Quiz me from my notes",
    tool: "Claude",
    prompt: "Ask me one question at a time.",
    outcome: "Found two gaps.",
    usefulness: 4,
  });
  assert.ok(post);
  assert.deepEqual(post.examContext, ["step1", "shelf"]);
  assert.equal(post.authorDisplayName, "MS2 student", "group posts stay anonymous");

  // Per-site Plays
  assert.ok(availableOn({}, "med") && availableOn({}, "miller"), "untagged Plays show on both sites");
  assert.ok(availableOn({ sites: ["miller"] }, "miller"));
  assert.ok(!availableOn({ sites: ["miller"] }, "med"));

  // Shared content shows on Med AI Plays, so it must not use Miller's Phase names
  const root = path.join(__dirname, "..");
  const shared = [
    ...fs.readdirSync(path.join(root, "content", "plays")).map((d) => path.join(root, "content", "plays", d, "play.mdx")),
    ...fs.readdirSync(path.join(root, "prompts")).map((f) => path.join(root, "prompts", f)),
    ...fs.readdirSync(path.join(root, "content", "community")).map((f) => path.join(root, "content", "community", f)),
  ].filter((f) => fs.existsSync(f));
  for (const file of shared) {
    const text = fs.readFileSync(file, "utf-8");
    if (/sites:\s*\[\s*["']?miller["']?\s*\]/.test(text)) continue; // Miller-only content may use them
    assert.ok(!/Phase [123]/.test(text), `${path.relative(root, file)} says "Phase 1/2/3"; use pre-clerkship, clerkship, or advanced clinical`);
  }

  console.log(`Site checks passed (${shared.length} shared content files scanned).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
