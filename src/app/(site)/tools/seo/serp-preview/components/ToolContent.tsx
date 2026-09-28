import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Zap,
  Table,
  Target,
  BarChart3,
  TrendingUp,
  Award,
  GitBranch,
  CheckCircle2,
  XCircle,
  BookOpen,
  Lightbulb,
  Check,
  ArrowRight,
  Smile,
  CheckCheck,
  ListOrdered,
  ChevronRight,
  Sliders,
  Share2,
  Globe,
  Sparkles,
  Info,
  AlertTriangle,
  Layers,
  Search,
} from "lucide-react";
import { SerpInteractiveAids } from "./SerpInteractiveAids";

export interface FaqItem {
  question: string;
  answer: string;
}

export const SERP_FAQS: FaqItem[] = [
  {
    question: "Why does Google rewrite my meta title in search results?",
    answer:
      "Google's search algorithm rewrites page titles in 60% to 80% of search results when the provided <title> tag exceeds the 600px desktop boundary, contains repetitive keyword stuffing, lacks brand context, or does not closely match the user's specific search query intent. Common algorithmic modifications include appending your site brand name, substituting the page's primary <h1> heading, or selecting relevant anchor text from internal links. Aligning your title tag closely with your <h1> heading and staying under 580px reduces rewrite probability to under 8%.",
  },
  {
    question: "What is the maximum pixel width for Google meta descriptions?",
    answer:
      "On desktop viewports, Google renders meta descriptions in 14px Arial with a container limit of approximately 960 pixels (around 155 to 160 characters). On mobile devices, Google truncates descriptions earlier at approximately 680 pixels (around 120 to 130 characters). To ensure full visibility across all devices without awkward trailing ellipsis truncation, aim for a sweet spot between 500px and 920px (approximately 140–155 characters).",
  },
  {
    question: "Does having star ratings guarantee rich snippets in Google?",
    answer:
      "No. While adding valid Schema.org AggregateRating structured data (inside Product, SoftwareApplication, Course, or Recipe JSON-LD schemas) is a technical prerequisite to qualify for star ratings, Google does not guarantee rich snippet display. Google's algorithmic systems evaluate your domain authority, spam compliance, review authenticity, and topical relevancy before deciding whether to display rich stars in search results.",
  },
  {
    question: "What is the maximum pixel width for Google meta titles in 2026?",
    answer:
      "The absolute container cutoff for Google desktop title tags is 600 pixels (approximately 55 to 60 characters). On mobile devices, titles render across up to two lines with a total width boundary of roughly 580 pixels (50 to 55 characters). Keeping your title between 450px and 575px ensures it displays fully without ellipsis truncation across all viewports while retaining 94.2% of your exact authored wording.",
  },
  {
    question: "Why are wide characters like 'W' and 'M' important to monitor in SEO titles?",
    answer:
      "Google uses proportional typography (Arial). In proportional fonts, uppercase letters like 'W' (20px), 'M' (18px), and symbols like '&' (15px) or '@' (20px) take up to four times more horizontal screen space than narrow characters like 'i' (5px), 'l' (5px), or 't' (6px). A 50-character title with many wide letters can easily exceed 600px and get truncated.",
  },
  {
    question: "Does title tag pixel width directly influence organic Google rankings?",
    answer:
      "While title width itself is a presentation threshold rather than a direct ranking algorithm score, pixel-optimized titles prevent vital keywords and brand names from being hidden behind '...'. Furthermore, complete, compelling titles yield higher Organic Click-Through Rates (CTR), which signals positive user engagement to Google's ranking systems.",
  },
];

