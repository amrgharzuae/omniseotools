import React from "react";
import type { Metadata } from "next";
import { UrlCleanerAuditView } from "@/components/bulk/UrlCleanerAuditView";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Layers,
  ArrowRight,
  Database,
  Filter,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

const CANONICAL_URL = "https://omniseotools.com/bulk/url-cleaner-audit";

export const metadata: Metadata = {
  title: "Bulk URL Cleaner & Canonical Auditor | Audit Up to 10,000 URLs",
  description:
    "Clean tracking parameters, enforce lowercase paths, fix trailing slash issues, and detect non-ASCII punycode errors in bulk. 100% client-side privacy.",
  keywords: [
    "bulk url cleaner",
    "canonical url auditor",
    "strip tracking parameters bulk",
    "remove utm bulk",
    "trailing slash normalizer",
    "lowercase url converter bulk",
    "punycode url auditor",
    "batch url canonicalizer",
    "remove fbclid gclid bulk",
    "bulk redirect list cleaner"
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk URL Cleaner & Canonical Auditor | Audit Up to 10,000 URLs",
    description:
      "Clean tracking parameters, enforce lowercase paths, fix trailing slash issues, and detect non-ASCII punycode errors in bulk. 100% client-side privacy.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk URL Cleaner & Canonical Auditor | Audit Up to 10,000 URLs",
    description:
      "Clean tracking parameters, enforce lowercase paths, fix trailing slash issues, and detect non-ASCII punycode errors in bulk. 100% client-side privacy.",
  },
};

const FAQ_ITEMS = [
  {
    question: "Why should I clean tracking parameters from my URL lists?",
    answer:
      "Tracking parameters (such as utm_source, fbclid, gclid, and msclkid) create duplicate URL permutations for the exact same webpage. If shared, backlinked, or submitted in XML sitemaps, search engine bots waste crawl budget indexing duplicate variations, diluting link equity and confusing canonical signals.",
  },
  {
    question: "How does trailing slash normalization affect SEO?",
    answer:
      "Search engines and web servers treat https://example.com/page and https://example.com/page/ as two completely separate URLs. Inconsistent trailing slash usage causes duplicate content warnings or unnecessary 301 redirect hops. Standardizing trailing slashes across your catalog ensures clean internal linking and indexation.",
  },
  {
    question: "Does the tool convert uppercase characters in URL paths?",
    answer:
      "Yes. Most web servers (such as Apache and Nginx on Linux) treat URLs as case-sensitive. A URL with uppercase characters (e.g., /Products/Shoes) can cause 404 errors or duplicate indexing if linked inconsistently. The cleaner automatically converts pathnames to lowercase.",
  },
  {
    question: "Can I export only the cleaned destination URLs without the audit report?",
    answer:
      "Yes. Click 'Copy Cleaned URLs' to copy a clean, newline-separated list containing exclusively the final canonicalized URLs directly to your clipboard, perfect for feeding into crawlers, sitemaps, or redirect mapping tables.",
  },
  {
    question: "Is my URL inventory uploaded to any external server?",
    answer:
      "No. The entire validation and sanitization engine runs 100% client-side inside your browser's local JavaScript memory. Your staging URLs, pre-launch eCommerce catalogs, and internal infrastructure paths are never transmitted or stored.",
  },
];

export default function BulkUrlCleanerAuditPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk URL Cleaner & Canonical Auditor",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Clean tracking parameters, enforce lowercase paths, fix trailing slash issues, and detect non-ASCII punycode errors in bulk. 100% client-side privacy.",
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
            name: "Bulk URL Cleaner & Canonical Auditor",
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

        {/* Interactive URL Cleaner Component */}
        <UrlCleanerAuditView />

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              10,000 URL Capacity
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Batch audit large website inventories and log files in seconds. Pure client-side execution with zero server throttling.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              100% Client-Side Privacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Proprietary staging architectures, unpublished catalogs, and client audit data never leave your local browser sandbox.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Multi-Format Exports
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Export full audit reports to RFC CSV or Google Sheets TSV with clickable hyperlinks, or copy clean destination URLs with 1 click.
            </p>
          </div>
        </section>

        {/* In-Feed AdSlot */}
        <AdSlot slotType="in-feed" />

        {/* Technical SEO Guide */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Technical SEO Best Practices</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How to Clean URL Inventories for Canonical Compliance &amp; Migration Audits
          </h2>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              Maintaining strict URL hygiene is essential for enterprise search engine optimization. When managing large-scale migrations, building 301 redirect matrices, or exporting XML sitemaps, unclean URLs create duplicate indexation signals and waste Googlebot crawl budget.
            </p>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              Common URL Sanitation Pitfalls Fixed by this Tool
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Tracking &amp; Click ID Parameters:</strong> Query tags like <code>utm_source</code>, <code>fbclid</code>, and <code>gclid</code> are designed exclusively for analytics and ad tracking. When left on canonical URLs or internal links, they cause duplicate page indexing and split link authority.
              </li>
              <li>
                <strong>Mixed-Case URL Paths:</strong> Because Linux-based hosting environments are case-sensitive, linking to <code>/Blog/SEO-Tips</code> vs <code>/blog/seo-tips</code> can result in duplicate content or 404 errors. Standardizing to lowercase ensures uniform indexing.
              </li>
              <li>
                <strong>Trailing Slash Discrepancies:</strong> Search engines view <code>/category</code> and <code>/category/</code> as distinct entities. Enforcing a consistent policy eliminates unnecessary 301 redirect chains.
              </li>
              <li>
                <strong>Punycode &amp; Internationalized Domains:</strong> Internationalized Domain Names (IDNs) containing non-ASCII characters (e.g. Arabic or accented letters) are encoded using Punycode (<code>xn--...</code>). Auditing these tags prevents broken link scrapers.
              </li>
              <li>
                <strong>Anchor Hash Fragments:</strong> Hash fragments (<code>#section</code>) are handled client-side by browsers and are never processed by search engine web crawlers. Stripping them ensures clean canonical URLs.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              How to Use Cleaned Lists in Migration Workflows
            </h3>
            <p>
              When preparing site redesigns or platform migrations (such as migrating from WordPress to Shopify or Next.js), paste your old URL catalog into the cleaner. Click <strong>Copy Cleaned URLs</strong> to instantly retrieve sanitized target destinations for your 301 redirect lookup tables in Google Sheets or Cloudflare redirects.
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
            Bulk URL Cleaner FAQs
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
              Extract XML sitemaps, build multi-channel UTM matrices, or audit canonicals on the Bulk Hub.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/bulk/utm-matrix"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold whitespace-nowrap hover:border-emerald-500 transition-all"
            >
              UTM Matrix ⚡
            </Link>
            <Link
              href="/bulk"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-all"
            >
              Bulk Hub →
            </Link>
          </div>
        </section>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" />
      </main>
    </div>
  );
}
