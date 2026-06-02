import type { ComponentType, MessTypeId, Product } from "@/lib/types";

// Placeholder product catalog. Structured to mirror the Supabase `products` table
// so this can later be swapped for a database query without changing call sites.
// Affiliate URLs are placeholders for now. Each mess type forms one curated 3 piece
// setup with an Access piece, a Protection piece, and a Control piece.
export const PRODUCTS: Product[] = [
  // Bottle Avalanche
  {
    id: "ba-pull-out-organizer",
    componentType: "Pull Out Organizer",
    productName: "Glide Out Under Sink Drawer",
    reason: "Makes the back of the cabinet reachable.",
    price: "$32",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/pull-out-organizer",
    messType: "bottle-avalanche",
    role: "Access",
    viewLabel: "View Organizer",
    active: true,
  },
  {
    id: "ba-cabinet-liner",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Catches leaks, spills, and sticky bottle rings.",
    price: "$14",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/cabinet-liner-ba",
    messType: "bottle-avalanche",
    role: "Protection",
    viewLabel: "View Liner",
    active: true,
  },
  {
    id: "ba-cleaning-caddy",
    componentType: "Cleaning Caddy",
    productName: "Grab and Go Cleaning Caddy",
    reason: "Keeps daily-use items together.",
    price: "$18",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/cleaning-caddy",
    messType: "bottle-avalanche",
    role: "Control",
    viewLabel: "View Caddy",
    active: true,
  },

  // Pipe Maze
  {
    id: "pm-narrow-side-organizer",
    componentType: "Narrow Side Organizer",
    productName: "Slim Side Shelf for Under Sink",
    reason: "Works around pipes instead of fighting the middle.",
    price: "$28",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/narrow-side-organizer",
    messType: "pipe-maze",
    role: "Access",
    viewLabel: "View Organizer",
    active: true,
  },
  {
    id: "pm-cabinet-liner",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Protects the cabinet floor around plumbing.",
    price: "$14",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/cabinet-liner-pm",
    messType: "pipe-maze",
    role: "Protection",
    viewLabel: "View Liner",
    active: true,
  },
  {
    id: "pm-small-bins",
    componentType: "Small Bins",
    productName: "Stackable Clear Bins, Set of 3",
    reason: "Groups loose supplies without blocking pipes.",
    price: "$22",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/small-bins",
    messType: "pipe-maze",
    role: "Control",
    viewLabel: "View Bins",
    active: true,
  },

  // Tiny Cabinet Energy
  {
    id: "tc-slim-organizer",
    componentType: "Slim Organizer",
    productName: "Slim Two Tier Under Sink Rack",
    reason: "Adds order without eating the whole cabinet.",
    price: "$26",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/slim-organizer",
    messType: "tiny-cabinet-energy",
    role: "Access",
    viewLabel: "View Organizer",
    active: true,
  },
  {
    id: "tc-cabinet-liner",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Keeps the cabinet floor easier to clean.",
    price: "$14",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/cabinet-liner-tc",
    messType: "tiny-cabinet-energy",
    role: "Protection",
    viewLabel: "View Liner",
    active: true,
  },
  {
    id: "tc-stackable-tray",
    componentType: "Stackable Tray",
    productName: "Stackable Storage Tray",
    reason: "Uses vertical space without overcomplicating it.",
    price: "$16",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/stackable-tray",
    messType: "tiny-cabinet-energy",
    role: "Control",
    viewLabel: "View Tray",
    active: true,
  },
];

/**
 * Returns the active products for a mess type, ordered to match the mess type's
 * component list. This is the single source for the 3 piece reset on the result page.
 */
export function getProductsForMessType(
  messType: MessTypeId,
  componentOrder: ComponentType[],
): Product[] {
  const pool = PRODUCTS.filter((product) => product.messType === messType && product.active);
  const ordered: Product[] = [];
  for (const component of componentOrder) {
    const match = pool.find((product) => product.componentType === component);
    if (match) {
      ordered.push(match);
    }
  }
  return ordered;
}
