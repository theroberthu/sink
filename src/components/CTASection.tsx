import type { ReactNode } from "react";
import { CTALink } from "@/components/CTAButton";
import type { AnalyticsEvent } from "@/lib/analytics";
import { TrackedCTALink } from "@/components/TrackedCTALink";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  ctaHref: string;
  ctaLabel: string;
  /** When set, the CTA fires this analytics event before navigating. */
  ctaEvent?: AnalyticsEvent;
  children?: ReactNode;
}

// Reusable conversion band. Calm primary panel with a single clear action.
export function CTASection({
  title,
  subtitle,
  ctaHref,
  ctaLabel,
  ctaEvent,
  children,
}: CTASectionProps) {
  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-soft sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">{subtitle}</p>
          ) : null}
          <div className="mt-7 flex justify-center">
            {ctaEvent ? (
              <TrackedCTALink href={ctaHref} event={ctaEvent} variant="onPrimary">
                {ctaLabel}
              </TrackedCTALink>
            ) : (
              <CTALink href={ctaHref} variant="onPrimary">
                {ctaLabel}
              </CTALink>
            )}
          </div>
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
