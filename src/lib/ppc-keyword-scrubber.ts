/**
 * PPC Negative Keyword List Scrubber & Match-Type Formatter Library
 * 100% Client-Side Pure TypeScript
 * Compatible with Google Ads & Microsoft Advertising specifications.
 */

export type PpcMatchType =
  | "broad"
  | "phrase"
  | "exact"
  | "negative_broad"
  | "negative_phrase"
  | "negative_exact";

export interface ScrubOptions {
  removeDuplicates: boolean;
  lowercase: boolean;
  trimWhitespace: boolean;
  stripIllegalChars: boolean;
  stripPunctuationQuotes: boolean;
  sortAlphabetical: boolean;
  removeNumbers: boolean;
}

export interface ScrubMetricSummary {
  originalCount: number;
  cleanedCount: number;
  duplicatesRemoved: number;
  illegalCharsPurged: number;
  exceedsGoogleLimitCount: number;
  avgWordCount: number;
}

export interface ScrubbedKeywordItem {
  original: string;
  cleaned: string;
  formatted: string;
  matchType: PpcMatchType;
  wordCount: number;
  charCount: number;
  isOverLimit: boolean;
  warning?: string;
}

export interface ScrubResult {
  items: ScrubbedKeywordItem[];
  outputLines: string[];
  metrics: ScrubMetricSummary;
}

/**
 * Illegal characters that cause Google Ads and Microsoft Advertising upload errors:
 * @, %, *, ^, ~, (, ), =, <, >, !, ?, ;, :, \, |, {, }, +, #, $, `
 */
export const GOOGLE_ADS_ILLEGAL_CHARS_REGEX = /[@%*^~()=<>\!?;:\\|{}+#$`_]/g;

/**
 * Punctuation and quotes to strip:
 * Quotes (" ' ” “ ‘ ’ `), brackets ([ ]), commas, periods
 */
export const PUNCTUATION_AND_QUOTES_REGEX = /["'“”‘’`\[\],.]/g;

/**
 * Format a single cleaned keyword into the specified PPC match type syntax.
 */
export function formatKeywordMatchType(keyword: string, matchType: PpcMatchType): string {
  const text = keyword.trim();
  if (!text) return "";

  switch (matchType) {
    case "broad":
      return text;
    case "phrase":
      return `"${text}"`;
    case "exact":
      return `[${text}]`;
    case "negative_broad":
      return `-${text}`;
    case "negative_phrase":
      return `-"${text}"`;
    case "negative_exact":
      return `-[${text}]`;
    default:
      return text;
  }
}

/**
 * Get Google Ads Editor compatible Criterion Type string
 */
export function getGoogleAdsCriterionType(matchType: PpcMatchType): string {
  switch (matchType) {
    case "broad":
      return "Broad";
    case "phrase":
      return "Phrase";
    case "exact":
      return "Exact";
    case "negative_broad":
      return "Negative Broad";
    case "negative_phrase":
      return "Negative Phrase";
    case "negative_exact":
      return "Negative Exact";
  }
}

/**
 * Parse raw input string (comma-separated, newline-separated, or tab-separated) into raw keyword array.
 */
export function parseRawKeywords(rawInput: string): string[] {
  if (!rawInput || !rawInput.trim()) return [];

  // Split by newlines or commas
  const lines = rawInput.split(/\r?\n|,/);
  const rawList: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      rawList.push(trimmed);
    }
  }

  return rawList;
}

/**
 * Main scrubbing and formatting engine.
 */
