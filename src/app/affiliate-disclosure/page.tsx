import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How Sink Cabinet Fix earns from product links.",
};

export default function AffiliateDisclosurePage() {
  return (
    <Section title="Affiliate Disclosure" className="pt-12">
      <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Some product links may earn us a commission at no extra cost to you. We recommend products
          based on fit, usefulness, and availability.
        </p>
        <p>
          A commission helps us keep the site running and keep building better reset plans. It never
          changes the price you pay, and it does not change which products we think are the right
          fit for your cabinet.
        </p>
      </div>
    </Section>
  );
}
