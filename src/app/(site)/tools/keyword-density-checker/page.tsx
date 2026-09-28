import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  FileText,
  Table,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Search,
  Sliders,
  BarChart3,
  BookOpen,
  ListOrdered,
  ChevronRight,
} from "lucide-react";
import { TOOLS_REGISTRY } from "@/config/tools-registry";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { KeywordDensity } from "@/components/tools/content/KeywordDensity";

const CANONICAL_URL = "https://omniseotools.com/tools/keyword-density-checker";

const toolDefinition = TOOLS_REGISTRY.find((t) => t.slug === "keyword-density-checker") || {
  id: "keyword-density-checker",
  slug: "keyword-density-checker",
  name: "Keyword Density Checker & N-Gram Analyzer",
  title: "Keyword Density Checker & N-Gram Frequency Analyzer | OmniSEO Tools",
  metaTitle: "Keyword Density Checker & N-Gram Frequency Analyzer | OmniSEO Tools",
  metaDescription:
    "Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density, and check for search engine keyword stuffing penalties. 100% private and client-side.",
  h1: "Keyword Density Checker & N-Gram Frequency Analyzer",
  tagline:
    "Calculate single-word and multi-word phrase frequency percentages. Audit your content against keyword stuffing thresholds in real time.",
  category: "copywriting" as const,
  icon: "FileText",
  badge: "Popular",
  status: "active" as const,
  featured: true,
  shortDescription:
    "Calculate 1-word, 2-word, and 3-word n-gram keyword frequency percentages, filter stop words, audit lexical diversity, and prevent keyword stuffing penalties.",
  keywords: [
    "keyword density checker",
    "n-gram phrase frequency analyzer",
    "keyword stuffing penalty detector",
    "word frequency counter",
    "ngram density tool",
    "content word frequency analyzer",
    "on page seo keyword density",
    "tf-idf content tool",
  ],
};

export const metadata: Metadata = {
  title: "Keyword Density Checker & N-Gram Frequency Analyzer | OmniSEO Tools",
  description:
    "Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density, and check for search engine keyword stuffing penalties. 100% private and client-side.",
  keywords: [
    "keyword density checker",
    "n-gram phrase frequency analyzer",
    "keyword stuffing penalty detector",
    "word frequency counter",
    "ngram density tool",
    "content word frequency analyzer",
    "on page seo keyword density",
    "tf-idf content tool",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Keyword Density Checker & N-Gram Frequency Analyzer | OmniSEO Tools",
    description:
      "Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density, and check for search engine keyword stuffing penalties. 100% private and client-side.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyword Density Checker & N-Gram Frequency Analyzer | OmniSEO Tools",
    description:
      "Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density, and check for search engine keyword stuffing penalties. 100% private and client-side.",
  },
};

const FAQ_ITEMS = [
  {
    question: "Does Google have an official keyword density percentage?",
    answer:
      "No. Google does not have an official keyword density percentage or target ratio. Google Search Advocates have repeatedly confirmed that search algorithms evaluate whether content naturally answers user search intent rather than counting raw keyword repetitions. However, maintaining a 1% to 2% density prevents accidental keyword stuffing penalties.",
  },
  {
    question: "What is keyword stuffing and how do algorithms detect it?",
    answer:
      "Keyword stuffing is the manipulative practice of repeating keywords unnaturally in webpage body text, headers, meta tags, or alt attributes. Modern algorithms detect it using natural language processing (NLP) to identify statistical frequency spikes and repetitive n-gram distributions that deviate from natural human writing.",
  },
  {
    question: "Does stop word removal distort frequency percentages?",
    answer:
      "No. In fact, removing grammatical stop words (such as 'the', 'and', 'is', 'at', 'which') clarifies your true topical distribution. Because stop words typically represent 25% to 35% of all words in English text, filtering them isolates meaningful subject-matter keywords and reveals genuine topical density.",
  },
  {
    question: "Why should you analyze 2-word and 3-word n-grams alongside single words?",
    answer:
      "Single words can appear natural while multi-word phrases are severely over-optimized. Analyzing 2-word (bigrams) and 3-word (trigrams) n-grams allows you to identify repetitive phrase patterns, uncover long-tail keyword coverage, and ensure key phrases match real user search queries.",
  },
];

