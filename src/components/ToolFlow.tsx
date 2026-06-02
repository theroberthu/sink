"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { MessTypeCard } from "@/components/MessTypeCard";
import { ResultSummary } from "@/components/ResultSummary";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Carousel } from "@/components/Carousel";
import { AssetImage } from "@/components/AssetImage";
import { getMessImage } from "@/lib/images";
import { track } from "@/lib/analytics";
import { MESS_TYPES, getMessType } from "@/data/messTypes";
import { GOALS, getGoal } from "@/data/goals";
import type { GoalId, MessTypeId } from "@/lib/types";

const STEP_LABELS = ["Mess", "Goal", "Fix"];
const DEFAULT_GOAL: GoalId = "easy-reach";

// One continuous guided workspace. Mess, Goal, and Fix all live on the same screen.
// Pick a mess, then a compact goal selector and the fix appear below in place.
export function ToolFlow() {
  const [messTypeId, setMessTypeId] = useState<MessTypeId | null>(null);
  const [goalId, setGoalId] = useState<GoalId>(DEFAULT_GOAL);

  function handleMessSelect(id: MessTypeId) {
    setMessTypeId(id);
    track("mess_type_selected", { mess_type: id });
  }

  function handleGoalChange(id: GoalId) {
    if (id === goalId) return;
    setGoalId(id);
    track("goal_selected", { goal: id, mess_type: messTypeId });
  }

  function resetMess() {
    setMessTypeId(null);
  }

  const messType = messTypeId ? getMessType(messTypeId) : undefined;
  const goal = getGoal(goalId) ?? GOALS[0];
  // Continuous progress: before a mess is picked we are on step 1. Once picked, the
  // goal and fix are both revealed, so Mess and Goal read complete and Fix is active.
  const currentStep = messType ? 3 : 1;

  return (
    <div>
      <div className="mb-10">
        <ProgressIndicator current={currentStep} steps={STEP_LABELS} />
      </div>

      {/* Step 1: pick your mess. Hidden once a mess is chosen, replaced by a summary. */}
      {!messType ? (
        <section aria-labelledby="mess-heading">
          <p className="type-caption text-primary">Step 1 of 3</p>
          <h1 id="mess-heading" className="type-page-title mt-1">
            Pick your mess.
          </h1>
          <p className="type-body mt-2">Closest match is good enough.</p>

          {/* Desktop: grid. Mobile: carousel. One shared card set, responsive. */}
          <div className="mt-7 hidden gap-5 md:grid md:grid-cols-3">
            {MESS_TYPES.map((mess) => (
              <MessTypeCard key={mess.id} messType={mess} onSelect={handleMessSelect} compact />
            ))}
          </div>
          <div className="mt-7 md:hidden">
            <Carousel label="Cabinet mess types" slideWidth="peek">
              {MESS_TYPES.map((mess) => (
                <MessTypeCard key={mess.id} messType={mess} onSelect={handleMessSelect} compact />
              ))}
            </Carousel>
            <p className="mt-3 text-center text-xs text-muted-foreground">Swipe to compare</p>
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {/* Selected mess summary: small, with a quick way to change it. */}
          <section aria-labelledby="mess-heading">
            <h1 id="mess-heading" className="sr-only">
              Your cabinet fix
            </h1>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <AssetImage
                asset={getMessImage(messType.id)}
                className="aspect-square w-16 shrink-0 rounded-lg"
                sizes="4rem"
              />
              <div className="min-w-0 flex-1">
                <p className="type-caption text-primary">Your mess</p>
                <p className="truncate font-semibold">{messType.name}</p>
                <p className="truncate text-sm text-muted-foreground">{messType.tagline}</p>
              </div>
              <button
                type="button"
                onClick={resetMess}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Change
              </button>
            </div>
          </section>

          {/* Compact goal selector inline in the same workspace. */}
          <section aria-labelledby="goal-heading">
            <p className="type-caption text-primary">Step 2 of 3</p>
            <h2 id="goal-heading" className="type-card-title mt-1">
              What matters most?
            </h2>
            <fieldset className="mt-3">
              <legend className="sr-only">What matters most?</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {GOALS.map((g) => {
                  const active = g.id === goalId;
                  return (
                    <label
                      key={g.id}
                      className={[
                        "flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-center text-sm font-medium transition-colors",
                        active
                          ? "border-primary bg-sage text-foreground"
                          : "border-border bg-card hover:border-foreground/30",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="goal"
                        value={g.id}
                        checked={active}
                        onChange={() => handleGoalChange(g.id)}
                        className="sr-only"
                      />
                      {active ? <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> : null}
                      {g.name}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </section>

          {/* Fix section appears below in the same window. */}
          <section aria-labelledby="fix-heading">
            <p className="type-caption text-primary">Step 3 of 3</p>
            <h2 id="fix-heading" className="sr-only">
              Your fix
            </h2>
            <div className="mt-3">
              <ResultSummary messType={messType} goal={goal} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
