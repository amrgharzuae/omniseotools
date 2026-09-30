import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileCode,
  Sparkles,
  Layers,
  Table,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Tag,
  Code2,
  CheckCircle2,
  Search,
  ExternalLink,
  Zap,
  Check,
  Info,
  ListOrdered,
  Store,
  BookOpen,
  Layout,
  FileSpreadsheet,
  Link2,
  FileCheck2,
} from "lucide-react";
import {
  XML_SITEMAP_PLATFORMS,
  getXmlSitemapPlatformBySlug,
  getAllXmlSitemapPlatforms,
} from "@/config/xml-sitemap-platforms";
import { xmlSitemapGeneratorTool } from "@/config/tools/technical/xml-sitemap-generator";
import { XmlSitemapGenerator } from "@/components/tools/technical/XmlSitemapGenerator";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";

interface PlatformPageProps {
  params: Promise<{
    platform: string;
  }>;
}

export async function generateStaticParams() {
  return XML_SITEMAP_PLATFORMS.map((p) => ({
    platform: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getXmlSitemapPlatformBySlug(slug);

  if (!platform) {
    return {
      title: "CMS Platform Not Found | OmniSEO Tools",
    };
  }

  const canonicalUrl = `https://omniseotools.com/tools/xml-sitemap-generator/${platform.slug}`;

  return {
    title: platform.title,
    description: platform.metaDescription,
    keywords: [
      `${platform.shortName.toLowerCase()} xml sitemap validator`,
      `${platform.shortName.toLowerCase()} sitemap generator`,
      `${platform.shortName.toLowerCase()} sitemap index`,
      `${platform.shortName.toLowerCase()} sitemap.xml error`,
      `${platform.shortName.toLowerCase()} google search console sitemap`,
      "xml sitemap generator",
      "xml sitemap validator",
      "sitemap linter",
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

export default async function XmlSitemapPlatformPage({
  params,
}: PlatformPageProps) {
  const { platform: slug } = await params;
  const platform = getXmlSitemapPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const canonicalUrl = `https://omniseotools.com/tools/xml-sitemap-generator/${platform.slug}`;
  const allPlatforms = getAllXmlSitemapPlatforms();

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: platform.h1,
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
            name: "XML Sitemap Generator & Validator",
            item: "https://omniseotools.com/tools/xml-sitemap-generator",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: platform.shortName,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: `How to Configure & Audit ${platform.shortName} XML Sitemaps`,
        description: `Step-by-step guide to implement clean, Google-compliant XML sitemaps and resolve indexation errors in ${platform.name}.`,
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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Structured Data (JSON-LD Graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Trail */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap"
          >
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/tools" className="hover:text-indigo-600 transition-colors">
              Tools
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link
              href="/tools/xml-sitemap-generator"
              className="hover:text-indigo-600 transition-colors"
            >
              XML Sitemap Generator &amp; Validator
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-white">
              {platform.shortName}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 shadow-sm">
                  <FileCode className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {platform.h1}
                    </h1>
                    <span className="hidden sm:inline-flex rounded-md bg-indigo-100 dark:bg-indigo-950/80 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                      {platform.cmsName}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {platform.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Switch Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 self-start md:self-auto">
              <span className="text-[11px] font-semibold text-slate-400 px-2">Preset:</span>
              {allPlatforms.map((p) => {
                const isActive = p.slug === platform.slug;
                return (
                  <Link
                    key={p.slug}
                    href={`/tools/xml-sitemap-generator/${p.slug}`}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {p.shortName}
                  </Link>
                );
              })}
              <Link
                href="/tools/xml-sitemap-generator"
                className="px-2.5 py-1 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Universal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Technical SEO Ecosystem Bridge Card */}
        <section className="mb-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Resolve Google Search Console Crawl &amp; Indexing Issues for {platform.shortName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Audit crawler permissions, verify canonical tags, and troubleshoot indexation drops.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/robots-txt-generator-validator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Robots.txt Validator</span>
                <ArrowRight className="h-3 w-3" />
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
                <span>Fix "Discovered – Not Indexed"</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget Initialized with Platform Defaults */}
        <section
          className="mt-2"
          aria-label={`${platform.name} XML Sitemap Generator & Validator`}
        >
          <ToolErrorBoundary
            toolSlug={`xml-sitemap-generator-${platform.slug}`}
            toolName={`${platform.name} Sitemap Generator`}
          >
            <XmlSitemapGenerator
              toolSlug={`xml-sitemap-generator/${platform.slug}`}
              toolName={`${platform.name} Sitemap Generator`}
              platform={platform}
              platformName={platform.shortName}
              initialUrls={platform.presetUrls}
              initialXml={platform.presetXml}
              initialMode={platform.defaultMode || "generator"}
              initialTab={platform.defaultTab || "xml"}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Platform-Specific Educational Content & Guide */}
        <article className="mt-12 space-y-12 text-slate-700 dark:text-slate-300">
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 dark:from-indigo-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
                Direct Answer: {platform.name} Sitemap Architecture &amp; Failure Modes
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              {platform.directAnswer}
            </p>
          </div>

          {/* 2. Core Educational Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {platform.coreH2}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Technical deep dive into {platform.name} sitemap quirks, sub-sitemap splitting, and crawl waste elimination
                </p>
              </div>
            </div>

            <div
              className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: platform.educationalContent }}
            />

            {/* Dynamic Code Snippet */}
            {platform.dynamicSnippet && (
              <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 space-y-3 text-slate-100 font-mono text-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-semibold text-emerald-400">
                    {platform.slug === "nextjs"
                      ? "app/sitemap.ts (TypeScript Example)"
                      : platform.slug === "wordpress"
                      ? "functions.php (WordPress Disable Filter)"
                      : "templates/robots.txt.liquid (Shopify Sub-Sitemap Safeguards)"}
                  </span>
                  <span>{platform.cmsName}</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre leading-relaxed text-slate-200">
                  {platform.dynamicSnippet}
                </pre>
              </div>
            )}
          </section>

          {/* 3. Actionable How-To Steps */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <ListOrdered className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  How to Configure &amp; Validate {platform.shortName} Sitemaps (Step-by-Step)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Five proven engineering steps to deploy error-free XML sitemaps in {platform.name}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              <ol className="list-decimal space-y-3.5 pl-0">
                {platform.howToSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="list-none flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm">
                      {idx + 1}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
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

          {/* 4. Platform FAQs */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {platform.shortName} XML Sitemap FAQ
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Troubleshooting Google Search Console validation errors, 50k limits, and platform configuration
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {platform.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 transition-all open:ring-1 open:ring-indigo-500/20"
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

          {/* 5. Cross-Platform Navigation Matrix */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Layout className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  CMS &amp; Framework XML Sitemap Generators
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch presets to inspect, debug, and generate XML sitemaps for your specific tech stack
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {allPlatforms.map((p) => {
                const isCurrent = p.slug === platform.slug;
                return (
                  <Link
                    key={p.slug}
                    href={`/tools/xml-sitemap-generator/${p.slug}`}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {p.name}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {p.metaDescription}
                    </p>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
              Looking for generic XML sitemap generation? Use the{" "}
              <Link
                href="/tools/xml-sitemap-generator"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Universal XML Sitemap Generator &amp; Validator
              </Link>
              .
            </div>
          </section>
        </article>

        {/* Related Tools Internal Linking Mesh */}
        <div className="mt-12">
          <RelatedTools currentTool={xmlSitemapGeneratorTool} />
        </div>

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
