import type { MetadataRoute } from "next";
import { formatSlugs, partnerVerticals } from "@/lib/data";

const baseUrl = "https://jrvintagemedia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/quote", "/partner", "/partner-enquiry", "/privacy", "/terms"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })
  );

  const formatRoutes = formatSlugs.map((slug) => ({
    url: `${baseUrl}/formats/${slug}`,
    lastModified: new Date(),
  }));

  const partnerRoutes = partnerVerticals.map((vertical) => ({
    url: `${baseUrl}/partner/${vertical.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...formatRoutes, ...partnerRoutes];
}
