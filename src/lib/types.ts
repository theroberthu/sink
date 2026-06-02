// Shared domain types for Sink Cabinet Fix.
// Kept small and explicit so a later design system or data pass can extend them.

export type MessTypeId = "bottle-avalanche" | "pipe-maze" | "tiny-cabinet-energy";

export type GoalId = "easy-reach" | "more-space" | "cleaner-look";

export type ComponentType =
  | "Pull Out Organizer"
  | "Waterproof Cabinet Liner"
  | "Cleaning Caddy"
  | "Narrow Side Organizer"
  | "Small Bins"
  | "Slim Organizer"
  | "Stackable Tray";

export interface MessType {
  id: MessTypeId;
  name: string;
  shortDescription: string;
  /** One short line for compact cards, for example "Bags, bottles, and chaos." */
  tagline: string;
  diagnosis: string;
  /** Bundle style name for the result page, for example "Bottle Avalanche Setup". */
  setupName: string;
  /** Short "best for" line shown under the setup name. */
  bestFor: string;
  /** Who this mess type is for, used on the SEO landing page. */
  whoFor: string;
  /** Fit considerations to check before buying, used on the SEO landing page. */
  fitConsiderations: string[];
  /** Ordered list of the 3 component types that make up this reset. */
  components: ComponentType[];
}

export interface Goal {
  id: GoalId;
  name: string;
  description: string;
  /** One short line for compact selectable cards, for example "Stop digging." */
  tagline: string;
}

/** Role of a piece within the 3 piece setup. Drives the card label. */
export type ProductRole = "Access" | "Protection" | "Control";

/** Availability status. out_of_stock and paused products are never shown. */
export type ProductStatus = "active" | "backup" | "out_of_stock" | "paused";

export interface Product {
  id: string;
  messType: MessTypeId;
  /** Role this piece plays in the setup: Access, Protection, or Control. */
  role: ProductRole;
  componentType: ComponentType;
  productName: string;
  reason: string;
  retailer: string;
  /** Amazon ASIN. When present and retailer is Amazon, the affiliate link is generated. */
  asin?: string;
  /** Explicit affiliate URL. Used when no ASIN based link is generated. */
  affiliateUrl?: string;
  /** Placeholder display price, for example "$24". */
  price: string;
  imageUrl?: string;
  /** Button label, for example "View Organizer", "View Liner", "View Caddy". */
  viewLabel: string;
  status: ProductStatus;
  /** Lower wins. The lowest priority available product for a role is shown. */
  priority: number;
  notes?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
