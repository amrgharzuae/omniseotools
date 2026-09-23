import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllRecipes, getRecipeBySlug } from "@/config/recipes-data";
import { getProgrammaticToolBySlug } from "@/config/tools-registry";
import { RecipeSolutionViewer } from "@/components/recipes/RecipeSolutionViewer";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  ChevronRight,
  Sparkles,
  Clock,
  Calendar,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Code2,
  FileCode,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found | OmniSEO Tools",
    };
  }

  const canonicalUrl = `https://omniseotools.com/recipes/${recipe.slug}`;

  return {
    title: `${recipe.title} | OmniSEO Tools`,
    description: recipe.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${recipe.title} | OmniSEO Tools`,
      description: recipe.description,
      url: canonicalUrl,
      type: "article",
      siteName: "OmniSEOTools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipe.title} | OmniSEO Tools`,
      description: recipe.description,
    },
  };
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const relatedTool = getProgrammaticToolBySlug(recipe.relatedToolSlug);
  const canonicalUrl = `https://omniseotools.com/recipes/${recipe.slug}`;

  // Structured Data Schema: TechArticle + BreadcrumbList + FAQPage
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: recipe.title,
        description: recipe.description,
        url: canonicalUrl,
        datePublished: "2026-09-01T00:00:00+00:00",
        dateModified: "2026-09-23T00:00:00+00:00",
        author: {
          "@type": "Organization",
          name: "OmniSEOTools Engineering",
          url: "https://omniseotools.com",
        },
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
          {
            "@type": "ListItem",
            position: 3,
            name: recipe.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: recipe.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
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
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-10 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/recipes" className="hover:text-emerald-600 font-medium transition-colors">
              Developer Recipes
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium truncate">
              {recipe.title}
            </span>
          </nav>

          {/* Badges & Meta Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
            <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-300">
              {recipe.category}
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {recipe.readingTime}
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              Updated {recipe.lastUpdated}
            </span>
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Production Verified
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {recipe.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </section>

      {/* Main Recipe Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 space-y-10">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* 1. Primary Interactive Tool Bridge Banner */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Automate & Test This in Our Free Tool
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-snug">
                Eliminate syntax errors and test live URLs client-side using our dedicated{" "}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  {recipe.relatedToolName}
                </strong>.
              </p>
            </div>

            <Link
              href={`/tools/${recipe.relatedToolSlug}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all shrink-0 self-start sm:self-auto"
            >
              <span>{recipe.relatedToolCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 2. Problem Statement & Error Diagnostics */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-rose-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              The Technical Problem & Root Cause
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {recipe.problemSummary}
          </p>

          {/* Error Snippet Box */}
          {recipe.errorSnippet && (
            <div className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/30 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                <AlertOctagon className="h-3.5 w-3.5" />
                <span>Common Error Signature / Console Output:</span>
              </div>
              <pre className="text-xs font-mono text-rose-900 dark:text-rose-200 bg-rose-100/50 dark:bg-rose-950/60 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {recipe.errorSnippet}
              </pre>
            </div>
          )}
        </section>

        {/* 3. Production Solution Snippet */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Production-Grade Solution & Code Snippet
            </h2>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Copy and paste this verified configuration directly into your project:
          </p>

          <RecipeSolutionViewer
            solutionSnippet={recipe.solutionSnippet}
            snippetLanguage={recipe.snippetLanguage}
            relatedToolSlug={recipe.relatedToolSlug}
            relatedToolName={recipe.relatedToolName}
            relatedToolCta={recipe.relatedToolCta}
          />
        </section>

        {/* 4. Step-by-Step Implementation Guide */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Step-by-Step Implementation Walkthrough
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {recipe.implementationSteps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-2"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
                    {idx + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-8">
                  {step.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-8" />

        {/* 5. Common Pitfalls & Gotchas */}
        <section className="space-y-4">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-base">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <span>Common Pitfalls & Gotchas to Avoid</span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-amber-950 dark:text-amber-200/90 pl-5 list-disc leading-relaxed">
              {recipe.commonPitfalls.map((pitfall, idx) => (
                <li key={idx}>{pitfall}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Technical FAQ Accordions */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {recipe.faqItems.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 transition-colors open:bg-slate-50/80 dark:open:bg-slate-800/40"
              >
                <summary className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer list-none">
                  <span>{faq.question}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 7. Contextual Related Tools Interlinking */}
        {relatedTool && (
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <RelatedTools currentTool={relatedTool} />
          </section>
        )}

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-10" />
      </main>
    </div>
  );
}
