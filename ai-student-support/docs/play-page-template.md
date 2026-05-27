# Miller AI Plays — SharePoint Play Page Template

**Version 1.0**
**For Council use only**
**Maintained by:** Miller AI Plays Council

---

## How to use this template

This document is the blueprint for every Play page in the Miller AI Plays SharePoint site. Every Play follows this structure — no exceptions. Consistency is the brand.

**To create a new Play:**
1. In the Miller AI Plays SharePoint site, click **New → Page**
2. Select the "Miller AI Plays — Play Template" page template (set up by AES at site creation)
3. Copy the structure below into the page, replacing placeholders with your content
4. Submit for Council review via the **Play Submissions** Microsoft List
5. Do NOT publish until the Council has reviewed and approved

**Naming convention:**
- Page title: `[Play Title]` — short, action-oriented, no jargon
- Page URL slug: `kebab-case-version-of-title` (e.g., `error-engine`, `lecture-compressor`)
- Filename for any uploaded assets: `slug-asset-name.ext` (e.g., `error-engine-demo.mp4`)

---

## The Play Page Template

Use the following structure on every Play page. Each section maps to a SharePoint web part.

---

### SECTION 1: Header

**Web part:** Hero or Text web part with large heading

```
[PLAY TITLE — short, action-oriented]
[One-line hook — what this Play does, in 12 words or less]
```

**Example:**
> **Turn Wrong Qbank Questions Into a Study Plan**
> *Don't just review your wrongs. Diagnose them.*

---

### SECTION 2: At-a-glance metadata

**Web part:** Text web part with a styled table, OR a Microsoft List view filtered to this Play

| Field | Value |
|---|---|
| **Audience** | [Step 1 / Step 2 / Shelf / OSCE / Clerkship — pick all that apply] |
| **Year** | [MS1 / MS2 / MS3 / MS4 — pick all that apply] |
| **Estimated time** | [e.g., "5 minutes per Qbank block"] |
| **Difficulty** | [Beginner / Intermediate / Advanced] |
| **Tool required** | [Claude (free) / Claude (Pro) / Copilot / NotebookLM / etc.] |
| **Author** | [Your full name + cohort, e.g., "Jane Doe, MS3"] |
| **Published** | [Date] |
| **Last reviewed** | [Date — must be within 90 days] |

---

### SECTION 3: The Demo

**Web part:** Stream video embed

- Upload your 60–90 second screen recording to Microsoft Stream
- Embed via SharePoint's Stream web part
- Enable captions (required for accessibility)
- Set a clean thumbnail/poster frame

**Requirements:**
- Video length: 60–90 seconds (hard cap)
- Resolution: 1080p minimum
- Captions: required
- No background music (distracts from screen content)
- Voiceover: clear, conversational, no script-reading tone

---

### SECTION 4: What it does

**Web part:** Text web part

Two to three sentences. Plain language. No jargon. Explain the outcome, not the mechanism.

**Template:**
> [This Play] helps you [specific outcome] by [brief mechanism]. Use it when [trigger situation]. You'll know it's working when [success signal].

**Example:**
> The Error Engine helps you turn missed Qbank questions into a clear study plan by categorizing each error, naming the underlying concept, and prescribing your next step. Use it after every UWorld or NBME practice block. You'll know it's working when you can name your top three error patterns without thinking.

---

### SECTION 5: How to set it up

**Web part:** Text web part with numbered list

Step-by-step, screenshot-supported where helpful. Assume zero prior AI tool knowledge.

**Template:**
1. Open [tool URL]
2. [Specific click path or action]
3. [Next action]
4. Copy the prompt from Section 6 below
5. Paste it into [specific location]
6. You're ready to use the Play

**Standards:**
- Each step is one action
- Use exact button names from the tool's UI
- If the UI has changed since this Play was published, flag it for review

---

### SECTION 6: The Prompt

**Web part:** Text web part with a fenced code block, plus a Quick Action button labeled "Copy Prompt"

```
[FULL PROMPT TEXT HERE]

[Multi-line prompts are fine — preserve formatting]

[End with explicit output format expectations]
```

