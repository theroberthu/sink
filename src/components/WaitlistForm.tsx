"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, PackageOpen } from "lucide-react";
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
  /** When true, drops the card chrome and heading so it can sit inside another card. */
  bare?: boolean;
}

// Reusable radio group rendered as accessible selectable chips.
function ChipGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="mt-5">
      <legend className="type-label">{legend}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={[
                "flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-colors",
                checked
                  ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                  : "border-border bg-background hover:border-primary/40",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// Three question kit waitlist. Email is optional. Fires waitlist_started on first interaction.
export function WaitlistForm({ messType, goal, bare }: WaitlistFormProps) {
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
      <div
        className="flex items-start gap-3 rounded-2xl border border-success/40 bg-success/10 p-6"
        role="status"
      >
        <CheckCircle2 className="h-6 w-6 shrink-0 text-success" aria-hidden="true" />
        <div>
          <p className="font-semibold">You are on the list.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We will send early access if we launch the first batch.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={markStarted}
      className={bare ? "" : "rounded-2xl border border-border bg-card p-6"}
    >
      {bare ? null : (
        <div className="flex items-center gap-2">
          <PackageOpen className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="type-card-title">Join the Kit Waitlist</h3>
        </div>
      )}

      <ChipGroup
        legend="Which kit would you want most?"
        name="desiredKit"
        options={KIT_OPTIONS}
        value={desiredKit}
        onChange={setDesiredKit}
      />
      <ChipGroup
        legend="What would you pay for a complete kit?"
        name="targetPrice"
        options={PRICE_OPTIONS}
        value={targetPrice}
        onChange={setTargetPrice}
      />
      <ChipGroup
        legend="What matters most?"
        name="topPriority"
        options={PRIORITY_OPTIONS}
        value={topPriority}
        onChange={setTopPriority}
      />

      <div className="mt-5">
        <label htmlFor="waitlist-email" className="type-label">
          Email (optional)
        </label>
        <input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
      </div>

      {status === "error" ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}

      <CTAButton type="submit" className="mt-5 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Joining
          </>
        ) : (
          "Join the Kit Waitlist"
        )}
      </CTAButton>
    </form>
  );
}
