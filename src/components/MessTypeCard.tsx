import { Check } from "lucide-react";
import { Card } from "@/components/Card";
import { MESS_ICONS } from "@/components/messIcons";
import type { MessType } from "@/lib/types";

interface MessTypeCardProps {
  messType: MessType;
  /** When provided, the card becomes a selectable button (used in the tool). */
  onSelect?: (id: MessType["id"]) => void;
  selected?: boolean;
}

// Large card describing one mess type. Static on content pages, selectable in the tool.
export function MessTypeCard({ messType, onSelect, selected }: MessTypeCardProps) {
  const Icon = MESS_ICONS[messType.id];

  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        {onSelect && selected ? (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <h3 className="type-card-title mt-4">{messType.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {messType.shortDescription}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
        {messType.components.map((component) => (
          <li key={component} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
            <span>{component}</span>
          </li>
        ))}
      </ul>
    </>
  );

  if (!onSelect) {
    return (
      <Card as="article" className="h-full">
        {content}
      </Card>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(messType.id)}
      aria-pressed={selected}
      className={[
        "h-full rounded-2xl border bg-card p-6 text-left text-card-foreground shadow-soft transition-all duration-150",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift",
        selected ? "border-primary ring-2 ring-primary/30" : "border-border",
      ].join(" ")}
    >
      {content}
    </button>
  );
}
