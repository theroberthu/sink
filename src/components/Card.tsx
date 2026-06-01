import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  /** Adds hover lift for interactive or linked cards. */
  interactive?: boolean;
}

// Base card surface. Crisp border, no resting shadow. Interactive cards get a
// subtle border and shadow shift on hover, no bouncy translate.
export function Card({ children, className, as: Tag = "div", interactive }: CardProps) {
  return (
    <Tag
      className={[
        "rounded-2xl border border-border bg-card p-6 text-card-foreground",
        interactive ? "transition-colors duration-150 hover:border-foreground/20 hover:shadow-soft" : "",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
