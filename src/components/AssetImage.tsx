"use client";

import Image from "next/image";
import { useState } from "react";
import {
  SprayCan,
  Sparkles,
  Wrench,
  Boxes,
  ArrowLeftRight,
  ShieldCheck,
  ShoppingBasket,
  ImageIcon,
  type LucideIcon,
} from "lucide-react";
import type { ImageAsset, ImageTone } from "@/lib/images";

// Maps an asset's iconKey to a lucide icon for the fallback state.
const ICON_BY_KEY: Record<string, LucideIcon> = {
  spray: SprayCan,
  sparkles: Sparkles,
  wrench: Wrench,
  boxes: Boxes,
  access: ArrowLeftRight,
  shield: ShieldCheck,
  basket: ShoppingBasket,
};

// Tasteful gradient backgrounds per tone so the fallback reads like a photo card.
const TONE_BG: Record<ImageTone, string> = {
  chaos: "bg-gradient-to-br from-accent/40 via-accent/20 to-card text-accent-foreground",
  fixed: "bg-gradient-to-br from-primary/20 via-success/15 to-card text-primary",
  neutral: "bg-gradient-to-br from-muted via-secondary to-card text-muted-foreground",
};

interface AssetImageProps {
  asset: ImageAsset;
  /** Container classes. Must set an aspect ratio to keep dimensions stable (no layout shift). */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Render the overlay label larger and more prominent (used in the hero). */
  largeLabel?: boolean;
}

/**
 * Image led slot. It optimistically loads the real file at asset.src from
 * /public/images, and shows a styled photo style fallback when that file is
 * missing or fails to load.
 *
 * The fallback always sits behind the image and the photo fades in only after it
 * loads, so there is never a broken image icon and never any layout shift. Drop a
 * real WebP at asset.src and it appears automatically, no code change needed.
 */
export function AssetImage({
  asset,
  className,
  sizes = "100vw",
  priority,
  largeLabel,
}: AssetImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const Icon = ICON_BY_KEY[asset.iconKey] ?? ImageIcon;

  return (
    <div
      // The container always carries the alt description and reserves space.
      role="img"
      aria-label={asset.alt}
      className={`relative overflow-hidden ${TONE_BG[asset.tone]} ${className ?? ""}`}
    >
      {/* Styled fallback, always present behind the photo. Marks the image slot clearly. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card/70 shadow-soft">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>

      {/* Real photo. Hidden until it loads; removed entirely if it errors (404 or missing). */}
      {!failed ? (
        <Image
          // TODO: add the real file at public/images so this resolves. Until then the
          // fallback shows. See public/images/README.md for the expected filenames.
          src={asset.src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}

      {asset.label ? (
        <span
          className={`absolute left-3 top-3 z-10 rounded-full bg-card/90 font-bold uppercase tracking-wide text-foreground shadow-soft ${
            largeLabel ? "px-3.5 py-1.5 text-sm" : "px-2.5 py-1 text-xs"
          }`}
        >
          {asset.label}
        </span>
      ) : null}
    </div>
  );
}