export function scrubKeywords(
  rawInput: string,
  matchType: PpcMatchType,
  options: ScrubOptions
): ScrubResult {
  const rawKeywords = parseRawKeywords(rawInput);
  const originalCount = rawKeywords.length;

  let illegalCharsPurgedCount = 0;
  const processedItems: Array<{ original: string; cleaned: string }> = [];

  for (const raw of rawKeywords) {
    let current = raw;

    // 1. Lowercase
    if (options.lowercase) {
      current = current.toLowerCase();
    }

    // 2. Strip Illegal Characters
    if (options.stripIllegalChars) {
      const matchIllegal = current.match(GOOGLE_ADS_ILLEGAL_CHARS_REGEX);
      if (matchIllegal) {
        illegalCharsPurgedCount += matchIllegal.length;
      }
      current = current.replace(GOOGLE_ADS_ILLEGAL_CHARS_REGEX, " ");
    }

    // 3. Strip Punctuation & Quotes
    if (options.stripPunctuationQuotes) {
      current = current.replace(PUNCTUATION_AND_QUOTES_REGEX, " ");
    }

    // 4. Remove Numbers if enabled
    if (options.removeNumbers) {
      current = current.replace(/\d+/g, " ");
    }

    // 5. Trim and collapse excess whitespace
    if (options.trimWhitespace) {
      current = current.replace(/\s+/g, " ").trim();
    } else {
      current = current.trim();
    }

    if (current.length > 0) {
      processedItems.push({ original: raw, cleaned: current });
    }
  }

  // 6. Deduplication
  let duplicatesRemoved = 0;
  let uniqueItems: Array<{ original: string; cleaned: string }> = [];

  if (options.removeDuplicates) {
    const seen = new Set<string>();
    for (const item of processedItems) {
      if (seen.has(item.cleaned)) {
        duplicatesRemoved++;
      } else {
        seen.add(item.cleaned);
        uniqueItems.push(item);
      }
    }
  } else {
    uniqueItems = processedItems;
  }

  // 7. Sort Alphabetically
  if (options.sortAlphabetical) {
    uniqueItems.sort((a, b) => a.cleaned.localeCompare(b.cleaned));
  }

  // 8. Build Result Items & Google Ads Limit Checks
  let totalWords = 0;
  let exceedsGoogleLimitCount = 0;

  const items: ScrubbedKeywordItem[] = uniqueItems.map((item) => {
    const formatted = formatKeywordMatchType(item.cleaned, matchType);
    const words = item.cleaned.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = item.cleaned.length;
    totalWords += wordCount;

    // Google Ads limits for negative keywords: max 10 words, max 80 characters
    const isOverWordLimit = wordCount > 10;
    const isOverCharLimit = charCount > 80;
    const isOverLimit = isOverWordLimit || isOverCharLimit;

    let warning: string | undefined;
    if (isOverWordLimit && isOverCharLimit) {
      warning = `Exceeds Google Ads limit: ${wordCount} words (>10) & ${charCount} chars (>80)`;
      exceedsGoogleLimitCount++;
    } else if (isOverWordLimit) {
      warning = `Exceeds Google Ads limit: ${wordCount} words (max 10 allowed)`;
      exceedsGoogleLimitCount++;
    } else if (isOverCharLimit) {
      warning = `Exceeds Google Ads limit: ${charCount} chars (max 80 allowed)`;
      exceedsGoogleLimitCount++;
    }

    return {
      original: item.original,
      cleaned: item.cleaned,
      formatted,
      matchType,
      wordCount,
      charCount,
      isOverLimit,
      warning,
    };
  });

  const cleanedCount = items.length;
  const avgWordCount = cleanedCount > 0 ? parseFloat((totalWords / cleanedCount).toFixed(1)) : 0;
  const outputLines = items.map((i) => i.formatted);

  return {
    items,
    outputLines,
    metrics: {
      originalCount,
      cleanedCount,
      duplicatesRemoved,
      illegalCharsPurged: illegalCharsPurgedCount,
      exceedsGoogleLimitCount,
      avgWordCount,
    },
  };
}

/**
 * Generate CSV content formatted for Google Ads Editor or Microsoft Advertising Editor import.
 */
export function generateGoogleAdsEditorCsv(
  items: ScrubbedKeywordItem[],
  campaignName: string = "All Campaigns",
  adGroupName: string = ""
): string {
  const headers = ["Campaign", "Ad Group", "Keyword", "Criterion Type"];
  const rows = items.map((item) => {
    const criterionType = getGoogleAdsCriterionType(item.matchType);
    // Escape double quotes in CSV fields
    const safeCampaign = `"${campaignName.replace(/"/g, '""')}"`;
    const safeAdGroup = adGroupName ? `"${adGroupName.replace(/"/g, '""')}"` : '""';
    const safeKeyword = `"${item.cleaned.replace(/"/g, '""')}"`;
    const safeCriterion = `"${criterionType}"`;

    return [safeCampaign, safeAdGroup, safeKeyword, safeCriterion].join(",");
  });

  return [headers.join(","), ...rows].join("\r\n");
}

/**
 * Preset Negative Keyword Lists for instant loading
 */
export const PPC_PRESET_LISTS = {
  ecommerce: {
    name: "E-Commerce Negative Pack",
    description: "Filters bargain hunters, job seekers, pirates, and login traffic",
    keywords: [
      "free",
      "cheap",
      "torrent",
      "cracked",
      "job",
      "jobs",
      "salary",
      "career",
      "careers",
      "login",
      "wholesale",
      "return policy",
      "discount code",
      "coupon code",
      "sample",
      "used",
      "second hand",
      "diy",
      "review",
      "reviews",
      "complaints",
      "customer service number",
    ],
  },
  b2bSaaS: {
    name: "B2B SaaS Negative Pack",
    description: "Filters students, DIYers, open-source seekers, and tutorial queries",
    keywords: [
      "student",
      "students",
      "course",
      "courses",
      "resume",
      "template",
      "templates",
      "tutorial",
      "tutorials",
      "open source",
      "github",
      "internship",
      "diy",
      "free download",
      "crack",
      "salary",
      "syllabus",
      "jobs",
      "books",
      "pdf download",
      "freeware",
    ],
  },
  careers: {
    name: "Job & Career Seekers",
    description: "Stops paying for employment and recruitment searches",
    keywords: [
      "careers",
      "career",
      "vacancy",
      "vacancies",
      "intern",
      "internship",
      "salary",
      "glassdoor",
      "indeed",
      "job description",
      "resume",
      "cv template",
      "hiring",
      "recruitment",
      "interview questions",
      "benefits",
      "entry level",
    ],
  },
  informational: {
    name: "Informational & Non-Buyer",
    description: "Filters research, definition, and homework searchers",
    keywords: [
      "how to",
      "what is",
      "meaning of",
      "definition",
      "wiki",
      "wikipedia",
      "youtube",
      "diagram",
      "infographic",
      "history of",
      "case study pdf",
      "research paper",
      "free guide",
    ],
  },
};
