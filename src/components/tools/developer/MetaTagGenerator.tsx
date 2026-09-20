"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Code2,
  Sparkles,
  RotateCcw,
  Copy,
  CheckCheck,
  Globe,
  Image as ImageIcon,
  Sliders,
  Share2,
  FileCode,
  Layers,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Crop,
  UploadCloud,
  Upload,
  Download,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSnippetWithAttribution } from "@/lib/snippet-attribution";
import { EmbedToolModal } from "@/components/tools/EmbedToolModal";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import {
  MetaFormData,
  toHtml,
  toNextJsMetadata,
  toAstroSnippet,
  toSvelteKitSnippet,
  toLiquidSnippet,
} from "@/lib/formatters/metaFormatters";
import {
  encodeStateToHash,
  decodeStateFromHash,
  ShareableMetaState,
} from "@/lib/url-state";
import {
  cropAndScaleToSocialStandard,
  downloadBlob,
  processLocalImageFile,
  formatBytes,
  LocalImageOptimizationResult,
} from "@/lib/image-resizer";

interface MetaTagGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  isEmbedded?: boolean;
}

interface SamplePreset {
  name: string;
  badge: string;
  title: string;
  description: string;
  url: string;
  siteName: string;
  imageUrl: string;
  ogType: string;
  twitterCard: string;
  twitterHandle: string;
  robots: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    name: "SaaS Landing Page",
    badge: "B2B SaaS",
    title: "OmniSEOTools - Free High-Performance SEO & Marketing Utilities",
    description:
      "Simulate SERPs, preview social cards, and generate tracking URLs with zero latency. 100% free, developer-grade, and client-side private.",
    url: "https://omniseotools.com",
    siteName: "OmniSEOTools",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterHandle: "@omniseotools",
    robots: "index, follow",
  },
  {
    name: "Blog Article",
    badge: "Editorial",
    title: "10 Proven Strategies to Double Organic Search Traffic in 2026",
    description:
      "Discover actionable, search-tested SEO techniques with real case studies. Learn how modern AI search engines evaluate content depth and relevance.",
    url: "https://growthblog.com/boost-organic-traffic",
    siteName: "Growth Blog",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80",
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterHandle: "@growthblog",
    robots: "index, follow",
  },
  {
    name: "E-Commerce Product",
    badge: "E-Commerce",
    title: "ProSound Studio Wireless ANC Headphones ($199) | AudioPeak",
    description:
      "Experience studio-grade acoustics, 45-hour battery life, and ultra-plush memory foam earcups. Free worldwide shipping & 30-day trial.",
    url: "https://audiophilegear.com/products/prosound-headphones",
    siteName: "AudioPeak",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop&q=80",
    ogType: "product",
    twitterCard: "summary_large_image",
    twitterHandle: "@audiopeak",
    robots: "index, follow",
  },
];

type ExportFormat = "html" | "nextjs" | "astro" | "sveltekit" | "shopify";

