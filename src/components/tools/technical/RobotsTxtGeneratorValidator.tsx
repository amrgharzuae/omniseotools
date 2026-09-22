"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  SlidersHorizontal,
  ShieldCheck,
  Bot,
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Share2,
  FileCode,
  Globe,
  Layers,
  ArrowRight,
  ShieldAlert,
  Search,
  ExternalLink,
  Code2,
  Clock,
  HelpCircle,
  Zap,
} from "lucide-react";
import {
  parseRobotsTxt,
  validateRobotsTxt,
  generateRobotsTxt,
  type RobotsConfig,
  type RobotsRule,
  type RobotsValidationResult,
} from "omniseo-core";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface RobotsTxtGeneratorValidatorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

const COMMON_BOTS = [
  { name: "* (All Robots)", value: "*" },
  { name: "Googlebot", value: "Googlebot" },
  { name: "Googlebot-Image", value: "Googlebot-Image" },
  { name: "Bingbot", value: "Bingbot" },
  { name: "GPTBot (OpenAI)", value: "GPTBot" },
  { name: "ChatGPT-User", value: "ChatGPT-User" },
  { name: "ClaudeBot (Anthropic)", value: "ClaudeBot" },
  { name: "PerplexityBot", value: "PerplexityBot" },
  { name: "Applebot-Extended", value: "Applebot-Extended" },
  { name: "Google-Extended", value: "Google-Extended" },
  { name: "AhrefsBot", value: "AhrefsBot" },
  { name: "SemrushBot", value: "SemrushBot" },
  { name: "Bytespider (TikTok)", value: "Bytespider" },
  { name: "YandexBot", value: "YandexBot" },
  { name: "DuckDuckBot", value: "DuckDuckBot" },
  { name: "Baiduspider", value: "Baiduspider" },
];

const DISALLOW_SUGGESTIONS = [
  "/admin/",
  "/private/",
  "/api/",
  "/tmp/",
  "/checkout/",
  "/cart/",
  "/login/",
  "/search/",
  "/wp-admin/",
  "/*.pdf$",
];

const ALLOW_SUGGESTIONS = [
  "/",
  "/public/",
  "/assets/",
  "/images/",
  "/api/public/",
  "/wp-admin/admin-ajax.php",
];

const DEFAULT_CONFIG: RobotsConfig = {
  rules: [
    {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin/", "/private/", "/api/"],
      crawlDelay: undefined,
    },
  ],
  sitemaps: ["https://yourdomain.com/sitemap.xml"],
  host: "https://yourdomain.com",
};

const SAMPLE_RAW_VALID = `# Standard Production robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

Host: https://yourdomain.com
Sitemap: https://yourdomain.com/sitemap.xml
Sitemap: https://yourdomain.com/sitemap-blog.xml`;

const SAMPLE_RAW_ERRORS = `# Sample with syntax errors and warnings
Disallow: /unclaimed-path/
User-agent *
Allow: public/assets
Disallow: /private/ secret/
Crawl-delay: -5
Sitemap: not-a-valid-url
Sitemap: ftp://invalid-protocol.com/sitemap.xml
Host:`;

