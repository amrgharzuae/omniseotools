import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Table,
  CheckCircle2,
  Code2,
  ArrowRight,
  ChevronRight,
  ListOrdered,
  Globe,
  ExternalLink,
  ShieldAlert,
  Search,
  FileCode,
  AlertTriangle,
  Bot,
  Layers,
  Sparkles,
  Share2,
} from "lucide-react";

export interface RobotsFaqItem {
  question: string;
  answer: string;
}

export const ROBOTS_FAQS: RobotsFaqItem[] = [
  {
    question: "Where should the robots.txt file be uploaded on a website?",
    answer:
      "The robots.txt file must reside at the root directory of your website domain so it is publicly accessible at https://yourdomain.com/robots.txt. Subdirectory files (such as https://yourdomain.com/blog/robots.txt) are completely ignored by search engine crawlers.",
  },
  {
    question: "Does robots.txt guarantee that a page will not appear in Google search results?",
    answer:
      "No. Robots.txt prevents search engines from crawling and downloading page contents, but Google can still index the URL if other websites or internal links point to it. To guarantee a page is never indexed, allow Googlebot to crawl the page and serve an HTML meta tag `<meta name='robots' content='noindex'>` or an HTTP header `X-Robots-Tag: noindex`.",
  },
  {
    question: "How do I block OpenAI GPTBot and Anthropic Claude without affecting Google rankings?",
    answer:
      "Add dedicated User-agent blocks with `Disallow: /` for AI scrapers (`GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`). Because standard search crawlers (Googlebot, Bingbot) only follow rules under `User-agent: *` or their own named blocks, blocking AI bots has zero negative impact on your Google Search rankings.",
  },
  {
    question: "What is the purpose of the Google-Extended and Applebot-Extended tokens?",
    answer:
      "`Google-Extended` allows webmasters to opt out of Google Gemini and Vertex AI foundational training while remaining fully indexed in standard Google Search. Similarly, `Applebot-Extended` blocks Apple Intelligence training while retaining Siri and Spotlight indexing.",
  },
  {
    question: "What is the difference between Allow and Disallow when paths overlap?",
    answer:
      "Googlebot and modern search crawlers resolve path conflicts by matching the most specific (longest) matching rule. For example, if you declare `Disallow: /wp-admin/` and `Allow: /wp-admin/admin-ajax.php`, the crawler permits requests to `admin-ajax.php` because its path string is longer and more specific.",
  },
  {
    question: "Is the robots.txt file case-sensitive?",
    answer:
      "Yes. Directives and URL paths in robots.txt are strictly case-sensitive. Declaring `Disallow: /Admin/` will not prevent crawlers from accessing `/admin/` or `/ADMIN/`.",
  },
  {
    question: "Can I list multiple XML sitemaps inside robots.txt?",
    answer:
      "Yes. You can declare multiple `Sitemap: https://yourdomain.com/sitemap.xml` directives on separate lines at the bottom of your robots.txt file. This is standard practice for websites with multiple category, post, and image sitemaps.",
  },
];

const TOC_LINKS = [
  { href: "#ai-crawler-blocking", label: "How to Block AI Scrapers Without Hurting SEO" },
  { href: "#crawler-token-matrix", label: "Search Engine & AI Crawler User-Agent Reference" },
  { href: "#robots-txt-syntax-guide", label: "Allow vs Disallow Directives Explained" },
  { href: "#nextjs-robots-ts", label: "Using Dynamic robots.ts in Next.js App Router" },
  { href: "#frequently-asked-questions", label: "Frequently Asked Questions (FAQ)" },
  { href: "#related-tools", label: "Related SEO & Web Utilities" },
];

