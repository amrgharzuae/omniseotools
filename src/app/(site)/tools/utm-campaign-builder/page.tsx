import React from "react";
import type { Metadata } from "next";
import { utmCampaignBuilderTool } from "@/config/tools/marketing/utm-campaign-builder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { UtmBuilderClient } from "@/app/(site)/tools/marketing/utm-campaign-builder/components/UtmBuilderClient";
import { ToolContent } from "@/app/(site)/tools/marketing/utm-campaign-builder/components/ToolContent";
import { UtmQuickReference } from "@/components/tools/utm-campaign-builder";
import { PRIMARY_UTM_FAQS } from "@/config/utm-quick-reference-data";

const CANONICAL_URL = "https://www.omniseotools.com/tools/utm-campaign-builder";

export const metadata: Metadata = {
  title: {
    absolute: "Free UTM Campaign Builder & URL Tracker (No Sign-Up) | OmniSEOTools",
  },
  description:
    "Generate clean, error-free UTM campaign tracking links for Google Ads, Meta/Facebook, TikTok, and email campaigns in seconds. Zero sign-up required.",
  keywords: [
    "Free UTM Campaign Builder",
    "URL Tracker",
    "UTM campaign builder",
    "Campaign URL Builder",
    "Google Analytics URL Builder Tool",
    "GA4 UTM Parameter Generator",
    "Meta ads UTM builder",
    "Google ads UTM generator",
    "TikTok campaign URL builder",
    "utm builder no sign up",
    "clean utm links",
    "dynamic utm macros",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free UTM Campaign Builder & URL Tracker (No Sign-Up) | OmniSEOTools",
    description:
      "Generate clean, error-free UTM campaign tracking links for Google Ads, Meta/Facebook, TikTok, and email campaigns in seconds. Zero sign-up required.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UTM Campaign Builder & URL Tracker (No Sign-Up) | OmniSEOTools",
    description:
      "Generate clean, error-free UTM campaign tracking links for Google Ads, Meta/Facebook, TikTok, and email campaigns in seconds. Zero sign-up required.",
  },
};

export default function UtmCampaignBuilderPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Free UTM Campaign Builder & URL Tracker",
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: CANONICAL_URL,
        description:
          "Generate clean, error-free UTM campaign tracking links for Google Ads, Meta/Facebook, TikTok, and email campaigns in seconds. Zero sign-up required.",
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
        "@type": "FAQPage",
        mainEntity: PRIMARY_UTM_FAQS.map((faq) => ({
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
      <ToolHeader tool={utmCampaignBuilderTool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget (GA4 UTM Builder with Presets, Dynamic Macros & QR Code) */}
        <section className="mt-4" aria-label="Interactive GA4 Campaign URL Builder">
          <ToolErrorBoundary
            toolSlug="utm-campaign-builder"
            toolName="Free UTM Campaign Builder & URL Tracker"
          >
            <UtmBuilderClient />
          </ToolErrorBoundary>
        </section>

        {/* Lightweight Reference Section: Quick Syntax Table, Dynamic Presets & FAQs */}
        <UtmQuickReference />

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide & Channel Grouping Matrix */}
        <ToolContent />

        {/* Related Internal Linking Mesh */}
        <RelatedTools currentTool={utmCampaignBuilderTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
