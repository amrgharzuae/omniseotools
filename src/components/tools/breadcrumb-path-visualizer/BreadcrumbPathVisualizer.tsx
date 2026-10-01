"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Route,
  ChevronRight,
  Copy,
  Check,
  Download,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Globe,
  Plus,
  Trash2,
  Info,
  Layers,
  Code2,
  FileCode,
  Smartphone,
  Monitor,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Wand2,
  Eye,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface BreadcrumbPathVisualizerProps {
  toolSlug?: string;
  toolName?: string;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
  url: string;
}

interface PresetHierarchy {
  name: string;
  badge: string;
  url: string;
  pageTitle: string;
  metaDesc: string;
  items: BreadcrumbItem[];
}

const PRESETS: PresetHierarchy[] = [
  {
    name: "E-Commerce Catalog",
    badge: "E-Commerce",
    url: "https://store.example.com/shoes/mens/trail-running-shoes",
    pageTitle: "Men's Waterproof Trail Running Shoes | Apex Athletics",
    metaDesc: "Shop top-rated men's trail running shoes designed for rugged off-road terrain, breathable grip, and waterproof protection with free shipping.",
    items: [
      { id: "1", name: "Home", url: "https://store.example.com" },
      { id: "2", name: "Shoes", url: "https://store.example.com/shoes" },
      { id: "3", name: "Men's", url: "https://store.example.com/shoes/mens" },
      { id: "4", name: "Trail Running Shoes", url: "https://store.example.com/shoes/mens/trail-running-shoes" },
    ],
  },
  {
    name: "Technical Documentation",
    badge: "Tech Docs",
    url: "https://docs.example.com/framework/routing/server-actions",
    pageTitle: "Server Actions and Data Mutations | Developer Guide",
    metaDesc: "Comprehensive reference documentation for creating type-safe server actions, handling revalidation, and securing endpoints in modern web frameworks.",
    items: [
      { id: "1", name: "Documentation", url: "https://docs.example.com" },
      { id: "2", name: "Framework", url: "https://docs.example.com/framework" },
      { id: "3", name: "Routing", url: "https://docs.example.com/framework/routing" },
      { id: "4", name: "Server Actions", url: "https://docs.example.com/framework/routing/server-actions" },
    ],
  },
  {
    name: "Real Estate Listings",
    badge: "Real Estate",
    url: "https://properties.example.com/california/san-francisco/condos/luxury-loft-101",
    pageTitle: "Luxury Loft in San Francisco, CA | Prime Real Estate",
    metaDesc: "Tour this 2-bedroom luxury penthouse loft with floor-to-ceiling windows, private rooftop terrace, and panoramic downtown skyline views.",
    items: [
      { id: "1", name: "Home", url: "https://properties.example.com" },
      { id: "2", name: "California", url: "https://properties.example.com/california" },
      { id: "3", name: "San Francisco", url: "https://properties.example.com/california/san-francisco" },
      { id: "4", name: "Condos", url: "https://properties.example.com/california/san-francisco/condos" },
      { id: "5", name: "Luxury Loft #101", url: "https://properties.example.com/california/san-francisco/condos/luxury-loft-101" },
    ],
  },
  {
    name: "SaaS Solutions Hub",
    badge: "B2B SaaS",
    url: "https://cloud.example.com/solutions/enterprise/zero-trust-access",
    pageTitle: "Enterprise Zero Trust Network Access (ZTNA) | CloudGuard",
    metaDesc: "Secure hybrid workforce access with micro-segmented least-privilege security policies, continuous identity verification, and DDoS defense.",
    items: [
      { id: "1", name: "Home", url: "https://cloud.example.com" },
      { id: "2", name: "Solutions", url: "https://cloud.example.com/solutions" },
      { id: "3", name: "Enterprise", url: "https://cloud.example.com/solutions/enterprise" },
      { id: "4", name: "Zero Trust Access", url: "https://cloud.example.com/solutions/enterprise/zero-trust-access" },
    ],
  },
];

function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\.[a-zA-Z0-9]+$/, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
}

function parseUrlToBreadcrumbs(rawUrl: string): { items: BreadcrumbItem[]; error?: string } {
  try {
    let normalized = rawUrl.trim();
    if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
      normalized = "https://" + normalized;
    }
    const urlObj = new URL(normalized);
    const origin = urlObj.origin;
    const pathSegments = urlObj.pathname.split("/").filter(Boolean);

    const items: BreadcrumbItem[] = [
      {
        id: "step-0",
        name: "Home",
        url: origin,
      },
    ];

    let runningPath = origin;
    pathSegments.forEach((segment, idx) => {
      runningPath += `/${segment}`;
      const formattedName = slugToTitle(decodeURIComponent(segment));
      items.push({
        id: `step-${idx + 1}`,
        name: formattedName || `Section ${idx + 1}`,
        url: runningPath,
      });
    });

    return { items };
  } catch (err) {
    return {
      items: [],
      error: "Invalid URL format. Please ensure you include a valid hostname (e.g., https://example.com/path).",
    };
  }
}

