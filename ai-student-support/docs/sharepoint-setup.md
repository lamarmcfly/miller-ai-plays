# Miller AI Plays — SharePoint & Teams Setup Checklist

**For:** Lamar Martin, AES
**Estimated time:** 4–6 hours total (can be split across 2–3 sessions)
**Prerequisites:** UM Microsoft 365 account with Team creation privileges. If you cannot create Teams independently, schedule 30 min with UM IT or your tenant admin BEFORE starting.

---

## Phase 1 — Create the Team (30 min)

### Step 1.1 — Create the Team
- [ ] Open Microsoft Teams
- [ ] Click **Teams** in the left rail → **Join or create a team** → **Create team** → **From scratch**
- [ ] Select **Private** (you control membership; non-members can be added later as visitors via SharePoint)
- [ ] Name: `Miller AI Plays`
- [ ] Description: `Peer-curated AI workflows for Miller medical students. Operated by the Miller AI Plays Council. An AES initiative.`

### Step 1.2 — Add founding members
- [ ] Add the three confirmed Council members as **Members** (not Owners — you stay as the sole Owner for v1)
- [ ] Do NOT add the broader student body yet. They'll get read access via SharePoint visitor permissions in Phase 4.

### Step 1.3 — Configure Team channels
- [ ] Keep the default **General** channel
- [ ] Create a new channel: `Council Work` → set to **Private** (Council members + you only)
- [ ] Create a new channel: `Play Submissions` → **Standard** (visible to all Team members)
- [ ] In **General**, post a welcome message linking to the Charter (you'll upload it in Phase 3)

---

## Phase 2 — Configure the SharePoint site (60 min)

Every Team has a connected SharePoint site. You'll customize this into the public-facing Plays library.

### Step 2.1 — Access the SharePoint site
- [ ] In Teams, click the `Miller AI Plays` Team name at the top → **Open in SharePoint**
- [ ] Bookmark this URL. You'll use it constantly.

### Step 2.2 — Site branding
- [ ] **Settings (gear icon) → Change the look → Theme**
  - Choose a theme matching Miller's palette (orange/green) if available, or use a clean neutral
- [ ] **Settings → Site information → Edit logo**
  - Upload an AES or Miller AI Plays logo if you have one
  - Placeholder: any clean square image works for v1

### Step 2.3 — Site navigation
- [ ] **Edit** the top navigation (pencil icon next to navigation bar)
- [ ] Set the following items in order:
  1. `Home`
  2. `Browse Plays` (will link to a Plays library page — built in Phase 3)
  3. `Submit a Play` (links to the Submissions Microsoft List)
  4. `About` (links to an About page — built in Phase 3)
  5. `Council` (links to a Council members page — built in Phase 3)

### Step 2.4 — Configure permissions

This is the most important step. Get it wrong and you'll have a content leak.

- [ ] **Settings → Site permissions → Advanced permissions settings**
- [ ] Three permission groups to configure:

| Group | Membership | Permission level |
|---|---|---|
| **Miller AI Plays Owners** | Lamar Martin (you) | Full Control |
| **Miller AI Plays Council** | 3 founding members | Edit |
| **Miller AI Plays Visitors** | (added in Phase 4) | Read + Comment |

- [ ] Visitors group permission level: confirm they can read pages AND post comments, but cannot edit pages or upload files. If your tenant doesn't have this exact level pre-built, create a custom permission level called `Read + Comment`.

### Step 2.5 — Create Microsoft Stream channel for videos
- [ ] In SharePoint, click **+ New → Document library** → name it `Play Videos`
- [ ] All Play demo videos upload here. SharePoint will surface them as Stream-playable videos automatically.
- [ ] Set library permissions: Council members can upload, Visitors can play only

---

## Phase 3 — Build the core pages (90 min)

### Step 3.1 — Homepage
- [ ] On the SharePoint site, click **Home** in the navigation → **+ New** is hidden; instead click **Edit** on the existing home page
- [ ] Recommended layout (web parts in order):
  1. **Hero web part** — large title `Miller AI Plays` + tagline `AI workflows for medical students. 90 seconds. No fluff.`
  2. **Text web part** — 2-sentence value prop and "How this works" mini-explainer
  3. **Highlighted content web part** — set to show pages from the Plays library, sorted by `Most recent`, displayed as a grid of cards
  4. **Quick links web part** — links to: `Submit a Play`, `About`, `Council`
  5. **Text web part** (footer) — `An Academic Enrichment Services initiative. Operated by the Miller AI Plays Council. Not an official University of Miami publication.`
- [ ] Click **Republish** when done

### Step 3.2 — About page
- [ ] **+ New → Page → Blank**
- [ ] Title: `About Miller AI Plays`
- [ ] Content sections:
  - Why this exists (3 sentences from the Charter's Section 2)
  - Who it's for (Miller MS1–MS4)
  - How Plays work (3-step explanation: watch → copy → use)
  - Who runs it (link to Council page)
  - Contact (AES email / your email)
- [ ] **Publish**

### Step 3.3 — Council page
- [ ] **+ New → Page → Blank**
- [ ] Title: `The Miller AI Plays Council`
- [ ] Content sections:
  - What the Council does (3 sentences)
  - Current members (placeholder for now — fill in after founding meeting)
    - Use a People web part to show each member's name, cohort, and headshot
  - How to apply (Spring application window)
  - Link to download the Charter
- [ ] **Publish**

### Step 3.4 — Charter document upload
- [ ] In Teams **General** channel → **Files** tab → Upload `council-charter.md` (or its Word equivalent if you converted it)
- [ ] Also upload to the SharePoint **Documents** library so it's discoverable from the site
- [ ] Pin it in the Teams channel

### Step 3.5 — Page template setup
This is the magic. Once done, every new Play is a one-click duplication.

- [ ] Create a new blank page titled `_PLAY TEMPLATE — DO NOT EDIT`
- [ ] Build out every section from the `play-page-template.md` document — all 12 sections with placeholder text
- [ ] Add `[REPLACE THIS]` markers in every field that needs author input
- [ ] **Save as draft** — do NOT publish (you don't want this template showing up in search)
- [ ] Council members duplicate this page each time they author a new Play (`...` menu on the page → `Copy of...`)

---

## Phase 4 — Submissions list & feedback (45 min)

### Step 4.1 — Create the Play Submissions Microsoft List
- [ ] On the SharePoint site, **+ New → List → Blank list**
- [ ] Name: `Play Submissions`
- [ ] Add the following columns:

| Column name | Type | Required | Notes |
|---|---|---|---|
| `Play Title` | Single line text | Yes | |
| `Author Name` | Person | Yes | |
| `Cohort` | Choice (MS1/MS2/MS3/MS4) | Yes | |
| `Slug` | Single line text | Yes | kebab-case |
| `Page URL` | Hyperlink | Yes | Draft page link |
| `Submission Date` | Date | Yes | Auto-default to today |
| `Status` | Choice | Yes | Submitted / In Review / Approved / Returned / Rejected |
| `Reviewer` | Person | No | Assigned at first Council touch |
| `Reviewer Notes` | Multi-line text | No | |
| `Publish Date` | Date | No | Filled at approval |
| `Last Reviewed` | Date | No | For quarterly audits |

- [ ] Set the list to be visible to Council members only (not Visitors)

### Step 4.2 — Connect the list to Teams
- [ ] In the **Council Work** channel in Teams, click **+ Add a tab** → Lists → select the `Play Submissions` list
- [ ] Council members now see the submission queue inside Teams

### Step 4.3 — Set up native commenting on Play pages
- [ ] **Settings → Site information → Manage your settings → Comment settings**
- [ ] Enable comments on **Site Pages**
- [ ] Confirm Visitors have permission to post comments (per Step 2.4)

### Step 4.4 — Optional: Microsoft Form for structured feedback
- [ ] In Microsoft Forms, create a form titled `Miller AI Plays Feedback`
- [ ] Three questions:
  1. Which Play did you use? (text)
  2. Was it useful? (1–5 scale)
  3. What would make this better? (long text)
- [ ] Embed the form on the About page footer using the **Microsoft Forms web part**
- [ ] Responses route to your email and a SharePoint list for Council review

---

## Phase 5 — Pre-launch testing (30 min)

Before any Play goes live, verify the plumbing.

- [ ] Test on iPhone Safari (use Teams app)
- [ ] Test on Android Chrome (use Teams app)
- [ ] Test on desktop browser (signed in as a UM student account, if possible)
- [ ] Confirm: page loads, video plays, comments work, no permission errors
- [ ] Confirm: a Visitor account cannot edit any page
- [ ] Confirm: a Council member CAN edit pages but cannot change site settings
- [ ] Confirm: the Page Template page does NOT appear in search results
- [ ] Confirm: the Submissions list is NOT visible to Visitors

---

## Phase 6 — Soft launch (Council-only, ~2 weeks)

- [ ] At the founding Council meeting, walk members through the site
- [ ] Each Council member duplicates the Page Template and authors one Play
- [ ] You author the founding 5 Plays (or upload them if already drafted elsewhere)
- [ ] All 5+3 Plays live and reviewed before the public launch
- [ ] Council uses the site themselves for 1 week to surface any rough edges

---

## Phase 7 — Public launch (after Phase 6 is clean)

- [ ] Add the broader Miller medical student body to the SharePoint Visitors group
  - Easiest method: add the existing Miller MS1–MS4 distribution lists as Visitors
- [ ] Send the launch email (see `launch-email.md`)
- [ ] Pin the launch announcement in Miller cohort Teams channels
- [ ] Post the SharePoint link on the AES landing page
- [ ] Print QR codes for AES office and student lounges

---

## Known gotchas

1. **Sensitivity labels.** UM may apply sensitivity labels by default to SharePoint sites. If pages get auto-labeled as "Internal" or higher, comment permissions for Visitors may be blocked. Check with IT if Visitor comments fail.

2. **External sharing.** This site is internal-only. Keep external sharing OFF at the site level to prevent accidental leakage of the Plays library.

3. **Video file sizes.** Stream/SharePoint handles videos up to ~15GB but performance degrades over 500MB. Compress videos with HandBrake or ffmpeg to keep them under 200MB per Play.

4. **Search indexing lag.** New pages take 6–24 hours to appear in SharePoint search. Don't panic on day 1.

5. **The Page Template trap.** If a Council member edits the Page Template page itself instead of duplicating it, future authors will inherit the changes. Lock down editing on the template page to Owners only.

---

## When to call in IT

You can do Phases 1–4 independently. Call UM IT or your tenant admin if:
- You don't have Team creation rights
- You hit a sensitivity label block
- You need a custom permission level for `Read + Comment`
- You want to set up provisioning for incoming MS1 cohorts automatically

---

*End of setup checklist v1.0.*
