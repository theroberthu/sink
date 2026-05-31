import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The tool is interactive and offers nothing to index.
      disallow: ["/tool"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
