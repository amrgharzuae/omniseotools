"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart3,
  BookOpen,
  Clock,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Search,
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Layers,
  Zap,
  Trash2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SamplePreset {
  name: string;
  badge: string;
  text: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    name: "SEO Blog Post",
    badge: "Well-Balanced",
    text: `Search engine optimization (SEO) is the process of improving your website to increase its visibility in Google search results. Effective SEO requires high-quality content, fast page speed, and relevant backlinks. When you optimize your SEO strategy, focus on matching search intent rather than artificial keyword stuffing. In this comprehensive SEO guide, we explore proven SEO techniques, keyword research best practices, and internal linking structures to build organic search authority and drive qualified traffic. Content marketing works hand in hand with technical SEO to deliver long-term organic growth.`,
  },
  {
    name: "E-Commerce Product",
    badge: "E-Commerce",
    text: `Introducing the ProSound Wireless Noise-Cancelling Headphones. Engineered with 40mm custom audio drivers, active noise cancellation technology, and 45-hour extended battery life. Experience studio-grade acoustic clarity and ultra-soft memory foam earcups. Connect seamlessly with Bluetooth 5.3 multipoint pairing and enjoy crystal-clear calls with our quad-microphone array. Free 2-day shipping and 2-year manufacturer warranty included with every headphone purchase.`,
  },
  {
    name: "Over-Optimized (Stuffing Warning)",
    badge: "Spam Warning",
    text: `Buy cheap shoes online at our cheap shoes store. We offer the best cheap shoes, discount cheap shoes, running cheap shoes, and casual cheap shoes. If you are looking for cheap shoes in 2026, our cheap shoes website has the greatest cheap shoes selection with free cheap shoes delivery. Contact our cheap shoes team today for cheap shoes discounts.`,
  },
];

