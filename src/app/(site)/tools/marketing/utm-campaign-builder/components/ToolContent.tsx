import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Layers,
  Table,
  CheckCircle2,
  AlertTriangle,
  Code2,
  ArrowRight,
  ChevronRight,
  ListOrdered,
  Globe,
  Share2,
  Search,
  Sliders,
  ShieldAlert,
  BarChart3,
  Flame,
} from "lucide-react";

export interface UtmFaqItem {
  question: string;
  answer: string;
}

export const UTM_FAQS: UtmFaqItem[] = [
  {
    question: "Are UTM parameters case-sensitive in Google Analytics 4 (GA4)?",
    answer:
      "Yes, UTM parameters are strictly case-sensitive in GA4. If you use 'utm_source=facebook', 'utm_source=Facebook', and 'utm_source=FACEBOOK', Google Analytics 4 will record these as three completely separate traffic sources, fragmenting your campaign reports. Always enforce lowercase conventions company-wide.",
  },
  {
    question: "Why should you never use UTM parameters on internal website links?",
    answer:
      "Adding UTM parameters to internal site links (such as header navigation or internal blog links) immediately overwrites the visitor's original acquisition source and starts a new artificial session in GA4. This destroys your ability to track which marketing channel originally brought the user to your site and skews conversion attribution.",
  },
  {
    question: "How does GA4 Default Channel Grouping classify utm_medium?",
    answer:
      "GA4 uses built-in regex rules to automatically map utm_medium values to Default Channel Groups. For example, 'cpc', 'ppc', or 'paidsearch' maps to Paid Search; 'email' maps to Email; 'paid-social' or 'paid_social' maps to Paid Social; and 'affiliate' maps to Affiliates. Using non-standard medium names causes traffic to be classified as 'Unassigned'.",
  },
  {
    question: "What is the difference between utm_term and utm_content in GA4?",
    answer:
      "The 'utm_term' parameter is used primarily in paid search campaigns to record the specific keyword or search query that triggered an advertisement. The 'utm_content' parameter is used to differentiate between specific creative variants, banner sizes, or link locations (e.g. 'hero_cta' vs. 'footer_link') pointing to the same destination URL.",
  },
  {
    question: "What is the utm_id parameter used for in Google Analytics 4?",
    answer:
      "The 'utm_id' parameter represents the Campaign ID. It is primarily used to stitch and import external cost and ad spend data (such as non-Google advertising costs from Facebook or LinkedIn) directly into GA4 via Data Import using a CSV spreadsheet or automated API connector.",
  },
];

