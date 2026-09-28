"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart3,
  Sparkles,
  RotateCcw,
  Search,
  Download,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Filter,
  Layers,
  Copy,
  Check,
  CheckCheck,
  BookOpen,
  Clock,
  FileText,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SamplePreset {
  name: string;
  badge: string;
  text: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    name: "Technical SEO Audit",
    badge: "Balanced (1.6%)",
    text: `Conducting a regular technical SEO audit is essential to maintain search engine crawlability and indexation health. During a technical SEO audit, webmasters inspect XML sitemaps, canonical tags, and HTTP response codes. Resolving redirect chains, fixing broken 404 links, and optimizing crawl budget ensure search engine bots can discover new content efficiently. A comprehensive technical SEO audit also analyzes server response latency, structured data validation, and mobile usability metrics to maximize organic search visibility and protect against ranking decay.`,
  },
  {
    name: "Core Web Vitals",
    badge: "Well-Optimized (1.4%)",
    text: `Optimizing Core Web Vitals is crucial for delivering an exceptional user experience and satisfying Google page experience ranking signals. The three primary Core Web Vitals metrics include Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Improving Largest Contentful Paint requires fast server response times, responsive image optimization, and high-priority resource preloading. To minimize Cumulative Layout Shift, always declare explicit width and height dimensions on media elements.`,
  },
  {
    name: "Internal Linking Architecture",
    badge: "Semantic Focus (1.8%)",
    text: `A structured internal linking architecture distributes PageRank equity and establishes contextual topical hierarchy across your website. By connecting related cluster articles with descriptive anchor text, you signal entity relationships to search engine algorithms. Maintain a shallow click depth so high-priority landing pages remain accessible within three clicks from the homepage. Auditing internal linking architecture helps uncover orphaned pages, eliminate broken links, and reinforce topical authority across content clusters.`,
  },
  {
    name: "Over-Optimized (Stuffing Alert)",
    badge: "Stuffing Warning (4.8%)",
    text: `Looking for the best technical seo audit? Our technical seo audit service provides the ultimate technical seo audit for enterprise brands. If you need a technical seo audit agency to perform your technical seo audit, our technical seo audit specialists deliver fast technical seo audit reports. Contact our technical seo audit team today for the best technical seo audit pricing and technical seo audit checklists.`,
  },
];

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "could", "did", "do", "does", "doing", "down", "during",
  "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "him", "his", "how",
  "i", "if", "in", "into", "is", "it", "its", "itself",
  "just", "me", "more", "most", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "out", "over", "own",
  "same", "she", "should", "so", "some", "such",
  "than", "that", "the", "their", "theirs", "them", "then", "there", "these", "they", "this", "those", "through", "to", "too",
  "under", "until", "up", "very",
  "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would",
  "you", "your", "yours",
]);

interface KeywordStat {
  phrase: string;
  count: number;
  density: number;
  status: "normal" | "warning" | "high";
}

