import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Clock,
  Calendar,
  ShieldCheck,
  Zap,
  Layers,
  FileCode,
  Check,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Code2,
  Search,
  CheckSquare,
  Copy,
  Table,
  Server,
  BookOpen,
  Terminal,
  Globe,
  Link2,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { RecipeSolutionViewer } from "@/components/recipes/RecipeSolutionViewer";

const CANONICAL_URL = "https://omniseotools.com/recipes/how-to-fix-discovered-currently-not-indexed";

export const metadata: Metadata = {
  title: "How to Fix 'Discovered – Currently Not Indexed' in GSC | OmniSEO Tools",
  description:
    "Step-by-step diagnostic guide to resolving Google Search Console's 'Discovered – currently not indexed' status. Fix crawl budget bottlenecks, internal link deficits, and server host overload.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "How to Fix 'Discovered – Currently Not Indexed' in GSC | OmniSEO Tools",
    description:
      "Step-by-step diagnostic guide to resolving Google Search Console's 'Discovered – currently not indexed' status. Fix crawl budget bottlenecks, internal link deficits, and server host overload.",
    url: CANONICAL_URL,
    type: "article",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Fix 'Discovered – Currently Not Indexed' in GSC | OmniSEO Tools",
    description:
      "Step-by-step diagnostic guide to resolving Google Search Console's 'Discovered – currently not indexed' status. Fix crawl budget bottlenecks, internal link deficits, and server host overload.",
  },
};

