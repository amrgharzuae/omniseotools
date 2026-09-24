/**
 * Bulk URL Slug & Anchor Text Sanitizer Library
 * 100% Client-Side Pure TypeScript
 * Compatible with Google Search, Bing, and modern web application URL routing specifications.
 */

export type SlugSeparator = "-" | "_" | "/" | ".";
export type SlugOutputMode = "slug" | "full_url" | "markdown" | "html";

export interface SlugSanitizerOptions {
  separator: SlugSeparator;
  stripStopWords: boolean;
  normalizeDiacritics: boolean;
  lowercase: boolean;
  stripSpecialChars: boolean;
  stripFileExtensions: boolean;
  maxCharLength: number; // 0 = unlimited
  baseDomainPrefix: string; // e.g., "https://example.com/blog/" or "/products/"
}

export interface SlugItem {
  original: string;
  slug: string;
  fullUrl: string;
  markdown: string;
  html: string;
  originalCharLength: number;
  slugCharLength: number;
  stopWordsRemoved: number;
  specialCharsRemoved: number;
  wasTruncated: boolean;
}

export interface SlugSanitizerMetrics {
  totalCount: number;
  avgSlugLength: number;
  totalStopWordsRemoved: number;
  totalSpecialCharsRemoved: number;
  totalTruncatedCount: number;
}

export interface SlugSanitizerResult {
  items: SlugItem[];
  outputLines: string[];
  metrics: SlugSanitizerMetrics;
}

/**
 * Standard English stop words for URL slug optimization
 */
export const STOP_WORDS_SET = new Set([
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "with",
  "would",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
]);

/**
 * Common file extensions to strip from URL slugs
 */
export const FILE_EXTENSIONS_REGEX = /\.(html?|php|aspx?|jsp|pdf|cgi|pl|cfm|shtml)$/i;

/**
 * Transliterate Latin diacritics and special letters to ASCII equivalents
 */
