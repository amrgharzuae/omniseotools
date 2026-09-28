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
  BarChart3,
  BookOpen,
} from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { RecipeSolutionViewer } from "@/components/recipes/RecipeSolutionViewer";

const CANONICAL_URL = "https://omniseotools.com/recipes/how-to-fix-keyword-stuffing-penalties";

export const metadata: Metadata = {
  title: "How to Detect & Fix Keyword Stuffing Penalties | OmniSEO Tools",
  description:
    "Learn how modern search engines detect keyword stuffing, how to calculate safe phrase frequency thresholds, and step-by-step methods to de-optimize over-stuffed content.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "How to Detect & Fix Keyword Stuffing Penalties | OmniSEO Tools",
    description:
      "Learn how modern search engines detect keyword stuffing, how to calculate safe phrase frequency thresholds, and step-by-step methods to de-optimize over-stuffed content.",
    url: CANONICAL_URL,
    type: "article",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Detect & Fix Keyword Stuffing Penalties | OmniSEO Tools",
    description:
      "Learn how modern search engines detect keyword stuffing, how to calculate safe phrase frequency thresholds, and step-by-step methods to de-optimize over-stuffed content.",
  },
};

export default function KeywordStuffingRecipePage() {
  // Structured Data Schema: TechArticle + HowTo + FAQPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How to Detect & Fix Keyword Stuffing Penalties",
        description:
          "Learn how modern search engines detect keyword stuffing, how to calculate safe phrase frequency thresholds, and step-by-step methods to de-optimize over-stuffed content.",
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
        name: "How to De-Optimize Over-Stuffed Content and Fix Algorithmic Penalties",
        description:
          "Four-step actionable workflow to audit multi-word n-gram density, map semantic entities, eliminate repetitive headings, and restore natural language balance.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Audit Multi-Word Phrase Frequencies",
            text: "Run text through an N-gram analyzer to spot repeated 2-word and 3-word patterns exceeding 2.0% density.",
            url: `${CANONICAL_URL}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Map Semantic Entities & Synonyms",
            text: "Replace repeated head terms with natural context variants, pronouns, and co-occurring entity vocabulary.",
            url: `${CANONICAL_URL}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Remove Redundant Header Tags",
            text: "Ensure H2 and H3 tags describe subtopics and user intent rather than mechanically repeating the target keyword.",
            url: `${CANONICAL_URL}#step-3`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Recalculate Word-to-Keyword Ratio",
            text: "Keep target phrase density under 2% of total word count and maintain lexical diversity above 40%.",
            url: `${CANONICAL_URL}#step-4`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the fastest way to fix a keyword stuffing penalty?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Perform an N-gram density audit to isolate phrases exceeding 2.5% density. Replace exact-match repetitions in body copy and subheadings with natural semantic synonyms, expand the surrounding contextual explanations, and request priority re-crawling in Google Search Console.",
            },
          },
          {
            "@type": "Question",
            name: "Does Google issue manual actions or algorithmic demotions for keyword stuffing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Google primarily handles keyword stuffing through automated algorithmic devaluations (such as Helpful Content and SpamBrain classifiers) rather than manual actions. This means fixing the over-optimization can restore organic impressions upon the next search engine crawl.",
            },
          },
          {
            "@type": "Question",
            name: "Can keyword stuffing occur in meta tags and image alt text?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Search engine crawlers evaluate meta titles, descriptions, anchor text, and image alt text as part of the overall page document. Stuffing focus terms across alt attributes and meta tags is a common trigger for algorithmic quality penalties.",
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
            name: "How to Fix Keyword Stuffing Penalties",
            item: CANONICAL_URL,
          },
        ],
      },
    ],
  };

  const solutionSnippet = `<!-- 1. OVER-OPTIMIZED (BEFORE: Penalized for Keyword Stuffing) -->
<!-- ❌ Target Bigram 'technical seo audit' repeated 6x in 120 words (~5.0% density) -->
<section>
  <h2>Best Technical SEO Audit Checklist</h2>
  <p>If you need a <strong>technical seo audit</strong>, our <strong>technical seo audit</strong> framework provides a full <strong>technical seo audit</strong> review. Conducting a regular <strong>technical seo audit</strong> will improve rankings. Contact our <strong>technical seo audit</strong> team for <strong>technical seo audit</strong> pricing.</p>
</section>

<!-- 2. SEMANTICALLY DE-OPTIMIZED (AFTER: Safe 1.5% Density + Rich Entity Mesh) -->
<!-- ✅ Focus Bigram appears 1-2x; enriched with co-occurring entities: crawl budget, canonical tags, indexation -->
<section>
  <h2>Comprehensive Site Health &amp; Architecture Audit</h2>
  <p>Conducting a regular <strong>technical SEO audit</strong> is essential to preserve crawlability and search visibility. During our diagnostic review, specialists inspect XML sitemaps, canonical tags, server latency, and HTTP response codes. Resolving redirect chains and fixing orphaned URLs ensures search engine bots allocate crawl budget efficiently.</p>
</section>`;

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
              Keyword Stuffing Penalty Guide
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
            How to Detect &amp; Fix Keyword Stuffing Penalties
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A complete guide to resolving over-optimization, recalculating n-gram phrase density, and writing for semantic relevance.
          </p>
        </div>
      </section>

      {/* Main Recipe Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 space-y-12">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* ========================================================================= */}
        {/* 1. DIRECT ANSWER BOX (Top Callout Container for AI Extraction)            */}
        {/* ========================================================================= */}
        <section
          id="direct-answer"
          className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6 sm:p-7 shadow-xs space-y-3"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white shadow-xs">
              <Zap className="h-4 w-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Quick Answer
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            Modern search engines do not rely on a fixed keyword density limit. Instead, algorithmic systems evaluate phrase repetition against natural language distributions. When a single word or 2-to-3 word n-gram exceeds 2.5% to 3% of the total body copy, or appears unnaturally in headers and alt tags, the page risks devaluation for keyword stuffing. The fix involves replacing exact-match repetitions with semantic synonyms, pruning redundant modifiers, and expanding explanatory context.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 2. RESPONSIVE CTA CARD                                                    */}
        {/* ========================================================================= */}
        <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900/60 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Audit Your Content Frequency Client-Side
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Analyze your single-word and n-gram phrase density instantly without sending text to an external server.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/tools/keyword-density-checker"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
              >
                <span>Open Keyword Density &amp; N-Gram Analyzer &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FOUR ACTIONABLE STEPS TO DE-OPTIMIZE OVER-STUFFED COPY                 */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <BarChart3 className="h-4 w-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4 Actionable Steps to De-Optimize Over-Stuffed Copy
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Follow this step-by-step editorial protocol to systematically eliminate over-optimization, recalculate N-gram densities, and align your content with Google&apos;s helpful content standards:
          </p>

          <ol className="space-y-6 list-none p-0">
            {/* Step 1 */}
            <li
              id="step-1"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Audit Multi-Word Phrase Frequencies
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Run text through an N-gram analyzer to spot repeated 2-word (bigram) and 3-word (trigram) patterns. While individual unigrams may register a normal 1.5% frequency, repeating exact-match sequences like <code>technical seo audit</code> across every section creates a concentrated spike (&gt;3.0%) that triggers automated spam classifiers.
              </p>
              <div className="ml-10 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 p-3.5 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <strong>Benchmark Rule:</strong> Keep 2-word phrases between 1.0% and 1.8% density, and 3-word phrases under 1.2%.
              </div>
            </li>

            {/* Step 2 */}
            <li
              id="step-2"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono">
                  2
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Map Semantic Entities &amp; Synonyms
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Replace redundant head terms with natural context variants, co-occurring technical vocabulary, and explanatory pronouns. Instead of repeating your primary search term 15 times, incorporate semantic entities (such as <em>canonical tag resolution</em>, <em>crawl budget optimization</em>, and <em>HTTP response latency</em>) that demonstrate true subject mastery to transformer-based search models.
              </p>
              <div className="ml-10 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <strong>Entity Enrichment:</strong> Google BERT and RankBrain reward diverse topical co-occurrences far more than exact keyword repetitions.
              </div>
            </li>

            {/* Step 3 */}
            <li
              id="step-3"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono">
                  3
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Remove Redundant Header Tags
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Ensure H2 and H3 tags describe subtopics and user intent rather than mechanically repeating the target keyword. If your H1 is &quot;Technical SEO Audit Checklist&quot;, subsequent H2 subheadings should be specific (e.g. &quot;Crawl Budget &amp; Sitemap Validation&quot;, &quot;Fixing Redirect Chains &amp; 404 Errors&quot;) rather than &quot;Technical SEO Audit for Sitemaps&quot; and &quot;Technical SEO Audit for Redirects&quot;.
              </p>
              <div className="ml-10 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 p-3.5 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <strong>Subheading Best Practice:</strong> Only mention the primary head keyword in one H2 heading across the entire page.
              </div>
            </li>

            {/* Step 4 */}
            <li
              id="step-4"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono">
                  4
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Recalculate Word-to-Keyword Ratio
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Keep target phrase density under 2% of total word count, and maintain a lexical diversity score above 40%. After rewriting, re-run the copy through the client-side analyzer to confirm that no unigrams exceed 2.5% and no bigrams exceed 1.8%.
              </p>
              <div className="ml-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-3.5 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <strong>GSC Re-Index:</strong> Once published, submit the revised URL in Google Search Console to request priority recrawling and clear stale algorithmic demotions.
              </div>
            </li>
          </ol>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-8" />

        {/* ========================================================================= */}
        {/* 4. BEFORE & AFTER CODE / COPY COMPARISON                                  */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Code2 className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Before vs. After: Editorial De-Optimization Example
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Inspect how over-stuffed copy is transformed into an entity-rich, authoritative document that satisfies both human readers and search algorithms:
          </p>

          <RecipeSolutionViewer
            solutionSnippet={solutionSnippet}
            snippetLanguage="html"
            relatedToolSlug="keyword-density-checker"
            relatedToolName="Keyword Density Checker & N-Gram Analyzer"
            relatedToolCta="Audit Your Copy in Tool #9"
          />
        </section>

        {/* ========================================================================= */}
        {/* 5. COMPARISON MATRIX: STUFFED VS OPTIMIZED COPY                          */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Layers className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Comparison: Keyword Stuffed vs. Semantically Optimized Content
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Evaluation Dimension</th>
                  <th className="py-3.5 px-4 text-rose-600 dark:text-rose-400">Over-Stuffed Content (High Risk)</th>
                  <th className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">Semantically Optimized (High Ranking)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Primary Keyword Density</td>
                  <td className="py-3.5 px-4 font-mono text-rose-600">&gt; 3.5% (Repeated 5+ times per 100 words)</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600">1.0% – 2.0% (Natural cadence)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Multi-Word N-Gram Frequency</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Identical 3-word queries repeated in every header</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Varied long-tail phrases and intent variations</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Topical Vocabulary &amp; Entities</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Narrow, repetitive vocabulary (Lexical diversity &lt;30%)</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Broad entity co-occurrences (Lexical diversity &gt;42%)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">User Reading Experience</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Robotic, repetitive, high bounce rates</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Engaging, informative, high dwell time</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Algorithmic Risk</td>
                  <td className="py-3.5 px-4 text-rose-600 font-semibold">Flagged by Helpful Content &amp; SpamBrain filters</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-semibold">Eligible for AI Overviews &amp; Top SERP positions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)                             */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Troubleshooting algorithmic demotions, recovery timelines, and density targets
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs mt-0.5">Q1.</span>
                <span>What is the fastest way to fix a keyword stuffing penalty?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                Perform an N-gram density audit to isolate phrases exceeding 2.5% density. Replace exact-match repetitions in body copy and subheadings with natural semantic synonyms, expand the surrounding contextual explanations, and request priority re-crawling in Google Search Console.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs mt-0.5">Q2.</span>
                <span>Does Google issue manual actions or algorithmic demotions for keyword stuffing?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                Google primarily handles keyword stuffing through automated algorithmic devaluations (such as Helpful Content and SpamBrain classifiers) rather than manual actions. This means fixing the over-optimization can restore organic impressions upon the next search engine crawl.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs mt-0.5">Q3.</span>
                <span>Can keyword stuffing occur in meta tags and image alt text?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                Yes. Search engine crawlers evaluate meta titles, descriptions, anchor text, and image alt text as part of the overall page document. Stuffing focus terms across alt attributes and meta tags is a common trigger for algorithmic quality penalties.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Tool CTA Banner */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ready to Audit Your Content?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Test your 1-word, 2-word, and 3-word phrase frequency percentages in real time.
              </p>
            </div>
            <Link
              href="/tools/keyword-density-checker"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all shrink-0"
            >
              <span>Audit Content Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
