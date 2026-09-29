import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
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
  ShieldCheck,
  Zap,
  Layers,
  FileCode,
  Check,
  XCircle,
  ExternalLink,
  Code2,
  Bot,
  ShieldAlert,
  Server,
  FileText,
  Search,
  CheckSquare,
  Copy,
  Table,
} from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { AiCrawlerSnippetTabs } from "@/components/recipes/AiCrawlerSnippetTabs";
import { RecipeSolutionViewer } from "@/components/recipes/RecipeSolutionViewer";

const CANONICAL_URL = "https://omniseotools.com/recipes/how-to-block-ai-crawlers-in-robots-txt";

export const metadata: Metadata = {
  title: "How to Block AI Crawlers in Robots.txt (GPTBot, ClaudeBot, Perplexity) | OmniSEO Tools",
  description:
    "Step-by-step guide to blocking or allowing AI web scrapers and LLM training bots using robots.txt directives. Full user-agent syntax matrix for OpenAI, Anthropic, Google, and Perplexity.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "How to Block AI Crawlers in Robots.txt (GPTBot, ClaudeBot, Perplexity) | OmniSEO Tools",
    description:
      "Step-by-step guide to blocking or allowing AI web scrapers and LLM training bots using robots.txt directives. Full user-agent syntax matrix for OpenAI, Anthropic, Google, and Perplexity.",
    url: CANONICAL_URL,
    type: "article",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Block AI Crawlers in Robots.txt (GPTBot, ClaudeBot, Perplexity) | OmniSEO Tools",
    description:
      "Step-by-step guide to blocking or allowing AI web scrapers and LLM training bots using robots.txt directives. Full user-agent syntax matrix for OpenAI, Anthropic, Google, and Perplexity.",
  },
};

