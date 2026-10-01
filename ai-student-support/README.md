# Miller AI Plays

**AI study workflows and custom practice questions for medical students. 90 seconds to learn. 5 minutes to use.**

Miller AI Plays is a free, independent library for medical students at any school. It has three parts:

- **Plays**: short, copy-paste AI workflows (error analysis, lecture-to-Anki, Socratic tutoring, OSCE practice, and more). Each pairs a demo video with a prompt.
- **Question Builder**: choose your exam, phase, subject, difficulty, and weak spots, and get a prompt that makes any AI tool write original, exam-realistic practice questions.
- **Prompt Library**: fill-in-the-blank templates for study plans, concept explanations, clinical reasoning, flashcards, and more.

It works with any AI tool (Claude, ChatGPT, Copilot, Gemini, NotebookLM) and has no accounts, no database, and no cookies.

## Practice questions

The Question Builder (`/question-builder`) assembles a prompt from your choices:

| You choose | What it changes |
|---|---|
| **Exam**: course exam, anatomy practical, USMLE Step 1 / 2 CK / 3, COMLEX Level 1 / 2-CE, shelf, OSCE, oral exam, flashcards, other | Question style and realism rules (e.g., Step 1 mechanism focus, Step 2 CK next-best-step, OSCE checklist) |
| **Phase** (1, 2, or 3) | Scope and reasoning level (one concept at a time, management, or ambiguity) |
| **Subject and topic** | Content, with topic ideas per subject; optional source text to restrict questions to your own notes |
| **Format and difficulty** | Single best answer, sequential cases, extended matching, short answer, recall, practical stations, case scripts, oral ladders, cloze cards |
| **Mode and feedback** | One at a time, full set with hidden answers, or answer key; explanation style; adaptive difficulty |
| **Advanced** | Weak spots, regional guidelines and units, patient-demographic variety, plain-language explanations |

All prompt logic lives in `apps/web/src/lib/question-spec.ts` (pure functions, no React). Run `pnpm check:questions` to verify every exam, format, and mode produces a valid prompt.

Deep links preset the builder, for example `/question-builder?preset=shelf-im` or `/question-builder?exam=osce&subject=psych&phase=2&topic=suicide%20risk`.

## Project structure

```
ai-student-support/
├── apps/web/            # Next.js site (App Router, Tailwind, shadcn/ui)
│   └── src/
│       ├── app/         # Pages: home, plays, phases, question-builder, prompts, toolkit, community, about
│       ├── components/  # UI, including QuestionBuilder, FillablePrompt, PromptLibrary
│       └── lib/         # question-spec.ts, prompt-library.ts, schemas, content loaders
├── content/plays/       # MDX for each Play (source of truth)
├── content/community/   # Approved community posts
├── prompts/             # Standalone .txt prompt files for easy copy-paste
└── scripts/             # validate-plays.ts, check-question-spec.ts
```

## Quick start

```bash
pnpm install
pnpm dev               # Next.js dev server
pnpm validate          # Validate all Play frontmatter against the schema
pnpm check:questions   # Check the Question Builder's prompt logic
pnpm build             # Production build
```

## Adding a Play

Create `content/plays/<slug>/play.mdx` with the frontmatter shown in any existing Play, add a matching `prompts/<slug>.txt`, and run `pnpm validate`. The Markdown body renders under the prompt (setup steps, common pitfalls).

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_COMMUNITY_FORM_URL` | Endpoint (for example a Tally or Google Form link) for the Community Board submission form. If unset, the form is replaced by a "not open yet" notice. |

## Principles

- Plays are for studying, never for decisions about real patients.
- No patient identifying information in AI tools, and no licensed exam or question-bank content.
- AI output can be wrong: every Play and the Question Builder tell students to verify.
- Independent project; not affiliated with any medical school, exam provider, or AI company.

Created by **Lamar Martin**.
