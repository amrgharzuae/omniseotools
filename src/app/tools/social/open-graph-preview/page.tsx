import React from "react";
import type { Metadata } from "next";
import { openGraphPreviewTool } from "@/config/tools/social/open-graph-preview";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { OpenGraphPreviewTool } from "@/components/tools/social/OpenGraphPreviewTool";
import { ToolContent, OG_FAQS } from "./components/ToolContent";

const CANONICAL_URL = "https://www.omniseotools.com/tools/social/open-graph-preview";

export const metadata: Metadata = {
  title: "Open Graph & Social Media Preview Generator (Facebook, X, LinkedIn) | OmniSEOtools",
  description:
    "Free live Open Graph preview simulator. Test Facebook, X/Twitter Cards, LinkedIn, and WhatsApp tags with real-time aspect ratio checks and instant HTML tag export.",
  keywords: [
    "open graph preview",
    "social card simulator",
    "twitter card generator",
    "facebook link preview",
    "linkedin post preview",
    "discord embed preview",
    "og image 1200x630",
    "social media meta tag generator",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Open Graph & Social Media Preview Generator (Facebook, X, LinkedIn) | OmniSEOtools",
    description:
      "Free live Open Graph preview simulator. Test Facebook, X/Twitter Cards, LinkedIn, and WhatsApp tags with real-time aspect ratio checks and instant HTML tag export.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Graph & Social Media Preview Generator (Facebook, X, LinkedIn) | OmniSEOtools",
    description:
      "Free live Open Graph preview simulator. Test Facebook, X/Twitter Cards, LinkedIn, and WhatsApp tags with real-time aspect ratio checks.",
  },
};

export default function OpenGraphPreviewPage() {
  // Graph JSON-LD containing SoftwareApplication and FAQPage schemas
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "OmniSEOtools Open Graph Preview Simulator",
        operatingSystem: "All",
        applicationCategory: "UtilitiesApplication",
        url: CANONICAL_URL,
        description:
          "Free interactive social meta card simulator to preview, validate, and generate Open Graph, Twitter Cards, and LinkedIn link preview tags.",
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
        mainEntity: OG_FAQS.map((faq) => ({
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
      <ToolHeader tool={openGraphPreviewTool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget (Twitter, Facebook, LinkedIn, Discord) */}
        <section className="mt-4" aria-label="Interactive Open Graph Card Simulator">
          <OpenGraphPreviewTool />
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide, Dimension Matrix & FAQ Accordion */}
        <ToolContent />

        {/* Related Internal Linking Mesh */}
        <RelatedTools currentTool={openGraphPreviewTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
