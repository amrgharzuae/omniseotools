"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Download,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Bot,
  Search,
  Sliders,
  CheckCircle,
  XCircle,
  FileCode,
  Globe,
  Code2,
  Layers,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Preset {
  name: string;
  badge: string;
  defaultPolicy: "allow" | "disallow";
  disallowedPaths: string[];
  allowedPaths: string[];
  aiBots: string[];
  sitemaps: string[];
  crawlDelay: string;
}

const ALL_AI_BOTS = [
  { id: "GPTBot", name: "GPTBot (OpenAI Training)", desc: "Foundational model training for ChatGPT" },
  { id: "ChatGPT-User", name: "ChatGPT-User (Browsing)", desc: "Real-time web requests from ChatGPT users" },
  { id: "ClaudeBot", name: "ClaudeBot (Anthropic)", desc: "Anthropic crawler for training Claude" },
  { id: "Claude-Web", name: "Claude-Web (Anthropic)", desc: "Anthropic web retrieval scraper" },
  { id: "PerplexityBot", name: "PerplexityBot", desc: "Perplexity AI search engine crawler" },
  { id: "Google-Extended", name: "Google-Extended", desc: "Gemini & Vertex AI training scraper" },
  { id: "Applebot-Extended", name: "Applebot-Extended", desc: "Apple Intelligence training scraper" },
  { id: "CCBot", name: "CCBot (Common Crawl)", desc: "Open web scraper used in open-source AI models" },
  { id: "Bytespider", name: "Bytespider (ByteDance)", desc: "ByteDance / TikTok AI crawler" },
];

const PRESETS: Preset[] = [
  {
    name: "Default Open",
    badge: "General Web",
    defaultPolicy: "allow",
    disallowedPaths: ["/admin/", "/api/", "/login/"],
    allowedPaths: [],
    aiBots: [],
    sitemaps: ["https://yourdomain.com/sitemap.xml"],
    crawlDelay: "",
  },
  {
    name: "WordPress",
    badge: "CMS",
    defaultPolicy: "allow",
    disallowedPaths: ["/wp-admin/"],
    allowedPaths: ["/wp-admin/admin-ajax.php"],
    aiBots: [],
    sitemaps: ["https://yourdomain.com/sitemap_index.xml"],
    crawlDelay: "",
  },
  {
    name: "Next.js App",
    badge: "Framework",
    defaultPolicy: "allow",
    disallowedPaths: ["/api/", "/_next/"],
    allowedPaths: [],
    aiBots: [],
    sitemaps: ["https://yourdomain.com/sitemap.xml"],
    crawlDelay: "",
  },
  {
    name: "Shopify E-Commerce",
    badge: "E-Commerce",
    defaultPolicy: "allow",
    disallowedPaths: ["/cart", "/checkout", "/account", "/search", "/*?sort_by=*"],
    allowedPaths: [],
    aiBots: [],
    sitemaps: ["https://yourdomain.com/sitemap.xml"],
    crawlDelay: "",
  },
  {
    name: "Block AI Scrapers",
    badge: "Privacy Focus",
    defaultPolicy: "allow",
    disallowedPaths: ["/admin/", "/api/"],
    allowedPaths: [],
    aiBots: ALL_AI_BOTS.map((b) => b.id),
    sitemaps: ["https://yourdomain.com/sitemap.xml"],
    crawlDelay: "",
  },
];

type ExportTab = "raw" | "nextjs";

