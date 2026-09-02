import React from "react";
import { ToolDefinition } from "@/types/tool";
import { siteConfig } from "@/config/site";

interface StructuredDataProps {
  tool: ToolDefinition;
  url?: string;
}

export function StructuredData({ tool, url }: StructuredDataProps) {
  const toolUrl = url || siteConfig.url + "/tools/" + tool.slug;

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title || tool.name,
    url: toolUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.metaDescription || tool.shortDescription,
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
        name: tool.category.toUpperCase(),
        item: siteConfig.url + "/#category-" + tool.category,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: toolUrl,
      },
    ],
  };

  const faqSchema = tool.faqs && tool.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  const howToSchema = tool.howToSteps && tool.howToSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use " + tool.name,
    description: tool.shortDescription,
    step: tool.howToSteps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  } : null;

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
