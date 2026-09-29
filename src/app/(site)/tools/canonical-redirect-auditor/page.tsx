import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Link2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Search,
  Code2,
  Zap,
  Info,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Table,
  CheckSquare,
  FileCode,
  Globe,
  SlidersHorizontal,
  Server,
} from "lucide-react";
import { canonicalRedirectAuditorTool } from "@/config/tools/technical/canonical-redirect-auditor";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { CanonicalRedirectAuditor } from "@/components/tools/canonical-redirect-auditor/CanonicalRedirectAuditor";

const CANONICAL_URL = "https://omniseotools.com/tools/canonical-redirect-auditor";

export const metadata: Metadata = {
  title: "Canonical URL & Redirect Loop Auditor | Technical SEO Inspector",
  description:
    "Audit canonical URL consistency, resolve trailing slash 308 redirect loops, strip query parameter bloat, and generate clean canonical meta tags client-side with zero tracking.",
  keywords: [
    "canonical url auditor",
    "canonical redirect loop",
    "trailing slash 308 redirect",
    "canonical url normalizer",
    "canonical tag checker",
    "utm query parameter bloat",
    "canonical duplicate content",
    "nextjs trailing slash redirect",
    "nginx trailing slash rewrite",
    "apache canonical rewrite",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Canonical URL & Redirect Loop Auditor | Technical SEO Inspector",
    description:
      "Audit canonical URL consistency, resolve trailing slash 308 redirect loops, strip query parameter bloat, and generate clean canonical meta tags client-side with zero tracking.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canonical URL & Redirect Loop Auditor | Technical SEO Inspector",
    description:
      "Audit canonical URL consistency, resolve trailing slash 308 redirect loops, strip query parameter bloat, and generate clean canonical meta tags client-side with zero tracking.",
  },
};

export default function CanonicalRedirectAuditorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Canonical URL & Redirect Loop Auditor",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Audit canonical URL consistency, resolve trailing slash 308 redirect loops, strip query parameter bloat, and generate clean canonical meta tags client-side with zero tracking.",
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
            name: "Technical SEO",
            item: "https://omniseotools.com/#category-technical",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Canonical URL & Redirect Loop Auditor",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Audit Canonical URLs and Fix Redirect Loops",
        description:
          "Step-by-step instructions to analyze URL casing, resolve trailing slash 308 redirects, strip tracking parameters, and export clean canonical declarations.",
        step: (canonicalRedirectAuditorTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (canonicalRedirectAuditorTool.faqs || []).map((faq) => ({
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
      {/* Structured Data (JSON-LD Graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Breadcrumb & Hero Header */}
      <ToolHeader tool={canonicalRedirectAuditorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section
          className="mt-4"
          aria-label="Interactive Canonical URL and Redirect Loop Auditor"
        >
          <ToolErrorBoundary
            toolSlug={canonicalRedirectAuditorTool.slug}
            toolName={canonicalRedirectAuditorTool.name}
          >
            <CanonicalRedirectAuditor
              toolSlug={canonicalRedirectAuditorTool.slug}
              toolName={canonicalRedirectAuditorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* ========================================================================= */}
        {/* 3. INTERNAL ECOSYSTEM CROSS-LINKING MATRIX                                */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900/60 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Complementary Technical SEO Utilities:
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Enhance your site architecture with our suite of server routing and metadata utilities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            <Link
              href="/tools/canonical-tag-generator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5 text-indigo-500" />
                  Canonical Tag Generator
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Generate rel=&quot;canonical&quot; tags for HTML headers and HTTP response headers.
              </p>
            </Link>

            <Link
              href="/tools/redirect-rule-generator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5 text-emerald-500" />
                  Redirect Rule &amp; Regex Mapper
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Generate Nginx rewrite, Apache .htaccess 301, and Cloudflare redirect rules.
              </p>
            </Link>

            <Link
              href="/tools/google-serp-simulator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-blue-500" />
                  Google SERP Simulator
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Preview exact mobile and desktop snippet layouts with canonical breadcrumbs.
              </p>
            </Link>

            <Link
              href="/tools/schema-validator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                  JSON-LD Schema Validator
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Lint structured data client-side and verify Google rich snippet compliance.
              </p>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CRAWLABLE AI-OPTIMIZED GUIDE SECTION                                   */}
        {/* ========================================================================= */}
        <article className="mt-12 space-y-12 text-slate-700 dark:text-slate-300">
          {/* Direct Answer Callout Box */}
          <section className="rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent p-6 sm:p-7 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white shadow-xs">
                <Zap className="h-4 w-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Direct Answer: What Is a Canonical URL &amp; Why Do Redirect Loops Occur?
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              A <strong>canonical URL</strong> (declared via <code>&lt;link rel=&quot;canonical&quot; href=&quot;...&quot; /&gt;</code>) is an HTML link element that indicates the master authoritative version of a webpage to search engines like Google and Bing. When web servers (such as Next.js, WordPress, or Nginx) enforce a trailing slash policy (e.g. automatically redirecting <code>/blog/seo-guide/</code> to <code>/blog/seo-guide</code> via HTTP 308) while the HTML canonical tag specifies the opposite slash convention, search engine crawlers enter an infinite redirect loop or experience indexation cannibalization in Google Search Console.
            </p>
          </section>

          {/* Table: Common Canonical URL Pitfalls */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Table className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Common Canonical URL Pitfalls &amp; Search Engine Impact
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Understand the technical consequences of mismatched canonical tags and how to configure edge server routing to resolve them:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Issue</th>
                    <th className="py-3.5 px-4">Search Engine Impact</th>
                    <th className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400">
                      Recommended Resolution
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">
                      Trailing Slash Discrepancy
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      Creates 2 distinct URLs; splits PageRank and triggers Next.js 308 loops
                    </td>
                    <td className="py-3.5 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                      Enforce uniform trailing slash convention at edge
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">
                      Marketing Query Strings
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      GSC indexation bloat (<code>?utm_source</code>, <code>fbclid</code>)
                    </td>
                    <td className="py-3.5 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                      Strip non-content parameters in canonical tag
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">
                      Upper / Lower Case URLs
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      Linux servers treat <code>/Blog</code> and <code>/blog</code> as separate files
                    </td>
                    <td className="py-3.5 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                      Force lowercase rewriting in routing middleware
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">
                      Non-HTTPS Canonical
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      Mixed content warning; loss of secure protocol ranking signal
                    </td>
                    <td className="py-3.5 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                      Force strict HTTPS scheme in canonical declarations
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Technical Deep Dive: Trailing Slashes & Next.js */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                How Modern Web Frameworks Handle Trailing Slashes
              </h2>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                In the early days of the web, trailing slashes indicated a filesystem directory containing an <code>index.html</code> file, while paths without trailing slashes denoted individual files (e.g. <code>about.html</code>). In modern single-page applications (SPAs) and server-rendered frameworks like Next.js, Remix, and SvelteKit, all routing is handled programmatically in memory.
              </p>
              <p>
                Key technical behaviors to keep in mind when establishing your routing architecture:
              </p>
              <ul>
                <li>
                  <strong>Next.js App Router:</strong> By default, Next.js sets <code>trailingSlash: false</code>. If a crawler requests <code>https://example.com/guide/</code>, Next.js issues an HTTP <code>308 Permanent Redirect</code> to <code>https://example.com/guide</code>. If your canonical tag declares <code>https://example.com/guide/</code>, the crawler will loop between following the canonical and following the 308 redirect.
                </li>
                <li>
                  <strong>WordPress &amp; Traditional CMS:</strong> WordPress sets <code>/%postname%/</code> by default, enforcing trailing slashes. All non-slashed requests receive a 301 redirect to the slashed variant.
                </li>
                <li>
                  <strong>Googlebot Canonical Consensus:</strong> If Googlebot detects conflicting signals (e.g., canonical tag points to URL A, but sitemap and internal links point to URL B), it ignores the canonical tag entirely and selects its own indexed URL.
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ Accordions Section */}
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
                  Understanding canonical tag best practices, 308 redirect loops, and server configurations
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {canonicalRedirectAuditorTool.faqs?.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-indigo-500/20"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </article>

        {/* Related Tools Internal Linking Mesh */}
        <div className="mt-12">
          <RelatedTools currentTool={canonicalRedirectAuditorTool} />
        </div>

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
