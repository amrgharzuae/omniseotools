"use client";

import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  BarChart3, 
  BookOpen, 
  Clock, 
  Mic, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  FileText,
  Search,
  Zap,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const SAMPLE_PRESETS = [
  {
    name: "SEO Blog Post",
    text: `Search engine optimization (SEO) is the process of improving your website to increase its visibility in Google search results. Effective SEO requires high-quality content, fast page speed, and relevant backlinks. When you optimize your SEO strategy, focus on matching search intent rather than artificial keyword stuffing. In this comprehensive SEO guide, we explore proven SEO techniques, keyword research best practices, and internal linking structures to build organic search authority and drive qualified traffic.`,
  },
  {
    name: "Product Description",
    text: `Introducing the ProSound Wireless Noise-Cancelling Headphones. Engineered with 40mm custom audio drivers, active noise cancellation technology, and 45-hour extended battery life. Experience studio-grade acoustic clarity and ultra-soft memory foam earcups. Connect seamlessly with Bluetooth 5.3 multipoint pairing and enjoy crystal-clear calls with our quad-microphone array. Free 2-day shipping and 2-year warranty included.`,
  },
  {
    name: "Keyword Stuffed (Warning Example)",
    text: `Buy cheap shoes online at our cheap shoes store. We offer the best cheap shoes, discount cheap shoes, running cheap shoes, and casual cheap shoes. If you are looking for cheap shoes in 2026, our cheap shoes website has the greatest cheap shoes selection with free cheap shoes delivery.`,
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

export function KeywordDensityAnalyzerTool() {
  const [text, setText] = useState(SAMPLE_PRESETS[0].text);
  const [excludeStopWords, setExcludeStopWords] = useState(true);
  const [minWordLength, setMinWordLength] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<"1-word" | "2-word" | "3-word">("1-word");
  const [searchFilter, setSearchFilter] = useState("");
  const [copiedReport, setCopiedReport] = useState(false);

  // Parsed Stats & N-Grams
  const {
    totalWords,
    totalCharsWithSpaces,
    totalCharsNoSpaces,
    sentenceCount,
    paragraphCount,
    readingTimeMin,
    speakingTimeMin,
    oneWordNgrams,
    twoWordNgrams,
    threeWordNgrams,
    maxDensity,
  } = useMemo(() => {
    if (!text.trim()) {
      return {
        totalWords: 0,
        totalCharsWithSpaces: 0,
        totalCharsNoSpaces: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        oneWordNgrams: [],
        twoWordNgrams: [],
        threeWordNgrams: [],
        maxDensity: 0,
      };
    }

    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;

    // Sentences & Paragraphs
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);

    // Words
    const rawWords = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-_]/g, " ")
      .split(/[\s-_]+/)
      .filter((w) => w.length > 0);

    const wordsCount = rawWords.length;
    const readMin = Math.max(1, Math.ceil(wordsCount / 225));
    const speakMin = Math.max(1, Math.ceil(wordsCount / 130));

    // 1-Word Analysis
    const oneWordMap: Record<string, number> = {};
    rawWords.forEach((word) => {
      if (word.length < minWordLength) return;
      if (excludeStopWords && STOP_WORDS.has(word)) return;
      oneWordMap[word] = (oneWordMap[word] || 0) + 1;
    });

    const oneWords = Object.entries(oneWordMap)
      .map(([word, count]) => ({
        phrase: word,
        count,
        density: wordsCount > 0 ? ((count / wordsCount) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // 2-Word Analysis
    const twoWordMap: Record<string, number> = {};
    for (let i = 0; i < rawWords.length - 1; i++) {
      const w1 = rawWords[i];
      const w2 = rawWords[i + 1];
      if (excludeStopWords && (STOP_WORDS.has(w1) && STOP_WORDS.has(w2))) continue;
      const phrase = `${w1} ${w2}`;
      twoWordMap[phrase] = (twoWordMap[phrase] || 0) + 1;
    }

    const twoWords = Object.entries(twoWordMap)
      .filter(([_, count]) => count > 1 || wordsCount < 50)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: wordsCount > 1 ? ((count / (wordsCount - 1)) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // 3-Word Analysis
    const threeWordMap: Record<string, number> = {};
    for (let i = 0; i < rawWords.length - 2; i++) {
      const w1 = rawWords[i];
      const w2 = rawWords[i + 1];
      const w3 = rawWords[i + 2];
      if (excludeStopWords && (STOP_WORDS.has(w1) && STOP_WORDS.has(w2) && STOP_WORDS.has(w3))) continue;
      const phrase = `${w1} ${w2} ${w3}`;
      threeWordMap[phrase] = (threeWordMap[phrase] || 0) + 1;
    }

    const threeWords = Object.entries(threeWordMap)
      .filter(([_, count]) => count > 1 || wordsCount < 50)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: wordsCount > 2 ? ((count / (wordsCount - 2)) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    const highestDensity = oneWords.length > 0 ? oneWords[0].density : 0;

    return {
      totalWords: wordsCount,
      totalCharsWithSpaces: charsWithSpaces,
      totalCharsNoSpaces: charsNoSpaces,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      readingTimeMin: readMin,
      speakingTimeMin: speakMin,
      oneWordNgrams: oneWords,
      twoWordNgrams: twoWords,
      threeWordNgrams: threeWords,
      maxDensity: highestDensity,
    };
  }, [text, excludeStopWords, minWordLength]);

  const activeNgrams = useMemo(() => {
    let list = activeTab === "1-word" ? oneWordNgrams : activeTab === "2-word" ? twoWordNgrams : threeWordNgrams;
    if (searchFilter.trim()) {
      list = list.filter((item) => item.phrase.toLowerCase().includes(searchFilter.toLowerCase()));
    }
    return list;
  }, [activeTab, oneWordNgrams, twoWordNgrams, threeWordNgrams, searchFilter]);

  const handleCopyReport = () => {
    const report = [
      `=== OmniSEOTools Keyword Density Report ===`,
      `Total Words: ${totalWords}`,
      `Total Characters: ${totalCharsWithSpaces} (no spaces: ${totalCharsNoSpaces})`,
      `Estimated Reading Time: ${readingTimeMin} min`,
      ``,
      `Top 1-Word Keywords:`,
      ...oneWordNgrams.slice(0, 5).map((n) => `- ${n.phrase}: ${n.count}x (${n.density.toFixed(1)}%)`),
      ``,
      `Top 2-Word Phrases:`,
      ...twoWordNgrams.slice(0, 5).map((n) => `- ${n.phrase}: ${n.count}x (${n.density.toFixed(1)}%)`),
    ].join("\n");

    navigator.clipboard.writeText(report);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> Samples:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setText(p.text)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors whitespace-nowrap"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setText("")}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1 rounded-md"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Top Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-center">
          <span className="text-[11px] font-medium text-slate-500 uppercase">Words</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{totalWords}</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-center">
          <span className="text-[11px] font-medium text-slate-500 uppercase">Characters</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{totalCharsWithSpaces}</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-center">
          <span className="text-[11px] font-medium text-slate-500 uppercase">Sentences</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{sentenceCount}</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-center">
          <span className="text-[11px] font-medium text-slate-500 uppercase">Reading Time</span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{readingTimeMin}m</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-center">
          <span className="text-[11px] font-medium text-slate-500 uppercase">Speaking Time</span>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{speakingTimeMin}m</div>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm text-center">
          <span className="text-[11px] font-medium text-slate-500 uppercase">Stuffing Risk</span>
          <div className={cn(
            "text-xs sm:text-sm font-bold mt-1.5 px-2 py-0.5 rounded-full inline-block",
            maxDensity > 3.0
              ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
              : maxDensity >= 2.0
              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
          )}>
            {maxDensity > 3.0 ? "High Risk (>3%)" : maxDensity >= 2.0 ? "Moderate (2-3%)" : "Safe (<2%)"}
          </div>
        </div>
      </div>

      {/* 2-Column Editor & N-Gram Frequency Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Text Area Editor (6 cols) */}
        <div className="lg:col-span-6 space-y-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
          
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              <span>Content Editor</span>
            </h2>
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              {copiedReport ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedReport ? "Report Copied!" : "Copy Report"}</span>
            </button>
          </div>

          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your content here to analyze keyword frequencies, density percentages, and reading metrics in real-time..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 leading-relaxed font-sans"
          />

          {/* Filter Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeStopWords}
                onChange={(e) => setExcludeStopWords(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Exclude Stop Words (the, and, of)</span>
            </label>

            <div className="flex items-center gap-2 text-slate-500">
              <span>Min Length:</span>
              <select
                value={minWordLength}
                onChange={(e) => setMinWordLength(Number(e.target.value))}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-xs font-mono"
              >
                <option value={2}>2+ chars</option>
                <option value={3}>3+ chars</option>
                <option value={4}>4+ chars</option>
                <option value={5}>5+ chars</option>
              </select>
            </div>
          </div>

        </div>

        {/* Right Column: N-Gram Tables (6 cols) */}
        <div className="lg:col-span-6 space-y-4 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            {/* N-Gram Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("1-word")}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  activeTab === "1-word"
                    ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                1-Word ({oneWordNgrams.length})
              </button>
              <button
                onClick={() => setActiveTab("2-word")}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  activeTab === "2-word"
                    ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                2-Word ({twoWordNgrams.length})
              </button>
              <button
                onClick={() => setActiveTab("3-word")}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  activeTab === "3-word"
                    ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                3-Word ({threeWordNgrams.length})
              </button>
            </div>

            {/* Live Search in N-Grams */}
            <div className="relative max-w-[140px]">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter phrase..."
                className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-1.5 pl-7 pr-2 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Density Table */}
          <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
            {activeNgrams.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No matching phrases found. Type or paste more content in the editor.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 font-semibold">Keyword Phrase</th>
                    <th className="py-2.5 font-semibold text-center">Count</th>
                    <th className="py-2.5 font-semibold text-right">Density (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {activeNgrams.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 font-medium text-slate-800 dark:text-slate-200">
                        {item.phrase}
                      </td>
                      <td className="py-2.5 text-center font-mono text-slate-500">
                        {item.count}x
                      </td>
                      <td className="py-2.5 text-right font-mono">
                        <span className={cn(
                          "px-2 py-0.5 rounded-md text-[11px] font-semibold",
                          item.density > 3.0
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                            : item.density >= 2.0
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        )}>
                          {item.density.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
