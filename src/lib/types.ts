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
}

/** Role of a piece within the 3 piece setup. Drives the card label. */
export type ProductRole = "Access" | "Protection" | "Control";

export interface Product {
  id: string;
  componentType: ComponentType;
  productName: string;
  reason: string;
  /** Placeholder display price, for example "$24". */
  price: string;
  retailer: string;
  affiliateUrl: string;
  imageUrl?: string;
  messType: MessTypeId;
  /** Role this piece plays in the setup: Access, Protection, or Control. */
  role: ProductRole;
  /** Button label, for example "View Organizer", "View Liner", "View Caddy". */
  viewLabel: string;
  active: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}
