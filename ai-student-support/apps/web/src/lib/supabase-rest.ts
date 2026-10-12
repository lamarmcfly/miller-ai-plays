// Minimal server-side insert into Supabase over its REST API, so no SDK is
// needed. Tables have row-level security on and no public policies; only this
// server code, holding the service key, can write. Never import from a client component.

export type InsertResult = "ok" | "not_configured" | "error";

export async function insertRow(table: string, row: Record<string, unknown>): Promise<InsertResult> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return "not_configured";
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    });
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}
