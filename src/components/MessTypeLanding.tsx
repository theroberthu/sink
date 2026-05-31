import Link from "next/link";
import { Ruler, Users } from "lucide-react";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { CTALink } from "@/components/CTAButton";
import { CTASection } from "@/components/CTASection";
import { Badge } from "@/components/Badge";
import { MESS_ICONS } from "@/components/messIcons";
import { getProductsForMessType } from "@/data/products";
import type { MessType } from "@/lib/types";

// Shared layout for the three mess type SEO pages. Server rendered for crawlability.
export function MessTypeLanding({ messType }: { messType: MessType }) {
  const products = getProductsForMessType(messType.id, messType.components);
  const Icon = MESS_ICONS[messType.id];

  return (
    <>
      {/* Hero */}
      <section className="px-4 pb-6 pt-14 sm:pt-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <Badge tone="accent">Under sink mess type</Badge>
          </div>
          <h1 className="type-display mt-4 max-w-3xl">{messType.name}</h1>
          <p className="type-body mt-5 max-w-2xl text-lg">{messType.shortDescription}</p>
          <div className="mt-8">
            <CTALink href="/tool">Find My Cabinet Fix</CTALink>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <Section>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="type-card-title">Who it is for</h2>
          </div>
          <p className="mt-3 leading-relaxed text-foreground/85">{messType.whoFor}</p>
          <p className="mt-3 text-sm text-muted-foreground">{messType.diagnosis}</p>
        </div>
      </Section>

      {/* Recommended setup */}
      <Section eyebrow="The reset" title="The recommended 3 piece setup" muted>
        <div className="grid gap-5 sm:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} step={index + 1} />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Run the{" "}
          <Link href="/tool" className="font-medium text-primary underline underline-offset-2">
            interactive tool
          </Link>{" "}
          to confirm this is your mess and tailor it to your goal.
        </p>
      </Section>

      {/* Fit considerations */}
      <Section eyebrow="Fit first" title="Fit considerations">
        <div className="rounded-2xl border border-warning/40 bg-warning/10 p-6 sm:p-8">
          <ol className="grid gap-3 sm:grid-cols-3">
            {messType.fitConsiderations.map((item, index) => (
              <li key={item} className="flex items-start gap-2 rounded-xl bg-card/70 p-3 text-sm font-medium">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning/30 text-xs font-bold">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
          <Link
            href="/under-sink-organizer-measurement-guide"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2"
          >
            <Ruler className="h-4 w-4" aria-hidden="true" />
            See the full measurement guide
          </Link>
        </div>
      </Section>

      <CTASection
        title={`Ready to fix your ${messType.name.toLowerCase()}?`}
        subtitle="Get your tailored 3 piece reset in under a minute."
        ctaHref="/tool"
        ctaLabel="Find My Cabinet Fix"
      />
    </>
  );
}
