export interface SchemaPlatformFaq {
  question: string;
  answer: string;
}

export interface SchemaPlatformHowToStep {
  name: string;
  text: string;
}

export interface SchemaPlatformConfig {
  slug: "shopify" | "wordpress" | "nextjs";
  name: string;
  shortName: string;
  cmsName: string;
  title: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  targetCmsQuirk: string;
  coreH2: string;
  directAnswer: string;
  educationalContent: string;
  presetJsonLd: string;
  dynamicSnippet?: string;
  howToSteps: SchemaPlatformHowToStep[];
  faqs: SchemaPlatformFaq[];
}

export const SCHEMA_PLATFORMS: SchemaPlatformConfig[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify (Liquid & Online Store 2.0)",
    shortName: "Shopify",
    cmsName: "Shopify Liquid & OS 2.0",
    title: "Shopify JSON-LD Schema Validator & Microdata Linter | OmniSEO Tools",
    metaDescription:
      "Validate and debug Shopify product structured data. Identify duplicate Microdata vs JSON-LD collisions, missing Offer priceCurrency properties, and fix Google Search Console Merchant Center errors.",
    h1: "Shopify JSON-LD Schema Validator & Microdata Linter",
    tagline:
      "Audit and validate Shopify product structured data, resolve Microdata vs JSON-LD collisions, and verify Google Merchant Center rich result compliance.",
    targetCmsQuirk:
      "Theme Liquid templates injecting legacy microdata alongside automated JSON-LD apps, causing duplicate Product entities with conflicting price/availability data.",
    coreH2: "Resolving Duplicate Product Schema & Microdata Collisions in Shopify",
    directAnswer:
      "Shopify stores frequently encounter 'duplicate Product entity' warnings in Google Search Console because vintage themes (and unoptimized Online Store 2.0 templates) contain legacy inline Microdata HTML attributes (itemscope itemtype='http://schema.org/Product' and itemprop='price') inside main-product.liquid, while modern SEO apps or JSON-LD snippets inject standalone <script type='application/ld+json'> tags. This duality creates two conflicting entity representations for the same product, confusing Googlebot with mismatched prices, availability states, or variant SKUs. To eliminate GSC errors, audit your theme files to purge legacy HTML microdata attributes and consolidate structured data into a single, validated JSON-LD Liquid snippet.",
    educationalContent: `
      <p>Shopify e-commerce stores rely heavily on rich snippet search features (such as star ratings, price indicators, in-stock badges, and merchant shipping details) to drive organic click-through rates. However, technical debt in Liquid theme architectures frequently leads to conflicting schema implementations.</p>

      <h3>1. The Microdata vs. JSON-LD Collision Problem</h3>
      <p>In older Shopify themes (such as Debut, Brooklyn, or unmigrated custom themes), product data was marked up using inline HTML Microdata attributes:</p>
      <pre><code>&lt;!-- DEPRECATED INLINE MICRODATA (Causes duplicate collisions) --&gt;
&lt;div itemscope itemtype="http://schema.org/Product"&gt;
  &lt;h1 itemprop="name"&gt;{{ product.title }}&lt;/h1&gt;
  &lt;div itemprop="offers" itemscope itemtype="http://schema.org/Offer"&gt;
    &lt;span itemprop="price"&gt;{{ product.price | money_without_currency }}&lt;/span&gt;
    &lt;span itemprop="priceCurrency"&gt;{{ cart.currency.iso_code }}&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

      <p>When store owners install modern review apps (Judge.me, Loox, Yotpo) or dedicated schema apps, those apps output a modern <code>&lt;script type="application/ld+json"&gt;</code> payload. Googlebot discovers <strong>two separate Product entities</strong> on the exact same page, often with conflicting aggregate ratings or variant pricing. Google Search Console flags this as a data conflict and drops Rich Result badge eligibility.</p>

      <h3>2. Production-Grade Shopify Liquid JSON-LD Snippet</h3>
      <p>The standard solution is to strip all <code>itemscope</code> and <code>itemprop</code> tags from your Liquid theme files and create a dedicated <code>snippets/structured-data-product.liquid</code> template:</p>
      <pre><code>&lt;!-- snippets/structured-data-product.liquid --&gt;
&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ product.title | json }},
  "image": [
    {% for image in product.images limit: 3 %}
      {{ image.src | image_url: width: 1200 | prepend: "https:" | json }}{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  "description": {{ product.description | strip_html | truncatewords: 40 | json }},
  "sku": {{ product.selected_or_first_available_variant.sku | default: product.id | json }},
  "brand": {
    "@type": "Brand",
    "name": {{ product.vendor | default: shop.name | json }}
  },
  "offers": {
    "@type": "Offer",
    "url": "{{ shop.url }}{{ product.url }}",
    "priceCurrency": {{ cart.currency.iso_code | json }},
    "price": {{ product.selected_or_first_available_variant.price | money_without_currency | remove: ',' | json }},
    "priceValidUntil": "{{ 'now' | date: '%s' | plus: 31536000 | date: '%Y-%m-%d' }}",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "{% if product.selected_or_first_available_variant.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
    "seller": {
      "@type": "Organization",
      "name": {{ shop.name | json }}
    }
  }
}
&lt;/script&gt;</code></pre>

      <h3>3. Google Merchant Center 2026 Compliance</h3>
      <p>Google's merchant guidelines recommend adding <code>hasMerchantReturnPolicy</code> and <code>shippingDetails</code> to your Offer schema. Without these properties, Google Search Console logs non-critical merchant listing warnings. Adding these blocks directly into your Shopify Liquid JSON-LD snippet guarantees full compliance with Google Shopping organic search cards.</p>
    `,
    presetJsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Merino Wool Thermal Crewneck",
  "image": [
    "https://cdn.shopify.com/s/files/1/0000/0001/products/merino-crewneck-front.jpg",
    "https://cdn.shopify.com/s/files/1/0000/0001/products/merino-crewneck-back.jpg"
  ],
  "description": "100% ultrafine Australian Merino wool crewneck sweater with moisture-wicking and thermal temperature regulation.",
  "sku": "MW-CREW-BLK-M",
  "mpn": "MW9002-BLK",
  "gtin13": "9312345678901",
  "brand": {
    "@type": "Brand",
    "name": "Alpine Goods Co."
  },
  "offers": {
    "@type": "Offer",
    "url": "https://yourstore.myshopify.com/products/merino-wool-crewneck",
    "priceCurrency": "USD",
    "price": "128.00",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Alpine Goods Co."
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0.00",
        "currency": "USD"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "US"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "d"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 2,
          "maxValue": 5,
          "unitCode": "d"
        }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "142"
  }
}
</script>`,
    dynamicSnippet: `<!-- Shopify snippets/structured-data-product.liquid -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ product.title | json }},
  "image": [
    {% for image in product.images limit: 3 %}
      {{ image.src | image_url: width: 1200 | prepend: "https:" | json }}{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ],
  "description": {{ product.description | strip_html | truncatewords: 40 | json }},
  "sku": {{ product.selected_or_first_available_variant.sku | default: product.id | json }},
  "brand": {
    "@type": "Brand",
    "name": {{ product.vendor | default: shop.name | json }}
  },
  "offers": {
    "@type": "Offer",
    "url": "{{ shop.url }}{{ product.url }}",
    "priceCurrency": {{ cart.currency.iso_code | json }},
    "price": {{ product.selected_or_first_available_variant.price | money_without_currency | remove: ',' | json }},
    "priceValidUntil": "{{ 'now' | date: '%s' | plus: 31536000 | date: '%Y-%m-%d' }}",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "{% if product.selected_or_first_available_variant.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}",
    "seller": {
      "@type": "Organization",
      "name": {{ shop.name | json }}
    }
  }
}
</script>`,
    howToSteps: [
      {
        name: "Inspect Theme for Legacy Microdata",
        text: "Scan `sections/main-product.liquid` or `snippets/product-template.liquid` in your Shopify theme code editor for `itemscope`, `itemtype='http://schema.org/Product'`, and `itemprop` attributes.",
      },
      {
        name: "Purge Inline HTML Microdata Tags",
        text: "Remove the legacy microdata attributes from HTML tags to prevent duplicate entity declarations in Googlebot's DOM parser.",
      },
      {
        name: "Create snippets/structured-data-product.liquid",
        text: "Add a single consolidated JSON-LD snippet outputting standard Schema.org Product markup with dynamic Liquid variables (`{{ product.title | json }}`, `{{ product.price | money_without_currency }}`).",
      },
      {
        name: "Render Snippet in layout/theme.liquid",
        text: "Include `{% if template contains 'product' %}{% render 'structured-data-product' %}{% endif %}` inside the `<head>` of `layout/theme.liquid`.",
      },
      {
        name: "Validate in OmniSEO Schema Validator",
        text: "Copy the rendered source code of your product page into our validator to confirm zero syntax errors and full Merchant Center compliance.",
      },
    ],
    faqs: [
      {
        question: "Why does Google flag 'Missing field hasMerchantReturnPolicy' in Shopify?",
        answer:
          "Google Merchant Center in 2026 recommends merchant return policies and shipping schedules within Offer structured data. Without these, GSC flags non-critical warnings. You can nest `hasMerchantReturnPolicy` and `shippingDetails` directly in your Liquid product JSON-LD snippet to qualify for rich merchant badges.",
      },
      {
        question: "Why does Google Search Console show two Product schemas on Shopify product pages?",
        answer:
          "This happens when your active theme has legacy inline Microdata tags (`itemprop='price'`, `itemtype='http://schema.org/Product'`) in `main-product.liquid` or `product-template.liquid`, while an SEO app (like Judge.me, Loox, or JSON-LD for SEO) injects a separate `<script type='application/ld+json'>`. Stripping the HTML microdata tags consolidates the schema into one clean entity.",
      },
      {
        question: "How do I handle multi-currency pricing in Shopify JSON-LD structured data?",
        answer:
          "Use Shopify Liquid's `cart.currency.iso_code` or `localization.country.currency.iso_code` to dynamically populate `priceCurrency: {{ cart.currency.iso_code | json }}` and `price: {{ product.selected_or_first_available_variant.price | money_without_currency | json }}` to ensure the schema price strictly matches the visible storefront currency.",
      },
    ],
  },

  // 2. WordPress
  {
    slug: "wordpress",
    name: "WordPress (Yoast, RankMath & WooCommerce)",
    shortName: "WordPress",
    cmsName: "WordPress & WooCommerce",
    title: "WordPress JSON-LD Schema Validator (Yoast & RankMath) | OmniSEO Tools",
    metaDescription:
      "Audit and validate WordPress structured data. Resolve graph collisions between Yoast SEO, RankMath, and WooCommerce, and fix unescaped quote parsing errors in wp_head.",
    h1: "WordPress JSON-LD Schema Validator & Graph Linter",
    tagline:
      "Audit WordPress structured data, resolve disjointed @graph node collisions between Yoast SEO, RankMath, and WooCommerce, and eliminate unescaped string parsing errors.",
    targetCmsQuirk:
      "Competing plugins rendering separate @graph arrays in wp_head, resulting in disconnected WebSite, Organization, and Article nodes that Google fails to resolve.",
    coreH2: "Debugging @graph Node Collisions in WordPress Schema",
    directAnswer:
      "WordPress relies on the wp_head action hook to output structured data. When multiple SEO, review, and e-commerce plugins (such as Yoast SEO, Rank Math, Schema Pro, and WooCommerce) are active concurrently, they frequently output separate, non-communicating @graph JSON-LD blocks with conflicting or duplicate @id node references. Google Search favors a single unified @graph where the Article node references the Organization publisher and Author person node via consistent URI anchors (e.g. #organization, #author). When plugins conflict or unescaped quotes in post excerpts break JSON serialization, Google Search Console flags syntax errors and demotes Rich Snippet eligibility.",
    educationalContent: `
      <p>WordPress is the most widely deployed CMS in the world, with millions of sites using plugins like Yoast SEO, Rank Math, All in One SEO (AIOSEO), and WooCommerce to generate structured data. However, the modular nature of WordPress often creates fragmented, conflicting schema graphs.</p>

      <h3>1. The Architecture of WordPress @graph Structured Data</h3>
      <p>Modern WordPress SEO plugins organize structured data into an interconnected <code>@graph</code> array. Instead of treating the webpage as isolated pieces of data, the graph links entities together using URI hash anchors:</p>
      <ul>
        <li><strong>Organization Node (<code>#organization</code>):</strong> Declares the publishing company, brand name, and logo.</li>
        <li><strong>WebSite Node (<code>#website</code>):</strong> Declares the root domain and site search query templates.</li>
        <li><strong>Person / Author Node (<code>#author</code>):</strong> Identifies the author for Google E-E-A-T verification.</li>
        <li><strong>Article / BlogPosting Node:</strong> References <code>"publisher": { "@id": "#organization" }</code> and <code>"author": { "@id": "#author" }</code>.</li>
      </ul>

      <h3>2. Resolving WooCommerce vs. SEO Plugin Graph Duplication</h3>
      <p>By default, WooCommerce core outputs its own basic Product schema on product pages. When an SEO plugin (like Rank Math Pro or Yoast WooCommerce SEO) is active, both plugins output separate <code>Product</code> entities, creating duplicate price/review signals.</p>
      <p>To disable WooCommerce's default core schema and let your SEO plugin output a single unified graph, add this filter to your child theme's <code>functions.php</code>:</p>
      <pre><code>// Disable default WooCommerce core structured data
add_filter( 'woocommerce_structured_data_product', '__return_empty_array' );
add_filter( 'woocommerce_structured_data_review', '__return_empty_array' );</code></pre>

      <h3>3. Fixing Unescaped Quote Parse Errors in WordPress</h3>
      <p>A frequent cause of 'Parsing error: Missing } or ]' in Google Search Console is unescaped double quotes inside post titles, excerpts, or custom field values. Always ensure schema strings are sanitized via <code>wp_strip_all_tags()</code> and serialized with <code>wp_json_encode()</code> rather than raw string interpolation.</p>
    `,
    presetJsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "WP Tech Journal",
      "url": "https://example.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://example.com/#logo",
        "url": "https://example.com/wp-content/uploads/2026/01/logo.png",
        "width": 600,
        "height": 60
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com",
      "name": "WP Tech Journal",
      "publisher": {
        "@id": "https://example.com/#organization"
      }
    },
    {
      "@type": "Person",
      "@id": "https://example.com/#author-sarah",
      "name": "Sarah Jenkins",
      "url": "https://example.com/author/sarah",
      "jobTitle": "Lead WordPress Architect"
    },
    {
      "@type": "BlogPosting",
      "@id": "https://example.com/debugging-wordpress-schema/#article",
      "isPartOf": {
        "@id": "https://example.com/#website"
      },
      "headline": "Debugging @graph Node Collisions in WordPress Structured Data",
      "description": "Comprehensive guide to resolving schema conflicts between Yoast SEO, Rank Math, and WooCommerce.",
      "datePublished": "2026-09-28T09:00:00+00:00",
      "dateModified": "2026-09-29T14:00:00+00:00",
      "mainEntityOfPage": "https://example.com/debugging-wordpress-schema",
      "author": {
        "@id": "https://example.com/#author-sarah"
      },
      "publisher": {
        "@id": "https://example.com/#organization"
      },
      "image": "https://example.com/wp-content/uploads/2026/09/schema-debugging-hero.jpg"
    }
  ]
}
</script>`,
    dynamicSnippet: `// Add to your WordPress theme's functions.php to disable default WooCommerce schema
add_action( 'init', function() {
    // Prevent WooCommerce core from injecting duplicate Product & Review schema
    add_filter( 'woocommerce_structured_data_product', '__return_empty_array' );
    add_filter( 'woocommerce_structured_data_review', '__return_empty_array' );
});`,
    howToSteps: [
      {
        name: "Audit Active Schema Plugins",
        text: "Inspect your `wp_head` source code to verify whether WooCommerce, Yoast SEO, Rank Math, and review plugins are outputting competing schema blocks.",
      },
      {
        name: "Disable WooCommerce Core Redundancy",
        text: "Add `add_filter('woocommerce_structured_data_product', '__return_empty_array');` to your child theme `functions.php` to let your primary SEO plugin manage product schema.",
      },
      {
        name: "Sanitize Excerpts & Titles with wp_json_encode",
        text: "Ensure custom theme schema hooks utilize `wp_strip_all_tags()` and `wp_json_encode()` to prevent unescaped quotation marks from breaking JSON syntax.",
      },
      {
        name: "Verify Interconnected @id Anchors",
        text: "Confirm that Article nodes link to `#organization` and `#author` entities within the unified `@graph` array rather than emitting detached, orphan nodes.",
      },
      {
        name: "Test Rendered Output in OmniSEO Validator",
        text: "Copy the complete `<script type='application/ld+json'>` block from your rendered page source into our validator to confirm error-free graph resolution.",
      },
    ],
    faqs: [
      {
        question: "How do I disable WooCommerce default schema to use RankMath or Yoast?",
        answer:
          "Add `add_filter( 'woocommerce_structured_data_product', '__return_empty_array' );` to your theme's `functions.php` or a custom code snippet. This prevents WooCommerce core from injecting duplicate Product schema, allowing Rank Math or Yoast to output a single unified `@graph` node.",
      },
      {
        question: "Why does Google Search Console report 'Parsing error: Missing } or ]' on WordPress?",
        answer:
          "This is usually caused by unescaped quotation marks or raw HTML entities inside post titles, descriptions, or shortcode attributes injected into `wp_head`. Ensure your schema generators pass strings through `wp_strip_all_tags()` and `wp_json_encode()` instead of manual string concatenation.",
      },
      {
        question: "What is the advantage of WordPress @graph structured data over separate script tags?",
        answer:
          "An interconnected `@graph` links `WebSite`, `Organization`, `Author`, and `Article` entities via unique `@id` URIs (e.g. `https://domain.com/#organization`). This allows Google's Knowledge Graph to understand that the article was authored by a specific person and published by a verified entity in a single parse pass.",
      },
    ],
  },

  // 3. Next.js
  {
    slug: "nextjs",
    name: "Next.js App Router",
    shortName: "Next.js",
    cmsName: "Next.js 14/15 App Router",
    title: "Next.js JSON-LD Schema Validator & Script Linter | OmniSEO Tools",
    metaDescription:
      "Lint and validate dynamic JSON-LD injection in Next.js App Router. Debug dangerouslySetInnerHTML script tags, resolve hydration syntax warnings, and test TypeScript schema types.",
    h1: "Next.js JSON-LD Schema Validator & Script Linter",
    tagline:
      "Validate and debug JSON-LD structured data in Next.js App Router. Test dangerouslySetInnerHTML script tags, eliminate hydration mismatch warnings, and verify type-safe schemas.",
    targetCmsQuirk:
      "XSS sanitization issues with raw stringified JSON inside dangerouslySetInnerHTML, and unbalanced curly braces causing hydration bailouts or Googlebot parsing errors.",
    coreH2: "Best Practices for Injecting Type-Safe JSON-LD in Next.js Server Components",
    directAnswer:
      "In Next.js App Router (Next.js 14 & 15), structured data is injected into Server Component pages or layouts using standard <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> tags. Common pitfalls include trying to use the Next.js Metadata API for JSON-LD (which is only designed for head meta tags, not script elements), double-encoding quotes, unescaped forward slashes or HTML entities, and runtime serialization errors when schema objects contain undefined functions or cyclical references. Validating the compiled JSON output ensures zero hydration mismatches and 100% Google Rich Result compliance.",
    educationalContent: `
      <p>Next.js App Router provides powerful built-in metadata helpers through the <code>Metadata</code> object and <code>generateMetadata()</code> function. However, the official Next.js Metadata API does not support injecting arbitrary <code>&lt;script type="application/ld+json"&gt;</code> elements into the HTML document head.</p>

      <h3>1. Why Next.js generateMetadata Does Not Support JSON-LD</h3>
      <p>The <code>Metadata</code> interface in Next.js is strictly typed to support standard Open Graph, Twitter Cards, canonical links, and viewport tags. To inject JSON-LD structured data in App Router, the official Next.js documentation recommends placing a <code>&lt;script type="application/ld+json"&gt;</code> element directly inside your Server Component (<code>page.tsx</code> or <code>layout.tsx</code>):</p>
      <pre><code>// app/page.tsx (Next.js Server Component)
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OmniSEO Tools',
    url: 'https://omniseotools.com',
  };

  return (
    &lt;section&gt;
      &lt;!-- React / Next.js structured data injection --&gt;
      &lt;script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/&lt;/g, '\\\\u003c'),
        }}
      /&gt;
      &lt;h1&gt;Page Content&lt;/h1&gt;
    &lt;/section&gt;
  );
}</code></pre>

      <h3>2. Preventing XSS & Escaping HTML Angle Brackets</h3>
      <p>When serializing dynamic database content or user-generated inputs into JSON-LD, raw stringified JSON can contain closing <code>&lt;/script&gt;</code> sequences that cause browsers to prematurely terminate script execution (enabling XSS attacks). Always sanitize stringified JSON by escaping angle brackets:</p>
      <pre><code>// Safe JSON serialization helper:
function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/&lt;/g, '\\\\u003c');
}</code></pre>

      <h3>3. Type Safety with schema-dts in TypeScript</h3>
      <p>To eliminate typos in Schema.org properties (like misspelling <code>priceCurrency</code> as <code>currency</code>), install the <code>schema-dts</code> library for strict TypeScript autocompletion and compile-time type validation.</p>
    `,
    presetJsonLd: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "OmniSEO Tools",
  "url": "https://omniseotools.com",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "OmniSEO Tools",
    "url": "https://omniseotools.com"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://omniseotools.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Technical SEO",
        "item": "https://omniseotools.com/#category-technical"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "JSON-LD Schema Validator",
        "item": "https://omniseotools.com/tools/schema-validator"
      }
    ]
  }
}
</script>`,
    dynamicSnippet: `// app/tools/schema-validator/page.tsx (Next.js App Router Server Component)
