"use client";

import React, { useState, useMemo, useTransition } from "react";
import {
  Tag,
  Search,
  Filter,
  Layers,
  Sparkles,
  Copy,
  Check,
  Download,
  FileSpreadsheet,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Globe,
  Settings2,
  Trash2,
  Share2,
  BarChart3,
  HelpCircle,
  Link as LinkIcon,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { BulkToolLayout } from "@/components/bulk/BulkToolLayout";
import {
  generateUtmMatrix,
  UTM_PRESETS,
  SAMPLE_LANDING_URLS,
  UtmMatrixOptions,
  UtmPreset,
} from "@/lib/bulk/utm-matrix-engine";
import {
  downloadCsv,
  copyToClipboardAsTsv,
  formatGoogleSheetsHyperlink,
} from "@/lib/bulk/export-utils";
import { cn } from "@/lib/utils";

export function UtmMatrixView() {
  // Input parameters
  const [urlsInput, setUrlsInput] = useState<string>("");
  const [sourcesInput, setSourcesInput] = useState<string>("google, meta, tiktok, linkedin");
  const [mediumsInput, setMediumsInput] = useState<string>("cpc, paid_social");
  const [campaignsInput, setCampaignsInput] = useState<string>("growth_q4");
  const [termsInput, setTermsInput] = useState<string>("");
  const [contentsInput, setContentsInput] = useState<string>("hero_cta, footer_link");

  // Options
  const [forceLowercase, setForceLowercase] = useState<boolean>(true);
  const [spaceReplacement, setSpaceReplacement] = useState<"hyphen" | "underscore" | "none">("hyphen");
  const [stripExistingParams, setStripExistingParams] = useState<boolean>(false);

  // Table filtering & pagination
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [channelGroupFilter, setChannelGroupFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null);
  const [formulasCopied, setFormulasCopied] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const options: UtmMatrixOptions = useMemo(
    () => ({
      forceLowercase,
      spaceReplacement,
      stripExistingParams,
    }),
    [forceLowercase, spaceReplacement, stripExistingParams]
  );

  // Generate Matrix
  const matrixResult = useMemo(() => {
    return generateUtmMatrix(
      urlsInput,
      sourcesInput,
      mediumsInput,
      campaignsInput,
      termsInput,
      contentsInput,
      options
    );
  }, [urlsInput, sourcesInput, mediumsInput, campaignsInput, termsInput, contentsInput, options]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    if (!matrixResult.rows || matrixResult.rows.length === 0) return [];

    return matrixResult.rows.filter((row) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesUrl = row.finalUrl.toLowerCase().includes(q);
        const matchesSource = row.source.toLowerCase().includes(q);
        const matchesMedium = row.medium.toLowerCase().includes(q);
        const matchesCampaign = row.campaign.toLowerCase().includes(q);
        const matchesContent = row.content ? row.content.toLowerCase().includes(q) : false;
        const matchesTerm = row.term ? row.term.toLowerCase().includes(q) : false;

        if (!matchesUrl && !matchesSource && !matchesMedium && !matchesCampaign && !matchesContent && !matchesTerm) {
          return false;
        }
      }

      if (channelGroupFilter !== "all" && row.channelGroup !== channelGroupFilter) {
        return false;
      }

      return true;
    });
  }, [matrixResult.rows, searchQuery, channelGroupFilter]);

  // Paginated rows
  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    if (pageSize === -1) return filteredRows;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  // Load Preset
  const handleLoadPreset = (preset: UtmPreset) => {
    setSourcesInput(preset.sources);
    setMediumsInput(preset.mediums);
    setCampaignsInput(preset.campaign);
    setTermsInput(preset.term || "");
    setContentsInput(preset.content || "");
    if (!urlsInput) {
      setUrlsInput(SAMPLE_LANDING_URLS);
    }
  };

  // Export handlers
  const handleDownloadCsv = () => {
    const headers = [
      "Landing URL",
      "Full Tagged URL",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "GA4 Channel Group",
      "Is Valid URL",
    ];

    const rows = filteredRows.map((r) => [
      r.originalUrl,
      r.finalUrl,
      r.source,
      r.medium,
      r.campaign,
      r.content || "",
      r.term || "",
      r.channelGroup,
      r.isValidUrl ? "YES" : "NO",
    ]);

    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`utm-campaign-matrix-${timestamp}.csv`, headers, rows);
  };

  const handleCopyGoogleSheets = async () => {
    const headers = [
      "Landing URL",
      "Full Tagged URL",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "GA4 Channel Group",
    ];

    const rows = filteredRows.map((r) => [
      r.originalUrl,
      r.finalUrl,
      r.source,
      r.medium,
      r.campaign,
      r.content || "",
      r.term || "",
      r.channelGroup,
    ]);

    return await copyToClipboardAsTsv(headers, rows);
  };

  const handleCopyAsFormulas = async () => {
    const headers = [
      "Hyperlinked Campaign URL",
      "Raw Tagged URL",
      "Source",
      "Medium",
      "Campaign",
      "Content",
      "GA4 Channel Group",
    ];

    const rows = filteredRows.map((r) => [
      formatGoogleSheetsHyperlink(r.finalUrl, `${r.campaign} (${r.source}/${r.medium})`),
      r.finalUrl,
      r.source,
      r.medium,
      r.campaign,
      r.content || "",
      r.channelGroup,
    ]);

    const success = await copyToClipboardAsTsv(headers, rows);
    if (success) {
      setFormulasCopied(true);
      setTimeout(() => setFormulasCopied(false), 2000);
    }
  };

  const handleCopySingleUrl = (url: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedRowId(id);
      setTimeout(() => setCopiedRowId(null), 1500);
    }
  };

  const handleClearAll = () => {
    setUrlsInput("");
    setTermsInput("");
    setContentsInput("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Stats bar
  const statsBar = matrixResult.totalGenerated > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Generated URLs</span>
          <Tag className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {matrixResult.totalGenerated.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {matrixResult.baseUrlsCount} Landing URLs × {matrixResult.combinationsCount} Combos
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Base Landing URLs</span>
          <Globe className="h-3.5 w-3.5 text-indigo-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {matrixResult.baseUrlsCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">
          Multiplied across all channels
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>GA4 Channel Groups</span>
          <BarChart3 className="h-3.5 w-3.5 text-sky-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {Object.keys(matrixResult.channelGroups).length}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5 truncate">
          {Object.keys(matrixResult.channelGroups).join(", ") || "None"}
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Validity Status</span>
          <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {matrixResult.validCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {matrixResult.invalidCount > 0 ? (
            <span className="text-rose-500 font-medium">⚠️ {matrixResult.invalidCount} Invalid</span>
          ) : (
            "100% RFC Valid Syntax"
          )}
        </div>
      </div>
    </div>
  ) : null;

  // Extra action button for Formula Copy
  const formulaActionButton = (
    <button
      type="button"
      onClick={handleCopyAsFormulas}
      disabled={filteredRows.length === 0}
      className={cn(
        "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs",
        filteredRows.length === 0
          ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
          : formulasCopied
          ? "bg-emerald-600 text-white"
          : "bg-teal-600 hover:bg-teal-500 text-white active:scale-98"
      )}
      title="Copy as native Google Sheets / Excel =HYPERLINK() formulas"
    >
      {formulasCopied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Formulas Copied!</span>
        </>
      ) : (
        <>
          <FileSpreadsheet className="h-3.5 w-3.5" />
          <span>Copy as Formulas</span>
        </>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Preset Fast Loader Pills */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Quick Channel Presets</span>
          </span>
          <span className="text-[11px] text-slate-400">Click to auto-populate matrix parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {UTM_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadPreset(preset)}
              className="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {preset.name}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  {preset.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Bulk Layout Container for Base URLs */}
      <BulkToolLayout
        title="Bulk UTM Matrix Generator"
        description="Multiply landing URLs by multi-channel campaign parameters (Google Ads, Meta, TikTok, LinkedIn, Email) with automated case sanitization, GA4 channel group tagging, and 1-click Google Sheets TSV and =HYPERLINK() exports."
        badge="UTM Matrix ⚡"
        inputText={urlsInput}
        onInputChange={(val) => {
          startTransition(() => {
            setUrlsInput(val);
            setCurrentPage(1);
          });
        }}
        placeholder="Enter or paste base landing URLs (one per line, e.g. https://omniseotools.com/features)..."
        sampleData={SAMPLE_LANDING_URLS}
        sampleLabel="Load Sample URLs"
        rowCount={filteredRows.length}
        onClear={handleClearAll}
        onDownloadCsv={handleDownloadCsv}
        onCopyGoogleSheets={handleCopyGoogleSheets}
        actionButtons={formulaActionButton}
        statsBar={statsBar}
      >
        {/* Matrix Parameter Configuration Panel */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Matrix Parameter Configuration
              </h2>
            </div>
            <span className="text-xs text-slate-400">Separate multiple values with commas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* utm_source */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                utm_source <span className="text-emerald-600 font-semibold">(Comma-Separated)</span>
              </label>
              <input
                type="text"
                value={sourcesInput}
                onChange={(e) => setSourcesInput(e.target.value)}
                placeholder="google, meta, tiktok, linkedin"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-400">e.g. google, facebook, newsletter, bing</p>
            </div>

            {/* utm_medium */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                utm_medium <span className="text-emerald-600 font-semibold">(Comma-Separated)</span>
              </label>
              <input
                type="text"
                value={mediumsInput}
                onChange={(e) => setMediumsInput(e.target.value)}
                placeholder="cpc, paid_social, email, banner"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-400">e.g. cpc, paid_social, email, social_bio</p>
            </div>

            {/* utm_campaign */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                utm_campaign <span className="text-emerald-600 font-semibold">(Single or List)</span>
              </label>
              <input
                type="text"
                value={campaignsInput}
                onChange={(e) => setCampaignsInput(e.target.value)}
                placeholder="growth_q4, holiday_sale"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-slate-400">e.g. spring_promo, leadgen_2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* utm_content */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                utm_content <span className="text-slate-400 font-normal">(Optional Variants)</span>
              </label>
              <input
                type="text"
                value={contentsInput}
                onChange={(e) => setContentsInput(e.target.value)}
                placeholder="hero_cta, footer_link, v1_blue"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* utm_term */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                utm_term <span className="text-slate-400 font-normal">(Optional Keywords)</span>
              </label>
              <input
                type="text"
                value={termsInput}
                onChange={(e) => setTermsInput(e.target.value)}
                placeholder="seo-software, bulk-tools"
                className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Normalization & Formatting Options */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              {/* Lowercase Toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={forceLowercase}
                  onChange={(e) => setForceLowercase(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium">Force Lowercase</span>
              </label>

              {/* Space Replacement */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 dark:text-slate-400">Spaces:</span>
                <select
                  value={spaceReplacement}
                  onChange={(e) => setSpaceReplacement(e.target.value as any)}
                  className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium"
                >
                  <option value="hyphen">Replace with hyphen (-)</option>
                  <option value="underscore">Replace with underscore (_)</option>
                  <option value="none">Keep spaces as %20</option>
                </select>
              </div>

              {/* Strip Query Params */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={stripExistingParams}
                  onChange={(e) => setStripExistingParams(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium">Strip existing query params</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Table Section */}
        {matrixResult.totalGenerated > 0 && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Filter generated matrix by URL, channel, source, or campaign..."
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Channel Filter */}
                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={channelGroupFilter}
                    onChange={(e) => {
                      setChannelGroupFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <option value="all">GA4 Channel: All ({matrixResult.totalGenerated})</option>
                    {Object.entries(matrixResult.channelGroups).map(([group, count]) => (
                      <option key={group} value={group}>
                        {group} ({count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div>
                  Showing <strong className="text-slate-900 dark:text-white">{filteredRows.length.toLocaleString()}</strong> of{" "}
                  {matrixResult.totalGenerated.toLocaleString()} generated combinations
                </div>

                <div className="flex items-center gap-2">
                  <span>Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-semibold"
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={250}>250</option>
                    <option value={500}>500</option>
                    <option value={-1}>All ({filteredRows.length})</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Matrix Data Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 w-12 text-center">
                        #
                      </th>
                      <th scope="col" className="py-3.5 px-4">
                        Generated Campaign URL
                      </th>
                      <th scope="col" className="py-3.5 px-3 whitespace-nowrap">
                        Source
                      </th>
                      <th scope="col" className="py-3.5 px-3 whitespace-nowrap">
                        Medium
                      </th>
                      <th scope="col" className="py-3.5 px-3 whitespace-nowrap hidden sm:table-cell">
                        Campaign
                      </th>
                      <th scope="col" className="py-3.5 px-3 whitespace-nowrap hidden md:table-cell">
                        GA4 Channel Group
                      </th>
                      <th scope="col" className="py-3.5 px-4 text-right w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
                    {paginatedRows.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400 font-sans">
                          No URL combinations matching the search query.
                        </td>
                      </tr>
                    ) : (
                      paginatedRows.map((row, index) => {
                        const absoluteIndex =
                          pageSize === -1 ? index + 1 : (currentPage - 1) * pageSize + index + 1;

                        return (
                          <tr
                            key={row.id}
                            className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="py-3 px-4 text-center text-[11px] text-slate-400 font-mono">
                              {absoluteIndex}
                            </td>

                            {/* Final Tagged URL */}
                            <td className="py-3 px-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl truncate">
                              <div className="flex items-center gap-2">
                                <LinkIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <a
                                  href={row.finalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline truncate text-xs"
                                  title={row.finalUrl}
                                >
                                  {row.finalUrl}
                                </a>
                              </div>
                              <div className="text-[10px] text-slate-400 font-sans truncate mt-0.5 pl-5">
                                Base: {row.originalUrl}
                              </div>
                            </td>

                            {/* Source */}
                            <td className="py-3 px-3 whitespace-nowrap font-semibold text-slate-900 dark:text-slate-100">
                              {row.source || <span className="text-slate-300 dark:text-slate-600">—</span>}
                            </td>

                            {/* Medium */}
                            <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-600 dark:text-slate-400">
                              {row.medium || <span className="text-slate-300 dark:text-slate-600">—</span>}
                            </td>

                            {/* Campaign */}
                            <td className="py-3 px-3 whitespace-nowrap hidden sm:table-cell text-slate-600 dark:text-slate-400">
                              {row.campaign || <span className="text-slate-300 dark:text-slate-600">—</span>}
                            </td>

                            {/* GA4 Channel Group */}
                            <td className="py-3 px-3 whitespace-nowrap hidden md:table-cell font-sans">
                              <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                {row.channelGroup}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1 font-sans">
                                <button
                                  type="button"
                                  onClick={() => handleCopySingleUrl(row.finalUrl, row.id)}
                                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="Copy tagged URL"
                                >
                                  {copiedRowId === row.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                                <a
                                  href={row.finalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="Open tagged URL in new tab"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pageSize !== -1 && totalPages > 1 && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of{" "}
                    <strong className="text-slate-900 dark:text-white">{totalPages}</strong> (
                    {filteredRows.length.toLocaleString()} combinations)
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1 px-2 font-mono font-semibold">
                      <span>{currentPage}</span>
                      <span>/</span>
                      <span>{totalPages}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </BulkToolLayout>
    </div>
  );
}
