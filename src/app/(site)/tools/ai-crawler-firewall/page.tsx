import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldAlert,
  Bot,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  FileCode,
  Link2,
} from "lucide-react";
import { aiCrawlerFirewallTool } from "@/config/tools/technical/ai-crawler-firewall";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { AiCrawlerFirewall } from "@/components/tools/ai-crawler-firewall/AiCrawlerFirewall";
import { AI_BOTS, type AiBotDefinition } from "@/config/ai-crawler-firewall-data";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/ai-crawler-firewall";

export const metadata: Metadata = {
  title: aiCrawlerFirewallTool.title || "AI Crawler Firewall & Scraper Blocker | OmniSEO Tools",
  description: aiCrawlerFirewallTool.metaDescription,
  keywords: aiCrawlerFirewallTool.keywords,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: aiCrawlerFirewallTool.title || "AI Crawler Firewall & Scraper Blocker | OmniSEO Tools",
    description: aiCrawlerFirewallTool.metaDescription,
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: aiCrawlerFirewallTool.title || "AI Crawler Firewall & Scraper Blocker | OmniSEO Tools",
    description: aiCrawlerFirewallTool.metaDescription,
  },
};

export default function AiCrawlerFirewallPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEO Tools AI Crawler Firewall & Scraper Blocker",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description: aiCrawlerFirewallTool.metaDescription,
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
            name: "AI Crawler Firewall",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Block Aggressive AI Crawlers & Scrapers at the Network Edge",
        description:
          "Step-by-step guide to generating and deploying Next.js Edge Middleware, Cloudflare WAF expressions, and server firewall rules to block AI scrapers.",
        step: (aiCrawlerFirewallTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (aiCrawlerFirewallTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={aiCrawlerFirewallTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Cross-Linking Bridge Card */}
        <section className="mb-6 rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Bot className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Complementary AI &amp; Crawler SEO Utilities
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Build structured LLM context files, configure robots exclusion directives, and fix crawler redirect loops.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/llms-txt-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>llms.txt Generator</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/robots-txt-generator-validator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Robots.txt Validator</span>
              </Link>
              <Link
                href="/tools/canonical-redirect-auditor"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Canonical Auditor</span>
              </Link>
              <Link
                href="/recipes/how-to-block-ai-crawlers-in-robots-txt"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Block AI Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget */}
        <section
          className="mt-2"
          aria-label="Interactive AI Crawler Firewall and Scraper Rule Generator"
        >
          <ToolErrorBoundary
            toolSlug={aiCrawlerFirewallTool.slug}
            toolName={aiCrawlerFirewallTool.name}
          >
            <AiCrawlerFirewall
              toolSlug={aiCrawlerFirewallTool.slug}
              toolName={aiCrawlerFirewallTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Deep Dive Documentation */}
        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50/50 via-white to-slate-50 dark:from-rose-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                Direct Answer: Why robots.txt Fails &amp; Why Edge Firewalls are Essential
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              The Robots Exclusion Protocol (<code>robots.txt</code>) is an advisory standard with zero technical enforcement. While compliant crawlers like Googlebot and OpenAI's GPTBot honor disallow directives, rogue scrapers, unthrottled harvesters (such as ByteDance's Bytespider), and academic bots frequently ignore robots.txt entirely. Implementing edge firewalls via Next.js Edge Middleware, Cloudflare WAF, or Nginx inspects the HTTP <code>User-Agent</code> header and returns an immediate <code>HTTP 403 Forbidden</code> in &lt;5ms before the request reaches your application server or executes database queries.
            </p>
          </div>

          {/* 2. Comparative Table of AI Crawler Signatures & Scraping Behavior */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  AI Crawler Signatures &amp; Scraping Behavior Matrix
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Technical breakdown of known AI training bots, search crawlers, and aggressive aggregators
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold text-slate-700 dark:text-slate-300">
                    <th className="p-3.5">Bot Name &amp; Token</th>
                    <th className="p-3.5">Operator</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Respects robots.txt?</th>
                    <th className="p-3.5">Primary Impact / Threat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {(Array.isArray(AI_BOTS) ? AI_BOTS : (Object.values(AI_BOTS || {}) as AiBotDefinition[])).map((bot: AiBotDefinition) => (
                    <tr
                      key={bot.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">
                        {bot.name}
                        <div className="text-[10px] text-slate-400 font-normal font-sans">
                          {bot.role}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                        {bot.operator}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            bot.category === "scrapers"
                              ? "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300"
                              : "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300"
                          }`}
                        >
                          {bot.category === "scrapers" ? "Scraper" : "AI Training"}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`font-semibold ${
                            bot.respectsRobotsTxt === "Yes"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {bot.respectsRobotsTxt}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        {bot.impact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </article>

        {/* Technical Guide Section */}
        <div className="mt-12">
          <ToolGuide tool={aiCrawlerFirewallTool} />
        </div>

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={aiCrawlerFirewallTool.name}
          category={aiCrawlerFirewallTool.category}
        />

        {/* FAQ Section */}
        <ToolFAQ tool={aiCrawlerFirewallTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={aiCrawlerFirewallTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
