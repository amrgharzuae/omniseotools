import { ToolDefinition } from "@/types/tool";

export const schemaValidatorTool: ToolDefinition = {
  id: "schema-validator",
  slug: "schema-validator",
  name: "JSON-LD Schema Validator & Linter",
  title: "JSON-LD Schema Validator & Linter | Free Rich Snippet Checker",
  metaTitle: "JSON-LD Schema Validator & Linter | Free Rich Snippet Checker",
  metaDescription:
    "Validate, lint, and debug JSON-LD structured data client-side. Detect syntax errors, missing Schema.org required properties, and test Google Rich Snippet compliance with zero server tracking.",
  h1: "JSON-LD Schema Validator & Linter",
  tagline:
    "Validate, lint, and debug JSON-LD structured data client-side. Detect syntax errors, missing Schema.org required properties, and test Google Rich Snippet compliance.",
  shortDescription:
    "Validate, lint, and debug JSON-LD structured data client-side. Detect syntax errors and test Schema.org compliance.",
  category: "technical",
  icon: "CheckCircle2",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "json ld validator",
    "schema validator",
    "schema linter",
    "structured data testing tool",
    "schema org validator",
    "google rich snippets validator",
    "json-ld debugger",
    "article schema validator",
    "product schema validator",
    "faq schema validator",
    "breadcrumb schema validator",
  ],
  howToSteps: [
    {
      name: "Paste JSON-LD or HTML Script Tag",
      text: "Paste your raw JSON-LD object or complete <script type=\"application/ld+json\"> snippet into the editor.",
    },
    {
      name: "Inspect Live Syntax Diagnostics",
      text: "The linter instantly evaluates JSON syntax, @context declarations, and @type properties in real-time.",
    },
    {
      name: "Review Missing Property Warnings",
      text: "Check the itemized breakdown for critical rich snippet errors and recommended Google Search enhancements.",
    },
    {
      name: "Beautify and Copy Clean JSON",
      text: "Click 'Beautify' to auto-format your markup with clean 2-space indentation and copy the verified code directly to your clipboard.",
    },
  ],
  guideContent: {
    title: "Comprehensive Guide to JSON-LD Structured Data Validation & Rich Snippet Testing",
    sections: [
      {
        heading: "Why JSON-LD Schema Validation is Critical for Search Engine Visibility",
        content:
          "<p>Search engines like Google, Bing, and Yandex rely heavily on <strong>JSON-LD (JavaScript Object Notation for Linked Data)</strong> to interpret page meaning, author identity, product details, and multimedia assets. However, structured data is unforgiving: a single syntax error (such as an unescaped double quote or a trailing comma) causes search engine parsers to fail silently, invalidating the entire script block and stripping your site of Google Rich Results (star ratings, price tags, breadcrumb hierarchies, and FAQ accordions).</p><p>Testing your schema markup client-side before deployment provides key advantages:</p><ul><li><strong>Prevent Google Search Console Indexing Errors:</strong> Catch 'Unparseable structured data' and 'Missing required field' warnings before Googlebot crawls your URLs.</li><li><strong>Ensure Rich Snippet Qualification:</strong> Verify that Article, Product, FAQPage, HowTo, and BreadcrumbList schemas contain all mandatory properties for SERP enhancements.</li><li><strong>Zero Telemetry & 100% Privacy:</strong> Run extensive syntax checks and schema audits directly in your local browser without sending proprietary staging code or draft URLs to external analytics servers.</li></ul>",
        keyTakeaways: [
          "A single syntax error invalidates the entire JSON-LD script block.",
          "Client-side validation protects proprietary staging code from external leakage.",
          "Verifying mandatory properties guarantees eligibility for Google Rich Results.",
        ],
      },
      {
        heading: "Top 5 Most Common JSON-LD Structured Data Errors",
        content:
          "<p>During technical SEO audits, structured data errors typically fall into two categories: <strong>JSON formatting bugs</strong> and <strong>Schema.org specification violations</strong>.</p><ol><li><strong>Trailing Commas:</strong> Placing a comma after the final property in an object (e.g. <code>{\"name\": \"John\",}</code>) is valid in modern JavaScript but strictly forbidden by the JSON specification.</li><li><strong>Unescaped Quotation Marks:</strong> Including raw double quotes inside headlines or descriptions (e.g. <code>\"headline\": \"The \"Best\" SEO Guide\"</code>) breaks the JSON string parser. Use <code>\\\"</code> or single quotes instead.</li><li><strong>Missing @context or @type:</strong> Omitting <code>\"@context\": \"https://schema.org\"</code> or <code>\"@type\"</code> prevents search engines from connecting your attributes to the Schema.org vocabulary.</li><li><strong>Missing Offers on Product Schema:</strong> Google requires an <code>offers</code> object containing both numeric <code>price</code> and 3-letter <code>priceCurrency</code> for e-commerce search cards.</li><li><strong>Invalid Breadcrumb Position Indexing:</strong> BreadcrumbList requires 1-indexed sequential integers (1, 2, 3...) in <code>position</code> properties.</li></ol>",
        keyTakeaways: [
          "Never leave trailing commas before closing braces.",
          "Always escape internal double quotes with backslashes (\\\").",
          "Ensure nested entities like Offer and Author contain their required sub-properties.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between JSON-LD and Microdata?",
      answer:
        "JSON-LD is a standalone JavaScript object embedded inside a `<script type=\"application/ld+json\">` tag, completely separated from your HTML layout. Microdata and RDFa intertwine schema attributes directly into HTML DOM tags (such as `itemscope` and `itemprop`). Google strongly recommends JSON-LD because it is cleaner to maintain, faster to parse, and does not break when page styling or HTML templates change.",
    },
    {
      question: "Does Google require JSON-LD to be placed in the <head> or <body>?",
      answer:
        "Google Search supports JSON-LD structured data located anywhere within the HTML document—both in the `<head>` and within the `<body>`. However, placing JSON-LD in the `<head>` is considered the industry best practice because search engine crawlers encounter and parse structured data earlier in the initial network stream.",
    },
    {
      question: "Why does Google Search Console show 'Parsing error: Missing } or ]'?",
      answer:
        "This error indicates a raw JSON syntax failure—most commonly caused by an unescaped double quote inside a text property, an unclosed curly brace `{`, an unclosed array bracket `]`, or an illegal trailing comma. Pasting your code into our validator will highlight the exact line and position of the syntax mismatch.",
    },
    {
      question: "Can a webpage contain multiple JSON-LD script blocks or a @graph array?",
      answer:
        "Yes. A single webpage can contain multiple `<script type=\"application/ld+json\">` elements (for instance, one for WebSite schema, one for BreadcrumbList, and one for Article). Alternatively, you can combine all entities into a single `@graph` array under one `@context`: `{\"@context\": \"https://schema.org\", \"@graph\": [ {...}, {...} ]}`. Both methods are 100% valid and supported by Google.",
    },
    {
      question: "Is this JSON-LD Schema Validator completely free and client-side?",
      answer:
        "Yes, 100%. All JSON parsing, syntax linting, Schema.org compliance checks, and code formatting execute locally in your web browser using pure TypeScript. No schema data, draft articles, or product catalogs are ever transmitted to an external server.",
    },
  ],
};
