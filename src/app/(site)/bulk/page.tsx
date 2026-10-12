import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  Zap,
  ShieldCheck,
  Table,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Sparkles,
  FileCode,
  Tag,
  Search,
  CheckCircle2,
  Lock,
  Cpu,
  Clock,
  ExternalLink,
  ChevronRight,
  Database,
  BarChart2,
  Workflow
} from "lucide-react";

const CANONICAL_URL = "https://omniseotools.com/bulk";

export const metadata: Metadata = {
  title: "Bulk SEO Workbench & High-Throughput Utilities | OmniSEOTools",
  description:
    "Process thousands of URLs, sitemaps, UTMs, and meta tags in seconds. 100% client-side execution with direct Google Sheets and CSV exports.",
  keywords: [
    "bulk seo tools",
    "bulk url tools",
    "bulk sitemap extractor",
    "bulk utm generator",
    "bulk canonical auditor",
    "batch meta tag inspector",
    "seo spreadsheet export",
    "google sheets tsv copy",
    "high throughput seo utilities",
    "client side bulk seo"
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk SEO Workbench & High-Throughput Utilities | OmniSEOTools",
    description:
      "Process thousands of URLs, sitemaps, UTMs, and meta tags in seconds. 100% client-side execution with direct Google Sheets and CSV exports.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk SEO Workbench & High-Throughput Utilities | OmniSEOTools",
    description:
      "Process thousands of URLs, sitemaps, UTMs, and meta tags in seconds. 100% client-side execution with direct Google Sheets and CSV exports.",
  },
};

const BULK_TOOLS = [
  {
    id: "sitemap-extractor",
    title: "Bulk XML Sitemap URL Extractor",
    slug: "sitemap-extractor",
    href: "/bulk/sitemap-extractor",
    status: "active",
    badge: "Live ⚡",
    description:
      "Parse raw XML sitemaps and sitemap indexes in seconds. Extracts all <loc>, <lastmod>, <changefreq>, <priority>, <image:loc>, and xhtml:link hreflang alternates with 1-click Google Sheets TSV and CSV exports.",
    icon: FileCode,
    tags: ["XML Sitemaps", "Hreflangs", "Image URLs", "Lastmod Freshness"],
    throughput: "10,000 URLs / sec",
  },
  {
    id: "utm-matrix-generator",
    title: "UTM Matrix Campaign Generator",
    slug: "utm-matrix",
    href: "/bulk/utm-matrix",
    status: "active",
    badge: "Live ⚡",
    description:
      "Generate Cartesian product matrices of landing URLs × marketing channels (Google Ads, Meta, TikTok, LinkedIn, Email) with automated case sanitization and GA4 channel group validation.",
    icon: Tag,
    tags: ["Multi-Channel UTMs", "Cartesian Product", "GA4 Validation", "PPC Matrix"],
    throughput: "5,000 Tagged URLs / sec",
  },
  {
    id: "url-cleaner-canonical-auditor",
    title: "Bulk URL Cleaner & Canonical Auditor",
    slug: "url-cleaner-audit",
    href: "/bulk/url-cleaner-audit",
    status: "active",
    badge: "Live ⚡",
    description:
      "Batch strip tracking parameters, resolve trailing slash inconsistencies, fix mixed case paths, and detect duplicate canonical collisions across massive URL inventories.",
    icon: Database,
    tags: ["URL Normalization", "Trailing Slash Audit", "Query Stripper", "Duplicate Detection"],
    throughput: "20,000 URLs / sec",
  },
  {
    id: "meta-tag-batch-inspector",
    title: "Meta Tag Batch Inspector",
    slug: "meta-batch-check",
    href: "/bulk/meta-batch-check",
    status: "active",
    badge: "Live ⚡",
    description:
      "Audit titles, meta descriptions, OpenGraph tags, and Twitter cards across hundreds of HTML snippets simultaneously with instant pixel truncation warnings.",
    icon: Search,
    tags: ["Title Pixel Length", "Description Linter", "OpenGraph Matrix", "SERP Truncation"],
    throughput: "2,500 Snippets / sec",
  },
];

