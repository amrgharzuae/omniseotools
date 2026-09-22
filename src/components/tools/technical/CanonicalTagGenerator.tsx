"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Link2,
  Sparkles,
  Check,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Globe,
  Layers,
  FileCode,
  Lock,
  ArrowRight,
  SlidersHorizontal,
  Info,
  List,
  FileText,
  Server,
  FileSpreadsheet,
  CheckSquare,
  Square,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface CanonicalTagGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

type TrailingSlashPolicy = "enforce" | "remove" | "keep";
type ActiveTab = "html" | "http-header" | "nextjs" | "server";

// Comprehensive tracking parameter blacklist
const TRACKING_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",
  "gclid",
  "gbraid",
  "wbraid",
  "dclid",
  "gad_source",
  "gclsrc",
  "fbclid",
  "fbadid",
  "msclkid",
  "ttclid",
  "twclid",
  "yclid",
  "ym_debug",
  "mc_cid",
  "mc_eid",
  "_hsenc",
  "_hsmi",
  "ref",
  "source",
  "sessionid",
  "sid",
  "affiliate_id",
  "aff_id",
  "trk",
  "sc_channel",
  "igshid",
]);

interface NormalizationRules {
  stripTrackingParams: boolean;
  enforceLowercasePath: boolean;
  trailingSlashPolicy: TrailingSlashPolicy;
  forceHttps: boolean;
  enforceWww: "none" | "add" | "remove";
  stripHashFragment: boolean;
  stripPage1Pagination: boolean;
}

interface NormalizationResult {
  originalUrl: string;
  canonicalUrl: string;
  isRelative: boolean;
  hasInsecureHttp: boolean;
  hasRemainingParams: boolean;
  isModified: boolean;
  modifications: string[];
  score: number;
}

const DEFAULT_RULES: NormalizationRules = {
  stripTrackingParams: true,
  enforceLowercasePath: true,
  trailingSlashPolicy: "remove",
  forceHttps: true,
  enforceWww: "none",
  stripHashFragment: true,
  stripPage1Pagination: true,
};

const SAMPLE_BATCH_INPUT = `https://example.com/blog/seo-guide/?utm_source=twitter&utm_medium=social&gclid=12345#comments
http://example.com/Products/Men-Shoes/?page=1
https://example.com/about/team/
https://example.com/category/tech?utm_campaign=winter_sale&fbclid=abcdef
/docs/getting-started.html`;

