# Play Demo Video — Production Guide

**For:** All Play authors (Lamar + Council members)
**Output:** A 60–90 second screen-recorded demo for each Play

The demo video is what hooks students in the first 5 seconds. If the video is bad, the Play dies — students won't read the page just to discover the prompt. This guide makes good videos repeatable.

---

## The 5-beat structure

Every Play demo follows the same 5 beats. Total runtime: 60–90 seconds. Hard cap at 90.

### Beat 1 — The hook (0:00–0:10) | 10 seconds

Open with the problem, not the tool. The viewer is a med student who's tired. You have 10 seconds to make them care.

**Template:**
> "If you've ever [specific painful scenario], this Play is for you. In 5 minutes, you can [specific outcome]."

**Example (Error Engine):**
> "If you keep missing UWorld questions in the same topic and you can't tell whether it's a knowledge gap or a reasoning error — this Play diagnoses it in 5 minutes."

### Beat 2 — What it does (0:10–0:25) | 15 seconds

Show the AI tool's interface. Name the tool. State what the Play does in one sentence.

**Template:**
> "This is a Claude Project called [name]. You paste in [input], and you get back [output]."

### Beat 3 — Live demo (0:25–1:05) | 40 seconds

The longest section. Actually run the Play on real-looking input. Don't fake the output — let the AI generate live (record multiple takes if needed for a clean run).

What to show:
- The paste-in action
- The output rendering
- One callout of what's good about the output ("notice it didn't just summarize — it categorized")

### Beat 4 — When to use it (1:05–1:20) | 15 seconds

Pull back from the screen. State the specific moment to use this Play in a med student's week.

**Template:**
> "Use this every time you [specific trigger event]. It takes [X minutes] and saves you [specific benefit]."

### Beat 5 — Call to action (1:20–1:30) | 10 seconds

Tell them what to do next.

**Template:**
> "Copy the prompt below this video, paste it into a Claude Project, and try it tonight. If it works for you, drop a comment so the Council knows."

---

## Production checklist

### Before recording
- [ ] Write the script. All 5 beats. Word it out, don't wing it.
- [ ] Practice the live demo once with real input to verify the prompt works as expected
- [ ] Close all browser tabs, notifications, Slack, email
- [ ] Open ONLY: the AI tool you're demoing + a notepad with your sample input ready to paste
- [ ] Set browser zoom to 110–125% so text is readable on mobile
- [ ] Hide bookmarks bar
- [ ] Use a clean test account for the AI tool (don't show your personal chat history)

### Recording tools
- **Recommended:** Loom (free tier, easy editing), Screen Studio (Mac, beautiful output), or OBS Studio (free, more control)
- **Resolution:** 1080p minimum
- **Frame rate:** 30fps sufficient
- **Audio:** Use a headset or USB mic. Built-in laptop mics produce unusable audio. No exceptions.

### During recording
- [ ] Speak conversationally, not script-read. Read your script out loud beforehand 2–3 times until you can paraphrase it naturally.
- [ ] No "um," "uh," or filler. Cut and retake if needed.
- [ ] Keep cursor movements deliberate and slow. Med students are watching on phones — fast cursor movement is unwatchable on a 6-inch screen.
- [ ] Pause briefly between beats. Lets editing breathe.

### After recording
- [ ] Trim to under 90 seconds. If you're at 1:45, cut beat 2 or 4 — not beat 3.
- [ ] Generate captions (Loom does this automatically; otherwise use Otter.ai or YouTube's auto-caption upload-and-extract trick)
- [ ] Export at 1080p as MP4
- [ ] Filename: `[play-slug]-demo.mp4` (e.g., `error-engine-demo.mp4`)
- [ ] Upload to the SharePoint **Play Videos** library
- [ ] Embed via Stream web part on the Play page

---

## Optional: ElevenLabs voiceover workflow

For authors who prefer not to record their own voice, or who want polished narration:

1. Record the screen-only (no audio) in Loom or Screen Studio
2. Write the voiceover script — same 5 beats
3. Run the script through your ElevenLabs API workflow with a chosen voice (consistent across all Plays)
4. Composite the screen recording + voiceover in iMovie, DaVinci Resolve, or via ffmpeg

**Voice consistency note:** Pick one ElevenLabs voice for Miller AI Plays and use it across every Play. Voice = brand. Switching voices mid-library confuses students.

---

## Quality bar

A demo is ready to publish when:

- [ ] It's under 90 seconds
- [ ] Audio is clear, no background noise, no filler words
- [ ] Captions are present and accurate
- [ ] The live demo actually shows the Play working on real input
- [ ] A med student watching it on their phone in bed would understand the value in the first 10 seconds
- [ ] The cursor doesn't dart around like a caffeinated squirrel
- [ ] The output shown in the demo matches what users will actually see when they run the Play themselves

If any item above fails, re-record. The video is the hook for the entire library. Don't ship a bad one to save 30 minutes.

---

## Example script — Error Engine (78 seconds)

Use this as a model for your own scripts.

> **[0:00–0:10 | Hook]**
> If you've finished a UWorld block and just stared at your wrongs without knowing what to do next — this Play is for you. In five minutes, you'll know exactly what kind of mistake you made and what to study next.
>
> **[0:10–0:25 | What it does]**
> This is a Claude Project called Error Engine. You paste in a missed question, your answer, and the correct answer. The Project categorizes your error, names the underlying concept you missed, and prescribes one specific next step.
>
> **[0:25–1:05 | Live demo]**
> Here's a question I missed on cardiology. I'll paste in the stem, my answer was beta-blocker, the correct answer was amiodarone. Watch what comes back. It tells me the category: knowledge gap on antiarrhythmic mechanisms. It states the principle I missed: class III drugs prolong action potential through potassium channel blockade. And it gives me one prescribed action: drill the mechanism-action-toxicity grid for class I through IV, then run 10 targeted UWorld questions.
>
> **[1:05–1:20 | When to use it]**
> Use this after every Qbank block. Paste 5 to 10 of your wrongs. Look for the patterns across them. It takes five minutes and replaces an hour of re-reading explanations you already read once.
>
> **[1:20–1:30 | CTA]**
> Copy the prompt below this video, paste it into a Claude Project named Error Engine, and try it on your next block. Drop a comment if it works — and tell the Council what's missing.

---

*End of production guide v1.0.*
