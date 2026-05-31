"use client";

import { useState } from "react";
import { MessTypeCard } from "@/components/MessTypeCard";
import { GoalCard } from "@/components/GoalCard";
import { ResultSummary } from "@/components/ResultSummary";
import { CTAButton } from "@/components/CTAButton";
import { track } from "@/lib/analytics";
import { MESS_TYPES, getMessType } from "@/data/messTypes";
import { GOALS, getGoal } from "@/data/goals";
import type { GoalId, MessTypeId } from "@/lib/types";

type Step = 1 | 2 | 3;

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
      <ol className="mb-8 flex gap-2 text-sm font-medium" aria-label="Progress">
        {[1, 2, 3].map((n) => (
          <li
            key={n}
            aria-current={step === n ? "step" : undefined}
            className={`flex-1 rounded-full px-3 py-1 text-center ${
              step >= n ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            Step {n}
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <section aria-labelledby="step1-heading">
          <h1 id="step1-heading" className="text-2xl font-bold">
            Which mess looks most like yours?
          </h1>
          <p className="mt-2 text-slate-600">Pick the one closest to your cabinet.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {MESS_TYPES.map((mess) => (
              <MessTypeCard
                key={mess.id}
                messType={mess}
                onSelect={handleMessSelect}
                selected={messTypeId === mess.id}
              />
            ))}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section aria-labelledby="step2-heading">
          <h1 id="step2-heading" className="text-2xl font-bold">
            What would make it better?
          </h1>
          <p className="mt-2 text-slate-600">Pick the goal that matters most right now.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {GOALS.map((g) => (
              <GoalCard key={g.id} goal={g} onSelect={handleGoalSelect} selected={goalId === g.id} />
            ))}
          </div>
          <div className="mt-6">
            <CTAButton variant="secondary" onClick={() => setStep(1)}>
              Back
            </CTAButton>
          </div>
        </section>
      ) : null}

      {step === 3 && messType && goal ? (
        <section aria-labelledby="step3-heading">
          <h1 id="step3-heading" className="sr-only">
            Your reset plan
          </h1>
          <ResultSummary messType={messType} goal={goal} />
          <div className="mt-8">
            <CTAButton variant="secondary" onClick={() => setStep(2)}>
              Change my goal
            </CTAButton>
          </div>
        </section>
      ) : null}
    </div>
  );
}
