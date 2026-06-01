"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { MessTypeCard } from "@/components/MessTypeCard";
import { GoalCard } from "@/components/GoalCard";
import { ResultSummary } from "@/components/ResultSummary";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Carousel } from "@/components/Carousel";
import { track } from "@/lib/analytics";
import { MESS_TYPES, getMessType } from "@/data/messTypes";
import { GOALS, getGoal } from "@/data/goals";
import type { GoalId, MessTypeId } from "@/lib/types";

type Step = 1 | 2 | 3;

const STEP_LABELS = ["Your mess", "Your goal", "Your plan"];

// Three step guided flow: mess type, goal, result. Kept short so it feels like a
// shortcut, not a quiz. Each step offers exactly 3 choices.
export function ToolFlow() {
  const [step, setStep] = useState<Step>(1);
  const [messTypeId, setMessTypeId] = useState<MessTypeId | null>(null);
  const [goalId, setGoalId] = useState<GoalId | null>(null);

  function handleMessSelect(id: MessTypeId) {
    setMessTypeId(id);
    track("mess_type_selected", { mess_type: id });
    setStep(2);
  }

  function handleGoalSelect(id: GoalId) {
    setGoalId(id);
    track("goal_selected", { goal: id, mess_type: messTypeId });
    setStep(3);
  }

  const messType = messTypeId ? getMessType(messTypeId) : undefined;
  const goal = goalId ? getGoal(goalId) : undefined;

  return (
    <div>
      <div className="mb-10">
        <ProgressIndicator current={step} steps={STEP_LABELS} />
      </div>

      {step === 1 ? (
        <section aria-labelledby="step1-heading">
          <p className="type-caption text-primary">Step 1 of 3</p>
          <h1 id="step1-heading" className="type-page-title mt-1">
            Which mess looks most like yours?
          </h1>
          <p className="type-body mt-2">Pick the one closest to your cabinet. No judgment.</p>

          {/* Desktop and up: three card grid. */}
          <div className="mt-7 hidden gap-5 sm:grid sm:grid-cols-3">
            {MESS_TYPES.map((mess) => (
              <MessTypeCard
                key={mess.id}
                messType={mess}
                onSelect={handleMessSelect}
                selected={messTypeId === mess.id}
              />
            ))}
          </div>

          {/* Mobile: swipeable carousel, one card plus a peek of the next. */}
          <div className="mt-7 sm:hidden">
            <Carousel label="Cabinet mess types" slideWidth="peek">
              {MESS_TYPES.map((mess) => (
                <MessTypeCard
                  key={mess.id}
                  messType={mess}
                  onSelect={handleMessSelect}
                  selected={messTypeId === mess.id}
                />
              ))}
            </Carousel>
            <p className="mt-3 text-center text-xs text-muted-foreground">Swipe to compare</p>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section aria-labelledby="step2-heading">
          <p className="type-caption text-primary">Step 2 of 3</p>
          <h1 id="step2-heading" className="type-page-title mt-1">
            What would make it better?
          </h1>
          <p className="type-body mt-2">Pick the goal that matters most right now.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {GOALS.map((g) => (
              <GoalCard key={g.id} goal={g} onSelect={handleGoalSelect} selected={goalId === g.id} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to mess type
          </button>
        </section>
      ) : null}

      {step === 3 && messType && goal ? (
        <section aria-labelledby="step3-heading">
          <h1 id="step3-heading" className="sr-only">
            Your reset plan
          </h1>
          <ResultSummary messType={messType} goal={goal} />
          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Change my goal
          </button>
        </section>
      ) : null}
    </div>
  );
}
