import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.procareervista.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/templates",
    "/pricing",
    "/team",
    "/blog",
    "/contact",
    "/get-started",
    "/free-consultation",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/pricing" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/get-started" || path === "/pricing" ? 0.9 : 0.7,
  }));
}
