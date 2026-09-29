"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Link2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Search,
  Code2,
  Zap,
  Info,
  Share2,
  Server,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  FileCode,
  Globe,
  Terminal,
  Layers,
  HelpCircle,
} from "lucide-react";
import {
  auditCanonicalUrl,
  type CanonicalAuditResult,
  type CanonicalIssue,
} from "@/lib/canonical-redirect-engine";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import Link from "next/link";

interface CanonicalRedirectAuditorProps {
  toolSlug?: string;
  toolName?: string;
  initialInput?: string;
}

const SAMPLE_PRESETS = {
  trailingSlash: "https://example.com/blog/seo-guide/",
  trackingBloat: "https://example.com/products/shoes?utm_source=meta&utm_medium=cpc&fbclid=12345&gclid=67890",
  mixedCaseProtocol: "http://Example.COM/Blog/Post-1/",
  cleanBenchmark: "https://example.com/blog/seo-guide",
};

export function CanonicalRedirectAuditor({
  toolSlug = "canonical-redirect-auditor",
  toolName = "Canonical URL & Redirect Loop Auditor",
  initialInput,
}: CanonicalRedirectAuditorProps) {
  const [urlInput, setUrlInput] = useState<string>(
    initialInput || SAMPLE_PRESETS.trackingBloat
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<"nextjs" | "nginx" | "apache">("nextjs");
  const [preferredSlashPolicy, setPreferredSlashPolicy] = useState<"no-slash" | "slash">("no-slash");

  // Run audit engine
  const auditResult: CanonicalAuditResult = useMemo(() => {
    return auditCanonicalUrl(urlInput);
  }, [urlInput]);

  // Handle permalink hydration from URL hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#s=")) {
        const rawPayload = decodeURIComponent(atob(hash.slice(3)));
        const parsed = JSON.parse(rawPayload);
        if (parsed.url) setUrlInput(parsed.url);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Update hash for permalink sharing
  const handleSharePermalink = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = { url: urlInput };
      const serialized = btoa(encodeURIComponent(JSON.stringify(payload)));
      window.history.replaceState(null, "", `#s=${serialized}`);
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    } catch {
      // Fallback
    }
  }, [urlInput]);

  // Copy helper
  const handleCopyText = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  // Selected canonical URL based on slash toggle
  const activeCanonicalUrl =
    preferredSlashPolicy === "slash"
      ? auditResult.cleanCanonicalTrailingSlashUrl
      : auditResult.cleanCanonicalUrl;

  const activeHtmlTag = `<link rel="canonical" href="${activeCanonicalUrl}" />`;
  const activeNextJsMetadata = `// In Next.js App Router (page.tsx or layout.tsx)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '${activeCanonicalUrl}',
  },
};`;

  // Status Badge Colors
  const getStatusColor = (status: CanonicalAuditResult["status"]) => {
    switch (status) {
      case "OPTIMAL":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800";
      case "CANONICAL WARNINGS":
        return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800";
      case "CRITICAL DUPLICATION RISK":
        return "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Presets Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 sm:p-6 shadow-xs backdrop-blur-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Client-Side Canonical &amp; Redirect Auditor
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audit URL hygiene, resolve 308 redirect loops, strip query bloat, and generate canonical meta tags
              </p>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSharePermalink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Share interactive URL state permalink"
            >
              {shareFeedback ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <EmbedBadgeModal
              score={auditResult.healthScore}
              status={auditResult.status === "OPTIMAL" ? "Optimal" : "Audited"}
              label="Canonical SEO"
              toolSlug={toolSlug}
              buttonVariant="compact"
            />
          </div>
        </div>

        {/* Sample Preset Buttons */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              Audit Presets:
            </span>
            {urlInput && (
              <button
                onClick={() => setUrlInput("")}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => setUrlInput(SAMPLE_PRESETS.trailingSlash)}
              className={cn(
                "px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all truncate",
                urlInput === SAMPLE_PRESETS.trailingSlash
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              Trailing Slash Mismatch
            </button>
            <button
              onClick={() => setUrlInput(SAMPLE_PRESETS.trackingBloat)}
              className={cn(
                "px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all truncate",
                urlInput === SAMPLE_PRESETS.trackingBloat
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              Tracking Parameter Bloat
            </button>
            <button
              onClick={() => setUrlInput(SAMPLE_PRESETS.mixedCaseProtocol)}
              className={cn(
                "px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all truncate",
                urlInput === SAMPLE_PRESETS.mixedCaseProtocol
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              Mixed Case &amp; Protocol
            </button>
            <button
              onClick={() => setUrlInput(SAMPLE_PRESETS.cleanBenchmark)}
              className={cn(
                "px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all truncate",
                urlInput === SAMPLE_PRESETS.cleanBenchmark
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              Clean Canonical Benchmark
            </button>
          </div>
        </div>
      </div>

      {/* URL Input Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs space-y-3">
        <label
          htmlFor="canonical-url-input"
          className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"
        >
          <Search className="h-4 w-4 text-indigo-500" />
          Enter Webpage URL to Audit &amp; Normalize:
        </label>
        <div className="relative flex items-center">
          <input
            id="canonical-url-input"
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="e.g. https://example.com/blog/seo-guide/?utm_source=twitter"
            className="w-full pl-4 pr-10 py-3 text-sm font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          {urlInput && (
            <button
              onClick={() => setUrlInput("")}
              className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear input"
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Score & Health Status Overview Card */}
      {auditResult.isValidUrl && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Health Score Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Canonical Health Score
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={cn("text-3xl sm:text-4xl font-black", getScoreColor(auditResult.healthScore))}>
                  {auditResult.healthScore}
                </span>
                <span className="text-sm font-bold text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
              <ShieldCheck className={cn("h-7 w-7", getScoreColor(auditResult.healthScore))} />
            </div>
          </div>

          {/* Status Pill Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              SEO Duplication Status
            </span>
            <div className="mt-2">
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black border tracking-wide",
                  getStatusColor(auditResult.status)
                )}
              >
                {auditResult.status}
              </span>
            </div>
          </div>

          {/* Quick Findings Breakdown */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-xs flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Diagnostics Summary
            </span>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <XCircle className="h-3.5 w-3.5" />
                {auditResult.issues.filter((i) => i.severity === "critical").length} Critical
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                {auditResult.issues.filter((i) => i.severity === "warning").length} Warnings
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {auditResult.issues.filter((i) => i.severity === "pass").length} Passed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Itemized Diagnostic Findings */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            Diagnostic Findings &amp; Technical Recommendations
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {auditResult.issues.length} check{auditResult.issues.length === 1 ? "" : "s"} evaluated
          </span>
        </div>

        <div className="space-y-3">
          {auditResult.issues.map((issue: CanonicalIssue) => (
            <div
              key={issue.id}
              className={cn(
                "p-4 rounded-xl border transition-all space-y-2",
                issue.severity === "critical" &&
                  "border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20",
                issue.severity === "warning" &&
                  "border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20",
                issue.severity === "pass" &&
                  "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20",
                issue.severity === "info" &&
                  "border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {issue.severity === "critical" && (
                    <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                  {issue.severity === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  )}
                  {issue.severity === "pass" && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {issue.severity === "info" && (
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {issue.title}
                  </h4>
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0",
                    issue.severity === "critical" &&
                      "bg-rose-100 dark:bg-rose-900/80 text-rose-700 dark:text-rose-300",
                    issue.severity === "warning" &&
                      "bg-amber-100 dark:bg-amber-900/80 text-amber-700 dark:text-amber-300",
                    issue.severity === "pass" &&
                      "bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300",
                    issue.severity === "info" &&
                      "bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300"
                  )}
                >
                  {issue.severity}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 pl-6">
                {issue.description}
              </p>
              <div className="pl-6 pt-1 text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 font-medium">
                <ArrowRight className="h-3 w-3 shrink-0" />
                <span>Fix: {issue.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Query Parameter Bloat Analysis Card */}
      {auditResult.isValidUrl &&
        (auditResult.strippedParameters.length > 0 ||
          auditResult.retainedParameters.length > 0) && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
              Query Parameter Analysis &amp; Filter Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stripped Tracking Bloat */}
              <div className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5" />
                    Stripped Tracking Parameters ({auditResult.strippedParameters.length})
                  </span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400">
                    Excluded from canonical
                  </span>
                </div>
                {auditResult.strippedParameters.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No marketing tracking parameters detected.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {auditResult.strippedParameters.map((param, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200"
                      >
                        <span className="font-bold">{param.key}</span>
                        <span className="text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                          ={param.value}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Retained Functional Parameters */}
              <div className="rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Retained Functional Parameters ({auditResult.retainedParameters.length})
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400">
                    Content-altering
                  </span>
                </div>
                {auditResult.retainedParameters.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No additional functional query keys.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {auditResult.retainedParameters.map((param, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200"
                      >
                        <span className="font-bold">{param.key}</span>
                        <span className="text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                          ={param.value}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Generated Canonical Tag & Metadata Export */}
      {auditResult.isValidUrl && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="h-4 w-4 text-indigo-500" />
                Normalized Canonical Tag Output
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Production-ready canonical link tag and Next.js App Router metadata
              </p>
            </div>

            {/* Trailing Slash Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setPreferredSlashPolicy("no-slash")}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all",
                  preferredSlashPolicy === "no-slash"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                No Trailing Slash (/path)
              </button>
              <button
                onClick={() => setPreferredSlashPolicy("slash")}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all",
                  preferredSlashPolicy === "slash"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                Trailing Slash (/path/)
              </button>
            </div>
          </div>

          {/* HTML Link Tag Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                HTML &lt;head&gt; Canonical Tag
              </span>
              <button
                onClick={() => handleCopyText(activeHtmlTag, "html")}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 transition-colors"
              >
                {copiedKey === "html" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Tag</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800">
              <code>{activeHtmlTag}</code>
            </pre>
          </div>

          {/* Next.js App Router Metadata */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Next.js App Router Metadata Definition
              </span>
              <button
                onClick={() => handleCopyText(activeNextJsMetadata, "nextjs-meta")}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 transition-colors"
              >
                {copiedKey === "nextjs-meta" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Next.js Metadata</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800">
              <code>{activeNextJsMetadata}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Multi-Server Redirect Rule Generator Tabs */}
      {auditResult.isValidUrl && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Server className="h-4 w-4 text-indigo-500" />
                Server-Level 301 / 308 Redirect Rule Generator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enforce protocol HTTPS and canonical trailing slash policies at the edge
              </p>
            </div>

            {/* Server Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab("nextjs")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "nextjs"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                Next.js (308)
              </button>
              <button
                onClick={() => setActiveTab("nginx")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "nginx"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                Nginx (301)
              </button>
              <button
                onClick={() => setActiveTab("apache")}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === "apache"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                Apache (.htaccess)
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {activeTab === "nextjs" && "next.config.mjs"}
                {activeTab === "nginx" && "/etc/nginx/sites-available/default"}
                {activeTab === "apache" && ".htaccess (Apache Rewrite)"}
              </span>
              <button
                onClick={() => {
                  const code =
                    activeTab === "nextjs"
                      ? auditResult.codeSnippets.nextJsConfigRedirect
                      : activeTab === "nginx"
                      ? auditResult.codeSnippets.nginxRedirect
                      : auditResult.codeSnippets.apacheHtaccess;
                  handleCopyText(code, `server-${activeTab}`);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 transition-colors"
              >
                {copiedKey === `server-${activeTab}` ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
              <code>
                {activeTab === "nextjs" && auditResult.codeSnippets.nextJsConfigRedirect}
                {activeTab === "nginx" && auditResult.codeSnippets.nginxRedirect}
                {activeTab === "apache" && auditResult.codeSnippets.apacheHtaccess}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
