"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import {
  Link2,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  QrCode,
  Download,
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Tag,
  Share2,
  Info,
  SlidersHorizontal,
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

const CHANNEL_PRESETS: ChannelPreset[] = [
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

export interface UtmBuilderClientProps {
  initialUrl?: string;
  initialSource?: string;
  initialMedium?: string;
  initialCampaign?: string;
  initialTerm?: string;
  initialContent?: string;
  initialId?: string;
  initialSourcePlatform?: string;
  initialPreset?: string;
}

export function UtmBuilderClient({
  initialUrl = "https://omniseotools.com/pricing",
  initialSource = "google",
  initialMedium = "cpc",
  initialCampaign = "summer_growth_2026",
  initialTerm = "",
  initialContent = "",
  initialId = "",
  initialSourcePlatform = "",
  initialPreset = "Google Ads",
}: UtmBuilderClientProps = {}) {
  const [url, setUrl] = useState(initialUrl);
  const [source, setSource] = useState(initialSource);
  const [medium, setMedium] = useState(initialMedium);
  const [campaign, setCampaign] = useState(initialCampaign);
  const [term, setTerm] = useState(initialTerm);
  const [content, setContent] = useState(initialContent);
  const [id, setId] = useState(initialId);
  const [sourcePlatform, setSourcePlatform] = useState(initialSourcePlatform);

  // Sanitization Toggles (checked by default)
  const [autoLowercase, setAutoLowercase] = useState(true);
  const [replaceSpaces, setReplaceSpaces] = useState(true);
  const [cleanSpecialChars, setCleanSpecialChars] = useState(true);

  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedParams, setCopiedParams] = useState(false);
  const [activePreset, setActivePreset] = useState<string>(initialPreset);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [showQrCode, setShowQrCode] = useState(true);

  // Helper sanitizer function based on active toggles
  const sanitize = (val: string) => {
    if (!val) return "";
    let res = val.trim();
    if (autoLowercase) {
      res = res.toLowerCase();
    }
    if (replaceSpaces) {
      res = res.replace(/[\s\t\n]+/g, "-");
    }
    if (cleanSpecialChars) {
      // Remove unsafe characters while allowing standard URL chars
      res = res.replace(/[^a-zA-Z0-9_\-\.\:\/]/g, "");
    }
    return res;
  };

  const cleanUrl = url.trim();
  const cleanSource = sanitize(source);
  const cleanMedium = sanitize(medium);
  const cleanCampaign = sanitize(campaign);
  const cleanTerm = sanitize(term);
  const cleanContent = sanitize(content);
  const cleanId = sanitize(id);
  const cleanPlatform = sanitize(sourcePlatform);

  // Live Validation Warning detection:
  // Detect uppercase or spaces in raw input when respective toggles are disabled
  const rawCombined = `${source} ${medium} ${campaign} ${term} ${content} ${id} ${sourcePlatform}`;
  
  const hasUppercaseWhenOff = useMemo(() => {
    if (autoLowercase) return false;
    return /[A-Z]/.test(rawCombined);
  }, [autoLowercase, rawCombined]);

  const hasSpacesWhenOff = useMemo(() => {
    if (replaceSpaces) return false;
    return /\s/.test(source) || /\s/.test(medium) || /\s/.test(campaign) || /\s/.test(term) || /\s/.test(content) || /\s/.test(id);
  }, [replaceSpaces, source, medium, campaign, term, content, id]);

  // Construct valid URL with query parameters
  const { fullGeneratedUrl, queryString, isValidUrl } = useMemo(() => {
    if (!cleanUrl) return { fullGeneratedUrl: "", queryString: "", isValidUrl: false };

    try {
      const normalizedBase =
        cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")
          ? cleanUrl
          : `https://${cleanUrl}`;

      const parsed = new URL(normalizedBase);
      const params = parsed.searchParams;

      if (cleanSource) params.set("utm_source", cleanSource);
      if (cleanMedium) params.set("utm_medium", cleanMedium);
      if (cleanCampaign) params.set("utm_campaign", cleanCampaign);
      if (cleanTerm) params.set("utm_term", cleanTerm);
      if (cleanContent) params.set("utm_content", cleanContent);
      if (cleanId) params.set("utm_id", cleanId);
      if (cleanPlatform) params.set("utm_source_platform", cleanPlatform);

      parsed.search = params.toString();
      const finalUrl = parsed.toString();
      const qs = params.toString() ? `?${params.toString()}` : "";

      return { fullGeneratedUrl: finalUrl, queryString: qs, isValidUrl: true };
    } catch {
      // Fallback query assembly for non-standard base URLs
      const queryParts: string[] = [];
      if (cleanSource) queryParts.push(`utm_source=${encodeURIComponent(cleanSource)}`);
      if (cleanMedium) queryParts.push(`utm_medium=${encodeURIComponent(cleanMedium)}`);
      if (cleanCampaign) queryParts.push(`utm_campaign=${encodeURIComponent(cleanCampaign)}`);
      if (cleanTerm) queryParts.push(`utm_term=${encodeURIComponent(cleanTerm)}`);
      if (cleanContent) queryParts.push(`utm_content=${encodeURIComponent(cleanContent)}`);
      if (cleanId) queryParts.push(`utm_id=${encodeURIComponent(cleanId)}`);
      if (cleanPlatform) queryParts.push(`utm_source_platform=${encodeURIComponent(cleanPlatform)}`);

      const sep = cleanUrl.includes("?") ? "&" : "?";
      const finalUrl = queryParts.length > 0 ? `${cleanUrl}${sep}${queryParts.join("&")}` : cleanUrl;
      const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

      return { fullGeneratedUrl: finalUrl, queryString: qs, isValidUrl: false };
    }
  }, [
    cleanUrl,
    cleanSource,
    cleanMedium,
    cleanCampaign,
    cleanTerm,
    cleanContent,
    cleanId,
    cleanPlatform,
  ]);

  // Generate QR Code data URL when fullGeneratedUrl changes
  useEffect(() => {
    if (!fullGeneratedUrl) {
      setQrDataUrl("");
      return;
    }

    QRCode.toDataURL(fullGeneratedUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((qrUrl) => {
        setQrDataUrl(qrUrl);
      })
      .catch(() => {
        setQrDataUrl("");
      });
  }, [fullGeneratedUrl]);

  const handleCopyUrl = () => {
    if (!fullGeneratedUrl) return;
    navigator.clipboard.writeText(fullGeneratedUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
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
    if (preset.campaignDefault && (!campaign || campaign === "summer_growth_2026")) {
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
    setId("");
    setSourcePlatform("");
  };

  const handleFullReset = () => {
    setUrl("https://yourdomain.com/landing-page");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
    setId("");
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
    <div className="space-y-8" id="utm-builder-app">
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

        {/* Preset Cards Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {CHANNEL_PRESETS.map((preset) => {
            const isSelected = activePreset === preset.name;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={cn(
                  "flex flex-col items-start gap-1 p-3 rounded-2xl border text-left transition-all cursor-pointer group relative",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate w-full">
                  <span>{preset.source}</span>
                  <span className="mx-1 text-slate-300 dark:text-slate-600">/</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{preset.medium}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* SANITIZATION TOGGLES (Auto-Lowercase, Replace Spaces, Clean Chars)        */}
        {/* ========================================================================= */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Sanitization Controls:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Toggle 1: Auto-Lowercase */}
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

              {/* Toggle 2: Replace Spaces with Hyphens */}
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

              {/* Toggle 3: Clean Special Characters / URI Encode */}
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
      {/* LIVE VALIDATION WARNING (When Toggles Are OFF)                            */}
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

      {/* ========================================================================= */}
      {/* MAIN TWO-COLUMN WORKBENCH                                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Destination URL Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Target Destination URL
                </span>
              </div>
              <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="target-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Landing Page URL
              </label>
              <div className="relative">
                <input
                  id="target-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourdomain.com/landing-page"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                The exact destination landing page where visitors arrive after clicking your campaign link.
              </p>
            </div>
          </div>

          {/* Core GA4 Tracking Parameters (Source, Medium, Campaign) */}
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

            {/* Campaign Source (utm_source) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="utm-source" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Campaign Source</span>
                  <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">utm_source</code>
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <span className="text-[11px] text-slate-400">e.g. google, facebook, newsletter</span>
              </div>
              <input
                id="utm-source"
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="google"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 self-center mr-1">Quick:</span>
                {SOURCE_SUGGESTIONS.slice(0, 8).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSource(s);
                      setActivePreset("Custom");
                    }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-950 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Medium (utm_medium) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="utm-medium" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Campaign Medium</span>
                  <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">utm_medium</code>
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <span className="text-[11px] text-slate-400">e.g. cpc, paid_social, email</span>
              </div>
              <input
                id="utm-medium"
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="cpc"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 self-center mr-1">Quick:</span>
                {MEDIUM_SUGGESTIONS.slice(0, 8).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMedium(m);
                      setActivePreset("Custom");
                    }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-950 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Name (utm_campaign) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="utm-campaign" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Campaign Name</span>
                  <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">utm_campaign</code>
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <span className="text-[11px] text-slate-400">e.g. summer_growth_2026</span>
              </div>
              <input
                id="utm-campaign"
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="summer_growth_2026"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Optional Granular Parameters */}
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
              {/* Campaign Term */}
              <div className="space-y-1.5">
                <label htmlFor="utm-term" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Campaign Term</span>
                  <code className="text-[10px] font-mono text-slate-400">utm_term</code>
                </label>
                <input
                  id="utm-term"
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="e.g. running_shoes"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Campaign Content */}
              <div className="space-y-1.5">
                <label htmlFor="utm-content" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Campaign Content</span>
                  <code className="text-[10px] font-mono text-slate-400">utm_content</code>
                </label>
                <input
                  id="utm-content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="e.g. hero_cta_blue"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Campaign ID */}
              <div className="space-y-1.5">
                <label htmlFor="utm-id" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Campaign ID</span>
                  <code className="text-[10px] font-mono text-slate-400">utm_id</code>
                </label>
                <input
                  id="utm-id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. camp_104"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Source Platform */}
              <div className="space-y-1.5">
                <label htmlFor="utm-platform" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Source Platform</span>
                  <code className="text-[10px] font-mono text-slate-400">utm_source_platform</code>
                </label>
                <input
                  id="utm-platform"
                  type="text"
                  value={sourcePlatform}
                  onChange={(e) => setSourcePlatform(e.target.value)}
                  placeholder="e.g. Google Ads"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Output, QR Code & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Main Output Card */}
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Generated Campaign URL
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

            {/* Rendered URL Box */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-3 shadow-inner">
              <div className="max-h-36 overflow-y-auto break-all font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed select-all">
                {fullGeneratedUrl || "https://yourdomain.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer"}
              </div>

              {/* Parameter Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                {cleanSource && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                    source: {cleanSource}
                  </span>
                )}
                {cleanMedium && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                    medium: {cleanMedium}
                  </span>
                )}
                {cleanCampaign && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                    campaign: {cleanCampaign}
                  </span>
                )}
              </div>
            </div>

            {/* Validation Notice */}
            {!isFormValid && (
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-500/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Please provide Destination URL, Source, Medium, and Campaign name.</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleCopyUrl}
                disabled={!fullGeneratedUrl}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all shadow-sm cursor-pointer",
                  copiedUrl
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                )}
              >
                {copiedUrl ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Full URL to Clipboard!</span>
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

                {fullGeneratedUrl && (
                  <a
                    href={fullGeneratedUrl}
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
                      Scan with any camera app to verify mobile GA4 UTM attribution.
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
