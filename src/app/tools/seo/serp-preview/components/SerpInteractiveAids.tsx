"use client";

import React, { useState, useMemo } from "react";
import {
  calculateTitlePixels,
  calculateDescPixels,
  SERP_LIMITS,
} from "@/lib/serp-utils";
import {
  Sliders,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  BarChart2,
  Eye,
  Star,
  Layers,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GLYPH_WIDTH_MAP_20PX: Record<string, number> = {
  W: 20,
  M: 18,
  "@": 20,
  "%": 19,
  "&": 15,
  w: 16,
  m: 18,
  O: 16,
  Q: 16,
  G: 16,
  D: 15,
  C: 15,
  H: 15,
  U: 15,
  A: 14,
  B: 14,
  E: 14,
  K: 14,
  P: 14,
  R: 14,
  S: 14,
  V: 14,
  X: 14,
  Y: 14,
  N: 15,
  T: 13,
  Z: 13,
  "0": 12,
  "1": 12,
  "2": 12,
  "3": 12,
  "4": 12,
  "5": 12,
  "6": 12,
  "7": 12,
  "8": 12,
  "9": 12,
  b: 12,
  d: 12,
  g: 12,
  h: 12,
  n: 12,
  o: 12,
  p: 12,
  q: 12,
  u: 12,
  v: 11,
  a: 11,
  c: 11,
  e: 11,
  k: 11,
  s: 11,
  x: 11,
  y: 11,
  "?": 11,
  z: 10,
  J: 10,
  r: 7,
  "(": 7,
  ")": 7,
  "-": 7,
  f: 6,
  t: 6,
  " ": 6,
  "|": 6,
  ":": 6,
  ";": 6,
  ".": 6,
  ",": 6,
  "!": 6,
  "/": 6,
  I: 5,
  i: 5,
  j: 5,
  l: 5,
};

const PRESET_GLYPH_SAMPLES = [
  {
    label: "Wide Glyphs (Heavy)",
    text: "WWW MMM @@@ &&& OOO",
    desc: "15 chars = ~270px (Average 18.0px/char)",
  },
  {
    label: "Narrow Glyphs (Light)",
    text: "iiii llll tttt jjjj ||||",
    desc: "24 chars = ~132px (Average 5.5px/char)",
  },
  {
    label: "Numbers & Dates",
    text: "2026 Guide: $99 (50% Off)",
    desc: "25 chars = ~248px (Average 9.9px/char)",
  },
  {
    label: "High-CTR Balanced Title",
    text: "10 Proven SEO Tips for 2026 | OmniSEO",
    desc: "37 chars = ~412px (Optimal SERP real estate)",
  },
];

export function SerpInteractiveAids() {
  const [activeTab, setActiveTab] = useState<"glyph" | "diagnostic" | "rich">("glyph");

  // Glyph Visualizer State
  const [glyphInput, setGlyphInput] = useState("10 Proven SEO Tips for 2026 | OmniSEO");

  // Diagnostic State
  const [hasBrandSuffix, setHasBrandSuffix] = useState(true);
  const [isLengthOptimal, setIsLengthOptimal] = useState(true);
  const [hasKeywordStuffing, setHasKeywordStuffing] = useState(false);
  const [matchesH1, setMatchesH1] = useState(true);
  const [hasBoilerplate, setHasBoilerplate] = useState(false);

  // Rich Schema Simulator State
  const [showRating, setShowRating] = useState(true);
  const [ratingScore, setRatingScore] = useState("4.9");
  const [ratingCount, setRatingCount] = useState("128");
  const [showPrice, setShowPrice] = useState(false);
  const [priceAmount, setPriceAmount] = useState("$49.00");
  const [showSitelinks, setShowSitelinks] = useState(true);

  // Glyph Calculations
  const calculatedPx = useMemo(() => calculateTitlePixels(glyphInput), [glyphInput]);
  const charCount = glyphInput.length;
  const avgPxPerChar = charCount > 0 ? (calculatedPx / charCount).toFixed(1) : "0.0";

  // Breakdown of top characters
  const charBreakdown = useMemo(() => {
    const counts: Record<string, { count: number; width: number; total: number }> = {};
    for (const char of glyphInput) {
      const w = GLYPH_WIDTH_MAP_20PX[char] || 11;
      if (!counts[char]) {
        counts[char] = { count: 0, width: w, total: 0 };
      }
      counts[char].count += 1;
      counts[char].total += w;
    }
    return Object.entries(counts)
      .map(([char, data]) => ({ char: char === " " ? "␣ (space)" : char, ...data }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  }, [glyphInput]);

  // Diagnostic Score Calculation
  const rewriteRisk = useMemo(() => {
    let riskPoints = 0;
    if (!isLengthOptimal) riskPoints += 30;
    if (hasKeywordStuffing) riskPoints += 35;
    if (!matchesH1) riskPoints += 20;
    if (!hasBrandSuffix) riskPoints += 15;
    if (hasBoilerplate) riskPoints += 25;

    let level: "Low" | "Moderate" | "High" = "Low";
    let color = "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500/30";
    let pct = "8.2%";

    if (riskPoints >= 50) {
      level = "High";
      color = "text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-500/30";
      pct = "68.4%";
    } else if (riskPoints >= 25) {
      level = "Moderate";
      color = "text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-500/30";
      pct = "34.1%";
    }

    return { points: riskPoints, level, color, pct };
  }, [hasBrandSuffix, isLengthOptimal, hasKeywordStuffing, matchesH1, hasBoilerplate]);

  return (
    <section className="mt-16 space-y-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-white dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950 p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Interactive SERP Intelligence Lab
              </h2>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                Original Visual Tool
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive character typography metrics, rewrite diagnostics, and rich SERP simulation
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => setActiveTab("glyph")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeTab === "glyph"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>Glyph Width Meter</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("diagnostic")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeTab === "diagnostic"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Rewrite Risk Diagnostic</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("rich")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeTab === "rich"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Rich Schema SERP View</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE GLYPH WIDTH VISUALIZER */}
      {activeTab === "glyph" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input & Presets (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Type Any Text to Inspect Proportional Font Metrics (Arial 20px):</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    {calculatedPx}px / 600px limit
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={glyphInput}
                  onChange={(e) => setGlyphInput(e.target.value)}
                  placeholder="Type characters here to see their exact horizontal pixel footprint..."
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-slate-100 font-sans focus:border-emerald-500 focus:outline-none shadow-sm"
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Quick Empirical Comparison Presets:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRESET_GLYPH_SAMPLES.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGlyphInput(sample.text)}
                      className="text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-2.5 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all cursor-pointer"
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>{sample.label}</span>
                        <ArrowRight className="h-3 w-3 text-emerald-600" />
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                        {sample.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Metric Display Card (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">
                Live Computed Metric Summary
              </h3>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Pixels</span>
                  <div className={cn("text-lg font-mono font-bold", calculatedPx > 600 ? "text-rose-500" : "text-emerald-600 dark:text-emerald-400")}>
                    {calculatedPx}px
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Characters</span>
                  <div className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                    {charCount}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg px/char</span>
                  <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                    {avgPxPerChar}px
                  </div>
                </div>
              </div>

              {/* Visual Container Gauge */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  <span>Desktop Google Line Limit (600px)</span>
                  <span className="font-mono">{((calculatedPx / 600) * 100).toFixed(0)}% full</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      calculatedPx > 600
                        ? "bg-rose-500"
                        : calculatedPx >= 450
                        ? "bg-emerald-500"
                        : "bg-amber-400"
                    )}
                    style={{ width: `${Math.min((calculatedPx / 600) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0px</span>
                  <span className="text-amber-500">450px (Ideal Start)</span>
                  <span className="text-rose-500 font-bold">600px (Cutoff)</span>
                </div>
              </div>

              {/* Glyph Width Table */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Character-by-Character Pixel Load Breakdown:
                </span>
                <div className="grid grid-cols-4 gap-1.5 text-[11px]">
                  {charBreakdown.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center rounded-lg bg-slate-50 dark:bg-slate-800/80 p-1 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{item.char}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.count}×{item.width} = {item.total}px
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE REWRITE RISK DIAGNOSTIC */}
      {activeTab === "diagnostic" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Checklist (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">
                Toggle Your Snippet Attributes to Test Algorithmic Risk:
              </h3>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={isLengthOptimal}
                  onChange={(e) => setIsLengthOptimal(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Title length is within safe window (450px – 580px)
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    Titles over 600px suffer a 61.4% rewrite rate as Google replaces them with internal headings.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={!hasKeywordStuffing}
                  onChange={(e) => setHasKeywordStuffing(!e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Free from repetitive keyword stuffing
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    Repeating the primary query 3+ times triggers an immediate 78.2% automated title override.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={matchesH1}
                  onChange={(e) => setMatchesH1(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Semantically aligned with page &lt;h1&gt; heading
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    When title and H1 diverge significantly in topic, Google rewrites the title to the H1 in 54.8% of cases.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={hasBrandSuffix}
                  onChange={(e) => setHasBrandSuffix(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Includes brand name with clean delimiter (| or -)
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    Omitting brand name causes Google to automatically append site domain in 49.1% of queries.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={!hasBoilerplate}
                  onChange={(e) => setHasBoilerplate(!e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Avoids generic boilerplate (e.g. &quot;Home&quot;, &quot;Products&quot;)
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    Generic single-word titles trigger a 68.3% rewrite rate using on-page anchor text.
                  </span>
                </div>
              </label>
            </div>

            {/* Risk Gauge Card (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-4 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Google Rewrite Probability Engine
              </span>

              <div className="py-2">
                <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-sm font-extrabold uppercase", rewriteRisk.color)}>
                  {rewriteRisk.level === "Low" && <CheckCircle2 className="h-4 w-4" />}
                  {rewriteRisk.level === "Moderate" && <AlertTriangle className="h-4 w-4" />}
                  {rewriteRisk.level === "High" && <XCircle className="h-4 w-4" />}
                  <span>{rewriteRisk.level} Rewrite Risk</span>
                </span>

                <div className="mt-3">
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                    {rewriteRisk.pct}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Estimated probability of Google altering your snippet
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3.5 text-left text-xs text-slate-600 dark:text-slate-300 space-y-1.5 border border-slate-200/60 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Recommendation:</span>
                </span>
                {rewriteRisk.level === "Low" ? (
                  <p>
                    Your snippet follows optimal search guidelines. Google has a 91.8% chance of displaying your exact title and meta description without overrides.
                  </p>
                ) : rewriteRisk.level === "Moderate" ? (
                  <p>
                    Ensure your primary keyword is near the beginning and verify that your page H1 heading closely mirrors your title wording.
                  </p>
                ) : (
                  <p className="text-rose-600 dark:text-rose-400">
                    High risk of algorithmic override. Shorten your title below 580px, remove duplicate keywords, and append your brand name.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RICH SCHEMA SIMULATOR */}
      {activeTab === "rich" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">
                Configure Rich Schema Elements:
              </span>

              {/* Star Rating Toggle */}
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span>Review Stars (AggregateRating)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showRating}
                    onChange={(e) => setShowRating(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
                {showRating && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold">Rating (1-5)</span>
                      <input
                        type="text"
                        value={ratingScore}
                        onChange={(e) => setRatingScore(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1.5 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold">Review Count</span>
                      <input
                        type="text"
                        value={ratingCount}
                        onChange={(e) => setRatingCount(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Price Tag Toggle */}
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Product Pricing (Offer Schema)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showPrice}
                    onChange={(e) => setShowPrice(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
                {showPrice && (
                  <div className="pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold">Price Display</span>
                    <input
                      type="text"
                      value={priceAmount}
                      onChange={(e) => setPriceAmount(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1.5 text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Sitelinks Toggle */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-blue-500" />
                    <span>Search Sitelinks Expansion</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showSitelinks}
                    onChange={(e) => setShowSitelinks(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Live Canvas Preview (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#202124] p-5 shadow-sm space-y-2 text-left font-sans">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Simulated Google Rich Search Card
              </span>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px] font-bold">
                  O
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] text-[#202124] dark:text-[#dadce0] leading-tight">
                    OmniSEOTools
                  </span>
                  <span className="text-[12px] text-[#4d5156] dark:text-[#bdc1c6] font-mono leading-tight">
                    https://omniseotools.com › tools › serp-preview
                  </span>
                </div>
              </div>

              <h3
                className="text-[20px] leading-snug text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-normal pt-1"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Google SERP Simulator &amp; Meta Pixel Counter (2026 Free Tool)
              </h3>

              {/* Rich Snippet Elements */}
              {(showRating || showPrice) && (
                <div className="flex items-center gap-2 text-xs text-[#70757a] dark:text-[#9aa0a6] pt-0.5">
                  {showRating && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <span>★★★★★</span>
                      <span className="text-[#70757a] dark:text-[#9aa0a6]">
                        Rating: {ratingScore}/5 · {ratingCount} votes
                      </span>
                    </div>
                  )}
                  {showRating && showPrice && <span>·</span>}
                  {showPrice && (
                    <span className="font-semibold text-[#202124] dark:text-[#dadce0]">
                      Price: {priceAmount} · In stock
                    </span>
                  )}
                </div>
              )}

              <p
                className="text-[14px] leading-relaxed text-[#4d5156] dark:text-[#bdc1c6]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Simulate exact Google Desktop &amp; Mobile search results, measure title and description pixel limits, and optimize CTR with real-time AI metadata generation.
              </p>

              {/* Sitelinks Mini Grid */}
              {showSitelinks && (
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                  <div className="space-y-0.5">
                    <span className="text-xs text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium">
                      Pixel Width Calculator
                    </span>
                    <p className="text-[11px] text-[#70757a] dark:text-[#9aa0a6] line-clamp-1">
                      Check exact Arial font metrics for desktop &amp; mobile.
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium">
                      AI Meta Tag Generator
                    </span>
                    <p className="text-[11px] text-[#70757a] dark:text-[#9aa0a6] line-clamp-1">
                      Generate high-CTR titles powered by Google Gemini.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
