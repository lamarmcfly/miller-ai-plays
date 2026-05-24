/**
 * Export Play MDX content to SharePoint pages via Microsoft Graph API.
 *
 * Usage:
 *   pnpm export:sharepoint error-engine     # Export a single play
 *   pnpm export:sharepoint --all            # Export all plays
 *   pnpm export:sharepoint --dry-run        # Test auth, list site info
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import {
  getGraphClient,
  getSiteId,
  findPageByTitle,
  findListByTitle,
} from "./lib/graph-client.js";
import { buildFullPageHtml } from "./lib/sharepoint-html.js";
import type { Play } from "./lib/play-types.js";

const CONTENT_DIR = path.join(__dirname, "..", "content", "plays");

// Lightweight schema validation (same as apps/web but standalone)
const playSchema = z.object({
  slug: z.string(),
  title: z.string(),
  hook: z.string(),
  oneLiner: z.string(),
  audience: z.array(z.string()),
  year: z.array(z.string()),
  estimatedTime: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  tools: z.array(z.object({ name: z.string(), plan: z.enum(["free", "pro"]), url: z.string() })),
  video: z.object({ url: z.string(), poster: z.string(), durationSeconds: z.number(), captions: z.string() }),
  artifact: z.object({
    type: z.enum(["claude-project", "notebooklm", "copilot-agent", "prompt"]),
    name: z.string(),
    systemPrompt: z.string(),
    cloneInstructions: z.string(),
    cloneUrl: z.string().nullable(),
  }),
  whenToUse: z.string(),
  successSignal: z.string(),
  learningNote: z.string().optional(),
  starterPrompts: z.array(z.object({ label: z.string(), prompt: z.string() })).optional(),
  tags: z.array(z.string()),
  relatedPlays: z.array(z.string()),
  author: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  version: z.string(),
});

function loadPlay(slug: string): { play: Play; content: string } | null {
  const filePath = path.join(CONTENT_DIR, slug, "play.mdx");
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] ${filePath} not found`);
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const parsed = playSchema.safeParse(data);
  if (!parsed.success) {
    console.error(`[ERROR] Schema validation failed for ${slug}:`, parsed.error.issues);
    return null;
  }
  return { play: parsed.data as Play, content };
}

function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((d) => {
      const mdx = path.join(CONTENT_DIR, d, "play.mdx");
      return fs.statSync(path.join(CONTENT_DIR, d)).isDirectory() && fs.existsSync(mdx);
    });
}

async function exportPlay(slug: string, dryRun: boolean) {
  const loaded = loadPlay(slug);
  if (!loaded) return;
  const { play, content } = loaded;

  console.log(`\n[EXPORT] ${play.slug}: "${play.title}"`);

  const client = getGraphClient();
  const siteId = await getSiteId(client);

  if (dryRun) {
    console.log(`  [DRY RUN] Would create/update page "${play.title}" on site ${siteId}`);
    return;
  }

  // Get site URL for related play links
  const site = await client.api(`/sites/${siteId}`).select("webUrl").get();
  const siteUrl = site.webUrl;

  // Build the full page HTML from MDX content
  const pageHtml = buildFullPageHtml(play, content, siteUrl);

  // Check if page already exists
  const existing = await findPageByTitle(client, siteId, play.title);

  if (existing) {
    // Update existing page
    console.log(`  [UPDATE] Page already exists (${existing.id}), updating...`);
    await client
      .api(`/sites/${siteId}/pages/${existing.id}/microsoft.graph.sitePage`)
      .patch({
        title: play.title,
        description: play.hook,
        titleArea: {
          enableGradientEffect: false,
          layout: "plain",
          showAuthor: false,
          showPublishedDate: false,
          showTextBlockAboveTitle: false,
          textAboveTitle: "",
          title: play.title,
        },
      });
    console.log(`  [OK] Page updated: ${existing.webUrl}`);
  } else {
    // Create new page as draft
    console.log(`  [CREATE] Creating new draft page...`);
    try {
      const newPage = await client
        .api(`/sites/${siteId}/pages`)
        .post({
          "@odata.type": "#microsoft.graph.sitePage",
          name: `${play.slug}.aspx`,
          title: play.title,
          description: play.hook,
          pageLayout: "article",
          promotionKind: "page",
          showComments: true,
          showRecommendedPages: false,
          titleArea: {
            enableGradientEffect: false,
            layout: "plain",
            showAuthor: false,
            showPublishedDate: false,
            title: play.title,
          },
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
                        innerHtml: pageHtml,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        });

      console.log(`  [OK] Draft page created: ${newPage.webUrl || newPage.id}`);
      console.log(`  [INFO] Page saved as DRAFT - Council must review and click Publish`);

      // Add to Play Submissions list if it exists
      await addToSubmissionsList(client, siteId, play, newPage.webUrl || "");
    } catch (err: any) {
      console.error(`  [ERROR] Failed to create page:`, err.message || err);
      if (err.body) {
        try {
          const body = JSON.parse(err.body);
          console.error(`  [DETAIL]`, body.error?.message || body);
        } catch {
          console.error(`  [DETAIL]`, err.body);
        }
      }
    }
  }
}

async function addToSubmissionsList(
  client: any,
  siteId: string,
  play: Play,
  pageUrl: string
) {
  const listId = await findListByTitle(client, siteId, "Play Submissions");
  if (!listId) {
    console.log(`  [SKIP] Play Submissions list not found - create it via setup:sharepoint first`);
    return;
  }

  try {
    await client.api(`/sites/${siteId}/lists/${listId}/items`).post({
      fields: {
        Title: play.title,
        AuthorName: play.author,
        Slug: play.slug,
        PageURL: pageUrl,
        SubmissionDate: new Date().toISOString(),
        Status: "Submitted",
      },
    });
    console.log(`  [OK] Added to Play Submissions list`);
  } catch (err: any) {
    console.log(`  [WARN] Could not add to submissions list: ${err.message}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const exportAll = args.includes("--all");

  if (dryRun) {
    console.log("=== DRY RUN MODE ===\n");
    try {
      const client = getGraphClient();
      const siteId = await getSiteId(client);
      const site = await client.api(`/sites/${siteId}`).select("displayName,webUrl").get();
      console.log(`Connected to: ${site.displayName}`);
      console.log(`Site URL: ${site.webUrl}`);
      console.log(`Site ID: ${siteId}`);
      console.log("\nAuth is working. Ready to export.");
    } catch (err: any) {
      console.error("Auth failed:", err.message);
      console.error("\nCheck your .env file has AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, SP_SITE_HOSTNAME, SP_SITE_PATH");
      process.exit(1);
    }
    return;
  }

  const slugs = exportAll
    ? getAllSlugs()
    : args.filter((a) => !a.startsWith("--"));

  if (slugs.length === 0) {
    console.log("Usage:");
    console.log("  pnpm export:sharepoint error-engine     # Export single play");
    console.log("  pnpm export:sharepoint --all             # Export all plays");
    console.log("  pnpm export:sharepoint --dry-run         # Test auth");
    process.exit(0);
  }

  console.log(`Exporting ${slugs.length} play(s) to SharePoint...\n`);

  for (const slug of slugs) {
    await exportPlay(slug, false);
  }

  console.log("\nDone. Review drafts in SharePoint and click Publish when ready.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
