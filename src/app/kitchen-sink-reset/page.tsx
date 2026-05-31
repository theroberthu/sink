import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Ruler } from "lucide-react";
import { Section } from "@/components/Section";
import { MessTypeCard } from "@/components/MessTypeCard";
import { FAQSection } from "@/components/FAQSection";
import { CTALink } from "@/components/CTAButton";
import { CTASection } from "@/components/CTASection";
import { Badge } from "@/components/Badge";
import { MESS_TYPES } from "@/data/messTypes";
import { KITCHEN_SINK_RESET_FAQ } from "@/data/faq";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kitchen Sink Cabinet Reset Plan",
  description:
    "Pick your under sink mess type and get a simple 3 piece kitchen sink reset plan for bottles, pipes, garbage disposal layouts, and small cabinets.",
  alternates: { canonical: "/kitchen-sink-reset" },
};

// FAQPage JSON-LD built from the same data the page renders.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: KITCHEN_SINK_RESET_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function KitchenSinkResetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Server rendered so crawlers see the structured data without running JS.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="px-4 pb-6 pt-14 sm:pt-20">
        <div className="mx-auto w-full max-w-5xl">
          <Badge tone="primary">Kitchen sink reset</Badge>
          <h1 className="type-display mt-4 max-w-3xl">Kitchen Sink Cabinet Reset Plan</h1>
          <p className="type-body mt-5 max-w-2xl text-lg">{SITE.description}</p>
          <div className="mt-8">
            <CTALink href="/tool">Find My Cabinet Fix</CTALink>
          </div>
        </div>
      </section>

      {/* Direct answer box */}
      <Section>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="type-card-title">What is a kitchen sink reset?</h2>
          </div>
          <p className="mt-3 leading-relaxed text-foreground/85">
            A kitchen sink reset is a quick under sink cleanup. You pick the mess that looks like
            yours, then add three simple pieces: one to reach your stuff, one that fits your
            layout, and a waterproof liner to protect the base. No full kitchen overhaul and no
            twenty part system.
          </p>
        </div>
      </Section>

      {/* Mess types */}
      <Section
        eyebrow="Three types"
        title="The 3 common under sink mess types"
        muted
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {MESS_TYPES.map((messType) => (
            <MessTypeCard key={messType.id} messType={messType} />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Not sure which one you are? The{" "}
          <Link href="/tool" className="font-medium text-primary underline underline-offset-2">
            interactive tool
          </Link>{" "}
          walks you through it.
        </p>
      </Section>

      {/* 3 piece method */}
      <Section eyebrow="The method" title="The 3 piece reset method">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { title: "Reach", body: "Something that pulls your stuff to the front so the back row stops swallowing bottles." },
            { title: "Use the space", body: "A piece that fits your actual layout, whether that is pipes in the middle or a tiny footprint." },
            { title: "Protect the base", body: "A waterproof liner so a slow drip is never a project." },
          ].map((item, index) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <h3 className="mt-4 font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Measurement checklist */}
      <Section eyebrow="Fit first" title="Quick measurement checklist" muted>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <ol className="grid gap-3 sm:grid-cols-3">
            {["Cabinet width", "Cabinet depth", "Pipe or garbage disposal location"].map(
              (item, index) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ),
            )}
          </ol>
          <Link
            href="/under-sink-organizer-measurement-guide"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2"
          >
            <Ruler className="h-4 w-4" aria-hidden="true" />
            Read the full measurement guide
          </Link>
        </div>
      </Section>

      <FAQSection items={KITCHEN_SINK_RESET_FAQ} />

      <CTASection
        title="Get your 3 piece reset plan"
        subtitle="It takes under a minute."
        ctaHref="/tool"
        ctaLabel="Find My Cabinet Fix"
      />
    </>
  );
}
