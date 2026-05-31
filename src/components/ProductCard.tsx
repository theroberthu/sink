"use client";

import { Card } from "@/components/Card";
import { trackProductClick } from "@/lib/tracking";
import type { GoalId, MessTypeId, Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** Context for click tracking. Optional so the card can render on content pages too. */
  messType?: MessTypeId;
  goal?: GoalId;
}

// Product recommendation card. Clicking View Product fires tracking, then opens the link.
export function ProductCard({ product, messType, goal }: ProductCardProps) {
  async function handleClick() {
    // Fire and forget tracking. We open the link regardless so the user is never blocked.
    if (messType && goal) {
      void trackProductClick({
        messType,
        goal,
        componentType: product.componentType,
        productName: product.productName,
        retailer: product.retailer,
        affiliateUrl: product.affiliateUrl,
      });
    }
    window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Card as="article" className="flex h-full flex-col">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        {product.componentType}
      </p>
      <h3 className="mt-1 text-lg font-bold">{product.productName}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{product.reason}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-semibold">{product.price}</span>
        <span className="text-slate-500">{product.retailer}</span>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        View Product
      </button>
    </Card>
  );
}
