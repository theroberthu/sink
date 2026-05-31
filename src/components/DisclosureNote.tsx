import { Info } from "lucide-react";

const AFFILIATE_NOTE =
  "Some product links may earn us a commission at no extra cost to you. We recommend products based on fit, usefulness, and availability.";

// Reusable affiliate disclosure note. Used in the footer and near product cards.
export function DisclosureNote({ className }: { className?: string }) {
  return (
    <p
      className={`flex items-start gap-2 text-sm text-muted-foreground ${className ?? ""}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{AFFILIATE_NOTE}</span>
    </p>
  );
}
