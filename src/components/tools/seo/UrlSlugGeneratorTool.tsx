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
  Link as LinkIcon,
  Globe,
  Scissors,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRESETS = [
  {
    name: "Blog Article",
    title: "15 Best SEO Audit Tools & Software in 2026! (The Ultimate Guide)",
    baseDomain: "https://yourwebsite.com/blog/",
  },
  {
    name: "E-Commerce Product",
    title: "Apple MacBook Pro 16-inch (M3 Max, 64GB RAM, 1TB SSD) - Space Black",
    baseDomain: "https://yourshop.com/products/",
  },
  {
    name: "Accents & Punctuation",
    title: "Cafe & Creme Brulee: L histoire de la patisserie francaise!",
    baseDomain: "https://recipemag.com/recipes/",
  },
  {
    name: "How-To Tutorial",
    title: "How to Build a High-Performance Next.js Web App in 10 Easy Steps",
    baseDomain: "https://devhub.io/tutorials/",
  },
];

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "could", "did", "do", "does", "doing", "down", "during",
  "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how",
  "i", "if", "in", "into", "is", "it", "its", "itself",
  "me", "more", "most", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
  "same", "she", "should", "so", "some", "such",
  "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too",
  "under", "until", "up", "very",
  "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would",
  "you", "your", "yours", "yourself", "yourselves"
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
  "ß": "ss"
};