export function normalizeSingleUrl(
  rawUrl: string,
  rules: NormalizationRules
): NormalizationResult {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return {
      originalUrl: "",
      canonicalUrl: "",
      isRelative: false,
      hasInsecureHttp: false,
      hasRemainingParams: false,
      isModified: false,
      modifications: [],
      score: 100,
    };
  }

  const modifications: string[] = [];
  let isRelative = false;
  let hasInsecureHttp = false;
  let workingUrl = trimmed;

  // 1. Check for relative URL
  if (!workingUrl.startsWith("http://") && !workingUrl.startsWith("https://")) {
    if (workingUrl.startsWith("/")) {
      isRelative = true;
      workingUrl = `https://example.com${workingUrl}`;
      modifications.push("Prefixed absolute scheme & domain (https://example.com)");
    } else if (workingUrl.startsWith("www.") || workingUrl.includes(".")) {
      workingUrl = `https://${workingUrl}`;
      modifications.push("Added https:// protocol");
    } else {
      isRelative = true;
      workingUrl = `https://example.com/${workingUrl}`;
      modifications.push("Prefixed domain placeholder for relative path");
    }
  }

  try {
    const parsed = new URL(workingUrl);

    // 2. Protocol enforcement
    if (parsed.protocol === "http:") {
      hasInsecureHttp = true;
      if (rules.forceHttps) {
        parsed.protocol = "https:";
        modifications.push("Upgraded protocol from http:// to https://");
      }
    }

    // 3. WWW subdomain enforcement
    if (rules.enforceWww === "add" && !parsed.hostname.startsWith("www.") && !parsed.hostname.includes("localhost")) {
      parsed.hostname = `www.${parsed.hostname}`;
      modifications.push("Enforced www. subdomain prefix");
    } else if (rules.enforceWww === "remove" && parsed.hostname.startsWith("www.")) {
      parsed.hostname = parsed.hostname.replace(/^www\./, "");
      modifications.push("Removed www. subdomain prefix");
    }

    // 4. Lowercase path enforcement
    if (rules.enforceLowercasePath && parsed.pathname !== parsed.pathname.toLowerCase()) {
      parsed.pathname = parsed.pathname.toLowerCase();
      modifications.push("Enforced lowercase URL path");
    }

    // 5. Pagination Page 1 cleanup
    if (rules.stripPage1Pagination) {
      if (parsed.searchParams.get("page") === "1") {
        parsed.searchParams.delete("page");
        modifications.push("Stripped page=1 root pagination query");
      }
      if (parsed.searchParams.get("p") === "1") {
        parsed.searchParams.delete("p");
        modifications.push("Stripped p=1 root pagination query");
      }
      // Path based /page/1 or /page/1/
      if (/\/page\/1\/?$/.test(parsed.pathname)) {
        parsed.pathname = parsed.pathname.replace(/\/page\/1\/?$/, "");
        if (!parsed.pathname) parsed.pathname = "/";
        modifications.push("Normalized /page/1/ path to root path");
      }
    }

    // 6. Tracking parameter stripping
    if (rules.stripTrackingParams && parsed.search) {
      const removedParams: string[] = [];
      const keys = Array.from(parsed.searchParams.keys());
      for (const key of keys) {
        const lowerKey = key.toLowerCase();
        if (TRACKING_PARAMS.has(lowerKey) || lowerKey.startsWith("utm_")) {
          parsed.searchParams.delete(key);
          removedParams.push(key);
        }
      }
      if (removedParams.length > 0) {
        modifications.push(`Stripped ${removedParams.length} tracking parameter(s): ${removedParams.join(", ")}`);
      }
    }

    // 7. Strip Hash / Fragment
    if (rules.stripHashFragment && parsed.hash) {
      parsed.hash = "";
      modifications.push("Stripped URL hash fragment (#)");
    }

    // 8. Trailing Slash Policy
    // Only alter non-root and non-file paths
    const hasFileExtension = /\.[a-zA-Z0-9]{2,5}$/.test(parsed.pathname);
    if (!hasFileExtension && parsed.pathname !== "/") {
      if (rules.trailingSlashPolicy === "remove" && parsed.pathname.endsWith("/")) {
        parsed.pathname = parsed.pathname.replace(/\/+$/, "");
        modifications.push("Removed trailing slash");
      } else if (rules.trailingSlashPolicy === "enforce" && !parsed.pathname.endsWith("/")) {
        parsed.pathname = `${parsed.pathname}/`;
        modifications.push("Enforced trailing slash");
      }
    }

    // 9. Reconstruct canonical URL
    let result = parsed.toString();
    // If searchParams is empty and URL has a trailing question mark, strip it
    if (!parsed.search && result.endsWith("?")) {
      result = result.slice(0, -1);
    }

    const hasRemainingParams = Boolean(parsed.search);
    const isModified = result !== trimmed;

    // Score calculation
    let score = 100;
    if (isRelative) score -= 40;
    if (hasInsecureHttp && !rules.forceHttps) score -= 30;
    if (hasRemainingParams) score -= 15;

    return {
      originalUrl: trimmed,
      canonicalUrl: result,
      isRelative,
      hasInsecureHttp,
      hasRemainingParams,
      isModified,
      modifications,
      score: Math.max(0, score),
    };
  } catch {
    return {
      originalUrl: trimmed,
      canonicalUrl: trimmed,
      isRelative: true,
      hasInsecureHttp: false,
      hasRemainingParams: false,
      isModified: false,
      modifications: ["Malformed URL: unable to parse"],
      score: 20,
    };
  }
}

