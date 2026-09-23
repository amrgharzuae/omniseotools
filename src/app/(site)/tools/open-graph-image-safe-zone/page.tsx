import React from "react";
import type { Metadata } from "next";
import { ogImageSafeZoneTool } from "@/config/tools/social/open-graph-image-safe-zone";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { OgImageSafeZonePreviewer } from "@/components/tools/social/OgImageSafeZonePreviewer";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/open-graph-image-safe-zone";

export const metadata: Metadata = {
  title: "Free OG & Twitter Card Image Safe-Zone Previewer | OmniSEO Tools",
  description:
    "Preview how your social sharing images look on Facebook and Twitter. Use our safe-zone grid to ensure key content is visible and optimally cropped across platforms.",
  keywords: [
    "open graph safe zone",
    "twitter card image crop",
    "og image previewer",
    "social media image safe area",
    "1200x630 safe zone",
    "linkedin image crop tool",
    "facebook og image preview",
    "social image cropper",
    "og image dimensions checker",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free OG & Twitter Card Image Safe-Zone Previewer | OmniSEO Tools",
    description:
      "Preview how your social sharing images look on Facebook and Twitter. Use our safe-zone grid to ensure key content is visible and optimally cropped across platforms.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free OG & Twitter Card Image Safe-Zone Previewer | OmniSEO Tools",
    description:
      "Preview how your social sharing images look on Facebook and Twitter. Use our safe-zone grid to ensure key content is visible and optimally cropped across platforms.",
  },
};

export default function OgImageSafeZonePage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools OG & Twitter Card Image Safe-Zone Previewer",
        operatingSystem: "All",
        applicationCategory: "DesignApplication",
        url: CANONICAL_URL,
        description:
          "Preview how your social sharing images look on Facebook and Twitter. Use our safe-zone grid to ensure key content is visible and optimally cropped across platforms.",
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
            name: "Social Media",
            item: "https://omniseotools.com/#category-social",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "OG & Twitter Card Image Safe-Zone Previewer",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (ogImageSafeZoneTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={ogImageSafeZoneTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive OG and Twitter Card Image Safe-Zone Previewer">
          <ToolErrorBoundary
            toolSlug={ogImageSafeZoneTool.slug}
            toolName={ogImageSafeZoneTool.name}
          >
            <OgImageSafeZonePreviewer
              toolSlug={ogImageSafeZoneTool.slug}
              toolName={ogImageSafeZoneTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Guide Section */}
        <ToolGuide tool={ogImageSafeZoneTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={ogImageSafeZoneTool.name}
          category={ogImageSafeZoneTool.category}
        />

        {/* FAQ Section */}
        <ToolFAQ tool={ogImageSafeZoneTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={ogImageSafeZoneTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
