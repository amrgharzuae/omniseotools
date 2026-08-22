
const fs = require("fs");
const path = require("path");

const serpTool = `"use client";

import React, { useState, useMemo } from "react";
import { 
  calculateTitlePixels, 
  calculateDescPixels, 
  truncateToPixels, 
  analyzeCtr, 
  generateMetaHtml,
  SERP_LIMITS 
} from "@/lib/serp-utils";
import { 
  Laptop, 
  Smartphone, 
  Copy, 
  Check, 
  Sparkles, 
  RotateCcw, 
  AlertTriangle, 
  Share2, 
  Info,
  Calendar,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRESETS = [
  {
    name: "Blog Article",
    title: "15 Best Keyword Research Tools for 2026 (Free & Paid)",
    description: "Discover the top keyword research tools to discover high-volume, low-competition search queries. Compare features, pricing, and pros/cons.",
    url: "https://yourwebsite.com/blog/best-keyword-tools",
    siteName: "GrowthMasters",
  },
  {
    name: "SaaS Landing Page",
    title: "OmniSEOTools | Free High-Performance SEO & Marketing Utilities",
    description: "Access 20+ free utility tools for SEO specialists, growth marketers, and developers. Simulate SERPs, build UTM links, and audit tags instantly.",
    url: "https://omniseotools.com",
    siteName: "OmniSEOTools",
  },
  {
    name: "E-commerce Product",
    title: "Noise-Cancelling Wireless Headphones (2026 Edition) - Buy Online",
    description: "Experience premium active noise cancellation with 40-hour battery life and ultra-comfortable ear cushions. Free 2-day shipping available.",
    url: "https://yourshop.com/products/wireless-headphones",
    siteName: "AudioPhile Store",
  },
];

export function SerpPreviewTool() {
  const [title, setTitle] = useState("10 Proven SEO Strategies to Boost Organic Traffic in 2026 | OmniSEO");
  const [description, setDescription] = useState("Learn actionable, search-engine-tested SEO techniques to improve your rankings and drive consistent organic traffic. Includes real-world case studies and tips.");
  const [url, setUrl] = useState("https://omniseotools.com/blog/boost-organic-traffic");
  const [siteName, setSiteName] = useState("OmniSEOTools");
  const [date, setDate] = useState("May 12, 2026");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const titlePx = useMemo(() => calculateTitlePixels(title), [title]);
  const descPx = useMemo(() => calculateDescPixels(description), [description]);
  const titleChars = title.length;
  const descChars = description.length;

  const maxTitlePx = viewport === "desktop" ? SERP_LIMITS.desktopTitlePx : SERP_LIMITS.mobileTitlePx;
  const maxDescPx = viewport === "desktop" ? SERP_LIMITS.desktopDescPx : SERP_LIMITS.mobileDescPx;

  const titleTruncation = useMemo(() => truncateToPixels(title, maxTitlePx, true), [title, maxTitlePx]);
  const descTruncation = useMemo(() => truncateToPixels(description, maxDescPx, false), [description, maxDescPx]);

  const ctrAnalysis = useMemo(() => analyzeCtr(title, description), [title, description]);

  const breadcrumbDisplay = useMemo(() => {
    try {
      const parsed = new URL(url.startsWith("http") ? url : "https://" + url);
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      return {
        host: parsed.hostname,
        path: pathParts.join(" › "),
      };
    } catch {
      return { host: "example.com", path: "page" };
    }
  }, [url]);

  const handleCopyMeta = () => {
    const html = generateMetaHtml(title, description, url);
    navigator.clipboard.writeText(html);
    setCopiedMeta(true);
    setTimeout(() => setCopiedMeta(false), 2000);
  };

  const handleCopyShare = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        t: title,
        d: description,
        u: url,
        s: siteName,
      });
      const shareUrl = window.location.origin + window.location.pathname + "?" + params.toString();
      navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setUrl("https://example.com");
    setSiteName("My Website");
  };

  const getGaugeColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio > 1) return "bg-rose-500 text-rose-600";
    if (ratio > 0.9) return "bg-amber-500 text-amber-600";
    if (ratio >= 0.6) return "bg-emerald-500 text-emerald-600";
    return "bg-slate-400 text-slate-500";
  };

  return (
    <div className="space-y-8">
      
      {/* Top Presets & Controls Bar */}
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

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1 rounded-md"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Editor & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm">
          
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Snippet Configuration</span>
            <span className="text-xs font-normal text-slate-500">Live Font Calculation</span>
          </h2>

          {/* 1. Page Title Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="title-input" className="font-semibold text-slate-700 dark:text-slate-300">
                SEO Title (<code className="text-emerald-600">&lt;title&gt;</code>)
              </label>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className={titlePx > maxTitlePx ? "text-rose-500 font-bold" : "text-slate-500"}>
                  {titlePx} / {maxTitlePx}px
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={titleChars > 60 ? "text-amber-500" : "text-slate-500"}>
                  {titleChars} chars
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={cn("h-full transition-all duration-300", getGaugeColor(titlePx, maxTitlePx))}
                style={{ width: Math.min((titlePx / maxTitlePx) * 100, 100) + "%" }}
              />
            </div>

            <textarea
              id="title-input"
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 10 Best SEO Audit Tools in 2026 | BrandName"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-sans"
            />

            {titleTruncation.truncated && (
              <p className="flex items-center gap-1 text-[11px] text-rose-500 dark:text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>Title exceeds Google limit ({maxTitlePx}px) and will be cut off with an ellipsis (...).</span>
              </p>
            )}
          </div>

          {/* 2. Meta Description Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="desc-input" className="font-semibold text-slate-700 dark:text-slate-300">
                Meta Description
              </label>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className={descPx > maxDescPx ? "text-rose-500 font-bold" : "text-slate-500"}>
                  {descPx} / {maxDescPx}px
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className={descChars > 160 ? "text-amber-500" : "text-slate-500"}>
                  {descChars} chars
                </span>
              </div>
            </div>

            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={cn("h-full transition-all duration-300", getGaugeColor(descPx, maxDescPx))}
                style={{ width: Math.min((descPx / maxDescPx) * 100, 100) + "%" }}
              />
            </div>

            <textarea
              id="desc-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Discover top-rated tools for auditing website health and backlinks."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-sans"
            />

            {descTruncation.truncated && (
              <p className="flex items-center gap-1 text-[11px] text-rose-500 dark:text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>Description exceeds {maxDescPx}px limit and will be truncated on {viewport} search.</span>
              </p>
            )}
          </div>

          {/* 3. Canonical URL & Site Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="url-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Canonical URL
              </label>
              <input
                id="url-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="sitename-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Brand / Site Name
              </label>
              <input
                id="sitename-input"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="My Brand"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 4. Publish Date Snippet */}
          <div className="space-y-1.5">
            <label htmlFor="date-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>Published Date Snippet (Optional)</span>
            </label>
            <input
              id="date-input"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., May 12, 2026"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopyMeta}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all"
            >
              {copiedMeta ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedMeta ? "Meta Tags Copied!" : "Copy HTML Meta Tags"}</span>
            </button>

            <button
              onClick={handleCopyShare}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {copiedShare ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
              <span>{copiedShare ? "Link Copied!" : "Share"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Visual Google Simulator & CTR Score (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Live SERP Card Container */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Globe className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Google Search Live Simulator
                </span>
              </div>

              {/* Desktop / Mobile Switcher */}
              <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/50 dark:border-slate-700/50">
                <button
                  onClick={() => setViewport("desktop")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    viewport === "desktop"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Laptop className="h-3.5 w-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setViewport("mobile")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    viewport === "mobile"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Google SERP Simulated Canvas */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-[#ffffff] dark:bg-[#202124] p-5 sm:p-6 shadow-inner font-sans">
              
              {viewport === "desktop" ? (
                <div className="max-w-[600px] space-y-1">
                  
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px]">
                      {(siteName && siteName.charAt(0).toUpperCase()) || "G"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] text-[#202124] dark:text-[#dadce0] font-normal leading-tight">
                        {siteName || "Example"}
                      </span>
                      <span className="text-[12px] text-[#4d5156] dark:text-[#bdc1c6] leading-tight">
                        {breadcrumbDisplay.host} {breadcrumbDisplay.path && "› " + breadcrumbDisplay.path}
                      </span>
                    </div>
                  </div>

                  {/* Title (20px Arial, #1a0dab or #8ab4f8) */}
                  <div className="pt-1">
                    <h3 
                      className="text-[20px] leading-[1.3] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-normal break-words"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      {titleTruncation.text || "Your Page Title Appears Here"}
                    </h3>
                  </div>

                  {/* Description snippet */}
                  <div className="pt-1 text-[14px] leading-[1.58] text-[#4d5156] dark:text-[#bdc1c6] break-words" style={{ fontFamily: "Arial, sans-serif" }}>
                    {date && (
                      <span className="text-[#70757a] dark:text-[#9aa0a6] mr-1">
                        {date} —
                      </span>
                    )}
                    <span>
                      {descTruncation.text || "Your meta description snippet will be rendered here to show how it appears to real Google searchers."}
                    </span>
                  </div>

                </div>
              ) : (
                <div className="max-w-[360px] mx-auto rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#303134] p-4 shadow-sm space-y-2">
                  
                  {/* Mobile Header */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold">
                      {(siteName && siteName.charAt(0).toUpperCase()) || "M"}
                    </div>
                    <div className="flex flex-col text-xs">
                      <span className="text-[#202124] dark:text-[#dadce0] font-medium leading-tight">
                        {siteName || "Example"}
                      </span>
                      <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] truncate max-w-[240px]">
                        {url}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Title */}
                  <h3 className="text-[18px] leading-snug text-[#1a0dab] dark:text-[#8ab4f8] font-normal break-words">
                    {titleTruncation.text || "Your Mobile Page Title"}
                  </h3>

                  {/* Mobile Description */}
                  <p className="text-[13px] leading-relaxed text-[#4d5156] dark:text-[#bdc1c6] break-words">
                    {date && <span className="text-[#70757a] dark:text-[#9aa0a6] mr-1">{date} —</span>}
                    {descTruncation.text || "Your mobile description preview."}
                  </p>

                </div>
              )}

            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-slate-400" />
                <span>Google truncates desktop titles at <strong>600px</strong> and mobile at <strong>580px</strong>.</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                Engine 2026.1
              </span>
            </div>

          </div>

          {/* CTR Score & Heuristics Optimization Advice */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  CTR Heuristic Analysis & Optimization
                </h3>
                <p className="text-xs text-slate-500">Real-time click-through rate optimization tips</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {ctrAnalysis.score} / 100
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    {ctrAnalysis.grade}
                  </div>
                </div>
                <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-600 font-bold text-xs">
                  {ctrAnalysis.score}%
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5">
              {ctrAnalysis.tips.map((tip) => (
                <div
                  key={tip.id}
                  className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300"
                >
                  <div className="mt-0.5 shrink-0">
                    {tip.passed ? (
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <span className={cn(tip.passed ? "text-slate-800 dark:text-slate-200 font-medium" : "text-slate-500 dark:text-slate-400")}>
                    {tip.text}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
`;

fs.writeFileSync("src/components/tools/serp/SerpPreviewTool.tsx", serpTool);
console.log("SerpPreviewTool.tsx created successfully");
