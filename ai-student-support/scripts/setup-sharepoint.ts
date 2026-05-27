/**
 * One-time SharePoint site setup for Miller AI Plays.
 *
 * Creates:
 * - Play Videos document library
 * - Play Submissions Microsoft List with tracking columns
 * - Core pages (About, Council)
 *
 * Prerequisites:
 * - Azure AD app with Sites.ReadWrite.All permission
 * - .env file with credentials and site info
 * - SharePoint site already exists (created via Teams)
 *
 * Usage:
 *   pnpm setup:sharepoint
 */

import { getGraphClient, getSiteId, findListByTitle } from "./lib/graph-client.js";

async function main() {
  console.log("=== Miller AI Plays - SharePoint Setup ===\n");

  const client = getGraphClient();
  const siteId = await getSiteId(client);
  const site = await client.api(`/sites/${siteId}`).select("displayName,webUrl").get();
  console.log(`Site: ${site.displayName} (${site.webUrl})\n`);

  // 1. Create Play Videos document library
  console.log("[1/3] Creating Play Videos library...");
  try {
    await client.api(`/sites/${siteId}/lists`).post({
      displayName: "Play Videos",
      description: "Demo videos for Miller AI Plays. Council uploads, students view.",
      list: { template: "documentLibrary" },
    });
    console.log("  [OK] Play Videos library created");
  } catch (err: any) {
    if (err.message?.includes("already exists") || err.statusCode === 409) {
      console.log("  [SKIP] Play Videos library already exists");
    } else {
      console.error("  [ERROR]", err.message);
    }
  }

  // 2. Create Play Submissions list
  console.log("[2/3] Creating Play Submissions list...");
  const existingList = await findListByTitle(client, siteId, "Play Submissions");
  if (existingList) {
    console.log("  [SKIP] Play Submissions list already exists");
  } else {
    try {
      const list = await client.api(`/sites/${siteId}/lists`).post({
        displayName: "Play Submissions",
        description: "Tracks Play submissions, reviews, and publishing status.",
        list: { template: "genericList" },
        columns: [
          { name: "AuthorName", text: {}, description: "Author's full name" },
          { name: "Cohort", choice: { choices: ["MS1", "MS2", "MS3", "MS4"] }, description: "Author's cohort" },
          { name: "Slug", text: {}, description: "URL-safe identifier (kebab-case)" },
          { name: "PageURL", text: {}, description: "SharePoint draft page URL" },
          { name: "SubmissionDate", dateTime: {}, description: "Date submitted" },
          {
            name: "Status",
            choice: {
              choices: ["Submitted", "In Review", "Approved", "Returned", "Rejected"],
              defaultValue: { value: "Submitted" },
            },
            description: "Current review status",
          },
          { name: "Reviewer", text: {}, description: "Assigned reviewer" },
          { name: "ReviewerNotes", text: { allowMultipleLines: true }, description: "Review feedback" },
          { name: "PublishDate", dateTime: {}, description: "Date published" },
          { name: "LastReviewed", dateTime: {}, description: "Last content review date" },
        ],
      });
      console.log(`  [OK] Play Submissions list created (${list.id})`);
    } catch (err: any) {
      console.error("  [ERROR] Failed to create list:", err.message);
      console.log("  [TIP] You may need to create columns manually if the batch column creation fails.");
      console.log("  [TIP] The list can also be created manually in SharePoint with these columns:");
      console.log("         AuthorName, Cohort, Slug, PageURL, SubmissionDate, Status, Reviewer, ReviewerNotes, PublishDate, LastReviewed");
    }
  }

  // 3. Create About page
  console.log("[3/3] Creating core pages...");
  const corePagesHtml: Record<string, { title: string; html: string }> = {
    about: {
      title: "About Miller AI Plays",
      html: `
<h2>Why this exists</h2>
<p>Medical students know AI tools exist but lack practical, tested workflows to use them effectively.
They won't read a 20-page guide on prompt engineering, but they will adopt a tool they can master
in 5 minutes if the value is obvious.</p>

<h2>How Plays work</h2>
<ol>
  <li><strong>Watch</strong> - 60-90 second demo shows the Play in action</li>
  <li><strong>Copy</strong> - One-tap copy of the prompt into your AI tool</li>
  <li><strong>Use</strong> - Run the workflow on your own study material</li>
</ol>

<h2>Who runs this</h2>
<p>Miller AI Plays was created by <strong>Lamar Martin</strong>, Academic Enrichment Services.
The Play library is operated by the Miller AI Plays Council, a team of 3-5 medical students
who author, review, and maintain Plays.</p>

<h2>Who it's for</h2>
<p>All Miller medical students (MS1-MS4) preparing for coursework, USMLE Step 1/2 CK,
shelf exams, OSCEs, and clerkships.</p>

<div style="font-size:12px; color:#666; margin-top:32px;">
  <p><em>Not an official University of Miami publication.</em></p>
</div>`.trim(),
    },
    council: {
      title: "The Council",
      html: `
<h2>What the Council does</h2>
<ol>
  <li>Authors new Plays based on student demand and emerging AI tools</li>
  <li>Reviews submitted Plays against editorial standards</li>
  <li>Maintains existing Plays - updates, retires, or rewrites as tools change</li>
  <li>Meets monthly to review feedback and plan the library roadmap</li>
</ol>

<h2>Current members</h2>
<p><em>Founding Council members will be announced at launch.</em></p>

<h2>How to apply</h2>
<p>Council applications open each spring for the following academic year.
Members serve a one-year term. Benefits include AES service credit,
letters of recommendation, authorship credit, and direct mentorship.</p>

<h2>Editorial standards</h2>
<ul>
  <li>Solves a real, specific workflow medical students actually do</li>
  <li>Demo under 90 seconds (hard cap)</li>
  <li>One tool, one job</li>
  <li>Tested on real student work by the author</li>
  <li>No academic integrity violations</li>
  <li>No clinical decision-making content</li>
  <li>Last-reviewed within 90 days</li>
</ul>

<div style="font-size:12px; color:#666; margin-top:32px;">
  <p><em>Not an official University of Miami publication.</em></p>
</div>`.trim(),
    },
  };

  for (const [slug, page] of Object.entries(corePagesHtml)) {
    try {
      await client.api(`/sites/${siteId}/pages`).post({
        "@odata.type": "#microsoft.graph.sitePage",
        name: `${slug}.aspx`,
        title: page.title,
        pageLayout: "article",
        promotionKind: "page",
        showComments: true,
        canvasLayout: {
          horizontalSections: [
            {
              layout: "fullWidth",
              columns: [
                {
                  width: 12,
                  webparts: [
                    {
                      "@odata.type": "#microsoft.graph.textWebPart",
                      innerHtml: page.html,
                    },
                  ],
                },
              ],
            },
          ],
        },
      });
      console.log(`  [OK] ${page.title} page created as draft`);
    } catch (err: any) {
      if (err.statusCode === 409) {
        console.log(`  [SKIP] ${page.title} already exists`);
      } else {
        console.error(`  [ERROR] ${page.title}:`, err.message);
      }
    }
  }

  console.log("\n=== Setup complete ===");
  console.log("\nManual steps remaining:");
  console.log("  1. Set branding (logo, Miller orange/green theme) in SharePoint site settings");
  console.log("  2. Configure navigation: Home → Browse Plays → Submit a Play → About → Council");
  console.log("  3. Add Highlighted Content web part to homepage (filter: Site Pages)");
  console.log("  4. Verify permissions: Owners (you), Council (Edit), Visitors (Read + Comment)");
  console.log("  5. Test with a student account to confirm Read + Comment access works");
  console.log(`\nThen run: pnpm export:sharepoint --all`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