export function MetaTagGenerator({
  toolSlug = "open-graph-meta-generator",
  toolName = "Open Graph Meta Tag Generator",
  isEmbedded,
}: MetaTagGeneratorProps) {
  const [title, setTitle] = useState(SAMPLE_PRESETS[0].title);
  const [description, setDescription] = useState(SAMPLE_PRESETS[0].description);
  const [url, setUrl] = useState(SAMPLE_PRESETS[0].url);
  const [siteName, setSiteName] = useState(SAMPLE_PRESETS[0].siteName);
  const [imageUrl, setImageUrl] = useState(SAMPLE_PRESETS[0].imageUrl);
  const [ogType, setOgType] = useState(SAMPLE_PRESETS[0].ogType);
  const [twitterCard, setTwitterCard] = useState(SAMPLE_PRESETS[0].twitterCard);
  const [twitterHandle, setTwitterHandle] = useState(SAMPLE_PRESETS[0].twitterHandle);
  const [robots, setRobots] = useState("index, follow");
  const [formatTab, setFormatTab] = useState<ExportFormat>("html");
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // State Hydration on Mount from URL Hash
  useEffect(() => {
    const restored = decodeStateFromHash();
    if (restored) {
      if (restored.title !== undefined) setTitle(restored.title);
      if (restored.description !== undefined) setDescription(restored.description);
      if (restored.url !== undefined) setUrl(restored.url);
      if (restored.siteName !== undefined) setSiteName(restored.siteName);
      if (restored.image !== undefined) setImageUrl(restored.image);
      if (restored.twitterHandle !== undefined) setTwitterHandle(restored.twitterHandle);
      if (restored.cardType !== undefined) setTwitterCard(restored.cardType);
    }
  }, []);

  const handleSharePreview = async () => {
    const stateToShare: ShareableMetaState = {
      title,
      description,
      url,
      image: imageUrl,
      siteName,
      twitterHandle,
      cardType: twitterCard,
    };

    const hash = encodeStateToHash(stateToShare);
    if (hash && typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search + hash
      );
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
      } catch (err) {
        console.error("Failed to copy share link:", err);
      }
    }
  };

  // Dynamic current state hash for permalink backlink
  const currentHashState = useMemo(() => {
    return encodeStateToHash({
      title,
      description,
      url,
      image: imageUrl,
      siteName,
      twitterHandle,
      cardType: twitterCard,
    });
  }, [title, description, url, imageUrl, siteName, twitterHandle, twitterCard]);

  // Calculate dynamic SEO completeness / audit score
  const auditScore = useMemo(() => {
    let score = 0;
    if (title.trim().length >= 10) score += 25;
    else if (title.trim().length > 0) score += 15;

    if (description.trim().length >= 30 && description.trim().length <= 165) score += 25;
    else if (description.trim().length > 0) score += 15;

    if (imageUrl.trim().length > 0) score += 25;
    if (url.trim().length > 0) score += 15;
    if (siteName.trim().length > 0 || twitterHandle.trim().length > 0) score += 10;

    return Math.max(score, 10);
  }, [title, description, imageUrl, url, siteName, twitterHandle]);

  // Live URL inspection state
  const [inspectUrl, setInspectUrl] = useState("");
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectError, setInspectError] = useState<string | null>(null);
  const [inspectSuccess, setInspectSuccess] = useState<string | null>(null);

  const handleInspectUrl = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = inspectUrl.trim();
    if (!target) return;

    setIsInspecting(true);
    setInspectError(null);
    setInspectSuccess(null);

    try {
      const res = await fetch(`/api/scrape-meta?url=${encodeURIComponent(target)}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to fetch live metadata from URL.");
      }

      const { data } = json;
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
      if (data.url) setUrl(data.url);
      if (data.siteName) setSiteName(data.siteName);
      if (data.image) setImageUrl(data.image);
      if (data.twitterHandle) setTwitterHandle(data.twitterHandle);

      const resolvedHost = (() => {
        try {
          return new URL(data.url || target).hostname;
        } catch {
          return target;
        }
      })();

      setInspectSuccess(`Successfully imported meta tags from ${resolvedHost}`);
      setTimeout(() => setInspectSuccess(null), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to inspect URL.";
      setInspectError(message);
      setTimeout(() => setInspectError(null), 5000);
    } finally {
      setIsInspecting(false);
    }
  };

  const [imageInputMode, setImageInputMode] = useState<"url" | "upload">("url");
  const [localOptimizedInfo, setLocalOptimizedInfo] = useState<LocalImageOptimizationResult | null>(null);
  const [isUploadingLocal, setIsUploadingLocal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLocalFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploadingLocal(true);
    try {
      const result = await processLocalImageFile(file, 1200, 630, 0.85);
      setImageUrl(result.dataUrl);
      setLocalOptimizedInfo(result);
    } catch (err: unknown) {
      console.error("Failed to process local image:", err);
      const message = err instanceof Error ? err.message : "Failed to process image file.";
      setCropToast({ message, type: "error" });
      setTimeout(() => setCropToast(null), 4000);
    } finally {
      setIsUploadingLocal(false);
    }
  };

  const loadPreset = (preset: SamplePreset) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
    setImageUrl(preset.imageUrl);
    setLocalOptimizedInfo(null);
    setOgType(preset.ogType);
    setTwitterCard(preset.twitterCard);
    setTwitterHandle(preset.twitterHandle);
    setRobots(preset.robots);
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setSiteName("");
    setImageUrl("");
    setTwitterHandle("");
    setLocalOptimizedInfo(null);
  };

  // Image Dimension Diagnostics
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
    ratio: number;
    loaded: boolean;
    error: boolean;
  }>({
    width: 0,
    height: 0,
    ratio: 0,
    loaded: false,
    error: false,
  });

  useEffect(() => {
    if (!imageUrl) {
      setImgDimensions({ width: 0, height: 0, ratio: 0, loaded: false, error: false });
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setImgDimensions({
        width: w,
        height: h,
        ratio: h > 0 ? parseFloat((w / h).toFixed(2)) : 0,
        loaded: true,
        error: false,
      });
    };
    img.onerror = () => {
      setImgDimensions({ width: 0, height: 0, ratio: 0, loaded: false, error: true });
    };
  }, [imageUrl]);

  const imageStatus = useMemo(() => {
    if (!imageUrl) return { status: "missing", text: "No image provided", color: "text-amber-500" };
    if (imgDimensions.error) return { status: "error", text: "Image failed to load (check URL/CORS)", color: "text-rose-500" };
    if (!imgDimensions.loaded) return { status: "loading", text: "Analyzing dimensions...", color: "text-slate-400" };

    const { width, height, ratio } = imgDimensions;
    const isOptimalRatio = ratio >= 1.85 && ratio <= 1.95;
    const isOptimalRes = width >= 1200 && height >= 630;

    if (isOptimalRes && isOptimalRatio) {
      return {
        status: "perfect",
        text: `Optimal: ${width}x${height}px (${ratio.toFixed(2)}:1 Ratio)`,
        color: "text-emerald-500",
      };
    }

    if (isOptimalRes && !isOptimalRatio) {
      return {
        status: "ratio-warning",
        text: `Non-standard ratio: ${width}x${height}px (${ratio.toFixed(2)}:1, ideal 1.91:1)`,
        color: "text-amber-500",
      };
    }

    if (!isOptimalRes && isOptimalRatio) {
      return {
        status: "res-warning",
        text: `Low resolution: ${width}x${height}px (Recommended min: 1200x630px)`,
        color: "text-amber-500",
      };
    }

    return {
      status: "suboptimal",
      text: `Suboptimal: ${width}x${height}px (Target 1200x630px, 1.91:1 ratio)`,
      color: "text-amber-500",
    };
  }, [imageUrl, imgDimensions]);

  const [isCropping, setIsCropping] = useState(false);
  const [cropToast, setCropToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleFixDimensions = async () => {
    if (!imageUrl || isCropping) return;
    setIsCropping(true);
    setCropToast(null);

    try {
      const result = await cropAndScaleToSocialStandard(imageUrl, 1200, 630, "cover");
      downloadBlob(result.blob, "og-image-1200x630.png");
      setCropToast({
        message: "1200x630 standard image downloaded! Ready to host.",
        type: "success",
      });
      setTimeout(() => setCropToast(null), 4500);
    } catch (err: unknown) {
      console.error("Failed to crop image:", err);
      const isCors =
        err instanceof Error &&
        (err.message.includes("CORS") ||
          err.message.includes("SecurityError") ||
          err.message.includes("cross-origin"));
      setCropToast({
        message: isCors
          ? "Cannot auto-crop due to remote host CORS policy. Try uploading directly or saving locally."
          : err instanceof Error
          ? err.message
          : "Failed to auto-crop image.",
        type: "error",
      });
      setTimeout(() => setCropToast(null), 5000);
    } finally {
      setIsCropping(false);
    }
  };

  const currentFormData = useMemo<MetaFormData>(() => ({
    title,
    description,
    url,
    siteName,
    imageUrl: imageUrl.startsWith("data:") ? "/assets/og-image.webp" : imageUrl,
    ogType,
    twitterCard,
    twitterHandle,
    robots,
    slug: toolSlug,
  }), [title, description, url, siteName, imageUrl, ogType, twitterCard, twitterHandle, robots, toolSlug]);

  // Live Generated Code String (clean preview)
  const outputCode = useMemo(() => {
    switch (formatTab) {
      case "nextjs":
        return toNextJsMetadata(currentFormData, { withAttribution: false });
      case "astro":
        return toAstroSnippet(currentFormData, { withAttribution: false });
      case "sveltekit":
        return toSvelteKitSnippet(currentFormData, { withAttribution: false });
      case "shopify":
        return toLiquidSnippet(currentFormData, { withAttribution: false });
      case "html":
      default:
        return toHtml(currentFormData, { withAttribution: false });
    }
  }, [formatTab, currentFormData]);

  const copyCode = () => {
    let codeWithAttribution = "";
    switch (formatTab) {
      case "nextjs":
        codeWithAttribution = toNextJsMetadata(currentFormData, { withAttribution: true });
        break;
      case "astro":
        codeWithAttribution = toAstroSnippet(currentFormData, { withAttribution: true });
        break;
      case "sveltekit":
        codeWithAttribution = toSvelteKitSnippet(currentFormData, { withAttribution: true });
        break;
      case "shopify":
        codeWithAttribution = toLiquidSnippet(currentFormData, { withAttribution: true });
        break;
      case "html":
      default:
        codeWithAttribution = toHtml(currentFormData, { withAttribution: true });
        break;
    }

    navigator.clipboard.writeText(codeWithAttribution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayUrl = url.trim() || "https://example.com/page";
  const displayTitle = title.trim() || "Page Title";
  const displayDesc = description.trim() || "Page description goes here...";
  const displayImg = imageUrl.trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80";
  const displaySite = siteName.trim() || "example.com";

  return (
    <div className="space-y-8">
      {/* Live URL Auto-Fill Bar */}
      <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950/70 bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/40 dark:from-indigo-950/20 dark:via-slate-900/60 dark:to-purple-950/10 shadow-sm space-y-3">
        <form onSubmit={handleInspectUrl} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500" />
            <input
              type="text"
              value={inspectUrl}
              onChange={(e) => setInspectUrl(e.target.value)}
              placeholder="Auto-fill from live URL (e.g. https://your-website.com)"
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isInspecting || !inspectUrl.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-semibold shadow-sm shadow-indigo-500/20 transition-all shrink-0"
          >
            {isInspecting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Fetching Tags...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Fetch Meta Tags</span>
              </>
            )}
          </button>
        </form>

        {inspectError && (
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/40">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{inspectError}</span>
          </div>
        )}

        {inspectSuccess && (
          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{inspectSuccess}</span>
          </div>
        )}
      </div>

      {/* Sample Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Samples:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => loadPreset(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <EmbedBadgeModal
            score={auditScore}
            toolSlug={toolSlug}
            hashState={currentHashState}
          />

          <button
            onClick={handleSharePreview}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
              shareCopied
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 shadow-sm"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
            )}
            title="Generate a shareable permalink with current form state"
          >
            {shareCopied ? (
              <>
                <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-indigo-500" />
                <span>Share Preview</span>
              </>
            )}
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear Fields
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-500" />
                Meta Tag Inputs
              </h2>
              <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                SEO & Open Graph
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Title
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {title.length} chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="High-CTR Page Title..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {description.length} chars
                </span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Compelling description between 140–160 characters..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
              />
            </div>

            {/* Canonical URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Canonical URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Want to track traffic attribution? Generate tagged links with the{" "}
                <Link
                  href="/tools/marketing/utm-campaign-builder"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  <span>Campaign UTM Builder</span>
                  <ArrowRight className="h-2.5 w-2.5" />
                </Link>
                .
              </p>
            </div>

            {/* Image Input Section (URL or Local Upload) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span>OG Image</span>
                  <span className="text-[11px] text-slate-400 font-normal">og:image (1200x630)</span>
                </label>
                <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setImageInputMode("url")}
                    className={cn(
                      "px-2 py-0.5 rounded-md transition-all cursor-pointer",
                      imageInputMode === "url"
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                  >
                    Enter URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode("upload")}
                    className={cn(
                      "px-2 py-0.5 rounded-md transition-all flex items-center gap-1 cursor-pointer",
                      imageInputMode === "upload"
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    )}
                  >
                    <Upload className="h-3 w-3" />
                    Upload File
                  </button>
                </div>
              </div>

              {imageInputMode === "url" ? (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setLocalOptimizedInfo(null);
                    }}
                    placeholder="https://example.com/assets/og-image.jpg"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />

                  {/* Live Image Diagnostic Feedback & Inline 1200x630 Fixer */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {imageStatus.status === "perfect" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      ) : imageStatus.status === "error" ? (
                        <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      )}
                      <span className={cn("font-medium", imageStatus.color)}>
                        {imageStatus.text}
                      </span>
                    </div>

                    {(imageStatus.status === "ratio-warning" ||
                      imageStatus.status === "res-warning" ||
                      imageStatus.status === "suboptimal") && (
                      <button
                        type="button"
                        onClick={handleFixDimensions}
                        disabled={isCropping}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                        title="Auto-crop and scale to standard 1200x630 (1.91:1) cover image"
                      >
                        {isCropping ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>Cropping...</span>
                          </>
                        ) : (
                          <>
                            <Crop className="h-3 w-3" />
                            <span>Fix to 1200x630 (Cover)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) await handleLocalFileUpload(file);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center",
                      isDragging
                        ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 bg-slate-50 dark:bg-slate-800/40"
                    )}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) await handleLocalFileUpload(file);
                        e.target.value = "";
                      }}
                    />

                    {isUploadingLocal ? (
                      <div className="flex flex-col items-center gap-1.5 py-2">
                        <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          Auto-cropping & Converting to 1200x630 WebP...
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 py-1">
                        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                          <UploadCloud className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          Drag & drop banner or <span className="text-indigo-600 dark:text-indigo-400 underline">Browse Files</span>
                        </p>
                        <p className="text-[10px] text-slate-400">
                          PNG, JPG, WEBP • 100% Client-Side Private Processing
                        </p>
                      </div>
                    )}
                  </div>

                  {localOptimizedInfo && (
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="font-medium">
                          ✓ 1200x630 WebP: {formatBytes(localOptimizedInfo.originalSize)} → {formatBytes(localOptimizedInfo.optimizedSize)} ({localOptimizedInfo.savingsPercent}% smaller)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadBlob(localOptimizedInfo.blob, "og-image-1200x630.webp");
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all shrink-0 cursor-pointer"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download WebP</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {cropToast && (
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-[11px] p-2.5 rounded-xl border transition-all",
                    cropToast.type === "success"
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40"
                      : "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/40"
                  )}
                >
                  {cropToast.type === "success" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                  )}
                  <span>{cropToast.message}</span>
                </div>
              )}
            </div>

            {/* Site Name & OG Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Brand / Site"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  og:type
                </label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                  <option value="profile">profile</option>
                </select>
              </div>
            </div>

            {/* Twitter Card & Handle */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Twitter Card
                </label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                  <option value="app">app</option>
                  <option value="player">player</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Twitter @Handle
                </label>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@username"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Robots Directives */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Robots Meta
              </label>
              <select
                value={robots}
                onChange={(e) => setRobots(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="index, follow">index, follow (Standard)</option>
                <option value="noindex, follow">noindex, follow (Hide page, follow links)</option>
                <option value="noindex, nofollow">noindex, nofollow (Block completely)</option>
                <option value="index, nofollow">index, nofollow</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Code Output Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            
            {/* Format Selector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex overflow-x-auto no-scrollbar max-w-full rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5">
                <button
                  onClick={() => setFormatTab("html")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                    formatTab === "html"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  HTML
                </button>
                <button
                  onClick={() => setFormatTab("nextjs")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                    formatTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js
                </button>
                <button
                  onClick={() => setFormatTab("astro")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                    formatTab === "astro"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Astro
                </button>
                <button
                  onClick={() => setFormatTab("sveltekit")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                    formatTab === "sveltekit"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  SvelteKit
                </button>
                <button
                  onClick={() => setFormatTab("shopify")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                    formatTab === "shopify"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Shopify Liquid
                </button>
              </div>

              <div className="flex items-center gap-2">
                {!isEmbedded && (
                  <>
                    <EmbedBadgeModal
                      score={auditScore}
                      toolSlug={toolSlug}
                      hashState={currentHashState}
                      buttonVariant="outline"
                    />
                    <EmbedToolModal slug={toolSlug} toolName={toolName} />
                  </>
                )}
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-sm shadow-indigo-500/20"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Code Display */}
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed min-h-[350px]">
              <code>{outputCode}</code>
            </pre>

          </div>
        </div>

      </div>
    </div>
  );
}
