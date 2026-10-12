/**
 * Bulk UTM Matrix & Campaign Permutation Engine
 * Pure client-side Cartesian product generator for high-throughput multi-channel campaign tagging.
 */

export interface UtmMatrixOptions {
  forceLowercase: boolean;
  spaceReplacement: "hyphen" | "underscore" | "none";
  stripExistingParams: boolean;
}

export interface UtmMatrixRow {
  id: string;
  originalUrl: string;
  finalUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
  channelGroup: string;
  isValidUrl: boolean;
  error?: string;
}

export interface UtmMatrixResult {
  rows: UtmMatrixRow[];
  totalGenerated: number;
  baseUrlsCount: number;
  combinationsCount: number;
  validCount: number;
  invalidCount: number;
  channelGroups: Record<string, number>;
}

export interface UtmPreset {
  name: string;
  badge: string;
  sources: string;
  mediums: string;
  campaign: string;
  content?: string;
  term?: string;
  description: string;
}

export const UTM_PRESETS: UtmPreset[] = [
  {
    name: "Full Paid Media Mix",
    badge: "Omnichannel Paid",
    sources: "google, meta, tiktok, linkedin",
    mediums: "cpc, paid_social",
    campaign: "q4_growth_launch",
    content: "hero_banner, video_ad",
    description: "Paid Search & Paid Social Cartesian matrix mapping directly to standard GA4 channel groups.",
  },
  {
    name: "Email & Newsletter Matrix",
    badge: "Lifecycle / CRM",
    sources: "weekly_digest, onboarding_drip, product_announcement",
    mediums: "email",
    campaign: "autumn_feature_drop",
    content: "header_cta, footer_link",
    description: "Automated newsletter, broadcast, and lifecycle email tracking parameter combinations.",
  },
  {
    name: "Organic Social Profiles",
    badge: "Social Media",
    sources: "twitter, linkedin, youtube, threads",
    mediums: "social_bio, post",
    campaign: "brand_awareness",
    description: "Link in bio and organic social post campaign tagging.",
  },
  {
    name: "Affiliate & Influencer",
    badge: "Partner Marketing",
    sources: "affiliate_network, tech_partner, creator_sponsorship",
    mediums: "partner, influencer",
    campaign: "partner_referral_2026",
    content: "v1_discount, v2_free_trial",
    description: "Sponsorship and revenue-share affiliate partner tracking with variant tags.",
  },
];

export const SAMPLE_LANDING_URLS = `https://omniseotools.com/
https://omniseotools.com/bulk
https://omniseotools.com/bulk/sitemap-extractor
https://omniseotools.com/tools/google-serp-simulator
https://omniseotools.com/blog/xml-sitemap-optimization-guide-2026`;

/**
 * Sanitizes an individual parameter value according to configured options.
 */
export function sanitizeUtmParam(
  value: string,
  options: UtmMatrixOptions
): string {
  if (!value) return "";
  let result = value.trim();

  if (options.forceLowercase) {
    result = result.toLowerCase();
  }

  if (options.spaceReplacement === "hyphen") {
    result = result.replace(/[\s\t\r\n]+/g, "-");
  } else if (options.spaceReplacement === "underscore") {
    result = result.replace(/[\s\t\r\n]+/g, "_");
  }

  return result;
}

/**
 * Splits comma or newline-separated parameters into a clean string array.
 */
export function parseParameterList(
  input: string,
  options: UtmMatrixOptions
): string[] {
  if (!input || !input.trim()) return [];

  const rawItems = input
    .split(/[\r\n,]+/)
    .map((item) => sanitizeUtmParam(item, options))
    .filter((item) => item.length > 0);

  return [...new Set(rawItems)];
}

/**
 * Infers the standard Google Analytics 4 (GA4) Default Channel Group.
 */
export function inferGa4ChannelGroup(source: string, medium: string): string {
  const s = source.toLowerCase();
  const m = medium.toLowerCase();

  // Paid Search
  if (
    (m === "cpc" || m === "ppc" || m === "paidsearch") &&
    (s.includes("google") || s.includes("bing") || s.includes("yahoo") || s.includes("duckduckgo"))
  ) {
    return "Paid Search";
  }

  // Paid Social
  if (
    m === "paid_social" ||
    m === "paidsocial" ||
    m === "social_cpc" ||
    ((m === "cpc" || m === "paid") &&
      (s.includes("facebook") ||
        s.includes("meta") ||
        s.includes("instagram") ||
        s.includes("tiktok") ||
        s.includes("linkedin") ||
        s.includes("twitter") ||
        s.includes("x") ||
        s.includes("pinterest") ||
        s.includes("reddit")))
  ) {
    return "Paid Social";
  }

  // Email
  if (m === "email" || m === "newsletter" || m === "e-mail") {
    return "Email";
  }

  // Organic Social
  if (
    m === "social" ||
    m === "social_bio" ||
    m === "social-media" ||
    m === "post" ||
    s.includes("linktree")
  ) {
    return "Organic Social";
  }

  // Paid Video
  if (
    (m === "cpc" || m === "cpv" || m === "paid") &&
    (s.includes("youtube") || s.includes("vimeo"))
  ) {
    return "Paid Video";
  }

  // Affiliates
  if (m === "affiliate" || m === "partner" || m === "influencer") {
    return "Affiliates";
  }

  // Display
  if (m === "display" || m === "banner" || m === "cpm" || m === "retargeting") {
    return "Display";
  }

  // Organic Search
  if (m === "organic" && (s.includes("google") || s.includes("bing"))) {
    return "Organic Search";
  }

  return "Unassigned / Custom";
}

