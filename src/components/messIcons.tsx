import { SprayCan, Wrench, Boxes, type LucideIcon } from "lucide-react";
import type { MessTypeId } from "@/lib/types";

// Line icons for each mess type. Kept abstract, no fake imagery.
// Exported as a record so call sites index it (instead of calling a factory during render).
export const MESS_ICONS: Record<MessTypeId, LucideIcon> = {
  "bottle-avalanche": SprayCan,
  "pipe-maze": Wrench,
  "tiny-cabinet-energy": Boxes,
};