export function CanonicalTagGenerator({
  toolSlug = "canonical-tag-generator",
  toolName = "Bulk Canonical Normalizer & Auditor",
}: CanonicalTagGeneratorProps) {
  const [mode, setMode] = useState<"single" | "batch">("batch");
  const [singleUrl, setSingleUrl] = useState(
    "https://example.com/Blog/SEO-Guide/?utm_source=twitter&utm_medium=social&gclid=987654#comments"
  );
  const [batchText, setBatchText] = useState(SAMPLE_BATCH_INPUT);
  const [rules, setRules] = useState<NormalizationRules>(DEFAULT_RULES);
  const [activeTab, setActiveTab] = useState<ActiveTab>("html");
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("clean-marketing");

  // Single URL normalization result
  const singleResult = useMemo(() => {
    return normalizeSingleUrl(singleUrl, rules);
  }, [singleUrl, rules]);

  // Batch URLs normalization results
  const batchResults = useMemo(() => {
    const lines = batchText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 25);
    return lines.map((line) => normalizeSingleUrl(line, rules));
  }, [batchText, rules]);

  // Batch aggregate hygiene stats & issue breakdown
  const batchStats = useMemo(() => {
    const total = batchResults.length;
    if (total === 0) {
      return {
        total: 0,
        avgScore: 100,
        perfectCount: 0,
        normalizedCount: 0,
        issuesCount: 0,
        relativeCount: 0,
        insecureHttpCount: 0,
        remainingParamsCount: 0,
        trackingStrippedCount: 0,
        slashModifiedCount: 0,
        lowercaseModifiedCount: 0,
        httpsUpgradedCount: 0,
      };
    }

    const avgScore = Math.round(
      batchResults.reduce((acc, r) => acc + r.score, 0) / total
    );
    const perfectCount = batchResults.filter((r) => r.score === 100 && !r.isModified).length;
    const normalizedCount = batchResults.filter((r) => r.isModified).length;
    const issuesCount = batchResults.filter((r) => r.score < 100).length;
    const relativeCount = batchResults.filter((r) => r.isRelative).length;
    const insecureHttpCount = batchResults.filter((r) => r.hasInsecureHttp && !rules.forceHttps).length;
    const remainingParamsCount = batchResults.filter((r) => r.hasRemainingParams).length;

    let trackingStrippedCount = 0;
    let slashModifiedCount = 0;
    let lowercaseModifiedCount = 0;
    let httpsUpgradedCount = 0;

    batchResults.forEach((r) => {
      r.modifications.forEach((m) => {
        const lower = m.toLowerCase();
        if (lower.includes("tracking parameter")) trackingStrippedCount++;
        if (lower.includes("trailing slash")) slashModifiedCount++;
        if (lower.includes("lowercase")) lowercaseModifiedCount++;
        if (lower.includes("upgraded protocol") || lower.includes("https")) httpsUpgradedCount++;
      });
    });

    return {
      total,
      avgScore,
      perfectCount,
      normalizedCount,
      issuesCount,
      relativeCount,
      insecureHttpCount,
      remainingParamsCount,
      trackingStrippedCount,
      slashModifiedCount,
      lowercaseModifiedCount,
      httpsUpgradedCount,
    };
  }, [batchResults, rules.forceHttps]);

  // Handle Preset Selection
  const handleApplyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    if (presetKey === "clean-marketing") {
      setRules({
        ...DEFAULT_RULES,
        stripTrackingParams: true,
        stripHashFragment: true,
        trailingSlashPolicy: "remove",
        forceHttps: true,
      });
      setSingleUrl("https://example.com/products/wireless-headphones?utm_source=facebook&utm_campaign=spring_sale&fbclid=XYZ123#reviews");
    } else if (presetKey === "force-https-www") {
      setRules({
        ...DEFAULT_RULES,
        forceHttps: true,
        enforceWww: "add",
        trailingSlashPolicy: "enforce",
      });
      setSingleUrl("http://example.com/shop/apparel");
    } else if (presetKey === "paginated-root") {
      setRules({
        ...DEFAULT_RULES,
        stripPage1Pagination: true,
        trailingSlashPolicy: "remove",
      });
      setSingleUrl("https://example.com/category/news/?page=1");
    }
  };

  const handleReset = () => {
    setRules(DEFAULT_RULES);
    setSingleUrl("https://example.com/blog/seo-guide");
    setActivePreset("custom");
  };

  // Generated Code Snippets
  const targetCanonicalUrl = mode === "single" ? singleResult.canonicalUrl : batchResults[0]?.canonicalUrl || "https://example.com/page";

  const htmlSnippet = useMemo(() => {
    if (mode === "single") {
      return `<!-- HTML5 Canonical Link Tag -->\n<link rel="canonical" href="${singleResult.canonicalUrl || "https://example.com/page"}" />`;
    }
    return `<!-- Batch HTML5 Canonical Link Tags -->\n${batchResults
      .map((r) => `<link rel="canonical" href="${r.canonicalUrl}" />`)
      .join("\n")}`;
  }, [mode, singleResult.canonicalUrl, batchResults]);

  const httpHeaderSnippet = useMemo(() => {
    if (mode === "single") {
      return `Link: <${singleResult.canonicalUrl || "https://example.com/document.pdf"}>; rel="canonical"`;
    }
    return batchResults.map((r) => `Link: <${r.canonicalUrl}>; rel="canonical"`).join("\n");
  }, [mode, singleResult.canonicalUrl, batchResults]);

  const nextJsSnippet = useMemo(() => {
    if (mode === "single") {
      return `// app/page.tsx or app/[slug]/page.tsx (Next.js 14 / 15 App Router)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Optimized Page Title",
  description: "Page description...",
  alternates: {
    canonical: "${singleResult.canonicalUrl || "https://example.com/page"}",
  },
};`;
    }
    return `// Next.js App Router Alternates Mapping
const canonicalUrls = ${JSON.stringify(
      batchResults.map((r) => r.canonicalUrl),
      null,
      2
    )};`;
  }, [mode, singleResult.canonicalUrl, batchResults]);

  const serverConfigSnippet = useMemo(() => {
    const url = singleResult.canonicalUrl || "https://example.com/target";
    return `# Nginx Configuration (for PDFs & Documents)
location ~* \\.(pdf|docx|xlsx)$ {
    add_header Link "<${url}>; rel=\\"canonical\\"" always;
}

# Apache .htaccess Configuration
<FilesMatch "\\.(pdf|docx|xlsx)$">
    Header set Link "<${url}>; rel=\\"canonical\\""
</FilesMatch>`;
  }, [singleResult.canonicalUrl]);

  // Copy Snippet Handler
  const handleCopy = useCallback(() => {
    let text = "";
    if (activeTab === "html") text = htmlSnippet;
    else if (activeTab === "http-header") text = httpHeaderSnippet;
    else if (activeTab === "nextjs") text = nextJsSnippet;
    else text = serverConfigSnippet;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [activeTab, htmlSnippet, httpHeaderSnippet, nextJsSnippet, serverConfigSnippet]);

  // Download Output
  const handleDownload = () => {
    const text = activeTab === "html" ? htmlSnippet : activeTab === "http-header" ? httpHeaderSnippet : nextJsSnippet;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `canonical-${mode}-${activeTab}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export Batch CSV
  const handleExportBatchCsv = () => {
    if (batchResults.length === 0) return;
    const header = "Original URL,Canonical URL,Modified,Status\n";
    const rows = batchResults
      .map(
        (r) =>
          `"${r.originalUrl.replace(/"/g, '""')}","${r.canonicalUrl.replace(/"/g, '""')}","${
            r.isModified ? "YES" : "NO"
          }","${r.score === 100 ? "Valid" : "Issues Detected"}"`
      )
      .join("\n");
    const csvContent = "\uFEFF" + header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `canonical-audit-batch-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Quick-Start Normalization Presets:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleApplyPreset("clean-marketing")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm",
              activePreset === "clean-marketing"
                ? "bg-emerald-600 text-white shadow-emerald-500/25"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Clean Marketing URL</span>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset("force-https-www")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm",
              activePreset === "force-https-www"
                ? "bg-indigo-600 text-white shadow-indigo-500/25"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Force HTTPS & WWW</span>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset("paginated-root")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm",
              activePreset === "paginated-root"
                ? "bg-purple-600 text-white shadow-purple-500/25"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Paginated Root Page</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset Form to Clean Defaults"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Dual-Pane Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Inputs & Rules) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Mode Selector & URL Input */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            
            {/* Mode Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <Link2 className="h-4 w-4 text-emerald-500" />
                <span>1. Target URL Input</span>
              </label>

              {/* Single vs Batch Switcher */}
              <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setMode("single")}
                  className={cn(
                    "px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5",
                    mode === "single"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  )}
                >
                  <Globe className="h-3 w-3" />
                  <span>Single URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("batch")}
                  className={cn(
                    "px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5",
                    mode === "batch"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  )}
                >
                  <List className="h-3 w-3" />
                  <span>Batch Mode (Max 25)</span>
                </button>
              </div>
            </div>

            {/* Input Element */}
            {mode === "single" ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="target-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Enter Raw URL / Link to Normalize
                  </label>
                  <span className="text-[11px] text-slate-400">Includes query strings, UTMs & hashes</span>
                </div>
                <input
                  id="target-url"
                  type="text"
                  value={singleUrl}
                  onChange={(e) => {
                    setSingleUrl(e.target.value);
                    setActivePreset("custom");
                  }}
                  placeholder="https://example.com/blog/seo-guide?utm_source=google&gclid=123#top"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="batch-urls" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Paste Bulk URLs (One per line, up to 25 URLs)
                  </label>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {batchResults.length} / 25 URLs
                  </span>
                </div>
                <textarea
                  id="batch-urls"
                  rows={6}
                  value={batchText}
                  onChange={(e) => {
                    setBatchText(e.target.value);
                    setActivePreset("custom");
                  }}
                  placeholder="https://example.com/page-1?utm_source=twitter&#10;http://example.com/products/shoes&#10;https://example.com/about/"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none leading-relaxed"
                />
              </div>
            )}

          </div>

          {/* Card: Normalization Rules & SEO Policies */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
                <span>2. Normalization Rules & SEO Hygiene Policies</span>
              </label>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Google SEO Best Practices
              </span>
            </div>

            {/* Toggle Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Toggle 1: Strip Tracking Parameters */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={rules.stripTrackingParams}
                  onChange={(e) => {
                    setRules((prev) => ({ ...prev, stripTrackingParams: e.target.checked }));
                    setActivePreset("custom");
                  }}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Strip Tracking Parameters
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                    Removes utm_*, gclid, fbclid, msclkid, ref, etc.
                  </span>
                </div>
              </label>

              {/* Toggle 2: Enforce Lowercase Path */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={rules.enforceLowercasePath}
                  onChange={(e) => {
                    setRules((prev) => ({ ...prev, enforceLowercasePath: e.target.checked }));
                    setActivePreset("custom");
                  }}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Enforce Lowercase Path
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                    Converts /Blog/Post to /blog/post
                  </span>
                </div>
              </label>

              {/* Toggle 3: Force HTTPS Protocol */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={rules.forceHttps}
                  onChange={(e) => {
                    setRules((prev) => ({ ...prev, forceHttps: e.target.checked }));
                    setActivePreset("custom");
                  }}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Force HTTPS Protocol
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                    Upgrades http:// to secure https://
                  </span>
                </div>
              </label>

              {/* Toggle 4: Strip URL Hash Fragment */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={rules.stripHashFragment}
                  onChange={(e) => {
                    setRules((prev) => ({ ...prev, stripHashFragment: e.target.checked }));
                    setActivePreset("custom");
                  }}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Strip Fragment (#hash)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                    Removes in-page anchors like #comments
                  </span>
                </div>
              </label>

              {/* Toggle 5: Strip Pagination Page 1 */}
              <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={rules.stripPage1Pagination}
                  onChange={(e) => {
                    setRules((prev) => ({ ...prev, stripPage1Pagination: e.target.checked }));
                    setActivePreset("custom");
                  }}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Strip Page 1 Pagination
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug block mt-0.5">
                    Canonicalizes ?page=1 to root category
                  </span>
                </div>
              </label>

            </div>

            {/* Trailing Slash Selector */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Trailing Slash Policy
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "remove", label: "Remove Slash", example: "/blog/post" },
                    { id: "enforce", label: "Enforce Slash", example: "/blog/post/" },
                    { id: "keep", label: "Keep Original", example: "as typed" },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setRules((prev) => ({ ...prev, trailingSlashPolicy: p.id }));
                      setActivePreset("custom");
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all",
                      rules.trailingSlashPolicy === p.id
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <span className="text-xs font-bold">{p.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{p.example}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Batch Mode Results Table (if Batch active) */}
          {mode === "batch" && (
            <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                  <List className="h-4 w-4 text-emerald-500" />
                  <span>Bulk Normalization Audit ({batchResults.length} URLs)</span>
                </h3>
                <button
                  type="button"
                  onClick={handleExportBatchCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-100 transition-colors"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Export CSV (Excel BOM)</span>
                </button>
              </div>

              <div className="overflow-x-auto max-h-[320px] rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 sticky top-0 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-2.5 font-semibold">#</th>
                      <th className="p-2.5 font-semibold">Original URL</th>
                      <th className="p-2.5 font-semibold">Canonical Output</th>
                      <th className="p-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {batchResults.map((res, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="p-2.5 font-mono text-slate-400">{idx + 1}</td>
                        <td className="p-2.5 font-mono text-slate-500 truncate max-w-[200px]" title={res.originalUrl}>
                          {res.originalUrl}
                        </td>
                        <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold truncate max-w-[250px]" title={res.canonicalUrl}>
                          {res.canonicalUrl}
                        </td>
                        <td className="p-2.5">
                          {res.score === 100 ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                              <CheckCircle2 className="h-3 w-3" /> Normalized
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                              <AlertTriangle className="h-3 w-3" /> Issues
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Sticky Output Panel & Hygiene Auditor) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            
            {/* Live Hygiene Audit Banner (Batch & Single URL Aware) */}
            {mode === "batch" ? (
              <div
                className={cn(
                  "p-4 rounded-2xl border transition-all shadow-sm space-y-3.5",
                  batchStats.avgScore >= 90
                    ? "border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100"
                    : batchStats.avgScore >= 70
                    ? "border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100"
                    : "border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {batchStats.avgScore >= 90 ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : batchStats.avgScore >= 70 ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold leading-tight">
                        {batchStats.avgScore >= 90
                          ? "Bulk Canonical Audit: Healthy"
                          : batchStats.avgScore >= 70
                          ? "Bulk Audit: Warnings Detected"
                          : "Bulk Audit: Critical Hygiene Errors"}
                      </h4>
                      <span className="text-[11px] opacity-80">
                        Average Hygiene Score across {batchStats.total} URLs
                      </span>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-black font-mono">
                    {batchStats.avgScore}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      batchStats.avgScore >= 90
                        ? "bg-emerald-500"
                        : batchStats.avgScore >= 70
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    )}
                    style={{ width: `${batchStats.avgScore}%` }}
                  />
                </div>

                {/* Aggregate Summary Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-current/10">
                    <span className="block font-black text-xs font-mono">{batchStats.total}</span>
                    <span className="text-[10px] opacity-75">URLs Audited</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-current/10">
                    <span className="block font-black text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      {batchStats.normalizedCount}
                    </span>
                    <span className="text-[10px] opacity-75">Normalized</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-current/10">
                    <span
                      className={cn(
                        "block font-black text-xs font-mono",
                        batchStats.issuesCount > 0
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      )}
                    >
                      {batchStats.issuesCount}
                    </span>
                    <span className="text-[10px] opacity-75">Flagged Issues</span>
                  </div>
                </div>

                {/* Normalization Modifications & Issues Breakdown */}
                <div className="space-y-1.5 pt-1 border-t border-current/10 text-[11px]">
                  {batchStats.relativeCount > 0 && (
                    <div className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                      <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{batchStats.relativeCount} relative URL(s) flagged: Canonical tags require absolute HTTPS URLs.</span>
                    </div>
                  )}
                  {batchStats.insecureHttpCount > 0 && (
                    <div className="flex items-start gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{batchStats.insecureHttpCount} insecure HTTP URL(s) detected. Enable Force HTTPS.</span>
                    </div>
                  )}
                  {batchStats.remainingParamsCount > 0 && (
                    <div className="flex items-start gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{batchStats.remainingParamsCount} URL(s) contain remaining query parameters.</span>
                    </div>
                  )}

                  <div className="space-y-1 pt-1">
                    <span className="font-bold opacity-90 block">Batch Sanitizations Performed:</span>
                    {batchStats.trackingStrippedCount > 0 && (
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        <Check className="h-3 w-3 shrink-0" />
                        <span>Stripped tracking parameters across {batchStats.trackingStrippedCount} URL(s)</span>
                      </div>
                    )}
                    {batchStats.slashModifiedCount > 0 && (
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        <Check className="h-3 w-3 shrink-0" />
                        <span>Standardized trailing slashes ({rules.trailingSlashPolicy}) on {batchStats.slashModifiedCount} URL(s)</span>
                      </div>
                    )}
                    {batchStats.lowercaseModifiedCount > 0 && (
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        <Check className="h-3 w-3 shrink-0" />
                        <span>Enforced lowercase paths on {batchStats.lowercaseModifiedCount} URL(s)</span>
                      </div>
                    )}
                    {batchStats.httpsUpgradedCount > 0 && (
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        <Check className="h-3 w-3 shrink-0" />
                        <span>Upgraded {batchStats.httpsUpgradedCount} URL(s) to secure HTTPS protocol</span>
                      </div>
                    )}
                    {batchStats.normalizedCount === 0 && (
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        <Check className="h-3 w-3 shrink-0" />
                        <span>All input URLs are already clean and compliant.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "p-4 rounded-2xl border transition-all shadow-sm space-y-3",
                  singleResult.score >= 90
                    ? "border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100"
                    : singleResult.score >= 70
                    ? "border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100"
                    : "border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {singleResult.score >= 90 ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : singleResult.score >= 70 ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold leading-tight">
                        {singleResult.score >= 90
                          ? "100% Google-Compliant Canonical"
                          : singleResult.score >= 70
                          ? "Valid Canonical with Warnings"
                          : "Critical URL Hygiene Errors"}
                      </h4>
                      <span className="text-[11px] opacity-80">
                        Hygiene Score: {singleResult.score}/100
                      </span>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-black font-mono">
                    {singleResult.score}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      singleResult.score >= 90
                        ? "bg-emerald-500"
                        : singleResult.score >= 70
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    )}
                    style={{ width: `${singleResult.score}%` }}
                  />
                </div>

                {/* Normalization Modifications & Issues */}
                <div className="space-y-1.5 pt-1 border-t border-current/10 text-[11px]">
                  {singleResult.isRelative && (
                    <div className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                      <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>Relative URL flagged: Canonical tags must be absolute URLs with domain.</span>
                    </div>
                  )}
                  {singleResult.hasInsecureHttp && !rules.forceHttps && (
                    <div className="flex items-start gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>Insecure HTTP protocol: Google prioritizes HTTPS as a ranking signal.</span>
                    </div>
                  )}
                  {singleResult.hasRemainingParams && (
                    <div className="flex items-start gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>Remaining query parameters: Verify non-tracking parameters are intentional.</span>
                    </div>
                  )}
                  {singleResult.modifications.length > 0 ? (
                    <div className="space-y-1 pt-1">
                      <span className="font-bold opacity-90 block">Automated Optimizations Applied:</span>
                      {singleResult.modifications.map((mod, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                          <Check className="h-3 w-3 shrink-0" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                      <Check className="h-3 w-3 shrink-0" />
                      <span>Input URL was already perfectly formatted and normalized.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Code Output Box with Tab Switcher */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
              
              {/* Tabs */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("html")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      activeTab === "html"
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    HTML &lt;head&gt;
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("http-header")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      activeTab === "http-header"
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    HTTP Header
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("nextjs")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      activeTab === "nextjs"
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    Next.js App
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("server")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      activeTab === "server"
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    Server
                  </button>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {activeTab === "html" ? "HTML5" : activeTab === "http-header" ? "RFC 5988" : activeTab === "nextjs" ? "TSX" : "CONF"}
                </span>
              </div>

              {/* Code Pre Box */}
              <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs min-h-[260px] max-h-[380px] overflow-y-auto">
                {activeTab === "html" && (
                  <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300">
                    <code>{htmlSnippet}</code>
                  </pre>
                )}

                {activeTab === "http-header" && (
                  <pre className="whitespace-pre-wrap leading-relaxed text-indigo-300">
                    <code>{httpHeaderSnippet}</code>
                  </pre>
                )}

                {activeTab === "nextjs" && (
                  <pre className="whitespace-pre-wrap leading-relaxed text-cyan-300">
                    <code>{nextJsSnippet}</code>
                  </pre>
                )}

                {activeTab === "server" && (
                  <pre className="whitespace-pre-wrap leading-relaxed text-amber-300">
                    <code>{serverConfigSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm",
                      copied
                        ? "bg-emerald-600 text-white shadow-emerald-500/25"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
                    )}
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied Snippet!" : "Copy Snippet"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title="Download Text Snippet"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                  >
                    <span>Test in Google</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Privacy Guarantee Pill */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>100% In-Browser Privacy Guarantee</span>
              </div>
              <span className="text-[10px] text-slate-400">Zero Server Data Logging</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CanonicalTagGenerator;
