"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Zap,
  Sparkles,
  Check,
  Copy,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Code2,
  Terminal,
  Server,
  Layers,
  Info,
  ShieldCheck,
  RotateCcw,
  Type,
  ImageIcon,
  Globe,
  Gauge,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface ResourceHintGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

export type ResourceDirective =
  | "preload"
  | "preconnect"
  | "dns-prefetch"
  | "prefetch"
  | "modulepreload";

export type AsType =
  | "font"
  | "style"
  | "script"
  | "image"
  | "fetch"
  | "document"
  | "track"
  | "audio"
  | "video";

export type CrossOriginType = "none" | "anonymous" | "use-credentials";
export type FetchPriorityType = "auto" | "high" | "low";
export type ActiveTab = "html" | "nextjs" | "http-header";

export interface ResourceHintEntry {
  id: string;
  directive: ResourceDirective;
  url: string;
  as?: AsType;
  type?: string;
  crossOrigin?: CrossOriginType;
  fetchPriority?: FetchPriorityType;
  media?: string;
}

const PRESET_GOOGLE_FONTS: ResourceHintEntry[] = [
  {
    id: "gf-1",
    directive: "preconnect",
    url: "https://fonts.googleapis.com",
    crossOrigin: "none",
  },
  {
    id: "gf-2",
    directive: "preconnect",
    url: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    id: "gf-3",
    directive: "dns-prefetch",
    url: "https://fonts.googleapis.com",
    crossOrigin: "none",
  },
  {
    id: "gf-4",
    directive: "dns-prefetch",
    url: "https://fonts.gstatic.com",
    crossOrigin: "none",
  },
];

const PRESET_CRITICAL_FONTS: ResourceHintEntry[] = [
  {
    id: "font-1",
    directive: "preload",
    url: "/fonts/inter-var.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
    fetchPriority: "high",
  },
  {
    id: "font-2",
    directive: "preload",
    url: "/fonts/inter-bold.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
    fetchPriority: "auto",
  },
];

const PRESET_HERO_IMAGE: ResourceHintEntry[] = [
  {
    id: "hero-1",
    directive: "preload",
    url: "/images/hero-banner.webp",
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
    media: "(min-width: 768px)",
    crossOrigin: "none",
  },
  {
    id: "hero-2",
    directive: "preload",
    url: "/images/hero-mobile.webp",
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
    media: "(max-width: 767px)",
    crossOrigin: "none",
  },
];

const PRESET_THIRD_PARTY_CDN: ResourceHintEntry[] = [
  {
    id: "cdn-1",
    directive: "preconnect",
    url: "https://cdnjs.cloudflare.com",
    crossOrigin: "anonymous",
  },
  {
    id: "cdn-2",
    directive: "dns-prefetch",
    url: "https://cdnjs.cloudflare.com",
    crossOrigin: "none",
  },
  {
    id: "cdn-3",
    directive: "preconnect",
    url: "https://analytics.google.com",
    crossOrigin: "none",
  },
];

