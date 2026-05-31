import { Section } from "@/components/Section";
import { MessTypeCard } from "@/components/MessTypeCard";
import { CTALink } from "@/components/CTAButton";
import { TrackedCTALink } from "@/components/TrackedCTALink";
import { PageViewTracker } from "@/components/PageViewTracker";
import { MESS_TYPES } from "@/data/messTypes";

const HOW_IT_WORKS = [
  { step: "1", title: "Pick your mess", body: "Choose the under sink scene that looks most like yours." },
  { step: "2", title: "Pick your goal", body: "Tell us what would make opening the cabinet better." },
  { step: "3", title: "Get your 3 piece reset plan", body: "See exactly three pieces that fix that mess." },
  { step: "4", title: "Shop or join the waitlist", body: "Grab the products or join the kit waitlist." },
];

export default function HomePage() {
  return (
    <>
      <PageViewTracker event="landing_page_viewed" />

      {/* Hero */}
      <Section className="pt-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Your sink cabinet should not fight back.
          </h1>
          <p className="mt-4 text-lg text-slate-600">
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
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" title="How it works" muted>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item) => (
            <li key={item.step} className="rounded-xl border border-slate-200 bg-white p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* The 3 mess types */}
      <Section id="mess-types" title="The 3 mess types">
        <div className="grid gap-6 sm:grid-cols-3">
          {MESS_TYPES.map((messType) => (
            <MessTypeCard key={messType.id} messType={messType} />
          ))}
        </div>
      </Section>

      {/* Why 3 pieces is enough */}
      <Section title="Why 3 pieces is enough" muted>
        <div className="max-w-2xl space-y-4 text-slate-700">
          <p>
            Most under sink cabinets do not need a system with twenty parts. They need a way to
            reach your stuff, a way to use the space, and a way to keep the base clean.
          </p>
          <p>
            Three pieces cover all three without crowding the cabinet or blowing your budget. It is
            a reset, not a renovation.
          </p>
        </div>
      </Section>

      {/* CTA to start the tool */}
      <Section>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold">Ready to fix the chaos?</h2>
          <p className="mt-2 text-slate-600">
            Pick your mess and your goal. We will hand you a plan in under a minute.
          </p>
          <div className="mt-6 flex justify-center">
            <TrackedCTALink href="/tool" event="find_fix_clicked">
              Find My Cabinet Fix
            </TrackedCTALink>
          </div>
        </div>
      </Section>
    </>
  );
}
