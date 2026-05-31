import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Crawlable content routes. The interactive /tool is intentionally excluded.
const ROUTES = [
  "/",
  "/kitchen-sink-reset",
  "/kitchen-sink-reset/bottle-avalanche",
  "/kitchen-sink-reset/pipe-maze",
  "/kitchen-sink-reset/tiny-cabinet-energy",
  "/under-sink-organizer-measurement-guide",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" || route === "/kitchen-sink-reset" ? 1 : 0.7,
  }));
}
