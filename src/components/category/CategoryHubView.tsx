"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Code2,
  FileText,
  TrendingUp,
  Share2,
  Eye,
  Globe,
  Bot,
  FileCode,
  Lock,
  Layers,
  ShoppingBag,
  Crop,
  Shuffle,
  Tag,
  Zap,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
  Languages,
} from "lucide-react";
import { CATEGORIES, getCategoryBySlug } from "@/config/categories";
import { getToolsByCategory, getAllProgrammaticTools } from "@/config/tools-registry";
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
  ShoppingBag,
  Crop,
  Shuffle,
  Tag,
  Zap,
  Search,
};

interface CategoryHubViewProps {
  categoryId: ToolCategoryId;
}

export function CategoryHubView({ categoryId }: CategoryHubViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const category = getCategoryBySlug(categoryId);
  const categoryTools = useMemo(() => getToolsByCategory(categoryId), [categoryId]);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return categoryTools;
    const q = searchQuery.toLowerCase();
    return categoryTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [categoryTools, searchQuery]);

  const CategoryIcon = category?.icon && ICON_MAP[category.icon] ? ICON_MAP[category.icon] : Sparkles;

  const otherCategories = useMemo(
    () => CATEGORIES.filter((c) => ["seo", "social", "developer", "marketing", "content"].includes(c.id)),
    []
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/tools" className="hover:text-emerald-600 transition-colors">
              Tools Hub
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">
              {category?.name || categoryId}
            </span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 shadow-sm mb-4">
              <CategoryIcon className="h-3.5 w-3.5 text-emerald-500" />
              <span>
                {category?.name || categoryId} Category • {categoryTools.length} Free Utilities
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {category?.name || categoryId}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {category?.description ||
                `Browse our high-performance client-side ${category?.name} web utilities with 100% data privacy and instant browser execution.`}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> 100% Free &amp; Client-Side
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Zero Telemetry
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Export Ready
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${category?.name || categoryId} tools...`}
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

        {/* Category Navigation Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <Link
              href="/tools"
              className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              All Utilities
            </Link>
            {otherCategories.map((cat) => {
              const isActive = cat.id === categoryId;
              return (
                <Link
                  key={cat.id}
                  href={`/tools/${cat.slug}`}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredTools.length}</strong> of{" "}
            {categoryTools.length} tools
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
                    {isClickable ? <Link href={`/tools/${tool.slug}`}>{tool.name}</Link> : tool.name}
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
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs text-slate-400">In Development</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom In-Feed Ad Slot */}
        <AdSlot slotType="in-feed" className="mt-12" />
      </main>
    </div>
  );
}
