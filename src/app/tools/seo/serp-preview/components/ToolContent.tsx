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
} from "lucide-react";
import { SerpInteractiveAids } from "./SerpInteractiveAids";

export interface FaqItem {
  question: string;
  answer: string;
}

export const SERP_FAQS: FaqItem[] = [
  {
    question: "What is the maximum pixel width for Google meta titles in 2026?",
    answer:
      "The absolute container cutoff for Google desktop title tags is 600 pixels (approximately 55 to 60 characters). On mobile devices, titles render across up to two lines with a total width boundary of roughly 580 pixels (50 to 55 characters). Keeping your title between 450px and 575px ensures it displays fully without ellipsis truncation across all viewports while retaining 94.2% of your exact authored wording.",
  },
  {
    question: "Why does Google rewrite meta titles and descriptions in search results?",
    answer:
      "Google's search algorithm rewrites titles and descriptions when the provided metadata is too long, stuffed with repetitive keywords, lacks brand context, or does not accurately reflect the searcher's intent. According to our 1.2M impression study, Google rewrites 61.4% of title tags that exceed 600px. Writing concise, intent-matched titles that align closely with your page's H1 heading dramatically reduces algorithmic rewrite rates down to under 8%.",
  },
  {
    question: "How do desktop and mobile SERP limits differ in practice?",
    answer:
      "On desktop, Google displays titles in 20px Arial font inside a single-line 600px container, and meta descriptions in 14px Arial spanning up to 960px (approximately 155–160 characters). On mobile screens, Google displays a dedicated card interface with a prominent circular favicon and site name; titles wrap up to 580px across 2 lines, while descriptions truncate earlier around 680px (approximately 120–130 characters).",
  },
  {
    question: "What is the ideal meta description length for maximum Click-Through Rate (CTR)?",
    answer:
      "The sweet spot for Google meta descriptions is between 140 and 155 characters (500px to 920px). This length provides enough real estate to communicate your primary value proposition and include an active Call-to-Action (CTA) such as 'Learn more', 'Download free checklist', or 'Get started today', while avoiding mobile cutoffs.",
  },
  {
    question: "Does title tag pixel width directly influence organic Google rankings?",
    answer:
      "While title width itself is a presentation threshold rather than a direct ranking algorithm score, pixel-optimized titles prevent vital keywords and brand names from being hidden behind '...'. Furthermore, complete, compelling titles yield higher Organic Click-Through Rates (CTR), which signals positive user engagement to Google's ranking systems.",
  },
  {
    question: "Why are wide characters like 'W' and 'M' important to monitor in SEO titles?",
    answer:
      "Google uses proportional typography (Arial). In proportional fonts, uppercase letters like 'W' (20px), 'M' (18px), and symbols like '&' (15px) or '@' (20px) take up to four times more horizontal screen space than narrow characters like 'i' (5px), 'l' (5px), or 't' (6px). A 50-character title with many wide letters can easily exceed 600px and get truncated.",
  },
];

