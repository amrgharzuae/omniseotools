"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/config/categories";
import { Logo } from "@/components/ui/Logo";
import { 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  Layers, 
  Flame,
  ArrowRight
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <Logo size={36} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            href="/#tools"
            className="px-3 py-2 rounded-lg hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            All Tools
          </Link>
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/#category-${cat.id}`}
              className="px-3 py-2 rounded-lg hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/#tools"
            className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search 20+ utilities...</span>
          </a>
          <Link
            href="/tools/seo/serp-preview"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all"
          >
            <Flame className="h-3.5 w-3.5" />
            <span>Try SERP Tool</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-slate-700 dark:text-slate-200" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          <Link
            href="/#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Explore All Tools
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/#category-${cat.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {cat.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/tools/seo/serp-preview"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow"
            >
              <span>Launch SERP Previewer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
