import React from "react";
import type { Metadata } from "next";
import { llmsTxtGeneratorTool } from "@/config/tools/technical/llms-txt-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { LlmsTxtGenerator } from "@/components/tools/technical/LlmsTxtGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/llms-txt-generator";

export const metadata: Metadata = {
  title: "Free LLMs.txt & AI Crawler Directive Generator | OmniSEO Tools",
  description:
    "Generate standard /llms.txt context files for AI search engines and configure granular robots.txt directives for GPTBot, ClaudeBot, Perplexity, and Google-Extended.",
  keywords: [
    "llms.txt generator",
    "llms txt generator",
    "ai crawler robots.txt",
    "gptbot robots.txt",
    "claudebot robots.txt",
    "perplexitybot robots.txt",
    "google-extended robots.txt",
    "ai search optimization",
    "llm context markdown",
    "llms full txt generator",
    "llms.txt next.js",
    "geo generative engine optimization",
    "generative ai seo",
    "chatgpt search robots.txt",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Free LLMs.txt & AI Crawler Directive Generator | OmniSEO Tools",
    description:
      "Generate standard /llms.txt context files for AI search engines and configure granular robots.txt directives for GPTBot, ClaudeBot, Perplexity, and Google-Extended.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free LLMs.txt & AI Crawler Directive Generator | OmniSEO Tools",
    description:
      "Generate standard /llms.txt context files for AI search engines and configure granular robots.txt directives for GPTBot, ClaudeBot, Perplexity, and Google-Extended.",
  },
};

export default function LlmsTxtGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools LLMs.txt & AI Crawler Directive Generator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Generate standard /llms.txt files and configure granular robots.txt AI bot directives for OpenAI, Claude, Google, and Perplexity.",
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
            name: "LLMs.txt & AI Crawler Directive Generator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: (llmsTxtGeneratorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={llmsTxtGeneratorTool} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Workspace */}
        <section className="mt-4" id="tool-interactive">
          <ToolErrorBoundary
            toolSlug={llmsTxtGeneratorTool.slug}
            toolName={llmsTxtGeneratorTool.name}
          >
            <LlmsTxtGenerator
              toolSlug={llmsTxtGeneratorTool.slug}
              toolName={llmsTxtGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Deep Technical Guide */}
        <ToolGuide tool={llmsTxtGeneratorTool} />

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={llmsTxtGeneratorTool.name}
          category={llmsTxtGeneratorTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={llmsTxtGeneratorTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={llmsTxtGeneratorTool} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
