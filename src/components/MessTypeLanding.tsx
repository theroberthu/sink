import Link from "next/link";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { CTALink } from "@/components/CTAButton";
import { getProductsForMessType } from "@/data/products";
import type { MessType } from "@/lib/types";

// Shared layout for the three mess type SEO pages. Server rendered for crawlability.
export function MessTypeLanding({ messType }: { messType: MessType }) {
  const products = getProductsForMessType(messType.id, messType.components);

  return (
    <>
      <Section className="pt-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Under sink mess type
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {messType.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{messType.shortDescription}</p>
          <p className="mt-4 text-slate-700">{messType.diagnosis}</p>
          <div className="mt-8">
            <CTALink href="/tool">Find My Cabinet Fix</CTALink>
          </div>
        </div>
      </Section>

      <Section title="The recommended 3 piece setup" muted>
        <div className="grid gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-600">
          Run the{" "}
          <Link href="/tool" className="font-medium text-blue-700 underline">
            interactive tool
          </Link>{" "}
          to confirm this is your mess and tailor it to your goal.
        </p>
      </Section>

      <Section title="Before you buy">
        <div className="max-w-2xl space-y-3 text-slate-700">
          <p>Measure three things so the pieces fit your cabinet.</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Cabinet width</li>
            <li>Cabinet depth</li>
            <li>Pipe or garbage disposal location</li>
          </ol>
          <p>
            See the full{" "}
            <Link
              href="/under-sink-organizer-measurement-guide"
              className="font-medium text-blue-700 underline"
            >
              measurement guide
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
