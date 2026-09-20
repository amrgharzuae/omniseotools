import { ToolDefinition } from "@/types/tool";

export const utmCampaignBuilderTool: ToolDefinition = {
  id: "utm-campaign-builder",
  slug: "utm-campaign-builder",
  name: "Campaign UTM Builder",
  title: "Campaign UTM Builder & Google Analytics URL Generator | OmniSEO",
  metaTitle: "Campaign UTM Builder & Google Analytics URL Generator | OmniSEO",
  metaDescription:
    "Free zero-latency Campaign URL builder for Google Analytics 4 (GA4). Generate trackable campaign links with utm_source, utm_medium, utm_campaign, and custom parameters.",
  h1: "Campaign UTM Builder & Google Analytics URL Generator",
  tagline:
    "Generate custom campaign URLs with GA4 UTM tracking parameters, instant validation, and 1-click clipboard copying.",
  shortDescription:
    "Generate custom campaign URLs with GA4 UTM tracking parameters, instant validation, and 1-click clipboard copying.",
  category: "marketing",
  icon: "Link2",
  badge: "Popular",
  featured: true,
  status: "active",
  keywords: [
    "utm builder",
    "campaign url builder",
    "google analytics campaign url builder",
    "ga4 url builder",
    "campaign utm builder",
    "utm link generator",
  ],
  howToSteps: [
    {
      name: "Enter Destination Website URL",
      text: "Paste your target landing page URL (e.g., https://yourdomain.com/landing-page).",
    },
    {
      name: "Set Campaign Source (utm_source)",
      text: "Specify the platform or referrer sending the traffic (e.g., google, facebook, newsletter, linkedin).",
    },
    {
      name: "Define Campaign Medium (utm_medium)",
      text: "Identify the marketing channel type (e.g., cpc, email, paid_social, affiliate, banner).",
    },
    {
      name: "Name Your Campaign (utm_campaign)",
      text: "Enter a descriptive campaign identifier (e.g., spring_sale_2026, product_launch_v2).",
    },
    {
      name: "Add Optional Term, Content & ID",
      text: "Use utm_term for paid search keywords and utm_content to track A/B test variations or specific button clicks, then copy the complete link.",
    },
  ],
  editorialGuide: {
    title: "Understanding GA4 Campaign Tracking Parameters & Best Practices",
    sections: [
      {
        heading: "Understanding GA4 Campaign Tracking Parameters",
        content: "<p><strong>Urchin Tracking Module (UTM)</strong> parameters are standard query string tags appended to destination URLs. When a visitor clicks a tagged link, Google Analytics 4 parses these parameters to accurately attribute session acquisition, user sign-ups, and e-commerce conversions to specific marketing campaigns and distribution channels.</p><p>Below is the breakdown of the 5 core UTM parameters recognized by GA4:</p><table class=\"w-full text-xs text-left border border-slate-200 dark:border-slate-800 my-4\"><thead><tr class=\"bg-slate-100 dark:bg-slate-800\"><th class=\"p-2.5\">Parameter Key</th><th class=\"p-2.5\">Requirement</th><th class=\"p-2.5\">Concrete Example</th><th class=\"p-2.5\">GA4 Dimension Role</th></tr></thead><tbody><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">utm_source</td><td class=\"p-2.5 font-semibold text-rose-500\">Required</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">google, facebook, newsletter</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Identifies the referrer or publisher</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">utm_medium</td><td class=\"p-2.5 font-semibold text-rose-500\">Required</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">cpc, paid_social, email</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Maps to Default Channel Groupings</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">utm_campaign</td><td class=\"p-2.5 font-semibold text-rose-500\">Required</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">black_friday_2026, product_launch</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Identifies the marketing campaign promo</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-blue-600 dark:text-blue-400\">utm_term</td><td class=\"p-2.5 text-slate-400\">Optional</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">running_shoes, seo_tools</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Records paid search target keyword</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 font-mono font-bold text-blue-600 dark:text-blue-400\">utm_content</td><td class=\"p-2.5 text-slate-400\">Optional</td><td class=\"p-2.5 font-mono text-slate-700 dark:text-slate-300\">hero_cta_blue, footer_link</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Differentiates creative A/B variants</td></tr></tbody></table>",
        keyTakeaways: [
          "Always provide utm_source, utm_medium, and utm_campaign as your core tracking trio.",
          "Use utm_content for A/B testing ad copy variations and button placements.",
          "Match utm_medium values to GA4 standard channel definition rules (e.g., use 'cpc' for paid search, 'email' for newsletters).",
        ],
      },
      {
        heading: "Best Practices for Clean Campaign Tracking",
        content: "<p>Because web URLs and analytics platforms are strictly case-sensitive, inconsistent naming will fracture your analytics data into fragmented duplicate rows:</p><ul><li><strong>Always Enforce Lowercase:</strong> <code>utm_source=Facebook</code>, <code>utm_source=facebook</code>, and <code>utm_source=FACEBOOK</code> create three separate reporting rows in GA4. Always enforce all-lowercase values.</li><li><strong>Use Hyphens or Underscores Instead of Spaces:</strong> Spaces in parameters get converted into messy <code>%20</code> escape strings. Standardize on hyphens (<code>summer-sale</code>) or underscores (<code>summer_sale</code>).</li><li><strong>Avoid Duplicate Tracking:</strong> Do not append manual UTM parameters if an ad platform already injects native auto-tagging (such as Google Ads GCLID) unless your CRM requires fallback parameter parsing.</li><li><strong>Never Use UTM Parameters on Internal Links:</strong> Adding UTM parameters to internal site links (e.g., homepage banners) resets the visitor's original acquisition session and destroys multi-touch attribution.</li></ul>",
        keyTakeaways: [
          "Always enforce lowercase parameters across all marketing teams.",
          "Standardize delimiters: use hyphens or underscores, never spaces.",
          "Never place UTM tags on internal navigation or internal banners.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is a campaign URL builder?",
      answer:
        "A campaign URL builder is a specialized utility that appends standardized query string parameters (known as UTM parameters) to a destination website link. These parameters allow web analytics platforms like Google Analytics 4 (GA4) to track and attribute incoming visitor sessions, conversion rates, and revenue back to the exact marketing channel, campaign name, and creative variant.",
    },
    {
      question: "How does GA4 record UTM parameters?",
      answer:
        "When a visitor lands on a website via a link with UTM parameters, Google Analytics 4 automatically extracts utm_source, utm_medium, utm_campaign, utm_term, and utm_content from the URL string. GA4 matches these values against its Default Channel Grouping regex rules (e.g., mapping utm_medium=cpc to Paid Search or utm_medium=email to Email) and records them in session-scoped and user-scoped attribution dimensions.",
    },
    {
      question: "Can I shorten campaign URLs safely?",
      answer:
        "Yes, you can safely pass UTM-tagged URLs through URL shorteners (such as Bitly, TinyURL, or custom branded short domains) or QR codes. When a user clicks the shortened link, the server issues an HTTP 301 or 302 redirect that preserves the full destination URL including all UTM query parameters, allowing GA4 to capture attribution without data loss.",
    },
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
      question: "What is the difference between utm_term and utm_content in GA4?",
      answer:
        "The 'utm_term' parameter is used primarily in paid search campaigns to record the specific keyword or search query that triggered an advertisement. The 'utm_content' parameter is used to differentiate between specific creative variants, banner sizes, or link locations (e.g. 'hero_cta' vs. 'footer_link') pointing to the same destination URL.",
    },
  ],
};
