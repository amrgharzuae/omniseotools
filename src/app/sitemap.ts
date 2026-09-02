import { MetadataRoute } from "next";
import { TOOLS_REGISTRY } from "@/config/tools-registry";

const BASE_URL = "https://omniseotools.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Homepage
  const homePage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. All 10 Programmatic Tool Routes from tools-registry.ts
  const toolPages: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Legal & Compliance Informational Pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  return [
    ...homePage,
    ...toolPages,
    ...legalPages,
  ];
}
