import type { MessTypeId, Product, ProductRole } from "@/lib/types";

// Real MVP Amazon product catalog. Structured to mirror the Supabase `products`
// table so this can later be swapped for a database query without changing call
// sites. Each mess type has one active product per role (Access, Protection,
// Control). Some roles also have lower priority backups that only show if the
// active product becomes paused or out_of_stock.
export const PRODUCTS: Product[] = [
  // Bottle Avalanche
  {
    id: "ba-access",
    messType: "bottle-avalanche",
    role: "Access",
    componentType: "Pull Out Organizer",
    productName: "REALINN Under Sink Organizer",
    reason: "Makes the back of the cabinet reachable.",
    retailer: "Amazon",
    asin: "B0CFQDSSYB",
    price: "Check price",
    estimatedPriceNumber: 30,
    viewLabel: "View Organizer",
    status: "active",
    priority: 1,
    notes: "L-shaped pull-out organizer designed to fit around pipes and garbage disposals.",
  },
  {
    id: "ba-protection",
    messType: "bottle-avalanche",
    role: "Protection",
    componentType: "Waterproof Cabinet Liner",
    productName: "Gorilla Grip LeakGuard Under Sink Mat",
    reason: "Catches leaks, spills, and sticky bottle rings.",
    retailer: "Amazon",
    asin: "B08H5W6BM4",
    price: "Check price",
    estimatedPriceNumber: 20,
    viewLabel: "View Liner",
    status: "active",
    priority: 1,
    notes: "Cabinet mat designed to protect against leaks, spills, and sticky bottle rings.",
  },
  {
    id: "ba-control",
    messType: "bottle-avalanche",
    role: "Control",
    componentType: "Cleaning Caddy",
    productName: "Casabella Cleaning Storage Caddy",
    reason: "Keeps daily-use items together.",
    retailer: "Amazon",
    asin: "B00167V9II",
    price: "Check price",
    estimatedPriceNumber: 19,
    viewLabel: "View Caddy",
    status: "active",
    priority: 1,
    notes: "Portable cleaning caddy for sprays, gloves, sponges, and daily-use supplies.",
  },
  {
    id: "ba-control-backup",
    messType: "bottle-avalanche",
    role: "Control",
    componentType: "Cleaning Caddy",
    productName: "mDesign Small Plastic Storage Caddy",
    reason: "Keeps daily-use items together.",
    retailer: "Amazon",
    asin: "B07P271FJV",
    price: "Check price",
    estimatedPriceNumber: 15,
    viewLabel: "View Caddy",
    status: "backup",
    priority: 2,
    notes: "Backup cleaning caddy option for grouping daily-use items.",
  },

  // Pipe Maze
  {
    id: "pm-access",
    messType: "pipe-maze",
    role: "Access",
    componentType: "Narrow Side Organizer",
    productName: "REALINN Under Sink Organizer",
    reason: "Works around pipes instead of fighting the middle.",
    retailer: "Amazon",
    asin: "B0CFQDSSYB",
    price: "Check price",
    estimatedPriceNumber: 30,
    viewLabel: "View Organizer",
    status: "active",
    priority: 1,
    notes: "L-shaped pull-out organizer that can work around pipes and garbage disposal layouts.",
  },
  {
    id: "pm-access-backup",
    messType: "pipe-maze",
    role: "Access",
    componentType: "Narrow Side Organizer",
    productName: "REALINN Expandable Under Sink Organizer",
    reason: "Works around pipes instead of fighting the middle.",
    retailer: "Amazon",
    asin: "B0F1FP78GQ",
    price: "Check price",
    estimatedPriceNumber: 33,
    viewLabel: "View Organizer",
    status: "backup",
    priority: 2,
    notes: "Adjustable under sink organizer backup for pipe-heavy layouts.",
  },
  {
    id: "pm-protection",
    messType: "pipe-maze",
    role: "Protection",
    componentType: "Waterproof Cabinet Liner",
    productName: "Gorilla Grip LeakGuard Under Sink Mat",
    reason: "Protects the cabinet floor around plumbing.",
    retailer: "Amazon",
    asin: "B08H5W6BM4",
    price: "Check price",
    estimatedPriceNumber: 20,
    viewLabel: "View Liner",
    status: "active",
    priority: 1,
    notes: "Cabinet mat designed to protect the cabinet floor around plumbing.",
  },
  {
    id: "pm-control",
    messType: "pipe-maze",
    role: "Control",
    componentType: "Small Bins",
    productName: "Vtopmart Clear Storage Bins",
    reason: "Groups loose supplies without blocking pipes.",
    retailer: "Amazon",
    asin: "B0CRHNVF5D",
    price: "Check price",
    estimatedPriceNumber: 19,
    viewLabel: "View Bins",
    status: "active",
    priority: 1,
    notes: "Clear bins for grouping loose supplies without blocking pipes.",
  },

  // Tiny Cabinet Energy
  {
    id: "tc-access",
    messType: "tiny-cabinet-energy",
    role: "Access",
    componentType: "Slim Organizer",
    productName: "AIYAKA Pull-Out Cabinet Organizer",
    reason: "Adds order without eating the whole cabinet.",
    retailer: "Amazon",
    asin: "B08SWP49XQ",
    price: "Check price",
    estimatedPriceNumber: 22,
    viewLabel: "View Organizer",
    status: "active",
    priority: 1,
    notes: "Compact organizer option for smaller cabinet layouts.",
  },
  {
    id: "tc-access-backup-2",
    messType: "tiny-cabinet-energy",
    role: "Access",
    componentType: "Slim Organizer",
    productName: "SONGMICS 2-Tier Pull Out Organizer",
    reason: "Adds order without eating the whole cabinet.",
    retailer: "Amazon",
    asin: "B0CPSSG11V",
    price: "Check price",
    estimatedPriceNumber: 26,
    viewLabel: "View Organizer",
    status: "backup",
    priority: 2,
    notes: "Pull-out organizer backup with customizable basket height.",
  },
  {
    id: "tc-access-backup-3",
    messType: "tiny-cabinet-energy",
    role: "Access",
    componentType: "Slim Organizer",
    productName: "Simple Houseware Under Sink Organizer",
    reason: "Adds order without eating the whole cabinet.",
    retailer: "Amazon",
    asin: "B09NQV4V27",
    price: "Check price",
    estimatedPriceNumber: 22,
    viewLabel: "View Organizer",
    status: "backup",
    priority: 3,
    notes: "Simple backup option for small under sink cabinets.",
  },
  {
    id: "tc-protection",
    messType: "tiny-cabinet-energy",
    role: "Protection",
    componentType: "Waterproof Cabinet Liner",
    productName: "Gorilla Grip LeakGuard Under Sink Mat",
    reason: "Keeps the cabinet floor easier to clean.",
    retailer: "Amazon",
    asin: "B08H5W6BM4",
    price: "Check price",
    estimatedPriceNumber: 20,
    viewLabel: "View Liner",
    status: "active",
    priority: 1,
    notes: "Cabinet mat that keeps the floor easier to clean in small spaces.",
  },
  {
    id: "tc-control",
    messType: "tiny-cabinet-energy",
    role: "Control",
    componentType: "Stackable Tray",
    productName: "Delamu 2-Tier Multi-Purpose Organizer",
    reason: "Uses vertical space without overcomplicating it.",
    retailer: "Amazon",
    asin: "B0BNQ56MH5",
    price: "Check price",
    estimatedPriceNumber: 17,
    viewLabel: "View Tray",
    status: "active",
    priority: 1,
    notes: "Multi-purpose two-tier organizer for using vertical space.",
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
