import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Code2,
  FileCode,
  Layers,
  Cpu,
  EyeOff,
  CreditCard,
  Gauge,
} from "lucide-react";
import { permissionsPolicyBuilderTool } from "@/config/tools/developer/permissions-policy-builder";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { PermissionsPolicyBuilder } from "@/components/tools/permissions-policy-builder/PermissionsPolicyBuilder";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/permissions-policy-builder";

export const metadata: Metadata = {
  title: permissionsPolicyBuilderTool.title || "Permissions-Policy Header Generator (Feature-Policy) | OmniSEO Tools",
  description: permissionsPolicyBuilderTool.metaDescription,
  keywords: permissionsPolicyBuilderTool.keywords,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: permissionsPolicyBuilderTool.title || "Permissions-Policy Header Generator (Feature-Policy) | OmniSEO Tools",
    description: permissionsPolicyBuilderTool.metaDescription,
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: permissionsPolicyBuilderTool.title || "Permissions-Policy Header Generator (Feature-Policy) | OmniSEO Tools",
    description: permissionsPolicyBuilderTool.metaDescription,
  },
};

export default function PermissionsPolicyBuilderPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEO Tools HTTP Permissions-Policy Header Builder",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description: permissionsPolicyBuilderTool.metaDescription,
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
            name: "Web & Developer",
            item: "https://omniseotools.com/#category-developer",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Permissions-Policy Header Builder",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Build and Harden HTTP Permissions-Policy Headers",
        description:
          "Step-by-step guide to generating, auditing, and deploying hardened Permissions-Policy headers for Next.js, Cloudflare, Nginx, and Apache.",
        step: (permissionsPolicyBuilderTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (permissionsPolicyBuilderTool.faqs || []).map((faq) => ({
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
      {/* Schema.org JSON-LD Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
      />

      {/* Hero Header & Breadcrumbs */}
      <ToolHeader tool={permissionsPolicyBuilderTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Cross-Linking Bridge Card (Ecosystem Mesh) */}
        <section className="mb-6 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Complementary Web Security &amp; Header Utilities
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Build full-stack CSP directives, audit meta security tags, block AI scrapers, and calculate CWV budgets.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/security-headers-meta-generator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Security Headers Meta</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/csp-header-builder"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>CSP Header Builder</span>
              </Link>
              <Link
                href="/tools/ai-crawler-firewall"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>AI Crawler Firewall</span>
              </Link>
              <Link
                href="/tools/core-web-vitals-budget-calculator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>CWV Budget Calculator</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Workspace Widget */}
        <section
          className="mt-2"
          id="tool-interactive"
          aria-label="Interactive HTTP Permissions-Policy Header Builder"
        >
          <ToolErrorBoundary
            toolSlug={permissionsPolicyBuilderTool.slug}
            toolName={permissionsPolicyBuilderTool.name}
          >
            <PermissionsPolicyBuilder
              toolSlug={permissionsPolicyBuilderTool.slug}
              toolName={permissionsPolicyBuilderTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Crawlable Technical Documentation & Direct Answer Box */}
        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-50/50 via-white to-slate-50 dark:from-purple-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                Direct Answer: What is Permissions-Policy &amp; Why is It Crucial?
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              <strong>Permissions-Policy</strong> (formerly <em>Feature-Policy</em>) is a standardized HTTP response header (W3C Working Draft) that allows webmasters to declare which browser APIs, hardware sensors, and tracking features can be executed by a website and any embedded <code>&lt;iframe&gt;</code> elements. By explicitly setting directives like <code>camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()</code>, websites prevent rogue third-party advertising scripts, analytics tags, or compromised dependencies from silently eavesdropping on microphones, accessing webcams, tracking physical GPS coordinates, or compiling Google FLoC / Topics behavioral interest profiles without explicit user authorization.
            </p>
          </div>

          {/* 2. Comparison Table: Permissions-Policy vs Content-Security-Policy (CSP) vs Feature-Policy */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Security Headers Comparison Matrix
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Architectural distinctions between Permissions-Policy, CSP, and legacy Feature-Policy
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold text-slate-700 dark:text-slate-300">
                    <th className="p-3.5">Security Header</th>
                    <th className="p-3.5">Primary Function</th>
                    <th className="p-3.5">Primary Threat Mitigated</th>
                    <th className="p-3.5">Current Specification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-purple-600 dark:text-purple-400">
                      Permissions-Policy
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Restricts browser hardware (camera, mic, GPS) &amp; privacy tracking APIs (FLoC, Topics, payments)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Rogue third-party script hardware access, behavioral ad tracking, and unauthorized sensor fingerprinting
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        W3C Working Draft (Active Standard)
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-slate-500 dark:text-slate-400">
                      Feature-Policy
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Legacy predecessor to Permissions-Policy (semicolon-delimited format)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Unauthorized browser feature execution in legacy Chromium &amp; Gecko builds
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                        Deprecated (Replaced by Permissions-Policy)
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-blue-600 dark:text-blue-400">
                      Content-Security-Policy (CSP)
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                      Controls origin sources for scripts, styles, images, fonts, frames, and connect endpoints
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Cross-Site Scripting (XSS), data injection, clickjacking (frame-ancestors), and packet sniffing
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        W3C Recommendation (Standard)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Deep Technical Guide */}
        <div className="mt-12">
          <ToolGuide tool={permissionsPolicyBuilderTool} />
        </div>

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={permissionsPolicyBuilderTool.name}
          category={permissionsPolicyBuilderTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={permissionsPolicyBuilderTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={permissionsPolicyBuilderTool} />

        {/* Bottom Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
