"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/Badge";
import { trackProductClick } from "@/lib/tracking";
import type { GoalId, MessTypeId, Product, ProductRole } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** Optional step number for the 1 of 3 setup layout. */
  step?: number;
  /** Bundle setup name, sent with the click event. */
  setupName?: string;
  /** Context for click tracking. Optional so the card can render on content pages too. */
  messType?: MessTypeId;
  goal?: GoalId;
}

const ROLE_TONE: Record<ProductRole, "primary" | "success" | "accent"> = {
  Access: "primary",
  Protection: "success",
  Control: "accent",
};

// Product recommendation card. Clicking the view button fires tracking, then opens
// the single affiliate link. One tab only, never multiple.
export function ProductCard({ product, step, setupName, messType, goal }: ProductCardProps) {
  async function handleClick() {
    // Fire and forget tracking. We open the link regardless so the user is never blocked.
    if (messType && goal) {
      void trackProductClick({
        messType,
        goal,
        setupName: setupName ?? "",
        role: product.role,
        componentType: product.componentType,
        productName: product.productName,
        retailer: product.retailer,
        affiliateUrl: product.affiliateUrl,
      });
    }
    window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground transition-colors duration-150 hover:border-foreground/20">
      <div className="flex items-center justify-between gap-2">
        <Badge tone={ROLE_TONE[product.role]}>{product.role}</Badge>
        {step ? (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
            {step}
          </span>
        ) : null}
      </div>
      <p className="type-caption mt-4">{product.componentType}</p>
      <h3 className="mt-1 text-lg font-semibold tracking-[-0.01em]">{product.productName}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.reason}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-base font-semibold">{product.price}</span>
        <span className="text-muted-foreground">{product.retailer}</span>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary-hover"
      >
        {product.viewLabel}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  );
}
