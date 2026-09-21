export interface HreflangEntry {
  lang: string; // e.g. "en", "ar", "es"
  region?: string; // e.g. "US", "AE", "GB"
  script?: string; // e.g. "Hant", "Hans", "Latn"
  url: string;
  isDefault?: boolean; // if true, hreflang code is "x-default"
}

export interface HreflangOutput {
  htmlTags: string[]; // array of '<link rel="alternate" hreflang="..." href="..." />'
  xmlSnippet: string; // formatted '<xhtml:link rel="alternate" hreflang="..." href="..."/>' block for sitemaps
  httpHeader: string; // formatted 'Link: <url>; rel="alternate"; hreflang="..."' string
}

export interface HreflangValidationIssue {
  index: number;
  type: "error" | "warning";
  message: string;
}

export interface HreflangValidationResult {
  isValid: boolean;
  issues: HreflangValidationIssue[];
}

/**
 * Normalizes and formats standard BCP 47 hreflang attributes.
 *
 * - If isDefault is true, returns "x-default".
 * - Language is lowercased (e.g., "EN" -> "en").
 * - Region is uppercased (e.g., "us" -> "US").
 * - Script is title-cased (e.g., "hant" -> "Hant").
 *
 * @param lang - ISO 639-1 language code (e.g. "en", "ar")
 * @param region - Optional ISO 3166-1 alpha-2 region code (e.g. "US", "AE")
 * @param script - Optional ISO 15924 script code (e.g. "Hant", "Hans")
 * @param isDefault - Optional boolean indicating x-default fallback
 * @returns Formatted BCP 47 hreflang tag string (e.g. "en-US", "zh-Hant-TW", "x-default")
 */
export function formatHreflangCode(
  lang: string,
  region?: string,
  script?: string,
  isDefault?: boolean
): string {
  if (isDefault) {
    return "x-default";
  }

  const l = (lang || "").trim().toLowerCase();
  if (!l) {
    return "";
  }

  const s = script && script.trim()
    ? script.trim().charAt(0).toUpperCase() + script.trim().slice(1).toLowerCase()
    : undefined;

  const r = region && region.trim() ? region.trim().toUpperCase() : undefined;

  const parts = [l];
  if (s) {
    parts.push(s);
  }
  if (r) {
    parts.push(r);
  }

  return parts.join("-");
}

/**
 * Generates HTML tags, XML sitemap snippets, and HTTP Link headers for hreflang entries.
 *
 * @param entries - List of HreflangEntry objects.
 * @returns HreflangOutput containing htmlTags, xmlSnippet, and httpHeader.
 */
export function generateHreflangTags(entries: HreflangEntry[]): HreflangOutput {
  const htmlTags: string[] = [];
  const xmlLines: string[] = [];
  const httpLinks: string[] = [];

  for (const entry of entries) {
    const code = formatHreflangCode(entry.lang, entry.region, entry.script, entry.isDefault);
    const url = entry.url.trim();

    htmlTags.push(`<link rel="alternate" hreflang="${code}" href="${url}" />`);
    xmlLines.push(`<xhtml:link rel="alternate" hreflang="${code}" href="${url}"/>`);
    httpLinks.push(`<${url}>; rel="alternate"; hreflang="${code}"`);
  }

  const xmlSnippet = xmlLines.join("\n");
  const httpHeader = httpLinks.length > 0 ? `Link: ${httpLinks.join(", ")}` : "";

  return {
    htmlTags,
    xmlSnippet,
    httpHeader,
  };
}

/**
 * Validates hreflang entries against technical SEO rules.
 *
 * Checks:
 * - Empty, invalid, or non-absolute URLs.
 * - Missing x-default fallback.
 * - Duplicate language-region-script codes pointing to different URLs.
 * - Duplicate URLs mapped to different languages.
 *
 * @param entries - List of HreflangEntry objects.
 * @returns HreflangValidationResult with isValid boolean and issue diagnostics.
 */
export function validateHreflangEntries(entries: HreflangEntry[]): HreflangValidationResult {
  const issues: HreflangValidationIssue[] = [];

  // Check URLs
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!entry.url || !entry.url.trim()) {
      issues.push({
        index: i,
        type: "error",
        message: `Entry at index ${i} has an empty URL.`,
      });
      continue;
    }

    try {
      const parsedUrl = new URL(entry.url.trim());
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        issues.push({
          index: i,
          type: "error",
          message: `URL "${entry.url}" at index ${i} has an invalid protocol "${parsedUrl.protocol}". Must start with http:// or https://.`,
        });
      }
    } catch {
      issues.push({
        index: i,
        type: "error",
        message: `URL "${entry.url}" at index ${i} is not a valid absolute URL. Must start with http:// or https://.`,
      });
    }
  }

  // Check x-default presence
  const hasDefault = entries.some(
    (e) => e.isDefault === true || formatHreflangCode(e.lang, e.region, e.script, e.isDefault) === "x-default"
  );
  if (!hasDefault && entries.length > 0) {
    issues.push({
      index: 0,
      type: "warning",
      message: 'Missing "x-default" fallback entry for international targeting.',
    });
  }

  // Check duplicate codes pointing to different URLs
  const codeMap = new Map<string, { url: string; index: number }>();
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const code = formatHreflangCode(entry.lang, entry.region, entry.script, entry.isDefault);
    if (!code) {
      continue;
    }

    if (codeMap.has(code)) {
      const existing = codeMap.get(code)!;
      if (existing.url !== entry.url.trim()) {
        issues.push({
          index: i,
          type: "error",
          message: `Duplicate hreflang code "${code}" pointing to different URL "${entry.url}" (conflicts with entry at index ${existing.index} pointing to "${existing.url}").`,
        });
      }
    } else {
      codeMap.set(code, { url: entry.url.trim(), index: i });
    }
  }

  // Check identical URLs mapped to different languages
  const urlMap = new Map<string, { code: string; index: number; isDefault: boolean }>();
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const url = entry.url ? entry.url.trim() : "";
    const code = formatHreflangCode(entry.lang, entry.region, entry.script, entry.isDefault);
    const isDef = entry.isDefault === true || code === "x-default";

    if (!url) {
      continue;
    }

    if (urlMap.has(url)) {
      const existing = urlMap.get(url)!;
      if (existing.code !== code && !isDef && !existing.isDefault) {
        issues.push({
          index: i,
          type: "warning",
          message: `Identical URL "${url}" is mapped to multiple distinct language codes ("${existing.code}" and "${code}").`,
        });
      }
    } else {
      urlMap.set(url, { code, index: i, isDefault: isDef });
    }
  }

  const isValid = issues.filter((issue) => issue.type === "error").length === 0;

  return {
    isValid,
    issues,
  };
}
