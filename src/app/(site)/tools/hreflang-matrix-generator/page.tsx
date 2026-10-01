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
import { hreflangMatrixGeneratorTool } from "@/config/tools/international/hreflang-matrix-generator";
import { HreflangTagGenerator } from "@/components/tools/hreflang-tag-generator/HreflangTagGenerator";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";

const canonicalUrl = "https://omniseotools.com/tools/hreflang-matrix-generator";

export const metadata: Metadata = {
  title: hreflangMatrixGeneratorTool.title,
  description: hreflangMatrixGeneratorTool.metaDescription,
  keywords: hreflangMatrixGeneratorTool.keywords,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: hreflangMatrixGeneratorTool.title,
    description: hreflangMatrixGeneratorTool.metaDescription,
    url: canonicalUrl,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: hreflangMatrixGeneratorTool.title,
    description: hreflangMatrixGeneratorTool.metaDescription,
  },
};

export default function HreflangMatrixGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: hreflangMatrixGeneratorTool.h1,
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: canonicalUrl,
        description: hreflangMatrixGeneratorTool.metaDescription,
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
            name: "Hreflang & i18n Matrix Generator",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Build and Validate Multi-Lingual Hreflang Clusters",
        description:
          "Step-by-step guide to generating bi-directional hreflang HTML tags, XML Sitemap entries, and Next.js alternates with full ISO 639-1 / 3166-1 validation.",
        step: (hreflangMatrixGeneratorTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (hreflangMatrixGeneratorTool.faqs || []).map((faq) => ({
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
      {/* Structured Data Graph (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pt-6 pb-16">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-4"
        >
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link
            href="/#category-international"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            International SEO
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-white font-medium">
            Hreflang &amp; i18n Matrix Generator
          </span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Globe className="h-3.5 w-3.5" />
            <span>Multi-Regional &amp; Language Clustering Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Hreflang &amp; i18n Matrix Generator
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Construct compliant multi-lingual hreflang clusters, validate ISO 639-1 language codes &amp; ISO 3166-1 country regions, ensure bi-directional link symmetry, and export production-ready HTML <code>&lt;head&gt;</code>, XML Sitemap <code>&lt;xhtml:link&gt;</code>, and Next.js App Router metadata with 100% client-side privacy.
          </p>
        </div>

        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Cross-Linking Bridge Card */}
        <section className="mb-6 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Languages className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Complementary Global &amp; URL SEO Utilities
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Audit canonical duplicate loops, decode UTF-8 / Arabic URLs, and build UTM campaign matrices.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/canonical-redirect-auditor"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Canonical Auditor</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/arabic-url-decoder"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Arabic URL Decoder</span>
              </Link>
              <Link
                href="/tools/bulk-utm-matrix-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>UTM Matrix</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Workspace Widget */}
        <section
          className="mt-2"
          aria-label="Interactive Hreflang and i18n Matrix Generator"
        >
          <ToolErrorBoundary
            toolSlug={hreflangMatrixGeneratorTool.slug}
            toolName={hreflangMatrixGeneratorTool.name}
          >
            <HreflangTagGenerator
              toolSlug={hreflangMatrixGeneratorTool.slug}
              toolName={hreflangMatrixGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Deep Dive Documentation */}
        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          {/* Direct Answer Callout Box */}
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-blue-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                Direct Answer: Why Hreflang Clusters Fail &amp; How Search Engines Process Them
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              When a website publishes localized versions of content across different languages or geographical regions (e.g., <code>en-US</code> for American searchers and <code>en-GB</code> for British searchers), Google and Bing evaluate them as potential duplicate content. The <strong>hreflang attribute</strong> (<code>&lt;link rel=&quot;alternate&quot; hreflang=&quot;...&quot; href=&quot;...&quot; /&gt;</code>) establishes a bidirectional trust cluster that tells search engines exactly which page to index for specific regions while sharing ranking authority. Google enforces a strict <strong>bidirectional requirement</strong>: if Page A points to Page B, Page B MUST link back to Page A, otherwise Google completely ignores the hreflang declaration.
            </p>
          </div>

          {/* Implementation Comparison Table */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Hreflang Implementation Methods Comparison
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pros, cons, and performance trade-offs of HTML Head, XML Sitemap, and HTTP Header methods
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold text-slate-700 dark:text-slate-300">
                    <th className="p-3.5">Method</th>
                    <th className="p-3.5">Best For</th>
                    <th className="p-3.5">Advantages</th>
                    <th className="p-3.5">Drawbacks</th>
                    <th className="p-3.5">Maintenance Overhead</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-blue-600 dark:text-blue-400">
                      HTML &lt;head&gt; Tags
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Small-to-medium sites (2–10 languages)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Instantly visible in DOM; easy to test with browser DevTools
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Increases HTML byte size on massive (20+ locale) catalogs
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Low
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      XML Sitemap &lt;xhtml:link&gt;
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Enterprise &amp; large E-Commerce (10+ languages)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Zero impact on HTML page weight &amp; Core Web Vitals
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Requires automated sitemap cron generation pipeline
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        Medium
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-purple-600 dark:text-purple-400">
                      HTTP Link Headers
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Non-HTML assets (PDFs, docs, downloads)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Works on downloadable files without HTML &lt;head&gt;
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Server configuration complexity (Nginx / Cloudflare Workers)
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        High
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Technical Guide Section */}
        <div className="mt-12">
          <ToolGuide tool={hreflangMatrixGeneratorTool} />
        </div>

        {/* FAQ Section */}
        <ToolFAQ tool={hreflangMatrixGeneratorTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={hreflangMatrixGeneratorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
