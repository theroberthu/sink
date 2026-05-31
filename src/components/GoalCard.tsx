import { Card } from "@/components/Card";
import type { Goal } from "@/lib/types";

interface GoalCardProps {
  goal: Goal;
  /** When provided, the card becomes a selectable button (used in the tool). */
  onSelect?: (id: Goal["id"]) => void;
  selected?: boolean;
}

// Large card describing one user goal. Static on content pages, selectable in the tool.
export function GoalCard({ goal, onSelect, selected }: GoalCardProps) {
  const content = (
    <>
      <h3 className="text-xl font-bold">{goal.name}</h3>
      <p className="mt-2 text-slate-600">{goal.description}</p>
    </>
  );

  if (!onSelect) {
    return <Card as="article">{content}</Card>;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(goal.id)}
      aria-pressed={selected}
      className={`h-full rounded-xl border bg-white p-6 text-left shadow-sm transition-colors hover:border-blue-400 ${
        selected ? "border-blue-600 ring-2 ring-blue-200" : "border-slate-200"
      }`}
    >
      {content}
    </button>
  );
}