import React from 'react';
import type { Metadata } from 'next';
import type { WebApplication, WithContext } from 'schema-dts';

export const metadata: Metadata = {
  title: 'Next.js JSON-LD Schema Validator | OmniSEO Tools',
  description: 'Validate and lint JSON-LD structured data client-side in Next.js.',
};

export default function Page() {
  const jsonLd: WithContext<WebApplication> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'OmniSEO Tools',
    url: 'https://omniseotools.com',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  };

  return (
    <section>
      {/* Inject Structured Data via Server Component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <h1>Next.js Schema Validator</h1>
    </section>
  );
}`,
    howToSteps: [
      {
        name: "Define Schema Object in Server Component",
        text: "Construct your structured data object in `page.tsx` or `layout.tsx` using type-safe interfaces or `schema-dts`.",
      },
      {
        name: "Render <script type='application/ld+json'> in JSX",
        text: "Render the script tag directly inside the JSX return statement with `dangerouslySetInnerHTML`.",
      },
      {
        name: "Sanitize Output with replace(/</g, '\\u003c')",
        text: "Prevent XSS and syntax breakages by escaping angle brackets: `JSON.stringify(schema).replace(/</g, '\\u003c')`.",
      },
      {
        name: "Avoid Dynamic Client-Only Values",
        text: "Never inject `window.location.href` or non-deterministic client state inside the initial SSR render to prevent hydration mismatch errors.",
      },
      {
        name: "Validate Compiled Output in OmniSEO Validator",
        text: "Paste the rendered HTML from `View Source` into OmniSEO Schema Validator to confirm that Googlebot can parse the object without syntax faults.",
      },
    ],
    faqs: [
      {
        question: "Can I use the Next.js Metadata API (generateMetadata) for JSON-LD structured data?",
        answer:
          "No. The Next.js `Metadata` object and `generateMetadata()` function are strictly designed for `<meta>` tags, `<title>`, `<link rel='canonical'>`, and Open Graph descriptors. JSON-LD structured data must be rendered as a `<script type='application/ld+json'>` element inside your Server Component `page.tsx` or `layout.tsx`.",
      },
      {
        question: "How do I prevent XSS when using dangerouslySetInnerHTML for JSON-LD in Next.js?",
        answer:
          "Ensure data serialized via `JSON.stringify()` has sensitive user inputs sanitized, or replace `<` with `\\u003c` via a simple helper: `JSON.stringify(schema).replace(/</g, '\\u003c')`. Because Server Components render on the server, static JSON-LD payloads generated from trusted database/CMS fields are safe.",
      },
      {
        question: "Why do hydration mismatch warnings occur when injecting JSON-LD in Next.js?",
        answer:
          "Hydration mismatches occur if dynamic fields (like `new Date().toISOString()` or window dimensions) evaluate to different values on the server versus the client during hydration. Always compute dates and URLs deterministically inside Server Components before passing to `<script type='application/ld+json'>`.",
      },
    ],
  },
];

export function getSchemaPlatformBySlug(slug: string): SchemaPlatformConfig | undefined {
  return SCHEMA_PLATFORMS.find((p) => p.slug === slug);
}

export function getAllSchemaPlatforms(): SchemaPlatformConfig[] {
  return SCHEMA_PLATFORMS;
}
