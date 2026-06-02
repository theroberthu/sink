import type { ReactNode } from "react";
import { Check } from "lucide-react";

interface StepSummaryRowProps {
  /** Small caption above the value, for example "Your mess". */
  label: string;
  /** The chosen value title. */
  title: string;
  /** Optional one line under the title. */
  detail?: string;
  /** Optional leading visual (image thumbnail). */
  leading?: ReactNode;
  onChange: () => void;
}

// Compact collapsed row for a completed step. Shows the choice and a Change button
// that reopens that step without leaving the page.
export function StepSummaryRow({ label, title, detail, leading, onChange }: StepSummaryRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      {leading ? (
        leading
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-primary">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="type-caption text-primary">{label}</p>
        <p className="truncate font-semibold">{title}</p>
        {detail ? <p className="truncate text-sm text-muted-foreground">{detail}</p> : null}
      </div>
      <button
        type="button"
        onClick={onChange}
        className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Change
      </button>
    </div>
  );
}
