"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ToolDefinition } from "@/types/tool";
import { getAllTools, getProgrammaticToolBySlug } from "@/config/tools-registry";
import {
  Sparkles,
  ArrowRight,
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
  FileText,
  Code2,
  Globe,
  Languages,
  Bot,
  FileCode,
  ShoppingBag,
  Crop,
  TrendingUp,
  Shuffle,
  Tag,
  SlidersHorizontal,
  Newspaper,
  Lock,
  Layers,
  Search,
  Zap,
} from "lucide-react";

export interface RelatedToolsProps {
  currentTool?: ToolDefinition;
  currentToolId?: string;
  category?: string;
  customRelatedIds?: string[];
  maxCount?: number;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
  FileText,
  Code2,
  Globe,
  Languages,
  Bot,
  FileCode,
  Sparkles,
  ShoppingBag,
  Crop,
  TrendingUp,
  Shuffle,
  Tag,
  SlidersHorizontal,
  Newspaper,
  Lock,
  Layers,
  Search,
  Zap,
};

// High-Intent Workflow Clusters (Deterministic SEO & Engineering Journeys)
const WORKFLOW_CLUSTERS: Record<string, string[]> = {
  // 1. Crawl & Indexing Cluster
  "robots-txt-generator-validator": [
    "xml-sitemap-generator",
    "redirect-rule-generator",
    "canonical-tag-generator",
    "meta-robots-builder",
  ],
  "xml-sitemap-generator": [
    "robots-txt-generator-validator",
    "redirect-rule-generator",
    "canonical-tag-generator",
    "canonical-url-builder",
  ],
  "redirect-rule-generator": [
    "canonical-tag-generator",
    "xml-sitemap-generator",
    "robots-txt-generator-validator",
    "canonical-url-builder",
  ],
  "canonical-tag-generator": [
    "redirect-rule-generator",
    "canonical-url-builder",
    "xml-sitemap-generator",
    "robots-txt-generator-validator",
  ],
  "canonical-url-builder": [
    "canonical-tag-generator",
    "redirect-rule-generator",
    "xml-sitemap-generator",
    "open-graph-meta-generator",
  ],
  "meta-robots-builder": [
    "robots-txt-generator-validator",
    "canonical-tag-generator",
    "xml-sitemap-generator",
    "security-headers-meta-generator",
  ],

  // 2. Structured Data Cluster
  "product-schema-generator": [
    "article-schema-generator",
    "faq-schema-generator",
    "breadcrumb-schema-generator",
    "schema-markup-generator",
  ],
  "article-schema-generator": [
    "product-schema-generator",
    "faq-schema-generator",
    "breadcrumb-schema-generator",
    "schema-markup-generator",
  ],
  "faq-schema-generator": [
    "breadcrumb-schema-generator",
    "article-schema-generator",
    "product-schema-generator",
    "schema-markup-generator",
  ],
  "breadcrumb-schema-generator": [
    "faq-schema-generator",
    "product-schema-generator",
    "article-schema-generator",
    "schema-markup-generator",
  ],
  "schema-markup-generator": [
    "article-schema-generator",
    "product-schema-generator",
    "faq-schema-generator",
    "breadcrumb-schema-generator",
  ],

  // 3. Social & Open Graph Cluster
  "open-graph-image-safe-zone": [
    "open-graph-preview",
    "twitter-card-preview",
    "facebook-open-graph-debugger",
    "linkedin-link-preview",
  ],
  "open-graph-preview": [
    "open-graph-image-safe-zone",
    "twitter-card-preview",
    "facebook-open-graph-debugger",
    "open-graph-meta-generator",
  ],
  "twitter-card-preview": [
    "open-graph-image-safe-zone",
    "open-graph-preview",
    "facebook-open-graph-debugger",
    "discord-embed-generator",
  ],
  "facebook-open-graph-debugger": [
    "open-graph-image-safe-zone",
    "open-graph-preview",
    "twitter-card-preview",
    "linkedin-link-preview",
  ],
  "linkedin-link-preview": [
    "open-graph-image-safe-zone",
    "twitter-card-preview",
    "facebook-open-graph-debugger",
    "social-share-link-generator",
  ],
  "discord-embed-generator": [
    "twitter-card-preview",
    "open-graph-preview",
    "social-share-link-generator",
    "open-graph-image-safe-zone",
  ],
  "social-share-link-generator": [
    "twitter-card-preview",
    "linkedin-link-preview",
    "discord-embed-generator",
    "open-graph-preview",
  ],
  "open-graph-meta-generator": [
    "open-graph-preview",
    "open-graph-image-safe-zone",
    "twitter-card-preview",
    "meta-viewport-generator",
  ],

  // 4. SERP & Snippet Cluster
  "google-serp-simulator": [
    "meta-title-pixel-checker",
    "meta-description-length-counter",
    "flesch-kincaid-calculator",
    "keyword-density-checker",
  ],
  "meta-title-pixel-checker": [
    "google-serp-simulator",
    "meta-description-length-counter",
    "keyword-density-checker",
    "flesch-kincaid-calculator",
  ],
  "meta-description-length-counter": [
    "meta-title-pixel-checker",
    "google-serp-simulator",
    "flesch-kincaid-calculator",
    "keyword-density-checker",
  ],

  // 5. International & URL Cluster
  "hreflang-tag-generator": [
    "hreflang-tags-generator",
    "arabic-url-decoder",
    "utm-campaign-builder",
    "canonical-url-builder",
  ],
  "hreflang-tags-generator": [
    "hreflang-tag-generator",
    "arabic-url-decoder",
    "utm-campaign-builder",
    "canonical-tag-generator",
  ],
  "arabic-url-decoder": [
    "utm-campaign-builder",
    "hreflang-tags-generator",
    "hreflang-tag-generator",
    "canonical-tag-generator",
  ],
  "utm-campaign-builder": [
    "arabic-url-decoder",
    "social-share-link-generator",
    "hreflang-tags-generator",
    "google-serp-simulator",
  ],

  // 6. Content & Copywriting Cluster
  "flesch-kincaid-calculator": [
    "keyword-density-checker",
    "meta-description-length-counter",
    "meta-title-pixel-checker",
    "google-serp-simulator",
  ],
  "keyword-density-checker": [
    "flesch-kincaid-calculator",
    "meta-title-pixel-checker",
    "meta-description-length-counter",
    "google-serp-simulator",
  ],

  // 7. Web & Developer Cluster
  "favicon-meta-generator": [
    "meta-viewport-generator",
    "security-headers-meta-generator",
    "open-graph-meta-generator",
    "robots-txt-generator-validator",
  ],
  "meta-viewport-generator": [
    "resource-hint-generator",
    "favicon-meta-generator",
    "security-headers-meta-generator",
    "open-graph-meta-generator",
  ],
  "security-headers-meta-generator": [
    "resource-hint-generator",
    "favicon-meta-generator",
    "meta-viewport-generator",
    "robots-txt-generator-validator",
  ],

  // 8. Core Web Vitals & Resource Hints Cluster
  "resource-hint-generator": [
    "meta-viewport-generator",
    "security-headers-meta-generator",
    "robots-txt-generator-validator",
    "xml-sitemap-generator",
  ],
};

