import { MetadataRoute } from "next";
import { getAllTools } from "@/config/tools";
import { CATEGORIES } from "@/config/categories";

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

  // 2. Primary Featured Tool: SERP Simulator
  const primaryToolPage: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tools/seo/serp-preview`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 3. Dynamic Category Hub Pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Dynamic Tool Registry Pages (excluding duplicate serp-preview path)
  const allTools = getAllTools();
  const toolPages: MetadataRoute.Sitemap = allTools
    .filter((tool) => tool.slug !== "serp-preview")
    .map((tool) => ({
      url: `${BASE_URL}/tools/${tool.category}/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: tool.status === "active" ? 0.85 : 0.7,
    }));

  // 5. Static Informational & Compliance Pages
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
    ...primaryToolPage,
    ...categoryPages,
    ...toolPages,
    ...staticPages,
  ];
}
