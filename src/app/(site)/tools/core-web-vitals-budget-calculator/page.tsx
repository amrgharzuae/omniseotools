import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Activity,
  Gauge,
  Wifi,
  Smartphone,
  Server,
  Layers,
  FileCode,
  Image as ImageIcon,
  Type,
  Code2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Globe,
  Sliders,
  HelpCircle,
  Table,
  BookOpen,
} from "lucide-react";
import { coreWebVitalsBudgetCalculatorTool } from "@/config/tools/technical/core-web-vitals-budget-calculator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { CoreWebVitalsBudgetCalculator } from "@/components/tools/core-web-vitals-budget-calculator/CoreWebVitalsBudgetCalculator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";

const CANONICAL_URL = "https://omniseotools.com/tools/core-web-vitals-budget-calculator";

export const metadata: Metadata = {
  title: coreWebVitalsBudgetCalculatorTool.title,
  description: coreWebVitalsBudgetCalculatorTool.metaDescription,
  keywords: coreWebVitalsBudgetCalculatorTool.keywords,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: coreWebVitalsBudgetCalculatorTool.title,
    description: coreWebVitalsBudgetCalculatorTool.metaDescription,
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: coreWebVitalsBudgetCalculatorTool.title,
    description: coreWebVitalsBudgetCalculatorTool.metaDescription,
  },
};

export default function CoreWebVitalsBudgetCalculatorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: coreWebVitalsBudgetCalculatorTool.name,
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description: coreWebVitalsBudgetCalculatorTool.metaDescription,
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEO Tools",
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
            name: "CWV Budget Calculator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Calculate Core Web Vitals Performance Budgets & Generate Resource Hints",
        description:
          "Step-by-step protocol for calculating byte budgets, estimating LCP and INP on mobile connections, and generating optimal resource hints.",
        step: (coreWebVitalsBudgetCalculatorTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (coreWebVitalsBudgetCalculatorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={coreWebVitalsBudgetCalculatorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Cross-Linking Bridge Card */}
        <section className="mb-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Complementary Core Web Vitals &amp; Technical SEO Utilities
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Generate manual resource hints, audit canonical redirect loops, or block bandwidth-draining AI scrapers.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/resource-hint-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Resource Hint Builder</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/ai-crawler-firewall"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>AI Crawler Firewall</span>
              </Link>
              <Link
                href="/tools/canonical-redirect-auditor"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Canonical Auditor</span>
              </Link>
              <Link
                href="/recipes/how-to-fix-discovered-currently-not-indexed"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Crawl Budget Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget */}
        <section
          className="mt-2"
          aria-label="Interactive Core Web Vitals Budget and Resource Hint Calculator"
        >
          <ToolErrorBoundary
            toolSlug={coreWebVitalsBudgetCalculatorTool.slug}
            toolName={coreWebVitalsBudgetCalculatorTool.name}
          >
            <CoreWebVitalsBudgetCalculator
              toolSlug={coreWebVitalsBudgetCalculatorTool.slug}
              toolName={coreWebVitalsBudgetCalculatorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Deep Dive Documentation */}
        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 dark:from-indigo-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                Direct Answer: How TCP Slow-Start, Network Latency, and JavaScript Define CWV
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              Google&apos;s Core Web Vitals benchmarks (Largest Contentful Paint &le; 2.5s and Interaction to Next Paint &le; 200ms) are physical constraints governed by mobile network latency and CPU architecture. On an average 4G mobile connection (170ms Round-Trip Time), TCP slow-start requires multiple round trips to expand its congestion window from the initial 14 KB (<code>initcwnd</code>) to deliver HTML and CSS. Simultaneously, every 100 KB of uncompressed JavaScript incurs ~120ms of main-thread execution on mid-tier mobile processors. Maintaining an initial critical path budget (&le;30 KB HTML, &le;45 KB CSS, &le;150 KB JS, &le;120 KB Hero Image) guarantees that 75%+ of mobile users pass Google Chrome UX Report (CrUX) assessments.
            </p>
          </div>

          {/* 2. Comparison Table: Preload vs Preconnect vs Fetchpriority */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Resource Hint Comparison: Preload vs. Preconnect vs. Fetchpriority
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Architectural distinctions, browser execution stages, and bandwidth contention risks
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-800 dark:text-slate-200">
                    <th className="p-3.5">Directive</th>
                    <th className="p-3.5">Browser Action</th>
                    <th className="p-3.5">Primary Use Case</th>
                    <th className="p-3.5">Risk / Pitfall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      fetchpriority=&quot;high&quot;
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">
                      Raises fetch priority queue of an in-HTML element
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                      Above-the-fold hero image (<code>&lt;img&gt;</code>)
                    </td>
                    <td className="p-3.5 text-amber-600 dark:text-amber-400">
                      Deprioritizes critical render-blocking CSS if overused across multiple images
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      &lt;link rel=&quot;preload&quot;&gt;
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">
                      Forces early network request before HTML parser discovery
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                      Late-discovered fonts (<code>.woff2</code>) or CSS background images
                    </td>
                    <td className="p-3.5 text-rose-600 dark:text-rose-400">
                      Bandwidth contention; duplicate font download if <code>crossorigin</code> is missing
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      &lt;link rel=&quot;preconnect&quot;&gt;
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">
                      Executes early DNS + TCP + TLS handshake with external origin
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                      Critical third-party CDNs (Google Fonts, media host)
                    </td>
                    <td className="p-3.5 text-amber-600 dark:text-amber-400">
                      Consumes browser socket pool if declared for more than 2-3 origins
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-slate-600 dark:text-slate-400">
                      fetchpriority=&quot;low&quot;
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">
                      Deprioritizes secondary resource requests in network queue
                    </td>
                    <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                      Below-the-fold images, marketing carousels, analytics scripts
                    </td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400">
                      Minimal risk; safe for non-critical assets
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Comprehensive Educational Guide */}
          <ToolGuide tool={coreWebVitalsBudgetCalculatorTool} />

          {/* 4. Platform-Specific Optimization FAQ */}
          <ToolFAQ tool={coreWebVitalsBudgetCalculatorTool} />

          {/* 5. Related Tools Section */}
          <div className="pt-6">
            <RelatedTools currentTool={coreWebVitalsBudgetCalculatorTool} />
          </div>

        </article>
      </main>
    </div>
  );
}
