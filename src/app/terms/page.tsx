import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using Sink Cabinet Fix.",
};

export default function TermsPage() {
  return (
    <Section title="Terms of Use" className="pt-12">
      <div className="max-w-2xl space-y-4 text-slate-700">
        <p>
          This is a placeholder terms of use page for Sink Cabinet Fix. We will replace it with full
          legal copy before launch.
        </p>
        <p>
          Our recommendations are suggestions based on fit, usefulness, and availability. Always
          measure your cabinet and confirm product details before you buy.
        </p>
        <p>
          We provide this site as is. We are not responsible for products purchased from third party
          retailers through links on this site.
        </p>
        <p>Last updated: placeholder date.</p>
      </div>
    </Section>
  );
}
