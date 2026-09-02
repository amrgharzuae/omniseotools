"use client";

import React, { useState, useMemo } from "react";
import {
  Laptop,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Eye,
  Globe,
  Star,
  Layers,
  Code2,
  CheckCheck,
  Sliders,
  CheckCircle2,
  HelpCircle,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  calculateTitlePixels,
  calculateDescPixels,
  truncateToPixels,
  analyzeCtr,
  SERP_LIMITS,
} from "@/lib/serp-utils";

export type SerpViewMode = "title-pixel" | "description-counter" | "full-simulator";

interface SERPPreviewerProps {
  mode?: SerpViewMode;
}

const SAMPLE_PRESETS = [
  {
    name: "SaaS Platform",
    title: "OmniSEOTools: Free High-Performance SEO & Marketing Utilities",
    description:
      "Access 20+ free developer-grade utilities for SEO specialists, growth marketers, and engineers. Simulate SERPs, build UTM links, and audit tags instantly.",
    url: "https://omniseotools.com/free-tools",
    siteName: "OmniSEOTools",
  },
  {
    name: "Blog Article",
    title: "15 Best Keyword Research Tools for 2026 (Free & Paid Comparison)",
    description:
      "Discover the top keyword research tools to uncover high-volume, low-competition search queries. Compare features, pricing, and pros/cons now.",
    url: "https://growthmasters.io/blog/keyword-tools",
    siteName: "GrowthMasters",
  },
  {
    name: "E-Commerce",
    title: "Noise-Cancelling Wireless Headphones (2026 Edition) | AudioMax",
    description:
      "Experience studio-grade acoustics, active noise cancellation, and 45-hour battery life. Order today for free 2-day shipping and 30-day money-back guarantee.",
    url: "https://audiomax.store/products/wireless-anc",
    siteName: "AudioMax",
  },
];

