import { ToolDefinition } from "@/types/tool";
import { ToolCategoryId } from "@/types/category";
import { serpPreviewTool } from "./seo/serp-preview";
import { openGraphPreviewTool } from "./social/open-graph-preview";
import { robotsTxtGeneratorTool } from "./developer/robots-txt-generator";
import { utmCampaignBuilderTool } from "./marketing/utm-campaign-builder";
import { urlSlugGeneratorTool } from "./seo/url-slug-generator";
import { keywordDensityAnalyzerTool } from "./content/keyword-density-analyzer";

export const TOOLS_REGISTRY: ToolDefinition[] = [
  serpPreviewTool,
  openGraphPreviewTool,
  robotsTxtGeneratorTool,
  utmCampaignBuilderTool,
  urlSlugGeneratorTool,
  keywordDensityAnalyzerTool,
];

export function getAllTools(): ToolDefinition[] {
  return TOOLS_REGISTRY;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find((t) => t.slug === slug || t.id === slug);
}

export function getToolsByCategory(category: ToolCategoryId): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((t) => t.category === category);
}

export function getFeaturedTools(): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((t) => t.featured);
}
