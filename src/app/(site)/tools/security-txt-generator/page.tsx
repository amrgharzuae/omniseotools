import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Info,
  Server,
  FileCode,
  Table,
} from "lucide-react";
import { securityTxtGeneratorTool } from "@/config/tools/developer/security-txt-generator";
import { ToolHeader } from "@/components/tool-layout/ToolHeader";
import { RelatedTools } from "@/components/tool-layout/RelatedTools";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolErrorBoundary } from "@/components/common/ToolErrorBoundary";
import { SecurityTxtGenerator } from "@/components/tools/security-txt-generator/SecurityTxtGenerator";
import { ToolGuide } from "@/components/tool-layout/ToolGuide";
import { ToolFAQ } from "@/components/tool-layout/ToolFAQ";
import { ComparisonMatrix } from "@/components/seo/ComparisonMatrix";

const CANONICAL_URL = "https://omniseotools.com/tools/security-txt-generator";

export const metadata: Metadata = {
  title: securityTxtGeneratorTool.title || "RFC 9116 security.txt Generator & Validator | OmniSEO Tools",
  description: securityTxtGeneratorTool.metaDescription,
  keywords: securityTxtGeneratorTool.keywords,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: securityTxtGeneratorTool.title || "RFC 9116 security.txt Generator & Validator | OmniSEO Tools",
    description: securityTxtGeneratorTool.metaDescription,
    url: CANONICAL_URL,
    type: "website",
    siteName: "OmniSEO Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: securityTxtGeneratorTool.title || "RFC 9116 security.txt Generator & Validator | OmniSEO Tools",
    description: securityTxtGeneratorTool.metaDescription,
  },
};

export default function SecurityTxtGeneratorPage() {
  const structuredDataGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "OmniSEO Tools RFC 9116 Security.txt Generator & Validator",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: CANONICAL_URL,
        description: securityTxtGeneratorTool.metaDescription,
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
            name: "Security.txt Generator",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to Generate an RFC 9116 Standard Compliant security.txt File",
        description:
          "Step-by-step guide to generating and deploying a valid RFC 9116 security.txt file for responsible vulnerability disclosure.",
        step: (securityTxtGeneratorTool.howToSteps || []).map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: (securityTxtGeneratorTool.faqs || []).map((faq) => ({
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
      <ToolHeader tool={securityTxtGeneratorTool} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        {/* Top Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Cross-Linking Bridge Card */}
        <section className="mb-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Complementary Web Security &amp; Header Utilities
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Build HTTP Permissions-Policy headers, inspect HTTP response headers, and generate CSP rules.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/tools/permissions-policy-builder"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Permissions-Policy Builder</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/tools/http-status-checker"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>HTTP Status Checker</span>
              </Link>
              <Link
                href="/tools/robots-txt-generator-validator"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Robots.txt Validator</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Workspace Widget */}
        <section
          className="mt-2"
          id="tool-interactive"
          aria-label="Interactive RFC 9116 Security.txt Generator and Validator"
        >
          <ToolErrorBoundary
            toolSlug={securityTxtGeneratorTool.slug}
            toolName={securityTxtGeneratorTool.name}
          >
            <SecurityTxtGenerator
              toolSlug={securityTxtGeneratorTool.slug}
              toolName={securityTxtGeneratorTool.name}
            />
          </ToolErrorBoundary>
        </section>

        {/* Mid-Content In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Crawlable Technical Documentation & Direct Answer Box */}
        <article className="mt-8 space-y-10 text-slate-700 dark:text-slate-300">
          {/* 1. Direct Answer Callout Box */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-7 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
                <Info className="h-4 w-4" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Direct Answer: What is RFC 9116 security.txt?
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
              <strong>RFC 9116</strong> is the official IETF standard specification that mandates how websites disclose their security reporting policies. By placing a plain-text <code>security.txt</code> file at <code>/.well-known/security.txt</code>, organizations provide ethical security researchers and white-hat bug hunters with authenticated contact channels (<code>Contact: mailto:...</code> or HTTPS web forms), policy guidelines (<code>Policy: https://...</code>), and an mandatory expiration date (<code>Expires: 2027-10-01...</code>). This prevents lost vulnerability notices, reduces legal ambiguities with Safe Harbor provisions, and protects website infrastructure from undisclosed zero-day exploits.
            </p>
          </div>

          {/* 2. Directives Reference Table */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Table className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  RFC 9116 Directives Specification Matrix
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standard compliance requirements, formats, and placement guidelines
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold text-slate-700 dark:text-slate-300">
                    <th className="p-3.5">Directive</th>
                    <th className="p-3.5">Requirement Level</th>
                    <th className="p-3.5">Format / Syntax</th>
                    <th className="p-3.5">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      Contact
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Mandatory
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      mailto:user@domain or https://...
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Direct email address or bug bounty portal for vulnerability intake.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      Expires
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        Mandatory
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      ISO 8601 (e.g. 2027-10-01T00:00:00+00:00)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Expiration timestamp to ensure security policies remain actively maintained.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-slate-700 dark:text-slate-300">
                      Encryption
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Optional
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      https://... (PGP Key URL)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Public PGP/GPG key for end-to-end encrypted vulnerability report submissions.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-slate-700 dark:text-slate-300">
                      Canonical
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Optional
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      https://domain.com/.well-known/security.txt
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Authoritative URL to guard against cache poisoning and proxy tampering.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-slate-700 dark:text-slate-300">
                      Policy
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Optional
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      https://... (Policy URL)
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      Rules of engagement and Safe Harbor legal protection terms for researchers.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>

        {/* Deep Technical Guide */}
        <div className="mt-12">
          <ToolGuide tool={securityTxtGeneratorTool} />
        </div>

        {/* Feature Comparison Matrix */}
        <ComparisonMatrix
          toolName={securityTxtGeneratorTool.name}
          category={securityTxtGeneratorTool.category}
        />

        {/* Interactive FAQ Section */}
        <ToolFAQ tool={securityTxtGeneratorTool} />

        {/* Contextual Related Tools */}
        <RelatedTools currentTool={securityTxtGeneratorTool} />

        {/* Bottom Zero-CLS AdSlot */}
        <AdSlot slotType="leaderboard" className="mt-12" />
      </main>
    </div>
  );
}
