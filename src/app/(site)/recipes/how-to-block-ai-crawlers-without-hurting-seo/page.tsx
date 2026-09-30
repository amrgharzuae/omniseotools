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
  Info,
  BookOpen,
  Terminal,
  Cpu,
  Globe,
} from "lucide-react";
import { AdSlot } from "@/components/ads/AdSlot";
import { AiDefenseSnippetTabs } from "@/components/recipes/AiDefenseSnippetTabs";

const CANONICAL_URL = "https://omniseotools.com/recipes/how-to-block-ai-crawlers-without-hurting-seo";

export const metadata: Metadata = {
  title: "How to Block AI Scrapers Without Hurting Google SEO | OmniSEO Tools",
  description:
    "Learn how to stop aggressive AI crawlers (GPTBot, ClaudeBot, Bytespider) and protect server bandwidth without blocking Googlebot or tanking search rankings.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "How to Block AI Scrapers Without Hurting Google SEO | OmniSEO Tools",
    description:
      "Learn how to stop aggressive AI crawlers (GPTBot, ClaudeBot, Bytespider) and protect server bandwidth without blocking Googlebot or tanking search rankings.",
    url: CANONICAL_URL,
    type: "article",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Block AI Scrapers Without Hurting Google SEO | OmniSEO Tools",
    description:
      "Learn how to stop aggressive AI crawlers (GPTBot, ClaudeBot, Bytespider) and protect server bandwidth without blocking Googlebot or tanking search rankings.",
  },
};