const PLATFORM_STANDARDS = [
  {
    icon: ShieldCheck,
    title: "100% Client-Side Privacy",
    description:
      "Zero server uploads or storage. All ingestion, XML parsing, and data transformation execute strictly in your browser's V8 engine.",
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60",
  },
  {
    icon: Cpu,
    title: "10,000+ Row Throughput",
    description:
      "Engineered for high-volume agency workflows. Process enterprise XML feeds and catalogs without UI lockups or memory leaks.",
    color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60",
  },
  {
    icon: FileSpreadsheet,
    title: "Instant Google Sheets Copy",
    description:
      "Formatted multi-column TSV clipboard copy with native =HYPERLINK() formulas ready for immediate spreadsheet pasting.",
    color: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60",
  },
  {
    icon: Zap,
    title: "Zero Latency & No Rate Limits",
    description:
      "No API keys, no monthly credits, and no server queue delays. Work offline or at blazing speed completely unrestricted.",
    color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60",
  },
];

export default function BulkHubPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk SEO Workbench",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Process thousands of URLs, sitemaps, UTMs, and meta tags in seconds. 100% client-side execution with direct Google Sheets and CSV exports.",
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
            item: CANONICAL_URL,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 space-y-12">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" />

        {/* Hero Section */}
        <section className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                Dedicated Power User Workbench
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                100% In-Browser Privacy
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <Table className="h-3.5 w-3.5 text-sky-500" />
                Google Sheets TSV Export
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                High-Throughput <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">Bulk SEO</span> Workbench
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                Engineered for technical SEOs, growth marketers, and digital agencies. Process thousands of sitemap URLs, campaign parameters, and metadata records in seconds—without sending proprietary data to third-party servers.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  10,000+
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Rows / Batch Capacity
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  0 ms
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Server Network Latency
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-sky-600 dark:text-sky-400">
                  100%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Client-Side Memory
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  1-Click
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Google Sheets TSV Paste
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bulk Tools Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Workflow className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <span>Bulk Tool Directory</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Specialized high-volume batch utilities designed for large-scale data manipulation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BULK_TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isActive = tool.status === "active";

              return (
                <div
                  key={tool.id}
                  className={`group relative rounded-2xl border transition-all flex flex-col justify-between p-6 sm:p-7 ${
                    isActive
                      ? "border-emerald-300 dark:border-emerald-800/80 bg-gradient-to-b from-white to-emerald-50/20 dark:from-slate-900 dark:to-slate-900/80 shadow-md hover:shadow-xl hover:border-emerald-500"
                      : "border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 opacity-90"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          isActive
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isActive
                              ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {tool.badge}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tool.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      ⚡ {tool.throughput}
                    </span>

                    {isActive ? (
                      <Link
                        href={tool.href}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-all group-hover:gap-2"
                      >
                        <span>Launch Tool</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium cursor-not-allowed">
                        <Clock className="h-3 w-3" />
                        <span>In Development</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Platform Standards / Technical Highlights */}
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Enterprise Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Built for Speed, Privacy &amp; Large-Scale Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard web apps fail when pasting 5,000 URLs or uploading massive XML sitemaps. OmniSEOTools Bulk Workbench is architected differently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORM_STANDARDS.map((std, index) => {
              const Icon = std.icon;
              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${std.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {std.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {std.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* In-Feed AdSlot */}
        <AdSlot slotType="in-feed" />

        {/* Guide & Architecture Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <BarChart2 className="h-4 w-4" />
            <span>Workflow Efficiency Matrix</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Why Technical SEOs Choose In-Browser Batch Processing
          </h2>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              Traditional SEO auditing tools require complex API setups, cloud subscription credits, and uploading sensitive site structures to external cloud databases. OmniSEOTools Bulk Hub provides a zero-setup, instant execution alternative:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  ⚡ Client-Side Browser Memory vs. Cloud Servers
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Because execution occurs on your local device CPU, there is zero payload compression loss, zero API quota throttling, and instant sub-second response times on datasets exceeding 10,000 items.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">
                  📊 Native Google Sheets &amp; Airtable TSV Clipboard
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Instead of dealing with downloaded files, our TSV clipboard engine lets you click once and paste directly into Google Sheets with multi-column alignment and ready-to-click <code>=HYPERLINK()</code> formulas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Link Category Banner */}
        <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Looking for standalone interactive tools?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Explore our collection of 50+ specialized single-purpose SEO, social, and developer utilities.
            </p>
          </div>
          <Link
            href="/#tools"
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Explore All 50+ Tools →
          </Link>
        </section>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" />
      </main>
    </div>
  );
}
