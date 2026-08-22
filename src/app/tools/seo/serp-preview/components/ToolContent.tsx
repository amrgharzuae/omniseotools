import React from "react";
import {
  HelpCircle,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Table,
  Target,
  Maximize2,
  Check,
} from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export const SERP_FAQS: FaqItem[] = [
  {
    question: "What is the maximum pixel width for Google meta titles in 2026?",
    answer:
      "The absolute container cutoff for Google desktop title tags is 600 pixels (approximately 55 to 60 characters). On mobile devices, titles render across up to two lines with a total width boundary of roughly 580 pixels (50 to 55 characters). Keeping your title between 400px and 580px ensures it displays fully without ellipsis truncation across all viewports.",
  },
  {
    question: "Why does Google rewrite meta titles and descriptions in search results?",
    answer:
      "Google's search algorithm rewrites titles and descriptions when the provided metadata is too long, stuffed with repetitive keywords, lacks brand context, or does not accurately reflect the searcher's intent. According to SEO industry studies, Google rewrites over 60% of title tags that exceed 600px. Writing concise, intent-matched titles that align closely with your page's H1 heading dramatically reduces algorithmic rewrite rates.",
  },
  {
    question: "How do desktop and mobile SERP limits differ?",
    answer:
      "On desktop, Google displays titles in 20px Arial font inside a single-line 600px container, and meta descriptions in 14px Arial spanning up to 960px (approximately 155–160 characters). On mobile screens, Google displays a dedicated card interface with a prominent circular favicon and site name; titles wrap up to 580px across 2 lines, while descriptions truncate earlier around 680px (approximately 120–130 characters).",
  },
  {
    question: "What is the ideal meta description length for maximum Click-Through Rate (CTR)?",
    answer:
      "The sweet spot for Google meta descriptions is between 140 and 155 characters (500px to 920px). This length provides enough real estate to communicate your primary value proposition and include an active Call-to-Action (CTA) such as 'Learn more', 'Download free guide', or 'Get started today', while avoiding mobile cutoffs.",
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

export function ToolContent() {
  return (
    <article className="mt-16 space-y-16 text-slate-700 dark:text-slate-300">
      {/* SECTION 1: Editorial Overview & Long-Tail Targets */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
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
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span>Wide Glyphs (High Pixel Consumption)</span>
                </span>
                <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">14px – 20px ea</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Letters like <code className="text-slate-900 dark:text-slate-200 font-mono font-bold">W, M, O, Q, D, &amp;, @, %</code> consume up to 20 pixels each. A 52-character title heavy in wide letters will exceed Google&apos;s 600px desktop boundary.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Narrow Glyphs (Space Efficient)</span>
                </span>
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

      {/* SECTION 2: Exact SERP Dimension Matrix Table */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
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

      {/* SECTION 3: High-Converting CTR Copywriting Blueprints */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Anatomy of High-CTR Google Search Snippets
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Data-backed copywriting frameworks to convert impressions into clicks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                1
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Front-Load Search Intent
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Place your primary target keyword within the first 30 characters of your title tag. Search algorithms give higher weight to early terms, and users scan left-to-right on desktop search results.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                2
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Include Numbers &amp; Year
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Titles containing specific numbers (e.g. <em>10 Tips</em>, <em>5 Steps</em>) or the current year (<em>2026 Edition</em>) increase organic CTR by an average of 36% by providing cognitive anchors of freshness and structure.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                3
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                End Descriptions with a CTA
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Meta descriptions that conclude with an explicit action verb (<em>Learn more.</em>, <em>Get started today.</em>, <em>Calculate now.</em>) outperform passive informational summaries in user engagement and click conversion.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Comprehensive FAQ Accordion */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
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
    </article>
  );
}
