"use client";

import React, { useState, useCallback } from "react";
import { Copy, Check, Download, FileCode, Sparkles, ExternalLink, Code2, Bot, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SnippetTab {
  id: string;
  name: string;
  badge: string;
  filename: string;
  description: string;
  code: string;
}

const SNIPPETS: SnippetTab[] = [
  {
    id: "block-all-training",
    name: "Snippet 1: Block All AI Training Bots",
    badge: "Strict Privacy",
    filename: "robots.txt",
    description:
      "Explicitly blocks major LLM foundation model training crawlers while keeping standard search engines (Googlebot, Bingbot) and universal user-agents allowed.",
    code: `User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: *
Allow: /`,
  },
  {
    id: "allow-citations",
    name: "Snippet 2: Allow Citations & Block Scraping",
    badge: "AI Search Optimized",
    filename: "robots.txt",
    description:
      "Blocks bulk dataset ingestion (CCBot, GPTBot) while explicitly granting access to live citation and conversational search bots (ChatGPT-User, PerplexityBot).",
    code: `User-agent: CCBot
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /`,
  },
  {
    id: "full-production",
    name: "Full Production robots.txt Blueprint",
    badge: "Enterprise Ready",
    filename: "robots.txt",
    description:
      "Comprehensive production robots.txt featuring categorized AI directives, Googlebot/Bingbot search indexing rules, and sitemap references.",
    code: `# =========================================================================
# Production robots.txt: AI Crawler Management Policy
# Generated via OmniSEO Tools (https://omniseotools.com/tools/robots-txt-generator-validator)
# =========================================================================

# 1. DISALLOW BULK FOUNDATION MODEL TRAINING SCRAPERS
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

# 2. ALLOW REAL-TIME AI CITATION & CONVERSATIONAL SEARCH BOTS
User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

# 3. ALLOW STANDARD SEARCH ENGINE INDEXING
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# 4. DEFAULT WILDCARD DIRECTIVE
User-agent: *
Allow: /

# Sitemaps and LLMs context
Sitemap: https://omniseotools.com/sitemap.xml
# LLMs Context: https://omniseotools.com/llms.txt`,
  },
];

export function AiCrawlerSnippetTabs() {
  const [activeTab, setActiveTab] = useState<string>("block-all-training");
  const [copied, setCopied] = useState(false);

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentSnippet]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([currentSnippet.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = currentSnippet.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentSnippet]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden space-y-0">
      {/* Tab Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/80 px-4 py-2.5 gap-2">
        <div className="flex flex-wrap gap-1.5">
          {SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setActiveTab(snippet.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                activeTab === snippet.id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600"
              )}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>{snippet.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Snippet"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>

      {/* Snippet Description */}
      <div className="px-4 py-2.5 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span>{currentSnippet.description}</span>
        <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
          Content-Type: text/plain
        </span>
      </div>

      {/* Code Editor Display */}
      <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre">{currentSnippet.code}</pre>
      </div>

      {/* Tool Callout Bridge Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border-t border-emerald-100 dark:border-emerald-900/40">
        <div className="flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200">
          <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Want to toggle AI crawlers interactively and test syntax?
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tools/robots-txt-generator-validator"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500 transition-all"
          >
            <span>Open Robots.txt Validator</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <span className="text-slate-400">•</span>
          <Link
            href="/tools/llms-txt-generator"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500 transition-all"
          >
            <span>Generate LLMs.txt</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
