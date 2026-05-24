# Miller AI Plays — Product Requirements Document (v1.0)

**Owner:** Lamar Hardwick, Associate Director, Academic Enrichment Services (AES)
**Status:** Draft — pending owner approval
**Framework:** BMAD (Business · Methods · Architecture · Development)
**Target ship date:** 2 weeks from kickoff
**Last updated:** May 21, 2026

---

## 0. Executive Summary

Miller AI Plays is a mobile-first content vault delivering bite-sized, AI-powered study workflows ("Plays") to medical students at the University of Miami Miller School of Medicine. Each Play pairs a 60–90 second screen-recorded demo with a copy-paste prompt block and a clonable artifact (Claude Project, NotebookLM notebook, or Copilot workflow), letting students adopt a tool in under five minutes.

The product solves a known constraint: medical students do not read long guides. Plays meet them where they are — mobile, distracted, time-poor — with a single screen-tap pattern: *watch → copy → clone → use*.

v1 launches with **five Plays**, distributed via email and Microsoft Teams/SharePoint student channels, branded as an Academic Enrichment Services tool. No user accounts, no database, no community features. v1 exists to answer one question: *do students actually use this?*

---

## 1. BUSINESS

### 1.1 Problem statement

Medical students at Miller are aware of AI tools but lack scaffolding to use them effectively. They:

- Treat ChatGPT/Claude/Copilot as a search box, not a workflow engine
- Don't know how to write a system prompt or scope a Project
- Won't read a 20-page guide on prompt engineering
- Need on-ramps that fit between Qbank blocks, not parallel curricula

The cost is real: students are leaving compounding gains on the table during the highest-stakes years of their education. AES exists to close this gap.

### 1.2 Goals

**Primary**
- Deliver five high-quality, immediately usable AI Plays to all Miller medical students within 2 weeks
- Establish a repeatable content production pipeline so new Plays can be authored in <4 hours each
- Generate observable signal on which Plays students actually use

**Secondary**
- Position AES as the institutional leader in AI-integrated learning at Miller
- Create reusable IP (Plays, prompt library, ETP-derived frameworks) that can inform future research and conference presentations
- Build a content foundation that can later be productized via GrayMar Strategies for other institutions

### 1.3 Success metrics (90-day)

| Metric | Target | Measurement |
|---|---|---|
| Unique student visits | 60% of MS1–MS4 cohort | Plausible analytics |
| Median session duration | >90 seconds | Plausible analytics |
| Play completion rate (video watched + artifact opened) | >40% per Play | Click event on "Clone Artifact" button |
| Return visit rate | >30% within 14 days | Plausible analytics |
| Qualitative feedback responses | 25+ within first 30 days | Embedded Tally/Formspree form |

**Hard signal:** If <20% of students open the site within 30 days of launch, distribution is broken — not the content. Diagnose channel before iterating on Plays.

### 1.4 Target users

**Primary:** Miller MS1–MS4 students preparing for coursework, USMLE Step 1/2 CK, shelf exams, OSCEs, and clerkships.

**Secondary:** Miller faculty curious about AI integration (read-only audience; not the design target).

**Out of scope for v1:** External users, residents, students at other institutions, prospective consulting clients.

### 1.5 Non-goals (explicit)

To prevent scope creep, v1 will NOT include:

- User authentication or accounts
- A database of any kind
- Student-submitted Plays or community features
- Embedded AI chat (students click out to claude.ai, copilot.microsoft.com, etc.)
- Paid tiers, gating, or monetization
- LMS integration (Canvas, etc.) beyond a hyperlink
- Original video production beyond screen recordings
- Mobile native app
- Multi-language support
- Faculty-facing dashboard

Each of these is a deliberate v2+ decision.

### 1.6 Branding & positioning

- **Product name:** Miller AI Plays
- **Tagline (working):** "AI workflows for medical students. 90 seconds. No fluff."
- **Brand owner:** University of Miami Miller School of Medicine — Academic Enrichment Services
- **Visual identity:** Aligned with Miller/UM institutional brand (orange/green palette, university typography where licensable). Footer credits AES and Lamar Hardwick as creator.
- **Tone:** Direct, practical, student-respecting. No corporate-speak, no over-explaining. Athletic metaphors avoided (broad audience).

