// Analytics wrapper. Vendor agnostic so we can drop in PostHog or GA4 later
// without touching call sites. If nothing is configured we log in development.

export type AnalyticsEvent =
  | "landing_page_viewed"
  | "find_fix_clicked"
  | "mess_type_selected"
  | "goal_selected"
  | "result_viewed"
  | "fit_check_viewed"
  | "product_clicked"
  | "email_submitted"
  | "waitlist_started"
  | "waitlist_submitted";

type EventProps = Record<string, string | number | boolean | null | undefined>;

interface PostHogLike {
  capture: (event: string, properties?: EventProps) => void;
}

function getPostHog(): PostHogLike | null {
  if (typeof window === "undefined") {
    return null;
  }
  const ph = (window as unknown as { posthog?: PostHogLike }).posthog;
  return ph ?? null;
}

/**
 * Track a product analytics event. Never throws.
 * Wire a real provider by exposing window.posthog (or swapping this body).
 */
export function track(event: AnalyticsEvent, properties?: EventProps): void {
  try {
    const posthog = getPostHog();
    if (posthog) {
      posthog.capture(event, properties);
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      console.log(`[analytics] ${event}`, properties ?? {});
    }
  } catch {
    // Analytics must never break the user flow.
  }
}
