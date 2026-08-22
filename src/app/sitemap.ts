import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/config/categories";
import { getAllTools } from "@/config/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // 1. Static Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: baseUrl + "/about",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: baseUrl + "/privacy",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: baseUrl + "/terms",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 2. Category Hub Pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: baseUrl + "/tools/" + cat.slug,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Individual Tool Pages
  const allTools = getAllTools();
  const toolPages: MetadataRoute.Sitemap = allTools.map((tool) => ({
    url: baseUrl + "/tools/" + tool.category + "/" + tool.slug,
    lastModified: now,
    changeFrequency: "daily",
    priority: tool.status === "active" ? 0.9 : 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
