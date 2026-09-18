"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Type,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Link as LinkIcon,
  Globe,
  Scissors,
  ArrowRight,
  Download,
  ListOrdered,
  FileSpreadsheet,
  Layers,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SAMPLE_PRESETS = [
  {
    name: "Blog Article",
    title: "15 Best SEO Audit Tools & Software in 2026! (The Ultimate Guide)",
    prefix: "/blog/",
  },
  {
    name: "E-Commerce Product",
    title: "Apple MacBook Pro 16-inch (M3 Max, 64GB RAM, 1TB SSD) - Space Black",
    prefix: "/products/",
  },
  {
    name: "Accented Recipe",
    title: "Café & Crème Brûlée: L'histoire de la pâtisserie française!",
    prefix: "/recipes/",
  },
  {
    name: "Developer Tutorial",
    title: "How to Build a High-Performance Next.js Web App in 10 Easy Steps",
    prefix: "/tutorials/",
  },
];

const PREFIX_PILLS = [
  { label: "None", value: "" },
  { label: "/blog/", value: "/blog/" },
  { label: "/products/", value: "/products/" },
  { label: "/posts/", value: "/posts/" },
  { label: "/tools/", value: "/tools/" },
  { label: "/category/", value: "/category/" },
];

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "could", "did", "do", "does", "doing", "down", "during",
  "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "him", "his", "how",
  "i", "if", "in", "into", "is", "it", "its",
  "me", "more", "most", "my",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "out", "over", "own",
  "same", "she", "should", "so", "some", "such",
  "than", "that", "the", "their", "theirs", "them", "then", "there", "these", "they", "this", "those", "through", "to", "too",
  "under", "until", "up", "very",
  "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would",
  "you", "your", "yours"
]);

const ACCENT_MAP: Record<string, string> = {
  "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a", "æ": "ae",
  "ç": "c",
  "è": "e", "é": "e", "ê": "e", "ë": "e",
  "ì": "i", "í": "i", "î": "i", "ï": "i",
  "ñ": "n",
  "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o", "ø": "o", "œ": "oe",
  "ù": "u", "ú": "u", "û": "u", "ü": "u",
  "ý": "y", "ÿ": "y",
  "ß": "ss",
  "À": "a", "Á": "a", "Â": "a", "Ã": "a", "Ä": "a", "Å": "a", "Æ": "ae",
  "Ç": "c",
  "È": "e", "É": "e", "Ê": "e", "Ë": "e",
  "Ì": "i", "Í": "i", "Î": "i", "Ï": "i",
  "Ñ": "n",
  "Ò": "o", "Ó": "o", "Ô": "o", "Õ": "o", "Ö": "o", "Ø": "o", "Œ": "oe",
  "Ù": "u", "Ú": "u", "Û": "u", "Ü": "u",
  "Ý": "y",
};

const DEFAULT_BULK_INPUT = `15 Best SEO Audit Tools & Software in 2026!
Apple MacBook Pro 16-inch (M3 Max, 64GB RAM)
Café & Crème Brûlée: L'histoire de la pâtisserie
How to Build a High-Performance Next.js Web App
The Complete Guide to E-Commerce Conversion Optimization`;

