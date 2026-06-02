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
import type { Goal, MessType, ProductRole } from "@/lib/types";

interface ResultSummaryProps {
  messType: MessType;
  goal: Goal;
}

const ROLE_ICON: Record<ProductRole, typeof ArrowDownToLine> = {
  Access: ArrowDownToLine,
  Protection: ShieldCheck,
  Control: LayoutGrid,
};

// Result page: one curated 3 piece setup, honest that V1 uses affiliate links for
// individual products. Setup overview, product cards, and a kit waitlist.
export function ResultSummary({ messType, goal }: ResultSummaryProps) {
  const [showEmail, setShowEmail] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const products = getProductsForMessType(messType.id, messType.components);
  const messImage = getMessImage(messType.id);
  const resultType = `${messType.id}__${goal.id}`;

  useEffect(() => {
    track("result_viewed", { mess_type: messType.id, goal: goal.id, result_type: resultType });
    void recordSession({ messType: messType.id, goal: goal.id, resultType });
  }, [messType.id, goal.id, resultType]);

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-8">
      {/* 1 to 5: curated setup overview */}
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

        {/* Three component cards: Access, Protection, Control */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {products.map((product) => {
            const Icon = ROLE_ICON[product.role];
            return (
              <div
                key={product.id}
                className="rounded-xl border border-border bg-cream p-5"
              >
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

      {/* 6: product cards section */}
      <div ref={productsRef}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="type-section-title">Shop the pieces</h3>
          <span className="type-small">No judgment. We have seen worse.</span>
        </div>

        <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Some product links may earn us a commission at no extra cost to you.
        </p>

        <div className="mt-5 hidden gap-5 sm:grid sm:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              step={index + 1}
              setupName={messType.setupName}
              messType={messType.id}
              goal={goal.id}
            />
          ))}
        </div>

        <div className="mt-5 sm:hidden">
          <Carousel label="The 3 pieces" slideWidth="peek">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                step={index + 1}
                setupName={messType.setupName}
                messType={messType.id}
                goal={goal.id}
              />
            ))}
          </Carousel>
        </div>

        {/* 7 and 8: secondary and tertiary CTAs */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CTAButton
            variant="secondary"
            className="flex-1"
            onClick={() => setShowEmail((open) => !open)}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            Send Me This Plan
          </CTAButton>
          <CTAButton variant="secondary" className="flex-1" onClick={() => scrollTo(waitlistRef)}>
            <PackageOpen className="h-5 w-5" aria-hidden="true" />
            Want it as one kit?
          </CTAButton>
        </div>

        {showEmail ? (
          <div className="mt-4">
            <EmailCaptureForm messType={messType.id} goal={goal.id} resultType={resultType} />
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
          <WaitlistForm messType={messType.id} goal={goal.id} bare />
        </div>
      </div>
    </div>
  );
}
