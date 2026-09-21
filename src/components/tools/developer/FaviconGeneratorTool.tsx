"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  Download,
  Copy,
  CheckCheck,
  RotateCcw,
  Sliders,
  FileCode,
  Layers,
  CheckCircle2,
  AlertCircle,
  Monitor,
  Smartphone,
  Globe,
  Loader2,
  FolderArchive,
  Image as ImageIcon,
  Share2,
  Code2,
  Info,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSnippetWithAttribution } from "@/lib/snippet-attribution";
import { EmbedToolModal } from "@/components/tools/EmbedToolModal";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import {
  FaviconAsset,
  FaviconConfig,
  generateFaviconAssets,
  createFaviconZip,
  triggerFileDownload,
} from "@/lib/favicon-generator";

interface FaviconGeneratorToolProps {
  toolSlug?: string;
  toolName?: string;
  platform?: {
    name: string;
    slug: string;
  };
  isEmbedded?: boolean;
}

// Default SVG preset logo
const DEFAULT_PRESET_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><rect width="512" height="512" rx="112" fill="%2310b981"/><path d="M256 96L368 288H144L256 96Z" fill="white" opacity="0.95"/><circle cx="256" cy="368" r="48" fill="white"/><path d="M192 288L256 384L320 288H192Z" fill="%23047857"/></svg>`;

const SAMPLE_PRESETS = [
  {
    name: "Emerald Rocket",
    themeColor: "#10b981",
    backgroundColor: "#064e3b",
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><rect width="512" height="512" rx="112" fill="%2310b981"/><path d="M256 100 C200 160 180 260 180 340 L256 390 L332 340 C332 260 312 160 256 100 Z" fill="white"/><circle cx="256" cy="220" r="32" fill="%23047857"/><path d="M180 340 L130 380 L180 390 Z" fill="%23f59e0b"/><path d="M332 340 L382 380 L332 390 Z" fill="%23f59e0b"/><path d="M220 390 L256 440 L292 390 Z" fill="%23ef4444"/></svg>`,
  },
  {
    name: "Indigo Lightning",
    themeColor: "#4f46e5",
    backgroundColor: "#0f172a",
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><rect width="512" height="512" rx="112" fill="%234f46e5"/><path d="M280 64 L160 272 L260 272 L232 448 L352 240 L252 240 Z" fill="white"/></svg>`,
  },
  {
    name: "Violet Spark",
    themeColor: "#8b5cf6",
    backgroundColor: "#1e1b4b",
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><rect width="512" height="512" rx="112" fill="%238b5cf6"/><path d="M256 80 L290 200 L410 234 L290 268 L256 388 L222 268 L102 234 L222 200 Z" fill="white"/><circle cx="360" cy="140" r="24" fill="%23f43f5e"/><circle cx="150" cy="340" r="18" fill="%2338bdf8"/></svg>`,
  },
];

