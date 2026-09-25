import { ToolDefinition } from "@/types/tool";

export const bulkUtmMatrixGeneratorTool: ToolDefinition = {
  id: "bulk-utm-matrix-generator",
  slug: "bulk-utm-matrix-generator",
  name: "Bulk UTM Matrix & Multi-Channel Tagging Generator",
  title: "Bulk UTM Matrix & Multi-Channel Tagging Generator | OmniSEO",
  metaTitle: "Bulk UTM Matrix & Multi-Channel Tagging Generator | OmniSEO",
  metaDescription:
    "Generate, normalize, and export bulk Google Analytics 4 (GA4) UTM tracking URLs across multiple channels, ad platforms, and landing pages with one click.",
  h1: "Bulk UTM Matrix & Multi-Channel Tagging Generator",
  tagline:
    "Generate, normalize, and export bulk Google Analytics 4 (GA4) UTM tracking URLs across multiple channels, ad platforms, and landing pages with one click.",
  shortDescription:
    "Generate, normalize, and export bulk Google Analytics 4 (GA4) UTM tracking URLs across multiple channels, ad platforms, and landing pages with one click.",
  category: "marketing",
  icon: "Layers",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "bulk utm generator",
    "utm matrix generator",
    "multi-channel utm builder",
    "bulk campaign url builder",
    "bulk ga4 url generator",
    "bulk utm tracking link builder",
    "multi platform utm generator",
    "utm spreadsheet generator",
    "google analytics bulk url builder",
    "campaign builder",
    "bulk utm tagger",
  ],
  howToSteps: [
    {
      name: "Paste Target Landing URLs",
      text: "Paste your destination URLs into the textarea (one per line, up to 50 URLs), or click 'Load Sample Data' to test sample links.",
    },
    {
      name: "Configure Global Campaign Parameters",
      text: "Enter your primary Campaign Name (utm_campaign), and optionally specify Campaign Term (utm_term for keywords) and Campaign Content (utm_content for creative variants).",
    },
    {
      name: "Select Target Marketing Channels",
      text: "Check or uncheck advertising channels (Google Ads, Meta/Facebook Ads, TikTok Ads, LinkedIn Ads, Email Newsletter, Organic Social/Linktree) to build the desired matrix combinations.",
    },
    {
      name: "Set Sanitization & Normalization Rules",
      text: "Toggle lowercase enforcement, space-to-hyphen replacement, automatic stripping of pre-existing UTM tags, and URI query parameter encoding.",
    },
    {
      name: "Inspect & Export Tagged Links",
      text: "Preview the generated links in the interactive table or raw monospace text view, copy all URLs to clipboard with 1 click, or export an agency-formatted CSV ready for Google Ads Editor.",
    },
  ],
  editorialGuide: {
    title: "Mastering Multi-Channel UTM Matrix Generation & Clean GA4 Attribution",
    sections: [
      {
        heading: "Why Multi-Channel Campaigns Require Matrix Tagging",
        content:
          "<p>Modern digital marketing campaigns rarely launch on a single distribution channel. A standard product launch or seasonal promotion typically spans <strong>Google Search Ads, Meta feeds, TikTok videos, LinkedIn sponsored posts, and email newsletters</strong> simultaneously pointing to multiple product and landing pages.</p><p>Manually generating UTM parameters for every landing page and channel combination using a single URL builder is tedious and leads to typo-ridden parameter naming. Our <strong>Bulk UTM Matrix Generator</strong> solves this by computing the Cartesian product of destination URLs and advertising channels in a single operation, guaranteeing 100% parameter consistency across your entire marketing team.</p><p>For single-link generation with instant QR codes, explore our companion tool: <a href='/tools/marketing/utm-campaign-builder' class='text-emerald-600 dark:text-emerald-400 font-bold underline'>UTM Campaign Builder & URL Tracker</a>.</p>",
        keyTakeaways: [
          "Matrix multiplication generates all Landing Page × Channel combinations simultaneously.",
          "Enforces company-wide parameter conventions, eliminating lowercase split rows in GA4.",
          "100% client-side calculation protects proprietary ad formulas and confidential landing pages.",
        ],
      },
      {
        heading: "GA4 Default Channel Grouping Compliance Rules",
        content:
          "<p>Google Analytics 4 uses strict regex matching rules to categorize incoming visitor traffic into Default Channel Groups. If your <code>utm_medium</code> or <code>utm_source</code> parameters deviate from standard GA4 definitions, your traffic gets dumped into the dreaded <strong>'Unassigned'</strong> bucket:</p><table class=\"w-full text-xs text-left border border-slate-200 dark:border-slate-800 my-4\"><thead><tr class=\"bg-slate-100 dark:bg-slate-800\"><th class=\"p-2.5\">Advertising Channel</th><th class=\"p-2.5\">Standard utm_source</th><th class=\"p-2.5\">Standard utm_medium</th><th class=\"p-2.5\">GA4 Channel Grouping</th></tr></thead><tbody><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-bold text-slate-900 dark:text-white\">Google Ads Search</td><td class=\"p-2.5 font-mono text-emerald-600 dark:text-emerald-400\">google</td><td class=\"p-2.5 font-mono text-emerald-600 dark:text-emerald-400\">cpc</td><td class=\"p-2.5 text-slate-700 dark:text-slate-300\">Paid Search</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-bold text-slate-900 dark:text-white\">Meta / Facebook Ads</td><td class=\"p-2.5 font-mono text-blue-600 dark:text-blue-400\">facebook</td><td class=\"p-2.5 font-mono text-blue-600 dark:text-blue-400\">paid_social</td><td class=\"p-2.5 text-slate-700 dark:text-slate-300\">Paid Social</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-bold text-slate-900 dark:text-white\">TikTok Ads</td><td class=\"p-2.5 font-mono text-purple-600 dark:text-purple-400\">tiktok</td><td class=\"p-2.5 font-mono text-purple-600 dark:text-purple-400\">paid_social</td><td class=\"p-2.5 text-slate-700 dark:text-slate-300\">Paid Social</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-bold text-slate-900 dark:text-white\">LinkedIn Ads</td><td class=\"p-2.5 font-mono text-indigo-600 dark:text-indigo-400\">linkedin</td><td class=\"p-2.5 font-mono text-indigo-600 dark:text-indigo-400\">paid_social</td><td class=\"p-2.5 text-slate-700 dark:text-slate-300\">Paid Social</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-bold text-slate-900 dark:text-white\">Email Newsletter</td><td class=\"p-2.5 font-mono text-amber-600 dark:text-amber-400\">newsletter</td><td class=\"p-2.5 font-mono text-amber-600 dark:text-amber-400\">email</td><td class=\"p-2.5 text-slate-700 dark:text-slate-300\">Email</td></tr></tbody></table><p>To avoid attribution loss on Next.js or Single Page Applications, consult our guide: <a href='/blog/why-ga4-strips-utm-parameters-spa' class='text-emerald-600 dark:text-emerald-400 font-bold underline'>Why GA4 Strips UTM Parameters on SPA Route Transitions</a>.</p>",
        keyTakeaways: [
          "Always map utm_medium to standard GA4 names (cpc, paid_social, email).",
          "Never invent non-standard medium values like 'instagram-story' or 'paid_ad'.",
          "Ensure lowercase normalization is strictly enforced across all matrix links.",
        ],
      },
      {
        heading: "Best Practices for Bulk UTM Tagging & CSV Exports",
        content:
          "<p>When managing enterprise media campaigns with dozens of creative variants, follow these operational best practices:</p><ul><li><strong>Strip Pre-Existing Query Strings:</strong> If copying links from existing ad managers, strip old UTM parameters to avoid duplicate parameter collisions (e.g., <code>?utm_source=old&utm_source=new</code>).</li><li><strong>Standardize Delimiters:</strong> Use hyphens (<code>summer-launch-2026</code>) or underscores (<code>summer_launch_2026</code>) instead of spaces, which encode into messy <code>%20</code> escape strings.</li><li><strong>Never Use UTM Parameters on Internal Site Links:</strong> Tagging internal navigation or banners destroys the user's initial acquisition session and invalidates multi-touch attribution.</li><li><strong>Import CSV Directly into Ad Platforms:</strong> Use our structured CSV export containing discrete Source, Medium, and Campaign columns to bulk-upload destination URLs into Google Ads Editor or Meta Ads Manager.</li></ul>",
        keyTakeaways: [
          "Export CSV for instant bulk import into Google Ads Editor and agency reporting sheets.",
          "Strip pre-existing UTM tags before generating fresh matrix combinations.",
          "Never place UTM tracking parameters on internal website links.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between a single UTM builder and a Bulk UTM Matrix generator?",
      answer:
        "A single UTM builder (like our UTM Campaign Builder) is designed to configure tracking parameters for one destination URL at a time, providing real-time URL inspection and QR code generation. A Bulk UTM Matrix Generator takes a list of multiple destination URLs and multiple marketing channels to compute the complete Cartesian product matrix in a single batch, producing dozens or hundreds of standardized links instantly.",
    },
    {
      question: "How many URLs and channels can I process simultaneously?",
      answer:
        "You can input up to 50 destination URLs and select all 6 multi-channel presets (or custom channels) to generate up to 300+ perfectly formatted UTM links instantly in your browser without lag.",
    },
    {
      question: "Are my confidential campaign links and landing page URLs tracked or stored?",
      answer:
        "No. The Bulk UTM Matrix Generator operates 100% client-side in your web browser. Zero URLs, campaign tags, target keywords, or proprietary landing page parameters are sent over the network or saved to any database.",
    },
    {
      question: "How does the CSV export work for Google Ads Editor and Meta Ads Manager?",
      answer:
        "The CSV export format includes structured columns for Base URL, Channel Name, GA4 Channel Group, utm_source, utm_medium, utm_campaign, utm_term, utm_content, and Full Tagged URL. You can open this file in Microsoft Excel or Google Sheets, or copy columns directly into Google Ads Editor for bulk campaign imports.",
    },
    {
      question: "Why should I enforce lowercase normalization on bulk UTM parameters?",
      answer:
        "Google Analytics 4 is strictly case-sensitive. If some team members use 'utm_source=Facebook' while others use 'utm_source=facebook', GA4 splits the metrics into two distinct reporting rows. Our tool automatically enforces lowercase normalization on all parameters by default to keep your reports clean.",
    },
    {
      question: "Where can I build a single UTM link with QR code generation?",
      answer:
        "For single-link creation with mobile QR code previews and GA4 channel validation, use our dedicated UTM Campaign Builder & URL Tracker (Tool #22) at /tools/marketing/utm-campaign-builder.",
    },
  ],
};
