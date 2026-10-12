import React from "react";
import type { Metadata } from "next";
import { SitemapExtractorView } from "@/components/bulk/SitemapExtractorView";
import { AdSlot } from "@/components/ads/AdSlot";
import { 
  FileCode, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Table, 
  Globe2, 
  Download, 
  Copy, 
  Layers,
  HelpCircle,
  BookOpen,
  Zap
} from "lucide-react";
import Link from "next/link";

const CANONICAL_URL = "https://omniseotools.com/bulk/sitemap-extractor";

export const metadata: Metadata = {
  title: "Bulk XML Sitemap URL Extractor | OmniSEOTools",
  description:
    "Extract, filter, and export URLs, last modified dates, and hreflang tags from XML sitemaps to CSV and Google Sheets in seconds. 100% client-side privacy.",
  keywords: [
    "bulk xml sitemap extractor",
    "sitemap to csv",
    "sitemap to google sheets",
    "extract urls from xml sitemap",
    "sitemap hreflang extractor",
    "xml sitemap parser",
    "sitemap index extractor",
    "sitemap image extractor",
    "client side sitemap tool",
    "bulk url list extractor"
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk XML Sitemap URL Extractor | OmniSEOTools",
    description:
      "Extract, filter, and export URLs, last modified dates, and hreflang tags from XML sitemaps to CSV and Google Sheets in seconds. 100% client-side privacy.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk XML Sitemap URL Extractor | OmniSEOTools",
    description:
      "Extract, filter, and export URLs, last modified dates, and hreflang tags from XML sitemaps to CSV and Google Sheets in seconds. 100% client-side privacy.",
  },
};

const FAQ_ITEMS = [
  {
    question: "How do I extract all URLs from an XML sitemap into Google Sheets?",
    answer:
      "Simply paste your XML sitemap source code or drop your .xml file into the Bulk Sitemap Extractor. The tool instantly parses all <loc>, <lastmod>, and hreflang attributes in your browser. Click 'Copy for Google Sheets' to copy a pre-formatted TSV table, then open Google Sheets and press Ctrl+V / Cmd+V to paste multi-column data with clickable hyperlink formulas.",
  },
  {
    question: "Does this tool upload my XML sitemap or URL data to an external server?",
    answer:
      "No. All XML parsing, DOM traversal, filtering, and export formatting happen 100% in your browser's local JavaScript memory using standard DOMParser APIs. Your staging URLs, pre-release catalogs, and internal infrastructure links are never sent to any server or recorded in logs.",
  },
  {
    question: "Can it extract URLs from a Sitemap Index (<sitemapindex>)?",
    answer:
      "Yes. When you paste or upload a sitemap index file containing child <sitemap> blocks (such as WordPress sitemap_index.xml or Shopify sub-sitemaps), the engine automatically detects the index structure and lists all child sitemap endpoints along with their last modified timestamps.",
  },
  {
    question: "How many URLs can the Bulk Sitemap Extractor process at once?",
    answer:
      "The tool is engineered for high throughput and can effortlessly parse and filter sitemaps containing up to 10,000 URLs without freezing your browser UI, thanks to optimized chunk parsing and virtualized pagination.",
  },
  {
    question: "Does it extract image tags (<image:loc>) and hreflang alternates?",
    answer:
      "Yes. The parser deeply inspects Google Image sitemap tags (<image:image> -> <image:loc>) and multilingual annotations (<xhtml:link rel='alternate' hreflang='...' href='...'>), allowing you to audit international SEO and media indexation in one centralized view.",
  },
];

export default function BulkSitemapExtractorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk XML Sitemap URL Extractor",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Extract, filter, and export URLs, last modified dates, and hreflang tags from XML sitemaps to CSV and Google Sheets in seconds. 100% client-side privacy.",
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
            name: "Bulk Workbench",
            item: "https://omniseotools.com/bulk",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Bulk XML Sitemap URL Extractor",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((faq) => ({
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
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 space-y-12">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" />

        {/* Interactive Bulk Tool Component */}
        <SitemapExtractorView />

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant 10k Row Ingestion
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Process large eCommerce and enterprise sitemaps up to 10,000 items in milliseconds. Zero server roundtrips, zero queue delays.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              100% In-Browser Privacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Proprietary URLs, unreleased product endpoints, and internal staging environments stay strictly in your local device memory.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Table className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              One-Click Spreadsheet TSV
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Copy formatted tab-separated values ready for immediate paste into Google Sheets, Airtable, or Microsoft Excel with active hyperlink formulas.
            </p>
          </div>
        </section>

        {/* In-Feed AdSlot */}
        <AdSlot slotType="in-feed" />

        {/* Comprehensive Technical Guide */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Technical SEO Workflow Guide</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How to Audit and Export XML Sitemaps with the Bulk Extractor
          </h2>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              XML sitemaps serve as the primary roadmap for Googlebot, Bingbot, and other search engines to discover crawlable URLs. However, raw XML files are notoriously difficult to inspect, share with clients, or analyze for metadata gaps. The <strong>OmniSEOTools Bulk Sitemap URL Extractor</strong> transforms unreadable XML markup into clean, filterable tabular data.
            </p>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              Common Use Cases for SEO Engineers &amp; Growth Teams
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Crawl Budget &amp; Freshness Audits:</strong> Filter URLs by the <code>&lt;lastmod&gt;</code> timestamp to detect stale pages that haven’t been updated in months or verify recent programmatic deployments.
              </li>
              <li>
                <strong>Hreflang Configuration Verification:</strong> Quickly verify whether alternate language versions (e.g. <code>hreflang="ar"</code>, <code>hreflang="es"</code>, <code>hreflang="x-default"</code>) are present and properly linked for international SEO compliance.
              </li>
              <li>
                <strong>Image Indexation Coverage:</strong> Identify which product or editorial URLs include associated <code>&lt;image:loc&gt;</code> tags to maximize Google Images discovery.
              </li>
              <li>
                <strong>Protocol Security Checks:</strong> Automatically flag legacy <code>http://</code> URLs lingering inside HTTPS-only sitemaps before they cause redirect chain penalties in Google Search Console.
              </li>
              <li>
                <strong>Migration &amp; Redirection Mapping:</strong> Ingest an entire staging or legacy sitemap, copy the URLs to Google Sheets, and build 301 redirect lookup tables in seconds.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              How to Export to Google Sheets &amp; Excel
            </h3>
            <p>
              When you click <strong>Copy for Google Sheets</strong>, the engine generates Tab-Separated Values (TSV) where the primary URL column is formatted with native <code>=HYPERLINK(&quot;url&quot;, &quot;url&quot;)</code> formulas. When pasted into Google Sheets, all rows instantly populate discrete columns with fully clickable links, eliminating manual spreadsheet formatting.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-4 w-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Bulk XML Sitemap Extractor FAQs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-2"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Workbench Link Section */}
        <section className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Explore More High-Throughput Bulk Utilities</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Visit the OmniSEOTools Bulk Workbench to discover batch tagging, URL cleaners, and matrix generators.
            </p>
          </div>
          <Link
            href="/bulk"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-all"
          >
            Go to Bulk Workbench →
          </Link>
        </section>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" />
      </main>
    </div>
  );
}
