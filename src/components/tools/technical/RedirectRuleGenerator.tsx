"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  GitFork,
  ArrowRight,
  ArrowRightLeft,
  Sparkles,
  Check,
  Copy,
  Download,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Globe,
  Layers,
  FileCode,
  Sliders,
  SlidersHorizontal,
  Info,
  Server,
  Code2,
  FileText,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface RedirectRuleGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

type StatusCode = "301" | "302" | "307" | "308";
type MatchMode = "simple" | "wildcard" | "regex";
type ServerTab = "nextjs" | "nginx" | "apache" | "cloudflare";

interface PresetRule {
  name: string;
  status: StatusCode;
  mode: MatchMode;
  source: string;
  destination: string;
  caseInsensitive: boolean;
  preserveQuery: boolean;
  sampleTestUrl: string;
}

const PRESETS: PresetRule[] = [
  {
    name: "Folder Migration",
    status: "301",
    mode: "wildcard",
    source: "/blog/:slug*",
    destination: "/articles/:slug*",
    caseInsensitive: true,
    preserveQuery: true,
    sampleTestUrl: "/blog/seo-best-practices",
  },
  {
    name: "Remove Trailing Slash",
    status: "301",
    mode: "regex",
    source: "^/(.+)/$",
    destination: "/$1",
    caseInsensitive: false,
    preserveQuery: true,
    sampleTestUrl: "/about-us/",
  },
  {
    name: "Strip .html Extension",
    status: "301",
    mode: "regex",
    source: "^/(.*)\\.html$",
    destination: "/$1",
    caseInsensitive: true,
    preserveQuery: true,
    sampleTestUrl: "/products/shoes.html",
  },
  {
    name: "Product ID Pattern",
    status: "301",
    mode: "regex",
    source: "^/product/([0-9]+)$",
    destination: "/items/$1",
    caseInsensitive: false,
    preserveQuery: true,
    sampleTestUrl: "/product/48192",
  },
  {
    name: "HTTP to HTTPS & WWW",
    status: "301",
    mode: "simple",
    source: "http://example.com/old-page",
    destination: "https://www.example.com/new-page",
    caseInsensitive: true,
    preserveQuery: true,
    sampleTestUrl: "http://example.com/old-page",
  },
];

