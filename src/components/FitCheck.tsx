"use client";

import { useEffect } from "react";
import { Ruler, TriangleAlert } from "lucide-react";
import { track } from "@/lib/analytics";

const CHECKS = ["Cabinet width", "Cabinet depth", "Pipe or garbage disposal location"];

// Quick fit check shown before buying. Fires fit_check_viewed when mounted.
export function FitCheck() {
  useEffect(() => {
    track("fit_check_viewed");
  }, []);

  return (
    <div className="rounded-2xl border border-warning/40 bg-warning/10 p-6">
      <div className="flex items-center gap-2">
        <Ruler className="h-5 w-5 text-warning" aria-hidden="true" />
        <h3 className="type-card-title">Before you buy, check these 3 things</h3>
      </div>
      <ol className="mt-4 grid gap-2 sm:grid-cols-3">
        {CHECKS.map((check, index) => (
          <li
            key={check}
            className="flex items-start gap-2 rounded-xl bg-card/70 p-3 text-sm font-medium"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning/30 text-xs font-bold">
              {index + 1}
            </span>
            <span>{check}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 flex items-start gap-2 text-sm font-medium text-foreground/80">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
        If pipes block the middle, choose Pipe Maze instead.
      </p>
    </div>
  );
}
