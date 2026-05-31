"use client";

import { useEffect, useRef, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { ProductCard } from "@/components/ProductCard";
import { FitCheck } from "@/components/FitCheck";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { WaitlistForm } from "@/components/WaitlistForm";
import { track } from "@/lib/analytics";
import { recordSession } from "@/lib/tracking";
import { getProductsForMessType } from "@/data/products";
import type { Goal, MessType } from "@/lib/types";

interface ResultSummaryProps {
  messType: MessType;
  goal: Goal;
}

// Result page body: diagnosis, exactly 3 product components, fit check, and CTAs.
export function ResultSummary({ messType, goal }: ResultSummaryProps) {
  const [panel, setPanel] = useState<"none" | "email" | "waitlist">("none");
  const productsRef = useRef<HTMLDivElement>(null);

  const products = getProductsForMessType(messType.id, messType.components);
  const resultType = `${messType.id}__${goal.id}`;

  useEffect(() => {
    track("result_viewed", { mess_type: messType.id, goal: goal.id, result_type: resultType });
    void recordSession({ messType: messType.id, goal: goal.id, resultType });
  }, [messType.id, goal.id, resultType]);

  function scrollToProducts() {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Your reset</p>
        <h2 className="mt-1 text-2xl font-bold">
          {messType.name} plus {goal.name}
        </h2>
        <p className="mt-3 text-slate-700">{messType.diagnosis}</p>
        <p className="mt-2 text-slate-600">
          Your goal is {goal.name.toLowerCase()}: {goal.description.toLowerCase()}
        </p>
      </div>

      <div ref={productsRef}>
        <h3 className="mb-4 text-xl font-bold">Your 3 piece setup</h3>
        <div className="grid gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              messType={messType.id}
              goal={goal.id}
            />
          ))}
        </div>
      </div>

      <FitCheck />

      <div className="flex flex-col gap-3 sm:flex-row">
        <CTAButton onClick={scrollToProducts}>Shop This 3 Piece Setup</CTAButton>
        <CTAButton
          variant="secondary"
          onClick={() => setPanel(panel === "email" ? "none" : "email")}
        >
          Send Me This Plan
        </CTAButton>
        <CTAButton
          variant="secondary"
          onClick={() => setPanel(panel === "waitlist" ? "none" : "waitlist")}
        >
          Join Kit Waitlist
        </CTAButton>
      </div>

      {panel === "email" ? (
        <EmailCaptureForm messType={messType.id} goal={goal.id} resultType={resultType} />
      ) : null}
      {panel === "waitlist" ? <WaitlistForm messType={messType.id} goal={goal.id} /> : null}
    </div>
  );
}
