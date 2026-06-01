"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "onPrimary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition-colors duration-150";

// Crisp and modern, matches CTAButton: solid deep green primary, simple hover.
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "border border-border bg-card text-foreground hover:border-foreground/30 hover:bg-muted",
  onPrimary: "bg-card text-primary hover:bg-secondary",
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