export function BreadcrumbPathVisualizer({
  toolSlug = "breadcrumb-path-visualizer",
  toolName = "Breadcrumb Path Visualizer & Schema Builder",
}: BreadcrumbPathVisualizerProps) {
  // State
  const [inputUrl, setInputUrl] = useState(PRESETS[0].url);
  const [items, setItems] = useState<BreadcrumbItem[]>(PRESETS[0].items);
  const [pageTitle, setPageTitle] = useState(PRESETS[0].pageTitle);
  const [metaDesc, setMetaDesc] = useState(PRESETS[0].metaDesc);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [separatorStyle, setSeparatorStyle] = useState<"chevron" | "slash" | "arrow" | "dot">("chevron");
  const [activeTab, setActiveTab] = useState<"jsonld" | "microdata" | "react" | "json">("jsonld");
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  // Auto-parse URL
  const handleAutoDissectUrl = () => {
    if (!inputUrl.trim()) return;
    const res = parseUrlToBreadcrumbs(inputUrl);
    if (res.items.length > 0) {
      setItems(res.items);
      const last = res.items[res.items.length - 1];
      if (last && last.name !== "Home") {
        setPageTitle(`${last.name} | Official Website`);
      }
    }
  };

  // Preset loading
  const handleLoadPreset = (preset: PresetHierarchy) => {
    setInputUrl(preset.url);
    setPageTitle(preset.pageTitle);
    setMetaDesc(preset.metaDesc);
    setItems(preset.items.map((it, idx) => ({ ...it, id: `preset-${Date.now()}-${idx}` })));
  };

  // Item list operations
  const handleAddItem = () => {
    const lastItem = items[items.length - 1];
    const newId = `item-${Date.now()}`;
    const newUrl = lastItem ? `${lastItem.url}/new-category` : "https://example.com/new-category";
    setItems((prev) => [...prev, { id: newId, name: "New Category", url: newUrl }]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof BreadcrumbItem, val: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === items.length - 1) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  // Validation
  const validationResults = useMemo(() => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const passes: string[] = [];

    if (items.length === 0) {
      errors.push("At least one breadcrumb item is required.");
    } else {
      passes.push(`${items.length} hierarchy levels defined.`);
    }

    items.forEach((item, idx) => {
      if (!item.name.trim()) {
        errors.push(`Step #${idx + 1} has an empty label name.`);
      }
      if (!item.url.trim()) {
        errors.push(`Step #${idx + 1} (${item.name || "Untitled"}) is missing a target URL.`);
      } else {
        if (!item.url.startsWith("http://") && !item.url.startsWith("https://")) {
          warnings.push(`Step #${idx + 1} URL "${item.url}" should include absolute protocol https://.`);
        }
      }
    });

    // Check duplicate URLs
    const urlSet = new Set<string>();
    items.forEach((item) => {
      const u = item.url.trim();
      if (u) {
        if (urlSet.has(u)) {
          warnings.push(`Duplicate URL detected: "${u}".`);
        }
        urlSet.add(u);
      }
    });

    return { errors, warnings, passes, isValid: errors.length === 0 };
  }, [items]);

  // Derived Domain and SERP trail
  const serpData = useMemo(() => {
    let domain = "example.com";
    try {
      if (items[0] && items[0].url) {
        const u = new URL(items[0].url.startsWith("http") ? items[0].url : `https://${items[0].url}`);
        domain = u.hostname;
      }
    } catch {
      // fallback
    }

    const trail = items.map((it) => it.name).join(" › ");
    return { domain, trail };
  }, [items]);

  // Generated JSON-LD
  const jsonLdCode = useMemo(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        item: item.url,
      })),
    };

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }, [items]);

  // Generated HTML5 Microdata
  const microdataCode = useMemo(() => {
    const listItems = items
      .map((item, idx) => {
        const isLast = idx === items.length - 1;
        if (isLast) {
          return `    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="current">
      <span itemprop="name" aria-current="page">${item.name}</span>
      <meta itemprop="position" content="${idx + 1}" />
    </li>`;
        }
        return `    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="${item.url}">
        <span itemprop="name">${item.name}</span>
      </a>
      <meta itemprop="position" content="${idx + 1}" />
    </li>`;
      })
      .join("\n");

    return `<nav aria-label="Breadcrumb" class="breadcrumb-navigation">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
${listItems}
  </ol>
</nav>`;
  }, [items]);

  // Generated React Component with Tailwind
  const reactSnippet = useMemo(() => {
    return `// components/BreadcrumbTrail.tsx
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

const BREADCRUMB_ITEMS: BreadcrumbItem[] = ${JSON.stringify(
      items.map((it) => ({ name: it.name, url: it.url })),
      null,
      2
    )};

export function BreadcrumbTrail() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: BREADCRUMB_ITEMS.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      {/* Schema.org BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Accessible Navigation Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
          {BREADCRUMB_ITEMS.map((item, index) => {
            const isLast = index === BREADCRUMB_ITEMS.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                {isLast ? (
                  <span className="font-semibold text-slate-900 dark:text-white" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 hover:underline transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
`;
  }, [items]);

  // Raw JSON
  const rawJson = useMemo(() => {
    return JSON.stringify(
      {
        totalLevels: items.length,
        breadcrumbs: items.map((it, idx) => ({
          position: idx + 1,
          label: it.name,
          url: it.url,
        })),
      },
      null,
      2
    );
  }, [items]);

  const handleCopy = useCallback((text: string, tabKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabKey);
    setTimeout(() => setCopiedTab(null), 2000);
  }, []);

  const handleDownloadFile = () => {
    let content = "";
    let filename = "breadcrumbs.json";
    let type = "application/json";

    if (activeTab === "jsonld") {
      content = jsonLdCode;
      filename = "breadcrumb-schema.html";
      type = "text/html";
    } else if (activeTab === "microdata") {
      content = microdataCode;
      filename = "breadcrumb-microdata.html";
      type = "text/html";
    } else if (activeTab === "react") {
      content = reactSnippet;
      filename = "BreadcrumbTrail.tsx";
      type = "text/typescript";
    } else {
      content = rawJson;
      filename = "breadcrumbs.json";
      type = "application/json";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderSeparatorIcon = () => {
    switch (separatorStyle) {
      case "slash":
        return <span className="text-slate-400 font-mono">/</span>;
      case "arrow":
        return <span className="text-slate-400">→</span>;
      case "dot":
        return <span className="text-slate-400 font-bold">•</span>;
      default:
        return <ChevronRight className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Top Banner & Presets */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
              <Route className="w-4 h-4 text-cyan-400" />
              Interactive Hierarchy Dissector &amp; Schema.org Engine
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Programmatic Breadcrumb &amp; Deep Link Visualizer
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Break down deep landing page URLs into structured navigational tiers, simulate real-time Google SERP rich snippet trails, and generate Schema.org BreadcrumbList markup with zero telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <EmbedBadgeModal
              score={validationResults.isValid ? 100 : 80}
              status="Valid"
              label="BreadcrumbList"
              toolSlug={toolSlug}
              buttonVariant="outline"
            />
            <button
              onClick={() => handleLoadPreset(PRESETS[0])}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Quick URL Dissector Input */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
            Auto-Dissect Any URL Into Breadcrumbs
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://example.com/shop/electronics/headphones/wireless"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono shadow-inner"
              />
            </div>
            <button
              type="button"
              onClick={handleAutoDissectUrl}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 shrink-0"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Parse &amp; Dissect Path
            </button>
          </div>

          {/* Quick Presets Bar */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleLoadPreset(preset)}
                className="text-left p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors truncate">
                    {preset.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono shrink-0">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate font-mono">
                  {preset.url.replace(/^https?:\/\//, "")}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Hierarchy Editor Left, Live Previews & Code Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Breadcrumb Step Builder (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold">
                  1
                </span>
                <h3 className="text-base font-semibold text-white">
                  Hierarchical Breadcrumb Steps
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Step Level
              </button>
            </div>

            {/* List of Breadcrumb Items */}
            <div className="space-y-3">
              {items.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === items.length - 1;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2.5 transition-all hover:border-slate-700"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-700 text-slate-300 font-mono text-[11px] font-bold">
                          {index + 1}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          {isFirst ? "Root Level (Home)" : isLast ? "Leaf Node (Current Page)" : `Category Level ${index}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveItem(index, "up")}
                          disabled={isFirst}
                          className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 rounded transition-colors"
                          title="Move Step Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveItem(index, "down")}
                          disabled={isLast}
                          className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 rounded transition-colors"
                          title="Move Step Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 rounded transition-colors ml-1"
                            title="Remove Step"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdateItem(item.id, "name", e.target.value)}
                          placeholder="Anchor Label (e.g. Footwear)"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
                        />
                      </div>
                      <div className="sm:col-span-7">
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => handleUpdateItem(item.id, "url", e.target.value)}
                          placeholder="https://example.com/shoes"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated SERP Metadata Settings */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                SERP Snippet Simulation Settings
              </span>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">
                    Page Title (&lt;title&gt;)
                  </label>
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    placeholder="Page Title"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    rows={2}
                    placeholder="Meta description snippet..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Mockup Engine & Code Exports (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Live Google SERP Mockup Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Google SERP Snippet Preview
                </h4>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={cn(
                    "p-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1",
                    previewDevice === "desktop"
                      ? "bg-slate-800 text-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                  title="Desktop Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={cn(
                    "p-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1",
                    previewDevice === "mobile"
                      ? "bg-slate-800 text-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Google Result Card Simulation */}
            <div
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 bg-white text-slate-900 font-sans shadow-sm",
                previewDevice === "mobile" ? "max-w-sm mx-auto" : "w-full"
              )}
            >
              {/* Favicon & Breadcrumb Header */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                  <Globe className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div className="min-w-0 leading-tight">
                  <p className="text-[12px] font-semibold text-slate-800 truncate">
                    {serpData.domain}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    https://{serpData.domain} › {items.slice(1).map((it) => it.name).join(" › ") || "..."}
                  </p>
                </div>
              </div>

              {/* Title Link */}
              <h5 className="text-[16px] leading-snug font-normal text-[#1a0dab] hover:underline cursor-pointer line-clamp-2 mt-1">
                {pageTitle || "Page Title Sample"}
              </h5>

              {/* Description */}
              <p className="text-[12px] leading-relaxed text-slate-600 mt-1 line-clamp-2">
                {metaDesc || "Meta description preview text describing the contents of this target page..."}
              </p>
            </div>
          </div>

          {/* 2. On-Page UI Navigation Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  On-Page UI Trail Preview
                </h4>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSeparatorStyle("chevron")}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] font-mono transition-colors",
                    separatorStyle === "chevron" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800 text-slate-400"
                  )}
                >
                  &gt;
                </button>
                <button
                  type="button"
                  onClick={() => setSeparatorStyle("slash")}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] font-mono transition-colors",
                    separatorStyle === "slash" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800 text-slate-400"
                  )}
                >
                  /
                </button>
                <button
                  type="button"
                  onClick={() => setSeparatorStyle("arrow")}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] font-mono transition-colors",
                    separatorStyle === "arrow" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800 text-slate-400"
                  )}
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => setSeparatorStyle("dot")}
                  className={cn(
                    "px-2 py-0.5 rounded text-[11px] font-mono transition-colors",
                    separatorStyle === "dot" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-slate-800 text-slate-400"
                  )}
                >
                  •
                </button>
              </div>
            </div>

            {/* UI Breadcrumb Demo */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <nav aria-label="Visual Breadcrumb Preview" className="flex flex-wrap items-center gap-1.5 text-xs">
                {items.map((it, idx) => {
                  const isLast = idx === items.length - 1;
                  return (
                    <React.Fragment key={it.id}>
                      {idx > 0 && <span className="flex items-center justify-center">{renderSeparatorIcon()}</span>}
                      {isLast ? (
                        <span className="font-semibold text-cyan-400 cursor-default">
                          {it.name}
                        </span>
                      ) : (
                        <span className="text-slate-400 hover:text-slate-200 cursor-pointer hover:underline transition-colors">
                          {it.name}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* 3. Export Code Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header Tabs */}
            <div className="bg-slate-950 px-3 pt-3 border-b border-slate-800 flex flex-wrap gap-1">
              <button
                onClick={() => setActiveTab("jsonld")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "jsonld"
                    ? "bg-slate-900 text-cyan-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <FileCode className="w-3.5 h-3.5" />
                JSON-LD
              </button>
              <button
                onClick={() => setActiveTab("microdata")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "microdata"
                    ? "bg-slate-900 text-cyan-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Code2 className="w-3.5 h-3.5" />
                HTML5 Microdata
              </button>
              <button
                onClick={() => setActiveTab("react")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "react"
                    ? "bg-slate-900 text-cyan-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                React / Next.js
              </button>
              <button
                onClick={() => setActiveTab("json")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "json"
                    ? "bg-slate-900 text-cyan-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Globe className="w-3.5 h-3.5" />
                Raw JSON
              </button>
            </div>

            {/* Code Content Area */}
            <div className="relative bg-slate-950 p-4 max-h-[360px] overflow-y-auto">
              <pre className="font-mono text-xs text-cyan-300/90 whitespace-pre-wrap leading-relaxed selection:bg-cyan-500/30 selection:text-white">
                {activeTab === "jsonld" && jsonLdCode}
                {activeTab === "microdata" && microdataCode}
                {activeTab === "react" && reactSnippet}
                {activeTab === "json" && rawJson}
              </pre>
            </div>

            {/* Action Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>Zero telemetry / 100% Client-side</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const content =
                      activeTab === "jsonld"
                        ? jsonLdCode
                        : activeTab === "microdata"
                        ? microdataCode
                        : activeTab === "react"
                        ? reactSnippet
                        : rawJson;
                    handleCopy(content, activeTab);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 shadow-lg shadow-cyan-600/20"
                >
                  {copiedTab === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadFile}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                  title="Download Code"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
