"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, PackageOpen, ShoppingBag, Sparkles } from "lucide-react";
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
  const messImage = getMessImage(messType.id);
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
      {/* Diagnosis with a small before style thumbnail of the selected mess */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <AssetImage
            asset={messImage}
            className="aspect-[4/3] w-full shrink-0 rounded-xl sm:w-40"
            sizes="(min-width: 640px) 10rem, 90vw"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{messType.name}</Badge>
              <Badge tone="primary">{goal.name}</Badge>
            </div>
            <h2 className="type-page-title mt-3 flex items-start gap-2">
              <Sparkles className="mt-1 h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
              Three pieces. One calmer cabinet.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {messType.diagnosis}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your goal is {goal.name.toLowerCase()}: {goal.description.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* 3 piece setup. Grid on desktop, swipe on mobile. */}
      <div ref={productsRef}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="type-section-title">Your 3 piece setup</h3>
          <span className="type-small">No judgment. We have seen worse.</span>
        </div>

        <div className="mt-5 hidden gap-5 sm:grid sm:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              step={index + 1}
              messType={messType.id}
              goal={goal.id}
            />
          ))}
        </div>

        <div className="mt-5 sm:hidden">
          <Carousel label="Your 3 piece setup" slideWidth="peek">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                step={index + 1}
                messType={messType.id}
                goal={goal.id}
              />
            ))}
          </Carousel>
        </div>
      </div>

      <FitCheck />

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <CTAButton onClick={scrollToProducts} className="flex-1">
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          Shop This 3 Piece Setup
        </CTAButton>
        <CTAButton
          variant="secondary"
          className="flex-1"
          onClick={() => setPanel(panel === "email" ? "none" : "email")}
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
          Send Me This Plan
        </CTAButton>
        <CTAButton
          variant="secondary"
          className="flex-1"
          onClick={() => setPanel(panel === "waitlist" ? "none" : "waitlist")}
        >
          <PackageOpen className="h-5 w-5" aria-hidden="true" />
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
