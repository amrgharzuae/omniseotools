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
  Sparkles,
  Zap,
} from "lucide-react";

export interface UtmFaqItem {
  question: string;
  answer: string;
}

export const UTM_FAQS: UtmFaqItem[] = [
  {
    question: "What is the difference between this tool and the standard Campaign URL Builder?",
    answer:
      "Unlike the standard Google Analytics Campaign URL Builder, our free client-side tool executes 100% in your browser with zero data tracking or server storage. It features 1-click platform presets for Google Ads, Meta, TikTok, and LinkedIn, automated lowercasing and hyphen sanitization toggles to prevent GA4 parameter fragmentation, real-time amber validation warnings, instant high-resolution QR code generator with PNG downloads, and direct matrix batch generation via the Bulk UTM Matrix Generator.",
  },
  {
    question: "Are UTM parameters case-sensitive in Google Analytics 4?",
    answer:
      "Yes, UTM parameters are strictly case-sensitive in Google Analytics 4 (GA4). For instance, 'utm_source=facebook', 'utm_source=Facebook', and 'utm_source=FACEBOOK' will be recorded as three distinct traffic sources in your Acquisition reports, splitting your visitor sessions, engagement metrics, and conversion revenue across fragmented rows. Always keep our Auto-Lowercase toggle enabled to standardize all links company-wide.",
  },
  {
    question: "Does UTM order matter in a campaign URL?",
    answer:
      "No, query parameter order does not matter to web servers or Google Analytics 4. GA4 parses query strings into key-value pairs regardless of whether 'utm_source' comes before or after 'utm_campaign'. However, adopting a uniform order (e.g., utm_source, utm_medium, utm_campaign, utm_term, utm_content) across your marketing team makes URLs easier to read, debug, and manage in tracking spreadsheets.",
  },
  {
    question: "What is a campaign URL builder?",
    answer:
      "A campaign URL builder is a specialized digital marketing utility that appends standardized query string parameters (known as UTM parameters) to a destination landing page URL. These parameters enable Google Analytics 4 (GA4), advertising platforms, and CRMs to accurately attribute user traffic, sign-ups, and revenue to specific marketing channels, ad groups, and creative variations.",
  },
  {
    question: "How does GA4 Default Channel Grouping classify utm_medium?",
    answer:
      "GA4 uses built-in regex rules to automatically categorize incoming sessions into Default Channel Groups based on your utm_medium. For example, 'cpc', 'ppc', or 'paidsearch' maps to Paid Search; 'paid_social' or 'paid-social' maps to Paid Social; 'email' or 'newsletter' maps to Email; and 'affiliate' maps to Affiliates. Using non-standard medium names causes traffic to be classified as 'Unassigned'.",
  },
  {
    question: "Why should you never use UTM parameters on internal website links?",
    answer:
      "Adding UTM parameters to internal site links (such as header navigation, footer links, or homepage banners) immediately terminates the visitor's existing session and initiates an artificial new session in GA4. This destroys your original acquisition channel attribution and inflates session counts while obscuring true marketing ROI.",
  },
  {
    question: "What is the difference between utm_term and utm_content in GA4?",
    answer:
      "The 'utm_term' parameter is primarily used in paid search campaigns to capture the specific target keyword or audience segment. The 'utm_content' parameter is used to differentiate between creative variations, ad copy iterations, banner dimensions, or specific CTA button placements (e.g., 'hero_cta_blue' vs. 'footer_link') pointing to the same destination URL.",
  },
  {
    question: "What is the utm_id parameter used for in Google Analytics 4?",
    answer:
      "The 'utm_id' parameter represents the Campaign ID. It is used to stitch external ad spend and cost data (such as advertising spend from Meta, TikTok, or LinkedIn) directly into GA4 via Data Import using a CSV spreadsheet or automated API connector.",
  },
];

