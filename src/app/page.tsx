import { Clock, Boxes, Ruler, MousePointerClick, ListChecks, Sparkles } from "lucide-react";
import { Section } from "@/components/Section";
import { CTALink } from "@/components/CTAButton";
import { TrackedCTALink } from "@/components/TrackedCTALink";
import { PageViewTracker } from "@/components/PageViewTracker";
import { HeroVisual } from "@/components/HeroVisual";
import { CTASection } from "@/components/CTASection";
import { Badge } from "@/components/Badge";
import { AssetImage } from "@/components/AssetImage";
import { COMPONENT_VISUALS, getMessImage } from "@/lib/images";
import { MESS_TYPES } from "@/data/messTypes";

// Compact benefit strip under the hero. Exactly 3 items.
const BENEFITS = [
  { icon: Clock, label: "Under 1 minute" },
  { icon: Boxes, label: "3 piece plan" },
  { icon: Ruler, label: "Quick fit check" },
];

// Diagnostic card copy for the mess type section. Short, one line each.
const MESS_TAGLINES: Record<string, string> = {
  "bottle-avalanche": "Bags, bottles, and chaos.",
  "pipe-maze": "Pipes in the way.",
  "tiny-cabinet-energy": "No room to breathe.",
};

// The 3 piece reset recipe. One short line per role.
const RECIPE: Record<string, string> = {
  access: "Pull things out.",
  protection: "Catch spills.",
  control: "Group daily items.",
};

// Warning signs strip. Subtle and funny, exactly 3.
const WARNING_SIGNS = [
  "You buy cleaner twice because you cannot find the first one.",
  "Plastic bags have formed their own ecosystem.",
  "Something falls out every time you open the door.",
];

// How it works is secondary now. Kept compact and below the transformation content.
const HOW_IT_WORKS = [
  { icon: MousePointerClick, title: "Pick your mess", body: "Choose the scene that looks like yours." },
  { icon: ListChecks, title: "Pick your goal", body: "Tell us what would make it better." },
  { icon: Sparkles, title: "Get your 3 piece fix", body: "See the three pieces that fix it." },
];

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
                  className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-soft"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Mess type section: diagnostic cards. */}
      <Section
        id="mess-types"
        eyebrow="Diagnose your cabinet"
        title="Which cabinet looks like yours?"
        description="Start with the mess you recognize."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {MESS_TYPES.map((messType, index) => {
            const image = getMessImage(messType.id);
            const typeLabel = `Cabinet Type 0${index + 1}`;
            return (
              <article
                key={messType.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="relative">
                  <AssetImage
                    asset={image}
                    className="aspect-[4/3] w-full"
                    sizes="(min-width: 640px) 30vw, 90vw"
                  />
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-foreground/85 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-background shadow-soft">
                    {typeLabel}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="type-card-title">{messType.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {MESS_TAGLINES[messType.id]}
                  </p>
                  <TrackedCTALink
                    href="/tool"
                    event="find_fix_clicked"
                    className="mt-4 w-full"
                  >
                    That&apos;s mine
                  </TrackedCTALink>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* The 3 piece reset recipe: parts of one simple system. */}
      <Section
        eyebrow="The system"
        title="The 3 piece reset recipe"
        description="One piece for access. One for protection. One for control."
        muted
      >
        <ol className="grid gap-5 sm:grid-cols-3">
          {COMPONENT_VISUALS.map((item, index) => (
            <li
              key={item.key}
              className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <AssetImage
                asset={item.image}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 640px) 30vw, 90vw"
              />
              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="font-bold">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{RECIPE[item.key]}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="type-small mt-6">Three pieces. One calmer cabinet.</p>
      </Section>

      {/* Personality strip: warning signs, exactly 3. */}
      <Section eyebrow="Sound familiar?" title="Warning signs your cabinet needs help">
        <ul className="grid gap-3 sm:grid-cols-3">
          {WARNING_SIGNS.map((sign) => (
            <li
              key={sign}
              className="rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm font-medium text-accent-foreground"
            >
              {sign}
            </li>
          ))}
        </ul>
      </Section>

      {/* Quick fit reminder, before the process explanation. */}
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

      {/* How it works, now secondary and lightweight. */}
      <Section id="how-it-works" eyebrow="How it works" title="Three quick steps">
        <ol className="grid gap-4 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-soft">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-muted-foreground">Step {index + 1}</p>
                  <h3 className="mt-0.5 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
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
