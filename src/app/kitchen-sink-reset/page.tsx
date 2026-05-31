import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { MessTypeCard } from "@/components/MessTypeCard";
import { FAQSection } from "@/components/FAQSection";
import { CTALink } from "@/components/CTAButton";
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

      <Section className="pt-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Kitchen Sink Cabinet Reset Plan
          </h1>
          <p className="mt-4 text-lg text-slate-600">{SITE.description}</p>
          <div className="mt-8">
            <CTALink href="/tool">Find My Cabinet Fix</CTALink>
          </div>
        </div>
      </Section>

      <Section title="What is a kitchen sink reset?" muted>
        <div className="max-w-2xl space-y-4 text-slate-700">
          <p>
            A kitchen sink reset is a quick under sink cleanup. You pick the mess that looks like
            yours, then add three simple pieces that fix it. No full kitchen overhaul and no twenty
            part system.
          </p>
          <p>
            The goal is a cabinet you can actually use. You open the door, you see your stuff, and
            you grab what you need without knocking three bottles over.
          </p>
        </div>
      </Section>

      <Section title="The 3 common under sink mess types">
        <div className="grid gap-6 sm:grid-cols-3">
          {MESS_TYPES.map((messType) => (
            <MessTypeCard key={messType.id} messType={messType} />
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-600">
          Not sure which one you are? The{" "}
          <Link href="/tool" className="font-medium text-blue-700 underline">
            interactive tool
          </Link>{" "}
          walks you through it.
        </p>
      </Section>

      <Section title="The 3 piece reset method" muted>
        <div className="max-w-2xl space-y-4 text-slate-700">
          <p>Every reset uses the same simple shape, just tuned to your mess.</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong>Reach.</strong> Something that pulls your stuff to the front so the back row
              stops swallowing bottles.
            </li>
            <li>
              <strong>Use the space.</strong> A piece that fits your actual layout, whether that is
              pipes in the middle or a tiny footprint.
            </li>
            <li>
              <strong>Protect the base.</strong> A waterproof liner so a slow drip is never a
              project.
            </li>
          </ol>
        </div>
      </Section>

      <Section title="Quick measurement checklist">
        <div className="max-w-2xl space-y-4 text-slate-700">
          <p>Before you buy, measure three things so the pieces actually fit.</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Cabinet width</li>
            <li>Cabinet depth</li>
            <li>Pipe or garbage disposal location</li>
          </ol>
          <p>
            Want the full walkthrough? Read the{" "}
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

      <FAQSection items={KITCHEN_SINK_RESET_FAQ} />

      <Section>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold">Get your 3 piece reset plan</h2>
          <p className="mt-2 text-slate-600">It takes under a minute.</p>
          <div className="mt-6 flex justify-center">
            <CTALink href="/tool">Find My Cabinet Fix</CTALink>
          </div>
        </div>
      </Section>
    </>
  );
}
