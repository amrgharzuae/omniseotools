import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
} from "lucide-react";
import { getProgrammaticToolBySlug, getAllProgrammaticTools, getToolsByCategory } from "@/config/tools-registry";
import { CATEGORIES, getCategoryBySlug } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { StructuredData } from "@/components/seo/StructuredData";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";

// Interactive Tool Components
import { SocialPreviewer } from "@/components/tools/social/SocialPreviewer";
import { SERPPreviewer } from "@/components/tools/serp/SERPPreviewer";
import { ReadabilityCalculator } from "@/components/tools/content/ReadabilityCalculator";
import { KeywordDensity } from "@/components/tools/content/KeywordDensity";
import { MetaTagGenerator } from "@/components/tools/developer/MetaTagGenerator";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
};

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tools = getAllProgrammaticTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getProgrammaticToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const canonicalUrl = `https://omniseotools.com/tools/${tool.slug}`;

  return {
    title: tool.metaTitle || tool.title || tool.name,
    description: tool.metaDescription || tool.shortDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: tool.metaTitle || tool.title || tool.name,
      description: tool.metaDescription || tool.shortDescription,
      url: canonicalUrl,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle || tool.title || tool.name,
      description: tool.metaDescription || tool.shortDescription,
    },
  };
}


export default async function ProgrammaticToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getProgrammaticToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const canonicalUrl = `https://omniseotools.com/tools/${tool.slug}`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Injected Structured Data (SoftwareApplication + FAQPage) */}
      <StructuredData tool={tool} url={canonicalUrl} />

      {/* 2. Page Hero Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-8 pt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Semantic Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link
              href={`/#category-${tool.category}`}
              className="hover:text-indigo-600 uppercase font-medium transition-colors"
            >
              {tool.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium truncate">
              {tool.name}
            </span>
          </nav>

          {/* H1 Heading and Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {tool.h1 || tool.name}
            </h1>
            {tool.badge && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                <Sparkles className="h-3 w-3" />
                {tool.badge}
              </span>
            )}
          </div>

          {/* 1-Sentence Tagline / Value Proposition */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {tool.tagline || tool.shortDescription}
          </p>

          {/* Trust & Guarantee Micro-Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Free & Client-Side Private
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Instant Real-Time Preview
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> 2026 Engine Metrics
            </span>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        
        {/* Top Pre-Reserved AdSlot (Zero-CLS) */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* 3. Interactive Tool Widget */}
        <section className="mt-4" id="tool-interactive">
          {tool.slug === "twitter-card-preview" ? (
            <SocialPreviewer defaultPlatform="twitter" />
          ) : tool.slug === "linkedin-link-preview" ? (
            <SocialPreviewer defaultPlatform="linkedin" />
          ) : tool.slug === "facebook-open-graph-debugger" ? (
            <SocialPreviewer defaultPlatform="facebook" />
          ) : tool.slug === "discord-embed-generator" ? (
            <SocialPreviewer defaultPlatform="discord" />
          ) : tool.slug === "meta-title-pixel-checker" ? (
            <SERPPreviewer mode="title-pixel" />
          ) : tool.slug === "meta-description-length-counter" ? (
            <SERPPreviewer mode="description-counter" />
          ) : tool.slug === "google-serp-simulator" ? (
            <SERPPreviewer mode="full-simulator" />
          ) : tool.slug === "flesch-kincaid-calculator" ? (
            <ReadabilityCalculator />
          ) : tool.slug === "keyword-density-checker" ? (
            <KeywordDensity />
          ) : tool.slug === "open-graph-meta-generator" ? (
            <MetaTagGenerator />
          ) : (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {tool.name}
              </h2>
              <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
                {tool.shortDescription}
              </p>
            </div>
          )}
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* 4. Deep Technical Guide (400+ Words) */}
        <ToolGuide tool={tool} />

        {/* 5. Interactive FAQ Accordion (4 Q&As) */}
        <ToolFAQ tool={tool} />

        {/* 6. Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={tool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />

      </main>
    </div>
  );
}

