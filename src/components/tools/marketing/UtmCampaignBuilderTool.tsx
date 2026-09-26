"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  ExternalLink, 
  Link2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Share2,
  Terminal,
  Zap,
  ArrowRight,
  SlidersHorizontal,
  QrCode,
  Download,
  Globe,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChannelPreset {
  id: string;
  name: string;
  badge: string;
  source: string;
  medium: string;
  campaignDefault?: string;
  platform?: string;
}

const PRESETS: ChannelPreset[] = [
  {
    id: "google-ads",
    name: "Google Ads",
    badge: "Paid Search",
    source: "google",
    medium: "cpc",
    campaignDefault: "search_brand_2026",
    platform: "Google Ads",
  },
  {
    id: "meta-ads",
    name: "Meta / Facebook Ads",
    badge: "Paid Social",
    source: "facebook",
    medium: "paid_social",
    campaignDefault: "prospecting_feed_2026",
    platform: "Meta Ads",
  },
  {
    id: "tiktok-ads",
    name: "TikTok Ads",
    badge: "Paid Social",
    source: "tiktok",
    medium: "paid_social",
    campaignDefault: "viral_video_promo",
    platform: "TikTok Ads",
  },
  {
    id: "linkedin-ads",
    name: "LinkedIn Ads",
    badge: "Paid Social",
    source: "linkedin",
    medium: "paid_social",
    campaignDefault: "b2b_leadgen_2026",
    platform: "LinkedIn Ads",
  },
  {
    id: "email-newsletter",
    name: "Email Newsletter",
    badge: "Email",
    source: "newsletter",
    medium: "email",
    campaignDefault: "weekly_digest_2026",
    platform: "Newsletter",
  },
];

const SOURCE_SUGGESTIONS = [
  "google",
  "facebook",
  "instagram",
  "tiktok",
  "linkedin",
  "newsletter",
  "twitter",
  "youtube",
  "reddit",
  "affiliate",
  "bing",
  "pinterest",
];

const MEDIUM_SUGGESTIONS = [
  "cpc",
  "paid_social",
  "email",
  "social",
  "affiliate",
  "referral",
  "banner",
  "display",
  "video",
  "organic",
];

