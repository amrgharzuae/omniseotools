import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Server,
  Code2,
  ArrowRight,
  Share2,
  Eye,
  FileText,
  Layers,
  ShieldCheck,
  Terminal,
  Zap,
  BookOpen,
  Lightbulb,
  ExternalLink,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
  SlidersHorizontal,
  Globe,
  Lock,
  HelpCircle,
  Languages,
  Bot,
  FileCode,
} from "lucide-react";
import {
  PLATFORMS_REGISTRY,
  getAllPlatforms,
  getPlatformBySlug,
} from "@/config/platforms-registry";
import {
  TOOLS_REGISTRY,
  getAllProgrammaticTools,
  getToolsByCategory,
} from "@/config/tools-registry";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/schema-generator";
import { PlatformSwitcher } from "@/components/platform/PlatformSwitcher";
import { PlatformCodeBlock } from "@/components/platform/PlatformCodeBlock";
import { PlatformAffiliateSlot } from "@/components/platform/PlatformAffiliateSlot";
import { PlatformGuide } from "@/components/platform/PlatformGuide";
import { PlatformFAQ } from "@/components/platform/PlatformFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";
import { AdSlot } from "@/components/ads/AdSlot";

interface PlatformPageProps {
  params: Promise<{
    platformSlug: string;
  }>;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
  FileText,
  Code2,
  SlidersHorizontal,
  Globe,
  Languages,
  Bot,
  FileCode,
  Lock,
  Layers,
  HelpCircle,
  Sparkles,
};

export async function generateStaticParams() {
  const platforms = getAllPlatforms();
  return platforms.map((platform) => ({
    platformSlug: platform.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platformSlug } = await params;
  const platform = getPlatformBySlug(platformSlug);

  if (!platform) {
    return {};
  }

  const title = `${platform.name} SEO & Social Meta Tag Tools (Free 2026 Optimization Hub)`;
  const description = `Optimize ${platform.name} SEO meta tags, Open Graph cards, Twitter cards, and SERP snippets. Free live previews and copy-paste ${platform.name} code.`.slice(
    0,
    155
  );
  const canonicalUrl = `https://omniseotools.com/platforms/${platform.slug}`;

  return {
    title,
    description,
    keywords: [
      `${platform.name.toLowerCase()} seo`,
      `${platform.name.toLowerCase()} meta tags`,
      `${platform.name.toLowerCase()} open graph`,
      `${platform.name.toLowerCase()} twitter card preview`,
      `${platform.name.toLowerCase()} serp simulator`,
      `${platform.name.toLowerCase()} seo tools`,
      `${platform.name.toLowerCase()} code snippet`,
      `${platform.category.toLowerCase()}`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PlatformHubPage({ params }: PlatformPageProps) {
  const { platformSlug } = await params;
  const platform = getPlatformBySlug(platformSlug);

  if (!platform) {
    notFound();
  }

  const tools = getAllProgrammaticTools();
  const allPlatforms = getAllPlatforms();
  const canonicalUrl = `https://omniseotools.com/platforms/${platform.slug}`;

  // Structured Data (BreadcrumbList + FAQPage)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://omniseotools.com" },
    { name: "Platforms", url: "https://omniseotools.com/platforms" },
    { name: platform.name, url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(platform.defaultFaqs);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD Structured Data */}
      <JsonLd schema={[breadcrumbSchema, faqSchema]} />

      {/* Hero Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-10 pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link
              href="/platforms"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
            >
              Platforms
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              {platform.name}
            </span>
          </nav>

          {/* Heading and Platform Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Server className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              {platform.badge}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-300/50 dark:border-slate-700/50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              {platform.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              {tools.length} Dedicated Tools
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            {platform.name} SEO & Social Meta Tag Optimization Hub
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed mb-3 font-medium">
            {platform.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {platform.description}
          </p>

          {/* Trust Micro-Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
              <ShieldCheck className="h-4 w-4" /> 100% Free & Client-Side Private
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Copy-Ready {platform.name} Code
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" /> 2026 Social & SERP Specs
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* 1. Tools Grid Section */}
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="h-4 w-4" />
                <span>Programmatic Tool Permutations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {platform.name} SEO & Social Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Select any tool below to simulate previews, inspect metadata limits, and generate copyable {platform.name} code:
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500 shrink-0">
              Showing {tools.length} active utilities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {tools.map((tool) => {
              const IconComponent = ICON_MAP[tool.icon] || Sparkles;
              const programmaticUrl = `/tools/${tool.slug}/${platform.slug}`;

              return (
                <Link
                  key={tool.slug}
                  href={programmaticUrl}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-indigo-500/60 dark:hover:border-indigo-400/60 transition-all duration-200"
                >
                  <div>
                    {/* Top Row: Icon + Badge + Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        {tool.badge && (
                          <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                            {tool.badge}
                          </span>
                        )}
                        <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          {tool.category}
                        </span>
                      </div>
                    </div>

                    {/* Tool Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name} for {platform.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <span className="group-hover:underline flex items-center gap-1">
                      Launch {platform.name} Validator
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-12" />

        {/* Strategy 4: High-Intent Contextual Platform Affiliate / Resource Callout */}
        {platform.affiliateSlot && (
          <PlatformAffiliateSlot
            affiliate={platform.affiliateSlot}
            platformName={platform.name}
          />
        )}

        {/* 2. Code Snippet Section */}
        <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {platform.name} Official SEO & Metadata Boilerplate
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verified, copy-paste code snippet configured for {platform.name}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Snippet Card */}
            <div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                Add this pre-configured boilerplate to your {platform.name} setup to ensure full Open Graph, Twitter Card, and search crawler compatibility:
              </p>
              <PlatformCodeBlock
                code={platform.defaultSnippet}
                language={platform.snippetLanguage}
                filename={platform.snippetFilename}
                description={`Standard production-grade SEO and social preview snippet for ${platform.name}.`}
              />
            </div>

            {/* How It Works Subsection */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                How {platform.name} Processes Metadata
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {platform.howItWorks}
              </p>
            </div>

            {/* Setup Steps Grid */}
            {platform.setupSteps && platform.setupSteps.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  {platform.name} Setup Instructions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {platform.setupSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-600 text-[11px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {step.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices Box */}
            {platform.bestPractices && platform.bestPractices.length > 0 && (
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-3">
                  <Lightbulb className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{platform.name} SEO Best Practices</span>
                </div>
                <ul className="space-y-2 text-xs text-indigo-950 dark:text-indigo-200">
                  {platform.bestPractices.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* 3. Platform FAQ Accordion */}
        <PlatformFAQ
          platformName={platform.name}
          toolName="SEO & Metadata"
          faqs={platform.defaultFaqs}
        />

        {/* 4. Cross-Platform Navigation Linking Mesh */}
        <section className="mt-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Explore Other Platform Hubs
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Discover metadata tools and boilerplate code for modern web frameworks and CMSs
              </p>
            </div>
            <Link
              href="/platforms"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>All Hubs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {allPlatforms.map((p) => {
              const isCurrent = p.slug === platform.slug;
              return (
                <Link
                  key={p.slug}
                  href={`/platforms/${p.slug}`}
                  className={`flex flex-col p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold"
                      : "border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 font-medium"
                  }`}
                >
                  <span className="text-xs truncate">{p.name}</span>
                  <span className="text-[10px] text-slate-400 truncate mt-0.5">
                    {p.badge}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
