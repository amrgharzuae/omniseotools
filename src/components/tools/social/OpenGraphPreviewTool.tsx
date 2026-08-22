"use client";

import React, { useState, useMemo } from "react";
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
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const SAMPLE_PRESETS = [
  {
    name: "Tech SaaS Launch",
    title: "OmniSEOTools - Free High-Performance Utility Suite for Creators & Devs",
    description: "Access 20+ free developer, SEO, and marketing utilities. Simulate SERPs, preview social cards, and build tracking URLs with zero latency.",
    url: "https://omniseotools.com",
    siteName: "OmniSEOTools",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image" as const,
  },
  {
    name: "Editorial Article",
    title: "10 Proven Strategies to Double Organic Traffic in 2026",
    description: "Discover actionable, search-tested SEO techniques with real case studies. Learn how modern AI search engines evaluate content quality.",
    url: "https://growthblog.com/boost-organic-traffic",
    siteName: "Growth Blog",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image" as const,
  },
  {
    name: "E-Commerce Product",
    title: "ProSound Studio Headphones (2026 Edition) - High Fidelity Audio",
    description: "Experience premium active noise cancellation, 45-hour battery life, and studio-grade audio drivers. Free worldwide shipping.",
    url: "https://audiophilegear.com/products/prosound-headphones",
    siteName: "AudioPhile Gear",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop&q=80",
    twitterCard: "summary_large_image" as const,
  },
];

