export interface UtmSyntaxRow {
  parameter: string;
  role: string;
  required: "Required" | "Recommended" | "Optional";
  convention: string;
  examples: string[];
}

export const UTM_SYNTAX_DATA: UtmSyntaxRow[] = [
  {
    parameter: "utm_source",
    role: "Identifies the platform, search engine, newsletter, or referring site generating the visitor traffic.",
    required: "Required",
    convention: "Lowercase single words (avoid punctuation, spaces, or capitals)",
    examples: ["google", "facebook", "linkedin", "newsletter", "tiktok"],
  },
  {
    parameter: "utm_medium",
    role: "Identifies the high-level marketing or distribution medium. Mapped directly to GA4 Default Channel Groups.",
    required: "Required",
    convention: "Strict GA4 taxonomy: cpc, paid_social, email, organic_social, affiliate, referral",
    examples: ["cpc", "paid_social", "email", "affiliate", "banner"],
  },
  {
    parameter: "utm_campaign",
    role: "Identifies the individual marketing campaign, product launch, strategic initiative, or promo code.",
    required: "Recommended",
    convention: "Hyphen- or underscore-separated lowercase identifiers with year or season",
    examples: ["summer_sale_2026", "saas_trial_q3", "brand_awareness_us"],
  },
  {
    parameter: "utm_term",
    role: "Identifies paid search keywords or targeted audience segments in PPC and contextual campaigns.",
    required: "Optional",
    convention: "Target keywords, dynamic macro tokens, or demographic segments",
    examples: ["{keyword}", "b2b_seo_tools", "enterprise_crm"],
  },
  {
    parameter: "utm_content",
    role: "Differentiates between creative variations, ad formats, button colors, or CTA placements for A/B testing.",
    required: "Optional",
    convention: "Granular descriptor specifying asset type, dimension, or position",
    examples: ["hero_cta_blue", "sidebar_banner_300x250", "{{ad.name}}"],
  },
];

export interface MacroItem {
  role: "Campaign" | "Content" | "Term";
  param: "utm_campaign" | "utm_content" | "utm_term";
  token: string;
}

export interface DynamicPresetPlatform {
  id: string;
  platform: string;
  platformSlug: string;
  badge: string;
  macros: MacroItem[];
  snippet: string;
}

export const DYNAMIC_MACRO_PLATFORMS: DynamicPresetPlatform[] = [
  {
    id: "google-ads",
    platform: "Google Ads",
    platformSlug: "google-ads",
    badge: "Paid Search",
    macros: [
      { role: "Campaign", param: "utm_campaign", token: "{campaignid}" },
      { role: "Content", param: "utm_content", token: "{adgroupid}" },
      { role: "Term", param: "utm_term", token: "{keyword}" },
    ],
    snippet: "utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}",
  },
  {
    id: "meta-ads",
    platform: "Meta Ads (Facebook/Instagram)",
    platformSlug: "meta-ads",
    badge: "Paid Social",
    macros: [
      { role: "Campaign", param: "utm_campaign", token: "{{campaign.name}}" },
      { role: "Content", param: "utm_content", token: "{{ad.name}}" },
      { role: "Term", param: "utm_term", token: "{{adset.name}}" },
    ],
    snippet: "utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}",
  },
  {
    id: "tiktok-ads",
    platform: "TikTok Ads",
    platformSlug: "tiktok-ads",
    badge: "Paid Social / Video",
    macros: [
      { role: "Campaign", param: "utm_campaign", token: "__CAMPAIGN_NAME__" },
      { role: "Content", param: "utm_content", token: "__AID_NAME__" },
      { role: "Term", param: "utm_term", token: "__CID_NAME__" },
    ],
    snippet: "utm_source=tiktok&utm_medium=paid_social&utm_campaign=__CAMPAIGN_NAME__&utm_content=__AID_NAME__&utm_term=__CID_NAME__",
  },
  {
    id: "linkedin-ads",
    platform: "LinkedIn Ads",
    platformSlug: "linkedin-ads",
    badge: "B2B Professional",
    macros: [
      { role: "Campaign", param: "utm_campaign", token: "{{campaignName}}" },
      { role: "Content", param: "utm_content", token: "{{creativeId}}" },
    ],
    snippet: "utm_source=linkedin&utm_medium=paid_social&utm_campaign={{campaignName}}&utm_content={{creativeId}}",
  },
];

export interface PrimaryUtmFaq {
  question: string;
  answer: string;
}

export const PRIMARY_UTM_FAQS: PrimaryUtmFaq[] = [
  {
    question: "Are UTM parameters case-sensitive?",
    answer:
      "Yes. Google Analytics treats utm_source=Google and utm_source=google as two separate sources. Standard practice is to always lowercase all parameters.",
  },
  {
    question: "Do UTM parameters hurt my SEO or create duplicate content?",
    answer:
      "No, provided your pages use a self-referencing canonical tag pointing to the clean base URL without query strings.",
  },
  {
    question: "What is the proper order of UTM tags in a URL?",
    answer:
      "The order does not affect tracking in GA4 or BI tools, but following standard taxonomy (utm_source → utm_medium → utm_campaign → utm_term → utm_content) maintains consistency across marketing teams.",
  },
];