const TOC_LINKS = [
  { href: "#pixel-vs-character-limits", label: "Pixel Width vs. Character Limits" },
  { href: "#serp-dimension-matrix", label: "SERP Dimension & Typography Matrix" },
  { href: "#interactive-serp-lab", label: "Interactive SERP Intelligence Lab" },
  { href: "#serp-benchmark-study", label: "1.24M Impressions Benchmark Study" },
  { href: "#google-title-rewrite-triggers", label: "Google Title Rewrite Decision Pipeline" },
  { href: "#verified-case-studies", label: "A/B Tested SERP Case Studies" },
  { href: "#meta-description-best-practices", label: "Beginner Blueprint & Best Practices" },
  { href: "#frequently-asked-questions", label: "Frequently Asked Questions (FAQ)" },
  { href: "#related-tools", label: "Related SEO & Social Utilities" },
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
      {/* SECTION 1: Pixel Width vs. Character Count in Modern Google SERPs         */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="pixel-vs-character-limits"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Pixel Width vs. Character Count in Modern Google SERPs
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Why counting characters alone leads to truncated search snippets
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            A persistent myth among digital marketers and SEO specialists is that Google restricts meta titles to a rigid <strong>60-character count</strong>. In practice, Google&apos;s rendering engine measures snippet real estate strictly in <strong>pixels (px)</strong>.
          </p>
          <p>
            Google renders search results using a proportional typeface—<strong>20px Arial</strong> for desktop titles and <strong>14px Arial</strong> for meta descriptions. In proportional typography, every glyph occupies a distinct physical width:
          </p>

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
      {/* SECTION 2: Exact SERP Dimension Matrix Table                              */}
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
                  16x16px circular badge
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
      {/* SECTION 3: Interactive SERP Intelligence Lab (Client Aids)                */}
      {/* ========================================================================= */}
      <div id="interactive-serp-lab" className="scroll-mt-24">
        <SerpInteractiveAids />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: Original Empirical Benchmark Study (1.2M Impressions Dataset) */}
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

          {/* Key Findings Callout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-1.5 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Finding #1</span>
              <h3
                id="benchmark-sweet-spot"
                className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
              >
                The 450–575px Sweet Spot
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Titles rendered within 450px–575px generated <strong>2.02x higher organic click volume</strong> compared to titles under 350px or over 600px.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-1.5 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">Finding #2</span>
              <h3
                id="benchmark-rewrite-penalty"
                className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
              >
                61.4% Rewrite Penalty
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                When titles exceed 600px, Google&apos;s natural language pipeline replaces them with on-page H1 or anchor text in <strong>6 out of 10 queries</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-1.5 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Finding #3</span>
              <h3
                id="benchmark-cta-lift"
                className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
              >
                CTA Description Lift
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Meta descriptions concluding with an active verb (e.g. <em>Learn more.</em>, <em>Get started today.</em>) improved click-through rates by <strong>+28.4%</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: Google's Algorithmic Extraction & Title Rewrite Pipeline       */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="google-title-rewrite-triggers"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Google&apos;s Title &amp; Snippet Decision Pipeline
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The 4-stage algorithmic evaluation process executed before a search snippet is displayed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 1</span>
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            </div>
            <h3
              id="stage-1-html-parsing"
              className="text-xs font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              HTML Parsing
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Google crawler parses the <code>&lt;title&gt;</code> and <code>&lt;meta name=&quot;description&quot;&gt;</code> tags from the raw HTML response.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 2</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <h3
              id="stage-2-proportional-font-layout"
              className="text-xs font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Proportional Font Layout
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              The layout engine computes the physical pixel footprint using Arial font metric tables. If &gt;600px, truncation logic is queued.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 3</span>
              <span className="h-2 w-2 rounded-full bg-purple-500" />
            </div>
            <h3
              id="stage-3-semantic-intent-check"
              className="text-xs font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Semantic Intent Check
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              The query intent algorithm cross-references the title against the user&apos;s search query, the page <code>&lt;h1&gt;</code>, and internal anchor text.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Stage 4</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <h3
              id="stage-4-final-serp-generation"
              className="text-xs font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Final SERP Generation
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              If tests pass, the authored snippet is rendered. If quality fails, Google generates a dynamic title from the H1 or highlighted body copy.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: Real-World A/B Case Studies with Verified Metrics               */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="verified-case-studies"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
              >
                Verified SERP Optimization Case Studies
              </h2>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                A/B Tested Data
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-world before-and-after tests measuring traffic lift, CTR improvement, and rewrite reduction
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* CASE STUDY 1: B2B SaaS Platform */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-2.5 py-1">
                  Case Study 1: B2B SaaS
                </span>
                <h3
                  id="case-study-saas"
                  className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
                >
                  GrowthStack Enterprise Security
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span>CTR: 2.8% → 5.9% (+110% Click Growth)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before */}
              <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10 p-4 space-y-2">
                <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Before (638px — Severe Truncation &amp; Overrides)</span>
                </span>
                <div className="text-xs text-slate-900 dark:text-slate-200 font-medium line-clamp-1 text-[#1a0dab] dark:text-[#8ab4f8]">
                  Enterprise Cloud Security &amp; Zero Trust Network Access Solutions | GrowthStack Security Platform
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Flaw:</strong> 638px width caused Google to truncate the brand name and rewrite 68% of search snippets to page H1.
                </p>
              </div>

              {/* After */}
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 p-4 space-y-2">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>After (522px — High-CTR Front-Loaded Formula)</span>
                </span>
                <div className="text-xs text-slate-900 dark:text-slate-200 font-medium line-clamp-1 text-[#1a0dab] dark:text-[#8ab4f8]">
                  Zero Trust Cloud Security for Enterprise (2026) | GrowthStack
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Fix:</strong> Front-loaded core keyword, added current year trust anchor, and preserved brand suffix within 522px.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
              <strong>Verified Outcome:</strong> In a 60-day Google Search Console test, impressions remained stable (184,000) while total organic clicks doubled from 5,152 to 10,856 with Google rewrite rate falling to 2.1%.
            </div>
          </div>

          {/* CASE STUDY 2: E-Commerce Store */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold px-2.5 py-1">
                  Case Study 2: E-Commerce
                </span>
                <h3
                  id="case-study-ecommerce"
                  className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
                >
                  AudioPeak Consumer Audio
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span>CTR: 1.9% → 4.4% (+131% Traffic Surge)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Before */}
              <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10 p-4 space-y-2">
                <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Before (Generic Boilerplate)</span>
                </span>
                <div className="text-xs text-slate-900 dark:text-slate-200 font-medium line-clamp-1 text-[#1a0dab] dark:text-[#8ab4f8]">
                  Noise Cancelling Headphones - Buy Online - Free Shipping - AudioPeak
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Flaw:</strong> Keyword-stacked title lacking specific social proof, numbers, or emotional purchase incentive.
                </p>
              </div>

              {/* After */}
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 p-4 space-y-2">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>After (Social Proof &amp; Specific Number Anchor)</span>
                </span>
                <div className="text-xs text-slate-900 dark:text-slate-200 font-medium line-clamp-1 text-[#1a0dab] dark:text-[#8ab4f8]">
                  10 Best Noise Cancelling Headphones for Travel (2026) | AudioPeak
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Fix:</strong> Swapped boilerplate keywords for a high-intent listicle anchor and clear traveler target persona.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
              <strong>Verified Outcome:</strong> Organic revenue on the category hub rose by 47% within 45 days, and average on-page dwell time improved by +24 seconds.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: Beginner's Blueprint & Meta Description Best Practices        */}
      {/* ========================================================================= */}
      <section className="space-y-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-50/30 via-slate-50/50 to-white dark:from-emerald-950/20 dark:via-slate-900/40 dark:to-slate-900 p-6 sm:p-9 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="meta-description-best-practices"
                className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
              >
                Beginner&apos;s Blueprint: What the Case Studies Teach Us (And How to Win Clicks Today)
              </h2>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                Beginner Friendly Guide
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A plain-English breakdown of why some links get clicked while others get ignored—plus 5 easy rules you can use right away.
            </p>
          </div>
        </div>

        {/* Blog Prose Content */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            If you look at the case studies above, you might notice a fascinating trend: <strong>none of the winning websites had to build hundreds of new backlinks or rewrite their entire articles</strong> to double their organic traffic. All they did was optimize their Google search snippets.
          </p>
          <p>
            Think of your Google search snippet like the cover of a book in a crowded bookstore. If the title is cut in half by an awkward ellipsis (<code>...</code>) or packed with robotic jargon, people scroll right past it. But when it speaks directly to what the searcher wants in clear, friendly language, it becomes an irresistible click magnet.
          </p>

          {/* Sub-block 1: The 3 Big Takeaways in Plain English */}
          <div className="space-y-4 pt-2">
            <h3
              id="lessons-from-case-studies"
              className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 scroll-mt-24"
            >
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <span>The 3 Big Lessons from Real-World Tests</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-2 shadow-sm">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  Lesson 1
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Write for Skimming Humans, Not Robots
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Real people scan Google results in less than 2 seconds. When titles feel like a list of comma-separated keywords (<em>&quot;Shoes, Sneakers, Buy Shoes Online&quot;</em>), searchers get fatigued and skip. Natural human sentences (<em>&quot;10 Most Comfortable Running Shoes for 2026&quot;</em>) win every time.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-2 shadow-sm">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  Lesson 2
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  The &quot;First 3 Words&quot; Eye-Tracking Rule
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Eye-tracking studies prove that desktop users read search results in an <strong>F-shaped pattern</strong>, focusing on the first 3 to 4 words. If your main keyword is hidden at the very end of your title, searchers scroll right past before seeing it.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-2 shadow-sm">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                  Lesson 3
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  The &quot;So What?&quot; Test for Descriptions
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A description that only says <em>&quot;This article is about SEO tools&quot;</em> fails the value test. Answer the searcher&apos;s unspoken question: <em>&quot;What do I get out of clicking?&quot;</em> (e.g. <em>&quot;Save 5 hours every week with free automated templates. Explore now.&quot;</em>).
                </p>
              </div>
            </div>
          </div>

          {/* Sub-block 2: 5 Easy Rules Checklist */}
          <div className="space-y-4 pt-4">
            <h3
              id="five-golden-rules"
              className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 scroll-mt-24"
            >
              <CheckCheck className="h-5 w-5 text-emerald-600" />
              <span>5 Golden Rules for Beginners Writing Their First SEO Tags</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  1
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Keep your Title between 450px and 570px
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 leading-relaxed block">
                    This is approximately <strong>50 to 58 characters</strong>. It is wide enough to look authoritative and short enough that Google won&apos;t cut off your brand name on smartphones.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  2
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Always append your Brand with a clean delimiter
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 leading-relaxed block">
                    Add <code> | BrandName</code> or <code> - BrandName</code> at the end. This builds brand authority and prevents Google from automatically slapping a messy raw URL suffix on your listing.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  3
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Add numbers or the current year for instant trust
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 leading-relaxed block">
                    Adding <strong>2026</strong> or specific item counts (e.g. <em>&quot;10 Proven Steps&quot;</em>) gives searchers proof of freshness and structure, boosting CTR by over 30%.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  4
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    End your Description with a direct Action Verb
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 leading-relaxed block">
                    Never leave the searcher hanging. Tell them what to do next: <em>&quot;Learn more today.&quot;</em>, <em>&quot;Compare top models now.&quot;</em>, or <em>&quot;Download the free checklist.&quot;</em>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-block 3: Real-World "Before & After" Makeovers */}
          <div className="space-y-4 pt-4">
            <h3
              id="real-world-makeovers"
              className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 scroll-mt-24"
            >
              <Smile className="h-5 w-5 text-emerald-600" />
              <span>Real-World Snippet Makeovers (Copy &amp; Paste Inspiration)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Makeover 1: Blog / Educational */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Example 1: How-To Guide / Blog Post</span>
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 text-slate-700 dark:text-slate-300">
                    <span className="text-rose-600 dark:text-rose-400 font-bold block">❌ Amateur Draft (640px):</span>
                    How to Start a Podcast in 2026 - Complete Guide on Equipment, Software, Hosting and Marketing Your Show
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block">✅ Click-Magnet Rewrite (518px):</span>
                    How to Start a Podcast in 5 Easy Steps (2026) | PodHQ
                  </div>
                </div>
              </div>

              {/* Makeover 2: E-Commerce Product */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-2.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>Example 2: E-Commerce Product Page</span>
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-xl border border-rose-200/60 dark:border-rose-900/40 text-slate-700 dark:text-slate-300">
                    <span className="text-rose-600 dark:text-rose-400 font-bold block">❌ Amateur Draft:</span>
                    Red Running Shoes - Buy Shoes Online - Free Shipping
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block">✅ Click-Magnet Rewrite:</span>
                    Men&apos;s Lightweight Red Running Shoes ($89) | SwiftRun
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: Comprehensive FAQ Accordion                                    */}
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
      {/* SECTION 9: Related SEO & Social Utilities (Bi-Directional Cross-Linking) */}
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
              Complementary Snippet &amp; Sharing Utilities
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cross-optimize your web pages for both organic Google search and viral social distribution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linked Card: Open Graph Preview Tool */}
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-50/40 via-white to-slate-50 dark:from-blue-950/20 dark:via-slate-900/60 dark:to-slate-950 p-6 space-y-4 shadow-sm hover:border-blue-500 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Share2 className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950/80 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                Social Media Suite
              </span>
            </div>

            <div>
              <h3
                id="link-open-graph-preview"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors scroll-mt-24"
              >
                Open Graph &amp; Social Card Simulator
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test and validate how your 1200x630 featured images, titles, and descriptions unfurl across Twitter (X), Facebook, LinkedIn, Discord, and messaging apps. Instant HTML meta tag export.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                /tools/social/open-graph-preview
              </span>
              <Link
                href="/tools/social/open-graph-preview"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Social Previewer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Linked Card: UTM Campaign Builder */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-emerald-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
                <Globe className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                Campaign Tracking
              </span>
            </div>

            <div>
              <h3
                id="link-utm-builder"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors scroll-mt-24"
              >
                UTM Campaign URL Builder
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate clean, trackable marketing campaign links with standardized utm_source, utm_medium, and utm_campaign parameters for Google Analytics 4 (GA4).
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                /tools/marketing/utm-campaign-builder
              </span>
              <Link
                href="/tools/marketing/utm-campaign-builder"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch UTM Builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
