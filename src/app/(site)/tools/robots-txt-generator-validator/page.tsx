import React from "react";
import type { Metadata } from "next";
import { robotsTxtGeneratorValidatorTool } from "@/config/tools/technical/robots-txt-generator-validator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { RobotsTxtGeneratorValidator } from "@/components/tools/technical/RobotsTxtGeneratorValidator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/robots-txt-generator-validator";

export const metadata: Metadata = {
  title: "Free Robots.txt Generator & Validator | OmniSEO Tools",
  description:
    "Generate, test, and validate standard-compliant robots.txt files with live syntax checking, multi-user-agent rules, and sitemap directives.",
  keywords: [
    "robots.txt generator",
    "robots.txt validator",
    "robots txt syntax checker",
    "robots exclusion protocol",
    "googlebot disallow generator",
    "sitemap robots.txt",
    "crawl-delay validator",
    "omniseo-core robots",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Robots.txt Generator & Validator | OmniSEO Tools",
    description:
      "Generate, test, and validate standard-compliant robots.txt files with live syntax checking, multi-user-agent rules, and sitemap directives.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Robots.txt Generator & Validator | OmniSEO Tools",
    description:
      "Generate, test, and validate standard-compliant robots.txt files with live syntax checking, multi-user-agent rules, and sitemap directives.",
  },
};

export default function RobotsTxtGeneratorValidatorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Robots.txt Generator & Validator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate, test, and validate standard-compliant robots.txt files with live syntax checking, multi-user-agent rules, and sitemap directives.",
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
            name: "Robots.txt Generator & Validator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (robotsTxtGeneratorValidatorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={robotsTxtGeneratorValidatorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive Robots.txt Generator and Validator">
          <ToolErrorBoundary
            toolSlug={robotsTxtGeneratorValidatorTool.slug}
            toolName={robotsTxtGeneratorValidatorTool.name}
          >
            <RobotsTxtGeneratorValidator
              toolSlug={robotsTxtGeneratorValidatorTool.slug}
              toolName={robotsTxtGeneratorValidatorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Guide Section */}
        <ToolGuide tool={robotsTxtGeneratorValidatorTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={robotsTxtGeneratorValidatorTool.name}
          category={robotsTxtGeneratorValidatorTool.category}
        />

        {/* FAQ Section */}
        <ToolFAQ tool={robotsTxtGeneratorValidatorTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={robotsTxtGeneratorValidatorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
