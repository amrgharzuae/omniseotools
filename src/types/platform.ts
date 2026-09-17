export type PlatformSlug =
  | "nextjs"
  | "shopify"
  | "wordpress"
  | "webflow"
  | "squarespace"
  | "wix"
  | "ghost"
  | "tailwind";

export interface PlatformFAQItem {
  question: string;
  answer: string;
}

export interface PlatformStep {
  name: string;
  text: string;
}

export interface PlatformSnippetInfo {
  code: string;
  language: string;
  filename: string;
  description: string;
}

export interface PlatformAffiliateSlot {
  badge: string;         // e.g. "Recommended Partner"
  title: string;         // e.g. "Shopify Merchant Accelerator"
  description: string;   // Short helper text
  ctaText: string;       // e.g. "Claim Partner Offer →"
  targetUrl?: string;    // Defaults to "#" or placeholder link
  isPlaceholder?: boolean;
}

export interface PlatformDefinition {
  slug: PlatformSlug;
  name: string;
  shortName?: string;
  badge: string;
  category: string;
  tagline: string;
  description: string;
  defaultSnippet: string;
  snippetLanguage: string;
  snippetFilename: string;
  howItWorks: string;
  bestPractices: string[];
  setupSteps: PlatformStep[];
  defaultFaqs: PlatformFAQItem[];
  affiliateSlot?: PlatformAffiliateSlot;
}

export interface PlatformToolSEOData {
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  snippet: PlatformSnippetInfo;
  guideTitle: string;
  howItWorks: string;
  steps: PlatformStep[];
  bestPractices: string[];
  faqs: PlatformFAQItem[];
}
