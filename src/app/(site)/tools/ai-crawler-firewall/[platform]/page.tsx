import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  Bot,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  FileCode,
  Terminal,
  Server,
  Zap,
  Layers,
  Code2,
  ExternalLink,
  HelpCircle,
  ListOrdered,
  BookOpen,
} from "lucide-react";
import {
  AI_CRAWLER_FIREWALL_PLATFORMS,
  getAiCrawlerPlatformBySlug,
  getAllAiCrawlerPlatforms,
} from "@/config/ai-crawler-firewall-platforms";
import { aiCrawlerFirewallTool } from "@/config/tools/technical/ai-crawler-firewall";
import { AI_BOTS, type AiBotDefinition } from "@/config/ai-crawler-firewall-data";
import { AiCrawlerFirewall } from "@/components/tools/ai-crawler-firewall/AiCrawlerFirewall";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";

interface PlatformPageProps {
  params: Promise<{
    platform: string;
  }>;
}

export async function generateStaticParams() {
  return AI_CRAWLER_FIREWALL_PLATFORMS.map((p) => ({
    platform: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getAiCrawlerPlatformBySlug(slug);

  if (!platform) {
    return {
      title: "Platform Not Found | OmniSEO Tools",
    };
  }

  const canonicalUrl = `https://omniseotools.com/tools/ai-crawler-firewall/${platform.slug}`;

  return {
    title: platform.title,
    description: platform.metaDescription,
    keywords: [
      `${platform.shortName.toLowerCase()} ai crawler firewall`,
      `${platform.shortName.toLowerCase()} block gptbot`,
      `${platform.shortName.toLowerCase()} block claudebot`,
      `${platform.shortName.toLowerCase()} block bytespider`,
      `${platform.shortName.toLowerCase()} block ccbot`,
      `${platform.shortName.toLowerCase()} ai bot blocker`,
      `${platform.shortName.toLowerCase()} waf rule ai scrapers`,
      "ai crawler firewall",
      "block llm training crawlers",
      "edge bot firewall",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: platform.title,
      description: platform.metaDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "OmniSEO Tools",
    },
    twitter: {
      card: "summary_large_image",
      title: platform.title,
      description: platform.metaDescription,
    },
  };
}

export default async function AiCrawlerFirewallPlatformPage({
  params,
}: PlatformPageProps) {
  const { platform: slug } = await params;
  const platform = getAiCrawlerPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const canonicalUrl = `https://omniseotools.com/tools/ai-crawler-firewall/${platform.slug}`;
  const allPlatforms = getAllAiCrawlerPlatforms();

  const safeBots: AiBotDefinition[] = Array.isArray(AI_BOTS)
    ? AI_BOTS
    : (Object.values(AI_BOTS || {}) as AiBotDefinition[]);

  // Structured Data (JSON-LD Graph)
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `${platform.name} AI Crawler Firewall & Scraper Rule Generator`,
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: canonicalUrl,
        description: platform.metaDescription,
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
            item: "https://omniseotools.com/tools/ai-crawler-firewall",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: platform.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: `How to Block AI Crawlers & Scrapers on ${platform.shortName}`,
        description: `Step-by-step guide to generating, configuring, and deploying zero-overhead AI scraper firewall rules on ${platform.name}.`,
        step: platform.howToSteps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: platform.faqs.map((faq) => ({
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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Platform Hero Header */}
      <header className="relative border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/60 pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto pb-1"
          >
            <Link href="/" className="hover:text-rose-600 transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link
              href="/#category-technical"
              className="hover:text-rose-600 transition-colors shrink-0"
            >
              Technical SEO
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link
              href="/tools/ai-crawler-firewall"
              className="hover:text-rose-600 transition-colors shrink-0"
            >
              AI Crawler Firewall
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
              {platform.shortName}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300/60 dark:border-rose-800/60 shadow-xs">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>{platform.shortName} Firewall Edition</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Zap className="h-3 w-3 text-amber-500" />
                  <span>Zero-Telemetry Edge Mode</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {platform.h1}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {platform.tagline}
              </p>
            </div>

            {/* Quick Badge */}
            <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0 min-w-[180px]">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-extrabold text-xs uppercase tracking-wider mb-1">
                <Bot className="h-4 w-4" />
                <span>Protected Bots</span>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                {safeBots.length}+
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-1">
                Training &amp; Scraper Signatures
              </div>
            </div>
          </div>

          {/* Cross-Platform Navigation Switcher Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Firewall Target Architecture:
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Link
                href="/tools/ai-crawler-firewall"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-400 hover:text-rose-600"
              >
                <span>Universal Multi-Rule</span>
              </Link>
              {allPlatforms.map((p) => {
                const isActive = p.slug === platform.slug;
                return (
                  <Link
                    key={p.slug}
                    href={`/tools/ai-crawler-firewall/${p.slug}`}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-rose-600 text-white shadow-sm ring-2 ring-rose-600/30"
                        : "bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-400 hover:text-rose-600"
                    }`}
                  >
                    <span>{p.shortName} Rules</span>
                    {isActive && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Platform Architecture Quirk Alert Callout Card */}
        <section className="mb-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {platform.shortName} Architectural Quirk &amp; Edge Optimization
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {platform.targetArchitectureQuirk}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget with Platform Preset */}
        <section
          className="mt-2"
          aria-label={`Interactive ${platform.name} AI Crawler Firewall Rule Generator`}
        >
          <ToolErrorBoundary
            toolSlug={aiCrawlerFirewallTool.slug}
            toolName={`${platform.shortName} AI Crawler Firewall`}
          >
            <AiCrawlerFirewall
              toolSlug={aiCrawlerFirewallTool.slug}
              toolName={aiCrawlerFirewallTool.name}
              initialTab={platform.activeTabDefault}
              platformSlug={platform.slug}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Platform Technical Documentation Guide */}
        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50/50 via-white to-slate-50 dark:from-rose-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                Direct Answer: Implementing AI Scraping Defense in {platform.name}
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              {platform.directAnswer}
            </p>
          </div>

          {/* 2. Platform Implementation Guide (<ol>) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <ListOrdered className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Step-by-Step {platform.shortName} Deployment Instructions
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Follow these step-by-step instructions to configure and deploy the generated rule
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
              <ol className="space-y-4 list-none pl-0">
                {platform.howToSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white font-bold text-xs">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {step.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 3. Deep Dive Educational Guide (Core H2) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {platform.coreH2}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  In-depth architectural analysis and high-performance mitigation strategies
                </p>
              </div>
            </div>

            <div
              className="prose prose-sm sm:prose dark:prose-invert max-w-none rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: platform.educationalContent }}
            />
          </section>

          {/* 4. AI Crawler Signatures Matrix Table */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Supported AI Bot &amp; Scraper Signatures
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Known LLM training bots and aggressive scrapers filtered by the {platform.shortName} rules
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-800 dark:text-slate-200">
                    <th className="p-3.5">Bot / Token</th>
                    <th className="p-3.5">Operator</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Robots.txt Respect?</th>
                    <th className="p-3.5">Primary Threat / Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {safeBots.map((bot) => (
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
                          {bot.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            bot.respectsRobotsTxt === "Yes"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {bot.respectsRobotsTxt === "Yes" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <AlertTriangle className="h-3.5 w-3.5" />
                          )}
                          <span>{bot.respectsRobotsTxt}</span>
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {bot.impact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Platform FAQ Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions ({platform.shortName} AI Defense)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Common questions regarding {platform.shortName} crawler rules, caching, and performance
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {platform.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Internal Link Bridge Callout Cards */}
          <section className="mt-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Complete Your Edge SEO &amp; Bot Defense Stack
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Explore our complementary technical SEO generators to audit indexation, structure machine-readable content, and prevent crawler redirect loops.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/tools/robots-txt-generator-validator"
                className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-rose-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit group-hover:bg-rose-50 dark:group-hover:bg-rose-950/60 group-hover:text-rose-600 transition-colors">
                    <FileCode className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                    Robots.txt Validator
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Lint RFC 9309 rules, test Googlebot access, and configure polite crawler disallow directives.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/tools/llms-txt-generator"
                className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-rose-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 w-fit">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                    llms.txt Generator
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Structure clean markdown context feeds for AI answer engines and authorized citation models.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/tools/xml-sitemap-generator"
                className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-rose-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit group-hover:bg-rose-50 dark:group-hover:bg-rose-950/60 group-hover:text-rose-600 transition-colors">
                    <Layers className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                    XML Sitemap Generator
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Generate RFC-compliant XML sitemaps, sitemap indexes, and audit Shopify/WordPress URLs.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/recipes/how-to-block-ai-crawlers-in-robots-txt"
                className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-rose-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit group-hover:bg-rose-50 dark:group-hover:bg-rose-950/60 group-hover:text-rose-600 transition-colors">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                    Block AI Guide Recipe
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Detailed tutorial on configuring GPTBot and CCBot disallow directives in robots.txt.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                  <span>Read Guide</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </section>

          {/* Related Tools */}
          <div className="pt-6">
            <RelatedTools currentTool={aiCrawlerFirewallTool} />
          </div>

        </article>
      </main>
    </div>
  );
}
