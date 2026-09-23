import React from "react";
import type { Metadata } from "next";
import { cspHeaderBuilderTool } from "@/config/tools/technical/csp-header-builder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { CspHeaderBuilder } from "@/components/tools/technical/CspHeaderBuilder";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/csp-header-builder";

export const metadata: Metadata = {
  title: "Free CSP & Security Header Builder (Next.js, Nginx, Vercel) | OmniSEO Tools",
  description:
    "Visually generate and harden Content Security Policy (CSP) directives and modern security headers. Export configurations for Next.js, Nginx, Vercel, and Cloudflare.",
  keywords: [
    "csp generator",
    "content security policy builder",
    "security headers generator",
    "csp header builder",
    "next.js security headers",
    "hsts header generator",
    "x-frame-options csp",
    "permissions-policy generator",
    "nginx csp header",
    "vercel security headers",
    "cloudflare csp headers",
    "content-security-policy-report-only",
    "strict-dynamic csp nextjs",
    "web security headers linter",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free CSP & Security Header Builder (Next.js, Nginx, Vercel) | OmniSEO Tools",
    description:
      "Visually generate and harden Content Security Policy (CSP) directives and modern security headers. Export configurations for Next.js, Nginx, Vercel, and Cloudflare.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CSP & Security Header Builder (Next.js, Nginx, Vercel) | OmniSEO Tools",
    description:
      "Visually generate and harden Content Security Policy (CSP) directives and modern security headers. Export configurations for Next.js, Nginx, Vercel, and Cloudflare.",
  },
};

export default function CspHeaderBuilderPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools Content Security Policy (CSP) & Header Builder",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate and validate robust Content Security Policies (CSP) and HTTP security headers for Next.js, Vercel, Cloudflare, and Nginx.",
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
            name: "Content Security Policy (CSP) & Header Builder",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (cspHeaderBuilderTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={cspHeaderBuilderTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={cspHeaderBuilderTool.slug}
            toolName={cspHeaderBuilderTool.name}
          >
            <CspHeaderBuilder
              toolSlug={cspHeaderBuilderTool.slug}
              toolName={cspHeaderBuilderTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={cspHeaderBuilderTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={cspHeaderBuilderTool.name}
          category={cspHeaderBuilderTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={cspHeaderBuilderTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={cspHeaderBuilderTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
