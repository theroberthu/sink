import type { MessType, MessTypeId } from "@/lib/types";

// The 3 mess types. Order is intentional and used across the site.
export const MESS_TYPES: MessType[] = [
  {
    id: "bottle-avalanche",
    name: "Bottle Avalanche",
    shortDescription:
      "Sprays, soaps, trash bags, dishwasher pods, and one mystery bottle from 2019.",
    diagnosis:
      "You have plenty of stuff and not enough front row seating. The fix is to pull everything forward so the back row stops swallowing your bottles.",
    components: ["Pull Out Organizer", "Waterproof Cabinet Liner", "Cleaning Caddy"],
  },
  {
    id: "pipe-maze",
    name: "Pipe Maze",
    shortDescription:
      "Pipes, garbage disposal, and awkward dead space that make normal organizers annoying.",
    diagnosis:
      "The plumbing owns the middle of your cabinet. The fix is to work around it with narrow pieces that claim the sides instead of fighting the pipes.",
    components: ["Narrow Side Organizer", "Waterproof Cabinet Liner", "Small Bins"],
  },
  {
    id: "tiny-cabinet-energy",
    name: "Tiny Cabinet Energy",
    shortDescription:
      "Small cabinet, limited room, and everything stacked like a bad game of Jenga.",
    diagnosis:
      "You are short on floor space, so the answer is up. The fix stacks vertically and keeps the footprint slim so nothing topples.",
    components: ["Slim Organizer", "Stackable Tray", "Waterproof Cabinet Liner"],
  },
];

export function getMessType(id: MessTypeId): MessType | undefined {
  return MESS_TYPES.find((mess) => mess.id === id);
}

export function isMessTypeId(value: string): value is MessTypeId {
  return MESS_TYPES.some((mess) => mess.id === value);
}
