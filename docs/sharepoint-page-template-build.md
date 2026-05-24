# SharePoint Page Template — Build Instructions

**For:** Lamar Martin (initial build) + future Council page authors
**Purpose:** The literal content to paste into the `_PLAY TEMPLATE — DO NOT EDIT` page on the SharePoint site.

---

## How to use this document

This document has two parts:

**Part A — Build the template page (one-time, you do this during SharePoint Phase 3)**
Follow Part A click-by-click to build the master template page on SharePoint. After this is done, the template lives on the site and Council members duplicate it.

**Part B — Duplicate and fill (every Play, Council members do this)**
After the template exists, every new Play starts by duplicating that page and replacing placeholder content with the Play's actual content.

---

# PART A — Build the master template page

## Step-by-step on SharePoint

### A.1 — Create the page

1. On the Miller AI Plays SharePoint site, click **+ New** (top of the page) → **Page**
2. When prompted to choose a template, select **Blank**
3. Page title: `_PLAY TEMPLATE — DO NOT EDIT`
4. Click **Create page**

The underscore prefix makes the page sort to the top of any list view and signals "system page, don't touch."

### A.2 — Set page properties

Before adding content, configure the page properties so duplicates inherit the right settings.

1. Click the **Settings (gear)** at the top right → **Page details**
2. Set page metadata:
   - **Page description:** `Template for all Miller AI Plays pages. Council members duplicate this page when authoring a new Play. Do not edit this master.`
   - **Thumbnail:** Leave blank (each Play will set its own)
3. Click **Save**

### A.3 — Lock down permissions on this page

The biggest risk is a Council member accidentally editing the template instead of a duplicate. Lock it.

1. **Settings → Page permissions**
2. Click **Stop inheriting permissions**
3. Remove the **Miller AI Plays Council** group from this page only (they keep edit rights elsewhere on the site)
4. Confirm only **Miller AI Plays Owners** (you) has Edit access on this specific page
5. Council members can still **view** the page and duplicate it via the page menu — they just can't edit the master

### A.4 — Build the page content

Now you add the 12 sections as SharePoint web parts. Follow the table below in order. For each row, click the **+** between sections to add the specified web part type, then paste the content from the right column.

| Order | Web part type | What to paste/configure |
|---|---|---|
| 1 | **Title area** (already exists at top) | See SECTION 1 content below |
| 2 | **Text** | See SECTION 2 content below |
| 3 | **Stream (Video)** | See SECTION 3 instructions below |
| 4 | **Text** | See SECTION 4 content below |
| 5 | **Text** | See SECTION 5 content below |
| 6 | **Text** (with Code formatting) | See SECTION 6 content below |
| 7 | **Call to action** OR **Text** with highlighted style | See SECTION 7 content below |
| 8 | **Call to action** OR **Text** with highlighted style | See SECTION 8 content below |
| 9 | **Text** | See SECTION 9 content below |
| 10 | **Quick links** | See SECTION 10 instructions below |
| 11 | **Text** | See SECTION 11 content below |
| 12 | **Text** (small style) | See SECTION 12 content below |

### A.5 — Enable comments

At the bottom of the page edit view, toggle **Comments** to **On**. This applies to duplicates as well.

### A.6 — Save as draft

**Do NOT publish.** Save the template as a draft. Drafts don't appear in search or the homepage Plays grid, which is exactly what you want for a template.

---

# PART B — Page content (paste-ready, section by section)

Everything below this line is the literal content for the template page. Where you see `[REPLACE: description]`, that's the placeholder Council authors will fill in.

Web part type for each section is noted in **[ ]** brackets at the start of each section.

---

## SECTION 1 — Header

**[Title area — already at top of every SharePoint page]**

**Page title:** `[REPLACE: Play Title — short, action-oriented, no jargon]`

**Subtitle / Description field:** `[REPLACE: One-line hook, 12 words or less, with a clear point of view]`

---

