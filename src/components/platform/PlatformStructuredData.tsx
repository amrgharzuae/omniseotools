import React from "react";
import { ToolDefinition } from "@/types/tool";
import { PlatformDefinition, PlatformToolSEOData } from "@/types/platform";
import { siteConfig } from "@/config/site";

interface PlatformStructuredDataProps {
  tool: ToolDefinition;
  platform: PlatformDefinition;
  content: PlatformToolSEOData;
  url: string;
}

export function PlatformStructuredData({
  tool,
  platform,
  content,
  url,
}: PlatformStructuredDataProps) {
  const toolUrl = url;

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${tool.name} for ${platform.name}`,
    url: toolUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: content.metaDescription,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Platforms",
        item: `${siteConfig.url}/platforms`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: platform.name,
        item: `${siteConfig.url}/platforms/${platform.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.name,
        item: `${siteConfig.url}/tools/${tool.slug}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: `${tool.name} for ${platform.name}`,
        item: toolUrl,
      },
    ],
  };

  const faqSchema =
    content.faqs && content.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const howToSchema =
    content.steps && content.steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to implement ${tool.name} in ${platform.name}`,
          description: content.metaDescription,
          step: content.steps.map((step, idx) => ({
            "@type": "HowToStep",
            position: idx + 1,
            name: step.name,
            text: step.text,
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
    </>
  );
}
