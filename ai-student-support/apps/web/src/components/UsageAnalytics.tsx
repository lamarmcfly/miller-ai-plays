"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import type { BeforeSendEvent } from "@vercel/analytics";
import { aiTool, redactAnalyticsUrl } from "@/lib/analytics-policy";
import { trackUsage } from "@/lib/analytics";

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = redactAnalyticsUrl(event.url);
  return url ? { ...event, url } : null;
}

export function UsageAnalytics() {
  const enabled = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
  useEffect(() => {
    if (!enabled) return;
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || (event.type === "auxclick" ? event.button !== 1 : event.button !== 0)) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const tool = aiTool(link.href);
      if (tool) trackUsage("ai_tool_opened", tool);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, [enabled]);
  return enabled ? <Analytics beforeSend={beforeSend} /> : null;
}
