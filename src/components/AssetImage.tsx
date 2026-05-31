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

// Maps an asset's iconKey to a lucide icon for the placeholder state.
const ICON_BY_KEY: Record<string, LucideIcon> = {
  spray: SprayCan,
  sparkles: Sparkles,
  wrench: Wrench,
  boxes: Boxes,
  access: ArrowLeftRight,
  shield: ShieldCheck,
  basket: ShoppingBasket,
};

// Tasteful gradient backgrounds per tone so placeholders read like photo cards.
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
}

/**
 * Renders a configured image asset, or a styled photo style placeholder when the
 * real file is not available yet (or fails to load). The container reserves space
 * via its aspect ratio so there is never layout shift or a broken image icon.
 */
export function AssetImage({ asset, className, sizes = "100vw", priority }: AssetImageProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !asset.available || failed;
  const Icon = ICON_BY_KEY[asset.iconKey] ?? ImageIcon;

  return (
    <div
      className={`relative overflow-hidden ${showPlaceholder ? TONE_BG[asset.tone] : "bg-muted"} ${className ?? ""}`}
      // When the placeholder stands in for the photo, expose the description to assistive tech.
      role={showPlaceholder ? "img" : undefined}
      aria-label={showPlaceholder ? asset.alt : undefined}
    >
      {showPlaceholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card/70 shadow-soft">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
      ) : (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}

      {asset.label ? (
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-foreground shadow-soft">
          {asset.label}
        </span>
      ) : null}
    </div>
  );
}
