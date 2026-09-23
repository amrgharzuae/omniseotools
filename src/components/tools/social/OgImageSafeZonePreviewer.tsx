"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  Crop,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Check,
  Copy,
  Download,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sliders,
  Eye,
  Smartphone,
  Monitor,
  Grid,
  Layers,
  Info,
  ExternalLink,
  Share2,
  Maximize2,
  ZoomIn,
  Move,
  FileImage,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface OgImageSafeZonePreviewerProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

type PlatformTab = "facebook" | "twitter-large" | "twitter-small" | "linkedin" | "whatsapp";

interface SamplePreset {
  name: string;
  url: string;
  label: string;
}

const SAMPLE_TEMPLATES: SamplePreset[] = [
  {
    name: "Tech SaaS Banner",
    label: "SaaS (1200x630)",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
  },
  {
    name: "Editorial 16:9 Banner",
    label: "Editorial (1920x1080)",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1920&h=1080&fit=crop&q=80",
  },
  {
    name: "Square Product 1:1",
    label: "Square (800x800)",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&q=80",
  },
];

export function OgImageSafeZonePreviewer({ toolSlug, toolName }: OgImageSafeZonePreviewerProps) {
  // Image State
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_TEMPLATES[0].url);
  const [imageMetadata, setImageMetadata] = useState<{
    width: number;
    height: number;
    aspectRatio: string;
    fileSizeBytes?: number;
  }>({
    width: 1200,
    height: 630,
    aspectRatio: "1.91:1",
  });

  // Display & Safe Zone Controls
  const [activePlatform, setActivePlatform] = useState<PlatformTab>("facebook");
  const [showSafeZoneGrid, setShowSafeZoneGrid] = useState<boolean>(true);
  const [showMobileOverlay, setShowMobileOverlay] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [showRuleOfThirds, setShowRuleOfThirds] = useState<boolean>(false);

  // Pan & Zoom Positioning
  const [zoom, setZoom] = useState<number>(100);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [fitMode, setFitMode] = useState<"cover" | "contain">("cover");

  // Mock Post Metadata
  const [postTitle, setPostTitle] = useState<string>("Executive Insights: 2026 Growth Playbook for High-Scale Engineering");
  const [postDescription, setPostDescription] = useState<string>(
    "Explore proven architectural strategies, zero-latency workflows, and SEO performance blueprints deployed by top teams."
  );
  const [domainName, setDomainName] = useState<string>("omniseotools.com");

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Load natural dimensions when image changes
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const ratio = (img.naturalWidth / img.naturalHeight).toFixed(2);
      let ratioLabel = `${ratio}:1`;
      if (Math.abs(img.naturalWidth / img.naturalHeight - 16 / 9) < 0.05) ratioLabel = "16:9";
      if (Math.abs(img.naturalWidth / img.naturalHeight - 1.91) < 0.05) ratioLabel = "1.91:1 (OG Standard)";
      if (Math.abs(img.naturalWidth / img.naturalHeight - 1) < 0.05) ratioLabel = "1:1 (Square)";
      if (Math.abs(img.naturalWidth / img.naturalHeight - 4 / 3) < 0.05) ratioLabel = "4:3";

      setImageMetadata((prev) => ({
        ...prev,
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: ratioLabel,
      }));
    };
  }, [imageUrl]);

  // Handle Local File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setImageMetadata((prev) => ({
        ...prev,
        fileSizeBytes: file.size,
      }));
    }
  };

  // Reset Positioning
  const handleResetPosition = () => {
    setZoom(100);
    setPanX(0);
    setPanY(0);
    setFitMode("cover");
  };

  // Client-Side Canvas Crop & Download
  const handleDownloadOptimized = useCallback(
    async (format: "png" | "webp") => {
      setIsDownloading(true);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 630;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // Fill background dark
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(0, 0, 1200, 630);

        // Apply Zoom & Pan calculations
        const zoomFactor = zoom / 100;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const targetRatio = 1200 / 630;

        let drawW = 1200;
        let drawH = 630;

        if (fitMode === "cover") {
          if (imgRatio > targetRatio) {
            drawH = 630 * zoomFactor;
            drawW = drawH * imgRatio;
          } else {
            drawW = 1200 * zoomFactor;
            drawH = drawW / imgRatio;
          }
        } else {
          // contain
          if (imgRatio > targetRatio) {
            drawW = 1200 * zoomFactor;
            drawH = drawW / imgRatio;
          } else {
            drawH = 630 * zoomFactor;
            drawW = drawH * imgRatio;
          }
        }

        const offsetX = (1200 - drawW) / 2 + (panX / 100) * 1200;
        const offsetY = (630 - drawH) / 2 + (panY / 100) * 630;

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

        const mime = format === "webp" ? "image/webp" : "image/png";
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const downloadUrl = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = downloadUrl;
              link.download = `og-image-1200x630.${format}`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(downloadUrl);
            }
            setIsDownloading(false);
          },
          mime,
          0.92
        );
      } catch {
        setIsDownloading(false);
      }
    },
    [imageUrl, zoom, panX, panY, fitMode]
  );

  // Compute Diagnostic Audit Score
  const diagnostics = useMemo(() => {
    const issues: Array<{ type: "success" | "warning" | "error"; text: string }> = [];
    let score = 100;

    const { width, height, fileSizeBytes } = imageMetadata;

    // Dimension checks
    if (width >= 1200 && height >= 630) {
      issues.push({
        type: "success",
        text: `High-definition resolution (${width} × ${height} px) meets retina standard.`,
      });
    } else if (width >= 600 && height >= 315) {
      issues.push({
        type: "warning",
        text: `Resolution (${width} × ${height} px) meets minimum requirement but is below recommended 1200 × 630 px.`,
      });
      score -= 15;
    } else {
      issues.push({
        type: "error",
        text: `Resolution (${width} × ${height} px) is below minimum 600 × 315 px threshold. May cause blurry rendering.`,
      });
      score -= 35;
    }

    // Aspect ratio checks
    const ratioVal = width / height;
    if (Math.abs(ratioVal - 1.904) <= 0.05) {
      issues.push({
        type: "success",
        text: "Aspect ratio matches exact 1.91:1 Open Graph golden standard.",
      });
    } else if (Math.abs(ratioVal - 16 / 9) <= 0.05) {
      issues.push({
        type: "warning",
        text: "16:9 ratio detected. LinkedIn will crop 24px off top and bottom in feed cards.",
      });
      score -= 10;
    } else if (Math.abs(ratioVal - 1) <= 0.05) {
      issues.push({
        type: "info" as any,
        text: "1:1 Square ratio. Perfect for Twitter Small Card (summary) and Discord thumbnails.",
      });
    } else {
      issues.push({
        type: "warning",
        text: `Non-standard aspect ratio (${ratioVal.toFixed(2)}:1). Edge content will be clipped in horizontal feeds.`,
      });
      score -= 20;
    }

    // File size check
    if (fileSizeBytes) {
      const kb = fileSizeBytes / 1024;
      if (kb > 5120) {
        issues.push({
          type: "error",
          text: `File size (${(kb / 1024).toFixed(1)} MB) exceeds Twitter's 5MB crawler limit.`,
        });
        score -= 25;
      } else if (kb > 1024) {
        issues.push({
          type: "warning",
          text: `File size (${(kb / 1024).toFixed(1)} MB) is over 1MB. Consider compressing to WebP for faster bot indexing.`,
        });
        score -= 10;
      } else {
        issues.push({
          type: "success",
          text: `File size (${kb.toFixed(0)} KB) is lightweight and crawler-friendly.`,
        });
      }
    }

    score = Math.max(0, Math.min(100, score));

    return { score, issues };
  }, [imageMetadata]);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner: Presets & Controls */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-5 text-white shadow-xl shadow-indigo-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Title & Badge */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/30 border border-indigo-400/30 text-indigo-300">
              <Crop className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                OG & Twitter Card Image Safe-Zone Previewer
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold">
                  1200 × 630 Safe Area
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Audit social cards against 60px safe margin buffers, mobile cutouts & aspect ratio crops.
              </p>
            </div>
          </div>

          {/* Quick Presets & Embed Badge */}
          <div className="flex flex-wrap items-center gap-1.5">
            {SAMPLE_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setImageUrl(tmpl.url)}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors"
              >
                {tmpl.label}
              </button>
            ))}

            <EmbedBadgeModal
              toolSlug={toolSlug || "open-graph-image-safe-zone"}
              label="OG Safe Zone"
              status="1200x630 Verified"
              score={diagnostics.score}
            />
          </div>

        </div>
      </div>

      {/* Main Dual-Pane Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Image Upload & Display Controls */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Upload Dropzone & URL Input */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="h-4 w-4 text-indigo-500" />
                Upload Social Image
              </h3>
              <span className="text-xs font-mono text-slate-500">
                PNG, JPG, WebP
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp, image/svg+xml"
              className="hidden"
            />

            {/* Dropzone Trigger */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl p-6 text-center cursor-pointer bg-slate-50/60 dark:bg-slate-950/40 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all duration-200 group"
            >
              <div className="mx-auto w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                Click to browse or drag & drop image
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Processed 100% locally in-browser with zero server uploads
              </p>
            </div>

            {/* Or Paste Direct URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Or Paste Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/images/og-hero.png"
                className="w-full font-mono text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Resolution & Ratio Metadata Pills */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div className="text-[10px] font-semibold text-slate-500">Dimensions</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                  {imageMetadata.width} × {imageMetadata.height} px
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div className="text-[10px] font-semibold text-slate-500">Aspect Ratio</div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono truncate">
                  {imageMetadata.aspectRatio}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div className="text-[10px] font-semibold text-slate-500">File Size</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                  {imageMetadata.fileSizeBytes
                    ? `${(imageMetadata.fileSizeBytes / 1024).toFixed(0)} KB`
                    : "Remote"}
                </div>
              </div>
            </div>
          </div>

          {/* Display Overlays & Transform Positioning */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-500" />
                Safe-Zone Overlays & Positioning
              </h3>
              <button
                type="button"
                onClick={handleResetPosition}
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Alignment
              </button>
            </div>

            {/* Display Overlays Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSafeZoneGrid}
                  onChange={(e) => setShowSafeZoneGrid(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Show 60px Safe-Zone Buffer (1080×510)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showMobileOverlay}
                  onChange={(e) => setShowMobileOverlay(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Simulate Platform Mobile UI Overlays</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRuleOfThirds}
                  onChange={(e) => setShowRuleOfThirds(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Rule of Thirds Alignment Grid</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMobileView}
                  onChange={(e) => setIsMobileView(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Mobile Viewport Width (Simulate App Feed)</span>
              </label>
            </div>

            {/* Position Controls: Zoom & Pan */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
              {/* Zoom Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <ZoomIn className="h-3.5 w-3.5 text-indigo-500" />
                    Scale / Zoom
                  </span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{zoom}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={zoom}
                  onChange={(e) => setZoom(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Horizontal & Vertical Pan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Horizontal Pan (X)</span>
                    <span className="font-mono text-slate-500">{panX}%</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={panX}
                    onChange={(e) => setPanX(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Vertical Pan (Y)</span>
                    <span className="font-mono text-slate-500">{panY}%</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={panY}
                    onChange={(e) => setPanY(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Download Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={isDownloading}
                onClick={() => handleDownloadOptimized("png")}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span>Export 1200×630 PNG</span>
              </button>
              <button
                type="button"
                disabled={isDownloading}
                onClick={() => handleDownloadOptimized("webp")}
                className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <span>WebP</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Multi-Platform Mockup & Safe-Zone Canvas */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
          
          {/* Main Mockup Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md overflow-hidden">
            
            {/* Platform Selector Tabs */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 p-0.5 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActivePlatform("facebook")}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
                    activePlatform === "facebook"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Facebook (1.91:1)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatform("twitter-large")}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
                    activePlatform === "twitter-large"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Twitter Large
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatform("twitter-small")}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
                    activePlatform === "twitter-small"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Twitter Small (1:1)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatform("linkedin")}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors whitespace-nowrap",
                    activePlatform === "linkedin"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  LinkedIn (1200×627)
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                {activePlatform === "twitter-small" ? "600 × 600" : activePlatform === "linkedin" ? "1200 × 627" : "1200 × 630"}
              </span>
            </div>

            {/* Interactive Mockup Canvas Container */}
            <div className="p-4 sm:p-5 bg-slate-100 dark:bg-slate-950/80 flex justify-center">
              <div
                className={cn(
                  "w-full transition-all duration-300",
                  isMobileView ? "max-w-[340px]" : "max-w-[520px]"
                )}
              >
                
                {/* 1. FACEBOOK / OPEN GRAPH MOCKUP */}
                {activePlatform === "facebook" && (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                    {/* Visual Card Viewport */}
                    <div className="relative aspect-[1.904/1] w-full overflow-hidden bg-slate-900 select-none">
                      {/* Scaled / Panned Image */}
                      <img
                        src={imageUrl}
                        alt="Social Card Preview"
                        style={{
                          transform: `scale(${zoom / 100}) translate(${panX}%, ${panY}%)`,
                          objectFit: fitMode,
                        }}
                        className="w-full h-full object-cover transition-transform duration-75 pointer-events-none"
                      />

                      {/* Safe Zone Grid Overlay */}
                      {showSafeZoneGrid && (
                        <div className="absolute inset-0 pointer-events-none">
                          {/* 60px Safe Margin Buffer (Outer Amber Glow) */}
                          <div className="absolute inset-[9.5%] border-2 border-emerald-400/80 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                            <span className="px-2 py-0.5 rounded bg-emerald-900/90 text-emerald-200 text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-sm">
                              1080 × 510 Safe Zone
                            </span>
                          </div>
                          {/* Outer Bleed Zone Indicators */}
                          <div className="absolute top-1 left-2 text-[9px] font-mono text-amber-400 bg-black/60 px-1 rounded">
                            60px Buffer
                          </div>
                        </div>
                      )}

                      {/* Rule of Thirds Grid */}
                      {showRuleOfThirds && (
                        <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
                          <div className="border-r border-b border-white/20" />
                          <div className="border-r border-b border-white/20" />
                          <div className="border-b border-white/20" />
                          <div className="border-r border-b border-white/20" />
                          <div className="border-r border-b border-white/20" />
                          <div className="border-b border-white/20" />
                          <div className="border-r border-white/20" />
                          <div className="border-r border-white/20" />
                          <div />
                        </div>
                      )}

                      {/* Mobile UI Overlays */}
                      {showMobileOverlay && (
                        <div className="absolute bottom-2 left-2 pointer-events-none">
                          <span className="px-2 py-1 rounded bg-black/70 text-white text-[10px] font-medium backdrop-blur-sm flex items-center gap-1">
                            <Share2 className="h-3 w-3 text-blue-400" />
                            {domainName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <div className="text-[11px] font-mono uppercase text-slate-500">{domainName}</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                        {postTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{postDescription}</div>
                    </div>
                  </div>
                )}

                {/* 2. TWITTER / X LARGE CARD MOCKUP */}
                {activePlatform === "twitter-large" && (
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black overflow-hidden shadow-sm">
                    <div className="relative aspect-[1.91/1] w-full overflow-hidden bg-slate-900 select-none">
                      <img
                        src={imageUrl}
                        alt="Twitter Large Card Preview"
                        style={{
                          transform: `scale(${zoom / 100}) translate(${panX}%, ${panY}%)`,
                          objectFit: fitMode,
                        }}
                        className="w-full h-full object-cover transition-transform duration-75 pointer-events-none"
                      />

                      {showSafeZoneGrid && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-[9.5%] border-2 border-emerald-400/80 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                            <span className="px-2 py-0.5 rounded bg-emerald-900/90 text-emerald-200 text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-sm">
                              Twitter 1080×510 Safe Zone
                            </span>
                          </div>
                        </div>
                      )}

                      {showMobileOverlay && (
                        <div className="absolute bottom-2 left-2 pointer-events-none">
                          <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono backdrop-blur-sm">
                            {domainName}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-white dark:bg-black border-t border-slate-100 dark:border-slate-900 space-y-0.5">
                      <div className="text-[11px] font-medium text-slate-500">{domainName}</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {postTitle}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. TWITTER / X SMALL CARD MOCKUP (1:1 Square) */}
                {activePlatform === "twitter-small" && (
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black p-3 flex items-center gap-3 shadow-sm">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0 select-none">
                      <img
                        src={imageUrl}
                        alt="Twitter Small Thumbnail"
                        style={{
                          transform: `scale(${zoom / 100}) translate(${panX}%, ${panY}%)`,
                          objectFit: fitMode,
                        }}
                        className="w-full h-full object-cover transition-transform duration-75 pointer-events-none"
                      />
                      {showSafeZoneGrid && (
                        <div className="absolute inset-2 border border-emerald-400/80 bg-emerald-500/10 rounded" />
                      )}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="text-[11px] font-medium text-slate-500">{domainName}</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                        {postTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{postDescription}</div>
                    </div>
                  </div>
                )}

                {/* 4. LINKEDIN FEED CARD MOCKUP (1200x627 with 24px vertical crop) */}
                {activePlatform === "linkedin" && (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                    <div className="relative aspect-[1.913/1] w-full overflow-hidden bg-slate-900 select-none">
                      <img
                        src={imageUrl}
                        alt="LinkedIn Preview"
                        style={{
                          transform: `scale(${zoom / 100}) translate(${panX}%, ${panY}%)`,
                          objectFit: fitMode,
                        }}
                        className="w-full h-full object-cover transition-transform duration-75 pointer-events-none"
                      />

                      {/* LinkedIn 24px Top/Bottom Cutout Alert */}
                      {showSafeZoneGrid && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-x-0 top-0 h-[4%] bg-rose-500/30 border-b border-rose-400" />
                          <div className="absolute inset-x-0 bottom-0 h-[4%] bg-rose-500/30 border-t border-rose-400" />
                          <div className="absolute inset-[10%] border-2 border-emerald-400/80 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                            <span className="px-2 py-0.5 rounded bg-emerald-900/90 text-emerald-200 text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-sm">
                              LinkedIn Safe Zone
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                        {postTitle}
                      </div>
                      <div className="text-[11px] font-medium text-slate-500">{domainName} • 7 min read</div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Diagnostic Score & Compliance Checklist */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white",
                      diagnostics.score >= 80 ? "bg-emerald-600" : "bg-amber-600"
                    )}
                  >
                    {diagnostics.score}
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {diagnostics.score >= 80 ? "Optimized for Social Feeds" : "Potential Clipping Warning"}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  {imageMetadata.width} × {imageMetadata.height}
                </span>
              </div>

              {/* Itemized Checks */}
              <div className="space-y-1.5 pt-1">
                {diagnostics.issues.map((iss, i) => (
                  <div key={i} className="text-[11px] flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    {iss.type === "success" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : iss.type === "warning" ? (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                    )}
                    <span>{iss.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Client-Side Private
                </span>
                <span>Canvas Resizer Engine</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default OgImageSafeZonePreviewer;
