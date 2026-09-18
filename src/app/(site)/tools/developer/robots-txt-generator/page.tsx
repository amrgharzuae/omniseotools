import React from "react";
import type { Metadata } from "next";
import { robotsTxtGeneratorTool } from "@/config/tools/developer/robots-txt-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { RobotsGeneratorClient } from "./components/RobotsGeneratorClient";
import { ToolContent, ROBOTS_FAQS } from "./components/ToolContent";

const CANONICAL_URL = "https://www.omniseotools.com/tools/developer/robots-txt-generator";

export const metadata: Metadata = {
  title: "Free Robots.txt Generator & AI Bot Blocker (Next.js, WordPress) | OmniSEOtools",
  description:
    "Generate clean, valid robots.txt files in seconds. Includes 1-click AI crawler blocking (GPTBot, ClaudeBot, Perplexity), WordPress/Next.js presets, and dynamic sitemap integration.",
  keywords: [
    "robots txt generator",
    "block ai scrapers",
    "gptbot disallow",
    "claudebot robots.txt",
    "google-extended disallow",
    "wordpress robots.txt generator",
    "nextjs robots ts generator",
    "robots exclusion protocol",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free Robots.txt Generator & AI Bot Blocker (Next.js, WordPress) | OmniSEOtools",
    description:
      "Generate clean, valid robots.txt files in seconds. Includes 1-click AI crawler blocking (GPTBot, ClaudeBot, Perplexity), WordPress/Next.js presets, and dynamic sitemap integration.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Robots.txt Generator & AI Bot Blocker (Next.js, WordPress) | OmniSEOtools",
    description:
      "Generate clean, valid robots.txt files in seconds. Includes 1-click AI crawler blocking (GPTBot, ClaudeBot, Perplexity) and WordPress/Next.js presets.",
  },
};

export default function RobotsTxtGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "OmniSEOtools Robots.txt Generator & AI Bot Blocker",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Free online robots.txt file generator and validator with 1-click AI scraper blocking, CMS presets for WordPress and Next.js, and multi-sitemap directives.",
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
        mainEntity: ROBOTS_FAQS.map((faq) => ({
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
      <ToolHeader tool={robotsTxtGeneratorTool} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Robots.txt Builder Client */}
        <section className="mt-4" aria-label="Interactive Robots.txt Generator">
          <RobotsGeneratorClient />
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide, AI Bot Matrix & FAQ Accordion */}
        <ToolContent />

        {/* Related Internal Linking Mesh */}
        <RelatedTools currentTool={robotsTxtGeneratorTool} />

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
