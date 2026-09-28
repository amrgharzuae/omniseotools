import React from "react";
import type { Metadata } from "next";
import { serpPreviewTool } from "@/config/tools/seo/serp-preview";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { SerpPreviewTool } from "@/components/tools/serp/SerpPreviewTool";
import { ToolContent, SERP_FAQS } from "@/app/(site)/tools/seo/serp-preview/components/ToolContent";

const CANONICAL_URL = "https://omniseotools.com/tools/google-serp-simulator";

export const metadata: Metadata = {
  title: "Google SERP Simulator - Search Result Snippet Preview Tool | OmniSEO Tools",
  description:
    "Preview how your meta title, description, and URL appear on Google Search. Features real-time pixel truncation checking for Desktop (600px) and Mobile (960px).",
  keywords: [
    "google serp simulator",
    "google search snippet preview",
    "meta title pixel counter",
    "serp simulator",
    "serp preview tool",
    "search snippet preview",
    "meta description pixel counter",
    "google title truncation tool",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Google SERP Simulator - Search Result Snippet Preview Tool | OmniSEO Tools",
    description:
      "Preview how your meta title, description, and URL appear on Google Search. Features real-time pixel truncation checking for Desktop (600px) and Mobile (960px).",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Google SERP Simulator - Search Result Snippet Preview Tool | OmniSEO Tools",
    description:
      "Preview how your meta title, description, and URL appear on Google Search. Features real-time pixel truncation checking for Desktop (600px) and Mobile (960px).",
  },
};

export default function GoogleSerpSimulatorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Google SERP Simulator & Snippet Optimizer",
        operatingSystem: "All",
        applicationCategory: "SEOApplication",
        url: CANONICAL_URL,
        description:
          "Simulate authentic Google desktop and mobile search snippets in real time. Validate exact pixel boundaries client-side with canvas measurement.",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEO Tools",
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
            name: "SERP & Snippets",
            item: "https://omniseotools.com/#category-serp",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Google SERP Simulator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: SERP_FAQS.map((faq) => ({
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
      {/* Structured Data (JSON-LD Graph: WebApplication + BreadcrumbList + FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Breadcrumb & Hero Header */}
      <ToolHeader tool={serpPreviewTool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget (Dual-Mode: Gemini AI & Manual Preview) */}
        <section className="mt-4" aria-label="Interactive Google SERP Simulator">
          <ToolErrorBoundary
            toolSlug="google-serp-simulator"
            toolName="Google SERP Simulator & Snippet Optimizer"
          >
            <SerpPreviewTool />
          </ToolErrorBoundary>
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
