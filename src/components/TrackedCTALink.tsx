"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "onPrimary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-150";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 hover:shadow-lift active:translate-y-px",
  secondary:
    "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted active:translate-y-px",
  onPrimary:
    "bg-card text-primary shadow-soft hover:bg-card/90 hover:shadow-lift active:translate-y-px",
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
