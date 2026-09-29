import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Share2,
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
  FileCode,
  Globe,
  ImageIcon,
} from "lucide-react";
import { openGraphPreviewTool } from "@/config/tools/social/open-graph-preview";
import { getAllOgValidatorPlatforms } from "@/config/open-graph-validator-platforms";
import { SocialPreviewer } from "@/components/tools/social/SocialPreviewer";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";

const CANONICAL_URL = "https://omniseotools.com/tools/open-graph-validator";

export const metadata: Metadata = {
  title: "Open Graph & Social Card Validator | Free Social Meta Debugger",
  description:
    "Preview, validate, and debug Open Graph (og:image, og:title) and Twitter Card meta tags client-side. Test 1200x630 aspect ratios across Twitter, LinkedIn, Facebook, and Discord.",
  keywords: [
    "open graph validator",
    "open graph preview",
    "social card validator",
    "twitter card previewer",
    "facebook link preview",
    "linkedin post inspector",
    "discord embed preview",
    "og image 1200x630",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Open Graph & Social Card Validator | Free Social Meta Debugger",
    description:
      "Preview, validate, and debug Open Graph (og:image, og:title) and Twitter Card meta tags client-side. Test 1200x630 aspect ratios across Twitter, LinkedIn, Facebook, and Discord.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Graph & Social Card Validator | Free Social Meta Debugger",
    description:
      "Preview, validate, and debug Open Graph (og:image, og:title) and Twitter Card meta tags client-side. Test 1200x630 aspect ratios across Twitter, LinkedIn, Facebook, and Discord.",
  },
};

export default function OpenGraphValidatorPage() {
  const allPlatforms = getAllOgValidatorPlatforms();

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEO Tools Open Graph & Social Card Validator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Preview, validate, and debug Open Graph and Twitter Card meta tags client-side. Test 1200x630 image dimensions with zero tracking.",
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
            name: "Social Media",
            item: "https://omniseotools.com/#category-social",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Open Graph & Social Card Validator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Validate and Test Open Graph Social Meta Tags",
        description:
          "Step-by-step instructions to preview and validate Open Graph image dimensions, social headlines, and multi-platform cards.",
        step: (openGraphPreviewTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (openGraphPreviewTool.faqs || []).map((faq) => ({
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
            <span className="font-semibold text-slate-900 dark:text-white">
              Open Graph &amp; Social Card Validator
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 shadow-sm">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Open Graph &amp; Social Card Validator
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Preview, validate, and debug link preview cards across Twitter (X), Facebook, LinkedIn, and Discord
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Switch Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 self-start md:self-auto">
              <span className="text-[11px] font-semibold text-slate-400 px-2">Presets:</span>
              {allPlatforms.map((p) => (
                <Link
                  key={p.slug}
                  href={`/tools/open-graph-validator/${p.slug}`}
                  className="px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                >
                  {p.shortName}
                </Link>
              ))}
              <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-sm">
                Universal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Generator Cross-Linking Callout */}
        <section className="mb-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  CMS &amp; Framework Open Graph Validators
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Audit platform-specific social card quirks for Shopify, WordPress, and Next.js App Router.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/open-graph-validator/shopify"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Shopify OG</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/open-graph-validator/wordpress"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>WordPress OG</span>
              </Link>
              <Link
                href="/tools/open-graph-validator/nextjs"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Next.js OG</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Tool Widget */}
        <section
          className="mt-2"
          aria-label="Universal Open Graph & Social Card Validator"
        >
          <ToolErrorBoundary
            toolSlug="open-graph-validator"
            toolName="Open Graph & Social Card Validator"
          >
            <SocialPreviewer
              toolSlug="open-graph-validator"
              toolName="Open Graph & Social Card Validator"
              defaultPlatform="twitter"
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Platform Selection Cards */}
        <section className="mt-12 space-y-4">
          <div className="flex items-center gap-2.5">
            <Layout className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Platform-Specific Open Graph Validators
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Target specific CMS Liquid snippets, WordPress SEO plugin graph collisions, or Next.js Edge ImageResponse routes:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            {allPlatforms.map((p) => (
              <Link
                key={p.slug}
                href={`/tools/open-graph-validator/${p.slug}`}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-indigo-500/50 transition-all shadow-xs space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {p.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {p.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Tools Internal Linking Mesh */}
        <div className="mt-12">
          <RelatedTools currentTool={openGraphPreviewTool} />
        </div>

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
