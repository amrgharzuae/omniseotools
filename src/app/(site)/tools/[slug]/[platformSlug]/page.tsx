import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Sparkles, CheckCircle2, Server } from "lucide-react";
import {
  getAllProgrammaticTools,
  getProgrammaticToolBySlug,
} from "@/config/tools-registry";
import {
  getAllPlatforms,
  getPlatformBySlug,
  getPlatformToolContent,
} from "@/config/platforms-registry";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  generateToolSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/schema-generator";
import { PlatformGuide } from "@/components/platform/PlatformGuide";
import { PlatformFAQ } from "@/components/platform/PlatformFAQ";
import { PlatformSwitcher } from "@/components/platform/PlatformSwitcher";
import { PlatformAffiliateSlot } from "@/components/platform/PlatformAffiliateSlot";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";

// Interactive Tool Components
import { SocialPreviewer } from "@/components/tools/social/SocialPreviewer";
import { SERPPreviewer } from "@/components/tools/serp/SERPPreviewer";
import { ReadabilityCalculator } from "@/components/tools/content/ReadabilityCalculator";
import { KeywordDensity } from "@/components/tools/content/KeywordDensity";
import { MetaTagGenerator } from "@/components/tools/developer/MetaTagGenerator";
import { FaviconGeneratorTool } from "@/components/tools/developer/FaviconGeneratorTool";
import { DynamicToolGenerator } from "@/components/tools/dynamic/DynamicToolGenerator";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";

interface PlatformToolPageProps {
  params: Promise<{
    slug: string;
    platformSlug: string;
  }>;
}

export async function generateStaticParams() {
  const tools = getAllProgrammaticTools();
  const platforms = getAllPlatforms();

  const paramsList: { slug: string; platformSlug: string }[] = [];

  for (const tool of tools) {
    for (const platform of platforms) {
      paramsList.push({
        slug: tool.slug,
        platformSlug: platform.slug,
      });
    }
  }

  return paramsList;
}

