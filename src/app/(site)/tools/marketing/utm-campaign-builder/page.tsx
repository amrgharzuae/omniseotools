import React from "react";
import type { Metadata } from "next";
import { utmCampaignBuilderTool } from "@/config/tools/marketing/utm-campaign-builder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { UtmBuilderClient } from "./components/UtmBuilderClient";
import { ToolContent, UTM_FAQS } from "./components/ToolContent";

const CANONICAL_URL = "https://omniseotools.com/tools/marketing/utm-campaign-builder";

export const metadata: Metadata = {
  title: "UTM Campaign Builder: Free URL & Tracking Parameter Generator",
  description:
    "Generate clean Google Analytics 4 and ad tracking links with our free UTM campaign builder. Easily format source, medium, and campaign parameters with zero tracking.",
  keywords: [
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
    title: "UTM Campaign Builder: Free URL & Tracking Parameter Generator",
    description:
      "Generate clean Google Analytics 4 and ad tracking links with our free UTM campaign builder. Easily format source, medium, and campaign parameters with zero tracking.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "UTM Campaign Builder: Free URL & Tracking Parameter Generator",
    description:
      "Generate clean Google Analytics 4 and ad tracking links with our free UTM campaign builder. Easily format source, medium, and campaign parameters with zero tracking.",
  },
};

export default function UtmCampaignBuilderPage() {
  // Graph JSON-LD containing SoftwareApplication and FAQPage schemas
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "OmniSEOtools UTM Campaign Builder",
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: CANONICAL_URL,
        description:
          "Generate clean Google Analytics 4 and ad tracking links with our free UTM campaign builder. Easily format source, medium, and campaign parameters with zero tracking.",
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

        {/* Interactive Tool Widget (GA4 UTM Builder with QR Code Generator) */}
        <section className="mt-4" aria-label="Interactive GA4 Campaign URL Builder">
          <ToolErrorBoundary
            toolSlug="utm-campaign-builder"
            toolName="UTM Campaign Builder & URL Tracker"
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
