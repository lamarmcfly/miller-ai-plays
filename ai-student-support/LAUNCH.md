# Med AI Plays launch kit

Everything you need to get the site in front of medical students. The site spreads by classmate-to-classmate sharing, so make that easy: one link, one 30-second reason to click.

## The one-liner

> Med AI Plays: free AI study workflows and custom practice questions for medical students. Answer 3 questions, get your path. No account.

Link to share: `https://miller-ai-plays.vercel.app/start` (swap in your custom domain once you have one; set `NEXT_PUBLIC_SITE_URL` in Vercel so previews and the sitemap use it).

## 30-second demo (record on your phone)

1. Open `/start`. Pick "Step 1 / COMLEX Level 1", "I've dabbled", "Missing questions and not sure why". (5 s)
2. Show the path, tap the first Play, tap Copy. (10 s)
3. Paste into any AI tool and run it on a missed question. (10 s)
4. End on the Question Builder building a shelf-style set. (5 s)

Post it with the link. Screen-record vertical for Stories, Reels, and class group chats.

## Messages to copy

**Class group chat**
> Made a free site that shows you exactly how to use AI for studying: custom practice questions for your exam, turning wrong answers into a plan, lecture notes into Anki cards. Takes 3 questions to get your starting path. No signup: [link]

**Email to a student interest group or class officers**
> Subject: Free AI study guide made for med students
>
> Hi [name], I built Med AI Plays, a free site with short, copy-paste AI study workflows and a practice-question builder for Step 1, Step 2, shelves, OSCEs, and coursework. It includes a routine for catching AI mistakes. Could you share it with your class or add it to your resources page? One-page printable cheat sheet: [link]/cheat-sheet. Happy to do a 10-minute demo. Thanks, Lamar

**Email to a learning specialist or academic support office**
> Subject: A resource for students asking about AI and studying
>
> Hi [name], students keep asking how to use AI well for studying. Med AI Plays is a free site that teaches specific, verified-by-the-student workflows, including checking AI answers against trusted sources and what never to paste (patient information, licensed question-bank content). It points students back to your office for plateauing scores. Would you be open to linking it? [link]

**Post for forums where self-promotion is allowed** (read each community's rules first)
> I made a free tool for med students who want to use AI properly: build exam-style practice questions for your exact exam and weak spots, plus short workflows for error analysis, Anki cards, OSCE practice, and fact-checking AI. Feedback welcome: [link]

## Where to share

- Your own class and cohort group chats, then one cohort up and down.
- Student government, med-ed or technology interest groups, and any student org that keeps a resources list.
- Your school's learning specialist, academic support office, and library or e-resources page.
- Clerkship and shelf-prep groups, since the shelf path is the most concrete.
- Online med-student communities, where rules allow it.
- Put the printed `/cheat-sheet` on a study-room board with a QR code to `/start`.

## What to watch

Vercel Analytics (enabled once you deploy) shows page views per page. Look at:

| Question | Where |
|---|---|
| Do people start the path? | `/start` views vs `/` views |
| Which Plays get opened? | `/plays/*` views |
| Do exam pages bring in new visitors? | `/exams/*` views and referrers |
| Is anyone sharing? | Referrers, and visits to `/start?goal=...` links |
| What is missing? | Issues labeled `community-submission`, `play-feedback`, `community-feedback` |

## Maintainer routine (10 minutes a week)

1. Read new GitHub issues with the labels above.
2. For community submissions: check for patient identifiers and licensed exam content, then add an `.mdx` file to `content/community/` (copy an existing post's frontmatter).
3. When a community idea is good enough to become a Play, write the Play and set `promotedToPlay: "<slug>"` on the post.
4. For `play-feedback`, fix the prompt, bump the Play's `version` and `updatedAt`.
