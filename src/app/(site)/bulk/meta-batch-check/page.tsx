import React from "react";
import type { Metadata } from "next";
import { MetaBatchCheckView } from "@/components/bulk/MetaBatchCheckView";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  Type,
  ShieldCheck,
  Zap,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Layers,
  ArrowRight,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

const CANONICAL_URL = "https://omniseotools.com/bulk/meta-batch-check";

export const metadata: Metadata = {
  title: "Bulk Meta Tag Batch Inspector | Audit Title & Description Lengths at Scale",
  description:
    "Inspect and validate hundreds of SEO meta titles and descriptions in seconds. Check character limits, truncation risks, and export to CSV or Google Sheets.",
  keywords: [
    "bulk meta tag inspector",
    "bulk title tag checker",
    "bulk meta description checker",
    "serp title length checker bulk",
    "batch meta tag validator",
    "meta tag truncation auditor",
    "bulk seo snippet preview",
    "google sheets meta tag audit",
    "seo title pixel checker bulk"
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk Meta Tag Batch Inspector | Audit Title & Description Lengths at Scale",
    description:
      "Inspect and validate hundreds of SEO meta titles and descriptions in seconds. Check character limits, truncation risks, and export to CSV or Google Sheets.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Meta Tag Batch Inspector | Audit Title & Description Lengths at Scale",
    description:
      "Inspect and validate hundreds of SEO meta titles and descriptions in seconds. Check character limits, truncation risks, and export to CSV or Google Sheets.",
  },
};

const FAQ_ITEMS = [
  {
    question: "What is the optimal length for an SEO Meta Title in 2026?",
    answer:
      "Google desktop and mobile search engine results allocate approximately 580–600 pixels for title display, which equates to roughly 50 to 60 characters. Titles exceeding 60 characters risk getting truncated with an ellipsis (...), which can conceal primary brand keywords or calls to action.",
  },
  {
    question: "What is the recommended length for a Meta Description?",
    answer:
      "For desktop and mobile search snippets, Google typically renders between 120 and 160 characters (approximately 960 pixels). Descriptions under 120 characters may fail to communicate sufficient context, while descriptions above 160 characters are frequently clipped.",
  },
  {
    question: "Can I paste a spreadsheet table directly from Google Sheets or Excel?",
    answer:
      "Yes. Simply copy your spreadsheet columns (URL, Title, Description, H1) and paste them directly into the input box. The engine automatically detects whether your input is Tab-Separated (TSV), Comma-Separated (CSV), or raw HTML snippet markup.",
  },
  {
    question: "Does this tool inspect raw HTML source code?",
    answer:
      "Yes. You can paste raw HTML markup containing multiple <title>, <meta name='description'>, and <h1> elements. The parser automatically extracts and structures each page's tags into an audited tabular report.",
  },
  {
    question: "Are my internal draft titles and unpublished descriptions private?",
    answer:
      "Yes. All character evaluations, regex parsing, and report formatting execute 100% locally in your web browser's memory. Your copy and unpublished metadata are never uploaded to any external server or stored in logs.",
  },
];

export default function BulkMetaBatchCheckPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk Meta Tag Batch Inspector",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Inspect and validate hundreds of SEO meta titles and descriptions in seconds. Check character limits, truncation risks, and export to CSV or Google Sheets.",
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
            name: "Bulk Meta Tag Batch Inspector",
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

        {/* Interactive Meta Inspector Component */}
        <MetaBatchCheckView />

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant Batch Evaluation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Audit hundreds of page titles and descriptions in milliseconds. Live character counts and instant truncation flags.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Google SERP Snippet Preview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Preview how each snippet will render on Google search result pages with realistic pixel-width truncation indicators.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Direct Spreadsheet Export
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Export complete audit reports to CSV or copy formatted TSV for 1-click Google Sheets and Airtable integration.
            </p>
          </div>
        </section>

        {/* In-Feed AdSlot */}
        <AdSlot slotType="in-feed" />

        {/* Technical SEO Guide */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>SEO Copywriting &amp; Snippet Optimization Guide</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How to Audit Meta Titles and Descriptions for Maximum Search CTR
          </h2>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              Meta titles (<code>&lt;title&gt;</code>) and meta descriptions are the first touchpoint between your website and potential visitors in organic search results. While search engines occasionally generate automated snippet replacements, well-crafted, length-compliant metadata directly increases organic Click-Through Rate (CTR) and search visibility.
            </p>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              Character Limits vs. Pixel Widths
            </h3>
            <p>
              Google allocates search snippet space by pixel width rather than raw character counts:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Title Pixel Limit:</strong> ~580px (Desktop) / ~600px (Mobile). Because capital letters (like <code>W</code> or <code>M</code>) occupy more horizontal space than lowercase letters (like <code>i</code> or <code>l</code>), keeping titles between <strong>50 and 60 characters</strong> is the industry gold standard.
              </li>
              <li>
                <strong>Description Pixel Limit:</strong> ~960px (Desktop) / ~680px (Mobile). Keeping meta descriptions between <strong>120 and 160 characters</strong> guarantees your value proposition and CTA remain visible.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              Best Practices for Metadata Audits
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Include primary target keywords early:</strong> Place your primary keyword near the beginning of the title tag to capture searcher attention before any potential clipping.
              </li>
              <li>
                <strong>Avoid duplicate title tags across pages:</strong> Every URL should feature unique, descriptive metadata tailored to the specific query intent.
              </li>
              <li>
                <strong>Incorporate compelling Calls-to-Action:</strong> Use active verbs in meta descriptions (e.g., <em>Discover, Calculate, Compare, Learn, Download</em>) to entice searchers.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-4 w-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Meta Tag Batch Inspector FAQs
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
              <span>Explore All Bulk Workbench Tools</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Extract sitemaps, build campaign UTM matrices, and clean URL inventories on the dedicated Bulk Hub.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/bulk/url-cleaner-audit"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold whitespace-nowrap hover:border-emerald-500 transition-all"
            >
              URL Cleaner ⚡
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
