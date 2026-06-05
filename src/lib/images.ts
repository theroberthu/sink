import type { MessTypeId } from "@/lib/types";

// Central image asset config for Sink Cabinet Fix.
// The site is image led. Each asset carries everything the UI needs: source path,
// descriptive alt text, an optional overlay label, where it is used, a tone for the
// fallback, and an icon key.
//
// HOW TO SHIP REAL IMAGES:
//   1. Export the final art as WebP to the exact path in `src` below.
//      Files live in /public/images (see public/images/README.md).
//   2. That is it. AssetImage loads the real file automatically and falls back to
//      the styled placeholder if the file is missing. No flag, no code change.

export type ImageTone = "chaos" | "fixed" | "neutral";

export interface ImageAsset {
  /** Public path, for example /images/hero-cabinet-chaos.webp */
  src: string;
  /** Descriptive alt text. Required for every asset. */
  alt: string;
  /** Optional overlay label, for example "Chaos" or "Fixed". */
  label?: string;
  /** Where this asset is used, for documentation. */
  usage: string;
  /** Placeholder tone until the real file exists. */
  tone: ImageTone;
  /** Icon key for the placeholder. Mapped to a lucide icon in AssetImage. */
  iconKey: string;
}

// 1. Homepage hero before and after.
export const HERO_CHAOS: ImageAsset = {
  // TODO: drop the final file at public/images/hero-cabinet-chaos.webp
  src: "/images/hero-cabinet-chaos.webp",
  alt: "Messy kitchen under sink cabinet with cleaning bottles and supplies crowded together.",
  label: "Chaos",
  usage: "Homepage hero, before panel",
  tone: "chaos",
  iconKey: "spray",
};

export const HERO_FIXED: ImageAsset = {
  // TODO: drop the final file at public/images/hero-cabinet-fixed.webp
  src: "/images/hero-cabinet-fixed.webp",
  alt: "Clean and organized kitchen under sink cabinet with supplies neatly arranged in three pieces.",
  label: "Fixed",
  usage: "Homepage hero, after panel",
  tone: "fixed",
  iconKey: "sparkles",
};

// 2. Mess type cards, one visual per mess type.
export const MESS_IMAGES: Record<MessTypeId, ImageAsset> = {
  "bottle-avalanche": {
    // TODO: drop the final file at public/images/mess-bottle-avalanche.webp
    src: "/images/mess-bottle-avalanche.webp",
    alt: "Crowded under sink cabinet packed with cleaning sprays, soaps, trash bags, dishwasher pods, and random bottles.",
    usage: "Bottle Avalanche mess card and result thumbnail",
    tone: "chaos",
    iconKey: "spray",
  },
  "pipe-maze": {
    // TODO: drop the final file at public/images/mess-pipe-maze.webp
    src: "/images/mess-pipe-maze.webp",
    alt: "Under sink cabinet with exposed pipes and a garbage disposal creating awkward storage space.",
    usage: "Pipe Maze mess card and result thumbnail",
    tone: "neutral",
    iconKey: "wrench",
  },
  "tiny-cabinet-energy": {
    // TODO: drop the final file at public/images/mess-tiny-cabinet.webp
    src: "/images/mess-tiny-cabinet.webp",
    alt: "Small apartment style under sink cabinet with limited room and items stacked on top of each other.",
    usage: "Tiny Cabinet Energy mess card and result thumbnail",
    tone: "neutral",
    iconKey: "boxes",
  },
};

export function getMessImage(id: MessTypeId): ImageAsset {
  return MESS_IMAGES[id];
}

// 3. Three piece fix section: access, protection, control.
export interface ComponentVisual {
  key: "access" | "protection" | "control";
  title: string;
  concept: string;
  copy: string;
  image: ImageAsset;
}

export const COMPONENT_VISUALS: ComponentVisual[] = [
  {
    key: "access",
    title: "Access",
    concept: "Pull out organizer",
    copy: "Slide the back row to the front so nothing hides behind the trap.",
    image: {
      // TODO: drop the final file at public/images/component-access.webp
      src: "/images/component-access.webp",
      alt: "Pull out organizer drawer that slides forward under the sink for easy access.",
      label: "Access",
      usage: "Three piece fix section, access",
      tone: "fixed",
      iconKey: "access",
    },
  },
  {
    key: "protection",
    title: "Protection",
    concept: "Waterproof cabinet liner",
    copy: "A wipe clean liner so a slow drip is never a weekend project.",
    image: {
      // TODO: drop the final file at public/images/component-protection.webp
      src: "/images/component-protection.webp",
      alt: "Waterproof cabinet liner mat protecting the base of an under sink cabinet.",
      label: "Protection",
      usage: "Three piece fix section, protection",
      tone: "fixed",
      iconKey: "shield",
    },
  },
  {
    key: "control",
    title: "Control",
    concept: "Cleaning caddy",
    copy: "Keep daily sprays in one handle so cleanup starts in two seconds.",
    image: {
      // TODO: drop the final file at public/images/component-control.webp
      src: "/images/component-control.webp",
      alt: "Cleaning caddy holding spray bottles together for easy carrying.",
      label: "Control",
      usage: "Three piece fix section, control",
      tone: "fixed",
      iconKey: "basket",
    },
  },
];
