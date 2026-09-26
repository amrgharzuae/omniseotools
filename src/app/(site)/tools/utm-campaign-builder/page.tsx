import React from "react";
import type { Metadata } from "next";
import { utmCampaignBuilderTool } from "@/config/tools/marketing/utm-campaign-builder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { UtmBuilderClient } from "@/app/(site)/tools/marketing/utm-campaign-builder/components/UtmBuilderClient";
import { ToolContent, UTM_FAQS } from "@/app/(site)/tools/marketing/utm-campaign-builder/components/ToolContent";

const CANONICAL_URL = "https://omniseotools.com/tools/utm-campaign-builder";

export const metadata: Metadata = {
  title: "Campaign URL Builder - Free Google Analytics URL Builder Tool | OmniSEO Tools",
  description:
    "Create custom tracking links with our free Campaign URL Builder. Generate compliant GA4 UTM parameters for Google Ads, Meta, TikTok, and email campaigns instantly client-side.",
  keywords: [
    "Campaign URL Builder",
    "Google Analytics URL Builder Tool",
    "GA4 UTM Parameter Generator",
    "campaign builder",
    "utm campaign builder",
    "utm builder",
    "campaign url builder",
    "google analytics campaign url builder",
    "ga4 url builder",
    "campaign utm builder",
    "utm link generator",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Campaign URL Builder - Free Google Analytics URL Builder Tool | OmniSEO Tools",
    description:
      "Create custom tracking links with our free Campaign URL Builder. Generate compliant GA4 UTM parameters for Google Ads, Meta, TikTok, and email campaigns instantly client-side.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campaign URL Builder - Free Google Analytics URL Builder Tool | OmniSEO Tools",
    description:
      "Create custom tracking links with our free Campaign URL Builder. Generate compliant GA4 UTM parameters for Google Ads, Meta, TikTok, and email campaigns instantly client-side.",
  },
};

export default function UtmCampaignBuilderPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Campaign URL Builder",
        operatingSystem: "All",
        applicationCategory: "SEOApplication",
        url: CANONICAL_URL,
        description:
          "Create custom tracking links with our free Campaign URL Builder. Generate compliant GA4 UTM parameters for Google Ads, Meta, TikTok, and email campaigns instantly client-side.",
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
        mainEntity: UTM_FAQS.map((faq) => ({
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

        {/* Interactive Tool Widget (GA4 UTM Builder with Presets & QR Code Generator) */}
        <section className="mt-4" aria-label="Interactive GA4 Campaign URL Builder">
          <ToolErrorBoundary
            toolSlug="utm-campaign-builder"
            toolName="Campaign URL Builder & Google Analytics URL Generator"
          >
            <UtmBuilderClient />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide, Channel Grouping Matrix & FAQ Accordion */}
        <ToolContent />

        {/* Related Internal Linking Mesh */}
        <RelatedTools currentTool={utmCampaignBuilderTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
