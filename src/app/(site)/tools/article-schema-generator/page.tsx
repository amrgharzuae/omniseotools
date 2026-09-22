import React from "react";
import type { Metadata } from "next";
import { articleSchemaGeneratorTool } from "@/config/tools/technical/article-schema-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { ArticleSchemaGenerator } from "@/components/tools/technical/ArticleSchemaGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/article-schema-generator";

export const metadata: Metadata = {
  title: "Free Article & BlogPosting Schema Generator | OmniSEO Tools",
  description:
    "Generate Google-compliant Article, BlogPosting, and NewsArticle JSON-LD structured data with rich snippets, author E-E-A-T markup, and publisher validation.",
  keywords: [
    "article schema generator",
    "blogposting schema generator",
    "newsarticle json-ld",
    "schema.org article",
    "google rich results article",
    "e-e-a-t author schema",
    "json-ld structured data generator",
    "next.js article schema",
    "structured data article markup",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Article & BlogPosting Schema Generator | OmniSEO Tools",
    description:
      "Generate Google-compliant Article, BlogPosting, and NewsArticle JSON-LD structured data with rich snippets, author E-E-A-T markup, and publisher validation.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Article & BlogPosting Schema Generator | OmniSEO Tools",
    description:
      "Generate Google-compliant Article, BlogPosting, and NewsArticle JSON-LD structured data with rich snippets, author E-E-A-T markup, and publisher validation.",
  },
};

export default function ArticleSchemaGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Article & BlogPosting Schema Generator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate Google-compliant Article, BlogPosting, and NewsArticle JSON-LD structured data with author, publisher, and image aspect ratio support.",
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
            name: "Article & BlogPosting Schema Generator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (articleSchemaGeneratorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={articleSchemaGeneratorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive Article and BlogPosting Schema Generator">
          <ToolErrorBoundary
            toolSlug={articleSchemaGeneratorTool.slug}
            toolName={articleSchemaGeneratorTool.name}
          >
            <ArticleSchemaGenerator
              toolSlug={articleSchemaGeneratorTool.slug}
              toolName={articleSchemaGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Guide Section */}
        <ToolGuide tool={articleSchemaGeneratorTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={articleSchemaGeneratorTool.name}
          category={articleSchemaGeneratorTool.category}
        />

        {/* FAQ Section */}
        <ToolFAQ tool={articleSchemaGeneratorTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={articleSchemaGeneratorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
