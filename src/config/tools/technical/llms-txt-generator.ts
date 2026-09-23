import { ToolDefinition } from "@/types/tool";

export const llmsTxtGeneratorTool: ToolDefinition = {
  id: "llms-txt-generator",
  slug: "llms-txt-generator",
  name: "LLMs.txt & AI Crawler Directive Generator",
  title: "Free LLMs.txt & AI Crawler Directive Generator | OmniSEO Tools",
  metaTitle: "Free LLMs.txt & AI Crawler Directive Generator | OmniSEO Tools",
  metaDescription:
    "Generate standard /llms.txt context files for AI search engines and configure granular robots.txt directives for GPTBot, ClaudeBot, Perplexity, and Google-Extended.",
  h1: "LLMs.txt & AI Crawler Directive Generator",
  tagline:
    "Generate standard /llms.txt context files for AI search agents and configure granular robots.txt crawler permissions for OpenAI, Anthropic, Google, and Perplexity bots.",
  shortDescription:
    "Generate standard /llms.txt files and configure granular robots.txt AI bot directives for OpenAI, Claude, Google, and Perplexity.",
  category: "technical",
  icon: "Bot",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "llms.txt generator",
    "llms txt generator",
    "ai crawler robots.txt",
    "gptbot robots.txt",
    "claudebot robots.txt",
    "perplexitybot robots.txt",
    "google-extended robots.txt",
    "ai search optimization",
    "llm context markdown",
    "llms full txt generator",
    "llms.txt next.js",
    "geo generative engine optimization",
    "generative ai seo",
    "chatgpt search robots.txt",
  ],
  howToSteps: [
    {
      name: "Select Configuration Preset or Custom Mode",
      text: "Choose from pre-built strategies (Permissive AI Access, Search-Only Access, Strict Privacy / No AI Training, or Developer Doc Hub) or configure custom directives.",
    },
    {
      name: "Build Your /llms.txt Context File",
      text: "Define your site title, mandatory blockquote overview, detailed markdown description, and dynamic resource link sections (APIs, guides, schemas).",
    },
    {
      name: "Set Granular AI Crawler Permissions",
      text: "Toggle individual permissions (Allow, Disallow, or Custom Path) for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, ByteSpider, and Applebot.",
    },
    {
      name: "Inspect Real-Time AI Compliance & Token Metrics",
      text: "Review the automated validation checklist to verify blockquote presence, link syntax, token count estimates, and search vs. training bot policies.",
    },
    {
      name: "Copy or Export Production Snippets",
      text: "Export clean /llms.txt markdown, robots.txt User-agent blocks, or a complete Next.js App Router route handler (app/llms.txt/route.ts).",
    },
  ],
  guideContent: {
    title: "The Comprehensive Engineering Guide to /llms.txt, AI Crawlers & Generative Engine Optimization (GEO)",
    sections: [
      {
        heading: "What is /llms.txt? The Emerging Markdown Standard for AI Context",
        content:
          "<p>As Large Language Models (LLMs) and conversational search engines (ChatGPT Search, Perplexity, Claude, Google Gemini) increasingly mediate how users discover information, websites face a major technical challenge: standard HTML webpages are bloated with navigation scripts, styling sheets, advertising pixels, and complex DOM hierarchies that consume excessive LLM context tokens and degrade inference accuracy.</p><p>Proposed as an open standard, <strong>/llms.txt</strong> serves as a curated, lightweight Markdown index hosted at the root of a domain (e.g., <code>https://yourdomain.com/llms.txt</code>). Similar to how <code>/robots.txt</code> directs search engine crawlers and <code>/sitemap.xml</code> catalogs URLs, <code>/llms.txt</code> provides AI agents with a concise, high-density summary of your site's core purpose, structured APIs, and key documentation links formatted specifically for minimal token consumption and optimal retrieval-augmented generation (RAG).</p>",
        keyTakeaways: [
          "/llms.txt provides curated, high-density Markdown context directly to AI search agents and LLM inference pipelines.",
          "Hosted at the root domain (/llms.txt) alongside robots.txt and sitemap.xml.",
          "Follows a strict Markdown structure: H1 title, blockquote summary (>), and H2 resource sections with markdown bullet links.",
        ],
      },
      {
        heading: "AI Search Bots vs. Training Scrapers: The Critical Crawler Distinction",
        content:
          "<p>A common mistake among webmasters is treating all AI bots identically in <code>robots.txt</code>. In reality, AI crawlers fall into two distinct operational categories:</p><ul><li><strong>AI Search & Referral Bots (SearchGPT / OAI-SearchBot, PerplexityBot, ChatGPT-User):</strong> These crawlers fetch real-time web content to answer immediate user queries and provide active citation links back to your site, driving high-intent organic referral traffic. Blocking these bots eliminates your brand from AI-generated search answers.</li><li><strong>AI Model Training Scrapers (GPTBot, CCBot, ByteSpider, Cohere-ai):</strong> These bots crawl bulk web content to train foundation models (GPT-5, Claude, Doubao). They ingest content into training weights without providing direct per-query citation links.</li><li><strong>Google-Extended vs. Googlebot:</strong> <code>Google-Extended</code> is a dedicated crawler token used specifically to opt out of Google Gemini and Vertex AI training datasets. Blocking <code>Google-Extended</code> does <strong>NOT</strong> impact your rankings or indexing in Google Web Search (which uses <code>Googlebot</code>).</li></ul>",
        keyTakeaways: [
          "Differentiate between Search citation bots (OAI-SearchBot, PerplexityBot) and mass training scrapers (CCBot, ByteSpider).",
          "Blocking Google-Extended prevents Gemini training ingestion without hurting Google SERP rankings.",
          "Adopt a 'Search-Only' policy if you wish to capture AI search traffic while protecting proprietary content from model training.",
        ],
      },
      {
        heading: "Official /llms.txt Specification & Syntax Rules",
        content:
          "<p>To ensure deterministic parsing across autonomous agents, an <code>/llms.txt</code> file must adhere to standard Markdown syntax:</p><ul><li><strong>H1 Document Title (<code># Project Name</code>):</strong> The primary identifier of your application, documentation, or organization.</li><li><strong>Mandatory Blockquote Summary (<code>> Brief overview</code>):</strong> A concise, 2-to-3 sentence synthesis placed immediately below the H1 heading. AI agents ingest this blockquote as an authoritative system prompt description.</li><li><strong>Optional Context Body:</strong> 1–2 paragraphs providing background architecture, prerequisites, or licensing details.</li><li><strong>H2 Section Headings (<code>## Section Title</code>):</strong> Grouped collections of resource links (e.g., <code>## Core APIs</code>, <code>## Guides</code>, <code>## Schema Models</code>).</li><li><strong>Markdown Bullet Links (<code>- [Title](URL): Description</code>):</strong> Each resource must feature an anchor label, an absolute or root-relative URL, and an optional colon-separated description explaining its payload.</li><li><strong>Optional /llms-full.txt Pointer:</strong> For comprehensive documentation sets, link to a consolidated <code>/llms-full.txt</code> file containing the complete concatenated documentation in plain Markdown.</li></ul>",
        keyTakeaways: [
          "Always include a blockquote overview (>) directly beneath the H1 title.",
          "Format links as - [Label](URL): Description for uniform LLM tokenization.",
          "Keep the top-level /llms.txt under 2,000 tokens to fit comfortably inside AI context windows.",
        ],
      },
      {
        heading: "Serving /llms.txt in Next.js App Router, Vercel & Cloudflare",
        content:
          "<p>To serve <code>/llms.txt</code> with high performance and zero server latency, implement a dedicated Route Handler in Next.js App Router at <code>app/llms.txt/route.ts</code>:</p><pre><code>// app/llms.txt/route.ts\nimport { NextResponse } from 'next/server';\n\nexport const dynamic = 'force-static';\nexport const revalidate = 86400; // Cache for 24 hours\n\nexport async function GET() {\n  const llmsContent = `# Your Project\\n\\n> Summary context...`;\n  return new NextResponse(llmsContent, {\n    status: 200,\n    headers: {\n      'Content-Type': 'text/plain; charset=utf-8',\n      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',\n    },\n  });\n}</code></pre><p>Alternatively, place a static <code>llms.txt</code> file directly inside your Next.js <code>/public</code> directory, or configure edge header rules in Cloudflare Pages and Vercel.</p>",
        keyTakeaways: [
          "Serve /llms.txt with Content-Type: text/plain; charset=utf-8 headers.",
          "Use force-static and Cache-Control headers to ensure zero-latency edge delivery.",
          "Reference your /llms.txt URL inside your robots.txt header comments to assist AI crawler discovery.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is /llms.txt and why is it important for SEO in 2026?",
      answer:
        "/llms.txt is an emerging web standard that provides Large Language Models (like ChatGPT, Claude, Perplexity, and Gemini) with a clean, curated Markdown index of your website. Instead of forcing AI crawlers to parse complex HTML with heavy CSS/JS, /llms.txt delivers high-density, low-token context that improves how AI search engines cite and recommend your content.",
    },
    {
      question: "What is the difference between GPTBot, ChatGPT-User, and OAI-SearchBot?",
      answer:
        "GPTBot is OpenAI's web crawler used to scrape data for training future foundation models. ChatGPT-User is triggered in real-time when a user asks ChatGPT to browse a specific URL. OAI-SearchBot is the crawler for OpenAI's search engine (ChatGPT Search) used to index content and provide citation links. Blocking GPTBot prevents training ingestion, while allowing OAI-SearchBot preserves search referral traffic.",
    },
    {
      question: "Does blocking Google-Extended hurt my Google search rankings?",
      answer:
        "No. Google explicitly designed Google-Extended as a standalone crawler token for Gemini and Vertex AI generative training. Blocking Google-Extended (User-agent: Google-Extended Disallow: /) does not affect Googlebot, nor does it impact your site's indexing, ranking, or snippets in Google Web Search.",
    },
    {
      question: "How do I serve /llms.txt in a Next.js App Router application?",
      answer:
        "You can either place a static llms.txt file in your project's /public directory, or create a dynamic/static Route Handler at app/llms.txt/route.ts returning a Response with Content-Type: text/plain; charset=utf-8. The route handler approach allows you to inject dynamic version numbers, active tool lists, and automated documentation links.",
    },
    {
      question: "What is the recommended size for an /llms.txt file?",
      answer:
        "The primary /llms.txt index file should ideally remain under 2,000 tokens (approx 8KB–10KB) so that AI agents can ingest the entire file within a single prompt context window without truncation. If you have extensive documentation, create a companion /llms-full.txt file for full text and link to it from your main /llms.txt.",
    },
    {
      question: "Does this tool upload my documentation or data to any external server?",
      answer:
        "No. Like all OmniSEO Tools utilities, this generator runs 100% client-side in your local browser JavaScript engine. Your site titles, private route paths, and configuration settings are never transmitted across the network.",
    },
  ],
};
