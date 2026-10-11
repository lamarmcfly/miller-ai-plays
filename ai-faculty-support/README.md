# Faculty AI Plays

**Copy-paste AI workflows for medical school faculty, with one content standard built into every prompt.**

A separate site from the student Med AI Plays site in `../ai-student-support`. The two share no pages and no links, and each deploys as its own Vercel project.

Faculty pick a Play, copy its prompt into the AI tool their school approves, answer its setup questions, and check the draft against the review list it ends with. There are no accounts, no database, no cookies and no analytics, so the site never sees what faculty type into their AI tool.

## What's in it

- **Start Here** (`/start`): two questions (what you're making, how much you've used AI) produce an ordered path of Plays. New users start with a guided first session. Results are shareable links (`/start?make=pearls&xp=new`).
- **Plays** (`/plays/<slug>`): eight workflows.

  | Play | Job |
  |---|---|
  | `first-ai-session` | Guided first 20 minutes, including catching a planted error |
  | `learning-objectives` | Measurable objectives from an outline or slides |
  | `pearl-drafter` | Teaching pearls, plus an EAT import CSV |
  | `pearl-check` | EAT's 20 reviewer questions run on a draft pearl |
  | `exam-item-writer` | Original single-best-answer vignettes, including EAT pearl practice questions |
  | `item-review` | Item-writing flaws and item statistics in existing questions |
  | `case-writer` | A staged small-group case with a facilitator guide |
  | `check-the-draft` | Every checkable claim in a draft, ranked by risk |

- **The Standard** (`/standard`): the nine rules every copied prompt ends with, and why each exists.

## The content standard

`apps/web/src/lib/standard.ts` holds the faculty content standard: original work only, no patient or student identifiers, never invent sources, mark uncertainty, teach the reasoning and the limits, teaching material and not patient care, fair cases, match the learners, and finish every draft with a BEFORE YOU USE THIS review list.

It is appended to every prompt when it's copied, including the fill-in-the-blank starter prompts. Plays never restate it, so changing a rule there changes it everywhere. `pnpm validate` fails if a Play restates it.

## EAT pearl format

The pearl Plays write in EAT's teaching-pearl format, so their output goes through EAT's own "Import from CSV" (which creates drafts only) and its reviewer attestation. EAT stays the place where pearls are approved.

`apps/web/src/lib/eat-format.ts` is a pinned copy of that format: the CSV header, misunderstanding kinds, source kinds, field limits and the 20 reviewer questions, from EAT's `lib/pearls/domain.ts` and `lib/pearls/review.ts`. Plays reference these values through `{{EAT_...}}` tokens instead of copying them; an unknown token fails the build.

When EAT's pearl format may have changed, run this against a checkout of `eat-tracker`:

```bash
EAT_REPO=../../eat-tracker pnpm check:eat
```

It lists every pinned value that no longer matches EAT. Update `eat-format.ts`, and the prompts follow.

## Quick start

```bash
pnpm install
pnpm dev            # Next.js dev server
pnpm validate       # Play frontmatter and editorial rules
pnpm check:start    # Every Start Here answer gives a valid path that includes a checking Play
pnpm check:eat      # Pearl Plays carry EAT's format (add EAT_REPO=... to compare with EAT)
pnpm lint
pnpm build
```

CI runs all of these on pull requests that touch this folder (`.github/workflows/faculty-site.yml` at the repository root).

## Deploying

Create a **new** Vercel project from this repository and set its root directory to `ai-faculty-support`. `vercel.json` sets the install, build and output commands. Set `NEXT_PUBLIC_SITE_URL` once it has a custom domain; until then the Vercel production URL is used.

## Adding a Play

1. Create `content/plays/<slug>/play.mdx` with the frontmatter used by the existing Plays. Write only the Play's own instructions in `prompt`; the standard is added automatically.
2. Put fill-in blanks (`[LIKE THIS]`) only in `starterPrompts`, never in the main prompt.
3. Add it to at least one path in `apps/web/src/lib/start-path.ts`. `pnpm check:start` fails for a Play no path reaches.
4. Run `pnpm validate`.

## Principles

- AI drafts; faculty review. Nothing reaches learners unchecked.
- No patient or student identifiers in AI tools, and no licensed exam, NBME or question-bank content.
- Use the AI tool your school approves for work, and follow its AI policy.

Created by **Lamar Martin**.
