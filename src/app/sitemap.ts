import { MetadataRoute } from "next";
import { TOOLS_REGISTRY } from "@/config/tools-registry";
import { PLATFORMS_REGISTRY } from "@/config/platforms-registry";
import { getAllPosts } from "@/lib/blog";
import { RECIPES_DATA } from "@/config/recipes-data";
import { UTM_PLATFORMS } from "@/config/utm-platforms";
import { SERP_PLATFORMS } from "@/config/serp-platforms";
import { ARABIC_DECODER_PLATFORMS } from "@/config/arabic-decoder-platforms";
import { OG_SAFEZONE_PLATFORMS } from "@/config/og-safezone-platforms";
import { ROBOTS_PLATFORMS } from "@/config/robots-platforms";
import { SCHEMA_PLATFORMS } from "@/config/schema-platforms";
import { CANONICAL_PLATFORMS } from "@/config/canonical-redirect-platforms";
import { OG_VALIDATOR_PLATFORMS } from "@/config/open-graph-validator-platforms";
import { XML_SITEMAP_PLATFORMS } from "@/config/xml-sitemap-platforms";
import { AI_CRAWLER_FIREWALL_PLATFORMS } from "@/config/ai-crawler-firewall-platforms";

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

  // 5. Tool-Specific Sub-Routes (e.g. UTM Campaign Builder Platform Presets)
  const utmPlatformSubRoutes: MetadataRoute.Sitemap = UTM_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/utm-campaign-builder/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5b. Google SERP Simulator Platform Presets (Shopify, WordPress, Squarespace)
  const serpPlatformSubRoutes: MetadataRoute.Sitemap = SERP_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/google-serp-simulator/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5c. Arabic URL Decoder Platform Presets (Shopify, WooCommerce, WordPress)
  const arabicDecoderPlatformSubRoutes: MetadataRoute.Sitemap = ARABIC_DECODER_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/arabic-url-decoder/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5d. Open Graph Image Safe Zone Platform Presets (Shopify, WordPress, Next.js)
  const ogSafeZonePlatformSubRoutes: MetadataRoute.Sitemap = OG_SAFEZONE_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/open-graph-image-safe-zone/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5e. Robots.txt Generator Platform Presets (Shopify, WordPress, Next.js)
  const robotsPlatformSubRoutes: MetadataRoute.Sitemap = ROBOTS_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/robots-txt-generator-validator/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5f. JSON-LD Schema Validator Platform Presets (Shopify, WordPress, Next.js)
  const schemaPlatformSubRoutes: MetadataRoute.Sitemap = SCHEMA_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/schema-validator/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5g. Canonical URL & Redirect Auditor Platform Presets (Shopify, WordPress, Next.js)
  const canonicalRedirectPlatformSubRoutes: MetadataRoute.Sitemap = CANONICAL_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/canonical-redirect-auditor/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5h. Open Graph & Social Card Validator Platform Presets (Shopify, WordPress, Next.js)
  const ogValidatorPlatformSubRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tools/open-graph-validator`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...OG_VALIDATOR_PLATFORMS.map((platform) => ({
      url: `${BASE_URL}/tools/open-graph-validator/${platform.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // 5i. XML Sitemap Generator & Validator Platform Presets (Shopify, WordPress, Next.js)
  const xmlSitemapPlatformSubRoutes: MetadataRoute.Sitemap = XML_SITEMAP_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/xml-sitemap-generator/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 5j. AI Crawler Firewall Platform Presets (Cloudflare, Next.js, Nginx)
  const aiCrawlerFirewallPlatformSubRoutes: MetadataRoute.Sitemap = AI_CRAWLER_FIREWALL_PLATFORMS.map((platform) => ({
    url: `${BASE_URL}/tools/ai-crawler-firewall/${platform.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 6. Technical Blog Directory & Static Articles
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

  // 7. Developer Recipes & Error Guides
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

  // 8. Legal & Compliance Informational Pages
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
    ...utmPlatformSubRoutes,
    ...serpPlatformSubRoutes,
    ...arabicDecoderPlatformSubRoutes,
    ...ogSafeZonePlatformSubRoutes,
    ...robotsPlatformSubRoutes,
    ...schemaPlatformSubRoutes,
    ...canonicalRedirectPlatformSubRoutes,
    ...ogValidatorPlatformSubRoutes,
    ...xmlSitemapPlatformSubRoutes,
    ...aiCrawlerFirewallPlatformSubRoutes,
    ...blogPages,
    ...recipePages,
    ...legalPages,
  ];
}
