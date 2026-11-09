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

export interface DynamicPresetSnippet {
  platform: string;
  platformSlug: string;
  badge: string;
  tokens: string[];
  snippet: string;
  documentationUrl?: string;
}

export const DYNAMIC_PRESET_SNIPPETS: DynamicPresetSnippet[] = [
  {
    platform: "Meta Ads (Facebook & Instagram)",
    platformSlug: "meta-ads",
    badge: "Paid Social",
    tokens: [
      "{{campaign.name}}",
      "{{campaign.id}}",
      "{{adset.name}}",
      "{{adset.id}}",
      "{{ad.name}}",
      "{{ad.id}}",
      "{{placement}}",
      "{{site_source_name}}",
    ],
    snippet:
      "utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}",
  },
  {
    platform: "Google Ads",
    platformSlug: "google-ads",
    badge: "Paid Search / Display",
    tokens: [
      "{campaignid}",
      "{adgroupid}",
      "{keyword}",
      "{creative}",
      "{matchtype}",
      "{network}",
      "{device}",
    ],
    snippet:
      "utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}",
  },
  {
    platform: "TikTok Ads",
    platformSlug: "tiktok-ads",
    badge: "Short-Form Video",
    tokens: [
      "__CAMPAIGN_NAME__",
      "__CAMPAIGN_ID__",
      "__AID_NAME__",
      "__AID__",
      "__CID_NAME__",
      "__CID__",
      "__PLACEMENT__",
    ],
    snippet:
      "utm_source=tiktok&utm_medium=paid_social&utm_campaign=__CAMPAIGN_NAME__&utm_content=__CID_NAME__&utm_term=__AID_NAME__",
  },
  {
    platform: "LinkedIn Ads",
    platformSlug: "linkedin-ads",
    badge: "B2B Professional",
    tokens: [
      "campaign_id",
      "creative_id",
      "account_id",
      "sponsored_update",
    ],
    snippet:
      "utm_source=linkedin&utm_medium=paid_social&utm_campaign=q4_demand_gen&utm_content=lead_magnet_v1",
  },
];

export interface PrimaryUtmFaq {
  question: string;
  answer: string;
}

export const PRIMARY_UTM_FAQS: PrimaryUtmFaq[] = [
  {
    question: "Are UTM parameters case-sensitive in Google Analytics 4?",
    answer:
      "Yes, UTM parameters are strictly case-sensitive in GA4. If you use utm_source=Google on one ad and utm_source=google on another, GA4 records them as two completely separate traffic sources in your Acquisition reports. This fragments your visitor sessions, engagement rates, and conversion counts across duplicate rows. Always use lowercase conventions for every UTM parameter.",
  },
  {
    question: "Can you use spaces in UTM parameters?",
    answer:
      "No, you should never include raw spaces in UTM parameter values. Web browsers URL-encode spaces into '%20' or '+', which can trigger server redirect chains, break client-side tracking scripts, and create messy reporting rows in GA4. Replace all spaces with hyphens (-) or underscores (_) to ensure clean, human-readable URLs.",
  },
  {
    question: "Does the order of UTM parameters in a URL matter?",
    answer:
      "No, query parameter order does not impact Google Analytics 4 processing or server routing. Web servers and GA4 parse query strings into independent key-value dictionaries regardless of whether utm_source precedes utm_campaign. However, maintaining a consistent taxonomy order (utm_source → utm_medium → utm_campaign → utm_term → utm_content) across your marketing team improves URL readability, debugging, and spreadsheet management.",
  },
];

