"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Zap,
  Activity,
  Gauge,
  Wifi,
  Smartphone,
  Server,
  Layers,
  FileCode,
  Image as ImageIcon,
  Type,
  Code2,
  Copy,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Info,
  Clock,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Globe,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import {
  NETWORK_PROFILES,
  NetworkProfileId,
  PLATFORM_PRESETS,
  AssetBudgets,
  calculateCwvMetrics,
  generateResourceHintTags,
} from "@/lib/cwv-budget-calculator";

interface CoreWebVitalsBudgetCalculatorProps {
  toolSlug?: string;
  toolName?: string;
  platformName?: string;
  platformTip?: string;
  initialPresetId?: string;
  initialBudgets?: Partial<AssetBudgets>;
  initialCodeTab?: CodeTab;
  initialHeroImage?: string;
  initialFontUrl?: string;
  initialNetwork?: NetworkProfileId;
}

type CodeTab = "html" | "headers" | "nextjs";

export function CoreWebVitalsBudgetCalculator({
  toolSlug = "core-web-vitals-budget-calculator",
  toolName = "Core Web Vitals Budget & Resource Hint Calculator",
  platformName,
  platformTip,
  initialPresetId,
  initialBudgets,
  initialCodeTab = "html",
  initialHeroImage = "/images/hero-lcp.webp",
  initialFontUrl = "/fonts/inter.woff2",
  initialNetwork = "average-4g",
}: CoreWebVitalsBudgetCalculatorProps) {
  // Determine initial budgets from preset or custom initialBudgets
  const resolvedInitialBudgets: AssetBudgets = useMemo(() => {
    if (initialPresetId) {
      const found = PLATFORM_PRESETS.find((p) => p.id === initialPresetId);
      if (found) return found.budgets;
    }
    return {
      htmlKb: initialBudgets?.htmlKb ?? 30,
      cssKb: initialBudgets?.cssKb ?? 45,
      jsKb: initialBudgets?.jsKb ?? 150,
      imageKb: initialBudgets?.imageKb ?? 120,
      fontKb: initialBudgets?.fontKb ?? 60,
    };
  }, [initialPresetId, initialBudgets]);

  // State: Network Profile
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProfileId>(initialNetwork);

  // State: Asset Budgets (in KB, compressed)
  const [budgets, setBudgets] = useState<AssetBudgets>(resolvedInitialBudgets);

  // State: Resource URLs for code exporter
  const [heroImageUrl, setHeroImageUrl] = useState<string>(initialHeroImage);
  const [fontUrl, setFontUrl] = useState<string>(initialFontUrl);

  // State: Code Export Tab
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>(initialCodeTab);
  const [copied, setCopied] = useState<boolean>(false);

  // Active Network Profile
  const network = NETWORK_PROFILES[selectedNetwork];

  // Calculated Metrics
  const metrics = useMemo(() => {
    return calculateCwvMetrics(budgets, network);
  }, [budgets, network]);

  // Resource Hint Snippets
  const snippets = useMemo(() => {
    return generateResourceHintTags(budgets, heroImageUrl, fontUrl);
  }, [budgets, heroImageUrl, fontUrl]);

  // Overall Health Score (0 - 100)
  const healthScore = useMemo(() => {
    let score = 100;
    if (metrics.estimatedLcpMs > 2500) score -= 35;
    else if (metrics.estimatedLcpMs > 2000) score -= 15;

    if (metrics.estimatedInpMs > 200) score -= 35;
    else if (metrics.estimatedInpMs > 150) score -= 15;

    if (budgets.jsKb > 250) score -= 15;
    else if (budgets.jsKb > 150) score -= 5;

    if (budgets.imageKb > 150) score -= 10;
    if (budgets.cssKb > 75) score -= 5;

    return Math.max(10, Math.min(100, score));
  }, [metrics, budgets]);

  // Handlers
  const handleBudgetChange = useCallback((key: keyof AssetBudgets, val: number) => {
    const sanitized = Math.max(0, isNaN(val) ? 0 : val);
    setBudgets((prev) => ({
      ...prev,
      [key]: sanitized,
    }));
  }, []);

  const handleApplyPreset = useCallback((presetId: string) => {
    const preset = PLATFORM_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setBudgets(preset.budgets);
      setHeroImageUrl(preset.heroImageName);
      setFontUrl(preset.fontName);
    }
  }, []);

  const handleResetDefaults = useCallback(() => {
    setBudgets({
      htmlKb: 30,
      cssKb: 45,
      jsKb: 150,
      imageKb: 120,
      fontKb: 60,
    });
    setHeroImageUrl("/images/hero-lcp.webp");
    setFontUrl("/fonts/inter.woff2");
    setSelectedNetwork("average-4g");
  }, []);

  const handleCopyCode = useCallback(() => {
    let codeToCopy = snippets.htmlSnippet;
    if (activeCodeTab === "headers") codeToCopy = snippets.httpHeadersSnippet;
    if (activeCodeTab === "nextjs") codeToCopy = snippets.nextjsSnippet;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [activeCodeTab, snippets]);

  const handleDownloadCode = useCallback(() => {
    let codeToDownload = snippets.htmlSnippet;
    let filename = "resource-hints.html";
    let mime = "text/html;charset=utf-8";

    if (activeCodeTab === "headers") {
      codeToDownload = snippets.httpHeadersSnippet;
      filename = "http-link-headers.txt";
      mime = "text/plain;charset=utf-8";
    } else if (activeCodeTab === "nextjs") {
      codeToDownload = snippets.nextjsSnippet;
      filename = "layout.tsx";
      mime = "application/typescript;charset=utf-8";
    }

    const blob = new Blob([codeToDownload], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeCodeTab, snippets]);

  return (
    <div className="w-full space-y-6">
      
      {/* Top Banner Control Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-5 text-white shadow-xl shadow-indigo-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  Core Web Vitals Budget Engine
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[11px] font-bold font-mono border",
                    healthScore >= 90
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : healthScore >= 70
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  )}
                >
                  Score: {healthScore} / 100
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Simulate TCP round trips, download latency, and main-thread JavaScript execution on 4G/3G mobile devices.
              </p>
            </div>
          </div>

          {/* Quick Strategy Presets */}
          <div className="flex flex-wrap items-center gap-1.5 self-start lg:self-auto">
            {PLATFORM_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
              >
                {preset.name}
              </button>
            ))}
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/30 text-xs font-medium text-slate-300 hover:text-rose-200 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>

            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="CWV Budget"
              status={healthScore >= 90 ? "Pass" : healthScore >= 70 ? "Warning" : "Poor"}
              score={healthScore}
            />
          </div>

        </div>
      </div>

      {/* Optional Platform Optimization Highlight */}
      {platformTip && (
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-950/30 p-4 sm:p-5 flex items-start gap-3 shadow-xs">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs shrink-0 mt-0.5">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-slate-900 dark:text-white">
              {platformName ? `${platformName} Optimization Strategy` : "Platform Performance Tip"}
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {platformTip}
            </p>
          </div>
        </div>
      )}

      {/* Target Network Profile Selector */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Target Mobile Network &amp; Device Constraint:
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            RTT: {network.rttMs}ms | Bandwidth: {network.bandwidthKbps / 1000} Mbps
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(NETWORK_PROFILES) as NetworkProfileId[]).map((key) => {
            const prof = NETWORK_PROFILES[key];
            const isSelected = selectedNetwork === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedNetwork(key)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all space-y-1",
                  isSelected
                    ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs"
                    : "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {prof.name}
                  </span>
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />}
                </div>
                <div className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                  {prof.badge}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {prof.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual-Column Calculation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Asset Budget Sliders & Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Compressed Asset Payloads (Gzip / Brotli KB)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Total: {metrics.totalPayloadKb} KB
              </span>
            </div>

            {/* Sliders Grid */}
            <div className="space-y-4">
              
              {/* 1. HTML Payload */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <FileCode className="h-3.5 w-3.5 text-blue-500" />
                    <span>HTML Document Payload</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Target &le; 30 KB</span>
                    <input
                      type="number"
                      min={5}
                      max={300}
                      value={budgets.htmlKb}
                      onChange={(e) => handleBudgetChange("htmlKb", parseInt(e.target.value) || 0)}
                      className="w-16 text-right font-mono text-xs p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold"
                    />
                    <span className="font-mono text-xs text-slate-500">KB</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  value={budgets.htmlKb}
                  onChange={(e) => handleBudgetChange("htmlKb", parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* 2. Critical CSS */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <Layers className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Critical Render-Blocking CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Target &le; 45 KB</span>
                    <input
                      type="number"
                      min={0}
                      max={300}
                      value={budgets.cssKb}
                      onChange={(e) => handleBudgetChange("cssKb", parseInt(e.target.value) || 0)}
                      className="w-16 text-right font-mono text-xs p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold"
                    />
                    <span className="font-mono text-xs text-slate-500">KB</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={budgets.cssKb}
                  onChange={(e) => handleBudgetChange("cssKb", parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* 3. JavaScript Execution Weight */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <Cpu className="h-3.5 w-3.5 text-amber-500" />
                    <span>JavaScript Bundle Weight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Target &le; 150 KB</span>
                    <input
                      type="number"
                      min={10}
                      max={1200}
                      value={budgets.jsKb}
                      onChange={(e) => handleBudgetChange("jsKb", parseInt(e.target.value) || 0)}
                      className="w-16 text-right font-mono text-xs p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold"
                    />
                    <span className="font-mono text-xs text-slate-500">KB</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={10}
                  max={600}
                  value={budgets.jsKb}
                  onChange={(e) => handleBudgetChange("jsKb", parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 font-mono">
                  <span>Uncompressed: ~{metrics.totalUncompressedJsKb} KB</span>
                  <span>Main-Thread Parse/Compile: ~{metrics.jsParseEvalMs}ms</span>
                </div>
              </div>

              {/* 4. Hero / LCP Image */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <ImageIcon className="h-3.5 w-3.5 text-rose-500" />
                    <span>Hero / LCP Image Size</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Target &le; 120 KB</span>
                    <input
                      type="number"
                      min={0}
                      max={1500}
                      value={budgets.imageKb}
                      onChange={(e) => handleBudgetChange("imageKb", parseInt(e.target.value) || 0)}
                      className="w-16 text-right font-mono text-xs p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold"
                    />
                    <span className="font-mono text-xs text-slate-500">KB</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={500}
                  value={budgets.imageKb}
                  onChange={(e) => handleBudgetChange("imageKb", parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* 5. WebFonts (WOFF2) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <Type className="h-3.5 w-3.5 text-emerald-500" />
                    <span>WebFonts Payload (WOFF2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Target &le; 60 KB</span>
                    <input
                      type="number"
                      min={0}
                      max={400}
                      value={budgets.fontKb}
                      onChange={(e) => handleBudgetChange("fontKb", parseInt(e.target.value) || 0)}
                      className="w-16 text-right font-mono text-xs p-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold"
                    />
                    <span className="font-mono text-xs text-slate-500">KB</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={250}
                  value={budgets.fontKb}
                  onChange={(e) => handleBudgetChange("fontKb", parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

            </div>

            {/* Custom URLs configuration for resource hint generation */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Resource URLs (Used to compile exact code snippets below):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500">Hero / LCP Image Path</label>
                  <input
                    type="text"
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    className="w-full font-mono text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500">Primary Font File Path (.woff2)</label>
                  <input
                    type="text"
                    value={fontUrl}
                    onChange={(e) => setFontUrl(e.target.value)}
                    className="w-full font-mono text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Actionable Engineering Recommendations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Diagnostic Recommendations ({metrics.recommendations.length}):</span>
            </h4>
            <div className="space-y-2.5">
              {metrics.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3.5 rounded-xl border text-xs space-y-1 shadow-xs transition-all",
                    rec.type === "critical"
                      ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/60 text-rose-900 dark:text-rose-200"
                      : rec.type === "warning"
                      ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-900/60 text-amber-900 dark:text-amber-200"
                      : "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200"
                  )}
                >
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                    {rec.type === "critical" ? (
                      <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    ) : rec.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{rec.title}</span>
                  </div>
                  <p className="text-[11px] opacity-90 pl-6 leading-relaxed">
                    {rec.description}
                  </p>
                  <div className="pl-6 pt-1 font-semibold text-[11px] text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                    <span>Action:</span>
                    <span>{rec.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Live Computed Gauges & Code Generator */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Core Metrics Scorecards */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* LCP Gauge */}
            <div
              className={cn(
                "p-4 rounded-2xl border flex flex-col justify-between shadow-xs transition-all",
                metrics.lcpStatus === "good"
                  ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60"
                  : metrics.lcpStatus === "needs-improvement"
                  ? "bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/60"
                  : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Est. LCP Time
                </span>
                <Gauge className="h-4 w-4 text-slate-400" />
              </div>
              <div className="my-2">
                <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                  {(metrics.estimatedLcpMs / 1000).toFixed(2)}s
                </div>
                <span
                  className={cn(
                    "inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase",
                    metrics.lcpStatus === "good"
                      ? "bg-emerald-600 text-white"
                      : metrics.lcpStatus === "needs-improvement"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-rose-600 text-white"
                  )}
                >
                  {metrics.lcpStatus === "good" ? "PASS (<2.0s)" : metrics.lcpStatus === "needs-improvement" ? "NEEDS WORK" : "POOR (>2.5s)"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                CrUX Target: &le; 2.50s (Good)
              </p>
            </div>

            {/* INP Risk Gauge */}
            <div
              className={cn(
                "p-4 rounded-2xl border flex flex-col justify-between shadow-xs transition-all",
                metrics.inpStatus === "good"
                  ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60"
                  : metrics.inpStatus === "needs-improvement"
                  ? "bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/60"
                  : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Est. INP Risk
                </span>
                <Cpu className="h-4 w-4 text-slate-400" />
              </div>
              <div className="my-2">
                <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                  ~{metrics.estimatedInpMs}ms
                </div>
                <span
                  className={cn(
                    "inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase",
                    metrics.inpStatus === "good"
                      ? "bg-emerald-600 text-white"
                      : metrics.inpStatus === "needs-improvement"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-rose-600 text-white"
                  )}
                >
                  {metrics.inpStatus === "good" ? "LOW RISK (<150ms)" : metrics.inpStatus === "needs-improvement" ? "ELEVATED" : "HIGH RISK (>200ms)"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                CrUX Target: &le; 200ms (Good)
              </p>
            </div>

          </div>

          {/* LCP 4-Phase Waterfall Breakdown Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                LCP Phase Timeline Breakdown
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Total: {metrics.estimatedLcpMs}ms
              </span>
            </div>

            {/* Segmented Color Bar */}
            <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 flex overflow-hidden">
              <div
                style={{ width: `${(metrics.lcpBreakdown.ttfb / metrics.estimatedLcpMs) * 100}%` }}
                className="bg-blue-500 h-full"
                title={`TTFB: ${metrics.lcpBreakdown.ttfb}ms`}
              />
              <div
                style={{ width: `${(metrics.lcpBreakdown.resourceLoadDelay / metrics.estimatedLcpMs) * 100}%` }}
                className="bg-purple-500 h-full"
                title={`Load Delay: ${metrics.lcpBreakdown.resourceLoadDelay}ms`}
              />
              <div
                style={{ width: `${(metrics.lcpBreakdown.resourceLoadDuration / metrics.estimatedLcpMs) * 100}%` }}
                className="bg-rose-500 h-full"
                title={`Load Duration: ${metrics.lcpBreakdown.resourceLoadDuration}ms`}
              />
              <div
                style={{ width: `${(metrics.lcpBreakdown.elementRenderDelay / metrics.estimatedLcpMs) * 100}%` }}
                className="bg-amber-500 h-full"
                title={`Render Delay: ${metrics.lcpBreakdown.elementRenderDelay}ms`}
              />
            </div>

            {/* Phase Breakdown List */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <span className="text-slate-500">1. TTFB:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{metrics.lcpBreakdown.ttfb}ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                <span className="text-slate-500">2. Load Delay:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{metrics.lcpBreakdown.resourceLoadDelay}ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-500">3. Load Duration:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{metrics.lcpBreakdown.resourceLoadDuration}ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-500">4. Render Delay:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{metrics.lcpBreakdown.elementRenderDelay}ms</span>
              </div>
            </div>
          </div>

          {/* Code Generator Snippet Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md overflow-hidden">
            
            {/* Header & Controls */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Resource Hint Exporter:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadCode}
                    title="Download configuration file"
                    className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Tabs Switcher */}
              <div className="flex gap-1 p-0.5 bg-slate-200 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveCodeTab("html")}
                  className={cn(
                    "flex-1 py-1 rounded-lg text-xs font-bold transition-colors text-center",
                    activeCodeTab === "html"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  HTML &lt;head&gt;
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCodeTab("headers")}
                  className={cn(
                    "flex-1 py-1 rounded-lg text-xs font-bold transition-colors text-center",
                    activeCodeTab === "headers"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  HTTP Link Headers
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCodeTab("nextjs")}
                  className={cn(
                    "flex-1 py-1 rounded-lg text-xs font-bold transition-colors text-center",
                    activeCodeTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js Layout
                </button>
              </div>
            </div>

            {/* Code Output Area */}
            <div className="relative">
              <pre className="font-mono text-xs p-4 bg-slate-950 text-slate-100 max-h-[320px] overflow-auto leading-relaxed selection:bg-indigo-900 selection:text-white whitespace-pre">
                <code>
                  {activeCodeTab === "html" && snippets.htmlSnippet}
                  {activeCodeTab === "headers" && snippets.httpHeadersSnippet}
                  {activeCodeTab === "nextjs" && snippets.nextjsSnippet}
                </code>
              </pre>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CoreWebVitalsBudgetCalculator;
