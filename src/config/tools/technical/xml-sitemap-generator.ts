import { ToolDefinition } from "@/types/tool";

export const xmlSitemapGeneratorTool: ToolDefinition = {
  id: "xml-sitemap-generator",
  slug: "xml-sitemap-generator",
  name: "XML Sitemap Generator & Validator",
  title: "Free XML Sitemap Generator & Validator | OmniSEO Tools",
  metaTitle: "Free XML Sitemap Generator & Validator | OmniSEO Tools",
  metaDescription:
    "Generate Google-compliant XML sitemaps, customize change frequencies and priorities, or audit raw sitemaps for syntax errors 100% in your browser.",
  h1: "XML Sitemap Generator & Live Syntax Validator",
  tagline:
    "Generate Google-compliant XML sitemaps from URL lists, configure priority and change frequency, or validate existing sitemap XML for syntax errors.",
  shortDescription:
    "Generate standard XML sitemaps from URL batches, customize crawl priorities, and validate existing sitemap XML client-side.",
  category: "technical",
  icon: "FileCode",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "xml sitemap generator",
    "sitemap validator",
    "sitemap linter",
    "google sitemap builder",
    "nextjs app router sitemap",
    "sitemap xml tester",
    "bulk sitemap creator",
    "xml namespace validator",
    "sitemap lastmod format",
    "sitemap 50k limit check",
  ],
  howToSteps: [
    {
      name: "Input Target URLs or Paste Existing XML",
      text: "Select Generator Mode to paste up to 200 URLs (one per line) or switch to Validator Mode to paste raw XML markup for syntax inspection.",
    },
    {
      name: "Configure Crawl Directives & Metadata",
      text: "Set default change frequency (<changefreq>), crawl priority (<priority>), and last modified date (<lastmod>), or apply one-click presets like 'Standard Site' or 'E-Commerce / Blog'.",
    },
    {
      name: "Review Live Diagnostics & Limit Checks",
      text: "Inspect real-time syntax validation results, Google 50,000 URL / 50MB limits check, namespace verification, and unescaped character alerts.",
    },
    {
      name: "Select Preferred Code Format",
      text: "Toggle between formatted standard XML (sitemap.xml) and Next.js App Router (app/sitemap.ts) dynamic TypeScript code snippets.",
    },
    {
      name: "Copy or Download Sitemap Asset",
      text: "Copy code directly to your clipboard or download a clean sitemap.xml file with zero server latency.",
    },
  ],
  guideContent: {
    title: "The Definitive Guide to XML Sitemaps, Protocol 0.9 & Search Engine Crawl Optimization",
    sections: [
      {
        heading: "What is an XML Sitemap and Why is It Critical for Search Engines?",
        content:
          "<p>An <strong>XML Sitemap</strong> (following the standard Sitemaps.org Protocol 0.9) is a structured machine-readable document listing all canonical URLs on a website that webmasters want search engines to crawl and index. Rather than relying solely on web crawlers following internal hyperlink graphs, sitemaps guarantee that deep pages, recently published articles, dynamic faceted landing pages, and media assets are discovered with zero crawl delay.</p><p>A standard XML sitemap adheres to the standard XML namespace: <code>&lt;urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"&gt;</code>. Each entry within the sitemap contains a <code>&lt;url&gt;</code> block with the following elements:</p><ul><li><strong>&lt;loc&gt; (Mandatory):</strong> The absolute, fully qualified canonical URL of the webpage (e.g., <code>https://example.com/blog/article</code>). Must use valid HTTPS protocols and XML entity escaping.</li><li><strong>&lt;lastmod&gt; (Recommended):</strong> The timestamp when the page content was last updated in W3C Datetime / ISO 8601 format (e.g., <code>YYYY-MM-DD</code> or <code>YYYY-MM-DDThh:mm:ss+00:00</code>).</li><li><strong>&lt;changefreq&gt; (Optional):</strong> A hint indicating how frequently the page is expected to change (<code>always</code>, <code>hourly</code>, <code>daily</code>, <code>weekly</code>, <code>monthly</code>, <code>yearly</code>, <code>never</code>).</li><li><strong>&lt;priority&gt; (Optional):</strong> A relative priority value between <code>0.0</code> and <code>1.0</code> describing the importance of this URL compared to other URLs on the same domain.</li></ul>",
        keyTakeaways: [
          "XML sitemaps provide a direct discovery roadmap for search engine crawlers.",
          "Must use absolute HTTPS canonical URLs and the standard sitemaps.org/schemas/sitemap/0.9 namespace.",
          "Always include accurate <lastmod> timestamps to facilitate rapid re-crawling of updated content.",
        ],
      },
      {
        heading: "How Google Handles <lastmod> vs. <priority> and <changefreq> in 2026",
        content:
          "<p>Search engine algorithms have evolved significantly regarding sitemap tags. Google's Search Advocate team (Gary Illyes and John Mueller) has publicly confirmed that:</p><ul><li><strong>Google Ignores &lt;priority&gt;:</strong> Googlebot does not consider the <code>&lt;priority&gt;</code> attribute when scheduling crawls or ranking pages. Assigning <code>1.0</code> to every URL will not increase crawl frequency or search visibility.</li><li><strong>Google Ignores &lt;changefreq&gt;:</strong> Google uses its own machine learning models and historical crawling observations to estimate page change rates rather than relying on declared <code>&lt;changefreq&gt;</code> values.</li><li><strong>Google Actively Uses &lt;lastmod&gt;:</strong> The <code>&lt;lastmod&gt;</code> attribute is heavily utilized by Googlebot when scheduling delta crawls. When Google observes that a URL's <code>&lt;lastmod&gt;</code> timestamp has changed, it prioritizes re-crawling that specific page to update its search index cache. However, if a website abuses <code>&lt;lastmod&gt;</code> by updating dates without changing underlying content, Google algorithmically discounts the sitemap's lastmod signals.</li><li><strong>Bing & Other Engines:</strong> Bing, Yandex, and Baidu continue to use both <code>&lt;lastmod&gt;</code> and <code>&lt;changefreq&gt;</code> hints to optimize their crawl budgets across large enterprise websites.</li></ul>",
        keyTakeaways: [
          "Googlebot relies heavily on <lastmod> for delta crawl scheduling, but ignores <priority> and <changefreq>.",
          "Keep <lastmod> strictly synchronized with real content updates to preserve search engine trust.",
          "Bing and alternative search engines still reference change frequency and priority hints.",
        ],
      },
      {
        heading: "Size Limits, URL Constraints & Sitemap Index Architecture",
        content:
          "<p>Search engines enforce strict physical limits on XML sitemaps to prevent memory exhaustion and excessive network latency during crawling:</p><ol><li><strong>50,000 URLs per Sitemap:</strong> A single XML sitemap file cannot contain more than 50,000 <code>&lt;url&gt;</code> entries.</li><li><strong>50 MB Uncompressed File Size:</strong> A single uncompressed XML sitemap file must not exceed 50 MB (52,428,800 bytes).</li><li><strong>Sitemap Index Files (&lt;sitemapindex&gt;):</strong> If your website exceeds either 50,000 URLs or 50MB, you must partition your URLs across multiple sitemap files (e.g., <code>sitemap-posts-1.xml</code>, <code>sitemap-products.xml</code>) and combine them under a primary <strong>Sitemap Index</strong> file containing <code>&lt;sitemap&gt;</code> entries referencing each child sitemap's absolute URL.</li><li><strong>XML Entity Escaping:</strong> All characters with special XML meanings in URLs must be escaped: <code>&amp;</code> becomes <code>&amp;amp;</code>, <code>'</code> becomes <code>&amp;apos;</code>, <code>\"</code> becomes <code>&amp;quot;</code>, <code>&lt;</code> becomes <code>&amp;lt;</code>, and <code>&gt;</code> becomes <code>&amp;gt;</code>.</li></ol>",
        keyTakeaways: [
          "Maximum 50,000 URLs or 50MB uncompressed file size per single sitemap.",
          "Use a Sitemap Index file (<sitemapindex>) when scaling beyond 50k URLs.",
          "Always escape special XML entities like ampersands (&amp;) inside <loc> tags.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the maximum number of URLs allowed in an XML sitemap?",
      answer:
        "According to the official Sitemaps.org protocol accepted by Google and Bing, a single XML sitemap can contain up to 50,000 URLs and must not exceed 50 MB in uncompressed size. If your website has more than 50,000 URLs, you should use a Sitemap Index file (<sitemapindex>) referencing multiple child sitemaps.",
    },
    {
      question: "Does Google still use <priority> and <changefreq> tags?",
      answer:
        "Google's search engineering team has confirmed that Googlebot ignores <priority> and <changefreq> tags in modern ranking and crawl scheduling algorithms. However, Google actively uses accurate <lastmod> timestamps to schedule delta crawls, and other search engines like Bing continue to utilize priority hints.",
    },
    {
      question: "How do I submit my generated XML sitemap to Google?",
      answer:
        "Upload the generated sitemap.xml file to your website's root directory (e.g., https://yourdomain.com/sitemap.xml), add a directive to your robots.txt file ('Sitemap: https://yourdomain.com/sitemap.xml'), and submit the sitemap URL directly inside Google Search Console under Indexing > Sitemaps.",
    },
    {
      question: "How do I implement dynamic XML sitemaps in Next.js App Router?",
      answer:
        "In Next.js App Router (Next.js 14 & 15), create an app/sitemap.ts file exporting a default function returning MetadataRoute.Sitemap. Next.js will automatically render and cache a compliant sitemap.xml endpoint at runtime.",
    },
    {
      question: "Why does my XML sitemap fail validation when URLs contain ampersands?",
      answer:
        "XML requires special characters to be entity-escaped. An unescaped ampersand ('&') in query strings (e.g., ?page=2&sort=asc) breaks XML syntax parsing. Replace every '&' with '&amp;' to pass XML validation.",
    },
    {
      question: "Are my website URLs uploaded to external servers when using this tool?",
      answer:
        "No. The OmniSEO Tools XML Sitemap Generator & Validator runs 100% client-side in your browser. All URL parsing, validation, formatting, and XML downloads occur locally with zero server transmission or data retention.",
    },
  ],
};

export default xmlSitemapGeneratorTool;
