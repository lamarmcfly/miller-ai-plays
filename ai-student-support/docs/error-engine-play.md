# Play: Turn Wrong Qbank Questions Into a Study Plan

**Reference example — Council members use this as the model for their own Plays.**

This is what a finished Play looks like once it lives on the SharePoint site. The Council should be able to read this end-to-end and understand the standard. When in doubt, match this structure and tone.

---

## SECTION 1 — Header

# Turn Wrong Qbank Questions Into a Study Plan
*Don't just review your wrongs. Diagnose them.*

---

## SECTION 2 — At-a-glance

| Field | Value |
|---|---|
| **Audience** | Step 1, Step 2 CK, Shelf |
| **Year** | MS2, MS3, MS4 |
| **Estimated time** | 5 minutes per Qbank block |
| **Difficulty** | Beginner |
| **Tool required** | Claude (free tier works) |
| **Author** | Lamar Martin, Academic Enrichment Services |
| **Published** | [Launch date] |
| **Last reviewed** | [Launch date] |

---

## SECTION 3 — The Demo

**[Embedded Stream video — 78 seconds]**

Captions enabled. Watch on mobile in the Teams app or in the SharePoint browser view.

---

## SECTION 4 — What it does

The Error Engine helps you turn missed Qbank questions into a clear study plan. Instead of re-reading explanations and hoping the lesson sticks, you paste your wrong answers into a Claude Project that categorizes each error, names the underlying concept you missed, and prescribes one targeted next step.

Use it after every UWorld or NBME practice block. You'll know it's working when you can name your top three error patterns without thinking — that self-awareness is the signal.

---

## SECTION 5 — How to set it up

You only do this once. After that, it takes 5 minutes per Qbank block.

1. Open **claude.ai** and sign in (free tier is fine)
2. In the left sidebar, click **Projects** → **Create Project**
3. Name the Project exactly: `Error Engine`
4. Click **Edit Project details** → find the **Custom instructions** field
5. Copy the entire prompt from Section 6 below
6. Paste it into Custom instructions
7. Click **Save**
8. You're ready to use the Play

---

## SECTION 6 — The Prompt

**[Copy Prompt button]**

```
You are an Error Analysis Coach trained in the Error Tracking Protocol (ETP). Your job is to help a medical student turn missed Qbank questions into targeted learning, not regret.

For each error the student submits, do exactly three things:

1. CATEGORIZE THE ERROR. Identify whether the miss was a:
   - Knowledge gap (didn't know the fact/concept)
   - Reasoning error (had the knowledge, applied it wrong)
   - Test-taking error (misread stem, anchored, ran out of time, second-guessed)
   - Mixed (name the dominant)
   Then name the specific subtype in one phrase — e.g., "knowledge gap — mechanism of class III antiarrhythmics" or "reasoning error — anchored on chest pain before reading the pulmonary exam."

2. SURFACE THE ROOT CONCEPT. State the underlying principle in 1-2 sentences. Not the answer to this question — the principle that, if owned, protects against this whole family of misses.

3. PRESCRIBE ONE NEXT STEP. Exactly one concrete action. Not "review cardiology" — "work through the mechanism-action-toxicity grid for class I-IV antiarrhythmics, 15 min, then 10 targeted UWorld questions tagged antiarrhythmics."

Rules:
- Be direct. The student wants a clear diagnosis, not reassurance.
- Don't re-explain the question. The explanation is already in their hands. Your job is the meta-analysis.
- If they paste multiple errors at once, look for the pattern across them and name it at the end.
- If a question's wrongness is ambiguous, ask one clarifying question before categorizing.

Format: three labeled sections, clean, no preamble.
```

---

## SECTION 7 — When to use this

Use this Play after every UWorld or NBME practice block — especially when you keep missing questions in the same topic and can't tell whether it's a knowledge gap or a reasoning error.

Per block, paste 5–10 of your wrongs into the Project. For each error, include:
- The question stem (or a summary of it)
- Your answer
- The correct answer
- A brief note on your reasoning

Ask for the breakdown. Read it. Act on the one prescribed next step before moving to the next block.

---

## SECTION 8 — Success signal

Within two weeks of consistent use, you can name your top three error patterns without thinking. You'll start catching yourself making them in real time during practice — that's when the meta-awareness is paying off.

If you're two weeks in and the categories all feel the same, your prompt is too generic. Add more of your reasoning to each submission so the Project has more to work with.

---

## SECTION 9 — Common pitfalls

- **Don't paste the full explanation back to the AI.** It will just summarize what you already read. Paste your reasoning, your answer, and the correct answer. Let it diagnose, not re-teach.
- **If everything comes back as "knowledge gap," you're under-feeding it.** Show your work in the prompt. Why did you pick what you picked? That's the input it needs to spot reasoning errors.
- **This Play won't fix systemic study problems.** If you're missing 60%+ of a Qbank, the issue is upstream of error analysis. Talk to AES about a broader study plan.
- **Don't skip the "one next step" prescription.** Reading the breakdown without acting is the most common failure mode. The Play is the analysis; your follow-through is the workout.

---

## SECTION 10 — Related Plays

- Lecture Compressor — turn the concepts you missed into Anki cards in 5 minutes
- Concept Coach — when a concept won't stick after error analysis, use Socratic drills
- Shelf Review Notebook — pull your error patterns into a shelf-prep NotebookLM

---

## SECTION 11 — Feedback

[Native SharePoint comments enabled below this section]

Used the Error Engine? Tell us what worked and what didn't. The Council reviews comments monthly.

---

## SECTION 12 — Footer

Authored by Lamar Martin, Academic Enrichment Services. Reviewed [Month Year] by the Miller AI Plays Council.
Last updated [Date]. Version 1.0.

Part of Miller AI Plays, an Academic Enrichment Services initiative.
Methodology developed by AES. Operated by the Miller AI Plays Council.

*Not an official University of Miami publication.*

---

## Author notes (NOT for the published page — for the Council)

This Play exists to demonstrate the full standard. A few things worth noting that future authors can learn from:

1. **The hook in Section 1 does work.** Six words, action-oriented, has a clear point of view. Don't write "A tool for analyzing Qbank errors" — write something a student would actually say.

2. **Section 4 names the success signal inline.** Doesn't wait for Section 8. Repetition is fine; clarity is the goal.

3. **The prompt in Section 6 is self-contained.** No references to context the AI doesn't have. Includes role, task, rules, output format. This is the standard.

4. **Section 9 is honest about limitations.** "This won't fix systemic study problems" — that line builds trust. Don't oversell.

5. **Related Plays in Section 10 cross-link to the rest of the founding 5.** Always link your Play to at least 2 others. It strengthens the library and keeps students moving.

When your Play matches this level of clarity and self-containment, it's ready for submission.

— Lamar

---

*End of reference Play.*
