import { Check, Hand, Maximize2, Sparkles, type LucideIcon } from "lucide-react";
import { Card } from "@/components/Card";
import type { Goal, GoalId } from "@/lib/types";

interface GoalCardProps {
  goal: Goal;
  /** When provided, the card becomes a selectable button (used in the tool). */
  onSelect?: (id: Goal["id"]) => void;
  selected?: boolean;
}

const GOAL_ICONS: Record<GoalId, LucideIcon> = {
  "easy-reach": Hand,
  "more-space": Maximize2,
  "cleaner-look": Sparkles,
};

// Large card describing one user goal. Static on content pages, selectable in the tool.
export function GoalCard({ goal, onSelect, selected }: GoalCardProps) {
  const Icon = GOAL_ICONS[goal.id];

  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        {onSelect && selected ? (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <h3 className="type-card-title mt-4">{goal.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{goal.description}</p>
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
      onClick={() => onSelect(goal.id)}
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
