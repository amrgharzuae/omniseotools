import { ToolDefinition } from "@/types/tool";

export const aiCrawlerFirewallTool: ToolDefinition = {
  id: "ai-crawler-firewall",
  slug: "ai-crawler-firewall",
  name: "AI Crawler Firewall & Scraper Rule Generator",
  title: "AI Crawler Firewall & Scraper Blocker | OmniSEO Tools",
  metaTitle: "AI Crawler Firewall & Scraper Blocker | OmniSEO Tools",
  metaDescription:
    "Generate edge rules, Next.js middleware, Cloudflare WAF expressions, and server snippets to block aggressive AI crawlers (GPTBot, ClaudeBot, Bytespider, CCBot, Diffbot) with zero telemetry.",
  h1: "AI Crawler Firewall & Scraper Rule Generator",
  tagline:
    "Generate production-grade Cloudflare WAF rules, Next.js Edge Middleware, Nginx/Apache configs, and robots.txt directives to block aggressive AI crawlers and bandwidth-draining scrapers with 100% client-side privacy.",
  shortDescription:
    "Generate edge firewall rules, Next.js middleware, Cloudflare WAF expressions, and server snippets to block aggressive AI crawlers and scrapers.",
  category: "technical",
  icon: "ShieldAlert",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "ai crawler firewall",
    "block gptbot",
    "block claudebot",
    "block bytespider",
    "cloudflare waf ai crawler rule",
    "next.js middleware block ai bots",
    "nginx block ai scrapers",
    "block ai training crawlers",
    "ai bot blocker",
    "prevent ai content scraping",
    "ccbot firewall",
    "google-extended block",
  ],
  howToSteps: [
    {
      name: "Select Target AI Bots & Scrapers",
      text: "Choose which AI training bots (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended) or aggressive web scrapers (Bytespider, CCBot, Diffbot, ImagesiftBot) to block using granular category toggles or one-click strategy presets.",
    },
    {
      name: "Test User-Agent Strings in Real-Time",
      text: "Paste a custom User-Agent header into the live interactive tester to instantly verify whether incoming requests will be ALLOWED (200 OK) or BLOCKED (403 Forbidden).",
    },
    {
      name: "Select Deployment Layer Tab",
      text: "Toggle between Next.js Edge Middleware (`middleware.ts`), Cloudflare WAF Expression, Nginx (`nginx.conf`), Apache (`.htaccess`), or standard `robots.txt` directives.",
    },
    {
      name: "Copy or Download Production Snippets",
      text: "Copy the generated rule directly to your clipboard or download pre-formatted configuration files for instant zero-downtime deployment to your hosting or CDN edge.",
    },
    {
      name: "Deploy and Monitor Server Bandwidth",
      text: "Deploy the rules to your edge layer to stop bot scraping requests before they execute application code, reducing cloud server CPU and egress bandwidth costs.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Technical Guide to AI Crawler Mitigation, WAF Hardening & Bandwidth Protection",
    sections: [
      {
        heading: "Why Robots.txt is Not Enough: Advisory vs. Enforced Edge Firewalls",
        content:
          "<p>The <strong>Robots Exclusion Protocol (REP / RFC 9309)</strong> has served as the web's voluntary convention for web crawlers for over three decades. When a well-behaved crawler (such as Googlebot or Bingbot) visits a website, it first fetches <code>/robots.txt</code> and respects the <code>Disallow</code> paths specified by the webmaster.</p><p>However, <strong>robots.txt is purely advisory</strong>. It provides zero technical enforcement. While major commercial AI labs (OpenAI's GPTBot, Anthropic's ClaudeBot) typically adhere to robots.txt disallow directives, thousands of unauthorized commercial scrapers, content aggregators, and high-frequency crawlers (such as ByteDance's Bytespider, CCBot, and shadow LLM extractors) frequently ignore robots.txt entirely or experience days of latency before updating cached directives.</p><p>By implementing <strong>Edge Middleware</strong> (in Next.js / Vercel), <strong>Cloudflare WAF Custom Rules</strong>, or <strong>Server-Level Filtering</strong> (Nginx / Apache), you inspect the HTTP <code>User-Agent</code> header at the network edge and terminate scraper connections with an immediate <code>HTTP 403 Forbidden</code> response. This drops requests in <strong>&lt;5ms</strong> before your application server executes database queries, server-rendered React components, or API calls, saving significant CPU and bandwidth overhead.</p>",
        keyTakeaways: [
          "Robots.txt is purely voluntary and cannot physically stop rogue scrapers or aggressive scrapers from crawling your site.",
          "WAF rules and Edge Middleware intercept HTTP requests before they reach your origin server, preventing CPU spikes and bandwidth costs.",
          "Edge-level 403 blocks return in less than 5ms with minimal server memory overhead.",
        ],
      },
      {
        heading: "Understanding the AI Crawler Landscape: Training vs. Search & Browsing",
        content:
          "<p>Modern AI agents operate under two distinct architectural modalities: <strong>Bulk Offline Training Crawlers</strong> and <strong>Real-Time User Browsing / Search Retrieval Agents</strong>. Understanding the distinction is vital so you do not accidentally de-index your brand from AI search engines and answer citations:</p><ul><li><strong>Offline Training Crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot):</strong> These bots crawl billions of pages to compile foundational LLM training datasets. Blocking these crawlers prevents your proprietary content, documentation, or creative work from being used to train future model weights without attribution or payment.</li><li><strong>Live Browsing & Search Agents (ChatGPT-User, Claude-Web, PerplexityBot):</strong> These agents only crawl URLs in real time when an end-user explicitly prompts the AI (e.g. 'Summarize this article: https://example.com/guide' or asks a search question). Blocking these user-agent tokens will prevent AI chatbots from citing your site as a source or linking back to your domain in search responses.</li><li><strong>Aggressive Scrapers (Bytespider, Diffbot, ImagesiftBot):</strong> Often known for aggressive multi-threaded request bursts that overwhelm origin servers without contributing organic search traffic. These should be strictly blocked at the CDN or server firewall layer.</li></ul>",
        keyTakeaways: [
          "Commercial AI operators distinguish training tokens (GPTBot) from live user-prompted browsing tokens (ChatGPT-User).",
          "Google-Extended controls Gemini AI model training data and does NOT affect Google Search ranking or organic indexing.",
          "Bytespider and unthrottled scrapers generate high request volumes and should be filtered at the firewall layer.",
        ],
      },
      {
        heading: "Implementation Best Practices: Cloudflare WAF, Next.js Edge & Nginx",
        content:
          "<p>When deploying AI crawler firewall rules, follow these architectural best practices to avoid false positives and maintain 100% Googlebot visibility:</p><ol><li><strong>Never Block Generic Crawlers by Wildcard:</strong> Always use exact substring matches (e.g. <code>contains \"GPTBot\"</code>) rather than over-broad wildcards that could accidentally match legitimate user agents (like <code>Mozilla</code>, <code>Chrome</code>, or <code>Googlebot</code>).</li><li><strong>Verify Googlebot via IP / ASN if Suspicious:</strong> Legitimate search engines publish verified IP ranges and support reverse DNS lookups. Malicious scrapers sometimes spoof the Googlebot User-Agent; advanced WAF rules can enforce Cloudflare's <code>cf.client.bot</code> managed challenge to verify legitimate search bots.</li><li><strong>Pair Edge Middleware with robots.txt:</strong> Use a defense-in-depth approach. Keep clean <code>Disallow: /</code> rules in your <code>robots.txt</code> file for polite crawlers while enforcing <code>HTTP 403</code> in your Next.js <code>middleware.ts</code> or Cloudflare WAF to physically drop aggressive requests.</li></ol>",
        keyTakeaways: [
          "Use exact case-insensitive regex or contains operators to prevent collateral blocking of legitimate search bots.",
          "Combine robots.txt with Edge Middleware or Cloudflare WAF for true defense-in-depth security.",
          "Monitor 403 block counts in Cloudflare Analytics or Next.js logs to observe scraper drop volume.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Does blocking AI bots (like Google-Extended or GPTBot) harm my Google Search rankings?",
      answer:
        "No. Google explicitly separates its search indexer (`Googlebot`) from its generative AI training crawler (`Google-Extended`). Blocking `Google-Extended` prevents Google from using your site's content to train Gemini and Vertex AI foundation models, but has zero negative impact on your Google Search indexation, rankings, or snippet previews.",
    },
    {
      question: "Why does robots.txt fail to stop aggressive scrapers like Bytespider?",
      answer:
        "The Robots Exclusion Protocol (`robots.txt`) is an advisory honor system with no technical enforcement mechanism. While compliant crawlers respect `Disallow: /`, aggressive scrapers and commercial harvesting bots often ignore robots.txt or experience significant cache delays. Blocking these bots at the network edge (Cloudflare WAF, Next.js Middleware, or Nginx) enforces hard HTTP 403 Forbidden responses before the request touches your application code.",
    },
    {
      question: "What is the performance overhead of running bot detection in Next.js middleware.ts?",
      answer:
        "Next.js middleware runs on the lightweight Vercel Edge Runtime (V8 isolates). A regular expression check against the incoming `request.headers.get('user-agent')` string takes less than 0.1 milliseconds (sub-millisecond execution time) with negligible CPU and memory overhead, executing before server components render or database queries fire.",
    },
    {
      question: "Can I block AI model training while still allowing AI search citations (Perplexity, ChatGPT Search)?",
      answer:
        "Yes. To block training while allowing search engine discovery, block `GPTBot`, `ClaudeBot`, and `Google-Extended`, but keep `ChatGPT-User`, `Claude-Web`, and `PerplexityBot` allowed. This ensures users can still receive direct source links and citations to your content in AI search interfaces without your text being ingested into base training corpuses.",
    },
    {
      question: "How do I configure Cloudflare WAF to block AI crawlers for free?",
      answer:
        "In your Cloudflare dashboard, navigate to Security > WAF > Custom Rules and click 'Create rule'. Name the rule 'Block AI Scrapers', click 'Edit expression', and paste the generated Cloudflare expression from this tool. Set the Action to 'Block' (or 'Managed Challenge') and deploy. Cloudflare will drop matched crawler traffic at the edge before it hits your origin server.",
    },
  ],
};

export default aiCrawlerFirewallTool;