export function ResourceHintGenerator({
  toolSlug = "resource-hint-generator",
  toolName = "Resource Hint & Preconnect Generator",
}: ResourceHintGeneratorProps) {
  const [entries, setEntries] = useState<ResourceHintEntry[]>(PRESET_GOOGLE_FONTS);
  const [activeTab, setActiveTab] = useState<ActiveTab>("html");
  const [copied, setCopied] = useState(false);

  // Add new blank entry
  const handleAddEntry = useCallback(() => {
    const newEntry: ResourceHintEntry = {
      id: Math.random().toString(36).substring(2, 9),
      directive: "preload",
      url: "",
      as: "font",
      type: "font/woff2",
      crossOrigin: "anonymous",
      fetchPriority: "high",
    };
    setEntries((prev) => [...prev, newEntry]);
  }, []);

  // Remove specific entry
  const handleRemoveEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Update entry field
  const handleUpdateEntry = useCallback(
    (id: string, field: keyof ResourceHintEntry, value: any) => {
      setEntries((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          const updated = { ...item, [field]: value };

          // Smart auto-configuration for fonts
          if (field === "as" && value === "font") {
            updated.crossOrigin = "anonymous";
            if (!updated.type) updated.type = "font/woff2";
          }

          // Smart auto-configuration when directive changes to preconnect
          if (field === "directive" && (value === "preconnect" || value === "dns-prefetch")) {
            delete updated.as;
            delete updated.type;
            delete updated.media;
            if (value === "dns-prefetch") updated.crossOrigin = "none";
          }

          // When switching back to preload
          if (field === "directive" && value === "preload" && !updated.as) {
            updated.as = "image";
            updated.fetchPriority = "high";
          }

          return updated;
        })
      );
    },
    []
  );

  const handleApplyPreset = useCallback((preset: ResourceHintEntry[]) => {
    setEntries(preset);
  }, []);

  const handleClearAll = useCallback(() => {
    setEntries([]);
  }, []);

  // 1. Generate HTML Output (<link rel="..." ... />)
  const htmlOutput = useMemo(() => {
    if (entries.length === 0) {
      return "<!-- No resource hints configured yet. Add an entry or select a preset above. -->";
    }

    return entries
      .map((e) => {
        const parts: string[] = [`<link rel="${e.directive}" href="${e.url || "https://..."}"`];

        if (e.as && (e.directive === "preload" || e.directive === "prefetch")) {
          parts.push(`as="${e.as}"`);
        }

        if (e.type && (e.directive === "preload" || e.directive === "prefetch" || e.directive === "modulepreload")) {
          parts.push(`type="${e.type}"`);
        }

        if (e.crossOrigin && e.crossOrigin !== "none") {
          parts.push(`crossorigin="${e.crossOrigin}"`);
        }

        if (e.fetchPriority && e.fetchPriority !== "auto" && e.directive === "preload") {
          parts.push(`fetchpriority="${e.fetchPriority}"`);
        }

        if (e.media && (e.directive === "preload" || e.directive === "prefetch")) {
          parts.push(`media="${e.media}"`);
        }

        return parts.join(" ") + " />";
      })
      .join("\n");
  }, [entries]);

  // 2. Generate Next.js App Router / Metadata Output
  const nextJsOutput = useMemo(() => {
    if (entries.length === 0) {
      return "// No resource hints configured yet.";
    }

    return `// app/layout.tsx or app/page.tsx (Next.js 14 / 15 App Router)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Option A: Root Head links configuration
  other: {
    ${entries
      .map((e, idx) => {
        const key = `${e.directive}-${idx + 1}`;
        const val = e.url || "https://...";
        return `'link:${key}': '${val}',`;
      })
      .join("\n    ")}
  },
};

// Option B: Declarative JSX Link Tags inside Root Layout <head>
export function ResourceHints() {
  return (
    <>
      ${entries
        .map((e) => {
          const props: string[] = [`rel="${e.directive}"`, `href="${e.url || "https://..."}"`];
          if (e.as && (e.directive === "preload" || e.directive === "prefetch")) {
            props.push(`as="${e.as}"`);
          }
          if (e.type) props.push(`type="${e.type}"`);
          if (e.crossOrigin && e.crossOrigin !== "none") {
            props.push(`crossOrigin="${e.crossOrigin}"`);
          }
          if (e.fetchPriority && e.fetchPriority !== "auto" && e.directive === "preload") {
            props.push(`fetchPriority="${e.fetchPriority}"`);
          }
          if (e.media) props.push(`media="${e.media}"`);
          return `<link ${props.join(" ")} />`;
        })
        .join("\n      ")}
    </>
  );
}`;
  }, [entries]);

  // 3. Generate HTTP Link Header Output (RFC 5988 for Nginx / Apache / Vercel / Cloudflare)
  const httpHeaderOutput = useMemo(() => {
    if (entries.length === 0) {
      return "# No resource hints configured yet.";
    }

    const rawHeaderLines = entries
      .map((e) => {
        const parts = [`<${e.url || "https://..."}>; rel=${e.directive}`];
        if (e.as && (e.directive === "preload" || e.directive === "prefetch")) {
          parts.push(`as=${e.as}`);
        }
        if (e.type) parts.push(`type="${e.type}"`);
        if (e.crossOrigin && e.crossOrigin !== "none") {
          parts.push(`crossorigin=${e.crossOrigin}`);
        }
        return parts.join("; ");
      })
      .join(",\n  ");

    return `# 1. Nginx Server Configuration (HTTP/2 Server Push & 103 Early Hints)
