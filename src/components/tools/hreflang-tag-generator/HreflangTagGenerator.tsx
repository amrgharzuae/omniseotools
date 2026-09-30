"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Globe,
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Info,
  Code2,
  FileCode,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  ShieldCheck,
  Languages,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import {
  HreflangRow,
  HREFLANG_PRESETS,
  ISO_LANGUAGES,
  ISO_COUNTRIES,
  getHreflangCode,
  validateHreflangMatrix,
  generateHreflangSnippets,
} from "@/lib/hreflang-engine";

interface HreflangTagGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  initialPresetId?: string;
}

type CodeTab = "html" | "sitemap" | "nextjs" | "headers";

export function HreflangTagGenerator({
  toolSlug = "hreflang-tag-generator",
  toolName = "Hreflang & i18n Matrix Generator",
  initialPresetId = "global-ecommerce",
}: HreflangTagGeneratorProps) {
  // Initial rows from preset
  const defaultRows: HreflangRow[] = useMemo(() => {
    const preset = HREFLANG_PRESETS.find((p) => p.id === initialPresetId) || HREFLANG_PRESETS[0];
    return preset.rows.map((r, idx) => ({
      ...r,
      id: `row-${idx + 1}-${Date.now()}`,
    }));
  }, [initialPresetId]);

  const [rows, setRows] = useState<HreflangRow[]>(defaultRows);
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("html");
  const [copied, setCopied] = useState<boolean>(false);

  // Real-time validation findings
  const findings = useMemo(() => {
    return validateHreflangMatrix(rows);
  }, [rows]);

  const errorCount = findings.filter((f) => f.type === "error").length;
  const warningCount = findings.filter((f) => f.type === "warning").length;
  const isValid = errorCount === 0;

  // Generated Snippets
  const snippets = useMemo(() => {
    return generateHreflangSnippets(rows);
  }, [rows]);

  // Overall Health Score
  const healthScore = useMemo(() => {
    let score = 100;
    score -= errorCount * 30;
    score -= warningCount * 10;
    if (rows.length < 2) score -= 20;
    return Math.max(10, Math.min(100, score));
  }, [errorCount, warningCount, rows.length]);

  // Row Manipulation Handlers
  const handleAddRow = useCallback(() => {
    const newId = `row-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setRows((prev) => [
      ...prev,
      {
        id: newId,
        url: "https://example.com/new-locale/",
        language: "en",
        region: "",
        isDefault: false,
      },
    ]);
  }, []);

  const handleRemoveRow = useCallback((id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const handleUpdateRow = useCallback(
    (id: string, updates: Partial<HreflangRow>) => {
      setRows((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          const updated = { ...r, ...updates };
          return updated;
        })
      );
    },
    []
  );

  const handleToggleDefault = useCallback((id: string) => {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        isDefault: r.id === id ? !r.isDefault : false,
      }))
    );
  }, []);

  const handleApplyPreset = useCallback((presetId: string) => {
    const preset = HREFLANG_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setRows(
        preset.rows.map((r, idx) => ({
          ...r,
          id: `preset-${presetId}-${idx}-${Date.now()}`,
        }))
      );
    }
  }, []);

  const handleResetDefaults = useCallback(() => {
    const preset = HREFLANG_PRESETS[0];
    setRows(
      preset.rows.map((r, idx) => ({
        ...r,
        id: `reset-${idx}-${Date.now()}`,
      }))
    );
  }, []);

  const handleCopyCode = useCallback(() => {
    let codeToCopy = snippets.htmlHeadSnippet;
    if (activeCodeTab === "sitemap") codeToCopy = snippets.xmlSitemapSnippet;
    if (activeCodeTab === "nextjs") codeToCopy = snippets.nextjsSnippet;
    if (activeCodeTab === "headers") codeToCopy = snippets.httpHeaderSnippet;

    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeCodeTab, snippets]);

  const handleDownloadFile = useCallback(() => {
    let content = snippets.htmlHeadSnippet;
    let filename = "hreflang-tags.html";
    let mime = "text/html";

    if (activeCodeTab === "sitemap") {
      content = snippets.xmlSitemapSnippet;
      filename = "sitemap-hreflang.xml";
      mime = "application/xml";
    } else if (activeCodeTab === "nextjs") {
      content = snippets.nextjsSnippet;
      filename = "metadata-alternates.ts";
      mime = "text/plain";
    } else if (activeCodeTab === "headers") {
      content = snippets.httpHeaderSnippet;
      filename = "link-headers.txt";
      mime = "text/plain";
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [activeCodeTab, snippets]);

  return (
    <div className="space-y-6 w-full">
      {/* Top Hero Banner */}
      <div className="rounded-3xl border border-teal-500/30 bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-inner">
              <Globe className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Hreflang &amp; i18n Matrix Cluster Generator
                </h2>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                    healthScore >= 90
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : healthScore >= 70
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  )}
                >
                  Cluster Health: {healthScore}/100
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Construct reciprocal hreflang clusters, validate ISO 639-1 / ISO 3166-1 syntax, and export multi-framework annotations with zero telemetry.
              </p>
            </div>
          </div>

          {/* Quick Strategy Presets */}
          <div className="flex flex-wrap items-center gap-1.5 self-start lg:self-auto">
            {HREFLANG_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/30 text-xs font-medium text-slate-300 hover:text-rose-200 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>

            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="Hreflang Valid"
              status={isValid ? "Pass" : "Warning"}
              score={healthScore}
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Matrix Area */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Language &amp; Regional Target Matrix ({rows.length} URL Variants)
            </h3>
          </div>
          <button
            type="button"
            onClick={handleAddRow}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Locale Variant</span>
          </button>
        </div>

        {/* Dynamic Matrix Rows */}
        <div className="space-y-3.5">
          {rows.map((row, index) => {
            const computedCode = getHreflangCode(row);
            const isRowValid = !findings.some(
              (f) => f.type === "error" && f.affectedRowIds?.includes(row.id)
            );

            return (
              <div
                key={row.id}
                className={cn(
                  "p-3.5 sm:p-4 rounded-2xl border transition-all space-y-3",
                  row.isDefault
                    ? "bg-teal-50/40 dark:bg-teal-950/20 border-teal-500/40"
                    : isRowValid
                    ? "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                    : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-400/50"
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  {/* Row index & Code Badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                      {index + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold border border-teal-500/20">
                      {computedCode}
                    </span>
                  </div>

                  {/* URL Input */}
                  <div className="flex-1">
                    <input
                      type="url"
                      value={row.url}
                      onChange={(e) => handleUpdateRow(row.id, { url: e.target.value })}
                      placeholder="https://example.com/locale-path/"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Language Selector */}
                  <div className="w-full sm:w-44 shrink-0">
                    <select
                      value={row.language}
                      disabled={row.isDefault}
                      onChange={(e) => handleUpdateRow(row.id, { language: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {ISO_LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.code.toUpperCase()} — {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Country Selector */}
                  <div className="w-full sm:w-52 shrink-0">
                    <select
                      value={row.region}
                      disabled={row.isDefault}
                      onChange={(e) => handleUpdateRow(row.id, { region: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {ISO_COUNTRIES.map((ctry) => (
                        <option key={ctry.code} value={ctry.code}>
                          {ctry.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* x-default toggle & delete button */}
                  <div className="flex items-center gap-2 shrink-0 justify-between lg:justify-start">
                    <button
                      type="button"
                      onClick={() => handleToggleDefault(row.id)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all",
                        row.isDefault
                          ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                          : "bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-teal-500"
                      )}
                      title="Set as x-default fallback for unmatched searchers"
                    >
                      {row.isDefault ? "x-default (Active)" : "Set x-default"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.id)}
                      disabled={rows.length <= 1}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Remove locale variant"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Diagnostics & Findings Alert Box */}
      <div className="space-y-3">
        {findings.map((f) => {
          const isErr = f.type === "error";
          const isWarn = f.type === "warning";
          return (
            <div
              key={f.id}
              className={cn(
                "p-4 rounded-2xl border flex items-start gap-3 transition-all",
                isErr
                  ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/60 text-rose-900 dark:text-rose-200"
                  : isWarn
                  ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-900/60 text-amber-900 dark:text-amber-200"
                  : "bg-teal-50/70 dark:bg-teal-950/30 border-teal-300 dark:border-teal-900/60 text-teal-900 dark:text-teal-200"
              )}
            >
              {isErr ? (
                <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              ) : isWarn ? (
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5 text-xs sm:text-sm">
                <p className="font-bold">{f.title}</p>
                <p className="opacity-90 leading-relaxed">{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Target Code Exporter Tabs */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Generated Hreflang Integration Snippets
            </h3>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setActiveCodeTab("html")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCodeTab === "html"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              HTML &lt;head&gt;
            </button>
            <button
              type="button"
              onClick={() => setActiveCodeTab("sitemap")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCodeTab === "sitemap"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              XML Sitemap
            </button>
            <button
              type="button"
              onClick={() => setActiveCodeTab("nextjs")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCodeTab === "nextjs"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              Next.js Metadata
            </button>
            <button
              type="button"
              onClick={() => setActiveCodeTab("headers")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCodeTab === "headers"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              HTTP Link Header
            </button>
          </div>
        </div>

        {/* Code Content Box */}
        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 sm:p-5 font-mono text-xs text-slate-100 overflow-hidden">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2.5 mb-3">
            <span className="font-semibold text-teal-400">
              {activeCodeTab === "html" && "HTML5 Document <head> Tags"}
              {activeCodeTab === "sitemap" && "sitemap.xml with xhtml:link namespace"}
              {activeCodeTab === "nextjs" && "app/[locale]/page.tsx Metadata Alternates"}
              {activeCodeTab === "headers" && "RFC 5988 HTTP Response Header (Nginx / Cloudflare)"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadFile}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600/80 hover:bg-teal-600 text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <pre className="overflow-x-auto whitespace-pre leading-relaxed text-slate-200 py-1">
            {activeCodeTab === "html" && snippets.htmlHeadSnippet}
            {activeCodeTab === "sitemap" && snippets.xmlSitemapSnippet}
            {activeCodeTab === "nextjs" && snippets.nextjsSnippet}
            {activeCodeTab === "headers" && snippets.httpHeaderSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