/**
 * Builds a clean tagged URL handling query string collision and URL fragments.
 */
export function buildTaggedUrl(
  rawBaseUrl: string,
  source: string,
  medium: string,
  campaign: string,
  term: string | undefined,
  content: string | undefined,
  stripExistingParams: boolean
): { fullUrl: string; isValid: boolean; error?: string } {
  const trimmed = rawBaseUrl.trim();
  if (!trimmed) {
    return { fullUrl: "", isValid: false, error: "Empty base URL" };
  }

  try {
    const hasProtocol = /^https?:\/\//i.test(trimmed);
    const urlStringToParse = hasProtocol ? trimmed : `https://${trimmed}`;
    const urlObj = new URL(urlStringToParse);

    if (stripExistingParams) {
      const keysToDelete: string[] = [];
      urlObj.searchParams.forEach((_, key) => {
        keysToDelete.push(key);
      });
      keysToDelete.forEach((k) => urlObj.searchParams.delete(k));
    } else {
      // Strip any existing utm_ parameters to prevent duplicates
      const existingUtmKeys: string[] = [];
      urlObj.searchParams.forEach((_, key) => {
        if (/^utm_/i.test(key)) {
          existingUtmKeys.push(key);
        }
      });
      existingUtmKeys.forEach((k) => urlObj.searchParams.delete(k));
    }

    if (source) urlObj.searchParams.set("utm_source", source);
    if (medium) urlObj.searchParams.set("utm_medium", medium);
    if (campaign) urlObj.searchParams.set("utm_campaign", campaign);
    if (term) urlObj.searchParams.set("utm_term", term);
    if (content) urlObj.searchParams.set("utm_content", content);

    return {
      fullUrl: urlObj.toString(),
      isValid: true,
    };
  } catch (err: any) {
    // Fallback manual assembly if URL parsing fails completely
    const params: string[] = [];
    if (source) params.push(`utm_source=${encodeURIComponent(source)}`);
    if (medium) params.push(`utm_medium=${encodeURIComponent(medium)}`);
    if (campaign) params.push(`utm_campaign=${encodeURIComponent(campaign)}`);
    if (term) params.push(`utm_term=${encodeURIComponent(term)}`);
    if (content) params.push(`utm_content=${encodeURIComponent(content)}`);

    const sep = trimmed.includes("?") ? "&" : "?";
    const fullUrl = params.length > 0 ? `${trimmed}${sep}${params.join("&")}` : trimmed;

    return {
      fullUrl,
      isValid: false,
      error: "Malformed base URL format",
    };
  }
}

/**
 * Generates the complete Cartesian product matrix.
 */
export function generateUtmMatrix(
  urlsInput: string,
  sourcesInput: string,
  mediumsInput: string,
  campaignsInput: string,
  termsInput: string,
  contentsInput: string,
  options: UtmMatrixOptions = {
    forceLowercase: true,
    spaceReplacement: "hyphen",
    stripExistingParams: false,
  }
): UtmMatrixResult {
  const rawUrls = urlsInput
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const sources = parseParameterList(sourcesInput, options);
  const mediums = parseParameterList(mediumsInput, options);
  const campaigns = parseParameterList(campaignsInput, options);
  const terms = parseParameterList(termsInput, options);
  const contents = parseParameterList(contentsInput, options);

  // If parameters are empty, use fallback single array
  const sourceList = sources.length > 0 ? sources : [""];
  const mediumList = mediums.length > 0 ? mediums : [""];
  const campaignList = campaigns.length > 0 ? campaigns : [""];
  const termList = terms.length > 0 ? terms : [undefined];
  const contentList = contents.length > 0 ? contents : [undefined];

  const combinationsCount =
    sourceList.length *
    mediumList.length *
    campaignList.length *
    termList.length *
    contentList.length;

  const rows: UtmMatrixRow[] = [];
  let validCount = 0;
  let invalidCount = 0;
  const channelGroups: Record<string, number> = {};

  let rowId = 1;

  for (const rawUrl of rawUrls) {
    for (const source of sourceList) {
      for (const medium of mediumList) {
        for (const campaign of campaignList) {
          for (const term of termList) {
            for (const content of contentList) {
              const { fullUrl, isValid, error } = buildTaggedUrl(
                rawUrl,
                source,
                medium,
                campaign,
                term,
                content,
                options.stripExistingParams
              );

              if (isValid) validCount++;
              else invalidCount++;

              const channelGroup = source && medium ? inferGa4ChannelGroup(source, medium) : "Custom / Direct";
              channelGroups[channelGroup] = (channelGroups[channelGroup] || 0) + 1;

              rows.push({
                id: `matrix-${rowId++}`,
                originalUrl: rawUrl,
                finalUrl: fullUrl,
                source,
                medium,
                campaign,
                term,
                content,
                channelGroup,
                isValidUrl: isValid,
                error,
              });
            }
          }
        }
      }
    }
  }

  return {
    rows,
    totalGenerated: rows.length,
    baseUrlsCount: rawUrls.length,
    combinationsCount,
    validCount,
    invalidCount,
    channelGroups,
  };
}
