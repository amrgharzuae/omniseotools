import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Clock,
  Calendar,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  FileCode,
  Check,
  XCircle,
  ExternalLink,
  Code2,
} from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { UtmSnippetTabs } from "@/components/recipes/UtmSnippetTabs";

const CANONICAL_URL = "https://omniseotools.com/recipes/fix-ga4-utm-source-capitalization-fragmentation";

export const metadata: Metadata = {
  title: "How to Fix GA4 UTM Casing Fragmentation (Uppercase vs Lowercase) | OmniSEO Tools",
  description:
    "Learn how to resolve fragmented source/medium traffic in Google Analytics 4 caused by mixed-case UTM parameters, with automated regex fixes and client-side sanitization.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "How to Fix GA4 UTM Casing Fragmentation (Uppercase vs Lowercase) | OmniSEO Tools",
    description:
      "Learn how to resolve fragmented source/medium traffic in Google Analytics 4 caused by mixed-case UTM parameters, with automated regex fixes and client-side sanitization.",
    url: CANONICAL_URL,
    type: "article",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Fix GA4 UTM Casing Fragmentation (Uppercase vs Lowercase) | OmniSEO Tools",
    description:
      "Learn how to resolve fragmented source/medium traffic in Google Analytics 4 caused by mixed-case UTM parameters, with automated regex fixes and client-side sanitization.",
  },
};

