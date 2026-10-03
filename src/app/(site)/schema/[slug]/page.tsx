import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBlueprints,
  getBlueprintBySlug,
  getRelatedBlueprints,
} from "@/data/schemas-dataset";
import { SchemaCodeViewer } from "@/components/schema/SchemaCodeViewer";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  Code2,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blueprints = getAllBlueprints();
  return blueprints.map((bp) => ({
    slug: bp.slug,
  }));
}

export async function generateMetadata({ params }: SchemaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);

  if (!blueprint) {
    return {
      title: "Schema Blueprint Not Found | OmniSEO Tools",
    };
  }

  const title = `${blueprint.title} | OmniSEO Tools`;
  const description = `${blueprint.description} Copy-paste 2026 Google-compliant JSON-LD structured data and avoid GSC errors.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://omniseotools.com/schema/${blueprint.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://omniseotools.com/schema/${blueprint.slug}`,
      type: "article",
      siteName: "OmniSEOTools",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SchemaDetailPage({ params }: SchemaPageProps) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);

  if (!blueprint) {
    notFound();
  }

  const relatedBlueprints = getRelatedBlueprints(blueprint);

  // Schema.org Structured Data: TechArticle + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `https://omniseotools.com/schema/${blueprint.slug}#article`,
        headline: blueprint.title,
        description: blueprint.description,
        url: `https://omniseotools.com/schema/${blueprint.slug}`,
        datePublished: "2026-10-01T00:00:00+00:00",
        dateModified: `${blueprint.lastUpdated}T00:00:00+00:00`,
        proficiencyLevel: "Intermediate",
        dependencies: "Schema.org, JSON-LD 1.1, Google Search Central 2026",
        publisher: {
          "@type": "Organization",
          name: "OmniSEOTools",
          url: "https://omniseotools.com",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEOTools Engineering",
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
          {
            "@type": "ListItem",
            position: 3,
            name: blueprint.shortTitle,
            item: `https://omniseotools.com/schema/${blueprint.slug}`,
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

      {/* Hero Header Section */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 pb-10 pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/schema" className="hover:text-emerald-600 transition-colors">
              Schema Blueprints
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-xs">
              {blueprint.shortTitle}
            </span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 px-3 py-1">
              @{blueprint.schemaType}
            </span>
            <span className="text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1">
              {blueprint.category}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 ml-auto">
              <Clock className="h-3.5 w-3.5" />
              {blueprint.readingTime}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Updated {blueprint.lastUpdated}
            </span>
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {blueprint.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {blueprint.description}
          </p>

          {/* Target Keywords Tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Target Queries:</span>
            {blueprint.targetKeywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] font-mono rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 px-2 py-0.5 text-slate-600 dark:text-slate-400"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 space-y-12">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" />

        {/* Section 1: JSON-LD Code Block */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="h-5 w-5 text-emerald-500" />
                <span>Production JSON-LD Code Block</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Embed this structured data block directly into your HTML &lt;head&gt; or framework layout template.
              </p>
            </div>
          </div>

          <SchemaCodeViewer jsonLd={blueprint.jsonLd} schemaType={blueprint.schemaType} />
        </section>

        {/* Section 2: Typed Properties Specification Table */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-500" />
              <span>Typed Properties Specification ({blueprint.properties.length} Fields)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Key Schema.org properties and sub-objects required to qualify for rich snippet treatment in Google Search.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3.5">Property</th>
                    <th scope="col" className="px-4 sm:px-6 py-3.5">Expected Type</th>
                    <th scope="col" className="px-4 sm:px-6 py-3.5">Status</th>
                    <th scope="col" className="px-4 sm:px-6 py-3.5">Description &amp; Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {blueprint.properties.map((prop) => (
                    <tr key={prop.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 sm:px-6 py-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {prop.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                        {prop.type}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        {prop.required ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                            Required
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            Recommended
                          </span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 space-y-1.5 max-w-md">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {prop.description}
                        </p>
                        <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          e.g. {prop.exampleValue}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Google Search Console Pitfalls & Critical Warnings */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <span>Google Search Console Pitfalls &amp; Critical Warnings</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Avoid these 3 common validation traps, parser errors, and algorithmic policy penalties when deploying {blueprint.schemaType} schema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blueprint.pitfalls.map((pitfall, index) => {
              const isCritical = pitfall.severity === "critical";
              const isError = pitfall.severity === "error";

              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-2xl border p-5 flex flex-col justify-between space-y-4",
                    isCritical
                      ? "border-rose-300 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20"
                      : isError
                      ? "border-amber-300 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                          isCritical
                            ? "bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200"
                            : isError
                            ? "bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        )}
                      >
                        {pitfall.severity}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Pitfall #{index + 1}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {pitfall.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pitfall.description}
                    </p>

                    <div className="rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 p-2.5 text-[11px] space-y-1">
                      <div className="font-semibold text-rose-600 dark:text-rose-400">
                        GSC Impact:
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {pitfall.gscImpact}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Actionable Fix:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      {pitfall.solution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Recommended Use Cases */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              <span>Recommended Implementation Scenarios</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blueprint.useCases.map((uc, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">
                  {uc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Related Blueprints Internal Linking Cluster */}
        {relatedBlueprints.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Related Schema Blueprints
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Explore complementary structured data blueprints across the {blueprint.category} cluster.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedBlueprints.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/schema/${rel.slug}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                      @{rel.schemaType}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>View Blueprint</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" />
      </main>
    </div>
  );
}
