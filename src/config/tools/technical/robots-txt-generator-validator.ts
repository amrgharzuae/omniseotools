import { ToolDefinition } from "@/types/tool";

export const robotsTxtGeneratorValidatorTool: ToolDefinition = {
  id: "robots-txt-generator-validator",
  slug: "robots-txt-generator-validator",
  name: "Robots.txt Generator & Validator",
  title: "Free Robots.txt Generator & Validator | OmniSEO Tools",
  metaTitle: "Free Robots.txt Generator & Validator | OmniSEO Tools",
  metaDescription:
    "Generate, test, and validate standard-compliant robots.txt files with live syntax checking, multi-user-agent rules, and sitemap directives.",
  h1: "Free Robots.txt Generator & Validator",
  tagline:
    "Generate, test, and validate standard-compliant robots.txt files with live syntax checking, multi-user-agent rules, and sitemap directives.",
  shortDescription:
    "Generate, test, and validate standard-compliant robots.txt files with live syntax checking, multi-user-agent rules, and sitemap directives.",
  category: "technical",
  icon: "Bot",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "robots.txt generator",
    "robots.txt validator",
    "robots txt syntax checker",
    "robots exclusion protocol",
    "googlebot disallow generator",
    "sitemap robots.txt",
    "crawl-delay validator",
    "omniseo-core robots",
  ],
  howToSteps: [
    {
      name: "Choose Visual Builder or Syntax Validator Mode",
      text: "Select 'Visual Builder' to construct rules with interactive controls, or 'Syntax Validator & Tester' to paste existing robots.txt content for live linting.",
    },
    {
      name: "Configure User-Agent Rules & Directives",
      text: "Add targeted rule blocks for search bots (Googlebot, Bingbot) or AI crawlers (GPTBot, ClaudeBot), specifying Allow and Disallow paths with optional Crawl-Delay values.",
    },
    {
      name: "Attach Sitemaps & Host Directives",
      text: "Declare absolute XML sitemap URLs (https://example.com/sitemap.xml) and your preferred canonical Host directive.",
    },
    {
      name: "Inspect Live Syntax Warnings & Test URL Paths",
      text: "Review real-time syntax badges, line-by-line error feedback, and test sample URLs through the interactive path simulator.",
    },
    {
      name: "Copy or Download robots.txt",
      text: "Copy the formatted plain-text directives to your clipboard or download the generated robots.txt file to deploy to your domain root.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Guide to Robots.txt, The Robots Exclusion Protocol (REP) & Crawler Control",
    sections: [
      {
        heading: "What is Robots.txt and How Do Search Engines Read It?",
        content:
          "<p>The <strong>Robots Exclusion Protocol (REP)</strong>, formalized in <strong>RFC 9309</strong>, is the universal standard that webmasters use to communicate with automated web crawlers, search engine spiders (such as Googlebot and Bingbot), and AI scraping agents (such as GPTBot and ClaudeBot).</p><p>A <code>robots.txt</code> file is a plain text file that must reside at the exact root of your web server (e.g. <code>https://example.com/robots.txt</code>). When a crawler visits your site, it initiates a <code>GET /robots.txt</code> request before requesting any other webpage or media asset. The instructions inside indicate which URLs or directories the crawler is permitted (<code>Allow</code>) or forbidden (<code>Disallow</code>) from requesting.</p><ul><li><strong>Domain Root Placement:</strong> The file must always be placed at the domain root. Subdirectory files (like <code>example.com/blog/robots.txt</code>) are ignored by all major search engines.</li><li><strong>Case Sensitivity:</strong> Directives (like <code>User-agent:</code> and <code>Disallow:</code>) are case-insensitive, but directory paths are strictly <strong>case-sensitive</strong>. <code>Disallow: /admin/</code> does not block <code>/Admin/</code>.</li><li><strong>Wildcard Matching:</strong> Modern REP parsers support wildcard matching (<code>*</code>) for sequence matching and end-of-string anchors (<code>$</code>) to target specific file extensions like <code>/*.pdf$</code>.</li></ul>",
        keyTakeaways: [
          "Robots.txt must be placed at the absolute domain root: https://yourdomain.com/robots.txt.",
          "Paths are strictly case-sensitive (/Admin/ is different from /admin/).",
          "RFC 9309 standardizes prefix matching and wildcards (*) across modern crawlers.",
        ],
      },
      {
        heading: "Common Robots.txt Pitfalls & Dangerous Misconceptions",
        content:
          "<p>Configuring robots.txt incorrectly can lead to catastrophic organic search drops or unintended sensitive data leaks. Key pitfalls to avoid include:</p><ol><li><strong>Disallow: / vs Disallow:</strong> <code>Disallow: /</code> blocks crawlers from accessing your entire website (common on staging environments). Conversely, an empty <code>Disallow:</code> directive allows crawlers complete, unrestricted access to the entire site.</li><li><strong>Robots.txt Does NOT Prevent Indexing:</strong> Believing that <code>Disallow: /private/</code> prevents a page from being indexed in Google Search is one of the most common SEO mistakes. Robots.txt prevents <em>crawling</em> (downloading the page content), not <em>indexing</em>. If external sites link to the disallowed URL, Google can index the URL as a bare link without snippet text. To guarantee a page is never indexed, allow crawling and serve a <code>&lt;meta name=\"robots\" content=\"noindex\"&gt;</code> tag or an <code>X-Robots-Tag: noindex</code> HTTP response header.</li><li><strong>Blocking CSS and JavaScript Assets:</strong> Never disallow <code>/css/</code>, <code>/js/</code>, or font directories. Googlebot requires full layout rendering capabilities to verify mobile-friendliness and calculate Core Web Vitals.</li><li><strong>Crawl-Delay Directive Inconsistencies:</strong> While Bingbot, Yandex, and Baidu recognize the <code>Crawl-delay</code> directive (measured in seconds), Googlebot ignores <code>Crawl-delay</code> completely in favor of autonomous algorithmic crawl-rate controls in Google Search Console.</li></ol>",
        keyTakeaways: [
          "Disallow: / blocks the entire domain; empty Disallow: allows everything.",
          "Robots.txt stops crawling, NOT indexing. Use meta robots noindex to prevent indexing.",
          "Never block CSS or JavaScript files needed for layout rendering.",
          "Googlebot ignores Crawl-delay; manage Google crawl rate via Google Search Console.",
        ],
      },
      {
        heading: "Powered by omniseo-core: Open-Source Zero-Latency REP Engine",
        content:
          "<p>This generator and validator is powered by <a href=\"https://www.npmjs.com/package/omniseo-core\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-emerald-600 dark:text-emerald-400 font-semibold underline\">omniseo-core</a>, our high-performance, zero-dependency open-source library for SEO calculation and validation.</p><p>You can integrate the exact same parsing, serialization, and linting logic directly into your own CI/CD pipelines, Next.js build steps, or automated site auditing tools:</p><pre><code>npm install omniseo-core</code></pre><p>Key functions include:</p><ul><li><code>validateRobotsTxt(raw: string)</code>: Validates syntax, catches missing User-agents, checks protocol on Sitemaps, flags unencoded path characters, and outputs line-numbered diagnostics.</li><li><code>parseRobotsTxt(raw: string)</code>: Deserializes raw text into structured TypeScript <code>RobotsConfig</code> objects.</li><li><code>generateRobotsTxt(config: RobotsConfig)</code>: Serializes configuration objects into clean, standard-compliant robots.txt text.</li></ul>",
        keyTakeaways: [
          "omniseo-core is open-source and available on npm for Node.js and browser environments.",
          "Provides 100% client-side validation with zero network latency and complete privacy.",
          "Ideal for pre-commit Git hooks and CI/CD automated robots.txt linting.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between robots.txt and meta robots noindex?",
      answer:
        "robots.txt prevents web crawlers from requesting or downloading a page's content from your server. The meta robots noindex tag (<meta name='robots' content='noindex'>) instructs search engines not to index the page in search results after downloading it. If you disallow a page in robots.txt, crawlers cannot download it to see your noindex tag, meaning Google could still index the URL if other sites link to it.",
    },
    {
      question: "Where should the robots.txt file be uploaded?",
      answer:
        "The robots.txt file must always be uploaded to the root directory of your website domain so it is accessible at https://yourdomain.com/robots.txt. Search engines do not recognize robots.txt files placed in subdirectories (such as https://yourdomain.com/blog/robots.txt).",
    },
    {
      question: "Does Googlebot honor the Crawl-delay directive?",
      answer:
        "No. Googlebot does not support the Crawl-delay directive in robots.txt. If your server is experiencing high crawl loads from Google, you can configure crawl-rate limits inside Google Search Console or utilize rate limiting on your CDN/WAF. However, Bingbot, YandexBot, and Baiduspider do support Crawl-delay.",
    },
    {
      question: "What is the difference between 'Disallow: /' and 'Disallow:'?",
      answer:
        "'Disallow: /' tells crawlers not to visit any page on the entire domain starting from the root slash (effectively blocking the whole website). An empty 'Disallow:' directive tells crawlers that no paths are disallowed, giving them full permission to crawl the entire domain.",
    },
    {
      question: "Is my robots.txt sent to a remote server for validation?",
      answer:
        "No. All parsing, linting, syntax checking, and code generation occur 100% client-side inside your web browser using the omniseo-core engine. Your internal paths, staging configurations, and sitemaps remain completely private.",
    },
    {
      question: "How can I install omniseo-core in my own projects?",
      answer:
        "You can install omniseo-core via npm (npm install omniseo-core), yarn, or pnpm. It provides full TypeScript definitions and zero external runtime dependencies for robots.txt parsing, SERP metrics, hreflang clustering, and meta tag validation.",
    },
  ],
};

export default robotsTxtGeneratorValidatorTool;
