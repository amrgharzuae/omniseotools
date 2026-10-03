"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SchemaBlueprint } from "@/data/schemas-dataset";
import { Search, ArrowRight, Code2, Sparkles, Layers, ShieldAlert, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemaDirectoryClientProps {
  blueprints: SchemaBlueprint[];
}

export function SchemaDirectoryClient({ blueprints }: SchemaDirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract all categories dynamically and calculate counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blueprints.length };
    blueprints.forEach((bp) => {
      counts[bp.category] = (counts[bp.category] || 0) + 1;
    });
    return counts;
  }, [blueprints]);

  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(blueprints.map((bp) => bp.category)));
    // Order categories nicely: All, Local Business, Healthcare, Technical SEO, E-Commerce, Editorial, Organization & Identity, Media & Entertainment, Events & Education, Creative Work & Media
    const priorityOrder = [
      "Local Business",
      "Healthcare",
      "Technical SEO",
      "Organization & Identity",
      "Editorial",
      "E-Commerce",
      "Media & Entertainment",
      "Events & Education",
      "Creative Work & Media"
    ];

    const sorted = rawCategories.sort((a, b) => {
      const idxA = priorityOrder.indexOf(a);
      const idxB = priorityOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return ["All", ...sorted];
  }, [blueprints]);

  const filteredBlueprints = useMemo(() => {
    return blueprints.filter((bp) => {
      const matchesCategory = selectedCategory === "All" || bp.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        bp.title.toLowerCase().includes(query) ||
        bp.schemaType.toLowerCase().includes(query) ||
        bp.description.toLowerCase().includes(query) ||
        bp.category.toLowerCase().includes(query) ||
        bp.targetKeywords.some((k) => k.toLowerCase().includes(query)) ||
        bp.properties.some((p) => p.name.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [blueprints, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Category Pills with Live Dynamic Counts */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border",
                  isSelected
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-sm ring-1 ring-emerald-600"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                )}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                    isSelected
                      ? "bg-emerald-700 text-emerald-100"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Result Counter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by schema type, property, keyword (e.g. Dentist, geo, openingHours)..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredBlueprints.length}</strong> of{" "}
              <strong>{blueprints.length}</strong> blueprints
            </span>
          </div>
        </div>
      </div>

      {/* Blueprints Grid */}
      {filteredBlueprints.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 space-y-3 bg-white/40 dark:bg-slate-900/20">
          <Code2 className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Schema Blueprints found matching your filter
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlueprints.map((bp) => (
            <article
              key={bp.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all group relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
                  <span className="font-mono rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">
                    @{bp.schemaType}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {bp.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  <Link href={`/schema/${bp.slug}`} className="focus:outline-none">
                    {bp.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {bp.description}
                </p>

                {/* Key Properties Snippet preview */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    <span>Key Typed Properties:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {bp.properties.slice(0, 4).map((prop) => (
                      <span
                        key={prop.name}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {prop.name}
                      </span>
                    ))}
                    {bp.properties.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                        +{bp.properties.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  {bp.readingTime}
                </span>

                <Link
                  href={`/schema/${bp.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <span>View Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
