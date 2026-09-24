import React from "react";
import type { Metadata } from "next";
import { idnPunycodeConverterTool } from "@/config/tools/developer/idn-punycode-converter";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { IdnPunycodeConverter } from "@/components/tools/developer/IdnPunycodeConverter";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/idn-punycode-converter";

export const metadata: Metadata = {
  title: "Free Unicode & Punycode (IDN) Converter & Homograph Detector | OmniSEO",
  description:
    "Convert Internationalized Domain Names (IDNs) with Arabic, Cyrillic, umlauts, or emojis into ASCII Punycode (xn--) and vice-versa. Includes DNS length and homograph security checks.",
  keywords: [
    "punycode converter",
    "idn converter",
    "unicode to punycode",
    "punycode to unicode",
    "idn punycode",
    "xn-- converter",
    "internationalized domain name",
    "arabic domain punycode",
    "emoji domain converter",
    "homograph attack detector",
    "dns label length checker",
    "rfc 3492 punycode",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Unicode & Punycode (IDN) Converter & Homograph Detector | OmniSEO",
    description:
      "Convert Internationalized Domain Names (IDNs) with Arabic, Cyrillic, umlauts, or emojis into ASCII Punycode (xn--) and vice-versa. Includes DNS length and homograph security checks.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Unicode & Punycode (IDN) Converter & Homograph Detector | OmniSEO",
    description:
      "Convert Internationalized Domain Names (IDNs) with Arabic, Cyrillic, umlauts, or emojis into ASCII Punycode (xn--) and vice-versa. Includes DNS length and homograph security checks.",
  },
};

export default function IdnPunycodeConverterPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Unicode & Punycode (IDN) Converter",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Convert Internationalized Domain Names (IDNs) with Arabic, Cyrillic, umlauts, or emojis into ASCII Punycode (xn--) and vice-versa. Includes DNS length and homograph security checks.",
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
            name: "Unicode & Punycode (IDN) Converter",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (idnPunycodeConverterTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={idnPunycodeConverterTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={idnPunycodeConverterTool.slug}
            toolName={idnPunycodeConverterTool.name}
          >
            <IdnPunycodeConverter
              toolSlug={idnPunycodeConverterTool.slug}
              toolName={idnPunycodeConverterTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={idnPunycodeConverterTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={idnPunycodeConverterTool.name}
          category={idnPunycodeConverterTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={idnPunycodeConverterTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={idnPunycodeConverterTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
