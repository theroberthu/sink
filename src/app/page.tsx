import { Clock, Boxes, Ruler } from "lucide-react";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTAButton";
import { TrackedCTALink } from "@/components/TrackedCTALink";
import { PageViewTracker } from "@/components/PageViewTracker";
import { HeroVisual } from "@/components/HeroVisual";
import { CTASection } from "@/components/CTASection";
import { Badge } from "@/components/Badge";
import { AssetImage } from "@/components/AssetImage";
import { Carousel } from "@/components/Carousel";
import { HomeMessCard } from "@/components/HomeMessCard";
import { COMPONENT_VISUALS } from "@/lib/images";
import { MESS_TYPES } from "@/data/messTypes";

// Compact benefit strip under the hero. Exactly 3 items.
const BENEFITS = [
  { icon: Clock, label: "Under 1 minute" },
  { icon: Boxes, label: "3 piece plan" },
  { icon: Ruler, label: "Quick fit check" },
];

// The 3 piece reset recipe. One short line per role.
const RECIPE: Record<string, string> = {
  access: "Pull things out.",
  protection: "Catch spills.",
  control: "Group daily items.",
};

export default function HomePage() {
  return (
    <>
      <PageViewTracker event="landing_page_viewed" />

      {/* Hero: two columns on desktop, stacked on mobile. Cabinet frame dominates. */}
      <section className="px-4 pb-6 pt-12 sm:pt-16">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div>
            <Badge tone="accent">Pick your mess. Get your fix.</Badge>
            <h1 className="type-display mt-4">Your sink cabinet should not fight back.</h1>
            <p className="type-body mt-5 text-lg">
              Pick your mess and get a 3 piece fix in under a minute.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedCTALink href="/tool" event="find_fix_clicked">
                Find My Cabinet Fix
              </TrackedCTALink>
              <CTALink href="#mess-types" variant="secondary">
                See the mess types
              </CTALink>
            </div>
            <p className="type-small mt-4">No judgment. We have seen worse.</p>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Compact benefit strip, exactly 3 items. */}
      <section className="px-4 pb-10">
        <div className="mx-auto w-full max-w-6xl">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Mess type section: diagnostic cards. Grid on desktop, swipe on mobile. */}
      <Section
        id="mess-types"
        eyebrow="Diagnose your cabinet"
        title="Which cabinet looks like yours?"
        description="Start with the mess you recognize."
      >
        {/* Desktop: three card grid. Mobile: swipeable carousel. Only one shows per breakpoint. */}
        <div className="hidden gap-5 md:grid md:grid-cols-3">
          {MESS_TYPES.map((messType, index) => (
            <HomeMessCard key={messType.id} messType={messType} index={index} />
          ))}
        </div>

        <div className="md:hidden">
          <Carousel label="Cabinet mess types" slideWidth="peek">
            {MESS_TYPES.map((messType, index) => (
              <HomeMessCard key={messType.id} messType={messType} index={index} />
            ))}
          </Carousel>
          <p className="mt-3 text-center text-xs text-muted-foreground">Swipe to compare</p>
        </div>
      </Section>

      {/* Your fix starts with 3 things: parts of one simple system. */}
      <Section
        eyebrow="The system"
        title="Your fix starts with 3 things"
        description="One piece for access. One for protection. One for control."
        muted
      >
        <ol className="grid gap-5 sm:grid-cols-3">
          {COMPONENT_VISUALS.map((item, index) => (
            <li
              key={item.key}
              className="relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <AssetImage
                asset={item.image}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 640px) 30vw, 90vw"
              />
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{RECIPE[item.key]}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="type-small mt-6">Three pieces. One calmer cabinet.</p>
      </Section>

      {/* Quick fit reminder. */}
      <Section>
        <div className="rounded-2xl border border-warning/40 bg-warning/10 p-6 sm:p-8">
          <h2 className="type-card-title">Quick fit reminder</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Before you buy anything, measure three things: cabinet width, cabinet depth, and where
            the pipes or garbage disposal sit. If pipes block the middle, choose Pipe Maze.
          </p>
          <CTALink
            href="/under-sink-organizer-measurement-guide"
            variant="secondary"
            className="mt-5"
          >
            Read the measurement guide
          </CTALink>
        </div>
      </Section>

      {/* CTA section */}
      <CTASection
        title="Ready to fix the chaos?"
        subtitle="Pick your mess and your goal. We will hand you a plan in under a minute."
        ctaHref="/tool"
        ctaLabel="Find My Cabinet Fix"
        ctaEvent="find_fix_clicked"
      />
    </>
  );
}
