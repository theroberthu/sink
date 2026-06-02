"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ShieldCheck, LayoutGrid, Info, Mail, PackageOpen, ShoppingBag } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { ProductCard } from "@/components/ProductCard";
import { FitCheck } from "@/components/FitCheck";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Badge } from "@/components/Badge";
import { AssetImage } from "@/components/AssetImage";
import { Carousel } from "@/components/Carousel";
import { getMessImage } from "@/lib/images";
import { track } from "@/lib/analytics";
import { recordSession } from "@/lib/tracking";
import { getProductsForMessType } from "@/data/products";
import { GOALS } from "@/data/goals";
import type { GoalId, MessType, ProductRole } from "@/lib/types";

interface ResultSummaryProps {
  messType: MessType;
}

const ROLE_ICON: Record<ProductRole, typeof ArrowDownToLine> = {
  Access: ArrowDownToLine,
  Protection: ShieldCheck,
  Control: LayoutGrid,
};

const DEFAULT_GOAL: GoalId = "easy-reach";

// Result page: one curated 3 piece setup with a compact goal selector near the top.
// Changing the goal updates state and tracking without navigating away. Honest that
// V1 uses affiliate links for individual products.
export function ResultSummary({ messType }: ResultSummaryProps) {
  const [goalId, setGoalId] = useState<GoalId>(DEFAULT_GOAL);
  const [showEmail, setShowEmail] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const products = getProductsForMessType(messType.id, messType.components);
  const messImage = getMessImage(messType.id);
  const goal = GOALS.find((g) => g.id === goalId) ?? GOALS[0];
  const resultType = `${messType.id}__${goalId}`;

  // Fire result_viewed once when the fix page loads for this mess type.
  useEffect(() => {
    track("result_viewed", { mess_type: messType.id, goal: DEFAULT_GOAL, result_type: `${messType.id}__${DEFAULT_GOAL}` });
    void recordSession({ messType: messType.id, goal: DEFAULT_GOAL, resultType: `${messType.id}__${DEFAULT_GOAL}` });
  }, [messType.id]);

  function handleGoalChange(id: GoalId) {
    if (id === goalId) return;
    setGoalId(id);
    track("goal_selected", { goal: id, mess_type: messType.id });
  }

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-8">
      {/* Curated setup overview */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <AssetImage
            asset={messImage}
            className="aspect-[4/3] w-full shrink-0 rounded-xl sm:w-40"
            sizes="(min-width: 640px) 10rem, 90vw"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{messType.name}</Badge>
              <Badge tone="primary">{goal.name}</Badge>
            </div>
            <h2 className="type-page-title mt-3">Your 3 Piece Fix</h2>
            <p className="mt-2 text-lg font-semibold text-foreground">{messType.setupName}</p>
            <p className="mt-1 text-sm text-muted-foreground">Best for: {messType.bestFor}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Buy the pieces separately today. Join the waitlist if you want this as one ready to go
              kit.
            </p>
          </div>
        </div>

        {/* Compact goal selector. Changing it updates state and tracking, no navigation. */}
        <fieldset className="mt-6">
          <legend className="type-label">What matters most?</legend>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {GOALS.map((g) => {
              const active = g.id === goalId;
              return (
                <label
                  key={g.id}
                  className={[
                    "flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-center text-sm font-medium transition-colors",
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
                  {g.name}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Three component cards: Access, Protection, Control */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {products.map((product) => {
            const Icon = ROLE_ICON[product.role];
            return (
              <div key={product.id} className="rounded-xl border border-border bg-cream p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{product.role}</span>
                </div>
                <p className="mt-3 font-semibold">{product.componentType}</p>
                <p className="mt-1 text-sm text-muted-foreground">{product.reason}</p>
              </div>
            );
          })}
        </div>

        <CTAButton onClick={() => scrollTo(productsRef)} className="mt-6 w-full sm:w-auto">
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          Shop the 3 Piece Setup
        </CTAButton>
      </div>

      {/* Product cards section */}
      <div ref={productsRef}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="type-section-title">Shop the pieces</h3>
          <span className="type-small">No judgment. We have seen worse.</span>
        </div>

        <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Some product links may earn us a commission at no extra cost to you.
        </p>

        <div className="mt-5 hidden gap-5 md:grid md:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              step={index + 1}
              setupName={messType.setupName}
              messType={messType.id}
              goal={goalId}
            />
          ))}
        </div>

        <div className="mt-5 md:hidden">
          <Carousel label="The 3 pieces" slideWidth="peek">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                step={index + 1}
                setupName={messType.setupName}
                messType={messType.id}
                goal={goalId}
              />
            ))}
          </Carousel>
        </div>

        {/* Secondary and tertiary CTAs. Full width on mobile. */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CTAButton
            variant="secondary"
            className="w-full sm:flex-1"
            onClick={() => setShowEmail((open) => !open)}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            Send Me This Plan
          </CTAButton>
          <CTAButton
            variant="secondary"
            className="w-full sm:flex-1"
            onClick={() => scrollTo(waitlistRef)}
          >
            <PackageOpen className="h-5 w-5" aria-hidden="true" />
            Want it as one kit?
          </CTAButton>
        </div>

        {showEmail ? (
          <div className="mt-4">
            <EmailCaptureForm messType={messType.id} goal={goalId} resultType={resultType} />
          </div>
        ) : null}
      </div>

      <FitCheck />

      {/* Kit waitlist section */}
      <div ref={waitlistRef} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h3 className="type-section-title">Want this as one box?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We are testing ready to go Sink Cabinet Fix kits so you do not have to buy the pieces
          separately.
        </p>
        <div className="mt-5">
          <WaitlistForm messType={messType.id} goal={goalId} bare />
        </div>
      </div>
    </div>
  );
}