export default function FixGa4UtmCasingFragmentationRecipe() {
  // Structured Data Schema: TechArticle + HowTo + FAQPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How to Fix GA4 UTM Casing Fragmentation (Uppercase vs Lowercase)",
        description:
          "Learn how to resolve fragmented source/medium traffic in Google Analytics 4 caused by mixed-case UTM parameters, with automated regex fixes and client-side sanitization.",
        url: CANONICAL_URL,
        datePublished: "2026-09-01T00:00:00+00:00",
        dateModified: "2026-09-26T00:00:00+00:00",
        inLanguage: "en-US",
        author: {
          "@type": "Organization",
          name: "OmniSEO Tools",
          url: "https://omniseotools.com",
        },
        publisher: {
          "@type": "Organization",
          name: "OmniSEO Tools",
          url: "https://omniseotools.com",
        },
        mainEntityOfPage: CANONICAL_URL,
      },
      {
        "@type": "HowTo",
        name: "How to Fix GA4 UTM Capitalization Fragmentation",
        description:
          "Step-by-step guide to resolving fragmented source/medium rows in Google Analytics 4 caused by mixed-case UTM parameters and standardizing channel grouping attribution.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Identify Fragmented Rows in GA4",
            text: "Navigate to Reports > Acquisition > Traffic Acquisition and set primary dimension to Session source / medium. Filter by regex (?i)facebook|google to locate duplicate case entries.",
            url: `${CANONICAL_URL}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Standardize Naming Conventions",
            text: "Enforce all-lowercase values across utm_source, utm_medium, and utm_campaign in team tracking sheets and ad accounts.",
            url: `${CANONICAL_URL}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Automate URL Sanitization",
            text: "Use client-side enforcement to auto-lowercase URL query parameters prior to pushing ad links live.",
            url: `${CANONICAL_URL}#step-3`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Historical Data Note",
            text: "Explain that GA4 does not retroactively rewrite historic data; fixes apply only to newly collected sessions.",
            url: `${CANONICAL_URL}#step-4`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why does GA4 separate uppercase and lowercase UTM tags?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google Analytics 4 is strictly case-sensitive in its backend data ingestion pipeline. It treats strings like 'Facebook', 'facebook', and 'FACEBOOK' as separate and distinct source values. Furthermore, GA4's default channel grouping rule engine uses strict string evaluation, which causes capitalized parameter values to fail matching logic and get dumped into the 'Unassigned' traffic bucket.",
            },
          },
          {
            "@type": "Question",
            name: "Can you merge historical split sessions in GA4?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. GA4 does not retroactively rewrite or reprocess historical session logs once recorded. However, you can unify historical views by creating a Custom Channel Group in Admin settings using case-insensitive regex rules, or by applying LOWER(Session source / medium) calculated dimensions in Google Looker Studio or BigQuery SQL exports.",
            },
          },
          {
            "@type": "Question",
            name: "What is the recommended GA4 casing convention?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The universal enterprise best practice is strict all-lowercase alphanumeric strings (e.g., utm_source=facebook, utm_medium=paid_social, utm_campaign=summer_sale_2026). Always use hyphens (-) or underscores (_) instead of spaces to prevent %20 URL escape codes, and maintain an automated matrix builder across marketing teams to eliminate manual human entry errors.",
            },
          },
        ],
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
            name: "Developer Recipes",
            item: "https://omniseotools.com/recipes",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "How to Fix GA4 UTM Casing Fragmentation",
            item: CANONICAL_URL,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-10 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/recipes" className="hover:text-emerald-600 font-medium transition-colors">
              Developer Recipes
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium truncate">
              GA4 UTM Casing Fragmentation
            </span>
          </nav>

          {/* Badges & Meta Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
            <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-300">
              SEO &amp; Search Console
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              4 min read
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              Updated September 2026
            </span>
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              GA4 Production Verified
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            How to Fix GA4 UTM Casing Fragmentation (Uppercase vs Lowercase)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Learn how to resolve fragmented source/medium traffic in Google Analytics 4 caused by mixed-case UTM parameters, with automated regex fixes and client-side sanitization.
          </p>
        </div>
      </section>

      {/* Main Recipe Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 space-y-10">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* 1. Direct Answer Box (Top of Page, above fold for AI Extraction) */}
        <section
          id="direct-answer"
          className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6 shadow-sm space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white shadow-sm">
              <Zap className="h-4 w-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Quick Answer
            </h3>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            Google Analytics 4 is strictly case-sensitive. When campaigns use mixed casing like{" "}
            <code className="px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold">
              utm_source=Facebook
            </code>{" "}
            and{" "}
            <code className="px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold">
              utm_source=facebook
            </code>
            , GA4 splits attribution into two separate rows and breaks Default Channel Grouping rules. The fix requires forcing lowercase parameters before campaign distribution or sanitizing existing links with automated casing rules.
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
              <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">The Casing Conflict:</strong>
                <span>
                  Mixed casing causes <code className="font-mono">Facebook / CPC</code> to fall into &quot;Unassigned&quot; channel bucket instead of Paid Social.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">The Solution:</strong>
                <span>
                  Auto-enforce lowercase URL sanitization client-side and at the CDN edge before links hit GA4 tracking tags.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Bridge / CTA Card */}
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/20 my-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Automate &amp; Sanitize Your Campaign Links
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Both tools automatically enforce GA4 lowercase standards and replace space characters client-side.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors whitespace-nowrap"
                href="/tools/utm-campaign-builder"
              >
                Sanitize Single Link: Campaign URL Builder &rarr;
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors whitespace-nowrap"
                href="/tools/bulk-utm-matrix-generator"
              >
                Sanitize 50+ Links: Bulk UTM Matrix &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 3. The Technical Problem & Visual Matrix */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-rose-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Why GA4 Splits Mixed-Case UTM Parameters
            </h2>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Google Analytics 4 processes incoming hit query strings verbatim. Because the database engine stores string tokens as exact byte values, <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_source=Facebook</code>, <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_source=facebook</code>, and <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_source=FACEBOOK</code> are recorded as three completely different traffic sources.
          </p>

          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Crucially, GA4&apos;s <strong>Default Channel Grouping rules</strong> evaluate regex patterns against <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">source</code> and <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">medium</code> dimensions. When a medium is tagged as <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_medium=CPC</code> or <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_medium=Paid_Social</code>, the uppercase characters fail GA4&apos;s default rule definitions, causing high-value ad traffic to be classified as <strong>Unassigned</strong>.
          </p>

          {/* Table Comparison */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3 font-bold">Targeted Channel</th>
                  <th className="p-3 font-bold">Query Parameter Casing</th>
                  <th className="p-3 font-bold">GA4 Session Source / Medium</th>
                  <th className="p-3 font-bold">Assigned Channel Group</th>
                  <th className="p-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr className="bg-rose-50/40 dark:bg-rose-950/10">
                  <td className="p-3 font-sans font-bold text-slate-900 dark:text-white">Meta / Facebook Ads</td>
                  <td className="p-3 text-rose-700 dark:text-rose-400">?utm_source=Facebook&amp;utm_medium=Paid_Social</td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">Facebook / Paid_Social</td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 font-sans font-semibold">Unassigned</td>
                  <td className="p-3 font-sans"><span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-[10px] font-bold">Broken</span></td>
                </tr>
                <tr className="bg-emerald-50/40 dark:bg-emerald-950/10">
                  <td className="p-3 font-sans font-bold text-slate-900 dark:text-white">Meta / Facebook Ads</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400">?utm_source=facebook&amp;utm_medium=paid_social</td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">facebook / paid_social</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Paid Social</td>
                  <td className="p-3 font-sans"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">Resolved</span></td>
                </tr>
                <tr className="bg-rose-50/40 dark:bg-rose-950/10">
                  <td className="p-3 font-sans font-bold text-slate-900 dark:text-white">Google Search Ads</td>
                  <td className="p-3 text-rose-700 dark:text-rose-400">?utm_source=Google&amp;utm_medium=CPC</td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">Google / CPC</td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 font-sans font-semibold">Unassigned</td>
                  <td className="p-3 font-sans"><span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-[10px] font-bold">Broken</span></td>
                </tr>
                <tr className="bg-emerald-50/40 dark:bg-emerald-950/10">
                  <td className="p-3 font-sans font-bold text-slate-900 dark:text-white">Google Search Ads</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400">?utm_source=google&amp;utm_medium=cpc</td>
                  <td className="p-3 text-slate-800 dark:text-slate-200">google / cpc</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Paid Search</td>
                  <td className="p-3 font-sans"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">Resolved</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Step-by-Step Resolution Guide (Ordered List for HowTo Schema) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Step-by-Step Resolution Guide
            </h2>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Follow these 4 steps to eliminate casing fragmentation and unify your GA4 reporting data:
          </p>

          <ol className="grid grid-cols-1 gap-4 list-none p-0 m-0">
            {/* Step 1 */}
            <li
              id="step-1"
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Identify Fragmented Rows in GA4
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                Navigate to <em>Reports &gt; Acquisition &gt; Traffic Acquisition</em> in Google Analytics 4 and set the primary dimension to <strong>Session source / medium</strong>. In the search filter bar, select <em>Matches regex</em> and enter <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">(?i)facebook|google|linkedin|email</code> to immediately isolate and tally all mixed-case duplicate entries.
              </p>
            </li>

            {/* Step 2 */}
            <li
              id="step-2"
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Standardize Naming Conventions
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                Enforce all-lowercase values across <code className="font-mono text-xs text-slate-900 dark:text-white font-semibold">utm_source</code>, <code className="font-mono text-xs text-slate-900 dark:text-white font-semibold">utm_medium</code>, and <code className="font-mono text-xs text-slate-900 dark:text-white font-semibold">utm_campaign</code> in team tracking spreadsheets and advertising platforms. Replace all spaces with hyphens or underscores to eliminate clumsy <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">%20</code> encoding.
              </p>
            </li>

            {/* Step 3 */}
            <li
              id="step-3"
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Automate URL Sanitization
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                Use client-side enforcement to auto-lowercase URL query parameters prior to pushing ad links live. Additionally, configure edge middleware (e.g. Next.js Edge Middleware or Cloudflare Workers) to automatically intercept incoming capitalized UTM parameters and permanently redirect (HTTP 301) to normalized lowercase query strings.
              </p>
            </li>

            {/* Step 4 */}
            <li
              id="step-4"
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  4
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Historical Data Note
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                Google Analytics 4 does not retroactively rewrite or reprocess historic data; fixes apply only to newly collected sessions. To clean up historical reports, create a Custom Channel Group in GA4 Admin using case-insensitive regex or create calculated fields using <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">LOWER(Session source / medium)</code> in Looker Studio or BigQuery.
              </p>
            </li>
          </ol>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-8" />

        {/* 5. Technical Code Snippets */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Technical Code Snippets &amp; Edge Interceptors
            </h2>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select a solution below to sanitize URLs client-side or rewrite casing at the edge before GA4 tags execute:
          </p>

          <UtmSnippetTabs />
        </section>

        {/* 6. Common Pitfalls & Gotchas */}
        <section className="space-y-4">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-base">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <span>Common Pitfalls &amp; Gotchas to Avoid</span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200/90 pl-5 list-disc leading-relaxed">
              <li>
                <strong>Tagging Internal Website Links with UTMs:</strong> Placing UTM parameters on internal banners or navigational links instantly overwrites the user&apos;s initial acquisition session, resetting source attribution and inflating session counts.
              </li>
              <li>
                <strong>Unencoded Spaces in UTM Values:</strong> Leaving raw spaces in campaign names causes browsers to encode them as <code className="font-mono font-bold">%20</code> or <code className="font-mono font-bold">+</code>, causing fragmented rows in GA4 reporting tables.
              </li>
              <li>
                <strong>Inconsistent Delimiters:</strong> Mixing underscores (<code className="font-mono">summer_sale</code>) and hyphens (<code className="font-mono">summer-sale</code>) splits campaigns across multiple rows even if casing is identical.
              </li>
              <li>
                <strong>Failing to Strip Legacy Tracking Params:</strong> Re-sharing landing page URLs that already contain old or uppercase UTM tags multiplies query string conflicts.
              </li>
            </ul>
          </div>
        </section>

        {/* 7. Structured FAQ Section (Rendered HTML + Schema) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40">
              <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                <span>Why does GA4 separate uppercase and lowercase UTM tags?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                Google Analytics 4 is strictly case-sensitive in its backend data ingestion pipeline. It treats strings like &quot;Facebook&quot;, &quot;facebook&quot;, and &quot;FACEBOOK&quot; as separate and distinct source values. Furthermore, GA4&apos;s default channel grouping rule engine uses strict string evaluation, which causes capitalized parameter values to fail matching logic and get dumped into the &quot;Unassigned&quot; traffic bucket.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40">
              <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                <span>Can you merge historical split sessions in GA4?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                No. GA4 does not retroactively rewrite or reprocess historical session logs once recorded. However, you can unify historical views by creating a Custom Channel Group in Admin settings using case-insensitive regex rules, or by applying <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">LOWER(Session source / medium)</code> calculated dimensions in Google Looker Studio or BigQuery SQL exports.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40">
              <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                <span>What is the recommended GA4 casing convention?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                The universal enterprise best practice is strict all-lowercase alphanumeric strings (e.g., <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_source=facebook</code>, <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_medium=paid_social</code>, <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">utm_campaign=summer_sale_2026</code>). Always use hyphens (<code className="font-mono">-</code>) or underscores (<code className="font-mono">_</code>) instead of spaces to prevent <code className="font-mono">%20</code> URL escape codes, and maintain an automated matrix builder across marketing teams to eliminate manual human entry errors.
              </p>
            </details>
          </div>
        </section>

        {/* 8. Contextual Related Tools Bridge */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Related Marketing &amp; Analytics Tools
            </h2>
            <Link
              href="/tools"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All 34 Tools</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/marketing/utm-campaign-builder"
              className="group flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Tool #22
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  UTM Campaign Builder &amp; URL Tracker
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  Build individual custom tracking links with automated lowercase sanitization, GA4 channel validation, and instant QR codes.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Launch Tool</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tools/bulk-utm-matrix-generator"
              className="group flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Tool #34
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Bulk UTM Matrix &amp; Multi-Channel Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  Generate and export up to 300+ multi-channel GA4 campaign links across multiple destination landing pages in one click.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Launch Tool</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-10" />
      </main>
    </div>
  );
}
