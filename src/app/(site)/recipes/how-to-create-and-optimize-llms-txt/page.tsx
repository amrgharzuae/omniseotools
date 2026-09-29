import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Clock,
  Calendar,
  ShieldCheck,
  Zap,
  Layers,
  FileCode,
  Check,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Code2,
  Bot,
  FileText,
  Search,
  CheckSquare,
  Copy,
  Table,
  Cpu,
  BookOpen,
  Terminal,
  Globe,
  Compass,
} from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { RecipeSolutionViewer } from "@/components/recipes/RecipeSolutionViewer";

const CANONICAL_URL = "https://omniseotools.com/recipes/how-to-create-and-optimize-llms-txt";

export const metadata: Metadata = {
  title: "How to Create and Optimize an llms.txt File for AI Search | OmniSEO Tools",
  description:
    "Step-by-step developer guide to the llms.txt specification. Learn how to structure Markdown indices, curate canonical URLs for AI crawlers, and drive citations in ChatGPT, Claude, and Perplexity.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "How to Create and Optimize an llms.txt File for AI Search | OmniSEO Tools",
    description:
      "Step-by-step developer guide to the llms.txt specification. Learn how to structure Markdown indices, curate canonical URLs for AI crawlers, and drive citations in ChatGPT, Claude, and Perplexity.",
    url: CANONICAL_URL,
    type: "article",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create and Optimize an llms.txt File for AI Search | OmniSEO Tools",
    description:
      "Step-by-step developer guide to the llms.txt specification. Learn how to structure Markdown indices, curate canonical URLs for AI crawlers, and drive citations in ChatGPT, Claude, and Perplexity.",
  },
};

