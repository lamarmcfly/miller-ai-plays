# Aggregate usage reporting

Purpose: understand reach and which resources visitors act on. No student profiles, participation records, user IDs, session replay, or analytics storage in the browser are added.

## Dashboard and activation

Open https://vercel.com/graymars-projects/miller-ai-plays/analytics and select the production domain and date range. Enable Web Analytics if it is not enabled. The integration is already installed; custom events require a supported Vercel plan (currently Pro or Enterprise). Check the plan and usage allowance before upgrading; this change does not purchase or change a plan.

Merge and deploy this change. Vercel must expose `NEXT_PUBLIC_VERCEL_ENV=production` at build time (automatic system environment variables). Preview and local builds intentionally send no usage data. If system variables are disabled, enable them or set this variable for the Production environment only, then redeploy.

Live event delivery and dashboard activation must be confirmed after deployment. Existing historical page views may be available if collection was enabled. Custom events cannot reconstruct prior activity.

## Event definitions

| Event | Trigger | Properties |
| --- | --- | --- |
| Page view | Existing Vercel page-view integration | Public path, with query and fragment removed |
| `prompt_copied` | Clipboard copy succeeds, including fallback | `page` |
| `builder_prompt_copied` | Question Builder clipboard copy succeeds | `page`, `exam` |
| `start_completed` | Visitor submits valid Start Here answers | `page`, `goal` |
| `ai_tool_opened` | Normal, keyboard, or middle click on an allowlisted AI-tool link | `page`, `tool` |
| `print_requested` | Visitor selects Print or save as PDF | `page` |

Opening a shared onboarding result does not count as completing onboarding. Print requests are not confirmed prints or downloads. AI-tool clicks are not confirmed AI sessions. Repeated actions count repeatedly; they are not distinct people. Prompt copies do not establish learning gains or actual use outside the site.

## Weekly reporting template

Use the same seven-day window and production-domain filter each week:

| Metric | This week | Previous week | Interpretation |
| --- | --- | --- | --- |
| Estimated visitors | | | Reach; not verified students |
| Page views | | | Traffic volume |
| Top five Play pages | | | Content interest |
| Successful prompt-copy events by page | | | Intent to use resources |
| Builder prompt copies by exam | | | Exam-specific demand |
| AI-tool clicks by tool | | | Handoffs to external tools |
| Start Here completions | | | Submitted onboarding flows |
| Print requests | | | Interest in portable reference material |

This is a manual dashboard report, not a scheduled email or a new admin dashboard. Do not sum visitor estimates across days and label the result unique students. Do not label ratios of event counts as person-level conversion rates. No cross-day student retention or individual participation reporting is provided.

## Privacy boundaries

- Properties are constructed from fixed categories and public route allowlists. Unknown paths become `/other`.
- Event URLs have query strings, fragments, and URL credentials removed before sending.
- No prompts, source notes, weak spots, search terms, custom exam names, onboarding difficulties, names, emails, or persistent IDs are added to event properties.
- Outbound link URLs (which can contain prompt text) are never sent as custom-event data; only the fixed tool label is recorded.
- Existing local builder settings remain local. Vercel still processes ordinary web request metadata for its cookieless analytics; this is aggregate reporting, not a claim that no provider processes technical metadata.
- Query parameters, including UTM campaign parameters, are deliberately omitted. Campaign attribution beyond the provider's standard referrer reporting is not implemented.
- Keep `apps/web/src/lib/analytics-policy.ts` in sync when adding published pages or categories. The privacy test checks all current Plays and exam landing pages.

## Verification

Run `pnpm check:analytics`, the web TypeScript check, lint, and build. The privacy test covers sensitive URL redaction, unknown paths, invalid categories, all current Play/exam paths, and spoofed AI-tool hostnames.

After production deployment, use synthetic text only:
1. Open the builder with `?topic=ANALYTICS_TEST_PRIVATE` and copy a prompt. Inspect the analytics network request: the marker must not appear; expect only the page and fixed exam category in custom data.
2. Force a clipboard failure: no success event should be emitted.
3. Complete Start Here, then reopen a shared result. Only the form submission should emit `start_completed`.
4. Click an AI link by mouse and keyboard; test middle-click. Each action should record its tool without the target URL or prompt.
5. Request printing and cancel. It counts only as a request.
6. Confirm events appear in the dashboard. Verify a preview deployment emits no analytics requests.

Blocking analytics must not block the site's core actions. Revert this commit to roll back the interaction instrumentation and restore the previous analytics integration.