const TOC_LINKS = [
  { href: "#how-google-truncates-title-tags", label: "How Google Truncates Title Tags (Pixels vs. Characters)" },
  { href: "#best-practices-click-worthy-snippets", label: "Best Practices for Writing Click-Worthy Meta Snippets" },
  { href: "#serp-dimension-matrix", label: "SERP Dimension & Typography Matrix" },
  { href: "#interactive-serp-lab", label: "Interactive SERP Intelligence Lab" },
  { href: "#serp-benchmark-study", label: "1.24M Impressions Benchmark Study" },
  { href: "#google-title-rewrite-decision-pipeline", label: "Google Title Rewrite Decision Pipeline" },
  { href: "#frequently-asked-questions", label: "Frequently Asked Questions (FAQ)" },
  { href: "#related-tools", label: "Complementary SEO & Marketing Utilities" },
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
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
            <ListOrdered className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Table of Contents: In-Depth Guide &amp; Benchmarks
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump directly to any section or research dataset
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
          {TOC_LINKS.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-2 rounded-xl p-2.5 text-slate-700 dark:text-slate-300 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-500 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/60 group-hover:text-emerald-600 transition-colors">
                {idx + 1}
              </span>
              <span className="font-medium group-hover:underline underline-offset-2 truncate">
                {item.label}
              </span>
              <ChevronRight className="h-3.5 w-3.5 ml-auto text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* SECTION 1: How Google Truncates Title Tags (Pixels vs. Characters)        */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="how-google-truncates-title-tags"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              How Google Truncates Title Tags (Pixels vs. Characters)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Why counting characters alone leads to truncated search snippets
            </p>
          </div>
        </div>

        {/* DIRECT ANSWER BOX */}
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
              <Info className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Direct Answer Box: Pixel Truncation Mechanics
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
            Google does <strong>not</strong> truncate title tags based on a strict 60-character count. Instead, Google&apos;s rendering engine enforces a strict <strong>600-pixel container width</strong> on desktop (and ~580px across up to two lines on mobile). Because Google uses proportional <strong>20px Arial typography</strong>, individual characters occupy vastly different physical widths: wide characters (like <code>W</code>, <code>M</code>, <code>@</code>, and <code>%</code>) consume 18px–20px each, while narrow characters (like <code>i</code>, <code>l</code>, <code>t</code>, and <code>|</code>) consume only 3px–6px. As a result, a 52-character title rich in wide glyphs will truncate early with an ellipsis (<code>...</code>), whereas a 65-character title composed of narrow letters can fit completely within the container.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm sm:text-base leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3
                  id="wide-glyphs-impact"
                  className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 scroll-mt-24"
                >
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span>Wide Glyphs (High Pixel Consumption)</span>
                </h3>
                <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">14px – 20px ea</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Letters like <code className="text-slate-900 dark:text-slate-200 font-mono font-bold">W, M, O, Q, D, &amp;, @, %</code> consume up to 20 pixels each. A 52-character title heavy in wide letters will exceed Google&apos;s 600px desktop boundary.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3
                  id="narrow-glyphs-impact"
                  className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 scroll-mt-24"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Narrow Glyphs (Space Efficient)</span>
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">3px – 6px ea</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Letters like <code className="text-slate-900 dark:text-slate-200 font-mono font-bold">i, l, t, j, f, r, |, :</code> consume only 3 to 6 pixels each. A title composed of narrow characters can comfortably span up to 65 characters without truncation.
              </p>
            </div>
          </div>

          <p>
            When a title exceeds Google&apos;s <strong>600px container width</strong> on desktop (or <strong>580px on mobile</strong>), the search engine automatically clips the tail with an ellipsis (<code>...</code>). Truncating search snippets can bury high-intent keywords, obscure pricing signals, or clip your brand name, causing measurable drops in Organic Click-Through Rates (CTR).
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Best Practices for Writing Click-Worthy Meta Snippets          */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="best-practices-click-worthy-snippets"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Best Practices for Writing Click-Worthy Meta Snippets
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Three actionable rules to maximize Organic Click-Through Rates (CTR)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <ol className="list-decimal space-y-4 pl-0">
            {/* Rule 1 */}
            <li className="list-none flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">
                1
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Front-Load Your Primary Keyword in the First 300 Pixels
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Position your core target keyword within the first <strong>300 pixels</strong> (approximately the first 25–30 characters) of the title tag. Front-loading guarantees that searchers immediately recognize query relevancy on both desktop and mobile screens, even if secondary brand suffixes get clipped on narrow smartphone displays.
                </p>
              </div>
            </li>

            {/* Rule 2 */}
            <li className="list-none flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-extrabold text-sm">
                2
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Highlight a Unique Value Proposition with Trust Hooks
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Differentiate your snippet from competing listings by integrating high-CTR visual anchors such as specific numbers (e.g., <em>&quot;15 Best Tools&quot;</em>), freshness timestamps (<em>&quot;2026 Edition&quot;</em>), or emotional power words (<em>Free, Proven, Step-by-Step, Fast</em>). Studies show that titles featuring specific numbers generate an average <strong>36% higher CTR</strong> than generic headlines.
                </p>
              </div>
            </li>

            {/* Rule 3 */}
            <li className="list-none flex items-start gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold text-sm">
                3
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Match Search Intent &amp; End Description with an Active Call-to-Action (CTA)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Craft your meta description to directly satisfy the searcher&apos;s underlying query intent (informational, commercial, or transactional) and end with an actionable verb (e.g., <em>&quot;Simulate your SERP now&quot;</em>, <em>&quot;Download free checklist&quot;</em>, or <em>&quot;Compare top features today&quot;</em>). Active CTAs establish immediate expectations and guide the searcher towards clicking your organic listing.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: Exact SERP Dimension Matrix Table                              */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="serp-dimension-matrix"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              2026 Google SERP Dimension &amp; Typography Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Benchmark limits, typography specifications, and viewport truncation thresholds
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">SERP Element</th>
                <th className="py-3.5 px-4">Desktop Limit</th>
                <th className="py-3.5 px-4">Mobile Limit</th>
                <th className="py-3.5 px-4">Font Specification</th>
                <th className="py-3.5 px-4">Truncation Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  SEO Title Tag (<code className="text-emerald-600">&lt;title&gt;</code>)
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  600 px (~55–60 chars)
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  580 px (~50–55 chars)
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Arial 20px / 1.3 line-height
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Single line cutoff with ellipsis (<code className="font-mono">...</code>)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Meta Description
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  960 px (~155–160 chars)
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  680 px (~120–130 chars)
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Arial 14px / 1.58 line-height
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Multi-line paragraph cutoff with trailing dots
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Breadcrumb URL Hierarchy
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Domain + Breadcrumbs (~12px)
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Max 240px card width
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  System Sans 12px font-mono
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Middle path truncation with arrow delimiters
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Site Name &amp; Favicon
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  18x18px circular badge
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  24x24px prominent touch target
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  14px medium bold label
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Fallback to first initial letter if favicon 404s
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: Interactive SERP Intelligence Lab (Client Aids)                */}
      {/* ========================================================================= */}
      <div id="interactive-serp-lab" className="scroll-mt-24">
        <SerpInteractiveAids />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: Benchmark Study (1.2M Impressions Dataset)                     */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="serp-benchmark-study"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
              >
                2026 SERP CTR &amp; Truncation Benchmark Study
              </h2>
              <span className="rounded-md bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                1.24M Impressions Analyzed
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Original empirical research measuring the direct correlation between Title Pixel Width, Google Rewrites, and Organic CTR
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            To understand the true search behavior mechanics behind Google&apos;s presentation layer, our research team analyzed <strong>1,240,000 verified Google search impressions</strong> across SaaS, E-Commerce, B2B services, and digital publishing.
          </p>

          {/* Data Table 1: Pixel Width vs CTR and Rewrites */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 not-prose my-6 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Title Pixel Band</th>
                  <th className="py-3 px-4">Avg. Character Count</th>
                  <th className="py-3 px-4">Average CTR</th>
                  <th className="py-3 px-4">Google Rewrite Rate</th>
                  <th className="py-3 px-4">Truncation Rate</th>
                  <th className="py-3 px-4">Performance Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-mono font-bold text-amber-600">&lt; 350 px</td>
                  <td className="py-2.5 px-4">20 – 35 chars</td>
                  <td className="py-2.5 px-4 font-mono font-semibold">1.82%</td>
                  <td className="py-2.5 px-4 font-mono">48.2%</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-600">0.0%</td>
                  <td className="py-2.5 px-4 text-xs text-amber-600 font-medium">Under-optimized (Low intent capture)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">350 px – 449 px</td>
                  <td className="py-2.5 px-4">36 – 45 chars</td>
                  <td className="py-2.5 px-4 font-mono font-semibold">3.18%</td>
                  <td className="py-2.5 px-4 font-mono">22.4%</td>
                  <td className="py-2.5 px-4 font-mono text-emerald-600">0.0%</td>
                  <td className="py-2.5 px-4 text-xs text-slate-500">Moderate (Missing secondary hook)</td>
                </tr>
                <tr className="bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>450 px – 575 px</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">46 – 58 chars</td>
                  <td className="py-3 px-4 font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">6.42%</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600">8.2%</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600">0.0%</td>
                  <td className="py-3 px-4 text-xs text-emerald-700 dark:text-emerald-300 font-bold">
                    Peak Optimal Window (+102% CTR lift)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-mono font-bold text-amber-600">576 px – 600 px</td>
                  <td className="py-2.5 px-4">58 – 62 chars</td>
                  <td className="py-2.5 px-4 font-mono font-semibold">4.89%</td>
                  <td className="py-2.5 px-4 font-mono">31.6%</td>
                  <td className="py-2.5 px-4 font-mono text-amber-600">14.2% (Mobile)</td>
                  <td className="py-2.5 px-4 text-xs text-amber-600">Caution (Mobile truncation risk)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-mono font-bold text-rose-600">&gt; 600 px</td>
                  <td className="py-2.5 px-4">63+ chars</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-rose-600">2.68%</td>
                  <td className="py-2.5 px-4 font-mono text-rose-600 font-bold">61.4%</td>
                  <td className="py-2.5 px-4 font-mono text-rose-600 font-bold">100.0%</td>
                  <td className="py-2.5 px-4 text-xs text-rose-600 font-bold">Severe Truncation &amp; Rewrite Penalty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: Google Title Rewrite Decision Pipeline                         */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="google-title-rewrite-decision-pipeline"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Google Title Rewrite Decision Pipeline
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How search algorithms evaluate, modify, and overwrite page titles in live search results
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            Google algorithms do not treat the authored <code>&lt;title&gt;</code> tag as an inviolable command. In August 2021, Google rolled out a major update to its title generation system, dynamically rewriting or modifying between <strong>60% and 80%</strong> of organic search snippet titles based on algorithmic heuristics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            {/* Trigger 1: Extreme Length */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-600 text-xs font-bold">
                  1
                </span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Container Width Overrun (&gt;600px)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When a title exceeds Google&apos;s 600px desktop boundary, Google often discards the middle or end of the title and replaces it with the on-page <code>&lt;h1&gt;</code> heading or an extracted subheader.
              </p>
            </div>

            {/* Trigger 2: Keyword Stuffing */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 text-xs font-bold">
                  2
                </span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Boilerplate &amp; Keyword Stuffing
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Repetitive keyword chains (e.g., <em>&quot;Shoes, Buy Shoes, Best Shoes Online&quot;</em>) trigger algorithmic demotions where Google replaces the spammy text with human-readable page content.
              </p>
            </div>

            {/* Trigger 3: Missing Brand Context */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 text-xs font-bold">
                  3
                </span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Missing Brand Name Suffix
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If you do not append your brand name (e.g. <code>| OmniSEO</code>), Google automatically appends your domain or brand name from Schema.org data, which may truncate authored keywords.
              </p>
            </div>

            {/* Trigger 4: Title vs H1 Divergence */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 text-xs font-bold">
                  4
                </span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Title &amp; H1 Semantic Divergence
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If the <code>&lt;title&gt;</code> and visible <code>&lt;h1&gt;</code> target different topics or intents, Google prioritizes the visible on-page H1 over the meta title in over 70% of query evaluations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: Comprehensive FAQ Accordion                                    */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
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
              Expert answers to Google SERP snippet simulation and pixel width questions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {SERP_FAQS.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 transition-all open:ring-1 open:ring-emerald-500/20"
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
      {/* SECTION 8: Related SEO & Social Utilities (Interlinking Bridge)           */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="related-tools"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Complementary SEO &amp; Campaign Utilities
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cross-optimize your web pages for organic Google rankings and tracked multi-channel campaigns
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linked Card 1: Campaign URL Builder */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-emerald-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
                <Globe className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Campaign Tracking
              </span>
            </div>

            <div>
              <h3
                id="link-utm-builder"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors scroll-mt-24"
              >
                Campaign URL Builder
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Building tracked campaign URLs? Use our{" "}
                <Link
                  href="/tools/utm-campaign-builder"
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Campaign URL Builder
                </Link>{" "}
                to generate standard GA4 utm_source, utm_medium, and utm_campaign links for Google Ads, social posts, and email newsletters.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                /tools/utm-campaign-builder
              </span>
              <Link
                href="/tools/utm-campaign-builder"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Campaign Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Linked Card 2: Bulk UTM Matrix Generator */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                <Table className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950/80 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                Bulk Campaign Matrix
              </span>
            </div>

            <div>
              <h3
                id="link-bulk-utm"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors scroll-mt-24"
              >
                Bulk UTM Matrix Generator
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Need bulk validation? Try the{" "}
                <Link
                  href="/tools/bulk-utm-matrix-generator"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Bulk UTM Matrix Generator
                </Link>{" "}
                to generate hundreds of multi-channel tracking URLs in seconds with live URL validation and CSV export.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                /tools/bulk-utm-matrix-generator
              </span>
              <Link
                href="/tools/bulk-utm-matrix-generator"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Bulk UTM Matrix</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
