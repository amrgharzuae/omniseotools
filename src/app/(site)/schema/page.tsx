import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlueprints } from "@/data/schemas-dataset";
import { SchemaDirectoryClient } from "@/components/schema/SchemaDirectoryClient";
import { AdSlot } from "@/components/ads/AdSlot";
import { Code2, Sparkles, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Schema Markup Blueprints & JSON-LD Cheat Sheets | OmniSEO Tools",
  description:
    "Comprehensive directory of 225 production-ready Schema.org JSON-LD blueprints for Real Estate & Accommodation, Finance & Banking, Automotive & Marine, Sports & Recreation, Government & Civic, Tech & SaaS, E-Commerce, Local Businesses, Healthcare, and Media.",
  alternates: {
    canonical: "https://omniseotools.com/schema",
  },
  openGraph: {
    title: "Schema Markup Blueprints & JSON-LD Cheat Sheets | OmniSEO Tools",
    description:
      "Comprehensive directory of 225 production-ready Schema.org JSON-LD blueprints for Real Estate & Accommodation, Finance & Banking, Automotive & Marine, Sports & Recreation, Government & Civic, Tech & SaaS, E-Commerce, Local Businesses, Healthcare, and Media.",
    url: "https://omniseotools.com/schema",
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schema Markup Blueprints & JSON-LD Cheat Sheets | OmniSEO Tools",
    description:
      "Comprehensive directory of 225 production-ready Schema.org JSON-LD blueprints for Real Estate & Accommodation, Finance & Banking, Automotive & Marine, Sports & Recreation, Government & Civic, Tech & SaaS, E-Commerce, Local Businesses, Healthcare, and Media.",
  },
};

export default function SchemaHubPage() {
  const blueprints = getAllBlueprints();

  // Structured Data Schema: CollectionPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "OmniSEOTools Schema Markup Blueprints & JSON-LD Cheat Sheets",
        url: "https://omniseotools.com/schema",
        description:
          "Comprehensive directory of 225 production-ready Schema.org JSON-LD blueprints for Real Estate & Accommodation, Finance & Banking, Automotive & Marine, Sports & Recreation, Government & Civic, Tech & SaaS, E-Commerce, Local Businesses, Healthcare, and Media.",
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
            name: "Schema Blueprints",
            item: "https://omniseotools.com/schema",
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
              Schema Blueprints
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <Code2 className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Schema Markup Blueprints &amp; JSON-LD Cheat Sheets
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Battle-tested, Google Rich Result-compliant JSON-LD structured data specifications for Local Businesses, Healthcare Clinics, Professional Services, E-Commerce, and Content Publishers.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="h-4 w-4" /> All {blueprints.length} Blueprints
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Google Search Central 2026 Ready
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Actionable GSC Pitfalls Included
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="mb-8" />

        {/* Directory Client with Dynamic Filters & Search */}
        <SchemaDirectoryClient blueprints={blueprints} />

        {/* Bottom Banner to Schema Validator Tool */}
        <div className="mt-14 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <span>Need to test or debug existing JSON-LD markup?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Use our client-side JSON-LD Schema Validator &amp; Linter to inspect syntax errors, verify Schema.org nesting, and audit Google Rich Result eligibility in real-time.
            </p>
          </div>
          <Link
            href="/tools/schema-validator"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all shrink-0"
          >
            <span>Launch Schema Validator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
