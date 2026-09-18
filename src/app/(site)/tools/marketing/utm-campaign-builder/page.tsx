import React from "react";
import type { Metadata } from "next";
import { utmCampaignBuilderTool } from "@/config/tools/marketing/utm-campaign-builder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { UtmBuilderClient } from "./components/UtmBuilderClient";
import { ToolContent, UTM_FAQS } from "./components/ToolContent";

const CANONICAL_URL = "https://www.omniseotools.com/tools/marketing/utm-campaign-builder";

export const metadata: Metadata = {
  title: "Google Analytics Campaign URL Builder (GA4 UTM Generator) | OmniSEOtools",
  description:
    "Free Google Analytics Campaign URL Builder for GA4. Generate tracking links with utm_source, utm_medium, utm_campaign, one-click channel presets, auto-sanitization, and instant QR codes.",
  keywords: [
    "google analytics campaign url builder",
    "ga4 utm generator",
    "utm campaign builder",
    "utm tracking link generator",
    "utm code generator",
    "utm_source utm_medium utm_campaign",
    "ga4 url tracking builder",
    "utm qr code generator",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Google Analytics Campaign URL Builder (GA4 UTM Generator) | OmniSEOtools",
    description:
      "Free Google Analytics Campaign URL Builder for GA4. Generate tracking links with utm_source, utm_medium, utm_campaign, one-click channel presets, auto-sanitization, and instant QR codes.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Analytics Campaign URL Builder (GA4 UTM Generator) | OmniSEOtools",
    description:
      "Free Google Analytics Campaign URL Builder for GA4. Generate tracking links with utm_source, utm_medium, utm_campaign, one-click channel presets, and QR codes.",
  },
};

export default function UtmCampaignBuilderPage() {
  // Graph JSON-LD containing SoftwareApplication and FAQPage schemas
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "OmniSEOtools GA4 Campaign URL Builder",
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: CANONICAL_URL,
        description:
          "Free Google Analytics 4 Campaign URL Builder to generate, sanitize, and validate UTM marketing tracking links with one-click presets and instant QR code generation.",
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
          <UtmBuilderClient />
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
