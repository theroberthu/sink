import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}

// Base card surface. Larger interactive cards (MessTypeCard, GoalCard) build on this.
export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}