export default function CreateOptimizeLlmsTxtRecipePage() {
  const exampleSnippet = `# OmniSEO Tools

> Free, privacy-first technical SEO toolkit and developer workbench with zero client-side tracking and client-side canvas calculations.

## Core Technical Tools
- [SERP Simulator](https://omniseotools.com/tools/google-serp-simulator): Google desktop and mobile title tag pixel-width previewer.
- [Robots.txt Validator](https://omniseotools.com/tools/robots-txt-generator-validator): Client-side robots.txt syntax checker and AI crawler rule builder.
- [JSON-LD Schema Validator](https://omniseotools.com/tools/schema-validator): Browser-based structured data linter for Rich Results compliance.
- [UTM Campaign Builder](https://omniseotools.com/tools/utm-campaign-builder): URL parameter generator formatted for GA4 and major ad platforms.

## Implementation Guides
- [AI Crawler Blocking Guide](https://omniseotools.com/recipes/how-to-block-ai-crawlers-in-robots-txt): User-agent directives for GPTBot, ClaudeBot, and Google-Extended.
- [Google Title Rewrite Guide](https://omniseotools.com/recipes/how-to-fix-google-rewriting-meta-titles): Diagnostic steps to resolve search snippet overwrites.

## Optional
- [All Tools Index](https://omniseotools.com/tools): Full catalog of 40+ client-side SEO utilities.`;

  // Structured Data Schema: TechArticle + HowTo + FAQPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How to Create and Optimize an llms.txt File for AI Citation",
        description:
          "Step-by-step developer guide to the llms.txt specification. Learn how to structure Markdown indices, curate canonical URLs for AI crawlers, and drive citations in ChatGPT, Claude, and Perplexity.",
        url: CANONICAL_URL,
        datePublished: "2026-09-01T00:00:00+00:00",
        dateModified: "2026-09-29T00:00:00+00:00",
        inLanguage: "en-US",
        author: {
          "@type": "Organization",
          name: "OmniSEO Tools",
          url: "https://omniseotools.com",
        },
        publisher: {
          "@type": "Organization",
          name: "OmniSEO Tools",
          url: "https://omniseotools.com",
        },
        mainEntityOfPage: CANONICAL_URL,
      },
      {
        "@type": "HowTo",
        name: "How to Create and Optimize an llms.txt File",
        description:
          "Five-step protocol to curate high-value canonical URLs, draft factual entity summaries, structure optional breakpoints, configure HTTP MIME headers, and align with robots.txt rules.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Curate Canonical URLs",
            text: "Select 5 to 15 authoritative URLs that represent your core products, APIs, or educational recipes. Avoid dumping an entire sitemap.",
            url: `${CANONICAL_URL}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Draft Concise Factual Descriptions",
            text: "Write plain-text summaries without marketing fluff so language models extract clear semantic signals.",
            url: `${CANONICAL_URL}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Structure Optional Breakpoints",
            text: "Place supplementary resources beneath an ## Optional heading so agents can truncate gracefully when context windows are limited.",
            url: `${CANONICAL_URL}#step-3`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Verify HTTP Response Headers",
            text: "Host the file at /llms.txt and ensure your server delivers Content-Type: text/markdown; charset=utf-8 or text/plain.",
            url: `${CANONICAL_URL}#step-4`,
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Align with robots.txt",
            text: "Verify that robots.txt does not inadvertently block the URLs highlighted in your llms.txt index.",
            url: `${CANONICAL_URL}#step-5`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does Google Search use llms.txt for search rankings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, Google Search relies on standard HTML indexing, meta tags, and structured data (JSON-LD); llms.txt is aimed at AI assistants, autonomous agents, and LLM inference pipelines (ChatGPT, Claude, Perplexity, Cursor, Copilot).",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between llms.txt and llms-full.txt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "llms.txt is a curated map/index of links with short descriptions designed for quick context routing. In contrast, llms-full.txt concatenates entire documentation sets, API specs, or knowledge bases into a single comprehensive Markdown file for deep model ingestion.",
            },
          },
          {
            "@type": "Question",
            name: "Can I block an AI bot in robots.txt and still use llms.txt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If robots.txt disallows a bot from crawling a page (e.g. Disallow: /docs), the bot cannot fetch the page regardless of whether it is listed in llms.txt. Robots.txt always acts as the authoritative gatekeeper for crawler access.",
            },
          },
        ],
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
            name: "How to Create and Optimize an llms.txt File",
            item: CANONICAL_URL,
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
              How to Create &amp; Optimize llms.txt
            </span>
          </nav>

          {/* Badges & Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold">
            <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <Bot className="h-3 w-3" />
              AI &amp; Crawlers
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              4 min read
            </span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              Updated September 2026
            </span>
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              llmstxt.org Specification
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            How to Create and Optimize an llms.txt File for AI Citation
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A developer guide to structuring markdown indices, managing AI context windows, and configuring machine-readable discovery files.
          </p>
        </div>
      </section>

      {/* Main Recipe Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10 space-y-12">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-2" />

        {/* ========================================================================= */}
        {/* A. DIRECT ANSWER BOX (Top Callout Container for AI Extraction)            */}
        {/* ========================================================================= */}
        <section
          id="direct-answer"
          className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6 sm:p-7 shadow-xs space-y-3"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white shadow-xs">
              <Zap className="h-4 w-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Quick Answer
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            An llms.txt file is a standardized Markdown document placed at the root of a domain (e.g., <code>domain.com/llms.txt</code>) that provides Large Language Models (LLMs) and autonomous AI search agents with a curated, lightweight index of your website&apos;s highest-value canonical content. Unlike robots.txt, which restricts crawler access, llms.txt is a discovery and context-optimization format designed to help AI models like ChatGPT, Claude, and Perplexity parse documentation without the overhead of HTML navigation bars, CSS, or scripts.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* F. RESPONSIVE CTA BRIDGE CARD                                             */}
        {/* ========================================================================= */}
        <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900/60 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Generate Your llms.txt File in Seconds
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Build a spec-compliant llms.txt file client-side, select your canonical routes, and export cleanly formatted markdown.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/tools/llms-txt-generator"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
              >
                <span>Open LLMs.txt Generator &rarr;</span>
              </Link>
              <Link
                href="/tools/robots-txt-generator-validator"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all"
              >
                <span>Validate Robots.txt Rules</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* B. THE SPECIFICATION ARCHITECTURE (Standard Markdown Layout)              */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The llms.txt Specification Architecture
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            According to the standardized <a href="https://llmstxt.org" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-semibold underline">llmstxt.org proposal</a>, an <code>/llms.txt</code> file must follow a strict 5-layer Markdown hierarchy to ensure automated LLM parsers extract semantic relationships without confusion:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-xs font-mono">1</span>
                <span>Primary H1 Heading</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The canonical name of the project, brand, or organization (e.g., <code># OmniSEO Tools</code>). Must appear exactly once at the top of the file.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-xs font-mono">2</span>
                <span>Blockquote Summary</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A 1-to-3 sentence factual description enclosed in Markdown blockquote syntax (<code>&gt;</code>) directly beneath the H1, highlighting core value props and domain positioning.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-xs font-mono">3</span>
                <span>Category Sections (H2 Headers)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Organized groups of resources categorized by domain utility, such as <code>## Core Technical Tools</code>, <code>## API Endpoints</code>, or <code>## Documentation</code>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-xs font-mono">4</span>
                <span>Canonical Link List &amp; Descriptions</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Clean markdown links (<code>- [Anchor](https://...)</code>) followed by an optional descriptive summary after a colon (<code>: Concise feature description</code>).
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 p-5 space-y-2.5 shadow-xs md:col-span-2">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-xs font-mono">5</span>
                <span>Optional Content Breakpoint (## Optional)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Secondary or supplementary URLs that autonomous AI agents can safely discard if token budgets or context window constraints are encountered during inference.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* C. READY-TO-COPY EXAMPLE SNIPPET                                         */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Ready-to-Copy Production Example Snippet
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Below is a practical, compliant <code>/llms.txt</code> file illustrating proper H1 naming, blockquote summary, categorized resource links, and the optional breakpoint:
          </p>

          <RecipeSolutionViewer
            solutionSnippet={exampleSnippet}
            snippetLanguage="markdown"
            relatedToolSlug="llms-txt-generator"
            relatedToolName="LLMs.txt Generator"
            relatedToolCta="Build Custom llms.txt in Tool #34"
          />
        </section>

        {/* Mid-Content AdSlot */}
        <AdSlot slotType="in-feed" className="my-8" />

        {/* ========================================================================= */}
        {/* D. STEP-BY-STEP IMPLEMENTATION GUIDE (<ol> for HowTo schema)             */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckSquare className="h-4 w-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              5-Step Implementation &amp; Optimization Guide
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Follow these verified engineering steps to create, validate, and serve an optimal <code>/llms.txt</code> file for AI search engines:
          </p>

          <ol className="space-y-6 list-none p-0">
            {/* Step 1 */}
            <li
              id="step-1"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono shrink-0">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Curate Canonical URLs
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Select 5 to 15 authoritative URLs that represent your core products, APIs, documentation hubs, or educational recipes. Avoid dumping an entire sitemap: LLMs perform best when presented with high-density, authoritative entry points rather than thousands of paginated query URLs.
              </p>
              <div className="ml-10 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <strong>Best Practice:</strong> Point links directly to clean pages or dedicated raw Markdown documentation endpoints (e.g. <code>/docs/api.md</code>) to minimize inference overhead.
              </div>
            </li>

            {/* Step 2 */}
            <li
              id="step-2"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono shrink-0">
                  2
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Draft Concise Factual Descriptions
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Write plain-text summaries without marketing fluff so language models extract clear semantic signals. Focus on factual entity capabilities, key features, input/output data formats, and intended use cases rather than promotional buzzwords.
              </p>
              <div className="ml-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-3.5 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-mono space-y-1">
                <span className="text-rose-600 dark:text-rose-400">- [Tool](...): The most groundbreaking, revolutionary AI platform in the world. (Avoid)</span>
                <br />
                <span className="text-emerald-600 dark:text-emerald-400">- [Tool](...): Client-side structured data linter for Rich Results compliance. (Recommended)</span>
              </div>
            </li>

            {/* Step 3 */}
            <li
              id="step-3"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono shrink-0">
                  3
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Structure Optional Breakpoints
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Place supplementary resources beneath an <code>## Optional</code> heading so agents can truncate gracefully when context windows are limited. AI agents running low on available context tokens are instructed by the specification to drop the <code>## Optional</code> section first while preserving core links.
              </p>
            </li>

            {/* Step 4 */}
            <li
              id="step-4"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono shrink-0">
                  4
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Verify HTTP Response Headers
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Host the file at <code>/llms.txt</code> at the root of your domain and ensure your web server delivers a valid <code>HTTP 200 OK</code> status code with <code>Content-Type: text/markdown; charset=utf-8</code> or <code>text/plain; charset=utf-8</code> headers.
              </p>
              <div className="ml-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-3.5 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-mono space-y-1">
                curl -IL https://yourdomain.com/llms.txt
                <br />
                <span className="text-emerald-600 dark:text-emerald-400">HTTP/1.1 200 OK | Content-Type: text/markdown; charset=utf-8</span>
              </div>
            </li>

            {/* Step 5 */}
            <li
              id="step-5"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono shrink-0">
                  5
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Align with robots.txt Rules
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Verify that your <code>robots.txt</code> file does not inadvertently block the URLs highlighted in your <code>llms.txt</code> index. If robots.txt specifies <code>Disallow: /docs</code>, citation crawlers like <code>OAI-SearchBot</code> or <code>PerplexityBot</code> will be barred from crawling those destinations even if listed in llms.txt.
              </p>
              <div className="ml-10 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 p-3.5 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <strong>Pro Tip:</strong> Add a comment link in your <code>robots.txt</code> pointing to your llms.txt (e.g. <code># LLMs Context: https://yourdomain.com/llms.txt</code>) to facilitate discovery.
              </div>
            </li>
          </ol>
        </section>

        {/* ========================================================================= */}
        {/* E. COMPARISON TABLE: robots.txt vs. sitemap.xml vs. llms.txt             */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Table className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Comparison: robots.txt vs. sitemap.xml vs. llms.txt
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Understanding the distinction between discovery, crawl control, and semantic context protocols:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Protocol</th>
                  <th className="py-3.5 px-4">Primary Audience</th>
                  <th className="py-3.5 px-4">File Format</th>
                  <th className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">Core Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">robots.txt</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">All Search &amp; AI Crawlers</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">Plain text directives</td>
                  <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200 font-medium">Access control (Allow / Disallow)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">sitemap.xml</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Search Engine Bots (Googlebot, Bingbot)</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">XML</td>
                  <td className="py-3.5 px-4 text-slate-800 dark:text-slate-200 font-medium">Exhaustive discovery and indexing of all URLs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">llms.txt</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">AI Agents &amp; LLM Inference Engines</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Markdown</td>
                  <td className="py-3.5 px-4 text-emerald-700 dark:text-emerald-300 font-medium">Curated context and canonical source citation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* G. STRUCTURED FAQ SECTION (Rendered HTML + Schema)                        */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Understanding llms.txt mechanics, search engine indexing, and AI agent discovery
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <details
              className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-emerald-500/20"
              open
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>Does Google Search use llms.txt for search rankings?</span>
                <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                No, Google Search relies on standard HTML indexing, meta tags, and structured data (JSON-LD); llms.txt is aimed at AI assistants, autonomous agents, and LLM inference pipelines (ChatGPT, Claude, Perplexity, Cursor, Copilot). While it doesn&apos;t directly influence Googlebot rankings, it directly improves your site&apos;s visibility and citation frequency inside AI-generated answers.
              </p>
            </details>

            <details
              className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-emerald-500/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>What is the difference between llms.txt and llms-full.txt?</span>
                <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                <code>/llms.txt</code> is a curated map/index of links with short descriptions designed for quick context routing. In contrast, <code>/llms-full.txt</code> concatenates entire documentation sets, API specs, or knowledge bases into a single comprehensive Markdown file for deep model ingestion when agents have large context windows available.
              </p>
            </details>

            <details
              className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-emerald-500/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>Can I block an AI bot in robots.txt and still use llms.txt?</span>
                <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                If robots.txt disallows a bot from crawling a page (e.g., <code>Disallow: /docs</code>), the bot cannot fetch the page regardless of whether it is listed in llms.txt. Robots.txt always acts as the authoritative gatekeeper for crawler access. Ensure citation crawlers (like <code>OAI-SearchBot</code> and <code>PerplexityBot</code>) are permitted in robots.txt to realize the benefits of llms.txt.
              </p>
            </details>
          </div>
        </section>

        {/* Bottom Tool CTA Banner */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ready to Generate Your llms.txt File?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Customize strategies, select bot permissions, and export clean Markdown in our free generator.
              </p>
            </div>
            <Link
              href="/tools/llms-txt-generator"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all shrink-0"
            >
              <span>Open LLMs.txt Generator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