export function UtmCampaignBuilderTool() {
  const [url, setUrl] = useState("https://omniseotools.com/pricing");
  const [source, setSource] = useState("google");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("summer_launch_2026");
  const [term, setTerm] = useState("seo_utility_tools");
  const [content, setContent] = useState("cta_green_button");
  const [campaignId, setCampaignId] = useState("");
  const [sourcePlatform, setSourcePlatform] = useState("");
  const [activePreset, setActivePreset] = useState<string>("Google Ads");

  // Sanitization Toggles (checked by default)
  const [autoLowercase, setAutoLowercase] = useState(true);
  const [replaceSpaces, setReplaceSpaces] = useState(true);
  const [cleanSpecialChars, setCleanSpecialChars] = useState(true);

  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedParams, setCopiedParams] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showQrCode, setShowQrCode] = useState(true);

  // Helper sanitizer
  const sanitize = (text: string) => {
    if (!text) return "";
    let formatted = text.trim();
    if (autoLowercase) formatted = formatted.toLowerCase();
    if (replaceSpaces) formatted = formatted.replace(/[\s\t\n]+/g, "-");
    if (cleanSpecialChars) formatted = formatted.replace(/[^a-zA-Z0-9_\-\.\:\/]/g, "");
    return formatted;
  };

  const cleanUrl = url.trim();
  const cleanSource = sanitize(source);
  const cleanMedium = sanitize(medium);
  const cleanCampaign = sanitize(campaign);
  const cleanTerm = sanitize(term);
  const cleanContent = sanitize(content);
  const cleanId = sanitize(campaignId);
  const cleanPlatform = sanitize(sourcePlatform);

  // Live Validation Warning detection:
  const rawCombined = `${source} ${medium} ${campaign} ${term} ${content} ${campaignId} ${sourcePlatform}`;
  
  const hasUppercaseWhenOff = useMemo(() => {
    if (autoLowercase) return false;
    return /[A-Z]/.test(rawCombined);
  }, [autoLowercase, rawCombined]);

  const hasSpacesWhenOff = useMemo(() => {
    if (replaceSpaces) return false;
    return /\s/.test(source) || /\s/.test(medium) || /\s/.test(campaign) || /\s/.test(term) || /\s/.test(content) || /\s/.test(campaignId);
  }, [replaceSpaces, source, medium, campaign, term, content, campaignId]);

  // Compute final URL & Query String
  const { fullUrl, queryString, isValidUrl } = useMemo(() => {
    if (!cleanUrl) return { fullUrl: "", queryString: "", isValidUrl: false };

    try {
      const rawUrl = cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://") ? cleanUrl : "https://" + cleanUrl;
      const parsed = new URL(rawUrl);
      const params = parsed.searchParams;

      if (cleanSource) params.set("utm_source", cleanSource);
      if (cleanMedium) params.set("utm_medium", cleanMedium);
      if (cleanCampaign) params.set("utm_campaign", cleanCampaign);
      if (cleanTerm) params.set("utm_term", cleanTerm);
      if (cleanContent) params.set("utm_content", cleanContent);
      if (cleanId) params.set("utm_id", cleanId);
      if (cleanPlatform) params.set("utm_source_platform", cleanPlatform);

      parsed.search = params.toString();

      return {
        fullUrl: parsed.toString(),
        queryString: params.toString() ? "?" + params.toString() : "",
        isValidUrl: true,
      };
    } catch {
      const queryParts: string[] = [];
      if (cleanSource) queryParts.push(`utm_source=${encodeURIComponent(cleanSource)}`);
      if (cleanMedium) queryParts.push(`utm_medium=${encodeURIComponent(cleanMedium)}`);
      if (cleanCampaign) queryParts.push(`utm_campaign=${encodeURIComponent(cleanCampaign)}`);
      if (cleanTerm) queryParts.push(`utm_term=${encodeURIComponent(cleanTerm)}`);
      if (cleanContent) queryParts.push(`utm_content=${encodeURIComponent(cleanContent)}`);
      if (cleanId) queryParts.push(`utm_id=${encodeURIComponent(cleanId)}`);
      if (cleanPlatform) queryParts.push(`utm_source_platform=${encodeURIComponent(cleanPlatform)}`);

      const sep = cleanUrl.includes("?") ? "&" : "?";
      return {
        fullUrl: queryParts.length > 0 ? `${cleanUrl}${sep}${queryParts.join("&")}` : cleanUrl,
        queryString: queryParts.length > 0 ? `?${queryParts.join("&")}` : "",
        isValidUrl: false,
      };
    }
  }, [cleanUrl, cleanSource, cleanMedium, cleanCampaign, cleanTerm, cleanContent, cleanId, cleanPlatform]);

  // Generate QR Code
  useEffect(() => {
    if (!fullUrl) {
      setQrDataUrl("");
      return;
    }
    QRCode.toDataURL(fullUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#0f172a", light: "#ffffff" },
      errorCorrectionLevel: "M",
    })
      .then((qr) => setQrDataUrl(qr))
      .catch(() => setQrDataUrl(""));
  }, [fullUrl]);

  const handleCopyFull = () => {
    if (!fullUrl) return;
    navigator.clipboard.writeText(fullUrl);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleCopyParams = () => {
    if (!queryString) return;
    navigator.clipboard.writeText(queryString);
    setCopiedParams(true);
    setTimeout(() => setCopiedParams(false), 2000);
  };

  const handleApplyPreset = (preset: ChannelPreset) => {
    setActivePreset(preset.name);
    setSource(preset.source);
    setMedium(preset.medium);
    if (preset.campaignDefault && (!campaign || campaign === "summer_launch_2026")) {
      setCampaign(preset.campaignDefault);
    }
    if (preset.platform) {
      setSourcePlatform(preset.platform);
    }
  };

  const handleResetCustom = () => {
    setActivePreset("Custom");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
    setCampaignId("");
    setSourcePlatform("");
  };

  const handleFullReset = () => {
    setUrl("https://yourdomain.com/landing-page");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
    setCampaignId("");
    setSourcePlatform("");
    setActivePreset("");
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const downloadLink = document.createElement("a");
    downloadLink.href = qrDataUrl;
    downloadLink.download = `utm-qr-${cleanCampaign || "campaign"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const isFormValid = !!cleanUrl && !!cleanSource && !!cleanMedium && !!cleanCampaign;

  return (
    <div className="space-y-8" id="utm-campaign-builder-widget">
      {/* ========================================================================= */}
      {/* 1-CLICK PLATFORM PRESETS BAR (Top of Tool)                               */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                1-Click Platform Presets
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] text-slate-500 dark:text-slate-400">
                (GA4 Standardized Naming Conventions)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetCustom}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset / Custom</span>
          </button>
        </div>

        {/* Preset Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {PRESETS.map((p) => {
            const isSelected = activePreset === p.name;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className={cn(
                  "flex flex-col items-start gap-1 p-3 rounded-2xl border text-left transition-all cursor-pointer group relative",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {p.name}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate w-full">
                  <span>{p.source}</span>
                  <span className="mx-1 text-slate-300 dark:text-slate-600">/</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{p.medium}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SANITIZATION TOGGLES                                                     */}
        {/* ========================================================================= */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Sanitization Controls:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Auto-Lowercase */}
              <label className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer select-none transition-all",
                autoLowercase
                  ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
              )}>
                <input
                  type="checkbox"
                  checked={autoLowercase}
                  onChange={(e) => setAutoLowercase(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                />
                <span>Auto-Lowercase</span>
              </label>

              {/* Replace Spaces with Hyphens */}
              <label className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer select-none transition-all",
                replaceSpaces
                  ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
              )}>
                <input
                  type="checkbox"
                  checked={replaceSpaces}
                  onChange={(e) => setReplaceSpaces(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                />
                <span>Replace Spaces with Hyphens (-)</span>
              </label>

              {/* Clean Special Characters */}
              <label className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer select-none transition-all",
                cleanSpecialChars
                  ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
              )}>
                <input
                  type="checkbox"
                  checked={cleanSpecialChars}
                  onChange={(e) => setCleanSpecialChars(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                />
                <span>Clean Special Chars &amp; URI</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LIVE VALIDATION WARNING                                                   */}
      {/* ========================================================================= */}
      {(hasUppercaseWhenOff || hasSpacesWhenOff) && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-50 dark:bg-amber-950/30 p-4 space-y-1.5 shadow-sm text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Live GA4 Attribution Notice</span>
          </div>
          {hasUppercaseWhenOff && (
            <p className="leading-relaxed">
              Warning: GA4 treats uppercase and lowercase as separate sources (e.g., &apos;Facebook&apos; vs &apos;facebook&apos;). Enabling <strong>Auto-Lowercase</strong> prevents reporting fragmentation.
            </p>
          )}
          {hasSpacesWhenOff && (
            <p className="leading-relaxed">
              Warning: Spaces in UTM parameters create <code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded">%20</code> escape characters that can disrupt analytics reporting.
            </p>
          )}
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Parameter Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Destination URL */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Destination URL
                </span>
              </div>
              <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="widget-target-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Landing Page Website Address
              </label>
              <input
                id="widget-target-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourdomain.com/landing-page"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* 2. Core GA4 Parameters */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Primary GA4 Parameters
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Standard Attribution Trio
              </span>
            </div>

            {/* Campaign Source */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="widget-utm-source" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Campaign Source</span>
                  <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">utm_source</code>
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <span className="text-[11px] text-slate-400">e.g. google, newsletter</span>
              </div>
              <input
                id="widget-utm-source"
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="google"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <div className="flex flex-wrap gap-1">
                {SOURCE_SUGGESTIONS.slice(0, 8).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSource(s);
                      setActivePreset("Custom");
                    }}
                    className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Medium */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="widget-utm-medium" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Campaign Medium</span>
                  <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">utm_medium</code>
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <span className="text-[11px] text-slate-400">e.g. cpc, paid_social, email</span>
              </div>
              <input
                id="widget-utm-medium"
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="cpc"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <div className="flex flex-wrap gap-1">
                {MEDIUM_SUGGESTIONS.slice(0, 8).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMedium(m);
                      setActivePreset("Custom");
                    }}
                    className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Name */}
            <div className="space-y-1.5">
              <label htmlFor="widget-utm-campaign" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Campaign Name (<code>utm_campaign</code>) <strong className="text-rose-500">*</strong></span>
                <span className="text-[10px] text-slate-400">e.g. summer_launch_2026</span>
              </label>
              <input
                id="widget-utm-campaign"
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="summer_launch_2026"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* 3. Optional Parameters */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Optional Granular Tracking
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">
                Keywords, A/B Testing &amp; IDs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="widget-utm-term" className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Campaign Term (<code>utm_term</code>)
                </label>
                <input
                  id="widget-utm-term"
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="e.g. running_shoes"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="widget-utm-content" className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Campaign Content (<code>utm_content</code>)
                </label>
                <input
                  id="widget-utm-content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="e.g. cta_top_button"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="widget-utm-id" className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Campaign ID (<code>utm_id</code>)
              </label>
              <input
                id="widget-utm-id"
                type="text"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                placeholder="e.g. camp_9941"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Link Output & Inspection (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Generated URL Card */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Generated Tracking URL
                </span>
              </div>
              <button
                type="button"
                onClick={handleFullReset}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Display Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 break-all leading-relaxed shadow-inner min-h-[90px] flex items-center select-all">
              {fullUrl || "https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer"}
            </div>

            {/* Validation warning */}
            {!isFormValid && (
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-500/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Specify Destination URL, Source, Medium, and Campaign.</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleCopyFull}
                disabled={!fullUrl}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all shadow-sm cursor-pointer",
                  copiedFull
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                )}
              >
                {copiedFull ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Full URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Full Campaign URL</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyParams}
                  disabled={!queryString}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copiedParams ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedParams ? "Copied Query!" : "Copy Params Only"}</span>
                </button>

                {isValidUrl && (
                  <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Direct Interlinking Callout Banner */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Bulk Campaign Tagging</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Need to tag multiple landing pages at once? Try the{" "}
                <Link
                  href="/tools/bulk-utm-matrix-generator"
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Bulk UTM Matrix Generator</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Instant QR Code Generator Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Campaign QR Code
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowQrCode(!showQrCode)}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                {showQrCode ? "Hide" : "Show"}
              </button>
            </div>

            {showQrCode && (
              <div className="space-y-4 text-center">
                {qrDataUrl ? (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-white rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 inline-block">
                      <img
                        src={qrDataUrl}
                        alt="Campaign QR Code"
                        className="w-44 h-44 object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Scan with any smartphone camera to test mobile UTM attribution.
                    </p>

                    <button
                      type="button"
                      onClick={handleDownloadQr}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download QR Code (.png)</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-8 text-xs text-slate-400">
                    Enter destination URL to generate a live QR Code.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