export function OpenGraphPreviewTool() {
  const [title, setTitle] = useState("OmniSEOTools - Free High-Performance SEO & Marketing Utilities");
  const [description, setDescription] = useState("Access 20+ free developer and marketing tools. Simulate SERPs, preview social cards, and build clean tracking links.");
  const [url, setUrl] = useState("https://omniseotools.com");
  const [siteName, setSiteName] = useState("OmniSEOTools");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80");
  const [twitterCard, setTwitterCard] = useState<"summary_large_image" | "summary">("summary_large_image");
  const [platform, setPlatform] = useState<"twitter" | "facebook" | "linkedin" | "discord">("twitter");
  const [copiedHtml, setCopiedHtml] = useState(false);

  const domain = useMemo(() => {
    try {
      const parsed = new URL(url.startsWith("http") ? url : "https://" + url);
      return parsed.hostname;
    } catch {
      return "example.com";
    }
  }, [url]);

  const generatedHtml = useMemo(() => {
    return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${siteName}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter (X) -->
<meta name="twitter:card" content="${twitterCard}">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">`;
  }, [url, siteName, title, description, imageUrl, twitterCard]);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleApplyPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
    setImageUrl(preset.imageUrl);
    setTwitterCard(preset.twitterCard);
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setUrl("https://example.com");
    setSiteName("My Site");
    setImageUrl("");
  };

  return (
    <div className="space-y-8">
      
      {/* Preset Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> Presets:
          </span>
          {SAMPLE_PRESETS.map((p) => (
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

      {/* 2-Column Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
          
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Social Tags Config</span>
            <span className="text-xs font-normal text-slate-500">Universal OG + Twitter</span>
          </h2>

          {/* Social Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="og-title" className="font-semibold text-slate-700 dark:text-slate-300">
                Social Title (<code>og:title</code>)
              </label>
              <span className={cn("font-mono text-[11px]", title.length > 70 ? "text-amber-500" : "text-slate-500")}>
                {title.length} / 70 chars
              </span>
            </div>
            <textarea
              id="og-title"
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., OmniSEOTools - Free Web Utility Suite"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Social Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="og-desc" className="font-semibold text-slate-700 dark:text-slate-300">
                Social Description (<code>og:description</code>)
              </label>
              <span className={cn("font-mono text-[11px]", description.length > 200 ? "text-amber-500" : "text-slate-500")}>
                {description.length} / 200 chars
              </span>
            </div>
            <textarea
              id="og-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Access 20+ free developer and marketing tools."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-3 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="og-image" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                <span>Featured Image URL (<code>og:image</code>)</span>
              </label>
              <span className="text-[10px] text-emerald-600 font-medium">1200x630 (1.91:1)</span>
            </div>
            <input
              id="og-image"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/og-banner.png"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none font-mono"
            />
          </div>

          {/* Canonical URL & Site Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="og-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Destination URL
              </label>
              <input
                id="og-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="og-site-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Site Name
              </label>
              <input
                id="og-site-name"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Twitter Card Format Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Twitter Card Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTwitterCard("summary_large_image")}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all",
                  twitterCard === "summary_large_image"
                    ? "bg-slate-900 dark:bg-emerald-600 text-white border-transparent shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                )}
              >
                Large Banner (1200x630)
              </button>
              <button
                type="button"
                onClick={() => setTwitterCard("summary")}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all",
                  twitterCard === "summary"
                    ? "bg-slate-900 dark:bg-emerald-600 text-white border-transparent shadow-sm"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                )}
              >
                Small Thumbnail (1:1)
              </button>
            </div>
          </div>

          {/* Export Action */}
          <div className="pt-3">
            <button
              onClick={handleCopyHtml}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-xs font-semibold text-white shadow-sm transition-all"
            >
              {copiedHtml ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedHtml ? "HTML Meta Tags Copied!" : "Copy Full HTML Meta Tags"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Multi-Platform Previews (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm">
            
            {/* Platform Selector Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setPlatform("twitter")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "twitter"
                      ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  )}
                >
                  Twitter / X
                </button>
                <button
                  onClick={() => setPlatform("facebook")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "facebook"
                      ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  )}
                >
                  Facebook
                </button>
                <button
                  onClick={() => setPlatform("linkedin")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "linkedin"
                      ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  )}
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => setPlatform("discord")}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap",
                    platform === "discord"
                      ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  )}
                >
                  Discord
                </button>
              </div>

              <span className="text-[11px] font-medium text-slate-400 hidden sm:inline">
                Live Simulation
              </span>
            </div>

            {/* Simulated Social Canvas */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/80 p-5 sm:p-7">
              
              {/* 1. TWITTER (X) SIMULATION */}
              {platform === "twitter" && (
                <div className="max-w-[500px] mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black overflow-hidden shadow-sm">
                  {twitterCard === "summary_large_image" ? (
                    <div>
                      {/* Image container with domain badge */}
                      <div className="relative aspect-[1.91/1] w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Social Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400">
                            No Image Provided (1200x630 Recommended)
                          </div>
                        )}
                        <div className="absolute bottom-2.5 left-2.5 rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          {domain}
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {title || "Your Page Title Appears Here"}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {description || "Your page description preview."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Summary Small Thumbnail */
                    <div className="flex items-center p-3 gap-3">
                      <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        {imageUrl && <img src={imageUrl} alt="Thumbnail" className="h-full w-full object-cover" />}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] text-slate-400">{domain}</span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {title || "Page Title"}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{description}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. FACEBOOK SIMULATION */}
              {platform === "facebook" && (
                <div className="max-w-[500px] mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#242526] overflow-hidden shadow-sm">
                  <div className="aspect-[1.91/1] w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    {imageUrl && (
                      <img src={imageUrl} alt="Facebook Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-3 bg-[#f0f2f5] dark:bg-[#242526] border-t border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      {domain}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                      {title || "Your Page Title"}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {description || "Meta description summary."}
                    </p>
                  </div>
                </div>
              )}

              {/* 3. LINKEDIN SIMULATION */}
              {platform === "linkedin" && (
                <div className="max-w-[500px] mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1b1f23] overflow-hidden shadow-sm">
                  <div className="aspect-[1.91/1] w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    {imageUrl && (
                      <img src={imageUrl} alt="LinkedIn Preview" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-3 space-y-1 bg-[#f3f2ef] dark:bg-[#1b1f23]">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {title || "Your LinkedIn Title"}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">{domain} • 2 min read</span>
                  </div>
                </div>
              )}

              {/* 4. DISCORD EMBED SIMULATION */}
              {platform === "discord" && (
                <div className="max-w-[500px] mx-auto rounded-lg border-l-4 border-emerald-500 bg-[#2b2d31] p-4 text-slate-200 shadow-sm space-y-2 font-sans">
                  <span className="text-[11px] font-medium text-slate-400 block">{siteName || domain}</span>
                  <h4 className="text-sm font-bold text-[#00a8fc] hover:underline cursor-pointer">
                    {title || "Discord Embed Title"}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {description || "Rich description snippet inside Discord embed."}
                  </p>
                  {imageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden max-h-[240px]">
                      <img src={imageUrl} alt="Discord embed" className="w-full object-cover" />
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Official Platform Debugger Links */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                Official Debuggers:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://developers.facebook.com/tools/debug/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>FB Debugger</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href="https://www.linkedin.com/post-inspector/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>LinkedIn Inspector</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
