import React from "react";
import type { Metadata } from "next";
import { ppcNegativeKeywordScrubberTool } from "@/config/tools/marketing/ppc-negative-keyword-scrubber";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { PpcNegativeKeywordScrubber } from "@/components/tools/marketing/PpcNegativeKeywordScrubber";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/ppc-negative-keyword-scrubber";

export const metadata: Metadata = {
  title: "PPC Negative Keyword List Scrubber & Match-Type Formatter | OmniSEO",
  description:
    "Clean, deduplicate, normalize, and format PPC keyword lists into Google Ads & Microsoft Advertising Broad, Phrase, Exact, and Negative match types instantly in your browser.",
  keywords: [
    "ppc negative keyword scrubber",
    "negative keyword list builder",
    "google ads match type formatter",
    "ppc keyword cleaner",
    "negative keyword formatter",
    "negative phrase match converter",
    "negative exact match converter",
    "google ads editor negative keyword csv",
    "microsoft advertising negative keywords",
    "adwords negative keyword tool",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "PPC Negative Keyword List Scrubber & Match-Type Formatter | OmniSEO",
    description:
      "Clean, deduplicate, normalize, and format PPC keyword lists into Google Ads & Microsoft Advertising Broad, Phrase, Exact, and Negative match types instantly in your browser.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "PPC Negative Keyword List Scrubber & Match-Type Formatter | OmniSEO",
    description:
      "Clean, deduplicate, normalize, and format PPC keyword lists into Google Ads & Microsoft Advertising Broad, Phrase, Exact, and Negative match types instantly in your browser.",
  },
};

export default function PpcNegativeKeywordScrubberPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools PPC Negative Keyword List Scrubber & Match-Type Formatter",
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: CANONICAL_URL,
        description:
          "Clean, deduplicate, normalize, and format PPC keyword lists into Google Ads & Microsoft Advertising Broad, Phrase, Exact, and Negative match types instantly in your browser.",
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
            name: "PPC Negative Keyword Scrubber",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (ppcNegativeKeywordScrubberTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={ppcNegativeKeywordScrubberTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={ppcNegativeKeywordScrubberTool.slug}
            toolName={ppcNegativeKeywordScrubberTool.name}
          >
            <PpcNegativeKeywordScrubber
              toolSlug={ppcNegativeKeywordScrubberTool.slug}
              toolName={ppcNegativeKeywordScrubberTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={ppcNegativeKeywordScrubberTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={ppcNegativeKeywordScrubberTool.name}
          category={ppcNegativeKeywordScrubberTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={ppcNegativeKeywordScrubberTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={ppcNegativeKeywordScrubberTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
