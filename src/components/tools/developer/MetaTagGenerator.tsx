"use client";

import React, { useState, useMemo } from "react";
import {
  Code2,
  Sparkles,
  RotateCcw,
  Copy,
  CheckCheck,
  Globe,
  Image as ImageIcon,
  Sliders,
  Share2,
  FileCode,
  Layers,
  CheckCircle2,
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
  ogType: string;
  twitterCard: string;
  twitterHandle: string;
  robots: string;
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
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterHandle: "@omniseotools",
    robots: "index, follow",
  },
  {
    name: "Blog Article",
    badge: "Editorial",
    title: "10 Proven Strategies to Double Organic Search Traffic in 2026",
    description:
      "Discover actionable, search-tested SEO techniques with real case studies. Learn how modern AI search engines evaluate content depth and relevance.",
    url: "https://growthblog.com/boost-organic-traffic",
    siteName: "Growth Blog",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80",
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterHandle: "@growthblog",
    robots: "index, follow",
  },
  {
    name: "E-Commerce Product",
    badge: "E-Commerce",
    title: "ProSound Studio Wireless ANC Headphones ($199) | AudioPeak",
    description:
      "Experience studio-grade acoustics, 45-hour battery life, and ultra-plush memory foam earcups. Free worldwide shipping & 30-day trial.",
    url: "https://audiophilegear.com/products/prosound-headphones",
    siteName: "AudioPeak",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop&q=80",
    ogType: "product",
    twitterCard: "summary_large_image",
    twitterHandle: "@audiopeak",
    robots: "index, follow",
  },
];

type ExportFormat = "html" | "nextjs" | "helmet";

