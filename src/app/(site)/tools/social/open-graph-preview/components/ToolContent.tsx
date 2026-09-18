import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Layers,
  Sparkles,
  Share2,
  Table,
  CheckCircle2,
  Code2,
  RefreshCw,
  ArrowRight,
  ChevronRight,
  ListOrdered,
  Globe,
  ExternalLink,
  ShieldAlert,
  Search,
  MessageSquare,
  FileCode,
  AlertTriangle,
  Zap,
} from "lucide-react";

export interface OgFaqItem {
  question: string;
  answer: string;
}

export const OG_FAQS: OgFaqItem[] = [
  {
    question: "What is the best image size for Open Graph and Twitter cards in 2026?",
    answer:
      "The universal standard resolution for Open Graph images is 1200 x 630 pixels (1.91:1 aspect ratio). This exact resolution ensures crisp presentation across Facebook, Twitter/X summary_large_image, LinkedIn, WhatsApp, Discord, and iMessage without unwanted edge cropping or blurry downscaling.",
  },
  {
    question: "Why do WhatsApp and iMessage fail to show preview cards for my link?",
    answer:
      "WhatsApp and iMessage have strict crawler constraints: the og:image must be under 300KB in file size, served over a valid HTTPS connection with a complete SSL certificate chain (no self-signed or incomplete intermediate certs), and referenced using a full absolute URL (e.g., https://yourdomain.com/og.png rather than /og.png).",
  },
  {
    question: "How do I configure Open Graph metadata in Next.js 14 and 15 App Router?",
    answer:
      "In Next.js App Router, export a static `metadata: Metadata` object or an async `generateMetadata()` function from your page.tsx or layout.tsx file. Populate the `openGraph` and `twitter` properties with titles, descriptions, and an array of image objects specifying width (1200), height (630), and alt text.",
  },
  {
    question: "What is the difference between summary and summary_large_image on Twitter (X)?",
    answer:
      "The 'summary_large_image' card format renders a prominent full-width 1200x630 banner above your title and domain, occupying maximum visual real estate in user feeds. In contrast, the standard 'summary' card type displays a small 1:1 square thumbnail (minimum 144x144px) to the left of the text snippet.",
  },
  {
    question: "How do I force Facebook and LinkedIn to refresh my preview card after updating images?",
    answer:
      "Major social platforms aggressively cache Open Graph metadata for up to 30 days. To force an immediate re-scrape, submit your URL to the official Facebook Sharing Debugger and LinkedIn Post Inspector. For Twitter (X), appending a cache-busting query parameter (e.g. ?v=2) bypasses the cached card immediately.",
  },
  {
    question: "Can I use WebP or SVG file formats for my og:image?",
    answer:
      "While modern web browsers natively support WebP and SVG, several legacy social scrapers, SMS messaging clients, and enterprise chat tools only support standard JPG and PNG formats. For maximum universal delivery across all platforms, exporting your 1200x630 social graphics as compressed JPG or PNG is strongly recommended.",
  },
];

