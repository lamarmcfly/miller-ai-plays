import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { aiTool, redactAnalyticsUrl, safePage, usageProperties, type UsageAction } from "../apps/web/src/lib/analytics-policy";
import { examOrder } from "../apps/web/src/lib/question-spec";
import { goals } from "../apps/web/src/lib/start-path";

const privateUrl = "https://example.com/question-builder?topic=PRIVATE_NOTE&email=student@example.com#PRIVATE_NOTE";
assert.equal(redactAnalyticsUrl(privateUrl), "https://example.com/question-builder");
assert.equal(redactAnalyticsUrl("https://user:secret@example.com/start?needs=missing"), "https://example.com/start");
assert.equal(redactAnalyticsUrl("not a url"), null);
assert.equal(redactAnalyticsUrl("javascript:alert(1)"), null);
assert.equal(safePage("/students/student@example.com"), "/other");
assert.equal(safePage("/plays/PRIVATE_NOTE"), "/other");
assert.equal(safePage("/start/?goal=step1"), "/start");
for (const slug of readdirSync("content/plays")) assert.equal(safePage(`/plays/${slug}`), `/plays/${slug}`);
for (const goal of goals) {
  assert.equal(safePage(`/exams/${goal.id}`), `/exams/${goal.id}`);
  assert.equal(usageProperties("start_completed", "/start", goal.id)?.goal, goal.id);
}
for (const exam of examOrder) assert.equal(usageProperties("builder_prompt_copied", privateUrl, exam)?.exam, exam);
for (const action of ["prompt_copied", "builder_prompt_copied", "start_completed", "ai_tool_opened", "print_requested"] as UsageAction[]) {
  const properties = usageProperties(action, privateUrl, "PRIVATE_NOTE");
  assert.ok(!JSON.stringify(properties).includes("PRIVATE_NOTE"));
  assert.ok(!JSON.stringify(properties).includes("student@example.com"));
  if (properties) assert.ok(Object.keys(properties).length <= 2);
}
assert.equal(usageProperties("unapproved" as UsageAction, privateUrl), null);
assert.equal(aiTool("https://chatgpt.com/?q=PRIVATE_NOTE"), "chatgpt");
assert.equal(aiTool("https://chatgpt.com.attacker.example/?q=PRIVATE_NOTE"), null);
assert.equal(aiTool("https://constructor"), null);
assert.equal(aiTool("http://claude.ai"), null);
assert.deepEqual(usageProperties("ai_tool_opened", privateUrl, "claude"), { page: "/question-builder", tool: "claude" });
console.log("Analytics privacy and category checks passed.");