**Author guidance (delete this note before publishing):**
- Title example: "Turn Wrong Qbank Questions Into a Study Plan" — not "Error Analysis Tool"
- Hook example: "Don't just review your wrongs. Diagnose them." — six words, action-oriented, has a stance

---

## SECTION 2 — At-a-glance metadata

**[Text web part]**

Copy the table below verbatim into a Text web part. Use SharePoint's table tool (top toolbar in the Text web part editor) for clean rendering.

```
| Field            | Value                                                                            |
|------------------|----------------------------------------------------------------------------------|
| Audience         | [REPLACE: Step 1 / Step 2 CK / Shelf / OSCE / Clerkship — pick all that apply]   |
| Year             | [REPLACE: MS1 / MS2 / MS3 / MS4 — pick all that apply]                           |
| Estimated time   | [REPLACE: e.g., "5 minutes per Qbank block"]                                     |
| Difficulty       | [REPLACE: Beginner / Intermediate / Advanced]                                    |
| Tool required    | [REPLACE: Claude (free) / Claude (Pro) / Copilot / NotebookLM / etc.]            |
| Author           | [REPLACE: Your full name + cohort, e.g., "Jane Doe, MS3"]                        |
| Published        | [REPLACE: YYYY-MM-DD]                                                            |
| Last reviewed    | [REPLACE: YYYY-MM-DD — must be within 90 days at all times]                      |
```

---

## SECTION 3 — The Demo

**[Stream (Video) web part]**

Configure the Stream web part:

1. Click **+ → Stream (Video)**
2. Click **Select video** → navigate to the **Play Videos** library on this site
3. Select the video file matching this Play's slug (e.g., `error-engine-demo.mp4`)
4. **Display settings:**
   - Show video title: **Off**
   - Show video description: **Off**
   - Autoplay: **Off** (critical — autoplay on mobile data is hostile)
   - Start time: 0:00
5. Below the video, add a Text web part with this exact content:

```
Captions enabled. Watch on mobile in the Teams app or in the SharePoint browser view.
```

---

## SECTION 4 — What it does

**[Text web part — heading + paragraph]**

```
## What it does

[REPLACE: Two to three sentences. Plain language. Explain the outcome, not the mechanism. Name the trigger situation and the success signal inline.]

Use it when [REPLACE: trigger situation]. You'll know it's working when [REPLACE: success signal in plain language].
```

**Author guidance (delete before publishing):**
- Lead with the outcome the student gets, not how the AI works
- Name the specific moment in a med student's week when this Play applies
- The success signal here previews Section 8 — that repetition is intentional

---

## SECTION 5 — How to set it up

**[Text web part — heading + numbered list]**

```
## How to set it up

You only do this once. After that, [REPLACE: state ongoing use time, e.g., "it takes 5 minutes per session"].

1. [REPLACE: Step 1 — exact action, exact button name]
2. [REPLACE: Step 2]
3. [REPLACE: Step 3]
4. [REPLACE: Step 4]
5. Copy the prompt from the section below
6. Paste it into [REPLACE: exact location, e.g., "Custom instructions"]
7. Click **Save**
8. You're ready to use the Play
```

**Author guidance (delete before publishing):**
- One action per step
- Use exact button names from the current tool UI (Claude/Copilot/NotebookLM)
- Assume zero prior knowledge of the AI tool

---

## SECTION 6 — The Prompt

**[Text web part — heading + code block]**

```
## The Prompt

Copy the prompt below and paste it into [REPLACE: tool location].
```

Then add a **second Text web part** below the heading and set its content type to **code block** (in the Text web part toolbar, click the `</>` icon for code formatting). Paste the actual prompt inside the code block.

```
[REPLACE: FULL PROMPT TEXT — multi-line is fine — preserve formatting exactly]

[The prompt must be:
- Self-contained (no references to context the AI doesn't have)
- Tested on at least 3 real student inputs before submission
- Include: role definition, task, rules, output format]
```

