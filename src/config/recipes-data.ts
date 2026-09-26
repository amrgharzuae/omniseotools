export type RecipeCategory =
  | "Next.js & React"
  | "Core Web Vitals"
  | "AI & Crawlers"
  | "Server & Nginx"
  | "SEO & Search Console"
  | "International SEO";

export interface RecipeImplementationStep {
  title: string;
  explanation: string;
}

export interface RecipeFaqItem {
  question: string;
  answer: string;
}

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  category: RecipeCategory;
  readingTime: string;
  lastUpdated: string;
  relatedToolSlug: string;
  relatedToolName: string;
  relatedToolCta: string;
  problemSummary: string;
  errorSnippet: string | null;
  solutionSnippet: string;
  snippetLanguage: string;
  implementationSteps: RecipeImplementationStep[];
  commonPitfalls: string[];
  faqItems: RecipeFaqItem[];
}

export const RECIPES_DATA: Recipe[] = [
  // 1. Next.js Trailing Slash Redirect
  {
    slug: "nextjs-trailing-slash-redirect",
    title: "How to Fix Trailing Slash Redirect Loops in Next.js App Router",
    description:
      "Fix 308 redirect loops and infinite canonical slash issues in Next.js App Router. Clean next.config.mjs configuration and middleware regex redirect patterns.",
    category: "Next.js & React",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "redirect-rule-generator",
    relatedToolName: "Redirect Rule & Regex Mapper",
    relatedToolCta: "Map Next.js Wildcards in Tool #29",
    problemSummary:
      "When configuring trailing slash normalization in Next.js, setting trailingSlash: true in next.config.mjs while also handling path rewrites, reverse proxies (Cloudflare / AWS CloudFront), or custom middleware redirects can trigger cyclical 308 Permanent Redirect loops (e.g., /blog -> /blog/ -> /blog). This breaks search bot crawlers, triggers redirect error penalties in Google Search Console, and crashes client navigation.",
    errorSnippet:
      "ERR_TOO_MANY_REDIRECTS: The page at https://example.com/docs was redirected too many times.\nHTTP/1.1 308 Permanent Redirect -> Location: /docs/\nHTTP/1.1 308 Permanent Redirect -> Location: /docs",
    solutionSnippet: `// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enforce standard no-trailing-slash URL policy across App Router
  trailingSlash: false,
  skipTrailingSlashRedirect: true, // Prevents default internal redirect race conditions

  async redirects() {
    return [
      {
        // Explicitly strip trailing slashes for clean canonical URLs
        source: '/:path+/',
        destination: '/:path+',
        permanent: true, // 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;`,
    snippetLanguage: "javascript",
    implementationSteps: [
      {
        title: "1. Audit next.config.mjs Configuration",
        explanation:
          "Set trailingSlash: false and configure skipTrailingSlashRedirect: true if you are managing edge redirects via middleware or Cloudflare Page Rules.",
      },
      {
        title: "2. Standardize Canonical Tags in Root Layout",
        explanation:
          "Ensure your App Router metadata alternates.canonical always uses a consistent slash policy without query parameters or trailing slashes.",
      },
      {
        title: "3. Prevent Middleware Path Mutation Loops",
        explanation:
          "When using NextResponse.redirect in middleware.ts, always check if request.nextUrl.pathname already matches the target destination to avoid self-referential redirect responses.",
      },
      {
        title: "4. Synchronize Edge Proxy / CDN Cache Rules",
        explanation:
          "If using Cloudflare or AWS CloudFront in front of Vercel/Next.js, ensure edge URL normalization matches your Next.js trailing slash policy.",
      },
    ],
    commonPitfalls: [
      "Combining trailingSlash: true with reverse proxy origin stripping causes infinite 308 ping-pong loops.",
      "Client-side Link components with trailing slashes triggering unexpected hard SSR full-page refreshes.",
      "Middleware redirecting internal _next/static or API routes into 308 redirects, breaking client asset bundles.",
      "Query strings (?utm_source=...) being stripped or duplicated during trailing slash normalization.",
    ],
    faqItems: [
      {
        question: "Does Google prefer URLs with or without trailing slashes?",
        answer:
          "Google treats https://example.com/page and https://example.com/page/ as two distinct URLs. Neither format provides a direct algorithmic ranking advantage, but consistency is critical: choose one standard and enforce a permanent 301/308 redirect + matching canonical tag across the site.",
      },
      {
        question: "Why does Next.js use 308 instead of 301 for redirects?",
        answer:
          "HTTP 308 (Permanent Redirect) preserves the original HTTP request method (GET, POST, PUT) and request body across the redirect, unlike legacy 301 redirects where browsers historically converted POST requests to GET requests.",
      },
      {
        question: "How does Cloudflare / Vercel edge caching affect trailing slash redirects?",
        answer:
          "Edge caches can cache the 308 redirect response. If you change your trailingSlash config in Next.js, purge the Cloudflare / Vercel edge cache immediately to prevent returning cached redirect loops to search engine bots.",
      },
    ],
  },

  // 2. Fix Font Preload Double Download
  {
    slug: "fix-font-preload-double-download",
    title: "Fixing the Web Font Preload Double Download Bug in Google Chrome",
    description:
      "Resolve Chrome duplicate web font downloads caused by missing crossorigin attributes in <link rel=\"preload\">. Boost Largest Contentful Paint (LCP) and save bandwidth.",
    category: "Core Web Vitals",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "resource-hint-generator",
    relatedToolName: "Resource Hint & Preconnect Generator",
    relatedToolCta: "Generate Validated Font Hints in Tool #32",
    problemSummary:
      "When preloading self-hosted or CDN web fonts (.woff2) using <link rel=\"preload\">, browsers like Google Chrome download the font file twice: once during the high-priority preload phase, and a second time when the CSS @font-face rule executes. This occurs because the W3C specification mandates that font fetches must use anonymous CORS mode (crossorigin=\"anonymous\"), even for same-origin fonts. If the preload tag lacks the crossorigin attribute, Chrome treats the responses as having different CORS modes and discards the preloaded cache.",
    errorSnippet:
      "DevTools Network Console Warning:\nThe resource https://example.com/fonts/inter.woff2 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.\n\n-> Result: 2 identical requests for inter.woff2 (Preload + Font parser), doubling font bandwidth consumption.",
    solutionSnippet: `<!-- Correct Production HTML <head> Web Font Preload -->
<!-- Note: crossorigin="anonymous" is MANDATORY even for same-origin fonts -->
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>

<!-- Corresponding CSS @font-face Definition -->
<style>
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url('/fonts/inter-var.woff2') format('woff2-variations');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6;
  }
</style>`,
    snippetLanguage: "html",
    implementationSteps: [
      {
        title: "1. Add Mandatory crossorigin=\"anonymous\" to <link rel=\"preload\">",
        explanation:
          "Always include crossorigin=\"anonymous\" (or just crossorigin) on font preloads. Font requests in CSS always execute in anonymous CORS mode, so the preload tag must match.",
      },
      {
        title: "2. Specify Exact MIME Type (type=\"font/woff2\")",
        explanation:
          "Declare type=\"font/woff2\" so modern browsers that support WOFF2 download the resource, while unsupported browsers skip the preload tag without wasting bandwidth.",
      },
      {
        title: "3. Limit Preloads to 1-2 Critical Body/Heading Fonts",
        explanation:
          "Only preload fonts required above-the-fold for Largest Contentful Paint (LCP). Preloading more than 2-3 fonts causes bandwidth contention with critical CSS and JS bundles.",
      },
      {
        title: "4. Verify in Chrome DevTools Network Tab",
        explanation:
          "Open DevTools > Network tab, filter by 'Font', reload the page, and confirm only 1 request per font file appears with Priority: High.",
      },
    ],
    commonPitfalls: [
      "Omitting crossorigin=\"anonymous\" on same-origin self-hosted fonts (/fonts/font.woff2).",
      "Preloading entire font weight families (Regular, Medium, SemiBold, Bold, Italic) instead of using variable fonts.",
      "Mismatched URLs between the <link rel=\"preload\" href=\"...\"> and the CSS @font-face src: url(\"...\") (e.g., query strings or relative vs absolute paths).",
      "Preloading Google Fonts CSS (fonts.googleapis.com) with as=\"font\" instead of preconnecting to fonts.gstatic.com.",
    ],
    faqItems: [
      {
        question: "Why do same-origin self-hosted fonts require the crossorigin attribute?",
        answer:
          "The CSS Fonts Module Level 3 specification mandates that user agents must fetch fonts using anonymous CORS mode to protect SVG and OpenType font tables from font-leaking attacks. Because the CSS parser always fetches fonts in anonymous CORS mode, a preload tag without crossorigin creates a cache key mismatch.",
      },
      {
        question: "How does preloading fonts improve Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)?",
        answer:
          "Preloading eliminates the network latency between HTML download, CSS parsing, and font discovery. The font arrives before the first text paint, preventing the Flash of Invisible Text (FOIT) and eliminating the layout shifts (CLS) caused when fallback fonts switch.",
      },
      {
        question: "What does the Chrome warning 'resource was preloaded but not used' mean?",
        answer:
          "It means the browser preloaded a file via <link rel=\"preload\">, but within ~3 seconds no DOM element or stylesheet consumed that exact URL. In 95% of cases, this is caused by a missing crossorigin attribute, a typo in the URL path, or @font-face src mismatch.",
      },
    ],
  },

  // 3. Configure GPTBot & CCBot in robots.txt
  {
    slug: "configure-gptbot-ccbot-robots-txt",
    title: "How to Allow AI Search Citations While Blocking Data Scrapers in robots.txt",
    description:
      "Configure robots.txt to welcome AI search bots (OAI-SearchBot, PerplexityBot) while blocking foundational model training scrapers (GPTBot, CCBot, ByteSpider).",
    category: "AI & Crawlers",
    readingTime: "5 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "llms-txt-generator",
    relatedToolName: "LLMs.txt & AI Crawler Directive Generator",
    relatedToolCta: "Build Custom AI Directives in Tool #34",
    problemSummary:
      "Many web publishers mistakenly block all AI bots with a global Disallow in robots.txt, or leave their site completely open. Blocking everything removes the site from AI search engines (like ChatGPT Search and Perplexity), destroying organic referral traffic. Conversely, allowing all bots permits mass training crawlers (such as Common Crawl CCBot, ByteDance ByteSpider, and GPTBot) to scrape proprietary articles and data into LLM model weights without attribution.",
    errorSnippet:
      "# Anti-pattern: Blocking ALL AI bots kills AI Search referral traffic!\nUser-agent: *\nDisallow: /ai/\n# Or blocking GPTBot without allowing OAI-SearchBot causes ChatGPT Search drop-off.",
    solutionSnippet: `# Production robots.txt: AI Search Allowed + Training Scrapers Blocked
# Generated via OmniSEO Tools (/tools/llms-txt-generator)

# 1. ALLOW AI SEARCH & CITATION BOTS (Drives High-Intent Referral Traffic)
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

# 2. DISALLOW FOUNDATION MODEL TRAINING & BULK SCRAPERS
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ByteSpider
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: cohere-ai
Disallow: /

# 3. STANDARD SEARCH ENGINES (Preserve Google & Bing Rankings)
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Canonical Sitemap & LLM Context Pointers
Sitemap: https://omniseotools.com/sitemap.xml
# LLMs Context: https://omniseotools.com/llms.txt`,
    snippetLanguage: "plaintext",
    implementationSteps: [
      {
        title: "1. Distinguish Citation Bots from Training Scrapers",
        explanation:
          "Identify crawlers that link back to your content (OAI-SearchBot, PerplexityBot) and grant them full Allow: / access.",
      },
      {
        title: "2. Block Mass Ingestion Crawlers via Dedicated User-agent Blocks",
        explanation:
          "Add explicit Disallow: / rules for GPTBot, CCBot, ByteSpider, and Meta-ExternalAgent to prevent your data from being ingested into LLM training sets.",
      },
      {
        title: "3. Disallow Google-Extended to Opt Out of Gemini Training",
        explanation:
          "Google-Extended specifically controls Gemini training ingestion without affecting standard Googlebot search engine crawling or SERP rankings.",
      },
      {
        title: "4. Deploy a Root /llms.txt Context File",
        explanation:
          "Provide a clean, token-efficient Markdown summary at /llms.txt so AI search agents can ingest your core docs and APIs with minimal tokens.",
      },
    ],
    commonPitfalls: [
      "Confusing Google-Extended with Googlebot (blocking Google-Extended does NOT hurt your Google search rankings).",
      "Blocking GPTBot and inadvertently blocking OAI-SearchBot (OpenAI uses distinct tokens for training vs real-time search).",
      "Placing User-agent: * at the top of robots.txt without understanding parser precedence across different crawlers.",
      "Failing to monitor server access logs for rogue AI scrapers that ignore robots.txt.",
    ],
    faqItems: [
      {
        question: "What is the difference between GPTBot and OAI-SearchBot?",
        answer:
          "GPTBot is OpenAI's web crawler used to scrape data for training future foundation models (GPT-4o, GPT-5). OAI-SearchBot is the crawler for ChatGPT Search that indexes web content to provide real-time user answers and direct attribution links back to your site.",
      },
      {
        question: "Does blocking Google-Extended hurt my Google search rankings or snippets?",
        answer:
          "No. Google explicitly stated that Google-Extended is used exclusively for training Gemini and Vertex AI generative models. Google Search indexing and rankings are powered by Googlebot and remain completely unaffected.",
      },
      {
        question: "What is /llms.txt and how does it complement robots.txt?",
        answer:
          "While robots.txt dictates which bots are permitted to crawl your website, /llms.txt provides permitted AI agents with a structured Markdown index of your content, APIs, and key pages, optimized for low token usage and high RAG retrieval accuracy.",
      },
    ],
  },

  // 4. Nginx Non-WWW to WWW Canonical Redirect
  {
    slug: "nginx-non-www-to-www-canonical-redirect",
    title: "How to Configure 301 Redirect from Non-WWW to WWW in Nginx",
    description:
      "Configure high-performance 301 permanent redirects from non-WWW to canonical WWW domains in Nginx. Fix duplicate content indexing in Google Search Console and SSL wildcard issues.",
    category: "Server & Nginx",
    readingTime: "3 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "redirect-rule-generator",
    relatedToolName: "Redirect & Regex URL Mapper",
    relatedToolCta: "Test Regex & 301 Rules in Tool #29",
    problemSummary:
      "Splitting domain authority between non-www and www hostnames creates duplicate content issues in Google Search Console and breaks SSL cert wildcard matching.",
    errorSnippet:
      "Duplicate without user-selected canonical (Google Search Console Coverage Report)",
    solutionSnippet: `server {
    listen 80;
    listen 443 ssl http2;
    server_name example.com;
    return 301 https://www.example.com$request_uri;
}`,
    snippetLanguage: "nginx",
    implementationSteps: [
      {
        title: "1. Add Dedicated Redirect Server Block",
        explanation:
          "Add dedicated redirect server block above the primary server context in your Nginx configuration.",
      },
      {
        title: "2. Catch Both HTTP and HTTPS Traffic",
        explanation:
          "Match both HTTP and HTTPS listeners to catch all legacy non-www inbound traffic.",
      },
      {
        title: "3. Validate Configuration and Reload",
        explanation:
          "Test configuration with nginx -t and reload via systemctl reload nginx without dropping active connections.",
      },
    ],
    commonPitfalls: [
      "Using an if ($host = example.com) condition inside the main block instead of a separate server block (triggers Nginx if-is-evil CPU overhead).",
      "Failing to include $request_uri in the return 301 directive, stripping deep link paths and query parameters.",
      "Omitting SSL certificates from port 443 redirect blocks, causing browser SSL handshake errors before redirecting.",
      "Creating redirect loops by defining server_name example.com in both the redirect and primary web blocks.",
    ],
    faqItems: [
      {
        question: "What is the SEO impact of using 301 vs 302 redirects for domain canonicalization?",
        answer:
          "A 301 redirect is permanent and instructs search engine crawlers like Googlebot to transfer 100% of accumulated link equity and PageRank to the canonical WWW hostname. A 302 redirect is temporary, meaning search engines retain the old non-WWW index and divide ranking signals across both hostnames.",
      },
      {
        question: "How do HSTS preload considerations affect non-WWW to WWW redirects?",
        answer:
          "If your domain is submitted to the HSTS preload list, browsers automatically upgrade all HTTP requests to HTTPS before hitting your server. Your Nginx config must serve a valid HTTPS certificate on the non-WWW domain to complete the 301 redirect to https://www.example.com.",
      },
      {
        question: "Why do Cloudflare Page Rules conflict with server-level Nginx redirects?",
        answer:
          "If Cloudflare has an active Always Use HTTPS or Automatic HTTPS Rewrites rule conflicting with Nginx reverse proxy headers, requests can loop at the CDN edge. Ensure Cloudflare SSL mode is set to 'Full (Strict)' and redirect rules are handled at either the edge or the origin, not both.",
      },
    ],
  },

  // 5. Next.js CSP Inline Scripts Nonce
  {
    slug: "nextjs-csp-inline-scripts-nonce",
    title: "Resolving Content Security Policy Inline Script Violations in Next.js App Router",
    description:
      "Resolve Content Security Policy (CSP) inline script violations in Next.js App Router using cryptographic nonces in Edge Middleware. Protect against XSS without breaking hydration.",
    category: "Next.js & React",
    readingTime: "5 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "csp-header-builder",
    relatedToolName: "Content Security Policy (CSP) & Header Builder",
    relatedToolCta: "Generate Strict CSP Headers in Tool #35",
    problemSummary:
      "Next.js injects framework hydration scripts inline. A strict script-src 'self' CSP policy blocks these scripts, causing hydration failures and blank screens.",
    errorSnippet:
      "Refused to execute inline script because it violates the following Content Security Policy directive: script-src 'self'",
    solutionSnippet: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  \`.replace(/\\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('content-security-policy', cspHeader);
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};`,
    snippetLanguage: "typescript",
    implementationSteps: [
      {
        title: "1. Generate Cryptographic Nonce in Edge Middleware",
        explanation:
          "Generate a cryptographic random nonce per request inside Next.js edge middleware.",
      },
      {
        title: "2. Pass Nonce via Request Headers to Root Layout",
        explanation:
          "Pass the nonce down via request headers to layout.tsx so Server Components can read it.",
      },
      {
        title: "3. Attach Nonce to Third-Party Next.js Script Tags",
        explanation:
          "Attach the nonce attribute to Google Tag Manager or third-party Next.js Script tags to permit runtime execution.",
      },
    ],
    commonPitfalls: [
      "Caching static HTML pages with stale nonce values on a CDN or Vercel edge edge-cache.",
      "Applying middleware CSP headers to static assets (_next/static), breaking CDN caching efficiency.",
      "Forgetting 'strict-dynamic', which blocks dynamically loaded third-party libraries spawned by trusted inline scripts.",
      "Using 'unsafe-inline' alongside nonces without understanding that modern CSP3 browsers ignore 'unsafe-inline' when a nonce is present.",
    ],
    faqItems: [
      {
        question: "What is the difference between CSP nonces and CSP hashes?",
        answer:
          "A nonce (number used once) is a unique cryptographically generated token generated per request, allowing dynamic inline scripts. A hash (e.g., sha256-...) is static and represents the exact cryptographic checksum of an unchanging script body. Nonces are required when script contents change dynamically.",
      },
      {
        question: "Can I use CSP nonces with static export (output: 'export') in Next.js?",
        answer:
          "No. Static HTML export generates pre-rendered HTML files at build time without a server runtime to inject per-request nonces. For static exports, use sha256 script hashes or configure CSP headers in next.config.mjs or hosting headers (Vercel vercel.json, Netlify _headers).",
      },
      {
        question: "Why is 'strict-dynamic' recommended in modern CSP policies?",
        answer:
          "'strict-dynamic' instructs modern browsers to automatically trust any script created and executed by a root script that already possesses a valid nonce. This eliminates the need to maintain an exhaustive, fragile whitelist of third-party domains for analytics, chat widgets, and tag managers.",
      },
    ],
  },

  // 6. Fix Product Schema Missing GTIN / MPN Warning
  {
    slug: "fix-product-schema-missing-gtin-mpn-warning",
    title: "Fixing Google Search Console Missing GTIN, MPN, or Brand in Product Schema",
    description:
      "Resolve Google Merchant Center and Search Console missing GTIN, MPN, or brand warnings in JSON-LD Product structured data. Qualify for rich merchant product snippets.",
    category: "Next.js & React",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "schema-markup-generator",
    relatedToolName: "JSON-LD Schema Markup Generator",
    relatedToolCta: "Validate Valid JSON-LD in Tool #11",
    problemSummary:
      "Google Merchant Center and Search Console fire non-critical merchant listing warnings when product structured data omits global trade identification numbers.",
    errorSnippet:
      "Either 'offers', 'review', or 'aggregateRating' should be specified. Missing field 'hasVariant' or 'gtin13'",
    solutionSnippet: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wireless Noise-Cancelling Headphones",
  "image": ["https://example.com/photos/1x1/photo.jpg"],
  "description": "High-fidelity audio headphones with 40-hour battery life and active noise cancellation.",
  "sku": "AUD-NC-9000",
  "mpn": "NC9000-BLK",
  "gtin13": "0123456789012",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product",
    "priceCurrency": "USD",
    "price": "199.99",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "OmniStore"
    }
  }
}`,
    snippetLanguage: "json",
    implementationSteps: [
      {
        title: "1. Add Global Trade Identifiers (gtin13, gtin8, or mpn)",
        explanation:
          "Add gtin13, gtin8, or mpn attributes to your product object.",
      },
      {
        title: "2. Standardize Schema.org Offer Availability URIs",
        explanation:
          "Verify availability uses the canonical schema.org/InStock URL structure.",
      },
      {
        title: "3. Validate Using Google Rich Results Test",
        explanation:
          "Validate using Google Rich Results Test and client-side schema generators.",
      },
    ],
    commonPitfalls: [
      "Providing price as a string with currency symbols ($199) instead of raw numeric string (199.99).",
      "Nesting the gtin or brand attribute inside the offers block instead of directly on the Product object.",
      "Using plain text strings for availability ('In Stock') instead of schema.org URI ('https://schema.org/InStock').",
      "Omitting priceValidUntil, which can trigger merchant listing compliance warnings for products with promotional pricing.",
    ],
    faqItems: [
      {
        question: "How do I structure schema for custom handmade goods without barcodes or GTINs?",
        answer:
          "For custom or handmade products lacking a UPC/EAN/GTIN, omit the gtin property and provide both 'brand' and 'identifier_exists: false' (in Google Merchant Center) or assign a custom 'mpn' / 'sku' code. Google recognizes that custom artisanal items do not have global barcodes.",
      },
      {
        question: "How should multiple product variants (sizes, colors) be structured in JSON-LD?",
        answer:
          "Use the 'hasVariant' property containing an array of individual Product objects, or define an AggregateOffer containing a highPrice and lowPrice with an array of nested Offer objects specifying individual variant SKUs and GTINs.",
      },
      {
        question: "Are missing GTIN warnings considered critical errors by Google Search Console?",
        answer:
          "No, missing GTIN/MPN warnings are classified as non-critical enhancements. Your product can still earn standard rich snippets, but providing valid GTINs qualifies your listings for prominent Google Shopping tabs, carousels, and merchant comparison panels.",
      },
    ],
  },

  // 7. Optimize LCP Hero Image Fetchpriority
  {
    slug: "optimize-lcp-hero-image-fetchpriority",
    title: "Fixing Largest Contentful Paint (LCP) Delay with fetchpriority=high",
    description:
      "Eliminate Largest Contentful Paint (LCP) delays by optimizing hero images with fetchpriority=\"high\" and high-priority preloading. Fix slow page loads and boost Core Web Vitals.",
    category: "Core Web Vitals",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "resource-hint-generator",
    relatedToolName: "Resource Hint & Preconnect Generator",
    relatedToolCta: "Generate LCP Preload Tags in Tool #32",
    problemSummary:
      "Browsers deprioritize image downloads until the CSS layout tree is fully calculated. If your hero image is your LCP element, late fetching creates 1.5s+ paint delays.",
    errorSnippet:
      "LCP image was lazily loaded. Largest Contentful Paint: 3.8s (Poor)",
    solutionSnippet: `<link
  rel="preload"
  as="image"
  href="/images/hero-banner.webp"
  type="image/webp"
  fetchpriority="high"