http {
  server {
    add_header Link "${entries
      .map((e) => {
        const parts = [`<${e.url || "https://..."}>; rel=${e.directive}`];
        if (e.as) parts.push(`as=${e.as}`);
        if (e.crossOrigin && e.crossOrigin !== "none") parts.push(`crossorigin`);
        return parts.join("; ");
      })
      .join(", ")}" always;
  }
}

# 2. Vercel / Netlify Configuration (vercel.json)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Link",
          "value": "${entries
            .map((e) => {
              const parts = [`<${e.url || "https://..."}>; rel=${e.directive}`];
              if (e.as) parts.push(`as=${e.as}`);
              if (e.crossOrigin && e.crossOrigin !== "none") parts.push(`crossorigin`);
              return parts.join("; ");
            })
            .join(", ")}"
        }
      ]
    }
  ]
}

# 3. Apache (.htaccess) Configuration
<IfModule mod_headers.c>
  Header add Link "${entries
    .map((e) => {
      const parts = [`<${e.url || "https://..."}>; rel=${e.directive}`];
      if (e.as) parts.push(`as=${e.as}`);
      return parts.join("; ");
    })
    .join(", ")}"
</IfModule>`;
  }, [entries]);

  // Real-Time Core Web Vitals Audit & Safety Checks
  const auditResults = useMemo(() => {
    const issues: Array<{
      id: string;
      level: "critical" | "warning" | "success" | "tip";
      message: string;
      fix?: string;
    }> = [];

    // Check 1: Empty URL check
    const emptyUrls = entries.filter((e) => !e.url.trim());
    if (emptyUrls.length > 0) {
      issues.push({
        id: "empty-url",
        level: "critical",
        message: `${emptyUrls.length} entry has an empty URL or file path.`,
        fix: "Specify a valid absolute origin or relative path.",
      });
    }

    // Check 2: Font Double-Download Bug (missing crossorigin="anonymous" on as="font")
    const fontDoubleDownloads = entries.filter(
      (e) =>
        e.directive === "preload" &&
        e.as === "font" &&
        (!e.crossOrigin || e.crossOrigin === "none")
    );
    if (fontDoubleDownloads.length > 0) {
      issues.push({
        id: "font-cors",
        level: "critical",
        message:
          "Web Font Preload missing crossorigin='anonymous'. This triggers the browser double-download bug!",
        fix: "Set crossorigin to 'anonymous' to ensure font cache sharing.",
      });
    }

    // Check 3: Preload bandwidth overload (> 4 preloads)
    const preloadCount = entries.filter((e) => e.directive === "preload").length;
    if (preloadCount > 4) {
      issues.push({
        id: "preload-overload",
        level: "warning",
        message: `High Preload Count (${preloadCount} items). Preloading >4 assets can cause network bandwidth contention.`,
        fix: "Prioritize only the critical LCP image and 1-2 primary body fonts.",
      });
    }

    // Check 4: Preconnect missing protocol
    const preconnectNoProtocol = entries.filter(
      (e) =>
        (e.directive === "preconnect" || e.directive === "dns-prefetch") &&
        e.url.trim() &&
        !e.url.startsWith("http://") &&
        !e.url.startsWith("https://") &&
        !e.url.startsWith("//")
    );
    if (preconnectNoProtocol.length > 0) {
      issues.push({
        id: "missing-protocol",
        level: "warning",
        message: "External preconnect origin missing 'https://' protocol scheme.",
        fix: "Use full origin format (e.g. 'https://fonts.gstatic.com').",
      });
    }

    // Check 5: Missing 'as' on preload
    const missingAs = entries.filter(
      (e) => e.directive === "preload" && !e.as
    );
    if (missingAs.length > 0) {
      issues.push({
        id: "missing-as",
        level: "critical",
        message: "Preload directive is missing the required 'as' attribute.",
        fix: "Select 'font', 'style', 'script', or 'image' to set browser priority.",
      });
    }

    // Check 6: Preconnect without dns-prefetch fallback tip
    const preconnectOrigins = entries
      .filter((e) => e.directive === "preconnect")
      .map((e) => e.url.toLowerCase());
    const dnsOrigins = new Set(
      entries
        .filter((e) => e.directive === "dns-prefetch")
        .map((e) => e.url.toLowerCase())
    );
    const unbackedPreconnects = preconnectOrigins.filter(
      (origin) => origin && !dnsOrigins.has(origin)
    );
    if (unbackedPreconnects.length > 0) {
      issues.push({
        id: "dns-fallback",
        level: "tip",
        message: "Tip: Add a matching dns-prefetch for older browser fallback.",
        fix: "Helps legacy user agents resolve DNS before TCP sockets.",
      });
    }

    // Success note if clean
    if (issues.length === 0 && entries.length > 0) {
      issues.push({
        id: "perfect",
        level: "success",
        message: "All resource hints are optimal and compliant with Core Web Vitals standards.",
      });
    }

    // Compute Health Score (0-100)
    let score = 100;
    for (const issue of issues) {
      if (issue.level === "critical") score -= 30;
      if (issue.level === "warning") score -= 15;
    }
    score = Math.max(0, Math.min(100, score));

    return {
      issues,
      score,
      isClean: !issues.some((i) => i.level === "critical"),
    };
  }, [entries]);

  const handleCopy = useCallback(() => {
    const textToCopy =
      activeTab === "html"
        ? htmlOutput
        : activeTab === "nextjs"
        ? nextJsOutput
        : httpHeaderOutput;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab, htmlOutput, nextJsOutput, httpHeaderOutput]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([htmlOutput], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resource-hints.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [htmlOutput]);

  return (
    <div className="w-full space-y-8">
      {/* 1. Presets Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                <Zap className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Quick Load Core Web Vitals Presets
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pre-configured resource hint stacks for Google Fonts, LCP hero images, critical fonts, and CDNs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleApplyPreset(PRESET_GOOGLE_FONTS)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              Google Fonts Preconnect
            </button>
            <button
              onClick={() => handleApplyPreset(PRESET_CRITICAL_FONTS)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <Type className="w-3.5 h-3.5 text-purple-500" />
              Critical Web Font Preload
            </button>
            <button
              onClick={() => handleApplyPreset(PRESET_HERO_IMAGE)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
              Hero Image (LCP) Preload
            </button>
            <button
              onClick={() => handleApplyPreset(PRESET_THIRD_PARTY_CDN)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <Server className="w-3.5 h-3.5 text-amber-500" />
              Third-Party CDN
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Dual-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Hint Builder (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Resource Hint Entries ({entries.length})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={handleAddEntry}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Hint
                </button>
              </div>
            </div>

            {/* List of Resource Hint Rows */}
            {entries.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  No resource hints added yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click a quick preset above or click &quot;Add Hint&quot; to configure preload, preconnect, or dns-prefetch tags.
                </p>
                <button
                  type="button"
                  onClick={handleAddEntry}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Add Your First Resource Hint
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry, idx) => {
                  const isPreloadOrPrefetch =
                    entry.directive === "preload" ||
                    entry.directive === "prefetch" ||
                    entry.directive === "modulepreload";

                  return (
                    <div
                      key={entry.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-3 relative group transition-all hover:border-indigo-400/50"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-bold text-slate-400 font-mono">
                          #{idx + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                          {/* Directive Selector */}
                          <div className="sm:col-span-4">
                            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                              Directive
                            </label>
                            <select
                              value={entry.directive}
                              onChange={(e) =>
                                handleUpdateEntry(
                                  entry.id,
                                  "directive",
                                  e.target.value as ResourceDirective
                                )
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
                            >
                              <option value="preload">🚀 preload (Current Page)</option>
                              <option value="preconnect">⚡ preconnect (Early Socket)</option>
                              <option value="dns-prefetch">🌐 dns-prefetch (DNS Lookup)</option>
                              <option value="prefetch">🔮 prefetch (Next Page)</option>
                              <option value="modulepreload">📦 modulepreload (ES Module)</option>
                            </select>
                          </div>

                          {/* URL / Origin Input */}
                          <div className="sm:col-span-8">
                            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                              Resource URL / Origin <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={entry.url}
                              onChange={(e) =>
                                handleUpdateEntry(entry.id, "url", e.target.value)
                              }
                              placeholder={
                                entry.directive === "preconnect" || entry.directive === "dns-prefetch"
                                  ? "https://fonts.gstatic.com"
                                  : "/fonts/inter-var.woff2 or https://..."
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
                            />
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveEntry(entry.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors mt-4"
                          title="Remove row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Directive Options (Conditional when preload/prefetch/preconnect) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                        {/* as attribute */}
                        {isPreloadOrPrefetch && (
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              as (Destination)
                            </label>
                            <select
                              value={entry.as || "font"}
                              onChange={(e) =>
                                handleUpdateEntry(entry.id, "as", e.target.value as AsType)
                              }
                              className="w-full px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                            >
                              <option value="font">🔤 font</option>
                              <option value="image">🖼️ image</option>
                              <option value="style">🎨 style (CSS)</option>
                              <option value="script">📜 script (JS)</option>
                              <option value="fetch">📡 fetch (API/JSON)</option>
                              <option value="document">📄 document</option>
                            </select>
                          </div>
                        )}

                        {/* type attribute */}
                        {isPreloadOrPrefetch && (
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              type (MIME)
                            </label>
                            <input
                              type="text"
                              value={entry.type || ""}
                              onChange={(e) =>
                                handleUpdateEntry(entry.id, "type", e.target.value)
                              }
                              placeholder="font/woff2, image/webp"
                              className="w-full px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
                            />
                          </div>
                        )}

                        {/* crossorigin */}
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                            crossorigin
                          </label>
                          <select
                            value={entry.crossOrigin || "none"}
                            onChange={(e) =>
                              handleUpdateEntry(
                                entry.id,
                                "crossOrigin",
                                e.target.value as CrossOriginType
                              )
                            }
                            className={cn(
                              "w-full px-2 py-1 rounded-md border text-xs text-slate-900 dark:text-white",
                              entry.as === "font" && (!entry.crossOrigin || entry.crossOrigin === "none")
                                ? "border-rose-400 bg-rose-50 dark:bg-rose-950/50"
                                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                            )}
                          >
                            <option value="none">None (Default)</option>
                            <option value="anonymous">anonymous (Required for Fonts)</option>
                            <option value="use-credentials">use-credentials</option>
                          </select>
                        </div>

                        {/* fetchpriority / media */}
                        {entry.directive === "preload" && (
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              fetchpriority
                            </label>
                            <select
                              value={entry.fetchPriority || "auto"}
                              onChange={(e) =>
                                handleUpdateEntry(
                                  entry.id,
                                  "fetchPriority",
                                  e.target.value as FetchPriorityType
                                )
                              }
                              className="w-full px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                            >
                              <option value="auto">auto</option>
                              <option value="high">🔥 high (LCP hero)</option>
                              <option value="low">❄️ low</option>
                            </select>
                          </div>
                        )}

                        {/* media query condition */}
                        {isPreloadOrPrefetch && (
                          <div className="sm:col-span-2 md:col-span-4">
                            <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              media (Responsive Query Condition - Optional)
                            </label>
                            <input
                              type="text"
                              value={entry.media || ""}
                              onChange={(e) =>
                                handleUpdateEntry(entry.id, "media", e.target.value)
                              }
                              placeholder="e.g. (min-width: 768px)"
                              className="w-full px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Output & Core Web Vitals Auditor (5 Cols - Sticky) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          {/* Code Viewer Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden flex flex-col">
            {/* Tab Switcher */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("html")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                    activeTab === "html"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  HTML &lt;head&gt;
                </button>
                <button
                  onClick={() => setActiveTab("nextjs")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                    activeTab === "nextjs"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Next.js App
                </button>
                <button
                  onClick={() => setActiveTab("http-header")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer",
                    activeTab === "http-header"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Server className="w-3.5 h-3.5" />
                  HTTP Link
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="Copy snippet to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Download HTML snippet"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-950 text-slate-100 min-h-[340px] max-h-[440px] overflow-auto font-mono text-xs leading-relaxed">
              {activeTab === "html" ? (
                <pre className="text-emerald-400">
                  <code>{htmlOutput}</code>
                </pre>
              ) : activeTab === "nextjs" ? (
                <pre className="text-sky-300">
                  <code>{nextJsOutput}</code>
                </pre>
              ) : (
                <pre className="text-amber-300">
                  <code>{httpHeaderOutput}</code>
                </pre>
              )}
            </div>

            {/* Card Footer */}
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Client-Side Private
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {entries.length} Tag{entries.length === 1 ? "" : "s"} Generated
              </span>
            </div>
          </div>

          {/* Real-Time Core Web Vitals Audit & Safety Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge
                  className={cn(
                    "w-5 h-5",
                    auditResults.isClean ? "text-emerald-500" : "text-amber-500"
                  )}
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Core Web Vitals Safety Audit
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Real-time linting for font CORS bugs, bandwidth saturation &amp; protocols.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={cn(
                    "text-lg font-black",
                    auditResults.score >= 90
                      ? "text-emerald-600 dark:text-emerald-400"
                      : auditResults.score >= 60
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {auditResults.score}%
                </span>
              </div>
            </div>

            {/* Score Meter */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300 rounded-full",
                  auditResults.score >= 90
                    ? "bg-emerald-500"
                    : auditResults.score >= 60
                    ? "bg-amber-500"
                    : "bg-rose-500"
                )}
                style={{ width: `${auditResults.score}%` }}
              />
            </div>

            {/* Diagnostic Messages */}
            <div className="space-y-2 pt-1">
              {auditResults.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-start gap-2.5 text-xs p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30"
                >
                  {issue.level === "critical" ? (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  ) : issue.level === "warning" ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  ) : issue.level === "tip" ? (
                    <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  )}

                  <div className="flex-1 space-y-0.5">
                    <p
                      className={cn(
                        "font-medium",
                        issue.level === "critical"
                          ? "text-rose-700 dark:text-rose-300"
                          : issue.level === "warning"
                          ? "text-amber-700 dark:text-amber-300"
                          : issue.level === "tip"
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-emerald-700 dark:text-emerald-300"
                      )}
                    >
                      {issue.message}
                    </p>
                    {issue.fix && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {issue.fix}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Backlink Badge Integration */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Share verified performance badge:
              </span>
              <EmbedBadgeModal
                toolSlug={toolSlug}
                label="Resource Hints"
                status={auditResults.isClean ? "Optimized" : "Audited"}
                score={auditResults.score}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
