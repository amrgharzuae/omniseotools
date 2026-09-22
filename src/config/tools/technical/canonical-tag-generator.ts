import { ToolDefinition } from "@/types/tool";

export const canonicalTagGeneratorTool: ToolDefinition = {
  id: "canonical-tag-generator",
  slug: "canonical-tag-generator",
  name: "Bulk Canonical Normalizer & Auditor",
  title: "Bulk Canonical URL Normalizer & SEO Auditor | OmniSEO Tools",
  metaTitle: "Bulk Canonical URL Normalizer & SEO Auditor | OmniSEO Tools",
  metaDescription:
    "Clean tracking parameters, enforce lowercase paths, standardize trailing slashes, and audit URLs in bulk with our 100% client-side canonical tool.",
  h1: "Bulk Canonical URL Normalizer & Tag Auditor",
  tagline:
    "Audit and normalize multiple URLs simultaneously. Clean trailing slashes, strip tracking parameters, and verify Google compliance.",
  shortDescription:
    "Audit raw URLs in bulk, strip tracking parameters (UTMs/gclid), enforce trailing slash rules, and detect duplicate content risks.",
  category: "technical",
  icon: "ShieldCheck",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "canonical tag generator",
    "canonical tag auditor",
    "rel canonical generator",
    "canonical url builder",
    "duplicate content fix",
    "nextjs alternates canonical",
    "http link canonical header",
    "trailing slash normalizer",
    "url parameter stripper",
    "utm stripper canonical",
  ],
  howToSteps: [
    {
      name: "Enter Target URL or Batch List",
      text: "Input a single webpage URL or toggle Batch Mode to paste up to 25 URLs simultaneously for bulk canonicalization.",
    },
    {
      name: "Configure Normalization Rules",
      text: "Select your trailing slash policy (Enforce, Remove, or Keep), enable HTTPS protocol enforcement, and activate automated tracking parameter stripping (UTMs, GCLID, FBCLID).",
    },
    {
      name: "Inspect Real-Time Hygiene Audit",
      text: "Review instant diagnostic alerts flagging relative URLs, non-HTTPS protocols, remaining query strings, and pagination parameters.",
    },
    {
      name: "Select Preferred Code Output Format",
      text: "Choose between HTML5 <link rel='canonical'>, HTTP Link response headers (for PDFs/documents), or Next.js App Router Metadata TypeScript snippets.",
    },
    {
      name: "Copy or Export Canonical Tags",
      text: "Copy the formatted code snippet to your clipboard or export batch results directly to CSV with UTF-8 Excel compatibility.",
    },
  ],
  guideContent: {
    title: "The Authoritative Guide to Rel=Canonical, URL Normalization & Duplicate Content Prevention",
    sections: [
      {
        heading: "What is a Canonical Tag and Why Does Google Require It?",
        content:
          "<p>A <strong>canonical tag</strong> (represented by the HTML element <code>&lt;link rel=\"canonical\" href=\"https://example.com/page\" /&gt;</code>) is a search engine directive that informs web crawlers (like Googlebot and Bingbot) which version of a webpage is the master, authoritative copy.</p><p>In modern web development, a single unique piece of content is frequently accessible via dozens of distinct URL permutations, including:</p><ul><li><strong>Protocol Permutations:</strong> <code>http://example.com</code> vs. <code>https://example.com</code>.</li><li><strong>Subdomain Variations:</strong> <code>https://example.com</code> vs. <code>https://www.example.com</code>.</li><li><strong>Trailing Slash Differences:</strong> <code>https://example.com/blog</code> vs. <code>https://example.com/blog/</code>.</li><li><strong>Campaign & Tracking Parameters:</strong> <code>https://example.com/page?utm_source=google&amp;gclid=123</code>.</li><li><strong>Faceted Navigation & Sorting:</strong> <code>https://example.com/shop?sort=price_asc&amp;color=blue</code>.</li><li><strong>Pagination Permutations:</strong> <code>https://example.com/category/news?page=1</code> vs. <code>https://example.com/category/news</code>.</li></ul><p>Without an explicit canonical tag, search engines treat each permutation as a distinct URL, diluting <strong>PageRank (link equity)</strong> across duplicates and risking algorithmic duplicate content devaluation. Declaring a canonical tag consolidates all ranking signals onto your preferred URL.</p>",
        keyTakeaways: [
          "Canonical tags tell search engines which URL version is the authoritative master copy.",
          "Consolidates link equity and PageRank across tracking parameters, protocols, and trailing slash variations.",
          "Essential for e-commerce faceted navigation, blog pagination, and campaign tracking URLs.",
        ],
      },
      {
        heading: "HTML <link> Tags vs. HTTP Link Response Headers (When to Use Which)",
        content:
          "<p>While most developers implement canonicalization via HTML <code>&lt;head&gt;</code> elements, Google officially supports two distinct implementation methods according to RFC 5988 / RFC 6596:</p><ol><li><strong>HTML &lt;link rel=\"canonical\"&gt; (Standard Webpages):</strong> Injected inside the <code>&lt;head&gt;</code> section of standard HTML documents. Supported by all browsers and search engines.</li><li><strong>HTTP \"Link\" Response Header (PDFs & Non-HTML Files):</strong> When publishing downloadable assets (such as PDF whitepapers, Word documents, JSON feeds, or image files), there is no HTML <code>&lt;head&gt;</code> container. Search engines support declaring canonicals via HTTP server response headers:<pre><code>Link: &lt;https://example.com/whitepaper.pdf&gt;; rel=\"canonical\"</code></pre>This can be configured at the CDN, Nginx, Apache, or Next.js middleware level.</li></ol>",
        keyTakeaways: [
          "Use HTML <link rel='canonical'> inside the <head> of standard web pages.",
          "Use HTTP Link response headers for PDF documents, downloadable whitepapers, and non-HTML assets.",
          "Never declare conflicting canonicals between HTML <head> and HTTP headers on the same URL.",
        ],
      },
      {
        heading: "Common Canonicalization Pitfalls & Critical SEO Mistakes",
        content:
          "<p>Incorrectly configured canonical tags can cause severe de-indexing or search ranking drops. The most critical mistakes to avoid include:</p><ul><li><strong>Using Relative URLs:</strong> <code>&lt;link rel=\"canonical\" href=\"/products/shoes\" /&gt;</code> is prone to parsing errors when crawled across multiple subdomains or CDNs. Google strongly advises using <strong>absolute HTTPS URLs</strong> (e.g., <code>https://example.com/products/shoes</code>).</li><li><strong>Canonicalizing to a 301 Redirect or 404 Page:</strong> A canonical tag must always point directly to a live, indexable HTTP 200 destination. Pointing a canonical tag to a redirected URL (301) or a broken page (404) forces Googlebot to guess the canonical target, often causing indexation dropouts.</li><li><strong>Self-Referential Canonicalization Omission:</strong> Every clean, authoritative page should declare a self-referential canonical tag pointing to itself. This guarantees that if a scraper copies your HTML or an ad network appends tracking parameters, search engines still attribute original credit to your source URL.</li><li><strong>Conflicting Directives (Canonical + Noindex):</strong> Never declare a canonical tag pointing to URL A while simultaneously serving a <code>noindex</code> meta tag on URL A. These directives conflict directly.</li></ul>",
        keyTakeaways: [
          "Always use absolute HTTPS URLs with explicit domains in canonical declarations.",
          "Ensure canonical targets return HTTP 200 OK (never 301 redirects or 404 errors).",
          "Include self-referential canonical tags on all original content to protect against syndication and scrapers.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between a 301 redirect and a canonical tag?",
      answer:
        "A 301 redirect is a server-level instruction that automatically forwards visitors and search engines from an old URL to a new URL. A canonical tag is a softer hint for search engines indicating the preferred version of a page while allowing visitors to access both URLs without redirection (ideal for tracking links and sort filters).",
    },
    {
      question: "Should every page on my website have a self-referencing canonical tag?",
      answer:
        "Yes! Google explicitly recommends implementing self-referential canonical tags on every unique indexable page. This protects your original content from being de-indexed if external websites syndicate your content or if users link to your page with query strings or session identifiers.",
    },
    {
      question: "How do I implement canonical tags in Next.js App Router?",
      answer:
        "In Next.js App Router (app/ directory), define the canonical URL within the Metadata object inside page.tsx or layout.tsx: export const metadata: Metadata = { alternates: { canonical: 'https://example.com/page' } };",
    },
    {
      question: "How should I handle canonical tags for paginated pages (Page 1, 2, 3)?",
      answer:
        "For page 1 of a paginated series, the canonical tag should point to the root category URL (e.g., /category/shoes?page=1 should canonicalize to /category/shoes). For subsequent pages (page 2, page 3, etc.), each paginated page should have a self-referential canonical tag pointing to its own URL (/category/shoes?page=2).",
    },
    {
      question: "Can I canonicalize a PDF file to a webpage?",
      answer:
        "Yes! You can specify a canonical tag for a PDF file by serving an HTTP 'Link' response header from your web server: Link: <https://example.com/whitepaper-landing-page>; rel=\"canonical\".",
    },
    {
      question: "Are my URLs sent to an external server when using this tool?",
      answer:
        "No. The OmniSEO Tools Canonical Tag Generator & Auditor executes 100% in-browser using client-side JavaScript. None of your URLs, tracking parameters, or client links are ever transmitted or stored on any server.",
    },
  ],
};

export default canonicalTagGeneratorTool;
