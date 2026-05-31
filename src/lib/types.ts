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
  /** Ordered list of the 3 component types that make up this reset. */
  components: ComponentType[];
}

export interface Goal {
  id: GoalId;
  name: string;
  description: string;
}

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
  active: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}
