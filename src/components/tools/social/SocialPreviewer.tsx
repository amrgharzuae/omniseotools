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

type CodeExportTab = "html" | "nextjs" | "helmet";

interface SocialPreviewerProps {
  defaultPlatform?: SocialPlatform;
}

export function SocialPreviewer({ defaultPlatform = "twitter" }: SocialPreviewerProps) {
  const [platform, setPlatform] = useState<SocialPlatform>(defaultPlatform);
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
  const [twitterCard, setTwitterCard] = useState<"summary_large_image" | "summary">(
    "summary_large_image"
  );
  const [discordColor, setDiscordColor] = useState("#4f46e5");
  const [codeTab, setCodeTab] = useState<CodeExportTab>("html");
  const [activePreset, setActivePreset] = useState<string>("SaaS Platform");
  const [copiedCode, setCopiedCode] = useState(false);
  const [viewDevice, setViewDevice] = useState<"desktop" | "mobile">("desktop");

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

  const loadPreset = (preset: SamplePreset) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
    setImageUrl(preset.imageUrl);
    setTwitterCard(preset.twitterCard);
    setDiscordColor(preset.discordColor);
    setActivePreset(preset.name);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setSiteName("");
    setImageUrl("");
    setActivePreset("");
  };

  // Generate Export Code
  const generatedCode = useMemo(() => {
    const cleanUrl = url.trim() || "https://example.com";
    const cleanTitle = title.trim() || "Page Title";
    const cleanDesc = description.trim() || "Page Description";
    const cleanImage = imageUrl.trim() || "https://example.com/og-image.jpg";
    const cleanSite = siteName.trim() || "Site Name";

    if (codeTab === "html") {
      return `<!-- Primary Meta Tags -->
<title>${cleanTitle}</title>
<meta name="title" content="${cleanTitle}" />
<meta name="description" content="${cleanDesc}" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${cleanUrl}" />
<meta property="og:title" content="${cleanTitle}" />
<meta property="og:description" content="${cleanDesc}" />
<meta property="og:image" content="${cleanImage}" />
<meta property="og:site_name" content="${cleanSite}" />

<!-- Twitter / X -->
<meta property="twitter:card" content="${twitterCard}" />
<meta property="twitter:url" content="${cleanUrl}" />
<meta property="twitter:title" content="${cleanTitle}" />
<meta property="twitter:description" content="${cleanDesc}" />
<meta property="twitter:image" content="${cleanImage}" />

<!-- Discord Embed Color -->
<meta name="theme-color" content="${discordColor}" />`;
    }

    if (codeTab === "nextjs") {
      return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${cleanTitle}',
  description: '${cleanDesc}',
  openGraph: {
    title: '${cleanTitle}',
    description: '${cleanDesc}',
    url: '${cleanUrl}',
    siteName: '${cleanSite}',
    images: [
      {
        url: '${cleanImage}',
        width: 1200,
        height: 630,
        alt: '${cleanTitle}',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: '${twitterCard}',
    title: '${cleanTitle}',
    description: '${cleanDesc}',
    images: ['${cleanImage}'],
  },
};`;
    }

    return `<Helmet>
  {/* Standard SEO */}
  <title>${cleanTitle}</title>
  <meta name="description" content="${cleanDesc}" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${cleanUrl}" />
  <meta property="og:title" content="${cleanTitle}" />
  <meta property="og:description" content="${cleanDesc}" />
  <meta property="og:image" content="${cleanImage}" />
  <meta property="og:site_name" content="${cleanSite}" />

  {/* Twitter */}
  <meta name="twitter:card" content="${twitterCard}" />
  <meta name="twitter:url" content="${cleanUrl}" />
  <meta name="twitter:title" content="${cleanTitle}" />
  <meta name="twitter:description" content="${cleanDesc}" />
  <meta name="twitter:image" content="${cleanImage}" />
</Helmet>`;
  }, [codeTab, title, description, url, siteName, imageUrl, twitterCard, discordColor]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
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
    if (width < 600 || height < 315) {
      return {
        status: "warning",
        text: `Low Res: ${width}x${height}px (Min 1200x630px recommended)`,
        color: "text-amber-500",
      };
    }
    return {
      status: "good",
      text: `${width}x${height}px (${ratio.toFixed(2)}:1 Ratio)`,
      color: "text-indigo-500",
    };
  }, [imageUrl, imgDimensions]);

  return (
    <div className="space-y-8">
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
              onClick={() => loadPreset(p)}
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

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Fields
        </button>
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

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Social Image URL</span>
                <span className="text-[11px] text-slate-400 font-normal">og:image (1200x630)</span>
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setActivePreset("");
                  }}
                  placeholder="https://example.com/assets/og-banner.jpg"
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                />
              </div>

              {/* Live Image Diagnostic Feedback */}
              <div className="flex items-center gap-1.5 text-[11px] mt-1.5">
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
            {/* Platform Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                <button
                  onClick={() => setPlatform("twitter")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
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
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
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
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
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
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    platform === "discord"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Discord
                </button>
              </div>

              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Live Feed Mockup
              </span>
            </div>

            {/* Platform Previews */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center min-h-[380px]">
              
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
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5">
              <button
                onClick={() => setCodeTab("html")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                  codeTab === "html"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                HTML Tags
              </button>
              <button
                onClick={() => setCodeTab("nextjs")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                  codeTab === "nextjs"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                Next.js App Router
              </button>
              <button
                onClick={() => setCodeTab("helmet")}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                  codeTab === "helmet"
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                React Helmet
              </button>
            </div>

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

        <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
          <code>{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
}