**Standards:**
- The prompt must be self-contained — no references to context the AI doesn't have
- Include role definition, task definition, rules, and output format
- Test the prompt on at least three real student inputs before submitting
- If the prompt depends on user pasting in specific content (e.g., a wrong Qbank question), state that explicitly inside the prompt

---

### SECTION 7: When to use this

**Web part:** Text web part with a callout style

One short paragraph naming the specific situation that triggers using this Play.

**Example:**
> Use this Play after every UWorld or NBME practice block — especially when you keep missing questions in the same topic and can't tell whether it's a knowledge gap or a reasoning error.

---

### SECTION 8: Success signal

**Web part:** Text web part with a callout style

One sentence describing what "this is working" looks like, measurable by the student themselves.

**Example:**
> Within two weeks of consistent use, you can name your top three error patterns without thinking. That self-awareness is the signal it's working.

---

### SECTION 9: Common pitfalls

**Web part:** Text web part with bulleted list

Two to four real failure modes you (the author) hit when developing this Play. Honest, specific, helpful.

**Example:**
- Don't paste the full question explanation back to the AI — it'll just summarize what you already read. Paste only your reasoning, your answer, and the correct answer.
- If the AI categorizes everything as "knowledge gap," you're not giving it enough of your reasoning. Show your work in the prompt.
- This Play won't fix systemic study problems. If you're missing 60%+ of a Qbank, the issue is upstream of error analysis.

---

### SECTION 10: Related Plays

**Web part:** Quick Links web part

Link to 2–4 other Plays that pair well with this one. Use the SharePoint internal page links so they update automatically.

---

### SECTION 11: Feedback

**Web part:** Comments web part (native SharePoint comments enabled)

Native SharePoint comments serve as the feedback mechanism. Council reviews comments monthly.

Optional: embed a Microsoft Form for structured feedback if comments are insufficient signal for a particular Play.

---

### SECTION 12: Footer

**Web part:** Text web part, small style

```
Authored by [Name, Cohort]. Reviewed [Month Year] by the Miller AI Plays Council.
Last updated [Date]. Version [X.X].

Part of Miller AI Plays, an Academic Enrichment Services initiative.
Methodology developed by AES. Operated by the Miller AI Plays Council.

Not an official University of Miami publication.
```

---

## Author submission checklist

Before submitting your Play for Council review, confirm every item below.

**Content quality**
- [ ] Solves a specific, named workflow problem
- [ ] Demo video is under 90 seconds
- [ ] Prompt is self-contained and tested on real student work
- [ ] All eight editorial standards from the Charter are met
- [ ] No academic integrity concerns
- [ ] No clinical decision-making content

**Page completeness**
- [ ] All 12 sections present and filled
- [ ] Video uploaded to Stream with captions
- [ ] Metadata table complete and accurate
- [ ] Author credit present
- [ ] Related Plays linked
- [ ] Footer attribution correct

**Technical**
- [ ] Page slug uses kebab-case
- [ ] All internal links work
- [ ] Mobile preview tested in Teams app
- [ ] Page is set to "Unpublished" until Council approves

**Council review**
- [ ] Submitted via the Play Submissions Microsoft List
- [ ] Tagged with submission date
- [ ] Author available for follow-up questions

---

## Council review checklist

For Council members reviewing a submission.

**First pass (5 min)**
- [ ] Does this solve a real problem a student would have?
- [ ] Is the demo video under 90 seconds and clear?
- [ ] Does the prompt actually work? (Test it yourself with a real input.)

**Second pass (10 min)**
- [ ] All editorial standards met?
- [ ] Page complete per the template?
- [ ] Any academic integrity, clinical safety, or policy concerns?
- [ ] Does it duplicate or conflict with an existing Play?

**Decision**
- [ ] Approve as submitted
- [ ] Approve with minor edits (Council member makes edits directly)
- [ ] Return to author with specific feedback
- [ ] Reject with rationale

---

## Quarterly Play audit checklist

Each Play must be reviewed at least every 90 days. Audit by the assigned Council member.

- [ ] Demo video still plays and reflects the current tool UI
- [ ] Setup steps still match the tool's current UI
- [ ] Prompt still produces useful output (test it)
- [ ] Last-reviewed date updated on the page
- [ ] Any new pitfalls to add?
- [ ] Should this Play be retired, updated, or kept as-is?

---

*End of Template v1.0.*
