import { Check, SprayCan } from "lucide-react";

// Abstract before and after panel for the hero. No fake stock imagery, just
// tasteful illustrated zones: chaotic amber on the left, calm sorted blue on the right.

function ChaosBlob({ className }: { className?: string }) {
  return <span className={`absolute rounded-lg bg-accent/70 ${className ?? ""}`} aria-hidden="true" />;
}

export function HeroVisual() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 shadow-lift">
      {/* Before: the avalanche */}
      <div className="relative overflow-hidden rounded-xl bg-accent/15 p-4">
        <span className="type-caption text-accent-foreground">Before</span>
        <div className="relative mt-3 h-40">
          <ChaosBlob className="left-1 top-2 h-10 w-6 -rotate-12" />
          <ChaosBlob className="left-10 top-0 h-12 w-7 rotate-6" />
          <ChaosBlob className="left-20 top-6 h-9 w-9 rotate-12" />
          <ChaosBlob className="left-4 top-16 h-8 w-12 rotate-3" />
          <ChaosBlob className="left-16 top-20 h-11 w-6 -rotate-6" />
          <ChaosBlob className="left-24 top-24 h-7 w-10 rotate-12" />
          <span className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-card text-accent-foreground shadow-soft">
            <SprayCan className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* After: the reset */}
      <div className="relative overflow-hidden rounded-xl bg-primary/10 p-4">
        <span className="type-caption text-primary">After</span>
        <div className="mt-3 grid h-40 grid-rows-3 gap-2">
          {["Main fix", "Cabinet protection", "Grab and go"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg bg-card px-3 text-xs font-semibold text-foreground shadow-soft"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
