"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  Link2,
  FileText,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Share2,
  Languages,
  ArrowRight,
  Download,
  ListOrdered,
  Table,
  Code2,
  Info,
  Layers,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedToolModal } from "@/components/tools/EmbedToolModal";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface ArabicUrlDecoderProps {
  toolSlug?: string;
  toolName?: string;
}

// Preset samples
const SAMPLE_PRESETS = [
  {
    name: "Google Ads Arabic Campaign",
    description: "Paid search click with Arabic search query, UTM parameters, and GCLID",
    url: "https://example.com/ar/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A?utm_source=google&utm_medium=cpc&utm_campaign=%D8%AD%D9%85%D9%84%D8%A9_%D8%B1%D9%85%D8%B6%D8%A7%D9%86_2026&utm_term=%D8%A3%D9%81%D8%B6%D9%84+%D8%B4%D8%B1%D9%83%D8%A9+%D8%B3%D9%8A%D9%88+%D9%81%D9%8A+%D8%AF%D8%A8%D9%8A&utm_content=%D8%A5%D8%B9%D9%84%D8%A7%D9%86_%D8%A7%D9%84%D8%A8%D8%AD%D8%AB_1&gclid=CjwKCAiA_SampleArabicAd123",
  },
  {
    name: "E-Commerce Arabic Product",
    description: "Nested category hierarchy with Arabic filters and brand query",
    url: "https://souq-example.com/ar/%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A7%D8%AA/%D9%87%D9%88%D8%A7%D8%AA%D9%81-%D8%B0%D9%83%D9%8A%D8%A9?sort=%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89_%D8%AA%D9%82%D9%8A%D9%8A%D9%85%D8%A7%D9%8B&brand=%D8%B3%D8%A7%D9%85%D8%B3%D9%88%D9%86%D8%AC&city=%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6",
  },
  {
    name: "Arabic SEO Blog Post & Hash",
    description: "Arabic slug with deep link anchor and search referral query",
    url: "https://omniseotools.com/blog/%D8%AF%D9%84%D9%8A%D9%84-%D8%AA%D8%AD%D8%B3%D9%8A%D9%86-%D9%85%D8%AD%D8%B1%D9%83%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D8%AD%D8%AB#%D8%A7%D9%84%D9%83%D9%84%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D9%85%D9%81%D8%AA%D8%A7%D8%AD%D9%8A%D8%A9",
  },
  {
    name: "Double-Encoded Ad Redirect",
    description: "Multi-hop redirect URL with double percent-encoded parameters (%25D8...)",
    url: "https://adnetwork.com/click?target=https%3A%2F%2Fexample.com%2Far%2F%25D8%25AF%25D9%2588%25D8%25B1%25D8%25A7%25D8%25AA-%25D8%25AA%25D8%25AF%25D8%25B1%25D9%258A%25D8%25A8%25D9%258A%25D8%25A9%3Fq%3D%25D8%25AA%25D8%25B9%25D9%2584%25D9%2585_%25D8%25A7%25D9%2584%25D8%25A8%25D8%25B1%25D9%2585%25D8%25AC%25D8%25A9",
  },
];

const BATCH_SAMPLE = `%D8%A3%D9%81%D8%B6%D9%84+%D8%B4%D8%B1%D9%83%D8%A9+%D8%B3%D9%8A%D9%88+%D9%81%D9%8A+%D8%AF%D8%A8%D9%8A
%D8%AE%D8%AF%D9%85%D8%A7%D8%AA+%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82+%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A
https://example.com/ar/%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B3%D9%8A%D9%88
https://example.com/shop?cat=%D8%B9%D8%B7%D9%88%D8%B1_%D9%81%D8%A7%D8%AE%D8%B1%D8%A9&city=%D8%AC%D8%AF%D8%A9
%D8%AD%D8%AC%D8%B2+%D8%AA%D8%B0%D8%A7%D9%83%D8%B1+%D8%B7%D9%8A%D8%B1%D8%A7%D9%86+%D8%B1%D8%AE%D9%8A%D8%B5%D8%A9`;

// Arabic Unicode regex range
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * Robust, safe recursive percent-decoder
 */
