import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Server,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  ShieldCheck,
  Zap,
  Cpu,
  ShoppingBag,
  Globe2,
  Palette,
  Layout,
  FileCode,
  BookOpen,
} from "lucide-react";
import { getAllPlatforms } from "@/config/platforms-registry";
import { siteConfig } from "@/config/site";
import { AdSlot } from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "All Supported Platforms & Frameworks - OmniSEO Tools",
  description:
    "Explore tailored SEO meta tag tools, Open Graph simulators, Twitter card previews, and copy-ready boilerplate code for Next.js, Shopify, WordPress, Webflow, Squarespace, Wix, Ghost, and Tailwind CSS.",
  keywords: [
    "seo platforms",
    "cms seo tools",
    "nextjs seo generator",
    "shopify meta tags",
    "wordpress open graph",
    "webflow seo settings",
    "squarespace social cards",
    "wix seo metadata",
    "ghost cms meta tags",
    "tailwind html seo boilerplate",
  ],
  alternates: {
    canonical: "https://omniseotools.com/platforms",
  },
  openGraph: {
    title: "All Supported Platforms & Frameworks - OmniSEO Tools",
    description:
      "Explore tailored SEO meta tag tools, Open Graph simulators, Twitter card previews, and copy-ready boilerplate code for all 8 supported web platforms.",
    url: "https://omniseotools.com/platforms",
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "All Supported Platforms & Frameworks - OmniSEO Tools",
    description:
      "Explore tailored SEO meta tag tools, Open Graph simulators, Twitter card previews, and copy-ready boilerplate code for all 8 supported web platforms.",
  },
};

const PLATFORM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  nextjs: Cpu,
  shopify: ShoppingBag,
  wordpress: Globe2,
  webflow: Palette,
  squarespace: Layout,
  wix: Server,
  ghost: BookOpen,
  tailwind: FileCode,
};

export default function PlatformsIndexPage() {
  const platforms = getAllPlatforms();
  const canonicalUrl = "https://omniseotools.com/platforms";

  // Structured Data (Schema.org CollectionPage & BreadcrumbList)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: "All Supported Platforms & Frameworks - OmniSEO Tools",
        description:
          "Directory of all supported web platforms, CMSs, and frameworks with dedicated SEO tools and metadata generators.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://omniseotools.com/#website",
          name: siteConfig.name,
          url: "https://omniseotools.com",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: platforms.map((platform, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${platform.name} SEO & Metadata Hub`,
            url: `https://omniseotools.com/platforms/${platform.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
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
            name: "Platforms",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-12 pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              Platforms
            </span>
          </nav>

          {/* Badge & Title */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Server className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Platform Integrations
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              8 Supported Ecosystems
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            All Supported Platforms &amp; Frameworks
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed mb-4 font-medium">
            Select your stack below to access framework-specific SEO tools, real-time social card previewers, and copy-ready boilerplate code configured for 2026 search and crawler standards.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Every platform hub includes dedicated guides, implementation best practices, FAQ documentation, and 20 interactive preview utilities tailored to your CMS or framework.
          </p>

          {/* Trust Micro-Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-slate-600 dark:text-slate-400 pt-5 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
              <ShieldCheck className="h-4 w-4" /> 100% Free &amp; Client-Side Private
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Tested Production Snippets
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" /> 2026 Engine Rules &amp; Limits
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Platforms Grid Section */}
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="h-4 w-4" />
                <span>Framework &amp; CMS Hubs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Choose Your Platform
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Click any card to launch the dedicated optimization hub and tools:
              </p>
            </div>
            <span className="text-xs font-medium text-slate-500 shrink-0">
              Showing 8 platform hubs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform) => {
              const IconComponent = PLATFORM_ICONS[platform.slug] || Server;

              return (
                <Link
                  key={platform.slug}
                  href={`/platforms/${platform.slug}`}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 p-7 shadow-sm hover:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-400/60 transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Icon + Badge + Category */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                          {platform.badge}
                        </span>
                        <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {platform.category}
                        </span>
                      </div>
                    </div>

                    {/* Platform Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                      {platform.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug mb-3">
                      {platform.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {platform.description}
                    </p>

                    {/* Snippet Language Indicator */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <Code2 className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{platform.snippetFilename}</span>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span className="group-hover:underline flex items-center gap-1.5">
                      Explore {platform.name} Hub &amp; Tools (10 Utilities)
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="mt-16 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/40 p-8 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Why Use Platform-Specific SEO Hubs?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Each framework and CMS handles head tags, image URLs, and dynamic metadata differently. We provide pre-tested syntax to save you hours of trial and error.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Copy-Paste Snippets
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Pre-configured Liquid, TypeScript, PHP, and HTML code blocks ready to drop into your templates.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Live Simulator Tools
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test Twitter large cards, Facebook Open Graph tags, Google SERP titles, and character counts with instant previews.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Setup Guides &amp; FAQs
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step instructions addressing common issues like social crawler cache purging and dynamic image binding.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