const TOC_LINKS = [
  { href: "#ga4-utm-parameters", label: "GA4 UTM Parameter Breakdown & Roles" },
  { href: "#default-channel-groupings", label: "GA4 Default Channel Grouping Matrix" },
  { href: "#utm-best-practices", label: "UTM Naming Conventions & Anti-Patterns" },
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
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
            <ListOrdered className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Table of Contents: GA4 UTM Campaign Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump directly to parameter roles, channel grouping rules, or FAQs
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
      {/* SECTION 1: GA4 vs Universal Analytics UTM Parameters                      */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="ga4-utm-parameters"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              GA4 UTM Parameter Breakdown &amp; Reporting Roles
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Understanding the 7 standard campaign parameters recognized by Google Analytics 4
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Parameter Key</th>
                <th className="py-3.5 px-4">Requirement</th>
                <th className="py-3.5 px-4">Example Value</th>
                <th className="py-3.5 px-4">GA4 Reporting Dimension</th>
                <th className="py-3.5 px-4">Description &amp; Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  utm_source
                </td>
                <td className="py-3 px-4 font-semibold text-rose-500">
                  Required
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  google, facebook, newsletter
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                  Session source / First user source
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Identifies the specific platform, advertiser, or publisher referring traffic.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  utm_medium
                </td>
                <td className="py-3 px-4 font-semibold text-rose-500">
                  Required
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  cpc, paid-social, email
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                  Session medium / Default Channel Group
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Categorizes the high-level marketing mechanism used to acquire the visitor.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  utm_campaign
                </td>
                <td className="py-3 px-4 font-semibold text-rose-500">
                  Required
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  summer_launch_2026
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                  Session campaign
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Names the individual marketing initiative, seasonal promo, or product launch.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  utm_term
                </td>
                <td className="py-3 px-4 text-slate-400">
                  Optional
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  seo_tools_free
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                  Session manual term
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Tracks specific paid search keywords or audience segment targets.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  utm_content
                </td>
                <td className="py-3 px-4 text-slate-400">
                  Optional
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  hero_btn_blue vs sidebar_cta
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                  Session manual ad content
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Differentiates between creative variations, ad formats, or button positions.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                  utm_id
                </td>
                <td className="py-3 px-4 text-slate-400">
                  Optional
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  camp_104
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                  Campaign ID
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Links external ad spend data (Meta, TikTok) with GA4 revenue via Data Import.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                  utm_source_platform
                </td>
                <td className="py-3 px-4 text-slate-400">
                  Optional
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                  Google Ads, Meta Ads
                </td>
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                  Source platform
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Identifies the media-buying platform responsible for budgeting or ad delivery.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: GA4 Default Channel Grouping Matrix                            */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="default-channel-groupings"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              GA4 Default Channel Grouping Matrix
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ensure your traffic is correctly categorized in Google Analytics reports without landing in &quot;Unassigned&quot;
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Default Channel Group</th>
                <th className="py-3.5 px-4">Required utm_medium Values</th>
                <th className="py-3.5 px-4">utm_source Requirements</th>
                <th className="py-3.5 px-4">Common Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Paid Search
                </td>
                <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">
                  cpc, ppc, paidsearch
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Recognized search engines (google, bing, yahoo)
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=google&amp;utm_medium=cpc
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Paid Social
                </td>
                <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                  paid-social, paidsocial, paid_social, cpc
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Recognized social sites (facebook, instagram, linkedin, tiktok)
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=facebook&amp;utm_medium=paid-social
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Email
                </td>
                <td className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400">
                  email, e-mail, e_mail, newsletter
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Any source (newsletter, klaviyo, mailchimp)
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=newsletter&amp;utm_medium=email
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Affiliates
                </td>
                <td className="py-3 px-4 font-mono text-amber-600 dark:text-amber-400">
                  affiliate, affiliates, partner
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Any partner or creator name
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=influencer_name&amp;utm_medium=affiliate
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Display
                </td>
                <td className="py-3 px-4 font-mono text-indigo-600 dark:text-indigo-400">
                  display, banner, cpm
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Ad networks or direct media buys
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=adroll&amp;utm_medium=display
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: UTM Naming Conventions & Best Practices                        */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="utm-best-practices"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              UTM Tracking Best Practices &amp; Critical Anti-Patterns
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Preserve clean session attribution and avoid common data fragmentation mistakes
            </p>
          </div>
        </div>

        {/* CRITICAL WARNING ALERT */}
        <div className="rounded-3xl border border-rose-300 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-rose-700 dark:text-rose-400">
            <ShieldAlert className="h-5 w-5" />
            <h3
              id="critical-internal-utm-warning"
              className="text-base font-bold scroll-mt-24"
            >
              CRITICAL RULE: Never Tag Internal Site Links with UTMs
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            UTM parameters are exclusively designed for <strong>inbound external marketing links</strong>. If you put UTM tags on an internal banner or header navigation on your own site, clicking that link immediately terminates the visitor&apos;s existing session, resets the attribution model, and credits all subsequent conversions to your internal tag rather than the original external campaign (Google Ads, Facebook, or Organic Search).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              Rule 1: Always Enforce Lowercase
            </span>
            <h3
              id="best-practice-lowercase"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Prevent Duplicate Rows in GA4
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              In GA4, <code>utm_source=Google</code> and <code>utm_source=google</code> are treated as separate channels. Use our Auto-Sanitizer to convert every input to lowercase automatically.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Rule 2: Standardize Separators
            </span>
            <h3
              id="best-practice-separators"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Use Underscores or Hyphens
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Never use spaces in parameter values, which get URL-encoded into messy <code>%20</code> strings. Adopt a strict standard like <code>summer_sale_2026</code> company-wide.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5 shadow-sm">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
              Rule 3: Match GA4 Channels
            </span>
            <h3
              id="best-practice-channels"
              className="text-sm font-bold text-slate-900 dark:text-white scroll-mt-24"
            >
              Avoid &quot;Unassigned&quot; Buckets
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Always use standard medium values (e.g. <code>cpc</code>, <code>paid-social</code>, <code>email</code>). Custom arbitrary words like <code>my_ad</code> will be lumped into &quot;Unassigned&quot;.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: Comprehensive FAQ Accordion                                    */}
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
              Expert answers to Google Analytics 4 campaign URL tracking and UTM parameter best practices
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {UTM_FAQS.map((faq, index) => (
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
      {/* SECTION 5: Related SEO & Web Utilities (Internal Cross-Linking)          */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="related-tools"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              Complementary SEO &amp; Traffic Optimization Utilities
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supercharge your organic Google click-through rates and social sharing performance
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
                SEO Flagship
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
        </div>
      </section>
    </article>
  );
}
