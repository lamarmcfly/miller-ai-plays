import { buildQuestionPrompt, configFromPreset, defaultConfig, presets, exams, examOrder, formats, applyExam } from "../apps/web/src/lib/question-spec";
import assert from "node:assert";

// every preset builds, and format is allowed for its exam
for (const p of presets) {
  const c = configFromPreset(p.id)!;
  assert(exams[c.exam].formats.includes(c.format), `${p.id}: format ${c.format} not allowed for ${c.exam}`);
  const out = buildQuestionPrompt(c);
  assert(out.length > 400, p.id);
}
// every exam default config is self-consistent across all modes
for (const id of examOrder) {
  const c = applyExam(defaultConfig(), id);
  assert(exams[id].formats.includes(c.format), id);
  for (const mode of ["interactive", "batch", "keyed"] as const) {
    const out = buildQuestionPrompt({ ...c, mode, examName: "UKMLA AKT" });
    assert(!/undefined|NaN|\[object/.test(out), `${id}/${mode} has junk`);
  }
}
// all formats render for sba exam
for (const f of Object.keys(formats) as (keyof typeof formats)[]) {
  const out = buildQuestionPrompt({ ...defaultConfig("other"), format: f });
  assert(!/undefined/.test(out), f);
}
// source + weak spots
const out = buildQuestionPrompt({ ...defaultConfig("step1"), source: "Loop diuretics block NKCC2.", weakSpots: "renal", topic: "diuretics", count: 999 });
assert(out.includes("<<<SOURCE") && out.includes("Write 30"), "source/count clamp");
console.log("OK");
