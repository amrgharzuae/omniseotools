import React from "react";
import type { Metadata } from "next";
import { serpPreviewTool } from "@/config/tools/seo/serp-preview";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { SerpPreviewTool } from "@/components/tools/serp/SerpPreviewTool";
import { ToolContent, SERP_FAQS } from "./components/ToolContent";

const CANONICAL_URL = "https://www.omniseotools.com/tools/seo/serp-preview";

export const metadata: Metadata = {
  title: "Google SERP Simulator & Meta Tag Pixel Counter (2026 Free Tool)",
  description:
    "Simulate exact Google Desktop & Mobile search results, measure title and description pixel limits, and optimize CTR with real-time AI metadata generation.",
  keywords: [
    "google serp simulator",
    "meta title pixel counter",
    "serp preview tool",
    "ai meta description generator",
    "google title length in pixels",
    "seo snippet generator 2026",
    "google serp pixel width checker",
    "meta title pixel length checker",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Google SERP Simulator & Meta Tag Pixel Counter (2026 Free Tool)",
    description:
      "Test and optimize your SEO title and description with pixel accuracy for Google Desktop & Mobile SERP previews. Free real-time simulator.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google SERP Simulator & Meta Tag Pixel Counter (2026 Free Tool)",
    description:
      "Test and optimize your SEO title and description with pixel accuracy for Google Desktop & Mobile SERP previews.",
  },
};

export default function SerpPreviewPage() {
  // 1. SoftwareApplication Schema
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Google SERP Snippet Previewer & Meta Pixel Counter",
    operatingSystem: "All",
    applicationCategory: "UtilitiesApplication",
    url: CANONICAL_URL,
    description:
      "Free interactive Google SERP simulator to test pixel widths, measure title & meta description cutoffs, and generate optimized tags with Google Gemini AI.",
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
  };

  // 2. FAQPage Schema mapped directly from ToolContent FAQs
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERP_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      {/* Breadcrumb & Hero Header */}
      <ToolHeader tool={serpPreviewTool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget (Dual-Mode: Gemini AI & Manual Preview) */}
        <section className="mt-4" aria-label="Interactive Google SERP Simulator">
          <SerpPreviewTool />
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide, Dimension Matrix & FAQ Accordion */}
        <ToolContent />

        {/* Related Internal Linking Mesh */}
        <RelatedTools currentTool={serpPreviewTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