function safeDecode(str: string, convertPlus = true, recursive = true): string {
  if (!str) return "";
  let working = str;
  if (convertPlus) {
    // If it's a query string portion or standalone term, replace + with space
    working = working.replace(/\+/g, " ");
  }

  let prev = "";
  let iterations = 0;
  const maxIterations = recursive ? 3 : 1;

  while (working !== prev && iterations < maxIterations) {
    prev = working;
    iterations++;
    try {
      // Decode percent sequences safely
      working = decodeURIComponent(working.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
    } catch {
      // Fallback: decode character-by-character if malformed
      working = working.replace(/%([0-9A-Fa-f]{2})/g, (_, hex) => {
        try {
          return decodeURIComponent(`%${hex}`);
        } catch {
          return `%${hex}`;
        }
      });
    }
  }

  return working;
}

export function ArabicUrlDecoder({
  toolSlug = "arabic-url-decoder",
  toolName = "Arabic & UTF-8 URL Decoder",
}: ArabicUrlDecoderProps) {
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [singleInput, setSingleInput] = useState<string>(SAMPLE_PRESETS[0].url);
  const [batchInput, setBatchInput] = useState<string>(BATCH_SAMPLE);
  const [dirMode, setDirMode] = useState<"auto" | "rtl" | "ltr">("auto");
  const [convertPlus, setConvertPlus] = useState<boolean>(true);
  const [recursiveDecode, setRecursiveDecode] = useState<boolean>(true);

  // Copy feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  // Single URL / Parameter Analysis
  const singleAnalysis = useMemo(() => {
    const raw = singleInput.trim();
    if (!raw) {
      return {
        isEmpty: true,
        decoded: "",
        isUrl: false,
        protocol: "",
        host: "",
        pathname: "",
        hash: "",
        params: [],
        containsArabic: false,
        arabicCharCount: 0,
        rawBytes: 0,
        decodedBytes: 0,
        byteReduction: 0,
      };
    }

    const decoded = safeDecode(raw, convertPlus, recursiveDecode);
    const containsArabic = ARABIC_REGEX.test(decoded);
    const arabicCharCount = (decoded.match(new RegExp(ARABIC_REGEX, "g")) || []).length;
    const rawBytes = new Blob([raw]).size;
    const decodedBytes = new Blob([decoded]).size;
    const byteReduction = rawBytes > 0 ? Math.round(((rawBytes - decodedBytes) / rawBytes) * 100) : 0;

    let isUrl = false;
    let protocol = "";
    let host = "";
    let pathname = "";
    let hash = "";
    const paramsList: Array<{
      key: string;
      rawKey: string;
      rawValue: string;
      decodedValue: string;
      isArabic: boolean;
      typeTag: string;
    }> = [];

    // Attempt to parse as full URL or path
    try {
      let urlObj: URL;
      if (raw.startsWith("http://") || raw.startsWith("https://")) {
        urlObj = new URL(raw);
        isUrl = true;
      } else if (raw.startsWith("/")) {
        urlObj = new URL(raw, "https://example.com");
        isUrl = true;
      } else if (raw.includes("?") || raw.includes("=") || raw.includes("&")) {
        urlObj = new URL(`https://example.com?${raw.replace(/^\?/, "")}`);
      } else {
        urlObj = new URL(`https://example.com/${raw}`);
      }

      protocol = isUrl && raw.startsWith("http") ? urlObj.protocol : "";
      host = isUrl && raw.startsWith("http") ? urlObj.host : "";
      pathname = safeDecode(urlObj.pathname, false, recursiveDecode);
      hash = safeDecode(urlObj.hash, false, recursiveDecode);

      urlObj.searchParams.forEach((value, key) => {
        const decodedKey = safeDecode(key, convertPlus, recursiveDecode);
        const decodedVal = safeDecode(value, convertPlus, recursiveDecode);
        const isParamArabic = ARABIC_REGEX.test(decodedVal) || ARABIC_REGEX.test(decodedKey);

        let typeTag = "Query Parameter";
        const lKey = key.toLowerCase();
        if (lKey === "utm_source") typeTag = "UTM Source";
        else if (lKey === "utm_medium") typeTag = "UTM Medium";
        else if (lKey === "utm_campaign") typeTag = "UTM Campaign";
        else if (lKey === "utm_term") typeTag = "UTM Search Term";
        else if (lKey === "utm_content") typeTag = "UTM Ad Content";
        else if (lKey === "gclid") typeTag = "Google Click ID";
        else if (lKey === "fbclid") typeTag = "Meta Click ID";
        else if (lKey === "q" || lKey === "query" || lKey === "keyword" || lKey === "k") typeTag = "Search Query";

        paramsList.push({
          key: decodedKey,
          rawKey: key,
          rawValue: value,
          decodedValue: decodedVal,
          isArabic: isParamArabic,
          typeTag,
        });
      });
    } catch {
      // Raw string fallback
    }

    return {
      isEmpty: false,
      decoded,
      isUrl,
      protocol,
      host,
      pathname,
      hash,
      params: paramsList,
      containsArabic,
      arabicCharCount,
      rawBytes,
      decodedBytes,
      byteReduction,
    };
  }, [singleInput, convertPlus, recursiveDecode]);

  // Batch Processing Analysis
  const batchAnalysis = useMemo(() => {
    const lines = batchInput.split(/\r?\n/).filter((l) => l.trim().length > 0);
    let totalArabicChars = 0;

    const results = lines.map((line, index) => {
      const trimmed = line.trim();
      const decoded = safeDecode(trimmed, convertPlus, recursiveDecode);
      const isArabic = ARABIC_REGEX.test(decoded);
      const arabicCount = (decoded.match(new RegExp(ARABIC_REGEX, "g")) || []).length;
      totalArabicChars += arabicCount;

      return {
        id: index + 1,
        raw: trimmed,
        decoded,
        isArabic,
        arabicCount,
      };
    });

    const allDecodedText = results.map((r) => r.decoded).join("\n");

    return {
      count: results.length,
      results,
      allDecodedText,
      totalArabicChars,
    };
  }, [batchInput, convertPlus, recursiveDecode]);

  // Determine active text direction
  const resolvedDir = useMemo(() => {
    if (dirMode === "rtl") return "rtl";
    if (dirMode === "ltr") return "ltr";
    return singleAnalysis.containsArabic ? "rtl" : "ltr";
  }, [dirMode, singleAnalysis.containsArabic]);

  // Export Batch CSV with UTF-8 BOM (\uFEFF) so Excel opens Arabic properly
  const handleExportCSV = useCallback(() => {
    if (batchAnalysis.results.length === 0) return;
    const header = "Line,Original Encoded,Decoded Text,Contains Arabic\n";
    const rows = batchAnalysis.results
      .map(
        (r) =>
          `${r.id},"${r.raw.replace(/"/g, '""')}","${r.decoded.replace(/"/g, '""')}",${r.isArabic ? "Yes" : "No"}`
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decoded_arabic_urls_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [batchAnalysis]);

  // Export Decoded JSON
  const handleExportJSON = useCallback(() => {
    let jsonStr = "";
    if (mode === "single") {
      const jsonObj = {
        original: singleInput,
        decoded: singleAnalysis.decoded,
        isUrl: singleAnalysis.isUrl,
        host: singleAnalysis.host,
        pathname: singleAnalysis.pathname,
        parameters: singleAnalysis.params.reduce<Record<string, string>>((acc, p) => {
          acc[p.key] = p.decodedValue;
          return acc;
        }, {}),
      };
      jsonStr = JSON.stringify(jsonObj, null, 2);
    } else {
      const jsonObj = batchAnalysis.results.map((r) => ({
        line: r.id,
        encoded: r.raw,
        decoded: r.decoded,
        containsArabic: r.isArabic,
      }));
      jsonStr = JSON.stringify(jsonObj, null, 2);
    }

    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `decoded_parameters_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [mode, singleInput, singleAnalysis, batchAnalysis]);

  return (
    <div className="space-y-6">
      {/* Top Interactive Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        {/* Mode Selector & Quick Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Mode Segmented Switcher */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/80 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setMode("single")}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all",
                mode === "single"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Link2 className="h-3.5 w-3.5" />
              Single URL / String
            </button>
            <button
              type="button"
              onClick={() => setMode("batch")}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all",
                mode === "batch"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <ListOrdered className="h-3.5 w-3.5" />
              Batch Lines ({batchAnalysis.count})
            </button>
          </div>

          {/* Action Modals */}
          <div className="flex items-center gap-2">
            <EmbedBadgeModal toolSlug={toolSlug} label="Arabic URL Decoder" status="100% UTF-8" />
            <EmbedToolModal slug={toolSlug} toolName={toolName} />
          </div>
        </div>

        {/* Quick Presets Bar (Single Mode) */}
        {mode === "single" && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" /> Presets:
            </span>
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSingleInput(preset.url)}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-slate-200/60 dark:border-slate-700/50"
              >
                {preset.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Input / Output Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Box & Configuration Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {mode === "single" ? (
                  <>
                    <Link2 className="h-4 w-4 text-indigo-500" />
                    Encoded URL or Query Parameter
                  </>
                ) : (
                  <>
                    <ListOrdered className="h-4 w-4 text-indigo-500" />
                    Batch Encoded URLs / Search Queries (Line by Line)
                  </>
                )}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => (mode === "single" ? setSingleInput("") : setBatchInput(""))}
                  className="text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Clear
                </button>
              </div>
            </div>

            {/* Input Textarea */}
            {mode === "single" ? (
              <div className="relative">
                <textarea
                  value={singleInput}
                  onChange={(e) => setSingleInput(e.target.value)}
                  placeholder="Paste percent-encoded URL (e.g., https://example.com/ar/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA?utm_term=%D8%B3%D9%8A%D9%88)..."
                  rows={6}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-3.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y"
                />
              </div>
            ) : (
              <div className="relative">
                <textarea
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  placeholder="Paste list of encoded URLs or terms (one per line)..."
                  rows={8}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-3.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y"
                />
              </div>
            )}

            {/* Decoding Options & Toggles */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-indigo-500" />
                  Text Direction:
                </span>
                <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200/60 dark:border-slate-700/50">
                  <button
                    type="button"
                    onClick={() => setDirMode("auto")}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-medium transition-all",
                      dirMode === "auto"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirMode("rtl")}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-medium transition-all",
                      dirMode === "rtl"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    RTL (عربي)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirMode("ltr")}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-medium transition-all",
                      dirMode === "ltr"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    LTR
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={convertPlus}
                    onChange={(e) => setConvertPlus(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Convert <code>+</code> to space
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={recursiveDecode}
                    onChange={(e) => setRecursiveDecode(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Recursive Decode (Multi-Hop)
                  </span>
                </label>
              </div>
            </div>

            {/* Diagnostic Metrics Pills */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {mode === "single" ? (
                <>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium">
                    <CheckCircle2 className="h-3 w-3" />
                    {singleAnalysis.containsArabic
                      ? `Arabic Detected (${singleAnalysis.arabicCharCount} chars)`
                      : "Standard UTF-8"}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                    {singleAnalysis.rawBytes} bytes &rarr; {singleAnalysis.decodedBytes} bytes
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium">
                    <Zap className="h-3 w-3" /> 0ms Client-Side
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium">
                    {batchAnalysis.count} lines processed
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium">
                    {batchAnalysis.totalArabicChars} Arabic characters extracted
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Decoded Output Display & Action Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Languages className="h-4 w-4 text-emerald-500" />
                Decoded Human-Readable Output
              </h3>

              <div className="flex items-center gap-2">
                {mode === "single" ? (
                  <button
                    type="button"
                    onClick={() => handleCopy(singleAnalysis.decoded, "decoded_main")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    {copiedKey === "decoded_main" ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Decoded
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(batchAnalysis.allDecodedText, "batch_all")}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      {copiedKey === "batch_all" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      Copy All
                    </button>
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" /> CSV (Excel)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Decoded Main Box */}
            {mode === "single" ? (
              <div className="space-y-3">
                <div
                  dir={resolvedDir}
                  className="w-full min-h-[140px] max-h-[260px] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 p-4 text-emerald-400 font-sans text-sm sm:text-base leading-relaxed break-all select-all shadow-inner"
                >
                  {singleAnalysis.decoded || (
                    <span className="text-slate-500 font-mono text-xs">Awaiting encoded input...</span>
                  )}
                </div>

                {singleAnalysis.isUrl && singleAnalysis.decoded.startsWith("http") && (
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                    <span className="truncate max-w-[280px]">Host: {singleAnalysis.host}</span>
                    <a
                      href={singleAnalysis.decoded}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      Test in New Tab <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-full max-h-[260px] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 divide-y divide-slate-800/80">
                  {batchAnalysis.results.length === 0 ? (
                    <div className="p-4 text-xs font-mono text-slate-500">No lines to display.</div>
                  ) : (
                    batchAnalysis.results.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 flex items-start justify-between gap-3 hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="text-xs font-mono text-slate-500 shrink-0 pt-0.5">#{item.id}</span>
                          <div
                            dir={dirMode === "auto" ? (item.isArabic ? "rtl" : "ltr") : dirMode}
                            className="text-xs sm:text-sm text-emerald-400 font-sans break-all select-all leading-relaxed"
                          >
                            {item.decoded}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.decoded, `line_${item.id}`)}
                          className="shrink-0 p-1 text-slate-400 hover:text-white transition-colors"
                          title="Copy line"
                        >
                          {copiedKey === `line_${item.id}` ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Includes UTF-8 BOM for Microsoft Excel</span>
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1"
                  >
                    <Code2 className="h-3.5 w-3.5" /> Export JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual URL Decomposition & Parameter Breakdown Table (Single Mode) */}
      {mode === "single" && singleAnalysis.params.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Table className="h-4 w-4 text-indigo-500" />
                Extracted Query Parameters & Search Terms ({singleAnalysis.params.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Isolated parameter keys, raw percent-encoded byte strings, and clean decoded values.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200/60 dark:border-slate-700/50"
              >
                <Code2 className="h-3.5 w-3.5 text-indigo-500" /> Export JSON
              </button>
            </div>
          </div>

          {/* Parameters Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Parameter / Role</th>
                  <th className="px-4 py-3">Raw Encoded Value</th>
                  <th className="px-4 py-3">Decoded Readable Value</th>
                  <th className="px-3 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {singleAnalysis.params.map((param, pIdx) => (
                  <tr
                    key={pIdx}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span>{param.key}</span>
                        <span className="inline-flex w-fit items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          {param.typeTag}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-500 max-w-[200px] truncate" title={param.rawValue}>
                      {param.rawValue || <span className="text-slate-400 italic">empty</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div
                        dir={dirMode === "auto" ? (param.isArabic ? "rtl" : "ltr") : dirMode}
                        className={cn(
                          "font-sans font-medium text-slate-900 dark:text-slate-100 max-w-[280px] break-words",
                          param.isArabic && "text-sm text-emerald-600 dark:text-emerald-400 font-semibold"
                        )}
                      >
                        {param.decodedValue}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopy(param.decodedValue, `param_${pIdx}`)}
                        className="inline-flex items-center gap-1 p-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Copy parameter value"
                      >
                        {copiedKey === `param_${pIdx}` ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Path Hierarchy & Breadcrumbs (Single Mode with Path) */}
      {mode === "single" && singleAnalysis.pathname && singleAnalysis.pathname !== "/" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-500" />
            Decoded Path Hierarchy
          </h4>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              /
            </span>
            {singleAnalysis.pathname
              .split("/")
              .filter(Boolean)
              .map((seg, sIdx) => {
                const isSegArabic = ARABIC_REGEX.test(seg);
                return (
                  <React.Fragment key={sIdx}>
                    <span className="text-slate-400">/</span>
                    <span
                      dir={isSegArabic ? "rtl" : "ltr"}
                      className={cn(
                        "px-2.5 py-1 rounded border font-medium",
                        isSegArabic
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                      )}
                    >
                      {seg}
                    </span>
                  </React.Fragment>
                );
              })}
            {singleAnalysis.hash && (
              <>
                <span className="text-slate-400">#</span>
                <span
                  dir={ARABIC_REGEX.test(singleAnalysis.hash) ? "rtl" : "ltr"}
                  className="px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-medium"
                >
                  {singleAnalysis.hash.replace(/^#/, "")}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Educational Callout Block */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-white to-emerald-50/80 dark:from-indigo-950/20 dark:via-slate-900 dark:to-emerald-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-900 dark:text-slate-200">
              Why do Arabic characters convert to percent-encoded strings (%D8%...)?
            </p>
            <p>
              Under internet standards (RFC 3986), URLs only accept US-ASCII characters. Non-ASCII UTF-8 characters like
              Arabic letters (e.g. &ldquo;سيو&rdquo;) are encoded into pairs of hexadecimal bytes prefixed by percent signs
              (<code>%D8%B3%D9%8A%D9%88</code>). This tool runs instant client-side decoding to convert campaign links,
              Google Ads search terms, and GA4 query strings back into natural readable Arabic with zero server latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArabicUrlDecoder;
