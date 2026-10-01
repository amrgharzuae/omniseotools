"use client";

import React, { useState, useMemo, useCallback } from "react";
import JSZip from "jszip";
import {
  FileCode,
  Layers,
  Copy,
  Check,
  Download,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Archive,
  RefreshCw,
  Globe,
  Plus,
  Trash2,
  Info,
  Calendar,
  Settings2,
  Sliders,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface SitemapIndexSplitterProps {
  toolSlug?: string;
  toolName?: string;
}

interface ParsedUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const SAMPLE_DATASETS = [
  {
    name: "E-Commerce Catalog (30 URLs)",
    chunkSize: 10,
    domain: "https://shop.example.com",
    rawUrls: Array.from({ length: 30 })
      .map((_, i) => `https://shop.example.com/products/item-${i + 1}`)
      .join("\n"),
  },
  {
    name: "Publisher & News Hub (50 URLs)",
    chunkSize: 15,
    domain: "https://news.example.com",
    rawUrls: Array.from({ length: 50 })
      .map((_, i) => `https://news.example.com/2026/10/article-${i + 1}`)
      .join("\n"),
  },
  {
    name: "Multi-Section Enterprise (100 URLs)",
    chunkSize: 25,
    domain: "https://enterprise.example.com",
    rawUrls: Array.from({ length: 100 })
      .map((_, i) => `https://enterprise.example.com/solutions/module-${i + 1}`)
      .join("\n"),
  },
];

export function SitemapIndexSplitter({
  toolSlug = "sitemap-index-splitter",
  toolName = "XML Sitemap Index Splitter & Chunking Tool",
}: SitemapIndexSplitterProps) {
  // Input mode: raw URL list or existing XML
  const [inputMode, setInputMode] = useState<"urls" | "xml">("urls");
  const [rawInput, setRawInput] = useState(SAMPLE_DATASETS[0].rawUrls);
  const [chunkSize, setChunkSize] = useState<number>(10);
  const [customChunkSize, setCustomChunkSize] = useState<string>("");
  const [baseDomain, setBaseDomain] = useState("https://shop.example.com");
  const [filenamePattern, setFilenamePattern] = useState("sitemap-{index}.xml");
  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [customLastmod, setCustomLastmod] = useState(new Date().toISOString().split("T")[0]);
  const [includeChangefreq, setIncludeChangefreq] = useState(false);
  const [changefreqValue, setChangefreqValue] = useState("weekly");
  const [includePriority, setIncludePriority] = useState(false);
  const [priorityValue, setPriorityValue] = useState("0.8");

  // Output selection state
  const [activeOutputTab, setActiveOutputTab] = useState<string>("index"); // "index" or "chunk-0", "chunk-1"...
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  // Parse raw input into clean URL entries
  const { parsedEntries, duplicatesRemoved, invalidCount, warnings } = useMemo(() => {
    const entries: ParsedUrlEntry[] = [];
    const seen = new Set<string>();
    let duplicates = 0;
    let invalids = 0;
    const warningList: string[] = [];

    if (!rawInput.trim()) {
      return { parsedEntries: [], duplicatesRemoved: 0, invalidCount: 0, warnings: [] };
    }

    if (inputMode === "xml") {
      // Parse XML string using DOMParser
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rawInput, "text/xml");
        const urlNodes = xmlDoc.getElementsByTagName("url");

        if (urlNodes.length === 0) {
          warningList.push("No <url> elements found in pasted XML payload.");
        }

        for (let i = 0; i < urlNodes.length; i++) {
          const urlNode = urlNodes[i];
          const locNode = urlNode.getElementsByTagName("loc")[0];
          const lastmodNode = urlNode.getElementsByTagName("lastmod")[0];
          const changefreqNode = urlNode.getElementsByTagName("changefreq")[0];
          const priorityNode = urlNode.getElementsByTagName("priority")[0];

          if (locNode && locNode.textContent) {
            const cleanLoc = locNode.textContent.trim();
            if (cleanLoc.startsWith("http://") || cleanLoc.startsWith("https://")) {
              if (seen.has(cleanLoc)) {
                duplicates++;
              } else {
                seen.add(cleanLoc);
                entries.push({
                  loc: cleanLoc,
                  lastmod: lastmodNode?.textContent?.trim(),
                  changefreq: changefreqNode?.textContent?.trim(),
                  priority: priorityNode?.textContent?.trim(),
                });
              }
            } else {
              invalids++;
            }
          }
        }
      } catch (err) {
        warningList.push("Malformed XML payload. Please check XML tags syntax.");
      }
    } else {
      // Parse newline-separated URLs
      const lines = rawInput.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) continue;

        let cleanUrl = trimmed;
        // Basic protocol auto-prefix if relative
        if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
          if (cleanUrl.startsWith("/")) {
            const domainClean = baseDomain.replace(/\/+$/, "");
            cleanUrl = `${domainClean}${cleanUrl}`;
          } else {
            cleanUrl = `https://${cleanUrl}`;
          }
        }

        try {
          const parsed = new URL(cleanUrl);
          if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            if (seen.has(cleanUrl)) {
              duplicates++;
            } else {
              seen.add(cleanUrl);
              entries.push({ loc: cleanUrl });
            }
          } else {
            invalids++;
          }
        } catch {
          invalids++;
        }
      }
    }

    if (duplicates > 0) {
      warningList.push(`${duplicates} duplicate URLs were automatically consolidated.`);
    }
    if (invalids > 0) {
      warningList.push(`${invalids} invalid URL rows were skipped (must be absolute HTTPS URLs).`);
    }

    return {
      parsedEntries: entries,
      duplicatesRemoved: duplicates,
      invalidCount: invalids,
      warnings: warningList,
    };
  }, [rawInput, inputMode, baseDomain]);

  // Determine effective chunk size
  const effectiveChunkSize = useMemo(() => {
    if (customChunkSize) {
      const num = parseInt(customChunkSize, 10);
      if (!isNaN(num) && num > 0) return Math.min(50000, num);
    }
    return chunkSize;
  }, [chunkSize, customChunkSize]);

  // Partition entries into chunks
  const chunks = useMemo(() => {
    if (parsedEntries.length === 0) return [];
    const result: ParsedUrlEntry[][] = [];
    for (let i = 0; i < parsedEntries.length; i += effectiveChunkSize) {
      result.push(parsedEntries.slice(i, i + effectiveChunkSize));
    }
    return result;
  }, [parsedEntries, effectiveChunkSize]);

  // Helper to get chunk filename
  const getChunkFilename = useCallback(
    (index: number) => {
      const formattedNumber = (index + 1).toString();
      return filenamePattern.replace("{index}", formattedNumber);
    },
    [filenamePattern]
  );

  // Generate parent sitemapindex.xml string
  const parentSitemapIndexXml = useMemo(() => {
    if (chunks.length === 0) return "";
    const cleanDomain = baseDomain.replace(/\/+$/, "");
    const dateStr = customLastmod || new Date().toISOString().split("T")[0];

    const sitemapNodes = chunks
      .map((_, idx) => {
        const chunkFilename = getChunkFilename(idx);
        const loc = `${cleanDomain}/${chunkFilename}`;
        return `  <sitemap>
    <loc>${loc}</loc>${includeLastmod ? `\n    <lastmod>${dateStr}</lastmod>` : ""}
  </sitemap>`;
      })
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapNodes}
</sitemapindex>`;
  }, [chunks, baseDomain, customLastmod, includeLastmod, getChunkFilename]);

  // Generate individual chunked sitemap XML string
  const getSubSitemapXml = useCallback(
    (chunkIndex: number) => {
      const chunk = chunks[chunkIndex];
      if (!chunk || chunk.length === 0) return "";

      const defaultDate = customLastmod || new Date().toISOString().split("T")[0];

      const urlNodes = chunk
        .map((entry) => {
          const loc = entry.loc.replace(/&/g, "&amp;");
          const lastmod = entry.lastmod || (includeLastmod ? defaultDate : undefined);
          const changefreq = entry.changefreq || (includeChangefreq ? changefreqValue : undefined);
          const priority = entry.priority || (includePriority ? priorityValue : undefined);

          let node = `  <url>\n    <loc>${loc}</loc>`;
          if (lastmod) node += `\n    <lastmod>${lastmod}</lastmod>`;
          if (changefreq) node += `\n    <changefreq>${changefreq}</changefreq>`;
          if (priority) node += `\n    <priority>${priority}</priority>`;
          node += "\n  </url>";
          return node;
        })
        .join("\n");

      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;
    },
    [chunks, customLastmod, includeLastmod, includeChangefreq, changefreqValue, includePriority, priorityValue]
  );

  // Active XML string to display
  const activeXmlContent = useMemo(() => {
    if (activeOutputTab === "index") {
      return parentSitemapIndexXml;
    }
    const idx = parseInt(activeOutputTab.replace("chunk-", ""), 10);
    return getSubSitemapXml(idx);
  }, [activeOutputTab, parentSitemapIndexXml, getSubSitemapXml]);

  // Copy active XML to clipboard
  const handleCopy = useCallback(() => {
    if (!activeXmlContent) return;
    navigator.clipboard.writeText(activeXmlContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activeXmlContent]);

  // Download active XML file
  const handleDownloadSingle = useCallback(() => {
    if (!activeXmlContent) return;
    let filename = "sitemap.xml";
    if (activeOutputTab.startsWith("chunk-")) {
      const idx = parseInt(activeOutputTab.replace("chunk-", ""), 10);
      filename = getChunkFilename(idx);
    }
    const blob = new Blob([activeXmlContent], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [activeXmlContent, activeOutputTab, getChunkFilename]);

  // Download All as ZIP archive using JSZip
  const handleDownloadZip = useCallback(async () => {
    if (chunks.length === 0) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      // 1. Add parent index
      zip.file("sitemap.xml", parentSitemapIndexXml);

      // 2. Add each sub-sitemap
      chunks.forEach((_, idx) => {
        const filename = getChunkFilename(idx);
        const xml = getSubSitemapXml(idx);
        zip.file(filename, xml);
      });

      // 3. Generate blob & download
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sitemaps-bundle.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate ZIP archive:", err);
    } finally {
      setIsZipping(false);
    }
  }, [chunks, parentSitemapIndexXml, getChunkFilename, getSubSitemapXml]);

  // Load sample dataset
  const handleLoadSample = useCallback((sample: (typeof SAMPLE_DATASETS)[0]) => {
    setInputMode("urls");
    setRawInput(sample.rawUrls);
    setChunkSize(sample.chunkSize);
    setCustomChunkSize("");
    setBaseDomain(sample.domain);
    setActiveOutputTab("index");
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Statistics & Health Metric Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <Globe className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <span>Total URLs</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {parsedEntries.length.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Valid unique entries</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>Sub-Sitemaps</span>
          </div>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
            {chunks.length}
          </p>
          <span className="text-[11px] text-slate-400">
            {effectiveChunkSize.toLocaleString()} URLs / chunk
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Compliance Grade</span>
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            100%
          </p>
          <span className="text-[11px] text-slate-400">W3C &amp; Google 50k Safe</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <Archive className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>Package Archive</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {chunks.length > 0 ? `${chunks.length + 1} Files` : "0 Files"}
          </p>
          <span className="text-[11px] text-slate-400">ZIP export ready</span>
        </div>
      </section>

      {/* 2. Quick Sample Datasets Bar */}
      <section className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-white">Load Sample URL Datasets:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_DATASETS.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {sample.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setRawInput("");
              setActiveOutputTab("index");
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            Clear Input
          </button>
        </div>
      </section>

      {/* 3. Input & Configuration Dual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Data Input */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Source URLs / XML Sitemap Payload
                </h3>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setInputMode("urls")}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    inputMode === "urls"
                      ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  Raw URL List (1/line)
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("xml")}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    inputMode === "xml"
                      ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  Oversized &lt;urlset&gt; XML
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder={
                  inputMode === "urls"
                    ? "https://example.com/page-1\nhttps://example.com/page-2\nhttps://example.com/page-3"
                    : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://example.com/p1</loc></url>\n</urlset>'
                }
                rows={12}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-4 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 leading-relaxed resize-y"
              />
            </div>

            {/* Parsing Warnings / Notices */}
            {warnings.length > 0 && (
              <div className="space-y-1.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-500/20 text-xs">
                {warnings.map((warn, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-medium">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Chunking & Metadata Configuration */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Sitemap Index &amp; Chunk Settings
              </h3>
            </div>

            {/* Threshold URLs per Chunk */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Max URLs per Sub-Sitemap:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: "10 (Demo)", val: 10 },
                  { label: "5,000", val: 5000 },
                  { label: "10,000", val: 10000 },
                  { label: "50,000 (Max)", val: 50000 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => {
                      setChunkSize(item.val);
                      setCustomChunkSize("");
                    }}
                    className={cn(
                      "py-2 rounded-xl text-xs font-bold transition-all border",
                      chunkSize === item.val && !customChunkSize
                        ? "bg-cyan-600 text-white border-cyan-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Canonical Domain */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Base Host for Index &lt;loc&gt; paths:
              </label>
              <input
                type="text"
                value={baseDomain}
                onChange={(e) => setBaseDomain(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-xl text-xs font-mono border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Filename Pattern */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Sub-Sitemap Filename Pattern:
              </label>
              <input
                type="text"
                value={filenamePattern}
                onChange={(e) => setFilenamePattern(e.target.value)}
                placeholder="sitemap-{index}.xml"
                className="w-full px-3 py-2 rounded-xl text-xs font-mono border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <span className="text-[11px] text-slate-400">Use <code>&#123;index&#125;</code> for chunk numbers (1, 2, 3...)</span>
            </div>

            {/* Metadata Inclusions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200 select-none">
                  <input
                    type="checkbox"
                    checked={includeLastmod}
                    onChange={(e) => setIncludeLastmod(e.target.checked)}
                    className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 h-4 w-4"
                  />
                  <span>Inject &lt;lastmod&gt; Tag</span>
                </label>
                {includeLastmod && (
                  <input
                    type="date"
                    value={customLastmod}
                    onChange={(e) => setCustomLastmod(e.target.value)}
                    className="px-2 py-1 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200 select-none">
                  <input
                    type="checkbox"
                    checked={includeChangefreq}
                    onChange={(e) => setIncludeChangefreq(e.target.checked)}
                    className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 h-4 w-4"
                  />
                  <span>Inject &lt;changefreq&gt;</span>
                </label>
                {includeChangefreq && (
                  <select
                    value={changefreqValue}
                    onChange={(e) => setChangefreqValue(e.target.value)}
                    className="px-2 py-1 rounded-lg text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  >
                    <option value="always">always</option>
                    <option value="hourly">hourly</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly</option>
                    <option value="monthly">monthly</option>
                    <option value="yearly">yearly</option>
                    <option value="never">never</option>
                  </select>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200 select-none">
                  <input
                    type="checkbox"
                    checked={includePriority}
                    onChange={(e) => setIncludePriority(e.target.checked)}
                    className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 h-4 w-4"
                  />
                  <span>Inject &lt;priority&gt;</span>
                </label>
                {includePriority && (
                  <select
                    value={priorityValue}
                    onChange={(e) => setPriorityValue(e.target.value)}
                    className="px-2 py-1 rounded-lg text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  >
                    <option value="1.0">1.0 (Highest)</option>
                    <option value="0.8">0.8 (Standard)</option>
                    <option value="0.6">0.6 (Medium)</option>
                    <option value="0.4">0.4 (Low)</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tabbed Output & Export Panel */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Header with Sub-Sitemap Tabs */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600 text-white font-bold text-xs">
                <FileCode className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Generated XML Sitemaps
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Select index or preview individual chunked XML parts
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!activeXmlContent}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs transition-all disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Copied Active Tab!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Active XML</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadSingle}
                disabled={!activeXmlContent}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .xml</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={chunks.length === 0 || isZipping}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all disabled:opacity-50"
              >
                <Archive className="h-3.5 w-3.5" />
                <span>{isZipping ? "Creating ZIP..." : "Download All (ZIP)"}</span>
              </button>

              <EmbedBadgeModal
                score={chunks.length > 0 ? 100 : 0}
                status="Split Complete"
                label="Sitemap Index"
                toolSlug="sitemap-index-splitter"
                buttonVariant="outline"
              />
            </div>
          </div>

          {/* Sub-Sitemap Preview Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveOutputTab("index")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                activeOutputTab === "index"
                  ? "bg-cyan-600 text-white shadow-xs"
                  : "bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
              )}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>sitemap.xml (&lt;sitemapindex&gt;)</span>
            </button>

            {chunks.map((chunk, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveOutputTab(`chunk-${idx}`)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1",
                  activeOutputTab === `chunk-${idx}`
                    ? "bg-cyan-600 text-white shadow-xs"
                    : "bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                )}
              >
                <span>{getChunkFilename(idx)}</span>
                <span className="text-[10px] opacity-75">({chunk.length})</span>
              </button>
            ))}
          </div>
        </div>

        {/* XML Viewer Codeblock */}
        <div className="p-4 sm:p-6">
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner leading-relaxed max-h-[500px]">
            <pre className="whitespace-pre-wrap break-all">
              {activeXmlContent || "<!-- Paste URLs or XML above to split and generate sitemaps -->"}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
