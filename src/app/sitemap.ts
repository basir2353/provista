import type { MetadataRoute } from "next";
import { api } from "@/lib/api";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.procareervista.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/pricing" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/get-started" || path === "/pricing" ? 0.9 : 0.7,
  }));

  const posts = await api.blog.list().catch(() => []);
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || now),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
