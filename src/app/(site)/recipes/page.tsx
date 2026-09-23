import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllRecipes } from "@/config/recipes-data";
import { RecipesDirectoryClient } from "@/components/recipes/RecipesDirectoryClient";
import { AdSlot } from "@/components/ads/AdSlot";
import { BookOpen, Sparkles, ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Recipes & Configuration Cheat-Sheets | OmniSEO Tools",
  description:
    "Battle-tested copy-paste snippets, configuration guides, and error resolutions for Next.js, Core Web Vitals, and Technical SEO.",
  alternates: {
    canonical: "https://omniseotools.com/recipes",
  },
  openGraph: {
    title: "Developer Recipes & Configuration Cheat-Sheets | OmniSEO Tools",
    description:
      "Battle-tested copy-paste snippets, configuration guides, and error resolutions for Next.js, Core Web Vitals, and Technical SEO.",
    url: "https://omniseotools.com/recipes",
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Recipes & Configuration Cheat-Sheets | OmniSEO Tools",
    description:
      "Battle-tested copy-paste snippets, configuration guides, and error resolutions for Next.js, Core Web Vitals, and Technical SEO.",
  },
};

export default function RecipesHubPage() {
  const recipes = getAllRecipes();

  // Structured Data Schema: CollectionPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "OmniSEOTools Developer Recipes & Configuration Cheat-Sheets",
        url: "https://omniseotools.com/recipes",
        description:
          "Battle-tested copy-paste snippets, configuration guides, and error resolutions for Next.js, Core Web Vitals, and Technical SEO.",
        publisher: {
          "@type": "Organization",
          name: "OmniSEOTools",
          url: "https://omniseotools.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://omniseotools.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Developer Recipes",
            item: "https://omniseotools.com/recipes",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-12 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">
              Developer Recipes
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Developer Recipes &amp; Configuration Cheat-Sheets
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Battle-tested copy-paste snippets, configuration guides, and error resolutions for Next.js App Router, Core Web Vitals, and Technical SEO.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Free Copy-Paste Configs
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Next.js 15+ &amp; Chrome 2026 Compatible
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Linked to Interactive Client Tools
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="mb-8" />

        {/* Recipes Directory Grid */}
        <RecipesDirectoryClient recipes={recipes} />

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
