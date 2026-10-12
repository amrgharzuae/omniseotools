"use client";

import React, { useState, useMemo, useTransition } from "react";
import {
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
  Eye,
  Type,
  AlignLeft,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { BulkToolLayout } from "@/components/bulk/BulkToolLayout";
import {
  inspectMetaTagsBulk,
  SAMPLE_META_TABULAR,
  SAMPLE_META_HTML,
  MetaInspectorOptions,
  DEFAULT_INSPECTOR_OPTIONS,
  MetaInspectorEntry,
  EntryAuditStatus,
} from "@/lib/bulk/meta-batch-inspector";
import {
  downloadCsv,
  copyToClipboardAsTsv,
  formatGoogleSheetsHyperlink,
} from "@/lib/bulk/export-utils";
import { cn } from "@/lib/utils";

export function MetaBatchCheckView() {
  const [inputText, setInputText] = useState<string>("");

  // Configurable thresholds
  const [titleMinChars, setTitleMinChars] = useState<number>(DEFAULT_INSPECTOR_OPTIONS.titleMinChars);
  const [titleMaxChars, setTitleMaxChars] = useState<number>(DEFAULT_INSPECTOR_OPTIONS.titleMaxChars);
  const [descMinChars, setDescMinChars] = useState<number>(DEFAULT_INSPECTOR_OPTIONS.descMinChars);
  const [descMaxChars, setDescMaxChars] = useState<number>(DEFAULT_INSPECTOR_OPTIONS.descMaxChars);

  // Table filtering & pagination
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | EntryAuditStatus>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [expandedPreviewId, setExpandedPreviewId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const options: MetaInspectorOptions = useMemo(
    () => ({
      titleMinChars,
      titleMaxChars,
      descMinChars,
      descMaxChars,
    }),
    [titleMinChars, titleMaxChars, descMinChars, descMaxChars]
  );

  // Evaluate batch
  const auditResult = useMemo(() => {
    return inspectMetaTagsBulk(inputText, options);
  }, [inputText, options]);

  // Filtered rows
  const filteredEntries = useMemo(() => {
    if (!auditResult.entries || auditResult.entries.length === 0) return [];

    return auditResult.entries.filter((entry) => {
      if (statusFilter !== "all" && entry.status !== statusFilter) {
        return false;
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = entry.title.toLowerCase().includes(q);
        const matchesDesc = entry.description.toLowerCase().includes(q);
        const matchesUrl = entry.url ? entry.url.toLowerCase().includes(q) : false;
        const matchesH1 = entry.h1 ? entry.h1.toLowerCase().includes(q) : false;
        const matchesIssues = entry.issues.some((i) => i.toLowerCase().includes(q));

        if (!matchesTitle && !matchesDesc && !matchesUrl && !matchesH1 && !matchesIssues) {
          return false;
        }
      }

      return true;
    });
  }, [auditResult.entries, statusFilter, searchQuery]);

  // Paginated rows
  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredEntries.length / pageSize) || 1;
  const paginatedEntries = useMemo(() => {
    if (pageSize === -1) return filteredEntries;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredEntries.slice(startIndex, startIndex + pageSize);
  }, [filteredEntries, currentPage, pageSize]);

  // Export handlers
  const handleDownloadCsv = () => {
    const headers = [
      "URL",
      "Title",
      "Title Length",
      "Title Status",
      "Meta Description",
      "Description Length",
      "Description Status",
      "H1 Heading",
      "Overall Audit Status",
      "Issues Detected",
    ];

    const rows = filteredEntries.map((e) => [
      e.url || "",
      e.title,
      e.titleLength,
      e.titleStatus.toUpperCase(),
      e.description,
      e.descLength,
      e.descStatus.toUpperCase(),
      e.h1 || "",
      e.status.toUpperCase(),
      e.issues.join(" | "),
    ]);

    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`meta-tags-audit-report-${timestamp}.csv`, headers, rows);
  };

  const handleCopyGoogleSheets = async () => {
    const headers = [
      "URL / Hyperlink",
      "Meta Title",
      "Title Length",
      "Title Status",
      "Meta Description",
      "Description Length",
      "Description Status",
      "Audit Status",
    ];

    const rows = filteredEntries.map((e) => [
      e.url ? formatGoogleSheetsHyperlink(e.url, e.title || e.url) : e.title,
      e.title,
      e.titleLength,
      e.titleStatus.toUpperCase(),
      e.description,
      e.descLength,
      e.descStatus.toUpperCase(),
      e.status.toUpperCase(),
    ]);

    return await copyToClipboardAsTsv(headers, rows);
  };

  const handleCopyText = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItemId(id);
      setTimeout(() => setCopiedItemId(null), 1500);
    }
  };

  const handleClearAll = () => {
    setInputText("");
    setSearchQuery("");
    setCurrentPage(1);
    setExpandedPreviewId(null);
  };

  // Stats bar
  const statsBar = auditResult.totalCount > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Total Inspected</span>
          <Type className="h-3.5 w-3.5 text-indigo-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {auditResult.totalCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          Snippet entries evaluated
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Optimal Length</span>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
          {auditResult.optimalCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">
          {Math.round((auditResult.optimalCount / (auditResult.totalCount || 1)) * 100)}% meet SERP limits
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Truncated / Too Long</span>
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">
          {(auditResult.tooLongTitlesCount + auditResult.tooLongDescCount).toLocaleString()}
        </div>
        <div className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5">
          {auditResult.tooLongTitlesCount} titles, {auditResult.tooLongDescCount} descriptions
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Missing / Too Short</span>
          <XCircle className="h-3.5 w-3.5 text-rose-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">
          {(
            auditResult.missingTitlesCount +
            auditResult.missingDescCount +
            auditResult.tooShortTitlesCount +
            auditResult.tooShortDescCount
          ).toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {auditResult.missingDescCount} missing descriptions
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="space-y-6">
      <BulkToolLayout
        title="Bulk Meta Tag Batch Inspector"
        description="Inspect and validate hundreds of SEO meta titles, descriptions, and headings in seconds. Detect SERP pixel truncation risks, audit character ranges, and export clean audit reports to CSV or Google Sheets."
        badge="Meta Inspector ⚡"
        inputText={inputText}
        onInputChange={(val) => {
          startTransition(() => {
            setInputText(val);
            setCurrentPage(1);
          });
        }}
        placeholder="Paste your CSV/TSV table (URL, Title, Description, H1) or raw HTML snippet blocks here..."
        sampleData={SAMPLE_META_TABULAR}
        sampleLabel="Load Sample Tabular Data"
        rowCount={filteredEntries.length}
        onClear={handleClearAll}
        onDownloadCsv={handleDownloadCsv}
        onCopyGoogleSheets={handleCopyGoogleSheets}
        statsBar={statsBar}
      >
        {/* Threshold Configuration Panel */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                SERP Length Thresholds
              </h2>
            </div>
            <span className="text-xs text-slate-400">Google desktop &amp; mobile search limits</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Title Min */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Title Min Chars
              </label>
              <input
                type="number"
                min={10}
                max={60}
                value={titleMinChars}
                onChange={(e) => setTitleMinChars(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono font-semibold"
              />
              <span className="text-[11px] text-slate-400">Default: 50 characters</span>
            </div>

            {/* Title Max */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Title Max Chars (SERP Truncation)
              </label>
              <input
                type="number"
                min={40}
                max={100}
                value={titleMaxChars}
                onChange={(e) => setTitleMaxChars(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono font-semibold"
              />
              <span className="text-[11px] text-slate-400">Default: 60 characters (~580px)</span>
            </div>

            {/* Desc Min */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Description Min Chars
              </label>
              <input
                type="number"
                min={30}
                max={150}
                value={descMinChars}
                onChange={(e) => setDescMinChars(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono font-semibold"
              />
              <span className="text-[11px] text-slate-400">Default: 120 characters</span>
            </div>

            {/* Desc Max */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 block">
                Description Max Chars (SERP Limit)
              </label>
              <input
                type="number"
                min={100}
                max={300}
                value={descMaxChars}
                onChange={(e) => setDescMaxChars(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono font-semibold"
              />
              <span className="text-[11px] text-slate-400">Default: 160 characters (~960px)</span>
            </div>
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
                    placeholder="Search by Title keywords, Description snippet, or URL..."
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
                      setStatusFilter("warning");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1",
                      statusFilter === "warning"
                        ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Warnings ({auditResult.warningCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("error");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1",
                      statusFilter === "error"
                        ? "bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 shadow-xs font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Errors ({auditResult.errorCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("optimal");
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1",
                      statusFilter === "optimal"
                        ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Optimal ({auditResult.optimalCount})</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div>
                  Showing <strong className="text-slate-900 dark:text-white">{filteredEntries.length.toLocaleString()}</strong> of{" "}
                  {auditResult.totalCount.toLocaleString()} entries
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
                    <option value={-1}>All ({filteredEntries.length})</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inspection Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 w-12 text-center">
                        #
                      </th>
                      <th scope="col" className="py-3.5 px-3 w-28">
                        Audit Status
                      </th>
                      <th scope="col" className="py-3.5 px-4 w-5/12">
                        Meta Title (&lt;title&gt;)
                      </th>
                      <th scope="col" className="py-3.5 px-4 w-5/12">
                        Meta Description
                      </th>
                      <th scope="col" className="py-3.5 px-4 text-right w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-sans">
                    {paginatedEntries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          No meta entries matching the selected filter.
                        </td>
                      </tr>
                    ) : (
                      paginatedEntries.map((entry, index) => {
                        const absoluteIndex =
                          pageSize === -1 ? index + 1 : (currentPage - 1) * pageSize + index + 1;
                        const isExpanded = expandedPreviewId === entry.id;

                        return (
                          <React.Fragment key={entry.id}>
                            <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                              <td className="py-3 px-4 text-center text-[11px] text-slate-400 font-mono">
                                {absoluteIndex}
                              </td>

                              {/* Status Badge */}
                              <td className="py-3 px-3 whitespace-nowrap">
                                {entry.status === "optimal" && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Optimal</span>
                                  </span>
                                )}
                                {entry.status === "warning" && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Warning</span>
                                  </span>
                                )}
                                {entry.status === "error" && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                    <XCircle className="h-3 w-3" />
                                    <span>Missing</span>
                                  </span>
                                )}
                              </td>

                              {/* Title Column */}
                              <td className="py-3 px-4 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={cn(
                                      "px-1.5 py-0.5 rounded text-[10px] font-mono font-bold",
                                      entry.titleStatus === "optimal"
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                        : entry.titleStatus === "too_long"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                        : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                    )}
                                  >
                                    {entry.titleLength} chars
                                  </span>
                                  {entry.titleTruncated && (
                                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                                      ⚠️ Truncation risk
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-2">
                                  {entry.title || <span className="text-rose-500 italic">Missing Title</span>}
                                </div>
                                {entry.url && (
                                  <div className="text-[10px] text-slate-400 truncate flex items-center gap-1 font-mono">
                                    <LinkIcon className="h-3 w-3 shrink-0" />
                                    <span>{entry.url}</span>
                                  </div>
                                )}
                              </td>

                              {/* Description Column */}
                              <td className="py-3 px-4 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={cn(
                                      "px-1.5 py-0.5 rounded text-[10px] font-mono font-bold",
                                      entry.descStatus === "optimal"
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                        : entry.descStatus === "too_long"
                                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                        : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                    )}
                                  >
                                    {entry.descLength} chars
                                  </span>
                                  {entry.descTruncated && (
                                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                                      ⚠️ Truncation risk
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                                  {entry.description || (
                                    <span className="text-rose-500 italic">Missing Meta Description</span>
                                  )}
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => setExpandedPreviewId(isExpanded ? null : entry.id)}
                                    className={cn(
                                      "p-1.5 rounded-lg transition-colors",
                                      isExpanded
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    )}
                                    title="SERP Snippet Preview"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyText(entry.title, `t-${entry.id}`)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    title="Copy Title"
                                  >
                                    {copiedItemId === `t-${entry.id}` ? (
                                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* SERP Snippet Preview Drawer */}
                            {isExpanded && (
                              <tr className="bg-slate-50/90 dark:bg-slate-950/70">
                                <td colSpan={5} className="py-4 px-6">
                                  <div className="max-w-2xl space-y-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                      <Globe className="h-3.5 w-3.5 text-indigo-500" />
                                      <span>Google Search Snippet Preview</span>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                        {entry.url || "https://example.com/page"}
                                      </div>
                                      <div className="text-base font-medium text-indigo-700 dark:text-indigo-400 hover:underline cursor-pointer">
                                        {entry.title || "Untitled Page"}
                                      </div>
                                      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {entry.description || "No meta description provided for search snippet."}
                                      </div>
                                    </div>

                                    {/* Issues Pills */}
                                    <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                                      {entry.issues.map((issue, idx) => (
                                        <span
                                          key={idx}
                                          className={cn(
                                            "px-2 py-0.5 rounded-md text-[10px] font-medium",
                                            entry.status === "optimal"
                                              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
                                              : entry.status === "warning"
                                              ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                                              : "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                          )}
                                        >
                                          {issue}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
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
                    {filteredEntries.length.toLocaleString()} items)
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
