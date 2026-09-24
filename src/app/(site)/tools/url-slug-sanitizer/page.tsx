import React from "react";
import type { Metadata } from "next";
import { urlSlugSanitizerTool } from "@/config/tools/content/url-slug-sanitizer";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { UrlSlugSanitizer } from "@/components/tools/content/UrlSlugSanitizer";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/url-slug-sanitizer";

export const metadata: Metadata = {
  title: "Bulk URL Slug & Anchor Text Sanitizer | OmniSEO",
  description:
    "Transform messy article titles, product names, and headline lists into clean, SEO-friendly URL slugs and anchor text with automated stop-word removal, diacritic transliteration, and length caps.",
  keywords: [
    "bulk url slug generator",
    "url slug sanitizer",
    "seo friendly slug maker",
    "anchor text generator",
    "diacritic transliterator slug",
    "remove stop words from url",
    "clean url generator",
    "markdown link builder",
    "html anchor tag generator",
    "product title to url slug",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bulk URL Slug & Anchor Text Sanitizer | OmniSEO",
    description:
      "Transform messy article titles, product names, and headline lists into clean, SEO-friendly URL slugs and anchor text with automated stop-word removal, diacritic transliteration, and length caps.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk URL Slug & Anchor Text Sanitizer | OmniSEO",
    description:
      "Transform messy article titles, product names, and headline lists into clean, SEO-friendly URL slugs and anchor text with automated stop-word removal, diacritic transliteration, and length caps.",
  },
};

export default function UrlSlugSanitizerPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Bulk URL Slug & Anchor Text Sanitizer",
        operatingSystem: "All",
        applicationCategory: "BusinessApplication",
        url: CANONICAL_URL,
        description:
          "Transform messy article titles, product names, and headline lists into clean, SEO-friendly URL slugs and anchor text with automated stop-word removal, diacritic transliteration, and length caps.",
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
            name: "Bulk URL Slug Sanitizer",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (urlSlugSanitizerTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={urlSlugSanitizerTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={urlSlugSanitizerTool.slug}
            toolName={urlSlugSanitizerTool.name}
          >
            <UrlSlugSanitizer
              toolSlug={urlSlugSanitizerTool.slug}
              toolName={urlSlugSanitizerTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={urlSlugSanitizerTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={urlSlugSanitizerTool.name}
          category={urlSlugSanitizerTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={urlSlugSanitizerTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={urlSlugSanitizerTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
