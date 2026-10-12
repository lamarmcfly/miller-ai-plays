# Community intake without GitHub accounts

Students can share a workflow, and tell you whether a Play worked, without a GitHub account. The Community Board form and the feedback buttons use one of three modes. The site picks the mode from environment variables at build time (`apps/web/src/lib/community-mode.ts`).

| Mode | Set | Student experience | Data lives |
|---|---|---|---|
| `inline` | `NEXT_PUBLIC_COMMUNITY_BACKEND=inline` plus the Supabase variables | Submits on the site. Nothing leaves the page. | Your Supabase project |
| `form` | `NEXT_PUBLIC_COMMUNITY_FORM_URL` (and optionally `NEXT_PUBLIC_FEEDBACK_FORM_URL`) | Fills in the site's form, which opens your hosted form with the answers pre-filled | Tally or similar |
| `github` | nothing (default) | Opens a pre-filled public GitHub issue; needs a GitHub account | GitHub issues |

`inline` wins if it is set. Use `form` until the Supabase project is ready.

## Step 1: Tally (works today)

1. Create a Tally form with these **hidden fields**, named exactly: `cohort`, `category`, `examContext`, `title`, `tool`, `prompt`, `outcome`, `usefulness`. Tally fills hidden fields from URL parameters with the same names. Preview the form with `?title=test` to confirm before you publish.
2. Add a visible required checkbox: "This describes a real use case and contains no patient identifying information or licensed exam content."
3. In Vercel, set `NEXT_PUBLIC_COMMUNITY_FORM_URL` to the form's public link (Production), then redeploy.
4. Optional feedback form: add hidden fields `kind`, `target`, `title`, a "Did it work? (worked / partly / didn't)" question, and a short note. Set its link as `NEXT_PUBLIC_FEEDBACK_FORM_URL`. Without it, the feedback links still open GitHub issues.

The site's form sends answers in the URL, so a very long prompt can be cut off by the browser. That is one reason to move to `inline`.

## Step 2: Anonymous intake on the site (Supabase)

1. Create a **dedicated** Supabase project for this site. Do not reuse a project that serves another app.
2. In the SQL editor, run `supabase/migrations/001_community_intake.sql`. It creates `community_submissions` and `play_feedback` with row-level security on and no public access, plus a `play_feedback_summary` view.
3. In Vercel (Production and Preview as you choose), set:
   - `SUPABASE_URL`: the project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: the service key. **Server only. Never prefix it with `NEXT_PUBLIC_`.**
   - `NEXT_PUBLIC_COMMUNITY_BACKEND=inline`
4. Redeploy, then verify with synthetic text: submit a test workflow and a test feedback, and confirm the rows appear. Submitting a test containing an email address should be refused.

### What is stored

Cohort year, category, exam context, tool, title, prompt, outcome, usefulness rating, and the date. For feedback: the Play or post id, the result, and an optional 500-character note. No name, email, account, IP address, or device identifier is stored. The IP address is used only in memory for rate limiting.

### Protections

- Required "no patient information" confirmation, plus a text check that refuses emails, phone numbers, SSNs, MRNs, dates of birth, and full dates. The check is a safety net, not a guarantee. Every submission is still read by a person before anything is published.
- A hidden honeypot field, a minimum fill time, size limits, a same-origin check, and per-address limits (5 submissions and 30 feedback responses per hour).
- Row-level security with no public policies. Only the site's server can write.

The rate limit lives in server memory, so it is best-effort on serverless hosting. If you see abuse, add a Vercel Firewall rate-limit rule for `/api/*` or a bot challenge.

### Reviewing

In the Supabase table editor, open `community_submissions` and filter `status = 'pending'`. Check each one for patient identifiers and licensed exam content, set `status` to `approved` or `rejected`, and add a `review_note` if useful. To publish an approved one, add an `.mdx` file to `content/community/` as before.

To see how Plays are working, run `select * from play_feedback_summary order by responses desc;`.

## Before you collect from students

- Tell your school's privacy office or IRB what you collect, especially if you will report results beyond internal improvement.
- Pick a retention period and delete old rows (`delete from play_feedback where created_at < now() - interval '1 year';`).
- Aggregate page views and copy events still come from Vercel Analytics. See `ANALYTICS.md`.
