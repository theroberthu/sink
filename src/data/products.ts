import type { ComponentType, MessTypeId, Product } from "@/lib/types";

// Placeholder product catalog. Structured to mirror the Supabase `products` table
// so this can later be swapped for a database query without changing call sites.
// Affiliate URLs are placeholders for now.
export const PRODUCTS: Product[] = [
  // Bottle Avalanche
  {
    id: "ba-pull-out-organizer",
    componentType: "Pull Out Organizer",
    productName: "Glide Out Under Sink Drawer",
    reason: "Brings the back row to the front so nothing hides behind the trap.",
    price: "$32",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/pull-out-organizer",
    messType: "bottle-avalanche",
    role: "Main fix",
    active: true,
  },
  {
    id: "ba-cabinet-liner",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Catches drips and wipes clean so a leaky bottle is not a project.",
    price: "$14",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/cabinet-liner-ba",
    messType: "bottle-avalanche",
    role: "Cabinet protection",
    active: true,
  },
  {
    id: "ba-cleaning-caddy",
    componentType: "Cleaning Caddy",
    productName: "Grab and Go Cleaning Caddy",
    reason: "Holds your daily sprays in one handle so cleanup starts in two seconds.",
    price: "$18",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/cleaning-caddy",
    messType: "bottle-avalanche",
    role: "Grab and go",
    active: true,
  },

  // Pipe Maze
  {
    id: "pm-narrow-side-organizer",
    componentType: "Narrow Side Organizer",
    productName: "Slim Side Shelf for Under Sink",
    reason: "Claims the open space beside the pipes instead of fighting the middle.",
    price: "$28",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/narrow-side-organizer",
    messType: "pipe-maze",
    role: "Main fix",
    active: true,
  },
  {
    id: "pm-cabinet-liner",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Protects the base around the disposal where small leaks like to hide.",
    price: "$14",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/cabinet-liner-pm",
    messType: "pipe-maze",
    role: "Cabinet protection",
    active: true,
  },
  {
    id: "pm-small-bins",
    componentType: "Small Bins",
    productName: "Stackable Clear Bins, Set of 3",
    reason: "Fills the odd gaps the pipes create so dead space starts holding things.",
    price: "$22",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/small-bins",
    messType: "pipe-maze",
    role: "Grab and go",
    active: true,
  },

  // Tiny Cabinet Energy
  {
    id: "tc-slim-organizer",
    componentType: "Slim Organizer",
    productName: "Slim Two Tier Under Sink Rack",
    reason: "Adds a second level without eating the little floor space you have.",
    price: "$26",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/slim-organizer",
    messType: "tiny-cabinet-energy",
    role: "Main fix",
    active: true,
  },
  {
    id: "tc-stackable-tray",
    componentType: "Stackable Tray",
    productName: "Stackable Storage Tray",
    reason: "Goes up instead of out so your Jenga tower finally sits flat.",
    price: "$16",
    retailer: "Target",
    affiliateUrl: "https://example.com/affiliate/stackable-tray",
    messType: "tiny-cabinet-energy",
    role: "Grab and go",
    active: true,
  },
  {
    id: "tc-cabinet-liner",
    componentType: "Waterproof Cabinet Liner",
    productName: "Peel and Stick Waterproof Liner",
    reason: "Keeps the small base clean so every inch stays usable.",
    price: "$14",
    retailer: "Amazon",
    affiliateUrl: "https://example.com/affiliate/cabinet-liner-tc",
    messType: "tiny-cabinet-energy",
    role: "Cabinet protection",
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