export function KeywordDensity() {
  const [text, setText] = useState(SAMPLE_PRESETS[0].text);
  const [ngramTab, setNgramTab] = useState<1 | 2 | 3>(1);
  const [filterStopWords, setFilterStopWords] = useState(true);
  const [customExclusions, setCustomExclusions] = useState("");
  const [minCount, setMinCount] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [targetLookup, setTargetLookup] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedTop10, setCopiedTop10] = useState(false);

  // Custom stop words set
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

  // Compute Keyword Analysis
  const { totalWords, uniqueWords, totalChars, readingTimeMin, stats, maxDensityItem } = useMemo(() => {
    const rawTokens = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, " ")
      .split(/\s+/)
      .map((t) => t.replace(/^-+|-+$/g, ""))
      .filter((t) => t.length > 1 && !/^\d+$/.test(t));

    const wordCount = rawTokens.length;
    const charCount = text.length;
    const readingTime = Math.ceil(wordCount / 225) || 1;

    if (wordCount === 0) {
      return {
        totalWords: 0,
        uniqueWords: 0,
        totalChars: 0,
        readingTimeMin: 0,
        stats: { 1: [], 2: [], 3: [] },
        maxDensityItem: null,
      };
    }

    const isExcluded = (word: string) => {
      if (customStopSet.has(word)) return true;
      if (filterStopWords && STOP_WORDS.has(word)) return true;
      return false;
    };

    const computeNgrams = (n: number): KeywordStat[] => {
      const freqMap: Record<string, number> = {};

      for (let i = 0; i <= rawTokens.length - n; i++) {
        const slice = rawTokens.slice(i, i + n);

        // Stop word logic:
        if (n === 1) {
          if (isExcluded(slice[0])) continue;
        } else if (n === 2) {
          if (isExcluded(slice[0]) && isExcluded(slice[1])) continue;
        } else if (n === 3) {
          if (isExcluded(slice[0]) && isExcluded(slice[2])) continue;
        }

        const phrase = slice.join(" ");
        freqMap[phrase] = (freqMap[phrase] || 0) + 1;
      }

      const list: KeywordStat[] = Object.entries(freqMap).map(([phrase, count]) => {
        const density = Math.round((count / wordCount) * 1000) / 10;
        let status: "normal" | "warning" | "high" = "normal";
        if (n === 1) {
          if (density > 3.5) status = "high";
          else if (density > 2.5) status = "warning";
        } else if (n === 2) {
          if (density > 2.5) status = "high";
          else if (density > 1.8) status = "warning";
        } else {
          if (density > 2.0) status = "high";
          else if (density > 1.4) status = "warning";
        }

        return { phrase, count, density, status };
      });

      return list.sort((a, b) => b.count - a.count || b.density - a.density);
    };

    const oneWord = computeNgrams(1);
    const twoWord = computeNgrams(2);
    const threeWord = computeNgrams(3);

    const maxItem = oneWord.length > 0 ? oneWord[0] : null;

    return {
      totalWords: wordCount,
      uniqueWords: new Set(rawTokens).size,
      totalChars: charCount,
      readingTimeMin: readingTime,
      stats: {
        1: oneWord,
        2: twoWord,
        3: threeWord,
      },
      maxDensityItem: maxItem,
    };
  }, [text, filterStopWords, customStopSet]);

  const displayedKeywords = useMemo(() => {
    const list = stats[ngramTab] || [];
    return list.filter(
      (k) =>
        k.count >= minCount &&
        (searchFilter.trim() === "" ||
          k.phrase.toLowerCase().includes(searchFilter.toLowerCase()))
    );
  }, [stats, ngramTab, minCount, searchFilter]);

  // Specific target keyword lookup calculation
  const targetLookupResult = useMemo(() => {
    if (!targetLookup.trim() || !text.trim()) return null;
    const query = targetLookup.toLowerCase().trim();
    const regex = new RegExp(`\\b${query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "gi");
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    const density = totalWords > 0 ? Number(((count / totalWords) * 100).toFixed(2)) : 0;

    let status = "Healthy Density (Optimal)";
    let color = "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30";
    if (density === 0) {
      status = "Not Found in Text";
      color = "text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-300";
    } else if (density > 3.0) {
      status = "Potential Stuffing Alert (>3.0%)";
      color = "text-rose-700 bg-rose-50 dark:bg-rose-950/40 border-rose-500/30";
    } else if (density > 2.2) {
      status = "Elevated Density (2.2% - 3.0%)";
      color = "text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-500/30";
    }

    return { query, count, density, status, color };
  }, [targetLookup, text, totalWords]);

  const downloadCsv = () => {
    const rows = [
      ["Phrase", "Words", "Occurrences", "Density (%)", "Risk Level"],
      ...displayedKeywords.map((k) => [
        `"${k.phrase}"`,
        ngramTab.toString(),
        k.count.toString(),
        `${k.density}%`,
        k.status,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `keyword-density-${ngramTab}word.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyTop10 = () => {
    const top10 = displayedKeywords.slice(0, 10);
    const content = top10
      .map((item, idx) => `${idx + 1}. "${item.phrase}" - ${item.count}x (${item.density}%) [${item.status}]`)
      .join("\n");
    navigator.clipboard.writeText(content);
    setCopiedTop10(true);
    setTimeout(() => setCopiedTop10(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. TOP PRESET SAMPLES & QUICK ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Live SEO Samples:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setText(p.text)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-all cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setText("")}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear Editor
        </button>
      </div>

      {/* 2. REAL-TIME METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Words</span>
            <BookOpen className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {totalWords}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Unique Vocabulary</span>
            <Layers className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {uniqueWords}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Lexical Diversity</span>
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {totalWords > 0 ? Math.round((uniqueWords / totalWords) * 100) : 0}%
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Reading Time</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            ~{readingTimeMin} min
          </p>
        </div>
      </div>

      {/* 3. MAIN STUDIO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Text Input & Spot Checker */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-500" />
                Article &amp; Copy Input
              </h2>
              <button
                type="button"
                onClick={copyText}
                className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>

            <textarea
              rows={11}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article draft, technical SEO audit notes, or blog copy to analyze 1-word, 2-word, and 3-word n-gram keyword density percentages in real time..."
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed resize-none"
            />

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>{totalWords} words • {totalChars} characters</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Client-Side &amp; Private
              </span>
            </div>
          </div>

          {/* Spot Check Specific Keyword */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Target Keyword Spot Check
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                Exact Query Density
              </span>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={targetLookup}
                onChange={(e) => setTargetLookup(e.target.value)}
                placeholder="Enter focus keyword or n-gram (e.g., 'technical seo audit', 'core web vitals')..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {targetLookupResult && (
                <div
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all",
                    targetLookupResult.color
                  )}
                >
                  <div className="space-y-0.5">
                    <span className="block font-bold">
                      &quot;{targetLookupResult.query}&quot; &mdash; {targetLookupResult.count} occurrences
                    </span>
                    <span className="block text-[11px] opacity-85">
                      Status: {targetLookupResult.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold font-mono block">
                      {targetLookupResult.density}%
                    </span>
                    <span className="text-[10px] uppercase tracking-wider opacity-85">
                      Density
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filtering Controls */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Stop Words &amp; Exclusions
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                    Exclude English Stop Words
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Filters common grammatical filler words (e.g. the, and, in, of, is)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={filterStopWords}
                  onChange={(e) => setFilterStopWords(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </label>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Custom Excluded Words (Comma-Separated):</span>
                </label>
                <input
                  type="text"
                  value={customExclusions}
                  onChange={(e) => setCustomExclusions(e.target.value)}
                  placeholder="e.g. also, may, can, will, must"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Density Results Table & N-Grams */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
          
          {/* Over-optimization Warning Banner */}
          {maxDensityItem && (
            <div
              className={cn(
                "rounded-3xl border p-5 shadow-sm space-y-2 transition-all",
                maxDensityItem.density > 3.0
                  ? "border-rose-500/40 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200"
                  : maxDensityItem.density > 2.2
                  ? "border-amber-500/40 bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200"
                  : "border-emerald-500/40 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200"
              )}
            >
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                {maxDensityItem.density > 3.0 ? (
                  <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                )}
                <span>
                  Top Term: &quot;{maxDensityItem.phrase}&quot; ({maxDensityItem.density}% density)
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {maxDensityItem.density > 3.0
                  ? "Warning: Your top phrase exceeds the recommended 3.0% safety threshold. Replace repetitive instances with semantic synonyms to prevent algorithmic keyword stuffing penalties."
                  : maxDensityItem.density > 2.2
                  ? "Moderate density detected. Keep keyword repetition in check across remaining subheadings and body paragraphs."
                  : "Excellent! Your content maintains a balanced keyword distribution within the recommended 1.0% to 2.0% safe threshold."}
              </p>
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            
            {/* Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              {/* N-Gram Tab Selector */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200/60 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setNgramTab(1)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
                    ngramTab === 1
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  1-Word ({stats[1]?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setNgramTab(2)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
                    ngramTab === 2
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  2-Words ({stats[2]?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setNgramTab(3)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
                    ngramTab === 3
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  3-Words ({stats[3]?.length || 0})
                </button>
              </div>

              {/* Table Search Filter */}
              <div className="relative min-w-[160px]">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter phrases..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Density Results List */}
            <div className="overflow-x-auto max-h-[360px] overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 sticky top-0 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Keyword Phrase</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Freq</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Density</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  {displayedKeywords.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400 font-sans">
                        No keyword phrases found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    displayedKeywords.slice(0, 50).map((k, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white font-sans truncate max-w-[180px]">
                          {k.phrase}
                        </td>
                        <td className="py-2.5 px-3 text-center text-slate-600 dark:text-slate-300">
                          {k.count}x
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold">
                          <span
                            className={cn(
                              k.status === "high"
                                ? "text-rose-600 font-bold"
                                : k.status === "warning"
                                ? "text-amber-600 font-semibold"
                                : "text-emerald-600"
                            )}
                          >
                            {k.density}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-sans">
                          {k.status === "high" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-rose-100 dark:bg-rose-950/60 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-300">
                              <AlertTriangle className="h-3 w-3" /> Stuffing Alert
                            </span>
                          ) : k.status === "warning" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              Elevated
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                              <CheckCircle2 className="h-3 w-3" /> Safe
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Export & Copy Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={copyTop10}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer",
                  copiedTop10
                    ? "bg-emerald-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
                )}
              >
                {copiedTop10 ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Top 10 Phrases!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Top 10 Phrases</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={downloadCsv}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
