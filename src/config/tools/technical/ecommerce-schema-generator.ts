import { ToolDefinition } from "@/types/tool";

export const ecommerceSchemaGeneratorTool: ToolDefinition = {
  id: "ecommerce-schema-generator",
  slug: "ecommerce-schema-generator",
  name: "E-Commerce Product Schema & Merchant Rich Result Builder",
  title: "E-Commerce Product Schema Builder | OmniSEO Tools",
  metaTitle: "E-Commerce Product Schema Builder | OmniSEO Tools",
  metaDescription:
    "Generate Google Merchant Center-compliant Product JSON-LD structured data. Includes shippingDetails, merchantReturnPolicy, aggregateRating, offers, and GTIN validation with zero telemetry.",
  h1: "E-Commerce Product Schema & Merchant Rich Result Builder",
  tagline:
    "Build 2026 Google Merchant-compliant Product JSON-LD with shippingDetails, return policies, aggregateRating, and GTIN verification.",
  shortDescription:
    "Generate Google Merchant-compliant Product JSON-LD structured data with shippingDetails, return policies, ratings, and GTIN codes.",
  category: "technical",
  icon: "ShoppingBag",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "ecommerce product schema generator",
    "google merchant product schema",
    "shippingdetails json-ld",
    "hasmerchantreturnpolicy schema",
    "aggregaterating product schema",
    "gtin13 product schema",
    "google rich results product",
    "shopify liquid product schema",
    "next.js product jsonld",
  ],
  howToSteps: [
    {
      name: "Configure Core Product Attributes",
      text: "Input product title, brand name, internal SKU, and global commercial identifiers (GTIN-13, GTIN-14, or MPN).",
    },
    {
      name: "Define Pricing & Stock Availability",
      text: "Specify transaction price, 3-letter currency code (ISO 4217), stock status (InStock/OutOfStock), and price validity expiration date.",
    },
    {
      name: "Attach Shipping & Delivery Specs",
      text: "Configure shipping rates, target destination country (ISO 3166-1), and handling/transit day estimates for Google Shopping delivery badges.",
    },
    {
      name: "Add Merchant Return Policy",
      text: "Declare return window duration (e.g. 30 days), return method (mail/store), and fee terms (FreeReturn) for SERP return trust badges.",
    },
    {
      name: "Export Multi-Framework Code Snippets",
      text: "Copy the validated JSON-LD <script> tag, Next.js App Router component, or Shopify Liquid template into your store theme.",
    },
  ],
  guideContent: {
    title: "Mastering Google Merchant Center & E-Commerce Product Schema (2026 Guidelines)",
    sections: [
      {
        heading: "How Structured Data Powers Google Shopping Free Listings & Rich Badges",
        content:
          "<p>In modern e-commerce search, Google crawls structured data directly from product landing pages to populate free organic listings across the <strong>Google Shopping tab</strong>, <strong>Google Images product badges</strong>, and <strong>Google Lens</strong> visual search results without requiring paid Google Ads campaigns.</p><p>By implementing valid <code>Product</code> and <code>Offer</code> JSON-LD markup with <code>shippingDetails</code> and <code>hasMerchantReturnPolicy</code>, storefronts unlock eye-catching SERP annotations including yellow review stars, 'In Stock' tags, 'Free 30-Day Returns' badges, and local delivery estimates.</p>",
        keyTakeaways: [
          "Product JSON-LD directly qualifies stores for Google Shopping free organic listings.",
          "Star ratings, shipping costs, and return badges dramatically boost organic Click-Through Rate (CTR).",
          "GTIN and MPN identifiers allow Google to match your offer against global merchant knowledge graphs.",
        ],
      },
      {
        heading: "2026 Google Search Central Requirements: Mandatory vs Recommended Properties",
        content:
          "<p>Google Search Central divides product structured data properties into two critical tiers:</p><ol><li><strong>Mandatory for Product Snippets:</strong><ul><li><code>name</code>: Full commercial product title without promotional keyword stuffing.</li><li><code>image</code>: Array of absolute high-resolution image URLs (minimum 1200px width).</li><li><code>offers.price</code>: Numeric decimal value (e.g. <code>189.00</code>) without currency symbols ($ or €).</li><li><code>offers.priceCurrency</code>: Standard 3-letter ISO 4217 currency code (e.g. <code>USD</code>, <code>EUR</code>, <code>AED</code>).</li></ul></li><li><strong>Required for Enhanced Merchant Center Listings:</strong><ul><li><code>shippingDetails</code>: Declares shipping rates and transit times to compute delivered total costs.</li><li><code>hasMerchantReturnPolicy</code>: Explicitly defines return windows, return shipping fees, and return methods.</li><li><code>gtin13</code> / <code>gtin14</code> / <code>mpn</code>: Universal commercial identifiers for automated product feed reconciliation.</li><li><code>aggregateRating</code>: Summary score (e.g. 4.9/5) and rating count derived from authentic customer reviews.</li></ul></li></ol>",
        keyTakeaways: [
          "Never include currency symbols ($, €, £) inside the numeric price field.",
          "Include shippingDetails and hasMerchantReturnPolicy to eliminate Google Search Console merchant warnings.",
          "Provide global GTIN barcodes to unlock Google Shopping knowledge graph matching.",
        ],
      },
      {
        heading: "Implementing Product Schema in Next.js App Router and Shopify",
        content:
          "<p>Different web architectures require tailored deployment strategies:</p><ul><li><strong>Next.js App Router:</strong> Inject the structured JSON-LD object within your Server Component layout or page template using <code>&lt;script type=\"application/ld+json\" dangerouslySetInnerHTML=&#123;&#123; __html: JSON.stringify(schema) &#125;&#125; /&gt;</code>. This ensures search engine crawlers parse the metadata on initial SSR HTML delivery with zero client-side JavaScript execution lag.</li><li><strong>Shopify Liquid:</strong> Map native Liquid object variables (<code>product.title</code>, <code>product.price | money_without_currency</code>, <code>product.featured_image</code>) into a modular Liquid snippet (<code>snippets/product-schema.liquid</code>) rendered inside <code>theme.liquid</code>.</li></ul>",
        keyTakeaways: [
          "Render JSON-LD server-side in Next.js to ensure immediate Googlebot indexation without hydration delays.",
          "Ensure Shopify Liquid snippets pull variant-specific barcodes and pricing dynamically.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Why does Google Search Console show 'Missing field shippingDetails' or 'hasMerchantReturnPolicy'?",
      answer:
        "Google introduced strict merchant listing requirements that treat shippingDetails and hasMerchantReturnPolicy as essential for enhanced shopping listings. While your product can still appear in basic search results without them, adding these properties unlocks delivered-cost calculations, delivery time estimates, and 'Free Returns' badges in Google Shopping.",
    },
    {
      question: "Can I use multiple GTIN variants in one Product schema?",
      answer:
        "For products with multiple variants (such as sizes or colors), Google recommends declaring each variant as an individual Product entity inside an isVariantOf group or listing multiple Offer objects with distinct SKU and GTIN codes inside the primary Product.",
    },
    {
      question: "How do I add merchant return policy and shipping details in Next.js?",
      answer:
        "In Next.js App Router (app/products/[slug]/page.tsx), create a strongly typed JSON-LD schema object including the offers.shippingDetails and offers.hasMerchantReturnPolicy objects, and inject it into the page JSX via a <script type='application/ld+json'> tag within the Server Component.",
    },
    {
      question: "How does aggregateRating impact e-commerce SEO conversion rates?",
      answer:
        "Adding authentic aggregateRating markup enables yellow review star snippets directly under your search result. Studies show that rich review stars can increase organic CTR by 20% to 35% by providing immediate social proof before shoppers click through.",
    },
  ],
};
