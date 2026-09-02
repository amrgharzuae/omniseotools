"use client";

import React, { useState, useMemo } from "react";
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
  CheckCheck,
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
    badge: "Balanced",
    text: `Search engine optimization (SEO) is the process of improving your website to increase its visibility in Google search results. Effective SEO requires high-quality content, fast page speed, and relevant backlinks. When you optimize your SEO strategy, focus on matching search intent rather than artificial keyword stuffing. In this comprehensive SEO guide, we explore proven SEO techniques, keyword research best practices, and internal linking structures to build organic search authority and drive qualified traffic. Content marketing works hand in hand with technical SEO to deliver long-term organic growth.`,
  },
  {
    name: "E-Commerce Product",
    badge: "Product Copy",
    text: `Introducing the ProSound Wireless Noise-Cancelling Headphones. Engineered with 40mm custom audio drivers, active noise cancellation technology, and 45-hour extended battery life. Experience studio-grade acoustic clarity and ultra-soft memory foam earcups. Connect seamlessly with Bluetooth 5.3 multipoint pairing and enjoy crystal-clear calls with our quad-microphone array. Free 2-day shipping and 2-year manufacturer warranty included with every headphone purchase.`,
  },
  {
    name: "Over-Optimized Example",
    badge: "Keyword Stuffed",
    text: `Buy cheap shoes online at our cheap shoes store. We offer the best cheap shoes, discount cheap shoes, running cheap shoes, and casual cheap shoes. If you are looking for cheap shoes in 2026, our cheap shoes website has the greatest cheap shoes selection with free cheap shoes delivery. Contact our cheap shoes team today for cheap shoes discounts.`,
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
  const [minCount, setMinCount] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [copied, setCopied] = useState(false);

  // Compute Keyword Analysis
  const { totalWords, uniqueWords, stats } = useMemo(() => {
    const rawTokens = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, " ")
      .split(/\s+/)
      .map((t) => t.replace(/^-+|-+$/g, ""))
      .filter((t) => t.length > 1);

    const wordCount = rawTokens.length;
    if (wordCount === 0) {
      return { totalWords: 0, uniqueWords: 0, stats: { 1: [], 2: [], 3: [] } };
    }

    const computeNgrams = (n: number): KeywordStat[] => {
      const freqMap: Record<string, number> = {};

      for (let i = 0; i <= rawTokens.length - n; i++) {
        const slice = rawTokens.slice(i, i + n);

        // Stop word logic:
        if (filterStopWords) {
          if (n === 1 && STOP_WORDS.has(slice[0])) continue;
          if (n > 1 && slice.every((w) => STOP_WORDS.has(w))) continue;
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
        } else {
          if (density > 2.5) status = "high";
          else if (density > 1.8) status = "warning";
        }

        return { phrase, count, density, status };
      });

      return list.sort((a, b) => b.count - a.count || b.density - a.density);
    };

    const oneWord = computeNgrams(1);
    const twoWord = computeNgrams(2);
    const threeWord = computeNgrams(3);

    return {
      totalWords: wordCount,
      uniqueWords: new Set(rawTokens).size,
      stats: {
        1: oneWord,
        2: twoWord,
        3: threeWord,
      },
    };
  }, [text, filterStopWords]);

  const displayedKeywords = useMemo(() => {
    const list = stats[ngramTab] || [];
    return list.filter(
      (k) =>
        k.count >= minCount &&
        (searchFilter.trim() === "" ||
          k.phrase.toLowerCase().includes(searchFilter.toLowerCase()))
    );
  }, [stats, ngramTab, minCount, searchFilter]);

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

  return (
    <div className="space-y-8">
      {/* Top Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Samples:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setText(p.text)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setText("")}
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Text
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Text Input */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-indigo-500" />
                Text Analyzer
              </h2>
              <button
                onClick={copyText}
                className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste article, blog post, or web page content to compute real-time keyword density..."
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed"
            />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Words</span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  {totalWords}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Unique Words</span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  {uniqueWords}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Lexical Diversity</span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono">
                  {totalWords > 0 ? Math.round((uniqueWords / totalWords) * 100) : 0}%
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Density Results Table */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            
            {/* Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              {/* N-Gram Tab Selector */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5">
                <button
                  onClick={() => setNgramTab(1)}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                    ngramTab === 1
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  1 Word
                </button>
                <button
                  onClick={() => setNgramTab(2)}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                    ngramTab === 2
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  2 Words
                </button>
                <button
                  onClick={() => setNgramTab(3)}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                    ngramTab === 3
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  3 Words
                </button>
              </div>

              {/* CSV Export */}
              <button
                onClick={downloadCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter keywords..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterStopWords}
                  onChange={(e) => setFilterStopWords(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Exclude Stop Words</span>
              </label>
            </div>

            {/* Density Results List */}
            <div className="overflow-x-auto max-h-[380px] overflow-y-auto border border-slate-100 dark:border-slate-800/80 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 sticky top-0 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Keyword Phrase</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Freq</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Density</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {displayedKeywords.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No keywords found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    displayedKeywords.map((k, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                          {k.phrase}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-slate-600 dark:text-slate-300">
                          {k.count}x
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-semibold">
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
                        <td className="py-2.5 px-3 text-center">
                          {k.status === "high" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-rose-100 dark:bg-rose-950/60 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-300">
                              <AlertTriangle className="h-3 w-3" /> Stuffed
                            </span>
                          ) : k.status === "warning" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              Warning
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                              <CheckCircle2 className="h-3 w-3" /> Healthy
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
