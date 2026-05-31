import { AssetImage } from "@/components/AssetImage";
import { HERO_CHAOS, HERO_FIXED } from "@/lib/images";

// Before and after hero panel: chaotic cabinet on the left, calm reset on the right.
// Uses configured image assets, with styled placeholders until real photos ship.
export function HeroVisual() {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-lift">
      <div className="grid grid-cols-2 gap-3">
        <AssetImage
          asset={HERO_CHAOS}
          className="aspect-[3/4] rounded-xl"
          sizes="(min-width: 1024px) 22vw, 45vw"
          priority
        />
        <AssetImage
          asset={HERO_FIXED}
          className="aspect-[3/4] rounded-xl"
          sizes="(min-width: 1024px) 22vw, 45vw"
        />
      </div>
      <p className="mt-3 text-center text-sm font-medium text-muted-foreground">
        Same cabinet. Three pieces apart.
      </p>
    </div>
  );
}
