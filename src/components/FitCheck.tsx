"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Quick fit check shown before buying. Fires fit_check_viewed when mounted.
export function FitCheck() {
  useEffect(() => {
    track("fit_check_viewed");
  }, []);

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
      <h3 className="text-lg font-bold">Before you buy, check these 3 things</h3>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-700">
        <li>Cabinet width</li>
        <li>Cabinet depth</li>
        <li>Pipe or garbage disposal location</li>
      </ol>
      <p className="mt-4 text-sm font-medium text-slate-700">
        If pipes block the middle, choose Pipe Maze instead.
      </p>
    </div>
  );
}
