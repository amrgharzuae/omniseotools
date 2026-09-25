/**
 * Bulk UTM Matrix & Multi-Channel Tagging Engine
 * Pure client-side matrix generation, sanitization, validation, and CSV export.
 */

export interface ChannelPreset {
  id: string;
  name: string;
  badge: string;
  source: string;
  medium: string;
  description: string;
  channelGroup: string;
}

export const DEFAULT_CHANNEL_PRESETS: ChannelPreset[] = [
  {
    id: "google-ads",
    name: "Google Ads (Search/PPC)",
    badge: "Paid Search",
    source: "google",
    medium: "cpc",
    channelGroup: "Paid Search",
    description: "Targeted Google Search ads mapping to GA4 Paid Search channel group.",
  },
  {
    id: "meta-ads",
    name: "Meta / Facebook Ads",
    badge: "Paid Social",
    source: "facebook",
    medium: "paid_social",
    channelGroup: "Paid Social",
    description: "Facebook & Instagram sponsored feed and reel ads mapping to GA4 Paid Social.",
  },
  {
    id: "tiktok-ads",
    name: "TikTok Ads",
    badge: "Paid Social",
    source: "tiktok",
    medium: "paid_social",
    channelGroup: "Paid Social",
    description: "TikTok in-feed, top-view, and spark ads mapping to GA4 Paid Social.",
  },
  {
    id: "linkedin-ads",
    name: "LinkedIn Ads",
    badge: "Paid Social",
    source: "linkedin",
    medium: "paid_social",
    channelGroup: "Paid Social",
    description: "B2B sponsored content, lead gen, and InMail ads mapping to GA4 Paid Social.",
  },
  {
    id: "email-newsletter",
    name: "Email Newsletter",
    badge: "Email",
    source: "newsletter",
    medium: "email",
    channelGroup: "Email",
    description: "Broadcast newsletters and marketing emails mapping to GA4 Email.",
  },
  {
    id: "organic-social",
    name: "Organic Social / Linktree",
    badge: "Social Profile",
    source: "linktree",
    medium: "social_profile",
    channelGroup: "Organic Social",
    description: "Profile bio links, Linktree, and organic social posts.",
  },
];

export interface MatrixSanitizeOptions {
  forceLowercase: boolean;
  replaceSpacesWithHyphens: boolean;
  stripExistingUtm: boolean;
  encodeQueryParams: boolean;
}

export interface MatrixRow {
  id: string;
  rawBaseUrl: string;
  cleanBaseUrl: string;
  channelId: string;
  channelName: string;
  channelGroup: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
  fullUrl: string;
  isValidUrl: boolean;
  urlError?: string;
}

export interface MatrixGenerationResult {
  rows: MatrixRow[];
  totalBaseUrls: number;
  totalChannels: number;
  totalGenerated: number;
  validGeneratedCount: number;
  invalidUrlCount: number;
}

export const SAMPLE_BASE_URLS = [
  "https://omniseotools.com/tools/seo/serp-preview",
  "https://omniseotools.com/tools/marketing/utm-campaign-builder",
  "https://omniseotools.com/blog/why-ga4-strips-utm-parameters-spa",
];

/**
 * Sanitizes an individual parameter value based on configured normalization rules.
 */
export function sanitizeParameter(
  value: string,
  options: MatrixSanitizeOptions
): string {
  if (!value) return "";
  let result = value.trim();

  if (options.forceLowercase) {
    result = result.toLowerCase();
  }

  if (options.replaceSpacesWithHyphens) {
    result = result.replace(/[\s\t\r\n]+/g, "-");
  }

  return result;
}

/**
 * Normalizes a base URL and optionally strips existing UTM tags to avoid collisions.
 */
