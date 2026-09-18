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
  Zap,
} from "lucide-react";

export interface SlugFaqItem {
  question: string;
  answer: string;
}

export const SLUG_FAQS: SlugFaqItem[] = [
  {
    question: "Should I use hyphens (-) or underscores (_) in SEO URL slugs?",
    answer:
      "Always use hyphens (-). Google's search documentation explicitly confirms that Googlebot treats hyphens as word separators, indexing 'seo-tools' as two separate keywords ('seo' and 'tools'). In contrast, Google treats underscores as word connectors, indexing 'seo_tools' as a single concatenated term ('seotools').",
  },
  {
    question: "What are stop words and why should I remove them from URL slugs?",
    answer:
      "Stop words are common grammatical filler words such as 'the', 'and', 'a', 'in', 'of', 'for', 'with', and 'on'. Removing non-essential stop words shortens your URL permalinks, boosts target keyword density, prevents mobile SERP truncation, and makes links easier to memorize and share.",
  },
  {
    question: "What is the optimal character and word length for an SEO URL slug?",
    answer:
      "The optimal URL slug length is between 3 and 5 words (approximately 20 to 50 characters). Research across millions of search queries shows that shorter, highly focused URLs rank higher on average and achieve up to 25% higher organic click-through rates.",
  },
  {
    question: "How does the tool handle accented characters like é, ü, or ñ?",
    answer:
      "Our slugifier engine automatically transliterates accented European and Latin characters into their clean ASCII equivalents (e.g. 'é' becomes 'e', 'ü' becomes 'u', 'ñ' becomes 'n', and 'ß' becomes 'ss'). This prevents web browsers from converting special characters into percent-encoded strings like '%C3%A9'.",
  },
  {
    question: "Should I include numbers or publication years in URL slugs?",
    answer:
      "For evergreen content that you plan to update regularly, omit the year (e.g., use '/best-seo-tools' rather than '/best-seo-tools-2026'). This allows you to refresh the content annually without breaking backlinks or requiring complex 301 redirects.",
  },
  {
    question: "How should I handle changing an existing, indexed URL slug?",
    answer:
      "If you modify an established URL slug that already receives search traffic or backlinks, you must immediately configure a permanent 301 redirect from the old URL to the new slug. This preserves 99% of your page's historical link equity (PageRank) and prevents 404 errors.",
  },
];

