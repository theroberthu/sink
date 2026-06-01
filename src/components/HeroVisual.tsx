import { AssetImage } from "@/components/AssetImage";
import { HERO_CHAOS, HERO_FIXED } from "@/lib/images";

// Hero treatment styled like an open under sink cabinet: a warm wood tone frame
// around the two cabinet doors (Chaos and Fixed). Modern and clean, not cartoonish.
// Side by side on desktop, stacked on mobile. Real images with graceful fallback.
export function HeroVisual() {
  return (
    <figure className="relative">
      {/* Wood cabinet frame */}
      <div className="rounded-[1.75rem] bg-gradient-to-b from-wood-light via-wood to-wood-dark p-3 shadow-lift sm:p-4">
        {/* Inner cabinet opening */}
        <div className="rounded-2xl bg-wood-dark/30 p-2 ring-1 ring-inset ring-wood-dark/40 sm:p-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            <AssetImage
              asset={HERO_CHAOS}
              className="aspect-[4/5] rounded-xl ring-1 ring-wood-dark/30"
              sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
              priority
              largeLabel
            />
            <AssetImage
              asset={HERO_FIXED}
              className="aspect-[4/5] rounded-xl ring-1 ring-wood-dark/30"
              sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
              priority
              largeLabel
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm font-medium text-muted-foreground">
        Same cabinet. Three pieces apart.
      </figcaption>
    </figure>
  );
}
