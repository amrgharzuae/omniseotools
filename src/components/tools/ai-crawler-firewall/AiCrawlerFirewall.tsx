"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  Bot,
  Copy,
  Check,
  Download,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Server,
  Code2,
  Globe,
  Terminal,
  Layers,
  Info,
  ExternalLink,
  Flame,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

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

type OutputTab = "nextjs" | "cloudflare" | "nginx" | "apache" | "robots";

interface AiCrawlerFirewallProps {
  toolSlug?: string;
  toolName?: string;
}

export function AiCrawlerFirewall({ toolSlug, toolName }: AiCrawlerFirewallProps) {
  // Active Blocked Bot State (Record of bot.id -> boolean)
  const [blockedBots, setBlockedBots] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    AI_BOTS.forEach((bot) => {
      initial[bot.id] = bot.defaultBlocked;
    });
    return initial;
  });

  // Output Format Tab
  const [activeTab, setActiveTab] = useState<OutputTab>("nextjs");
  const [copied, setCopied] = useState<boolean>(false);

  // Live User-Agent Tester State
  const [testUserAgent, setTestUserAgent] = useState<string>(
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)"
  );

  // Toggle Single Bot
  const toggleBot = useCallback((id: string) => {
    setBlockedBots((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Preset Handlers
  const handleSelectAll = useCallback(() => {
    const updated: Record<string, boolean> = {};
    AI_BOTS.forEach((bot) => {
      updated[bot.id] = true;
    });
    setBlockedBots(updated);
  }, []);

  const handleBlockTrainingOnly = useCallback(() => {
    const updated: Record<string, boolean> = {};
    AI_BOTS.forEach((bot) => {
      if (bot.id === "chatgpt-user" || bot.id === "claude-web" || bot.id === "perplexitybot") {
        updated[bot.id] = false;
      } else {
        updated[bot.id] = true;
      }
    });
    setBlockedBots(updated);
  }, []);

  const handleBlockAggressiveOnly = useCallback(() => {
    const updated: Record<string, boolean> = {};
    AI_BOTS.forEach((bot) => {
      if (
        bot.id === "bytespider" ||
        bot.id === "ccbot" ||
        bot.id === "diffbot" ||
        bot.id === "imagesiftbot"
      ) {
        updated[bot.id] = true;
      } else {
        updated[bot.id] = false;
      }
    });
    setBlockedBots(updated);
  }, []);

  const handleResetAll = useCallback(() => {
    const updated: Record<string, boolean> = {};
    AI_BOTS.forEach((bot) => {
      updated[bot.id] = false;
    });
    setBlockedBots(updated);
  }, []);

  // List of currently blocked bot objects
  const activeBlockedBots = useMemo(() => {
    return AI_BOTS.filter((bot) => blockedBots[bot.id]);
  }, [blockedBots]);

  // Blocked tokens regex pattern (e.g. "GPTBot|ClaudeBot|Bytespider...")
  const blockedTokensRegexString = useMemo(() => {
    if (activeBlockedBots.length === 0) return "";
    return activeBlockedBots.map((b) => b.token).join("|");
  }, [activeBlockedBots]);

  // Live Tester Evaluation
  const testResult = useMemo(() => {
    if (!testUserAgent.trim()) {
      return {
        tested: false,
        isBlocked: false,
        matchedBot: null as AiBotDefinition | null,
      };
    }

    const uaLower = testUserAgent.toLowerCase();

    for (const bot of AI_BOTS) {
      if (blockedBots[bot.id]) {
        if (uaLower.includes(bot.token.toLowerCase())) {
          return {
            tested: true,
            isBlocked: true,
            matchedBot: bot,
          };
        }
      }
    }

    // Check if it matched a known bot that is currently allowed
    let allowedMatchedBot: AiBotDefinition | null = null;
    for (const bot of AI_BOTS) {
      if (!blockedBots[bot.id]) {
        if (uaLower.includes(bot.token.toLowerCase())) {
          allowedMatchedBot = bot;
          break;
        }
      }
    }

    return {
      tested: true,
      isBlocked: false,
      matchedBot: allowedMatchedBot,
    };
  }, [testUserAgent, blockedBots]);

  // Code Generation Snippets
  const generatedCode = useMemo(() => {
    if (activeBlockedBots.length === 0) {
      return "// No AI bots selected for blocking. Select at least one bot above to generate firewall rules.";
    }

    switch (activeTab) {
      case "nextjs": {
        return `// middleware.ts (Next.js Edge Runtime AI Crawler Firewall)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Blocked AI Crawlers: ${activeBlockedBots.map((b) => b.name).join(", ")}
const BLOCKED_AI_BOTS = /(${blockedTokensRegexString})/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  // Intercept & terminate matched AI scrapers with HTTP 403 Forbidden
  if (BLOCKED_AI_BOTS.test(userAgent)) {
    return new NextResponse('Forbidden: Automated AI Crawler Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Cache-Control': 'no-store',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Apply firewall across all public routes, ignoring static assets & icons
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png).*)'],
};`;
      }

      case "cloudflare": {
        const clauses = activeBlockedBots.map((b) => `http.user_agent contains "${b.token}"`);
        return `// Cloudflare WAF Expression (Security > WAF > Custom Rules)
// Rule Action: Block (or Managed Challenge)
(${clauses.join(" or ")})`;
      }

      case "nginx": {
        return `# nginx.conf (AI Crawler & Scraper User-Agent Firewall)
map $http_user_agent $block_ai_crawler {
    default 0;
    "~*(${blockedTokensRegexString})" 1;
}

server {
    server_name example.com;

    # Immediate 403 response before invoking PHP-FPM or Node reverse proxy
    if ($block_ai_crawler) {
        return 403 "Forbidden: Automated AI Scraping Prohibited\\n";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`;
      }

      case "apache": {
        return `# .htaccess (Apache AI Crawler & Scraper Rewrite Firewall)
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# Block AI crawlers with HTTP 403 Forbidden
RewriteCond %{HTTP_USER_AGENT} (${blockedTokensRegexString}) [NC]
RewriteRule ^ - [F,L]
</IfModule>`;
      }

      case "robots": {
        const blocks = activeBlockedBots.map((b) => `User-agent: ${b.token}\nDisallow: /`);
        return `# =========================================================================
# AI Crawler Exclusion Directives (RFC 9309 Compliant)
# Note: robots.txt is advisory. Use WAF or Edge Middleware for hard 403 blocks.
# Generated via OmniSEO Tools (/tools/ai-crawler-firewall)
# =========================================================================

${blocks.join("\n\n")}`;
      }

      default:
        return "";
    }
  }, [activeTab, activeBlockedBots, blockedTokensRegexString]);

  // Copy Action
  const handleCopy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedCode]);

  // Download Action
  const handleDownload = useCallback(() => {
    let filename = "firewall-rules.txt";
    let mime = "text/plain;charset=utf-8";

    if (activeTab === "nextjs") {
      filename = "middleware.ts";
      mime = "application/typescript;charset=utf-8";
    } else if (activeTab === "cloudflare") {
      filename = "cloudflare-waf-expression.txt";
    } else if (activeTab === "nginx") {
      filename = "ai-firewall-nginx.conf";
    } else if (activeTab === "apache") {
      filename = ".htaccess";
    } else if (activeTab === "robots") {
      filename = "robots.txt";
    }

    const blob = new Blob([generatedCode], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeTab, generatedCode]);

  // Separate bots by category
  const trainingBots = useMemo(() => AI_BOTS.filter((b) => b.category === "training"), []);
  const scraperBots = useMemo(() => AI_BOTS.filter((b) => b.category === "scrapers"), []);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Control Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-4 sm:p-5 text-white shadow-xl shadow-rose-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  AI Crawler Firewall Matrix
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold font-mono">
                  {activeBlockedBots.length} / {AI_BOTS.length} Blocked
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Toggle AI model training bots and aggressive scrapers to compile instant edge firewall rules.
              </p>
            </div>
          </div>

          {/* Quick Strategy Presets */}
          <div className="flex flex-wrap items-center gap-1.5 self-start lg:self-auto">
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
            >
              Select All ({AI_BOTS.length})
            </button>
            <button
              type="button"
              onClick={handleBlockTrainingOnly}
              className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-xs font-semibold text-rose-200 border border-rose-500/30 transition-colors"
            >
              Block Training Only
            </button>
            <button
              type="button"
              onClick={handleBlockAggressiveOnly}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs font-semibold text-amber-200 border border-amber-500/30 transition-colors"
            >
              Block ByteSpider &amp; Scrapers
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/30 text-xs font-medium text-slate-300 hover:text-rose-200 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Clear
            </button>

            <EmbedBadgeModal
              toolSlug={toolSlug || "ai-crawler-firewall"}
              label="AI Firewall"
              status={activeBlockedBots.length > 0 ? "Hardened" : "Audit"}
              score={Math.min(100, Math.round((activeBlockedBots.length / AI_BOTS.length) * 100))}
            />
          </div>

        </div>
      </div>

      {/* Main Dual-Pane Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Bot Selection Matrix & User-Agent Tester */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Commercial AI Training Crawlers */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Commercial AI Model Training Crawlers
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Harvest content to train proprietary LLMs (OpenAI, Anthropic, Google, Apple, Meta)
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {trainingBots.filter((b) => blockedBots[b.id]).length} / {trainingBots.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {trainingBots.map((bot) => {
                const isBlocked = !!blockedBots[bot.id];
                return (
                  <div
                    key={bot.id}
                    onClick={() => toggleBot(bot.id)}
                    className={cn(
                      "p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3",
                      isBlocked
                        ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60 shadow-xs"
                        : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={isBlocked}
                          onChange={() => {}}
                          className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {bot.name}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {bot.operator}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                            token: {bot.token}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {bot.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider",
                          isBlocked
                            ? "bg-rose-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        )}
                      >
                        {isBlocked ? "BLOCKED" : "ALLOWED"}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        REP: {bot.respectsRobotsTxt}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Aggressive Web Scrapers & Aggregators */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Aggressive Web Scrapers &amp; Bulk Harvesters
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    High-frequency crawlers causing server load, media harvesting, and bandwidth exhaustion
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {scraperBots.filter((b) => blockedBots[b.id]).length} / {scraperBots.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {scraperBots.map((bot) => {
                const isBlocked = !!blockedBots[bot.id];
                return (
                  <div
                    key={bot.id}
                    onClick={() => toggleBot(bot.id)}
                    className={cn(
                      "p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3",
                      isBlocked
                        ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60 shadow-xs"
                        : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={isBlocked}
                          onChange={() => {}}
                          className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {bot.name}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {bot.operator}
                          </span>
                          {bot.threatLevel === "High" && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300">
                              High Bandwidth
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {bot.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider",
                          isBlocked
                            ? "bg-rose-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        )}
                      >
                        {isBlocked ? "BLOCKED" : "ALLOWED"}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        REP: {bot.respectsRobotsTxt}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Live User-Agent Tester */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Live User-Agent Firewall Tester
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Paste any User-Agent header to test edge firewall matching in real time
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Sample User-Agent Switchers */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400">Quick Test:</span>
                <button
                  type="button"
                  onClick={() =>
                    setTestUserAgent(
                      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)"
                    )
                  }
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  GPTBot
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestUserAgent(
                      "Mozilla/5.0 (compatible; Bytespider; https://zhanzhang.toutiao.com/)"
                    )
                  }
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Bytespider
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestUserAgent(
                      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)"
                    )
                  }
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  ClaudeBot
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestUserAgent(
                      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
                    )
                  }
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Googlebot (Search)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestUserAgent(
                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
                    )
                  }
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Chrome User
                </button>
              </div>

              {/* Textarea */}
              <textarea
                value={testUserAgent}
                onChange={(e) => setTestUserAgent(e.target.value)}
                placeholder="Paste incoming User-Agent header..."
                rows={2}
                className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-y"
              />

              {/* Diagnostic Test Result Banner */}
              {testResult.tested && (
                <div
                  className={cn(
                    "p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all",
                    testResult.isBlocked
                      ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900/80 text-rose-900 dark:text-rose-200"
                      : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900/80 text-emerald-900 dark:text-emerald-200"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {testResult.isBlocked ? (
                      <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm">
                        {testResult.isBlocked
                          ? `BLOCKED (403 FORBIDDEN)`
                          : `ALLOWED (200 OK)`}
                      </div>
                      <div className="text-[11px] opacity-90 truncate">
                        {testResult.isBlocked
                          ? `Matched bot signature: "${testResult.matchedBot?.name}" (${testResult.matchedBot?.operator}) — Request dropped at Edge.`
                          : testResult.matchedBot
                          ? `Matched "${testResult.matchedBot.name}", but it is currently marked as ALLOWED.`
                          : "No blocked bot signature detected in this User-Agent. Request passes to origin server."}
                      </div>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-lg font-mono font-extrabold text-[11px] shrink-0",
                      testResult.isBlocked
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-emerald-600 text-white shadow-xs"
                    )}
                  >
                    HTTP {testResult.isBlocked ? "403" : "200"}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Code Generator Output & Instructions */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Code Viewer Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md overflow-hidden">
            
            {/* Tab Header & Action Controls */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
              
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Enforcement Snippet:
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Download configuration file"
                    className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Output Tabs Switcher */}
              <div className="flex flex-wrap gap-1 p-0.5 bg-slate-200 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab("nextjs")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-colors",
                    activeTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js Edge
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("cloudflare")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-colors",
                    activeTab === "cloudflare"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Cloudflare WAF
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("nginx")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-colors",
                    activeTab === "nginx"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Nginx
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("apache")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-colors",
                    activeTab === "apache"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  .htaccess
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("robots")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-colors",
                    activeTab === "robots"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  robots.txt
                </button>
              </div>

            </div>

            {/* Code Output Area */}
            <div className="relative">
              <pre className="font-mono text-xs p-4 bg-slate-950 text-slate-100 max-h-[380px] overflow-auto leading-relaxed selection:bg-rose-900 selection:text-white whitespace-pre">
                <code>{generatedCode}</code>
              </pre>
            </div>

            {/* Deployment Instructions Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-rose-500" />
                <span>
                  {activeTab === "nextjs" && "Next.js Deployment:"}
                  {activeTab === "cloudflare" && "Cloudflare WAF Instructions:"}
                  {activeTab === "nginx" && "Nginx Deployment:"}
                  {activeTab === "apache" && "Apache .htaccess Deployment:"}
                  {activeTab === "robots" && "Robots.txt Implementation:"}
                </span>
              </div>
              <p className="leading-relaxed">
                {activeTab === "nextjs" &&
                  "Save as `middleware.ts` in your Next.js project root (or `src/middleware.ts`). Runs on the V8 Edge Runtime with sub-millisecond overhead."}
                {activeTab === "cloudflare" &&
                  "In Cloudflare Dashboard > Security > WAF > Custom Rules > Create rule > Edit expression > Paste snippet > Set action to Block."}
                {activeTab === "nginx" &&
                  "Place the `map` block inside the `http {}` context and the `if` block inside your `server {}` block, then run `nginx -s reload`."}
                {activeTab === "apache" &&
                  "Paste this block into the `.htaccess` file in your root public directory above existing WordPress/Drupal rewrite rules."}
                {activeTab === "robots" &&
                  "Append to `public/robots.txt`. Note: robots.txt is advisory; for strict bandwidth defense, pair with Edge Middleware or Cloudflare WAF."}
              </p>
            </div>

          </div>

          {/* Value Callout Card */}
          <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-50/40 via-white to-slate-50 dark:from-rose-950/20 dark:via-slate-900/60 dark:to-slate-950 p-4 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs">
              <Zap className="h-4 w-4" />
              <span>Zero-Telemetry &amp; Edge Bandwidth Protection</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All rules are synthesized 100% in your browser. No site data or configuration options are transmitted to external servers.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AiCrawlerFirewall;
