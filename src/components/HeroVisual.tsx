import { AssetImage } from "@/components/AssetImage";
import { HERO_CHAOS, HERO_FIXED } from "@/lib/images";

// Editorial before and after: two clean image cards side by side on desktop,
// stacked on mobile. Minimal framing, lets the photos carry the hero.
export function HeroVisual() {
  return (
    <figure>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AssetImage
          asset={HERO_CHAOS}
          className="aspect-[4/5] rounded-2xl border border-border"
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
          priority
          largeLabel
        />
        <AssetImage
          asset={HERO_FIXED}
          className="aspect-[4/5] rounded-2xl border border-border"
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
          priority
          largeLabel
        />
      </div>
      <figcaption className="mt-4 text-center text-sm font-medium text-muted-foreground">
        Same cabinet. Three pieces apart.
      </figcaption>
    </figure>
  );
}
