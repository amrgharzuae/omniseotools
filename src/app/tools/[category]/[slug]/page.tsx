import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, getAllTools } from "@/config/tools/registry";
import { siteConfig } from "@/config/site";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { StructuredData } from "@/components/seo/StructuredData";
import { AdSlot } from "@/components/ads/AdSlot";
import { SerpPreviewTool } from "@/components/tools/serp/SerpPreviewTool";
import { OpenGraphPreviewTool } from "@/components/tools/social/OpenGraphPreviewTool";
import { RobotsTxtGeneratorTool } from "@/components/tools/developer/RobotsTxtGeneratorTool";
import { UtmCampaignBuilderTool } from "@/components/tools/marketing/UtmCampaignBuilderTool";
import { UrlSlugGeneratorTool } from "@/components/tools/seo/UrlSlugGeneratorTool";
import { KeywordDensityAnalyzerTool } from "@/components/tools/content/KeywordDensityAnalyzerTool";

interface ToolPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const url = siteConfig.url + "/tools/" + tool.category + "/" + tool.slug;

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: url,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <StructuredData tool={tool} />
      <ToolHeader tool={tool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        
        {/* Top AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Dynamic Tool Renderer */}
        <section className="mt-4">
          {tool.id === "serp-preview" ? (
            <SerpPreviewTool />
          ) : tool.id === "open-graph-preview" ? (
            <OpenGraphPreviewTool />
          ) : tool.id === "robots-txt-generator" ? (
            <RobotsTxtGeneratorTool />
          ) : tool.id === "utm-campaign-builder" ? (
            <UtmCampaignBuilderTool />
          ) : tool.id === "url-slug-generator" ? (
            <UrlSlugGeneratorTool />
          ) : tool.id === "keyword-density-analyzer" ? (
            <KeywordDensityAnalyzerTool />
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {tool.name} is Queued for Development
              </h2>
              <p className="mt-2 text-xs text-slate-500 max-w-md mx-auto">
                This tool is scheduled in the upcoming build blocks. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={tool} />

        {/* Interactive FAQ Accordion */}
        <ToolFAQ tool={tool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={tool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />

      </div>
    </div>
  );
}
