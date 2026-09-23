import { ToolDefinition } from "@/types/tool";

export const redirectRuleGeneratorTool: ToolDefinition = {
  id: "redirect-rule-generator",
  slug: "redirect-rule-generator",
  name: "Redirect Rule & Regex Mapper",
  title: "Free Redirect Rule & Regex Mapper (Next.js, Nginx, Apache) | OmniSEO Tools",
  metaTitle: "Free Redirect Rule & Regex Mapper (Next.js, Nginx, Apache) | OmniSEO Tools",
  metaDescription:
    "Create, test, and export 301 and 302 redirect rules with live regex matching. Export clean configuration snippets for Next.js, Nginx, Apache, and Cloudflare.",
  h1: "Redirect Rule & Regex Mapper",
  tagline:
    "Generate and test 301, 302, 307, and 308 redirect rules. Test regex paths in real time and export production-ready configs for Next.js, Nginx, Apache (.htaccess), and Cloudflare.",
  shortDescription:
    "Generate, test, and export 301 and 302 redirect rules for Next.js, Nginx, Apache, and Cloudflare with real-time regex path testing.",
  category: "technical",
  icon: "GitFork",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "redirect rule generator",
    "regex redirect generator",
    "htaccess redirect generator",
    "nginx rewrite generator",
    "nextjs redirect generator",
    "301 redirect tester",
    "regex path tester",
    "cloudflare bulk redirect",
    "301 vs 302 redirect",
    "url redirect mapper",
  ],
  howToSteps: [
    {
      name: "Select HTTP Status Code & Match Mode",
      text: "Choose between 301 (Moved Permanently), 302 (Found), 307 (Temporary), or 308 (Permanent), and select your matching mode (Simple Path, Wildcard Parameter, or RegEx Pattern).",
    },
    {
      name: "Define Source Pattern & Target Destination",
      text: "Input the source path pattern (with capture groups or named parameters) and the target destination URL, or pick from quick presets like 'Folder Migration' or 'Remove Trailing Slash'.",
    },
    {
      name: "Simulate & Test Paths in Real Time",
      text: "Type a sample URL into the live path tester to instantly evaluate whether the regex pattern matches and inspect the computed destination URL with substituted parameters in 0ms.",
    },
    {
      name: "Select Server Configuration Format",
      text: "Switch between Next.js (next.config.js / middleware), Nginx, Apache (.htaccess), or Cloudflare tabs to view idiomatic, production-ready syntax.",
    },
    {
      name: "Copy or Download Server Configuration",
      text: "Copy the generated config snippet to your clipboard or download the configuration file directly.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Guide to HTTP Redirects, Regex Path Mapping & SEO Link Equity Preservation",
    sections: [
      {
        heading: "HTTP Status Codes Explained: 301 vs. 302 vs. 307 vs. 308",
        content:
          "<p>When migrating website URLs or restructuring directories, choosing the correct <strong>HTTP redirect status code</strong> is paramount for preserving search engine rankings and PageRank (link equity):</p><ul><li><strong>301 Moved Permanently (Recommended for SEO):</strong> Informs search engines (Googlebot, Bingbot) and web browsers that the requested URL has permanently moved to a new destination. Search engines transfer <strong>99–100% of link equity (PageRank)</strong> and canonical authority to the target URL and update their search index cache. Browsers cache 301 redirects aggressively.</li><li><strong>308 Permanent Redirect:</strong> An RFC 7538 standardized status code identical to 301 in permanence and SEO equity transfer, with one crucial difference: it guarantees that the HTTP request method (e.g., <code>POST</code>, <code>PUT</code>) and request body are preserved without being converted into a <code>GET</code> request.</li><li><strong>302 Found (Temporary):</strong> Indicates that the resource is temporarily located at a different URL. Search engines do <em>not</em> transfer permanent link equity and retain the original URL in search results. Useful during A/B testing or maintenance.</li><li><strong>307 Temporary Redirect:</strong> The HTTP/1.1 equivalent of 302 that strictly prohibits browsers from changing the request method (preserving <code>POST</code> payloads).</li></ul>",
        keyTakeaways: [
          "Use 301 redirects for permanent migrations to transfer 100% PageRank link equity to new URLs.",
          "Use 308 redirects when preserving HTTP POST/PUT request bodies across permanent endpoints.",
          "Avoid using 302/307 redirects for permanent site migrations, as they prevent search index consolidation.",
        ],
      },
      {
        heading: "Mastering Regex & Capture Groups for Scalable URL Redirects",
        content:
          "<p>Instead of manually writing thousands of individual 1-to-1 redirect rules, regular expressions (RegEx) allow you to map dynamic URL hierarchies with a single rule using <strong>capture groups</strong>:</p><ul><li><strong>Parentheses for Capture Groups:</strong> Wrapping a regex pattern in parentheses <code>(...)</code> captures the matching substring. For example, in <code>^/products/([0-9]+)$</code>, the numeric ID is captured as Group 1.</li><li><strong>Target Substitution Syntax:</strong> Different web servers use distinct variables to reference capture groups:<ul><li><strong>Next.js / Express:</strong> Uses named parameters (e.g., <code>/products/:id</code> &rarr; <code>/items/:id</code>) or regex groups.</li><li><strong>Nginx:</strong> Uses <code>$1</code>, <code>$2</code> (e.g., <code>rewrite ^/products/(.*)$ /items/$1 permanent;</code>).</li><li><strong>Apache (.htaccess):</strong> Uses <code>$1</code>, <code>$2</code> for RewriteRule targets and <code>%1</code>, <code>%2</code> for RewriteCond matches.</li><li><strong>Cloudflare:</strong> Uses <code>$1</code>, <code>$2</code> in Dynamic URL Redirect rules.</li></ul></li><li><strong>Common Regex Modifiers:</strong> Always escape dots <code>\\.</code> when matching file extensions (e.g., <code>^/(.*)\\.html$</code>), and use the <code>[NC]</code> (No Case) flag in Apache or <code>(?i)</code> in Nginx for case-insensitive matching.</li></ul>",
        keyTakeaways: [
          "Capture groups (parentheses) allow mapping infinite dynamic URLs with a single rule.",
          "Nginx and Apache use $1 and $2 for substitution, while Next.js App Router uses named route tokens (:slug*).",
          "Always escape periods (\\.) in file extensions to avoid matching arbitrary characters.",
        ],
      },
      {
        heading: "Avoiding Redirect Chains, Redirect Loops & Next.js Performance Pitfalls",
        content:
          "<p>Improperly configured redirect rules can degrade website performance and harm crawl budgets:</p><ol><li><strong>Redirect Chains (A &rarr; B &rarr; C):</strong> When URL A redirects to URL B, which in turn redirects to URL C, Googlebot incurs multiple round-trip latencies. Googlebot may abandon crawling after 4–5 hops, causing indexation failures. Always redirect directly from the original source to the final canonical destination (A &rarr; C).</li><li><strong>Redirect Loops (A &rarr; B &rarr; A):</strong> Occur when a redirect rule inadvertently points back to its own source or creates a circular chain. Browsers and crawlers throw <code>ERR_TOO_MANY_REDIRECTS</code> errors.</li><li><strong>Next.js App Router (next.config.js vs. Middleware vs. Server Components):</strong><ul><li><strong>next.config.js (redirects):</strong> Evaluated at the routing engine layer before request processing. Best for static and batch pattern redirects.</li><li><strong>Next.js Middleware:</strong> Ideal when redirects depend on cookies, geolocation, auth headers, or dynamic edge logic.</li><li><strong>redirect() inside Server Components:</strong> Throws a Next.js navigation error handled at runtime; best for authenticated dashboard guards.</li></ul></li></ol>",
        keyTakeaways: [
          "Consolidate redirect chains into single-hop redirects (A -> final destination).",
          "Prevent redirect loops by ensuring source pattern and target destination are mutually exclusive.",
          "Use next.config.js for high-performance static pattern redirects in Next.js applications.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between a 301 and a 302 redirect for SEO?",
      answer:
        "A 301 redirect is permanent and passes 99–100% of link equity (PageRank) and ranking signals from the old URL to the new URL, prompting Google to index the new destination. A 302 redirect is temporary, meaning Google continues to index the old URL and does not transfer full link equity.",
    },
    {
      question: "How do I implement 301 redirects in Next.js App Router?",
      answer:
        "In Next.js, add an async redirects() function to your next.config.js (or next.config.mjs): module.exports = { async redirects() { return [{ source: '/old-path/:slug*', destination: '/new-path/:slug*', permanent: true }]; } }; Setting permanent: true emits an HTTP 308 (permanent) status code.",
    },
    {
      question: "How do I redirect an entire folder in Nginx?",
      answer:
        "In your Nginx server block, use the rewrite directive: rewrite ^/old-folder/(.*)$ /new-folder/$1 permanent; This captures any subpath after /old-folder/ and appends it to /new-folder/ while returning an HTTP 301 status.",
    },
    {
      question: "What does the [R=301,L,QSA] flag mean in Apache .htaccess?",
      answer:
        "In Apache: R=301 forces an HTTP 301 Moved Permanently status code; L (Last) stops the server from evaluating subsequent rewrite rules if this rule matches; QSA (Query String Append) preserves and appends existing query string parameters (like ?utm_source=...) to the destination URL.",
    },
    {
      question: "How do I test my regular expressions for redirects safely?",
      answer:
        "Use the interactive Live Match Tester in this tool. Enter your source regex pattern and target replacement, then type a sample URL. The engine evaluates the regular expression client-side in real time (0ms) and displays the evaluated destination URL without risking broken server configs.",
    },
    {
      question: "Are my server configs and URLs private when using this tool?",
      answer:
        "Yes! The OmniSEO Tools Redirect Rule & Regex Mapper executes 100% in your browser using client-side JavaScript. None of your URL paths, regex patterns, or server configuration files are ever sent to any remote server or stored in any database.",
    },
  ],
};

export default redirectRuleGeneratorTool;
