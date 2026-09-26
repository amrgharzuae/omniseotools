import { ToolDefinition } from "@/types/tool";

export const utmCampaignBuilderTool: ToolDefinition = {
  id: "utm-campaign-builder",
  slug: "utm-campaign-builder",
  name: "Campaign URL Builder",
  title: "Campaign URL Builder - Free Google Analytics URL Builder Tool | OmniSEO Tools",
  metaTitle: "Campaign URL Builder - Free Google Analytics URL Builder Tool | OmniSEO Tools",
  metaDescription:
    "Create custom tracking links with our free Campaign URL Builder. Generate compliant GA4 UTM parameters for Google Ads, Meta, TikTok, and email campaigns instantly client-side.",
  h1: "Campaign URL Builder & Google Analytics URL Generator",
  tagline:
    "Build, sanitize, and validate Google Analytics 4 (GA4) campaign tracking URLs in real time. 100% private, client-side execution.",
  shortDescription:
    "Create custom tracking links with our free Campaign URL Builder. Generate compliant GA4 UTM parameters for Google Ads, Meta, TikTok, and email campaigns instantly client-side.",
  category: "marketing",
  icon: "Link2",
  badge: "Popular",
  featured: true,
  status: "active",
  keywords: [
    "Campaign URL Builder",
    "Google Analytics URL Builder Tool",
    "GA4 UTM Parameter Generator",
    "campaign builder",
    "utm campaign builder",
    "utm builder",
    "campaign url builder",
    "google analytics campaign url builder",
    "ga4 url builder",
    "campaign utm builder",
    "utm link generator",
  ],
  howToSteps: [
    {
      name: "Step 1: Enter Destination URL & Set Traffic Source (utm_source)",
      text: "Input your target landing page URL and specify the platform or referrer sending the visitor traffic (e.g., google, facebook, tiktok, newsletter, linkedin).",
    },
    {
      name: "Step 2: Set the GA4 Marketing Medium (utm_medium)",
      text: "Define the high-level marketing channel type (e.g., cpc for paid search, paid_social for Meta/TikTok ads, email for newsletters) to match GA4 Default Channel Groupings.",
    },
    {
      name: "Step 3: Name Your Strategic Campaign (utm_campaign)",
      text: "Assign a clean, lowercase campaign identifier (e.g., summer_sale_2026, product_launch_v2) to categorize performance in acquisition reports.",
    },
    {
      name: "Step 4: Add Optional Granular Parameters & Copy Link",
      text: "Optionally include utm_term for search keywords, utm_content for A/B testing ad variations, or utm_id for external cost import, then copy the URL or download the QR code.",
    },
  ],
  editorialGuide: {
    title: "How to Use the Google Analytics URL Builder Tool for GA4 & Channel Grouping Best Practices",
    sections: [
      {
        heading: "Understanding GA4 Campaign Tracking Parameters",
        content: "<p><strong>Urchin Tracking Module (UTM)</strong> parameters are standardized query string keys appended to destination URLs. When a visitor clicks a tagged link, Google Analytics 4 parses these parameters to accurately attribute incoming session acquisition, user engagement, and e-commerce conversions back to the exact advertising channel, campaign name, and creative variant.</p><p>Below is the breakdown of the 7 campaign parameters recognized by GA4:</p><table class=\"w-full text-xs text-left border border-slate-200 dark:border-slate-800 my-4\"><thead><tr class=\"bg-slate-100 dark:bg-slate-800\"><th class=\"p-2.5\">Parameter Key</th><th class=\"p-2.5\">Requirement</th><th class=\"p-2.5\">Concrete Example</th><th class=\"p-2.5\">GA4 Dimension Role</th></tr></thead><tbody><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">utm_source</td><td class=\"p-2.5 font-semibold text-rose-500\">Required</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">google, facebook, newsletter</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Identifies the referrer or ad network</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">utm_medium</td><td class=\"p-2.5 font-semibold text-rose-500\">Required</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">cpc, paid_social, email</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Maps to Default Channel Grouping rules</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">utm_campaign</td><td class=\"p-2.5 font-semibold text-rose-500\">Required</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">black_friday_2026, product_launch</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Identifies the marketing campaign promo</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-blue-600 dark:text-blue-400\">utm_term</td><td class=\"p-2.5 text-slate-400\">Optional</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">running_shoes, seo_tools</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Records paid search target keyword</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-blue-600 dark:text-blue-400\">utm_content</td><td class=\"p-2.5 text-slate-400\">Optional</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">hero_cta_blue, sidebar_banner</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Differentiates creative A/B variants</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-purple-600 dark:text-purple-400\">utm_id</td><td class=\"p-2.5 text-slate-400\">Optional</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">camp_104, meta_992</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Campaign ID for ad cost data import</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-purple-600 dark:text-purple-400\">utm_source_platform</td><td class=\"p-2.5 text-slate-400\">Optional</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">Google Ads, Meta Ads</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Media buying platform responsible for ad spend</td></tr></tbody></table>",
        keyTakeaways: [
          "Always supply utm_source, utm_medium, and utm_campaign as your mandatory attribution trio.",
          "Use utm_content for A/B testing ad creative variants, banner placements, and CTA button colors.",
          "Match utm_medium values directly to GA4 default channel definition rules (e.g. use 'cpc' for paid search, 'paid_social' for Facebook/TikTok/LinkedIn, and 'email' for newsletters).",
        ],
      },
      {
        heading: "GA4 Default Channel Grouping Best Practices & Naming Conventions",
        content: "<p>Because web URLs and analytics engines are strictly case-sensitive, inconsistent parameter naming will fracture your reports into messy duplicate rows. Follow these core best practices:</p><ul><li><strong>Always Enforce Lowercase:</strong> <code>utm_source=Facebook</code>, <code>utm_source=facebook</code>, and <code>utm_source=FACEBOOK</code> create three separate reporting rows in GA4. Always enforce all-lowercase values.</li><li><strong>Replace Spaces with Hyphens or Underscores:</strong> Spaces in parameters get converted into messy <code>%20</code> escape strings that break readability. Standardize on hyphens (<code>summer-sale</code>) or underscores (<code>summer_sale</code>).</li><li><strong>Match Medium to Standard Channels:</strong> Using non-standard mediums like <code>utm_medium=promoted_post</code> causes traffic to land in GA4's <strong>Unassigned</strong> bucket. Use <code>paid_social</code> instead.</li><li><strong>Never Use UTM Parameters on Internal Site Links:</strong> Adding UTM parameters to internal site links (e.g., homepage banners pointing to internal pages) overwrites the visitor's original acquisition session and destroys multi-touch attribution.</li></ul><p>Running a Next.js or React SPA? Avoid attribution loss caused by client-side navigation. Read our engineering breakdown: <a href='/blog/why-ga4-strips-utm-parameters-spa' class='text-emerald-600 dark:text-emerald-400 font-semibold underline'>Why GA4 Strips UTM Parameters on SPA Route Transitions</a>.</p>",
        keyTakeaways: [
          "Always enforce lowercase parameters across all marketing teams to eliminate data fragmentation.",
          "Standardize delimiters: use hyphens or underscores, never raw spaces.",
          "Never place UTM tags on internal navigation or internal site banners.",
          "Prevent SPA client transitions from stripping UTM query strings before analytics tags fire.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between this tool and the standard Campaign URL Builder?",
      answer:
        "Unlike standard online URL builders, OmniSEO Tools' Campaign URL Builder executes 100% client-side in your browser, guaranteeing total privacy—no campaign parameters, landing pages, or proprietary advertising tags are ever transmitted to a server or tracked. It also provides instant 1-click presets for Google Ads, Meta, TikTok, and LinkedIn, automated lowercasing and hyphen sanitization to eliminate GA4 data fragmentation, live validation warnings, high-res QR code generation, and direct interlinking with our Bulk UTM Matrix Generator.",
    },
    {
      question: "Are UTM parameters case-sensitive in Google Analytics 4?",
      answer:
        "Yes, UTM parameters are strictly case-sensitive in Google Analytics 4 (GA4). If you use 'utm_source=facebook', 'utm_source=Facebook', and 'utm_source=FACEBOOK', GA4 records them as three completely separate traffic sources, splitting session counts, conversion rates, and revenue metrics across multiple fragmented rows. Enabling automated lowercasing standardizes all incoming tags to ensure unified, accurate reporting.",
    },
    {
      question: "Does UTM order matter in a campaign URL?",
      answer:
        "No, UTM parameter order does not affect tracking or attribution. Standard web servers and Google Analytics 4 parse URL query strings as independent key-value pairs regardless of whether 'utm_source' appears before 'utm_campaign' or vice versa. However, adopting a uniform parameter order (e.g., source, medium, campaign, term, content) across your organization is recommended for team consistency and spreadsheet maintenance.",
    },
    {
      question: "What is a campaign URL builder?",
      answer:
        "A campaign URL builder is a specialized marketing utility that appends standardized query string parameters (UTMs) to a destination website link. These parameters allow web analytics platforms like Google Analytics 4 (GA4) to track and attribute incoming visitor sessions, conversion rates, and revenue back to the exact marketing channel, campaign name, and creative variant.",
    },
    {
      question: "How does GA4 Default Channel Grouping classify utm_medium?",
      answer:
        "GA4 uses built-in regex rules to automatically map utm_medium values to Default Channel Groups. For example, 'cpc', 'ppc', or 'paidsearch' maps to Paid Search; 'email' maps to Email; 'paid_social' or 'paid-social' maps to Paid Social; and 'affiliate' maps to Affiliates. Using non-standard medium names causes traffic to be classified as 'Unassigned'.",
    },
    {
      question: "Why should you never use UTM parameters on internal website links?",
      answer:
        "Adding UTM parameters to internal site links (such as header navigation or internal blog links) immediately overwrites the visitor's original acquisition source and starts a new artificial session in GA4. This destroys your ability to track which marketing channel originally brought the user to your site and skews conversion attribution.",
    },
  ],
};
