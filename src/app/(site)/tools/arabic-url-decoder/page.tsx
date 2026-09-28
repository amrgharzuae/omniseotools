import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { arabicUrlDecoderTool } from "@/config/tools/marketing/arabic-url-decoder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { ArabicUrlDecoder } from "@/components/tools/ArabicUrlDecoder";
import {
  Globe,
  Sparkles,
  Layers,
  Table,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Zap,
  Info,
  ListOrdered,
} from "lucide-react";

const CANONICAL_URL = "https://omniseotools.com/tools/arabic-url-decoder";

export const metadata: Metadata = {
  title: "Arabic & UTF-8 URL Decoder | Convert Encoded URLs & Ad Query Strings",
  description:
    "Free tool to convert percent-encoded Arabic URL strings (%D8%...) from Google Ads, Google Search Console, and GA4 into clean, readable Arabic text.",
  keywords: [
    "arabic url decoder",
    "percent decode url",
    "decode arabic link",
    "google ads search term decoder",
    "utf8 url converter",
    "url percent encoding arabic",
    "decode utm arabic",
    "arabic gclid decoder",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Arabic & UTF-8 URL Decoder | Convert Encoded URLs & Ad Query Strings",
    description:
      "Free tool to convert percent-encoded Arabic URL strings (%D8%...) from Google Ads, Google Search Console, and GA4 into clean, readable Arabic text.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arabic & UTF-8 URL Decoder | Convert Encoded URLs & Ad Query Strings",
    description:
      "Free tool to convert percent-encoded Arabic URL strings (%D8%...) from Google Ads, Google Search Console, and GA4 into clean, readable Arabic text.",
  },
};

export default function ArabicUrlDecoderPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: arabicUrlDecoderTool.title,
        url: CANONICAL_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        description: arabicUrlDecoderTool.metaDescription,
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
            name: "Arabic URL Decoder",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Decode Percent-Encoded Arabic URLs",
        description: "Step-by-step instructions to convert %D8%... strings into clean Arabic text.",
        step: (arabicUrlDecoderTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
          url: `${CANONICAL_URL}#step-${idx + 1}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (arabicUrlDecoderTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={arabicUrlDecoderTool} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 space-y-10">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* Primary Interactive Decoder Engine */}
        <section aria-label="Interactive Arabic URL Decoder">
          <ToolErrorBoundary>
            <ArabicUrlDecoder
              toolSlug="arabic-url-decoder"
              toolName="Arabic & UTF-8 URL Decoder"
            />
          </ToolErrorBoundary>
        </section>

        {/* CMS Platform Presets Switcher Bar */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50/50 via-white to-sky-50/50 dark:from-slate-900/60 dark:via-slate-900 dark:to-slate-900/60 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="h-4 w-4 text-indigo-500" />
                Specialized E-Commerce &amp; CMS Presets
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore platform-tailored decoders with e-commerce sample handles, Nginx configurations, and Liquid tips.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/tools/arabic-url-decoder/shopify"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition-all"
              >
                Shopify Preset &rarr;
              </Link>
              <Link
                href="/tools/arabic-url-decoder/woocommerce"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition-all"
              >
                WooCommerce Preset &rarr;
              </Link>
              <Link
                href="/tools/arabic-url-decoder/wordpress"
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition-all"
              >
                WordPress Preset &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-6" />

        {/* Educational Content & FAQ Guide */}
        <div className="space-y-10 border-t border-slate-200 dark:border-slate-800 pt-10">
          {arabicUrlDecoderTool.guideContent && (
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {arabicUrlDecoderTool.guideContent.title}
              </h2>
              <div className="grid grid-cols-1 gap-8">
                {arabicUrlDecoderTool.guideContent.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-xs"
                  >
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {section.heading}
                    </h3>
                    <div
                      className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                    {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          Key Takeaways:
                        </span>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
                          {section.keyTakeaways.map((takeaway, tIdx) => (
                            <li key={tIdx}>{takeaway}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {(arabicUrlDecoderTool.faqs || []).map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40"
                  open={idx === 0}
                >
                  <summary className="flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none">
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

          {/* Related Tools */}
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <RelatedTools currentTool={arabicUrlDecoderTool} />
          </section>
        </div>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-10" />
      </main>
    </div>
  );
}