**Author guidance (delete before publishing):**
- The code block format is critical — it preserves whitespace and lets students copy cleanly
- Do NOT add commentary inside the code block
- Test the prompt by copying it directly from your draft page and pasting into the tool. If your test doesn't work, neither will the student's.

---

## SECTION 7 — When to use this

**[Text web part with highlighted/callout style]**

In the Text web part toolbar, apply the **Highlight** or **Callout** style for visual distinction.

```
## When to use this

[REPLACE: One short paragraph (2-4 sentences) naming the specific situation that triggers using this Play. Be concrete — name the time of day, the type of session, the kind of frustration that points here.]
```

**Author guidance (delete before publishing):**
- Be specific. "Use when studying" is useless. "Use after every UWorld block when you can't tell if your wrongs are knowledge gaps or reasoning errors" is useful.
- This section should answer the student's question: "When in my actual week does this Play belong?"

---

## SECTION 8 — Success signal

**[Text web part with highlighted/callout style]**

```
## Success signal

[REPLACE: One to two sentences describing what "this is working" looks like. The signal must be:
- Observable by the student themselves (not requiring you to evaluate them)
- Measurable within 2 weeks of consistent use
- Specific to this Play, not generic learning advice]
```

**Author guidance (delete before publishing):**
- Vague: "You'll feel more confident."
- Specific: "Within two weeks of consistent use, you can name your top three error patterns without thinking."
- If you can't write a specific success signal, the Play's value isn't clear enough yet. Rewrite Section 4 first.

---

## SECTION 9 — Common pitfalls

**[Text web part — heading + bulleted list]**

```
## Common pitfalls

[REPLACE with 3-4 real failure modes. Each pitfall has the same structure: bold the failure mode, then explain in 1-2 sentences why it happens and what to do instead.]

- **[REPLACE: Pitfall 1 in bold]** — [REPLACE: 1-2 sentence explanation]
- **[REPLACE: Pitfall 2 in bold]** — [REPLACE: 1-2 sentence explanation]
- **[REPLACE: Pitfall 3 in bold]** — [REPLACE: 1-2 sentence explanation]
- **[REPLACE: Pitfall 4 in bold — optional]** — [REPLACE: 1-2 sentence explanation]
```

**Author guidance (delete before publishing):**
- These should be REAL failure modes you hit while developing the Play, not theoretical ones
- Honesty here builds trust. If a Play has limitations, name them.
- Include at least one "this is not a substitute for X" boundary if applicable

---

## SECTION 10 — Related Plays

**[Quick Links web part]**

Configure the Quick Links web part:

