// Data writes to Supabase plus analytics events. Every function fails gracefully:
// if Supabase is not configured the data write is skipped and logged, and the UI
// continues as normal. This keeps the affiliate flow working before the backend exists.

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { track } from "@/lib/analytics";
import { getSessionId } from "@/lib/session";
import type { ComponentType, GoalId, MessTypeId } from "@/lib/types";

function warnNotConfigured(action: string): void {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[tracking] Supabase not configured, skipped persisting: ${action}`);
  }
}

export interface SessionRecord {
  sessionId: string;
  messType?: MessTypeId | null;
  goal?: GoalId | null;
  resultType?: string | null;
}

/** Upsert-style record of a tool session. Best effort. */
export async function recordSession(record: Omit<SessionRecord, "sessionId">): Promise<void> {
  const sessionId = getSessionId();
  const supabase = getSupabaseClient();
  if (!supabase) {
    warnNotConfigured("sessions");
    return;
  }
  try {
    await supabase.from("sessions").insert({
      session_id: sessionId,
      mess_type: record.messType ?? null,
      goal: record.goal ?? null,
      result_type: record.resultType ?? null,
    });
  } catch (error) {
    console.error("[tracking] recordSession failed", error);
  }
}

export interface ProductClickPayload {
  messType: MessTypeId;
  goal: GoalId;
  componentType: ComponentType;
  productName: string;
  retailer: string;
  affiliateUrl: string;
}

/**
 * Product click handler. Fires the analytics event and persists the click.
 * Returns the affiliate url so callers can open it after tracking.
 */
export async function trackProductClick(payload: ProductClickPayload): Promise<string> {
  const sessionId = getSessionId();

  track("product_clicked", {
    mess_type: payload.messType,
    goal: payload.goal,
    component_type: payload.componentType,
    product_name: payload.productName,
    retailer: payload.retailer,
  });

  if (!isSupabaseConfigured()) {
    warnNotConfigured("product_clicks");
    return payload.affiliateUrl;
  }

  const supabase = getSupabaseClient();
  try {
    await supabase?.from("product_clicks").insert({
      session_id: sessionId,
      mess_type: payload.messType,
      goal: payload.goal,
      component_type: payload.componentType,
      product_name: payload.productName,
      retailer: payload.retailer,
      affiliate_url: payload.affiliateUrl,
    });
  } catch (error) {
    console.error("[tracking] trackProductClick failed", error);
  }

  return payload.affiliateUrl;
}

export interface EmailCapturePayload {
  email: string;
  messType?: MessTypeId | null;
  goal?: GoalId | null;
  resultType?: string | null;
}

export async function submitEmailCapture(payload: EmailCapturePayload): Promise<{ ok: boolean }> {
  const sessionId = getSessionId();

  track("email_submitted", {
    mess_type: payload.messType ?? null,
    goal: payload.goal ?? null,
    result_type: payload.resultType ?? null,
  });

  if (!isSupabaseConfigured()) {
    warnNotConfigured("email_captures");
    // Treat as success in V1 so the UI can confirm even before the backend exists.
    return { ok: true };
  }

  const supabase = getSupabaseClient();
  try {
    const { error } = await supabase!.from("email_captures").insert({
      email: payload.email,
      mess_type: payload.messType ?? null,
      goal: payload.goal ?? null,
      result_type: payload.resultType ?? null,
    });
    if (error) {
      throw error;
    }
    // Keep the session row in sync when we have one.
    await supabase!.from("sessions").insert({
      session_id: sessionId,
      mess_type: payload.messType ?? null,
      goal: payload.goal ?? null,
      result_type: payload.resultType ?? null,
    });
    return { ok: true };
  } catch (error) {
    console.error("[tracking] submitEmailCapture failed", error);
    return { ok: false };
  }
}

export interface WaitlistPayload {
  email?: string | null;
  desiredKit: string;
  targetPrice: string;
  topPriority: string;
  messType?: MessTypeId | null;
  goal?: GoalId | null;
}

export async function submitWaitlist(payload: WaitlistPayload): Promise<{ ok: boolean }> {
  track("waitlist_submitted", {
    desired_kit: payload.desiredKit,
    target_price: payload.targetPrice,
    top_priority: payload.topPriority,
    mess_type: payload.messType ?? null,
    goal: payload.goal ?? null,
  });

  if (!isSupabaseConfigured()) {
    warnNotConfigured("waitlist");
    return { ok: true };
  }

  const supabase = getSupabaseClient();
  try {
    const { error } = await supabase!.from("waitlist").insert({
      email: payload.email ?? null,
      desired_kit: payload.desiredKit,
      target_price: payload.targetPrice,
      top_priority: payload.topPriority,
      mess_type: payload.messType ?? null,
      goal: payload.goal ?? null,
    });
    if (error) {
      throw error;
    }
    return { ok: true };
  } catch (error) {
    console.error("[tracking] submitWaitlist failed", error);
    return { ok: false };
  }
}
