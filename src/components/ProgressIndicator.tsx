import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  /** 1 based current step. */
  current: number;
  steps: string[];
}

// Step progress for the guided tool. Shows completed, active, and upcoming states.
// Not color only: completed steps show a check icon and active shows a ring.
export function ProgressIndicator({ current, steps }: ProgressIndicatorProps) {
  return (
    <ol className="flex items-center gap-2" aria-label="Progress">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < current;
        const isActive = stepNumber === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              aria-current={isActive ? "step" : undefined}
              className={[
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                isComplete ? "bg-primary text-primary-foreground" : "",
                isActive ? "bg-primary text-primary-foreground" : "",
                !isComplete && !isActive ? "border border-border bg-card text-muted-foreground" : "",
              ].join(" ")}
            >
              {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : stepNumber}
            </span>
            <span
              className={`hidden text-sm font-medium sm:inline ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {stepNumber < steps.length ? (
              <span
                aria-hidden="true"
                className={`h-px flex-1 ${isComplete ? "bg-primary" : "bg-border"}`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
