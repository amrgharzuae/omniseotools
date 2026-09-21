import { ToolDefinition } from "@/types/tool";

export const hreflangTagsGeneratorTool: ToolDefinition = {
  id: "hreflang-tags-generator",
  slug: "hreflang-tags-generator",
  name: "Hreflang & Multi-Language Tag Generator",
  title: "Hreflang & Multi-Language Tag Generator | OmniSEO",
  metaTitle: "Hreflang & Multi-Language Tag Generator | OmniSEO",
  metaDescription: "Generate and validate compliant HTML hreflang link tags, XML sitemap blocks, and HTTP headers with x-default fallback support.",
  h1: "Hreflang & Multi-Language Tag Generator",
  tagline: "Generate and validate compliant HTML hreflang link tags, XML sitemap blocks, and HTTP headers with x-default fallback support.",
  shortDescription: "Generate and validate compliant HTML hreflang link tags, XML sitemap blocks, and HTTP headers with x-default fallback support.",
  category: "international",
  icon: "Globe",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "hreflang generator",
    "hreflang tags generator",
    "multi language seo tags",
    "international seo hreflang",
    "x default hreflang builder",
    "hreflang link tag creator"
  ],
  presetSchema: [
    {
      id: "defaultUrl",
      label: "Default Global URL (x-default fallback)",
      type: "text",
      defaultValue: "https://example.com/",
      placeholder: "https://example.com/"
    },
    {
      id: "enUrl",
      label: "English Edition URL (en / en-US)",
      type: "text",
      defaultValue: "https://example.com/en/",
      placeholder: "https://example.com/en/"
    },
    {
      id: "esUrl",
      label: "Spanish Edition URL (es / es-ES)",
      type: "text",
      defaultValue: "https://example.com/es/",
      placeholder: "https://example.com/es/"
    },
    {
      id: "frUrl",
      label: "French Edition URL (fr / fr-FR)",
      type: "text",
      defaultValue: "https://example.com/fr/",
      placeholder: "https://example.com/fr/"
    }
  ],
  samplePresets: [
    {
      name: "Global Brand (EN, ES, FR)",
      values: {
        defaultUrl: "https://brand.com/",
        enUrl: "https://brand.com/en/",
        esUrl: "https://brand.com/es/",
        frUrl: "https://brand.com/fr/"
      }
    },
    {
      name: "Regional Store (US, UK, CA)",
      values: {
        defaultUrl: "https://store.com/",
        enUrl: "https://store.com/us/",
        esUrl: "https://store.com/uk/",
        frUrl: "https://store.com/ca/"
      }
    }
  ],
  defaultValues: {
    defaultUrl: "https://example.com/",
    enUrl: "https://example.com/en/",
    esUrl: "https://example.com/es/",
    frUrl: "https://example.com/fr/"
  },
  howToSteps: [
    {
      name: "Define Global Default URL",
      text: "Provide your master domain or language selector landing page URL for the x-default attribute."
    },
    {
      name: "Assign Language & Country Codes",
      text: "Map each translated page version using ISO 639-1 language codes (e.g. 'en', 'es', 'fr') and optional ISO 3166-1 country codes."
    },
    {
      name: "Verify Bidirectional Links",
      text: "Ensure every language variant page includes reciprocal links pointing back to all other sister versions."
    },
    {
      name: "Implement in Head, Sitemap or HTTP Header",
      text: "Paste the generated HTML link tags, XML sitemap annotations, or HTTP Link headers into your application."
    }
  ],
  editorialGuide: {
    title: "Mastering Hreflang Tags, Multi-Regional SEO & Language Clustering",
    sections: [
      {
        heading: "How Hreflang Solves International Content Duplication",
        content: "<p>When a website serves localized content across multiple countries or languages (such as an English page for the US and an English page for the UK), search engines might view these pages as duplicate content. The <strong>hreflang attribute</strong> (<code>&lt;link rel=\"alternate\" hreflang=\"...\" href=\"...\" /&gt;</code>) tells Google, Bing, and Yandex which localized URL to display to users based on their browser language and geographic IP.</p><p>Hreflang prevents search cannibalization and ensures international visitors land on the correct currency, pricing, and translated language edition automatically.</p>",
        keyTakeaways: [
          "Hreflang tags must be strictly bidirectional: Page A must link to Page B, and Page B must link back to Page A.",
          "The x-default tag serves as the fallback for searchers whose language does not match any specified localized page.",
          "Use standard ISO 639-1 format for languages (e.g., 'de', 'ja') and ISO 3166-1 Alpha-2 for regions ('en-GB', 'en-AU')."
        ]
      },
      {
        heading: "HTML Head Tags vs. XML Sitemap Hreflang vs. HTTP Headers",
        content: "<p>Hreflang can be implemented via three supported methods:</p><ol><li><strong>HTML Head Tags:</strong> Simple to implement and inspect, optimal for sites with 2–5 language variations.</li><li><strong>XML Sitemap Annotations:</strong> Recommended for large enterprise sites with 10+ languages to avoid inflating HTML document sizes.</li><li><strong>HTTP Headers:</strong> Used for non-HTML files like localized PDF downloads.</li></ol>",
        keyTakeaways: [
          "Always include self-referencing hreflang tags on each regional page.",
          "Never point hreflang tags to redirected (301) or broken (404) URLs.",
          "Include x-default fallback on all regional versions."
        ]
      }
    ]
  },
  faqs: [
    {
      question: "What is the x-default hreflang attribute?",
      answer: "The x-default value tells search engines which page to show when no specific language or region matches the user's settings. It is typically set to the global homepage or an interactive country selector page."
    },
    {
      question: "Why does Google Search Console report 'No return tags' for hreflang?",
      answer: "This error occurs when Page A links to Page B via hreflang, but Page B fails to include a reciprocal link back to Page A. Google requires complete bidirectional confirmation across all pages in the cluster."
    },
    {
      question: "Can I use country codes without a language code in hreflang?",
      answer: "No. The language code is always mandatory in ISO 639-1 format. You cannot specify a country code alone (e.g. hreflang=\"uk\" is invalid; it must be hreflang=\"en-GB\")."
    },
    {
      question: "How do I implement hreflang in Next.js?",
      answer: "In Next.js App Router, specify the alternates.languages object inside your metadata export: alternates: { languages: { 'en-US': '/en', 'es-ES': '/es', 'x-default': '/' } }."
    }
  ]
};
