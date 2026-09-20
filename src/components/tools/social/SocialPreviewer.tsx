"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  Image as ImageIcon,
  Share2,
  AlertCircle,
  CheckCircle2,
  Layers,
  Smartphone,
  Laptop,
  Code2,
  MessageSquare,
  Globe,
  FileCode,
  Sliders,
  CheckCheck,
  Loader2,
  Camera,
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

export type SocialPlatform = "twitter" | "linkedin" | "facebook" | "discord";

interface SamplePreset {
  name: string;
  badge: string;
  title: string;
  description: string;
  url: string;
  siteName: string;
  imageUrl: string;
  twitterCard: "summary_large_image" | "summary";
  discordColor: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    name: "SaaS Platform",
    badge: "B2B SaaS",
    title: "OmniSEOTools - Free High-Performance SEO & Marketing Utilities",
    description:
      "Simulate SERPs, preview social cards, and generate tracking URLs with zero latency. 100% free, developer-grade, and client-side private.",
    url: "https://omniseotools.com",
    siteName: "OmniSEOTools",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image",
    discordColor: "#4f46e5",
  },
  {
    name: "Blog Article",
    badge: "Editorial",
    title: "10 Proven Strategies to Double Organic Search Traffic in 2026",
    description:
      "Discover actionable, search-tested SEO techniques with real case studies. Learn how modern AI search engines evaluate content depth and relevance.",
    url: "https://growthblog.com/boost-organic-traffic",
    siteName: "Growth Blog",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image",
    discordColor: "#059669",
  },
  {
    name: "E-Commerce",
    badge: "Product",
    title: "ProSound Studio Wireless ANC Headphones ($199) | AudioPeak",
    description:
      "Experience studio-grade acoustics, 45-hour battery life, and ultra-plush memory foam earcups. Free worldwide shipping & 30-day trial.",
    url: "https://audiophilegear.com/products/prosound-headphones",
    siteName: "AudioPeak",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image",
    discordColor: "#d97706",
  },
];

type CodeExportTab = "html" | "nextjs" | "astro" | "sveltekit" | "shopify" | "liquid";

interface SocialPreviewerProps {
  defaultPlatform?: SocialPlatform;
  toolSlug?: string;
  toolName?: string;
  isEmbedded?: boolean;
}

