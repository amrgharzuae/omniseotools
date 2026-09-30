import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShoppingBag,
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
  Tag,
  Star,
  Truck,
} from "lucide-react";
import { ecommerceSchemaGeneratorTool } from "@/config/tools/technical/ecommerce-schema-generator";
import { EcommerceSchemaGenerator } from "@/components/tools/ecommerce-schema-generator/EcommerceSchemaGenerator";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";

const canonicalUrl = "https://omniseotools.com/tools/ecommerce-schema-generator";

export const metadata: Metadata = {
  title: ecommerceSchemaGeneratorTool.title,
  description: ecommerceSchemaGeneratorTool.metaDescription,
  keywords: ecommerceSchemaGeneratorTool.keywords,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: ecommerceSchemaGeneratorTool.title,
    description: ecommerceSchemaGeneratorTool.metaDescription,
    url: canonicalUrl,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: ecommerceSchemaGeneratorTool.title,
    description: ecommerceSchemaGeneratorTool.metaDescription,
  },
};

export default function EcommerceSchemaGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: ecommerceSchemaGeneratorTool.h1,
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: canonicalUrl,
        description: ecommerceSchemaGeneratorTool.metaDescription,
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
            name: ecommerceSchemaGeneratorTool.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Build 2026 Google Merchant Product JSON-LD Schema",
        description:
          "Step-by-step engineering guide to construct valid Product structured data with shippingDetails, return policies, GTIN codes, and aggregate ratings.",
        step: (ecommerceSchemaGeneratorTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (ecommerceSchemaGeneratorTool.faqs || []).map((faq) => ({
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
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/tools" className="hover:text-blue-600 transition-colors">
              Tools
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-white">
              {ecommerceSchemaGeneratorTool.name}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 shadow-sm">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {ecommerceSchemaGeneratorTool.h1}
                    </h1>
                    <span className="hidden sm:inline-flex rounded-md bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      2026 Merchant Rules
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {ecommerceSchemaGeneratorTool.tagline}
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
        <section className="mb-6 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Enhance E-Commerce Technical SEO &amp; Rich Result Eligibility
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Target international shoppers with hreflang tags, optimize mobile CWV budgets, and build clean XML sitemaps.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/hreflang-tag-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Hreflang Generator</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/xml-sitemap-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>XML Sitemap</span>
              </Link>
              <Link
                href="/tools/core-web-vitals-budget-calculator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>CWV Budget Calculator</span>
              </Link>
              <Link
                href="/tools/canonical-redirect-auditor"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Canonical Auditor</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget */}
        <section aria-label="E-Commerce Product Schema Builder Tool">
          <ToolErrorBoundary
            toolSlug={ecommerceSchemaGeneratorTool.slug}
            toolName={ecommerceSchemaGeneratorTool.name}
          >
            <EcommerceSchemaGenerator
              toolSlug={ecommerceSchemaGeneratorTool.slug}
              toolName={ecommerceSchemaGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Comprehensive Documentation & Educational Guide */}
        <article className="mt-12 space-y-12 text-slate-700 dark:text-slate-300">
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-blue-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                Direct Answer: How Google Merchant Product Schema Powers Rich Results
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              Google uses <strong>Product and Offer structured data</strong> to dynamically populate rich search snippets (star ratings, price badges, in-stock indicators) and power free organic product placements across the <strong>Google Shopping tab</strong>, <strong>Google Images</strong>, and <strong>Google Lens</strong>. Incorporating explicit <code>shippingDetails</code> and <code>hasMerchantReturnPolicy</code> properties fulfills 2026 Google Merchant requirements, eliminating Search Console warnings and unlocking delivery and return trust annotations in search results.
            </p>
          </div>

          {/* 2. Mandatory vs Recommended Fields Comparison Table */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Table: Mandatory vs Recommended Google Merchant Schema Fields
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Detailed property requirements for Google Search rich snippets and Merchant Center free listings
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 font-bold">
                    <th className="p-3.5 sm:p-4">Schema Property</th>
                    <th className="p-3.5 sm:p-4">Status</th>
                    <th className="p-3.5 sm:p-4">Purpose</th>
                    <th className="p-3.5 sm:p-4">Search Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900 dark:text-white">
                      offers.price &amp; priceCurrency
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      Mandatory
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Real-time transactional price and 3-letter currency code
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">
                      Required for product price badge in search results
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900 dark:text-white">
                      offers.availability
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      Mandatory
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Stock status (InStock, OutOfStock, PreOrder)
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">
                      Powers green "In Stock" badges in search snippets
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900 dark:text-white">
                      shippingDetails
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-blue-600 dark:text-blue-400">
                      Required for Merchant Listings
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Shipping cost, handling time, and transit day estimates
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">
                      Displays local shipping rates and "Free delivery" labels
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900 dark:text-white">
                      hasMerchantReturnPolicy
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-blue-600 dark:text-blue-400">
                      Required for Merchant Listings
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Return window days, return method, and fee policies
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">
                      Triggers "Free 30-day returns" annotation in SERPs
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900 dark:text-white">
                      gtin13 / gtin14 / mpn
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-indigo-600 dark:text-indigo-400">
                      Recommended
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Global commercial barcode or manufacturer identifier
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">
                      Matches products to Google Shopping knowledge graph cards
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900 dark:text-white">
                      aggregateRating
                    </td>
                    <td className="p-3.5 sm:p-4 font-semibold text-amber-600 dark:text-amber-400">
                      Recommended
                    </td>
                    <td className="p-3.5 sm:p-4">
                      Customer star ratings and verified review count
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">
                      Displays yellow review stars directly under page title in SERP
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Comprehensive Educational Guide */}
          <ToolGuide tool={ecommerceSchemaGeneratorTool} />

          {/* 4. Platform-Specific Optimization FAQ */}
          <ToolFAQ tool={ecommerceSchemaGeneratorTool} />

          {/* 5. Related Tools Section */}
          <div className="pt-6">
            <RelatedTools currentTool={ecommerceSchemaGeneratorTool} />
          </div>
        </article>
      </div>
    </div>
  );
}