export function normalizeBaseUrl(
  rawUrl: string,
  stripExistingUtm: boolean
): { cleanUrl: string; isValid: boolean; error?: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { cleanUrl: "", isValid: false, error: "Empty URL" };
  }

  try {
    const hasProtocol = /^https?:\/\//i.test(trimmed);
    const urlToParse = hasProtocol ? trimmed : `https://${trimmed}`;
    const parsed = new URL(urlToParse);

    if (stripExistingUtm) {
      const keysToDelete: string[] = [];
      parsed.searchParams.forEach((_, key) => {
        if (/^utm_/i.test(key)) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach((k) => parsed.searchParams.delete(k));
    }

    return { cleanUrl: parsed.toString(), isValid: true };
  } catch {
    // If URL parsing fails completely, return fallback
    return {
      cleanUrl: trimmed,
      isValid: false,
      error: "Invalid URL syntax",
    };
  }
}

/**
 * Generates the complete Cartesian product matrix of Base URLs × Selected Channels.
 */
export function generateUtmMatrix(
  urlInputText: string,
  selectedChannels: ChannelPreset[],
  campaign: string,
  term?: string,
  content?: string,
  options: MatrixSanitizeOptions = {
    forceLowercase: true,
    replaceSpacesWithHyphens: true,
    stripExistingUtm: true,
    encodeQueryParams: true,
  }
): MatrixGenerationResult {
  const rawLines = urlInputText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const cleanCampaign = sanitizeParameter(campaign, options);
  const cleanTerm = term ? sanitizeParameter(term, options) : "";
  const cleanContent = content ? sanitizeParameter(content, options) : "";

  const rows: MatrixRow[] = [];
  let invalidUrlCount = 0;
  let validGeneratedCount = 0;

  let rowCounter = 1;

  for (const rawUrl of rawLines) {
    const { cleanUrl, isValid, error } = normalizeBaseUrl(
      rawUrl,
      options.stripExistingUtm
    );

    if (!isValid) {
      invalidUrlCount++;
    }

    for (const channel of selectedChannels) {
      const cleanSource = sanitizeParameter(channel.source, options);
      const cleanMedium = sanitizeParameter(channel.medium, options);

      let fullUrl = "";

      if (isValid) {
        try {
          const parsed = new URL(cleanUrl);
          if (cleanSource) parsed.searchParams.set("utm_source", cleanSource);
          if (cleanMedium) parsed.searchParams.set("utm_medium", cleanMedium);
          if (cleanCampaign) parsed.searchParams.set("utm_campaign", cleanCampaign);
          if (cleanTerm) parsed.searchParams.set("utm_term", cleanTerm);
          if (cleanContent) parsed.searchParams.set("utm_content", cleanContent);

          fullUrl = parsed.toString();
          validGeneratedCount++;
        } catch {
          fullUrl = cleanUrl;
        }
      } else {
        // Fallback manual query assembly
        const params: string[] = [];
        if (cleanSource)
          params.push(
            `utm_source=${options.encodeQueryParams ? encodeURIComponent(cleanSource) : cleanSource}`
          );
        if (cleanMedium)
          params.push(
            `utm_medium=${options.encodeQueryParams ? encodeURIComponent(cleanMedium) : cleanMedium}`
          );
        if (cleanCampaign)
          params.push(
            `utm_campaign=${options.encodeQueryParams ? encodeURIComponent(cleanCampaign) : cleanCampaign}`
          );
        if (cleanTerm)
          params.push(
            `utm_term=${options.encodeQueryParams ? encodeURIComponent(cleanTerm) : cleanTerm}`
          );
        if (cleanContent)
          params.push(
            `utm_content=${options.encodeQueryParams ? encodeURIComponent(cleanContent) : cleanContent}`
          );

        const sep = cleanUrl.includes("?") ? "&" : "?";
        fullUrl = params.length > 0 ? `${cleanUrl}${sep}${params.join("&")}` : cleanUrl;
      }

      rows.push({
        id: `row-${rowCounter++}`,
        rawBaseUrl: rawUrl,
        cleanBaseUrl: cleanUrl,
        channelId: channel.id,
        channelName: channel.name,
        channelGroup: channel.channelGroup,
        source: cleanSource,
        medium: cleanMedium,
        campaign: cleanCampaign,
        term: cleanTerm || undefined,
        content: cleanContent || undefined,
        fullUrl,
        isValidUrl: isValid,
        urlError: error,
      });
    }
  }

  return {
    rows,
    totalBaseUrls: rawLines.length,
    totalChannels: selectedChannels.length,
    totalGenerated: rows.length,
    validGeneratedCount,
    invalidUrlCount,
  };
}

/**
 * Escapes a field for standard RFC 4180 CSV generation.
 */
function escapeCsvField(field: string | undefined): string {
  if (field === undefined || field === null) return '""';
  const str = String(field);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Generates an agency-grade, Google Ads Editor compatible CSV export string.
 */
export function generateCsvExport(rows: MatrixRow[]): string {
  const headers = [
    "Base URL",
    "Channel",
    "GA4 Channel Group",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "Full Tagged URL",
  ];

  const lines = [headers.map(escapeCsvField).join(",")];

  for (const row of rows) {
    const values = [
      row.cleanBaseUrl,
      row.channelName,
      row.channelGroup,
      row.source,
      row.medium,
      row.campaign,
      row.term || "",
      row.content || "",
      row.fullUrl,
    ];
    lines.push(values.map(escapeCsvField).join(","));
  }

  return lines.join("\r\n");
}

/**
 * Generates clean newline-separated raw URLs list for fast clipboard pasting.
 */
export function generateRawUrlsList(rows: MatrixRow[]): string {
  return rows.map((r) => r.fullUrl).join("\n");
}
