import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onPrimary";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60";

// Tactile feel: a darker bottom inset edge on the primary so it reads like a
// physical, pressable button, and presses down on active.
const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_4px_0_0_rgb(var(--primary)/0.55),0_8px_24px_rgb(27_36_48/0.10)] hover:-translate-y-px hover:bg-primary/95 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgb(var(--primary)/0.55)]",
  secondary:
    "border-2 border-border bg-card text-foreground shadow-soft hover:border-primary/50 hover:bg-muted active:translate-y-0.5 active:shadow-none",
  onPrimary:
    "bg-card text-primary shadow-[0_4px_0_0_rgb(27_36_48/0.12),0_8px_24px_rgb(27_36_48/0.10)] hover:-translate-y-px active:translate-y-0.5",
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
