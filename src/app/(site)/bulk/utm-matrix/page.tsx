import React from "react";
import type { Metadata } from "next";
import { UtmMatrixView } from "@/components/bulk/UtmMatrixView";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  Tag,
  ShieldCheck,
  Table,
  Zap,
  BarChart3,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Layers,
  ArrowRight,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

const CANONICAL_URL = "https://omniseotools.com/bulk/utm-matrix";

export const metadata: Metadata = {
  title: "Bulk UTM Matrix Generator | Build Campaign URLs at Scale",
  description:
    "Generate hundreds of tagged UTM campaign URLs in seconds. 100% client-side privacy with direct export to CSV and Google Sheets.",
  keywords: [
    "bulk utm generator",
    "utm matrix generator",
    "batch utm builder",
    "bulk campaign url builder",
    "multi-channel utm generator",
    "ga4 utm matrix",
    "google sheets utm builder",
    "cartesian utm generator",
    "ppc utm builder",
    "paid social utm generator",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk UTM Matrix Generator | Build Campaign URLs at Scale",
    description:
      "Generate hundreds of tagged UTM campaign URLs in seconds. 100% client-side privacy with direct export to CSV and Google Sheets.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk UTM Matrix Generator | Build Campaign URLs at Scale",
    description:
      "Generate hundreds of tagged UTM campaign URLs in seconds. 100% client-side privacy with direct export to CSV and Google Sheets.",
  },
};

const FAQ_ITEMS = [
  {
    question: "What is a Bulk UTM Matrix Generator?",
    answer:
      "A Bulk UTM Matrix Generator creates the complete Cartesian product (all mathematical permutations) between a list of base landing URLs and multiple campaign parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term). Instead of manually assembling links one by one, you can generate hundreds or thousands of tagged URLs instantly in your browser.",
  },
  {
    question: "How does the Google Sheets Formula export work?",
    answer:
      "When you click 'Copy as Formulas', the tool copies a pre-formatted TSV table where the URL column contains active =HYPERLINK('...', '...') formulas. When pasted into Google Sheets or Microsoft Excel, your rows immediately render as clean, clickable anchor links with custom campaign labels.",
  },
  {
    question: "Are my campaign URLs and UTM parameters uploaded to any server?",
    answer:
      "No. All Cartesian permutation calculations, parameter sanitization, and export formatting happen 100% locally in your browser's memory. Your internal marketing strategies, budget campaign names, and unpublished landing pages never leave your computer.",
  },
  {
    question: "How does the tool map parameters to GA4 Default Channel Groups?",
    answer:
      "The engine incorporates Google Analytics 4's official channel grouping logic. For example, pairings like source=google + medium=cpc automatically classify as 'Paid Search', while source=meta + medium=paid_social classify as 'Paid Social', ensuring clean analytics attribution from day one.",
  },
  {
    question: "Can I paste URLs that already contain existing query parameters?",
    answer:
      "Yes. The engine cleanly inspects existing query strings and hash fragments (#section). If you enable 'Strip existing query params', pre-existing query tags are removed; otherwise, the URL constructor safely appends UTM parameters without duplicating question marks or destroying URL anchors.",
  },
];

export default function BulkUtmMatrixPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk UTM Matrix Generator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate hundreds of tagged UTM campaign URLs in seconds. 100% client-side privacy with direct export to CSV and Google Sheets.",
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
            name: "Bulk UTM Matrix Generator",
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

        {/* Interactive UTM Matrix Tool Component */}
        <UtmMatrixView />

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Instant Cartesian Product
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Multiply 50 landing pages across 6 advertising channels in a fraction of a second. Generates 300+ clean tracking URLs with zero latency.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              GA4 Channel Group Alignment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Automatically verifies source and medium pairings against Google Analytics 4 standards, eliminating unassigned traffic in your reporting.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Native Sheets Formula Export
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Export as native <code>=HYPERLINK()</code> TSV for 1-click pasting into Google Sheets, Airtable, or Microsoft Excel ad trackers.
            </p>
          </div>
        </section>

        {/* In-Feed AdSlot */}
        <AdSlot slotType="in-feed" />

        {/* Comprehensive Technical Guide */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Growth Marketing Technical Guide</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How to Build Multi-Channel Campaign URL Matrices at Scale
          </h2>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              In multi-channel digital marketing, running promotional campaigns across Google Ads, Meta (Facebook &amp; Instagram), TikTok, LinkedIn, and email newsletters requires consistent, error-free URL tagging. When marketing teams manually build UTM parameters in spreadsheets, syntax discrepancies (such as mixing <code>cpc</code> vs <code>CPC</code> or <code>paid-social</code> vs <code>paidsocial</code>) pollute analytics attribution.
            </p>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              Why Cartesian Multi-Channel Tagging Matters
            </h3>
            <p>
              The <strong>Cartesian Product</strong> represents every possible combination between your landing page catalog and your distribution channels. For example, if you are promoting 10 category pages across 4 paid sources with 2 creative variations (hero banner vs sidebar), you need <code>10 × 4 × 2 = 80</code> unique URLs. The OmniSEOTools Bulk UTM Matrix Generator creates all 80 URLs in 1 millisecond.
            </p>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              GA4 Channel Grouping Rules Cheatsheet
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 dark:bg-slate-950 font-bold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-800">Channel Group</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-800">Recommended utm_source</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-800">Recommended utm_medium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono text-[11px]">
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white">Paid Search</td>
                    <td className="p-3">google, bing</td>
                    <td className="p-3">cpc, ppc, paidsearch</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white">Paid Social</td>
                    <td className="p-3">facebook, instagram, tiktok, linkedin, twitter</td>
                    <td className="p-3">paid_social, paidsocial, cpc</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white">Email</td>
                    <td className="p-3">newsletter, customer_io, mailchimp</td>
                    <td className="p-3">email</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white">Organic Social</td>
                    <td className="p-3">linktree, twitter, linkedin, youtube</td>
                    <td className="p-3">social_bio, post</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white">Affiliates</td>
                    <td className="p-3">partner_name, shareasale, impact</td>
                    <td className="p-3">affiliate, partner</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200 pt-2">
              Best Practices for Clean Campaign Tagging
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Always enforce lowercase:</strong> Google Analytics treats <code>utm_source=Google</code> and <code>utm_source=google</code> as two separate sources. Keeping lowercase enabled eliminates reporting splits.
              </li>
              <li>
                <strong>Use hyphens or underscores instead of spaces:</strong> Spaces create ugly <code>%20</code> encodings that can break in email clients and SMS gateways.
              </li>
              <li>
                <strong>Preserve URL anchors:</strong> If you are targeting an on-page section (e.g. <code>/pricing#enterprise</code>), our builder automatically places UTM query parameters before the fragment hash.
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
            Bulk UTM Matrix FAQs
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
              Extract sitemaps in bulk, audit canonicals, or generate multi-channel UTM matrices on the Bulk Hub.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/bulk/sitemap-extractor"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold whitespace-nowrap hover:border-emerald-500 transition-all"
            >
              Sitemap Extractor ⚡
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