export function UrlSlugGeneratorTool() {
  const [inputTitle, setInputTitle] = useState("15 Best SEO Audit Tools & Software in 2026! (The Ultimate Guide)");
  const [baseDomain, setBaseDomain] = useState("https://omniseotools.com/blog/");
  const [delimiter, setDelimiter] = useState<"hyphen" | "underscore">("hyphen");
  const [removeStopWords, setRemoveStopWords] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [maxLength, setMaxLength] = useState<number>(60);

  const [copiedSlug, setCopiedSlug] = useState(false);
  const [copiedFullUrl, setCopiedFullUrl] = useState(false);

  const normalizeAccents = (text: string) => {
    return text.replace(/[àáâãäåæçèéêëìíîïñòóôõöøœùúûüýÿß]/g, (m) => ACCENT_MAP[m] || m);
  };

  const { standardSlug, minimalSlug, fullUrl, wordCount, charCount } = useMemo(() => {
    if (!inputTitle.trim()) {
      return { standardSlug: "", minimalSlug: "", fullUrl: "", wordCount: 0, charCount: 0 };
    }

    const sep = delimiter === "hyphen" ? "-" : "_";
    let cleaned = normalizeAccents(inputTitle.toLowerCase());
    cleaned = cleaned.replace(/[^a-z0-9\s-_]/g, "");

    if (removeNumbers) {
      cleaned = cleaned.replace(/\d+/g, "");
    }

    const words = cleaned.split(/[\s-_]+/).filter(Boolean);

    let processedWords = words;
    if (removeStopWords) {
      const filtered = words.filter((w) => !STOP_WORDS.has(w));
      if (filtered.length > 0) processedWords = filtered;
    }

    let slug = processedWords.join(sep);
    if (maxLength && slug.length > maxLength) {
      slug = slug.substring(0, maxLength).replace(/[-_]+$/, "");
    }

    const minimal = words.filter((w) => !STOP_WORDS.has(w)).slice(0, 3).join(sep);
    const cleanBase = baseDomain.endsWith("/") ? baseDomain : baseDomain + "/";
    const full = cleanBase + slug;

    return {
      standardSlug: slug,
      minimalSlug: minimal,
      fullUrl: full,
      wordCount: processedWords.length,
      charCount: slug.length,
    };
  }, [inputTitle, baseDomain, delimiter, removeStopWords, removeNumbers, maxLength]);

  const handleCopySlug = () => {
    navigator.clipboard.writeText(standardSlug);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const handleCopyFullUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopiedFullUrl(true);
    setTimeout(() => setCopiedFullUrl(false), 2000);
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setInputTitle(preset.title);
    setBaseDomain(preset.baseDomain);
  };

  const handleReset = () => {
    setInputTitle("");
    setBaseDomain("https://example.com/blog/");
  };

  return (
    <div className="space-y-8">
      
      {/* Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleApplyPreset(p)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors whitespace-nowrap"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1 rounded-md"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form & Filters (5 cols) */}
        <div className="lg:col-span-5 space-y-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
          
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Title & Settings</span>
            <span className="text-xs font-normal text-slate-500">Live Transliteration</span>
          </h2>

          {/* Title Input */}
          <div className="space-y-1.5">
            <label htmlFor="title-slug-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Article or Product Title
            </label>
            <textarea
              id="title-slug-input"
              rows={3}
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="e.g., 10 Proven SEO Strategies in 2026 (The Ultimate Guide)"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Base URL / Prefix */}
          <div className="space-y-1.5">
            <label htmlFor="base-url-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Base Website URL & Subdirectory
            </label>
            <input
              id="base-url-input"
              type="text"
              value={baseDomain}
              onChange={(e) => setBaseDomain(e.target.value)}
              placeholder="https://example.com/blog/"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Delimiter Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Word Separator Delimiter
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDelimiter("hyphen")}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all",
                  delimiter === "hyphen"
                    ? "bg-slate-900 dark:bg-emerald-600 text-white border-transparent shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                )}
              >
                Hyphen (-) (Google Standard)
              </button>
              <button
                type="button"
                onClick={() => setDelimiter("underscore")}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all",
                  delimiter === "underscore"
                    ? "bg-slate-900 dark:bg-emerald-600 text-white border-transparent shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                )}
              >
                Underscore (_)
              </button>
            </div>
          </div>

          {/* Filtering Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={removeStopWords}
                onChange={(e) => setRemoveStopWords(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-700 dark:text-slate-300">
                <strong>Strip Stop Words</strong> (removes <em>and, the, of, in, for, a</em>)
              </span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={removeNumbers}
                onChange={(e) => setRemoveNumbers(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-700 dark:text-slate-300">
                Remove Numbers & Digits
              </span>
            </label>
          </div>

        </div>

        {/* Right Column: Output Cards & Variations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Clean Slug Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Scissors className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Optimized Clean URL Slug
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <span>{charCount} chars</span>
                <span>•</span>
                <span>{wordCount} words</span>
              </div>
            </div>

            {/* Display Output */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 text-sm font-mono text-emerald-400 break-all leading-relaxed shadow-inner min-h-[60px] flex items-center">
              {standardSlug || "clean-url-slug-appears-here"}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleCopySlug}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all"
              >
                {copiedSlug ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedSlug ? "Slug Copied!" : "Copy Clean Slug"}</span>
              </button>

              <button
                onClick={handleCopyFullUrl}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {copiedFullUrl ? <Check className="h-4 w-4 text-emerald-500" /> : <LinkIcon className="h-4 w-4" />}
                <span>{copiedFullUrl ? "Permalink Copied!" : "Copy Full Permalink"}</span>
              </button>
            </div>

          </div>

          {/* Full Permalink Live Preview */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-3">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-emerald-600" /> Full Permalink Preview
              </span>
              <span className="text-[11px] text-slate-400">Browser Representation</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 break-all">
              <span className="text-slate-400">{baseDomain}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{standardSlug}</span>
            </div>

          </div>

          {/* Minimalist Variation Card */}
          {minimalSlug && minimalSlug !== standardSlug && (
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Minimalist Short Slug (Top 3 Keywords)
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(minimalSlug);
                    setCopiedSlug(true);
                    setTimeout(() => setCopiedSlug(false), 2000);
                  }}
                  className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <Copy className="h-3 w-3" /> Copy
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs font-mono text-slate-600 dark:text-slate-300">
                {minimalSlug}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
