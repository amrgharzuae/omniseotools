import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Globe,
  Sparkles,
  Layers,
  Table,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Tag,
  Code2,
  Share2,
  CheckCircle2,
  Search,
  ExternalLink,
  Sliders,
  Zap,
  Check,
  Info,
  ListOrdered,
  Store,
  BookOpen,
  Layout,
  Crop,
  Image as ImageIcon,
  Smartphone,
  Monitor,
} from "lucide-react";
import {
  OG_SAFEZONE_PLATFORMS,
  getOgSafeZonePlatformBySlug,
  getAllOgSafeZonePlatforms,
} from "@/config/og-safezone-platforms";
import { OgImageSafeZonePreviewer } from "@/components/tools/social/OgImageSafeZonePreviewer";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { ogImageSafeZoneTool } from "@/config/tools/social/open-graph-image-safe-zone";

interface PlatformPageProps {
  params: Promise<{
    platform: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { platform: "shopify" },
    { platform: "wordpress" },
    { platform: "nextjs" },
  ];
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getOgSafeZonePlatformBySlug(slug);

  if (!platform) {
    return {
      title: "Platform Not Found | OmniSEO Tools",
    };
  }

  const canonicalUrl = `https://omniseotools.com/tools/open-graph-image-safe-zone/${platform.slug}`;

  return {
    title: platform.title,
    description: platform.metaDescription,
    keywords: [
      `${platform.shortName.toLowerCase()} open graph previewer`,
      `${platform.shortName.toLowerCase()} og image safe zone`,
      `${platform.shortName.toLowerCase()} social share image checker`,
      `${platform.shortName.toLowerCase()} twitter card preview`,
      "open graph safe zone",
      "og image previewer",
      "1200x630 safe zone",
      "social media image crop",
      "facebook og image preview",
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

export default async function OgSafeZonePlatformPage({ params }: PlatformPageProps) {
  const { platform: slug } = await params;
  const platform = getOgSafeZonePlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const canonicalUrl = `https://omniseotools.com/tools/open-graph-image-safe-zone/${platform.slug}`;

  // Structured Data Schemas: WebApplication + BreadcrumbList + HowTo + FAQPage
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: platform.title,
        url: canonicalUrl,
        applicationCategory: "DesignApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5 Canvas.",
        description: platform.metaDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
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
            name: "Tools",
            item: "https://omniseotools.com/tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Open Graph Image Safe Zone Previewer",
            item: "https://omniseotools.com/tools/open-graph-image-safe-zone",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${platform.name} Preset`,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: `How to Configure Open Graph Safe Zones in ${platform.name}`,
        description: `Step-by-step instructions to structure, size, and validate social sharing images in ${platform.name}.`,
        step: platform.actionableSteps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.title,
          text: step.description,
          url: `${canonicalUrl}#step-${idx + 1}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: platform.faqItems.map((faq) => ({
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
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-8 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/tools" className="hover:text-indigo-600 transition-colors">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link
              href="/tools/open-graph-image-safe-zone"
              className="hover:text-indigo-600 font-medium transition-colors"
            >
              OG Safe Zone Previewer
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">
              {platform.name}
            </span>
          </nav>

          {/* Badges & Meta Info */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
              <Store className="h-3 w-3" />
              {platform.badge}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              <Crop className="h-3 w-3" />
              1200 × 630 Safe Area
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="h-3 w-3 text-indigo-500" />
              Multi-Platform Crop Check
            </span>
          </div>

          {/* H1 Heading & Subtitle */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {platform.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {platform.subtitle}
          </p>
        </div>
      </section>

      {/* Main Tool & Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 space-y-12">
        {/* Top Leaderboard Ad */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* Primary Interactive Engine */}
        <section aria-label="Interactive Open Graph Safe Zone Engine">
          <ToolErrorBoundary>
            <OgImageSafeZonePreviewer
              toolSlug={`open-graph-image-safe-zone/${platform.slug}`}
              toolName={platform.title}
              initialImageUrl={platform.initialImageUrl}
              initialTitle={platform.initialTitle}
              initialDescription={platform.initialDescription}
              initialDomain={platform.initialDomain}
              platformName={platform.name}
              customTemplates={platform.sampleTemplates}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed Ad */}
        <AdSlot slotType="in-feed" className="my-6" />

        {/* Crawlable AI-Optimized Guide Section */}
        <div className="space-y-12 border-t border-slate-200 dark:border-slate-800 pt-10">
          {/* 1. Direct Answer Callout Box */}
          <section
            id="direct-answer"
            className="rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent p-6 sm:p-7 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white shadow-sm">
                <Zap className="h-4 w-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Direct Answer: {platform.name} Social Image Safe Zones
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {platform.directAnswerSummary}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {platform.directAnswerDetails}
            </p>
          </section>

          {/* 2. Core Educational Heading & Detailed CMS Analysis */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {platform.coreH2}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {platform.educationalContent.heading}
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {platform.educationalContent.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {platform.educationalContent.calloutBox && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-indigo-500" />
                  {platform.educationalContent.calloutBox.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {platform.educationalContent.calloutBox.text}
                </p>
                {platform.educationalContent.calloutBox.codeExample && (
                  <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-3.5 rounded-lg overflow-x-auto">
                    {platform.educationalContent.calloutBox.codeExample}
                  </pre>
                )}
              </div>
            )}
          </section>

          {/* 3. Actionable Steps (<ol> for HowTo Schema & Clear UI) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                How to Configure &amp; Update Social Sharing Images in {platform.name}
              </h2>
            </div>

            <ol className="space-y-4 list-none p-0">
              {platform.actionableSteps.map((step, idx) => (
                <li
                  key={idx}
                  id={`step-${idx + 1}`}
                  className="scroll-mt-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                    {step.description}
                  </p>
                  {step.codeSnippet && (
                    <div className="pl-10 pt-2">
                      <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto">
                        {step.codeSnippet}
                      </pre>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* 4. Platform-Specific FAQ Section (HTML + FAQPage Schema) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions ({platform.name})
              </h2>
            </div>

            <div className="space-y-3">
              {platform.faqItems.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40"
                  open={idx === 0}
                >
                  <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                    <span>{faq.question}</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* 5. Cross-Platform Navigation Matrix */}
          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Globe className="h-4 w-4 text-indigo-500" />
              <span>Switch Ecosystem Presets:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/tools/open-graph-image-safe-zone/shopify"
                className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  platform.slug === "shopify"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300"
                }`}
              >
                Shopify OG Preview
              </Link>
              <Link
                href="/tools/open-graph-image-safe-zone/wordpress"
                className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  platform.slug === "wordpress"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300"
                }`}
              >
                WordPress OG Preview
              </Link>
              <Link
                href="/tools/open-graph-image-safe-zone/nextjs"
                className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  platform.slug === "nextjs"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300"
                }`}
              >
                Next.js OG Preview
              </Link>
              <Link
                href="/tools/open-graph-image-safe-zone"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                Universal Safe-Zone Tool
              </Link>
            </div>
          </section>

          {/* 6. Contextual Related Tools */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <RelatedTools currentTool={ogImageSafeZoneTool} />
          </section>
        </div>

        {/* Bottom Leaderboard Ad */}
        <AdSlot slotType="leaderboard" className="mt-10" />
      </main>
    </div>
  );
}
