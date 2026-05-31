import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  /** Adds hover lift for interactive or linked cards. */
  interactive?: boolean;
}

// Base card surface. Larger interactive cards build on this.
export function Card({ children, className, as: Tag = "div", interactive }: CardProps) {
  return (
    <Tag
      className={[
        "rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-soft",
        interactive ? "transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lift" : "",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
