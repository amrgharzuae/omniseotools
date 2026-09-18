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
  Search,
  FileText,
  Scissors,
  Layers,
  Sparkles,
  Share2,
  Sliders,
  AlertTriangle,
  Zap,
  BarChart3,
} from "lucide-react";

export interface DensityFaqItem {
  question: string;
  answer: string;
}

export const DENSITY_FAQS: DensityFaqItem[] = [
  {
    question: "What is the ideal keyword density percentage for Google SEO in 2026?",
    answer:
      "A safe and effective primary keyword density is generally between 1.0% and 2.0% (approximately 1 to 2 mentions per 100 words). Keeping your density within this range signals topical relevance to search engines while preserving natural readability for human visitors.",
  },
  {
    question: "What happens if my keyword density exceeds 3.5%?",
    answer:
      "A keyword density exceeding 3.5% frequently triggers Google's automated over-optimization and keyword stuffing filters. Pages flagged for keyword stuffing can experience ranking drops or suppression from search results entirely.",
  },
  {
    question: "What are 2-word (bigram) and 3-word (trigram) N-gram phrases?",
    answer:
      "N-grams are contiguous sequences of words in a document. 2-word phrases (bigrams like 'keyword research' or 'conversion rate') and 3-word phrases (trigrams like 'best running shoes' or 'free seo tools') identify long-tail keyword themes and topical depth that single words cannot capture.",
  },
  {
    question: "How does TF-IDF differ from traditional keyword density?",
    answer:
      "Keyword density strictly counts raw keyword repetitions. In contrast, TF-IDF (Term Frequency-Inverse Document Frequency) evaluates the statistical importance of words relative to a broader corpus of web pages, rewarding documents that include semantically related entities, co-occurring terms, and topical synonyms.",
  },
  {
    question: "Should stop words be filtered when calculating keyword density?",
    answer:
      "Yes. Excluding common grammatical filler words (such as 'the', 'and', 'in', 'of', 'for', 'is') prevents noise in your analysis, allowing you to focus on meaningful topical keywords and distinct multi-word phrases.",
  },
  {
    question: "How is estimated reading and speaking time calculated?",
    answer:
      "Reading time is calculated at the standard adult reading speed of 225 words per minute (WPM), while speaking time (for video scripts and podcasts) is estimated at approximately 130 words per minute.",
  },
];

