import React from "react";
import type { Metadata } from "next";
import { resourceHintGeneratorTool } from "@/config/tools/technical/resource-hint-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { ResourceHintGenerator } from "@/components/tools/technical/ResourceHintGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/resource-hint-generator";

export const metadata: Metadata = {
  title: "Free Resource Hint & Preconnect Generator (Preload, DNS-Prefetch) | OmniSEO Tools",
  description:
    "Optimize Core Web Vitals (LCP, FCP) with browser resource hints. Generate and validate preload, preconnect, and dns-prefetch tags for Next.js, HTML, and HTTP headers.",
  keywords: [
    "resource hint generator",
    "preconnect generator",
    "preload generator",
    "dns-prefetch generator",
    "core web vitals resource hints",
    "lcp image preload",
    "google fonts preconnect",
    "next.js preload link",
    "http link headers preconnect",
    "modulepreload generator",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Resource Hint & Preconnect Generator (Preload, DNS-Prefetch) | OmniSEO Tools",
    description:
      "Optimize Core Web Vitals (LCP, FCP) with browser resource hints. Generate and validate preload, preconnect, and dns-prefetch tags for Next.js, HTML, and HTTP headers.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resource Hint & Preconnect Generator (Preload, DNS-Prefetch) | OmniSEO Tools",
    description:
      "Optimize Core Web Vitals (LCP, FCP) with browser resource hints. Generate and validate preload, preconnect, and dns-prefetch tags for Next.js, HTML, and HTTP headers.",
  },
};

export default function ResourceHintGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Resource Hint & Preconnect Generator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate and validate preload, preconnect, dns-prefetch, and prefetch tags for Next.js, HTML, and HTTP headers to optimize Core Web Vitals.",
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
            name: "Resource Hint & Preconnect Generator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (resourceHintGeneratorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={resourceHintGeneratorTool} />

      {/* 3. Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="mx-auto" />

        {/* Interactive Tool Widget with Error Boundary */}
        <ToolErrorBoundary
          toolSlug={resourceHintGeneratorTool.slug}
          toolName={resourceHintGeneratorTool.name}
        >
          <ResourceHintGenerator
            toolSlug={resourceHintGeneratorTool.slug}
            toolName={resourceHintGeneratorTool.name}
          />
        </ToolErrorBoundary>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="mx-auto" />

        {/* 4. Deep Technical SEO Guide */}
        <ToolGuide tool={resourceHintGeneratorTool} />

        {/* 5. Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={resourceHintGeneratorTool.name}
          category={resourceHintGeneratorTool.category}
        />

        {/* 6. Interactive FAQ Accordion */}
        <ToolFAQ tool={resourceHintGeneratorTool} />

        {/* 7. Related Tools Navigation */}
        <RelatedTools currentTool={resourceHintGeneratorTool} />
      </main>
    </div>
  );
}