export function SocialPreviewer({
  defaultPlatform = "twitter",
  toolSlug,
  toolName,
  isEmbedded,
}: SocialPreviewerProps) {
  const [platform, setPlatform] = useState<SocialPlatform>(defaultPlatform);

  const currentSlug = useMemo(() => {
    if (toolSlug) return toolSlug;
    if (platform === "twitter") return "twitter-card-preview";
    if (platform === "linkedin") return "linkedin-link-preview";
    if (platform === "facebook") return "facebook-open-graph-debugger";
    return "discord-embed-generator";
  }, [toolSlug, platform]);

  const currentToolName = useMemo(() => {
    if (toolName) return toolName;
    if (platform === "twitter") return "Twitter Card Previewer";
    if (platform === "linkedin") return "LinkedIn Link Previewer";
    if (platform === "facebook") return "Facebook Open Graph Debugger";
    return "Discord Embed Previewer";
  }, [toolName, platform]);

  const [title, setTitle] = useState(SAMPLE_PRESETS[0].title);
  const [description, setDescription] = useState(SAMPLE_PRESETS[0].description);
  const [url, setUrl] = useState(SAMPLE_PRESETS[0].url);
  const [siteName, setSiteName] = useState(SAMPLE_PRESETS[0].siteName);
  const [imageUrl, setImageUrl] = useState(SAMPLE_PRESETS[0].imageUrl);
  const [twitterCard, setTwitterCard] = useState<"summary_large_image" | "summary">(
    SAMPLE_PRESETS[0].twitterCard
  );
  const [discordColor, setDiscordColor] = useState(SAMPLE_PRESETS[0].discordColor);
  const [codeTab, setCodeTab] = useState<CodeExportTab>("html");
  const [activePreset, setActivePreset] = useState<string>("SaaS Platform");
  const [copiedCode, setCopiedCode] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [viewDevice, setViewDevice] = useState<"desktop" | "mobile">("desktop");

  // State Hydration on Mount from URL Hash
  useEffect(() => {
    const restored = decodeStateFromHash();
    if (restored) {
      if (restored.title !== undefined) setTitle(restored.title);
      if (restored.description !== undefined) setDescription(restored.description);
      if (restored.url !== undefined) setUrl(restored.url);
      if (restored.image !== undefined) setImageUrl(restored.image);
      if (restored.siteName !== undefined) setSiteName(restored.siteName);
      if (
        restored.cardType === "summary_large_image" ||
        restored.cardType === "summary"
      ) {
        setTwitterCard(restored.cardType);
      }
      if (restored.theme !== undefined) setDiscordColor(restored.theme);
      setActivePreset("");
    }
  }, []);

  // PNG Mockup Export Ref & State
  const mockupRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownloadPng = async () => {
    if (!mockupRef.current || isDownloadingPng) return;

    setIsDownloadingPng(true);
    setDownloadToast(null);

    try {
      // Dynamic import to guarantee clean SSR compatibility
      const { toPng } = await import("html-to-image");

      const dataUrl = await toPng(mockupRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        quality: 0.95,
      });

      const link = document.createElement("a");
      const filename = `${platform}-preview-${Date.now()}.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();

      setDownloadToast(`Saved mockup as ${filename}`);
      setTimeout(() => setDownloadToast(null), 3500);
    } catch (err: unknown) {
      console.error("Failed to generate PNG mockup:", err);
      setDownloadToast("Failed to generate PNG mockup. Please try again.");
      setTimeout(() => setDownloadToast(null), 4000);
    } finally {
      setIsDownloadingPng(false);
    }
  };

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

      setActivePreset("");

      const resolvedHost = (() => {
        try {
          return new URL(data.url || target).hostname;
        } catch {
          return target;
        }
      })();

      setInspectSuccess(`Successfully imported social card meta from ${resolvedHost}`);
      setTimeout(() => setInspectSuccess(null), 4000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to inspect URL.";
      setInspectError(message);
      setTimeout(() => setInspectError(null), 5000);
    } finally {
      setIsInspecting(false);
    }
  };

  const handleSharePreview = async () => {
    const stateToShare: ShareableMetaState = {
      title,
      description,
      url,
      image: imageUrl,
      siteName,
      cardType: twitterCard,
      theme: discordColor,
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
      cardType: twitterCard,
      theme: discordColor,
    });
  }, [title, description, url, imageUrl, siteName, twitterCard, discordColor]);

  // Calculate dynamic SEO completeness / audit score
  const auditScore = useMemo(() => {
    let score = 0;
    if (title.trim().length >= 10) score += 25;
    else if (title.trim().length > 0) score += 15;

    if (description.trim().length >= 30 && description.trim().length <= 165) score += 25;
    else if (description.trim().length > 0) score += 15;

    if (imageUrl.trim().length > 0) score += 25;
    if (url.trim().length > 0) score += 15;
    if (siteName.trim().length > 0) score += 10;

    return Math.max(score, 10);
  }, [title, description, imageUrl, url, siteName]);

  // Diagnostic state for image validation
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
      setActivePreset("");
    } catch (err: unknown) {
      console.error("Failed to process local image:", err);
      const message = err instanceof Error ? err.message : "Failed to process image file.";
      setCropToast({ message, type: "error" });
      setTimeout(() => setCropToast(null), 4000);
    } finally {
      setIsUploadingLocal(false);
    }
  };

  const handlePreset = (preset: SamplePreset) => {
    setActivePreset(preset.name);
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
    setImageUrl(preset.imageUrl);
    setLocalOptimizedInfo(null);
    setTwitterCard(preset.twitterCard);
    setDiscordColor(preset.discordColor);
  };

  const handleReset = () => {
    setActivePreset("");
    setTitle("");
    setDescription("");
    setUrl("");
    setSiteName("");
    setImageUrl("");
    setLocalOptimizedInfo(null);
  };

  const domain = useMemo(() => {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname.replace("www.", "");
    } catch {
      return "example.com";
    }
  }, [url]);

  const currentFormData = useMemo<MetaFormData>(() => ({
    title,
    description,
    url,
    siteName,
    imageUrl: imageUrl.startsWith("data:") ? "/assets/og-image.webp" : imageUrl,
    ogType: "website",
    twitterCard,
    slug: currentSlug,
  }), [title, description, url, siteName, imageUrl, twitterCard, currentSlug]);

  // Generate production code snippet
  const generatedCode = useMemo(() => {
    switch (codeTab) {
      case "nextjs":
        return toNextJsMetadata(currentFormData, { withAttribution: false });
      case "astro":
        return toAstroSnippet(currentFormData, { withAttribution: false });
      case "sveltekit":
        return toSvelteKitSnippet(currentFormData, { withAttribution: false });
      case "shopify":
      case "liquid":
        return toLiquidSnippet(currentFormData, { withAttribution: false });
      case "html":
      default:
        return toHtml(currentFormData, { withAttribution: false });
    }
  }, [codeTab, currentFormData]);

  const copyToClipboard = () => {
    let codeWithAttribution = "";
    switch (codeTab) {
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
      case "liquid":
        codeWithAttribution = toLiquidSnippet(currentFormData, { withAttribution: true });
        break;
      case "html":
      default:
        codeWithAttribution = toHtml(currentFormData, { withAttribution: true });
        break;
    }
    navigator.clipboard.writeText(codeWithAttribution);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Image Diagnostics
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

      {/* Preset Selector Bar */}
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
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                activePreset === p.name
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <EmbedBadgeModal
            score={auditScore}
            toolSlug={currentSlug}
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
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear Fields
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-500" />
                Meta Tag Inputs
              </h2>
              <span className="text-[11px] font-medium text-slate-400">Live Sync</span>
            </div>

            {/* Target URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Canonical URL</span>
                <span className="text-[11px] text-slate-400 font-normal">og:url</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setActivePreset("");
                  }}
                  placeholder="https://example.com/page-slug"
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                />
              </div>
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

            {/* Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Open Graph Title
                </label>
                <span
                  className={cn(
                    "text-[11px] font-mono",
                    title.length > 70
                      ? "text-rose-500 font-bold"
                      : title.length >= 40
                      ? "text-emerald-500 font-medium"
                      : "text-slate-400"
                  )}
                >
                  {title.length} / 70 chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setActivePreset("");
                }}
                placeholder="High CTR Title..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Open Graph Description
                </label>
                <span
                  className={cn(
                    "text-[11px] font-mono",
                    description.length > 200
                      ? "text-rose-500 font-bold"
                      : description.length >= 100
                      ? "text-emerald-500 font-medium"
                      : "text-slate-400"
                  )}
                >
                  {description.length} / 200 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setActivePreset("");
                }}
                placeholder="Engaging summary for social timelines..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Image Input Section (URL or Local Upload) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span>Social Image</span>
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
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setLocalOptimizedInfo(null);
                        setActivePreset("");
                      }}
                      placeholder="https://example.com/assets/og-banner.jpg"
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                  </div>

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

            {/* Site Name & Platform Specifics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
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

              {platform === "twitter" ? (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Twitter Card
                  </label>
                  <select
                    value={twitterCard}
                    onChange={(e) =>
                      setTwitterCard(e.target.value as "summary_large_image" | "summary")
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="summary_large_image">Large Image (1200x675)</option>
                    <option value="summary">Summary Small (1:1)</option>
                  </select>
                </div>
              ) : platform === "discord" ? (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Embed Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={discordColor}
                      onChange={(e) => setDiscordColor(e.target.value)}
                      className="h-7 w-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={discordColor}
                      onChange={(e) => setDiscordColor(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Device Mock
                  </label>
                  <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-0.5">
                    <button
                      onClick={() => setViewDevice("desktop")}
                      className={cn(
                        "flex-1 py-1 text-[11px] font-medium rounded-lg flex items-center justify-center gap-1",
                        viewDevice === "desktop"
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500"
                      )}
                    >
                      <Laptop className="h-3 w-3" /> Desktop
                    </button>
                    <button
                      onClick={() => setViewDevice("mobile")}
                      className={cn(
                        "flex-1 py-1 text-[11px] font-medium rounded-lg flex items-center justify-center gap-1",
                        viewDevice === "mobile"
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500"
                      )}
                    >
                      <Smartphone className="h-3 w-3" /> Mobile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Feed Simulation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
            {/* Platform Selector Tabs & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 overflow-x-auto no-scrollbar max-w-full">
                <button
                  onClick={() => setPlatform("twitter")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "twitter"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Twitter / X
                </button>
                <button
                  onClick={() => setPlatform("linkedin")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "linkedin"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => setPlatform("facebook")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "facebook"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Facebook
                </button>
                <button
                  onClick={() => setPlatform("discord")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "discord"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Discord
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPng}
                  disabled={isDownloadingPng}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
                  title="Export high-resolution PNG mockup"
                >
                  {isDownloadingPng ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-500" />
                      <span>Generating PNG...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Download Mockup (PNG)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {downloadToast && (
              <div className="mb-4 flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 animate-in fade-in duration-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500" />
                <span>{downloadToast}</span>
              </div>
            )}

            {/* Platform Previews */}
            <div
              ref={mockupRef}
              className="p-4 sm:p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center min-h-[380px]"
            >
              
              {/* TWITTER / X CARD */}
              {platform === "twitter" && (
                <div className="w-full max-w-[500px] bg-black text-white rounded-2xl border border-neutral-800 p-4 shadow-xl">
                  {/* Tweet Author Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-xs">
                      {siteName.slice(0, 2).toUpperCase() || "OS"}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm">{siteName || "Brand Name"}</span>
                        <span className="text-neutral-500 text-xs">@{domain.replace(".com", "")}</span>
                        <span className="text-neutral-500 text-xs">· 1m</span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Check out our latest link preview below 👇
                      </p>
                    </div>
                  </div>

                  {/* Twitter Card Container */}
                  {twitterCard === "summary_large_image" ? (
                    <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900 group cursor-pointer">
                      <div className="relative aspect-[1.91/1] w-full bg-neutral-800 overflow-hidden">
                        {imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                            No Image Provided
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-mono text-neutral-300">
                          {domain}
                        </span>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-neutral-100 line-clamp-1 leading-snug">
                          {title || "Page Title Here"}
                        </h3>
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                          {description || "Meta description snippet will render right here..."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900 flex cursor-pointer">
                      <div className="w-32 h-32 shrink-0 bg-neutral-800 relative">
                        {imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-[10px]">
                            1:1 Image
                          </div>
                        )}
                      </div>
                      <div className="p-3 flex flex-col justify-center min-w-0">
                        <span className="text-[11px] text-neutral-500 font-mono">{domain}</span>
                        <h3 className="font-semibold text-xs text-neutral-100 truncate mt-0.5">
                          {title || "Page Title"}
                        </h3>
                        <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">
                          {description || "Description preview..."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* LINKEDIN PREVIEW */}
              {platform === "linkedin" && (
                <div className="w-full max-w-[520px] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      {siteName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                        {siteName}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Promoted Post • Just now</p>
                    </div>
                  </div>

                  <div className="relative aspect-[1.91/1] w-full bg-slate-100 dark:bg-slate-800">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        1200 x 627 Image
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 bg-slate-50/70 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 leading-tight">
                      {title || "Your High Impact Title on LinkedIn"}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">{domain}</p>
                  </div>
                </div>
              )}

              {/* FACEBOOK PREVIEW */}
              {platform === "facebook" && (
                <div
                  className={cn(
                    "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden transition-all",
                    viewDevice === "mobile" ? "w-full max-w-[380px]" : "w-full max-w-[520px]"
                  )}
                >
                  <div className="p-3 flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      {siteName.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{siteName}</p>
                      <p className="text-[10px] text-slate-400">Sponsored · 🌐</p>
                    </div>
                  </div>

                  <div className="relative aspect-[1.91/1] w-full bg-slate-100 dark:bg-slate-800">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        1200 x 630 Image
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-slate-100/60 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                      {domain}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                      {title || "Facebook Post Title"}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-normal">
                      {description || "Facebook post description preview..."}
                    </p>
                  </div>
                </div>
              )}

              {/* DISCORD PREVIEW */}
              {platform === "discord" && (
                <div className="w-full max-w-[520px] bg-[#313338] text-white rounded-lg p-4 font-sans shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-xs">
                      BOT
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">EmbedBot</span>
                        <span className="bg-[#5865F2] text-[9px] px-1 py-0.2 rounded font-semibold text-white">
                          APP
                        </span>
                        <span className="text-[10px] text-neutral-400">Today at 12:00 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Rich Embed Box */}
                  <div
                    className="rounded bg-[#2b2d31] p-3 border-l-4 overflow-hidden"
                    style={{ borderLeftColor: discordColor }}
                  >
                    <span className="text-[11px] text-neutral-400 font-medium">{siteName}</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-bold text-sm text-[#00a8fc] hover:underline mt-0.5 line-clamp-1"
                    >
                      {title || "Discord Embed Title"}
                    </a>
                    <p className="text-xs text-[#dbdee1] mt-1 line-clamp-3 leading-relaxed">
                      {description || "Rich discord embed description and markdown formatting."}
                    </p>

                    {imageUrl && (
                      <div className="mt-3 rounded overflow-hidden max-h-56 bg-neutral-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="mt-2 text-[10px] text-neutral-400 flex items-center gap-2">
                      <span>{domain}</span>
                      <span>•</span>
                      <span>OmniSEOTools Validator</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Code Export Section */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Export Production Meta Tags
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex overflow-x-auto no-scrollbar max-w-full rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5">
              <button
                onClick={() => setCodeTab("html")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                  codeTab === "html"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                HTML
              </button>
              <button
                onClick={() => setCodeTab("nextjs")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                  codeTab === "nextjs"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                Next.js
              </button>
              <button
                onClick={() => setCodeTab("astro")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                  codeTab === "astro"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                Astro
              </button>
              <button
                onClick={() => setCodeTab("sveltekit")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                  codeTab === "sveltekit"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                SvelteKit
              </button>
              <button
                onClick={() => setCodeTab("shopify")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap",
                  codeTab === "shopify" || codeTab === "liquid"
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
                    toolSlug={currentSlug}
                    hashState={currentHashState}
                    buttonVariant="outline"
                  />
                  <EmbedToolModal slug={currentSlug} toolName={currentToolName} />
                </>
              )}
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-sm shadow-indigo-500/20"
              >
                {copiedCode ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
          <code>{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
}
