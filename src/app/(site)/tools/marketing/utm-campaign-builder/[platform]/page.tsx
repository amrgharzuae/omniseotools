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
} from "lucide-react";
import platformsData from "@/data/utm-platforms.json";
import { UtmBuilderClient } from "../components/UtmBuilderClient";
import { AdSlot } from "@/components/ads/AdSlot";

interface PlatformPageProps {
  params: Promise<{
    platform: string;
  }>;
}

export async function generateStaticParams() {
  return platformsData.map((p) => ({
    platform: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = platformsData.find((p) => p.slug === slug);

  if (!platform) {
    return {
      title: "Platform Not Found | OmniSEOtools",
    };
  }

  const canonicalUrl = `https://www.omniseotools.com/tools/marketing/utm-campaign-builder/${platform.slug}`;

  return {
    title: `${platform.name} UTM Campaign URL Builder (GA4) | OmniSEOtools`,
    description: `Free GA4 UTM tracking link generator for ${platform.name}. Auto-fills ${platform.defaultSource} and ${platform.defaultMedium} with dynamic tokens and GA4 channel compatibility.`,
    keywords: [
      `${platform.name.toLowerCase()} utm generator`,
      `${platform.slug} utm builder`,
      `${platform.defaultSource} utm_source ga4`,
      `${platform.name.toLowerCase()} tracking url builder`,
      "ga4 campaign url builder",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${platform.name} UTM Campaign URL Builder (GA4) | OmniSEOtools`,
      description: `Free GA4 UTM tracking link generator for ${platform.name}. Auto-fills ${platform.defaultSource} and ${platform.defaultMedium} with dynamic tokens and GA4 channel compatibility.`,
      url: canonicalUrl,
      type: "website",
      siteName: "OmniSEOTools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${platform.name} UTM Campaign URL Builder (GA4) | OmniSEOtools`,
      description: `Free GA4 UTM tracking link generator for ${platform.name}. Auto-fills ${platform.defaultSource} and ${platform.defaultMedium}.`,
    },
  };
}

export default async function UtmPlatformPage({ params }: PlatformPageProps) {
  const { platform: slug } = await params;
  const platform = platformsData.find((p) => p.slug === slug);

  if (!platform) {
    notFound();
  }

  const canonicalUrl = `https://www.omniseotools.com/tools/marketing/utm-campaign-builder/${platform.slug}`;

  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: `OmniSEOtools ${platform.name} UTM Campaign URL Builder`,
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: canonicalUrl,
        description: `Free Google Analytics 4 tracking link generator specifically tailored for ${platform.name} with preconfigured utm_source, utm_medium, and dynamic macro tokens.`,
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEOTools",
          url: "https://www.omniseotools.com",
        },
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

  const otherPlatforms = platformsData.filter((p) => p.slug !== platform.slug);

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
            <Link href="/tools/marketing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Marketing Tools
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-500/20">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>GA4 Standardized • {platform.ga4ChannelGroup} Grouping</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {platform.name} UTM Campaign URL Builder
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Generate standardized, error-free campaign tracking URLs for {platform.name}. Pre-populated with{" "}
              <code className="text-emerald-600 dark:text-emerald-400 font-bold">utm_source={platform.defaultSource}</code> and{" "}
              <code className="text-emerald-600 dark:text-emerald-400 font-bold">utm_medium={platform.defaultMedium}</code> to guarantee accurate GA4 Default Channel Grouping.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Pre-Populated Interactive UTM Builder */}
        <section className="mt-4" aria-label={`Interactive ${platform.name} UTM Builder`}>
          <UtmBuilderClient
            initialSource={platform.defaultSource}
            initialMedium={platform.defaultMedium}
            initialCampaign={platform.defaultCampaign}
            initialSourcePlatform={platform.sourcePlatform}
            initialPreset={platform.name}
          />
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Platform-Specific Technical Editorial & Guidance */}
        <article className="mt-12 space-y-16 text-slate-700 dark:text-slate-300">
          {/* Section 1: Dynamic Macro Tokens for Platform */}
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
                  Supported ValueTrack and dynamic URL parameter tokens for automated attribution
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Macro Token</th>
                    <th className="py-3.5 px-4">Recommended UTM Parameter</th>
                    <th className="py-3.5 px-4">Dynamic Value Injected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {platform.macroList.map((macro, idx) => (
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

          {/* Section 2: GA4 Attribution Rules & Platform Tips */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  GA4 Channel Grouping Rules for {platform.shortName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  How Google Analytics 4 processes and reports your incoming campaign traffic
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attribution Card */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Assigned GA4 Channel
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    {platform.ga4ChannelGroup}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Regex Matching Criteria
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {platform.channelGroupReason}
                </p>
              </div>

              {/* Tips Card */}
              <div className="rounded-3xl border border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20 p-6 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Expert Tracking Tip
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Best Practice for {platform.shortName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {platform.tips}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Platform-Specific FAQs */}
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
                  Detailed answers regarding {platform.name} tracking, link configuration, and attribution
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

          {/* Section 4: Related Platforms Grid (Internal Linking Mesh) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Other Marketing &amp; Ad Platform UTM Builders
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch to dedicated tracking generators for other advertising networks and channels
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherPlatforms.map((other) => (
                <Link
                  key={other.slug}
                  href={`/tools/marketing/utm-campaign-builder/${other.slug}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 hover:border-emerald-500/60 transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {other.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {other.ga4ChannelGroup}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      source: <strong className="text-emerald-600 dark:text-emerald-400">{other.defaultSource}</strong> • medium: <strong className="text-emerald-600 dark:text-emerald-400">{other.defaultMedium}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>Open Generator</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
