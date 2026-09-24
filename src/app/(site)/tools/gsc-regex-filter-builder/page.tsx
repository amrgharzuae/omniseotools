import React from "react";
import type { Metadata } from "next";
import { gscRegexFilterBuilderTool } from "@/config/tools/seo/gsc-regex-filter-builder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { GscRegexFilterBuilder } from "@/components/tools/seo/GscRegexFilterBuilder";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/gsc-regex-filter-builder";

export const metadata: Metadata = {
  title: "Google Search Console Regex Filter Builder (RE2 Compatible) | OmniSEO",
  description:
    "Build and test RE2-compliant regular expressions for Google Search Console query and page filters. Cleanly segment questions, branded keywords, commercial intent, word counts, and subfolders.",
  keywords: [
    "google search console regex",
    "gsc regex filter builder",
    "search console regex",
    "gsc re2 regex",
    "gsc query regex",
    "gsc brand non brand filter",
    "search console question filter regex",
    "gsc word count regex",
    "google search console page regex",
    "re2 regex tester",
    "gsc custom regex",
    "search console intent regex",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Google Search Console Regex Filter Builder (RE2 Compatible) | OmniSEO",
    description:
      "Build and test RE2-compliant regular expressions for Google Search Console query and page filters. Cleanly segment questions, branded keywords, commercial intent, word counts, and subfolders.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Search Console Regex Filter Builder (RE2 Compatible) | OmniSEO",
    description:
      "Build and test RE2-compliant regular expressions for Google Search Console query and page filters. Cleanly segment questions, branded keywords, commercial intent, word counts, and subfolders.",
  },
};

export default function GscRegexFilterBuilderPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Google Search Console Regex Filter Builder",
        operatingSystem: "All",
        applicationCategory: "SEOApplication",
        url: CANONICAL_URL,
        description:
          "Build and test RE2-compliant regular expressions for Google Search Console query and page filters. Cleanly segment questions, branded keywords, commercial intent, word counts, and subfolders.",
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
            name: "Google Search Console Regex Filter Builder",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (gscRegexFilterBuilderTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={gscRegexFilterBuilderTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={gscRegexFilterBuilderTool.slug}
            toolName={gscRegexFilterBuilderTool.name}
          >
            <GscRegexFilterBuilder
              toolSlug={gscRegexFilterBuilderTool.slug}
              toolName={gscRegexFilterBuilderTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={gscRegexFilterBuilderTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={gscRegexFilterBuilderTool.name}
          category={gscRegexFilterBuilderTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={gscRegexFilterBuilderTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={gscRegexFilterBuilderTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
