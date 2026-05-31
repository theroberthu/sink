import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Under Sink Organizer Measurement Guide",
  description:
    "Measure your under sink cabinet the right way before you buy. Width, depth, and pipe location in three quick steps so your organizer actually fits.",
  alternates: { canonical: "/under-sink-organizer-measurement-guide" },
};

const STEPS = [
  {
    title: "1. Cabinet width",
    body: "Open the doors and measure the inside opening left to right at the widest point. Watch for hinges and the center divider that can steal an inch on each side.",
  },
  {
    title: "2. Cabinet depth",
    body: "Measure from the front edge straight back to the rear wall. Most organizers want a little breathing room, so do not plan to fill the last inch.",
  },
  {
    title: "3. Pipe or garbage disposal location",
    body: "Note where the drain pipe drops and whether a garbage disposal bulges into the space. If the plumbing sits dead center, plan for pieces that work around it.",
  },
];

export default function MeasurementGuidePage() {
  return (
    <>
      <Section className="pt-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Under Sink Organizer Measurement Guide
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Three quick measurements save you from the return pile. Grab a tape measure and check
            these before you buy anything.
          </p>
        </div>
      </Section>

      <Section muted>
        <div className="space-y-6">
          {STEPS.map((step) => (
            <div key={step.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold">{step.title}</h2>
              <p className="mt-2 text-slate-700">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl space-y-3 text-slate-700">
          <h2 className="text-2xl font-bold">One more tip</h2>
          <p>
            If pipes block the middle of your cabinet, do not force a wide organizer in there.
            Choose the Pipe Maze setup, which uses narrow side pieces built for that layout.
          </p>
        </div>
        <div className="mt-8">
          <CTALink href="/tool">Find My Cabinet Fix</CTALink>
        </div>
      </Section>
    </>
  );
}
