import React from "react";
import type { Metadata } from "next";
import { urlSlugGeneratorTool } from "@/config/tools/seo/url-slug-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { SlugGeneratorClient } from "./components/SlugGeneratorClient";
import { ToolContent, SLUG_FAQS } from "./components/ToolContent";

const CANONICAL_URL = "https://www.omniseotools.com/tools/seo/url-slug-generator";

export const metadata: Metadata = {
  title: "Free SEO URL Slug Generator & Bulk Permalink Maker | OmniSEOtools",
  description:
    "Convert article titles and product names into clean, SEO-friendly URL slugs. Features bulk conversion, stop-word removal, accent transliteration, and prefix presets.",
  keywords: [
    "seo slug generator",
    "url permalink cleaner",
    "bulk slug generator",
    "remove stop words url",
    "clean url generator",
    "accent transliteration slug",
    "url slug creator",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free SEO URL Slug Generator & Bulk Permalink Maker | OmniSEOtools",
    description:
      "Convert article titles and product names into clean, SEO-friendly URL slugs. Features bulk conversion, stop-word removal, accent transliteration, and prefix presets.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SEO URL Slug Generator & Bulk Permalink Maker | OmniSEOtools",
    description:
      "Convert article titles and product names into clean, SEO-friendly URL slugs with bulk batch mode and stop-word filtering.",
  },
};

export default function UrlSlugGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "OmniSEOtools SEO URL Slug & Bulk Permalink Generator",
        operatingSystem: "All",
        applicationCategory: "UtilitiesApplication",
        url: CANONICAL_URL,
        description:
          "Free online SEO slugifier and batch permalink generator with live typing conversion, stop-word removal, diacritics transliteration, and CSV export.",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEOTools",
          url: "https://www.omniseotools.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: SLUG_FAQS.map((faq) => ({
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
      <ToolHeader tool={urlSlugGeneratorTool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Slug Generator Widget */}
        <section className="mt-4" aria-label="Interactive SEO URL Slug Generator">
          <SlugGeneratorClient />
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide, Delimiter Matrix & FAQ Accordion */}
        <ToolContent />

        {/* Related Internal Linking Mesh */}
        <RelatedTools currentTool={urlSlugGeneratorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