export function transliterateDiacritics(text: string): string {
  if (!text) return "";

  const customReplacements: Record<string, string> = {
    ä: "ae",
    ö: "oe",
    ü: "ue",
    Ä: "Ae",
    Ö: "Oe",
    Ü: "Ue",
    ß: "ss",
    æ: "ae",
    Æ: "Ae",
    œ: "oe",
    Œ: "Oe",
    ø: "o",
    Ø: "O",
    å: "a",
    Å: "A",
    ð: "d",
    Ð: "D",
    þ: "th",
    Þ: "Th",
    ł: "l",
    Ł: "L",
    ñ: "n",
    Ñ: "N",
    ç: "c",
    Ç: "C",
  };

  let replaced = text;
  for (const [char, replacement] of Object.entries(customReplacements)) {
    replaced = replaced.split(char).join(replacement);
  }

  // Decompose accented Unicode characters (e.g. é -> e + ´) and strip combining diacritic marks
  return replaced.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Smart character length truncation at word boundaries
 */
export function truncateAtWordBoundary(slug: string, maxLen: number, separator: string): boolean {
  if (!maxLen || maxLen <= 0 || slug.length <= maxLen) {
    return false;
  }
  return true;
}

export function applySmartTruncate(slug: string, maxLen: number, separator: string): string {
  if (!maxLen || maxLen <= 0 || slug.length <= maxLen) {
    return slug;
  }

  const truncated = slug.substring(0, maxLen);
  const lastSepIndex = truncated.lastIndexOf(separator);

  // If there is a separator within a reasonable distance (at least half of maxLen), cut at separator
  if (lastSepIndex > Math.floor(maxLen * 0.4)) {
    return truncated.substring(0, lastSepIndex);
  }

  // Otherwise clean up trailing separator
  return truncated.replace(new RegExp(`[${separator}]+$`), "");
}

/**
 * Sanitize a single title or headline string into an SEO slug
 */
export function sanitizeSlug(
  rawText: string,
  options: SlugSanitizerOptions
): {
  slug: string;
  stopWordsRemoved: number;
  specialCharsRemoved: number;
  wasTruncated: boolean;
} {
  let text = rawText.trim();
  if (!text) {
    return { slug: "", stopWordsRemoved: 0, specialCharsRemoved: 0, wasTruncated: false };
  }

  let specialCharsRemoved = 0;
  let stopWordsRemoved = 0;

  // 1. Strip File Extensions
  if (options.stripFileExtensions) {
    text = text.replace(FILE_EXTENSIONS_REGEX, "");
  }

  // 2. Normalize Diacritics
  if (options.normalizeDiacritics) {
    text = transliterateDiacritics(text);
  }

  // 3. Lowercase
  if (options.lowercase) {
    text = text.toLowerCase();
  }

  // 4. Strip Special Characters (keep letters, numbers, spaces, hyphens)
  if (options.stripSpecialChars) {
    const specialCharsMatch = text.match(/[^a-zA-Z0-9\s-_/]/g);
    if (specialCharsMatch) {
      specialCharsRemoved = specialCharsMatch.length;
    }
    // Replace non-alphanumeric (except spaces, hyphens, underscores) with space
    text = text.replace(/[^a-zA-Z0-9\s-_/]/g, " ");
  }

  // 5. Split into words
  const words = text
    .split(/[\s-_/]+/)
    .map((w) => w.trim())
    .filter(Boolean);

  // 6. Filter Stop Words
  let filteredWords: string[] = [];
  if (options.stripStopWords) {
    for (const word of words) {
      const lowerWord = word.toLowerCase();
      if (STOP_WORDS_SET.has(lowerWord)) {
        stopWordsRemoved++;
      } else {
        filteredWords.push(word);
      }
    }
    // Fallback: If stripping stop words emptied the entire slug, keep original words
    if (filteredWords.length === 0 && words.length > 0) {
      filteredWords = words;
    }
  } else {
    filteredWords = words;
  }

  // 7. Join with designated separator
  let finalSlug = filteredWords.join(options.separator);

  // 8. Max Length Smart Truncation
  let wasTruncated = false;
  if (options.maxCharLength > 0 && finalSlug.length > options.maxCharLength) {
    finalSlug = applySmartTruncate(finalSlug, options.maxCharLength, options.separator);
    wasTruncated = true;
  }

  return {
    slug: finalSlug,
    stopWordsRemoved,
    specialCharsRemoved,
    wasTruncated,
  };
}

/**
 * Format full URL path, markdown link, or HTML tag
 */
export function buildFormattedOutputs(
  originalTitle: string,
  slug: string,
  baseDomainPrefix: string
): {
  fullUrl: string;
  markdown: string;
  html: string;
} {
  const prefix = baseDomainPrefix.trim();
  let cleanPrefix = "";

  if (prefix) {
    cleanPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
  } else {
    cleanPrefix = "/";
  }

  const fullUrl = slug ? `${cleanPrefix}${slug}` : cleanPrefix;
  const safeTitle = originalTitle.replace(/"/g, "&quot;");

  const markdown = `[${originalTitle}](${fullUrl})`;
  const html = `<a href="${fullUrl}">${safeTitle}</a>`;

  return { fullUrl, markdown, html };
}

/**
 * Process raw bulk lines into sanitized slugs and formatting
 */
export function processBulkSlugs(
  rawInput: string,
  outputMode: SlugOutputMode,
  options: SlugSanitizerOptions
): SlugSanitizerResult {
  if (!rawInput || !rawInput.trim()) {
    return {
      items: [],
      outputLines: [],
      metrics: {
        totalCount: 0,
        avgSlugLength: 0,
        totalStopWordsRemoved: 0,
        totalSpecialCharsRemoved: 0,
        totalTruncatedCount: 0,
      },
    };
  }

  // Split by line breaks
  const rawLines = rawInput.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  let totalStopWords = 0;
  let totalSpecialChars = 0;
  let totalTruncated = 0;
  let totalSlugLength = 0;

  const items: SlugItem[] = rawLines.map((original) => {
    const { slug, stopWordsRemoved, specialCharsRemoved, wasTruncated } = sanitizeSlug(
      original,
      options
    );

    const { fullUrl, markdown, html } = buildFormattedOutputs(
      original,
      slug,
      options.baseDomainPrefix
    );

    totalStopWords += stopWordsRemoved;
    totalSpecialChars += specialCharsRemoved;
    if (wasTruncated) totalTruncated++;
    totalSlugLength += slug.length;

    return {
      original,
      slug,
      fullUrl,
      markdown,
      html,
      originalCharLength: original.length,
      slugCharLength: slug.length,
      stopWordsRemoved,
      specialCharsRemoved,
      wasTruncated,
    };
  });

  const totalCount = items.length;
  const avgSlugLength = totalCount > 0 ? parseFloat((totalSlugLength / totalCount).toFixed(1)) : 0;

  let outputLines: string[] = [];
  switch (outputMode) {
    case "slug":
      outputLines = items.map((i) => i.slug);
      break;
    case "full_url":
      outputLines = items.map((i) => i.fullUrl);
      break;
    case "markdown":
      outputLines = items.map((i) => i.markdown);
      break;
    case "html":
      outputLines = items.map((i) => i.html);
      break;
  }

  return {
    items,
    outputLines,
    metrics: {
      totalCount,
      avgSlugLength,
      totalStopWordsRemoved: totalStopWords,
      totalSpecialCharsRemoved: totalSpecialChars,
      totalTruncatedCount: totalTruncated,
    },
  };
}

/**
 * Generate CSV content for download/export
 */
export function generateSlugExportCsv(items: SlugItem[]): string {
  const headers = ["Original Title", "Clean Slug", "Full URL", "Markdown Link", "HTML Anchor Tag"];
  const rows = items.map((item) => {
    const safeOriginal = `"${item.original.replace(/"/g, '""')}"`;
    const safeSlug = `"${item.slug.replace(/"/g, '""')}"`;
    const safeFullUrl = `"${item.fullUrl.replace(/"/g, '""')}"`;
    const safeMarkdown = `"${item.markdown.replace(/"/g, '""')}"`;
    const safeHtml = `"${item.html.replace(/"/g, '""')}"`;

    return [safeOriginal, safeSlug, safeFullUrl, safeMarkdown, safeHtml].join(",");
  });

  return [headers.join(","), ...rows].join("\r\n");
}

/**
 * Preset Headline Packs for quick 1-click loading
 */
export const SLUG_PRESET_PACKS = {
  ecommerce: {
    name: "E-Commerce Products",
    titles: [
      "Men's Waterproof Trail Running Shoes (Size 10) - $89.99",
      "100% Organic Cotton Crewneck T-Shirt / Summer Edition",
      "Ultra HD 4K Smart OLED TV (55-Inch) - 2026 Edition & Wall Mount",
      "Ergonomic Memory Foam Pillow with Cooling Gel (Pack of 2)",
      "Stainless Steel Insulated Water Bottle (32oz) - Matte Black",
      "Wireless Noise-Cancelling Over-Ear Headphones & Travel Case",
      "Professional Chef Knife 8-Inch / High Carbon Japanese Steel",
    ],
  },
  blog: {
    name: "Blog & SEO Headlines",
    titles: [
      "10 Proven Ways to Improve Your Technical SEO in 2026!",
      "What is Hreflang? A Beginner's Complete Guide & Cheat Sheet",
      "How to Fix 308 Permanent Redirect Loops in Next.js App Router",
      "The Ultimate Guide to Google Analytics 4 (GA4) UTM Campaign Tracking",
      "Why Your Core Web Vitals LCP Score is Failing (And How to Fix It)",
      "Understanding JSON-LD Schema Markup for E-Commerce Websites",
      "Top 7 Content Security Policy (CSP) Headers for Modern Web Apps",
    ],
  },
  international: {
    name: "International & Accents",
    titles: [
      "Café & Crème Brûlée: Recette Traditionnelle Française",
      "München & Köln: Der Ultimative Städtereiseführer 2026",
      "Guía Completa de Diseño Web, Usabilidad & Optimización SEO",
      "Dæk & Fælge: Komplet Guide til Sikker Kørsel i Danmark",
      "São Paulo & Rio de Janeiro: Guia Turístico e Cultural",
      "Łódź & Kraków: Przewodnik po Najciekawszych Zabytkach",
    ],
  },
};
