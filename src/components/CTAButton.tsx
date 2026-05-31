import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
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
