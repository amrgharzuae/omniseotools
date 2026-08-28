import { MetadataRoute } from "next";
import { getAllTools } from "@/config/tools";
import { CATEGORIES } from "@/config/categories";
import platformsData from "@/data/utm-platforms.json";

const BASE_URL = "https://www.omniseotools.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Core Homepage
  const homePage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // 2. Primary Featured Tools (Dedicated Routes with Deep Content)
  const primaryToolPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tools/seo/serp-preview`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/social/open-graph-preview`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/marketing/utm-campaign-builder`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 3. Programmatic Platform Pages for UTM Campaign Builder
  const platformPages: MetadataRoute.Sitemap = platformsData.map((p) => ({
    url: `${BASE_URL}/tools/marketing/utm-campaign-builder/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic Category Hub Pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Dynamic Tool Registry Pages (excluding dedicated route paths)
  const dedicatedSlugs = ["serp-preview", "open-graph-preview", "utm-campaign-builder"];
  const allTools = getAllTools();
  const toolPages: MetadataRoute.Sitemap = allTools
    .filter((tool) => !dedicatedSlugs.includes(tool.slug))
    .map((tool) => ({
      url: `${BASE_URL}/tools/${tool.category}/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: tool.status === "active" ? 0.85 : 0.7,
    }));

  // 6. Static Informational & Compliance Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [
    ...homePage,
    ...primaryToolPages,
    ...platformPages,
    ...categoryPages,
    ...toolPages,
    ...staticPages,
  ];
}
