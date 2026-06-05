import type { ReactNode } from "react";

type Tone = "primary" | "accent" | "success" | "muted";

const tones: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/20 text-accent-foreground",
  success: "bg-success/15 text-success",
  muted: "bg-muted text-muted-foreground",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

// Small status pill. Used for product roles (Access, Protection, Control).
export function Badge({ children, tone = "muted", className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
