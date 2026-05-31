"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { track } from "@/lib/analytics";
import { submitWaitlist } from "@/lib/tracking";
import type { GoalId, MessTypeId } from "@/lib/types";

const KIT_OPTIONS = ["Bottle Avalanche Kit", "Pipe Maze Kit", "Tiny Cabinet Kit"];
const PRICE_OPTIONS = ["$39", "$49", "$69"];
const PRIORITY_OPTIONS = ["Fits my cabinet", "Looks clean", "Easy to install"];

interface WaitlistFormProps {
  messType?: MessTypeId | null;
  goal?: GoalId | null;
}

// Three question kit waitlist. Email is optional. Fires waitlist_started on first interaction.
export function WaitlistForm({ messType, goal }: WaitlistFormProps) {
  const [started, setStarted] = useState(false);
  const [email, setEmail] = useState("");
  const [desiredKit, setDesiredKit] = useState(KIT_OPTIONS[0]);
  const [targetPrice, setTargetPrice] = useState(PRICE_OPTIONS[0]);
  const [topPriority, setTopPriority] = useState(PRIORITY_OPTIONS[0]);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  useEffect(() => {
    if (started) {
      track("waitlist_started", { mess_type: messType ?? null, goal: goal ?? null });
    }
  }, [started, messType, goal]);

  function markStarted() {
    if (!started) {
      setStarted(true);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const { ok } = await submitWaitlist({
      email: email || null,
      desiredKit,
      targetPrice,
      topPriority,
      messType,
      goal,
    });
    setStatus(ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6" role="status">
        <p className="font-semibold">You are on the list.</p>
        <p className="mt-1 text-sm text-slate-600">
          We will send early access if we launch the first batch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <h3 className="text-lg font-bold">Join the Kit Waitlist</h3>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium">Which kit would you want most?</legend>
        <div className="mt-2 space-y-2">
          {KIT_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="desiredKit"
                value={option}
                checked={desiredKit === option}
                onChange={() => setDesiredKit(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium">What would you pay for a complete kit?</legend>
        <div className="mt-2 space-y-2">
          {PRICE_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="targetPrice"
                value={option}
                checked={targetPrice === option}
                onChange={() => setTargetPrice(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-sm font-medium">What matters most?</legend>
        <div className="mt-2 space-y-2">
          {PRIORITY_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="topPriority"
                value={option}
                checked={topPriority === option}
                onChange={() => setTopPriority(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4">
        <label htmlFor="waitlist-email" className="block text-sm font-medium">
          Email (optional)
        </label>
        <input
          id="waitlist-email"
          type="email"
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
        {status === "submitting" ? "Joining..." : "Join the Kit Waitlist"}
      </CTAButton>
    </form>
  );
}