const TOC_LINKS = [
  { href: "#hyphen-vs-underscore", label: "Why Hyphens Outperform Underscores in Google" },
  { href: "#bulk-slug-creation", label: "Batch URL Slug Generation for Migrations" },
  { href: "#diacritics-and-accents", label: "Handling Non-English Characters in Clean Slugs" },
  { href: "#stop-words-best-practices", label: "Stop Words in URLs: When to Remove vs. Keep" },
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
              Table of Contents: SEO URL Architecture &amp; Permalinks Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump directly to hyphen rules, bulk slug conversion, or transliteration guides
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
      {/* SECTION 1: Why Hyphens Outperform Underscores in Google Indexing          */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="hyphen-vs-underscore"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Why Hyphens Outperform Underscores in Google Indexing
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Understanding how search engine tokenizers parse word delimiters in URL paths
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed">
          The choice of delimiter in your web URLs is not merely cosmetic. Google’s indexing systems treat punctuation marks with distinct syntactic meanings:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Delimiter Style</th>
                <th className="py-3.5 px-4">Example Slug</th>
                <th className="py-3.5 px-4">How Google Tokenizes</th>
                <th className="py-3.5 px-4">SEO Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Hyphen (<code className="text-emerald-600 font-bold">-</code>)
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  /seo-slug-generator
                </td>
                <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                  Separated: <code className="text-blue-600">[&quot;seo&quot;, &quot;slug&quot;, &quot;generator&quot;]</code>
                </td>
                <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                  Best Practice (Google Standard)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Underscore (<code className="text-amber-600 font-bold">_</code>)
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  /seo_slug_generator
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Joined: <code className="text-amber-600">[&quot;seosluggenerator&quot;]</code>
                </td>
                <td className="py-3 px-4 text-amber-600 dark:text-amber-400 font-semibold">
                  Avoid for SEO (Legacy / System use only)
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Spaces / Percent Encoded
                </td>
                <td className="py-3 px-4 font-mono text-rose-600 dark:text-rose-400">
                  /seo%20slug%20generator
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Percent-encoded literal string
                </td>
                <td className="py-3 px-4 font-bold text-rose-600 dark:text-rose-400">
                  Never Use (Causes 404 &amp; Broken Links)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Batch URL Slug Generation for Migrations & Stores              */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="bulk-slug-creation"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Batch URL Slug Generation for E-commerce &amp; CMS Migrations
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transforming bulk product catalogs, blog inventories, and taxonomy hierarchies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
              Workflow 1
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              E-Commerce Product Imports
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              When importing Shopify, WooCommerce, or Magento CSV inventories, paste product titles into Bulk Mode to generate clean, consistent SKU slugs with custom prefix paths like <code>/products/</code>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Workflow 2
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              CMS Redesigns &amp; 301 Maps
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Migrating from WordPress to Next.js or Astro? Export your raw post headings to CSV with matched old-vs-new permalinks to create instant 301 redirection lookup tables.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Workflow 3
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Programmatic SEO &amp; CSV Exports
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Build database tables for programmatic landing pages by bulk slugifying city, category, or service query combinations with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: How to Handle Non-English Characters & Diacritics             */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Scissors className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="diacritics-and-accents"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              How to Handle Non-English Characters &amp; Diacritics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Preventing percent-encoded corruption across international character sets
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 p-6 space-y-3 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Transliteration vs. URL Percent-Encoding
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            When European or accented characters are inserted directly into URLs without normalization, browsers and web servers convert them to UTF-8 percent-encoded bytes:
          </p>
          <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-1">
            <div><span className="text-rose-400">Raw Input:</span> Café &amp; Crème Brûlée</div>
            <div><span className="text-amber-400">Percent Encoded:</span> https://example.com/caf%C3%A9-%26-cr%C3%A8me-br%C3%BBl%C3%A9e</div>
            <div><span className="text-emerald-400">Transliterated:</span> https://example.com/cafe-creme-brulee</div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
            Our engine normalizes French, Spanish, German, and Portuguese characters (<code>é</code> → <code>e</code>, <code>ñ</code> → <code>n</code>, <code>ö</code> → <code>o</code>, <code>ß</code> → <code>ss</code>) so your links remain clean, readable, and easy to share across WhatsApp and social feeds.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: Stop Words in URLs: When to Remove vs. Keep                   */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="stop-words-best-practices"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Stop Words in URLs: When to Remove vs. Keep
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Balancing keyword density, grammatical context, and user readability
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="h-4 w-4" />
              <h3 className="text-base">When to Strip Stop Words</h3>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li><strong>Long titles (&gt;8 words):</strong> Stripping filler words trims the slug to under 50 characters, preventing mobile SERP truncation.</li>
              <li><strong>Broad commercial keywords:</strong> &quot;The 10 Best Running Shoes for Women&quot; → <code>/best-running-shoes-women</code>.</li>
              <li><strong>Repetitive conjunctions:</strong> Words like <em>and, with, or, in</em> add visual clutter without ranking benefit.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
              <CheckCircle2 className="h-4 w-4" />
              <h3 className="text-base">When to Keep Stop Words</h3>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li><strong>When meaning changes:</strong> &quot;To be or not to be&quot; would become empty if all stop words were removed.</li>
              <li><strong>Comparison queries:</strong> &quot;Next.js vs Remix&quot; requires <code>vs</code> to signal a comparison intent.</li>
              <li><strong>Brand names:</strong> Titles containing &quot;The North Face&quot; or &quot;A&amp;W&quot; should preserve brand tokens.</li>
            </ul>
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
              Expert guidance on URL structure, redirects, and search engine permalinks
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {SLUG_FAQS.map((faq, index) => (
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
      {/* SECTION 6: Related SEO & Marketing Utilities                             */}
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
              Complementary SEO &amp; Traffic Growth Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Preview search snippets and build tracked campaign URLs in parallel
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
                Test title and meta description pixel lengths against Google&apos;s 600px desktop threshold with AI meta generation powered by Gemini.
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

          {/* Linked Card: UTM Campaign Builder */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-purple-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shadow-sm group-hover:scale-105 transition-transform">
                <Globe className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-purple-100 dark:bg-purple-950 px-2.5 py-0.5 text-xs font-semibold text-purple-700 dark:text-purple-300">
                Marketing
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                GA4 UTM Campaign URL Builder
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate clean, trackable marketing campaign URLs with one-click channel presets, automatic sanitization, and QR code generation.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                /tools/marketing/utm-campaign-builder
              </span>
              <Link
                href="/tools/marketing/utm-campaign-builder"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform"
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