export function MetaTagGenerator() {
  const [title, setTitle] = useState(SAMPLE_PRESETS[0].title);
  const [description, setDescription] = useState(SAMPLE_PRESETS[0].description);
  const [url, setUrl] = useState(SAMPLE_PRESETS[0].url);
  const [siteName, setSiteName] = useState(SAMPLE_PRESETS[0].siteName);
  const [imageUrl, setImageUrl] = useState(SAMPLE_PRESETS[0].imageUrl);
  const [ogType, setOgType] = useState(SAMPLE_PRESETS[0].ogType);
  const [twitterCard, setTwitterCard] = useState(SAMPLE_PRESETS[0].twitterCard);
  const [twitterHandle, setTwitterHandle] = useState(SAMPLE_PRESETS[0].twitterHandle);
  const [robots, setRobots] = useState("index, follow");
  const [formatTab, setFormatTab] = useState<ExportFormat>("html");
  const [copied, setCopied] = useState(false);

  const loadPreset = (preset: SamplePreset) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setUrl(preset.url);
    setSiteName(preset.siteName);
    setImageUrl(preset.imageUrl);
    setOgType(preset.ogType);
    setTwitterCard(preset.twitterCard);
    setTwitterHandle(preset.twitterHandle);
    setRobots(preset.robots);
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setSiteName("");
    setImageUrl("");
    setTwitterHandle("");
  };

  // Generate code string
  const outputCode = useMemo(() => {
    const cleanTitle = title.trim() || "Page Title";
    const cleanDesc = description.trim() || "Page Description";
    const cleanUrl = url.trim() || "https://example.com";
    const cleanSite = siteName.trim() || "Site Name";
    const cleanImg = imageUrl.trim() || "https://example.com/og-image.jpg";
    const cleanTwitter = twitterHandle.trim() || "@brand";

    if (formatTab === "html") {
      return `<!-- Primary Meta Tags -->
<title>${cleanTitle}</title>
<meta name="title" content="${cleanTitle}" />
<meta name="description" content="${cleanDesc}" />
<meta name="robots" content="${robots}" />
<link rel="canonical" href="${cleanUrl}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${ogType}" />
<meta property="og:url" content="${cleanUrl}" />
<meta property="og:title" content="${cleanTitle}" />
<meta property="og:description" content="${cleanDesc}" />
<meta property="og:image" content="${cleanImg}" />
<meta property="og:site_name" content="${cleanSite}" />

<!-- Twitter -->
<meta property="twitter:card" content="${twitterCard}" />
<meta property="twitter:url" content="${cleanUrl}" />
<meta property="twitter:title" content="${cleanTitle}" />
<meta property="twitter:description" content="${cleanDesc}" />
<meta property="twitter:image" content="${cleanImg}" />
${cleanTwitter ? `<meta property="twitter:site" content="${cleanTwitter}" />\n<meta property="twitter:creator" content="${cleanTwitter}" />` : ""}`;
    }

    if (formatTab === "nextjs") {
      return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${cleanTitle}',
  description: '${cleanDesc}',
  alternates: {
    canonical: '${cleanUrl}',
  },
  robots: '${robots}',
  openGraph: {
    title: '${cleanTitle}',
    description: '${cleanDesc}',
    url: '${cleanUrl}',
    siteName: '${cleanSite}',
    type: '${ogType}',
    images: [
      {
        url: '${cleanImg}',
        width: 1200,
        height: 630,
        alt: '${cleanTitle}',
      },
    ],
  },
  twitter: {
    card: '${twitterCard}',
    title: '${cleanTitle}',
    description: '${cleanDesc}',
    images: ['${cleanImg}'],
    ${cleanTwitter ? `creator: '${cleanTwitter}',\n    site: '${cleanTwitter}',` : ""}
  },
};`;
    }

    return `<Helmet>
  {/* Standard Meta Tags */}
  <title>${cleanTitle}</title>
  <meta name="description" content="${cleanDesc}" />
  <meta name="robots" content="${robots}" />
  <link rel="canonical" href="${cleanUrl}" />

  {/* Open Graph */}
  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${cleanUrl}" />
  <meta property="og:title" content="${cleanTitle}" />
  <meta property="og:description" content="${cleanDesc}" />
  <meta property="og:image" content="${cleanImg}" />
  <meta property="og:site_name" content="${cleanSite}" />

  {/* Twitter */}
  <meta name="twitter:card" content="${twitterCard}" />
  <meta name="twitter:url" content="${cleanUrl}" />
  <meta name="twitter:title" content="${cleanTitle}" />
  <meta name="twitter:description" content="${cleanDesc}" />
  <meta name="twitter:image" content="${cleanImg}" />
</Helmet>`;
  }, [formatTab, title, description, url, siteName, imageUrl, ogType, twitterCard, twitterHandle, robots]);

  const copyCode = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Sample Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Samples:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => loadPreset(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Fields
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-indigo-500" />
                Meta Tag Inputs
              </h2>
              <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                SEO & Open Graph
              </span>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Title
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {title.length} chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="High-CTR Page Title..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <span className="text-[11px] font-mono text-slate-400">
                  {description.length} chars
                </span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Compelling description between 140–160 characters..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
              />
            </div>

            {/* Canonical URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Canonical URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            {/* Social Image URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                OG Image URL (1200x630)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/assets/og-image.jpg"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>

            {/* Site Name & OG Type */}
            <div className="grid grid-cols-2 gap-3">
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

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  og:type
                </label>
                <select
                  value={ogType}
                  onChange={(e) => setOgType(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="product">product</option>
                  <option value="profile">profile</option>
                </select>
              </div>
            </div>

            {/* Twitter Card & Handle */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Twitter Card
                </label>
                <select
                  value={twitterCard}
                  onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                  <option value="app">app</option>
                  <option value="player">player</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Twitter @Handle
                </label>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@username"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Robots Directives */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Robots Meta
              </label>
              <select
                value={robots}
                onChange={(e) => setRobots(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="index, follow">index, follow (Standard)</option>
                <option value="noindex, follow">noindex, follow (Hide page, follow links)</option>
                <option value="noindex, nofollow">noindex, nofollow (Block completely)</option>
                <option value="index, nofollow">index, nofollow</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Code Output Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            
            {/* Format Selector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5">
                <button
                  onClick={() => setFormatTab("html")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                    formatTab === "html"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  HTML Tags
                </button>
                <button
                  onClick={() => setFormatTab("nextjs")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                    formatTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  Next.js App Router
                </button>
                <button
                  onClick={() => setFormatTab("helmet")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                    formatTab === "helmet"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  React Helmet
                </button>
              </div>

              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-sm shadow-indigo-500/20"
              >
                {copied ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5" />
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

            {/* Generated Code Display */}
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed min-h-[350px]">
              <code>{outputCode}</code>
            </pre>

          </div>
        </div>

      </div>
    </div>
  );
}
