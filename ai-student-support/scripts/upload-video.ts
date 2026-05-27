/**
 * Upload a Play demo video to the SharePoint Play Videos library.
 *
 * Usage:
 *   pnpm upload:video error-engine
 *
 * Expects video at: content/plays/<slug>/demo.mp4
 */

import fs from "fs";
import path from "path";
import { getGraphClient, getSiteId } from "./lib/graph-client.js";

const CONTENT_DIR = path.join(__dirname, "..", "content", "plays");

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.log("Usage: pnpm upload:video <slug>");
    console.log("  Expects video at: content/plays/<slug>/demo.mp4");
    process.exit(0);
  }

  const videoPath = path.join(CONTENT_DIR, slug, "demo.mp4");
  if (!fs.existsSync(videoPath)) {
    console.error(`Video not found: ${videoPath}`);
    console.log(`Place your demo video at content/plays/${slug}/demo.mp4`);
    process.exit(1);
  }

  const stats = fs.statSync(videoPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`Uploading ${slug}-demo.mp4 (${sizeMB} MB)...\n`);

  if (stats.size > 200 * 1024 * 1024) {
    console.warn(`[WARN] Video is ${sizeMB}MB - recommend compressing to <200MB with ffmpeg:`);
    console.warn(`  ffmpeg -i demo.mp4 -vcodec libx264 -crf 28 -preset fast demo-compressed.mp4`);
  }

  const client = getGraphClient();
  const siteId = await getSiteId(client);

  // Find the Play Videos library drive
  const drives = await client
    .api(`/sites/${siteId}/drives`)
    .select("id,name")
    .get();

  const videosDrive = drives.value.find(
    (d: any) => d.name === "Play Videos"
  );

  if (!videosDrive) {
    console.error("[ERROR] Play Videos library not found. Run pnpm setup:sharepoint first.");
    process.exit(1);
  }

  const fileName = `${slug}-demo.mp4`;
  const fileBuffer = fs.readFileSync(videoPath);

  try {
    if (stats.size < 4 * 1024 * 1024) {
      // Small file: simple upload
      const result = await client
        .api(`/drives/${videosDrive.id}/root:/${fileName}:/content`)
        .putStream(fileBuffer);
      console.log(`[OK] Uploaded: ${result.webUrl}`);
    } else {
      // Large file: upload session
      console.log("File > 4MB, using upload session...");
      const session = await client
        .api(`/drives/${videosDrive.id}/root:/${fileName}:/createUploadSession`)
        .post({
          item: {
            "@microsoft.graph.conflictBehavior": "replace",
            name: fileName,
          },
        });

      const chunkSize = 10 * 1024 * 1024; // 10MB chunks
      let offset = 0;

      while (offset < fileBuffer.length) {
        const end = Math.min(offset + chunkSize, fileBuffer.length);
        const chunk = fileBuffer.subarray(offset, end);

        await fetch(session.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Length": String(chunk.length),
            "Content-Range": `bytes ${offset}-${end - 1}/${fileBuffer.length}`,
          },
          body: chunk,
        });

        offset = end;
        const pct = Math.round((offset / fileBuffer.length) * 100);
        process.stdout.write(`\r  Progress: ${pct}%`);
      }

      console.log(`\n[OK] Upload complete: ${fileName}`);
    }

    console.log("\nNext steps:");
    console.log("  1. Open the Play Videos library in SharePoint");
    console.log(`  2. Find ${fileName} and verify it plays`);
    console.log("  3. On the Play page, replace the video placeholder with a Stream web part");
    console.log("  4. Set: Autoplay OFF, Show title OFF, Captions ON");
  } catch (err: any) {
    console.error("[ERROR] Upload failed:", err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
