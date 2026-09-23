import React from "react";
import type { Metadata } from "next";
import { svgToDataUriTool } from "@/config/tools/technical/svg-to-data-uri";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { SvgToDataUriOptimizer } from "@/components/tools/technical/SvgToDataUriOptimizer";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/svg-to-data-uri";

export const metadata: Metadata = {
  title: "Free SVG to Base64 & CSS Data URI Optimizer | OmniSEO Tools",
  description:
    "Convert and minify raw SVG code into URL-encoded CSS data URIs, Base64 strings, and React JSX components. Eliminate HTTP roundtrips client-side.",
  keywords: [
    "svg to base64",
    "svg to data uri",
    "svg to css background",
    "svg data uri generator",
    "svg url encoder",
    "svg minifier",
    "svg to jsx",
    "css background svg generator",
    "inline svg optimizer",
    "lcp svg optimization",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free SVG to Base64 & CSS Data URI Optimizer | OmniSEO Tools",
    description:
      "Convert and minify raw SVG code into URL-encoded CSS data URIs, Base64 strings, and React JSX components. Eliminate HTTP roundtrips client-side.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SVG to Base64 & CSS Data URI Optimizer | OmniSEO Tools",
    description:
      "Convert and minify raw SVG code into URL-encoded CSS data URIs, Base64 strings, and React JSX components. Eliminate HTTP roundtrips client-side.",
  },
};

export default function SvgToDataUriPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools SVG to Base64 & CSS Data URI Optimizer",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Minify and encode SVG files into URL-encoded CSS background Data URIs, Base64 strings, and JSX components.",
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
            name: "SVG to Data URI Optimizer",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (svgToDataUriTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={svgToDataUriTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={svgToDataUriTool.slug}
            toolName={svgToDataUriTool.name}
          >
            <SvgToDataUriOptimizer
              toolSlug={svgToDataUriTool.slug}
              toolName={svgToDataUriTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={svgToDataUriTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={svgToDataUriTool.name}
          category={svgToDataUriTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={svgToDataUriTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={svgToDataUriTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
