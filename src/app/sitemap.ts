import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/programe",
    "/rezerva-teren",
    "/despre-noi",
    "/tabere",
    "/contact",
  ];

  return routes.map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
