"use client";

import React, { useState, useMemo } from "react";
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
  HelpCircle,
  Share2,
  Terminal,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRESETS = [
  {
    name: "Google Search Ads (CPC)",
    url: "https://yourdomain.com/landing-page",
    source: "google",
    medium: "cpc",
    campaign: "summer_sale_2026",
    term: "seo_tools_free",
    content: "headline_variant_a",
    id: "camp_101",
  },
  {
    name: "Facebook / Meta Ads",
    url: "https://yourdomain.com/signup",
    source: "facebook",
    medium: "paid_social",
    campaign: "retargeting_q3",
    term: "",
    content: "carousel_ad_blue",
    id: "meta_fb_202",
  },
  {
    name: "Email Newsletter",
    url: "https://yourdomain.com/blog/growth-guide",
    source: "newsletter",
    medium: "email",
    campaign: "weekly_digest_august",
    term: "",
    content: "main_cta_button",
    id: "",
  },
  {
    name: "LinkedIn B2B Campaign",
    url: "https://yourdomain.com/enterprise",
    source: "linkedin",
    medium: "sponsored",
    campaign: "saas_leadgen_2026",
    term: "marketing_directors",
    content: "whitepaper_download",
    id: "li_lead_303",
  },
  {
    name: "Affiliate / Partner Link",
    url: "https://yourdomain.com/pricing",
    source: "partner_hub",
    medium: "affiliate",
    campaign: "creator_network",
    term: "",
    content: "affiliate_123",
    id: "",
  },
];

const SOURCE_SUGGESTIONS = [
  "google",
  "facebook",
  "instagram",
  "newsletter",
  "twitter",
  "linkedin",
  "tiktok",
  "youtube",
  "affiliate",
  "reddit",
];

const MEDIUM_SUGGESTIONS = [
  "cpc",
  "email",
  "paid_social",
  "social",
  "affiliate",
  "banner",
  "referral",
  "video",
];

