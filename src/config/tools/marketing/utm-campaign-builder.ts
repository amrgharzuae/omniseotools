import { ToolDefinition } from "@/types/tool";

export const utmCampaignBuilderTool: ToolDefinition = {
  "id": "utm-campaign-builder",
  "slug": "utm-campaign-builder",
  "name": "GA4 UTM Campaign URL Builder & Link Tracker",
  "shortDescription": "Build error-free Google Analytics 4 tracking links with standard campaign source, medium, name, term, and content parameters.",
  "category": "marketing",
  "icon": "Link2",
  "badge": "Popular",
  "featured": true,
  "status": "active",
  "keywords": [
    "utm campaign builder",
    "ga4 utm generator",
    "google analytics link tracker",
    "campaign url maker",
    "utm source medium campaign",
    "marketing campaign tracking"
  ],
  "metaTitle": "Free GA4 UTM Campaign URL Builder & Link Tracker (2026 Free Tool)",
  "metaDescription": "Generate error-free Google Analytics 4 tracking links. Build custom UTM parameters (source, medium, campaign, term, content, ID) with instant formatting and copy.",
  "howToSteps": [
    {
      "name": "Enter Destination Website URL",
      "text": "Paste your target landing page URL (e.g., https://yourdomain.com/landing-page)."
    },
    {
      "name": "Set Campaign Source (utm_source)",
      "text": "Specify the platform or referrer sending the traffic (e.g., google, facebook, newsletter, linkedin)."
    },
    {
      "name": "Define Campaign Medium (utm_medium)",
      "text": "Identify the marketing channel type (e.g., cpc, email, paid_social, affiliate, banner)."
    },
    {
      "name": "Name Your Campaign (utm_campaign)",
      "text": "Enter a descriptive campaign identifier (e.g., spring_sale_2026, product_launch_v2)."
    },
    {
      "name": "Add Optional Term, Content & ID",
      "text": "Use utm_term for paid search keywords and utm_content to track A/B test variations or specific button clicks, then copy the complete link."
    }
  ],
  "editorialGuide": {
    "title": "The Ultimate Guide to Google Analytics 4 (GA4) UTM Campaign Tracking",
    "sections": [
      {
        "heading": "What Are UTM Parameters & How GA4 Uses Them",
        "content": "<p><strong>Urchin Tracking Module (UTM)</strong> parameters are standard query string tags appended to destination URLs. When a visitor clicks a tagged link, Google Analytics 4 parses these parameters to accurately attribute session acquisition, user sign-ups, and e-commerce conversions to specific marketing campaigns and distribution channels.</p><p>Without UTM parameters, GA4 often lumps incoming marketing traffic into ambiguous buckets like <code>(direct) / (none)</code> or generic <code>referral</code>, obscuring your true return on ad spend (ROAS).</p>",
        "keyTakeaways": [
          "UTM tags allow granular measurement of revenue by campaign, ad creative, and traffic source.",
          "Parameters are appended after a question mark (?) or ampersand (&) in the URL.",
          "GA4 natively groups clean UTM tags into Default Channel Groupings (Paid Search, Paid Social, Email, Organic Social)."
        ]
      },
      {
        "heading": "The 6 Standard GA4 UTM Parameters Explained",
        "content": "<p>Google Analytics 4 recognizes 6 official campaign tracking parameters:</p><ol><li><strong>utm_source (Required):</strong> Identifies the traffic referrer (e.g., <code>google</code>, <code>facebook</code>, <code>newsletter</code>, <code>twitter</code>).</li><li><strong>utm_medium (Required):</strong> Identifies the high-level channel type (e.g., <code>cpc</code>, <code>email</code>, <code>paid_social</code>, <code>affiliate</code>).</li><li><strong>utm_campaign (Required):</strong> Identifies the specific marketing campaign or promotion (e.g., <code>black_friday_2026</code>).</li><li><strong>utm_term (Optional):</strong> Used primarily in paid search to track the specific target keyword triggering the ad.</li><li><strong>utm_content (Optional):</strong> Differentiates distinct creatives or links pointing to the same URL (e.g., <code>header_cta_button</code> vs. <code>footer_link</code>).</li><li><strong>utm_id (Optional):</strong> The unique campaign identifier used to import cost data into GA4 via CSV or API.</li></ol>",
        "keyTakeaways": [
          "Always provide utm_source, utm_medium, and utm_campaign as your core tracking trio.",
          "Use utm_content for A/B testing copy and button placements.",
          "Match utm_medium values to GA4 standard channel definition rules (e.g., use \\x27cpc\\x27 for paid search, \\x27email\\x27 for newsletters)."
        ]
      },
      {
        "heading": "Best Practices: Lowercase Normalization & Taxonomy Consistency",
        "content": "<p>Because web URLs and analytics platforms are strictly case-sensitive, inconsistent capitalization will fracture your analytics data into duplicate rows:</p><ul><li><strong>Force Lowercase:</strong> <code>utm_source=Facebook</code>, <code>utm_source=facebook</code>, and <code>utm_source=FACEBOOK</code> will create three separate reporting rows in GA4. Always enforce all-lowercase values.</li><li><strong>Standardize Delimiters:</strong> Choose either hyphens (<code>summer-sale</code>) or underscores (<code>summer_sale</code>) and maintain that standard company-wide.</li><li><strong>Avoid Punctuation & Special Characters:</strong> Keep UTM parameters alphanumeric to avoid encoding errors (%20, %2B).</li></ul>",
        "keyTakeaways": [
          "Always enforce lowercase parameters across all marketing teams.",
          "Maintain a shared company spreadsheet or use this tool to ensure naming consistency.",
          "Never use spaces; replace with hyphens (-) or underscores (_)."
        ]
      },
      {
        "heading": "The #1 Catastrophic Mistake: Internal UTM Links",
        "content": "<p>The single most destructive UTM mistake is adding UTM parameters to <strong>internal links</strong> on your own website (e.g., placing a UTM tag on a homepage banner linking to a product page).</p><p>When a user clicks an internal UTM link, GA4 terminates the current user session and starts an artificial second session with the internal UTM source as the referrer. This artificially inflates your session count, resets bounce rates, and completely destroys your ability to track which original external marketing channel brought the customer to your site.</p>",
        "keyTakeaways": [
          "NEVER use UTM parameters on internal site navigation or internal banners.",
          "Use GA4 Custom Events (e.g., custom click events) for measuring internal website interactions.",
          "Reserve UTM parameters exclusively for inbound external traffic."
        ]
      }
    ]
  },
  "faqs": [
    {
      "question": "What are the required UTM parameters for Google Analytics 4?",
      "answer": "While technically only utm_source is strictly mandatory, Google Analytics 4 best practices strongly recommend always providing utm_source, utm_medium, and utm_campaign to ensure accurate Default Channel Grouping."
    },
    {
      "question": "Are UTM parameters case-sensitive in GA4?",
      "answer": "Yes. Google Analytics treats \\x27Email\\x27 and \\x27email\\x27 as two distinct traffic mediums. Always force lowercase across all parameters to keep your reports clean and unified."
    },
    {
      "question": "Should I use UTM tags on links inside my own website?",
      "answer": "No! Never use UTM tags on internal links. Clicking an internal UTM link resets the visitor session in GA4 and overwrites the original traffic source, ruining your attribution data. Use custom event tracking for internal interactions."
    },
    {
      "question": "What is the difference between utm_term and utm_content?",
      "answer": "utm_term is primarily used to track paid search keywords, whereas utm_content is used to differentiate between different ads, creative variants, or link positions (e.g. text link vs. image banner) within the same campaign."
    },
    {
      "question": "Can UTM parameters negatively impact SEO rankings?",
      "answer": "No, as long as your website uses clean canonical tags (<link rel='canonical' href='https://example.com/page'>). Canonical tags inform search engine crawlers to ignore tracking query parameters and index the clean master URL."
    },
    {
      "question": "What is utm_id used for in GA4?",
      "answer": "utm_id is the campaign identifier used to stitch external campaign cost data (such as advertising spend from non-Google platforms) with GA4 revenue metrics via Google Analytics Data Import."
    }
  ]
};