export function FaviconGeneratorTool({
  toolSlug = "favicon-meta-generator",
  toolName = "Favicon & App Icon Generator",
  platform,
  isEmbedded = false,
}: FaviconGeneratorToolProps) {
  // State for image source
  const [sourceImage, setSourceImage] = useState<string>(DEFAULT_PRESET_SVG);
  const [imageMeta, setImageMeta] = useState<{
    name: string;
    width: number;
    height: number;
    sizeBytes: number;
  }>({
    name: "emerald-rocket-preset.svg",
    width: 512,
    height: 512,
    sizeBytes: 2450,
  });

  // Config parameters
  const [config, setConfig] = useState<FaviconConfig>({
    basePath: "/",
    appName: "OmniSEOTools",
    shortName: "OmniSEO",
    themeColor: "#10b981",
    backgroundColor: "#064e3b",
    paddingPercent: 0,
  });

  // Generated assets state
  const [assets, setAssets] = useState<FaviconAsset[]>([]);
  const [manifestJson, setManifestJson] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Active code preview tab
  const [activeTab, setActiveTab] = useState<"html" | "nextjs" | "manifest" | "frameworks">("html");
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Process image and regenerate assets
  const processImage = useCallback(
    async (src: string, currentConfig: FaviconConfig) => {
      setIsProcessing(true);
      setError(null);
      try {
        const result = await generateFaviconAssets(src, currentConfig);
        setAssets(result.assets);
        setManifestJson(result.manifestJson);
      } catch (err) {
        console.error("Failed to generate favicon assets:", err);
        setError(err instanceof Error ? err.message : "Failed to process image.");
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Re-run processing whenever sourceImage or config changes
  useEffect(() => {
    processImage(sourceImage, config);
  }, [sourceImage, config, processImage]);

  // Handle local file selection
  const handleFileChange = (file: File) => {
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg|svg\+xml|webp)$/i)) {
      setError("Please select a valid image file (.png, .jpg, .svg, .webp).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          name: file.name,
          width: img.naturalWidth,
          height: img.naturalHeight,
          sizeBytes: file.size,
        });
        setSourceImage(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // ZIP Bundle Download
  const handleDownloadZip = async () => {
    if (assets.length === 0) return;
    setIsZipping(true);
    try {
      const zipBlob = await createFaviconZip(assets, manifestJson);
      triggerFileDownload(zipBlob, "favicon-package.zip");
    } catch (err) {
      console.error("ZIP creation failed:", err);
      setError("Failed to create ZIP package.");
    } finally {
      setIsZipping(false);
    }
  };

  // Single asset download
  const handleDownloadSingle = (asset: FaviconAsset) => {
    triggerFileDownload(asset.blob, asset.filename);
  };

  // Clean formatted base path
  const cleanBasePath = config.basePath.endsWith("/")
    ? config.basePath
    : `${config.basePath}/`;

  // Multi-Framework Code Snippets
  const htmlSnippet = `<!-- Favicon & Touch Icons -->
<link rel="icon" href="${cleanBasePath}favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="${cleanBasePath}favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="${cleanBasePath}favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="${cleanBasePath}apple-touch-icon.png" />
<link rel="manifest" href="${cleanBasePath}site.webmanifest" />
<meta name="theme-color" content="${config.themeColor}" />`;

  const nextJsSnippet = `// app/layout.tsx (Next.js 14 / 15 App Router)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${config.appName}',
  icons: {
    icon: [
      { url: '${cleanBasePath}favicon.ico', sizes: 'any' },
      { url: '${cleanBasePath}favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '${cleanBasePath}favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '${cleanBasePath}apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '${cleanBasePath}site.webmanifest',
};`;

  const astroSnippet = `---
// src/layouts/Layout.astro
---
<!doctype html>
<html lang="en">
  <head>
    <link rel="icon" href="${cleanBasePath}favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="${cleanBasePath}favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="${cleanBasePath}favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="${cleanBasePath}apple-touch-icon.png" />
    <link rel="manifest" href="${cleanBasePath}site.webmanifest" />
    <meta name="theme-color" content="${config.themeColor}" />
  </head>
  <body>
    <slot />
  </body>
</html>`;

  const svelteSnippet = `<!-- src/routes/+layout.svelte (SvelteKit) -->
<svelte:head>
  <link rel="icon" href="${cleanBasePath}favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="${cleanBasePath}favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="${cleanBasePath}favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="${cleanBasePath}apple-touch-icon.png" />
  <link rel="manifest" href="${cleanBasePath}site.webmanifest" />
  <meta name="theme-color" content="${config.themeColor}" />
</svelte:head>`;

  const getActiveCode = () => {
    switch (activeTab) {
      case "html":
        return htmlSnippet;
      case "nextjs":
        return nextJsSnippet;
      case "manifest":
        return manifestJson;
      case "frameworks":
        return `/* Astro */\n${astroSnippet}\n\n/* SvelteKit */\n${svelteSnippet}`;
    }
  };

  const handleCopy = (tabKey: string, code: string) => {
    const formatted = formatSnippetWithAttribution(code, {
      slug: toolSlug,
      platformSlug: platform?.slug,
      language: tabKey === "manifest" ? "json" : tabKey === "nextjs" ? "typescript" : "html",
    });
    navigator.clipboard.writeText(formatted);
    setCopiedTab(tabKey);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  // Helper for byte formatting
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className="w-full space-y-8">
      {/* SECTION 1: Source Image Upload & Settings Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Drag & Drop Dropzone */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative group flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden",
              isDragging
                ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[1.01]"
                : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500/80 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 shadow-sm"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                <Upload className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Drop your logo image here, or{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/40">
                    browse files
                  </span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports PNG, JPG, SVG, or WebP. Recommend 512×512 or higher.
                </p>
              </div>

              {/* Current Image Badge */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono">
                  {imageMeta.name}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 font-semibold">
                  {imageMeta.width}×{imageMeta.height} px
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5">
                  {formatBytes(imageMeta.sizeBytes)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Presets for Instant Testing */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">
              Try sample logos:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setSourceImage(preset.svg);
                    setConfig((prev) => ({
                      ...prev,
                      themeColor: preset.themeColor,
                      backgroundColor: preset.backgroundColor,
                    }));
                    setImageMeta({
                      name: `${preset.name.toLowerCase().replace(/\s+/g, "-")}.svg`,
                      width: 512,
                      height: 512,
                      sizeBytes: 2500,
                    });
                  }}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/60 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Browser & Mobile Mockups */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Monitor className="h-3.5 w-3.5 text-emerald-500" />
              <span>Real-Time Tab &amp; Device Simulator</span>
            </h3>

            <div className="space-y-3">
              {/* Desktop Browser Tab Mockup */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-2.5 space-y-1.5 shadow-inner">
                <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200/60 dark:border-slate-800/60">
                  <div className="h-2 w-2 rounded-full bg-rose-400" />
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-slate-400 font-mono ml-2">Chrome Desktop Tab</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs max-w-xs">
                  {/* Scaled 16x16 Icon preview */}
                  <div className="h-4 w-4 shrink-0 rounded overflow-hidden flex items-center justify-center bg-transparent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assets.find((a) => a.size === 16)?.dataUrl || sourceImage}
                      alt="16x16 tab favicon"
                      className="h-4 w-4 object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                    {config.appName} — Home
                  </span>
                </div>
              </div>

              {/* iOS Safari Home Screen & Android PWA Card */}
              <div className="grid grid-cols-2 gap-3">
                {/* iOS Bookmark */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <div className="h-10 w-10 shrink-0 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-md border border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assets.find((a) => a.size === 180)?.dataUrl || sourceImage}
                      alt="Apple Touch Icon"
                      className="h-10 w-10 object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                      iOS Bookmark
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">180×180 px</p>
                  </div>
                </div>

                {/* Android PWA Icon */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                  <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden bg-slate-900 flex items-center justify-center shadow-md border border-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assets.find((a) => a.size === 192)?.dataUrl || sourceImage}
                      alt="Android PWA Icon"
                      className="h-10 w-10 object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                      Android PWA
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">192×192 px</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Padding Slider */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-emerald-500" />
                <span>Icon Safe Padding Buffer:</span>
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {config.paddingPercent}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="2"
              value={config.paddingPercent}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  paddingPercent: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Generated Asset Bundle Grid & ZIP Download CTA */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Generated Production Favicon Assets
              </h2>
              {isProcessing && <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Resized in-browser via offscreen HTML5 Canvas. Ready to download individually or as a complete bundle.
            </p>
          </div>

          {/* Primary ZIP CTA */}
          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isZipping || assets.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            {isZipping ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Packaging ZIP Bundle...</span>
              </>
            ) : (
              <>
                <FolderArchive className="h-4 w-4" />
                <span>Download Asset Bundle (.zip)</span>
              </>
            )}
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Asset Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {assets.map((asset) => (
            <div
              key={asset.filename}
              className="group relative flex flex-col items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 hover:border-emerald-500/50 hover:shadow-md transition-all text-center"
            >
              {/* Preview Thumbnail Container */}
              <div className="h-16 w-16 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-1.5 shadow-inner mb-2 group-hover:scale-105 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.dataUrl}
                  alt={asset.filename}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Asset Metadata */}
              <div className="w-full space-y-0.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate" title={asset.filename}>
                  {asset.filename}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {asset.size}×{asset.size} px • {formatBytes(asset.byteSize)}
                </p>
              </div>

              {/* Single File Download Button */}
              <button
                type="button"
                onClick={() => handleDownloadSingle(asset)}
                className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 text-[11px] font-semibold hover:text-emerald-600 transition-colors cursor-pointer"
                title={`Download ${asset.filename}`}
              >
                <Download className="h-3 w-3" />
                <span>Save</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Web App Configuration & Code Generation */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Web Manifest Configuration &amp; Code Generator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Customize your base directory path, app name, and theme colors to synchronize HTML tags and site.webmanifest code in real time.
          </p>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Icon Base Path
            </label>
            <input
              type="text"
              value={config.basePath}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, basePath: e.target.value }))
              }
              placeholder="/ or /icons/"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Web App Name
            </label>
            <input
              type="text"
              value={config.appName}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, appName: e.target.value }))
              }
              placeholder="OmniSEOTools"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Theme Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.themeColor}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, themeColor: e.target.value }))
                }
                className="h-8 w-8 rounded-lg border-0 cursor-pointer p-0 shrink-0"
              />
              <input
                type="text"
                value={config.themeColor}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, themeColor: e.target.value }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Background Color (PWA Splash)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, backgroundColor: e.target.value }))
                }
                className="h-8 w-8 rounded-lg border-0 cursor-pointer p-0 shrink-0"
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, backgroundColor: e.target.value }))
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Code Tabs & Output */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("html")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeTab === "html"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                HTML &lt;head&gt;
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("nextjs")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeTab === "nextjs"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                Next.js App Router
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("manifest")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeTab === "manifest"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                site.webmanifest
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("frameworks")}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  activeTab === "frameworks"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                Astro / SvelteKit
              </button>
            </div>

            {/* Copy CTA */}
            <button
              type="button"
              onClick={() => handleCopy(activeTab, getActiveCode())}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              {copiedTab === activeTab ? (
                <>
                  <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
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

          {/* Next.js File Placement Tip Card */}
          {activeTab === "nextjs" && (
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold">
                <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Next.js 14 &amp; 15 App Router Conventions:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-indigo-800 dark:text-indigo-300">
                You can either paste the TypeScript metadata snippet below into <code className="font-mono bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">app/layout.tsx</code>, or drop <code className="font-mono bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">favicon.ico</code>, <code className="font-mono bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">icon.png</code> (512×512), and <code className="font-mono bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">apple-icon.png</code> (180×180) directly into your <code className="font-mono bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">app/</code> directory for automatic zero-config resolution.
              </p>
            </div>
          )}

          {/* Code Output Block */}
          <div className="relative rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-100 overflow-x-auto border border-slate-800 shadow-inner max-h-80">
            <pre className="leading-relaxed">
              <code>{getActiveCode()}</code>
            </pre>
          </div>
        </div>

        {/* Bottom Utility Bar: Embed Modals */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>100% In-Browser Canvas Resizer • Zero Server Uploads</span>
          </div>

          <div className="flex items-center gap-2">
            <EmbedToolModal slug={toolSlug} toolName={toolName} buttonVariant="outline" />
            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="Favicons"
              status="100% Modern"
              score={100}
              buttonVariant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
