import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Sparkles, Code2 } from "lucide-react";
import {
  getAllProgrammaticTools,
  getProgrammaticToolBySlug,
} from "@/config/tools-registry";
import { siteConfig } from "@/config/site";

// Interactive Tool Components
import { SocialPreviewer } from "@/components/tools/social/SocialPreviewer";
import { SERPPreviewer } from "@/components/tools/serp/SERPPreviewer";
import { ReadabilityCalculator } from "@/components/tools/content/ReadabilityCalculator";
import { KeywordDensity } from "@/components/tools/content/KeywordDensity";
import { MetaTagGenerator } from "@/components/tools/developer/MetaTagGenerator";
import { DynamicToolGenerator } from "@/components/tools/dynamic/DynamicToolGenerator";

interface EmbedPageProps {
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

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getProgrammaticToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found | OmniSEO Tools",
    };
  }

  const canonicalUrl = `https://omniseotools.com/tools/${tool.slug}`;

  return {
    title: `${tool.name} - Free Embeddable Tool | OmniSEO Tools`,
    description: `Embed the free ${tool.name} widget directly on your website or documentation. Zero config, 100% client-side privacy.`,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function EmbedToolPage({ params }: EmbedPageProps) {
  const { slug } = await params;
  const tool = getProgrammaticToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const canonicalUrl = `https://omniseotools.com/tools/${tool.slug}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-2 sm:p-4 flex flex-col justify-between">
      <div className="w-full max-w-5xl mx-auto space-y-3 flex-1">
        {/* Minimalist Embed Top Bar */}
        <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-xs backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Code2 className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {tool.name}
            </span>
            {tool.badge && (
              <span className="hidden sm:inline-block rounded bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
                {tool.badge}
              </span>
            )}
          </div>

          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
            title="Open standalone tool with full guide & comparison on OmniSEO Tools"
          >
            <span>Full Tool</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Dedicated Interactive Tool Container */}
        <div className="w-full">
          {tool.slug === "twitter-card-preview" ? (
            <SocialPreviewer defaultPlatform="twitter" toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : tool.slug === "linkedin-link-preview" ? (
            <SocialPreviewer defaultPlatform="linkedin" toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : tool.slug === "facebook-open-graph-debugger" ? (
            <SocialPreviewer defaultPlatform="facebook" toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : tool.slug === "discord-embed-generator" ? (
            <SocialPreviewer defaultPlatform="discord" toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : tool.slug === "meta-title-pixel-checker" ? (
            <SERPPreviewer mode="title-pixel" toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : tool.slug === "meta-description-length-counter" ? (
            <SERPPreviewer mode="description-counter" toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : tool.slug === "google-serp-simulator" ? (
            <SERPPreviewer mode="full-simulator" toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : tool.slug === "flesch-kincaid-calculator" ? (
            <ReadabilityCalculator />
          ) : tool.slug === "keyword-density-checker" ? (
            <KeywordDensity />
          ) : tool.slug === "open-graph-meta-generator" ? (
            <MetaTagGenerator toolSlug={tool.slug} toolName={tool.name} isEmbedded />
          ) : (
            <DynamicToolGenerator tool={tool} isEmbedded />
          )}
        </div>
      </div>

      {/* Discreet Embed Backlink Footer */}
      <footer className="w-full max-w-5xl mx-auto pt-3 pb-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-2">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-emerald-500" />
          100% Client-Side & Private
        </span>
        <a
          href={canonicalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          Free utility powered by <span className="font-bold text-indigo-600 dark:text-indigo-400">OmniSEO Tools</span>
        </a>
      </footer>
    </div>
  );
}
