"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Eye, 
  Share2, 
  ShieldAlert, 
  Link2, 
  Type, 
  BarChart3, 
  SlidersHorizontal, 
  Code2, 
  ChevronRight,
  TrendingUp,
  FileText,
  Layers,
  Wrench,
  Languages,
  Bot,
  FileCode,
} from "lucide-react";
import { CATEGORIES } from "@/config/categories";
import { getAllTools } from "@/config/tools/registry";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolCategoryId } from "@/types/category";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
  Code2,
  SlidersHorizontal,
  Globe,
  Languages,
  Bot,
  FileCode,
  Lock,
  Layers,
  Sparkles,
  TrendingUp,
  FileText,
  Wrench,
};

export default function ToolsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategoryId | "all">("all");

  const allTools = useMemo(() => getAllTools(), []);

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allTools, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header & Hero */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Semantic Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">
              Tools Hub Directory
            </span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 shadow-sm mb-4">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>Complete Directory • {allTools.length} Free Web Utilities</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              All Free SEO, Marketing &amp; Developer Tools
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Browse our complete catalog of {allTools.length} client-side web utilities. Generate UTM links, test social meta tags, calculate pixel widths, and inspect SERP previews with zero latency.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all tools (e.g. UTM builder, Twitter card, SERP)..."
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 py-3.5 pl-12 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-lg shadow-slate-900/5 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Directory Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10">
        
        {/* Top Leaderboard Ad Slot */}
        <AdSlot slotType="leaderboard" className="mb-8" />

        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              All Utilities ({allTools.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredTools.length}</strong> of {allTools.length} tools
          </span>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = ICON_MAP[tool.icon] || Sparkles;
            const isClickable = tool.status === "active";

            return (
              <div
                key={tool.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-200"
              >
                <div>
                  {/* Card Header: Icon & Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <div className="flex items-center gap-2">
                      {tool.badge && (
                        <span className="inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                          {tool.badge}
                        </span>
                      )}
                      {tool.status === "coming-soon" && (
                        <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tool Title */}
                  <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {isClickable ? (
                      <Link href={`/tools/${tool.slug}`}>
                        {tool.name}
                      </Link>
                    ) : (
                      tool.name
                    )}
                  </h2>

                  {/* Short Description */}
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Category: {tool.category.toUpperCase()}
                  </span>
                  
                  {isClickable ? (
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>Open Tool</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <span>Queued</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Feed Native AdSlot */}
        <div className="my-10">
          <AdSlot slotType="in-feed" />
        </div>

      </main>
    </div>
  );
}
