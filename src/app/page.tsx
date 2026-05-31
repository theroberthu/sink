import { MousePointerClick, ListChecks, Sparkles, ShoppingBag } from "lucide-react";
import { Section } from "@/components/Section";
import { MessTypeCard } from "@/components/MessTypeCard";
import { CTALink } from "@/components/CTAButton";
import { TrackedCTALink } from "@/components/TrackedCTALink";
import { PageViewTracker } from "@/components/PageViewTracker";
import { HeroVisual } from "@/components/HeroVisual";
import { CTASection } from "@/components/CTASection";
import { Badge } from "@/components/Badge";
import { AssetImage } from "@/components/AssetImage";
import { COMPONENT_VISUALS } from "@/lib/images";
import { MESS_TYPES } from "@/data/messTypes";

const HOW_IT_WORKS = [
  { icon: MousePointerClick, title: "Pick your mess", body: "Choose the under sink scene that looks most like yours." },
  { icon: ListChecks, title: "Pick your goal", body: "Tell us what would make opening the cabinet better." },
  { icon: Sparkles, title: "Get your 3 piece reset", body: "See exactly three pieces that fix that mess." },
  { icon: ShoppingBag, title: "Shop or join the waitlist", body: "Grab the products or join the kit waitlist." },
];

export default function HomePage() {
  return (
    <>
      <PageViewTracker event="landing_page_viewed" />

      {/* Hero */}
      <section className="px-4 pb-8 pt-14 sm:pt-20">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge tone="accent">Pick your mess. Get your fix.</Badge>
            <h1 className="type-display mt-4">Your sink cabinet should not fight back.</h1>
            <p className="type-body mt-5 text-lg">
              Pick the mess that looks most like yours and get a simple 3 piece kitchen sink reset
              plan in under a minute.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedCTALink href="/tool" event="find_fix_clicked">
                Find My Cabinet Fix
              </TrackedCTALink>
              <CTALink href="#mess-types" variant="secondary">
                See Mess Types
              </CTALink>
            </div>
            <p className="type-small mt-4">This is not a kitchen renovation. It is a cabinet reset.</p>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* How it works */}
      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="Four steps to a calmer cabinet"
        muted
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">Step {index + 1}</span>
                </div>
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* The 3 mess types */}
      <Section
        id="mess-types"
        eyebrow="The 3 mess types"
        title="Find the one that looks like your cabinet"
        description="Stop losing the cleaner you bought yesterday. Start with the mess you recognize."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {MESS_TYPES.map((messType) => (
            <MessTypeCard key={messType.id} messType={messType} />
          ))}
        </div>
      </Section>

      {/* Why 3 pieces is enough: the 3 piece fix */}
      <Section eyebrow="Why three" title="Why 3 pieces is enough" muted>
        <div className="grid gap-5 sm:grid-cols-3">
          {COMPONENT_VISUALS.map((item) => (
            <div
              key={item.key}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <AssetImage
                asset={item.image}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 640px) 30vw, 90vw"
              />
              <div className="p-6">
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.concept}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="type-small mt-6">Three pieces. One calmer cabinet.</p>
      </Section>

      {/* Quick fit reminder */}
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
