"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "onPrimary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-150";

// Tactile feel matches CTAButton: darker bottom inset edge, presses down on active.
const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_4px_0_0_rgb(var(--primary)/0.55),0_8px_24px_rgb(27_36_48/0.10)] hover:-translate-y-px hover:bg-primary/95 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgb(var(--primary)/0.55)]",
  secondary:
    "border-2 border-border bg-card text-foreground shadow-soft hover:border-primary/50 hover:bg-muted active:translate-y-0.5 active:shadow-none",
  onPrimary:
    "bg-card text-primary shadow-[0_4px_0_0_rgb(27_36_48/0.12),0_8px_24px_rgb(27_36_48/0.10)] hover:-translate-y-px active:translate-y-0.5",
};

interface TrackedCTALinkProps {
  href: string;
  event: AnalyticsEvent;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

// CTA link that fires an analytics event before navigating. Used for find_fix_clicked.
export function TrackedCTALink({
  href,
  event,
  children,
  variant = "primary",
  className,
}: TrackedCTALinkProps) {
  return (
    <Link
      href={href}
      onClick={() => track(event)}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