/>

{/* In Next.js: */}
<Image
  src="/images/hero-banner.webp"
  alt="Hero banner"
  width={1200}
  height={630}
  priority={true}
  fetchPriority="high"
  loading="eager"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>`,
    snippetLanguage: "html",
    implementationSteps: [
      {
        title: "1. Identify the Exact LCP Element via Performance Audit",
        explanation:
          "Identify the LCP element via Chrome DevTools Performance panel or Lighthouse.",
      },
      {
        title: "2. Remove Lazy Loading on Above-the-Fold Imagery",
        explanation:
          "Remove loading=\"lazy\" if set on the first viewport image and replace with loading=\"eager\".",
      },
      {
        title: "3. Insert High-Priority Preload Tag in HTML Head",
        explanation:
          "Insert <link rel=\"preload\" as=\"image\" fetchpriority=\"high\"> in the HTML head.",
      },
    ],
    commonPitfalls: [
      "Setting fetchpriority=\"high\" on more than 2 images simultaneously, saturating critical network bandwidth.",
      "Preloading an image URL that differs from the final responsive src computed by CSS or next/image (wasting 2x download bandwidth).",
      "Combining loading=\"lazy\" with fetchpriority=\"high\" on the same image element.",
      "Failing to specify image width and height attributes, causing Cumulative Layout Shift (CLS) when the hero image renders.",
    ],
    faqItems: [
      {
        question: "How do I preload responsive hero images with different screen sizes?",
        answer:
          "Use the imagesrcset and imagesizes attributes inside <link rel=\"preload\">: <link rel=\"preload\" as=\"image\" href=\"fallback.jpg\" imagesrcset=\"hero-480w.webp 480w, hero-1200w.webp 1200w\" imagesizes=\"(max-width: 600px) 480px, 1200px\" fetchpriority=\"high\">. This ensures mobile devices download only mobile-sized assets.",
      },
      {
        question: "Should I use AVIF or WebP for LCP hero images?",
        answer:
          "AVIF provides approximately 20-30% smaller file sizes than WebP at identical visual fidelity. However, ensure your server or CDN (like Next.js Image Optimization) serves AVIF with WebP fallback for full browser compatibility.",
      },
      {
        question: "Why shouldn't I set fetchpriority=\"high\" on all images on the page?",
        answer:
          "fetchpriority='high' signals the browser to prioritize the asset over render-blocking CSS and JavaScript bundles. Marking multiple images as high priority starves your critical JavaScript execution and CSS rendering of bandwidth, worsening First Contentful Paint (FCP) and Time to Interactive (TTI).",
      },
    ],
  },

  // 8. Block ByteDance ByteSpider Crawler
  {
    slug: "block-bytedance-bytespider-crawler",
    title: "How to Stop ByteSpider (TikTok/ByteDance) from Scraping Server Bandwidth",
    description:
      "Prevent ByteSpider (TikTok/ByteDance LLM crawler) from aggressive crawling, spiking server CPU, and consuming bandwidth using robots.txt and WAF rules.",
    category: "AI & Crawlers",
    readingTime: "3 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "llms-txt-generator",
    relatedToolName: "LLMs.txt & AI Crawler Directive Generator",
    relatedToolCta: "Configure AI Bot Directives in Tool #34",
    problemSummary:
      "ByteDance's LLM bot (ByteSpider) aggressively crawls dynamic endpoints without respecting crawl-delay, spiking CPU utilization and proxy transfer fees.",
    errorSnippet:
      "High CPU usage alert / Vercel Edge Requests spike from User-Agent: Mozilla/5.0... ByteSpider",
    solutionSnippet: `# robots.txt
