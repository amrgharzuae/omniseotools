import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCode,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  Archive,
  Table,
  Zap,
} from "lucide-react";
import { sitemapIndexSplitterTool } from "@/config/tools/technical/sitemap-index-splitter";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { SitemapIndexSplitter } from "@/components/tools/sitemap-index-splitter/SitemapIndexSplitter";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/sitemap-index-splitter";

export const metadata: Metadata = {
  title: sitemapIndexSplitterTool.title || "XML Sitemap Index Splitter & Large File Chunker | OmniSEO Tools",
  description: sitemapIndexSplitterTool.metaDescription,
  keywords: sitemapIndexSplitterTool.keywords,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: sitemapIndexSplitterTool.title || "XML Sitemap Index Splitter & Large File Chunker | OmniSEO Tools",
    description: sitemapIndexSplitterTool.metaDescription,
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: sitemapIndexSplitterTool.title || "XML Sitemap Index Splitter & Large File Chunker | OmniSEO Tools",
    description: sitemapIndexSplitterTool.metaDescription,
  },
};

export default function SitemapIndexSplitterPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEO Tools XML Sitemap Index Splitter & Chunking Tool",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description: sitemapIndexSplitterTool.metaDescription,
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
            name: "XML Sitemap Index Splitter",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Split Oversized XML Sitemaps into Sub-Sitemaps",
        description:
          "Step-by-step guide to splitting large XML sitemaps and raw URL lists into 50k-compliant sub-sitemaps and generating a parent sitemapindex.xml file.",
        step: (sitemapIndexSplitterTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (sitemapIndexSplitterTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={sitemapIndexSplitterTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Cross-Linking Bridge Card */}
        <section className="mb-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Layers className="h-5 w-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Complementary XML &amp; Crawl Budget SEO Utilities
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Generate XML sitemaps from scratch, validate robots.txt crawler rules, and build hreflang matrices.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/xml-sitemap-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>XML Sitemap Generator</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/robots-txt-generator-validator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Robots.txt Validator</span>
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
          aria-label="Interactive XML Sitemap Index Splitter and File Chunker"
        >
          <ToolErrorBoundary
            toolSlug={sitemapIndexSplitterTool.slug}
            toolName={sitemapIndexSplitterTool.name}
          >
            <SitemapIndexSplitter
              toolSlug={sitemapIndexSplitterTool.slug}
              toolName={sitemapIndexSplitterTool.name}
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
                Direct Answer: Why Split XML Sitemaps into Indexes?
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              According to the official Sitemaps XML protocol supported by Google and Bing, a single <code>&lt;urlset&gt;</code> file is strictly limited to a maximum of <strong>50,000 URLs</strong> and <strong>50MB uncompressed file size</strong>. When website architectures exceed these thresholds, search engine crawlers truncate parsing, causing thousands of URLs to remain undiscovered. Using an <strong>XML Sitemap Index (<code>&lt;sitemapindex&gt;</code>)</strong> divides large catalogs into modular sub-sitemaps (e.g. <code>sitemap-1.xml</code>, <code>sitemap-2.xml</code>), allowing search bots to process files faster without hitting memory caps while scaling indexing up to 2.5 billion URLs.
            </p>
          </div>

          {/* 2. Comparison Table: Single Sitemap vs Sitemap Index Architecture */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Single Sitemap vs. Sitemap Index Architecture Comparison
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Key capacity, crawl efficiency, and monitoring trade-offs
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold text-slate-700 dark:text-slate-300">
                    <th className="p-3.5">Architecture Model</th>
                    <th className="p-3.5">Max URL Capacity</th>
                    <th className="p-3.5">Max File Size</th>
                    <th className="p-3.5">GSC Diagnostics Granularity</th>
                    <th className="p-3.5">Optimal Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-cyan-600 dark:text-cyan-400">
                      Sitemap Index (&lt;sitemapindex&gt;)
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-semibold">
                      Up to 2,500,000,000 URLs (50k sub-sitemaps × 50k URLs)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      50MB per individual sub-sitemap
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      High (Isolated indexation statistics per content category / chunk)
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Enterprise &amp; E-Commerce
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-slate-500 dark:text-slate-400">
                      Monolithic Sitemap (&lt;urlset&gt;)
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-semibold">
                      50,000 URLs Max
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      50MB Max (Uncompressed)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Low (All pages lumped into single indexation report)
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Small Sites (&lt;5k URLs)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Deep Technical Guide */}
        <div className="mt-12">
          <ToolGuide tool={sitemapIndexSplitterTool} />
        </div>

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={sitemapIndexSplitterTool.name}
          category={sitemapIndexSplitterTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={sitemapIndexSplitterTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={sitemapIndexSplitterTool} />

        {/* Bottom Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
