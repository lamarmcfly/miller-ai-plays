import type { Play } from "./play-types.js";

const MILLER_ORANGE = "#F47321";
const MILLER_GREEN = "#00543C";

const audienceLabels: Record<string, string> = {
  step1: "Step 1",
  step2: "Step 2 CK",
  shelf: "Shelf",
  osce: "OSCE",
  clerkship: "Clerkship",
  coursework: "Coursework",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Section 2 - At-a-glance metadata table */
export function buildMetadataHtml(play: Play): string {
  const audience = play.audience
    .map((a) => audienceLabels[a] || a)
    .join(", ");
  const years = play.year.join(", ");
  const tools = play.tools.map((t) => `${t.name} (${t.plan})`).join(", ");

  return `
<table style="width:100%; border-collapse:collapse; font-size:14px;">
  <tr><td style="padding:6px 12px; font-weight:600; width:140px;">Audience</td><td style="padding:6px 12px;">${escapeHtml(audience)}</td></tr>
  <tr><td style="padding:6px 12px; font-weight:600;">Year</td><td style="padding:6px 12px;">${escapeHtml(years)}</td></tr>
  <tr><td style="padding:6px 12px; font-weight:600;">Estimated time</td><td style="padding:6px 12px;">${escapeHtml(play.estimatedTime)}</td></tr>
  <tr><td style="padding:6px 12px; font-weight:600;">Difficulty</td><td style="padding:6px 12px;">${escapeHtml(play.difficulty)}</td></tr>
  <tr><td style="padding:6px 12px; font-weight:600;">Tool required</td><td style="padding:6px 12px;">${escapeHtml(tools)}</td></tr>
  <tr><td style="padding:6px 12px; font-weight:600;">Author</td><td style="padding:6px 12px;">${escapeHtml(play.author)}</td></tr>
  <tr><td style="padding:6px 12px; font-weight:600;">Published</td><td style="padding:6px 12px;">${escapeHtml(play.publishedAt)}</td></tr>
  <tr><td style="padding:6px 12px; font-weight:600;">Last reviewed</td><td style="padding:6px 12px;">${escapeHtml(play.updatedAt)}</td></tr>
</table>`.trim();
}

/** Section 3 - Video placeholder */
export function buildVideoPlaceholderHtml(play: Play): string {
  return `
<div style="text-align:center; padding:32px; border:2px dashed #ccc; border-radius:8px; background:#f9f9f9;">
  <p style="color:#666; margin:0;">Demo video (${play.video.durationSeconds}s) - upload video to the Play Videos library, then replace this placeholder with the Stream web part.</p>
  <p style="color:#999; font-size:12px; margin-top:8px;">Captions enabled. Autoplay OFF.</p>
</div>`.trim();
}

/** Section 4 - What it does */
export function buildWhatItDoesHtml(play: Play): string {
  return `
<h2>What it does</h2>
<p>${escapeHtml(play.oneLiner)}</p>
<p>Use it when ${escapeHtml(play.whenToUse.split("\n")[0].trim())}. You'll know it's working when ${escapeHtml(play.successSignal.split("\n")[0].trim())}.</p>`.trim();
}

/** Section 5 - How to set it up */
export function buildSetupHtml(play: Play): string {
  const instructions = play.artifact.cloneInstructions;
  // Parse clone instructions into numbered steps
  const steps = instructions.includes("→")
    ? instructions.split("→").map((s) => s.trim())
    : [instructions];

  const stepListItems = steps
    .map((step, i) => `<li>${escapeHtml(step)}</li>`)
    .join("\n");

  return `
<h2>How to set it up</h2>
<p>You only do this once. After that, it takes ${escapeHtml(play.estimatedTime)}.</p>
<ol>
${stepListItems}
</ol>`.trim();
}

/** Section 6 - The Prompt (code block) */
export function buildPromptHtml(play: Play): string {
  return `
<h2>The Prompt</h2>
<p>Copy the prompt below and paste it into ${escapeHtml(play.tools[0]?.name || "your AI tool")}.</p>
<pre style="background:#f4f4f4; border:1px solid #ddd; border-radius:6px; padding:16px; font-family:'Courier New',Courier,monospace; font-size:13px; line-height:1.5; white-space:pre-wrap; overflow-x:auto;"><code>${escapeHtml(play.artifact.systemPrompt.trim())}</code></pre>`.trim();
}

/** Section 7 - When to use this (orange callout) */
export function buildWhenToUseHtml(play: Play): string {
  const paragraphs = play.whenToUse
    .trim()
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => `<p style="margin:4px 0;">${escapeHtml(l.trim())}</p>`)
    .join("\n");

  return `
<div style="border-left:4px solid ${MILLER_ORANGE}; padding:16px 20px; background:#fff3e6; border-radius:0 6px 6px 0;">
  <h2 style="margin-top:0;">When to use this</h2>
  ${paragraphs}
</div>`.trim();
}