---

## 2. METHODS

### 2.1 Content schema — the Play

Every Play is an MDX file with structured frontmatter. This is the foundational unit of the system and what makes automation possible.

```yaml
---
slug: error-engine                       # URL-safe identifier
title: "Turn Wrong Qbank Questions Into a Study Plan"
hook: "Don't just review wrongs. Diagnose them."
oneLiner: "Paste a missed question, get back the error category, the root concept, and your next step."

audience: ["step1", "step2", "shelf"]    # Exam phases this Play serves
year: ["MS2", "MS3", "MS4"]              # Med school year relevance
estimatedTime: "5 min per Qbank block"
difficulty: "beginner"                   # beginner | intermediate | advanced

tools:                                   # Required AI tools
  - name: "Claude"
    plan: "free"                         # free | pro
    url: "https://claude.ai"

video:
  url: "/videos/error-engine.mp4"
  poster: "/videos/error-engine-poster.jpg"
  durationSeconds: 78
  captions: "/videos/error-engine.vtt"

artifact:
  type: "claude-project"                 # claude-project | notebooklm | copilot-agent | prompt
  name: "Error Engine"
  systemPrompt: |
    [Full system prompt here as multi-line string]
  cloneInstructions: "In claude.ai: Projects → Create Project → paste this into Custom Instructions"
  cloneUrl: null                         # Future: direct deeplink if Anthropic adds project share

whenToUse: |
  After every UWorld or NBME practice block. Especially when you keep missing
  questions in the same topic and can't tell whether it's a knowledge gap
  or a reasoning error.

successSignal: |
  Within two weeks, you can name your top three error patterns without
  thinking. That self-awareness is the signal it's working.

tags: ["qbank", "remediation", "metacognition", "step-1", "step-2"]
relatedPlays: ["lecture-compressor", "shelf-review-notebook"]

author: "Lamar Hardwick"
publishedAt: "2026-06-01"
updatedAt: "2026-06-01"
version: "1.0"
---

# Play body in MDX (optional context, FAQ, troubleshooting)
```

**Design principles for the schema:**
- Every field is either renderable on the play page or filterable/searchable
- No free-form fields that can't be reasoned about programmatically
- Versioning baked in from day one — AI tool UIs change, Plays will need updates

### 2.2 Content production pipeline

**Authoring (manual — your IP)**
1. Write the system prompt (60 min, iterative)
2. Write the demo script (15 min)
3. Write the play.mdx frontmatter (10 min)

**Production (semi-automated)**
4. Record screen demo with Loom or Screen Studio (10 min)
5. Run script through ElevenLabs voiceover pipeline (automated; ~5 min)
6. Composite video with intro/outro/captions via ffmpeg script (automated; ~5 min)

**Publishing (fully automated)**
7. `git push` triggers Vercel deploy
8. OG image generated dynamically per Play
9. Sitemap + RSS auto-updated
10. New Play surfaces on homepage grid sorted by `publishedAt`

**Target: <4 hours from idea to live Play** once the pipeline is built.

### 2.3 Initial Play catalog (v1.0 — five Plays)

| # | Slug | Title | Target use | Tool |
|---|---|---|---|---|
| 1 | `error-engine` | Turn Wrong Qbank Questions Into a Study Plan | Post-Qbank error analysis | Claude Project |
| 2 | `lecture-compressor` | Lecture Notes → Anki Cards in 5 Minutes | Post-lecture review | Claude Project |
| 3 | `concept-coach` | Make a Concept Stick with a Socratic Tutor | Stuck on a concept | Claude Project |
| 4 | `shelf-review-notebook` | Build a Shelf-Ready Notebook in NotebookLM | Pre-shelf prep | NotebookLM |
| 5 | `osce-encounter-sim` | Run an OSCE Encounter Simulation | Pre-OSCE prep | Claude Project |

### 2.4 Distribution strategy

