import type { Goal, GoalId } from "@/lib/types";

// The 3 goals. Order is intentional and used across the site.
export const GOALS: Goal[] = [
  {
    id: "easy-reach",
    name: "Easy Reach",
    description: "I want to stop digging for the bottle I need.",
  },
  {
    id: "more-space",
    name: "More Space",
    description: "I want to use the cabinet space better.",
  },
  {
    id: "cleaner-look",
    name: "Cleaner Look",
    description: "I want it to look less chaotic every time I open it.",
  },
];

export function getGoal(id: GoalId): Goal | undefined {
  return GOALS.find((goal) => goal.id === id);
}

export function isGoalId(value: string): value is GoalId {
  return GOALS.some((goal) => goal.id === value);
}
