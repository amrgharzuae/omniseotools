import { ToolDefinition } from "@/types/tool";

export const productSchemaGeneratorTool: ToolDefinition = {
  id: "product-schema-generator",
  slug: "product-schema-generator",
  name: "Product & Offer Schema Generator",
  title: "Free Product & Offer Schema Generator (JSON-LD) | OmniSEO Tools",
  metaTitle: "Free Product & Offer Schema Generator (JSON-LD) | OmniSEO Tools",
  metaDescription:
    "Generate Google-compliant Product and Offer JSON-LD schema markup with price, availability, ratings, and GTIN codes for higher search click-through rates.",
  h1: "Product & Offer Schema Generator",
  tagline:
    "Generate Google Rich Snippet-ready Product and Offer JSON-LD structured data with price, stock availability, aggregate ratings, shipping, and merchant identifiers.",
  shortDescription:
    "Generate Google Rich Snippet-ready Product and Offer JSON-LD structured data with price, stock status, ratings, and identifiers.",
  category: "technical",
  icon: "ShoppingBag",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "product schema generator",
    "offer schema generator",
    "schema.org product",
    "ecommerce json-ld generator",
    "google rich snippets product",
    "product structured data",
    "gtin schema generator",
    "aggregaterating schema",
    "merchant center schema",
    "next.js product schema",
  ],
  howToSteps: [
    {
      name: "Enter Core Product Details",
      text: "Provide your product title, description, brand name, and high-resolution product image URLs (minimum 1200px recommended).",
    },
    {
      name: "Add Identifiers & GTIN Codes",
      text: "Input unique commercial identifiers such as SKU, GTIN-13/EAN, GTIN-8, UPC, or MPN to qualify for Google Merchant Center free listings.",
    },
    {
      name: "Configure Pricing & Offer Availability",
      text: "Specify price, currency (USD, EUR, GBP, AED, etc.), stock status (InStock, OutOfStock, PreOrder), item condition, and price expiration date.",
    },
    {
      name: "Attach Aggregate Ratings & Shipping Rules",
      text: "Optionally include star rating score, review count, shipping handling/transit times, and return policy details for Google shopping rich badges.",
    },
    {
      name: "Copy or Validate JSON-LD Markup",
      text: "Copy the formatted JSON-LD script or Next.js App Router code snippet, or test directly in Google's Rich Results Test tool.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Guide to Product & Offer Schema Markup for E-Commerce SEO",
    sections: [
      {
        heading: "Why Product & Offer Schema is Crucial for E-Commerce Organic Traffic",
        content:
          "<p>In modern e-commerce search, ranking #1 is no longer enough to dominate user attention. Search Engine Results Pages (SERPs) prioritize visually enhanced listings known as <strong>Google Rich Results</strong>. Adding valid <code>Product</code> and <code>Offer</code> JSON-LD structured data enables search engines to display star ratings, real-time pricing, stock availability badges ('In Stock'), price drop alerts, and delivery estimates directly within search snippets.</p><p>Key commercial benefits include:</p><ul><li><strong>Up to 35% Higher Click-Through Rates (CTR):</strong> Visual star ratings and price badges create trust before the user clicks, filtering out unqualified shoppers and attracting high-intent buyers.</li><li><strong>Eligibility for Google Merchant Center Free Listings:</strong> Google Search uses structured data to populate the 'Shopping' tab, Google Images product tags, and Google Lens visual shopping features without requiring paid Google Ads campaigns.</li><li><strong>Price Drop Alerts:</strong> When you maintain updated pricing schema, Google can automatically notify returning users and Chrome mobile users about price reductions on tracked items.</li></ul>",
        keyTakeaways: [
          "Product schema triggers star ratings, price tags, and in-stock badges on Google SERPs.",
          "Proper markup qualifies your catalog for Google Shopping free organic listings.",
          "Rich snippets filter low-intent traffic and increase organic e-commerce conversion rates.",
        ],
      },
      {
        heading: "Google Search Central 2026 Requirements: Mandatory vs. Recommended Fields",
        content:
          "<p>Google Search Central divides Product structured data properties into two critical tiers: <strong>Mandatory (Required for Rich Snippets)</strong> and <strong>Recommended (Required for Enhanced Merchant Listings)</strong>.</p><ol><li><strong>Mandatory Properties:</strong><ul><li><code>name</code>: The full commercial title of the product. Avoid promotional keyword stuffing like 'CHEAP SALE 50% OFF'.</li><li><code>image</code>: An absolute URL or array of high-resolution images (minimum 1200px width with 16:9, 4:3, or 1:1 aspect ratios).</li><li><code>offers.price</code>: The numeric transaction price using standard decimal notation (e.g. <code>299.99</code>). Do not include currency symbols ($ or €) in the price string.</li><li><code>offers.priceCurrency</code>: The 3-letter ISO 4217 currency code (e.g., <code>USD</code>, <code>EUR</code>, <code>GBP</code>, <code>AED</code>).</li></ul></li><li><strong>Recommended Properties:</strong><ul><li><code>sku</code> & <code>gtin13</code> / <code>gtin8</code> / <code>gtin12</code>: Universal identifiers that allow Google to match your offer against global merchant knowledge graphs.</li><li><code>brand</code>: An object of type <code>Brand</code> or <code>Organization</code> defining the product manufacturer.</li><li><code>offers.availability</code>: Standard Schema.org status URIs such as <code>https://schema.org/InStock</code> or <code>https://schema.org/OutOfStock</code>.</li><li><code>aggregateRating</code>: Summary score (e.g. 4.8 out of 5) and rating count derived from genuine customer reviews.</li><li><code>hasMerchantReturnPolicy</code> & <code>shippingDetails</code>: Explicit shipping costs and return windows required for enhanced Google Shopping badges.</li></ul></li></ol>",
        keyTakeaways: [
          "Mandatory fields: name, image, offers.price, offers.priceCurrency.",
          "Never put currency symbols ($, €) inside the numeric price value.",
          "Provide global GTIN / UPC / SKU identifiers to unlock Google Merchant knowledge graph matching.",
        ],
      },
      {
        heading: "Understanding AggregateRating vs. Individual Review Markup",
        content:
          "<p>Search engines treat customer sentiment data with strict verification rules. Schema.org differentiates between cumulative ratings and individual customer feedback:</p><ul><li><strong>AggregateRating:</strong> Represents the mathematical average of multiple customer reviews (e.g., a score of <code>4.8</code> across <code>1,420</code> verified ratings). Google requires both <code>ratingValue</code> and at least one of <code>ratingCount</code> or <code>reviewCount</code>. The <code>bestRating</code> (default 5) and <code>worstRating</code> (default 1) should be explicitly declared if non-standard 10-point or 100-point scales are used.</li><li><strong>Review:</strong> Represents a single standalone review written by a specific named person or organization. When including individual reviews inside a Product schema, each review must contain <code>author</code>, <code>datePublished</code>, and <code>reviewRating</code>.</li></ul><p><strong>Warning on Self-Serving Reviews:</strong> Google guidelines prohibit generating fake reviews or displaying aggregate ratings for items that cannot be independently purchased or verified. Always ensure your review markup reflects authentic user submissions collected on your store or verified review platforms (Trustpilot, Yotpo, Reviews.io).</p>",
        keyTakeaways: [
          "AggregateRating requires ratingValue and either ratingCount or reviewCount.",
          "Always ensure review scores reflect verified customer submissions.",
          "Include merchant return and shipping policies for maximum SERP feature real estate.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between Product schema and Offer schema?",
      answer:
        "The Product schema defines the physical or digital item itself (its name, description, brand, dimensions, and global GTIN/SKU identifiers). The Offer schema is nested inside the Product and describes the commercial terms of sale (the price, currency, availability, seller, shipping costs, and return policies). A single product can contain multiple offers from different vendors or for different bundle variations.",
    },
    {
      question: "How do I get Google star ratings to appear under my search result?",
      answer:
        "To earn star rating rich snippets on Google SERPs, include the AggregateRating property inside your Product JSON-LD schema with a valid ratingValue (e.g., 4.8), bestRating (5), worstRating (1), and a ratingCount or reviewCount representing real customer feedback. Once deployed and crawled, Google's rich result algorithms will evaluate your domain eligibility.",
    },
    {
      question: "Are GTIN, UPC, or MPN codes strictly required for Product schema?",
      answer:
        "While a product schema can be valid with just a name, image, and price, providing global trade identifiers (GTIN-13, GTIN-8, UPC, or MPN) is strongly recommended by Google. GTINs allow Google to accurately match your product against its global shopping knowledge graph, unlocking enhanced Merchant Center listings, price comparison boxes, and Google Lens visual search results.",
    },
    {
      question: "What values should I use for schema.org offer availability?",
      answer:
        "You must use standard Schema.org availability URIs: 'https://schema.org/InStock' for items ready to ship, 'https://schema.org/OutOfStock' for unavailable items, 'https://schema.org/PreOrder' for upcoming releases, 'https://schema.org/BackOrder' for items awaiting supplier replenishment, and 'https://schema.org/Discontinued' for end-of-life products.",
    },
    {
      question: "How do I add shipping details and return policy schema?",
      answer:
        "Google supports the shippingDetails and hasMerchantReturnPolicy properties nested within the Offer object. You can specify shipping fees, destination countries, delivery handling times, and return windows (e.g. 30-day money-back guarantee with free returns). Adding these properties qualifies your store for rich 'Free shipping' and 'Free 30-day returns' badges in Google Search and Shopping.",
    },
    {
      question: "Is this Product Schema Generator completely free and private?",
      answer:
        "Yes, 100%. All JSON-LD generation, linting, validation, and Next.js code formatting run entirely in your local web browser. No product information, pricing, or catalog data is ever transmitted to or stored on external servers.",
    },
  ],
};