export function SERPPreviewer({ mode = "full-simulator" }: SERPPreviewerProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [title, setTitle] = useState(
    "OmniSEOTools: Free High-Performance SEO & Marketing Utilities"
  );
  const [description, setDescription] = useState(
    "Access 20+ free developer-grade utilities for SEO specialists, growth marketers, and engineers. Simulate SERPs, build UTM links, and audit tags instantly."
  );
  const [url, setUrl] = useState("https://omniseotools.com/free-tools");
  const [siteName, setSiteName] = useState("OmniSEOTools");
  const [includeDate, setIncludeDate] = useState(true);
  const [dateString, setDateString] = useState("Sep 2, 2026");
  const [includeRating, setIncludeRating] = useState(true);
  const [ratingVal, setRatingVal] = useState("4.9");
  const [ratingCount, setRatingCount] = useState("1,420");
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Pixel Calculations
  const titlePx = useMemo(() => calculateTitlePixels(title), [title]);
  const descPx = useMemo(() => calculateDescPixels(description), [description]);

  const maxTitlePx = device === "desktop" ? SERP_LIMITS.desktopTitlePx : SERP_LIMITS.mobileTitlePx;
  const maxDescPx = device === "desktop" ? SERP_LIMITS.desktopDescPx : SERP_LIMITS.mobileDescPx;

  const truncatedTitle = useMemo(
    () => truncateToPixels(title, maxTitlePx, true),
    [title, maxTitlePx]
  );
  const truncatedDesc = useMemo(
    () => truncateToPixels(description, maxDescPx, false),
    [description, maxDescPx]
  );

  const ctrAnalysis = useMemo(() => analyzeCtr(title, description), [title, description]);

  // Clean URL & Breadcrumbs
  const breadcrumbList = useMemo(() => {
    try {
      const clean = url.startsWith("http") ? url : `https://${url}`;
      const parsed = new URL(clean);
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      return [parsed.hostname, ...pathParts];
    } catch {
      return ["omniseotools.com", "free-tools"];
    }
  }, [url]);

  const handlePreset = (p: (typeof SAMPLE_PRESETS)[0]) => {
    setTitle(p.title);
    setDescription(p.description);
    setUrl(p.url);
    setSiteName(p.siteName);
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setSiteName("");
  };

  const exportHtmlTags = () => {
    const code = `<!-- Google / Search Engine Tags -->
<title>${title.trim()}</title>
<meta name="description" content="${description.trim()}" />
<link rel="canonical" href="${url.trim()}" />`;
    navigator.clipboard.writeText(code);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Load Sample:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handlePreset(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Fields
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-500" />
                SERP Parameters
              </h2>
              <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                Live 2026 Engine
              </span>
            </div>

            {/* Title Input & Pixel Gauge */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Meta Title Tag
                </label>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span
                    className={cn(
                      titlePx > maxTitlePx
                        ? "text-rose-500 font-bold"
                        : titlePx >= 400
                        ? "text-emerald-500 font-medium"
                        : "text-slate-400"
                    )}
                  >
                    {titlePx}px / {maxTitlePx}px
                  </span>
                  <span className="text-slate-400 font-normal">({title.length} chars)</span>
                </div>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Target Primary Keyword | Brand Name"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />

              {/* Pixel Ruler Bar */}
              <div className="space-y-1 pt-1">
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      titlePx > maxTitlePx
                        ? "bg-rose-500"
                        : titlePx >= 450
                        ? "bg-emerald-500"
                        : "bg-indigo-500"
                    )}
                    style={{ width: `${Math.min(100, (titlePx / maxTitlePx) * 100)}%` }}
                  />
                </div>
                {titlePx > maxTitlePx && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                    <AlertTriangle className="h-3 w-3 shrink-0" />
                    Warning: Title exceeds {maxTitlePx}px limit and will be cut off by Google!
                  </p>
                )}
              </div>
            </div>

            {/* Description Input & Pixel Gauge */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span
                    className={cn(
                      descPx > maxDescPx
                        ? "text-rose-500 font-bold"
                        : description.length >= 140 && description.length <= 160
                        ? "text-emerald-500 font-medium"
                        : "text-slate-400"
                    )}
                  >
                    {description.length} / 160 chars ({descPx}px)
                  </span>
                </div>
              </div>

              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High-converting call to action and value proposition..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none leading-relaxed"
              />

              {/* Description Meter */}
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    description.length > 160
                      ? "bg-rose-500"
                      : description.length >= 140
                      ? "bg-emerald-500"
                      : "bg-indigo-500"
                  )}
                  style={{ width: `${Math.min(100, (description.length / 160) * 100)}%` }}
                />
              </div>
            </div>

            {/* Destination URL & Site Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Site / Brand Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Brand Name"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Rich Snippets Toggles */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Rich Snippet Enhancers
              </span>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeRating}
                    onChange={(e) => setIncludeRating(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Star Rating Schema</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDate}
                    onChange={(e) => setIncludeDate(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Publish Date Badge</span>
                </label>
              </div>

              {includeRating && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <input
                    type="text"
                    value={ratingVal}
                    onChange={(e) => setRatingVal(e.target.value)}
                    placeholder="Score (e.g. 4.9)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={ratingCount}
                    onChange={(e) => setRatingCount(e.target.value)}
                    placeholder="Votes (e.g. 1,420)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Simulation Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
            
            {/* View Switcher Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Google SERP Snippet
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5">
                  <button
                    onClick={() => setDevice("desktop")}
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all",
                      device === "desktop"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <Laptop className="h-3.5 w-3.5" /> Desktop
                  </button>
                  <button
                    onClick={() => setDevice("mobile")}
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all",
                      device === "mobile"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    )}
                  >
                    <Smartphone className="h-3.5 w-3.5" /> Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Google SERP Card Container */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm min-h-[220px]">
              <div className="max-w-[600px] space-y-2">
                
                {/* Google Snippet Header (Favicon + Brand + Breadcrumbs) */}
                <div className="flex items-center gap-2.5">
                  <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs">
                    {siteName.slice(0, 1).toUpperCase() || "G"}
                  </div>
                  <div className="flex flex-col text-xs leading-tight">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {siteName || "Brand Name"}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      {breadcrumbList.join(" › ")}
                    </span>
                  </div>
                </div>

                {/* Snippet Title */}
                <h3 className="text-lg sm:text-xl font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug pt-1">
                  {truncatedTitle.text || "Enter a high-impact title tag..."}
                </h3>

                {/* Rich Snippet Meta Row */}
                {includeRating && (
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold ml-1">
                      Rating: {ratingVal}/5
                    </span>
                    <span className="text-slate-400">· {ratingCount} reviews</span>
                  </div>
                )}

                {/* Description Snippet */}
                <p className="text-xs sm:text-sm text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed">
                  {includeDate && (
                    <span className="text-slate-500 mr-1.5">{dateString} —</span>
                  )}
                  {truncatedDesc.text || "Your meta description snippet will appear here in search."}
                </p>

              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  CTR Audit Score:
                </span>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-md text-xs font-extrabold",
                    ctrAnalysis.score >= 80
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : ctrAnalysis.score >= 50
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                  )}
                >
                  {ctrAnalysis.score} / 100 ({ctrAnalysis.grade})
                </span>
              </div>

              <button
                onClick={exportHtmlTags}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-sm shadow-indigo-500/20"
              >
                {copiedHtml ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5" />
                    <span>Tags Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy SEO Meta Tags</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Actionable CTR Suggestions */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-indigo-500" />
              Optimization Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ctrAnalysis.tips.map((tip) => (
                <div
                  key={tip.id}
                  className={cn(
                    "p-3 rounded-xl border text-xs flex items-start gap-2",
                    tip.passed
                      ? "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <CheckCircle2
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 mt-0.5",
                      tip.passed ? "text-emerald-600" : "text-slate-300 dark:text-slate-600"
                    )}
                  />
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