export function RobotsTxtGeneratorValidator({
  toolSlug = "robots-txt-generator-validator",
  toolName = "Robots.txt Generator & Validator",
}: RobotsTxtGeneratorValidatorProps) {
  // Mode state: 'builder' (Mode A) or 'validator' (Mode B)
  const [activeMode, setActiveMode] = useState<"builder" | "validator">("builder");

  // Mode A: Visual Builder State
  const [config, setConfig] = useState<RobotsConfig>(DEFAULT_CONFIG);
  const [newSitemapInput, setNewSitemapInput] = useState("");
  const [customHostInput, setCustomHostInput] = useState(DEFAULT_CONFIG.host || "");

  // Mode B: Validator State
  const [rawInput, setRawInput] = useState<string>(SAMPLE_RAW_VALID);

  // Path Tester state
  const [testPath, setTestPath] = useState("/admin/dashboard");
  const [testUserAgent, setTestUserAgent] = useState("*");

  // Copy feedback state
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  // Synchronize generated robots.txt output
  const generatedCode = useMemo(() => {
    if (activeMode === "builder") {
      return generateRobotsTxt(config);
    }
    return rawInput;
  }, [activeMode, config, rawInput]);

  // Live validation result for Mode B
  const validationResult: RobotsValidationResult = useMemo(() => {
    return validateRobotsTxt(rawInput);
  }, [rawInput]);

  // Handle permalink hydration from URL hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#s=")) {
        const rawPayload = decodeURIComponent(atob(hash.slice(3)));
        const parsed = JSON.parse(rawPayload);
        if (parsed.mode) setActiveMode(parsed.mode);
        if (parsed.raw) setRawInput(parsed.raw);
        if (parsed.config) {
          setConfig(parsed.config);
          setCustomHostInput(parsed.config.host || "");
        }
      }
    } catch {
      // Ignore hash parse errors
    }
  }, []);

  // Update hash for permalink sharing
  const handleSharePermalink = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = {
        mode: activeMode,
        raw: activeMode === "validator" ? rawInput : generatedCode,
        config: config,
      };
      const serialized = btoa(encodeURIComponent(JSON.stringify(payload)));
      window.history.replaceState(null, "", `#s=${serialized}`);
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    } catch {
      // Fallback
    }
  }, [activeMode, rawInput, generatedCode, config]);

  // Copy code to clipboard
  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedCode]);

  // Download robots.txt file
  const handleDownloadFile = useCallback(() => {
    const blob = new Blob([generatedCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "robots.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [generatedCode]);

  // Visual Builder Handlers
  const handleAddRuleBlock = () => {
    setConfig((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        {
          userAgent: "",
          allow: [],
          disallow: ["/admin/"],
          crawlDelay: undefined,
        },
      ],
    }));
  };

  const handleRemoveRuleBlock = (index: number) => {
    if (config.rules.length <= 1) {
      // Reset single rule instead of deleting all
      setConfig((prev) => ({
        ...prev,
        rules: [{ userAgent: "*", allow: ["/"], disallow: [] }],
      }));
      return;
    }
    setConfig((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateRuleUserAgent = (index: number, ua: string) => {
    setConfig((prev) => {
      const newRules = [...prev.rules];
      newRules[index] = { ...newRules[index], userAgent: ua };
      return { ...prev, rules: newRules };
    });
  };

  const handleUpdateRuleCrawlDelay = (index: number, val: string) => {
    const parsed = val.trim() === "" ? undefined : parseFloat(val);
    setConfig((prev) => {
      const newRules = [...prev.rules];
      newRules[index] = {
        ...newRules[index],
        crawlDelay: parsed !== undefined && !isNaN(parsed) && parsed >= 0 ? parsed : undefined,
      };
      return { ...prev, rules: newRules };
    });
  };

  const handleAddDisallowPath = (ruleIndex: number, path: string) => {
    const clean = path.trim();
    if (!clean) return;
    setConfig((prev) => {
      const newRules = [...prev.rules];
      const current = newRules[ruleIndex].disallow || [];
      if (!current.includes(clean)) {
        newRules[ruleIndex] = {
          ...newRules[ruleIndex],
          disallow: [...current, clean],
        };
      }
      return { ...prev, rules: newRules };
    });
  };

  const handleRemoveDisallowPath = (ruleIndex: number, pathIndex: number) => {
    setConfig((prev) => {
      const newRules = [...prev.rules];
      newRules[ruleIndex] = {
        ...newRules[ruleIndex],
        disallow: newRules[ruleIndex].disallow.filter((_, i) => i !== pathIndex),
      };
      return { ...prev, rules: newRules };
    });
  };

  const handleAddAllowPath = (ruleIndex: number, path: string) => {
    const clean = path.trim();
    if (!clean) return;
    setConfig((prev) => {
      const newRules = [...prev.rules];
      const current = newRules[ruleIndex].allow || [];
      if (!current.includes(clean)) {
        newRules[ruleIndex] = {
          ...newRules[ruleIndex],
          allow: [...current, clean],
        };
      }
      return { ...prev, rules: newRules };
    });
  };

  const handleRemoveAllowPath = (ruleIndex: number, pathIndex: number) => {
    setConfig((prev) => {
      const newRules = [...prev.rules];
      newRules[ruleIndex] = {
        ...newRules[ruleIndex],
        allow: newRules[ruleIndex].allow.filter((_, i) => i !== pathIndex),
      };
      return { ...prev, rules: newRules };
    });
  };

  const handleAddSitemap = () => {
    const clean = newSitemapInput.trim();
    if (!clean) return;
    setConfig((prev) => {
      if (!prev.sitemaps.includes(clean)) {
        return { ...prev, sitemaps: [...prev.sitemaps, clean] };
      }
      return prev;
    });
    setNewSitemapInput("");
  };

  const handleRemoveSitemap = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      sitemaps: prev.sitemaps.filter((_, i) => i !== index),
    }));
  };

  const handleHostChange = (val: string) => {
    setCustomHostInput(val);
    const clean = val.trim();
    setConfig((prev) => ({
      ...prev,
      host: clean || undefined,
    }));
  };

  // Quick Preset Handlers
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case "allow-all":
        setConfig({
          rules: [{ userAgent: "*", allow: ["/"], disallow: [] }],
          sitemaps: config.sitemaps.length > 0 ? config.sitemaps : ["https://yourdomain.com/sitemap.xml"],
          host: config.host,
        });
        break;
      case "disallow-all":
        setConfig({
          rules: [{ userAgent: "*", allow: [], disallow: ["/"] }],
          sitemaps: [],
          host: config.host,
        });
        break;
      case "block-bad-bots":
        setConfig({
          rules: [
            {
              userAgent: "*",
              allow: ["/"],
              disallow: ["/admin/", "/private/", "/api/"],
            },
            {
              userAgent: "AhrefsBot",
              allow: [],
              disallow: ["/"],
            },
            {
              userAgent: "SemrushBot",
              allow: [],
              disallow: ["/"],
            },
            {
              userAgent: "DotBot",
              allow: [],
              disallow: ["/"],
            },
            {
              userAgent: "MJ12bot",
              allow: [],
              disallow: ["/"],
            },
            {
              userAgent: "PetalBot",
              allow: [],
              disallow: ["/"],
            },
            {
              userAgent: "Bytespider",
              allow: [],
              disallow: ["/"],
            },
          ],
          sitemaps: config.sitemaps.length > 0 ? config.sitemaps : ["https://yourdomain.com/sitemap.xml"],
          host: config.host,
        });
        break;
      case "allow-googlebot-only":
        setConfig({
          rules: [
            {
              userAgent: "Googlebot",
              allow: ["/"],
              disallow: ["/admin/", "/private/"],
            },
            {
              userAgent: "*",
              allow: [],
              disallow: ["/"],
            },
          ],
          sitemaps: config.sitemaps.length > 0 ? config.sitemaps : ["https://yourdomain.com/sitemap.xml"],
          host: config.host,
        });
        break;
      case "standard-web":
        setConfig(DEFAULT_CONFIG);
        setCustomHostInput(DEFAULT_CONFIG.host || "");
        break;
      case "block-ai":
        setConfig({
          rules: [
            {
              userAgent: "*",
              allow: ["/"],
              disallow: ["/admin/", "/private/"],
            },
            { userAgent: "GPTBot", allow: [], disallow: ["/"] },
            { userAgent: "ChatGPT-User", allow: [], disallow: ["/"] },
            { userAgent: "ClaudeBot", allow: [], disallow: ["/"] },
            { userAgent: "Claude-Web", allow: [], disallow: ["/"] },
            { userAgent: "PerplexityBot", allow: [], disallow: ["/"] },
            { userAgent: "Google-Extended", allow: [], disallow: ["/"] },
            { userAgent: "Applebot-Extended", allow: [], disallow: ["/"] },
            { userAgent: "CCBot", allow: [], disallow: ["/"] },
          ],
          sitemaps: config.sitemaps.length > 0 ? config.sitemaps : ["https://yourdomain.com/sitemap.xml"],
          host: config.host,
        });
        break;
    }
  };

  // Import parsed raw into visual builder
  const handleImportParsedToBuilder = () => {
    const parsed = parseRobotsTxt(rawInput);
    if (parsed.rules.length === 0) {
      parsed.rules.push({ userAgent: "*", allow: ["/"], disallow: [] });
    }
    setConfig(parsed);
    setCustomHostInput(parsed.host || "");
    setActiveMode("builder");
  };

  // Path tester logic
  const pathTestResult = useMemo(() => {
    const activeRules = activeMode === "builder" ? config.rules : validationResult.parsed.rules;
    const cleanPath = testPath.trim() || "/";
    const targetAgent = testUserAgent.trim().toLowerCase();

    // Find rules matching specific agent or fallback to '*'
    let matchedRule = activeRules.find((r) => r.userAgent.toLowerCase() === targetAgent);
    if (!matchedRule && targetAgent !== "*") {
      matchedRule = activeRules.find((r) => r.userAgent === "*");
    }

    if (!matchedRule) {
      return {
        allowed: true,
        reason: "No matching User-agent rule block found. Defaults to ALLOW.",
        matchedRule: null,
      };
    }

    // Check allow vs disallow matching (Longest prefix match / RFC standard)
    const matchedAllow = (matchedRule.allow || []).filter((p) => cleanPath.startsWith(p));
    const matchedDisallow = (matchedRule.disallow || []).filter((p) => cleanPath.startsWith(p));

    const longestAllow = matchedAllow.sort((a, b) => b.length - a.length)[0] || "";
    const longestDisallow = matchedDisallow.sort((a, b) => b.length - a.length)[0] || "";

    if (longestDisallow.length > longestAllow.length) {
      return {
        allowed: false,
        reason: `Blocked by directive "Disallow: ${longestDisallow}" in User-agent: ${matchedRule.userAgent}`,
        matchedRule: `Disallow: ${longestDisallow}`,
      };
    }

    if (longestAllow.length >= longestDisallow.length && longestAllow.length > 0) {
      return {
        allowed: true,
        reason: `Explicitly permitted by directive "Allow: ${longestAllow}" in User-agent: ${matchedRule.userAgent}`,
        matchedRule: `Allow: ${longestAllow}`,
      };
    }

    return {
      allowed: true,
      reason: `No disallow directives match this path for User-agent: ${matchedRule.userAgent}. Allowed by default.`,
      matchedRule: null,
    };
  }, [activeMode, config.rules, validationResult.parsed.rules, testPath, testUserAgent]);

  // Code statistics
  const codeStats = useMemo(() => {
    const lines = generatedCode.split("\n").filter((l) => l.trim().length > 0);
    const bytes = new TextEncoder().encode(generatedCode).length;
    const rulesCount = (generatedCode.match(/User-agent:/gi) || []).length;
    const disallowCount = (generatedCode.match(/Disallow:/gi) || []).length;
    const sitemapsCount = (generatedCode.match(/Sitemap:/gi) || []).length;
    return { linesCount: lines.length, bytes, rulesCount, disallowCount, sitemapsCount };
  }, [generatedCode]);

  return (
    <div className="space-y-8">
      {/* Top Header & Interactive Mode Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 sm:p-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Dual Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => setActiveMode("builder")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all",
                activeMode === "builder"
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Mode A: Visual Builder</span>
            </button>
            <button
              onClick={() => setActiveMode("validator")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all",
                activeMode === "validator"
                  ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Mode B: Syntax Validator &amp; Tester</span>
            </button>
          </div>

          {/* Quick Actions (Share & Embed) */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleSharePermalink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="Copy shareable link with current configuration"
            >
              {shareFeedback ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>Share Preview</span>
                </>
              )}
            </button>

            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="Robots.txt Engine"
              status="RFC 9309 Valid"
            />
          </div>
        </div>

        {/* Mode A: Preset Selector Pills */}
        {activeMode === "builder" && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
              Presets:
            </span>
            <button
              onClick={() => applyPreset("standard-web")}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Standard Web
            </button>
            <button
              onClick={() => applyPreset("allow-all")}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Allow All
            </button>
            <button
              onClick={() => applyPreset("disallow-all")}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Disallow All (Staging Lock)
            </button>
            <button
              onClick={() => applyPreset("block-bad-bots")}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Block Bad Bots (Ahrefs, Semrush)
            </button>
            <button
              onClick={() => applyPreset("allow-googlebot-only")}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Allow Googlebot Only
            </button>
            <button
              onClick={() => applyPreset("block-ai")}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/40 dark:hover:text-purple-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Block AI Scrapers (GPTBot, ClaudeBot)
            </button>
          </div>
        )}
      </div>

      {/* Main Two-Column Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Controls / Raw Validator Input */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* ============================================================ */}
          {/* MODE A: VISUAL BUILDER CONTROLS                             */}
          {/* ============================================================ */}
          {activeMode === "builder" && (
            <div className="space-y-6">
              
              {/* User-Agent Rule Blocks */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bot className="h-5 w-5 text-emerald-500" />
                    <span>User-Agent Rule Blocks ({config.rules.length})</span>
                  </h3>
                  <button
                    onClick={handleAddRuleBlock}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Rule Block</span>
                  </button>
                </div>

                {config.rules.map((rule, ruleIdx) => (
                  <RuleBlockEditor
                    key={ruleIdx}
                    ruleIndex={ruleIdx}
                    rule={rule}
                    totalRules={config.rules.length}
                    onUpdateUserAgent={(ua) => handleUpdateRuleUserAgent(ruleIdx, ua)}
                    onUpdateCrawlDelay={(delay) => handleUpdateRuleCrawlDelay(ruleIdx, delay)}
                    onAddDisallow={(path) => handleAddDisallowPath(ruleIdx, path)}
                    onRemoveDisallow={(pathIdx) => handleRemoveDisallowPath(ruleIdx, pathIdx)}
                    onAddAllow={(path) => handleAddAllowPath(ruleIdx, path)}
                    onRemoveAllow={(pathIdx) => handleRemoveAllowPath(ruleIdx, pathIdx)}
                    onRemoveBlock={() => handleRemoveRuleBlock(ruleIdx)}
                  />
                ))}
              </div>

              {/* Sitemaps & Host Directives */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="h-4 w-4 text-indigo-500" />
                  <span>Sitemaps &amp; Host Directives</span>
                </h3>

                {/* Sitemap URLs list */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    XML Sitemap Directives ({config.sitemaps.length})
                  </label>
                  
                  {config.sitemaps.map((sitemapUrl, smIdx) => (
                    <div
                      key={smIdx}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200"
                    >
                      <span className="truncate">{sitemapUrl}</span>
                      <button
                        onClick={() => handleRemoveSitemap(smIdx)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                        title="Remove sitemap"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add Sitemap input */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newSitemapInput}
                      onChange={(e) => setNewSitemapInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSitemap();
                        }
                      }}
                      placeholder="https://yourdomain.com/sitemap.xml"
                      className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAddSitemap}
                      className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 transition-colors"
                    >
                      Add Sitemap
                    </button>
                  </div>
                </div>

                {/* Host Directive input */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Host Directive (Optional)
                    </label>
                    <span className="text-[10px] text-slate-400">Yandex / Legacy REP</span>
                  </div>
                  <input
                    type="text"
                    value={customHostInput}
                    onChange={(e) => handleHostChange(e.target.value)}
                    placeholder="https://yourdomain.com"
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* MODE B: RAW VALIDATOR & LIVE LINTER                          */}
          {/* ============================================================ */}
          {activeMode === "validator" && (
            <div className="space-y-6">
              
              {/* Raw Textarea Editor */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-emerald-500" />
                    <span>Raw Robots.txt Content</span>
                  </h3>
                  
                  {/* Sample Loaders */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      onClick={() => setRawInput(SAMPLE_RAW_VALID)}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] transition-colors"
                    >
                      Sample Valid
                    </button>
                    <button
                      onClick={() => setRawInput(SAMPLE_RAW_ERRORS)}
                      className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 text-[11px] transition-colors"
                    >
                      Sample Errors
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={13}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="Paste raw robots.txt directives here..."
                    className="w-full p-4 font-mono text-xs sm:text-sm leading-relaxed rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-950 text-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    spellCheck={false}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500">
                    Live linted with <code className="font-bold text-emerald-600 dark:text-emerald-400">omniseo-core</code>
                  </span>

                  <button
                    onClick={handleImportParsedToBuilder}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                  >
                    <span>Import into Visual Builder</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Live Syntax Feedback Panel */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
                
                {/* Overall Status Badge */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Live Syntax Diagnostic
                  </h3>

                  {validationResult.isValid && validationResult.issues.length === 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      Syntax 100% Valid
                    </span>
                  ) : validationResult.isValid && validationResult.issues.length > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 border border-amber-500/40 text-amber-700 dark:text-amber-300">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      {validationResult.issues.length} Warning(s)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 border border-rose-500/40 text-rose-700 dark:text-rose-300">
                      <XCircle className="h-3.5 w-3.5 text-rose-500" />
                      {validationResult.issues.filter((i) => i.type === "error").length} Error(s) Detected
                    </span>
                  )}
                </div>

                {/* Issues List with Line Numbers and Actionable Suggestions */}
                {validationResult.issues.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Zero syntax errors or compliance warnings found.</p>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                        Detected {validationResult.parsed.rules.length} rule block(s) and {validationResult.parsed.sitemaps.length} sitemap(s). Standard REP compliant.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {validationResult.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "p-3 rounded-xl border text-xs flex items-start gap-3",
                          issue.type === "error"
                            ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                            : "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200"
                        )}
                      >
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded font-mono font-bold text-[10px] shrink-0",
                            issue.type === "error"
                              ? "bg-rose-200 dark:bg-rose-900/70 text-rose-800 dark:text-rose-200"
                              : "bg-amber-200 dark:bg-amber-900/70 text-amber-800 dark:text-amber-200"
                          )}
                        >
                          Line {issue.line}
                        </span>

                        <div className="space-y-1">
                          <p className="font-medium">{issue.message}</p>
                          <p className="text-[11px] opacity-80">
                            <strong>Fix suggestion:</strong>{" "}
                            {issue.message.includes("missing \":\"")
                              ? "Add a colon separator between directive and value (e.g. User-agent: *)."
                              : issue.message.includes("before any User-agent")
                              ? "Place a 'User-agent: *' declaration before specifying Allow or Disallow paths."
                              : issue.message.includes("leading slash")
                              ? "Prefix path with '/' or wildcard '*' (e.g. /public/assets)."
                              : issue.message.includes("Sitemap")
                              ? "Ensure Sitemap URL starts with 'http://' or 'https://' and is fully qualified."
                              : issue.message.includes("Crawl-delay")
                              ? "Set Crawl-delay to a positive numeric integer or decimal."
                              : "Review RFC 9309 directive formatting."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* INTERACTIVE URL PATH SIMULATOR                               */}
          {/* ============================================================ */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="h-4 w-4 text-emerald-500" />
                <span>Live URL Path Access Tester</span>
              </h3>
              <span className="text-[11px] text-slate-400">0ms Real-Time Simulation</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test whether a specific search engine bot or scraper is permitted to crawl a given URL path under your active configuration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  User-Agent
                </label>
                <input
                  type="text"
                  value={testUserAgent}
                  onChange={(e) => setTestUserAgent(e.target.value)}
                  placeholder="*"
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-8">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Test Path
                </label>
                <input
                  type="text"
                  value={testPath}
                  onChange={(e) => setTestPath(e.target.value)}
                  placeholder="/admin/settings or /public/logo.png"
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Path Test Result Box */}
            <div
              className={cn(
                "p-4 rounded-xl border flex items-start gap-3 transition-colors",
                pathTestResult.allowed
                  ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50"
                  : "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/50"
              )}
            >
              {pathTestResult.allowed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-extrabold rounded uppercase tracking-wider",
                      pathTestResult.allowed
                        ? "bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300"
                        : "bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300"
                    )}
                  >
                    {pathTestResult.allowed ? "ALLOWED (Crawlable)" : "BLOCKED (Disallowed)"}
                  </span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate">
                    {testPath}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {pathTestResult.reason}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Sticky Code Output & Preview Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-xl overflow-hidden text-left font-mono">
            
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs text-slate-400 ml-2 font-semibold">robots.txt</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>{codeStats.linesCount} lines</span>
                <span>•</span>
                <span>{codeStats.bytes} B</span>
              </div>
            </div>

            {/* Syntax Highlighted Code Viewer */}
            <div className="p-4 sm:p-5 overflow-x-auto text-xs leading-relaxed max-h-[480px] select-text">
              <pre className="text-slate-300">
                <code>
                  {generatedCode.split("\n").map((line, lIdx) => {
                    const trimmed = line.trim();
                    const isComment = trimmed.startsWith("#");
                    const isUserAgent = trimmed.toLowerCase().startsWith("user-agent:");
                    const isDisallow = trimmed.toLowerCase().startsWith("disallow:");
                    const isAllow = trimmed.toLowerCase().startsWith("allow:");
                    const isSitemap = trimmed.toLowerCase().startsWith("sitemap:");
                    const isHost = trimmed.toLowerCase().startsWith("host:");
                    const isCrawlDelay = trimmed.toLowerCase().startsWith("crawl-delay:");

                    return (
                      <div key={lIdx} className="table-row">
                        <span className="table-cell pr-4 select-none text-slate-600 text-right w-6">
                          {lIdx + 1}
                        </span>
                        <span className="table-cell">
                          {isComment ? (
                            <span className="text-slate-500 italic">{line}</span>
                          ) : isUserAgent ? (
                            <>
                              <span className="text-cyan-400 font-bold">User-agent:</span>
                              <span className="text-amber-300 font-semibold">{line.slice(11)}</span>
                            </>
                          ) : isDisallow ? (
                            <>
                              <span className="text-rose-400 font-bold">Disallow:</span>
                              <span className="text-rose-200">{line.slice(9)}</span>
                            </>
                          ) : isAllow ? (
                            <>
                              <span className="text-emerald-400 font-bold">Allow:</span>
                              <span className="text-emerald-200">{line.slice(6)}</span>
                            </>
                          ) : isSitemap ? (
                            <>
                              <span className="text-indigo-400 font-bold">Sitemap:</span>
                              <span className="text-sky-300 underline">{line.slice(8)}</span>
                            </>
                          ) : isHost ? (
                            <>
                              <span className="text-purple-400 font-bold">Host:</span>
                              <span className="text-purple-200">{line.slice(5)}</span>
                            </>
                          ) : isCrawlDelay ? (
                            <>
                              <span className="text-yellow-400 font-bold">Crawl-delay:</span>
                              <span className="text-yellow-200">{line.slice(12)}</span>
                            </>
                          ) : (
                            line
                          )}
                        </span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            </div>

            {/* Bottom Output Action Bar */}
            <div className="p-4 bg-slate-900/90 border-t border-slate-800 grid grid-cols-2 gap-3">
              <button
                onClick={handleCopyCode}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-sans font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadFile}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-sans font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm shadow-emerald-950/40"
              >
                <Download className="h-4 w-4" />
                <span>Download .txt</span>
              </button>
            </div>

          </div>

          {/* Quick Informational Tip Card */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Deployment Quick Tip</span>
            </div>
            <p className="leading-relaxed">
              Upload this generated file directly to your web server&apos;s root directory so it is accessible at{" "}
              <code className="text-emerald-600 dark:text-emerald-400">https://yourdomain.com/robots.txt</code>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// SUB-COMPONENT: Individual Rule Block Editor
// ----------------------------------------------------------------------------
interface RuleBlockEditorProps {
  ruleIndex: number;
  rule: RobotsRule;
  totalRules: number;
  onUpdateUserAgent: (ua: string) => void;
  onUpdateCrawlDelay: (delay: string) => void;
  onAddDisallow: (path: string) => void;
  onRemoveDisallow: (pathIndex: number) => void;
  onAddAllow: (path: string) => void;
  onRemoveAllow: (pathIndex: number) => void;
  onRemoveBlock: () => void;
}

function RuleBlockEditor({
  ruleIndex,
  rule,
  totalRules,
  onUpdateUserAgent,
  onUpdateCrawlDelay,
  onAddDisallow,
  onRemoveDisallow,
  onAddAllow,
  onRemoveAllow,
  onRemoveBlock,
}: RuleBlockEditorProps) {
  const [customDisallow, setCustomDisallow] = useState("");
  const [customAllow, setCustomAllow] = useState("");

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
      
      {/* Rule Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
            {ruleIndex + 1}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Rule Block: {rule.userAgent || "*"}
          </span>
        </div>

        <button
          onClick={onRemoveBlock}
          className="text-slate-400 hover:text-rose-500 text-xs font-medium flex items-center gap-1 transition-colors"
          title="Remove rule block"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>{totalRules > 1 ? "Remove Block" : "Clear Rules"}</span>
        </button>
      </div>

      {/* User-Agent Input & Suggestions */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          User-Agent Target
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={rule.userAgent}
            onChange={(e) => onUpdateUserAgent(e.target.value)}
            placeholder="*"
            className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {COMMON_BOTS.slice(0, 8).map((bot) => (
            <button
              key={bot.value}
              type="button"
              onClick={() => onUpdateUserAgent(bot.value)}
              className={cn(
                "px-2 py-0.5 text-[11px] rounded border transition-colors",
                rule.userAgent === bot.value
                  ? "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              )}
            >
              {bot.name}
            </button>
          ))}
        </div>
      </div>

      {/* Disallow Paths */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5" />
            <span>Disallowed Paths ({rule.disallow?.length || 0})</span>
          </label>
          <span className="text-[10px] text-slate-400">Forbidden directories</span>
        </div>

        {/* Active Disallowed tags */}
        <div className="flex flex-wrap gap-1.5 min-h-[28px]">
          {(rule.disallow || []).length === 0 ? (
            <span className="text-xs text-slate-400 italic">No disallowed paths (Full access permitted)</span>
          ) : (
            rule.disallow.map((path, pIdx) => (
              <span
                key={pIdx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300 text-xs font-mono"
              >
                <span>{path}</span>
                <button
                  type="button"
                  onClick={() => onRemoveDisallow(pIdx)}
                  className="hover:text-rose-600 dark:hover:text-rose-100 p-0.5"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Add custom Disallow */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customDisallow}
            onChange={(e) => setCustomDisallow(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddDisallow(customDisallow);
                setCustomDisallow("");
              }
            }}
            placeholder="/admin/ or /private/"
            className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              onAddDisallow(customDisallow);
              setCustomDisallow("");
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 transition-colors"
          >
            + Disallow
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {DISALLOW_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => onAddDisallow(sug)}
              className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              +{sug}
            </button>
          ))}
        </div>
      </div>

      {/* Allow Paths */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Allowed Paths ({rule.allow?.length || 0})</span>
          </label>
          <span className="text-[10px] text-slate-400">Exceptions to Disallow</span>
        </div>

        {/* Active Allowed tags */}
        <div className="flex flex-wrap gap-1.5 min-h-[28px]">
          {(rule.allow || []).length === 0 ? (
            <span className="text-xs text-slate-400 italic">No explicit allow exceptions defined</span>
          ) : (
            rule.allow.map((path, pIdx) => (
              <span
                key={pIdx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono"
              >
                <span>{path}</span>
                <button
                  type="button"
                  onClick={() => onRemoveAllow(pIdx)}
                  className="hover:text-emerald-600 dark:hover:text-emerald-100 p-0.5"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Add custom Allow */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customAllow}
            onChange={(e) => setCustomAllow(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddAllow(customAllow);
                setCustomAllow("");
              }
            }}
            placeholder="/ or /public/assets/"
            className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              onAddAllow(customAllow);
              setCustomAllow("");
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors"
          >
            + Allow
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {ALLOW_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => onAddAllow(sug)}
              className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/30 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              +{sug}
            </button>
          ))}
        </div>
      </div>

      {/* Crawl-Delay Input */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Crawl-Delay (Seconds)
          </label>
          <p className="text-[10px] text-slate-400">Bingbot/Yandex rate limit (ignored by Googlebot)</p>
        </div>
        <input
          type="number"
          min="0"
          step="0.5"
          value={rule.crawlDelay !== undefined ? rule.crawlDelay : ""}
          onChange={(e) => onUpdateCrawlDelay(e.target.value)}
          placeholder="e.g. 2"
          className="w-24 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-right"
        />
      </div>

    </div>
  );
}

export default RobotsTxtGeneratorValidator;