- **Launch email** to all Miller medical students from AES with a 60-second explainer video and direct link
- **Pinned post** in Miller Teams student channels (one per cohort)
- **SharePoint card** on the AES landing page
- **QR code** posted in AES office and student lounges (low cost, high visibility)
- **Word of mouth** seeded via the pilot student from week 0

No paid acquisition. No social media outside of Miller-internal channels in v1.

### 2.5 Feedback loop

Single embedded feedback widget per Play (Tally or Formspree, no backend):

- Was this useful? (👍 / 👎)
- What broke or confused you? (free text)
- What Play would you want next? (free text)

Reviewed weekly. Plays with <50% useful rating get rewritten or retired.

---

## 3. ARCHITECTURE

### 3.1 Tech stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR for SEO, edge-ready, RSC for performance |
| Language | TypeScript | Type safety on the MDX schema is essential |
| Styling | Tailwind CSS + shadcn/ui | Speed of build, mobile-first defaults |
| Content | MDX via Velite or Contentlayer | Schema validation at build time |
| Hosting | Vercel | Zero-config, free tier sufficient for v1, OG image API |
| Analytics | Plausible (preferred) or Vercel Analytics | Privacy-friendly, FERPA-compatible, no cookies |
| Feedback | Tally embedded forms | No backend needed |
| Video hosting | Vercel Blob or Cloudflare Stream | Cheap, fast |
| Voiceover pipeline | ElevenLabs API (existing) | Already in your stack |
| Video compositing | ffmpeg via Node script | Free, scriptable |

**Cost projection v1:** $0–20/month (Vercel hobby tier likely sufficient; Plausible ~$9/mo if used).

### 3.2 Repository structure

```
miller-ai-plays/
├── apps/
│   └── web/                          # Next.js application
│       ├── app/
│       │   ├── page.tsx              # Homepage — Play grid
│       │   ├── plays/
│       │   │   └── [slug]/
│       │   │       └── page.tsx      # Play detail page
│       │   ├── tags/
│       │   │   └── [tag]/
│       │   │       └── page.tsx      # Tag landing pages
│       │   ├── about/page.tsx        # About AES + creator
│       │   ├── api/og/route.tsx      # Dynamic OG images
│       │   └── layout.tsx
│       ├── components/
│       │   ├── PlayCard.tsx
│       │   ├── PlayDetail.tsx
│       │   ├── VideoPlayer.tsx
│       │   ├── PromptBlock.tsx
│       │   ├── CopyButton.tsx
│       │   ├── ArtifactCloneButton.tsx
│       │   ├── SearchBar.tsx
│       │   ├── TagFilter.tsx
│       │   └── FeedbackWidget.tsx
│       └── lib/
│           ├── plays.ts              # Play loading, filtering, search
│           └── schema.ts             # Zod schema for frontmatter
├── content/
│   └── plays/
│       ├── error-engine/
│       │   ├── play.mdx
│       │   ├── thumbnail.png
│       │   └── assets/
│       ├── lecture-compressor/
│       └── ...
├── scripts/
│   ├── new-play.ts                   # CLI: scaffold a new Play
│   ├── voiceover.ts                  # ElevenLabs pipeline
│   ├── composite-video.ts            # ffmpeg pipeline
│   └── validate-plays.ts             # Pre-commit schema validation
├── public/
│   └── videos/
├── .github/workflows/
│   └── validate.yml                  # CI: run validate-plays on PR
├── velite.config.ts
├── tailwind.config.ts
├── next.config.mjs
├── package.json
└── README.md
```

### 3.3 Page architecture

**Homepage (`/`)**
- Hero: tagline + one-line value prop
- Search bar (client-side fuzzy search across Play title, hook, tags)
- Filter chips by audience (Step 1, Step 2, Shelf, OSCE, MS1–4)
- Grid of PlayCards (thumbnail, title, hook, estimated time, tag pills)
- Footer: AES branding, creator credit, feedback link

**Play detail (`/plays/[slug]`)**
- Video player (lazy-loaded, captions enabled)
- "What it does" + "When to use it" sections
- Prompt block with one-tap copy button
- "Clone this artifact" CTA (link out to Claude/NotebookLM with instructions)
- Success signal callout
- Related Plays
- Feedback widget at bottom

