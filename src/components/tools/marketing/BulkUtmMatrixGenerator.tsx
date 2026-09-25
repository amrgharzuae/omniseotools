"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Trash2,
  Layers,
  Table as TableIcon,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Globe,
  Tag,
  Share2,
  ArrowRight,
  HelpCircle,
  CheckSquare,
  Square,
  Zap,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChannelPreset,
  DEFAULT_CHANNEL_PRESETS,
  MatrixSanitizeOptions,
  MatrixRow,
  SAMPLE_BASE_URLS,
  generateUtmMatrix,
  generateCsvExport,
  generateRawUrlsList,
} from "@/lib/bulk-utm-matrix";

interface BulkUtmMatrixGeneratorProps {
  toolSlug?: string;
  toolName?: string;
}

const DEFAULT_SAMPLE_TEXT = SAMPLE_BASE_URLS.join("\n");

export function BulkUtmMatrixGenerator({
  toolSlug = "bulk-utm-matrix-generator",
  toolName = "Bulk UTM Matrix & Multi-Channel Tagging Generator",
}: BulkUtmMatrixGeneratorProps) {
  // Input State
  const [urlInput, setUrlInput] = useState<string>(DEFAULT_SAMPLE_TEXT);
  const [campaign, setCampaign] = useState<string>("summer_launch_2026");
  const [term, setTerm] = useState<string>("seo_audit");
  const [content, setContent] = useState<string>("hero_cta");

  // Selected Channels
  const [selectedChannelIds, setSelectedChannelIds] = useState<string[]>(
    DEFAULT_CHANNEL_PRESETS.map((c) => c.id)
  );

  // Sanitization Options
  const [options, setOptions] = useState<MatrixSanitizeOptions>({
    forceLowercase: true,
    replaceSpacesWithHyphens: true,
    stripExistingUtm: true,
    encodeQueryParams: true,
  });

  // UI View Tabs
  const [activeTab, setActiveTab] = useState<"table" | "raw" | "csv">("table");
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null);

  // Active channel presets list
  const activeChannels = useMemo(() => {
    return DEFAULT_CHANNEL_PRESETS.filter((c) =>
      selectedChannelIds.includes(c.id)
    );
  }, [selectedChannelIds]);

  // Compute Matrix Result
  const matrixResult = useMemo(() => {
    return generateUtmMatrix(
      urlInput,
      activeChannels,
      campaign,
      term,
      content,
      options
    );
  }, [urlInput, activeChannels, campaign, term, content, options]);

  // Raw URLs Output
  const rawOutput = useMemo(() => {
    return generateRawUrlsList(matrixResult.rows);
  }, [matrixResult.rows]);

  // CSV Output
  const csvContent = useMemo(() => {
    return generateCsvExport(matrixResult.rows);
  }, [matrixResult.rows]);

  // Toggle Single Channel Selection
  const toggleChannel = (channelId: string) => {
    setSelectedChannelIds((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    );
  };

  // Select All / Deselect All Channels
  const handleSelectAllChannels = () => {
    setSelectedChannelIds(DEFAULT_CHANNEL_PRESETS.map((c) => c.id));
  };

  const handleDeselectAllChannels = () => {
    setSelectedChannelIds([]);
  };

  // Load Sample URLs
  const handleLoadSample = () => {
    setUrlInput(DEFAULT_SAMPLE_TEXT);
    setCampaign("summer_launch_2026");
    setTerm("seo_audit");
    setContent("hero_cta");
    handleSelectAllChannels();
  };

  // Clear Form
  const handleClearAll = () => {
    setUrlInput("");
    setCampaign("");
    setTerm("");
    setContent("");
  };

  // Copy All URLs to Clipboard
  const handleCopyAll = useCallback(() => {
    if (!rawOutput) return;
    navigator.clipboard.writeText(rawOutput);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }, [rawOutput]);

  // Copy Single Row URL
  const handleCopySingle = (row: MatrixRow) => {
    if (!row.fullUrl) return;
    navigator.clipboard.writeText(row.fullUrl);
    setCopiedRowId(row.id);
    setTimeout(() => setCopiedRowId(null), 2000);
  };

  // Download CSV
  const handleDownloadCsv = () => {
    if (!csvContent || matrixResult.rows.length === 0) return;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const filename = `utm-matrix-${campaign || "campaign"}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download TXT
  const handleDownloadTxt = () => {
    if (!rawOutput || matrixResult.rows.length === 0) return;
    const blob = new Blob([rawOutput], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    const filename = `utm-urls-${campaign || "campaign"}-${new Date()
      .toISOString()
      .slice(0, 10)}.txt`;
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isFormReady =
    matrixResult.totalBaseUrls > 0 &&
    matrixResult.totalChannels > 0 &&
    Boolean(campaign.trim());

  return (
    <div className="space-y-8">
      {/* HEADER / CROSS-PROMO STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Need to build a single URL with instant QR code preview? Use our{" "}
            <Link
              href="/tools/marketing/utm-campaign-builder"
              className="font-bold underline hover:text-emerald-900 dark:hover:text-emerald-200 inline-flex items-center gap-0.5"
            >
              Single UTM Campaign Builder
              <ArrowRight className="h-3 w-3" />
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Load Sample Data</span>
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-semibold transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* WORKBENCH TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Destination URLs Input Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-600" />
                <label
                  htmlFor="base-urls-input"
                  className="text-sm font-bold text-slate-900 dark:text-white"
                >
                  Destination Landing URLs
                </label>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                {matrixResult.totalBaseUrls} URL{matrixResult.totalBaseUrls === 1 ? "" : "s"}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste one URL per line (e.g., landing pages, product catalogs, or blog posts up to 50 URLs).
            </p>

            <textarea
              id="base-urls-input"
              rows={5}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={`https://yourdomain.com/landing-page\nhttps://yourdomain.com/pricing\nhttps://yourdomain.com/blog/guide`}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-xs font-mono text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none transition-colors leading-relaxed resize-y"
            />
          </div>

          {/* 2. Global Campaign Parameters */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Global Campaign Tagging
                </span>
              </div>
              <span className="text-[11px] text-rose-500 font-semibold">*Required</span>
            </div>

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="campaign-name"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1"
                >
                  <span>
                    Campaign Name <strong className="text-rose-500">*</strong>
                  </span>
                  <code className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    utm_campaign
                  </code>
                </label>
                <input
                  id="campaign-name"
                  type="text"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  placeholder="summer_launch_2026"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label
                    htmlFor="campaign-term"
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1"
                  >
                    <span>Term (Keywords)</span>
                    <code className="text-[10px] font-mono text-slate-400">utm_term</code>
                  </label>
                  <input
                    id="campaign-term"
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="e.g. running_shoes"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="campaign-content"
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1"
                  >
                    <span>Content (Variant)</span>
                    <code className="text-[10px] font-mono text-slate-400">utm_content</code>
                  </label>
                  <input
                    id="campaign-content"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="e.g. hero_btn_green"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Multi-Channel Presets Selection */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Target Channels ({selectedChannelIds.length}/{DEFAULT_CHANNEL_PRESETS.length})
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleSelectAllChannels}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleDeselectAllChannels}
                  className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {DEFAULT_CHANNEL_PRESETS.map((channel) => {
                const isChecked = selectedChannelIds.includes(channel.id);
                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => toggleChannel(channel.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer group",
                      isChecked
                        ? "border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-xs ring-1 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-5 w-5 rounded-md flex items-center justify-center border transition-colors",
                          isChecked
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        )}
                      >
                        {isChecked && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {channel.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          <span>
                            source: <strong className="text-emerald-600 dark:text-emerald-400">{channel.source}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            medium: <strong className="text-emerald-600 dark:text-emerald-400">{channel.medium}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {channel.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Sanitization & Normalization Toggles */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Sanitization &amp; Normalization
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> GA4 Standardized
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Force Lowercase Parameters
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Prevents duplicate split rows in GA4 reporting tables.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.forceLowercase}
                  onChange={(e) =>
                    setOptions({ ...options, forceLowercase: e.target.checked })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Replace Spaces with Hyphens
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Eliminates messy %20 URL-encoding in parameter strings.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.replaceSpacesWithHyphens}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      replaceSpacesWithHyphens: e.target.checked,
                    })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Strip Existing UTM Parameters
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Cleans pasted links to prevent double UTM query collisions.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.stripExistingUtm}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      stripExistingUtm: e.target.checked,
                    })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-colors">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Encode Query Parameters
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Safely encodes special symbols with standard URI encoding.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.encodeQueryParams}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      encodeQueryParams: e.target.checked,
                    })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output Matrix, Metrics & Action Bar (7 cols) */}
        <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
          {/* Live Summary Bar Card */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Generated UTM Matrix
                </h2>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("table")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all",
                    activeTab === "table"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <TableIcon className="h-3.5 w-3.5" />
                  <span>Table View</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("raw")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all",
                    activeTab === "raw"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Raw Text</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("csv")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all",
                    activeTab === "csv"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                  )}
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>CSV Data</span>
                </button>
              </div>
            </div>

            {/* Matrix Metrics Ticker */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Base URLs
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {matrixResult.totalBaseUrls}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Active Channels
                </div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {matrixResult.totalChannels}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/30">
                <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                  Total Tagged URLs
                </div>
                <div className="text-lg font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
                  {matrixResult.totalGenerated}
                </div>
              </div>
            </div>

            {/* Validation Notice if Empty */}
            {!isFormReady && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>
                  Please provide at least 1 Base URL, select at least 1 channel, and enter a Campaign Name to generate your matrix.
                </span>
              </div>
            )}

            {/* TAB VIEW 1: Interactive Table View */}
            {activeTab === "table" && (
              <div className="space-y-4">
                <div className="overflow-x-auto max-h-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 font-bold sticky top-0 z-10">
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="p-3">#</th>
                        <th className="p-3">Channel</th>
                        <th className="p-3">Source / Medium</th>
                        <th className="p-3">Generated Full URL</th>
                        <th className="p-3 text-right">Copy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                      {matrixResult.rows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-8 text-center text-slate-400 text-xs"
                          >
                            No matrix rows generated yet. Paste URLs on the left.
                          </td>
                        </tr>
                      ) : (
                        matrixResult.rows.map((row, idx) => {
                          const isRowCopied = copiedRowId === row.id;
                          return (
                            <tr
                              key={row.id}
                              className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors"
                            >
                              <td className="p-3 font-mono text-[11px] text-slate-400">
                                {idx + 1}
                              </td>
                              <td className="p-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]">
                                  {row.channelName}
                                </span>
                              </td>
                              <td className="p-3 font-mono text-[11px] text-slate-600 dark:text-slate-300 whitespace-nowrap">
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                  {row.source}
                                </span>{" "}
                                /{" "}
                                <span className="text-blue-600 dark:text-blue-400">
                                  {row.medium}
                                </span>
                              </td>
                              <td className="p-3 font-mono text-[11px] text-slate-700 dark:text-slate-300 max-w-xs truncate select-all">
                                {row.fullUrl}
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleCopySingle(row)}
                                  className={cn(
                                    "p-1.5 rounded-lg border transition-all cursor-pointer",
                                    isRowCopied
                                      ? "bg-emerald-600 border-emerald-600 text-white"
                                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                                  )}
                                  title="Copy single UTM URL"
                                >
                                  {isRowCopied ? (
                                    <Check className="h-3.5 w-3.5" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB VIEW 2: Raw Text Monospace Area */}
            {activeTab === "raw" && (
              <div className="space-y-2">
                <textarea
                  readOnly
                  rows={10}
                  value={rawOutput}
                  placeholder="Generated URLs will appear here..."
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-emerald-400 leading-relaxed select-all resize-y"
                />
              </div>
            )}

            {/* TAB VIEW 3: CSV Data Preview */}
            {activeTab === "csv" && (
              <div className="space-y-2">
                <textarea
                  readOnly
                  rows={10}
                  value={csvContent}
                  placeholder="CSV data preview..."
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 leading-relaxed select-all resize-y"
                />
              </div>
            )}

            {/* Action Triggers Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyAll}
                disabled={matrixResult.rows.length === 0}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all shadow-xs cursor-pointer",
                  copiedAll
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {copiedAll ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied All ({matrixResult.totalGenerated})!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy All URLs</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadCsv}
                disabled={matrixResult.rows.length === 0}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Download CSV</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadTxt}
                disabled={matrixResult.rows.length === 0}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Export TXT</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXPLANATORY & SEO CRAWLABLE SECTION                                       */}
      {/* ========================================================================= */}
      <section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 text-slate-600 dark:text-slate-400 space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Why Use a Bulk UTM Matrix Generator for Multi-Channel Campaigns?
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Manually tagging individual URLs for every distribution channel is slow, error-prone, and leads to fragmented analytics. When launching a product across Google Search Ads, Meta feeds, TikTok videos, LinkedIn sponsored posts, and email newsletters, our client-side <strong>Bulk UTM Matrix Generator</strong> computes the full Cartesian product matrix of landing pages and marketing channels in milliseconds.
          </p>
          <p className="text-sm leading-relaxed">
            Need to build single URLs with live QR code previews or inspect individual query parameters? Explore our companion utility:{" "}
            <Link
              href="/tools/marketing/utm-campaign-builder"
              className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              UTM Campaign Builder &amp; URL Tracker (Tool #22)
            </Link>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Zap className="h-4 w-4" />
              <h3 className="font-bold text-slate-950 dark:text-slate-100 text-sm">
                Cartesian Matrix Multiplication
              </h3>
            </div>
            <p className="text-xs leading-relaxed">
              Paste up to 50 URLs and select 6 advertising channels to generate 300 perfectly sanitized, ready-to-use UTM links simultaneously.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <ShieldCheck className="h-4 w-4" />
              <h3 className="font-bold text-slate-950 dark:text-slate-100 text-sm">
                100% Client-Side Privacy
              </h3>
            </div>
            <p className="text-xs leading-relaxed">
              Unlike cloud-hosted SaaS tools, your unpublished landing page URLs, proprietary ad naming formulas, and target keywords never leave your browser.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <FileSpreadsheet className="h-4 w-4" />
              <h3 className="font-bold text-slate-950 dark:text-slate-100 text-sm">
                Google Ads Editor CSV Export
              </h3>
            </div>
            <p className="text-xs leading-relaxed">
              Export cleanly formatted spreadsheets with discrete columns for Source, Medium, Campaign, Term, and Content ready for agency spreadsheets and bulk uploads.
            </p>
          </div>
        </div>

        {/* Technical Guidance Matrix */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="h-4 w-4 text-emerald-600" />
            <span>GA4 Default Channel Grouping Matrix for Matrix Tagging</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Google Analytics 4 uses strict rule-based logic to categorize incoming traffic into Default Channel Groups. Non-standard medium tags cause traffic to be dumped into &quot;Unassigned&quot;.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold">
                <tr>
                  <th className="p-2.5">Marketing Channel</th>
                  <th className="p-2.5">Required utm_source</th>
                  <th className="p-2.5">Required utm_medium</th>
                  <th className="p-2.5">GA4 Default Channel Group</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-2.5 font-medium text-slate-900 dark:text-white">Google Search Ads</td>
                  <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">google</td>
                  <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">cpc</td>
                  <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Paid Search</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-900 dark:text-white">Meta / Facebook Ads</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">facebook</td>
                  <td className="p-2.5 font-mono text-blue-600 dark:text-blue-400">paid_social</td>
                  <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Paid Social</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-900 dark:text-white">TikTok Ads</td>
                  <td className="p-2.5 font-mono text-purple-600 dark:text-purple-400">tiktok</td>
                  <td className="p-2.5 font-mono text-purple-600 dark:text-purple-400">paid_social</td>
                  <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Paid Social</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-900 dark:text-white">Email Newsletter</td>
                  <td className="p-2.5 font-mono text-amber-600 dark:text-amber-400">newsletter</td>
                  <td className="p-2.5 font-mono text-amber-600 dark:text-amber-400">email</td>
                  <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">Email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
