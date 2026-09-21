import { ToolDefinition } from "@/types/tool";
import { PlatformDefinition } from "@/types/platform";

export interface ToolSchemaParams {
  tool: ToolDefinition;
  platform?: PlatformDefinition;
  canonicalUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates Schema.org WebApplication structured data for a tool (standalone or platform-specific)
 */
export function generateToolSchema({
  tool,
  platform,
  canonicalUrl,
}: ToolSchemaParams): Record<string, any> {
  const toolName = platform
    ? `${tool.name} for ${platform.name}`
    : tool.title || tool.name;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolName,
    description: tool.metaDescription || tool.shortDescription,
    url: canonicalUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/**
 * Generates Schema.org FAQPage structured data from question-and-answer pairs
 */
export function generateFAQSchema(
  faqs?: FAQItem[]
): Record<string, any> | null {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface TechArticleSchemaParams {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    role?: string;
  };
  canonicalUrl: string;
  tags?: string[];
}

/**
 * Generates Schema.org TechArticle structured data for technical blog posts
 */
export function generateTechArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  canonicalUrl,
  tags,
}: TechArticleSchemaParams): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author?.name || "OmniSEO Engineering Team",
      ...(author?.role ? { jobTitle: author.role } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "OmniSEO Tools",
      url: "https://omniseotools.com",
      logo: {
        "@type": "ImageObject",
        url: "https://omniseotools.com/icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    ...(Array.isArray(tags) && tags.length > 0 ? { keywords: tags.join(", ") } : {}),
  };
}

/**
 * Generates Schema.org BreadcrumbList structured data with 1-based sequential positioning
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): Record<string, any> | null {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
