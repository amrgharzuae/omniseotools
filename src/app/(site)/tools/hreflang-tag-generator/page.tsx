import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Languages,
  Sparkles,
  Layers,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Info,
  Table,
  HelpCircle,
  FileCode,
  Zap,
} from "lucide-react";
import { hreflangTagGeneratorTool } from "@/config/tools/international/hreflang-tag-generator";
import { HreflangTagGenerator } from "@/components/tools/hreflang-tag-generator/HreflangTagGenerator";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";

const canonicalUrl = "https://omniseotools.com/tools/hreflang-tag-generator";

export const metadata: Metadata = {
  title: hreflangTagGeneratorTool.title,
  description: hreflangTagGeneratorTool.metaDescription,
  keywords: hreflangTagGeneratorTool.keywords,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: hreflangTagGeneratorTool.title,
    description: hreflangTagGeneratorTool.metaDescription,
    url: canonicalUrl,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: hreflangTagGeneratorTool.title,
    description: hreflangTagGeneratorTool.metaDescription,
  },
};

export default function HreflangTagGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: hreflangTagGeneratorTool.h1,
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: canonicalUrl,
        description: hreflangTagGeneratorTool.metaDescription,
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
            name: "International SEO",
            item: "https://omniseotools.com/#category-international",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: hreflangTagGeneratorTool.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Generate & Validate Hreflang Language Clusters",
        description:
          "Step-by-step technical guide to build reciprocal multi-lingual hreflang link tags, XML sitemap annotations, and Next.js metadata alternates.",
        step: (hreflangTagGeneratorTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (hreflangTagGeneratorTool.faqs || []).map((faq) => ({
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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Structured Data (JSON-LD Graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Trail */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap"
          >
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/tools" className="hover:text-teal-600 transition-colors">
              Tools
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-white">
              {hreflangTagGeneratorTool.name}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 shadow-sm">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {hreflangTagGeneratorTool.h1}
                    </h1>
                    <span className="hidden sm:inline-flex rounded-md bg-teal-100 dark:bg-teal-950/80 px-2 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
                      i18n SEO Engine
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {hreflangTagGeneratorTool.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Technical SEO Ecosystem Bridge Card */}
        <section className="mb-6 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Enhance International Indexation &amp; Technical Architecture
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Build multi-language XML sitemaps, audit canonical tags, and prevent international crawl bloat.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/xml-sitemap-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>XML Sitemap Generator</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/canonical-redirect-auditor"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Canonical Auditor</span>
              </Link>
              <Link
                href="/tools/ai-crawler-firewall"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>AI Crawler Firewall</span>
              </Link>
              <Link
                href="/tools/core-web-vitals-budget-calculator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>CWV Budget Calculator</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget */}
        <section aria-label="Hreflang & i18n Matrix Generator Tool">
          <ToolErrorBoundary
            toolSlug={hreflangTagGeneratorTool.slug}
            toolName={hreflangTagGeneratorTool.name}
          >
            <HreflangTagGenerator
              toolSlug={hreflangTagGeneratorTool.slug}
              toolName={hreflangTagGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Comprehensive Documentation & Educational Guide */}
        <article className="mt-12 space-y-12 text-slate-700 dark:text-slate-300">
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-50/50 via-white to-slate-50 dark:from-teal-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                Direct Answer: How Hreflang Manages International Search Indexation
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              The <strong>hreflang attribute</strong> instructs search engines (Google, Bing, and Yandex) that multiple URLs on your website contain identical or localized variations of the same content targeted at different languages or geographic territories. By mapping reciprocal alternate links and declaring an <code>x-default</code> fallback, search engines serve the exact localized page in local SERPs without treating translated or regional editions as duplicate content.
            </p>
          </div>

          {/* 2. Implementation Method Comparison Table */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Comparison: HTML Head Tags vs. XML Sitemap Hreflang vs. HTTP Headers
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Choose the optimal implementation architecture based on your site scale and technical stack
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 font-bold">
                    <th className="p-3.5 sm:p-4">Implementation Method</th>
                    <th className="p-3.5 sm:p-4">Best Used For</th>
                    <th className="p-3.5 sm:p-4">Scalability</th>
                    <th className="p-3.5 sm:p-4">Common Failure Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="font-mono text-teal-600 dark:text-teal-400">&lt;link rel="alternate"&gt;</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">HTML Head</span>
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Small-to-medium websites (&lt;100 pages, 2–4 languages)
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-amber-600 dark:text-amber-400">
                      Low (Adds HTML payload weight as languages grow)
                    </td>
                    <td className="p-3.5 sm:p-4 text-rose-600 dark:text-rose-400 font-medium">
                      Missing reciprocal return-tags on secondary pages
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">&lt;xhtml:link&gt;</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">XML Sitemap</span>
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Large e-commerce stores, publishers (&gt;1,000 pages, 5+ locales)
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      High (Zero HTML overhead, centralized updates)
                    </td>
                    <td className="p-3.5 sm:p-4 text-rose-600 dark:text-rose-400 font-medium">
                      Missing xmlns:xhtml namespace declaration, 50MB file size limits
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">Link: &lt;...&gt;; rel="alternate"</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">HTTP Header</span>
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Non-HTML assets (PDF catalogues, downloadable guides, docs)
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-blue-600 dark:text-blue-400">
                      Medium (Requires web server / edge reverse proxy config)
                    </td>
                    <td className="p-3.5 sm:p-4 text-rose-600 dark:text-rose-400 font-medium">
                      Complex server header routing; missing commas in Link string
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Comprehensive Educational Guide */}
          <ToolGuide tool={hreflangTagGeneratorTool} />

          {/* 4. Platform-Specific Optimization FAQ */}
          <ToolFAQ tool={hreflangTagGeneratorTool} />

          {/* 5. Related Tools Section */}
          <div className="pt-6">
            <RelatedTools currentTool={hreflangTagGeneratorTool} />
          </div>
        </article>
      </div>
    </div>
  );
}