const TOC_LINKS = [
  { href: "#how-to-use-ga4-builder", label: "How to Use the Google Analytics URL Builder Tool for GA4" },
  { href: "#ga4-channel-grouping-best-practices", label: "GA4 Default Channel Grouping Best Practices" },
  { href: "#ga4-utm-parameters", label: "GA4 UTM Parameter Breakdown & Roles" },
  { href: "#utm-best-practices", label: "UTM Tracking Best Practices & Anti-Patterns" },
  { href: "#frequently-asked-questions", label: "Frequently Asked Questions (FAQ)" },
  { href: "#related-tools", label: "Related SEO & Marketing Utilities" },
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
              Table of Contents: GA4 Campaign URL Builder Guide
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jump directly to step-by-step instructions, channel grouping rules, or FAQs
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
      {/* SECTION 1: How to Use the Google Analytics URL Builder Tool for GA4       */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="how-to-use-ga4-builder"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              How to Use the Google Analytics URL Builder Tool for GA4
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A 3-step technical breakdown to construct clean, compliant Google Analytics 4 tracking links
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Google Analytics 4 (GA4) relies on <strong>Urchin Tracking Module (UTM)</strong> query parameters appended to URLs to attribute traffic sources, user engagement, and e-commerce conversions. Follow this simple 3-step framework to tag every inbound link:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                1
              </span>
              <code className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                utm_source
              </code>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Define the Traffic Source
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Identify the exact platform, publisher, or referrer driving the visitor to your site (e.g., <code className="font-mono text-slate-800 dark:text-slate-200">google</code>, <code className="font-mono text-slate-800 dark:text-slate-200">facebook</code>, <code className="font-mono text-slate-800 dark:text-slate-200">tiktok</code>, <code className="font-mono text-slate-800 dark:text-slate-200">newsletter</code>, or <code className="font-mono text-slate-800 dark:text-slate-200">linkedin</code>).
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-sm">
                2
              </span>
              <code className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                utm_medium
              </code>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Set the Marketing Medium
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Specify the high-level marketing mechanism (e.g., <code className="font-mono text-slate-800 dark:text-slate-200">cpc</code> for Paid Search, <code className="font-mono text-slate-800 dark:text-slate-200">paid_social</code> for social ads, <code className="font-mono text-slate-800 dark:text-slate-200">email</code> for broadcasts) to ensure seamless GA4 Default Channel Grouping.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-sm">
                3
              </span>
              <code className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded">
                utm_campaign
              </code>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Name the Strategic Campaign
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Assign a distinct promo name or product identifier (e.g., <code className="font-mono text-slate-800 dark:text-slate-200">summer_sale_2026</code>, <code className="font-mono text-slate-800 dark:text-slate-200">product_launch_v2</code>). Use lowercase and hyphens to keep attribution clean.
            </p>
          </div>
        </div>

        {/* Direct Interlinking Banner Callout */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
            <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Need to tag multiple landing pages at once?</span>
          </div>
          <Link
            href="/tools/bulk-utm-matrix-generator"
            className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
          >
            <span>Try the Bulk UTM Matrix Generator</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: GA4 Default Channel Grouping Best Practices                     */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="ga4-channel-grouping-best-practices"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight scroll-mt-24"
            >
              GA4 Default Channel Grouping Best Practices
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Map advertising platforms to exact utm_medium values to prevent traffic from landing in &quot;Unassigned&quot;
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Google Analytics 4 uses rigid regex rules to classify incoming user sessions into Default Channel Groups. If an unfamiliar or misspelled <code className="font-mono text-emerald-600 dark:text-emerald-400">utm_medium</code> is supplied, GA4 automatically buckets the session as <strong>Unassigned</strong>, blinding your performance reports. Use the standard mapping below:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Channel Grouping</th>
                <th className="py-3.5 px-4">Ad Platform / Channel</th>
                <th className="py-3.5 px-4">Required utm_medium</th>
                <th className="py-3.5 px-4">utm_source Requirement</th>
                <th className="py-3.5 px-4">Example Tracking URL Query</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Paid Search
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Google Ads, Microsoft Advertising, Yahoo Search
                </td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  cpc, ppc, paidsearch
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  google, bing, yahoo
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=google&amp;utm_medium=cpc
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Paid Social
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Meta (Facebook/Instagram), TikTok Ads, LinkedIn Ads, Pinterest Ads
                </td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                  paid_social, paid-social, paidsocial
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  facebook, instagram, tiktok, linkedin
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=facebook&amp;utm_medium=paid_social
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Email
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Klaviyo, Mailchimp, Substack, ActiveCampaign, HubSpot
                </td>
                <td className="py-3 px-4 font-mono font-bold text-purple-600 dark:text-purple-400">
                  email, e-mail, newsletter
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  newsletter, klaviyo, mailchimp
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=newsletter&amp;utm_medium=email
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Affiliates
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Impact, ShareASale, CJ Affiliate, Creator Networks
                </td>
                <td className="py-3 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                  affiliate, affiliates, partner
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  Any creator or affiliate ID
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=creator_handle&amp;utm_medium=affiliate
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Display
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Google Display Network (GDN), AdRoll, Criteo
                </td>
                <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  display, banner, cpm
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  adroll, gdn, criteo
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=adroll&amp;utm_medium=display
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  Organic Social
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  Unpaid posts on Twitter/X, LinkedIn page updates, YouTube bios
                </td>
                <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  social, organic_social, post
                </td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                  twitter, linkedin, youtube
                </td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                  utm_source=linkedin&amp;utm_medium=social
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: Complete GA4 Parameter Breakdown                               */}
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
                  cpc, paid_social, email
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
      {/* SECTION 4: UTM Naming Conventions & Anti-Patterns                         */}
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

        {/* SPA UTM ATTRIBUTION CALLOUT BOX */}
        <div className="rounded-3xl border border-indigo-300 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-slate-950 p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-indigo-700 dark:text-indigo-400">
              <Code2 className="h-5 w-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Next.js &amp; SPA Client Routing Attribution Alert
              </h3>
            </div>
            <span className="rounded-md bg-indigo-100 dark:bg-indigo-950/80 px-2.5 py-0.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              Engineering Deep Dive
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Running a Next.js or React SPA? Avoid attribution loss caused by client-side navigation. Read our engineering breakdown:{" "}
            <Link
              href="/blog/why-ga4-strips-utm-parameters-spa"
              className="text-indigo-600 dark:text-indigo-400 font-bold underline hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Why GA4 Strips UTM Parameters on SPA Route Transitions (And How to Fix It)
            </Link>
            .
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
              Never use spaces in parameter values, which get URL-encoded into messy <code>%20</code> strings. Adopt a strict standard like <code>summer-sale-2026</code> company-wide.
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
              Always use standard medium values (e.g. <code>cpc</code>, <code>paid_social</code>, <code>email</code>). Custom arbitrary words like <code>my_ad</code> will be lumped into &quot;Unassigned&quot;.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: Comprehensive FAQ Accordion (Clean Server-Rendered HTML)       */}
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
              open={index === 0}
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
      {/* SECTION 6: Related SEO & Web Utilities (Internal Cross-Linking)          */}
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
              Supercharge your campaign link infrastructure and click-through rates
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linked Card: Bulk UTM Matrix Generator */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900/60 dark:to-slate-950 p-6 space-y-4 shadow-sm hover:border-emerald-500 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Layers className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Bulk Campaign Suite
              </span>
            </div>

            <div>
              <h3
                id="link-bulk-utm-matrix"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors scroll-mt-24"
              >
                Bulk UTM Matrix Generator
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate hundreds of sanitized, GA4-compliant campaign tracking URLs in bulk across multiple landing pages and advertising channels with 1-click CSV/Excel export.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                /tools/bulk-utm-matrix-generator
              </span>
              <Link
                href="/tools/bulk-utm-matrix-generator"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch Bulk Matrix</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Linked Card: Google SERP Simulator */}
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-50/40 via-white to-slate-50 dark:from-blue-950/20 dark:via-slate-900/60 dark:to-slate-950 p-6 space-y-4 shadow-sm hover:border-blue-500 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Search className="h-5 w-5" />
              </div>
              <span className="rounded-md bg-blue-100 dark:bg-blue-950/80 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                SEO Flagship
              </span>
            </div>

            <div>
              <h3
                id="link-serp-preview"
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors scroll-mt-24"
              >
                Google SERP Simulator &amp; Meta Pixel Counter
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test and optimize your SEO title and description with pixel accuracy against Google&apos;s 600px desktop and 580px mobile limits. Includes AI snippet generation powered by Google Gemini.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                /tools/seo/serp-preview
              </span>
              <Link
                href="/tools/seo/serp-preview"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Launch SERP Previewer</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
