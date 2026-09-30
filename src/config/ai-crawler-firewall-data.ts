export interface AiBotDefinition {
  id: string;
  name: string;
  token: string;
  operator: string;
  category: "training" | "scrapers";
  role: string;
  respectsRobotsTxt: "Yes" | "Often ignores" | "Partial";
  threatLevel: "High" | "Medium" | "Low";
  impact: string;
  defaultBlocked: boolean;
  sampleUserAgent: string;
  description: string;
}

export const AI_BOTS: AiBotDefinition[] = [
  // Commercial AI Training Crawlers
  {
    id: "gptbot",
    name: "GPTBot",
    token: "GPTBot",
    operator: "OpenAI",
    category: "training",
    role: "LLM Model Training (GPT-4 / GPT-5)",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Content ingested into OpenAI foundation training weights",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
    description: "OpenAI's primary bulk training crawler harvesting public web pages to train future GPT series models.",
  },
  {
    id: "chatgpt-user",
    name: "ChatGPT-User",
    token: "ChatGPT-User",
    operator: "OpenAI",
    category: "training",
    role: "On-Demand Search & Browsing",
    respectsRobotsTxt: "Yes",
    threatLevel: "Low",
    impact: "Live user prompt retrieval (allows ChatGPT search links & citations)",
    defaultBlocked: false,
    sampleUserAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)",
    description: "Dispatched in real time when ChatGPT users prompt the AI to browse a specific URL for answers.",
  },
  {
    id: "claudebot",
    name: "ClaudeBot",
    token: "ClaudeBot",
    operator: "Anthropic",
    category: "training",
    role: "LLM Model Training (Claude 3.5 / 3.7)",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Bulk content harvesting for Anthropic foundation models",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
    description: "Anthropic's web crawler collecting large-scale textual data for training the Claude AI model family.",
  },
  {
    id: "claude-web",
    name: "Claude-Web",
    token: "Claude-Web",
    operator: "Anthropic",
    category: "training",
    role: "On-Demand Web Retrieval",
    respectsRobotsTxt: "Yes",
    threatLevel: "Low",
    impact: "Live user fetch (allows Claude search citations)",
    defaultBlocked: false,
    sampleUserAgent:
      "Mozilla/5.0 (compatible; Claude-Web/1.0; +https://anthropic.com/bot)",
    description: "Used dynamically when Claude fetches external web content in response to live user questions.",
  },
  {
    id: "google-extended",
    name: "Google-Extended",
    token: "Google-Extended",
    operator: "Google",
    category: "training",
    role: "Gemini & Vertex AI Training Data",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Model training (does NOT affect Google Search ranking/indexing)",
    defaultBlocked: true,
    sampleUserAgent: "Google-Extended",
    description: "Dedicated Google standalone token for training Gemini without modifying organic Google Search crawling.",
  },
  {
    id: "applebot-extended",
    name: "Applebot-Extended",
    token: "Applebot-Extended",
    operator: "Apple",
    category: "training",
    role: "Apple Intelligence Model Training",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Foundation training for Siri and Apple Intelligence features",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Applebot/0.1 (Applebot-Extended; +http://www.apple.com/go/applebot)",
    description: "Apple's crawler token dedicated to harvesting data for generative AI training across iOS and macOS.",
  },
  {
    id: "meta-externalagent",
    name: "Meta-ExternalAgent",
    token: "Meta-ExternalAgent",
    operator: "Meta",
    category: "training",
    role: "Llama AI Model Training",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Ingestion for Meta Llama open-weight models",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 (compatible; Meta-ExternalAgent/1.0; +https://developers.facebook.com/docs/sharing/webmasters/crawler)",
    description: "Meta's external crawler training foundation Llama generative language models and assistants.",
  },

  // Aggressive Web Scrapers & Aggregators
  {
    id: "bytespider",
    name: "Bytespider",
    token: "Bytespider",
    operator: "ByteDance / TikTok",
    category: "scrapers",
    role: "Aggressive Scraping & Douyin AI",
    respectsRobotsTxt: "Often ignores",
    threatLevel: "High",
    impact: "Extreme origin server bandwidth & CPU spikes",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 (compatible; Bytespider; https://zhanzhang.toutiao.com/)",
    description: "Notorious for high-frequency crawl loops, aggressive multi-threaded requests, and bandwidth spikes.",
  },
  {
    id: "ccbot",
    name: "CCBot",
    token: "CCBot",
    operator: "Common Crawl",
    category: "scrapers",
    role: "Open Bulk Web Scraping & Archiving",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Public bulk dataset ingestion used by hundreds of AI labs",
    defaultBlocked: true,
    sampleUserAgent: "CCBot/2.0 (https://commoncrawl.org/faq/)",
    description: "Common Crawl's bulk harvester creating open multi-terabyte web archives redistributed worldwide.",
  },
  {
    id: "diffbot",
    name: "Diffbot",
    token: "Diffbot",
    operator: "Diffbot",
    category: "scrapers",
    role: "Commercial Knowledge Graph Extraction",
    respectsRobotsTxt: "Partial",
    threatLevel: "Medium",
    impact: "Transforms site pages into commercial structured database entities",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 (compatible; Diffbot/0.1; +http://www.diffbot.com)",
    description: "Commercial extraction bot that automatically turns entire websites into queryable knowledge graphs.",
  },
  {
    id: "imagesiftbot",
    name: "ImagesiftBot",
    token: "ImagesiftBot",
    operator: "ImageSift / AI Vision",
    category: "scrapers",
    role: "Bulk Image & Media Ingestion",
    respectsRobotsTxt: "Often ignores",
    threatLevel: "High",
    impact: "Mass media scraping draining CDN bandwidth and image assets",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 (compatible; ImagesiftBot; +https://imagesift.com)",
    description: "Automated image crawler harvesting product photography and media assets for computer vision training.",
  },
  {
    id: "perplexitybot",
    name: "PerplexityBot",
    token: "PerplexityBot",
    operator: "Perplexity AI",
    category: "scrapers",
    role: "Live Search Indexing & Citations",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Scrapes content to synthesize real-time conversational search answers",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/bot)",
    description: "Perplexity's crawler that fetches and indexes pages to generate citations and AI search answers.",
  },
  {
    id: "cohere-ai",
    name: "Cohere (cohere-ai)",
    token: "cohere-ai",
    operator: "Cohere",
    category: "scrapers",
    role: "Enterprise LLM Training",
    respectsRobotsTxt: "Yes",
    threatLevel: "Medium",
    impact: "Collects data for enterprise Command models and embeddings",
    defaultBlocked: true,
    sampleUserAgent:
      "Mozilla/5.0 (compatible; cohere-ai; +https://cohere.com/bot)",
    description: "Crawls textual data to train Cohere's enterprise NLP classification and generative models.",
  },
];
