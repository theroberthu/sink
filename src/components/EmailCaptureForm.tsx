"use client";

import { useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { submitEmailCapture } from "@/lib/tracking";
import type { GoalId, MessTypeId } from "@/lib/types";

interface EmailCaptureFormProps {
  messType?: MessTypeId | null;
  goal?: GoalId | null;
  resultType?: string | null;
  heading?: string;
}

// Email capture form. mess_type, goal, and result_type travel with the submission.
export function EmailCaptureForm({
  messType,
  goal,
  resultType,
  heading = "Want this plan in your inbox?",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) {
      return;
    }
    setStatus("submitting");
    const { ok } = await submitEmailCapture({
      email,
      messType,
      goal,
      resultType,
    });
    setStatus(ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6" role="status">
        <p className="font-semibold">Your reset plan is on its way.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-bold">{heading}</h3>
      <div className="mt-4">
        <label htmlFor="email-capture" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email-capture"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <CTAButton type="submit" className="mt-4 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send My Plan"}
      </CTAButton>
    </form>
  );
}
