import React from "react";
import type { Metadata } from "next";
import { xmlSitemapGeneratorTool } from "@/config/tools/technical/xml-sitemap-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { XmlSitemapGenerator } from "@/components/tools/technical/XmlSitemapGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/xml-sitemap-generator";

export const metadata: Metadata = {
  title: "Free XML Sitemap Generator & Validator | OmniSEO Tools",
  description:
    "Generate Google-compliant XML sitemaps, customize change frequencies and priorities, or audit raw sitemaps for syntax errors 100% in your browser.",
  keywords: [
    "xml sitemap generator",
    "xml sitemap validator",
    "sitemap linter",
    "google sitemap generator",
    "nextjs app router sitemap",
    "sitemap xml tester",
    "free sitemap generator",
    "xml namespace validator",
    "sitemap lastmod validator",
    "bulk xml sitemap builder",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free XML Sitemap Generator & Validator | OmniSEO Tools",
    description:
      "Generate Google-compliant XML sitemaps, customize change frequencies and priorities, or audit raw sitemaps for syntax errors 100% in your browser.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free XML Sitemap Generator & Validator | OmniSEO Tools",
    description:
      "Generate Google-compliant XML sitemaps, customize change frequencies and priorities, or audit raw sitemaps for syntax errors 100% in your browser.",
  },
};

export default function XmlSitemapGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools XML Sitemap Generator & Validator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate Google-compliant XML sitemaps, customize change frequencies and priorities, or audit raw sitemaps for syntax errors 100% in your browser.",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEOTools",
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
            name: "XML Sitemap Generator & Validator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (xmlSitemapGeneratorTool.faqs || []).map((faq) => ({
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
      {/* Structured Data (JSON-LD Graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Breadcrumb & Hero Header */}
      <ToolHeader tool={xmlSitemapGeneratorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Platform-Specific Presets Banner */}
        <section className="mb-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                CMS &amp; Framework XML Sitemap Generators
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Optimize and validate sitemaps tailored for Shopify sub-sitemaps, WordPress sitemap_index.xml, or Next.js sitemap.ts.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="/tools/xml-sitemap-generator/shopify"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                Shopify
              </a>
              <a
                href="/tools/xml-sitemap-generator/wordpress"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                WordPress
              </a>
              <a
                href="/tools/xml-sitemap-generator/nextjs"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                Next.js App Router
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive XML Sitemap Generator and Validator">
          <ToolErrorBoundary
            toolSlug={xmlSitemapGeneratorTool.slug}
            toolName={xmlSitemapGeneratorTool.name}
          >
            <XmlSitemapGenerator
              toolSlug={xmlSitemapGeneratorTool.slug}
              toolName={xmlSitemapGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Guide Section */}
        <ToolGuide tool={xmlSitemapGeneratorTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={xmlSitemapGeneratorTool.name}
          category={xmlSitemapGeneratorTool.category}
        />

        {/* FAQ Section */}
        <ToolFAQ tool={xmlSitemapGeneratorTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={xmlSitemapGeneratorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
