import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { 
  generateTechArticleSchema, 
  generateBreadcrumbSchema 
} from "@/lib/schema-generator";
import { JsonLd } from "@/components/seo/JsonLd";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { getToolBySlug } from "@/config/tools-registry";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles, 
  Tag, 
  User, 
  Share2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | OmniSEO",
      description: "The requested technical article could not be found.",
    };
  }

  const canonicalUrl = `https://omniseotools.com/blog/${post.slug}`;

  return {
    title: `${post.title} | OmniSEO Engineering Blog`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author.name],
      tags: post.tags,
      siteName: "OmniSEO Tools",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `https://omniseotools.com/blog/${post.slug}`;

  // Structured Data (TechArticle + Breadcrumbs)
  const techArticleSchema = generateTechArticleSchema({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: post.author,
    canonicalUrl,
    tags: post.tags,
  });

  const breadcrumbs = [
    { name: "Home", url: "https://omniseotools.com" },
    { name: "Blog", url: "https://omniseotools.com/blog" },
    { name: post.title, url: canonicalUrl },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  // Compile MDX Content with Custom Components
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  const featuredTool = post.featuredTool ? getToolBySlug(post.featuredTool) : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <JsonLd schema={[techArticleSchema, breadcrumbSchema]} />

      {/* Header & Hero */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-1">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight sm:leading-snug">
            {post.title}
          </h1>

          {/* Description Lead */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.description}
          </p>

          {/* Author & Publication Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white uppercase shadow-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-200">
                  {post.author.name}
                </div>
                <div className="text-slate-400 text-[11px]">
                  {post.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 font-medium text-slate-700 dark:text-slate-300">
                <Clock className="h-3.5 w-3.5 text-emerald-500" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Article Container */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm">
          
          {/* Rendered Prose Body */}
          <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800 prose-h2:pb-2 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-emerald-700 dark:prose-code:text-emerald-300 prose-code:bg-slate-100 dark:prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-0 prose-img:rounded-xl prose-hr:my-8 prose-hr:border-slate-200 dark:prose-hr:border-slate-800">
            {content}
          </article>

          {/* Contextual CTA for Featured Programmatic Tool */}
          {featuredTool && (
            <div className="mt-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Featured Interactive Tool
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Launch {featuredTool.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {featuredTool.shortDescription || featuredTool.tagline}
              </p>
              <div>
                <Link
                  href={`/tools/${featuredTool.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all"
                >
                  <span>Open Tool Sandbox</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Author Card Footer */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white uppercase shadow">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  Written by {post.author.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {post.author.role} • OmniSEO Tools Core Engineering
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-colors shadow-sm"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All Articles</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
