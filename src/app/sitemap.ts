import { MetadataRoute } from "next";
import { TOOLS_REGISTRY } from "@/config/tools-registry";
import { PLATFORMS_REGISTRY } from "@/config/platforms-registry";
import { getAllPosts } from "@/lib/blog";
import { RECIPES_DATA } from "@/config/recipes-data";

const BASE_URL = "https://omniseotools.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogPosts = getAllPosts();

  // 1. Homepage
  const homePage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. All Core Programmatic Tool Routes from tools-registry.ts + Tools Directory
  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...TOOLS_REGISTRY.map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // 3. Platform Index & Hub Pages (All 8 Platforms)
  const platformPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/platforms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...PLATFORMS_REGISTRY.map((platform) => ({
      url: `${BASE_URL}/platforms/${platform.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // 4. Programmatic Platform Pages (Tool x Platform Permutations)
  const programmaticPlatformPages: MetadataRoute.Sitemap = [];
  for (const tool of TOOLS_REGISTRY) {
    for (const platform of PLATFORMS_REGISTRY) {
      programmaticPlatformPages.push({
        url: `${BASE_URL}/tools/${tool.slug}/${platform.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // 5. Technical Blog Directory & Static Articles
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // 6. Developer Recipes & Error Guides
  const recipePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/recipes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...RECIPES_DATA.map((recipe) => ({
      url: `${BASE_URL}/recipes/${recipe.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  // 7. Legal & Compliance Informational Pages
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
    ...platformPages,
    ...programmaticPlatformPages,
    ...blogPages,
    ...recipePages,
    ...legalPages,
  ];
}