export default function KeywordDensityCheckerPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Keyword Density Checker & N-Gram Frequency Analyzer",
        operatingSystem: "All",
        applicationCategory: "SEOApplication",
        url: CANONICAL_URL,
        description:
          "Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density, and check for search engine keyword stuffing penalties. 100% private and client-side.",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEO Tools",
          url: "https://omniseotools.com",
        },
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
            name: "Copywriting & Content",
            item: "https://omniseotools.com/#category-copywriting",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Keyword Density Checker",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data (JSON-LD Graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header */}
      <ToolHeader tool={toolDefinition} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive Keyword Density & N-Gram Frequency Analyzer">
          <ToolErrorBoundary
            toolSlug={toolDefinition.slug}
            toolName={toolDefinition.name}
          >
            <KeywordDensity />
          </ToolErrorBoundary>
        </section>

        {/* ========================================================================= */}
        {/* INTERNAL LINK CALLOUTS BANNER                                             */}
        {/* ========================================================================= */}
        <section className="mt-10 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900/60 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white shadow-xs">
                  <Zap className="h-4 w-4" />
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Next-Level SEO Optimization Workflow
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Connect your keyword density audit with live SERP snippet testing and troubleshooting guides to maximize organic click-through rates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/tools/google-serp-simulator"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Google SERP Simulator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/recipes/how-to-fix-keyword-stuffing-penalties"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs transition-all"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                <span>Fix Stuffing Penalties Recipe &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* ========================================================================= */}
        {/* CRAWLABLE EDUCATIONAL GUIDE (UNDER THE TOOL)                               */}
        {/* ========================================================================= */}
        <article className="mt-8 space-y-12 text-slate-700 dark:text-slate-300">
          
          {/* Section 1: Optimal Keyword Density */}
          <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  What is an Optimal Keyword Density in Modern Search?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target benchmarks: 1% to 2% for primary focus phrases &amp; semantic entity coverage
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              In modern search engine optimization, the optimal keyword density for primary focus phrases is <strong>1.0% to 2.0%</strong> (approximately 1 to 2 mentions per 100 words of body text). While early search engines in the 1990s and 2000s calculated rigid mathematical keyword frequency ratios, modern search algorithms powered by machine learning (including Google RankBrain, BERT, and Gemini) evaluate <strong>semantic entity coverage</strong>, topical comprehensiveness, and conversational naturalness over mechanical word repetition.
            </p>

            <p className="text-sm leading-relaxed">
              Target keyword densities exceeding <strong>2.5% to 3.0%</strong> frequently trip algorithmic spam detectors, triggering ranking devaluation or suppression under Google&apos;s helpful content guidelines. Rather than repeating identical keywords, authoritative pages establish topic relevance by weaving in semantic synonyms, co-occurring entity terms, and contextual subtopics.
            </p>

            {/* Benchmark Table */}
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-3.5">Content Format</th>
                    <th className="py-3 px-3.5">Word Count</th>
                    <th className="py-3 px-3.5">Safe Density Target</th>
                    <th className="py-3 px-3.5">Stuffing Threshold</th>
                    <th className="py-3 px-3.5">Recommended Optimization Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">Blog Post / Article</td>
                    <td className="py-3 px-3.5">1,200 – 2,500 words</td>
                    <td className="py-3 px-3.5 text-emerald-600 font-semibold">1.0% – 1.8%</td>
                    <td className="py-3 px-3.5 text-rose-600 font-semibold">&gt; 2.5%</td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400">Include latent semantic synonyms in H2/H3 subheadings</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">E-Commerce Product Page</td>
                    <td className="py-3 px-3.5">300 – 800 words</td>
                    <td className="py-3 px-3.5 text-emerald-600 font-semibold">1.2% – 2.2%</td>
                    <td className="py-3 px-3.5 text-rose-600 font-semibold">&gt; 3.0%</td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400">Focus on technical specs, model numbers, and feature benefits</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">Comprehensive Pillar Guide</td>
                    <td className="py-3 px-3.5">3,000 – 6,000+ words</td>
                    <td className="py-3 px-3.5 text-emerald-600 font-semibold">0.8% – 1.5%</td>
                    <td className="py-3 px-3.5 text-rose-600 font-semibold">&gt; 2.2%</td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-400">Expand entity relationships, case studies, and structured tables</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30 p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Key Optimization Rule
              </span>
              <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
                If your target focus term represents 1.5% of your copy and secondary phrases stay under 1.0%, your content reads naturally to humans while providing unambiguous topical signals to search crawlers.
              </p>
            </div>
          </section>

          {/* Section 2: Single Words vs Multi-Word N-Grams */}
          <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Single Words vs. Multi-Word N-Grams (2-Word &amp; 3-Word Phrases)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Why multi-word phrase auditing catches hidden over-optimization that single-word counts miss
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Counting single words alone provides an incomplete and frequently deceptive picture of content optimization. In natural language processing (NLP), an <strong>N-gram</strong> is a contiguous sequence of <em>n</em> items from a sample of text. Evaluating 1-word (unigrams), 2-word (bigrams), and 3-word (trigrams) phrase frequencies reveals how words combine contextually:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">1-Word (Unigrams)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Identifies foundational topic words (e.g., <code>audit</code>, <code>vitals</code>, <code>schema</code>). Safe target: <strong>1.5% – 2.5%</strong>.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">2-Words (Bigrams)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Captures target search phrases (e.g., <code>technical audit</code>, <code>crawl budget</code>). Safe target: <strong>1.0% – 1.8%</strong>.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block text-sm">3-Words (Trigrams)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Uncovers high-intent long-tail queries (e.g., <code>technical seo audit</code>). Safe target: <strong>0.5% – 1.2%</strong>.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              For example, if an article about <em>technical SEO audits</em> repeats the exact phrase <code>technical seo audit</code> at the start of every section, the individual words &quot;technical&quot; and &quot;audit&quot; may appear within normal parameters (1.8%), but the 3-word n-gram frequency will spike to <strong>4.5%</strong>. Algorithmic search quality filters flag this exact-match phrase repetition as robotic manipulation.
            </p>
          </section>

          {/* Section 3: How Search Engines Detect Keyword Stuffing */}
          <section className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  How Search Engines Detect Keyword Stuffing Algorithmic Penalties
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Understanding statistical probability models and automated quality devaluations
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Google and other modern search engines do not rely on static density thresholds. Instead, search ranking systems employ <strong>statistical natural language processing (NLP) models</strong> that compare a page&apos;s word and n-gram distribution against hundreds of thousands of authoritative documents on the same subject:
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold mt-0.5">
                  1
                </span>
                <span>
                  <strong>Statistical Probability Anomalies:</strong> If a document uses a specific bigram at a frequency 5x higher than typical natural language models, the page is algorithmically flagged for review.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold mt-0.5">
                  2
                </span>
                <span>
                  <strong>Header &amp; Meta Tag Clustering:</strong> Forcing exact-match keywords across multiple H2/H3 headings, image alt attributes, and title tags without descriptive variation indicates intentional query manipulation.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold mt-0.5">
                  3
                </span>
                <span>
                  <strong>Depressed Lexical Diversity:</strong> When the unique-to-total word count ratio falls below 35%, algorithms deduce that the text is repetitive and lacks informational depth.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: FAQ Accordion / Cards */}
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
                  Expert answers on keyword density, N-grams, stop words, and SEO compliance
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs mt-0.5">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </article>

        {/* Related Tools Internal Linking Mesh */}
        <div className="mt-14">
          <RelatedTools currentTool={toolDefinition} />
        </div>

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