export function RedirectRuleGenerator({ toolSlug, toolName }: RedirectRuleGeneratorProps) {
  // Form State
  const [statusCode, setStatusCode] = useState<StatusCode>("301");
  const [matchMode, setMatchMode] = useState<MatchMode>("wildcard");
  const [sourcePattern, setSourcePattern] = useState<string>("/blog/:slug*");
  const [targetDestination, setTargetDestination] = useState<string>("/articles/:slug*");
  const [caseInsensitive, setCaseInsensitive] = useState<boolean>(true);
  const [preserveQuery, setPreserveQuery] = useState<boolean>(true);

  // Live Test State
  const [testUrl, setTestUrl] = useState<string>("/blog/seo-best-practices");

  // Output Tab & Feedback
  const [activeTab, setActiveTab] = useState<ServerTab>("nextjs");
  const [copied, setCopied] = useState<boolean>(false);

  // Apply Preset Helper
  const handleApplyPreset = (preset: PresetRule) => {
    setStatusCode(preset.status);
    setMatchMode(preset.mode);
    setSourcePattern(preset.source);
    setTargetDestination(preset.destination);
    setCaseInsensitive(preset.caseInsensitive);
    setPreserveQuery(preset.preserveQuery);
    setTestUrl(preset.sampleTestUrl);
  };

  // Live Path Simulation Engine
  const simulationResult = useMemo(() => {
    const trimmedTest = testUrl.trim();
    const trimmedSource = sourcePattern.trim();
    const trimmedDest = targetDestination.trim();

    if (!trimmedTest) {
      return {
        matched: false,
        evaluatedUrl: "",
        explanation: "Enter a sample URL path above to test this redirect rule.",
        isError: false,
      };
    }

    if (!trimmedSource || !trimmedDest) {
      return {
        matched: false,
        evaluatedUrl: "",
        explanation: "Specify both a source pattern and target destination.",
        isError: false,
      };
    }

    // Check for redirect loop
    if (trimmedSource === trimmedDest) {
      return {
        matched: false,
        evaluatedUrl: "",
        explanation: "CRITICAL: Source pattern is identical to destination. This will trigger an infinite redirect loop.",
        isError: true,
      };
    }

    try {
      // 1. Simple Match
      if (matchMode === "simple") {
        const sourceNormalized = caseInsensitive ? trimmedSource.toLowerCase() : trimmedSource;
        const testNormalized = caseInsensitive ? trimmedTest.toLowerCase() : trimmedTest;

        if (sourceNormalized === testNormalized) {
          return {
            matched: true,
            evaluatedUrl: trimmedDest,
            explanation: `Exact match on "${trimmedSource}". Redirecting with HTTP ${statusCode}.`,
            isError: false,
          };
        } else {
          return {
            matched: false,
            evaluatedUrl: "",
            explanation: `Path does not match exact source pattern "${trimmedSource}".`,
            isError: false,
          };
        }
      }

      // 2. Wildcard / Parameter Mode (Next.js route pattern like /blog/:slug*)
      if (matchMode === "wildcard") {
        // Convert :param* to (.*) and :param to ([^/]+)
        let regexPattern = trimmedSource
          .replace(/:[a-zA-Z0-9_]+\*/g, "(.*)")
          .replace(/:[a-zA-Z0-9_]+/g, "([^/]+)");

        // Extract param names
        const paramNames: string[] = [];
        const paramRegex = /:([a-zA-Z0-9_]+)(\*?)/g;
        let match;
        while ((match = paramRegex.exec(trimmedSource)) !== null) {
          paramNames.push(match[1]);
        }

        if (!regexPattern.startsWith("^")) regexPattern = `^${regexPattern}`;
        if (!regexPattern.endsWith("$")) regexPattern = `${regexPattern}$`;

        const rx = new RegExp(regexPattern, caseInsensitive ? "i" : "");
        const execMatch = rx.exec(trimmedTest);

        if (execMatch) {
          let output = trimmedDest;
          paramNames.forEach((name, idx) => {
            const capturedVal = execMatch[idx + 1] || "";
            output = output.replace(new RegExp(`:${name}\\*?`, "g"), capturedVal);
          });

          // Also replace $1, $2 if user wrote numbers
          for (let i = 1; i < execMatch.length; i++) {
            output = output.replace(new RegExp(`\\$${i}`, "g"), execMatch[i]);
          }

          return {
            matched: true,
            evaluatedUrl: output,
            explanation: `Matched wildcard pattern. Substituted ${paramNames.length > 0 ? paramNames.join(", ") : "parameters"}.`,
            isError: false,
          };
        } else {
          return {
            matched: false,
            evaluatedUrl: "",
            explanation: `URL does not match route pattern "${trimmedSource}".`,
            isError: false,
          };
        }
      }

      // 3. RegEx Pattern Mode
      if (matchMode === "regex") {
        const rx = new RegExp(trimmedSource, caseInsensitive ? "i" : "");
        const execMatch = rx.exec(trimmedTest);

        if (execMatch) {
          let output = trimmedDest;
          // Replace capture groups $1, $2, etc.
          for (let i = 1; i < execMatch.length; i++) {
            output = output.replace(new RegExp(`\\$${i}`, "g"), execMatch[i]);
          }

          return {
            matched: true,
            evaluatedUrl: output,
            explanation: `Matched regular expression with ${execMatch.length - 1} capture group(s).`,
            isError: false,
          };
        } else {
          return {
            matched: false,
            evaluatedUrl: "",
            explanation: `Test URL does not satisfy regular expression /${trimmedSource}/${caseInsensitive ? "i" : ""}.`,
            isError: false,
          };
        }
      }
    } catch (err: any) {
      return {
        matched: false,
        evaluatedUrl: "",
        explanation: `RegEx Syntax Error: ${err?.message || "Invalid regular expression."}`,
        isError: true,
      };
    }

    return {
      matched: false,
      evaluatedUrl: "",
      explanation: "No match.",
      isError: false,
    };
  }, [testUrl, sourcePattern, targetDestination, matchMode, caseInsensitive, statusCode]);

  // Generate Server Configurations
  const generatedConfigs = useMemo(() => {
    const isPermanent = statusCode === "301" || statusCode === "308";
    const src = sourcePattern.trim() || "/old-path";
    const dst = targetDestination.trim() || "/new-path";

    // 1. Next.js (next.config.js / next.config.mjs)
    const nextjsSource = src.startsWith("^") ? src : src.startsWith("/") ? src : `/${src}`;
    const nextjsDest = dst.startsWith("/") || dst.startsWith("http") ? dst : `/${dst}`;

    const nextjsSnippet = `// next.config.mjs (or next.config.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '${nextjsSource}',
        destination: '${nextjsDest}',
        permanent: ${isPermanent}, // Emits HTTP ${isPermanent ? "308" : "307"} in Next.js
      },
    ];
  },
};

export default nextConfig;`;

    // 2. Nginx
    let nginxRewrite = "";
    if (matchMode === "simple") {
      nginxRewrite = `location = ${src} {
    return ${statusCode} ${dst};
}`;
    } else {
      let nginxSrc = src;
      if (!nginxSrc.startsWith("^")) nginxSrc = `^${nginxSrc}`;
      if (!nginxSrc.endsWith("$")) nginxSrc = `${nginxSrc}$`;

      const flag = isPermanent ? "permanent" : "redirect";
      const qsa = preserveQuery ? "" : "?";
      nginxRewrite = `# Nginx Server Block Rewrite
rewrite ${caseInsensitive ? "(?i)" : ""}${nginxSrc} ${dst}${qsa} ${flag};`;
    }

    // 3. Apache (.htaccess)
    let apacheSnippet = "";
    if (matchMode === "simple") {
      apacheSnippet = `RewriteEngine On
RewriteBase /

# Simple Exact Redirect
Redirect ${statusCode} "${src}" "${dst}"`;
    } else {
      let apacheSrc = src.replace(/^\^?\/?/, "^");
      if (!apacheSrc.endsWith("$")) apacheSrc = `${apacheSrc}$`;

      const flags: string[] = [`R=${statusCode}`, "L"];
      if (caseInsensitive) flags.push("NC");
      if (preserveQuery) flags.push("QSA");

      apacheSnippet = `RewriteEngine On
RewriteBase /

# RegEx Rule Redirect
RewriteRule ${apacheSrc} ${dst} [${flags.join(",")}]`;
    }

    // 4. Cloudflare (Bulk Redirects & Rules)
    const cloudflareCsv = `# Cloudflare Bulk Redirects CSV (Import via Zero Trust / Rules > Bulk Redirects)
# Source URL,Target URL,Status Code,Preserve Query,Include Subdomains,Subpath Matching
https://example.com${src},https://example.com${dst},${statusCode},${preserveQuery},false,${matchMode !== "simple"}`;

    return {
      nextjs: nextjsSnippet,
      nginx: nginxRewrite,
      apache: apacheSnippet,
      cloudflare: cloudflareCsv,
    };
  }, [statusCode, matchMode, sourcePattern, targetDestination, caseInsensitive, preserveQuery]);

  // Actions
  const handleCopy = useCallback(() => {
    const code = generatedConfigs[activeTab];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [activeTab, generatedConfigs]);

  const handleDownload = useCallback(() => {
    const code = generatedConfigs[activeTab];
    let filename = "redirect-config.txt";
    let mime = "text/plain";

    if (activeTab === "nextjs") {
      filename = "next.config.mjs";
      mime = "application/javascript";
    } else if (activeTab === "nginx") {
      filename = "nginx-redirects.conf";
      mime = "text/plain";
    } else if (activeTab === "apache") {
      filename = ".htaccess";
      mime = "text/plain";
    } else if (activeTab === "cloudflare") {
      filename = "cloudflare-bulk-redirects.csv";
      mime = "text/csv";
    }

    const blob = new Blob([code], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeTab, generatedConfigs]);

  // Compute Diagnostic Audit Score
  const auditDiagnostics = useMemo(() => {
    const issues: Array<{ type: "warning" | "info" | "error"; text: string }> = [];

    if (sourcePattern.trim() === targetDestination.trim()) {
      issues.push({
        type: "error",
        text: "Infinite redirect loop detected: source pattern equals target destination.",
      });
    }

    if (statusCode === "302" || statusCode === "307") {
      issues.push({
        type: "warning",
        text: `HTTP ${statusCode} is a temporary redirect. Search engines will not consolidate PageRank or canonical equity.`,
      });
    }

    if (matchMode === "regex" && sourcePattern.includes(".") && !sourcePattern.includes("\\.")) {
      issues.push({
        type: "info",
        text: "Tip: If matching file extensions (like .html or .php), escape periods with '\\.' to avoid matching arbitrary characters.",
      });
    }

    let score = 100;
    if (issues.some((i) => i.type === "error")) score -= 50;
    if (issues.some((i) => i.type === "warning")) score -= 20;

    return { score, issues };
  }, [sourcePattern, targetDestination, statusCode, matchMode]);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner: Presets & Controls */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-5 text-white shadow-xl shadow-indigo-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Title & Badge */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300">
              <GitFork className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Redirect Rule & Regex Mapper
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold">
                  0ms Latency
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                100% client-side path matching, capture group simulation & multi-server code generation.
              </p>
            </div>
          </div>

          {/* Preset Buttons & Embed Badge */}
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors"
              >
                {preset.name}
              </button>
            ))}

            <EmbedBadgeModal
              toolSlug={toolSlug || "redirect-rule-generator"}
              label="Redirect Engine"
              status="HTTP 301 / Regex"
              score={auditDiagnostics.score}
            />
          </div>

        </div>
      </div>

      {/* Main Dual-Pane Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Rule Builder & Interactive Live Path Tester */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Rule Builder Form */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
                Configure Redirect Rule
              </h3>
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                HTTP {statusCode}
              </span>
            </div>

            {/* Status Code & Match Mode Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* HTTP Status Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  HTTP Status Code
                </label>
                <select
                  value={statusCode}
                  onChange={(e) => setStatusCode(e.target.value as StatusCode)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="301">301 Moved Permanently (SEO Recommended)</option>
                  <option value="308">308 Permanent Redirect (Preserves POST Body)</option>
                  <option value="302">302 Found (Temporary Redirect)</option>
                  <option value="307">307 Temporary Redirect (Preserves POST Body)</option>
                </select>
              </div>

              {/* Match Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Matching Mode
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMatchMode("simple")}
                    className={cn(
                      "py-1.5 px-2 rounded-lg text-xs font-semibold transition-all",
                      matchMode === "simple"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    Simple
                  </button>
                  <button
                    type="button"
                    onClick={() => setMatchMode("wildcard")}
                    className={cn(
                      "py-1.5 px-2 rounded-lg text-xs font-semibold transition-all",
                      matchMode === "wildcard"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    Wildcard
                  </button>
                  <button
                    type="button"
                    onClick={() => setMatchMode("regex")}
                    className={cn(
                      "py-1.5 px-2 rounded-lg text-xs font-semibold transition-all",
                      matchMode === "regex"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    RegEx
                  </button>
                </div>
              </div>
            </div>

            {/* Source Pattern Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span>Source / Old Path Pattern</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {matchMode === "regex" ? "(RegEx with groups)" : matchMode === "wildcard" ? "(:param* syntax)" : "(Exact match)"}
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={sourcePattern}
                onChange={(e) => setSourcePattern(e.target.value)}
                placeholder={matchMode === "regex" ? "^/products/([0-9]+)$" : "/blog/:slug*"}
                className="w-full font-mono text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Target Destination Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span>Target / New Destination URL</span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {matchMode === "regex" ? "($1, $2 substitution)" : matchMode === "wildcard" ? "(:slug* replacement)" : "(Absolute or relative)"}
                  </span>
                </label>
              </div>
              <input
                type="text"
                value={targetDestination}
                onChange={(e) => setTargetDestination(e.target.value)}
                placeholder={matchMode === "regex" ? "/items/$1" : "/articles/:slug*"}
                className="w-full font-mono text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Options Checkboxes */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseInsensitive}
                  onChange={(e) => setCaseInsensitive(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Case-Insensitive Match (<code>[NC]</code> / <code>(?i)</code>)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preserveQuery}
                  onChange={(e) => setPreserveQuery(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Preserve Query Strings (<code>[QSA]</code>)</span>
              </label>
            </div>
          </div>

          {/* Interactive Live Match Simulator */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-500" />
                Live Match & Regex Path Simulator
              </h3>
              <span className="text-[11px] font-medium text-slate-500">
                0ms Client-Side Evaluator
              </span>
            </div>

            {/* Test Sample URL Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Test Sample Request URL
              </label>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="/blog/seo-best-practices"
                className="w-full font-mono text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Simulation Feedback Banner */}
            <div
              className={cn(
                "p-4 rounded-xl border text-xs space-y-2 transition-all duration-200",
                simulationResult.isError
                  ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200"
                  : simulationResult.matched
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                  : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-200"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {simulationResult.isError ? (
                    <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  ) : simulationResult.matched ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  )}
                  <span className="font-bold">
                    {simulationResult.isError
                      ? "Configuration Error"
                      : simulationResult.matched
                      ? `Rule Matched (HTTP ${statusCode})`
                      : "No Match Detected"}
                  </span>
                </div>
              </div>

              {simulationResult.matched && (
                <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-300/60 dark:border-emerald-700/60 font-mono text-xs flex flex-wrap items-center gap-2">
                  <span className="text-slate-500 dark:text-slate-400">Target Destination:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 break-all">
                    {simulationResult.evaluatedUrl}
                  </span>
                </div>
              )}

              <p className="opacity-90">{simulationResult.explanation}</p>
            </div>

            {/* Diagnostics Warnings */}
            {auditDiagnostics.issues.length > 0 && (
              <div className="pt-2 space-y-1.5">
                {auditDiagnostics.issues.map((iss, i) => (
                  <div
                    key={i}
                    className={cn(
                      "text-[11px] p-2 rounded-lg flex items-start gap-2",
                      iss.type === "error"
                        ? "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300"
                        : iss.type === "warning"
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                        : "bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300"
                    )}
                  >
                    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{iss.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Sticky Multi-Server Output Box */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Main Code Output Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md overflow-hidden">
            
            {/* Header Tabs */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              
              {/* Server Selector Tabs */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("nextjs")}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
                    activeTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("nginx")}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
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
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
                    activeTab === "apache"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Apache
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("cloudflare")}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
                    activeTab === "cloudflare"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Cloudflare
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  title="Download Configuration File"
                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>

            {/* Code Display Area */}
            <div className="relative">
              <pre className="font-mono text-xs p-4 bg-slate-950 text-slate-100 max-h-[380px] overflow-auto leading-relaxed selection:bg-indigo-800 selection:text-white">
                <code>{generatedConfigs[activeTab]}</code>
              </pre>
            </div>

            {/* Summary Footnote */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white">Directive Status:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  HTTP {statusCode} {statusCode === "301" ? "(Permanent)" : statusCode === "308" ? "(Permanent)" : "(Temporary)"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Preserve Parameters:</span>
                <span className="font-mono">{preserveQuery ? "Yes (QSA enabled)" : "No"}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Client-Side Private
                </span>
                <span>Production Ready</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default RedirectRuleGenerator;