**Tag pages (`/tags/[tag]`)**
- All Plays matching a tag, same grid as homepage

**About (`/about`)**
- AES context, creator bio, contact, intended audience

### 3.4 Data flow

```
Authoring                Build                       Runtime
─────────                ─────                       ───────
play.mdx       ────►   Velite validates    ────►   Static page
+ video                + generates types           served from edge
+ assets               + builds .json index        + client-side search
                                                   + analytics events
```

No runtime database. All content is statically generated at build time. Search is client-side over the pre-built JSON index.

### 3.5 Analytics events to track

| Event | Trigger |
|---|---|
| `play_viewed` | Play detail page loaded |
| `video_played` | Video play button clicked |
| `prompt_copied` | Copy button on prompt block clicked |
| `artifact_cloned` | "Clone artifact" CTA clicked |
| `feedback_submitted` | Feedback form submitted |
| `search_performed` | Search query entered |
| `tag_filtered` | Tag filter applied |

These seven events answer every question that matters for v1.

### 3.6 Domain & DNS

- **Action required:** Register a standalone domain. Suggested options:
  - `milleraiplays.com`
  - `aimedplays.com`
  - `playsformed.com`
- **Political consideration:** Standalone (vs. miami.edu subdomain) means no UM IT approval bottleneck — but also means no implied UM endorsement. Footer disclaimer recommended: *"Created by Academic Enrichment Services, University of Miami Miller School of Medicine. Not an official University of Miami publication."*
- **Action:** Verify with UM communications/legal that this framing is acceptable.

### 3.7 Compliance & privacy

- **FERPA:** No PII collected. No accounts, no logged email, no IP-level analytics. Plausible's privacy-first model is compliant by design.
- **AI tool privacy:** Plays direct students to their own Claude/Copilot accounts. Miller AI Plays does not proxy or store any student-AI interactions.
- **Content rights:** No Qbank content reproduced. References to UWorld, NBME, etc. are nominative use only.
- **Accessibility:** WCAG 2.1 AA target. Captions on all videos. Keyboard navigation. Screen reader tested.

---

## 4. DEVELOPMENT

### 4.1 Phase plan

#### Phase 0 — Setup (Day 0, ~2 hours)

- [ ] Register domain
- [ ] Create GitHub repo: `miller-ai-plays`
- [ ] Create Vercel project, link repo, configure deploy
- [ ] Create Plausible account, get script tag
- [ ] Create Tally form for feedback
- [ ] Greenlight branding direction with UM communications

#### Phase 1 — Scaffold (Days 1–2)

Handed to Claude Code as a single brief. Expected output:
- [ ] Next.js 14 app with App Router, TS, Tailwind, shadcn/ui installed
- [ ] Velite configured with Zod schema matching section 2.1
- [ ] Homepage with hardcoded sample Play grid rendering
- [ ] Play detail page with all section components stubbed
- [ ] Deployed to Vercel; preview URL live
- [ ] Mobile Lighthouse score ≥90

**Acceptance test:** Visit preview URL on mobile. See grid. Tap card. See detail page with placeholder content.

#### Phase 2 — Content pipeline (Days 2–3)

- [ ] `pnpm new-play <slug>` CLI scaffolds folder + play.mdx skeleton
- [ ] `pnpm voiceover <slug>` runs script through ElevenLabs
- [ ] `pnpm composite <slug>` runs ffmpeg pipeline
- [ ] `pnpm validate` runs schema validation
- [ ] Pre-commit hook runs validation

**Acceptance test:** From blank to a new Play folder with valid MDX in one command.

#### Phase 3 — First Play live end-to-end (Days 3–5)

- [ ] `error-engine` written, recorded, voiced, composited, deployed
- [ ] Copy button works on prompt block
- [ ] Feedback widget functional
- [ ] OG image generates correctly
- [ ] Plausible events firing
- [ ] Tested on iPhone Safari, Android Chrome, desktop

**Acceptance test:** Send link to one student. They watch, copy prompt, clone Project, return feedback. All events fire in Plausible.

