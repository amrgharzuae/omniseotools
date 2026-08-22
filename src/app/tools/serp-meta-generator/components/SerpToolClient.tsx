"use client";

import React, { useState, useMemo } from "react";
import {
  calculateTitlePixels,
  calculateDescPixels,
  truncateToPixels,
  analyzeCtr,
  generateMetaHtml,
  getTitleStatus,
  getDescStatus,
  SERP_LIMITS,
} from "../utils";
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

const PRESET_TEMPLATES = [
  {
    label: "SaaS Product",
    title: "OmniSEOTools | Free High-Performance SEO & Web Utilities",
    description:
      "Access 20+ free utility tools for SEO specialists, growth marketers, and developers. Simulate SERPs, generate meta tags, and audit pages instantly.",
    url: "https://omniseotools.com/free-tools",
    siteName: "OmniSEOTools",
  },
  {
    label: "Blog Guide",
    title: "10 Proven SEO Strategies to Boost Organic Traffic in 2026",
    description:
      "Discover actionable, search-engine-tested SEO techniques to improve your rankings and drive consistent organic traffic. Includes real-world tips.",
    url: "https://omniseotools.com/blog/boost-organic-traffic",
    siteName: "OmniSEO Blog",
  },
  {
    label: "E-Commerce",
    title: "Noise-Cancelling Wireless Headphones (2026 Edition) | AudioMax",
    description:
      "Experience premium active noise cancellation with 40-hour battery life and ultra-comfortable memory foam pads. Order online with free 2-day shipping.",
    url: "https://audiomax.com/products/wireless-headphones",
    siteName: "AudioMax",
  },
];

