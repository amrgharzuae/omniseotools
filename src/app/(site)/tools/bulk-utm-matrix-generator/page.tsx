import React from "react";
import type { Metadata } from "next";
import { bulkUtmMatrixGeneratorTool } from "@/config/tools/marketing/bulk-utm-matrix-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { BulkUtmMatrixGenerator } from "@/components/tools/marketing/BulkUtmMatrixGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/bulk-utm-matrix-generator";

export const metadata: Metadata = {
  title: "Bulk UTM Matrix & Multi-Channel Tagging Generator | OmniSEO",
  description:
    "Generate, normalize, and export bulk Google Analytics 4 (GA4) UTM tracking URLs across multiple channels, ad platforms, and landing pages with one click.",
  keywords: [
    "bulk utm generator",
    "utm matrix generator",
    "multi-channel utm builder",
    "bulk campaign url builder",
    "bulk ga4 url generator",
    "bulk utm tracking link builder",
    "multi platform utm generator",
    "utm spreadsheet generator",
    "google analytics bulk url builder",
    "campaign builder",
    "bulk utm tagger",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk UTM Matrix & Multi-Channel Tagging Generator | OmniSEO",
    description:
      "Generate, normalize, and export bulk Google Analytics 4 (GA4) UTM tracking URLs across multiple channels, ad platforms, and landing pages with one click.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk UTM Matrix & Multi-Channel Tagging Generator | OmniSEO",
    description:
      "Generate, normalize, and export bulk Google Analytics 4 (GA4) UTM tracking URLs across multiple channels, ad platforms, and landing pages with one click.",
  },
};

export default function BulkUtmMatrixGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk UTM Matrix & Multi-Channel Tagging Generator",
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: CANONICAL_URL,
        description:
          "Generate, normalize, and export bulk Google Analytics 4 (GA4) UTM tracking URLs across multiple channels, ad platforms, and landing pages with one click.",
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
            name: "Bulk UTM Matrix Generator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (bulkUtmMatrixGeneratorTool.faqs || []).map((faq) => ({
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

      {/* Tool Header */}
      <ToolHeader tool={bulkUtmMatrixGeneratorTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={bulkUtmMatrixGeneratorTool.slug}
            toolName={bulkUtmMatrixGeneratorTool.name}
          >
            <BulkUtmMatrixGenerator
              toolSlug={bulkUtmMatrixGeneratorTool.slug}
              toolName={bulkUtmMatrixGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={bulkUtmMatrixGeneratorTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={bulkUtmMatrixGeneratorTool.name}
          category={bulkUtmMatrixGeneratorTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={bulkUtmMatrixGeneratorTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={bulkUtmMatrixGeneratorTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
