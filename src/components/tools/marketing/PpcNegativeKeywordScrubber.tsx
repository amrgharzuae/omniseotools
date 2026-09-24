"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Copy,
  Check,
  Download,
  Trash2,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Filter,
  FileText,
  Layers,
  ArrowRight,
  Settings2,
  Table,
  HelpCircle,
  Hash,
  ListOrdered,
  Type,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PpcMatchType,
  ScrubOptions,
  scrubKeywords,
  generateGoogleAdsEditorCsv,
  PPC_PRESET_LISTS,
  formatKeywordMatchType,
  getGoogleAdsCriterionType,
} from "@/lib/ppc-keyword-scrubber";

interface PpcNegativeKeywordScrubberProps {
  toolSlug: string;
  toolName: string;
}

const DEFAULT_SAMPLE_KEYWORDS = `free download
cheap online courses
torrent cracked software
job vacancies salary
login portal
wholesale suppliers
return policy details
sample templates free
how to fix @broken% link!
[exact match test]
"phrase match with quotes"
super long keyword query that exceeds google advertising platform limit of ten words in a single negative keyword phrase
diy home tutorial`;

export function PpcNegativeKeywordScrubber({
  toolSlug,
  toolName,
}: PpcNegativeKeywordScrubberProps) {
  const [rawInput, setRawInput] = useState<string>(DEFAULT_SAMPLE_KEYWORDS);
  const [matchType, setMatchType] = useState<PpcMatchType>("negative_phrase");
  const [activeTab, setActiveTab] = useState<"output" | "all_matches" | "csv_preview">("output");
  const [campaignName, setCampaignName] = useState<string>("All Search Campaigns");
  const [adGroupName, setAdGroupName] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  // Scrubbing Options State
  const [options, setOptions] = useState<ScrubOptions>({
    removeDuplicates: true,
    lowercase: true,
    trimWhitespace: true,
    stripIllegalChars: true,
    stripPunctuationQuotes: true,
    sortAlphabetical: false,
    removeNumbers: false,
  });

  // Execute pure client-side scrubbing
  const scrubResult = useMemo(() => {
    return scrubKeywords(rawInput, matchType, options);
  }, [rawInput, matchType, options]);

  const outputText = useMemo(() => {
    return scrubResult.outputLines.join("\n");
  }, [scrubResult]);

  const csvContent = useMemo(() => {
    return generateGoogleAdsEditorCsv(scrubResult.items, campaignName, adGroupName);
  }, [scrubResult.items, campaignName, adGroupName]);

  // Handle Preset Loading
  const handleLoadPreset = (presetKey: keyof typeof PPC_PRESET_LISTS) => {
    const list = PPC_PRESET_LISTS[presetKey];
    if (list) {
      setRawInput(list.keywords.join("\n"));
    }
  };

  // Copy Formatted List
  const handleCopy = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [outputText]);

  // Copy CSV Content
  const handleCopyCsv = useCallback(() => {
    if (!csvContent) return;
    navigator.clipboard.writeText(csvContent);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  }, [csvContent]);

  // Download TXT
  const handleDownloadTxt = useCallback(() => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ppc-keywords-${matchType}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [outputText, matchType]);

  // Download CSV
  const handleDownloadCsv = useCallback(() => {
    if (!csvContent) return;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `google-ads-editor-negatives.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [csvContent]);

  const MATCH_TYPE_OPTIONS: Array<{
    id: PpcMatchType;
    label: string;
    syntax: string;
    example: string;
    isNegative: boolean;
  }> = [
    {
      id: "negative_phrase",
      label: "Negative Phrase",
      syntax: '-\"keyword\"',
      example: '-\"running shoes\"',
      isNegative: true,
    },
    {
      id: "negative_exact",
      label: "Negative Exact",
      syntax: "-[keyword]",
      example: "-[running shoes]",
      isNegative: true,
    },
    {
      id: "negative_broad",
      label: "Negative Broad",
      syntax: "-keyword",
      example: "-running shoes",
      isNegative: true,
    },
    {
      id: "phrase",
      label: "Phrase Match",
      syntax: '\"keyword\"',
      example: '\"running shoes\"',
      isNegative: false,
    },
    {
      id: "exact",
      label: "Exact Match",
      syntax: "[keyword]",
      example: "[running shoes]",
      isNegative: false,
    },
    {
      id: "broad",
      label: "Broad Match",
      syntax: "keyword",
      example: "running shoes",
      isNegative: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Preset Quick Loader Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>Load Curated Negative Packs:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleLoadPreset("ecommerce")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              🛒 E-Commerce (22)
            </button>
            <button
              onClick={() => handleLoadPreset("b2bSaaS")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              💼 B2B SaaS (21)
            </button>
            <button
              onClick={() => handleLoadPreset("careers")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              👔 Job Seekers (17)
            </button>
            <button
              onClick={() => handleLoadPreset("informational")}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              📚 Non-Buyer / Info (13)
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

      {/* Main Dual-Column Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Input & Configuration (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Raw Input Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-emerald-500" />
                <span>Raw Keywords List</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {scrubResult.metrics.originalCount} items pasted
              </span>
            </div>

            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Paste raw keywords here (one per line or comma-separated)..."
              rows={9}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3.5 font-mono text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Supports copy-paste directly from Google Sheets, Excel, Search Terms reports, or CSV files.
            </p>
          </div>

          {/* Match Type Selector Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-500" />
              <span>Target PPC Match Type</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MATCH_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMatchType(opt.id)}
                  className={cn(
                    "flex flex-col items-start p-2.5 rounded-xl border text-left transition-all",
                    matchType === opt.id
                      ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 ring-1 ring-emerald-500 text-emerald-900 dark:text-emerald-200"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold">{opt.label}</span>
                    {opt.isNegative && (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 font-bold">
                        NEG
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                    {opt.syntax}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scrubbing & Sanitization Rules */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Settings2 className="h-4 w-4 text-emerald-500" />
              <span>Sanitization &amp; Scrubbing Rules</span>
            </label>

            <div className="space-y-2.5 pt-1">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.removeDuplicates}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, removeDuplicates: e.target.checked }))
                    }
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Remove Duplicate Keywords
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Dedupe
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.lowercase}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, lowercase: e.target.checked }))
                    }
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
                    checked={options.stripIllegalChars}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, stripIllegalChars: e.target.checked }))
                    }
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                      Strip Google Ads Illegal Characters
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      Purges @, %, *, ^, ~, +, =, &lt;, &gt;, !, ?, ;, :, |
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Clean Ads
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.stripPunctuationQuotes}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        stripPunctuationQuotes: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Strip Stray Quotes, Commas &amp; Brackets
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  [ ] &quot; ,
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.trimWhitespace}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, trimWhitespace: e.target.checked }))
                    }
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Trim &amp; Collapse Multiple Spaces
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  trim
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.sortAlphabetical}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, sortAlphabetical: e.target.checked }))
                    }
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Sort Alphabetically (A → Z)
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  A-Z
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.removeNumbers}
                    onChange={(e) =>
                      setOptions((prev) => ({ ...prev, removeNumbers: e.target.checked }))
                    }
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Remove Numbers &amp; Digits
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  0-9
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Metrics Dashboard & Formatted Output (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Metric 1: Cleaned Count */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Cleaned Output
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {scrubResult.metrics.cleanedCount}
                </span>
                <span className="text-xs text-slate-400">
                  / {scrubResult.metrics.originalCount} raw
                </span>
              </div>
            </div>

            {/* Metric 2: Duplicates Removed */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Duplicates Purged
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {scrubResult.metrics.duplicatesRemoved}
                </span>
                <span className="text-xs text-slate-400">removed</span>
              </div>
            </div>

            {/* Metric 3: Illegal Chars Purged */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Illegal Symbols Stripped
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  {scrubResult.metrics.illegalCharsPurged}
                </span>
                <span className="text-xs text-slate-400">chars</span>
              </div>
            </div>

            {/* Metric 4: Average Word Count */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                Avg Word Length
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {scrubResult.metrics.avgWordCount}
                </span>
                <span className="text-xs text-slate-400">words/term</span>
              </div>
            </div>

            {/* Metric 5: Google Ads Limit Alert */}
            <div
              className={cn(
                "rounded-2xl border p-4 shadow-sm col-span-2 sm:col-span-2 transition-all",
                scrubResult.metrics.exceedsGoogleLimitCount > 0
                  ? "border-amber-300 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/40"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                  Google Ads Limits (Max 10 Words / 80 Chars)
                </span>
                {scrubResult.metrics.exceedsGoogleLimitCount > 0 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {scrubResult.metrics.exceedsGoogleLimitCount} Over Limit
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    100% Compliant
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {scrubResult.metrics.exceedsGoogleLimitCount > 0
                  ? "Some keywords exceed Google Ads upload thresholds and may fail editor import."
                  : "All negative keywords meet Google Ads & Microsoft Ads technical length limits."}
              </p>
            </div>
          </div>

          {/* Over-Limit Warnings Alert Box */}
          {scrubResult.metrics.exceedsGoogleLimitCount > 0 && (
            <div className="rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/90 dark:bg-amber-950/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Google Ads Length Warning Details:</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {scrubResult.items
                  .filter((item) => item.isOverLimit)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-mono bg-white/80 dark:bg-slate-900/80 p-2 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-2"
                    >
                      <span className="truncate text-slate-800 dark:text-slate-200">
                        {item.cleaned}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 shrink-0">
                        {item.warning}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Output Display Card & Tabs */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden space-y-0">
            {/* View Tabs & Actions Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-4 py-3">
              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("output")}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    activeTab === "output"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Formatted Output
                </button>
                <button
                  onClick={() => setActiveTab("all_matches")}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    activeTab === "all_matches"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  All Match Types
                </button>
                <button
                  onClick={() => setActiveTab("csv_preview")}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    activeTab === "csv_preview"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Google Ads CSV
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {activeTab === "csv_preview" ? (
                  <>
                    <button
                      onClick={handleCopyCsv}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
                    >
                      {copiedCsv ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedCsv ? "Copied CSV!" : "Copy CSV"}</span>
                    </button>
                    <button
                      onClick={handleDownloadCsv}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download .CSV</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? "Copied!" : "Copy List"}</span>
                    </button>
                    <button
                      onClick={handleDownloadTxt}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download .TXT</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* TAB 1: Formatted Output View with Line Numbers */}
            {activeTab === "output" && (
              <div className="relative">
                {scrubResult.items.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-xs">
                    No keywords to display. Paste raw keywords on the left to format your list.
                  </div>
                ) : (
                  <div className="flex bg-slate-950 text-slate-100 font-mono text-xs max-h-[460px] overflow-y-auto">
                    {/* Line numbers gutter */}
                    <div className="select-none py-3.5 px-3 bg-slate-900/80 text-slate-600 text-right font-mono text-[11px] border-r border-slate-800">
                      {scrubResult.items.map((_, i) => (
                        <div key={i} className="leading-6">
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Code lines */}
                    <div className="flex-1 py-3.5 px-4 overflow-x-auto leading-6">
                      {scrubResult.items.map((item, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "flex items-center justify-between group hover:bg-slate-800/40 px-1 rounded",
                            item.isOverLimit && "text-amber-300 font-semibold"
                          )}
                        >
                          <span>{item.formatted}</span>
                          {item.isOverLimit && (
                            <span className="text-[10px] text-amber-400 font-sans opacity-80">
                              ⚠️ &gt;10 words
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: All Match Types Multi-Grid */}
            {activeTab === "all_matches" && (
              <div className="p-4 max-h-[460px] overflow-y-auto space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 font-semibold">
                        <th className="py-2.5 px-3">Cleaned Term</th>
                        <th className="py-2.5 px-3">Negative Phrase</th>
                        <th className="py-2.5 px-3">Negative Exact</th>
                        <th className="py-2.5 px-3">Standard Phrase</th>
                        <th className="py-2.5 px-3">Standard Exact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                      {scrubResult.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          <td className="py-2 px-3 text-slate-900 dark:text-white font-medium">
                            {item.cleaned}
                          </td>
                          <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400">
                            {formatKeywordMatchType(item.cleaned, "negative_phrase")}
                          </td>
                          <td className="py-2 px-3 text-blue-600 dark:text-blue-400">
                            {formatKeywordMatchType(item.cleaned, "negative_exact")}
                          </td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-300">
                            {formatKeywordMatchType(item.cleaned, "phrase")}
                          </td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-300">
                            {formatKeywordMatchType(item.cleaned, "exact")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Google Ads Editor CSV Preview & Config */}
            {activeTab === "csv_preview" && (
              <div className="p-4 space-y-4">
                {/* CSV Parameters Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Target Campaign Name
                    </label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g. All Search Campaigns or (Shared List)"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Ad Group Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={adGroupName}
                      onChange={(e) => setAdGroupName(e.target.value)}
                      placeholder="Leave blank for Campaign-level negative list"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* CSV Raw Textarea */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold">
                      Google Ads Editor Bulk Import CSV Content:
                    </span>
                    <span className="font-mono text-[11px]">
                      Criterion: {getGoogleAdsCriterionType(matchType)}
                    </span>
                  </div>
                  <textarea
                    readOnly
                    value={csvContent}
                    rows={10}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-400 focus:outline-none resize-y"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