1. Click **+ → Quick links**
2. **Layout:** Compact or List view (Compact is cleaner on mobile)
3. **Heading:** `Related Plays`
4. Add 2-4 links to other Play pages on this site
5. For each link:
   - Title: The Play's exact title
   - URL: Internal SharePoint page URL (use the link picker, don't paste raw URLs — internal links auto-update if pages move)
   - Description: One-line summary of how it connects to this Play

**Author guidance (delete before publishing):**
- Always link to at least 2 other Plays. Cross-linking strengthens the library.
- The description matters — say HOW the Plays connect, not just that they exist.
- Example: "Lecture Compressor — turn the concepts you missed into Anki cards in 5 minutes"

---

## SECTION 11 — Feedback

**[Text web part — heading + paragraph]**

```
## Feedback

Used this Play? Tell us what worked and what didn't in the comments below. The Council reviews feedback monthly.

For structured feedback, you can also use the [Miller AI Plays Feedback form](LINK).
```

**Author guidance (delete before publishing):**
- Keep this section short — the actual feedback collection is native SharePoint comments below the page
- The feedback form link goes to the Microsoft Form set up during SharePoint Phase 4

**Below this section, the native SharePoint comments section appears automatically** because you enabled comments in step A.5.

---

## SECTION 12 — Footer

**[Text web part — small/caption style]**

In the Text web part toolbar, apply **small text** or **caption** style.

```
Authored by [REPLACE: Author Name, Cohort]. Reviewed [REPLACE: Month Year] by the Miller AI Plays Council.
Last updated [REPLACE: YYYY-MM-DD]. Version [REPLACE: 1.0].

Part of Miller AI Plays, an Academic Enrichment Services initiative.
Methodology developed by AES. Operated by the Miller AI Plays Council.

*Not an official University of Miami publication.*
```

**Author guidance (delete before publishing):**
- The footer attribution is required on every Play, no exceptions
- The "Not an official University of Miami publication" line is the legal disclaimer — do not remove
- Version number starts at 1.0 for new Plays; increment to 1.1, 1.2 for minor edits, 2.0 for major rewrites

---

# PART C — Workflow for duplicating the template (for Council authors)

Once Part A is complete and the template is live on the site, here's the workflow Council members follow to author a new Play.

## C.1 — Duplicate the template

1. Navigate to the `_PLAY TEMPLATE — DO NOT EDIT` page
2. Click the **... (more options)** menu at the top of the page
3. Click **Copy of...**
4. SharePoint creates a duplicate page titled `Copy of _PLAY TEMPLATE — DO NOT EDIT`
5. **Immediately rename** the duplicate to your Play's actual title (using the **Settings → Page details** menu)

## C.2 — Fill in all `[REPLACE: ...]` placeholders

Work top to bottom. Don't skip sections — every section must be filled before submission.

Before submitting, do a `Ctrl+F` (or `Cmd+F`) search on the page for the word `REPLACE`. If any matches remain, the page is not ready.

## C.3 — Upload the demo video

1. Go to the **Play Videos** library on the site
2. Upload your finished demo video, named `[your-play-slug]-demo.mp4`
3. Return to your Play page
4. In the Stream web part, click **Select video** and choose your uploaded video

## C.4 — Delete all author guidance notes

Search the page for the phrase "Author guidance (delete before publishing)" and delete every one of those callout blocks. They were instructions for you, not content for students.

## C.5 — Save as draft and submit for review

1. Click **Save as draft** (top right) — do NOT publish yet
2. Copy the draft page URL
3. Open the **Play Submissions** Microsoft List (in the Council Work channel in Teams)
4. Click **+ New** and fill in the submission fields, including your draft page URL
5. Set status to **Submitted**
6. The Chair will assign a reviewer at the next monthly meeting (or earlier if urgent)

## C.6 — Iterate based on Council feedback

- If status changes to **Returned**, read reviewer notes and revise the page
- Once status changes to **Approved**, the reviewer (or you) clicks **Publish** on the page
- Update the Play Submissions list with the publish date

---

# PART D — Quality checklist before publishing any Play

Use this as your final check before clicking Publish.

## Content
- [ ] All 12 sections present and filled
- [ ] No `[REPLACE: ...]` placeholders remaining
- [ ] No "Author guidance" callout blocks remaining
- [ ] Demo video under 90 seconds with captions
- [ ] Prompt is self-contained and tested
- [ ] Success signal is specific and student-observable
- [ ] At least 2 related Plays linked

## Editorial standards (from Charter Section 10)
- [ ] Solves a real, named workflow problem
- [ ] One tool, one job (no cross-tool workflows in v1)
- [ ] Tested on real student work by the author
- [ ] No academic integrity violations
- [ ] No clinical decision-making content
- [ ] Last-reviewed date is today

## Page mechanics
- [ ] Page title matches the H1 in Section 1
- [ ] Page URL slug is kebab-case
- [ ] Comments are enabled
- [ ] Page is set to **Published** (not Draft)
- [ ] Page appears in the homepage Plays grid within 24 hours
- [ ] Internal links to related Plays all work
- [ ] Tested on iPhone Safari, Android Chrome, desktop browser

## Council approval
- [ ] Submission List status is **Approved**
- [ ] Reviewer notes addressed
- [ ] Publish date recorded

---

*End of SharePoint Page Template Build v1.0.*