export function SlugGeneratorClient() {
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [inputTitle, setInputTitle] = useState(
    "15 Best SEO Audit Tools & Software in 2026! (The Ultimate Guide)"
  );
  const [baseDomain, setBaseDomain] = useState("https://omniseotools.com");
  const [selectedPrefix, setSelectedPrefix] = useState("/blog/");
  const [delimiter, setDelimiter] = useState<"hyphen" | "underscore">("hyphen");
  const [isLowercase, setIsLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [transliterateAccents, setTransliterateAccents] = useState(true);
  const [maxLength, setMaxLength] = useState<number>(60);

  // Bulk Mode state
  const [bulkInput, setBulkInput] = useState(DEFAULT_BULK_INPUT);
  const [copiedBulk, setCopiedBulk] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [copiedFullUrl, setCopiedFullUrl] = useState(false);

  // Helper transliteration function
  const normalizeAccents = (text: string) => {
    if (!transliterateAccents) return text;
    return text.replace(
      /[àáâãäåæçèéêëìíîïñòóôõöøœùúûüýÿßÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØŒÙÚÛÜÝ]/g,
      (m) => ACCENT_MAP[m] || m
    );
  };

  // Pure slug generator function
  const slugify = (text: string) => {
    if (!text.trim()) return "";
    const sep = delimiter === "hyphen" ? "-" : "_";
    let cleaned = normalizeAccents(text);
    if (isLowercase) cleaned = cleaned.toLowerCase();

    // Remove unwanted non-alphanumeric characters except spaces/hyphens/underscores
    cleaned = cleaned.replace(/[^a-zA-Z0-9\s-_]/g, "");

    if (removeNumbers) {
      cleaned = cleaned.replace(/\d+/g, "");
    }

    let words = cleaned.split(/[\s-_]+/).filter(Boolean);

    if (removeStopWords) {
      const filtered = words.filter((w) => !STOP_WORDS.has(w.toLowerCase()));
      if (filtered.length > 0) {
        words = filtered;
      }
    }

    let result = words.join(sep);
    if (maxLength > 0 && result.length > maxLength) {
      result = result.substring(0, maxLength).replace(/[-_]+$/, "");
    }
    return result;
  };

  // Single mode outputs
  const slug = useMemo(() => slugify(inputTitle), [
    inputTitle,
    delimiter,
    isLowercase,
    removeStopWords,
    removeNumbers,
    transliterateAccents,
    maxLength,
  ]);

  const cleanDomain = baseDomain.replace(/\/+$/, "");
  const cleanPrefix = selectedPrefix ? `/${selectedPrefix.replace(/^\/+|\/+$/g, "")}/` : "/";
  const fullPermalink = `${cleanDomain}${cleanPrefix === "/" ? "/" : cleanPrefix}${slug}`;

  const wordCount = slug ? slug.split(/[-_]/).filter(Boolean).length : 0;
  const charCount = slug.length;

  // Slug Health Indicator
  const healthStatus = useMemo(() => {
    if (!slug) {
      return {
        label: "Empty Slug",
        color: "text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700",
      };
    }
    if (charCount > 60 || wordCount > 6) {
      return {
        label: "Length Warning (>60 chars / >6 words)",
        color: "text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-500/30",
      };
    }
    if (wordCount >= 2 && wordCount <= 5 && charCount >= 10 && charCount <= 50) {
      return {
        label: "Optimal SEO Length (2-5 words)",
        color: "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30",
      };
    }
    return {
      label: "Acceptable Length",
      color: "text-blue-700 bg-blue-50 dark:bg-blue-950/40 border-blue-500/30",
    };
  }, [slug, charCount, wordCount]);

  // Bulk Mode calculations
  const bulkResults = useMemo(() => {
    const lines = bulkInput.split("\n").map((l) => l.trim()).filter(Boolean);
    return lines.map((original) => {
      const generatedSlug = slugify(original);
      const permalink = `${cleanDomain}${cleanPrefix === "/" ? "/" : cleanPrefix}${generatedSlug}`;
      return {
        original,
        slug: generatedSlug,
        permalink,
      };
    });
  }, [bulkInput, cleanDomain, cleanPrefix, delimiter, isLowercase, removeStopWords, removeNumbers, transliterateAccents, maxLength]);

  const handleCopySlug = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const handleCopyFullUrl = () => {
    if (!fullPermalink) return;
    navigator.clipboard.writeText(fullPermalink);
    setCopiedFullUrl(true);
    setTimeout(() => setCopiedFullUrl(false), 2000);
  };

  const handleCopyAllBulk = () => {
    const allSlugs = bulkResults.map((r) => r.slug).join("\n");
    navigator.clipboard.writeText(allSlugs);
    setCopiedBulk(true);
    setTimeout(() => setCopiedBulk(false), 2000);
  };

  const handleExportCsv = () => {
    const csvContent =
      "Original Title,Generated Slug,Full Permalink\n" +
      bulkResults
        .map(
          (r) =>
            `"${r.original.replace(/"/g, '""')}","${r.slug}","${r.permalink}"`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "seo-url-slugs.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplyPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setInputTitle(preset.title);
    setSelectedPrefix(preset.prefix);
  };

  const handleReset = () => {
    setInputTitle("");
    setSelectedPrefix("/blog/");
    setDelimiter("hyphen");
    setIsLowercase(true);
    setRemoveStopWords(true);
    setRemoveNumbers(false);
    setTransliterateAccents(true);
    setMaxLength(60);
  };

  return (
    <div className="space-y-8">
      {/* MODE SELECTOR TABS & PRESETS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        {/* Tab Switcher */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab("single")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === "single"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Type className="h-3.5 w-3.5" />
            <span>Single Slug Mode</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bulk")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === "bulk"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <ListOrdered className="h-3.5 w-3.5" />
            <span>Bulk Batch Mode</span>
          </button>
        </div>

        {/* 1-Click Sample Pills (Single Mode) */}
        {activeTab === "single" && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Samples:
            </span>
            {SAMPLE_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/60 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* WORKBENCH: 2 COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input & Customization Settings (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* SINGLE MODE INPUT */}
          {activeTab === "single" ? (
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <label
                  htmlFor="input-title"
                  className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
                >
                  <Type className="h-3.5 w-3.5 text-blue-600" />
                  <span>Page Title / Heading Input</span>
                </label>
                <button
                  type="button"
                  onClick={() => setInputTitle("")}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              </div>

              <textarea
                id="input-title"
                rows={3}
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Type or paste your article title, product name, or headline here..."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-sm text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          ) : (
            /* BULK MODE INPUT */
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <label
                  htmlFor="bulk-input"
                  className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5"
                >
                  <ListOrdered className="h-3.5 w-3.5 text-blue-600" />
                  <span>Bulk Titles (1 Per Line)</span>
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  {bulkResults.length} items
                </span>
              </div>

              <textarea
                id="bulk-input"
                rows={7}
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Paste multi-line titles here (one title per line)..."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          )}

          {/* CONFIGURATION OPTIONS CARD */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Sanitization &amp; Structure Controls
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Delimiter Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Word Separator (Delimiter):
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDelimiter("hyphen")}
                  className={cn(
                    "p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2",
                    delimiter === "hyphen"
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>Hyphen (-)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                    Google Recommended
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDelimiter("underscore")}
                  className={cn(
                    "p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2",
                    delimiter === "underscore"
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>Underscore (_)</span>
                </button>
              </div>
            </div>

            {/* URL Prefix & Folder Pills */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>URL Subfolder Prefix:</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {selectedPrefix || "/"}
                </span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {PREFIX_PILLS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setSelectedPrefix(p.value)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer border",
                      selectedPrefix === p.value
                        ? "bg-blue-600 border-blue-600 text-white font-bold shadow-sm"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              {/* Strip Stop Words */}
              <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Strip Stop Words (a, the, and, in, of)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Creates keyword-dense, concise permalinks
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={removeStopWords}
                  onChange={(e) => setRemoveStopWords(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>

              {/* Transliterate Accents */}
              <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Transliterate Accents (é → e, ö → o, ñ → n)
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Converts special characters to clean Latin alphabet
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={transliterateAccents}
                  onChange={(e) => setTransliterateAccents(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>

              {/* Remove Numbers */}
              <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Remove Numbers &amp; Digits
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Strips dates and years (e.g. 2026) for evergreen URLs
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={removeNumbers}
                  onChange={(e) => setRemoveNumbers(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output Canvas & Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
          {activeTab === "single" ? (
            /* SINGLE MODE OUTPUT CARD */
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Generated SEO Slug
                  </span>
                </div>

                {/* Health Badge */}
                <div
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1",
                    healthStatus.color
                  )}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{healthStatus.label}</span>
                </div>
              </div>

              {/* Generated Slug Display Box */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Clean URL Slug:
                </span>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-sm sm:text-base text-emerald-400 shadow-inner flex items-center justify-between break-all">
                  <span>{slug || "your-clean-slug-appears-here"}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>{charCount} characters</span>
                  <span>{wordCount} words</span>
                </div>
              </div>

              {/* Full Permalink Preview */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Complete Canonical Permalink:
                </span>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-3 font-mono text-xs text-slate-600 dark:text-slate-300 break-all">
                  {fullPermalink}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopySlug}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer",
                    copiedSlug
                      ? "bg-emerald-700 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  )}
                >
                  {copiedSlug ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied Slug!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Slug Only</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyFullUrl}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-semibold transition-all border cursor-pointer",
                    copiedFullUrl
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  {copiedFullUrl ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>Copied Full URL!</span>
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" />
                      <span>Copy Full Permalink</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* BULK MODE OUTPUT CARD */
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Bulk Slugs Generated ({bulkResults.length})
                  </span>
                </div>
              </div>

              {/* Table of Generated Slugs */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-3 overflow-x-auto max-h-[300px]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-slate-400 border-b border-slate-800 pb-2">
                    <tr>
                      <th className="py-2 px-2">#</th>
                      <th className="py-2 px-2">Original Title</th>
                      <th className="py-2 px-2">Clean Slug</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {bulkResults.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-2 px-2 text-slate-500">{idx + 1}</td>
                        <td className="py-2 px-2 text-slate-400 truncate max-w-[140px]">
                          {r.original}
                        </td>
                        <td className="py-2 px-2 text-emerald-400 font-bold">
                          {r.slug}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyAllBulk}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer",
                    copiedBulk
                      ? "bg-emerald-700 text-white"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  )}
                >
                  {copiedBulk ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>All Slugs Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy All Slugs</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
