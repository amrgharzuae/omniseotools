"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Copy,
  Check,
  Download,
  Trash2,
  Sparkles,
  Layers,
  FileText,
  Settings2,
  Table,
  Link2,
  Code2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Hash,
  ArrowRight,
  Globe,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SlugSeparator,
  SlugOutputMode,
  SlugSanitizerOptions,
  processBulkSlugs,
  generateSlugExportCsv,
  SLUG_PRESET_PACKS,
} from "@/lib/url-slug-sanitizer";

interface UrlSlugSanitizerProps {
  toolSlug: string;
  toolName: string;
}

const DEFAULT_SAMPLE_HEADLINES = `10 Proven Ways to Improve Your Technical SEO in 2026!
Men's Waterproof Trail Running Shoes (Size 10) - $89.99
What is Hreflang? A Beginner's Complete Guide & Cheat Sheet
Café & Crème Brûlée: Recette Traditionnelle Française
How to Fix 308 Permanent Redirect Loops in Next.js App Router
100% Organic Cotton Crewneck T-Shirt / Summer Edition
Ultra HD 4K Smart OLED TV (55-Inch) - 2026 Edition & Wall Mount
The Ultimate Guide to Google Analytics 4 (GA4) UTM Campaign Tracking`;

export function UrlSlugSanitizer({ toolSlug, toolName }: UrlSlugSanitizerProps) {
  const [rawInput, setRawInput] = useState<string>(DEFAULT_SAMPLE_HEADLINES);
  const [outputMode, setOutputMode] = useState<SlugOutputMode | "comparison">("slug");
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  // Options State
  const [separator, setSeparator] = useState<SlugSeparator>("-");
  const [stripStopWords, setStripStopWords] = useState<boolean>(true);
  const [normalizeDiacritics, setNormalizeDiacritics] = useState<boolean>(true);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [stripSpecialChars, setStripSpecialChars] = useState<boolean>(true);
  const [stripFileExtensions, setStripFileExtensions] = useState<boolean>(false);
  const [maxCharLength, setMaxCharLength] = useState<number>(60);
  const [baseDomainPrefix, setBaseDomainPrefix] = useState<string>("/blog/");

  const options: SlugSanitizerOptions = useMemo(
    () => ({
      separator,
      stripStopWords,
      normalizeDiacritics,
      lowercase,
      stripSpecialChars,
      stripFileExtensions,
      maxCharLength,
      baseDomainPrefix,
    }),
    [
      separator,
      stripStopWords,
      normalizeDiacritics,
      lowercase,
      stripSpecialChars,
      stripFileExtensions,
      maxCharLength,
      baseDomainPrefix,
    ]
  );

  // Process slugs with pure client-side engine
  const result = useMemo(() => {
    const effectiveMode = outputMode === "comparison" ? "slug" : outputMode;
    return processBulkSlugs(rawInput, effectiveMode, options);
  }, [rawInput, outputMode, options]);

  const activeOutputText = useMemo(() => {
    return result.outputLines.join("\n");
  }, [result.outputLines]);

  const csvContent = useMemo(() => {
    return generateSlugExportCsv(result.items);
  }, [result.items]);

  // Load Preset
  const handleLoadPreset = (presetKey: keyof typeof SLUG_PRESET_PACKS) => {
    const pack = SLUG_PRESET_PACKS[presetKey];
    if (pack) {
      setRawInput(pack.titles.join("\n"));
    }
  };

  // Copy List
  const handleCopy = useCallback(() => {
    if (!activeOutputText) return;
    navigator.clipboard.writeText(activeOutputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeOutputText]);

  // Copy CSV
  const handleCopyCsv = useCallback(() => {
    if (!csvContent) return;
    navigator.clipboard.writeText(csvContent);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  }, [csvContent]);

  // Download TXT
  const handleDownloadTxt = useCallback(() => {
    if (!activeOutputText) return;
    const blob = new Blob([activeOutputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sanitized-slugs-${outputMode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeOutputText, outputMode]);

  // Download CSV
  const handleDownloadCsv = useCallback(() => {
    if (!csvContent) return;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sanitized-slugs-export.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [csvContent]);

  const SEPARATOR_OPTIONS: Array<{ value: SlugSeparator; label: string; desc: string }> = [
    { value: "-", label: "Hyphen (-)", desc: "Google Recommended" },
    { value: "_", label: "Underscore (_)", desc: "Legacy Format" },
    { value: "/", label: "Slash (/)", desc: "Subfolder Path" },
    { value: ".", label: "Dot (.)", desc: "File Style" },
  ];

  const OUTPUT_MODE_TABS: Array<{
    id: SlugOutputMode | "comparison";
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "slug", label: "Clean Slugs", icon: Link2 },
    { id: "full_url", label: "Full URL Paths", icon: Globe },
    { id: "markdown", label: "Markdown Links", icon: FileText },
    { id: "html", label: "HTML Anchor Tags", icon: Code2 },
    { id: "comparison", label: "Multi-Grid Table", icon: Table },
  ];

  return (
    <div className="space-y-8">
      {/* Preset Quick Loader Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>Load Curated Sample Packs:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleLoadPreset("ecommerce")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              🛒 E-Commerce Products (7)
            </button>
            <button
              onClick={() => handleLoadPreset("blog")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              📝 Blog &amp; SEO Headlines (7)
            </button>
            <button
              onClick={() => handleLoadPreset("international")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              🌍 Accents &amp; Diacritics (6)
            </button>
            <button
              onClick={() => setRawInput("")}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors inline-flex items-center gap-1"
              title="Clear Input Textarea"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Input & Configuration (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Raw Input Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-emerald-500" />
                <span>Raw Titles &amp; Headlines</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {result.metrics.totalCount} lines
              </span>
            </div>

            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Paste article titles, product names, or headlines here (one per line)..."
              rows={8}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3.5 font-mono text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y"
            />
          </div>

          {/* Slug Separator Selection */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-emerald-500" />
              <span>Slug Word Separator</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {SEPARATOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSeparator(opt.value)}
                  className={cn(
                    "flex flex-col items-start p-2.5 rounded-xl border text-left transition-all",
                    separator === opt.value
                      ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 ring-1 ring-emerald-500 text-emerald-900 dark:text-emerald-200"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  )}
                >
                  <span className="text-xs font-bold">{opt.label}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sanitization & Formatting Rules */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Settings2 className="h-4 w-4 text-emerald-500" />
              <span>Sanitization &amp; SEO Rules</span>
            </label>

            <div className="space-y-2.5 pt-1">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={stripStopWords}
                    onChange={(e) => setStripStopWords(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                      Remove English Stop Words
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Filters &apos;the&apos;, &apos;and&apos;, &apos;for&apos;, &apos;in&apos;, &apos;of&apos;, &apos;with&apos;, etc.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  SEO Clean
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={normalizeDiacritics}
                    onChange={(e) => setNormalizeDiacritics(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                      Transliterate Accents &amp; Diacritics
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Converts é → e, ü → ue, ñ → n, ß → ss, æ → ae
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  ASCII Safe
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={lowercase}
                    onChange={(e) => setLowercase(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Lowercase Normalization
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  lowercase
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={stripSpecialChars}
                    onChange={(e) => setStripSpecialChars(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Strip Special Characters &amp; Punctuation
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  ! @ # $ %
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={stripFileExtensions}
                    onChange={(e) => setStripFileExtensions(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Strip File Extensions (.html, .php, .pdf)
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  .html
                </span>
              </label>
            </div>

            {/* Max Length Cap Slider / Input */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Sliders className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Max Character Length (Word-Safe)</span>
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {maxCharLength > 0 ? `${maxCharLength} chars` : "Unlimited"}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="5"
                value={maxCharLength}
                onChange={(e) => setMaxCharLength(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 (Unlimited)</span>
                <span>40 (Short)</span>
                <span>60 (SEO Ideal)</span>
                <span>120 (Max)</span>
              </div>
            </div>

            {/* Base Domain Prefix Input */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                Base Path / Domain Prefix (for Full URLs &amp; Links):
              </label>
              <input
                type="text"
                value={baseDomainPrefix}
                onChange={(e) => setBaseDomainPrefix(e.target.value)}
                placeholder="e.g., https://example.com/blog/ or /products/"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Metrics & Formatted Output (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Metric 1: Total Slugs */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Processed Slugs
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {result.metrics.totalCount}
                </span>
                <span className="text-xs text-slate-400">items</span>
              </div>
            </div>

            {/* Metric 2: Average Slug Length */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Avg Slug Length
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span
                  className={cn(
                    "text-2xl font-extrabold",
                    result.metrics.avgSlugLength <= 60
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-500"
                  )}
                >
                  {result.metrics.avgSlugLength}
                </span>
                <span className="text-xs text-slate-400">chars</span>
              </div>
            </div>

            {/* Metric 3: Stop Words Removed */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Stop Words Purged
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  {result.metrics.totalStopWordsRemoved}
                </span>
                <span className="text-xs text-slate-400">words</span>
              </div>
            </div>

            {/* Metric 4: Special Chars Stripped */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Symbols Stripped
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                  {result.metrics.totalSpecialCharsRemoved}
                </span>
                <span className="text-xs text-slate-400">symbols</span>
              </div>
            </div>
          </div>

          {/* Formatted Output Container Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden space-y-0">
            {/* View Tabs & Actions Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-4 py-3">
              {/* Output Mode Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl">
                {OUTPUT_MODE_TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setOutputMode(tab.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                        outputMode === tab.id
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Output"}</span>
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>.TXT</span>
                </button>
                <button
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>.CSV</span>
                </button>
              </div>
            </div>

            {/* Output View Body */}
            {outputMode === "comparison" ? (
              /* TAB 5: Comparison Table */
              <div className="p-4 max-h-[460px] overflow-y-auto">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 font-semibold">
                        <th className="py-2.5 px-3">Original Title</th>
                        <th className="py-2.5 px-3">Clean Slug</th>
                        <th className="py-2.5 px-3">Length</th>
                        <th className="py-2.5 px-3">Markdown Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {result.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          <td className="py-2 px-3 text-slate-800 dark:text-slate-200 max-w-[200px] truncate">
                            {item.original}
                          </td>
                          <td className="py-2 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {item.slug}
                          </td>
                          <td className="py-2 px-3 font-mono text-[11px] text-slate-400">
                            {item.slugCharLength} ch
                          </td>
                          <td className="py-2 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-300 max-w-[220px] truncate">
                            {item.markdown}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* TABS 1-4: Monospace Line-Numbered View */
              <div className="relative">
                {result.items.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-xs">
                    No items to display. Paste titles on the left to sanitize your slugs.
                  </div>
                ) : (
                  <div className="flex bg-slate-950 text-slate-100 font-mono text-xs max-h-[460px] overflow-y-auto">
                    {/* Line numbers gutter */}
                    <div className="select-none py-3.5 px-3 bg-slate-900/80 text-slate-600 text-right font-mono text-[11px] border-r border-slate-800">
                      {result.items.map((_, i) => (
                        <div key={i} className="leading-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Output lines */}
                    <div className="flex-1 py-3.5 px-4 overflow-x-auto leading-6">
                      {result.items.map((item, idx) => {
                        let text = "";
                        if (outputMode === "slug") text = item.slug;
                        else if (outputMode === "full_url") text = item.fullUrl;
                        else if (outputMode === "markdown") text = item.markdown;
                        else if (outputMode === "html") text = item.html;

                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between group hover:bg-slate-800/40 px-1 rounded gap-4"
                          >
                            <span className="truncate text-emerald-400">{text}</span>
                            <span className="text-[10px] text-slate-500 font-sans shrink-0">
                              {text.length} ch
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
