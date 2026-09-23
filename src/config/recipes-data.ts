export type RecipeCategory =
  | "Next.js & React"
  | "Core Web Vitals"
  | "AI & Crawlers"
  | "Server & Nginx";

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
