# Miller AI Plays

**AI workflows for medical students. 90 seconds. No fluff.**

Miller AI Plays is a peer-curated library of short AI workflows ("Plays") for medical students at the University of Miami Miller School of Medicine. Each Play pairs a 60-90 second demo video with a copy-paste prompt and a clonable artifact, letting students adopt a tool in under five minutes.

## Founding Plays

| # | Play | What it does | Tool |
|---|---|---|---|
| 0 | **First AI Session** | Your first AI study session in 3 minutes | Any LLM |
| 1 | **Error Engine** | Turn wrong Qbank questions into a study plan | Any LLM |
| 2 | **Lecture Compressor** | Lecture notes to Anki cards in 5 minutes | Any LLM + Anki |
| 3 | **Concept Coach** | Socratic tutor that makes concepts stick | Any LLM |
| 4 | **Shelf Review Notebook** | Build a shelf-ready notebook | NotebookLM |
| 5 | **OSCE Encounter Sim** | Practice clinical encounters with a simulated patient | Any LLM |
| 6 | **Deficit Tracker** | Track weak spots across every practice test | Any LLM |
| 7 | **Clinical Note Writer** | Write a clinical note in half the time | Any LLM |
| 8 | **Rounds Prep** | 5-minute rounds prep before rounds | Any LLM |
| 9 | **Research Speed Read** | Screen papers in 2 minutes | Any LLM |

## Project Structure

```
miller-ai-plays/
├── apps/web/          # Next.js 14 site (App Router + Tailwind + shadcn/ui)
├── content/plays/     # MDX content for each Play (source of truth)
├── prompts/           # Standalone .txt prompt files for easy copy-paste
├── docs/              # Planning docs, PRD, council charter, setup guides
├── scripts/           # CLI tools (new-play, validate, extract-prompts)
└── .github/           # CI workflows and issue templates
```

## Quick Start

```bash
pnpm install
pnpm dev          # Start Next.js dev server
pnpm validate     # Validate all Play MDX against schema
pnpm new-play     # Scaffold a new Play
```

## Architecture

- **Content format:** MDX with Zod-validated frontmatter
- **Framework:** Next.js 14 (App Router, static generation)
- **Styling:** Tailwind CSS + shadcn/ui
- **Analytics:** Plausible (FERPA-compliant, no cookies)
- **Hosting:** Vercel
- **Distribution:** Web + Microsoft Teams/SharePoint (syndication)

## Created by

**Lamar Martin**, Academic Enrichment Services, University of Miami Miller School of Medicine.

*Not an official University of Miami publication.*
