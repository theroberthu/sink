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
import { getSetupPicks } from "@/data/products";
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

// Early waitlist members may receive this credit on the first batch.
const FIRST_BATCH_CREDIT = 10;

// Shown when no product is available for a role. Keeps exactly 3 roles visible.
function UnavailableProductCard({ role, step }: { role: ProductRole; step: number }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-card p-6 text-card-foreground">
      <div className="flex items-center justify-between gap-2">
        <Badge tone="muted">{role}</Badge>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
          {step}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold">Temporarily unavailable</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        We are finding a better pick for this part of the setup.
      </p>
    </article>
  );
}

// Fix section of the continuous tool workspace: one curated 3 piece setup. The goal
// is chosen above this in ToolFlow. Honest that V1 uses affiliate links for products.
export function ResultSummary({ messType, goal }: ResultSummaryProps) {
  const [showEmail, setShowEmail] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const picks = getSetupPicks(messType.id);
  const messImage = getMessImage(messType.id);
  const resultType = `${messType.id}__${goal.id}`;

  // First-batch kit economics. Only valid when all 3 roles have an available
  // product with an estimated price. Shown only when the separate-piece total is
  // above the kit target.
  const allPriced =
    picks.length === 3 && picks.every((p) => p.product?.estimatedPriceNumber != null);
  const separatePieceTotal = allPriced
    ? picks.reduce((sum, p) => sum + (p.product?.estimatedPriceNumber ?? 0), 0)
    : null;
  const kitTargetPrice = messType.kitTargetPrice;
  const firstBatchCredit = FIRST_BATCH_CREDIT;
  const potentialFirstBatchPrice = kitTargetPrice - firstBatchCredit;
  const potentialSavings =
    separatePieceTotal != null ? separatePieceTotal - potentialFirstBatchPrice : null;
  const showSavings = separatePieceTotal != null && separatePieceTotal > kitTargetPrice;
  const savings =
    showSavings && separatePieceTotal != null && potentialSavings != null
      ? {
          separatePieceTotal,
          kitTargetPrice,
          firstBatchCredit,
          potentialFirstBatchPrice,
          potentialSavings,
        }
      : null;

  // Fire result_viewed once when the fix section appears for this mess type.
  useEffect(() => {
    track("result_viewed", {
      mess_type: messType.id,
      goal: goal.id,
      result_type: `${messType.id}__${goal.id}`,
    });
    void recordSession({
      messType: messType.id,
      goal: goal.id,
      resultType: `${messType.id}__${goal.id}`,
    });
    // Intentionally keyed on mess type only so changing the goal does not refire.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messType.id]);

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
            <p className="mt-3 text-xl font-semibold text-foreground">{messType.setupName}</p>
            <p className="mt-1 text-sm text-muted-foreground">Best for: {messType.bestFor}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Start with these 3 pieces. Shop them separately today or join the waitlist for a ready
              to go kit.
            </p>
          </div>
        </div>

        {/* Three component cards: Access, Protection, Control. Always exactly 3 roles. */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {picks.map(({ role, product }) => {
            const Icon = ROLE_ICON[role];
            return (
              <div key={role} className="rounded-xl border border-border bg-cream p-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{role}</span>
                </div>
                {product ? (
                  <>
                    <p className="mt-3 font-semibold">{product.componentType}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{product.reason}</p>
                  </>
                ) : (
                  <>
                    <p className="mt-3 font-semibold">Temporarily unavailable</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We are finding a better pick for this part of the setup.
                    </p>
                  </>
                )}
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
        <h3 className="type-section-title">Shop your 3 piece setup</h3>

        <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Some product links may earn us a commission at no extra cost to you.
        </p>

        <div className="mt-5 hidden gap-5 md:grid md:grid-cols-3">
          {picks.map(({ role, product }, index) =>
            product ? (
              <ProductCard
                key={role}
                product={product}
                step={index + 1}
                setupName={messType.setupName}
                messType={messType.id}
                goal={goal.id}
              />
            ) : (
              <UnavailableProductCard key={role} role={role} step={index + 1} />
            ),
          )}
        </div>

        <div className="mt-5 md:hidden">
          <Carousel label="The 3 pieces" slideWidth="peek">
            {picks.map(({ role, product }, index) =>
              product ? (
                <ProductCard
                  key={role}
                  product={product}
                  step={index + 1}
                  setupName={messType.setupName}
                  messType={messType.id}
                  goal={goal.id}
                />
              ) : (
                <UnavailableProductCard key={role} role={role} step={index + 1} />
              ),
            )}
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
            <EmailCaptureForm messType={messType.id} goal={goal.id} resultType={resultType} />
          </div>
        ) : null}
      </div>

      <FitCheck />

      {/* Kit waitlist section with the first-batch credit model */}
      <div ref={waitlistRef} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h3 className="type-section-title">Want this as one kit?</h3>

        {showSavings && separatePieceTotal != null && potentialSavings != null ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This setup is about ${separatePieceTotal} when bought separately. Join the waitlist and
              get first-batch pricing around ${potentialFirstBatchPrice} if we launch this kit.
            </p>
            <dl className="mt-4 grid gap-2 sm:max-w-sm">
              <div className="flex items-center justify-between rounded-lg bg-cream px-4 py-2.5 text-sm">
                <dt className="text-muted-foreground">Separate-piece estimate</dt>
                <dd className="font-semibold">${separatePieceTotal}</dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-cream px-4 py-2.5 text-sm">
                <dt className="text-muted-foreground">Waitlist credit</dt>
                <dd className="font-semibold">${firstBatchCredit}</dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-cream px-4 py-2.5 text-sm">
                <dt className="text-muted-foreground">First-batch price</dt>
                <dd className="font-semibold">${potentialFirstBatchPrice}</dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-sage px-4 py-2.5 text-sm">
                <dt className="font-medium">Potential savings</dt>
                <dd className="font-semibold text-primary">${potentialSavings}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              Prices are estimates based on our last product review and may change.
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We are testing a ready to go kit so you do not have to buy the pieces separately.
          </p>
        )}

        <div className="mt-5">
          <WaitlistForm
            messType={messType.id}
            goal={goal.id}
            bare
            submitLabel="Get Early Access"
            firstBatchPrice={showSavings ? potentialFirstBatchPrice : null}
            savings={savings}
          />
        </div>
      </div>
    </div>
  );
}
