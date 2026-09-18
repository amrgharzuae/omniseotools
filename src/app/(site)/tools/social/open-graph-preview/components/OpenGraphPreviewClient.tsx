"use client";

import React, { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SamplePreset {
  name: string;
  badge: string;
  title: string;
  description: string;
  url: string;
  siteName: string;
  imageUrl: string;
  twitterCard: "summary_large_image" | "summary";
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
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image",
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
  },
  {
    name: "E-Commerce Product",
    badge: "E-Commerce",
    title: "ProSound Studio Wireless ANC Headphones ($199) | AudioPeak",
    description:
      "Experience studio-grade acoustics, 45-hour battery life, and ultra-plush memory foam earcups. Free worldwide shipping & 30-day trial.",
    url: "https://audiophilegear.com/products/prosound-headphones",
    siteName: "AudioPeak",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image",
  },
];

type PlatformTab =
  | "facebook-desktop"
  | "facebook-mobile"
  | "twitter-large"
  | "twitter-summary"
  | "linkedin"
  | "whatsapp";

type CodeExportTab = "html" | "nextjs" | "helmet";

export function OpenGraphPreviewClient() {
  const [title, setTitle] = useState(
    "OmniSEOTools - Free High-Performance SEO & Marketing Utilities"
  );
  const [description, setDescription] = useState(
    "Simulate SERPs, preview social cards, and generate tracking URLs with zero latency. 100% free and client-side private."
  );
  const [url, setUrl] = useState("https://omniseotools.com");
  const [siteName, setSiteName] = useState("OmniSEOTools");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80"
  );
  const [platform, setPlatform] = useState<PlatformTab>("twitter-large");
  const [codeTab, setCodeTab] = useState<CodeExportTab>("html");
  const [activePreset, setActivePreset] = useState<string>("SaaS Landing Page");
  const [copiedCode, setCopiedCode] = useState(false);

  // Image validation state
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
    ratio: number;
    loaded: boolean;
    error: boolean;
  }>({
    width: 1200,
    height: 630,
    ratio: 1.905,
    loaded: true,
    error: false,
  });

  // Calculate parsed domain
  const domain = useMemo(() => {
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      return parsed.hostname;
    } catch {
      return "omniseotools.com";
    }
  }, [url]);

  // Load and validate image dimensions
  useEffect(() => {
    if (!imageUrl) {
      setImgDimensions({
        width: 0,
        height: 0,
        ratio: 0,
        loaded: false,
        error: false,
      });
      return;
    }

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const r = h > 0 ? w / h : 0;
      setImgDimensions({
        width: w,
        height: h,
        ratio: r,
        loaded: true,
        error: false,
      });
    };
    img.onerror = () => {
      setImgDimensions({
        width: 0,
        height: 0,
        ratio: 0,
        loaded: false,
        error: true,
      });
    };
  }, [imageUrl]);

  // Aspect ratio diagnosis
  const aspectStatus = useMemo(() => {
    if (imgDimensions.error) {
      return {
        label: "Image URL Unreachable",
        color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-500/30",
        icon: AlertCircle,
      };
    }
    if (!imgDimensions.loaded) {
      return {
        label: "Validating Image...",
        color: "text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-300",
        icon: Sliders,
      };
    }

    const { ratio, width, height } = imgDimensions;
    // Check for standard 1.91:1 (between 1.80 and 2.05)
    if (ratio >= 1.8 && ratio <= 2.05) {
      return {
        label: `1.91:1 Optimal (${width}×${height}px)`,
        color: "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30",
        icon: CheckCircle2,
      };
    }
    // Check for 1:1 Square (between 0.95 and 1.05)
    if (ratio >= 0.95 && ratio <= 1.05) {
      return {
        label: `1:1 Square (${width}×${height}px) • Twitter Summary / Chat`,
        color: "text-blue-700 bg-blue-50 dark:bg-blue-950/40 border-blue-500/30",
        icon: CheckCircle2,
      };
    }
    // Check for non-standard
    return {
      label: `Non-Standard Ratio (${ratio.toFixed(2)}:1 • ${width}×${height}px) • Risk of Cropping`,
      color: "text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-500/30",
      icon: AlertCircle,
    };
  }, [imgDimensions]);

  // Generate code exports
  const exportedCode = useMemo(() => {
    const twitterCardType =
      platform === "twitter-summary" ? "summary" : "summary_large_image";

    if (codeTab === "html") {
      return `<!-- Primary Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${siteName}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${title}">

<!-- Twitter (X) Card Meta Tags -->
<meta name="twitter:card" content="${twitterCardType}">
<meta name="twitter:domain" content="${domain}">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">`;
    }

    if (codeTab === "nextjs") {
      return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${description.replace(/"/g, '\\"')}",
  openGraph: {
    title: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
    url: "${url}",
    siteName: "${siteName.replace(/"/g, '\\"')}",
    images: [
      {
        url: "${imageUrl}",
        width: 1200,
        height: 630,
        alt: "${title.replace(/"/g, '\\"')}",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "${twitterCardType}",
    title: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
    images: ["${imageUrl}"],
  },
};`;
    }

    // React Helmet / Astro
    return `<Helmet>
  <title>${title}</title>
  <meta name="description" content="${description}" />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:site_name" content="${siteName}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${imageUrl}" />

  {/* Twitter (X) */}
  <meta name="twitter:card" content="${twitterCardType}" />
  <meta name="twitter:url" content="${url}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${imageUrl}" />
</Helmet>`;
  }, [codeTab, url, siteName, title, description, imageUrl, domain, platform]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleApplyPreset = (preset: SamplePreset) => {
    setActivePreset(preset.name);
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
    setImageUrl(preset.imageUrl);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setUrl("https://yourdomain.com");
    setSiteName("My Brand");
    setImageUrl("");
    setActivePreset("");
  };

  return (
    <div className="space-y-8">
      {/* 1. PRESET SELECTOR STRIP */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>1-Click Sample Presets</span>
          </label>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Fields</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.name;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={cn(
                  "flex flex-col items-start gap-1 p-3.5 rounded-2xl border text-left transition-all cursor-pointer group",
                  isSelected
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm ring-1 ring-blue-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {preset.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Fields (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Open Graph Parameters
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                og:* &amp; twitter:*
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="og-title"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <span>Social Title</span>
                  <code className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                    og:title
                  </code>
                </label>
                <span
                  className={cn(
                    "text-[10px] font-mono",
                    title.length > 60 ? "text-amber-500 font-bold" : "text-slate-400"
                  )}
                >
                  {title.length}/60 chars
                </span>
              </div>
              <input
                id="og-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="High-Impact Social Title"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="og-desc"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <span>Social Description</span>
                  <code className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                    og:description
                  </code>
                </label>
                <span
                  className={cn(
                    "text-[10px] font-mono",
                    description.length > 155
                      ? "text-amber-500 font-bold"
                      : "text-slate-400"
                  )}
                >
                  {description.length}/155 chars
                </span>
              </div>
              <textarea
                id="og-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Summary snippet that appears when shared on Twitter, Facebook, and LinkedIn..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Image URL & Validation Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="og-image"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <span>Featured Image URL (1200×630)</span>
                  <code className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                    og:image
                  </code>
                </label>
              </div>
              <input
                id="og-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://yourdomain.com/og-image-1200x630.png"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-blue-500 focus:outline-none transition-colors"
              />

              {/* Live Aspect Ratio Badge */}
              <div
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-xl border text-xs transition-all",
                  aspectStatus.color
                )}
              >
                <aspectStatus.icon className="h-4 w-4 shrink-0" />
                <span className="font-semibold">{aspectStatus.label}</span>
              </div>
            </div>

            {/* Canonical URL & Site Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label
                  htmlFor="og-url"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Page URL (og:url)
                </label>
                <input
                  id="og-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourdomain.com/page"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="og-sitename"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Site Name (og:site_name)
                </label>
                <input
                  id="og-sitename"
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="OmniSEOTools"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Previews & Code Generator (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SIMULATOR CANVAS CARD */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            {/* Platform Selector Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-blue-600" />
                <span>Live Feed Simulator</span>
              </span>

              <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200/50 dark:border-slate-700/50">
                <button
                  type="button"
                  onClick={() => setPlatform("twitter-large")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    platform === "twitter-large"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  X / Twitter (Large)
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform("twitter-summary")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    platform === "twitter-summary"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  X (Summary)
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform("facebook-desktop")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    platform === "facebook-desktop"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform("linkedin")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    platform === "linkedin"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  LinkedIn
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform("whatsapp")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    platform === "whatsapp"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  WhatsApp
                </button>
              </div>
            </div>

            {/* PREVIEW CANVAS CONTAINER */}
            <div className="bg-slate-100/70 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-center min-h-[300px]">
              {/* PLATFORM 1: Twitter (X) Large Banner */}
              {platform === "twitter-large" && (
                <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-black text-white shadow-md font-sans">
                  <div className="relative aspect-[1.91/1] w-full bg-slate-800 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Social Card Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-500">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute bottom-2.5 left-2.5 rounded bg-black/80 px-2 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-sm">
                      {domain}
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1 bg-[#16181c]">
                    <h4 className="text-sm font-bold text-white line-clamp-1 leading-snug">
                      {title || "Your Engaging Title Appears Here"}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {description || "Your compelling social meta description snippet will appear here."}
                    </p>
                  </div>
                </div>
              )}

              {/* PLATFORM 2: Twitter (X) Small Summary */}
              {platform === "twitter-summary" && (
                <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-[#16181c] text-white shadow-md font-sans flex">
                  <div className="h-28 w-28 shrink-0 bg-slate-800 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Thumbnail"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-500">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 space-y-1 justify-center flex flex-col overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 truncate">
                      {domain}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-1 leading-snug">
                      {title || "Your Engaging Title"}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {description || "Meta description summary."}
                    </p>
                  </div>
                </div>
              )}

              {/* PLATFORM 3: Facebook Desktop */}
              {platform === "facebook-desktop" && (
                <div className="w-full max-w-[500px] overflow-hidden rounded-xl border border-[#dadde1] dark:border-slate-700 bg-white dark:bg-[#242526] shadow-md font-sans">
                  <div className="relative aspect-[1.91/1] w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Facebook preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-[#f0f2f5] dark:bg-[#3a3b3c] space-y-0.5 border-t border-[#dadde1] dark:border-slate-700">
                    <span className="text-[11px] uppercase tracking-wider text-[#65676b] dark:text-[#b0b3b8] font-mono block truncate">
                      {domain}
                    </span>
                    <h4 className="text-sm font-bold text-[#050505] dark:text-[#e4e6eb] line-clamp-1">
                      {title || "Your Facebook Link Title"}
                    </h4>
                    <p className="text-xs text-[#65676b] dark:text-[#b0b3b8] line-clamp-1">
                      {description || "Summary text snippet."}
                    </p>
                  </div>
                </div>
              )}

              {/* PLATFORM 4: LinkedIn */}
              {platform === "linkedin" && (
                <div className="w-full max-w-[500px] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1d2226] shadow-md font-sans">
                  <div className="relative aspect-[1.91/1] w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="LinkedIn card"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-[#1d2226] space-y-1 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
                      {title || "LinkedIn Post Headline"}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">
                      {domain}
                    </span>
                  </div>
                </div>
              )}

              {/* PLATFORM 5: WhatsApp Chat Bubble */}
              {platform === "whatsapp" && (
                <div className="w-full max-w-[360px] rounded-2xl bg-[#e1ffc7] dark:bg-[#005c4b] p-3 shadow-md text-slate-900 dark:text-white font-sans space-y-2">
                  <div className="overflow-hidden rounded-xl bg-white/70 dark:bg-black/20 border border-black/5">
                    <div className="relative aspect-[1.91/1] w-full bg-slate-200 dark:bg-slate-800">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="WhatsApp card"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          <ImageIcon className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 space-y-0.5">
                      <h4 className="text-xs font-bold line-clamp-1">
                        {title || "WhatsApp Link Header"}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                        {description || "Chat unfurl description snippet."}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono block pt-0.5">
                        {domain}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300 font-mono px-1">
                    <span className="truncate">{url}</span>
                    <span className="text-[9px] text-slate-500">12:45 PM</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MULTI-FORMAT CODE EXPORT CARD */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Export Production Code
                </span>
              </div>

              {/* Code Format Tabs */}
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setCodeTab("html")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    codeTab === "html"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  HTML &lt;meta&gt;
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("nextjs")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    codeTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js App Router
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("helmet")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                    codeTab === "helmet"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  React Helmet / Astro
                </button>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 shadow-inner overflow-x-auto max-h-60">
              <pre className="leading-relaxed">{exportedCode}</pre>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyCode}
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all shadow-sm cursor-pointer",
                copiedCode
                  ? "bg-emerald-700 text-white"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              )}
            >
              {copiedCode ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied {codeTab.toUpperCase()} Code to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy {codeTab.toUpperCase()} Tags</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