/** Section 8 - Success signal (green callout) */
export function buildSuccessSignalHtml(play: Play): string {
  const paragraphs = play.successSignal
    .trim()
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => `<p style="margin:4px 0;">${escapeHtml(l.trim())}</p>`)
    .join("\n");

  return `
<div style="border-left:4px solid ${MILLER_GREEN}; padding:16px 20px; background:#e8f5e9; border-radius:0 6px 6px 0;">
  <h2 style="margin-top:0;">Success signal</h2>
  ${paragraphs}
</div>`.trim();
}

/** Section 9 - Common pitfalls (from MDX body) */
export function buildPitfallsHtml(mdxBody: string): string {
  const lines = mdxBody
    .split("\n")
    .filter((l) => l.startsWith("- **"));

  const items = lines
    .map((line) => {
      // Parse "- **Bold title.** Description text"
      const match = line.match(/^- \*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        return `<li><strong>${escapeHtml(match[1])}</strong> ${escapeHtml(match[2])}</li>`;
      }
      return `<li>${escapeHtml(line.replace(/^- /, ""))}</li>`;
    })
    .join("\n");

  return `
<h2>Common pitfalls</h2>
<ul>
${items}
</ul>`.trim();
}

/** Section 10 - Related Plays */
export function buildRelatedPlaysHtml(
  play: Play,
  siteUrl: string
): string {
  const links = play.relatedPlays
    .map((slug) => {
      const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      // Link to the SharePoint page (assumes slug-based naming)
      return `<li><a href="${siteUrl}/SitePages/${slug}.aspx">${escapeHtml(label)}</a></li>`;
    })
    .join("\n");

  return `
<h2>Related Plays</h2>
<ul>
${links}
</ul>`.trim();
}

/** Section 11 - Feedback */
export function buildFeedbackHtml(): string {
  return `
<h2>Feedback</h2>
<p>Used this Play? Tell us what worked and what didn't in the comments below. The Council reviews feedback monthly.</p>`.trim();
}

/** Section 12 - Footer */
export function buildFooterHtml(play: Play): string {
  return `
<div style="font-size:12px; color:#666; border-top:1px solid #eee; padding-top:16px; margin-top:24px;">
  <p>Authored by ${escapeHtml(play.author)}. Version ${escapeHtml(play.version)}.</p>
  <p>Part of Miller AI Plays, an Academic Enrichment Services initiative.<br/>
  Methodology developed by AES. Operated by the Miller AI Plays Council.</p>
  <p><em>Not an official University of Miami publication.</em></p>
</div>`.trim();
}

/** Learning note - why this works (science-backed callout) */
export function buildLearningNoteHtml(play: Play): string {
  if (!play.learningNote) return "";
  return `
<div style="background:#e3f2fd; border:1px solid #bbdefb; border-radius:8px; padding:16px 20px; margin:8px 0;">
  <p style="font-size:11px; font-weight:600; color:#1565c0; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 6px 0;">Why this works</p>
  <p style="font-size:14px; color:#1a237e; margin:0; line-height:1.5;">${escapeHtml(play.learningNote)}</p>
</div>`.trim();
}

/** Starter prompts - lower-barrier alternatives to the system prompt */
export function buildStarterPromptsHtml(play: Play): string {
  if (!play.starterPrompts || play.starterPrompts.length === 0) return "";

  const prompts = play.starterPrompts
    .map(
      (sp) => `
<div style="border:1px solid #eee; border-radius:6px; padding:12px 16px; margin-bottom:8px; background:#fff;">
  <p style="font-weight:600; font-size:13px; margin:0 0 6px 0;">${escapeHtml(sp.label)}</p>
  <pre style="background:#f9f9f9; border:1px solid #eee; border-radius:4px; padding:10px; font-family:'Courier New',monospace; font-size:12px; line-height:1.4; white-space:pre-wrap; margin:0;">${escapeHtml(sp.prompt)}</pre>
</div>`
    )
    .join("\n");

  return `
<div style="border-left:2px solid ${MILLER_ORANGE}33; padding-left:16px; margin-top:12px;">
  <p style="font-size:13px; font-weight:600; color:${MILLER_ORANGE};">New to this? Try a starter prompt instead</p>
  <p style="font-size:12px; color:#888; margin-bottom:12px;">These simpler prompts go directly into a chat - no Project setup needed. Replace the [BRACKETS] with your info.</p>
  ${prompts}
</div>`.trim();
}

/** Build the full page HTML body (all 12 sections concatenated) */
export function buildFullPageHtml(play: Play, mdxBody: string, siteUrl: string): string {
  const sections = [
    // Section 1 is the page title (set via page properties, not HTML)
    buildMetadataHtml(play),
    buildVideoPlaceholderHtml(play),
    buildLearningNoteHtml(play),
    buildWhatItDoesHtml(play),
    buildSetupHtml(play),
    buildPromptHtml(play),
    buildStarterPromptsHtml(play),
    buildWhenToUseHtml(play),
    buildSuccessSignalHtml(play),
    buildPitfallsHtml(mdxBody),
    buildRelatedPlaysHtml(play, siteUrl),
    buildFeedbackHtml(),
    buildFooterHtml(play),
  ].filter(Boolean);

  return sections.join("\n<hr/>\n");
}
