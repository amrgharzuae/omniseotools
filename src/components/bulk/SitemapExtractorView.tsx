"use client";

import React, { useState, useMemo, useTransition } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Globe,
  Image as ImageIcon,
  Languages,
  Calendar,
  Lock,
  Unlock,
  Layers,
  ArrowUpDown,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { BulkToolLayout } from "@/components/bulk/BulkToolLayout";
import {
  parseSitemapXml,
  SAMPLE_SITEMAP_XML,
  ParsedSitemapUrl,
  SitemapParseResult,
} from "@/lib/bulk/sitemap-parser";
import {
  downloadCsv,
  copyToClipboardAsTsv,
  formatGoogleSheetsHyperlink,
} from "@/lib/bulk/export-utils";
import { cn } from "@/lib/utils";

export function SitemapExtractorView() {
  const [inputText, setInputText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [protocolFilter, setProtocolFilter] = useState<string>("all");
  const [hasImagesFilter, setHasImagesFilter] = useState<string>("all");
  const [hasHreflangFilter, setHasHreflangFilter] = useState<string>("all");
  const [changefreqFilter, setChangefreqFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<"loc" | "lastmod" | "priority" | "images" | "hreflang">("loc");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Parse XML text
  const parseResult: SitemapParseResult = useMemo(() => {
    return parseSitemapXml(inputText);
  }, [inputText]);

  // Filter and sort items
  const filteredUrls = useMemo(() => {
    if (!parseResult.urls || parseResult.urls.length === 0) return [];

    return parseResult.urls.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesLoc = item.loc.toLowerCase().includes(query);
        const matchesLastmod = item.lastmod ? item.lastmod.toLowerCase().includes(query) : false;
        const matchesHreflang = item.hreflangs.some(
          (h) => h.lang.toLowerCase().includes(query) || h.href.toLowerCase().includes(query)
        );
        const matchesImage = item.images.some((img) => img.toLowerCase().includes(query));

        if (!matchesLoc && !matchesLastmod && !matchesHreflang && !matchesImage) {
          return false;
        }
      }

      // Protocol filter
      if (protocolFilter !== "all" && item.protocol !== protocolFilter) {
        return false;
      }

      // Images filter
      if (hasImagesFilter === "with_images" && item.images.length === 0) return false;
      if (hasImagesFilter === "no_images" && item.images.length > 0) return false;

      // Hreflang filter
      if (hasHreflangFilter === "with_hreflang" && item.hreflangs.length === 0) return false;
      if (hasHreflangFilter === "no_hreflang" && item.hreflangs.length > 0) return false;

      // Changefreq filter
      if (changefreqFilter !== "all" && item.changefreq !== changefreqFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortField === "loc") {
        comparison = a.loc.localeCompare(b.loc);
      } else if (sortField === "lastmod") {
        comparison = (a.lastmod || "").localeCompare(b.lastmod || "");
      } else if (sortField === "priority") {
        comparison = (parseFloat(a.priority || "0") || 0) - (parseFloat(b.priority || "0") || 0);
      } else if (sortField === "images") {
        comparison = a.images.length - b.images.length;
      } else if (sortField === "hreflang") {
        comparison = a.hreflangs.length - b.hreflangs.length;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [
    parseResult.urls,
    searchQuery,
    protocolFilter,
    hasImagesFilter,
    hasHreflangFilter,
    changefreqFilter,
    sortField,
    sortDirection,
  ]);

  // Paginated items
  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredUrls.length / pageSize) || 1;
  const paginatedUrls = useMemo(() => {
    if (pageSize === -1) return filteredUrls;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUrls.slice(startIndex, startIndex + pageSize);
  }, [filteredUrls, currentPage, pageSize]);

  // Handle Sort Change
  const handleSort = (field: "loc" | "lastmod" | "priority" | "images" | "hreflang") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Export handlers
  const handleDownloadCsv = () => {
    const headers = [
      "URL",
      "Last Modified",
      "Change Frequency",
      "Priority",
      "Hreflang Count",
      "Hreflang Alternates",
      "Image Count",
      "Image URLs",
      "Protocol",
      "Path Depth",
      "Is Valid URL",
    ];

    const rows = filteredUrls.map((u) => [
      u.loc,
      u.lastmod || "",
      u.changefreq || "",
      u.priority || "",
      u.hreflangs.length,
      u.hreflangs.map((h) => `${h.lang}:${h.href}`).join(" | "),
      u.images.length,
      u.images.join(" | "),
      u.protocol.toUpperCase(),
      u.pathDepth,
      u.isValidUrl ? "YES" : "NO",
    ]);

    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`sitemap-urls-${timestamp}.csv`, headers, rows);
  };

  const handleCopyGoogleSheets = async () => {
    const headers = [
      "Hyperlinked URL",
      "Raw URL",
      "Last Modified",
      "Change Frequency",
      "Priority",
      "Hreflang Count",
      "Image Count",
      "Protocol",
    ];

    const rows = filteredUrls.map((u) => [
      formatGoogleSheetsHyperlink(u.loc),
      u.loc,
      u.lastmod || "",
      u.changefreq || "",
      u.priority || "",
      u.hreflangs.length,
      u.images.length,
      u.protocol.toUpperCase(),
    ]);

    return await copyToClipboardAsTsv(headers, rows);
  };

  const handleCopySingleUrl = (url: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrlId(id);
      setTimeout(() => setCopiedUrlId(null), 1500);
    }
  };

  const handleClear = () => {
    setInputText("");
    setSearchQuery("");
    setCurrentPage(1);
    setExpandedRowId(null);
  };

  // Dynamic stats bar component
  const statsBar = parseResult.totalCount > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Total URLs</span>
          <Globe className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {parseResult.totalCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {parseResult.type === "sitemapindex" ? "Sitemap Index entries" : "XML URL entries"}
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>With Lastmod</span>
          <Calendar className="h-3.5 w-3.5 text-indigo-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {parseResult.withLastmodCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">
          {Math.round((parseResult.withLastmodCount / (parseResult.totalCount || 1)) * 100)}% freshness tagged
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Images Tagged</span>
          <ImageIcon className="h-3.5 w-3.5 text-amber-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {parseResult.totalImagesCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          in {parseResult.withImagesCount.toLocaleString()} URLs
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Hreflang Tags</span>
          <Languages className="h-3.5 w-3.5 text-sky-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {parseResult.totalHreflangsCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          in {parseResult.withHreflangsCount.toLocaleString()} URLs
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>HTTPS / Secure</span>
          <Lock className="h-3.5 w-3.5 text-emerald-600" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
          {parseResult.httpsCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {parseResult.httpCount > 0 ? (
            <span className="text-rose-500 font-medium">⚠️ {parseResult.httpCount} HTTP insecure</span>
          ) : (
            "100% HTTPS Secure"
          )}
        </div>
      </div>

      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Valid Status</span>
          <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
        </div>
        <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
          {parseResult.validCount.toLocaleString()}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          {parseResult.invalidCount > 0 ? (
            <span className="text-rose-500 font-medium">{parseResult.invalidCount} invalid syntax</span>
          ) : (
            "All URLs RFC-Valid"
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <BulkToolLayout
      title="Bulk XML Sitemap URL Extractor"
      description="Extract, inspect, filter, and batch export URLs, last modified dates, image nodes, and hreflang alternates from XML sitemaps to CSV and Google Sheets in seconds. 100% private in-browser engine capable of handling up to 10,000 items instantly."
      badge="Bulk Sitemap ⚡"
      inputText={inputText}
      onInputChange={(val) => {
        startTransition(() => {
          setInputText(val);
          setCurrentPage(1);
        });
      }}
      placeholder="Paste raw XML sitemap markup (<urlset> or <sitemapindex>), or simple newline-separated URLs here..."
      sampleData={SAMPLE_SITEMAP_XML}
      sampleLabel="Load Sample Multilingual Sitemap"
      rowCount={filteredUrls.length}
      onClear={handleClear}
      onDownloadCsv={handleDownloadCsv}
      onCopyGoogleSheets={handleCopyGoogleSheets}
      statsBar={statsBar}
      errorMessage={parseResult.errorMessage}
    >
      {/* Results View */}
      {parseResult.totalCount > 0 && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Filter by URL substring, lastmod date, language code (e.g. 'ar', 'es'), or image path..."
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

              {/* Quick Filter Selects */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Protocol */}
                <select
                  value={protocolFilter}
                  onChange={(e) => {
                    setProtocolFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                >
                  <option value="all">Protocol: All</option>
                  <option value="https">HTTPS Only</option>
                  <option value="http">HTTP Only (Insecure)</option>
                </select>

                {/* Images */}
                <select
                  value={hasImagesFilter}
                  onChange={(e) => {
                    setHasImagesFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                >
                  <option value="all">Images: All</option>
                  <option value="with_images">With Images Only</option>
                  <option value="no_images">No Images</option>
                </select>

                {/* Hreflang */}
                <select
                  value={hasHreflangFilter}
                  onChange={(e) => {
                    setHasHreflangFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                >
                  <option value="all">Hreflang: All</option>
                  <option value="with_hreflang">With Hreflang Only</option>
                  <option value="no_hreflang">No Hreflang</option>
                </select>

                {/* Changefreq */}
                <select
                  value={changefreqFilter}
                  onChange={(e) => {
                    setChangefreqFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                >
                  <option value="all">Changefreq: All</option>
                  <option value="always">always</option>
                  <option value="hourly">hourly</option>
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                  <option value="never">never</option>
                </select>
              </div>
            </div>

            {/* Filter Summary */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span>
                  Showing <strong className="text-slate-900 dark:text-white">{filteredUrls.length.toLocaleString()}</strong> of{" "}
                  {parseResult.totalCount.toLocaleString()} URLs
                </span>
                {filteredUrls.length !== parseResult.totalCount && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-medium text-[11px]">
                    Filtered View Active
                  </span>
                )}
              </div>

              {/* Rows Per Page */}
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
                  <option value={-1}>All ({filteredUrls.length})</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Data Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 w-12 text-center">
                      #
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("loc")}
                      className="py-3.5 px-4 cursor-pointer hover:text-emerald-600 transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>URL Location (&lt;loc&gt;)</span>
                        <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("lastmod")}
                      className="py-3.5 px-4 cursor-pointer hover:text-emerald-600 transition-colors hidden md:table-cell whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Last Modified</span>
                        <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </div>
                    </th>
                    <th scope="col" className="py-3.5 px-4 hidden lg:table-cell whitespace-nowrap">
                      Changefreq
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("priority")}
                      className="py-3.5 px-4 cursor-pointer hover:text-emerald-600 transition-colors hidden sm:table-cell text-center"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Priority</span>
                        <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("hreflang")}
                      className="py-3.5 px-4 cursor-pointer hover:text-emerald-600 transition-colors text-center"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Hreflangs</span>
                        <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("images")}
                      className="py-3.5 px-4 cursor-pointer hover:text-emerald-600 transition-colors text-center"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>Images</span>
                        <ArrowUpDown className="h-3 w-3 text-slate-400" />
                      </div>
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-right w-20">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
                  {paginatedUrls.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400 font-sans">
                        No URLs matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedUrls.map((item, index) => {
                      const absoluteIndex = pageSize === -1 ? index + 1 : (currentPage - 1) * pageSize + index + 1;
                      const isExpanded = expandedRowId === item.id;
                      const hasDetails = item.hreflangs.length > 0 || item.images.length > 0;

                      return (
                        <React.Fragment key={item.id}>
                          <tr
                            className={cn(
                              "hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors",
                              !item.isValidUrl && "bg-rose-50/30 dark:bg-rose-950/20"
                            )}
                          >
                            <td className="py-3 px-4 text-center text-[11px] text-slate-400 font-mono">
                              {absoluteIndex}
                            </td>

                            {/* URL */}
                            <td className="py-3 px-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl truncate">
                              <div className="flex items-center gap-2">
                                {item.protocol === "https" ? (
                                  <span title="HTTPS Secure" className="inline-flex shrink-0">
                                    <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                  </span>
                                ) : item.protocol === "http" ? (
                                  <span title="Insecure HTTP" className="inline-flex shrink-0">
                                    <Unlock className="h-3.5 w-3.5 text-rose-500" />
                                  </span>
                                ) : (
                                  <span className="inline-flex shrink-0">
                                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                                  </span>
                                )}

                                <a
                                  href={item.loc}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline truncate text-xs"
                                  title={item.loc}
                                >
                                  {item.loc}
                                </a>
                              </div>
                            </td>

                            {/* Lastmod */}
                            <td className="py-3 px-4 hidden md:table-cell text-slate-600 dark:text-slate-400 text-xs whitespace-nowrap">
                              {item.lastmod ? (
                                <span title={item.lastmod}>
                                  {item.lastmod.length > 19 ? item.lastmod.slice(0, 19).replace("T", " ") : item.lastmod}
                                </span>
                              ) : (
                                <span className="text-slate-300 dark:text-slate-600">—</span>
                              )}
                            </td>

                            {/* Changefreq */}
                            <td className="py-3 px-4 hidden lg:table-cell whitespace-nowrap">
                              {item.changefreq ? (
                                <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {item.changefreq}
                                </span>
                              ) : (
                                <span className="text-slate-300 dark:text-slate-600">—</span>
                              )}
                            </td>

                            {/* Priority */}
                            <td className="py-3 px-4 hidden sm:table-cell text-center">
                              {item.priority ? (
                                <span
                                  className={cn(
                                    "inline-block px-2 py-0.5 rounded-md text-[11px] font-bold font-mono",
                                    parseFloat(item.priority) >= 0.8
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                      : parseFloat(item.priority) >= 0.5
                                      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                  )}
                                >
                                  {item.priority}
                                </span>
                              ) : (
                                <span className="text-slate-300 dark:text-slate-600">—</span>
                              )}
                            </td>

                            {/* Hreflang Count & Trigger */}
                            <td className="py-3 px-4 text-center">
                              {item.hreflangs.length > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => setExpandedRowId(isExpanded ? null : item.id)}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 hover:bg-sky-200 transition-colors"
                                >
                                  <Languages className="h-3 w-3" />
                                  <span>{item.hreflangs.length}</span>
                                  {isExpanded ? <ChevronUp className="h-2.5 w-2.5" /> : <ChevronDown className="h-2.5 w-2.5" />}
                                </button>
                              ) : (
                                <span className="text-slate-300 dark:text-slate-600">0</span>
                              )}
                            </td>

                            {/* Image Count & Trigger */}
                            <td className="py-3 px-4 text-center">
                              {item.images.length > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => setExpandedRowId(isExpanded ? null : item.id)}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-200 transition-colors"
                                >
                                  <ImageIcon className="h-3 w-3" />
                                  <span>{item.images.length}</span>
                                  {isExpanded ? <ChevronUp className="h-2.5 w-2.5" /> : <ChevronDown className="h-2.5 w-2.5" />}
                                </button>
                              ) : (
                                <span className="text-slate-300 dark:text-slate-600">0</span>
                              )}
                            </td>

                            {/* Quick Actions */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1 font-sans">
                                <button
                                  type="button"
                                  onClick={() => handleCopySingleUrl(item.loc, item.id)}
                                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="Copy URL"
                                >
                                  {copiedUrlId === item.id ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                                <a
                                  href={item.loc}
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

                          {/* Expanded Details Row */}
                          {isExpanded && hasDetails && (
                            <tr className="bg-slate-50/80 dark:bg-slate-950/60">
                              <td colSpan={8} className="py-4 px-6 text-xs">
                                <div className="space-y-3 font-sans">
                                  {item.hreflangs.length > 0 && (
                                    <div className="space-y-1.5">
                                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                                        <Languages className="h-3.5 w-3.5 text-sky-500" />
                                        <span>Hreflang Alternates ({item.hreflangs.length})</span>
                                      </div>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px]">
                                        {item.hreflangs.map((h, i) => (
                                          <div
                                            key={i}
                                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                                          >
                                            <span className="font-bold text-sky-600 dark:text-sky-400 uppercase">
                                              {h.lang}
                                            </span>
                                            <a
                                              href={h.href}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="truncate ml-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline"
                                            >
                                              {h.href}
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {item.images.length > 0 && (
                                    <div className="space-y-1.5">
                                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                                        <ImageIcon className="h-3.5 w-3.5 text-amber-500" />
                                        <span>Image Nodes ({item.images.length})</span>
                                      </div>
                                      <div className="space-y-1 font-mono text-[11px]">
                                        {item.images.map((img, i) => (
                                          <div
                                            key={i}
                                            className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                                          >
                                            <a
                                              href={img}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="truncate text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:underline"
                                            >
                                              {img}
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
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

            {/* Pagination Controls */}
            {pageSize !== -1 && totalPages > 1 && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div>
                  Page <strong className="text-slate-900 dark:text-white">{currentPage}</strong> of{" "}
                  <strong className="text-slate-900 dark:text-white">{totalPages}</strong> (
                  {filteredUrls.length.toLocaleString()} items)
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
  );
}
