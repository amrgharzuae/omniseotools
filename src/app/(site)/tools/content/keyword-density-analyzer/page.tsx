import React from "react";
import type { Metadata } from "next";
import { keywordDensityAnalyzerTool } from "@/config/tools/content/keyword-density-analyzer";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { DensityAnalyzerClient } from "./components/DensityAnalyzerClient";
import { ToolContent, DENSITY_FAQS } from "./components/ToolContent";

const CANONICAL_URL = "https://www.omniseotools.com/tools/content/keyword-density-analyzer";

export const metadata: Metadata = {
  title: "Free Keyword Density Analyzer & N-Gram Frequency Checker | OmniSEOtools",
  description:
    "Analyze keyword frequency, 2-word/3-word phrases, and keyword density percentages in real time. Detect keyword stuffing, filter stop words, and export CSV reports.",
  keywords: [
    "keyword density analyzer",
    "word frequency counter",
    "n-gram analyzer",
    "tf-idf content tool",
    "keyword stuffing checker",
    "2-word phrase frequency",
    "3-word phrase frequency",
    "seo content optimizer",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Keyword Density Analyzer & N-Gram Frequency Checker | OmniSEOtools",
    description:
      "Analyze keyword frequency, 2-word/3-word phrases, and keyword density percentages in real time. Detect keyword stuffing, filter stop words, and export CSV reports.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Keyword Density Analyzer & N-Gram Frequency Checker | OmniSEOtools",
    description:
      "Analyze keyword frequency, 2-word/3-word phrases, and keyword density percentages in real time with over-optimization warnings.",
  },
};

export default function KeywordDensityAnalyzerPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "OmniSEOtools Keyword Density & N-Gram Frequency Analyzer",
        operatingSystem: "All",
        applicationCategory: "UtilitiesApplication",
        url: CANONICAL_URL,
        description:
          "Free online keyword density analyzer and N-gram frequency checker. Inspect 1-word, 2-word, and 3-word phrase distributions, reading time, and stop-word filtering with CSV export.",
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
        mainEntity: DENSITY_FAQS.map((faq) => ({
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
      <ToolHeader tool={keywordDensityAnalyzerTool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Density Analyzer Widget */}
        <section className="mt-4" aria-label="Interactive Keyword Density Analyzer">
          <DensityAnalyzerClient />
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide, N-Gram Matrix & FAQ Accordion */}
        <ToolContent />

        {/* Related Internal Linking Mesh */}
        <RelatedTools currentTool={keywordDensityAnalyzerTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