User-agent: ByteSpider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: GPTBot
Disallow: /

# Allow AI Search & Attribution Engines
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://omniseotools.com/sitemap.xml`,
    snippetLanguage: "plaintext",
    implementationSteps: [
      {
        title: "1. Append Explicit ByteSpider Disallow in public/robots.txt",
        explanation:
          "Append explicit User-agent: ByteSpider Disallow block to public/robots.txt.",
      },
      {
        title: "2. Add Cloudflare WAF Custom Expression",
        explanation:
          "Add Cloudflare WAF custom expression: (http.user_agent contains \"ByteSpider\") -> Block.",
      },
      {
        title: "3. Verify Using Crawler Verification Tools",
        explanation:
          "Verify using client-side crawler verification tools and server access logs.",
      },
    ],
    commonPitfalls: [
      "Believing blocking ByteSpider affects regular organic search indexing on Google or Bing.",
      "Relying solely on robots.txt for scrapers that deliberately spoof standard browser user agents.",
      "Blocking TikTok's official sharing preview bot (Bytespider vs TikTokBot) if you rely on TikTok in-app link preview cards.",
      "Placing crawl-delay in robots.txt for bots that completely ignore crawl-delay specifications.",
    ],
    faqItems: [
      {
        question: "Does ByteSpider respect standard robots.txt Disallow directives?",
        answer:
          "Official ByteDance ByteSpider crawler nodes generally respect robots.txt Disallow instructions within 24-48 hours. However, third-party scrapers mimicking ByteSpider user agents may ignore robots.txt, making edge WAF blocking at Cloudflare or AWS WAF the most reliable solution.",
      },
      {
        question: "How do I block ByteSpider at the Nginx or Apache server level?",
        answer:
          "In Nginx: if ($http_user_agent ~* 'ByteSpider') { return 403; }. In Apache (.htaccess): RewriteEngine On RewriteCond %{HTTP_USER_AGENT} ByteSpider [NC] RewriteRule .* - [F,L].",
      },
      {
        question: "Does blocking ByteSpider affect my TikTok Ads or TikTok marketing tracking tags?",
        answer:
          "No. ByteSpider is an automated web crawler used for ByteDance LLMs and search indexing. TikTok Pixel tracking (events.js) and TikTok in-app ad conversions are executed client-side on user devices and are entirely unaffected by robots.txt rules.",
      },
    ],
  },

  // 9. SVG CSS Background Hash Encoding
  {
    slug: "svg-css-background-hash-encoding",
    title: "Fixing Broken Inline SVG CSS Backgrounds Caused by Unescaped Hash Symbols",
    description:
      "Fix invisible inline SVG CSS backgrounds in WebKit and Chromium browsers by properly percent-encoding hash symbols (# to %23). Maximize UI rendering performance.",
    category: "Core Web Vitals",
    readingTime: "3 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "svg-to-data-uri",
    relatedToolName: "SVG to Base64 & Data URI Optimizer",
    relatedToolCta: "Auto-Encode SVGs for CSS in Tool #33",
    problemSummary:
      "Modern WebKit and Chromium browsers treat the hash symbol (#) in data:image/svg+xml as a URI fragment identifier, causing SVGs with hex colors to fail rendering silently.",
    errorSnippet:
      "CSS background icon does not appear, inspecting url() shows incomplete XML string cutoff at #hex",
    solutionSnippet: `/* BROKEN: url('data:image/svg+xml,<svg fill="#3b82f6">...</svg>') */

/* FIXED: Replace # with %23 */
.custom-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}`,
    snippetLanguage: "css",
    implementationSteps: [
      {
        title: "1. Percent-Encode Hex Color Hash (# to %23)",
        explanation:
          "Replace all # fill and stroke hex values with %23.",
      },
      {
        title: "2. Use Single Quotes for XML Attributes",
        explanation:
          "Replace double quotes with single quotes inside the SVG markup.",
      },
      {
        title: "3. Verify SVG Namespace Declaration",
        explanation:
          "Verify the xmlns=\"http://www.w3.org/2000/svg\" attribute is present.",
      },
    ],
    commonPitfalls: [
      "Converting to Base64 when standard %23 encoding produces a 30% smaller byte payload.",
      "Omitting the xmlns='http://www.w3.org/2000/svg' namespace attribute, which causes WebKit and Firefox to discard the image.",
      "Leaving unencoded whitespace and line breaks in strict CSS minifier pipelines.",
      "Unescaped double quotes breaking CSS background-image property parsers.",
    ],
    faqItems: [
      {
        question: "Why is percent-encoded SVG better than Base64 in CSS background images?",
        answer:
          "Base64 encoding increases data payload size by ~33% and cannot be Gzipped as effectively as plain text SVG. Percent-encoding (URL encoding) only escapes special characters like # (%23) and < > (%3C %3E), resulting in a substantially smaller CSS file and faster parse time.",
      },
      {
        question: "Which characters must be encoded in SVG data URIs across all browsers?",
        answer:
          "At minimum, '#' must be encoded as '%23' (to prevent URI fragment truncation), '<' as '%3C', '>' as '%3E', and any internal quotes matching the enclosing CSS url() delimiter. Characters like letters, numbers, spaces, and hyphens can remain unencoded in modern CSS.",
      },
      {
        question: "Do inline SVG data URIs block the browser's main thread?",
        answer:
          "No, inline SVG data URIs execute synchronously during CSS layout computation without triggering additional HTTP network requests. However, avoid embedding multi-megabyte SVGs into CSS stylesheets to keep the critical CSS bundle under the 14KB initial TCP window.",
      },
    ],
  },

  // 10. Next.js Fix Canonical Trailing Slash Mismatch
  {
    slug: "nextjs-fix-canonical-trailing-slash-mismatch",
    title: "How to Align Next.js App Router Metadata Canonical URLs with Trailing Slashes",
    description:
      "Resolve Google Search Console duplicate canonical redirect errors in Next.js App Router by synchronizing metadata alternates canonical URLs with trailingSlash config.",
    category: "Next.js & React",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "canonical-url-builder",
    relatedToolName: "Canonical URL Builder",
    relatedToolCta: "Build Canonical Tags in Tool #12",
    problemSummary:
      "Setting canonical: '/about' in Next.js metadata when next.config.mjs uses trailingSlash: true creates a self-referential canonical pointing to a 308 redirect URL.",
    errorSnippet:
      "Google Search Console: Alternate page with proper canonical tag / Page with redirect",
    solutionSnippet: `// app/layout.tsx or app/[slug]/page.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://omniseotools.com'),
  alternates: {
    canonical: './',
  },
};

// Or explicit exact pathname:
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: \`https://omniseotools.com/tools/\${params.slug}/\`,
    },
  };
}`,
    snippetLanguage: "typescript",
    implementationSteps: [
      {
        title: "1. Audit next.config.mjs Trailing Slash Setting",
        explanation:
          "Check next.config.mjs trailingSlash configuration boolean.",
      },
      {
        title: "2. Define Explicit metadataBase in Root Layout",
        explanation:
          "Ensure metadataBase is explicitly defined in root layout.",
      },
      {
        title: "3. Synchronize Alternates with Server Response Headers",
        explanation:
          "Match trailing slash presence between metadata.alternates.canonical and server response headers.",
      },
    ],
    commonPitfalls: [
      "Forgetting the metadataBase URL, causing Next.js to omit the canonical or output relative paths.",
      "Hardcoding trailing slashes in canonical tags while next.config.mjs has trailingSlash: false (or vice versa).",
      "Including pagination or tracking query parameters (?page=1&utm_source=...) in the canonical URL tag.",
      "Setting canonical URLs pointing to HTTP when the site serves over HTTPS.",
    ],
    faqItems: [
      {
        question: "What happens if my canonical URL points to a redirect (301/308) URL?",
        answer:
          "Google Search Console flags this as 'Alternate page with proper canonical tag' or 'Page with redirect'. Googlebot may ignore your canonical hint entirely and pick its own arbitrary canonical URL, diluting ranking signals across duplicate variations.",
      },
      {
        question: "Can I use relative URLs in Next.js App Router alternates.canonical?",
        answer:
          "Yes, if you configure metadataBase: new URL('https://yourdomain.com') in your root layout. Next.js automatically converts relative paths like alternates: { canonical: '/about' } into fully qualified absolute URLs (https://yourdomain.com/about).",
      },
      {
        question: "How do I ensure sitemap.xml URLs match my canonical URLs in Next.js?",
        answer:
          "In your app/sitemap.ts generation function, dynamically construct URLs using the exact same path formatting function or metadataBase origin used in your page generateMetadata functions to guarantee 100% alignment.",
      },
    ],
  },

  // 11. GSC Filter Question Intent Regex
  {
    slug: "gsc-filter-question-intent-regex",
    title: "How to Filter Question & FAQ Keywords in Google Search Console Using RE2 Regex",
    description:
      "Extract high-intent question and FAQ queries (who, what, where, how) in Google Search Console using RE2-compliant regular expressions. Segment informational search intent without syntax errors.",
    category: "SEO & Search Console",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "gsc-regex-filter-builder",
    relatedToolName: "Google Search Console Regex Filter Builder",
    relatedToolCta: "Build Custom GSC Query Regex in Tool #36",
    problemSummary:
      "Standard GSC filters only support single strings. Finding informational question queries (who, what, where, how) requires RE2-compliant regular expressions that do not crash Google's filter engine.",
    errorSnippet:
      "Invalid regular expression: lookahead assertion not supported in RE2",
    solutionSnippet: `^(who|what|where|when|why|how|can|does|is|are)\\b.*`,
    snippetLanguage: "plaintext",
    implementationSteps: [
      {
        title: "1. Access Performance Report in Search Console",
        explanation:
          "Log into Google Search Console, select your target domain or URL prefix property, and open the Performance report for Search Results.",
      },
      {
        title: "2. Add Custom Regex Query Filter",
        explanation:
          "Click '+ New' at the top filter bar, choose 'Query...', switch the filter mode dropdown from 'Queries containing' to 'Custom (regex)', and ensure 'Matches regex' is selected.",
      },
      {
        title: "3. Apply RE2 Anchored Question Expression",
        explanation:
          "Paste ^(who|what|where|when|why|how|can|does|is|are)\\b.* into the query box. The caret (^) ensures queries starting with interrogative question words are captured while \\b prevents matching words like 'cancel' or 'isolate'.",
      },
      {
        title: "4. Analyze Informational Clicks and CTRs",
        explanation:
          "Sort queries by Impressions to discover high-volume FAQ opportunities and identify pages that need schema markup or dedicated FAQ sections.",
      },
    ],
    commonPitfalls: [
      "Using standard PCRE lookahead syntax like (?=...) which is unsupported by Google's RE2 engine and causes filter validation failures.",
      "Omitting the word boundary (\\b) after question stems, causing false positive matches on words like 'carpet' (car), 'cancel' (can), or 'island' (is).",
      "Forgetting that GSC performance queries are lowercased by default, making uppercase assertions redundant unless using case-insensitive flags in URL filters.",
      "Not capturing mid-sentence questions (e.g., 'guide on how to fix') which require unanchored regex patterns like \\b(who|what|where|how)\\b.",
    ],
    faqItems: [
      {
        question: "How do I filter questions that appear in the middle of search queries in GSC?",
        answer:
          "Remove the start-of-line anchor (^) and use word boundaries around the interrogative stems: \\b(who|what|where|when|why|how|can|does|is|are)\\b.*. This matches queries like 'guide on how to convert punycode' or 'tutorial what is re2 regex'.",
      },
      {
        question: "Are regular expressions in Google Search Console case-sensitive?",
        answer:
          "Search queries in GSC are stored in lowercase, so query regex filters operate case-insensitively in practice. However, Page URL filters in GSC are strictly case-sensitive unless you prepend the RE2 case-insensitive modifier (?i).",
      },
      {
        question: "How can I export and cluster GSC question queries for content optimization?",
        answer:
          "Apply the RE2 question filter in GSC, click 'Export' (Google Sheets or CSV), and import the dataset into a spreadsheet or Python script. Group questions by root interrogative keyword (how vs what vs can) to build targeted FAQ schema modules.",
      },
    ],
  },

  // 12. International Domain Punycode Hreflang Sitemap
  {
    slug: "international-domain-punycode-hreflang-sitemap",
    title: "Fixing Invalid URL Syntax for Internationalized Domains (IDN) in XML Sitemaps",
    description:
      "Resolve Google Search Console XML sitemap schema validation errors for Internationalized Domain Names (IDNs). Convert Arabic, Cyrillic, and umlaut domains into RFC 3492 ASCII Punycode (xn--).",
    category: "International SEO",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "idn-punycode-converter",
    relatedToolName: "Unicode & Punycode (IDN) Converter",
    relatedToolCta: "Convert IDNs to Punycode in Tool #37",
    problemSummary:
      "Submitting non-ASCII native Unicode domains (e.g., Arabic, Cyrillic, or German umlaut URLs) directly inside XML sitemap loc tags causes XML schema validation errors or crawler drops.",
    errorSnippet:
      "Google Search Console: Invalid URL in XML sitemap / Error: Illegal character in URL",
    solutionSnippet: `<!-- INCORRECT (Triggers XML schema parser error on non-ASCII characters) -->
<url>
  <loc>https://münchen-hotel.de/angebote</loc>
</url>

<!-- CORRECT (PUNYCODE RFC 3492 Hostname + Percent-Encoded UTF-8 Path) -->
<url>
  <loc>https://xn--mnchen-hotel-dlb.de/angebote</loc>
  <xhtml:link 
    rel="alternate" 
    hreflang="de" 
    href="https://xn--mnchen-hotel-dlb.de/angebote" />
  <xhtml:link 
    rel="alternate" 
    hreflang="ar" 
    href="https://xn--mgbaam7a8h.xn--mgbc5a4d/offers" />
</url>`,
    snippetLanguage: "xml",
    implementationSteps: [
      {
        title: "1. Convert IDN Hostnames to RFC 3492 Punycode (xn--)",
        explanation:
          "Pass non-ASCII domain labels through an RFC 3492 IDNA algorithm. Convert 'münchen-hotel.de' to 'xn--mnchen-hotel-dlb.de' or Arabic 'امارات.موقع' to 'xn--mgbh0fb.xn--mgbaam7a8h'.",
      },
      {
        title: "2. Percent-Encode Non-ASCII URL Path and Query Segments",
        explanation:
          "Punycode applies strictly to domain hostnames (RFC 5891). Path segments, directory names, and query parameters must be percent-encoded (%20, %D9%85, etc.) rather than Punycode-encoded.",
      },
      {
        title: "3. Update Sitemaps and Hreflang Tags Uniformly",
        explanation:
          "Ensure all <loc> entries, xhtml:link hreflang targets, and HTML <link rel='canonical'> tags use the exact ASCII Punycode hostname.",
      },
      {
        title: "4. Validate Sitemaps Against the W3C XML Schema",
        explanation:
          "Test your generated sitemap.xml with xmllint or an online sitemap validator to ensure no unescaped UTF-8 code points remain in <loc> elements.",
      },
    ],
    commonPitfalls: [
      "Punycode-encoding URL paths or slugs (e.g., https://example.com/xn--foo) instead of standard UTF-8 percent-encoding (%D8%A3...). Punycode is only valid for hostnames.",
      "Mismatched canonical URLs where the HTML head uses native Unicode (münchen.de) while the XML sitemap specifies Punycode (xn--mnchen-3ya.de).",
      "Submitting unencoded Arabic or Cyrillic characters in XML <loc> tags, causing search engines to reject the entire sitemap file with an XML parsing exception.",
      "Using older Punycode conversion algorithms that mangle emoji domains or supplemental plane 1 Unicode characters.",
    ],
    faqItems: [
      {
        question: "Why do search engines require Punycode in XML sitemaps if browsers display Unicode?",
        answer:
          "The XML Sitemap protocol specification (sitemaps.org) mandates that all URLs must follow RFC 3986 (URI Generic Syntax) and RFC 3492. Because raw non-ASCII characters violate URI syntax rules, XML parsers and search bots require ASCII Compatible Encoding (ACE / xn--) for hostnames.",
      },
      {
        question: "Should hreflang tags use the Punycode version or the native Unicode domain?",
        answer:
          "Hreflang annotations must strictly use the canonical ASCII Punycode hostname (e.g., href='https://xn--mnchen-hotel-dlb.de/'). While modern browsers visually decode Punycode in the address bar, search bots evaluate hreflang clusters at the raw HTTP and DNS transport layer.",
      },
      {
        question: "How do SSL/TLS certificates work with Internationalized Domain Names (IDNs)?",
        answer:
          "Certificate Authorities (CAs) issue SSL/TLS certificates using the ASCII Punycode representation in the Common Name (CN) and Subject Alternative Name (SAN) fields (e.g., SAN: xn--mnchen-3ya.de). Browsers automatically map the certificate to the visual native script when users browse via HTTPS.",
      },
    ],
  },

  // 13. Next.js Hydration Mismatch Browser Extension
  {
    slug: "nextjs-hydration-mismatch-browser-extension",
    title: "Fixing Next.js Hydration Failed Errors Caused by Chrome Extensions",
    description:
      "Eliminate React Hydration Error #418 and #423 in Next.js App Router triggered by Chrome browser extensions like Grammarly or password managers modifying DOM nodes before hydration.",
    category: "Next.js & React",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "csp-header-builder",
    relatedToolName: "Content Security Policy (CSP) & Header Builder",
    relatedToolCta: "Generate Clean CSP Policies in Tool #35",
    problemSummary:
      "Browser extensions (Grammarly, password managers, dark mode extensions) inject custom attributes or HTML nodes into <body> before hydration completes, throwing React Hydration error #418 or #423.",
    errorSnippet:
      "Hydration failed because the initial UI does not match what was rendered on the server. Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded, data-gr-ext-installed",
    solutionSnippet: `// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Next.js Application',
  description: 'Clean SSR Hydration without extension warnings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning on <html> and <body> ignores extension-injected attributes
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-900 text-slate-100 antialiased"
      >
        {children}
      </body>
    </html>
  );
}`,
    snippetLanguage: "typescript",
    implementationSteps: [
      {
        title: "1. Identify the Injected Extension Attributes",
        explanation:
          "Inspect the browser developer console for warnings specifying injected attributes such as 'data-new-gr-c-s-check-loaded' (Grammarly), 'data-lastpass-root', or 'cz-shortcut-listen' (ColorZilla).",
      },
      {
        title: "2. Apply suppressHydrationWarning to Root <html> and <body>",
        explanation:
          "Add suppressHydrationWarning to both <html> and <body> elements in app/layout.tsx. React only suppresses warnings 1 level deep on these tags, allowing your internal UI tree to maintain strict validation.",
      },
      {
        title: "3. Isolate Client-Side Only DOM State",
        explanation:
          "If rendering browser-dependent data (e.g., navigator.userAgent, window.innerWidth, or localStorage theme toggles), initialize with a null/fallback SSR state and update inside useEffect or using next/dynamic with ssr: false.",
      },
      {
        title: "4. Test with Clean Browser Profile",
        explanation:
          "Verify the fix by opening an Incognito / Private window with all extensions disabled to ensure no genuine component hydration bugs remain.",
      },
    ],
    commonPitfalls: [
      "Applying suppressHydrationWarning indiscriminately to deep child components instead of the root layout wrapper, hiding actual application logic bugs.",
      "Rendering Date.now() or Math.random() directly during server rendering, which always produces mismatched HTML between server and client.",
      "Placing block-level elements (<p><div></div></p>) inside paragraph tags, causing the browser HTML parser to restructure the DOM before React hydrates.",
      "Assuming hydration warnings only affect development mode; severe hydration mismatches force React to discard server-rendered HTML and re-render the entire DOM on the client, degrading Interaction to Next Paint (INP).",
    ],
    faqItems: [
      {
        question: "Does a React hydration mismatch error impact my website's SEO ranking?",
        answer:
          "Hydration errors occur client-side after the server HTML is already delivered. Googlebot crawls the raw SSR HTML response, so basic extension-related hydration warnings do not prevent indexing. However, if a severe mismatch triggers a full client re-render, it degrades Core Web Vitals (INP and LCP), which indirectly affects search rankings.",
      },
      {
        question: "What is the difference between suppressHydrationWarning and dynamic imports with ssr: false?",
        answer:
          "suppressHydrationWarning tells React to ignore attribute mismatches on that specific DOM node during hydration without disabling server-side rendering. In contrast, next/dynamic with { ssr: false } completely disables server rendering for that component, emitting empty markup on the server until client JavaScript runs.",
      },
      {
        question: "Why does suppressHydrationWarning only work one level deep?",
        answer:
          "React intentionally limits suppressHydrationWarning to shallow attribute comparisons on the target element. It does not silence mismatches in text content or child elements, ensuring critical layout and state bugs in child components are not hidden.",
      },
    ],
  },

  // 14. GSC Exclude Brand Traffic Regex
  {
    slug: "gsc-exclude-brand-traffic-regex",
    title: "How to Exclude Brand Searches in Google Search Console with RE2 Regex",
    description:
      "Filter out branded keyword queries, typos, and common spacing variations in Google Search Console using RE2 regex to measure true non-brand organic search performance.",
    category: "SEO & Search Console",
    readingTime: "3 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "gsc-regex-filter-builder",
    relatedToolName: "Google Search Console Regex Filter Builder",
    relatedToolCta: "Build Non-Brand Regex in Tool #36",
    problemSummary:
      "Measuring pure non-branded organic growth is impossible with basic GSC filters when users search brand spelling variations, misspellings, or compound brand names.",
    errorSnippet:
      "GSC Performance report skewed by branded navigation queries and typo variations",
    solutionSnippet: `(?i)(brandname|brand\\s*name|brndname|brand-name)`,
    snippetLanguage: "plaintext",
    implementationSteps: [
      {
        title: "1. Compile Brand Names, Typos, and Spacing Variants",
        explanation:
          "List all permutations of your company name: full brand, spaced words ('brand name'), hyphenated ('brand-name'), common phonetic typos ('brndname', 'bandname'), and executive names.",
      },
      {
        title: "2. Construct the RE2 Alternation Pattern",
        explanation:
          "Combine the variations into an unanchored grouped alternation: (?i)(brandname|brand\\s*name|brndname|brand-name). The \\s* matches optional whitespace between compound words.",
      },
      {
        title: "3. Configure GSC Query Negative Filter",
        explanation:
          "In Google Search Console > Performance > Search results, click '+ New' > Query... > 'Custom (regex)', select 'Doesn't match regex' from the dropdown, and paste your compiled pattern.",
      },
      {
        title: "4. Benchmark True Non-Branded SEO Growth",
        explanation:
          "Save the filtered report view. Compare impressions, average CTR, and top ranking URLs to identify organic content opportunities that drive discovery traffic rather than navigational queries.",
      },
    ],
    commonPitfalls: [
      "Forgetting the (?i) case-insensitive modifier in RE2 patterns, causing capitalized brand searches or CamelCase names to leak through.",
      "Using overly short brand acronyms (e.g., 'gap' or 'target') without word boundaries (\\b), accidentally filtering out valid non-brand terms like 'closing the gap' or 'target audience'.",
      "Using 'Matches regex' instead of 'Doesn't match regex' when the goal is to isolate non-branded search traffic.",
      "Failing to account for localized spelling differences or international brand suffixes (e.g., 'Brand UK', 'Brand Deutschland').",
    ],
    faqItems: [
      {
        question: "Why is isolating non-brand search traffic essential for SEO performance tracking?",
        answer:
          "Brand queries reflect brand awareness, offline marketing, and direct consumer intent rather than content optimization or technical SEO. Excluding branded queries isolates pure organic discovery keywords, providing an accurate measure of SEO content ROI and non-brand keyword rankings.",
      },
      {
        question: "How do I handle short brand names that conflict with common English dictionary words?",
        answer:
          "Use strict word boundary assertions (\\b) around short brand names. For example, for a brand named 'Apex', use \\bapex\\b rather than apex alone so queries like 'capex calculation' are not mistakenly excluded.",
      },
      {
        question: "Can I save my non-branded regex filter in Google Search Console?",
        answer:
          "GSC does not have a native 'Save Filter' feature, but all active filters are stored in the browser URL parameters. Bookmark the filtered URL or export the data to Looker Studio (formerly Data Studio) with a persistent regex filter parameter.",
      },
    ],
  },

  // 15. Vercel Redirect Loop Trailing Slash Next.js
  {
    slug: "vercel-redirect-loop-trailing-slash-nextjs",
    title: "Fixing Infinite 308 Redirect Loops Between Vercel and Next.js Trailing Slashes",
    description:
      "Resolve infinite 308 redirect loops between Vercel Edge routing rules and Next.js App Router trailingSlash settings. Configure skipTrailingSlashRedirect and avoid edge proxy conflicts.",
    category: "Server & Nginx",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "redirect-regex-mapper",
    relatedToolName: "Redirect & Regex URL Mapper",
    relatedToolCta: "Debug Redirect Rules in Tool #29",
    problemSummary:
      "Conflicts between vercel.json cleanUrls/trailingSlash settings and next.config.mjs trailingSlash cause edge routers and Next.js servers to bounce requests endlessly with 308 status codes.",
    errorSnippet:
      "ERR_TOO_MANY_REDIRECTS / 308 Permanent Redirect loop between /about and /about/",
    solutionSnippet: `// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enforce strict no-trailing-slash policy across Next.js
  trailingSlash: false,

  // 2. Prevent internal Next.js router from competing with Vercel Edge routing
  skipTrailingSlashRedirect: true,

  // 3. Define explicit single-direction canonical redirects
  async redirects() {
    return [
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true, // HTTP 308
      },
    ];
  },
};

export default nextConfig;`,
    snippetLanguage: "javascript",
    implementationSteps: [
      {
        title: "1. Clean Up vercel.json Edge Configuration",
        explanation:
          "Remove conflicting 'cleanUrls: true' or 'trailingSlash: true' keys from vercel.json. Next.js handles route canonicalization natively on Vercel.",
      },
      {
        title: "2. Configure next.config.mjs with skipTrailingSlashRedirect",
        explanation:
          "Set trailingSlash: false and add skipTrailingSlashRedirect: true in next.config.mjs to bypass automatic internal redirect races on edge routes.",
      },
      {
        title: "3. Align Middleware Path Processing",
        explanation:
          "If using middleware.ts, ensure rewrite or redirect logic strips trailing slashes before invoking NextResponse.next() to avoid ping-pong loops.",
      },
      {
        title: "4. Verify HTTP Status Codes with cURL",
        explanation:
          "Execute curl -IL https://yourdomain.com/about/ in your terminal. Verify exactly one 308 redirect occurs directly to https://yourdomain.com/about with a 200 OK final response.",
      },
    ],
    commonPitfalls: [
      "Enabling trailingSlash in vercel.json while simultaneously configuring trailingSlash: false in next.config.mjs.",
      "Having third-party reverse proxies (Cloudflare Page Rules, Fastly, AWS CloudFront) rewrite /about to /about/ while Next.js rewrites /about/ to /about.",
      "Testing redirects in Chrome without clearing the HTTP 308 cache; browsers cache 308 permanent redirects aggressively on disk.",
      "Applying redirects to internal _next/static, _next/image, or API routes, breaking hydration and image optimization.",
    ],
    faqItems: [
      {
        question: "Why does a 308 Permanent Redirect loop break Google Search Console indexing?",
        answer:
          "Googlebot follows up to 5 redirect hops before aborting crawl execution. When a cyclical 308 loop occurs, Googlebot marks the URL as 'Page with redirect' error, drops it from the search index, and stops indexing downstream canonical links.",
      },
      {
        question: "How do I test redirect chains without browser cache interference?",
        answer:
          "Use command-line curl with follow-redirects: curl -IL https://yourdomain.com/about/. This outputs the complete HTTP status sequence (e.g., 308 -> 200) and headers (Location, Server, Cache-Control) without local browser caching.",
      },
      {
        question: "What does skipTrailingSlashRedirect do in Next.js?",
        answer:
          "skipTrailingSlashRedirect is a Next.js configuration flag that disables Next.js's built-in automatic redirect handling for trailing slashes. This allows custom middleware, edge functions, or hosting platforms (like Vercel or Cloudflare) to manage URL normalization without competing internal redirects.",
      },
    ],
  },

  // 16. Fix GA4 UTM Casing Fragmentation
  {
    slug: "fix-ga4-utm-source-capitalization-fragmentation",
    title: "How to Fix GA4 UTM Casing Fragmentation (Uppercase vs Lowercase)",
    description:
      "Learn how to resolve fragmented source/medium traffic in Google Analytics 4 caused by mixed-case UTM parameters, with automated regex fixes and client-side sanitization.",
    category: "SEO & Search Console",
    readingTime: "4 min read",
    lastUpdated: "September 2026",
    relatedToolSlug: "bulk-utm-matrix-generator",
    relatedToolName: "Bulk UTM Matrix & Multi-Channel Tagging Generator",
    relatedToolCta: "Enforce Lowercase UTMs in Bulk (Tool #34)",
    problemSummary:
      "Google Analytics 4 is strictly case-sensitive. When campaigns use mixed casing like utm_source=Facebook and utm_source=facebook, GA4 splits attribution into two separate rows and breaks Default Channel Grouping rules, causing high-value ad traffic to get dumped into the 'Unassigned' channel bucket.",
    errorSnippet:
      "GA4 Traffic Acquisition Report Fragmented Rows:\n- Session source / medium: Facebook / Paid_Social -> Channel Group: Unassigned (1,420 sessions)\n- Session source / medium: facebook / paid_social -> Channel Group: Paid Social (4,890 sessions)\n-> Result: Attribution split, distorted ROI calculations, and broken automated conversion reporting.",
    solutionSnippet: `// Pure TypeScript Client-Side UTM Sanitizer
export function sanitizeUtmUrl(rawUrl: string): string {
  const url = new URL(rawUrl);
  const keys = Array.from(url.searchParams.keys());
  keys.forEach((k) => {
    if (k.toLowerCase().startsWith("utm_")) {
      const v = url.searchParams.get(k) || "";
      url.searchParams.delete(k);
      url.searchParams.set(k.toLowerCase(), v.toLowerCase().trim().replace(/\\s+/g, "-"));
    }
  });
  return url.toString();
}

// Next.js Edge Middleware Redirect (middleware.ts)
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let hasUppercaseUtm = false;

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    if (key.toLowerCase().startsWith("utm_")) {
      const lowerKey = key.toLowerCase();
      const lowerVal = value.toLowerCase().trim().replace(/\\s+/g, "-");

      if (key !== lowerKey || value !== lowerVal) {
        url.searchParams.delete(key);
        url.searchParams.set(lowerKey, lowerVal);
        hasUppercaseUtm = true;
      }
    }
  }

  if (hasUppercaseUtm) {
    return NextResponse.redirect(url, 301); // 301 Permanent Redirect
  }

  return NextResponse.next();
}`,
    snippetLanguage: "typescript",
    implementationSteps: [
      {
        title: "1. Identify Fragmented Rows in GA4",
        explanation:
          "Navigate to Reports > Acquisition > Traffic Acquisition in GA4 and set primary dimension to Session source / medium. Filter by regex '(?i)facebook|google' to isolate mixed-case duplicate entries.",
      },
      {
        title: "2. Standardize Naming Conventions",
        explanation:
          "Enforce all-lowercase values across utm_source, utm_medium, and utm_campaign in team tracking sheets and ad platforms, replacing spaces with hyphens.",
      },
      {
        title: "3. Automate URL Sanitization",
        explanation:
          "Use client-side enforcement to auto-lowercase URL query parameters prior to pushing ad links live, or implement edge middleware to rewrite casing automatically.",
      },
      {
        title: "4. Historical Data Note",
        explanation:
          "GA4 does not retroactively rewrite historic data; fixes apply only to newly collected sessions. Use Custom Channel Groups or Looker Studio LOWER() calculations for historical views.",
      },
    ],
    commonPitfalls: [
      "Tagging internal site navigation with UTMs, which destroys original session acquisition attribution.",
      "Unencoded spaces in UTM values becoming %20 or + in analytics tables.",
      "Mixing kebab-case (summer-sale) and snake_case (summer_sale) across ad managers.",
      "Re-sharing existing campaign links without stripping pre-existing uppercase UTM parameters.",
    ],
    faqItems: [
      {
        question: "Why does GA4 separate uppercase and lowercase UTM tags?",
        answer:
          "Google Analytics 4 is strictly case-sensitive in its backend data ingestion pipeline. It treats strings like 'Facebook', 'facebook', and 'FACEBOOK' as separate source values, and capitalized values fail Default Channel Grouping regex rules.",
      },
      {
        question: "Can you merge historical split sessions in GA4?",
        answer:
          "No. GA4 does not retroactively rewrite historical session logs. However, you can unify historical views by creating a Custom Channel Group in Admin settings using case-insensitive regex rules, or by applying LOWER(Session source / medium) in Looker Studio or BigQuery.",
      },
      {
        question: "What is the recommended GA4 casing convention?",
        answer:
          "The universal enterprise best practice is strict all-lowercase alphanumeric strings (e.g., utm_source=facebook, utm_medium=paid_social, utm_campaign=summer_sale_2026) with hyphen or underscore delimiters and zero spaces.",
      },
    ],
  },
];

export function getAllRecipes(): Recipe[] {
  return RECIPES_DATA;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return RECIPES_DATA.find((r) => r.slug.toLowerCase() === normalized);
}

export function getRecipesByCategory(category: RecipeCategory): Recipe[] {
  return RECIPES_DATA.filter((r) => r.category === category);
}
