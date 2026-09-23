import React from "react";
import type { Metadata } from "next";
import { productSchemaGeneratorTool } from "@/config/tools/technical/product-schema-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { ProductSchemaGenerator } from "@/components/tools/technical/ProductSchemaGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/product-schema-generator";

export const metadata: Metadata = {
  title: "Free Product & Offer Schema Generator (JSON-LD) | OmniSEO Tools",
  description:
    "Generate Google-compliant Product and Offer JSON-LD schema markup with price, availability, ratings, and GTIN codes for higher search click-through rates.",
  keywords: [
    "product schema generator",
    "offer schema generator",
    "schema.org product",
    "ecommerce json-ld generator",
    "google rich snippets product",
    "product structured data",
    "gtin schema generator",
    "aggregaterating schema",
    "merchant center schema",
    "next.js product schema",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Product & Offer Schema Generator (JSON-LD) | OmniSEO Tools",
    description:
      "Generate Google-compliant Product and Offer JSON-LD schema markup with price, availability, ratings, and GTIN codes for higher search click-through rates.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Product & Offer Schema Generator (JSON-LD) | OmniSEO Tools",
    description:
      "Generate Google-compliant Product and Offer JSON-LD schema markup with price, availability, ratings, and GTIN codes for higher search click-through rates.",
  },
};

export default function ProductSchemaGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Product & Offer Schema Generator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate Google Rich Snippet-ready Product and Offer JSON-LD structured data with price, stock availability, ratings, and GTIN identifiers.",
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
            name: "Product & Offer Schema Generator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (productSchemaGeneratorTool.faqs || []).map((faq) => ({
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 1. Injected Structured Data (WebApplication + BreadcrumbList + FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* 2. Tool Page Header */}
      <ToolHeader tool={productSchemaGeneratorTool} />

      {/* 3. Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="mx-auto" />

        {/* Interactive Tool Widget with Error Boundary */}
        <ToolErrorBoundary
          toolSlug={productSchemaGeneratorTool.slug}
          toolName={productSchemaGeneratorTool.name}
        >
          <ProductSchemaGenerator
            toolSlug={productSchemaGeneratorTool.slug}
            toolName={productSchemaGeneratorTool.name}
          />
        </ToolErrorBoundary>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="mx-auto" />

        {/* 4. Deep Technical SEO Guide */}
        <ToolGuide tool={productSchemaGeneratorTool} />

        {/* 5. Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={productSchemaGeneratorTool.name}
          category={productSchemaGeneratorTool.category}
        />

        {/* 6. Interactive FAQ Accordion */}
        <ToolFAQ tool={productSchemaGeneratorTool} />

        {/* 7. Related Tools Navigation */}
        <RelatedTools currentTool={productSchemaGeneratorTool} />
      </main>
    </div>
  );
}
