import type { Metadata } from "next";
import { Ruler, ArrowDownToLine, Wrench, TriangleAlert } from "lucide-react";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Under Sink Organizer Measurement Guide",
  description:
    "Measure your under sink cabinet the right way before you buy. Width, depth, and pipe location in three quick steps so your organizer actually fits.",
  alternates: { canonical: "/under-sink-organizer-measurement-guide" },
};

const STEPS = [
  {
    icon: Ruler,
    title: "Cabinet width",
    body: "Open the doors and measure the inside opening left to right at the widest point. Watch for hinges and the center divider that can steal an inch on each side.",
  },
  {
    icon: ArrowDownToLine,
    title: "Cabinet depth",
    body: "Measure from the front edge straight back to the rear wall. Most organizers want a little breathing room, so do not plan to fill the last inch.",
  },
  {
    icon: Wrench,
    title: "Pipe or garbage disposal location",
    body: "Note where the drain pipe drops and whether a garbage disposal bulges into the space. If the plumbing sits dead center, plan for pieces that work around it.",
  },
];

export default function MeasurementGuidePage() {
  return (
    <>
      <section className="px-4 pb-6 pt-14 sm:pt-20">
        <div className="mx-auto w-full max-w-5xl">
          <Badge tone="primary">Measure first</Badge>
          <h1 className="type-display mt-4 max-w-3xl">Under Sink Organizer Measurement Guide</h1>
          <p className="type-body mt-5 max-w-2xl text-lg">
            Three quick measurements save you from the return pile. Grab a tape measure and check
            these before you buy anything.
          </p>
        </div>
      </section>

      <Section muted>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">Step {index + 1}</span>
                </div>
                <h2 className="type-card-title mt-4">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-warning/40 bg-warning/10 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 text-warning" aria-hidden="true" />
            <h2 className="type-card-title">One more tip</h2>
          </div>
          <p className="mt-2 leading-relaxed text-foreground/85">
            If pipes block the middle of your cabinet, do not force a wide organizer in there.
            Choose the Pipe Maze setup, which uses narrow side pieces built for that layout.
          </p>
        </div>
      </Section>

      <CTASection
        title="Measured up? Get your reset plan."
        subtitle="Pick your mess and goal for a 3 piece setup that fits."
        ctaHref="/tool"
        ctaLabel="Find My Cabinet Fix"
      />
    </>
  );
}
