"use client";

import { useState } from "react";
import { MessTypeCard } from "@/components/MessTypeCard";
import { GoalCard } from "@/components/GoalCard";
import { ResultSummary } from "@/components/ResultSummary";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { StepSummaryRow } from "@/components/StepSummaryRow";
import { AssetImage } from "@/components/AssetImage";
import { getMessImage } from "@/lib/images";
import { track } from "@/lib/analytics";
import { MESS_TYPES, getMessType } from "@/data/messTypes";
import { GOALS, getGoal } from "@/data/goals";
import type { GoalId, MessTypeId } from "@/lib/types";

const STEP_LABELS = ["Mess", "Goal", "Fix"];

// Single page 3 step guided flow. Step 1 shows first; Step 2 appears below once a
// mess is chosen; Step 3 appears below once a goal is chosen. Completed steps
// collapse into compact summary rows with a Change button that reopens them in place.
export function ToolFlow() {
  const [messTypeId, setMessTypeId] = useState<MessTypeId | null>(null);
  const [goalId, setGoalId] = useState<GoalId | null>(null);

  function handleMessSelect(id: MessTypeId) {
    setMessTypeId(id);
    track("mess_type_selected", { mess_type: id });
  }

  function handleGoalSelect(id: GoalId) {
    setGoalId(id);
    track("goal_selected", { goal: id, mess_type: messTypeId });
  }

  function changeMess() {
    // Reopen step 1. Goal stays chosen so the user can keep it if they reselect.
    setMessTypeId(null);
  }

  function changeGoal() {
    setGoalId(null);
  }

  const messType = messTypeId ? getMessType(messTypeId) : undefined;
  const goal = goalId ? getGoal(goalId) : undefined;

  // Continuous progress on one page: current step is the first not yet completed.
  const currentStep = !messType ? 1 : !goal ? 2 : 3;

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <ProgressIndicator current={currentStep} steps={STEP_LABELS} />
      </div>

      {/* Step 1: pick mess. Expanded until chosen, then a compact summary row. */}
      {!messType ? (
        <section aria-labelledby="step1-heading">
          <p className="type-caption text-primary">Step 1 of 3</p>
          <h1 id="step1-heading" className="type-page-title mt-1">
            Pick your mess.
          </h1>
          <p className="type-body mt-2">Closest match is good enough.</p>
          {/* One responsive card set: stacks on mobile, three up on desktop. */}
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {MESS_TYPES.map((mess) => (
              <MessTypeCard
                key={mess.id}
                messType={mess}
                onSelect={handleMessSelect}
                selected={messTypeId === mess.id}
                compact
              />
            ))}
          </div>
        </section>
      ) : (
        <StepSummaryRow
          label="Your mess"
          title={messType.name}
          detail={messType.tagline}
          leading={
            <AssetImage
              asset={getMessImage(messType.id)}
              className="aspect-square w-14 shrink-0 rounded-lg"
              sizes="3.5rem"
            />
          }
          onChange={changeMess}
        />
      )}

      {/* Step 2: pick goal. Appears after a mess is chosen. Collapses once chosen. */}
      {messType && !goal ? (
        <section aria-labelledby="step2-heading">
          <p className="type-caption text-primary">Step 2 of 3</p>
          <h2 id="step2-heading" className="type-page-title mt-1">
            Pick your goal.
          </h2>
          <p className="type-body mt-2">What matters most right now?</p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {GOALS.map((g) => (
              <GoalCard
                key={g.id}
                goal={g}
                onSelect={handleGoalSelect}
                selected={goalId === g.id}
                compact
              />
            ))}
          </div>
        </section>
      ) : null}

      {messType && goal ? (
        <StepSummaryRow label="Your goal" title={goal.name} detail={goal.tagline} onChange={changeGoal} />
      ) : null}

      {/* Step 3: the fix. Appears after a goal is chosen. */}
      {messType && goal ? (
        <section aria-labelledby="step3-heading">
          <p className="type-caption text-primary">Step 3 of 3</p>
          <h2 id="step3-heading" className="type-page-title mt-1">
            Your 3 Piece Fix
          </h2>
          <div className="mt-6">
            <ResultSummary messType={messType} goal={goal} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
