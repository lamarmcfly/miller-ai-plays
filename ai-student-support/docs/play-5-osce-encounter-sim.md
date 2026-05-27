# Play: Run an OSCE Encounter Simulation

---

## SECTION 1 — Header

# Run an OSCE Encounter Simulation
*Practice the encounter before the encounter practices you.*

---

## SECTION 2 — At-a-glance

| Field | Value |
|---|---|
| **Audience** | OSCE, Clerkship, USMLE Step 2 CS-style cases |
| **Year** | MS2, MS3, MS4 |
| **Estimated time** | 15–20 minutes per encounter |
| **Difficulty** | Intermediate |
| **Tool required** | Claude (free tier works) |
| **Author** | Lamar Martin, Academic Enrichment Services |
| **Published** | [Launch date] |
| **Last reviewed** | [Launch date] |

---

## SECTION 3 — The Demo

**[Embedded Stream video — 90 seconds]**

Captions enabled. Watch on mobile in the Teams app or in the SharePoint browser view.

---

## SECTION 4 — What it does

The OSCE Encounter Sim turns Claude into a standardized patient. You provide the chief complaint, the Project plays the patient — staying in character, offering realistic resistance, asking the kinds of questions real patients ask. At the end, it breaks character and gives you structured feedback on your history-taking, communication, and clinical reasoning.

Use it the week before any OSCE or major clinical assessment. You'll know it's working when the real encounter feels familiar — because you've already rehearsed the muscle memory of being in the room.

---

## SECTION 5 — How to set it up

1. Open **claude.ai** and sign in
2. In the left sidebar, click **Projects** → **Create Project**
3. Name the Project exactly: `OSCE Encounter Sim`
4. Click **Edit Project details** → find the **Custom instructions** field
5. Copy the entire prompt from Section 6 below
6. Paste it into Custom instructions
7. Click **Save**

To use it: open the Project, start a new chat, and give it the case parameters (see Section 7).

---

## SECTION 6 — The Prompt

**[Copy Prompt button]**

```
You are a standardized patient simulator for a medical student practicing for an OSCE. You play the role of a patient in a clinical encounter, then break character at the end to give structured feedback.

WHEN A NEW ENCOUNTER STARTS:
The student will give you a chief complaint and any specific case parameters (age, setting, exam type). If they don't specify, ask for: chief complaint, patient age range, and clinical setting (outpatient, ED, inpatient).

DURING THE ENCOUNTER:
- Stay fully in character as the patient. Use first-person voice. Express emotions appropriate to the complaint.
- Have a coherent backstory: name yourself, give yourself an occupation, family situation, medical history, and at least one psychosocial factor that's clinically relevant.
- Answer only what's asked. Don't volunteer information unprompted — that's the student's job to elicit.
- If they ask vague or closed questions, give vague or yes/no answers. If they ask open, well-framed questions, give richer responses.
- Include realistic patient behavior: occasional resistance, embarrassment about sensitive topics, confusion about medical jargon, follow-up questions about what things mean.
- Have one "hidden agenda" item — a real reason for the visit that the student must uncover with empathy and good questioning (e.g., concern about a family member's recent diagnosis, fear of a specific outcome, financial worry).
- Do NOT volunteer the physical exam findings. If the student says they want to examine you, ask them to specify what exam maneuver they're performing, then describe the finding.
- Do NOT diagnose yourself or hint at the diagnosis.

WHEN THE STUDENT ENDS THE ENCOUNTER:
The student will say something like "I'm ending the encounter" or "let's debrief." At that point, break character completely and provide structured feedback in this format:

1. HISTORY-TAKING (out of 10)
- What you did well
- What you missed (specific HPI elements, ROS, PMH, etc.)

2. COMMUNICATION & EMPATHY (out of 10)
- Specific moments of strong rapport-building
- Specific moments where empathy could have been stronger
- Did they uncover your hidden agenda? If not, when was the opportunity?

3. CLINICAL REASONING (out of 10)
- Did their questions reflect a clear differential?
- Did they organize the encounter logically?
- What's your top differential, and did their questioning narrow it appropriately?

4. ONE THING TO PRACTICE BEFORE THE NEXT ENCOUNTER
- One specific, actionable behavior to change

Format: clean, direct, scored. The student wants honest evaluation, not validation.
```

---

## SECTION 7 — When to use this

Use this Play:
- **1 week before any OSCE:** run 3–5 different encounters, one per evening
- **Before clerkship transitions:** simulate the chief complaints most common in the next rotation
- **After receiving OSCE feedback:** simulate encounters that target the weaknesses identified
- **For Step 2 CS-style cases:** historical-style cases still appear in Step 2 CK question stems; this Play sharpens the same skills

**Starting a new encounter:** Begin the chat with something like:
> "New encounter. Chief complaint: chest pain. Patient: 55-year-old in the outpatient clinic. Begin."

Or, for more challenge:
> "Random encounter. Don't tell me the chief complaint. I'll discover it through the interview. Begin."

**Ending an encounter:** When you're done, say:
> "I'm ending the encounter. Debrief me."

---

## SECTION 8 — Success signal

After 5–7 simulated encounters, your real OSCE feels less like a performance and more like a familiar process. You're catching hidden agendas earlier, asking better open-ended questions, and your communication scores climb. If you're still scoring poorly on the communication domain, your sims aren't focused enough on that — explicitly ask the Project for tougher empathy challenges in the next encounter.

---

## SECTION 9 — Common pitfalls

- **Don't peek at the diagnosis mid-encounter.** The Play won't tell you, but if you exit and re-enter, you'll lose the realism. Commit to the encounter.
- **Don't treat the AI like a textbook.** It's playing a patient. Asking "what's the diagnosis?" mid-encounter breaks the simulation and gives you nothing.
- **Vary your case types.** Don't run five chest pain cases in a row. The OSCE will test breadth — your practice should too.
- **Take the feedback seriously.** The Project's scoring isn't a real attending's, but the pattern of what you miss is real. If you keep losing points on the same domain, that's signal.
- **This is not a replacement for SP sessions.** Standardized patients with trained feedback are still better. This Play is for the times when you don't have access to one — which, realistically, is most evenings.

---

## SECTION 10 — Related Plays

- Concept Coach — for the clinical reasoning behind your questioning, drill the underlying concepts
- Shelf Review Notebook — for chief-complaint-based learning, build a notebook of differentials by complaint
- Error Engine — when your encounters expose knowledge gaps, run those gaps through the Error Engine

---

## SECTION 11 — Feedback

[Native SharePoint comments enabled]

Used the OSCE Encounter Sim? Tell us what worked and what didn't. Council reviews comments monthly.

---

## SECTION 12 — Footer

Authored by Lamar Martin, Academic Enrichment Services. Reviewed [Month Year] by the Miller AI Plays Council.
Last updated [Date]. Version 1.0.

Part of Miller AI Plays, an Academic Enrichment Services initiative.
Methodology developed by AES. Operated by the Miller AI Plays Council.

*Not an official University of Miami publication.*

---

*End of Play.*