export function ToolContent() {
  return (
    <article className="mt-16 space-y-16 text-slate-700 dark:text-slate-300">
      {/* ========================================================================= */}
      {/* TABLE OF CONTENTS (Accessible Nav)                                       */}
      {/* ========================================================================= */}
      <nav
        aria-label="Table of Contents"
        className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm"
      >
        <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
            <ListOrdered className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Table of Contents: Robots.txt &amp; AI Bot Protocol Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump directly to AI scraper rules, user-agent reference, or Next.js code recipes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
          {TOC_LINKS.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-2 rounded-xl p-2.5 text-slate-700 dark:text-slate-300 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 group-hover:text-blue-600 transition-colors">
                {idx + 1}
              </span>
              <span className="font-medium group-hover:underline underline-offset-2 truncate">
                {item.label}
              </span>
              <ChevronRight className="h-3.5 w-3.5 ml-auto text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* SECTION 1: How to Block AI Scrapers Without Hurting SEO                   */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="ai-crawler-blocking"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              How to Block AI Scrapers Without Hurting Organic SEO
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Isolate foundational LLM training spiders from search engine indexing bots
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-purple-300 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-bold">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h3 className="text-base">
              The Critical Separation: Search Crawlers vs. AI Training Spiders
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            One of the biggest concerns for modern site owners and publishers is preventing AI companies from scraping copyright articles and proprietary datasets for LLM training. Fortunately, major tech organizations maintain <strong>dedicated, distinct User-Agent tokens</strong> for their training scrapers separate from search indexers:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Google Search vs. Gemini:</strong> Standard search indexing is handled by <code>Googlebot</code>. Opting out of Gemini/Vertex AI model training uses the distinct token <code>Google-Extended</code>.
            </li>
            <li>
              <strong>Apple Siri vs. Apple Intelligence:</strong> Search indexation uses <code>Applebot</code>, while foundational model training uses <code>Applebot-Extended</code>.
            </li>
            <li>
              <strong>OpenAI ChatGPT:</strong> Training uses <code>GPTBot</code>, while live real-time user browsing uses <code>ChatGPT-User</code>.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
              OpenAI
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              GPTBot &amp; ChatGPT-User
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Block <code>GPTBot</code> to prevent your website content from training future versions of GPT-5. Block <code>ChatGPT-User</code> if you do not want ChatGPT browsing extensions reading your site.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Anthropic
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              ClaudeBot &amp; Claude-Web
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Anthropic respects the <code>ClaudeBot</code> and <code>Claude-Web</code> tokens. Blocking these stops Claude from consuming your documentation or articles.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Common Crawl
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              CCBot (Public Datasets)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Common Crawl provides open web dumps used by hundreds of research labs and open-source models (like Llama and Mistral). Blocking <code>CCBot</code> prevents ingestion.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Search Engine & AI Crawler User-Agent Reference Matrix         */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="crawler-token-matrix"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Search Engine &amp; AI Crawler User-Agent Reference Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified bot tokens, operators, primary functions, and recommended access policies
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">User-Agent Token</th>
                <th className="py-3.5 px-4">Operator / Organization</th>
                <th className="py-3.5 px-4">Type / Category</th>
                <th className="py-3.5 px-4">Primary Purpose</th>
                <th className="py-3.5 px-4">Recommended Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  Googlebot
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Google LLC</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    Search Engine
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Web search indexing, mobile rendering, and Core Web Vitals
                </td>
                <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                  Allow (Essential)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  Bingbot
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Microsoft Corp</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    Search Engine
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Bing and Yahoo! search indexing and rich snippets
                </td>
                <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                  Allow (Essential)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                  GPTBot
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">OpenAI</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                    AI Training
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Collects training corpora for OpenAI foundation models
                </td>
                <td className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">
                  Disallow (If protecting IP)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                  Google-Extended
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Google LLC</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                    AI Training
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Trains Gemini, Bard, and Vertex AI models
                </td>
                <td className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">
                  Disallow (Preserves SEO)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                  ClaudeBot
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Anthropic</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                    AI Training
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Scrapes content to train Anthropic Claude LLMs
                </td>
                <td className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">
                  Disallow (If protecting IP)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                  PerplexityBot
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Perplexity AI</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                    AI Search Engine
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Live indexing and retrieval for Perplexity AI answers
                </td>
                <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">
                  Allow for citation traffic
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                  CCBot
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Common Crawl</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                    Open Web Archive
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Public web crawls distributed to academic and commercial AI labs
                </td>
                <td className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">
                  Disallow (High server load)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: Allow vs Disallow Directives Explained                         */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="robots-txt-syntax-guide"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Robots.txt Syntax, Wildcards &amp; Precedence Rules
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Understanding longest-match rules, trailing slashes, and crawl budget preservation
            </p>
          </div>
        </div>

        {/* Security Warning Callout */}
        <div className="rounded-3xl border border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <h3 className="text-base">
              Critical Warning: Robots.txt Is NOT a Security Mechanism
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            A common security vulnerability is listing sensitive admin portals or hidden staging endpoints inside robots.txt (e.g. <code>Disallow: /super-secret-admin-login/</code>). <strong>The robots.txt file is completely public</strong>; malicious actors inspect it as an index of high-value targets. Protect private directories with password authentication (HTTP Auth / OAuth) and IP whitelisting, not robots.txt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Longest Match Rule
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              When a crawler evaluates conflicting <code>Allow</code> and <code>Disallow</code> directives, Googlebot chooses the directive with the greatest number of matching characters:
            </p>
            <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-200">
              User-agent: *<br />
              Disallow: /wp-admin/<br />
              Allow: /wp-admin/admin-ajax.php<br />
              <span className="text-emerald-400"># admin-ajax.php is allowed (27 chars vs 10 chars)</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Wildcards and End-of-String Anchors
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Use the asterisk (<code>*</code>) for wildcard patterns and the dollar sign (<code>$</code>) to anchor the end of a URL:
            </p>
            <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-200">
              # Block all URL queries with sort parameters<br />
              Disallow: /*?sort=*<br />
              # Block only standalone PDF files<br />
              Disallow: /*.pdf$
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: Next.js App Router dynamic robots.ts Guide                     */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <FileCode className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="nextjs-robots-ts"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Using Dynamic robots.ts in Next.js App Router
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Native TypeScript robots file generation in Next.js 14 and 15
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            Next.js App Router provides built-in support for generating a dynamic <code>/robots.txt</code> file by creating a <code>src/app/robots.ts</code> file. This allows you to dynamically switch staging vs. production policies using environment variables:
          </p>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 font-mono text-xs text-slate-200 shadow-sm overflow-x-auto">
            <pre className="leading-relaxed">
{`// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  // Lock staging/preview deployments
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended"],
        disallow: ["/"],
      },
    ],
    sitemap: ["https://yourdomain.com/sitemap.xml"],
  };
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: Comprehensive FAQ Accordion                                    */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="frequently-asked-questions"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Expert answers to robots.txt syntax, AI bot blocking, and search crawler protocols
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {ROBOTS_FAQS.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 transition-all open:ring-1 open:ring-blue-500/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>{faq.question}</span>
                <span className="ml-4 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-slate-500 group-open:rotate-180 transition-transform">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: Related SEO & Web Utilities (Internal Linking Mesh)           */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="related-tools"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Complementary SEO &amp; Technical Marketing Utilities
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Optimize your crawl efficiency, snippet CTR, and marketing tracking in parallel
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: SERP Preview */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-emerald-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
                <Search className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Flagship
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Google SERP Simulator
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test and optimize SEO titles and meta descriptions with pixel accuracy against Google desktop and mobile cutoff thresholds.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                /tools/seo/serp-preview
              </span>
              <Link
                href="/tools/seo/serp-preview"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Open</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Open Graph Preview */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                <Share2 className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950/80 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                Social
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Open Graph Previewer
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Preview social cards across Facebook, Twitter/X, LinkedIn, and WhatsApp with real-time aspect ratio validation.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                /tools/social/open-graph-preview
              </span>
              <Link
                href="/tools/social/open-graph-preview"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Open</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: UTM Campaign Builder */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-purple-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shadow-sm group-hover:scale-105 transition-transform">
                <Globe className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-purple-100 dark:bg-purple-950/80 px-2.5 py-0.5 text-xs font-bold text-purple-700 dark:text-purple-300">
                Marketing
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                GA4 UTM Campaign Builder
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Construct error-free tracking links with one-click channel presets, automatic sanitization, and QR code generation.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                /tools/marketing/utm-campaign-builder
              </span>
              <Link
                href="/tools/marketing/utm-campaign-builder"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Open</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
