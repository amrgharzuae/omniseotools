import { ToolDefinition } from "@/types/tool";

export const robotsTxtGeneratorTool: ToolDefinition = {
  "id": "robots-txt-generator",
  "slug": "robots-txt-generator",
  "name": "Robots.txt Generator & Directives Validator",
  "shortDescription": "Generate clean, search-engine compliant robots.txt files with custom User-agent rules, AI scraper toggles, and XML sitemaps.",
  "category": "developer",
  "icon": "ShieldAlert",
  "badge": "Popular",
  "featured": true,
  "status": "active",
  "keywords": [
    "robots txt generator",
    "disallow directives",
    "seo crawler rules",
    "sitemap robots.txt",
    "block ai scrapers",
    "gptbot disallow",
    "claudebot robots.txt"
  ],
  "metaTitle": "Free Robots.txt Generator & Bot Directives Builder (2026 Free Tool)",
  "metaDescription": "Create syntax-perfect robots.txt files for Googlebot, Bingbot, and AI crawlers. Configure allow/disallow paths, crawl delay, sitemaps, and download instantly.",
  "howToSteps": [
    {
      "name": "Choose a Base Preset or Start Fresh",
      "text": "Select from standard SEO, WordPress CMS, E-Commerce, or Block AI Scrapers presets to preload recommended baseline directives."
    },
    {
      "name": "Configure Default Crawler Access",
      "text": "Set default permissions for all crawlers (User-agent: *) and add sensitive paths to disallow (e.g., /admin/, /api/, /checkout/)."
    },
    {
      "name": "Manage AI Crawler Policies",
      "text": "Toggle specific permissions for AI scrapers including GPTBot, Claude-Web, CCBot, and Google-Extended to control content training access."
    },
    {
      "name": "Add XML Sitemap URLs",
      "text": "Include your absolute sitemap URLs (e.g., https://yourdomain.com/sitemap.xml) to guide search engines directly to your indexable content."
    },
    {
      "name": "Test Path Simulator & Download",
      "text": "Use the live path validator to verify whether test URLs are permitted or blocked, then download your robots.txt or copy the code."
    }
  ],
  "editorialGuide": {
    "title": "The Comprehensive Guide to Robots.txt Directives, Crawlers & AI Scrapers",
    "sections": [
      {
        "heading": "What is Robots.txt & How Crawlers Interpret the Protocol",
        "content": "<p>The <strong>Robots Exclusion Protocol (REP)</strong> is a standardized web protocol instructing automated web crawlers and search engine spiders (like Googlebot, Bingbot, and YandexBot) which parts of your website they are permitted to visit. The file must reside at the exact root of your domain (<code>https://yourdomain.com/robots.txt</code>) and be served with a <code>text/plain</code> content-type header.</p><p>When a crawler arrives at your domain, it requests <code>/robots.txt</code> before fetching any web page. If the file returns a 404 (Not Found) or 200 with no disallow rules, the bot assumes complete crawl access across the entire domain.</p>",
        "keyTakeaways": [
          "Must reside at the domain root: https://example.com/robots.txt.",
          "Case-sensitive directives: Disallow: /admin is distinct from Disallow: /Admin.",
          "Processed top-to-bottom per User-agent block."
        ]
      },
      {
        "heading": "Controlling AI Scrapers: GPTBot, ClaudeBot, CCBot & Perplexity",
        "content": "<p>With the rise of generative AI, distinct bot user-agents now traverse the web to collect dataset training material and power real-time AI search results:</p><ul><li><strong>GPTBot:</strong> OpenAI general web crawler used for training foundational GPT models.</li><li><strong>ChatGPT-User:</strong> Live web-browsing agent triggered when ChatGPT users browse links directly.</li><li><strong>Claude-Web / ClaudeBot:</strong> Anthropic web scraper for training and retrieval.</li><li><strong>Google-Extended:</strong> Allows webmasters to opt out of Google Gemini/Vertex training while continuing to appear in standard Google Search.</li><li><strong>CCBot:</strong> Common Crawl scraper used widely by hundreds of AI research organizations.</li></ul><p>By declaring individual <code>User-agent</code> blocks with <code>Disallow: /</code>, you can restrict AI training usage without sacrificing search rankings.</p>",
        "keyTakeaways": [
          "Use Google-Extended to block Gemini training without hurting standard Google Search rankings.",
          "Blocking CCBot prevents your content from entering public open-source training corpora.",
          "Separate search engine bots (Googlebot, Bingbot) from AI training scrapers."
        ]
      },
      {
        "heading": "The Critical Difference Between Robots.txt Disallow and Noindex",
        "content": "<p>One of the most dangerous misconceptions in web development is believing that <code>Disallow: /private/</code> will keep a page out of Google search results. <strong>Robots.txt prevents crawling, NOT indexing.</strong></p><p>If other websites link to your disallowed URL, Google can still index the URL and display it in search results as an empty snippet without page description. To guarantee a page is never indexed, you must allow Googlebot to crawl the page and serve a <code><meta name='robots' content='noindex'></code> tag in the HTML head or an <code>X-Robots-Tag: noindex</code> HTTP header.</p>",
        "keyTakeaways": [
          "Robots.txt Disallow prevents server crawl bandwidth consumption.",
          "Noindex meta tags prevent search engine indexing.",
          "Never disallow a page in robots.txt if you want Google to see its noindex tag."
        ]
      },
      {
        "heading": "Catastrophic Robots.txt Mistakes to Avoid",
        "content": "<p>A single misplaced character in your robots.txt file can de-index an entire multi-million dollar web property within 24 hours:</p><ol><li><strong>Disallow: / on Production:</strong> The standard staging lock (<code>User-agent: * Disallow: /</code>) must NEVER be deployed to your live production domain.</li><li><strong>Missing Trailing Slashes on Directories:</strong> <code>Disallow: /news</code> blocks <code>/news/</code>, <code>/newsletter</code>, and <code>/newspaper</code>. To target only the directory, use <code>Disallow: /news/</code>.</li><li><strong>Blocking CSS and JavaScript Assets:</strong> Google requires access to your styling and script bundles to render pages for mobile-friendliness and Core Web Vitals checks.</li></ol>",
        "keyTakeaways": [
          "Never block CSS (/css/) or JS (/js/) assets required for client-side rendering.",
          "Always test staging vs. production deployment scripts.",
          "Use wildcards (/*?*) with extreme care to avoid accidental URL parameter pruning."
        ]
      }
    ]
  },
  "faqs": [
    {
      "question": "Where should the robots.txt file be uploaded?",
      "answer": "The robots.txt file must be uploaded to the root directory of your website domain so it is accessible at https://yourdomain.com/robots.txt. Subdirectory locations (e.g. /blog/robots.txt) are ignored by search engines."
    },
    {
      "question": "Does robots.txt guarantee that a page will not appear in Google search results?",
      "answer": "No. Robots.txt tells crawlers not to download a page, but Google can still index the URL if other pages link to it. To ensure a page is omitted from search results, allow crawling and use the <meta name='robots' content='noindex'> tag."
    },
    {
      "question": "How do I block OpenAI GPTBot and Anthropic Claude from training on my website?",
      "answer": "You can add dedicated blocks to your robots.txt: \\x27User-agent: GPTBot Disallow: /\\x27 and \\x27User-agent: Claude-Web Disallow: /\\x27. This blocks their training scrapers without affecting Google Search."
    },
    {
      "question": "Can I include multiple XML sitemaps in robots.txt?",
      "answer": "Yes. You can add as many \\x27Sitemap: https://yourdomain.com/sitemap-name.xml\\x27 directives as needed at the bottom of your robots.txt file."
    },
    {
      "question": "What does the Crawl-delay directive do?",
      "answer": "The Crawl-delay directive instructs crawlers (like Bingbot and Yandex) to wait a specified number of seconds between successive page requests to reduce server load. Note that Googlebot ignores Crawl-delay and manages crawl speed via Google Search Console."
    },
    {
      "question": "Is robots.txt case-sensitive?",
      "answer": "Yes. Directives and URL paths in robots.txt are strictly case-sensitive. Disallow: /Admin/ will not block crawlers from visiting /admin/."
    }
  ]
};
