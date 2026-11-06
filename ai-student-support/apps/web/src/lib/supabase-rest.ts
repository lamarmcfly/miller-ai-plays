// Minimal server-side insert and read for Supabase over its REST API, so no SDK is
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

/**
 * Server-side read over the REST API with the service key. Returns null when
 * Supabase is not configured or the request fails, so pages can fall back.
 */
export async function selectRows<T>(table: string, query: string): Promise<T[] | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    return res.ok ? ((await res.json()) as T[]) : null;
  } catch {
    return null;
  }
}