export default function BlockAiCrawlersRecipePage() {
  // Structured Data Schema: TechArticle + HowTo + FAQPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How to Block AI Scrapers and LLM Crawlers in Robots.txt",
        description:
          "Step-by-step guide to blocking or allowing AI web scrapers and LLM training bots using robots.txt directives. Full user-agent syntax matrix for OpenAI, Anthropic, Google, and Perplexity.",
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
        name: "How to Block AI Crawlers in Robots.txt",
        description:
          "Four-step protocol to identify AI crawlers, configure explicit user-agent blocks in robots.txt, verify HTTP headers, and validate syntax with client-side tools.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Identify Target AI Agents",
            text: "Determine whether you want to block raw model training only, or also restrict conversational AI search citations.",
            url: `${CANONICAL_URL}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Append Directives to robots.txt",
            text: "Place explicit AI bot blocks at the top of your public/robots.txt or configure them via your CMS settings.",
            url: `${CANONICAL_URL}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Verify Header Responses",
            text: "Ensure your web server returns a valid 200 OK HTTP status code and Content-Type: text/plain for the /robots.txt endpoint.",
            url: `${CANONICAL_URL}#step-3`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Test in Robots Validator",
            text: "Run your file through a client-side validator to confirm there are no syntax errors or accidental universal disallows.",
            url: `${CANONICAL_URL}#step-4`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does blocking Google-Extended remove my site from Google Search?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, Google-Extended only controls Gemini and AI training, whereas Googlebot handles search indexing.",
            },
          },
          {
            "@type": "Question",
            name: "Do all AI companies honor robots.txt directives?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Robots.txt is voluntary; major players like OpenAI, Anthropic, and Google honor it, but smaller scrapers may ignore it.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between robots.txt and llms.txt?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Robots.txt restricts bot access, while llms.txt provides clean markdown context for AI models that are allowed.",
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
            name: "How to Block AI Crawlers in Robots.txt",
            item: CANONICAL_URL,
          },
        ],
      },
    ],
  };

  const snippet1 = `User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: *
Allow: /`;

  const snippet2 = `User-agent: CCBot
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /`;

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
              Block AI Crawlers in Robots.txt
            </span>
          </nav>

          {/* Badges & Meta Metadata */}
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
              RFC 9309 Verified
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            How to Block AI Scrapers and LLM Crawlers in Robots.txt
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A definitive guide to managing AI user agents, preventing content scraping for model training, and configuring selective access directives.
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
            To block AI scrapers from indexing or training on your content without impacting your organic search rankings, declare explicit User-agent blocks followed by Disallow: / in your root robots.txt file. Standard search engine bots (like Googlebot and Bingbot) must remain allowed, while dedicated training and retrieval bots (such as GPTBot, ClaudeBot, PerplexityBot, CCBot, and Google-Extended) can be selectively restricted. Directives are case-sensitive and must precede universal wildcard rules.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* E. RESPONSIVE CTA BRIDGE CARD                                             */}
        {/* ========================================================================= */}
        <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900/60 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Generate &amp; Validate Your Robots.txt Client-Side
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Quickly toggle AI crawlers, validate syntax rules, and generate companion LLMs.txt files with zero telemetry.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/tools/robots-txt-generator-validator"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all"
              >
                <span>Open Robots.txt Validator &rarr;</span>
              </Link>
              <Link
                href="/tools/llms-txt-generator"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all"
              >
                <span>Generate LLMs.txt File</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* B. THE COMPLETE AI USER-AGENT REFERENCE MATRIX (Markdown Table)           */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <Table className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Complete AI User-Agent Reference Matrix
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Use this comprehensive reference matrix to understand the organization, exact user-agent token, primary function, and SEO safety profile for each major AI crawler:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Bot / Crawler</th>
                  <th className="py-3.5 px-4">Organization</th>
                  <th className="py-3.5 px-4">User-Agent Token</th>
                  <th className="py-3.5 px-4">Primary Function</th>
                  <th className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">Safe to Block?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">GPTBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">OpenAI</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">GPTBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">AI Model Training &amp; Data Scraping</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes (No impact on organic Google SEO)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">ChatGPT-User</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">OpenAI</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">ChatGPT-User</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Real-time browsing inside ChatGPT</td>
                  <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-medium">Yes (Blocks live user browsing)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">ClaudeBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Anthropic</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">ClaudeBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Anthropic Claude model training</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Google-Extended</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Google</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Google-Extended</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Gemini &amp; Vertex AI training data</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes (Does NOT impact Google Search index)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">PerplexityBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Perplexity AI</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">PerplexityBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Real-time web indexation for answers</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">CCBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">Common Crawl</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">CCBot</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Open-web repository used by multiple LLMs</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Bytespider</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">ByteDance</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Bytespider</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">TikTok &amp; ByteDance AI crawling</td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* C. CODE EXAMPLES (Render as Syntax-Highlighted Blocks)                    */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex items-center gap-2.5">
            <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Robots.txt AI Directives Code Examples
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Select between blocking all foundational training crawlers or implementing a selective policy that allows real-time conversational citations while rejecting bulk dataset scraping:
          </p>

          {/* Interactive Snippet Tabs Component */}
          <AiCrawlerSnippetTabs />

          {/* Side-by-side / Discrete Highlights for Snippet 1 and Snippet 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Snippet 1 Container */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Snippet 1: Block All AI Training Scrapers
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200/60 dark:border-rose-900/40">
                  Zero Scraping
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Disallow GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot, and Bytespider while allowing search engines via wildcard:
              </p>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {snippet1}
              </pre>
            </div>

            {/* Snippet 2 Container */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-emerald-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Snippet 2: Allow Citations &amp; Block Training
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/40">
                  Citation Friendly
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Disallow bulk foundation scrapers (CCBot, GPTBot) while explicitly granting access to live search bots (ChatGPT-User, PerplexityBot):
              </p>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {snippet2}
              </pre>
            </div>
          </div>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-8" />

        {/* ========================================================================= */}
        {/* D. 4-STEP IMPLEMENTATION & VERIFICATION PROTOCOL                          */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckSquare className="h-4 w-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              4-Step Implementation &amp; Verification Protocol
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Follow this verified engineering workflow to safely implement AI bot restrictions across your website without endangering organic search engine indexation:
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
                  Identify Target AI Agents
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Determine whether you want to block raw model training only (GPTBot, ClaudeBot, CCBot, Bytespider, Google-Extended), or also restrict conversational AI search citations (such as ChatGPT-User and PerplexityBot). Distinguishing between model training and real-time citation retrieval is essential to avoid cutting off referral traffic from AI search engines.
              </p>
              <div className="ml-10 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 p-3.5 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <strong>Strategic Choice:</strong> If you want your content cited as an answer in ChatGPT Search or Perplexity, keep <code>ChatGPT-User</code> and <code>PerplexityBot</code> set to <code>Allow: /</code>.
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
                  Append Directives to robots.txt
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Place explicit AI bot blocks at the top of your <code>public/robots.txt</code> file or configure them via your CMS / framework settings (such as Next.js App Router <code>app/robots.ts</code>). Ensure that specific crawler tokens precede universal wildcard rules (<code>User-agent: *</code>) to guarantee deterministic parsing across all crawler implementations.
              </p>
              <div className="ml-10 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 p-3.5 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <strong>Case Sensitivity:</strong> User-agent tokens are case-sensitive. Always write <code>GPTBot</code>, <code>ClaudeBot</code>, and <code>Google-Extended</code> with exact casing.
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
                  Verify Header Responses
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Ensure your web server returns a valid <code>HTTP 200 OK</code> status code and <code>Content-Type: text/plain</code> header for the <code>/robots.txt</code> endpoint. If your web server returns <code>Content-Type: text/html</code>, redirect chains (301/302), or HTTP 500 server errors, crawlers like Googlebot and GPTBot may treat the entire site as unreachable or completely disallowed.
              </p>
              <div className="ml-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-3.5 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-mono space-y-1">
                curl -IL https://yourdomain.com/robots.txt
                <br />
                <span className="text-emerald-600 dark:text-emerald-400">HTTP/1.1 200 OK | Content-Type: text/plain; charset=utf-8</span>
              </div>
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
                  Test in Robots Validator
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                Run your complete file through our <Link href="/tools/robots-txt-generator-validator" className="text-emerald-600 dark:text-emerald-400 font-semibold underline hover:text-emerald-500">Robots.txt Validator</Link> to confirm there are no syntax errors, malformed path expressions, or accidental universal disallow directives. The tool parses rules client-side according to RFC 9309 standards and highlights conflicting permissions instantly.
              </p>
              <div className="ml-10 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 p-3.5 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <strong>Zero Leakage:</strong> Validating client-side ensures your proprietary robots rules and unpublished staging paths are never transmitted to external analytics servers.
              </div>
            </li>
          </ol>
        </section>

        {/* ========================================================================= */}
        {/* F. STRUCTURED FAQ SECTION (Rendered HTML + Schema)                        */}
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
                Understanding crawler behavior, search engine safety, and machine readability
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs mt-0.5">Q1.</span>
                <span>Does blocking Google-Extended remove my site from Google Search?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                No, Google-Extended only controls Gemini and AI training, whereas Googlebot handles search indexing. Google has explicitly verified that Google-Extended operates as a separate standalone token. Blocking Google-Extended has zero impact on your organic search rankings, indexing status, or search snippet visibility.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs mt-0.5">Q2.</span>
                <span>Do all AI companies honor robots.txt directives?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                Robots.txt is voluntary; major players like OpenAI, Anthropic, and Google honor it, but smaller scrapers may ignore it. While reputable frontier AI labs strictly adhere to RFC 9309 robots directives, unverified web scrapers or anonymous botnets may disregard robots.txt entirely. For comprehensive defense, combine robots.txt with Cloudflare WAF bot management rules or IP rate limiting.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs mt-0.5">Q3.</span>
                <span>What is the difference between robots.txt and llms.txt?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                Robots.txt restricts bot access, while llms.txt provides clean markdown context for AI models that are allowed. In other words, robots.txt serves as the security perimeter determining which bots may crawl your endpoints, whereas <code>/llms.txt</code> acts as a token-efficient semantic map and API directory for permitted AI search agents.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Tool CTA Banner */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ready to Build Your Custom Robots.txt?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Configure AI scraper blocks, validate path syntax, and export certified files in seconds.
              </p>
            </div>
            <Link
              href="/tools/robots-txt-generator-validator"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all shrink-0"
            >
              <span>Open Robots.txt Validator</span>
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
