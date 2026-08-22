"use client";

import React, { useState, useMemo } from "react";
import {
  calculateTitlePixels,
  calculateDescPixels,
  truncateToPixels,
  analyzeCtr,
  generateMetaHtml,
  SERP_LIMITS,
} from "@/lib/serp-utils";
import {
  Laptop,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Loader2,
  Wand2,
  Eye,
  Globe,
  Share2,
  Zap,
  Info,
  CheckCircle2,
  XCircle,
  Code2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetaVariation {
  style: string;
  title: string;
  description: string;
}

const PRESET_EXAMPLES = [
  {
    label: "SaaS Platform",
    title: "OmniSEOTools | Free High-Performance SEO & Marketing Utilities",
    description:
      "Access 20+ free utility tools for SEO specialists, growth marketers, and developers. Simulate SERPs, build UTM links, and audit tags instantly.",
    url: "https://omniseotools.com/free-tools",
    siteName: "OmniSEOTools",
  },
  {
    label: "Blog Article",
    title: "15 Best Keyword Research Tools for 2026 (Free & Paid)",
    description:
      "Discover the top keyword research tools to uncover high-volume, low-competition search queries. Compare features, pricing, and pros/cons now.",
    url: "https://growthmasters.io/blog/best-keyword-tools",
    siteName: "GrowthMasters",
  },
  {
    label: "E-Commerce",
    title: "Noise-Cancelling Wireless Headphones (2026 Edition) | AudioMax",
    description:
      "Experience premium active noise cancellation with 40-hour battery life and ultra-comfortable ear cushions. Free 2-day shipping available.",
    url: "https://audiomax.com/products/wireless-headphones",
    siteName: "AudioMax",
  },
];

export function SerpPreviewTool() {
  // Main Navigation Option: 1 = "Generate & Preview", 2 = "Only Preview"
  const [selectedOption, setSelectedOption] = useState<"generate" | "preview">("generate");

  // Core Snippet Data (Live preview state)
  const [title, setTitle] = useState(
    "10 Proven SEO Strategies to Boost Organic Traffic in 2026 | OmniSEO"
  );
  const [description, setDescription] = useState(
    "Discover actionable, search-engine-tested SEO techniques to improve your rankings and drive consistent organic traffic. Includes real-world tips and insights."
  );
  const [url, setUrl] = useState("https://omniseotools.com/blog/boost-organic-traffic");
  const [siteName, setSiteName] = useState("OmniSEOTools");
  const [publishDate, setPublishDate] = useState("May 12, 2026");

  // AI Generation Form State
  const [aiTopic, setAiTopic] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
  const [aiBrand, setAiBrand] = useState("OmniSEO");
  const [aiTone, setAiTone] = useState<"professional" | "engaging" | "direct" | "creative">("professional");
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [generatedVariations, setGeneratedVariations] = useState<MetaVariation[]>([]);

  // Viewport Switcher: Desktop vs Mobile
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  // Copy Feedback States
  const [copiedType, setCopiedType] = useState<"title" | "desc" | "html" | "share" | null>(null);
  const [showCtrDetails, setShowCtrDetails] = useState(false);

  // Pixel and Limits Calculations
  const maxTitlePx = viewport === "desktop" ? SERP_LIMITS.desktopTitlePx : SERP_LIMITS.mobileTitlePx;
  const maxDescPx = viewport === "desktop" ? SERP_LIMITS.desktopDescPx : SERP_LIMITS.mobileDescPx;

  const titlePx = useMemo(() => calculateTitlePixels(title), [title]);
  const descPx = useMemo(() => calculateDescPixels(description), [description]);
  const titleChars = title.length;
  const descChars = description.length;

  const titleTruncation = useMemo(() => truncateToPixels(title, maxTitlePx, true), [title, maxTitlePx]);
  const descTruncation = useMemo(() => truncateToPixels(description, maxDescPx, false), [description, maxDescPx]);

  const ctrAnalysis = useMemo(() => analyzeCtr(title, description), [title, description]);

  // URL Display Hierarchy
  const breadcrumbs = useMemo(() => {
    try {
      const parsed = new URL(url.startsWith("http") ? url : "https://" + url);
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      return {
        hostname: parsed.hostname,
        path: pathParts.join(" › ") || "page",
        full: parsed.href,
      };
    } catch {
      return {
        hostname: "example.com",
        path: "page-slug",
        full: "https://example.com/page-slug",
      };
    }
  }, [url]);

  const fullHtmlSnippet = useMemo(() => {
    return generateMetaHtml(title, description, breadcrumbs.full);
  }, [title, description, breadcrumbs.full]);

  // Call Google Gemini via /api/generate-meta
  const handleGenerateWithGemini = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setIsLoadingAi(true);
    setAiError(null);

    try {
      const response = await fetch("/api/generate-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicOrUrl: aiTopic.trim(),
          targetKeywords: aiKeywords.trim() || undefined,
          brandName: aiBrand.trim() || undefined,
          tone: aiTone,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to generate SEO metadata. Please try again.");
      }

      if (json.data?.title && json.data?.description) {
        setTitle(json.data.title);
        setDescription(json.data.description);
        if (aiBrand.trim()) {
          setSiteName(aiBrand.trim());
        }

        // Suggested slug
        const cleanSlug = aiTopic
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .slice(0, 40);
        setUrl(`https://${(aiBrand || "example").toLowerCase().replace(/[^a-z0-9]/g, "")}.com/${cleanSlug}`);

        if (Array.isArray(json.data.variations)) {
          setGeneratedVariations(json.data.variations);
        }
      }
    } catch (err: unknown) {
      console.error("Gemini API Generation Error:", err);
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setAiError(message);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleApplyVariation = (variation: MetaVariation) => {
    setTitle(variation.title);
    setDescription(variation.description);
  };

  const handleCopy = (content: string, type: "title" | "desc" | "html" | "share") => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        t: title,
        d: description,
        u: url,
        s: siteName,
      });
      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      handleCopy(shareUrl, "share");
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_EXAMPLES[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setUrl("https://example.com/new-page");
    setSiteName("My Brand");
    setAiTopic("");
    setAiKeywords("");
    setAiError(null);
    setGeneratedVariations([]);
  };

  // Status computation for Title and Description
  const getStatusLevel = (px: number, max: number) => {
    if (px === 0) return { label: "Empty", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-500/30" };
    if (px > max) return { label: "Truncated", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-500/30" };
    if (px >= max * 0.7) return { label: "Optimal", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500/30" };
    return { label: "Too Short", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-500/30" };
  };

  const titleStatus = getStatusLevel(titlePx, maxTitlePx);
  const descStatus = getStatusLevel(descPx, maxDescPx);

  return (
    <div className="space-y-8">
      {/* PRIMARY OPTION SELECTOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OPTION 1: Generate and Preview */}
        <button
          type="button"
          onClick={() => setSelectedOption("generate")}
          className={cn(
            "relative flex items-start gap-4 rounded-3xl p-5 sm:p-6 text-left border transition-all cursor-pointer",
            selectedOption === "generate"
              ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/20"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 opacity-90 hover:opacity-100"
          )}
        >
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all",
              selectedOption === "generate"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Option 1: Generate & Preview</span>
              </h2>
              {selectedOption === "generate" && (
                <span className="rounded-full bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Use Google Gemini AI to generate high-CTR, pixel-perfect SEO titles & meta descriptions from your topic.
            </p>
          </div>
        </button>

        {/* OPTION 2: Only Preview */}
        <button
          type="button"
          onClick={() => setSelectedOption("preview")}
          className={cn(
            "relative flex items-start gap-4 rounded-3xl p-5 sm:p-6 text-left border transition-all cursor-pointer",
            selectedOption === "preview"
              ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/20"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 opacity-90 hover:opacity-100"
          )}
        >
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all",
              selectedOption === "preview"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            )}
          >
            <Eye className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Option 2: Only Preview</span>
              </h2>
              {selectedOption === "preview" && (
                <span className="rounded-full bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                  Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Already have your title and description? Paste them directly to simulate Google SERP and verify pixel limits.
            </p>
          </div>
        </button>
      </div>

      {/* 2-COLUMN MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Control Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm">
          {/* OPTION 1 CONTENT: GEMINI AI GENERATOR FORM */}
          {selectedOption === "generate" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Google Gemini SEO Generator
                  </h3>
                </div>
                <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-emerald-500/20">
                  AI Service
                </span>
              </div>

              <form onSubmit={handleGenerateWithGemini} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Topic, Page Context, or URL <strong className="text-rose-500">*</strong>
                  </label>
                  <textarea
                    rows={2}
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. Best technical SEO audit checklist for SaaS websites in 2026..."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Keywords
                    </label>
                    <input
                      type="text"
                      value={aiKeywords}
                      onChange={(e) => setAiKeywords(e.target.value)}
                      placeholder="SEO audit checklist"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={aiBrand}
                      onChange={(e) => setAiBrand(e.target.value)}
                      placeholder="OmniSEO"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Copywriting Style / Tone
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(["professional", "engaging", "direct", "creative"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setAiTone(t)}
                        className={cn(
                          "py-1.5 rounded-lg text-[11px] font-medium capitalize border transition-all cursor-pointer",
                          aiTone === t
                            ? "bg-slate-900 dark:bg-emerald-600 text-white border-transparent shadow-sm"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {aiError && (
                  <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{aiError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!aiTopic.trim() || isLoadingAi}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/10 transition-all cursor-pointer"
                >
                  {isLoadingAi ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating with Google Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Generate with Gemini & Preview</span>
                    </>
                  )}
                </button>
              </form>

              {/* Generated Variations List */}
              {generatedVariations.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Alternative Generated Angles (Click to test):</span>
                  </span>
                  <div className="space-y-2">
                    {generatedVariations.map((v, i) => (
                      <div
                        key={i}
                        onClick={() => handleApplyVariation(v)}
                        className="group p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-emerald-500/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                            {v.style}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Apply</span>
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                          {v.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EDITABLE SNIPPET FIELDS (Active for both modes, primary in Option 2) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-blue-600" />
                <span>{selectedOption === "generate" ? "Fine-Tune Snippet Values" : "Snippet Input Fields"}</span>
              </span>
              {selectedOption === "preview" && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Quick Presets for Only Preview */}
            {selectedOption === "preview" && (
              <div className="flex flex-wrap items-center gap-1.5 pb-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
                  <Layers className="h-3 w-3" />
                  <span>Presets:</span>
                </span>
                {PRESET_EXAMPLES.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Title Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="preview-title" className="font-semibold text-slate-700 dark:text-slate-300">
                  SEO Title (<code className="text-emerald-600">&lt;title&gt;</code>)
                </label>
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase", titleStatus.color)}>
                    {titleStatus.label}
                  </span>
                  <span className={cn("font-mono text-[11px]", titlePx > maxTitlePx ? "text-rose-500 font-bold" : "text-slate-500")}>
                    {titlePx}/{maxTitlePx}px
                  </span>
                </div>
              </div>

              <textarea
                id="preview-title"
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Page title optimized for search..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none transition-colors"
              />

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    titlePx > maxTitlePx ? "bg-rose-500" : titlePx >= 400 ? "bg-emerald-500" : "bg-amber-400"
                  )}
                  style={{ width: `${Math.min((titlePx / maxTitlePx) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="preview-desc" className="font-semibold text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <div className="flex items-center gap-2">
                  <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase", descStatus.color)}>
                    {descStatus.label}
                  </span>
                  <span className={cn("font-mono text-[11px]", descPx > maxDescPx ? "text-rose-500 font-bold" : "text-slate-500")}>
                    {descPx}/{maxDescPx}px
                  </span>
                </div>
              </div>

              <textarea
                id="preview-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High-converting meta description summary..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none transition-colors"
              />

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    descPx > maxDescPx ? "bg-rose-500" : descPx >= 500 ? "bg-emerald-500" : "bg-amber-400"
                  )}
                  style={{ width: `${Math.min((descPx / maxDescPx) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* URL, Site Name, Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label htmlFor="field-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Canonical URL
                </label>
                <input
                  id="field-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="field-brand" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Site / Brand Name
                </label>
                <input
                  id="field-brand"
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="OmniSEOTools"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SERP Simulator & Export Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SERP Live Simulator Canvas */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
            {/* Canvas Header & Viewport Switcher */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Google SERP Live Canvas
                </span>
              </div>

              <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/50 dark:border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setViewport("desktop")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    viewport === "desktop"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Laptop className="h-3.5 w-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("mobile")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
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

            {/* Google Search Result Box */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#202124] p-5 sm:p-6 shadow-inner font-sans">
              {viewport === "desktop" ? (
                /* DESKTOP SERP */
                <div className="max-w-[600px] space-y-1 text-left">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px] shadow-sm">
                      {siteName.charAt(0).toUpperCase() || "G"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] text-[#202124] dark:text-[#dadce0] font-normal leading-tight">
                        {siteName || "Example Site"}
                      </span>
                      <span className="text-[12px] text-[#4d5156] dark:text-[#bdc1c6] leading-tight font-mono">
                        https://{breadcrumbs.hostname} › {breadcrumbs.path}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <h3
                      className="text-[20px] leading-[1.3] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-normal break-words"
                      style={{ fontFamily: "Arial, sans-serif" }}
                    >
                      {titleTruncation.text || "Your Page Title Appears Here"}
                    </h3>
                  </div>

                  <div
                    className="pt-1 text-[14px] leading-[1.58] text-[#4d5156] dark:text-[#bdc1c6] break-words"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {publishDate && (
                      <span className="text-[#70757a] dark:text-[#9aa0a6] mr-1">
                        {publishDate} —
                      </span>
                    )}
                    <span>
                      {descTruncation.text || "Your meta description summary snippet will be rendered here."}
                    </span>
                  </div>
                </div>
              ) : (
                /* MOBILE SERP */
                <div className="max-w-[360px] mx-auto rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#303134] p-4 shadow-sm space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-sm">
                      {siteName.charAt(0).toUpperCase() || "M"}
                    </div>
                    <div className="flex flex-col text-xs overflow-hidden">
                      <span className="text-[#202124] dark:text-[#dadce0] font-medium leading-tight truncate">
                        {siteName || "Example"}
                      </span>
                      <span className="text-[11px] text-[#5f6368] dark:text-[#9aa0a6] truncate max-w-[240px]">
                        {breadcrumbs.full}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-[18px] leading-snug text-[#1a0dab] dark:text-[#8ab4f8] font-normal break-words"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {titleTruncation.text || "Your Mobile Page Title"}
                  </h3>

                  <p
                    className="text-[13px] leading-relaxed text-[#4d5156] dark:text-[#bdc1c6] break-words"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {publishDate && (
                      <span className="text-[#70757a] dark:text-[#9aa0a6] mr-1">
                        {publishDate} —
                      </span>
                    )}
                    {descTruncation.text || "Your mobile description preview."}
                  </p>
                </div>
              )}
            </div>

            {/* Quality Score & Warning Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  Desktop max: <strong>600px</strong> | Mobile max: <strong>580px</strong>
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowCtrDetails(!showCtrDetails)}
                className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>
                  CTR Score: {ctrAnalysis.score}% ({ctrAnalysis.grade})
                </span>
              </button>
            </div>

            {/* Expandable CTR Score Breakdown */}
            {showCtrDetails && (
              <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>SERP Quality & Click-Through Potential</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{ctrAnalysis.score} / 100</span>
                </div>
                <div className="space-y-2">
                  {ctrAnalysis.tips.map((tip) => (
                    <div key={tip.id} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {tip.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <span>{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* One-Click Export & Copy Action Bar */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Copy className="h-4 w-4 text-emerald-600" />
                <span>Export & Copy Metadata</span>
              </h3>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{copiedType === "share" ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Copy Title */}
              <button
                type="button"
                onClick={() => handleCopy(title, "title")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {copiedType === "title" ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copiedType === "title" ? "Title Copied!" : "Copy Title"}</span>
              </button>

              {/* Copy Description */}
              <button
                type="button"
                onClick={() => handleCopy(description, "desc")}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {copiedType === "desc" ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copiedType === "desc" ? "Description Copied!" : "Copy Description"}</span>
              </button>

              {/* Copy Full HTML */}
              <button
                type="button"
                onClick={() => handleCopy(fullHtmlSnippet, "html")}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 p-3 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
              >
                {copiedType === "html" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Code2 className="h-4 w-4" />
                )}
                <span>{copiedType === "html" ? "HTML Copied!" : "Copy Full HTML Meta"}</span>
              </button>
            </div>

            {/* HTML Tag Snippet Preview */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <pre>{fullHtmlSnippet}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
