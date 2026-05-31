import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  /** Visually muted background to separate adjacent sections. */
  muted?: boolean;
}

// Generic page section with consistent vertical rhythm and a centered container.
export function Section({ id, title, eyebrow, children, className, muted }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full px-4 py-12 sm:py-16 ${muted ? "bg-slate-50" : ""} ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{title}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
