"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { submitEmailCapture } from "@/lib/tracking";
import type { GoalId, MessTypeId } from "@/lib/types";

interface EmailCaptureFormProps {
  messType?: MessTypeId | null;
  goal?: GoalId | null;
  resultType?: string | null;
  heading?: string;
}

// Simple email shape check. Native validation also applies via type=email + required.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email capture form. mess_type, goal, and result_type travel with the submission.
export function EmailCaptureForm({
  messType,
  goal,
  resultType,
  heading = "Want this plan in your inbox?",
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setStatus("submitting");
    const { ok } = await submitEmailCapture({ email: email.trim(), messType, goal, resultType });
    setStatus(ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-success/40 bg-success/10 p-6"
        role="status"
      >
        <CheckCircle2 className="h-6 w-6 shrink-0 text-success" aria-hidden="true" />
        <p className="font-semibold">Your reset plan is on its way.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="type-card-title">{heading}</h3>
      </div>
      <div className="mt-4">
        <label htmlFor="email-capture" className="type-label">
          Email
        </label>
        <input
          id="email-capture"
          type="email"
          required
          autoComplete="email"
          aria-invalid={invalid}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (invalid) setInvalid(false);
          }}
          placeholder="you@example.com"
          className={`mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary ${
            invalid ? "border-destructive" : "border-border"
          }`}
        />
        {invalid ? (
          <p className="mt-1.5 text-sm text-destructive" role="alert">
            Please enter a valid email so we can send your plan.
          </p>
        ) : null}
        <p className="mt-1.5 text-xs text-muted-foreground">
          We will only use this to send your plan or kit update.
        </p>
      </div>
      {status === "error" ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <CTAButton type="submit" className="mt-4 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Send Me This Plan"
        )}
      </CTAButton>
    </form>
  );
}
