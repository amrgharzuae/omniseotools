"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Recipe } from "@/config/recipes-data";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
  Search,
  CheckCircle2,
  Filter,
  Layers,
  Code2,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipesDirectoryClientProps {
  recipes: Recipe[];
}

const CATEGORIES: Array<"All" | "Next.js & React" | "Core Web Vitals" | "AI & Crawlers" | "Server & Nginx"> = [
  "All",
  "Next.js & React",
  "Core Web Vitals",
  "AI & Crawlers",
  "Server & Nginx",
];

export function RecipesDirectoryClient({ recipes }: RecipesDirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.problemSummary.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [recipes, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all",
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter recipes..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Recipes Cards Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <BookOpen className="h-8 w-8 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No technical recipes found matching your filter criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all group"
            >
              <div className="space-y-4">
                {/* Meta info */}
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">
                    {recipe.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="h-3 w-3" />
                    {recipe.readingTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  <Link href={`/recipes/${recipe.slug}`} className="focus:outline-none">
                    {recipe.title}
                  </Link>
                </h3>

                {/* Problem Teaser */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {recipe.problemSummary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono font-medium text-slate-400">
                  {recipe.relatedToolName}
                </span>

                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  <span>View Recipe</span>
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
