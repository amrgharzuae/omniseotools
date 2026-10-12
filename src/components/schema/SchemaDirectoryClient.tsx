"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Code2,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  FileCode,
  Tag,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { SchemaBlueprint, SchemaCategory } from "@/types/schema-blueprint";
import { cn } from "@/lib/utils";

interface SchemaDirectoryClientProps {
  initialSchemas: SchemaBlueprint[];
  categories: SchemaCategory[];
}

export function SchemaDirectoryClient({
  initialSchemas,
  categories,
}: SchemaDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSchemas = useMemo(() => {
    return initialSchemas.filter((blueprint) => {
      const matchesCategory =
        selectedCategory === "All" || blueprint.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      const matchTitle = blueprint.title.toLowerCase().includes(query);
      const matchEntity = (blueprint.targetEntity || blueprint.schemaType || "").toLowerCase().includes(query);
      const matchSlug = blueprint.slug.toLowerCase().includes(query);
      const matchDesc = blueprint.description.toLowerCase().includes(query);
      const matchProperties = blueprint.properties.some((p) =>
        p.name.toLowerCase().includes(query)
      );

      return matchTitle || matchEntity || matchSlug || matchDesc || matchProperties;
    });
  }, [initialSchemas, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialSchemas.length };
    for (const s of initialSchemas) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }
    return counts;
  }, [initialSchemas]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blueprints by entity (e.g. Product, MedicalClinic), property (offers, rating), or keyword..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
          {["All", ...categories].map((category) => {
            const count = categoryCounts[category] || 0;
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border",
                  isSelected
                    ? "bg-slate-900 dark:bg-emerald-600 text-white border-transparent shadow-sm scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <span>{category}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px]",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Blueprints Grid */}
      {filteredSchemas.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <FileCode className="h-10 w-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            No schema blueprints matched your query
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Try searching for a different Schema.org entity like "Product", "Restaurant", "MedicalBusiness", or clear your filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemas.map((blueprint) => {
            return (
              <div
                key={blueprint.slug}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all"
              >
                {/* Card Top */}
                <div className="space-y-3">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <Code2 className="h-3 w-3" />
                      schema.org/{blueprint.targetEntity || blueprint.schemaType || "Thing"}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {blueprint.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    <Link
                      href={`/schema/${blueprint.slug}`}
                      className="focus:outline-none"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      {blueprint.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {blueprint.description}
                  </p>
                </div>

                {/* Card Bottom Meta */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                      <Layers className="h-3.5 w-3.5 text-slate-400" />
                      {blueprint.properties.length} props
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {blueprint.pitfalls.length} GSC checks
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Specs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