export function SerpToolClient() {
  // Option 1: "generate" (Gemini AI), Option 2: "preview" (Manual preview only)
  const [selectedOption, setSelectedOption] = useState<"generate" | "preview">("generate");

  // Core Snippet Data
  const [title, setTitle] = useState(
    "10 Proven SEO Strategies to Boost Organic Traffic in 2026 | OmniSEO"
  );
  const [description, setDescription] = useState(
    "Discover actionable, search-engine-tested SEO techniques to improve your rankings and drive consistent organic traffic. Includes real-world tips and actionable steps."
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

  // Viewport switch: Desktop vs Mobile
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  // Copy feedback states
  const [copiedType, setCopiedType] = useState<"title" | "desc" | "html" | "share" | null>(null);
  const [showCtrDetails, setShowCtrDetails] = useState(false);

  // Pixel and Limit Computations
  const maxTitlePx = viewport === "desktop" ? SERP_LIMITS.desktopTitlePx : SERP_LIMITS.mobileTitlePx;
  const maxDescPx = viewport === "desktop" ? SERP_LIMITS.desktopDescPx : SERP_LIMITS.mobileDescPx;

  const titlePx = useMemo(() => calculateTitlePixels(title), [title]);
  const descPx = useMemo(() => calculateDescPixels(description), [description]);
  const titleChars = title.length;
  const descChars = description.length;

  const titleStatus = useMemo(() => getTitleStatus(titlePx, maxTitlePx), [titlePx, maxTitlePx]);
  const descStatus = useMemo(() => getDescStatus(descPx, maxDescPx), [descPx, maxDescPx]);

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

  const fullHtmlCode = useMemo(() => {
    return generateMetaHtml(title, description, breadcrumbs.full);
  }, [title, description, breadcrumbs.full]);

  // Handle Gemini AI Generation
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
        throw new Error(json.error || "Failed to generate SEO meta tags with Gemini.");
      }

      if (json.data?.title && json.data?.description) {
        setTitle(json.data.title);
        setDescription(json.data.description);
        if (aiBrand.trim()) {
          setSiteName(aiBrand.trim());
        }

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
      console.error("Gemini Generation Error:", err);
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

  const handleApplyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
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

  return (
    <div className="space-y-8">
      {/* PRIMARY OPTION SELECTOR TABS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option 1: Generate & Preview */}
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
              Use Google Gemini AI to craft high-converting, pixel-perfect SEO titles & meta descriptions.
            </p>
          </div>
        </button>

        {/* Option 2: Only Preview */}
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
              Already have your tags? Type or paste your title & meta description to test pixel truncation limits.
            </p>
          </div>
        </button>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editor & Control Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm">
          {/* OPTION 1: GEMINI AI GENERATOR */}
          {selectedOption === "generate" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Wand2 className="h-4 w-4 text-emerald-600" />
                  <span>Google Gemini AI Prompt</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  Gemini API
                </span>
              </div>

              <form onSubmit={handleGenerateWithGemini} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Topic / Page Context <strong className="text-rose-500">*</strong>
                  </label>
                  <textarea
                    rows={2}
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g., Complete guide to technical SEO audit checklist for 2026..."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 p-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Target Keyword
                    </label>
                    <input
                      type="text"
                      value={aiKeywords}
                      onChange={(e) => setAiKeywords(e.target.value)}
                      placeholder="technical SEO audit"
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
                    Tone of Voice
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
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {aiError && (
                  <div className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 p-2.5 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-1.5">
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
                      <span>Generating with Gemini API...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Generate & Update Live Preview</span>
                    </>
                  )}
                </button>
              </form>

              {/* Variations */}
              {generatedVariations.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Alternative Angles (Click to apply):
                  </span>
                  <div className="space-y-2">
                    {generatedVariations.map((v, i) => (
                      <div
                        key={i}
                        onClick={() => handleApplyVariation(v)}
                        className="group p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:border-emerald-500 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                            {v.style}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Use</span>
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

          {/* EDITABLE SNIPPET FIELDS */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-blue-600" />
                <span>{selectedOption === "generate" ? "Active Snippet Values" : "Snippet Input Fields"}</span>
              </span>
              {selectedOption === "preview" && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Presets in Option 2 */}
            {selectedOption === "preview" && (
              <div className="flex flex-wrap items-center gap-1.5 pb-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
                  <Layers className="h-3 w-3" />
                  <span>Presets:</span>
                </span>
                {PRESET_TEMPLATES.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Title Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="client-title" className="font-semibold text-slate-700 dark:text-slate-300">
                  SEO Title (<code className="text-emerald-600">&lt;title&gt;</code>)
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase",
                      titleStatus.level === "pass"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-500/30"
                        : titleStatus.level === "warning"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-500/30"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-500/30"
                    )}
                  >
                    {titleStatus.label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[11px]",
                      titlePx > maxTitlePx ? "text-rose-500 font-bold" : "text-slate-500"
                    )}
                  >
                    {titlePx}/{maxTitlePx}px
                  </span>
                </div>
              </div>

              <textarea
                id="client-title"
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Target keyword - Primary benefit | Brand"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none transition-colors"
              />

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    titlePx > maxTitlePx
                      ? "bg-rose-500"
                      : titlePx >= 400
                      ? "bg-emerald-500"
                      : "bg-amber-400"
                  )}
                  style={{ width: `${Math.min((titlePx / maxTitlePx) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="client-desc" className="font-semibold text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase",
                      descStatus.level === "pass"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-500/30"
                        : descStatus.level === "warning"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-500/30"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-500/30"
                    )}
                  >
                    {descStatus.label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[11px]",
                      descPx > maxDescPx ? "text-rose-500 font-bold" : "text-slate-500"
                    )}
                  >
                    {descPx}/{maxDescPx}px
                  </span>
                </div>
              </div>

              <textarea
                id="client-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Summarize the core value proposition and include a clear call to action..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none transition-colors"
              />

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    descPx > maxDescPx
                      ? "bg-rose-500"
                      : descPx >= 500
                      ? "bg-emerald-500"
                      : "bg-amber-400"
                  )}
                  style={{ width: `${Math.min((descPx / maxDescPx) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* URL, Domain, Site Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label htmlFor="client-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Canonical URL
                </label>
                <input
                  id="client-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="client-sitename" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Site / Brand Name
                </label>
                <input
                  id="client-sitename"
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

        {/* Right Column: SERP Simulator Preview & CopyBox (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Simulator Canvas */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
            {/* Viewport Switcher Header */}
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

            {/* Google SERP Simulated Canvas */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#202124] p-5 sm:p-6 shadow-inner font-sans">
              {viewport === "desktop" ? (
                /* DESKTOP GOOGLE SERP RESULT */
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
                /* MOBILE GOOGLE SERP RESULT */
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

            {/* Truncation warning indicator & CTR Score */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  Google limits desktop titles to <strong>600px</strong> and mobile to <strong>580px</strong>.
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

          {/* CopyBox Action Bar */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Copy className="h-4 w-4 text-emerald-600" />
                <span>Export & Copy Metadata</span>
              </h3>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors cursor-pointer"
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

              {/* Copy Full HTML Code */}
              <button
                type="button"
                onClick={() => handleCopy(fullHtmlCode, "html")}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 p-3 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
              >
                {copiedType === "html" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Code2 className="h-4 w-4" />
                )}
                <span>{copiedType === "html" ? "HTML Tags Copied!" : "Copy Full HTML Meta"}</span>
              </button>
            </div>

            {/* HTML Snippet Preview Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <pre>{fullHtmlCode}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
