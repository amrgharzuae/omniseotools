"use client";

import React, { useState, useCallback } from "react";
import {
  Copy,
  Check,
  Download,
  FileCode,
  Sparkles,
  ExternalLink,
  Code2,
  Bot,
  ShieldAlert,
  Server,
  Zap,
  Globe,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SnippetTab {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  filename: string;
  language: string;
  description: string;
  code: string;
}

const DEFENSE_SNIPPETS: SnippetTab[] = [
  {
    id: "layer3-nextjs",
    name: "Layer 3: Next.js Edge Middleware",
    badge: "App Router / Edge",
    badgeColor: "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-300/50",
    filename: "src/middleware.ts",
    language: "typescript",
    description:
      "Intercepts unauthorized AI scrapers at the V8 edge in <2ms before React Server Components (RSC), database queries, or Server Actions execute.",
    code: `// src/middleware.ts (Next.js App Router Edge Firewall)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Match offline LLM training crawlers & aggressive scrapers
// Notice: Googlebot, Bingbot, & verified search crawlers are NOT in this regex
const BLOCKED_AI_BOTS = /(GPTBot|ClaudeBot|Google-Extended|Applebot-Extended|Bytespider|CCBot|Diffbot|ImagesiftBot)/i;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  // Intercept matched AI scrapers and return an instant 403 Forbidden
  if (BLOCKED_AI_BOTS.test(userAgent)) {
    return new NextResponse('Forbidden: Automated AI Training & Scraping Prohibited', {
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
  // Apply firewall to all document & API routes; bypass static JS/CSS & images
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};`,
  },
  {
    id: "layer2-cloudflare",
    name: "Layer 2: Cloudflare WAF Expression",
    badge: "Network Edge CDN",
    badgeColor: "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300/50",
    filename: "cloudflare-waf-rule.txt",
    language: "text",
    description:
      "Hardens your CDN edge to drop AI scraping requests before they hit your hosting origin, while protecting verified search engines with `not cf.client.bot`.",
    code: `// Cloudflare Custom WAF Expression (Security > WAF > Custom Rules)
// Action: Block (or Managed Challenge)
(
  (
    http.user_agent contains "GPTBot" or
    http.user_agent contains "ClaudeBot" or
    http.user_agent contains "Bytespider" or
    http.user_agent contains "CCBot" or
    http.user_agent contains "Diffbot" or
    http.user_agent contains "Google-Extended" or
    http.user_agent contains "Applebot-Extended"
  )
  and not cf.client.bot
)`,
  },
  {
    id: "layer2-nginx",
    name: "Layer 2: Nginx Reverse Proxy (HTTP 444)",
    badge: "Zero-Bandwidth Drop",
    badgeColor: "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300/50",
    filename: "/etc/nginx/conf.d/block_ai_bots.conf",
    language: "nginx",
    description:
      "Uses Nginx non-standard `return 444;` to instantly sever TCP connections with zero response bytes, saving 100% of egress bandwidth.",
    code: `# /etc/nginx/conf.d/block_ai_bots.conf
# 1. Compile regex hash table in the http {} context
map $http_user_agent $block_ai_crawler {
    default 0;
    "~*(GPTBot|ClaudeBot|Google-Extended|Applebot-Extended|Bytespider|CCBot|Diffbot)" 1;
}

server {
    server_name example.com;

    # 2. Immediately close TCP socket with zero response headers
    if ($block_ai_crawler) {
        return 444;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
  },
  {
    id: "layer1-robots",
    name: "Layer 1: Clean robots.txt (REP)",
    badge: "Advisory Standard",
    badgeColor: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300/50",
    filename: "public/robots.txt",
    language: "text",
    description:
      "RFC 9309 compliant directives that instruct polite commercial LLM training crawlers to stay away without blocking Googlebot or Bingbot.",
    code: `# =========================================================================
# Robots.txt AI Training Exclusion (Advisory Layer 1)
# Note: Googlebot and Bingbot are unaffected. Google-Extended protects Gemini training.
# =========================================================================

# Block OpenAI Foundation Model Training
User-agent: GPTBot
Disallow: /

# Block Anthropic Foundation Model Training
User-agent: ClaudeBot
Disallow: /

# Block Google Gemini / Vertex AI Training (Search remains 100% indexed)
User-agent: Google-Extended
Disallow: /

# Block Apple Intelligence Foundation Training (Siri / Spotlight unaffected)
User-agent: Applebot-Extended
Disallow: /

# Block Common Crawl Open LLM Datasets
User-agent: CCBot
Disallow: /

# Block ByteDance Scraping Engine
User-agent: Bytespider
Disallow: /

# Allow All Legitimate Web Search Engines & Citation Assistants
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: *
Allow: /`,
  },
];

export function AiDefenseSnippetTabs() {
  const [activeTabId, setActiveTabId] = useState<string>("layer3-nextjs");
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = DEFENSE_SNIPPETS.find((s) => s.id === activeTabId) || DEFENSE_SNIPPETS[0];

  const handleCopy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [activeSnippet.code]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([activeSnippet.code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeSnippet.filename.split("/").pop() || "firewall-rule.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeSnippet]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden my-8">
      {/* Tab Selectors Header */}
      <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600 text-white">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Multi-Layer Production Code Snippets
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Select your infrastructure tier to inspect and deploy the exact code configuration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              title={`Download ${activeSnippet.filename}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl">
          {DEFENSE_SNIPPETS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-center truncate",
                  isActive
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {tab.name.split(":")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Snippet Context Bar */}
      <div className="px-4 py-2.5 bg-slate-100/70 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">
            {activeSnippet.filename}
          </span>
          <span
            className={cn(
              "px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border",
              activeSnippet.badgeColor
            )}
          >
            {activeSnippet.badge}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-lg">
          {activeSnippet.description}
        </p>
      </div>

      {/* Code Display Area */}
      <div className="relative bg-slate-950 p-4 font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed max-h-[380px] overflow-y-auto selection:bg-rose-900 selection:text-white whitespace-pre">
        <code>{activeSnippet.code}</code>
      </div>

      {/* Interactive Generator Banner Footer */}
      <div className="p-3.5 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300">
            Need custom bot selections or instant User-Agent testing?
          </span>
        </div>
        <Link
          href="/tools/ai-crawler-firewall"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
        >
          <span>Open AI Crawler Firewall Tool</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
