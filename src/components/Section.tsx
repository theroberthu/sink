import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Muted background to separate adjacent sections. */
  muted?: boolean;
  /** Center the heading block. */
  centered?: boolean;
}

// Generic page section with consistent vertical rhythm and a centered container.
export function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  className,
  muted,
  centered,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-14 sm:py-20 ${muted ? "bg-muted" : ""} ${className ?? ""}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        {eyebrow || title || description ? (
          <div className={`mb-10 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
            {eyebrow ? <p className="type-caption mb-2 text-primary">{eyebrow}</p> : null}
            {title ? <h2 className="type-section-title">{title}</h2> : null}
            {description ? <p className="type-body mt-3">{description}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
