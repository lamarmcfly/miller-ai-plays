# Play: Lecture Notes → Anki Cards in 5 Minutes

---

## SECTION 1 — Header

# Lecture Notes → Anki Cards in 5 Minutes
*Stop transcribing. Start spacing.*

---

## SECTION 2 — At-a-glance

| Field | Value |
|---|---|
| **Audience** | Step 1, Step 2 CK, Shelf, Coursework |
| **Year** | MS1, MS2, MS3 |
| **Estimated time** | 5 minutes per lecture |
| **Difficulty** | Beginner |
| **Tool required** | Claude (free tier works) + Anki |
| **Author** | Lamar Martin, Academic Enrichment Services |
| **Published** | [Launch date] |
| **Last reviewed** | [Launch date] |

---

## SECTION 3 — The Demo

**[Embedded Stream video — 82 seconds]**

Captions enabled. Watch on mobile in the Teams app or in the SharePoint browser view.

---

## SECTION 4 — What it does

The Lecture Compressor turns a full lecture — slides, notes, or transcript — into two things in one pass: a high-yield digest you can actually skim, and a stack of board-style Anki cards ready to paste straight into your deck.

Use it after every lecture, while the material is still warm. You'll know it's working when you stop dreading review and start trusting your deck.

---

## SECTION 5 — How to set it up

One-time setup. After that, paste-and-go.

1. Open **claude.ai** and sign in
2. In the left sidebar, click **Projects** → **Create Project**
3. Name the Project exactly: `Lecture Compressor`
4. Click **Edit Project details** → find the **Custom instructions** field
5. Copy the entire prompt from Section 6 below
6. Paste it into Custom instructions
7. Click **Save**

To use it: open the Project, paste lecture content into a new chat, get back two outputs.

---

## SECTION 6 — The Prompt

**[Copy Prompt button]**

```
You are a high-yield study material generator for a medical student. The student will paste lecture content, notes, or a transcript. You produce two outputs in order:

OUTPUT 1 — HIGH-YIELD DIGEST
Bulleted summary capturing only what is testable. Maximum 12 bullets. Organize by:
- Mechanism / pathophysiology
- Clinical presentation
- Diagnosis (key findings, gold standards)
- Treatment (first-line, key exceptions)
- High-yield associations (boards-favorite buzzwords, classic triads)

Skip background, history, tangents, the professor's anecdotes. Multiple topics? Separate with headers.

OUTPUT 2 — ANKI CARDS
15-25 cards in clean front/back format, ready to paste straight into Anki:

Front: [question or cloze]
Back: [answer]

Card rules:
- One concept per card. Two things on the back? Split it.
- Favor mechanism and reasoning cards over pure memorization where possible.
- Use cloze deletion ({{c1::answer}}) for lists, drug classes, classifications.
- Mix card types: recall, recognition, application, compare/contrast.
- Board-style framing: "A patient presents with X..." for clinical cards.

No preamble, no commentary. Just the two outputs.
```

---

## SECTION 7 — When to use this

Use this Play **the same day as the lecture**, while the context is still fresh in your head. The Play is fast because it relies on you noticing if it missed something — and you can only notice that within ~24 hours of the original lecture.

What to paste in:
- Lecture slides exported as text (or pasted from PowerPoint/Keynote)
- Transcribed lecture audio (Otter, Whisper, or auto-captions copied from Zoom)
- Your own typed notes
- Any combination of the above

Then copy the Anki output, open Anki, and paste the cards into your deck using the **basic** or **cloze** card type as appropriate.

---

## SECTION 8 — Success signal

Within two weeks, your Anki deck has grown by 50–80 cards per week from lectures alone, AND you're consistently getting >85% retention on first review. If retention is low, your cards are too dense — feed the Play smaller chunks per session.

---

## SECTION 9 — Common pitfalls

- **Don't paste an entire 2-hour lecture transcript at once.** Break it into the 3–5 major topics and run them separately. You'll get better cards and the digest stays scannable.
- **Verify before you import.** AI-generated cards can hallucinate doses, mechanisms, or associations. Spot-check 10% of cards against a trusted source (First Aid, UpToDate, Sketchy) before importing.
- **Cloze deletions need formatting.** The `{{c1::answer}}` syntax matters in Anki. If the AI gives you malformed cloze syntax, fix it before pasting.
- **This is not a substitute for active recall.** Generating cards is the easy part. Reviewing them every day is what builds memory. The Play saves you time on creation — don't spend that saved time scrolling.

---

## SECTION 10 — Related Plays

- Error Engine — when Qbank questions expose gaps, feed those topics back into Lecture Compressor for fresh cards
- Concept Coach — when a card's answer doesn't make sense to you, drill the concept Socratically
- Shelf Review Notebook — for shelf-level synthesis, NotebookLM beats card review

---

## SECTION 11 — Feedback

[Native SharePoint comments enabled]

Used the Lecture Compressor? Tell us what worked and what didn't. Council reviews comments monthly.

---

## SECTION 12 — Footer

Authored by Lamar Martin, Academic Enrichment Services. Reviewed [Month Year] by the Miller AI Plays Council.
Last updated [Date]. Version 1.0.

Part of Miller AI Plays, an Academic Enrichment Services initiative.
Methodology developed by AES. Operated by the Miller AI Plays Council.

*Not an official University of Miami publication.*

---

*End of Play.*
