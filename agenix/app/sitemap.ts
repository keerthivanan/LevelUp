import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog-posts";

const BASE = "https://agenix.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/stores`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/agents`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/automation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`,                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/contact`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/privacy`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url:             `${BASE}/blog/${post.slug}`,
    lastModified:    new Date(),
    changeFrequency: "yearly",
    priority:        0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