export function UtmCampaignBuilderTool() {
  const [url, setUrl] = useState("https://omniseotools.com/pricing");
  const [source, setSource] = useState("google");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("summer_launch_2026");
  const [term, setTerm] = useState("seo_utility_tools");
  const [content, setContent] = useState("cta_green_button");
  const [campaignId, setCampaignId] = useState("");

  // Normalization options
  const [autoLowercase, setAutoLowercase] = useState(true);
  const [spaceDelimiter, setSpaceDelimiter] = useState<"underscore" | "hyphen" | "none">("underscore");

  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedParams, setCopiedParams] = useState(false);

  // Helper sanitizer
  const sanitize = (text: string) => {
    if (!text) return "";
    let formatted = text.trim();
    if (autoLowercase) formatted = formatted.toLowerCase();
    if (spaceDelimiter === "underscore") formatted = formatted.replace(/\s+/g, "_");
    else if (spaceDelimiter === "hyphen") formatted = formatted.replace(/\s+/g, "-");
    return formatted;
  };

  // Compute final URL & Query String
  const { fullUrl, queryString, isValidUrl } = useMemo(() => {
    if (!url.trim()) return { fullUrl: "", queryString: "", isValidUrl: false };

    try {
      const rawUrl = url.startsWith("http") ? url : "https://" + url;
      const parsed = new URL(rawUrl);

      const params = new URLSearchParams(parsed.search);

      const cleanSource = sanitize(source);
      const cleanMedium = sanitize(medium);
      const cleanCampaign = sanitize(campaign);
      const cleanTerm = sanitize(term);
      const cleanContent = sanitize(content);
      const cleanId = sanitize(campaignId);

      if (cleanSource) params.set("utm_source", cleanSource);
      if (cleanMedium) params.set("utm_medium", cleanMedium);
      if (cleanCampaign) params.set("utm_campaign", cleanCampaign);
      if (cleanTerm) params.set("utm_term", cleanTerm);
      if (cleanContent) params.set("utm_content", cleanContent);
      if (cleanId) params.set("utm_id", cleanId);

      parsed.search = params.toString();

      return {
        fullUrl: parsed.toString(),
        queryString: params.toString() ? "?" + params.toString() : "",
        isValidUrl: true,
      };
    } catch {
      return { fullUrl: url, queryString: "", isValidUrl: false };
    }
  }, [url, source, medium, campaign, term, content, campaignId, autoLowercase, spaceDelimiter]);

  const handleCopyFull = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleCopyParams = () => {
    navigator.clipboard.writeText(queryString);
    setCopiedParams(true);
    setTimeout(() => setCopiedParams(false), 2000);
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setUrl(preset.url);
    setSource(preset.source);
    setMedium(preset.medium);
    setCampaign(preset.campaign);
    setTerm(preset.term);
    setContent(preset.content);
    setCampaignId(preset.id);
  };

  const handleReset = () => {
    setUrl("https://example.com");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
    setCampaignId("");
  };

  return (
    <div className="space-y-8">
      
      {/* Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleApplyPreset(p)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors whitespace-nowrap"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1 rounded-md"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Parameter Form (6 cols) */}
        <div className="lg:col-span-6 space-y-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
          
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Campaign Parameters
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoLowercase}
                  onChange={(e) => setAutoLowercase(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Auto Lowercase</span>
              </label>
            </div>
          </div>

          {/* 1. Destination URL */}
          <div className="space-y-1.5">
            <label htmlFor="target-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Website URL <strong className="text-rose-500">*</strong></span>
              <span className="text-[10px] text-slate-400 font-normal">Destination landing page</span>
            </label>
            <input
              id="target-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/landing-page"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* 2. Campaign Source */}
          <div className="space-y-2">
            <label htmlFor="utm-source" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Campaign Source (<code>utm_source</code>) <strong className="text-rose-500">*</strong></span>
              <span className="text-[10px] text-slate-400">e.g. google, newsletter</span>
            </label>
            <input
              id="utm-source"
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="google"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
            />
            {/* Quick Source Chips */}
            <div className="flex flex-wrap gap-1">
              {SOURCE_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSource(s)}
                  className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Campaign Medium */}
          <div className="space-y-2">
            <label htmlFor="utm-medium" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Campaign Medium (<code>utm_medium</code>) <strong className="text-rose-500">*</strong></span>
              <span className="text-[10px] text-slate-400">e.g. cpc, email, paid_social</span>
            </label>
            <input
              id="utm-medium"
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="cpc"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
            />
            {/* Quick Medium Chips */}
            <div className="flex flex-wrap gap-1">
              {MEDIUM_SUGGESTIONS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMedium(m)}
                  className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Campaign Name */}
          <div className="space-y-1.5">
            <label htmlFor="utm-campaign" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Campaign Name (<code>utm_campaign</code>) <strong className="text-rose-500">*</strong></span>
              <span className="text-[10px] text-slate-400">e.g. spring_sale_2026</span>
            </label>
            <input
              id="utm-campaign"
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="spring_sale_2026"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* 5. Optional Parameters: Term, Content, ID */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Optional Granular Tracking
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="utm-term" className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Campaign Term (<code>utm_term</code>)
                </label>
                <input
                  id="utm-term"
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="e.g. running_shoes"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="utm-content" className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                  Campaign Content (<code>utm_content</code>)
                </label>
                <input
                  id="utm-content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="e.g. cta_top_button"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="utm-id" className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Campaign ID (<code>utm_id</code>)
              </label>
              <input
                id="utm-id"
                type="text"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                placeholder="e.g. camp_9941"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Link Output & Inspection (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Generated URL Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Generated Tracking URL
                </span>
              </div>

              {isValidUrl && (
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Test Link</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Display Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-200 break-all leading-relaxed shadow-inner min-h-[100px] flex items-center">
              {fullUrl || "https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer"}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleCopyFull}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all"
              >
                {copiedFull ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedFull ? "Full URL Copied!" : "Copy Full URL"}</span>
              </button>

              <button
                onClick={handleCopyParams}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {copiedParams ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copiedParams ? "Parameters Copied!" : "Copy Parameters Only"}</span>
              </button>
            </div>

          </div>

          {/* GA4 Attribution Parameter Breakdown */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span>GA4 Parameter Inspector</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="font-mono text-slate-500">utm_source</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{sanitize(source) || "(empty)"}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="font-mono text-slate-500">utm_medium</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{sanitize(medium) || "(empty)"}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="font-mono text-slate-500">utm_campaign</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{sanitize(campaign) || "(empty)"}</span>
              </div>
              {term && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="font-mono text-slate-500">utm_term</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{sanitize(term)}</span>
                </div>
              )}
              {content && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="font-mono text-slate-500">utm_content</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{sanitize(content)}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