const TOC_LINKS = [
  { href: "#ideal-keyword-density", label: "What is the Ideal Keyword Density for Google SEO?" },
  { href: "#keyword-stuffing-risks", label: "How Keyword Stuffing Impacts Modern Search Rankings" },
  { href: "#ngrams-and-topical-authority", label: "2-Word & 3-Word Phrase (N-Gram) Analysis" },
  { href: "#density-vs-tfidf", label: "Keyword Density vs TF-IDF & Semantic Entities" },
  { href: "#frequently-asked-questions", label: "Frequently Asked Questions (FAQ)" },
  { href: "#related-tools", label: "Related SEO & Content Utilities" },
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
              Table of Contents: Keyword Density &amp; Semantic SEO Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump directly to density benchmarks, N-gram strategy, or TF-IDF explanations
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
      {/* SECTION 1: What is the Ideal Keyword Density for Google SEO?              */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="ideal-keyword-density"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              2026 Keyword Density Benchmark Matrix by Content Format
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recommended density targets across blog posts, e-commerce products, and pillar guides
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed">
          While search engines prioritize helpfulness and user intent over rigid mathematical formulas, maintaining safe density ranges prevents over-optimization flags across different content lengths:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Content Format</th>
                <th className="py-3.5 px-4">Typical Word Count</th>
                <th className="py-3.5 px-4">Optimal Density</th>
                <th className="py-3.5 px-4">Warning Threshold</th>
                <th className="py-3.5 px-4">Optimization Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Comprehensive Pillar Guide
                </td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                  2,000 – 4,000 words
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  1.0% – 1.8%
                </td>
                <td className="py-3 px-4 font-mono text-rose-600 dark:text-rose-400 font-bold">
                  &gt; 2.5%
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Distribute key terms across H2 headings, intro, and conclusion. Focus on semantic subtopics.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Standard Blog Article
                </td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                  800 – 1,500 words
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  1.2% – 2.0%
                </td>
                <td className="py-3 px-4 font-mono text-rose-600 dark:text-rose-400 font-bold">
                  &gt; 3.0%
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Include 2-3 mentions of primary keyword alongside 2-word and 3-word long-tail variations.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  E-Commerce Product Page
                </td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                  150 – 400 words
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  1.5% – 2.5%
                </td>
                <td className="py-3 px-4 font-mono text-rose-600 dark:text-rose-400 font-bold">
                  &gt; 3.5%
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Short copy naturally repeats product brand and model. Keep technical specs in bullet lists.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Category Hub Page
                </td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                  300 – 800 words
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  1.0% – 2.2%
                </td>
                <td className="py-3 px-4 font-mono text-rose-600 dark:text-rose-400 font-bold">
                  &gt; 3.0%
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Focus on category taxonomy, subcategory anchors, and user navigation intent.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: How Keyword Stuffing Impacts Modern Search Rankings            */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="keyword-stuffing-risks"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              How Keyword Stuffing Impacts Modern Search Rankings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Why artificial repetition harms search engine rankings and user conversion rates
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 p-6 space-y-3 shadow-sm">
          <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
            The Algorithmic Danger of Repetitive Content
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Google’s ranking algorithms (including the Helpful Content System and SpamBrain) are designed to penalize content written solely for search engines rather than humans. When a page unnaturally shoehorns an exact-match keyword into every sentence, it suffers from two major setbacks:
          </p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Algorithmic Spam Suppression:</strong> Automated filters flag unnaturally high unigram concentrations (&gt;3.5%), downranking the URL for commercial queries.
            </li>
            <li>
              <strong>Skyrocketing Bounce Rates:</strong> Human visitors immediately detect robotic, stuffed phrasing and bounce back to Google results, signaling low content satisfaction.
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              Red Flag 1
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Clustered Repetition
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Repeating the target keyword 4 times within a single paragraph. Space occurrences evenly across your headings and body text.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              Red Flag 2
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Grammatical Distortion
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Forcing ungrammatical search queries (e.g. &quot;plumber London cheap&quot;) rather than natural phrasing (&quot;affordable plumbers in London&quot;).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
              Red Flag 3
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Hidden or Anchor Stacking
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Repeating identical internal link anchor texts dozens of times in the footer or sidebar navigation.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: 2-Word & 3-Word Phrase (N-Gram) Analysis                       */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="ngrams-and-topical-authority"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              2-Word &amp; 3-Word Phrase (N-Gram) Analysis for Topical Authority
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Why multi-word phrases capture real search intent better than isolated words
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-base">2-Word Bigrams (Core Themes)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Bigrams reveal the central subjects of your article. For instance, in an article about digital marketing, your top bigrams should naturally include <code>search engine</code>, <code>content strategy</code>, and <code>conversion rate</code>. If off-topic bigrams dominate the list, your content may lack topical clarity.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-base">3-Word Trigrams (Long-Tail Intent)</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Trigrams match the conversational long-tail queries searchers use in Google and voice search (e.g. <code>how to optimize</code>, <code>best seo tools</code>, <code>increase organic traffic</code>). Ensuring these appear naturally throughout your text optimizes your page for long-tail search impressions.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: Keyword Density vs TF-IDF & Semantic Entities                  */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="density-vs-tfidf"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Keyword Density vs. TF-IDF &amp; Semantic Entity Optimization
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Moving beyond word counts into semantic context and search entity relationships
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 p-6 space-y-3 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            How Modern Search Engines Evaluate Topical Completeness
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            While keyword density tells you how often a term appears, <strong>TF-IDF</strong> measures whether your document contains the expected contextual vocabulary of an authoritative guide. For example, if you write an article targeting <em>&quot;Coffee Brewing Methods&quot;</em>, search engines expect to find related semantic entities such as <em>grind size, water temperature, French press, extraction time, and pour-over</em>.
          </p>
          <div className="pt-2">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Best Practice: Use our density analyzer as a safety guardrail to ensure natural repetition, while expanding your draft to cover all related subtopics and synonyms.
            </span>
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
              Expert answers on keyword density formulas, over-optimization flags, and N-gram metrics
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {DENSITY_FAQS.map((faq, index) => (
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
      {/* SECTION 6: Related SEO & Content Utilities (Internal Cross-Linking)      */}
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
              Complementary SEO &amp; Content Optimization Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Refine your metadata and create clean permalinks alongside content analysis
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linked Card: Google SERP Simulator */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900/60 dark:to-slate-950 p-6 space-y-4 shadow-sm hover:border-emerald-500 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Search className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Flagship Tool
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Google SERP Simulator &amp; Meta Pixel Counter
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test title and meta description pixel lengths against Google desktop (600px) and mobile limits with AI generation powered by Gemini.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                /tools/seo/serp-preview
              </span>
              <Link
                href="/tools/seo/serp-preview"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch SERP Previewer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Linked Card: URL Slug Generator */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
                SEO Utility
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                SEO URL Slug &amp; Bulk Permalink Generator
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Convert page headings and product titles into clean, hyphenated, stop-word-free URL slugs with batch conversion and diacritic transliteration.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                /tools/seo/url-slug-generator
              </span>
              <Link
                href="/tools/seo/url-slug-generator"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Slug Generator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