const TOC_LINKS = [
  { href: "#aspect-ratios", label: "Image Aspect Ratios & Dimension Matrix 2026" },
  { href: "#whatsapp-imessage-rules", label: "Why WhatsApp & iMessage Drop Previews" },
  { href: "#nextjs-og-metadata", label: "Next.js App Router Open Graph Guide" },
  { href: "#cache-purging", label: "How to Debug & Clear Social Media Caches" },
  { href: "#faq", label: "Frequently Asked Questions (FAQ)" },
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
              Table of Contents: Open Graph Architecture Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump directly to aspect ratios, WhatsApp chat rules, or Next.js code recipes
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
      {/* SECTION 1: Social Media Image Dimensions 2026                             */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="aspect-ratios"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              2026 Social Media Open Graph Dimension Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Optimal resolutions, aspect ratios, file size limits, and safe-zone margins across platforms
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Social Platform &amp; Card Type</th>
                <th className="py-3.5 px-4">Recommended Size</th>
                <th className="py-3.5 px-4">Aspect Ratio</th>
                <th className="py-3.5 px-4">Max File Size</th>
                <th className="py-3.5 px-4">Safe Zone &amp; Layout Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Facebook Feed / Messenger Link Preview
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  1200 × 630 px
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  1.91 : 1
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  8 MB (Under 1MB ideal)
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Keep essential text within center 1000×500px to avoid mobile cropping
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Twitter (X) <code className="text-blue-600">summary_large_image</code>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  1200 × 630 px (or 1200 × 600)
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  1.91 : 1 (or 2 : 1)
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  5 MB max
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Full-width banner with domain badge pinned at bottom-left corner
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  Twitter (X) Standard <code className="text-blue-600">summary</code>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                  600 × 600 px (Min 144 × 144)
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  1 : 1 (Square)
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  5 MB max
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Compact thumbnail aligned to the left of the title and summary
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  LinkedIn Post &amp; Message Cards
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  1200 × 627 px (or 1200 × 630)
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  1.91 : 1
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  5 MB max
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Displays rectangular header card with bold title and domain attribution
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                  WhatsApp &amp; iMessage Chat Previews
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  1200 × 630 px (Square fallback 400×400)
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  1.91 : 1 / 1 : 1
                </td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">
                  Under 300 KB strictly
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Must be under 300KB for instant inline chat unfurling on mobile clients
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Why WhatsApp and iMessage Fail to Show Link Previews           */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="whatsapp-imessage-rules"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Why WhatsApp and iMessage Fail to Show Link Previews
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The 3 critical technical bottlenecks that cause mobile messaging apps to drop preview cards
            </p>
          </div>
        </div>

        {/* Warning Callout Box */}
        <div className="rounded-3xl border border-amber-300 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">
            <AlertTriangle className="h-5 w-5" />
            <h3
              id="whatsapp-300kb-rule"
              className="text-base scroll-mt-24"
            >
              The Strict 300 KB Mobile Paywall Rule
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Unlike web social networks (Facebook, Twitter, LinkedIn) which cache multi-megabyte images on enterprise CDNs, <strong>WhatsApp and Apple iMessage perform link parsing directly on user mobile devices</strong>. To protect cellular bandwidth, both clients will immediately abort the image download if the referenced <code>og:image</code> exceeds <strong>300 KB</strong> or takes longer than 3 seconds to respond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Requirement 1
            </span>
            <h3
              id="req-file-size"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Compress Under 300 KB
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Export your 1200×630 graphics as optimized PNGs or 80%-quality JPGs. Keep the total file weight between 100 KB and 280 KB for instant mobile unfurling.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Requirement 2
            </span>
            <h3
              id="req-ssl-chain"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Complete SSL Certificate Chain
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Apple iMessage rejects preview unfurls if your HTTPS server has missing intermediate CA certificates (even if Chrome appears green). Verify your SSL chain on Qualys SSL Labs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
              Requirement 3
            </span>
            <h3
              id="req-absolute-urls"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Full Absolute HTTPS URLs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Never use relative paths like <code>/og.png</code>. Messaging scrapers do not resolve relative domain roots; always provide <code>https://yourdomain.com/og.png</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: Next.js App Router Open Graph Configuration Guide              */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <FileCode className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="nextjs-og-metadata"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Next.js App Router Open Graph Configuration Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How to export typed Metadata objects in Next.js 14 and 15 without third-party head plugins
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            In modern Next.js App Router (versions 13, 14, and 15), you no longer need <code>next/head</code> or React Helmet. Instead, define a statically typed <code>Metadata</code> object directly inside any <code>page.tsx</code> or <code>layout.tsx</code> file:
          </p>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-5 font-mono text-xs text-slate-200 shadow-sm overflow-x-auto">
            <pre className="leading-relaxed">
{`// src/app/your-page/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Page Title | Brand Name",
  description: "A high-CTR summary snippet of your web page content.",
  alternates: {
    canonical: "https://yourdomain.com/your-page",
  },
  openGraph: {
    title: "Your Page Title | Brand Name",
    description: "A high-CTR summary snippet of your web page content.",
    url: "https://yourdomain.com/your-page",
    siteName: "Brand Name",
    images: [
      {
        url: "https://yourdomain.com/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Preview banner for your web page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Page Title | Brand Name",
    description: "A high-CTR summary snippet of your web page content.",
    images: ["https://yourdomain.com/og-image-1200x630.png"],
  },
};

export default function Page() {
  return <main>{/* Your Page Content */}</main>;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: How to Clear Facebook, LinkedIn, & X Image Caches              */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="cache-purging"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              How to Debug &amp; Purge Social Media Caches
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Step-by-step instructions to force social platforms to display your newest image assets
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Facebook</span>
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            </div>
            <h3
              id="debug-facebook"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Facebook Sharing Debugger
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Navigate to the Facebook Sharing Debugger, enter your canonical URL, and click <strong>&quot;Scrape Again&quot;</strong>. This immediately updates Facebook&apos;s edge CDN cache.
            </p>
            <a
              href="https://developers.facebook.com/tools/debug/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline pt-1"
            >
              <span>Launch FB Debugger</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">LinkedIn</span>
              <span className="h-2 w-2 rounded-full bg-blue-700" />
            </div>
            <h3
              id="debug-linkedin"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              LinkedIn Post Inspector
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Submit your page to LinkedIn&apos;s Post Inspector tool. It shows the exact parsed image, title, and timestamp of the last successful scrape while clearing old memory.
            </p>
            <a
              href="https://www.linkedin.com/post-inspector/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline pt-1"
            >
              <span>Launch Post Inspector</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase">Twitter (X)</span>
              <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-100" />
            </div>
            <h3
              id="debug-twitter"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Cache-Busting Query Parameter
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Twitter caches cards heavily. To force a refresh, append a dummy query parameter when testing or sharing (e.g. <code>https://yourdomain.com/post?v=2</code>) to bypass previous scrape records.
            </p>
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
              id="faq"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Expert answers to Open Graph formatting, aspect ratios, and social meta tag validation
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {OG_FAQS.map((faq, index) => (
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
      {/* SECTION 6: Related SEO & Web Utilities (Internal Cross-Linking)          */}
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
              Complementary SEO &amp; Snippet Optimization Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enhance your search visibility and click-through rates across search and social
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
              <h3
                id="link-serp-preview"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors scroll-mt-24"
              >
                Google SERP Simulator &amp; Meta Pixel Counter
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test and optimize your SEO title and description with pixel accuracy against Google&apos;s 600px desktop and 580px mobile limits. Includes AI snippet generation powered by Google Gemini.
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
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-sm hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                <Globe className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                Marketing
              </span>
            </div>

            <div>
              <h3
                id="link-utm-builder"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors scroll-mt-24"
              >
                UTM Campaign URL Builder
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate clean, trackable marketing campaign URLs with standardized utm_source, utm_medium, and utm_campaign parameters for Google Analytics 4 (GA4).
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 font-semibold">
                /tools/marketing/utm-campaign-builder
              </span>
              <Link
                href="/tools/marketing/utm-campaign-builder"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
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
