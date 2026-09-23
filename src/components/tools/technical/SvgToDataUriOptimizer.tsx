"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  FileCode,
  Sparkles,
  Copy,
  Check,
  Download,
  UploadCloud,
  Trash2,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Info,
  ZoomIn,
  ZoomOut,
  Eye,
  Code,
} from "lucide-react";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

export interface SvgToDataUriOptimizerProps {
  toolSlug?: string;
  toolName?: string;
}

// Pure Sanitization Helper
export function sanitizeSvgString(svgString: string): string {
  if (!svgString) return "";
  let clean = svgString
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!--[\s\S]*?-->/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .trim();

  // Find root <svg and </svg>
  const start = clean.search(/<svg\b/i);
  const end = clean.search(/<\/svg>/i);
  if (start !== -1 && end !== -1) {
    clean = clean.substring(start, end + 6);
  }
  return clean.trim();
}

// Quick Sample Presets with 100% Inline Raw Strings (No external files)
const SAMPLE_PRESETS = [
  {
    id: "checkmark",
    name: "Checkmark Icon",
    description: "Clean modern circular checkmark vector",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
  <polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg>`,
  },
  {
    id: "warning-badge",
    name: "Warning Badge",
    description: "Two-tone warning triangle badge with viewBox",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
  <line x1="12" y1="9" x2="12" y2="13" stroke="#d97706" stroke-width="2"></line>
  <line x1="12" y1="17" x2="12.01" y2="17" stroke="#d97706" stroke-width="2"></line>
</svg>`,
  },
  {
    id: "geometric-pattern",
    name: "Hero Background Pattern",
    description: "Repeating geometric grid pattern for CSS backgrounds",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" stroke-width="1" stroke-opacity="0.25"/>
      <circle cx="40" cy="0" r="2" fill="#6366f1" fill-opacity="0.5"/>
      <circle cx="0" cy="0" r="2" fill="#6366f1" fill-opacity="0.5"/>
      <circle cx="0" cy="40" r="2" fill="#6366f1" fill-opacity="0.5"/>
      <circle cx="40" cy="40" r="2" fill="#6366f1" fill-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>`,
  },
];

type ExportTab = "css" | "base64" | "img" | "jsx" | "svg";
type BackgroundPattern = "light-grid" | "dark-grid" | "white" | "dark-slate";

export function SvgToDataUriOptimizer({
  toolSlug = "svg-to-data-uri",
}: SvgToDataUriOptimizerProps) {
  // Main Input State
  const [rawSvg, setRawSvg] = useState<string>(SAMPLE_PRESETS[0].svg);
  const [activeTab, setActiveTab] = useState<ExportTab>("css");
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  // Optimization Toggles
  const [minifyMarkup, setMinifyMarkup] = useState(true);
  const [fixCssUnsafe, setFixCssUnsafe] = useState(true);
  const [stripDimensions, setStripDimensions] = useState(true);
  const [colorOverrideEnabled, setColorOverrideEnabled] = useState(false);
  const [colorOverride, setColorOverride] = useState("#6366f1");

  // Preview Controls
  const [previewBg, setPreviewBg] = useState<BackgroundPattern>("light-grid");
  const [previewZoom, setPreviewZoom] = useState(100);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Preset
  const handleLoadPreset = (preset: (typeof SAMPLE_PRESETS)[0]) => {
    setRawSvg(preset.svg);
  };

  // Drag and Drop File Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) setRawSvg(content);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) setRawSvg(content);
      };
      reader.readAsText(file);
    }
  };

  // Optimization & Transformation Engine
  const optimizedData = useMemo(() => {
    if (!rawSvg.trim()) {
      return {
        optimizedSvg: "",
        cssDataUri: "",
        cssDeclaration: "",
        base64DataUri: "",
        imgTag: "",
        jsxCode: "",
        originalBytes: 0,
        optimizedBytes: 0,
        byteSavings: 0,
        percentSavings: 0,
        gzipEstimateBytes: 0,
        isValidSvg: false,
        error: "Upload or paste an SVG to preview",
      };
    }

    try {
      // Clean and sanitize raw SVG
      let svg = sanitizeSvgString(rawSvg);

      if (!svg.startsWith("<svg") || !svg.endsWith("</svg>")) {
        return {
          optimizedSvg: "",
          cssDataUri: "",
          cssDeclaration: "",
          base64DataUri: "",
          imgTag: "",
          jsxCode: "",
          originalBytes: new Blob([rawSvg]).size,
          optimizedBytes: 0,
          byteSavings: 0,
          percentSavings: 0,
          gzipEstimateBytes: 0,
          isValidSvg: false,
          error: "Invalid SVG: Missing valid <svg> root element.",
        };
      }

      // 1. Editor Metadata and Namespace Cleanup
      svg = svg.replace(/\s+(xmlns:inkscape|xmlns:sodipodi|xmlns:sketch|xmlns:serif|xmlns:dc|xmlns:cc|xmlns:rdf|xmlns:vectornator)="[^"]*"/gi, "");
      svg = svg.replace(/\s+(inkscape:[a-z0-9-]+|sodipodi:[a-z0-9-]+|sketch:[a-z0-9-]+|serif:[a-z0-9-]+|vectornator:[a-z0-9-]+)="[^"]*"/gi, "");
      svg = svg.replace(/<(sodipodi|inkscape|metadata)[\s\S]*?<\/(sodipodi|inkscape|metadata)>/gi, "");
      svg = svg.replace(/<(sodipodi|inkscape|metadata)[^>]*\/>/gi, "");

      // 2. Ensure xmlns="http://www.w3.org/2000/svg"
      if (!/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/i.test(svg)) {
        svg = svg.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // 3. ViewBox Extraction & Responsive Dimension Normalization
      const rootTagMatch = svg.match(/<svg\b([^>]*)>/i);
      if (rootTagMatch) {
        const rootAttrs = rootTagMatch[1];
        const widthMatch = rootAttrs.match(/\bwidth=["']([0-9.]+)(px|%)?["']/i);
        const heightMatch = rootAttrs.match(/\bheight=["']([0-9.]+)(px|%)?["']/i);
        const viewBoxMatch = rootAttrs.match(/\bviewBox=["']([^"']+)["']/i);

        // If viewBox is missing, auto-synthesize from width & height numbers
        if (!viewBoxMatch && widthMatch && heightMatch) {
          const w = parseFloat(widthMatch[1]);
          const h = parseFloat(heightMatch[1]);
          if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
            svg = svg.replace(/<svg\b/i, `<svg viewBox="0 0 ${w} ${h}"`);
          }
        }

        // Strip hardcoded width & height if requested
        if (stripDimensions) {
          svg = svg.replace(/(<svg\b[^>]*?)\s+width=["'][^"']*["']/i, "$1");
          svg = svg.replace(/(<svg\b[^>]*?)\s+height=["'][^"']*["']/i, "$1");
        }
      }

      // 4. Minification (Whitespace Collapse)
      if (minifyMarkup) {
        // Remove spaces between tags
        svg = svg.replace(/>\s+</g, "><");
        // Collapse internal spaces
        svg = svg.replace(/\s{2,}/g, " ");
        svg = svg.trim();
      }

      // 5. Dynamic Color Override
      if (colorOverrideEnabled && colorOverride) {
        svg = svg.replace(/fill=["'](?!none|transparent|currentColor)([^"']+)["']/gi, `fill="${colorOverride}"`);
        svg = svg.replace(/stroke=["'](?!none|transparent|currentColor)([^"']+)["']/gi, `stroke="${colorOverride}"`);
      }

      // 6. Generate URL-Encoded CSS Data URI
      let cssSvg = svg;
      if (fixCssUnsafe) {
        cssSvg = cssSvg.replace(/"/g, "'");
        cssSvg = cssSvg
          .replace(/%/g, "%25")
          .replace(/#/g, "%23")
          .replace(/</g, "%3C")
          .replace(/>/g, "%3E")
          .replace(/\s+/g, " ");
      } else {
        cssSvg = encodeURIComponent(cssSvg);
      }
      const cssDataUri = `data:image/svg+xml,${cssSvg}`;
      const cssDeclaration = `background-image: url("${cssDataUri}");`;

      // 7. Generate Base64 Data URI
      let base64String = "";
      try {
        base64String = window.btoa(unescape(encodeURIComponent(svg)));
      } catch {
        base64String = "";
      }
      const base64DataUri = base64String ? `data:image/svg+xml;base64,${base64String}` : "";

      // 8. Generate HTML <img> Tag
      const imgTag = `<img src="${cssDataUri}" alt="Optimized Vector" width="100%" height="auto" />`;

      // 9. Generate React / Next.js JSX Component
      let jsxBody = svg;
      const attrMap: Record<string, string> = {
        "fill-rule": "fillRule",
        "clip-rule": "clipRule",
        "stroke-width": "strokeWidth",
        "stroke-linecap": "strokeLinecap",
        "stroke-linejoin": "strokeLinejoin",
        "stroke-miterlimit": "strokeMiterlimit",
        "stroke-dasharray": "strokeDasharray",
        "stroke-dashoffset": "strokeDashoffset",
        "stroke-opacity": "strokeOpacity",
        "fill-opacity": "fillOpacity",
        "stop-color": "stopColor",
        "stop-opacity": "stopOpacity",
        "font-family": "fontFamily",
        "font-size": "fontSize",
        "font-weight": "fontWeight",
        "text-anchor": "textAnchor",
        "xmlns:xlink": "xmlnsXlink",
        "xlink:href": "xlinkHref",
        "clip-path": "clipPath",
        "color-interpolation-filters": "colorInterpolationFilters",
      };

      Object.entries(attrMap).forEach(([kebab, camel]) => {
        const regex = new RegExp(`\\b${kebab}=`, "g");
        jsxBody = jsxBody.replace(regex, `${camel}=`);
      });

      jsxBody = jsxBody.replace(/<svg\b/i, "<svg {...props}");

      const jsxCode = `import React from "react";

export function SvgIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${jsxBody}
  );
}`;

      // Calculate Metrics
      const originalBytes = new Blob([rawSvg]).size;
      const optimizedBytes = new Blob([svg]).size;
      const byteSavings = Math.max(0, originalBytes - optimizedBytes);
      const percentSavings = originalBytes > 0 ? Math.round((byteSavings / originalBytes) * 100) : 0;
      const gzipEstimateBytes = Math.round(optimizedBytes * 0.35);

      return {
        optimizedSvg: svg,
        cssDataUri,
        cssDeclaration,
        base64DataUri,
        imgTag,
        jsxCode,
        originalBytes,
        optimizedBytes,
        byteSavings,
        percentSavings,
        gzipEstimateBytes,
        isValidSvg: true,
        error: null,
      };
    } catch (err: any) {
      return {
        optimizedSvg: "",
        cssDataUri: "",
        cssDeclaration: "",
        base64DataUri: "",
        imgTag: "",
        jsxCode: "",
        originalBytes: new Blob([rawSvg]).size,
        optimizedBytes: 0,
        byteSavings: 0,
        percentSavings: 0,
        gzipEstimateBytes: 0,
        isValidSvg: false,
        error: err.message || "Failed to parse SVG markup.",
      };
    }
  }, [rawSvg, minifyMarkup, fixCssUnsafe, stripDimensions, colorOverrideEnabled, colorOverride]);

  // Copy Snippet to Clipboard
  const handleCopyCode = () => {
    let snippet = "";
    if (activeTab === "css") snippet = optimizedData.cssDeclaration;
    else if (activeTab === "base64") snippet = optimizedData.base64DataUri;
    else if (activeTab === "img") snippet = optimizedData.imgTag;
    else if (activeTab === "jsx") snippet = optimizedData.jsxCode;
    else if (activeTab === "svg") snippet = optimizedData.optimizedSvg;

    if (snippet) {
      navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Download Optimized SVG File
  const handleDownloadSvg = () => {
    if (!optimizedData.optimizedSvg) return;
    const blob = new Blob([optimizedData.optimizedSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized-asset.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Active Snippet for Display
  const currentSnippet = useMemo(() => {
    if (activeTab === "css") return optimizedData.cssDeclaration;
    if (activeTab === "base64") return optimizedData.base64DataUri;
    if (activeTab === "img") return optimizedData.imgTag;
    if (activeTab === "jsx") return optimizedData.jsxCode;
    if (activeTab === "svg") return optimizedData.optimizedSvg;
    return "";
  }, [activeTab, optimizedData]);

  // Background Preview Styles
  const previewBgClass = useMemo(() => {
    switch (previewBg) {
      case "light-grid":
        return "bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50";
      case "dark-grid":
        return "bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px] bg-slate-900";
      case "white":
        return "bg-white";
      case "dark-slate":
        return "bg-slate-950";
      default:
        return "bg-slate-50";
    }
  }, [previewBg]);

  return (
    <div className="space-y-8">
      {/* 1. Header & Presets Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-indigo-500/5 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
              <FileCode className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  SVG to Base64 &amp; CSS Data URI Optimizer
                </h2>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  100% Client-Side
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Minify, sanitize, and convert raw SVG code into URL-encoded CSS background Data URIs, Base64 strings, and JSX.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Sample Presets:
            </span>
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Dual-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input & Optimization Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* File Upload Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
              isDragging
                ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                : "border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-900/50 hover:border-emerald-500/60"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,image/svg+xml"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Drop an SVG file here, or{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 underline">browse</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Supports standard .svg vector graphic files with zero server transmission
                </p>
              </div>
            </div>
          </div>

          {/* Raw SVG Code Editor */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Raw SVG XML Markup
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  {rawSvg.length} chars | {optimizedData.originalBytes} B
                </span>
                <button
                  type="button"
                  onClick={() => setRawSvg("")}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Clear editor"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={rawSvg}
                onChange={(e) => setRawSvg(e.target.value)}
                placeholder="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'> ... </svg>"
                rows={9}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-950 text-slate-100 p-3.5 font-mono text-xs leading-relaxed focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-y"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Optimization Options & Toggles */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Optimization &amp; Sanitization Controls
              </h3>
            </div>

            <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
              {/* Toggle 1: Minify */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    Minify Markup &amp; Strip Metadata
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Removes XML declarations, doctypes, comments, editor namespaces (Inkscape/Illustrator), and whitespace.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={minifyMarkup}
                  onChange={(e) => setMinifyMarkup(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* Toggle 2: CSS Unsafe Character Escaping */}
              <div className="flex items-center justify-between pt-3">
                <div>
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    Fix CSS Unsafe Characters
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Escapes # to %23, handles quote nesting, and percent-encodes &lt;, &gt; for direct CSS background-image compatibility.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={fixCssUnsafe}
                  onChange={(e) => setFixCssUnsafe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* Toggle 3: Strip Dimensions */}
              <div className="flex items-center justify-between pt-3">
                <div>
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                    Strip Fixed Dimensions (viewBox Only)
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Strips hardcoded width/height to make the vector fully scalable and responsive.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={stripDimensions}
                  onChange={(e) => setStripDimensions(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* Toggle 4: Color Override */}
              <div className="pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                      Color Override
                    </label>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Dynamically override fill &amp; stroke colors before encoding.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={colorOverrideEnabled}
                    onChange={(e) => setColorOverrideEnabled(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                {colorOverrideEnabled && (
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="color"
                      value={colorOverride}
                      onChange={(e) => setColorOverride(e.target.value)}
                      className="h-8 w-10 cursor-pointer rounded border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                    <input
                      type="text"
                      value={colorOverride}
                      onChange={(e) => setColorOverride(e.target.value)}
                      placeholder="#6366f1"
                      className="w-32 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-white"
                    />
                    <div className="flex items-center gap-1.5">
                      {["#10b981", "#3b82f6", "#6366f1", "#f59e0b", "#ef4444", "#ffffff", "#000000"].map(
                        (hex) => (
                          <button
                            key={hex}
                            type="button"
                            onClick={() => setColorOverride(hex)}
                            style={{ backgroundColor: hex }}
                            className="h-5 w-5 rounded-full border border-slate-300 dark:border-slate-600 shadow-xs hover:scale-110 transition-transform cursor-pointer"
                            title={hex}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payload Metric Badges Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Payload Compression Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-white dark:bg-slate-800/80 p-3 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                <span className="text-[11px] text-slate-500 block">Original</span>
                <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                  {optimizedData.originalBytes} B
                </span>
              </div>
              <div className="rounded-xl bg-white dark:bg-slate-800/80 p-3 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                <span className="text-[11px] text-slate-500 block">Optimized</span>
                <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {optimizedData.optimizedBytes} B
                </span>
              </div>
              <div className="rounded-xl bg-white dark:bg-slate-800/80 p-3 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                <span className="text-[11px] text-slate-500 block">Savings</span>
                <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {optimizedData.percentSavings}%
                </span>
              </div>
              <div className="rounded-xl bg-white dark:bg-slate-800/80 p-3 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                <span className="text-[11px] text-slate-500 block">Est. Gzip</span>
                <span className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  ~{optimizedData.gzipEstimateBytes} B
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Panel & Real-Time Preview (Sticky) */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-8">
          {/* Live Visual Render Preview Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Render Preview
                </h3>
              </div>

              {/* Background Swatches & Zoom */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewBg("light-grid")}
                    className={`h-5 w-5 rounded text-[10px] font-bold cursor-pointer ${
                      previewBg === "light-grid" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" : "text-slate-400"
                    }`}
                    title="Light Checkered"
                  >
                    LG
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewBg("dark-grid")}
                    className={`h-5 w-5 rounded text-[10px] font-bold cursor-pointer ${
                      previewBg === "dark-grid" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" : "text-slate-400"
                    }`}
                    title="Dark Checkered"
                  >
                    DG
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewBg("white")}
                    className={`h-5 w-5 rounded text-[10px] font-bold cursor-pointer ${
                      previewBg === "white" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" : "text-slate-400"
                    }`}
                    title="Solid White"
                  >
                    W
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewBg("dark-slate")}
                    className={`h-5 w-5 rounded text-[10px] font-bold cursor-pointer ${
                      previewBg === "dark-slate" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" : "text-slate-400"
                    }`}
                    title="Solid Dark"
                  >
                    D
                  </button>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((z) => Math.max(50, z - 25))}
                    className="p-1 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[10px] font-mono w-8 text-center">{previewZoom}%</span>
                  <button
                    type="button"
                    onClick={() => setPreviewZoom((z) => Math.min(250, z + 25))}
                    className="p-1 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Canvas (Responsive pure in-memory SVG container) */}
            <div
              className={`relative flex min-h-[220px] max-h-[300px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/80 transition-all ${previewBgClass}`}
            >
              {optimizedData.isValidSvg && optimizedData.optimizedSvg ? (
                <div
                  style={{
                    transform: `scale(${previewZoom / 100})`,
                    transformOrigin: "center",
                  }}
                  className="flex items-center justify-center w-full h-full min-h-[220px] p-4 overflow-hidden [&_svg]:max-w-full [&_svg]:max-h-[200px] [&_svg]:w-auto [&_svg]:h-auto [&_svg]:block [&_svg]:mx-auto transition-transform duration-150"
                  dangerouslySetInnerHTML={{ __html: optimizedData.optimizedSvg }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-slate-400 text-xs">
                  <FileCode className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-1" />
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    Upload or paste an SVG to preview
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Supports .svg files, SVG Repo XML, and inline markup
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Export Code Tabs */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs space-y-4">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-1 border-b border-slate-200 dark:border-slate-800 pb-3">
              {[
                { id: "css", label: "CSS (background-image)" },
                { id: "base64", label: "Base64 URI" },
                { id: "img", label: "HTML <img>" },
                { id: "jsx", label: "React / JSX" },
                { id: "svg", label: "Minified SVG" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ExportTab)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code Output Box */}
            <div className="relative">
              <pre className="max-h-[220px] overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-950 p-3.5 font-mono text-xs leading-relaxed text-emerald-400 whitespace-pre-wrap break-all">
                {currentSnippet || "// No output available"}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  disabled={!currentSnippet}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "Copied Snippet!" : "Copy Code"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  disabled={!optimizedData.optimizedSvg}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-xs cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .svg</span>
                </button>
              </div>

              <EmbedBadgeModal
                toolSlug={toolSlug}
                label="SVG Data URI"
                status={optimizedData.isValidSvg ? "Optimized" : "Audited"}
                score={optimizedData.percentSavings > 0 ? 100 : 95}
              />
            </div>
          </div>

          {/* Performance & Web Vitals Inlining Audit Box */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Core Web Vitals &amp; Inlining Threshold Audit
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {optimizedData.optimizedBytes <= 2048 ? (
                <div className="flex items-start gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Optimal for CSS &amp; JSX Inlining ({optimizedData.optimizedBytes} bytes):</span>{" "}
                    Asset is under the 2KB threshold. Inlining eliminates an HTTP roundtrip with 0ms network latency and zero layout shift.
                  </div>
                </div>
              ) : optimizedData.optimizedBytes <= 6144 ? (
                <div className="flex items-start gap-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 p-3 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800/40">
                  <Info className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Acceptable for Critical Inlining ({optimizedData.optimizedBytes} bytes):</span>{" "}
                    Suitable for above-the-fold hero background patterns and primary navigation icons.
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 p-3 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Heavy Payload Warning ({(optimizedData.optimizedBytes / 1024).toFixed(1)} KB):</span>{" "}
                    Consider saving this vector as an external <code>.svg</code> file served via CDN with <code>Cache-Control: immutable</code> to avoid CSS bundle bloat.
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] pt-1">
                <Info className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  Tip: URL-encoded SVG Data URIs are ~30% smaller than Base64 strings and compress significantly better over Gzip/Brotli.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
