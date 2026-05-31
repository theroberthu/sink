"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
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
