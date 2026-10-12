"use client";

import React, { useState, useMemo, useTransition } from "react";
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Download,
  FileSpreadsheet,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Globe,
  SlidersHorizontal,
  FileText,
  Sparkles,
  Link as LinkIcon,
  Layers,
  ArrowRight,
  Filter,
  CheckCheck,
  ShieldCheck,
  RotateCcw,
  Zap,
} from "lucide-react";
import { BulkToolLayout } from "@/components/bulk/BulkToolLayout";
import {
  auditAndCleanUrlsBulk,
  SAMPLE_URLS_TO_CLEAN,
  UrlCleanerOptions,
  DEFAULT_CLEANER_OPTIONS,
  CleanedUrlRow,
  UrlAuditStatus,
} from "@/lib/bulk/url-sanitizer";
import {
  downloadCsv,
  copyToClipboardAsTsv,
  formatGoogleSheetsHyperlink,
} from "@/lib/bulk/export-utils";
import { cn } from "@/lib/utils";

export function UrlCleanerAuditView() {
  const [urlsInput, setUrlsInput] = useState<string>("");

  // Cleaning options
  const [stripTrackingParams, setStripTrackingParams] = useState<boolean>(true);
  const [forceLowercasePath, setForceLowercasePath] = useState<boolean>(true);
  const [trailingSlashMode, setTrailingSlashMode] = useState<"strip" | "enforce" | "preserve">("strip");
  const [stripHashFragment, setStripHashFragment] = useState<boolean>(true);
  const [sortQueryParams, setSortQueryParams] = useState<boolean>(true);
  const [flagUppercase, setFlagUppercase] = useState<boolean>(true);
  const [flagNonAscii, setFlagNonAscii] = useState<boolean>(true);
  const [flagPunycode, setFlagPunycode] = useState<boolean>(true);
  const [forceHttps, setForceHttps] = useState<boolean>(false);
  const [stripAllParams, setStripAllParams] = useState<boolean>(false);

  // Table filtering & pagination
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | UrlAuditStatus>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null);
  const [cleanUrlsCopied, setCleanUrlsCopied] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const options: UrlCleanerOptions = useMemo(
    () => ({
      stripTrackingParams,
      stripAllParams,
      forceLowercasePath,
      trailingSlashMode,
      stripHashFragment,
      sortQueryParams,
      flagUppercase,
      flagNonAscii,
      flagPunycode,
      encodeNonAscii: true,
      forceHttps,
    }),
    [
      stripTrackingParams,
      stripAllParams,
      forceLowercasePath,
      trailingSlashMode,
      stripHashFragment,
      sortQueryParams,
      flagUppercase,
      flagNonAscii,
      flagPunycode,
      forceHttps,
    ]
  );

  // Batch process
  const auditResult = useMemo(() => {
    return auditAndCleanUrlsBulk(urlsInput, options);
  }, [urlsInput, options]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    if (!auditResult.rows || auditResult.rows.length === 0) return [];

    return auditResult.rows.filter((row) => {
      // Status filter
      if (statusFilter !== "all" && row.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesOriginal = row.originalUrl.toLowerCase().includes(q);
        const matchesCleaned = row.cleanedUrl.toLowerCase().includes(q);
        const matchesIssues = row.issues.some((i) => i.toLowerCase().includes(q));

        if (!matchesOriginal && !matchesCleaned && !matchesIssues) {
          return false;
        }
      }

      return true;
    });
  }, [auditResult.rows, statusFilter, searchQuery]);

  // Paginated rows
  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    if (pageSize === -1) return filteredRows;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  // Export handlers
  const handleDownloadCsv = () => {
    const headers = [
      "Original URL",
      "Cleaned Canonical URL",
      "Audit Status",
      "Issues Detected",
      "Protocol",
      "Hostname",
      "Pathname",
      "Query String",
    ];

    const rows = filteredRows.map((r) => [
      r.originalUrl,
      r.cleanedUrl,
      r.status.toUpperCase(),
      r.issues.join(" | "),
      r.protocol.toUpperCase(),
      r.hostname,
      r.pathname,
      r.search,
    ]);

    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`cleaned-canonical-urls-${timestamp}.csv`, headers, rows);
  };

  const handleCopyGoogleSheets = async () => {
    const headers = [
      "Hyperlinked Clean URL",
      "Cleaned Canonical URL",
      "Original URL",
      "Audit Status",
      "Issues Detected",
      "Hostname",
    ];

    const rows = filteredRows.map((r) => [
      formatGoogleSheetsHyperlink(r.cleanedUrl),
      r.cleanedUrl,
      r.originalUrl,
      r.status.toUpperCase(),
      r.issues.join(" | "),
      r.hostname,
    ]);

    return await copyToClipboardAsTsv(headers, rows);
  };

  const handleCopyOnlyCleanedUrls = async () => {
    if (filteredRows.length === 0 || typeof window === "undefined" || !navigator.clipboard) return;

    const cleanUrlsList = filteredRows.map((r) => r.cleanedUrl).join("\n");
    await navigator.clipboard.writeText(cleanUrlsList);
    setCleanUrlsCopied(true);
    setTimeout(() => setCleanUrlsCopied(false), 2000);
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
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Stats bar
  const statsBar = auditResult.totalCount > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Total Processed</span>
          <Globe className="h-3.5 w-3.5 text-indigo-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {auditResult.totalCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          100% evaluated in local memory
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Modified &amp; Cleaned</span>
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">
          {auditResult.modifiedCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5">
          {Math.round((auditResult.modifiedCount / (auditResult.totalCount || 1)) * 100)}% required canonical fixes
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Already Canonical</span>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
          {auditResult.cleanCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">
          100% clean &amp; unaltered
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Invalid Syntax</span>
          <XCircle className="h-3.5 w-3.5 text-rose-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">
          {auditResult.invalidCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {auditResult.invalidCount > 0 ? "Malformed URL formatting" : "0 syntax errors"}
        </div>
      </div>
    </div>
  ) : null;

  // Extra action button for "Copy Cleaned URLs Only"
  const copyCleanedOnlyButton = (
    <button
      type="button"
      onClick={handleCopyOnlyCleanedUrls}
      disabled={filteredRows.length === 0}
      className={cn(
        "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs",
        filteredRows.length === 0
          ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
          : cleanUrlsCopied
          ? "bg-emerald-600 text-white"
          : "bg-emerald-700 hover:bg-emerald-600 text-white active:scale-98"
      )}
      title="Copy only the clean destination URLs list (newline separated)"
    >
      {cleanUrlsCopied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Clean URLs Copied!</span>
        </>
      ) : (
        <>
          <CheckCheck className="h-3.5 w-3.5" />
          <span>Copy Cleaned URLs</span>
        </>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <BulkToolLayout
        title="Bulk URL Cleaner & Canonical Auditor"
        description="Clean marketing tracking parameters (utm_*, fbclid, gclid), enforce lowercase paths, resolve trailing slash inconsistencies, strip anchor fragments, and detect Punycode domains in bulk across up to 10,000 URLs with 100% in-browser privacy."
        badge="URL Cleaner ⚡"
        inputText={urlsInput}
        onInputChange={(val) => {
          startTransition(() => {
            setUrlsInput(val);
            setCurrentPage(1);
          });
        }}
        placeholder="Paste your raw URL inventory here (one URL per line, up to 10,000 items)..."
        sampleData={SAMPLE_URLS_TO_CLEAN}
        sampleLabel="Load Sample Dirty URLs"
        rowCount={filteredRows.length}
        onClear={handleClearAll}
        onDownloadCsv={handleDownloadCsv}
        onCopyGoogleSheets={handleCopyGoogleSheets}
        actionButtons={copyCleanedOnlyButton}
        statsBar={statsBar}
      >
        {/* Cleaning & Audit Configuration Toggles */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Cleaning &amp; Canonicalization Rules
              </h2>
            </div>
            <span className="text-xs text-slate-400">Rules applied in real-time</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Strip Tracking Params */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={stripTrackingParams}
                onChange={(e) => setStripTrackingParams(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Strip Tracking Parameters
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Removes utm_*, fbclid, gclid, msclkid, ttclid, igshid, ref
                </span>
              </div>
            </label>

            {/* Force Lowercase Path */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={forceLowercasePath}
                onChange={(e) => setForceLowercasePath(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Force Lowercase Path
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Fixes /Products/Shoes to /products/shoes
                </span>
              </div>
            </label>

            {/* Trailing Slash Mode */}
            <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white block">
                Trailing Slash Normalization
              </span>
              <select
                value={trailingSlashMode}
                onChange={(e) => setTrailingSlashMode(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
              >
                <option value="strip">Strip Trailing Slash (/page/ → /page)</option>
                <option value="enforce">Enforce Trailing Slash (/page → /page/)</option>
                <option value="preserve">Keep Trailing Slash As-Is</option>
              </select>
            </div>

            {/* Strip Hash Fragment */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={stripHashFragment}
                onChange={(e) => setStripHashFragment(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Strip Hash Fragments
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Removes on-page anchor tags (#comments, #faq)
                </span>
              </div>
            </label>

            {/* Sort Query Params */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={sortQueryParams}
                onChange={(e) => setSortQueryParams(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Sort Query Parameters
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Alphabetizes parameters to avoid duplicate cache keys
                </span>
              </div>
            </label>

            {/* Flag Punycode & Non-ASCII */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={flagPunycode && flagNonAscii}
                onChange={(e) => {
                  setFlagPunycode(e.target.checked);
                  setFlagNonAscii(e.target.checked);
                }}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Audit Punycode &amp; Unicode
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Flags xn-- domains and non-ASCII character paths
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Results Section */}
        {auditResult.totalCount > 0 && (
          <div className="space-y-4">
            {/* Filter Tabs & Search */}
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
                    placeholder="Search by URL keyword, domain, or detected issue..."
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

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("all");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all",
                      statusFilter === "all"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    All ({auditResult.totalCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("modified");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1",
                      statusFilter === "modified"
                        ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Modified ({auditResult.modifiedCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("invalid");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1",
                      statusFilter === "invalid"
                        ? "bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 shadow-xs font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Invalid ({auditResult.invalidCount})</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div>
                  Showing <strong className="text-slate-900 dark:text-white">{filteredRows.length.toLocaleString()}</strong> of{" "}
                  {auditResult.totalCount.toLocaleString()} URLs
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

            {/* Audit Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 w-12 text-center">
                        #
                      </th>
                      <th scope="col" className="py-3.5 px-4 w-28">
                        Audit Status
                      </th>
                      <th scope="col" className="py-3.5 px-4">
                        Original vs Cleaned Canonical URL
                      </th>
                      <th scope="col" className="py-3.5 px-4 hidden lg:table-cell">
                        Audit Issues &amp; Fixes
                      </th>
                      <th scope="col" className="py-3.5 px-4 text-right w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
                    {paginatedRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400 font-sans">
                          No URLs matching the selected filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedRows.map((row, index) => {
                        const absoluteIndex =
                          pageSize === -1 ? index + 1 : (currentPage - 1) * pageSize + index + 1;

                        return (
                          <tr
                            key={row.id}
                            className={cn(
                              "hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors",
                              row.status === "invalid" && "bg-rose-50/30 dark:bg-rose-950/20"
                            )}
                          >
                            <td className="py-3 px-4 text-center text-[11px] text-slate-400 font-mono">
                              {absoluteIndex}
                            </td>

                            {/* Status Badge */}
                            <td className="py-3 px-4 whitespace-nowrap font-sans">
                              {row.status === "clean" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                  <CheckCircle2 className="h-3 w-3" />
                                  <span>Clean</span>
                                </span>
                              )}
                              {row.status === "modified" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                  <AlertTriangle className="h-3 w-3" />
                                  <span>Modified</span>
                                </span>
                              )}
                              {row.status === "invalid" && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                  <XCircle className="h-3 w-3" />
                                  <span>Invalid</span>
                                </span>
                              )}
                            </td>

                            {/* URL Comparison */}
                            <td className="py-3 px-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl truncate">
                              {/* Cleaned URL */}
                              <div className="flex items-center gap-2">
                                <LinkIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <a
                                  href={row.cleanedUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-900 dark:text-slate-100 font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline truncate text-xs"
                                  title={row.cleanedUrl}
                                >
                                  {row.cleanedUrl}
                                </a>
                              </div>

                              {/* Original URL if modified */}
                              {row.status === "modified" && (
                                <div className="text-[10px] text-slate-400 line-through truncate mt-0.5 pl-5">
                                  Original: {row.originalUrl}
                                </div>
                              )}
                            </td>

                            {/* Issues & Actions */}
                            <td className="py-3 px-4 hidden lg:table-cell font-sans">
                              <div className="flex flex-wrap gap-1">
                                {row.issues.map((issue, i) => (
                                  <span
                                    key={i}
                                    className={cn(
                                      "px-2 py-0.5 rounded-md text-[10px] font-medium",
                                      row.status === "clean"
                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                        : row.status === "modified"
                                        ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                                        : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60"
                                    )}
                                  >
                                    {issue}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1 font-sans">
                                <button
                                  type="button"
                                  onClick={() => handleCopySingleUrl(row.cleanedUrl, row.id)}
                                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="Copy clean URL"
                                >
                                  {copiedRowId === row.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                                <a
                                  href={row.cleanedUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="Open in new tab"
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
                    {filteredRows.length.toLocaleString()} items)
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
