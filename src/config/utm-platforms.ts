export interface UtmMacroToken {
  token: string;
  param: string;
  description: string;
}

export interface UtmPlatformFaq {
  question: string;
  answer: string;
}

export interface UtmPlatformHowToStep {
  name: string;
  text: string;
}

export interface UtmPlatformConfig {
  slug: "meta-ads" | "google-ads" | "tiktok-ads" | "linkedin-ads";
  name: string;
  shortName: string;
  title: string;
  h1: string;
  metaDescription: string;
  defaultSource: string;
  defaultMedium: string;
  defaultCampaign: string;
  sourcePlatform: string;
  ga4ChannelGroup: string;
  directAnswer: string;
  dynamicMacros: UtmMacroToken[];
  howToSteps: UtmPlatformHowToStep[];
  faqs: UtmPlatformFaq[];
}

export const UTM_PLATFORMS: UtmPlatformConfig[] = [
  // 1. Meta & Facebook Ads
  {
    slug: "meta-ads",
    name: "Meta & Facebook Ads",
    shortName: "Meta Ads",
    title: "Meta & Facebook Ads UTM Builder | GA4 Tracking Generator",
    h1: "Meta & Facebook Ads UTM Campaign Builder & Parameter Generator",
    metaDescription:
      "Create verified GA4 tracking URLs for Meta & Facebook Ads. Auto-populate utm_source=facebook, utm_medium=paid_social with 1-click dynamic macros for {{campaign.name}}, {{adset.name}}, and {{ad.name}}.",
    defaultSource: "facebook",
    defaultMedium: "paid_social",
    defaultCampaign: "summer_promo_2026",
    sourcePlatform: "Meta Ads",
    ga4ChannelGroup: "Paid Social",
    directAnswer:
      "Google Analytics 4 requires all-lowercase utm_source=facebook (or instagram) and utm_medium=paid_social (or paid-social) to classify incoming ad clicks under the Paid Social default channel group. Using non-standard mediums like cpc, uppercase Facebook, or generic social causes Meta traffic to get dumped into the Unassigned bucket.",
    dynamicMacros: [
      {
        token: "{{campaign.name}}",
        param: "utm_campaign",
        description: "Automatically replaces with the active campaign name inside Meta Ads Manager.",
      },
      {
        token: "{{adset.name}}",
        param: "utm_term",
        description: "Inserts the ad set (audience targeting) name into the tracking link.",
      },
      {
        token: "{{ad.name}}",
        param: "utm_content",
        description: "Captures the individual ad creative or copy variant name.",
      },
      {
        token: "{{placement}}",
        param: "utm_content",
        description: "Identifies where the ad was shown (e.g., Facebook_Desktop_Feed, Instagram_Stories).",
      },
      {
        token: "{{site_source_name}}",
        param: "utm_source",
        description: "Dynamically outputs 'fb', 'ig', 'msg', or 'an' depending on display network.",
      },
    ],
    howToSteps: [
      {
        name: "Configure Base Destination URL",
        text: "Enter your target landing page URL (e.g. https://example.com/shop) into the builder and verify HTTPS protocol.",
      },
      {
        name: "Insert Meta Dynamic Macros",
        text: "Click the dynamic macro buttons ({{campaign.name}}, {{ad.name}}) to automatically populate campaign and content dimensions.",
      },
      {
        name: "Copy the Generated Query String",
        text: "Click 'Copy Query String' or 'Copy Full URL' with automatic lowercase sanitization enabled.",
      },
      {
        name: "Paste in Meta Ads Manager",
        text: "Open Meta Ads Manager, navigate to the Ad Level > Tracking section, and paste into the URL Parameters input box.",
      },
      {
        name: "Verify in GA4 Realtime",
        text: "Launch your campaign and inspect GA4 Reports > Realtime to confirm session source is facebook / paid_social under Paid Social.",
      },
    ],
    faqs: [
      {
        question: "Why do Meta clicks often drop into GA4 'Unassigned'?",
        answer:
          "Meta ad clicks frequently land in the 'Unassigned' channel group because marketers either use mixed-case values (e.g. utm_source=Facebook instead of facebook) or use legacy utm_medium=cpc without custom channel rules. GA4's default regex engine strictly matches lowercase paid_social or paid-social for social sources.",
      },
      {
        question: "Where should I paste UTM parameters inside Meta Ads Manager?",
        answer:
          "Always paste UTM parameters into the dedicated 'URL parameters' box under the 'Tracking' section at the Ad level, rather than pasting query strings directly into the 'Website URL' field. The dedicated field ensures Meta replaces dynamic tokens like {{campaign.name}} at auction time without double-encoding curly braces.",
      },
      {
        question: "Does Meta URL-encode dynamic curly bracket macros?",
        answer:
          "If you paste dynamic curly brackets directly into the main Website URL box, Meta's system may URL-encode them as %7B%7Bcampaign.name%7D%7D, preventing the ad server from replacing the tokens. Pasting them into the dedicated 'URL parameters' field ensures proper dynamic token resolution.",
      },
    ],
  },

  // 2. Google Ads
  {
    slug: "google-ads",
    name: "Google Ads",
    shortName: "Google Ads",
    title: "Google Ads UTM Parameter Generator | ValueTrack Tracking Builder",
    h1: "Google Ads UTM Campaign Builder & Parameter Generator",
    metaDescription:
      "Build Google Ads tracking URLs with ValueTrack parameter macros ({campaignid}, {keyword}, {device}). Auto-maps utm_source=google and utm_medium=cpc for flawless GA4 Paid Search attribution.",
    defaultSource: "google",
    defaultMedium: "cpc",
    defaultCampaign: "brand_search_2026",
    sourcePlatform: "Google Ads",
    ga4ChannelGroup: "Paid Search",
    directAnswer:
      "Google Analytics 4 categorizes traffic under the Paid Search channel group when utm_source='google' (or recognized search engines) and utm_medium equals 'cpc', 'ppc', or 'paidsearch'. Always enforce lowercase casing and standard ValueTrack tokens in your tracking templates to avoid attribution loss.",
    dynamicMacros: [
      {
        token: "{campaignid}",
        param: "utm_id",
        description: "Populates the numeric Google Ads Campaign ID dynamically.",
      },
      {
        token: "{adgroupid}",
        param: "utm_content",
        description: "Injects the unique Ad Group ID for granular split testing.",
      },
      {
        token: "{keyword}",
        param: "utm_term",
        description: "Captures the exact keyword from your account that triggered the ad.",
      },
      {
        token: "{matchtype}",
        param: "utm_term",
        description: "Records the match type (e.g., e = exact, p = phrase, b = broad).",
      },
      {
        token: "{device}",
        param: "utm_content",
        description: "Records the device used (m = mobile, t = tablet, c = computer).",
      },
      {
        token: "{network}",
        param: "utm_source_platform",
        description: "Records the ad network (g = Google Search, s = Search Partner, d = Display).",
      },
    ],
    howToSteps: [
      {
        name: "Input Landing Page URL",
        text: "Add your destination website URL into the builder and verify valid HTTP/HTTPS formatting.",
      },
      {
        name: "Append ValueTrack Parameters",
        text: "Click the {campaignid}, {keyword}, and {matchtype} macro buttons to inject dynamic tracking tokens.",
      },
      {
        name: "Construct the Tracking Template",
        text: "Copy the formatted tracking template string ({lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}).",
      },
      {
        name: "Paste in Google Ads Tracking Options",
        text: "In Google Ads, go to Settings > Campaign URL options > Tracking template at Account, Campaign, or Ad Group level.",
      },
      {
        name: "Test with Google URL Validator",
        text: "Click 'Test' in Google Ads to verify that the final landing page loads with resolved parameters and returns HTTP 200 OK.",
      },
    ],
    faqs: [
      {
        question: "When should I use manual UTM parameters alongside Google Auto-Tagging (gclid)?",
        answer:
          "While Google Auto-Tagging (gclid) provides native attribution inside GA4 and Google Ads, third-party platforms (such as Salesforce, HubSpot, Mixpanel, and raw server logs) cannot decrypt the proprietary gclid hash. Configuring manual UTM parameters alongside auto-tagging ensures all external CRM and attribution systems receive clear, readable campaign data.",
      },
      {
        question: "Where do I configure ValueTrack parameters in Google Ads?",
        answer:
          "You can place ValueTrack parameters in the 'Tracking Template' field under 'Campaign URL options' at the Account, Campaign, Ad Group, or Keyword level. Using {lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword} automatically passes dynamic data across all active ads.",
      },
      {
        question: "What happens if I use utm_medium=google_ads instead of utm_medium=cpc?",
        answer:
          "GA4 strictly expects 'cpc', 'ppc', or 'paidsearch' for Paid Search grouping. If you use 'google_ads' or 'paid', GA4's default regex rules fail and the traffic is dumped into the 'Unassigned' channel bucket.",
      },
    ],
  },

  // 3. TikTok Ads
  {
    slug: "tiktok-ads",
    name: "TikTok Ads",
    shortName: "TikTok Ads",
    title: "TikTok Ads UTM Builder | URL Parameter Generator",
    h1: "TikTok Ads UTM Campaign Builder & Parameter Generator",
    metaDescription:
      "Generate TikTok Ads UTM tracking URLs with dynamic double-underscore macros (__CAMPAIGN_NAME__, __AID_NAME__, __PLACEMENT__). Enforces GA4 Paid Social channel standards.",
    defaultSource: "tiktok",
    defaultMedium: "paid_social",
    defaultCampaign: "spark_ads_ugc_2026",
    sourcePlatform: "TikTok Ads",
    ga4ChannelGroup: "Paid Social",
    directAnswer:
      "GA4 recognizes 'tiktok' as an official social platform. To ensure traffic maps directly to Paid Social, use utm_source=tiktok and utm_medium=paid_social (or paid-social). Avoid using 'tik-tok' or 'TikTok_Ads' which will break default channel grouping rules.",
    dynamicMacros: [
      {
        token: "__CAMPAIGN_NAME__",
        param: "utm_campaign",
        description: "Dynamically populates the campaign name configured in TikTok Ads Manager.",
      },
      {
        token: "__AID_NAME__",
        param: "utm_term",
        description: "Inserts the targeting Ad Group name from TikTok.",
      },
      {
        token: "__CID_NAME__",
        param: "utm_content",
        description: "Captures the specific video creative name or Spark Ad asset ID.",
      },
      {
        token: "__PLACEMENT__",
        param: "utm_content",
        description: "Identifies the TikTok app placement (e.g. TikTok, Pangle, Global App Bundle).",
      },
      {
        token: "__CAMPAIGN_ID__",
        param: "utm_id",
        description: "Injects the numeric TikTok campaign identifier.",
      },
    ],
    howToSteps: [
      {
        name: "Input Landing Page",
        text: "Enter your mobile-optimized landing page URL into the builder.",
      },
      {
        name: "Insert TikTok Double-Underscore Macros",
        text: "Click the dynamic buttons (__CAMPAIGN_NAME__, __CID_NAME__) to attach dynamic TikTok variables.",
      },
      {
        name: "Copy Sanitized Tracking Link",
        text: "Copy the full generated URL with all-lowercase and whitespace-to-hyphen rules applied.",
      },
      {
        name: "Paste into TikTok Ads Manager",
        text: "In TikTok Ads Manager, create or edit an Ad and paste the URL into the Destination URL field.",
      },
      {
        name: "Verify Webhook & GA4 Capture",
        text: "Confirm in GA4 Realtime reports that incoming sessions are classified as tiktok / paid_social under Paid Social.",
      },
    ],
    faqs: [
      {
        question: "How does the TikTok in-app browser handle URL redirects and query retention?",
        answer:
          "TikTok opens links inside its embedded WebKit/Android in-app browser. If your landing page executes a server-side redirect (e.g. HTTP 301 from HTTP to HTTPS or adding a trailing slash), ensure your web server preserves query strings across the redirect hop so GA4 does not lose UTM parameters.",
      },
      {
        question: "Why must TikTok dynamic macros use double underscores (__MACRO__)?",
        answer:
          "TikTok's ad auction server specifically searches for the double-underscore syntax (e.g. __CAMPAIGN_NAME__, __AID_NAME__). Using single underscores or curly brackets will prevent TikTok from substituting live values, passing raw placeholder text to your analytics.",
      },
      {
        question: "What is the best utm_source value for TikTok campaigns in GA4?",
        answer:
          "Always use all-lowercase 'tiktok'. Do not use 'TikTok_Ads' or 'tik-tok', as GA4's default channel grouping rule engine uses strict string matching and will fail to classify misspelled source values under Paid Social.",
      },
    ],
  },

  // 4. LinkedIn Ads
  {
    slug: "linkedin-ads",
    name: "LinkedIn Ads",
    shortName: "LinkedIn Ads",
    title: "LinkedIn Ads UTM Builder | B2B URL Tagging Generator",
    h1: "LinkedIn Ads UTM Campaign Builder & Parameter Generator",
    metaDescription:
      "Build structured B2B campaign tracking URLs for LinkedIn Sponsored Content, InMail, and Message Ads. Standardize utm_source=linkedin & utm_medium=paid_social for GA4.",
    defaultSource: "linkedin",
    defaultMedium: "paid_social",
    defaultCampaign: "enterprise_leadgen_2026",
    sourcePlatform: "LinkedIn Ads",
    ga4ChannelGroup: "Paid Social",
    directAnswer:
      "To properly track LinkedIn B2B ad traffic in Google Analytics 4, use utm_source=linkedin and utm_medium=paid_social. This isolates paid ad clicks from organic company page shares (which should use utm_medium=social).",
    dynamicMacros: [
      {
        token: "{{campaign.name}}",
        param: "utm_campaign",
        description: "Template placeholder for LinkedIn Campaign Group or Campaign identifier.",
      },
      {
        token: "{{creative.id}}",
        param: "utm_content",
        description: "Placeholder for Creative variant ID (Single Image, Carousel, Document Ad, Thought Leader Ad).",
      },
      {
        token: "{{audience.name}}",
        param: "utm_term",
        description: "Placeholder for B2B audience targeting segment (e.g. cto_decision_makers).",
      },
      {
        token: "{{company.size}}",
        param: "utm_term",
        description: "Placeholder for target enterprise firmographic tier (e.g. enterprise_500plus).",
      },
    ],
    howToSteps: [
      {
        name: "Enter B2B Destination URL",
        text: "Input the target whitepaper, demo, or webinar registration URL.",
      },
      {
        name: "Standardize B2B Parameter Values",
        text: "Set utm_source=linkedin, utm_medium=paid_social, and format utm_campaign with clean snake_case or kebab-case identifiers.",
      },
      {
        name: "Copy the Clean URL",
        text: "Copy the sanitized tracking link with lowercase and character validation applied.",
      },
      {
        name: "Paste in LinkedIn Campaign Manager",
        text: "In LinkedIn Campaign Manager, create your Sponsored Content or Direct Sponsored ad and paste into the Destination URL field.",
      },
      {
        name: "Synchronize CRM Attribution",
        text: "Ensure your website form handler extracts and forwards utm_source, utm_medium, and utm_campaign into your CRM (Salesforce / HubSpot) hidden fields.",
      },
    ],
    faqs: [
      {
        question: "How do I preserve UTM tags with LinkedIn Sponsored Content and Lead Gen Forms?",
        answer:
          "For standard Sponsored Content, UTMs are passed in the Destination URL. For LinkedIn Lead Gen Forms, UTMs are not passed directly in the native form; however, you can configure the form's 'Thank You' redirect link with full UTM parameters, or integrate the LinkedIn Lead Sync webhook with your CRM to capture campaign attribution data.",
      },
      {
        question: "Does LinkedIn Campaign Manager support dynamic ValueTrack parameters like Google or Meta?",
        answer:
          "No. LinkedIn Campaign Manager currently does not offer automatic server-side macro token replacement in destination URLs. You should use this UTM Builder to generate standardized, structured URLs for each ad creative variant prior to launching campaigns.",
      },
      {
        question: "How can I differentiate organic LinkedIn shares from paid LinkedIn ads in GA4?",
        answer:
          "For organic posts, use utm_source=linkedin&utm_medium=social or leave untagged (GA4 classifies organic LinkedIn referrers as Organic Social). For paid campaigns, strictly use utm_source=linkedin&utm_medium=paid_social. GA4 will separate them into Organic Social and Paid Social.",
      },
    ],
  },
];

export function getAllUtmPlatforms(): UtmPlatformConfig[] {
  return UTM_PLATFORMS;
}

export function getUtmPlatformBySlug(slug: string): UtmPlatformConfig | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return UTM_PLATFORMS.find((p) => p.slug.toLowerCase() === normalized);
}
