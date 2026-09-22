import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";
import { JsonLd } from "@/components/seo/JsonLd";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Rss, 
  ChevronRight,
  FileCode,
  Terminal
} from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Blog & Technical SEO Guides | OmniSEO",
  description:
    "In-depth engineering guides on Open Graph specifications, SERP rendering mechanics, dynamic metadata architecture, and Core Web Vitals optimization.",
  alternates: {
    canonical: "https://omniseotools.com/blog",
  },
  openGraph: {
    title: "Developer Blog & Technical SEO Guides | OmniSEO",
    description:
      "In-depth engineering guides on Open Graph specifications, SERP rendering mechanics, dynamic metadata architecture, and Core Web Vitals optimization.",
    url: "https://omniseotools.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Blog & Technical SEO Guides | OmniSEO",
    description:
      "In-depth engineering guides on Open Graph specifications, SERP rendering mechanics, dynamic metadata architecture, and Core Web Vitals optimization.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const breadcrumbs = [
    { name: "Home", url: "https://omniseotools.com" },
    { name: "Blog", url: "https://omniseotools.com/blog" },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {breadcrumbSchema && <JsonLd schema={breadcrumbSchema} />}

      {/* Hero / Header Section */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-white">Blog</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Engineering & Technical SEO Guides</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Developer Blog & Specs
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Zero-fluff technical deep-dives on Open Graph architectures, search crawler heuristics, Next.js App Router metadata, and programmatic SEO systems.
              </p>
            </div>

            {/* Sitemap / Feed Links */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-colors shadow-sm"
              >
                <Rss className="h-3.5 w-3.5 text-amber-500" />
                <span>XML Sitemap</span>
              </a>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>All 25 Tools</span>
              </Link>
            </div>
          </div>

          {/* Tag Filter Pills */}
          {allTags.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <Tag className="h-3 w-3" /> Topics:
              </span>
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
            <FileCode className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Articles Coming Soon
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Our engineering team is preparing new technical guides.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm transition-all hover:shadow-lg hover:border-emerald-500/40"
              >
                <div className="space-y-4">
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>

                    <span>•</span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 font-medium text-slate-700 dark:text-slate-300">
                      <Clock className="h-3 w-3 text-emerald-500" />
                      {post.readingTime}
                    </span>

                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 font-medium text-emerald-700 dark:text-emerald-300 text-[11px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>

                  {/* Author Bar & Action Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white uppercase">
                        {post.author.name.charAt(0)}
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                          {post.author.name}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {post.author.role}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                      <span>Read Technical Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* High-Converting Bottom Utility Callout */}
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-50/60 via-white to-slate-50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-950 p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Web Utilities</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Need Zero-Latency SEO & Marketing Tools?
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Test OpenGraph cards, simulate Google SERP snippets, construct GA4 UTM parameters, and export clean framework metadata without paywalls or account signups.
          </p>

          <div className="pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow transition-all"
            >
              <span>Explore All 25 Utilities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
