import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onPrimary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 hover:shadow-lift active:translate-y-px",
  secondary:
    "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted active:translate-y-px",
  onPrimary:
    "bg-card text-primary shadow-soft hover:bg-card/90 hover:shadow-lift active:translate-y-px",
};

interface CTALinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

// Link styled as a CTA. Use for navigation.
export function CTALink({ href, children, variant = "primary", className }: CTALinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

// Button styled as a CTA. Use for actions (forms, click handlers).
export function CTAButton({ children, variant = "primary", className, ...props }: CTAButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}