export function RobotsGeneratorClient() {
  const [activePreset, setActivePreset] = useState<string>("Default Open");
  const [defaultPolicy, setDefaultPolicy] = useState<"allow" | "disallow">("allow");
  const [disallowedPaths, setDisallowedPaths] = useState<string[]>([
    "/admin/",
    "/api/",
    "/login/",
  ]);
  const [allowedPaths, setAllowedPaths] = useState<string[]>([]);
  const [newDisallow, setNewDisallow] = useState("");
  const [newAllow, setNewAllow] = useState("");

  const [sitemaps, setSitemaps] = useState<string[]>([
    "https://yourdomain.com/sitemap.xml",
  ]);
  const [newSitemap, setNewSitemap] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("");

  // AI Bots selected to block
  const [blockedAiBots, setBlockedAiBots] = useState<string[]>([]);

  // Export Tab and Copy Feedback
  const [exportTab, setExportTab] = useState<ExportTab>("raw");
  const [copied, setCopied] = useState(false);

  // Path Tester
  const [testPath, setTestPath] = useState("/about");

  const handleAddDisallow = () => {
    if (!newDisallow.trim()) return;
    const formatted = newDisallow.trim().startsWith("/")
      ? newDisallow.trim()
      : `/${newDisallow.trim()}`;
    if (!disallowedPaths.includes(formatted)) {
      setDisallowedPaths([...disallowedPaths, formatted]);
    }
    setNewDisallow("");
  };

  const handleRemoveDisallow = (path: string) => {
    setDisallowedPaths(disallowedPaths.filter((p) => p !== path));
  };

  const handleAddAllow = () => {
    if (!newAllow.trim()) return;
    const formatted = newAllow.trim().startsWith("/")
      ? newAllow.trim()
      : `/${newAllow.trim()}`;
    if (!allowedPaths.includes(formatted)) {
      setAllowedPaths([...allowedPaths, formatted]);
    }
    setNewAllow("");
  };

  const handleRemoveAllow = (path: string) => {
    setAllowedPaths(allowedPaths.filter((p) => p !== path));
  };

  const handleAddSitemap = () => {
    if (!newSitemap.trim()) return;
    const clean = newSitemap.trim();
    if (!sitemaps.includes(clean)) {
      setSitemaps([...sitemaps, clean]);
    }
    setNewSitemap("");
  };

  const handleRemoveSitemap = (url: string) => {
    setSitemaps(sitemaps.filter((s) => s !== url));
  };

  const toggleAiBot = (botId: string) => {
    if (blockedAiBots.includes(botId)) {
      setBlockedAiBots(blockedAiBots.filter((id) => id !== botId));
    } else {
      setBlockedAiBots([...blockedAiBots, botId]);
    }
  };

  const toggleAllAiBots = () => {
    if (blockedAiBots.length === ALL_AI_BOTS.length) {
      setBlockedAiBots([]);
    } else {
      setBlockedAiBots(ALL_AI_BOTS.map((b) => b.id));
    }
  };

  const handleApplyPreset = (preset: Preset) => {
    setActivePreset(preset.name);
    setDefaultPolicy(preset.defaultPolicy);
    setDisallowedPaths([...preset.disallowedPaths]);
    setAllowedPaths([...preset.allowedPaths]);
    setBlockedAiBots([...preset.aiBots]);
    setSitemaps([...preset.sitemaps]);
    setCrawlDelay(preset.crawlDelay);
  };

  const handleReset = () => {
    setActivePreset("Default Open");
    setDefaultPolicy("allow");
    setDisallowedPaths(["/admin/", "/api/"]);
    setAllowedPaths([]);
    setBlockedAiBots([]);
    setSitemaps(["https://yourdomain.com/sitemap.xml"]);
    setCrawlDelay("");
  };

  // Generate Raw Robots.txt
  const rawRobotsTxt = useMemo(() => {
    const lines: string[] = [];

    // Section 1: Default crawler block
    lines.push("# Group 1: General Web Crawlers");
    lines.push("User-agent: *");

    if (defaultPolicy === "disallow" && disallowedPaths.length === 0) {
      lines.push("Disallow: /");
    } else {
      if (allowedPaths.length > 0) {
        allowedPaths.forEach((path) => lines.push(`Allow: ${path}`));
      }
      if (disallowedPaths.length > 0) {
        disallowedPaths.forEach((path) => lines.push(`Disallow: ${path}`));
      } else if (allowedPaths.length === 0) {
        lines.push("Allow: /");
      }
    }

    if (crawlDelay.trim()) {
      lines.push(`Crawl-delay: ${crawlDelay.trim()}`);
    }

    // Section 2: AI Bot Block rules
    if (blockedAiBots.length > 0) {
      lines.push("");
      lines.push("# Group 2: Generative AI & Training Scrapers (Blocked)");
      blockedAiBots.forEach((bot) => {
        lines.push(`User-agent: ${bot}`);
        lines.push("Disallow: /");
      });
    }

    // Section 3: Sitemaps
    if (sitemaps.length > 0) {
      lines.push("");
      lines.push("# Sitemaps");
      sitemaps.forEach((s) => {
        if (s.trim()) lines.push(`Sitemap: ${s.trim()}`);
      });
    }

    return lines.join("\n");
  }, [defaultPolicy, allowedPaths, disallowedPaths, crawlDelay, blockedAiBots, sitemaps]);

  // Generate Next.js TypeScript (src/app/robots.ts)
  const nextJsRobotsTs = useMemo(() => {
    const disallowArr =
      defaultPolicy === "disallow" && disallowedPaths.length === 0
        ? ['"/"']
        : disallowedPaths.map((p) => `"${p}"`);

    const allowArr = allowedPaths.map((p) => `"${p}"`);
    const sitemapArr = sitemaps.map((s) => `"${s}"`);

    let aiRules = "";
    if (blockedAiBots.length > 0) {
      const botsJson = JSON.stringify(blockedAiBots);
      aiRules = `,
      {
        userAgent: ${botsJson},
        disallow: ["/"],
      }`;
    }

    let crawlDelayCode = "";
    if (crawlDelay.trim()) {
      crawlDelayCode = `,
        crawlDelay: ${crawlDelay.trim()}`;
    }

    return `import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [${allowArr.join(", ")}],
        disallow: [${disallowArr.join(", ")}]${crawlDelayCode}
      }${aiRules}
    ],
    sitemap: [${sitemapArr.join(", ")}],
  };
}`;
  }, [defaultPolicy, disallowedPaths, allowedPaths, crawlDelay, blockedAiBots, sitemaps]);

  const activeExportContent = exportTab === "raw" ? rawRobotsTxt : nextJsRobotsTs;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeExportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawRobotsTxt], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "robots.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Path test evaluator
  const testResult = useMemo(() => {
    const normalized = testPath.trim().startsWith("/")
      ? testPath.trim()
      : `/${testPath.trim()}`;

    if (defaultPolicy === "disallow" && disallowedPaths.length === 0) {
      return { allowed: false, reason: "Default policy is set to Disallow All (/)" };
    }

    // Check specific allow
    const isAllowed = allowedPaths.some((p) => normalized.startsWith(p));
    if (isAllowed) {
      return { allowed: true, reason: "Explicitly permitted in Allow directives" };
    }

    // Check disallow
    const isDisallowed = disallowedPaths.some((p) => normalized.startsWith(p));
    if (isDisallowed) {
      return { allowed: false, reason: "Blocked by matching Disallow rule" };
    }

    return { allowed: true, reason: "Allowed by default (no blocking rule matched)" };
  }, [testPath, defaultPolicy, disallowedPaths, allowedPaths]);

  return (
    <div className="space-y-8">
      {/* 1. CMS & PLATFORM PRESET STRIP */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>1-Click Platform Presets</span>
          </label>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Rules</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRESETS.map((preset) => {
            const isSelected = activePreset === preset.name;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={cn(
                  "flex flex-col items-start gap-1 p-3.5 rounded-2xl border text-left transition-all cursor-pointer group",
                  isSelected
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm ring-1 ring-blue-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {preset.disallowedPaths.length > 0
                    ? `Disallow: ${preset.disallowedPaths[0]}`
                    : "Allow all paths"}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Rules (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Default User-Agent Policy & Paths */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Standard Web Crawlers (User-agent: *)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Google, Bing, Search Bots
              </span>
            </div>

            {/* Disallow Paths */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Disallow Directories or Paths</span>
                <span className="text-[10px] text-slate-400">e.g. /admin/, /api/, /cart</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDisallow}
                  onChange={(e) => setNewDisallow(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddDisallow()}
                  placeholder="/private-path/"
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddDisallow}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Tag List */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {disallowedPaths.map((path) => (
                  <span
                    key={path}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40 text-xs font-mono"
                  >
                    <span>Disallow: {path}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDisallow(path)}
                      className="text-rose-400 hover:text-rose-700 dark:hover:text-rose-200 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Allow Paths */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Explicit Allow Exceptions (Overrides Disallow)</span>
                <span className="text-[10px] text-slate-400">e.g. /wp-admin/admin-ajax.php</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAllow}
                  onChange={(e) => setNewAllow(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddAllow()}
                  placeholder="/admin/public-asset.js"
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddAllow}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {allowedPaths.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {allowedPaths.map((path) => (
                    <span
                      key={path}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40 text-xs font-mono"
                    >
                      <span>Allow: {path}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAllow(path)}
                        className="text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-200 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Crawl Delay */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <label htmlFor="crawl-delay" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Crawl-Delay (Seconds, Bing/Yandex)
              </label>
              <input
                id="crawl-delay"
                type="number"
                min="0"
                max="60"
                value={crawlDelay}
                onChange={(e) => setCrawlDelay(e.target.value)}
                placeholder="None"
                className="w-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs font-mono text-center focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* AI Scraper & LLM Crawler Blocker Card */}
          <div className="rounded-3xl border border-purple-500/30 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Block Generative AI Scrapers
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAllAiBots}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
              >
                {blockedAiBots.length === ALL_AI_BOTS.length
                  ? "Unblock All"
                  : "Block All AI Bots"}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Block automated LLM training bots from scraping your copyright content without affecting your organic Google or Bing search rankings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALL_AI_BOTS.map((bot) => {
                const isBlocked = blockedAiBots.includes(bot.id);
                return (
                  <button
                    key={bot.id}
                    type="button"
                    onClick={() => toggleAiBot(bot.id)}
                    className={cn(
                      "flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer group",
                      isBlocked
                        ? "border-purple-500 bg-purple-50/60 dark:bg-purple-950/40 text-purple-900 dark:text-purple-100 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-300 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                        isBlocked
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      )}
                    >
                      {isBlocked && <Check className="h-3 w-3" />}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold block">{bot.name}</span>
                      <span className="text-[10px] text-slate-400 block leading-tight">
                        {bot.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* XML Sitemaps Directive Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  XML Sitemap Directives
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Sitemap: https://...
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                value={newSitemap}
                onChange={(e) => setNewSitemap(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSitemap()}
                placeholder="https://yourdomain.com/sitemap.xml"
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={handleAddSitemap}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {sitemaps.map((sm) => (
                <div
                  key={sm}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  <span className="truncate max-w-[320px]">{sm}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSitemap(sm)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output Preview, Live Path Tester, & Exports (6 cols) */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
          {/* Main Output Box with Tabs */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Generated Output
                </span>
              </div>

              {/* Format Tabs */}
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setExportTab("raw")}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    exportTab === "raw"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  robots.txt (Raw)
                </button>
                <button
                  type="button"
                  onClick={() => setExportTab("nextjs")}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    exportTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js (robots.ts)
                </button>
              </div>
            </div>

            {/* Code Output Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 shadow-inner overflow-x-auto max-h-[380px]">
              <pre className="leading-relaxed whitespace-pre font-mono">
                {activeExportContent}
              </pre>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer",
                  copied
                    ? "bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy {exportTab === "raw" ? "robots.txt" : "robots.ts"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download robots.txt</span>
              </button>
            </div>
          </div>

          {/* Live Path Simulator Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Path Validator
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Rule Check Simulator
              </span>
            </div>

            <div className="space-y-2">
              <label htmlFor="test-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Test Target Path:
              </label>
              <input
                id="test-url"
                type="text"
                value={testPath}
                onChange={(e) => setTestPath(e.target.value)}
                placeholder="/admin/settings"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Test Result Indicator */}
            <div
              className={cn(
                "flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-xs",
                testResult.allowed
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300"
                  : "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300"
              )}
            >
              {testResult.allowed ? (
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
              )}
              <div className="space-y-0.5">
                <span className="font-bold block">
                  {testResult.allowed ? "CRAWL PERMITTED (Allowed)" : "CRAWL BLOCKED (Disallowed)"}
                </span>
                <span className="text-[11px] opacity-90 block">
                  {testResult.reason}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