export default function BlockAiCrawlersWithoutHurtingSeoRecipePage() {
  const publishDate = "2026-09-30T00:00:00+00:00";
  const modifiedDate = "2026-09-30T00:00:00+00:00";

  // Structured Data Schema: TechArticle + HowTo + FAQPage + BreadcrumbList
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: "How to Block AI Scrapers Without Hurting Google SEO",
        description:
          "Learn how to stop aggressive AI crawlers (GPTBot, ClaudeBot, Bytespider) and protect server bandwidth without blocking Googlebot or tanking search rankings.",
        url: CANONICAL_URL,
        datePublished: publishDate,
        dateModified: modifiedDate,
        inLanguage: "en-US",
        author: {
          "@type": "Organization",
          name: "OmniSEO Engineering Team",
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
            name: "Recipes",
            item: "https://omniseotools.com/recipes",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Block AI Scrapers Without Hurting SEO",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Implement a 3-Layer Defense Against AI Crawlers Without Harming Search SEO",
        description:
          "Complete architectural protocol for distinguishing search indexers from LLM training scrapers, configuring robots.txt exclusions, and enforcing edge firewall blocks.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Distinguish Search Indexers from AI Training Bots",
            text: "Separate search engine crawlers (Googlebot, Bingbot) from AI training scrapers (Google-Extended, GPTBot, ClaudeBot). Never use blanket wildcards.",
            url: `${CANONICAL_URL}#section-distinction`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Deploy Advisory Layer 1: robots.txt REP Rules",
            text: "Add granular Disallow directives in robots.txt for polite foundation model crawlers like GPTBot, ClaudeBot, Google-Extended, and Applebot-Extended.",
            url: `${CANONICAL_URL}#section-layer1`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Deploy Edge Interception Layer 2: Cloudflare WAF or Nginx",
            text: "Create a Cloudflare Custom WAF Rule or Nginx user-agent map returning HTTP 444 or 403 to drop rogue crawlers (Bytespider, CCBot) before they hit origin compute.",
            url: `${CANONICAL_URL}#section-layer2`,
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Deploy Application Runtime Layer 3: Next.js Edge Middleware",
            text: "Configure middleware.ts in Next.js to inspect the incoming User-Agent header and return an immediate 403 response in <2ms before React Server Components execute.",
            url: `${CANONICAL_URL}#section-layer3`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Does blocking Google-Extended harm my Google Search rankings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Google explicitly separates Googlebot (responsible for web crawling, indexing, and ranking in Google Search) from Google-Extended (used solely to train generative AI models like Gemini and Vertex AI). Disallowing Google-Extended in robots.txt or edge firewalls has zero negative impact on your Google Search visibility or organic keyword rankings.",
            },
          },
          {
            "@type": "Question",
            name: "Why does robots.txt fail to stop scrapers like Bytespider?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "robots.txt (RFC 9309) is an advisory standard with no built-in technical enforcement. Rogue scrapers, automated content harvesters, and high-frequency crawlers like ByteDance's Bytespider frequently ignore robots.txt entirely. To stop them from exhausting CPU and database connections, you must enforce HTTP 403 blocks or HTTP 444 connection drops at the CDN edge (Cloudflare) or web server (Nginx/Next.js).",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between GPTBot and ChatGPT-User?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "GPTBot is OpenAI's bulk offline crawler that ingests billions of web pages to train future foundation models (GPT-4/GPT-5). ChatGPT-User is a real-time browsing bot dispatched only when an end-user prompts ChatGPT to search or summarize a live URL. Blocking GPTBot protects your training data, while allowing ChatGPT-User ensures your brand receives search citations and referral links in ChatGPT answers.",
            },
          },
          {
            "@type": "Question",
            name: "How can I block AI bots without accidentally blocking Googlebot mobile renderers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Always filter bots using specific, case-insensitive substring tokens (e.g. 'GPTBot', 'ClaudeBot', 'Bytespider') rather than generic words like 'bot' or 'crawler'. Additionally, when using Cloudflare WAF, append 'and not cf.client.bot' to your rule expression, which validates Googlebot, Bingbot, and Applebot requests via reverse DNS and cryptographic verification.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header */}
      <header className="relative border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/60 pt-8 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto pb-1"
          >
            <Link href="/" className="hover:text-rose-600 transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <Link href="/recipes" className="hover:text-rose-600 transition-colors shrink-0">
              Recipes
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
              Block AI Scrapers Without Hurting SEO
            </span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300/60 dark:border-rose-800/60 shadow-xs">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>AI Crawler &amp; Scraper Mitigation</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60 shadow-xs">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Googlebot Safe</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              How to Block AI Scrapers Without Hurting Google SEO
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Learn how to stop aggressive AI crawlers (GPTBot, ClaudeBot, Bytespider, CCBot) from stealing training data and exhausting server CPU—without accidentally blocking Googlebot, losing organic search rankings, or breaking AI search citations.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-rose-500" />
                <span>7 min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Updated September 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Engineered by OmniSEO Team</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Direct Answer Summary Box */}
        <section className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-50/60 via-white to-slate-50 dark:from-rose-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm my-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600 text-white font-bold text-xs">
              <Info className="h-4 w-4" />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Direct Answer: The Golden Rule of AI Scraper Blocking
            </h2>
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
            To block AI scrapers without harming SEO, you must <strong>distinguish model training tokens from search indexing tokens</strong>. Blocking <code>Google-Extended</code>, <code>GPTBot</code>, or <code>ClaudeBot</code> stops LLM training ingestion but has <strong>zero negative effect on Google Search rankings</strong>. Furthermore, because <code>robots.txt</code> is an advisory standard ignored by rogue scrapers (like ByteDance's <code>Bytespider</code>), modern web architectures require a <strong>3-layer defense</strong>: (1) <code>robots.txt</code> for polite models, (2) Cloudflare WAF / Nginx HTTP 444 drops at the edge, and (3) Next.js <code>middleware.ts</code> to prevent React Server Components and database queries from executing on unthrottled crawl floods.
          </p>
        </section>

        {/* Article Body */}
        <article className="space-y-12 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1: The Critical Distinction */}
          <section id="section-distinction" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  1. The Critical Distinction: Search Indexers vs AI Training Bots
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Never use wildcard disallows. Understand which bot tokens control search visibility vs training data.
                </p>
              </div>
            </div>

            <p>
              The most common and catastrophic mistake engineering teams make when blocking AI scrapers is using blanket wildcards (<code>User-agent: * Disallow: /</code>) or blocking user-agent tokens containing generic substrings like <code>bot</code>. This immediately de-indexes your domain from Google Search, Bing, and major search discovery platforms.
            </p>

            <p>
              Major search engines and AI research laboratories maintain <strong>strict token separation</strong> between web search indexing crawlers and foundational generative AI training harvesters:
            </p>

            {/* Token Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              
              {/* Google */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Google Ecosystem</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Alphabet</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 block">Googlebot</span>
                    <span className="text-slate-600 dark:text-slate-400">Crawls web pages for Google Search indexation &amp; snippets. <strong>Never block this.</strong></span>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                    <span className="font-mono font-bold text-rose-800 dark:text-rose-300 block">Google-Extended</span>
                    <span className="text-slate-600 dark:text-slate-400">Used to train Gemini and Vertex AI foundation models. <strong>Safe to block without SEO penalty.</strong></span>
                  </div>
                </div>
              </div>

              {/* OpenAI */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">OpenAI Ecosystem</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">OpenAI</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                    <span className="font-mono font-bold text-rose-800 dark:text-rose-300 block">GPTBot</span>
                    <span className="text-slate-600 dark:text-slate-400">Bulk offline harvester for GPT-4/GPT-5 model weights. <strong>Safe to block.</strong></span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                    <span className="font-mono font-bold text-amber-800 dark:text-amber-300 block">ChatGPT-User</span>
                    <span className="text-slate-600 dark:text-slate-400">On-demand live browsing when users ask ChatGPT questions. <strong>Allow for search citations.</strong></span>
                  </div>
                </div>
              </div>

              {/* Apple */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Apple Ecosystem</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">Apple</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 block">Applebot</span>
                    <span className="text-slate-600 dark:text-slate-400">Powers Siri, Spotlight, and Safari Search suggestions. <strong>Keep allowed.</strong></span>
                  </div>
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                    <span className="font-mono font-bold text-rose-800 dark:text-rose-300 block">Applebot-Extended</span>
                    <span className="text-slate-600 dark:text-slate-400">Trains Apple Intelligence foundation models. <strong>Safe to block.</strong></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Technical Verification Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold text-slate-800 dark:text-slate-200">
                    <th className="p-3.5">User-Agent Token</th>
                    <th className="p-3.5">Operator</th>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5">Impact on Google SEO?</th>
                    <th className="p-3.5">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold font-mono text-emerald-600 dark:text-emerald-400">Googlebot</td>
                    <td className="p-3.5">Google</td>
                    <td className="p-3.5">Web Search &amp; Discovery Indexing</td>
                    <td className="p-3.5 font-bold text-rose-600 dark:text-rose-400">CRITICAL (De-indexes site)</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">ALWAYS ALLOW</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">Google-Extended</td>
                    <td className="p-3.5">Google</td>
                    <td className="p-3.5">Gemini / Vertex AI LLM Training</td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">ZERO impact on Search</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">BLOCK (If opt-out)</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">GPTBot</td>
                    <td className="p-3.5">OpenAI</td>
                    <td className="p-3.5">Offline GPT Foundation Training</td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">ZERO impact on Search</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">BLOCK (If opt-out)</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">ChatGPT-User</td>
                    <td className="p-3.5">OpenAI</td>
                    <td className="p-3.5">Real-Time Search &amp; User Citations</td>
                    <td className="p-3.5 text-amber-600 dark:text-amber-400 font-medium">Blocks AI Search Referrals</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">ALLOW (For Citations)</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold font-mono text-rose-600 dark:text-rose-400">Bytespider</td>
                    <td className="p-3.5">ByteDance</td>
                    <td className="p-3.5">Aggressive High-Frequency Scraper</td>
                    <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-medium">ZERO search value</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded font-bold bg-rose-600 text-white">HARD EDGE BLOCK</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: Why robots.txt Is Not Enough */}
          <section id="section-honor-system" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <AlertOctagon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  2. Why robots.txt Is Not Enough: The Honor-System Vulnerability
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  RFC 9309 is purely advisory. Uncontrolled scrapers drain server CPU and Vercel serverless budgets.
                </p>
              </div>
            </div>

            <p>
              The <strong>Robots Exclusion Protocol (RFC 9309)</strong> is a voluntary gentleman&apos;s agreement. When a crawler visits your site, it initiates an HTTP <code>GET /robots.txt</code> request. If your file contains <code>User-agent: GPTBot Disallow: /</code>, well-behaved crawlers parse the syntax, terminate their session, and avoid crawling your content.
            </p>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-5 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>The Three Core Failure Modes of robots.txt</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                <li>
                  <strong>Rogue Scrapers Ignore Disallow Directives:</strong> Entities such as ByteDance&apos;s <code>Bytespider</code>, shadow AI extractors, and content scrapers regularly ignore robots.txt disallows, hitting origin endpoints at 50+ requests per second.
                </li>
                <li>
                  <strong>Uncached Scrapes Trigger Heavy React Server Components:</strong> In Next.js App Router and dynamic CMS setups, each scraper hit triggers database queries, Prisma ORM operations, and Server-Side Rendering (SSR), consuming significant server CPU.
                </li>
                <li>
                  <strong>Bandwidth &amp; Serverless Cost Spikes:</strong> On platforms like Vercel, AWS Lambda, or Cloudflare Workers, millions of scraper requests translate directly into elevated monthly serverless duration and bandwidth invoices.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: The 3-Layer Defense Architecture */}
          <section id="section-3layer" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  3. The 3-Layer Defense Architecture: Defense-in-Depth
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Combining advisory protocol, edge network firewalls, and application middleware
                </p>
              </div>
            </div>

            <p>
              To protect proprietary content, preserve server bandwidth, and prevent CPU spikes while guaranteeing 100% Googlebot uptime, adopt a <strong>defense-in-depth architecture</strong> across three distinct infrastructure tiers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Layer 1 */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      LAYER 1
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">Advisory</span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    robots.txt Protocol
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Provides clean, RFC 9309-compliant Disallow directives for polite commercial models (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended).
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">
                  ✓ Establishes legal &amp; advisory boundary
                </div>
              </div>

              {/* Layer 2 */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20 p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white">
                      LAYER 2
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">Network Edge</span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Cloudflare WAF / Nginx
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Intercepts TCP handshakes at the CDN edge. Returns HTTP 403 or Nginx non-standard <code>return 444;</code> to drop sockets with zero outbound bytes.
                  </p>
                </div>
                <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 font-semibold">
                  ✓ Saves 100% origin CPU &amp; egress bandwidth
                </div>
              </div>

              {/* Layer 3 */}
              <div className="rounded-2xl border border-rose-500/30 bg-rose-50/30 dark:bg-rose-950/20 p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                      LAYER 3
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">Application Edge</span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Next.js Edge Middleware
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Executes on the V8 Edge Runtime in &lt;2ms. Intercepts matched User-Agents and returns 403 before React Server Components or database queries run.
                  </p>
                </div>
                <div className="pt-2 border-t border-rose-500/20 text-[11px] text-rose-800 dark:text-rose-300 font-semibold">
                  ✓ Protects serverless runtime quotas
                </div>
              </div>

            </div>
          </section>

          {/* Section 4: Multi-Layer Code Snippets Component */}
          <section id="section-snippets" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  4. Production Code Snippets: Next.js, Cloudflare, Nginx &amp; Robots.txt
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ready-to-deploy configuration files for each layer of your infrastructure
                </p>
              </div>
            </div>

            {/* Embedded Interactive Code Snippet Tabs */}
            <AiDefenseSnippetTabs />
          </section>

          {/* Section 5: Interactive Tool Bridge CTA */}
          <section className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold font-mono">
                  <Sparkles className="h-3 w-3" />
                  <span>Interactive Rule Generator</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Configure Your Custom AI Firewall in Seconds
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use our client-side <strong>AI Crawler Firewall &amp; Rule Generator (Tool #43)</strong> to select target AI bots, test User-Agent headers live, and export verified Cloudflare WAF, Next.js Middleware, Nginx, or Robots.txt snippets with zero telemetry.
                </p>
              </div>

              <Link
                href="/tools/ai-crawler-firewall"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg shadow-rose-900/40 transition-all shrink-0 hover:scale-105"
              >
                <span>Open AI Crawler Firewall</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Platform Preset Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <Link
                href="/tools/ai-crawler-firewall/cloudflare"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-amber-400" />
                  <span className="font-bold">Cloudflare WAF Guide</span>
                </div>
                <ArrowRight className="h-3 w-3 text-slate-400" />
              </Link>

              <Link
                href="/tools/ai-crawler-firewall/nextjs"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-indigo-400" />
                  <span className="font-bold">Next.js Edge Setup</span>
                </div>
                <ArrowRight className="h-3 w-3 text-slate-400" />
              </Link>

              <Link
                href="/tools/ai-crawler-firewall/nginx"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-rose-400" />
                  <span className="font-bold">Nginx 444 Drops</span>
                </div>
                <ArrowRight className="h-3 w-3 text-slate-400" />
              </Link>

              <Link
                href="/tools/robots-txt-generator-validator"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold">Robots.txt Validator</span>
                </div>
                <ArrowRight className="h-3 w-3 text-slate-400" />
              </Link>
            </div>
          </section>

          {/* Section 6: Common Pitfalls */}
          <section id="section-pitfalls" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  5. Common Pitfalls &amp; High-Risk SEO Errors
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Avoid these mistakes to prevent collateral damage to your organic search rankings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Blocking Static JS &amp; CSS Resources</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Googlebot requires access to CSS stylesheets, image assets, and JavaScript bundles to properly render modern web pages for mobile-first indexing. Never block static assets in your firewall matcher or robots.txt.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Enabling Cloudflare Managed Toggle Blindly</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The generic one-click &quot;Block AI Scrapers&quot; toggle in Cloudflare acts as an unconfigurable blunt instrument, blocking AI search citation bots like Perplexity alongside training scrapers. Use custom WAF expressions instead.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Using Fuzzy Regex on &quot;Bot&quot; Substrings</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Writing generic expressions like <code>/bot/i</code> will match legitimate search engine agents like <code>Googlebot</code>, <code>Bingbot</code>, <code>Twitterbot</code>, and <code>Slackbot</code>. Always match explicit, unambiguous bot tokens.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span>Returning 200 OK with Client-Side JS Redirects</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Returning an HTTP 200 OK response with a JavaScript-based redirect fails against headless scrapers (which do not execute JS) while continuing to consume origin compute. Always issue strict HTTP 403 or HTTP 444 status codes.
                </p>
              </div>

            </div>
          </section>

          {/* Section 7: Frequently Asked Questions */}
          <section id="section-faq" className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Technical clarity on search engine indexing, AI training, and edge firewalls
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">Q1.</span>
                  <span>Does blocking Google-Extended harm my Google Search rankings?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  <strong>No.</strong> Google explicitly separates <code>Googlebot</code> (responsible for crawling, indexing, and ranking in Google Search) from <code>Google-Extended</code> (used solely to train generative AI foundation models like Gemini and Vertex AI). Disallowing <code>Google-Extended</code> in robots.txt or edge firewalls has zero negative impact on your Google Search visibility or organic keyword rankings.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">Q2.</span>
                  <span>Why does robots.txt fail to stop scrapers like Bytespider?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  robots.txt (RFC 9309) is an advisory standard with no built-in technical enforcement. Rogue scrapers, automated content harvesters, and high-frequency crawlers like ByteDance&apos;s <code>Bytespider</code> frequently ignore robots.txt entirely. To stop them from exhausting CPU and database connections, you must enforce HTTP 403 blocks or HTTP 444 connection drops at the CDN edge (Cloudflare) or web server (Nginx / Next.js middleware).
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">Q3.</span>
                  <span>What is the difference between GPTBot and ChatGPT-User?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  <code>GPTBot</code> is OpenAI&apos;s bulk offline crawler that ingests billions of web pages to train future foundation models (GPT-4/GPT-5). <code>ChatGPT-User</code> is a real-time browsing bot dispatched only when an end-user prompts ChatGPT to search or summarize a live URL. Blocking GPTBot protects your training data, while allowing ChatGPT-User ensures your brand receives search citations and referral links in ChatGPT answers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2 shadow-sm">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">Q4.</span>
                  <span>How can I block AI bots without accidentally blocking Googlebot mobile renderers?</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  Always filter bots using specific, case-insensitive substring tokens (e.g. <code>GPTBot</code>, <code>ClaudeBot</code>, <code>Bytespider</code>) rather than generic words like <code>bot</code> or <code>crawler</code>. Additionally, when using Cloudflare WAF, append <code>and not cf.client.bot</code> to your rule expression, which validates Googlebot, Bingbot, and Applebot requests via reverse DNS and cryptographic verification.
                </p>
              </div>

            </div>
          </section>

          {/* Secondary Ecosystem Links */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Explore Complementary SEO &amp; Developer Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/tools/llms-txt-generator"
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-rose-500 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">llms.txt Generator</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Structure markdown for AI engines</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <Link
                href="/tools/robots-txt-generator-validator"
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-rose-500 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Robots.txt Validator</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Lint RFC 9309 crawler syntax</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <Link
                href="/tools/xml-sitemap-generator"
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-rose-500 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">XML Sitemap Generator</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Audit search indexation URLs</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            </div>
          </section>

        </article>

        {/* Bottom AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
