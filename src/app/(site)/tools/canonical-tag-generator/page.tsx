import React from "react";
import type { Metadata } from "next";
import { canonicalTagGeneratorTool } from "@/config/tools/technical/canonical-tag-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { CanonicalTagGenerator } from "@/components/tools/technical/CanonicalTagGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/canonical-tag-generator";

export const metadata: Metadata = {
  title: "Bulk Canonical URL Normalizer & SEO Auditor | OmniSEO Tools",
  description:
    "Clean tracking parameters, enforce lowercase paths, standardize trailing slashes, and audit URLs in bulk with our 100% client-side canonical tool.",
  keywords: [
    "bulk canonical normalizer",
    "canonical tag auditor",
    "canonical url normalizer",
    "bulk url audit",
    "utm stripper canonical",
    "trailing slash normalizer",
    "duplicate content fix",
    "nextjs alternates canonical",
    "http link canonical header",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk Canonical URL Normalizer & SEO Auditor | OmniSEO Tools",
    description:
      "Clean tracking parameters, enforce lowercase paths, standardize trailing slashes, and audit URLs in bulk with our 100% client-side canonical tool.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Canonical URL Normalizer & SEO Auditor | OmniSEO Tools",
    description:
      "Clean tracking parameters, enforce lowercase paths, standardize trailing slashes, and audit URLs in bulk with our 100% client-side canonical tool.",
  },
};

export default function CanonicalTagGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk Canonical Normalizer & Auditor",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Clean tracking parameters, enforce lowercase paths, standardize trailing slashes, and audit URLs in bulk with our 100% client-side canonical tool.",
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
            name: "Technical SEO",
            item: "https://omniseotools.com/#category-technical",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Bulk Canonical Normalizer & Auditor",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (canonicalTagGeneratorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={canonicalTagGeneratorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive Canonical Tag Generator and Auditor">
          <ToolErrorBoundary
            toolSlug={canonicalTagGeneratorTool.slug}
            toolName={canonicalTagGeneratorTool.name}
          >
            <CanonicalTagGenerator
              toolSlug={canonicalTagGeneratorTool.slug}
              toolName={canonicalTagGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Guide Section */}
        <ToolGuide tool={canonicalTagGeneratorTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={canonicalTagGeneratorTool.name}
          category={canonicalTagGeneratorTool.category}
        />

        {/* FAQ Section */}
        <ToolFAQ tool={canonicalTagGeneratorTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={canonicalTagGeneratorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