export function RelatedTools({
  currentTool,
  currentToolId,
  category,
  customRelatedIds,
  maxCount = 4,
}: RelatedToolsProps) {
  const allTools = useMemo(() => getAllTools(), []);

  // Determine active identifier and category
  const activeSlug = (
    currentTool?.slug ||
    currentTool?.id ||
    currentToolId ||
    ""
  ).toLowerCase().trim();

  const activeCategory =
    category || currentTool?.category || (activeSlug ? allTools.find((t) => t.slug === activeSlug || t.id === activeSlug)?.category : undefined);

  const relatedTools = useMemo(() => {
    const list: ToolDefinition[] = [];
    const addedSlugs = new Set<string>();

    if (activeSlug) {
      addedSlugs.add(activeSlug);
    }

    // 1. Explicit Overrides
    if (customRelatedIds && customRelatedIds.length > 0) {
      for (const id of customRelatedIds) {
        const found = getProgrammaticToolBySlug(id) || allTools.find((t) => t.id === id || t.slug === id);
        if (found && !addedSlugs.has(found.slug)) {
          list.push(found);
          addedSlugs.add(found.slug);
        }
      }
    }

    // 2. High-Intent Workflow Cluster Mapping
    if (list.length < maxCount && activeSlug && WORKFLOW_CLUSTERS[activeSlug]) {
      for (const clusterSlug of WORKFLOW_CLUSTERS[activeSlug]) {
        if (list.length >= maxCount) break;
        const found = getProgrammaticToolBySlug(clusterSlug) || allTools.find((t) => t.id === clusterSlug || t.slug === clusterSlug);
        if (found && !addedSlugs.has(found.slug)) {
          list.push(found);
          addedSlugs.add(found.slug);
        }
      }
    }

    // 3. Category Fallback
    if (list.length < maxCount && activeCategory) {
      const sameCatTools = allTools.filter(
        (t) => t.category === activeCategory && !addedSlugs.has(t.slug)
      );
      for (const tool of sameCatTools) {
        if (list.length >= maxCount) break;
        list.push(tool);
        addedSlugs.add(tool.slug);
      }
    }

    // 4. Global Fallback
    if (list.length < maxCount) {
      const remainingTools = allTools.filter((t) => !addedSlugs.has(t.slug));
      for (const tool of remainingTools) {
        if (list.length >= maxCount) break;
        list.push(tool);
        addedSlugs.add(tool.slug);
      }
    }

    return list.slice(0, maxCount);
  }, [allTools, activeSlug, activeCategory, customRelatedIds, maxCount]);

  if (relatedTools.length === 0) return null;

  return (
    <section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Related Tools &amp; Next Workflow Steps
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Complementary utilities to streamline your SEO audit, indexing, and content strategy.
          </p>
        </div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors self-start sm:self-auto"
        >
          <span>Browse All 32 Utilities</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedTools.map((tool) => {
          const IconComponent = ICON_MAP[tool.icon] || Sparkles;
          const isClickable = tool.status === "active";

          return (
            <div
              key={tool.slug}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-200"
            >
              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  {tool.badge && (
                    <span className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                      {tool.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              {/* Footer / CTA */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {tool.category}
                </span>

                {isClickable ? (
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline"
                  >
                    <span>Open</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <span className="text-slate-400">Upcoming</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
