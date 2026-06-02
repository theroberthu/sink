"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { MessTypeCard } from "@/components/MessTypeCard";
import { ResultSummary } from "@/components/ResultSummary";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Carousel } from "@/components/Carousel";
import { track } from "@/lib/analytics";
import { MESS_TYPES, getMessType } from "@/data/messTypes";
import type { MessTypeId } from "@/lib/types";

type Step = 1 | 2;

const STEP_LABELS = ["Mess", "Fix"];

// Two step guided flow: pick a mess type, then see the fix. The goal selector now
// lives on the fix page so the flow is one decision shorter. Exactly 3 mess choices.
export function ToolFlow() {
  const [step, setStep] = useState<Step>(1);
  const [messTypeId, setMessTypeId] = useState<MessTypeId | null>(null);

  function handleMessSelect(id: MessTypeId) {
    setMessTypeId(id);
    track("mess_type_selected", { mess_type: id });
    setStep(2);
  }

  const messType = messTypeId ? getMessType(messTypeId) : undefined;

  return (
    <div>
      <div className="mb-10">
        <ProgressIndicator current={step} steps={STEP_LABELS} />
      </div>

      {step === 1 ? (
        <section aria-labelledby="step1-heading">
          <p className="type-caption text-primary">Step 1 of 2</p>
          <h1 id="step1-heading" className="type-page-title mt-1">
            Pick your mess.
          </h1>
          <p className="type-body mt-2">Closest match is good enough.</p>

          {/* Desktop: three card grid. Mobile: swipeable carousel. Only one shows per breakpoint. */}
          <div className="mt-7 hidden gap-5 md:grid md:grid-cols-3">
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

          <div className="mt-7 md:hidden">
            <Carousel label="Cabinet mess types" slideWidth="peek">
              {MESS_TYPES.map((mess) => (
                <MessTypeCard
                  key={mess.id}
                  messType={mess}
                  onSelect={handleMessSelect}
                  selected={messTypeId === mess.id}
                  compact
                />
              ))}
            </Carousel>
            <p className="mt-3 text-center text-xs text-muted-foreground">Swipe to compare</p>
          </div>
        </section>
      ) : null}

      {step === 2 && messType ? (
        <section aria-labelledby="step2-heading">
          <h1 id="step2-heading" className="sr-only">
            Your reset plan
          </h1>
          <ResultSummary messType={messType} />
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Change my mess
          </button>
        </section>
      ) : null}
    </div>
  );
}
