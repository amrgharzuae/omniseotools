export interface CanonicalPlatformFaq {
  question: string;
  answer: string;
}

export interface CanonicalPlatformHowToStep {
  name: string;
  text: string;
}

export interface CanonicalPlatformConfig {
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
  presetUrl: string;
  dynamicSnippet?: string;
  howToSteps: CanonicalPlatformHowToStep[];
  faqs: CanonicalPlatformFaq[];
}

export const CANONICAL_PLATFORMS: CanonicalPlatformConfig[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify (Liquid & Collection Pagination)",
    shortName: "Shopify",
    cmsName: "Shopify Liquid & OS 2.0",
    title: "Shopify Canonical URL & Collection Pagination Auditor | OmniSEO Tools",
    metaDescription:
      "Audit and fix Shopify collection URL duplicate canonical tags, paginated collection issues, and tracking query string bloat. Ensure product pages canonicalize to root product paths.",
    h1: "Shopify Canonical URL & Collection Pagination Auditor",
    tagline:
      "Audit Shopify collection URL duplication, fix nested /collections/product paths in Liquid themes, and resolve tracking parameter bloat in Google Search Console.",
    targetCmsQuirk:
      "Shopify defaulting internal links to /collections/mens/products/shoe rather than canonical /products/shoe, causing PageRank dilution and parameter bloat in GSC.",
    coreH2: "Resolving Collection-Nested Product URL Duplication in Shopify",
    directAnswer:
      "In Shopify themes, product links inside collection grids default to collection-nested paths (e.g. /collections/frontpage/products/leather-jacket) via the legacy Liquid filter {{ product.url | within: collection }}. While Shopify themes declare a self-referential or root canonical tag (<link rel='canonical' href='{{ canonical_url }}'> pointing to /products/leather-jacket), having thousands of internal collection-nested links forces Googlebot to process two versions of every product URL. This dilutes internal PageRank, wastes crawl budget, and creates 'Duplicate without user-selected canonical' warnings in Google Search Console. The definitive fix is editing product card snippets to replace {{ product.url | within: collection }} with {{ product.url }}, routing all internal links directly to the canonical root product path.",
    educationalContent: `
      <p>Shopify's e-commerce architecture handles canonicalization natively in <code>theme.liquid</code> via <code>{{ canonical_url }}</code>, but subtle Liquid template patterns frequently cause extensive duplicate content indexing.</p>

      <h3>1. The Collection-Nested Product URL Flaw</h3>
      <p>By default, many Shopify Online Store 2.0 and vintage themes wrap product grid links with the <code>within: collection</code> Liquid filter:</p>
      <pre><code>&lt;!-- DEFAULT UNOPTIMIZED LIQUID (Creates duplicate internal links) --&gt;
&lt;a href="{{ product.url | within: collection }}"&gt;
  {{ product.title }}
&lt;/a&gt;</code></pre>
      <p>When a product belongs to 5 different collections (e.g. <em>New Arrivals</em>, <em>Men</em>, <em>Outerwear</em>, <em>Sale</em>, and <em>Featured</em>), Shopify generates 5 distinct internal URLs for that single product:</p>
      <ul>
        <li><code>/collections/new-arrivals/products/leather-jacket</code></li>
        <li><code>/collections/men/products/leather-jacket</code></li>
        <li><code>/collections/outerwear/products/leather-jacket</code></li>
        <li><code>/collections/sale/products/leather-jacket</code></li>
        <li><code>/products/leather-jacket</code> (Root Canonical)</li>
      </ul>
      <p>Even though each nested page outputs a canonical tag pointing back to <code>/products/leather-jacket</code>, Googlebot must expend crawl budget discovering and processing each collection variation. In large catalogs with thousands of SKUs, this results in indexation lag and PageRank dilution.</p>

      <h3>2. The Permanent Liquid Theme Fix</h3>
      <p>To ensure all internal site links point directly to the authoritative canonical URL, search your theme snippets (e.g., <code>snippets/card-product.liquid</code>, <code>snippets/product-card.liquid</code>, or <code>snippets/product-grid-item.liquid</code>) and replace <code>within: collection</code> with direct <code>product.url</code>:</p>
      <pre><code>&lt;!-- OPTIMIZED LIQUID (Routes directly to canonical root) --&gt;
&lt;a href="{{ product.url }}"&gt;
  {{ product.title }}
&lt;/a&gt;</code></pre>

      <h3>3. Shopify Collection Pagination & Variant Parameters</h3>
      <p>Shopify automatically appends <code>?page=2</code> for paginated collections and <code>?variant=12345678</code> for product variants. Shopify's <code>{{ canonical_url }}</code> correctly keeps <code>?page=2</code> (which aligns with Google's pagination guidelines) while stripping non-essential marketing parameters. Ensure your <code>layout/theme.liquid</code> file contains the strict canonical declaration inside the <code>&lt;head&gt;</code> element.</p>
    `,
    presetUrl:
      "https://store.myshopify.com/collections/frontpage/products/leather-jacket?variant=12345678&utm_source=meta",
    dynamicSnippet: `<!-- layout/theme.liquid (Shopify Canonical Tag Declaration) -->
<head>
  <meta charset="utf-8">
  <link rel="canonical" href="{{ canonical_url }}">
  <!-- In snippets/card-product.liquid, ensure product links use: -->
  <!-- <a href="{{ product.url }}">{{ product.title }}</a> -->
  <!-- Avoid: {{ product.url | within: collection }} -->
</head>`,
    howToSteps: [
      {
        name: "Inspect layout/theme.liquid Canonical Tag",
        text: "Verify that `<link rel='canonical' href='{{ canonical_url }}'>` is present in the `<head>` of `layout/theme.liquid`.",
      },
      {
        name: "Locate Product Card Snippets",
        text: "Open your theme code editor and search for `snippets/card-product.liquid`, `product-card.liquid`, or `product-grid-item.liquid`.",
      },
      {
        name: "Remove the 'within: collection' Filter",
        text: "Replace all instances of `{{ product.url | within: collection }}` with `{{ product.url }}` so internal collection links point to the clean root path.",
      },
      {
        name: "Verify Collection Pagination Canonical URLs",
        text: "Confirm that paginated collections (e.g. `/collections/all?page=2`) output self-referential canonical tags with the `?page=` parameter preserved.",
      },
      {
        name: "Test Staging URLs in OmniSEO Canonical Auditor",
        text: "Paste your Shopify collection and product URLs into our auditor to verify that marketing parameters are stripped and canonical paths resolve cleanly.",
      },
    ],
    faqs: [
      {
        question: "Why does Shopify output collection-nested URLs like /collections/men/products/shirt?",
        answer:
          "Shopify themes historically used the `within: collection` Liquid filter to preserve collection breadcrumb navigation and contextual 'Next/Previous Product' links. However, this creates multiple duplicate URLs for the same product, which dilutes internal PageRank and increases Google Search Console crawl bloat.",
      },
      {
        question: "How do I force Shopify to output canonical /products/shirt URLs across all collection grids?",
        answer:
          "In your Shopify theme code editor, find your product card snippets (e.g., `snippets/card-product.liquid` in Dawn or OS 2.0 themes) and remove `| within: collection` from the anchor tag `href` attributes. Change `href='{{ product.url | within: collection }}'` to `href='{{ product.url }}'`.",
      },
      {
        question: "How does Shopify handle pagination canonical tags on collection pages?",
        answer:
          "Shopify's `{{ canonical_url }}` helper automatically includes the `?page=X` parameter on paginated collection pages (e.g. `/collections/all?page=2`). This is the correct, Google-recommended behavior: paginated pages should have self-referential canonical tags rather than pointing back to page 1.",
      },
    ],
  },

  // 2. WordPress
  {
    slug: "wordpress",
    name: "WordPress & WooCommerce",
    shortName: "WordPress",
    cmsName: "WordPress & WooCommerce",
    title: "WordPress Canonical URL & Trailing Slash Auditor | OmniSEO Tools",
    metaDescription:
      "Inspect WordPress canonical URL consistency, trailing slash 301 loops, and query parameter cannibalization across Yoast, RankMath, and WooCommerce stores.",
    h1: "WordPress Canonical URL & Trailing Slash Auditor",
    tagline:
      "Inspect WordPress permalink canonicals, resolve trailing slash 301 redirect loops between Nginx/.htaccess and wp_head, and clean WooCommerce query parameters.",
    targetCmsQuirk:
      "Trailing slash enforcement discrepancies between .htaccess/Nginx and WordPress permalink settings triggering infinite redirect loops or double-hop 301s.",
    coreH2: "Fixing Trailing Slash Redirect Chains and WooCommerce Category Parameter Bloat",
    directAnswer:
      "WordPress enforces trailing slashes by default on directory permalinks (/%postname%/) via the core redirect_canonical() function in wp-includes/canonical.php. When web servers (such as Nginx or Apache .htaccess rewrite rules) enforce a conflicting trailing slash policy or strip trailing slashes before passing requests to PHP, crawlers experience cyclical 301 redirect loops or double-hop redirects (e.g. http://example.com/blog -> https://example.com/blog -> https://example.com/blog/). Additionally, WooCommerce layered navigation filters (e.g., ?filter_color=blue) can generate millions of thin duplicate URLs unless SEO plugins (Yoast SEO, Rank Math, or All in One SEO) enforce strict canonical fallbacks to the primary category archive.",
    educationalContent: `
      <p>WordPress powers over 40% of the web, and its flexible URL rewriting architecture makes it prone to server-level trailing slash conflicts and query parameter bloat.</p>

      <h3>1. The WordPress redirect_canonical() & Server Conflict</h3>
      <p>WordPress includes a built-in canonical redirect engine (<code>redirect_canonical()</code>) that automatically redirects non-standard requests to the permalink structure defined in <em>Settings &rarr; Permalinks</em>. For standard permalinks (<code>/%postname%/</code>), WordPress mandates a trailing slash.</p>
      <p>If your Nginx server block or Cloudflare Page Rules are configured to strip trailing slashes, an infinite redirect loop occurs:</p>
      <ol>
        <li>User/Crawler requests <code>https://example.com/post/</code></li>
        <li>Nginx strips the trailing slash &rarr; <code>301 Redirect to https://example.com/post</code></li>
        <li>WordPress receives request for <code>/post</code> and executes <code>redirect_canonical()</code> &rarr; <code>301 Redirect to https://example.com/post/</code></li>
        <li>Browser throws <code>ERR_TOO_MANY_REDIRECTS</code>.</li>
      </ol>

      <h3>2. Synchronizing WordPress & Server Rewrite Rules</h3>
      <p>Always align your server configuration with your WordPress permalink setting. If WordPress uses trailing slashes, configure Nginx to enforce trailing slashes at the server level before invoking the PHP-FPM fastcgi processor:</p>
      <pre><code># Nginx Configuration for WordPress (Enforce Trailing Slash)
rewrite ^([^.\\?]*[^/])$ $1/ permanent;</code></pre>

      <h3>3. WooCommerce Faceted Navigation Canonicalization</h3>
      <p>In WooCommerce, product attribute filters (like <code>?min_price=50&amp;filter_size=large</code>) alter catalog listings. While helpful for shoppers, search engines should not index these filtered variations. Plugins like Rank Math and Yoast automatically point the canonical tag of filtered pages back to the root category URL (<code>/product-category/shoes/</code>), consolidating link equity.</p>
    `,
    presetUrl: "https://Example.com/Blog/technical-seo-checklist/",
    dynamicSnippet: `# .htaccess (WordPress Canonical HTTPS & Trailing Slash Synchronization)
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# 1. Force Strict HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 2. Enforce WordPress Trailing Slash on Non-File URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]

# 3. Standard WordPress Front Controller
RewriteRule ^index\\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>`,
    howToSteps: [
      {
        name: "Check WordPress Permalink Settings",
        text: "Navigate to `Settings > Permalinks` in WordPress and verify whether your structure ends with a trailing slash (e.g. `/%postname%/`).",
      },
      {
        name: "Synchronize Server Rewrite Rules",
        text: "Ensure your Nginx server block or `.htaccess` file enforces the same trailing slash policy as your WordPress permalinks to prevent 301 redirect loops.",
      },
      {
        name: "Configure Yoast SEO or Rank Math Canonical Hooks",
        text: "Ensure your SEO plugin is set to output self-referential canonical URLs on all standard posts and pages.",
      },
      {
        name: "Canonicalize WooCommerce Filtered URLs",
        text: "Verify that WooCommerce product category filter URLs (`?filter_color=...`) point their canonical tag to the base category archive.",
      },
      {
        name: "Audit in OmniSEO Canonical Auditor",
        text: "Paste your WordPress URLs into our auditor to detect casing mismatches, trailing slash loops, and query parameter bloat.",
      },
    ],
    faqs: [
      {
        question: "Why does WordPress redirect between trailing slash and non-trailing slash URLs?",
        answer:
          "WordPress core includes a built-in `redirect_canonical()` function that enforces the exact permalink structure defined in `Settings > Permalinks`. If your permalink setting ends with a slash (e.g. `/%postname%/`), any incoming request without a trailing slash receives a 301 redirect to the slashed URL.",
      },
      {
        question: "How do Yoast SEO and Rank Math handle self-referential canonical tags in WordPress?",
        answer:
          "Both Yoast SEO and Rank Math hook into `wp_head` to output clean `<link rel='canonical' href='...'>` tags. They automatically strip tracking query parameters (like `utm_*`, `fbclid`, and `gclid`) and ensure the canonical URL matches the normalized permalink structure.",
      },
      {
        question: "How do I prevent WooCommerce product filter query parameters from creating duplicate indexed pages?",
        answer:
          "Ensure your SEO plugin (Yoast WooCommerce SEO or Rank Math) canonicalizes faceted filter pages back to the root category URL (e.g. `https://example.com/shop/shoes/`). Additionally, you can add `Disallow: /*?*filter_` in `robots.txt` to prevent crawlers from crawling infinite filter combinations.",
      },
    ],
  },

  // 3. Next.js
  {
    slug: "nextjs",
    name: "Next.js App Router",
    shortName: "Next.js",
    cmsName: "Next.js 14/15 App Router",
    title: "Next.js Canonical URL & 308 Trailing Slash Auditor | OmniSEO Tools",
    metaDescription:
      "Audit Next.js canonical metadata consistency, resolve trailingSlash: true/false 308 redirect loops, and sanitize dynamic route query parameters in Server Components.",
    h1: "Next.js Canonical URL & 308 Trailing Slash Auditor",
    tagline:
      "Audit Next.js App Router metadata alternates, resolve trailingSlash 308 permanent redirect loops in next.config.mjs, and eliminate duplicate indexing in Vercel deployments.",
    targetCmsQuirk:
      "Next.js App Router default strict 308 permanent redirect on mismatched trailing slashes, and missing self-referential alternates.canonical definitions in layout metadata.",
    coreH2: "Handling trailingSlash: true/false and Dynamic Alternates in Next.js Metadata API",
    directAnswer:
      "Next.js App Router sets trailingSlash: false by default in next.config.mjs. When a user or crawler accesses a URL with a trailing slash (e.g. /blog/seo-guide/), Next.js automatically issues an HTTP 308 Permanent Redirect to the non-slashed path (/blog/seo-guide). If your layout or page metadata declares a canonical tag with a trailing slash (alternates: { canonical: 'https://example.com/blog/seo-guide/' }), Googlebot encounters a direct conflict: the canonical tag points to a URL that the server immediately redirects away from via 308. To fix this, always align your metadata.alternates.canonical definitions with your next.config.mjs trailingSlash configuration.",
    educationalContent: `
      <p>Next.js 14 and 15 App Router provide robust metadata generation capabilities via the <code>Metadata</code> object and <code>generateMetadata()</code> function. However, subtle mismatches between routing configuration and canonical metadata frequently trigger Google Search Console indexing errors.</p>

      <h3>1. Next.js HTTP 308 Permanent Redirect Mechanics</h3>
      <p>Unlike traditional servers that return 301 redirects, Next.js uses <strong>HTTP 308 Permanent Redirects</strong> for URL normalization. The HTTP 308 status code strictly guarantees that the HTTP request method and body are preserved across the redirect hop.</p>
      <p>By default, Next.js sets <code>trailingSlash: false</code>:</p>
      <ul>
        <li><code>GET /about/</code> &rarr; <code>HTTP 308 Location: /about</code></li>
        <li><code>GET /about</code> &rarr; <code>HTTP 200 OK</code></li>
      </ul>
      <p>If you set <code>trailingSlash: true</code> in <code>next.config.mjs</code>, the reverse occurs:</p>
      <ul>
        <li><code>GET /about</code> &rarr; <code>HTTP 308 Location: /about/</code></li>
        <li><code>GET /about/</code> &rarr; <code>HTTP 200 OK</code></li>
      </ul>

      <h3>2. Defining Clean Metadata Alternates in App Router</h3>
      <p>In Next.js Server Components, define your canonical URL inside the <code>alternates</code> metadata property:</p>
      <pre><code>// app/blog/[slug]/page.tsx (Next.js Server Component)
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise&lt;Metadata&gt; {
  const { slug } = await params;
  const canonicalUrl = \`https://omniseotools.com/blog/\${slug}\`; // No trailing slash

  return {
    title: \`Article Title - OmniSEO Tools\`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}</code></pre>

      <h3>3. Preventing Metadata Inheritance Canonical Collisions</h3>
      <p>If you declare a static canonical URL in root <code>app/layout.tsx</code>, Next.js will inherit that exact canonical URL across all child routes unless explicitly overridden in child <code>page.tsx</code> files. Always use relative path resolution or define <code>metadataBase</code> in your root layout:</p>
      <pre><code>// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://omniseotools.com'),
  alternates: {
    canonical: './',
  },
};</code></pre>
    `,
    presetUrl: "https://omniseotools.com/tools/canonical-redirect-auditor/",
    dynamicSnippet: `// next.config.mjs (Next.js App Router Trailing Slash & Redirect Rules)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce consistent non-trailing slash policy across Vercel & Node
  trailingSlash: false,
  skipTrailingSlashRedirect: false,

  async redirects() {
    return [
      {
        // Enforce lowercase paths and strip trailing slashes
        source: '/:path+/',
        destination: '/:path+',
        permanent: true, // 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;`,
    howToSteps: [
      {
        name: "Set trailingSlash in next.config.mjs",
        text: "Explicitly set `trailingSlash: false` (or `true`) in `next.config.mjs` to establish a uniform routing standard.",
      },
      {
        name: "Define metadataBase in Root layout.tsx",
        text: "Add `metadataBase: new URL('https://yourdomain.com')` to your root layout to enable clean relative canonical path resolution.",
      },
      {
        name: "Declare alternates.canonical in Server Components",
        text: "Use `alternates: { canonical: '...' }` in `page.tsx` or `generateMetadata()` matching your exact trailing slash policy.",
      },
      {
        name: "Strip Query Parameters in Dynamic Metadata",
        text: "When constructing dynamic canonical URLs from `searchParams`, exclude non-content query keys (like `utm_*` or `ref`).",
      },
      {
        name: "Audit with OmniSEO Canonical Auditor",
        text: "Test your Next.js routes in our auditor to verify that server 308 rules and HTML canonical tags are 100% synchronized.",
      },
    ],
    faqs: [
      {
        question: "Why does Next.js issue a 308 Permanent Redirect on trailing slashes?",
        answer:
          "Next.js uses HTTP 308 Permanent Redirects by default when normalizing trailing slashes (`trailingSlash: false`). Unlike a legacy 301 redirect, which allows clients to change POST requests to GET requests, a 308 status code strictly guarantees that the HTTP request method and body remain unchanged during redirection.",
      },
      {
        question: "How do I define a dynamic canonical URL in Next.js App Router Server Components?",
        answer:
          "Inside `page.tsx` or `generateMetadata()`, return an `alternates` object: `export const metadata: Metadata = { alternates: { canonical: 'https://example.com/page' } };`. This automatically renders `<link rel='canonical' href='https://example.com/page' />` in the document head.",
      },
      {
        question: "What happens if my Next.js canonical tag has a trailing slash but next.config.mjs has trailingSlash: false?",
        answer:
          "Googlebot encounters an infinite redirect contradiction: the canonical tag tells Google to index `/page/`, but when Googlebot requests `/page/`, Next.js returns an HTTP 308 redirecting back to `/page`. Google will flag this as a canonical redirect error and may drop the URL from search results.",
      },
    ],
  },
];

export function getCanonicalPlatformBySlug(slug: string): CanonicalPlatformConfig | undefined {
  return CANONICAL_PLATFORMS.find((p) => p.slug === slug);
}

export function getAllCanonicalPlatforms(): CanonicalPlatformConfig[] {
  return CANONICAL_PLATFORMS;
}
