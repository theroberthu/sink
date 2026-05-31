import { AssetImage } from "@/components/AssetImage";
import { HERO_CHAOS, HERO_FIXED } from "@/lib/images";

// Dominant before and after hero panel: chaotic cabinet then calm reset.
// Side by side on desktop, stacked on mobile. Uses configured image assets with
// styled fallbacks until real photos ship.
export function HeroVisual() {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-lift sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <AssetImage
          asset={HERO_CHAOS}
          className="aspect-[4/5] rounded-xl"
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
          priority
        />
        <AssetImage
          asset={HERO_FIXED}
          className="aspect-[4/5] rounded-xl"
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
          priority
        />
      </div>
      <p className="mt-3 text-center text-sm font-medium text-muted-foreground sm:mt-4">
        Same cabinet. Three pieces apart.
      </p>
    </div>
  );
}