const DEFAULT_STOP_WORDS = new Set([
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

interface NGramItem {
  keyword: string;
  count: number;
  density: number;
}

export function DensityAnalyzerClient() {
  const [text, setText] = useState(SAMPLE_PRESETS[0].text);
  const [activeTab, setActiveTab] = useState<"1-word" | "2-word" | "3-word">("1-word");
  const [excludeStopWords, setExcludeStopWords] = useState(true);
  const [customExclusions, setCustomExclusions] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [targetLookup, setTargetLookup] = useState("");
  const [copiedTop10, setCopiedTop10] = useState(false);

  // Parse custom stop words
  const customStopSet = useMemo(() => {
    if (!customExclusions.trim()) return new Set<string>();
    return new Set(
      customExclusions
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }, [customExclusions]);

  // Main text metrics & N-Gram computation
  const {
    totalWords,
    uniqueWords,
    totalCharsWithSpaces,
    totalCharsNoSpaces,
    readingTimeMin,
    speakingTimeMin,
    oneWordNgrams,
    twoWordNgrams,
    threeWordNgrams,
    maxDensityItem,
  } = useMemo(() => {
    if (!text.trim()) {
      return {
        totalWords: 0,
        uniqueWords: 0,
        totalCharsWithSpaces: 0,
        totalCharsNoSpaces: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        oneWordNgrams: [],
        twoWordNgrams: [],
        threeWordNgrams: [],
        maxDensityItem: null,
      };
    }

    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;

    // Tokenize raw words
    const rawTokens = text
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !/^\d+$/.test(w));

    const totalWordCount = rawTokens.length;
    const uniqueWordCount = new Set(rawTokens).size;
    const readingTime = Math.ceil(totalWordCount / 225) || 1;
    const speakingTime = Math.ceil(totalWordCount / 130) || 1;

    // Filter tokens for analysis based on stop word toggles
    const isStopWord = (word: string) => {
      if (customStopSet.has(word)) return true;
      if (excludeStopWords && DEFAULT_STOP_WORDS.has(word)) return true;
      return false;
    };

    const validTokens = rawTokens.filter((w) => !isStopWord(w));
    const validCount = validTokens.length || 1;

    // 1-Word (Unigrams)
    const unigramMap = new Map<string, number>();
    validTokens.forEach((word) => {
      unigramMap.set(word, (unigramMap.get(word) || 0) + 1);
    });

    const unigrams: NGramItem[] = Array.from(unigramMap.entries())
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: Number(((count / validCount) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    // 2-Word (Bigrams)
    const bigramMap = new Map<string, number>();
    for (let i = 0; i < rawTokens.length - 1; i++) {
      const w1 = rawTokens[i];
      const w2 = rawTokens[i + 1];
      if (!isStopWord(w1) && !isStopWord(w2)) {
        const bigram = `${w1} ${w2}`;
        bigramMap.set(bigram, (bigramMap.get(bigram) || 0) + 1);
      }
    }

    const bigrams: NGramItem[] = Array.from(bigramMap.entries())
      .filter(([, count]) => count >= 2 || totalWordCount < 50)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: Number(((count / validCount) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    // 3-Word (Trigrams)
    const trigramMap = new Map<string, number>();
    for (let i = 0; i < rawTokens.length - 2; i++) {
      const w1 = rawTokens[i];
      const w2 = rawTokens[i + 1];
      const w3 = rawTokens[i + 2];
      if (!isStopWord(w1) && !isStopWord(w3)) {
        const trigram = `${w1} ${w2} ${w3}`;
        trigramMap.set(trigram, (trigramMap.get(trigram) || 0) + 1);
      }
    }

    const trigrams: NGramItem[] = Array.from(trigramMap.entries())
      .filter(([, count]) => count >= 2 || totalWordCount < 50)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: Number(((count / validCount) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count);

    const maxItem = unigrams.length > 0 ? unigrams[0] : null;

    return {
      totalWords: totalWordCount,
      uniqueWords: uniqueWordCount,
      totalCharsWithSpaces: charsWithSpaces,
      totalCharsNoSpaces: charsNoSpaces,
      readingTimeMin: readingTime,
      speakingTimeMin: speakingTime,
      oneWordNgrams: unigrams,
      twoWordNgrams: bigrams,
      threeWordNgrams: trigrams,
      maxDensityItem: maxItem,
    };
  }, [text, excludeStopWords, customStopSet]);

  // Active N-Gram dataset
  const currentList = useMemo(() => {
    let list: NGramItem[] = [];
    if (activeTab === "1-word") list = oneWordNgrams;
    if (activeTab === "2-word") list = twoWordNgrams;
    if (activeTab === "3-word") list = threeWordNgrams;

    if (!searchFilter.trim()) return list;
    const query = searchFilter.toLowerCase().trim();
    return list.filter((item) => item.keyword.toLowerCase().includes(query));
  }, [activeTab, oneWordNgrams, twoWordNgrams, threeWordNgrams, searchFilter]);

  // Specific target keyword lookup calculation
  const targetLookupResult = useMemo(() => {
    if (!targetLookup.trim() || !text.trim()) return null;
    const query = targetLookup.toLowerCase().trim();
    const regex = new RegExp(`\\b${query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "gi");
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    const density = totalWords > 0 ? Number(((count / totalWords) * 100).toFixed(2)) : 0;

    let status = "Optimal";
    let color = "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30";
    if (density === 0) {
      status = "Not Found in Text";
      color = "text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-300";
    } else if (density > 3.5) {
      status = "Potential Stuffing (>3.5%)";
      color = "text-rose-700 bg-rose-50 dark:bg-rose-950/40 border-rose-500/30";
    } else if (density > 2.5) {
      status = "High Density (2.5% - 3.5%)";
      color = "text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-500/30";
    }

    return { query, count, density, status, color };
  }, [targetLookup, text, totalWords]);

  // Health Badge Generator helper
  const getDensityBadge = (density: number) => {
    if (density > 3.5) {
      return {
        label: `${density}% • Stuffing Alert`,
        className: "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800",
      };
    }
    if (density > 2.5) {
      return {
        label: `${density}% • High`,
        className: "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800",
      };
    }
    return {
      label: `${density}% • Optimal`,
      className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
    };
  };

  const handleCopyTop10 = () => {
    const top10 = currentList.slice(0, 10);
    const content = top10
      .map((item, idx) => `${idx + 1}. "${item.keyword}" - ${item.count}x (${item.density}%)`)
      .join("\n");
    navigator.clipboard.writeText(content);
    setCopiedTop10(true);
    setTimeout(() => setCopiedTop10(false), 2000);
  };

  const handleExportCsv = () => {
    const header = "Rank,Keyword,Count,Density Percentage\n";
    const rows = currentList
      .map(
        (item, idx) =>
          `${idx + 1},"${item.keyword.replace(/"/g, '""')}",${item.count},${item.density}%`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `keyword-density-${activeTab}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* 1. PRESET SELECTOR & SAMPLE BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Sample Content:
          </span>
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => setText(preset.text)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/60 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setText("")}
          className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Editor</span>
        </button>
      </div>

      {/* 2. REAL-TIME METRICS SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Words</span>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {totalWords}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Unique Vocabulary</span>
            <Layers className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {uniqueWords}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Characters</span>
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {totalCharsWithSpaces}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Reading Time</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            ~{readingTimeMin} min
          </p>
        </div>
      </div>

      {/* 3. MAIN WORKBENCH: 2 COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Editor & Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Content Editor */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-3">
            <label
              htmlFor="content-editor"
              className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                <span>Text / Markdown Input</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {totalWords} words • {totalCharsNoSpaces} chars (no space)
              </span>
            </label>

            <textarea
              id="content-editor"
              rows={11}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article, blog post draft, or product description here..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-4 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Specific Target Keyword Lookup */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Target Keyword Spot Check
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Exact Query Density
              </span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={targetLookup}
                onChange={(e) => setTargetLookup(e.target.value)}
                placeholder="Enter specific primary keyword (e.g. 'seo tools')..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
              />

              {targetLookupResult && (
                <div
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all",
                    targetLookupResult.color
                  )}
                >
                  <div className="space-y-0.5">
                    <span className="block font-bold">
                      &quot;{targetLookupResult.query}&quot; — {targetLookupResult.count} occurrences
                    </span>
                    <span className="block text-[11px] opacity-80">
                      Status: {targetLookupResult.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold font-mono block">
                      {targetLookupResult.density}%
                    </span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80">
                      Density
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filtering Controls */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Stop Words &amp; Exclusions
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Default Stop Words Toggle */}
              <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                    Strip English Stop Words
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Excludes common filler words (the, and, of, in, is, to)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={excludeStopWords}
                  onChange={(e) => setExcludeStopWords(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>

              {/* Custom Exclusions */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Custom Excluded Words (Comma-Separated):</span>
                </label>
                <input
                  type="text"
                  value={customExclusions}
                  onChange={(e) => setCustomExclusions(e.target.value)}
                  placeholder="e.g. also, may, can, will"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: N-Gram Tables, Health Alert, & Exports (6 cols) */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
          {/* OVERALL OVER-OPTIMIZATION HEALTH ALERT */}
          {maxDensityItem && (
            <div
              className={cn(
                "rounded-3xl border p-5 shadow-sm space-y-2 transition-all",
                maxDensityItem.density > 3.5
                  ? "border-rose-500/40 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200"
                  : maxDensityItem.density > 2.5
                  ? "border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200"
                  : "border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200"
              )}
            >
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                {maxDensityItem.density > 3.5 ? (
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
                <span>
                  Top Keyword: &quot;{maxDensityItem.keyword}&quot; ({maxDensityItem.density}% density)
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {maxDensityItem.density > 3.5
                  ? "Warning: Your top keyword exceeds the 3.5% threshold. Consider replacing repetitive instances with synonyms or pronouns to avoid Google keyword stuffing penalties."
                  : maxDensityItem.density > 2.5
                  ? "Moderate density detected. Keep keyword repetition in check across subsequent paragraphs."
                  : "Great work! Your content maintains a balanced keyword distribution below the 2.5% safety threshold."}
              </p>
            </div>
          )}

          {/* MAIN N-GRAM ANALYSIS CARD */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              {/* N-Gram Tab Switcher */}
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/60 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab("1-word")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    activeTab === "1-word"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  1-Word ({oneWordNgrams.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("2-word")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    activeTab === "2-word"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  2-Words ({twoWordNgrams.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("3-word")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    activeTab === "3-word"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  3-Words ({threeWordNgrams.length})
                </button>
              </div>

              {/* Table Search Filter */}
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter keywords..."
                  className="w-full sm:w-36 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1.5 pl-7 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                />
                <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2 top-2.5" />
              </div>
            </div>

            {/* Keyword Frequency Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-3 overflow-x-auto max-h-[340px]">
              {currentList.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500 font-mono">
                  No matching keywords found. Type or paste content in the editor.
                </div>
              ) : (
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-slate-400 border-b border-slate-800 pb-2">
                    <tr>
                      <th className="py-2 px-2 w-10">#</th>
                      <th className="py-2 px-2">Keyword Phrase</th>
                      <th className="py-2 px-2 text-center w-16">Count</th>
                      <th className="py-2 px-2 text-right">Density Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {currentList.slice(0, 30).map((item, idx) => {
                      const badge = getDensityBadge(item.density);
                      return (
                        <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-2 px-2 text-slate-500">{idx + 1}</td>
                          <td className="py-2 px-2 font-bold text-slate-100 truncate max-w-[170px]">
                            {item.keyword}
                          </td>
                          <td className="py-2 px-2 text-center text-blue-400 font-bold">
                            {item.count}
                          </td>
                          <td className="py-2 px-2 text-right">
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-md text-[10px] font-semibold border inline-block",
                                badge.className
                              )}
                            >
                              {badge.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyTop10}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer",
                  copiedTop10
                    ? "bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white"
                )}
              >
                {copiedTop10 ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Top 10!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Top 10 Keywords</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