#### Phase 4 — Plays 2–5 (Days 6–10)

- [ ] `lecture-compressor` shipped
- [ ] `concept-coach` shipped
- [ ] `shelf-review-notebook` shipped
- [ ] `osce-encounter-sim` shipped

#### Phase 5 — Launch (Days 11–14)

- [ ] Final accessibility audit
- [ ] Launch email drafted and approved
- [ ] Teams/SharePoint posts drafted
- [ ] QR codes designed and printed
- [ ] Soft launch to 10–15 students
- [ ] 48-hour bug fix window
- [ ] Full launch to all Miller cohorts

### 4.2 Build automation strategy (Claude Code / Cursor)

What gets handed to Claude Code as discrete briefs:

1. **Scaffold brief:** "Build the Next.js app per Phase 1 acceptance criteria, using the schema in section 2.1." Expected runtime: one session.
2. **Component brief:** "Build the eight components listed in section 3.2 with TypeScript props matching the schema." Expected runtime: one session.
3. **CLI brief:** "Build the `new-play` CLI per section 4.1 Phase 2 spec." Expected runtime: 30 min.
4. **Pipeline brief:** "Build the voiceover + ffmpeg composite scripts. ElevenLabs API key in .env." Expected runtime: one session.

What stays manual (Lamar):
- All prompt engineering and system prompt authoring
- All screen recordings
- All copywriting (hooks, success signals, etc.)
- Domain selection, branding approval, distribution

### 4.3 Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| UM communications blocks AES-branded standalone site | Medium | High | Pre-clear branding with comms before domain registration |
| Claude/NotebookLM UI changes break "click here" instructions | High | Medium | Version Plays; quarterly content audit; abstract instructions |
| Student adoption <20% in 30 days | Medium | High | Diagnose distribution before content; double down on Teams/email |
| Video production becomes the bottleneck | High | Medium | Build voiceover/ffmpeg pipeline in Phase 2; cap videos at 90s |
| Scope creep (auth, community, etc.) | High | High | This PRD's section 1.5 is the line. Hold it. |
| Faculty complain about "AI shortcut" framing | Low | Medium | Position as workflow enablement, not answer generation |

### 4.4 Open decisions

1. **Domain choice** — owner to pick from suggestions or propose alternative
2. **UM communications pre-clearance** — owner action; gates domain registration
3. **Velite vs Contentlayer** — defer to Claude Code's recommendation at scaffold time
4. **ElevenLabs voice ID** — owner to confirm which voice persona to use
5. **Feedback tool** — Tally vs Formspree; defer to Phase 2
6. **Plausible vs Vercel Analytics** — recommend Plausible for FERPA story; final call at Phase 1

### 4.5 Definition of done (v1.0)

- Five Plays live and functional on all major mobile browsers
- All seven analytics events firing correctly
- Feedback widget collecting responses
- Lighthouse mobile score ≥90 on all pages
- Launch email sent to full Miller medical student body
- Pinned in at least three Teams student channels
- No P0 or P1 bugs reported in 48-hour soft launch window

---

## 5. POST-v1 ROADMAP (NOT IN SCOPE — REFERENCE ONLY)

To prevent v1 scope creep while honoring future intent:

- **v1.1:** Adding Plays 6–15 across more use cases (research, clerkship documentation, residency apps)
- **v1.2:** Faculty-facing companion vault (separate URL, same architecture)
- **v2.0:** Auth + personalization (recommend Plays based on year/exam)
- **v2.1:** Student-submitted Plays with editorial review
- **v3.0:** Productized as GrayMar offering to other medical schools

These are documented to acknowledge direction, not to plan against.

---

## Appendix A — Glossary

- **Play:** A self-contained AI workflow unit (video + prompt + artifact)
- **Artifact:** A reusable AI scaffold — Claude Project, NotebookLM notebook, or Copilot agent
- **ETP:** Error Tracking Protocol — Lamar's framework for categorizing learning errors
- **BMAD:** Business · Methods · Architecture · Development PRD framework
- **AES:** Academic Enrichment Services at Miller School of Medicine

---

*End of PRD v1.0.*
