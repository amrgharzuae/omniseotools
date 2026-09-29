import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCode,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Search,
  Code2,
  Zap,
  Info,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Table,
  CheckSquare,
  Braces,
  ShoppingBag,
  FileText,
  ListOrdered,
} from "lucide-react";
import { schemaValidatorTool } from "@/config/tools/technical/schema-validator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { SchemaValidator } from "@/components/tools/schema-validator/SchemaValidator";

const CANONICAL_URL = "https://omniseotools.com/tools/schema-validator";

export const metadata: Metadata = {
  title: "JSON-LD Schema Validator & Linter | Free Rich Snippet Checker",
  description:
    "Validate, lint, and debug JSON-LD structured data client-side. Detect syntax errors, missing Schema.org required properties, and test Google Rich Snippet compliance with zero server tracking.",
  keywords: [
    "json ld validator",
    "schema validator",
    "schema linter",
    "structured data testing tool",
    "schema org validator",
    "google rich snippets validator",
    "json-ld debugger",
    "article schema validator",
    "product schema validator",
    "faq schema validator",
    "breadcrumb schema validator",
    "rich results test",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "JSON-LD Schema Validator & Linter | Free Rich Snippet Checker",
    description:
      "Validate, lint, and debug JSON-LD structured data client-side. Detect syntax errors, missing Schema.org required properties, and test Google Rich Snippet compliance with zero server tracking.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEOTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON-LD Schema Validator & Linter | Free Rich Snippet Checker",
    description:
      "Validate, lint, and debug JSON-LD structured data client-side. Detect syntax errors, missing Schema.org required properties, and test Google Rich Snippet compliance with zero server tracking.",
  },
};

