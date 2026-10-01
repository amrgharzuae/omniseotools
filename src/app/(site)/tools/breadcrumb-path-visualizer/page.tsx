import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Route,
  Layers,
  ArrowRight,
  Info,
  Table,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { breadcrumbPathVisualizerTool } from "@/config/tools/technical/breadcrumb-path-visualizer";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { BreadcrumbPathVisualizer } from "@/components/tools/breadcrumb-path-visualizer/BreadcrumbPathVisualizer";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/breadcrumb-path-visualizer";

export const metadata: Metadata = {
  title: breadcrumbPathVisualizerTool.title || "Breadcrumb Path Visualizer & Schema Builder | OmniSEO Tools",
  description: breadcrumbPathVisualizerTool.metaDescription,
  keywords: breadcrumbPathVisualizerTool.keywords,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: breadcrumbPathVisualizerTool.title || "Breadcrumb Path Visualizer & Schema Builder | OmniSEO Tools",
    description: breadcrumbPathVisualizerTool.metaDescription,
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: breadcrumbPathVisualizerTool.title || "Breadcrumb Path Visualizer & Schema Builder | OmniSEO Tools",
    description: breadcrumbPathVisualizerTool.metaDescription,
  },
};

export default function BreadcrumbPathVisualizerPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEO Tools Breadcrumb Path Visualizer & Schema Builder",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description: breadcrumbPathVisualizerTool.metaDescription,
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEO Tools",
          url: "https://omniseotools.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://omniseotools.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Technical SEO",
            item: "https://omniseotools.com/#category-technical",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Breadcrumb Visualizer",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Build and Validate Schema.org BreadcrumbList Structured Data",
        description:
          "Step-by-step guide to dissecting URL hierarchies, checking Google SERP snippet previews, and generating valid JSON-LD and Microdata BreadcrumbList markup.",
        step: (breadcrumbPathVisualizerTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (breadcrumbPathVisualizerTool.faqs || []).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header & Breadcrumbs */}
      <ToolHeader tool={breadcrumbPathVisualizerTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Cross-Linking Bridge Card */}
        <section className="mb-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Route className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Complementary Schema &amp; Architecture Utilities
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Generate Schema.org structured data, audit canonical redirect chains, and split large XML sitemaps.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/schema-markup-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Schema Markup Generator</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/sitemap-index-splitter"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Sitemap Index Splitter</span>
              </Link>
              <Link
                href="/tools/canonical-redirect-auditor"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Canonical Auditor</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Workspace Widget */}
        <section
          className="mt-2"
          id="tool-interactive"
          aria-label="Interactive Breadcrumb Path Visualizer and Schema Builder"
        >
          <ToolErrorBoundary
            toolSlug={breadcrumbPathVisualizerTool.slug}
            toolName={breadcrumbPathVisualizerTool.name}
          >
            <BreadcrumbPathVisualizer
              toolSlug={breadcrumbPathVisualizerTool.slug}
              toolName={breadcrumbPathVisualizerTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Crawlable Technical Documentation & Direct Answer Box */}
        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-50/50 via-white to-slate-50 dark:from-cyan-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                Direct Answer: Why Use BreadcrumbList Structured Data?
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              <strong>BreadcrumbList structured data</strong> allows search engines like Google and Bing to understand the exact hierarchical taxonomy of your website. Instead of showing long, cryptic URL strings in search results, Google replaces the URL with a clean, clickable breadcrumb navigation trail (e.g. <code>example.com &gt; Shoes &gt; Men&apos;s &gt; Trail Running</code>). This increases search snippet visibility, improves click-through rates (CTR) by up to 15-20%, and reinforces internal PageRank distribution across category landing pages.
            </p>
          </div>

          {/* 2. Structured Data Formats Comparison Table */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Breadcrumb Implementation Formats Comparison
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comparing JSON-LD, HTML5 Microdata, and RDFa for SEO
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold text-slate-700 dark:text-slate-300">
                    <th className="p-3.5">Format</th>
                    <th className="p-3.5">Google Recommendation</th>
                    <th className="p-3.5">Maintenance Overhead</th>
                    <th className="p-3.5">DOM Coupling</th>
                    <th className="p-3.5">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-cyan-600 dark:text-cyan-400">
                      JSON-LD (Script Tag)
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Primary (Recommended)
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Very Low (Clean JSON object)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Decoupled (Zero impact from HTML/CSS refactoring)
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Modern React, Next.js, headless CMS, and single-page apps.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-slate-700 dark:text-slate-300">
                      HTML5 Microdata
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Supported
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Medium (Requires itemscope/itemprop attributes in templates)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Coupled (Tied directly to HTML DOM structure)
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Traditional server-rendered PHP, WordPress, and Shopify templates.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Deep Technical Guide */}
        <div className="mt-12">
          <ToolGuide tool={breadcrumbPathVisualizerTool} />
        </div>

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={breadcrumbPathVisualizerTool.name}
          category={breadcrumbPathVisualizerTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={breadcrumbPathVisualizerTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={breadcrumbPathVisualizerTool} />

        {/* Bottom Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
