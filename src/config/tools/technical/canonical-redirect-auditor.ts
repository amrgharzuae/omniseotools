import { ToolDefinition } from "@/types/tool";

export const canonicalRedirectAuditorTool: ToolDefinition = {
  id: "canonical-redirect-auditor",
  slug: "canonical-redirect-auditor",
  name: "Canonical URL & Redirect Loop Auditor",
  title: "Canonical URL & Redirect Loop Auditor | Technical SEO Inspector",
  metaTitle: "Canonical URL & Redirect Loop Auditor | Technical SEO Inspector",
  metaDescription:
    "Audit canonical URL consistency, resolve trailing slash 308 redirect loops, strip query parameter bloat, and generate clean canonical meta tags client-side with zero tracking.",
  h1: "Canonical URL & Redirect Loop Auditor",
  tagline:
    "Audit canonical URL consistency, resolve trailing slash 308 redirect loops, strip query parameter bloat, and generate clean canonical meta tags client-side.",
  shortDescription:
    "Audit canonical URL consistency, resolve trailing slash redirect loops, strip marketing query strings, and generate clean canonical meta tags.",
  category: "technical",
  icon: "Link2",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "canonical url auditor",
    "canonical redirect loop",
    "trailing slash 308 redirect",
    "canonical url normalizer",
    "canonical tag checker",
    "utm query parameter bloat",
    "canonical duplicate content",
    "nextjs trailing slash redirect",
    "nginx trailing slash rewrite",
    "apache canonical rewrite",
  ],
  howToSteps: [
    {
      name: "Enter or Select Target URL",
      text: "Paste your webpage URL or select a preset to analyze trailing slashes, marketing query parameters, or mixed-case protocols.",
    },
    {
      name: "Review Canonical Health Score & Findings",
      text: "Inspect the 0-100 health rating, risk classification, and itemized diagnostic warnings for casing, ports, fragments, and tracking bloat.",
    },
    {
      name: "Inspect Parameter Filtering Breakdown",
      text: "View which UTM and advertising parameters (fbclid, gclid) were stripped versus which functional query keys were preserved.",
    },
    {
      name: "Copy Normalized Canonical Tag & Server Rules",
      text: "Select your preferred trailing slash convention and copy the generated HTML link tag, Next.js metadata, or multi-server redirect rules.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Guide to Canonical URLs, Trailing Slash Routing, and Redirect Loops",
    sections: [
      {
        heading: "Why Canonical URLs & Uniform Routing Are Fundamental to Technical SEO",
        content:
          "<p>In modern web architectures, a single piece of content can often be accessed through multiple distinct URL variations: with or without a trailing slash (<code>/blog/seo-guide/</code> vs <code>/blog/seo-guide</code>), over unencrypted HTTP or secure HTTPS, with mixed letter casing, or appended with tracking parameters (<code>?utm_source=...</code>, <code>fbclid</code>). To search engine crawlers like Googlebot, each variation is treated as an entirely separate resource unless an authoritative <strong>rel=\"canonical\"</strong> tag is present.</p><p>Failing to normalize canonical URLs leads to several major SEO penalties:</p><ul><li><strong>PageRank &amp; Link Equity Dilution:</strong> Inbound backlinks distributed across trailing-slash and non-trailing-slash variations split your link authority rather than consolidating it onto one authoritative page.</li><li><strong>Crawl Budget Waste &amp; Indexation Bloat:</strong> Search bots spend limited crawl capacity indexing duplicate query strings instead of discovering fresh editorial content.</li><li><strong>Next.js 308 Permanent Redirect Loops:</strong> If your canonical tag specifies <code>/path/</code> while your Next.js application enforces <code>trailingSlash: false</code>, crawlers encounter an infinite redirect loop between the declared canonical and the server's routing middleware.</li></ul>",
        keyTakeaways: [
          "Search engines treat trailing slash variations as distinct URLs unless canonicalized.",
          "Marketing query parameters split PageRank and pollute Google Search Console reports.",
          "Mismatched server routing policies and canonical declarations cause 308 redirect loops.",
        ],
      },
      {
        heading: "Next.js 308 Redirects vs WordPress & Nginx Routing Conventions",
        content:
          "<p>Different web frameworks handle trailing slashes differently by default:</p><ul><li><strong>Next.js App Router:</strong> By default, Next.js sets <code>trailingSlash: false</code> and issues an HTTP <code>308 Permanent Redirect</code> from <code>/page/</code> to <code>/page</code>. If your canonical tag points to <code>/page/</code>, Google will encounter a conflict between what your HTML requests and what the web server returns.</li><li><strong>WordPress &amp; Apache:</strong> Standard WordPress permalinks enforce trailing slashes on all directory routes (<code>/%postname%/</code>). A request to <code>/page</code> triggers an HTTP <code>301 Moved Permanently</code> to <code>/page/</code>.</li><li><strong>Nginx Reverse Proxies:</strong> Unless explicit <code>rewrite</code> directives are configured, Nginx treats directories with trailing slashes as folder lookups (looking for <code>index.html</code>) and non-slashed requests as file matches.</li></ul>",
        keyTakeaways: [
          "Always align your HTML canonical tag with your web server's redirection policy.",
          "Next.js utilizes HTTP 308 redirects which preserve request methods across hops.",
          "Choose one universal trailing slash policy across internal links, sitemaps, and canonicals.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Does a canonical tag guarantee Google will index that specific URL?",
      answer:
        "No. A canonical tag (`rel=\"canonical\"`) is treated by Google as a strong hint rather than an absolute directive. If your internal links, XML sitemap URLs, and 301/308 server redirects contradict the canonical tag (e.g. your canonical tag specifies `/seo-guide` but all internal links point to `/seo-guide/`), Google's indexing algorithms will frequently ignore your canonical tag and select what it deems to be the actual canonical URL.",
    },
    {
      question: "Why does Next.js return a 308 redirect on trailing slashes?",
      answer:
        "Next.js uses HTTP 308 Permanent Redirects by default when normalizing trailing slashes (`trailingSlash: false`). Unlike a legacy 301 redirect, which allows clients to change POST requests to GET requests, a 308 status code strictly guarantees that the HTTP request method and body remain unchanged during redirection.",
    },
    {
      question: "Should self-referential canonical tags be used on every page?",
      answer:
        "Yes, self-referential canonical tags are an industry best practice recommended by Google. Including a self-referential canonical tag on every canonical webpage defends your search rankings against scraping, syndication, and accidental duplicate indexing caused by URL parameters (`?utm_...`, `?ref=...`, or session IDs).",
    },
    {
      question: "Why should marketing parameters (UTM, fbclid, gclid) be stripped from canonical URLs?",
      answer:
        "Marketing parameters are used solely for client-side analytics and campaign attribution. Including them in canonical tags causes Google Search Console to index thousands of parameter duplicates, diluting ranking signals and wasting crawl budget. A clean canonical tag ensures all search equity is attributed to the pure content URL.",
    },
    {
      question: "Is this Canonical URL & Redirect Auditor completely private and client-side?",
      answer:
        "Yes, 100%. All URL parsing, parameter scrubbing, casing audits, and server redirect rule generation execute entirely inside your local browser using pure TypeScript. No proprietary staging URLs or campaign query strings are ever transmitted to an external server.",
    },
  ],
};