export async function generateMetadata({
  params,
}: PlatformToolPageProps): Promise<Metadata> {
  const { slug, platformSlug } = await params;
  const tool = getProgrammaticToolBySlug(slug);
  const platform = getPlatformBySlug(platformSlug);

  if (!tool || !platform) {
    return {};
  }

  const content = getPlatformToolContent(slug, platformSlug);
  const canonicalUrl = `https://omniseotools.com/tools/${slug}/${platformSlug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: [
      ...(tool.keywords || []),
      `${tool.name.toLowerCase()} ${platform.name.toLowerCase()}`,
      `${platform.name.toLowerCase()} seo meta tags`,
      `${platform.name.toLowerCase()} open graph tags`,
      `${platform.name.toLowerCase()} twitter cards`,
      `${platform.name.toLowerCase()} preview tool`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonicalUrl,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function PlatformToolPage({
  params,
}: PlatformToolPageProps) {
  const { slug, platformSlug } = await params;
  const tool = getProgrammaticToolBySlug(slug);
  const platform = getPlatformBySlug(platformSlug);

  if (!tool || !platform) {
    notFound();
  }

  const content = getPlatformToolContent(slug, platformSlug);
  const canonicalUrl = `https://omniseotools.com/tools/${tool.slug}/${platform.slug}`;

  // Generate Composite Structured Data (WebApplication, BreadcrumbList, FAQPage)
  const toolSchema = generateToolSchema({ tool, platform, canonicalUrl });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://omniseotools.com" },
    { name: "Platforms", url: "https://omniseotools.com/platforms" },
    { name: platform.name, url: `https://omniseotools.com/platforms/${platform.slug}` },
    { name: tool.name, url: `https://omniseotools.com/tools/${tool.slug}` },
    { name: `${tool.name} for ${platform.name}`, url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(content.faqs);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Injected Structured Data (WebApplication + BreadcrumbList + FAQPage) */}
      <JsonLd schema={[toolSchema, breadcrumbSchema, faqSchema]} />

      {/* 2. Hero Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-8 pt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Semantic Breadcrumbs */}
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link
              href="/platforms"
              className="hover:text-indigo-600 transition-colors font-medium"
            >
              Platforms
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link
              href={`/platforms/${platform.slug}`}
              className="hover:text-indigo-600 font-medium transition-colors"
            >
              {platform.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link
              href={`/tools/${tool.slug}`}
              className="hover:text-indigo-600 font-medium transition-colors truncate max-w-[150px] sm:max-w-none"
            >
              {tool.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 dark:text-slate-200 font-semibold">
              {platform.name}
            </span>
          </nav>

          {/* Heading and Platform Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {content.h1}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Server className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              {platform.name} Integration
            </span>
            {tool.badge && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <Sparkles className="h-3 w-3" />
                {tool.badge}
              </span>
            )}
          </div>

          {/* 1-Sentence Tagline */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {content.tagline}
          </p>

          {/* Trust Micro-Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Free & Client-Side Private
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Copy-Paste {platform.name} Snippets
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> 2026 Engine Rules
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Pre-Reserved AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Platform Cross-Links Switcher */}
        <PlatformSwitcher
          toolSlug={tool.slug}
          currentPlatformSlug={platform.slug}
        />

        {/* 3. Interactive Tool Widget */}
        <section className="mt-2" id="tool-interactive" aria-label="Interactive Tool">
          <ToolErrorBoundary toolSlug={tool.slug} toolName={`${tool.name} for ${platform.name}`}>
            {tool.slug === "twitter-card-preview" ? (
              <SocialPreviewer defaultPlatform="twitter" toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "linkedin-link-preview" ? (
              <SocialPreviewer defaultPlatform="linkedin" toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "facebook-open-graph-debugger" ? (
              <SocialPreviewer defaultPlatform="facebook" toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "discord-embed-generator" ? (
              <SocialPreviewer defaultPlatform="discord" toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "meta-title-pixel-checker" ? (
              <SERPPreviewer mode="title-pixel" toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "meta-description-length-counter" ? (
              <SERPPreviewer mode="description-counter" toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "google-serp-simulator" ? (
              <SERPPreviewer mode="full-simulator" toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "flesch-kincaid-calculator" ? (
              <ReadabilityCalculator />
            ) : tool.slug === "keyword-density-checker" ? (
              <KeywordDensity />
            ) : tool.slug === "open-graph-meta-generator" ? (
              <MetaTagGenerator toolSlug={tool.slug} toolName={tool.name} />
            ) : tool.slug === "favicon-meta-generator" || tool.slug === "favicon-generator" ? (
              <FaviconGeneratorTool toolSlug={tool.slug} toolName={tool.name} platform={platform} />
            ) : tool.slug === "open-graph-preview" ? (
              <SocialPreviewer defaultPlatform="twitter" toolSlug={tool.slug} toolName={tool.name} />
            ) : (
              <DynamicToolGenerator tool={tool} platform={platform} />
            )}
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Strategy 4: High-Intent Contextual Platform Affiliate / Resource Callout */}
        {platform.affiliateSlot && (
          <PlatformAffiliateSlot
            affiliate={platform.affiliateSlot}
            platformName={platform.name}
          />
        )}

        {/* 4. Platform-Specific Guide with Copyable Snippet */}
        <PlatformGuide tool={tool} platform={platform} content={content} />

        {/* Feature Comparison Matrix (SaaS vs OmniSEO Tools) */}
        <ComparisonMatrix
          toolName={tool.name}
          platformName={platform.name}
          category={tool.category}
        />

        {/* 5. Platform-Specific FAQ Accordion */}
        <PlatformFAQ
          platformName={platform.name}
          toolName={tool.name}
          faqs={content.faqs}
        />

        {/* 6. Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={tool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
