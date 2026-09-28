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
  Search,
  Sliders,
  Type,
  Maximize2,
  Copy,
  Terminal,
} from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { RecipeSolutionViewer } from "@/components/recipes/RecipeSolutionViewer";

const CANONICAL_URL = "https://omniseotools.com/recipes/how-to-fix-google-rewriting-meta-titles";

export const metadata: Metadata = {
  title: "Why Google Rewrites Your Title Tags & How to Fix It | OmniSEO Tools",
  description:
    "Diagnose why Google rewrites, truncates, or replaces your meta titles in search results. Learn the 5 rewrite triggers, the decision pipeline, and how to protect your click-through rates.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Why Google Rewrites Your Title Tags & How to Fix It | OmniSEO Tools",
    description:
      "Diagnose why Google rewrites, truncates, or replaces your meta titles in search results. Learn the 5 rewrite triggers, the decision pipeline, and how to protect your click-through rates.",
    url: CANONICAL_URL,
    type: "article",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Google Rewrites Your Title Tags & How to Fix It | OmniSEO Tools",
    description:
      "Diagnose why Google rewrites, truncates, or replaces your meta titles in search results. Learn the 5 rewrite triggers, the decision pipeline, and how to protect your click-through rates.",
  },
};

export default function GoogleTitleRewritingRecipePage() {
  // Structured Data Schema: TechArticle + HowTo + FAQPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "Why Google Rewrites Your Meta Titles (And How to Fix It)",
        description:
          "Diagnose why Google rewrites, truncates, or replaces your meta titles in search results. Learn the 5 rewrite triggers, the decision pipeline, and how to protect your click-through rates.",
        url: CANONICAL_URL,
        datePublished: "2026-09-01T00:00:00+00:00",
        dateModified: "2026-09-28T00:00:00+00:00",
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
        name: "How to Prevent Google From Rewriting Meta Titles",
        description:
          "Step-by-step diagnostic and implementation protocol to eliminate Google SERP title overrides, prevent brand doubling, and enforce 600px pixel constraints.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Audit Exact Pixel Width",
            text: "Measure character pixel dimensions rather than character counts using Google's Arial font metrics. Keep desktop titles between 450px and 580px.",
            url: `${CANONICAL_URL}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Harmonize <title> and <h1> Headings",
            text: "Ensure the core promise and primary keyword of the HTML <title> tag directly reflect the on-page <h1> heading.",
            url: `${CANONICAL_URL}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Control Brand Suffix Appending",
            text: "Prevent double brand names (especially common on Shopify and Squarespace platforms) by standardizing separator formatting (- or |).",
            url: `${CANONICAL_URL}#step-3`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Inspect Raw HTML vs. Client DOM",
            text: "Verify that JavaScript hydration is not injecting secondary titles after the initial server-side render.",
            url: `${CANONICAL_URL}#step-4`,
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Use Google Search Console URL Inspection",
            text: "Submit revised URLs via GSC to confirm Googlebot captures the updated title upon the next crawl.",
            url: `${CANONICAL_URL}#step-5`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can you use a robots meta tag to stop Google from rewriting titles?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No direct robots directive or HTTP header exists to force Google to use your exact <title> tag. Robots directives like nosnippet and max-snippet only control descriptions and text snippets, not title generation.",
            },
          },
          {
            "@type": "Question",
            name: "Does Google rewriting your title hurt your rankings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While the algorithmic rewrite itself does not directly lower ranking calculations (which evaluate the complete document), poorly phrased, abrupt, or inaccurate rewrites severely damage organic click-through rates (CTR), reducing search traffic.",
            },
          },
          {
            "@type": "Question",
            name: "Why does Google show my site name before my page title?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In modern Google search results (especially mobile), Google renders a dedicated Site Name element above or before the snippet title. This is derived from WebSite structured data (schema.org), og:site_name, or domain heuristics.",
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
            name: "Why Google Rewrites Your Meta Titles",
            item: CANONICAL_URL,
          },
        ],
      },
    ],
  };

  const solutionCode = `<!-- 1. Optimal HTML Head Structure (<600px Desktop / <580px Mobile) -->
<head>
  <title>Google SERP Simulator &amp; Snippet Preview Tool | OmniSEO</title>
  <meta name="description" content="Simulate Google desktop and mobile search snippets with real-time canvas pixel counters and CMS brand presets." />
</head>

<!-- 2. On-Page H1 Harmonization (Matches Title Promise) -->
<main>
  <h1>Google SERP Simulator &amp; Snippet Preview Tool</h1>
  <p>Test your title tags and meta descriptions against exact Google pixel boundaries.</p>
</main>

<!-- 3. Next.js App Router Metadata Implementation -->
export const metadata: Metadata = {
  title: "Google SERP Simulator & Snippet Preview Tool | OmniSEO",
  description: "Simulate Google desktop and mobile search snippets with real-time canvas pixel counters.",
  alternates: {
    canonical: "https://omniseotools.com/tools/google-serp-simulator",
  },
  openGraph: {
    title: "Google SERP Simulator & Snippet Preview Tool",
    description: "Simulate Google desktop and mobile search snippets.",
  },
};`;

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
              Google Title Rewrite Guide
            </span>
          </nav>

          {/* Badges & Meta Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
            <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-300">
              SEO &amp; Search Console
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              5 min read
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              Updated September 2026
            </span>
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Algorithm Verified
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            Why Google Rewrites Your Meta Titles (And How to Fix It)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A step-by-step diagnostic guide to preventing Google SERP title overrides, brand appending issues, and pixel truncation.
          </p>
        </div>
      </section>

      {/* Main Recipe Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 space-y-12">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* 1. Direct Answer Box (Top Callout Container for AI Extraction) */}
        <section
          id="direct-answer"
          className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6 sm:p-7 shadow-sm space-y-3"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white shadow-sm">
              <Zap className="h-4 w-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Quick Answer
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            Google rewrites approximately <strong>60% of meta titles</strong> when HTML <code className="px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold">&lt;title&gt;</code> tags exceed <strong>600px desktop limits</strong> (~580px mobile), feature repetitive boilerplate branding, omit the user&apos;s explicit query intent, or contradict on-page <code className="px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold">&lt;h1&gt;</code> tags. While you cannot forcibly disable Google&apos;s title generation algorithm, you can prevent rewrites by aligning your <code className="px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold">&lt;title&gt;</code> closely with the primary <code className="px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold">&lt;h1&gt;</code>, placing targeted keywords within the first 300 pixels, and avoiding over-optimized keyword stuffing.
          </p>
        </section>

        {/* 2. Interactive Tool Bridge Banner */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Audit Your Titles Before Google Truncates Them
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Simulate desktop and mobile SERP rendering with real-time canvas pixel counters and CMS presets.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/google-serp-simulator"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all"
              >
                <span>Universal Simulator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/tools/google-serp-simulator/shopify"
                className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all"
              >
                Shopify Preset
              </Link>
              <Link
                href="/tools/google-serp-simulator/wordpress"
                className="inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all"
              >
                WordPress Preset
              </Link>
            </div>
          </div>
        </section>

        {/* 3. The 5 Core Triggers Behind Title Rewrites (Semantic Grid / Cards) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="h-5 w-5 text-rose-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The 5 Core Triggers Behind Google Title Rewrites
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Google&apos;s title generation system evaluates multiple page signals against the user query. When any of the following 5 triggers are tripped, Google replaces or modifies your title tag:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Trigger 1 */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm sm:text-base">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs">
                  1
                </span>
                <span>Pixel Width Overflow (&gt;600px Desktop)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The title exceeds the <strong>600px desktop</strong> or <strong>~580px mobile</strong> visual container. Rather than just appending an ellipsis (<code>...</code>), Google often replaces the entire suffix or drops secondary phrases to fit the snippet container.
              </p>
              <div className="rounded-lg bg-rose-50 dark:bg-rose-950/30 p-2.5 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-800 dark:text-rose-300 font-mono">
                Trigger: Title measures 685px &rarr; Truncated / Rewritten
              </div>
            </div>

            {/* Trigger 2 */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-bold text-sm sm:text-base">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs">
                  2
                </span>
                <span>H1 vs. Title Tag Mismatch</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The <code className="font-mono text-xs">&lt;title&gt;</code> promises something substantially different from the on-page <code className="font-mono text-xs">&lt;h1&gt;</code> or main visible heading. Google substitutes the <code className="font-mono text-xs">&lt;h1&gt;</code> text because it considers visible page content more authentic.
              </p>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-2.5 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 font-mono">
                Trigger: Title says &quot;Pricing&quot; but H1 is &quot;Enterprise Solutions&quot;
              </div>
            </div>

            {/* Trigger 3 */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-orange-600 dark:text-orange-400 font-bold text-sm sm:text-base">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 text-xs">
                  3
                </span>
                <span>Keyword Stuffing &amp; Repetition</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Repeating identical keywords across multiple pipe or hyphen delimiters (e.g., <em>SEO Tool | Best SEO Tool | Top SEO Software</em>). Google filters repeated tokens and algorithmically compresses the snippet.
              </p>
              <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 p-2.5 border border-orange-200 dark:border-orange-900/40 text-xs text-orange-800 dark:text-orange-300 font-mono">
                Trigger: 3+ pipes with repeated keyword variations
              </div>
            </div>

            {/* Trigger 4 */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3">
              <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400 font-bold text-sm sm:text-base">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs">
                  4
                </span>
                <span>Boilerplate / Sitewide Duplication</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Using identical brand templates across thousands of category or product pages without unique differentiating context. Google replaces repetitive boilerplate text with on-page product names.
              </p>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-950/30 p-2.5 border border-purple-200 dark:border-purple-900/40 text-xs text-purple-800 dark:text-purple-300 font-mono">
                Trigger: Identical sitewide prefix on 5,000+ URLs
              </div>
            </div>

            {/* Trigger 5 */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-base">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs">
                  5
                </span>
                <span>Query Relevancy Overrides (Long-Tail Intent)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                When a user searches for a specific long-tail query that matches an internal sub-heading (<code className="font-mono text-xs">&lt;h2&gt;</code>) or internal anchor text better than the static title tag, Google dynamically generates a query-tailored snippet title to maximize click relevancy for that specific searcher.
              </p>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-2.5 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 font-mono">
                Trigger: Query matches H2 subsection rather than generic page title
              </div>
            </div>
          </div>
        </section>

        {/* 4. Production Solution Snippet & Verification */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Production Title Tag &amp; H1 Alignment Blueprint
            </h2>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Copy and adapt this verified HTML and Next.js App Router metadata structure:
          </p>

          <RecipeSolutionViewer
            solutionSnippet={solutionCode}
            snippetLanguage="html"
            relatedToolSlug="google-serp-simulator"
            relatedToolName="Google SERP Simulator & Title Pixel Checker"
            relatedToolCta="Test Title in SERP Simulator"
          />
        </section>

        {/* 5. Step-by-Step Prevention Protocol (<ol> for HowTo Schema) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Zap className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Step-by-Step Prevention Protocol
            </h2>
          </div>

          <ol className="space-y-4 list-none p-0">
            {/* Step 1 */}
            <li
              id="step-1"
              className="scroll-mt-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Audit Exact Pixel Width (450px – 580px Range)
                </h3>
              </div>
              <div className="pl-10 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Never rely solely on raw character limits (like 60 characters). Letters such as &apos;W&apos; and &apos;M&apos; occupy up to 18px in Google&apos;s 20px Arial font, while &apos;i&apos; and &apos;l&apos; take only 4px.
                </p>
                <p>
                  Use our <Link href="/tools/google-serp-simulator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-500">Google SERP Simulator</Link> to measure real-time Canvas 2D pixel widths. Keep desktop title strings between <strong>450px and 580px</strong> to guarantee clean rendering without ellipsis truncation.
                </p>
              </div>
            </li>

            {/* Step 2 */}
            <li
              id="step-2"
              className="scroll-mt-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Harmonize &lt;title&gt; and &lt;h1&gt; Headings
                </h3>
              </div>
              <div className="pl-10 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Google cross-references your HTML <code className="font-mono text-xs">&lt;title&gt;</code> with the primary visible <code className="font-mono text-xs">&lt;h1&gt;</code>. If your title promises one topic (e.g., &quot;Enterprise Cloud Backup&quot;) but the H1 reads &quot;Sign Up Today&quot;, Google will substitute the H1 or an on-page H2.
                </p>
                <p>
                  Keep the primary subject noun and value proposition aligned between the <code className="font-mono text-xs">&lt;title&gt;</code> and <code className="font-mono text-xs">&lt;h1&gt;</code>.
                </p>
              </div>
            </li>

            {/* Step 3 */}
            <li
              id="step-3"
              className="scroll-mt-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Control Brand Suffix Appending
                </h3>
              </div>
              <div className="pl-10 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Platforms like Shopify and Squarespace often append brand names automatically (e.g., <code className="font-mono text-xs">{"{{ page_title }} – {{ shop.name }}"}</code> or <code className="font-mono text-xs">%s — Site Title</code>). If you also type your brand into your SEO title field, you end up with duplicated brand suffixes (e.g., <em>MyStore - Best Shoes - MyStore</em>).
                </p>
                <p>
                  Standardize your brand separator to a single hyphen (<code className="font-mono text-xs">-</code>) or pipe (<code className="font-mono text-xs">|</code>) and test CMS-specific behavior using our <Link href="/tools/google-serp-simulator/shopify" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-500">Shopify</Link> and <Link href="/tools/google-serp-simulator/squarespace" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-500">Squarespace</Link> simulator presets.
                </p>
              </div>
            </li>

            {/* Step 4 */}
            <li
              id="step-4"
              className="scroll-mt-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  4
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Inspect Raw HTML vs. Client DOM Hydration
                </h3>
              </div>
              <div className="pl-10 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  In Single Page Applications (SPAs) and React frameworks, client-side title mutations (via <code className="font-mono text-xs">document.title</code> or delayed state hooks) may run after initial server render.
                </p>
                <p>
                  Always verify your initial server-rendered response using <code className="font-mono text-xs">curl -IL https://yourdomain.com</code> or Chrome DevTools &apos;View Source&apos; (not just &apos;Inspect Element&apos;) to ensure Googlebot reads the clean title upon the first pass.
                </p>
              </div>
            </li>

            {/* Step 5 */}
            <li
              id="step-5"
              className="scroll-mt-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                  5
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Use Google Search Console URL Inspection
                </h3>
              </div>
              <div className="pl-10 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Once you deploy updated title tags and on-page headings, navigate to <strong>Google Search Console &gt; URL Inspection</strong> and click <strong>&apos;Request Indexing&apos;</strong>.
                </p>
                <p>
                  Monitor search impressions and click-through rates in the Performance report over the next 7–14 days to verify snippet stability.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-8" />

        {/* 6. Common Pitfalls & Gotchas */}
        <section className="space-y-4">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-base">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <span>Common Pitfalls &amp; Gotchas to Avoid</span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200/90 pl-5 list-disc leading-relaxed">
              <li>
                <strong>Counting characters instead of pixels:</strong> 60 capital &apos;W&apos;s exceed 1,000px, whereas 60 lower-case &apos;i&apos;s are only 240px. Always measure Arial font pixel widths.
              </li>
              <li>
                <strong>Stacking pipe separators:</strong> Writing &quot;Keyword 1 | Keyword 2 | Keyword 3 | Brand&quot; guarantees Google will strip everything except the first token or the brand.
              </li>
              <li>
                <strong>Sitewide generic titles:</strong> Using &quot;Home&quot;, &quot;Services&quot;, or &quot;Products&quot; without specific distinguishing keywords triggers 100% automated substitution by Google.
              </li>
              <li>
                <strong>Unchecked CMS liquid templates:</strong> Allowing Shopify or WooCommerce templates to append duplicate brand names to custom meta fields.
              </li>
            </ul>
          </div>
        </section>

        {/* 7. Structured FAQ Section (Rendered HTML + Schema) */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            <details
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40"
              open
            >
              <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                <span>Can you use a robots meta tag to stop Google from rewriting titles?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                No direct robots directive or HTTP header exists that allows webmasters to force Google into rendering the exact HTML <code className="font-mono text-xs">&lt;title&gt;</code> tag. Directives such as <code className="font-mono text-xs">nosnippet</code> and <code className="font-mono text-xs">max-snippet</code> only govern meta descriptions and text snippet snippet lengths—they do not control Google&apos;s title generation algorithms.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40">
              <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                <span>Does Google rewriting your title hurt your rankings?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                The algorithmic rewrite itself does not directly decrease your page&apos;s organic search ranking position, as ranking calculations evaluate the full HTML document and topical relevance. However, an abrupt, inaccurate, or truncated rewrite often degrades the snippet&apos;s emotional appeal and clarity, drastically lowering organic click-through rates (CTR) and overall search traffic.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40">
              <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                <span>Why does Google show my site name before my page title?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                Google utilizes dedicated Site Name elements in modern SERPs (prominently on mobile devices). This site name is derived from your root domain&apos;s <code className="font-mono text-xs">WebSite</code> structured data schema (<code className="font-mono text-xs">schema.org/WebSite</code>), Open Graph <code className="font-mono text-xs">og:site_name</code> tags, and brand mentions. If this schema is missing, Google algorithmically guesses your brand name.
              </p>
            </details>
          </div>
        </section>

        {/* 8. Cross-Platform Navigation Matrix */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Explore SERP Simulators &amp; CMS Presets
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/tools/google-serp-simulator"
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              Universal SERP Simulator
            </Link>
            <Link
              href="/tools/google-serp-simulator/shopify"
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              Shopify SERP Simulator
            </Link>
            <Link
              href="/tools/google-serp-simulator/wordpress"
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              WordPress SERP Simulator
            </Link>
            <Link
              href="/tools/google-serp-simulator/squarespace"
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              Squarespace SERP Simulator
            </Link>
          </div>
        </section>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-10" />
      </main>
    </div>
  );
}
