import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onPrimary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

// Crisp and modern: solid deep green primary, white text, simple hover. No heavy shadow.
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "border border-border bg-card text-foreground hover:border-foreground/30 hover:bg-muted",
  onPrimary: "bg-card text-primary hover:bg-secondary",
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
