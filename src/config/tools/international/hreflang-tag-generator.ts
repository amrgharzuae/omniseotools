import { ToolDefinition } from "@/types/tool";

export const hreflangTagGeneratorTool: ToolDefinition = {
  id: "hreflang-tag-generator",
  slug: "hreflang-tag-generator",
  name: "Hreflang & i18n Matrix Generator",
  title: "Hreflang Tag Generator & XML i18n Cluster Builder | OmniSEO Tools",
  metaTitle: "Hreflang Tag Generator & XML i18n Cluster Builder | OmniSEO Tools",
  metaDescription:
    "Generate bi-directional hreflang HTML tags, Next.js metadata alternates, and XML Sitemap xhtml:link clusters. Validate ISO 639-1 language codes, ISO 3166-1 country codes, and x-default fallbacks with zero telemetry.",
  h1: "Hreflang & i18n Matrix Generator",
  tagline:
    "Construct compliant multi-lingual hreflang clusters, validate ISO 639-1/3166-1 codes, and export HTML head, XML Sitemap, and Next.js metadata tags.",
  shortDescription:
    "Build bi-directional hreflang clusters, validate ISO language/country codes, and export HTML, XML Sitemap, and Next.js alternates.",
  category: "international",
  icon: "Globe",
  badge: "Popular",
  featured: true,
  status: "active",
  keywords: [
    "hreflang tag generator",
    "hreflang generator",
    "international seo hreflang",
    "xml sitemap hreflang",
    "x default hreflang builder",
    "nextjs hreflang alternates",
    "hreflang validator",
    "i18n seo matrix",
  ],
  howToSteps: [
    {
      name: "Configure Language & Regional Targets",
      text: "Input each localized page URL and select corresponding ISO 639-1 language codes and ISO 3166-1 Alpha-2 region codes.",
    },
    {
      name: "Designate the x-default Fallback",
      text: "Mark your international homepage or language selector page as the 'x-default' fallback for unmatched geographic searchers.",
    },
    {
      name: "Audit Real-Time Compliance Findings",
      text: "Review automated diagnostics for missing return tags, duplicate locale mappings, and invalid country codes (e.g. GB instead of UK).",
    },
    {
      name: "Select Target Integration Format",
      text: "Switch between HTML <head> tags, XML Sitemap <xhtml:link> blocks, Next.js App Router metadata, and HTTP Link headers.",
    },
    {
      name: "Deploy Reciprocal Cluster Across All Pages",
      text: "Copy and paste the identical cluster tags across EVERY localized URL variation to satisfy Google's bidirectional indexing requirements.",
    },
  ],
  guideContent: {
    title: "Complete Guide to International SEO & Hreflang Implementation",
    sections: [
      {
        heading: "How Search Engines Process Hreflang & Multi-Regional Indexing",
        content:
          "<p>When a website serves localized content across multiple countries or languages (such as an English page for the US and an English page for the UK), search engines evaluate the content as potential duplicates. The <strong>hreflang attribute</strong> (<code>&lt;link rel=\"alternate\" hreflang=\"...\" href=\"...\" /&gt;</code>) instructs Google, Bing, and Yandex which localized URL to serve in search results based on the searcher's geographic IP and browser language preferences.</p><p>Hreflang prevents search cannibalization and ensures international visitors land on the correct currency, pricing, and translated language edition automatically.</p>",
        keyTakeaways: [
          "Hreflang tags must be strictly bidirectional: Page A must link to Page B, and Page B must link back to Page A.",
          "The x-default tag serves as the fallback for searchers whose language does not match any specified localized page.",
          "Use standard ISO 639-1 format for languages (e.g., 'de', 'ja') and ISO 3166-1 Alpha-2 for regions ('en-GB', 'en-AU').",
        ],
      },
      {
        heading: "HTML Head Tags vs. XML Sitemap Hreflang vs. HTTP Headers",
        content:
          "<p>Hreflang can be implemented via three supported methods depending on architecture scale:</p><ol><li><strong>HTML Head Tags:</strong> Simple to implement and inspect, optimal for websites with 2–5 language variations.</li><li><strong>XML Sitemap Annotations:</strong> Strongly recommended for enterprise sites and e-commerce stores with 10+ languages to avoid inflating HTML document sizes and page load latency.</li><li><strong>HTTP Response Headers:</strong> Mandatory for non-HTML files like localized PDF catalogues, whitepapers, and downloadable docs.</li></ol>",
        keyTakeaways: [
          "Always include self-referencing hreflang tags on each regional page.",
          "Never point hreflang tags to redirected (301) or broken (404) URLs.",
          "Include x-default fallback on all regional versions.",
        ],
      },
      {
        heading: "Common Hreflang Mistakes & How to Avoid Them",
        content:
          "<p>Search console errors often stem from subtle syntax errors:</p><ul><li><strong>Using 'en-UK' instead of 'en-GB':</strong> The ISO 3166-1 alpha-2 code for the United Kingdom is <code>GB</code>. <code>UK</code> is not recognized by Google.</li><li><strong>Using Region Without Language:</strong> Declaring <code>hreflang=\"us\"</code> is invalid. Language must always be present (e.g. <code>hreflang=\"en-US\"</code> or <code>hreflang=\"es-US\"</code>).</li><li><strong>Missing Reciprocal Links:</strong> If Page A links to Page B via hreflang, but Page B omits Page A, Google will ignore both annotations.</li></ul>",
        keyTakeaways: [
          "Always test hreflang clusters in staging environments prior to production indexing.",
          "Keep canonical tags pointing to self on each localized variation rather than pointing across languages.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the role of x-default in hreflang?",
      answer:
        "The x-default attribute tells search engines which URL to display when no explicit language or region matches the user's browser settings. It is typically configured for global language-selector landing pages, geo-redirecting roots, or international master editions.",
    },
    {
      question: "Why is 'en-UK' invalid according to ISO standards?",
      answer:
        "The ISO 3166-1 alpha-2 standard assigns 'GB' (Great Britain) to the United Kingdom, not 'UK'. Google, Bing, and Yandex strictly adhere to ISO 3166-1, so using 'en-UK' causes search engines to ignore the regional targeting rule.",
    },
    {
      question: "Does hreflang prevent duplicate content penalties between US and UK English?",
      answer:
        "Yes. When US and UK English pages have nearly identical copy with only minor currency or spelling differences (e.g. 'color' vs 'colour'), hreflang signals to Google that these pages are intentional international alternatives rather than scraped duplicate content.",
    },
    {
      question: "Why does Google Search Console report 'No return tags' for hreflang?",
      answer:
        "This error occurs when Page A declares an alternate link to Page B, but Page B fails to include a reciprocal alternate link back to Page A. Google enforces bidirectional confirmation across all URLs in an hreflang cluster to prevent third-party websites from falsely claiming localization relationships.",
    },
    {
      question: "How do I implement hreflang in Next.js App Router?",
      answer:
        "In Next.js App Router (app/[locale]/layout.tsx or page.tsx), export the alternates.languages object inside your metadata definition: export const metadata: Metadata = { alternates: { canonical: 'https://example.com/en-us/', languages: { 'en-US': 'https://example.com/en-us/', 'en-GB': 'https://example.com/en-gb/', 'x-default': 'https://example.com/' } } }.",
    },
  ],
};
