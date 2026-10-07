"use client";

import { track } from "@vercel/analytics";
import { usageProperties, type UsageAction } from "./analytics-policy";

export function trackUsage(action: UsageAction, category?: string) {
  if (typeof window === "undefined" || process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return;
  try {
    const properties = usageProperties(action, window.location.href, category);
    if (properties) track(action, properties);
  } catch {
    // Analytics must never interrupt copying, navigation, or studying.
  }
}
