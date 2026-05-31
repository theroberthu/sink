"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

// Fires a single analytics event on mount. Lets server-rendered pages stay crawlable
// while still reporting a view event from the client.
export function PageViewTracker({ event }: { event: AnalyticsEvent }) {
  useEffect(() => {
    track(event);
  }, [event]);
  return null;
}