export default function SchemaValidatorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEOTools JSON-LD Schema Validator & Linter",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description:
          "Validate, lint, and debug JSON-LD structured data client-side. Detect syntax errors, missing Schema.org required properties, and test Google Rich Snippet compliance with zero server tracking.",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "OmniSEOTools",
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
            name: "Technical SEO",
            item: "https://omniseotools.com/#category-technical",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "JSON-LD Schema Validator & Linter",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Validate and Lint JSON-LD Structured Data",
        description: "Step-by-step instructions to validate, debug, format, and verify JSON-LD schema markup client-side.",
        step: (schemaValidatorTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (schemaValidatorTool.faqs || []).map((faq) => ({
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

      {/* Breadcrumb & Hero Header */}
      <ToolHeader tool={schemaValidatorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot Container */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Interactive Tool Widget */}
        <section className="mt-4" aria-label="Interactive JSON-LD Schema Validator and Linter">
          <ToolErrorBoundary
            toolSlug={schemaValidatorTool.slug}
            toolName={schemaValidatorTool.name}
          >
            <SchemaValidator
              toolSlug={schemaValidatorTool.slug}
              toolName={schemaValidatorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* ========================================================================= */}
        {/* 3. INTERNAL ECOSYSTEM CROSS-LINKING MATRIX                                */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-sky-500/5 to-transparent dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900/60 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Need to generate valid schema? Use our generator suite:
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Create certified Schema.org JSON-LD snippets with zero manual coding.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            <Link
              href="/tools/article-schema-generator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-indigo-500" />
                  Article Schema Generator
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Generate TechArticle &amp; BlogPosting markup with author and image fields.
              </p>
            </Link>

            <Link
              href="/tools/product-schema-generator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5 text-emerald-500" />
                  Product &amp; Offer Schema
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Build Offer, AggregateRating, and GTIN merchant center structured data.
              </p>
            </Link>

            <Link
              href="/tools/faq-schema-generator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
                  FAQ Schema Generator
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Create FAQPage questions and accepted answers for rich SERP accordions.
              </p>
            </Link>

            <Link
              href="/tools/breadcrumb-schema-generator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <ListOrdered className="h-3.5 w-3.5 text-amber-500" />
                  Breadcrumb Schema Generator
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Generate clean navigational hierarchy chains for Google search snippets.
              </p>
            </Link>

            <Link
              href="/tools/schema-markup-generator"
              className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-500 transition-all shadow-xs sm:col-span-2 lg:col-span-2"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-purple-500" />
                  All-in-One Schema Markup Generator
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Universal visual schema builder supporting Organization, LocalBusiness, WebSite, Event, and Recipe.
              </p>
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CRAWLABLE AI-OPTIMIZED GUIDE SECTION                                   */}
        {/* ========================================================================= */}
        <article className="mt-12 space-y-12 text-slate-700 dark:text-slate-300">
          
          {/* Direct Answer Callout Box */}
          <section className="rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6 sm:p-7 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white shadow-xs">
                <Zap className="h-4 w-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Direct Answer: Why Validate JSON-LD Client-Side?
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
              JSON-LD structured data validation is the process of testing machine-readable schema markup against strict JSON syntax specifications and Google Search Central requirements. Because search engine parsers discard entire script blocks upon encountering a single syntax error (such as trailing commas or unescaped quotes), validating markup client-side prevents Google Search Console coverage warnings and ensures your pages qualify for high-converting Google Rich Results (star ratings, price tags, and FAQ dropdowns) before deployment.
            </p>
          </section>

          {/* Table: Common JSON-LD Syntax Mistakes */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Table className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Common JSON-LD Syntax Mistakes &amp; Quick Fixes
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Review the most frequent structured data formatting errors identified across web audits and how to resolve them:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Error</th>
                    <th className="py-3.5 px-4">Cause</th>
                    <th className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400">Quick Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">Trailing Comma</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Extra comma after final object property</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">Delete trailing comma before closing brace</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">Unescaped Double Quotes</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Unescaped &quot; inside title or description string</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">Replace with \&quot; or use single quotes</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">Missing Context</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Omitting @context declaration</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">Add &quot;@context&quot;: &quot;https://schema.org&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">Missing Offers on Product</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">Omitting price and currency in e-commerce schema</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">Nest &quot;offers&quot;: &#123; &quot;@type&quot;: &quot;Offer&quot;, ... &#125;</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-rose-600 dark:text-rose-400">Invalid Breadcrumb Position</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">0-indexed or non-sequential integer positions</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400">Use 1-indexed integers: 1, 2, 3...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Technical Guide Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                How Google Evaluates Structured Data in 2026
              </h2>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Google Search employs advanced algorithmic verification to evaluate whether structured data represents legitimate, user-visible content. Adding JSON-LD for elements that do not exist on the page (known as <em>cloaked schema</em>) violates Google Search Essentials and can result in algorithmic Rich Result demotions or manual spam actions.
              </p>
              <p>
                To maximize your chances of winning rich snippets:
              </p>
              <ul>
                <li><strong>Harmonize with On-Page Copy:</strong> Ensure the <code>headline</code>, <code>price</code>, and <code>author</code> in your JSON-LD strictly match the visible text on the rendered page.</li>
                <li><strong>Include Author Identity:</strong> E-E-A-T guidelines emphasize verifiable creator identities. Always provide an <code>author</code> object of type <code>Person</code> with a relevant <code>url</code> pointing to the author&apos;s bio or social profile.</li>
                <li><strong>Nest Related Entities:</strong> Use nested Schema.org structures (e.g. attaching <code>AggregateRating</code> and <code>Offer</code> inside a <code>Product</code>) rather than disjointed, detached objects.</li>
              </ul>
            </div>
          </section>

          {/* FAQ Accordions Section */}
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
                  Understanding JSON-LD syntax rules, Google crawler discovery, and debugging
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {schemaValidatorTool.faqs?.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5 transition-all open:ring-1 open:ring-emerald-500/20"
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

        {/* Related Tools Internal Linking Mesh */}
        <div className="mt-12">
          <RelatedTools currentTool={schemaValidatorTool} />
        </div>

        {/* Bottom AdSlot Container */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
