# Two sites, one codebase

This repository runs two sites:

| | **Miller AI Plays** | **Med AI Plays** |
|---|---|---|
| Who it's for | Miller students only | Medical students at any school |
| Access | Access code on every page | Open to everyone |
| Search engines | Kept out (`noindex`, robots block, empty sitemap) | Listed |
| Stage names | Phase 1, Phase 2, Phase 3 | Pre-clerkship, Clerkships, Advanced clinical |
| Community | Miller posts stay on the Miller site, plus national posts | National posts |
| Address | `miller-ai-plays.vercel.app` (the current one) | A new domain |

Plays, prompts, the Question Builder, Start here, Prompt Templates, and AI Tools are shared. A fix or a new Play ships to both sites on their next deploys. Everything that differs lives in one file, [`apps/web/src/lib/site.ts`](apps/web/src/lib/site.ts). `NEXT_PUBLIC_SITE_ID` picks the site: `miller` or `med`. Left unset, it is `med`.

## Set up the two Vercel projects

Do these in order, so the current address never goes dark.

### 1. Create the Med AI Plays project

1. In Vercel, add a new project from this repository. Set **Root Directory** to `ai-student-support`. The build settings come from `vercel.json`.
2. Environment variables (Production and Preview):
   - `NEXT_PUBLIC_SITE_ID` = `med`
   - `NEXT_PUBLIC_SITE_URL` = the new domain, for example `https://your-domain.org`
   - The national community settings from [COMMUNITY.md](COMMUNITY.md), if you use them
3. Add the domain under **Settings > Domains**, deploy, and check the site.

### 2. Switch the current project to Miller AI Plays

The project already serving `miller-ai-plays.vercel.app` becomes the Miller site, so links students already have keep working.

1. Choose an access code (see below) and decide how Miller students will get it.
2. Environment variables (Production and Preview):
   - `NEXT_PUBLIC_SITE_ID` = `miller`
   - `SITE_ACCESS_CODE` = the code. **Server only: never add a `NEXT_PUBLIC_` prefix.**
   - `NEXT_PUBLIC_SITE_URL` = `https://miller-ai-plays.vercel.app`
   - Miller's own community settings (step 3 below). Remove any national ones.
3. Redeploy. From then on, every page asks for the code once per device.

Vercel Analytics is per project, so Miller and national usage report separately. The Miller project's history before the switch is the combined site.

## The access code

- Use a passphrase of at least 12 characters, such as four unrelated words. Shorter codes count as "not set up". Capitals and spacing don't matter when students type it.
- With no valid code configured, nobody gets in: the site fails closed.
- Changing the code signs everyone out. Change it each semester, or whenever it has spread beyond Miller.
- Ten tries per network every 15 minutes, then a wait.

A shared code keeps the site within the group. It does not verify individuals: anyone given the code can get in. When you want each student checked, the next step is school sign-in (for example the university's Microsoft accounts), which needs approval from the school's IT office. The gate lives in two files, [`src/proxy.ts`](apps/web/src/proxy.ts) and [`src/lib/site-access.ts`](apps/web/src/lib/site-access.ts), so that change would stay contained.

Before you launch under the Miller name, check with the school's communications office about using it.

### 3. Miller community: posts stay in the group

The Miller site never sends posts or feedback to public GitHub issues. Until one of these is set up, its share form says "opens soon" and its feedback links are hidden:

- **Recommended:** a separate Supabase project just for Miller. Run `supabase/migrations/001_community_intake.sql` in it, then set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_COMMUNITY_BACKEND=inline` on the Miller project only. Miller submissions never sit with national data.
- **Or** a Miller-only Tally form (`NEXT_PUBLIC_COMMUNITY_FORM_URL`, and `NEXT_PUBLIC_FEEDBACK_FORM_URL` for feedback).

To publish a Miller post, review it in Miller's Supabase table and set `status` to `approved`. It appears on the Miller Community page right away, under "From the Miller group". **Never add Miller posts to `content/community/`**: this repository is public, and that folder feeds both sites. National posts from that folder also appear on Miller, under "From students nationwide".

## Adding content

- **A Play for both sites:** add it as usual. This is the default.
- **Miller only:** add `sites: ["miller"]` to the Play's frontmatter. **National only:** `sites: ["med"]`.
- **The repository is public.** A Miller-only Play is hidden from Med AI Plays, but anyone can read it on GitHub. Keep internal details (staff contacts, non-public documents) out of the repository. Put them in the Miller project's environment variables or its Supabase project instead.
- **Shared Plays and prompts use neutral stage names** (pre-clerkship, clerkship, advanced clinical), because they also show on Med AI Plays. The site's own pages add "Phase 1/2/3" on Miller automatically. `pnpm check:sites` fails if shared content says "Phase 1/2/3".
- If you tag a Play as Miller-only, also remove it from the stage guides and other shared pages that link to it by name.

## Changing what differs

Edit [`apps/web/src/lib/site.ts`](apps/web/src/lib/site.ts): names, taglines, audience line, stage names, the About page's audience paragraph, and community headings. Both sites keep the `/phase/1`, `/phase/2`, `/phase/3` addresses.

## Running locally

```bash
pnpm dev            # Med AI Plays
pnpm dev:miller     # Miller AI Plays; put SITE_ACCESS_CODE in apps/web/.env.local
pnpm check:sites    # The separation checks (also run in CI)
```