export default function FixDiscoveredCurrentlyNotIndexedPage() {
  const diagnosticSnippet = `# 1. Verify Clean HTTP 200 OK & Response Latency (TTFB)
curl -IL -w "HTTP Code: %{http_code} | TTFB: %{time_starttransfer}s\\n" \\
  https://example.com/blog/seo-guide/ -o /dev/null -s

# 2. Check Canonical Tag & Trailing Slash Consistency
curl -sL https://example.com/blog/seo-guide/ | grep -i 'rel="canonical"'
# Expected: <link rel="canonical" href="https://example.com/blog/seo-guide" />

# 3. Check robots.txt Crawl Permissions
curl -s https://example.com/robots.txt | grep -E 'Disallow:|Allow:'

# 4. GSC Re-crawl Verification Checklist:
# - URL is within 2-3 clicks from homepage
# - Contextual anchor link placed on high-traffic category hub
# - URL present in clean, validated XML sitemap
# - GSC URL Inspection -> 'Test Live URL' -> 'Request Indexing'`;

  // Structured Data Schema: TechArticle + HowTo + FAQPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How to Fix 'Discovered – Currently Not Indexed' in Google Search Console",
        description:
          "Step-by-step diagnostic guide to resolving Google Search Console's 'Discovered – currently not indexed' status. Fix crawl budget bottlenecks, internal link deficits, and server host overload.",
        url: CANONICAL_URL,
        datePublished: "2026-09-01T00:00:00+00:00",
        dateModified: "2026-09-29T00:00:00+00:00",
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
        name: "How to Fix 'Discovered – Currently Not Indexed' in Google Search Console",
        description:
          "A 5-step engineering protocol to diagnose internal link depth, audit server response headers, validate canonical consistency, cleanse XML sitemaps, and re-trigger priority indexing in Google Search Console.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Audit Internal Link Depth",
            text: "Verify the stalled URL is reachable within 2 to 3 clicks of the root domain. A page linked only via an XML sitemap without in-content links gets deprioritized in Google's crawl queue.",
            url: `${CANONICAL_URL}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Verify HTTP Headers & Response Code",
            text: "Confirm the endpoint returns a pristine 200 OK status code with low Time to First Byte (TTFB).",
            url: `${CANONICAL_URL}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Validate Canonical & Redirect Consistency",
            text: "Ensure the page has a self-referential canonical tag and does not land on trailing-slash redirects or parameter loops.",
            url: `${CANONICAL_URL}#step-3`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Cleanse XML Sitemap",
            text: "Verify the URL exists in a clean, submitted sitemap free of 404s, redirects, or noindexed routes.",
            url: `${CANONICAL_URL}#step-4`,
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Re-trigger Priority Fetch in GSC",
            text: "Use the GSC URL Inspection tool to 'Test Live URL', verify Googlebot can render the DOM without asset blocking, and click 'Request Indexing'.",
            url: `${CANONICAL_URL}#step-5`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long does it take for Google to crawl 'Discovered' pages?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It can vary from 48 hours to several weeks depending on domain authority, site crawl budget, and internal linking depth. High-authority domains with strong internal link hierarchies see URLs crawled within hours, whereas newly registered domains or orphan pages can remain queued indefinitely.",
            },
          },
          {
            "@type": "Question",
            name: "Does requesting indexing in GSC guarantee it will be crawled?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Requesting indexing in Google Search Console places the URL in a priority inspection queue, but Google's crawl scheduler still evaluates domain crawl budget, server response time, and internal PageRank before actually performing the crawl.",
            },
          },
          {
            "@type": "Question",
            name: "Will resubmitting my XML sitemap fix discovered status?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Resubmitting an XML sitemap merely informs Google that a sitemap was updated; it does not change Googlebot's internal crawl priority. To move URLs from discovered to indexed, you must add contextual internal links from high-authority pages and ensure optimal server performance.",
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
            name: "How to Fix 'Discovered – Currently Not Indexed'",
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
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/recipes" className="hover:text-indigo-600 font-medium transition-colors">
              Developer Recipes
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium truncate">
              Fix Discovered Currently Not Indexed
            </span>
          </nav>

          {/* Badges & Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
            <span className="rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
              <Search className="h-3 w-3" />
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
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Google Search Console Core Protocol
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            How to Fix &apos;Discovered – Currently Not Indexed&apos; in Google Search Console
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A systematic engineering protocol for diagnosing crawl queue delays, internal link starvation, and host load limitations.
          </p>
        </div>
      </section>

      {/* Main Recipe Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 space-y-12">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* ========================================================================= */}
        {/* A. DIRECT ANSWER BOX (Top Callout Container for AI Extraction)            */}
        {/* ========================================================================= */}
        <section
          id="direct-answer"
          className="rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent p-6 sm:p-7 shadow-xs space-y-3"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white shadow-xs">
              <Zap className="h-4 w-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Quick Answer
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            &apos;Discovered – currently not indexed&apos; means Googlebot found the URL (via your sitemap, an external link, or an internal page) and placed it in its crawl queue, but has not yet crawled or rendered it. This is primarily a crawl budget, site architecture, or server performance signal—not a content quality penalty. The page is not rejected; Google simply deprioritized crawling it due to low internal PageRank distribution, poor site architecture, or perceived host load constraints.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* E. RESPONSIVE CTA BRIDGE CARD                                             */}
        {/* ========================================================================= */}
        <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900/60 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Audit Your Technical SEO Health Client-Side
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Inspect canonical headers, validate sitemap cleanliness, and test robots.txt crawl rules with zero telemetry.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/tools/canonical-redirect-auditor"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
              >
                <span>Audit Canonical &amp; Redirects &rarr;</span>
              </Link>
              <Link
                href="/tools/robots-txt-generator-validator"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all"
              >
                <span>Check Robots.txt Directives</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* B. ROOT CAUSES MATRIX (Markdown / HTML Table)                             */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Table className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Root Causes Matrix: Why Googlebot Delays Crawling
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Diagnose the exact underlying bottleneck keeping your pages trapped in Google&apos;s discovery queue:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Root Cause</th>
                  <th className="py-3.5 px-4">Diagnostic Indicator</th>
                  <th className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400">Primary Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Low Internal PageRank
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Orphan page or &gt;3 clicks from homepage
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    Add contextual internal links from high-traffic pages
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Sitemap Bloat
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Submitting thin, paginated, or filtered URLs
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    Clean XML sitemap to contain only 200 OK canonicals
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Host Load &amp; Server Latency
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Server response time (TTFB) &gt; 800ms during crawls
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    Optimize edge caching and CDN asset delivery
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Parameter / Duplicate URL Discovery
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Googlebot finding faceted navigation links
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    Disallow parameter patterns in robots.txt
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Fresh Domain Sandbox
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    New site with minimal external authority signals
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    Build high-quality contextual backlinks and seed citations
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* C. READY-TO-COPY DIAGNOSTIC CODE SNIPPET                                  */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Diagnostic Verification CLI &amp; GSC Protocol
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Execute these diagnostic commands in your terminal to verify that your web server returns instant responses, pristine canonical tags, and unblocked robots.txt directives before requesting indexing:
          </p>

          <RecipeSolutionViewer
            solutionSnippet={diagnosticSnippet}
            snippetLanguage="bash"
            relatedToolSlug="canonical-redirect-auditor"
            relatedToolName="Canonical URL Auditor"
            relatedToolCta="Audit Canonical & Redirects in Tool #42"
          />
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-8" />

        {/* ========================================================================= */}
        {/* D. THE 5-STEP RESOLUTION PROTOCOL (<ol> for HowTo schema)                 */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <CheckSquare className="h-4 w-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The 5-Step Engineering Resolution Protocol
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Execute these 5 steps sequentially to elevate your URL priority and transition stalled pages from &apos;Discovered&apos; to indexed:
          </p>

          <ol className="space-y-6 list-none p-0">
            {/* Step 1 */}
            <li
              id="step-1"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono shrink-0">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Audit Internal Link Depth
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Verify the stalled URL is reachable within 2 to 3 clicks of the root domain. A page linked only via an XML sitemap without in-content links gets deprioritized in Google&apos;s crawl queue because Googlebot interprets lack of internal links as a signal of low site importance.
              </p>
              <div className="ml-10 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 p-3.5 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <strong>Actionable Fix:</strong> Add 2 to 3 descriptive, keyword-rich contextual anchor text links from your highest-traffic, indexed blog posts or category hub pages directly pointing to the stalled URL.
              </div>
            </li>

            {/* Step 2 */}
            <li
              id="step-2"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono shrink-0">
                  2
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Verify HTTP Headers &amp; Response Code
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Confirm the endpoint returns a pristine <code>HTTP 200 OK</code> status code with low Time to First Byte (TTFB &lt; 800ms). If Googlebot encounters intermittent 503 Service Unavailable, 504 Gateway Timeouts, or slow database responses when attempting to crawl, it automatically throttles its host crawl rate to protect your origin server.
              </p>
              <div className="ml-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-3.5 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-mono space-y-1">
                curl -IL https://example.com/target-page
                <br />
                <span className="text-emerald-600 dark:text-emerald-400">HTTP/2 200 | content-type: text/html; charset=utf-8</span>
              </div>
            </li>

            {/* Step 3 */}
            <li
              id="step-3"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono shrink-0">
                  3
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Validate Canonical &amp; Redirect Consistency
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Ensure the page has a self-referential canonical tag and does not land on trailing-slash redirects (e.g. Next.js 308 redirect loops between <code>/page/</code> and <code>/page</code>) or query parameter loops. Mismatched canonical tags cause Googlebot to pause crawl execution while it resolves duplicate candidates.
              </p>
              <div className="ml-10 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 p-3.5 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <strong>Pro Tip:</strong> Use our <Link href="/tools/canonical-redirect-auditor" className="underline font-bold">Canonical URL &amp; Redirect Auditor</Link> to inspect trailing slash policies and strip tracking query parameters client-side.
              </div>
            </li>

            {/* Step 4 */}
            <li
              id="step-4"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono shrink-0">
                  4
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Cleanse XML Sitemap
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Verify the URL exists in a clean, submitted XML sitemap free of 404 errors, 301 redirects, or noindexed routes. Sitemaps containing high ratios of broken or redirected URLs degrade Google&apos;s trust in your sitemap files, resulting in reduced crawl frequency across all listed URLs.
              </p>
            </li>

            {/* Step 5 */}
            <li
              id="step-5"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-600 text-white text-xs font-bold font-mono shrink-0">
                  5
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Re-trigger Priority Fetch in GSC
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Navigate to Google Search Console, paste the target URL into the top <strong>URL Inspection</strong> search bar, click <strong>&quot;Test Live URL&quot;</strong>, inspect the rendered screenshot to confirm all critical assets load without blocking, and finally click <strong>&quot;Request Indexing&quot;</strong>.
              </p>
              <div className="ml-10 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <strong>Result:</strong> Testing the live URL validates that Googlebot can fetch the DOM in real-time, instantly elevating the URL to Google&apos;s priority crawling queue.
              </div>
            </li>
          </ol>
        </section>

        {/* ========================================================================= */}
        {/* E. COMPARISON TABLE: Discovered vs Crawled                                */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Table className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Comparison: &apos;Discovered&apos; vs &apos;Crawled&apos; Currently Not Indexed
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Distinguishing between Google&apos;s two most common indexation exclusion statuses is critical for prioritizing your technical vs content SEO efforts:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Dimension</th>
                  <th className="py-3.5 px-4 text-amber-600 dark:text-amber-400">
                    Discovered – Currently Not Indexed
                  </th>
                  <th className="py-3.5 px-4 text-blue-600 dark:text-blue-400">
                    Crawled – Currently Not Indexed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Crawl Status
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Googlebot has NOT fetched the page yet
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Googlebot fetched and evaluated the page
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Primary Hurdle
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Crawl prioritization, crawl budget, internal linking
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Content quality, duplication, or thin utility
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Primary Fix
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    Improve internal links, sitemap hygiene, server speed
                  </td>
                  <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-medium">
                    Upgrade unique content depth, fix canonical tags
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* F. STRUCTURED FAQ SECTION (Rendered HTML + Schema)                        */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Understanding Google Search Console crawl queues, indexing delays, and sitemap mechanics
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <details
              className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-indigo-500/20"
              open
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>How long does it take for Google to crawl &apos;Discovered&apos; pages?</span>
                <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                It can vary from 48 hours to several weeks depending on domain authority, site crawl budget, and internal linking depth. High-authority domains with strong internal link hierarchies see URLs crawled within hours, whereas newly registered domains or orphan pages can remain queued indefinitely until internal PageRank is strengthened.
              </p>
            </details>

            <details
              className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-indigo-500/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>Does requesting indexing in GSC guarantee it will be crawled?</span>
                <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                No. Requesting indexing in Google Search Console places the URL in a priority inspection queue, but Google&apos;s crawl scheduler still evaluates domain crawl budget, server response time, and internal PageRank before actually performing the crawl.
              </p>
            </details>

            <details
              className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-indigo-500/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>Will resubmitting my XML sitemap fix discovered status?</span>
                <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                No. Resubmitting an XML sitemap merely informs Google that a sitemap was updated; it does not change Googlebot&apos;s internal crawl priority. To move URLs from discovered to indexed, you must add contextual internal links from high-authority pages and ensure optimal server performance.
              </p>
            </details>
          </div>
        </section>

        {/* Bottom Tool CTA Banner */}
        <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ready to Resolve Canonical &amp; Redirect Bottlenecks?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Audit URL hygiene, resolve 308 redirect loops, and strip tracking parameter bloat in our free client-side tool.
              </p>
            </div>
            <Link
              href="/tools/canonical-redirect-auditor"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all shrink-0"
            >
              <span>Open Canonical Auditor</span>
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
