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
  Flame,
  Search,
  ExternalLink,
  Sliders,
  Zap,
  Check,
} from "lucide-react";
import {
  UTM_PLATFORMS,
  getUtmPlatformBySlug,
  getAllUtmPlatforms,
} from "@/config/utm-platforms";
import { UtmBuilderClient } from "@/app/(site)/tools/marketing/utm-campaign-builder/components/UtmBuilderClient";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";

interface PlatformPageProps {
  params: Promise<{
    platform: string;
  }>;
}

export async function generateStaticParams() {
  return UTM_PLATFORMS.map((p) => ({
    platform: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getUtmPlatformBySlug(slug);

  if (!platform) {
    return {
      title: "Platform Not Found | OmniSEO Tools",
    };
  }

  const canonicalUrl = `https://omniseotools.com/tools/utm-campaign-builder/${platform.slug}`;

  return {
    title: `${platform.title} | OmniSEO Tools`,
    description: platform.metaDescription,
    keywords: [
      `${platform.name.toLowerCase()} utm builder`,
      `${platform.shortName.toLowerCase()} campaign url generator`,
      `${platform.defaultSource} utm_source ga4`,
      `${platform.defaultMedium} utm_medium`,
      `${platform.slug} tracking generator`,
      "ga4 campaign url builder",
      "dynamic utm macros",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${platform.title} | OmniSEO Tools`,
      description: platform.metaDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "OmniSEOTools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${platform.title} | OmniSEO Tools`,
      description: platform.metaDescription,
    },
  };
}

export default async function UtmPlatformPage({ params }: PlatformPageProps) {
  const { platform: slug } = await params;
  const platform = getUtmPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  const canonicalUrl = `https://omniseotools.com/tools/utm-campaign-builder/${platform.slug}`;

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `${platform.name} UTM Campaign Builder & Parameter Generator`,
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: canonicalUrl,
        description: platform.metaDescription,
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
        "@type": "HowTo",
        name: `How to Generate and Deploy ${platform.name} UTM Tracking Links`,
        description: `Step-by-step technical guide for configuring, dynamic macro tagging, and testing GA4-compliant campaign URLs in ${platform.name}.`,
        step: platform.howToSteps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
          url: `${canonicalUrl}#step-${idx + 1}`,
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
            name: "Marketing Tools",
            item: "https://omniseotools.com/tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "UTM Campaign Builder",
            item: "https://omniseotools.com/tools/marketing/utm-campaign-builder",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: platform.name,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  const otherPlatforms = UTM_PLATFORMS.filter((p) => p.slug !== platform.slug);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Breadcrumb & Hero Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Tools
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/marketing/utm-campaign-builder" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              UTM Builder
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900 dark:text-white font-medium">
              {platform.shortName}
            </span>
          </nav>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>GA4 Standardized • {platform.ga4ChannelGroup} Grouping</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold border border-blue-500/20">
                <Code2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>1-Click Dynamic Macros</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {platform.h1}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Generate standardized, error-free campaign tracking URLs for {platform.name}. Pre-populated with{" "}
              <code className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">utm_source={platform.defaultSource}</code> and{" "}
              <code className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">utm_medium={platform.defaultMedium}</code> to guarantee accurate GA4 Default Channel Grouping.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Pre-Populated Interactive UTM Builder with 1-Click Dynamic Macros */}
        <section className="mt-4" aria-label={`Interactive ${platform.name} UTM Builder`}>
          <ToolErrorBoundary
            toolSlug={`utm-campaign-builder-${platform.slug}`}
            toolName={`${platform.name} UTM Campaign URL Builder`}
          >
            <UtmBuilderClient
              initialSource={platform.defaultSource}
              initialMedium={platform.defaultMedium}
              initialCampaign={platform.defaultCampaign}
              initialSourcePlatform={platform.sourcePlatform}
              initialPreset={platform.name}
              dynamicMacros={platform.dynamicMacros}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Platform-Specific Technical Editorial & Guidance */}
        <article className="mt-12 space-y-16 text-slate-700 dark:text-slate-300">
          {/* Section 1: Direct Answer Callout */}
          <section className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white shadow-sm">
                <Zap className="h-4 w-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                GA4 Channel Matching Requirements for {platform.shortName}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              {platform.directAnswer}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-emerald-100/80 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md text-emerald-800 dark:text-emerald-300 font-semibold">
                <span>utm_source:</span>
                <strong className="underline">{platform.defaultSource}</strong>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-100/80 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md text-emerald-800 dark:text-emerald-300 font-semibold">
                <span>utm_medium:</span>
                <strong className="underline">{platform.defaultMedium}</strong>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-700 dark:text-slate-300 font-sans font-semibold">
                <span>Default Channel:</span>
                <strong className="text-emerald-600 dark:text-emerald-400">{platform.ga4ChannelGroup}</strong>
              </div>
            </div>
          </section>

          {/* Section 2: Dynamic Macro Tokens Reference Table */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Dynamic URL Macro Tokens for {platform.shortName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Supported dynamic placeholders and ValueTrack tokens for automated ad level reporting
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Macro Token</th>
                    <th className="py-3.5 px-4">Target UTM Parameter</th>
                    <th className="py-3.5 px-4">Dynamic Value Injected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {platform.dynamicMacros.map((macro, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {macro.token}
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {macro.param}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {macro.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Step-by-Step Implementation Guide */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Step-by-Step Implementation Guide
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  How to deploy and verify your tracking links in {platform.name}
                </p>
              </div>
            </div>

            <ol className="grid grid-cols-1 gap-4 list-none p-0 m-0">
              {platform.howToSteps.map((step, idx) => (
                <li
                  key={idx}
                  id={`step-${idx + 1}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {step.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 4: Platform-Specific FAQs */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions: {platform.shortName} UTMs
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Detailed technical answers regarding {platform.name} tracking, link configuration, and attribution
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {platform.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 transition-all open:ring-1 open:ring-emerald-500/20"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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

          {/* Section 5: Cross-Linking Matrix */}
          <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Need tracking for another platform?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch to dedicated tracking generators for other major advertising networks
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherPlatforms.map((other) => (
                <Link
                  key={other.slug}
                  href={`/tools/utm-campaign-builder/${other.slug}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 hover:border-emerald-500/60 transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {other.name}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      source: <strong className="text-emerald-600 dark:text-emerald-400">{other.defaultSource}</strong>
                      <br />
                      medium: <strong className="text-emerald-600 dark:text-emerald-400">{other.defaultMedium}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>Open Generator</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}

              {/* Bulk UTM Matrix Generator Link */}
              <Link
                href="/tools/bulk-utm-matrix-generator"
                className="rounded-2xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 p-5 space-y-2 hover:border-emerald-500 transition-all group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Bulk UTM Matrix
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
                      50+ URLs
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Generate multi-channel matrices and structured CSV exports in one click.
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <span>Open Bulk Matrix</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </section>
        </article>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
