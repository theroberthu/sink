import type { MessTypeId, Product, ProductRole } from "@/lib/types";

// Placeholder product catalog. Structured to mirror the Supabase `products` table
// so this can later be swapped for a database query without changing call sites.
// Affiliate URLs are placeholders for now. Each mess type forms one curated 3 piece
// setup with an Access piece, a Protection piece, and a Control piece. A role can
// have more than one product; the lowest priority available one is shown.
export const PRODUCTS: Product[] = [
  // Bottle Avalanche
  {
    id: "ba-pull-out-organizer",
    messType: "bottle-avalanche",
    role: "Access",
    componentType: "Pull Out Organizer",
    productName: "Glide Out Under Sink Drawer",
    reason: "Makes the back of the cabinet reachable.",
    retailer: "Amazon",
    asin: "B0EXAMPLE01",
    price: "$32",
    viewLabel: "View Organizer",
    status: "active",
    priority: 1,
  },
  {
    // Demonstrates fallback: this is the top priority pick but is out of stock, so
    // getBestProduct skips it and returns the active liner below.
    id: "ba-cabinet-liner-oos",
    messType: "bottle-avalanche",
    role: "Protection",
    componentType: "Waterproof Cabinet Liner",
    productName: "Premium Adhesive Cabinet Liner",
    reason: "Catches leaks, spills, and sticky bottle rings.",
    retailer: "Amazon",
    asin: "B0EXAMPLE99",
    price: "$19",
    viewLabel: "View Liner",
    status: "out_of_stock",
    priority: 0,
    notes: "Primary pick, currently out of stock. Backup is the active liner.",
  },
  {
    id: "ba-cabinet-liner",
    messType: "bottle-avalanche",
    role: "Protection",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Catches leaks, spills, and sticky bottle rings.",
    retailer: "Amazon",
    asin: "B0EXAMPLE02",
    price: "$14",
    viewLabel: "View Liner",
    status: "active",
    priority: 1,
  },
  {
    id: "ba-cleaning-caddy",
    messType: "bottle-avalanche",
    role: "Control",
    componentType: "Cleaning Caddy",
    productName: "Grab and Go Cleaning Caddy",
    reason: "Keeps daily-use items together.",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/cleaning-caddy",
    price: "$18",
    viewLabel: "View Caddy",
    status: "active",
    priority: 1,
  },

  // Pipe Maze
  {
    id: "pm-narrow-side-organizer",
    messType: "pipe-maze",
    role: "Access",
    componentType: "Narrow Side Organizer",
    productName: "Slim Side Shelf for Under Sink",
    reason: "Works around pipes instead of fighting the middle.",
    retailer: "Amazon",
    asin: "B0EXAMPLE03",
    price: "$28",
    viewLabel: "View Organizer",
    status: "active",
    priority: 1,
  },
  {
    id: "pm-cabinet-liner",
    messType: "pipe-maze",
    role: "Protection",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Protects the cabinet floor around plumbing.",
    retailer: "Amazon",
    asin: "B0EXAMPLE04",
    price: "$14",
    viewLabel: "View Liner",
    status: "active",
    priority: 1,
  },
  {
    id: "pm-small-bins",
    messType: "pipe-maze",
    role: "Control",
    componentType: "Small Bins",
    productName: "Stackable Clear Bins, Set of 3",
    reason: "Groups loose supplies without blocking pipes.",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/small-bins",
    price: "$22",
    viewLabel: "View Bins",
    status: "active",
    priority: 1,
  },

  // Tiny Cabinet Energy
  {
    id: "tc-slim-organizer",
    messType: "tiny-cabinet-energy",
    role: "Access",
    componentType: "Slim Organizer",
    productName: "Slim Two Tier Under Sink Rack",
    reason: "Adds order without eating the whole cabinet.",
    retailer: "Amazon",
    asin: "B0EXAMPLE05",
    price: "$26",
    viewLabel: "View Organizer",
    status: "active",
    priority: 1,
  },
  {
    id: "tc-cabinet-liner",
    messType: "tiny-cabinet-energy",
    role: "Protection",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Keeps the cabinet floor easier to clean.",
    retailer: "Amazon",
    asin: "B0EXAMPLE06",
    price: "$14",
    viewLabel: "View Liner",
    status: "active",
    priority: 1,
  },
  {
    id: "tc-stackable-tray",
    messType: "tiny-cabinet-energy",
    role: "Control",
    componentType: "Stackable Tray",
    productName: "Stackable Storage Tray",
    reason: "Uses vertical space without overcomplicating it.",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/stackable-tray",
    price: "$16",
    viewLabel: "View Tray",
    status: "active",
    priority: 1,
  },
];

const AMAZON_AFFILIATE_TAG = "sinkcabinetfi-20";

/** The roles that make up every setup, in display order. */
export const SETUP_ROLES: ProductRole[] = ["Access", "Protection", "Control"];

/**
 * Returns the best available product for a mess type and role:
 * filter by mess type and role, drop out_of_stock and paused, sort by priority
 * ascending, and return the first. Returns null when nothing is available.
 */
export function getBestProduct(messType: MessTypeId, role: ProductRole): Product | null {
  const available = PRODUCTS.filter(
    (p) =>
      p.messType === messType &&
      p.role === role &&
      p.status !== "out_of_stock" &&
      p.status !== "paused",
  ).sort((a, b) => a.priority - b.priority);
  return available[0] ?? null;
}

/**
 * Builds the final affiliate URL for a product. Amazon products with an ASIN get a
 * tagged /dp/ link. Otherwise the explicit affiliateUrl is used. Empty string if
 * neither is available, so callers can guard before opening.
 */
export function getFinalAffiliateUrl(product: Product): string {
  if (product.retailer === "Amazon" && product.asin) {
    return `https://www.amazon.com/dp/${product.asin}?tag=${AMAZON_AFFILIATE_TAG}`;
  }
  return product.affiliateUrl ?? "";
}

/** The one product per role for a mess type, in display order. Null when unavailable. */
export function getSetupPicks(messType: MessTypeId): { role: ProductRole; product: Product | null }[] {
  return SETUP_ROLES.map((role) => ({ role, product: getBestProduct(messType, role) }));
}
