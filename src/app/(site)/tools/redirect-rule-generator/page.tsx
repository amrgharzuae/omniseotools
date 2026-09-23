import React from "react";
import type { Metadata } from "next";
import { redirectRuleGeneratorTool } from "@/config/tools/technical/redirect-rule-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { RedirectRuleGenerator } from "@/components/tools/technical/RedirectRuleGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/redirect-rule-generator";

export const metadata: Metadata = {
  title: "Free Redirect Rule & Regex Mapper (Next.js, Nginx, Apache) | OmniSEO Tools",
  description:
    "Create, test, and export 301 and 302 redirect rules with live regex matching. Export clean configuration snippets for Next.js, Nginx, Apache, and Cloudflare.",
  keywords: [
    "redirect rule generator",
    "regex redirect mapper",
    "htaccess redirect generator",
    "nginx rewrite generator",
    "nextjs redirect generator",
    "301 redirect tester",
    "regex path tester",
    "cloudflare bulk redirect",
    "301 vs 302 redirect",
    "url redirect mapper",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Redirect Rule & Regex Mapper (Next.js, Nginx, Apache) | OmniSEO Tools",
    description:
      "Create, test, and export 301 and 302 redirect rules with live regex matching. Export clean configuration snippets for Next.js, Nginx, Apache, and Cloudflare.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Redirect Rule & Regex Mapper (Next.js, Nginx, Apache) | OmniSEO Tools",
    description:
      "Create, test, and export 301 and 302 redirect rules with live regex matching. Export clean configuration snippets for Next.js, Nginx, Apache, and Cloudflare.",
  },
};

export default function RedirectRuleGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Redirect Rule & Regex Mapper",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Create, test, and export 301 and 302 redirect rules with live regex matching and multi-server config export.",
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
            name: "Redirect Rule & Regex Mapper",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (redirectRuleGeneratorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={redirectRuleGeneratorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive Redirect Rule and Regex Mapper">
          <ToolErrorBoundary
            toolSlug={redirectRuleGeneratorTool.slug}
            toolName={redirectRuleGeneratorTool.name}
          >
            <RedirectRuleGenerator
              toolSlug={redirectRuleGeneratorTool.slug}
              toolName={redirectRuleGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Technical Guide Section */}
        <ToolGuide tool={redirectRuleGeneratorTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={redirectRuleGeneratorTool.name}
          category={redirectRuleGeneratorTool.category}
        />

        {/* FAQ Section */}
        <ToolFAQ tool={redirectRuleGeneratorTool} />

        {/* Related Tools Internal Linking Mesh */}
        <RelatedTools currentTool={redirectRuleGeneratorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
