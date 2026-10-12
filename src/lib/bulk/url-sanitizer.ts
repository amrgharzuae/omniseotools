/**
 * Bulk URL Cleaner & Canonical Auditor Engine
 * 100% Client-Side In-Memory URL sanitization, tracking parameter stripping,
 * trailing slash normalization, Punycode audit, and canonical consistency checks.
 */

export interface UrlCleanerOptions {
  stripTrackingParams: boolean;
  stripAllParams: boolean;
  forceLowercasePath: boolean;
  trailingSlashMode: "strip" | "enforce" | "preserve";
  stripHashFragment: boolean;
  sortQueryParams: boolean;
  flagUppercase: boolean;
  flagNonAscii: boolean;
  flagPunycode: boolean;
  encodeNonAscii: boolean;
  forceHttps: boolean;
}

export const DEFAULT_CLEANER_OPTIONS: UrlCleanerOptions = {
  stripTrackingParams: true,
  stripAllParams: false,
  forceLowercasePath: true,
  trailingSlashMode: "strip",
  stripHashFragment: true,
  sortQueryParams: true,
  flagUppercase: true,
  flagNonAscii: true,
  flagPunycode: true,
  encodeNonAscii: true,
  forceHttps: false,
};

export type UrlAuditStatus = "clean" | "modified" | "invalid";

export interface CleanedUrlRow {
  id: string;
  originalUrl: string;
  cleanedUrl: string;
  status: UrlAuditStatus;
  issues: string[];
  protocol: "https" | "http" | "unknown";
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
  isHttps: boolean;
  hasPunycode: boolean;
  hasNonAscii: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export interface BulkUrlAuditResult {
  rows: CleanedUrlRow[];
  totalCount: number;
  cleanCount: number;
  modifiedCount: number;
  invalidCount: number;
  trackingStrippedCount: number;
  trailingSlashFixedCount: number;
  caseNormalizedCount: number;
  nonAsciiCount: number;
  punycodeCount: number;
  insecureHttpCount: number;
}

// Known marketing and tracking parameter prefixes and names
const TRACKING_PARAM_PATTERNS: RegExp[] = [
  /^utm_/i,
  /^fbclid$/i,
  /^fbc$/i,
  /^fbp$/i,
  /^gclid$/i,
  /^gclsrc$/i,
  /^dclid$/i,
  /^gad_source$/i,
  /^gbraid$/i,
  /^wbraid$/i,
  /^_ga$/i,
  /^_gl$/i,
  /^msclkid$/i,
  /^ttclid$/i,
  /^tt_medium$/i,
  /^tt_content$/i,
  /^twclid$/i,
  /^igshid$/i,
  /^mc_cid$/i,
  /^mc_eid$/i,
  /^vero_id$/i,
  /^vero_conv$/i,
  /^wickedid$/i,
  /^oly_anon_id$/i,
  /^oly_enc_id$/i,
  /^_hsenc$/i,
  /^_hsmi$/i,
  /^hsCtaTracking$/i,
  /^ref$/i,
  /^ref_src$/i,
  /^ref_url$/i,
  /^source$/i,
  /^campaign$/i,
  /^trk$/i,
  /^tracking_id$/i,
  /^affiliate_id$/i,
  /^zanpid$/i,
  /^rb_clickid$/i,
  /^sscid$/i,
];

function isTrackingParam(key: string): boolean {
  return TRACKING_PARAM_PATTERNS.some((pattern) => pattern.test(key));
}

/**
 * Checks if a string contains non-ASCII characters.
 */
function hasNonAsciiChars(str: string): boolean {
  return /[^\x00-\x7F]/.test(str);
}

/**
 * Checks if a hostname contains punycode labels (xn--).
 */
function isPunycodeHostname(hostname: string): boolean {
  return hostname.toLowerCase().includes("xn--");
}

/**
 * Sanitizes and audits an individual URL string.
 */
export function cleanAndAuditUrl(
  rawUrl: string,
  options: UrlCleanerOptions = DEFAULT_CLEANER_OPTIONS,
  rowId: number
): CleanedUrlRow {
  const trimmed = rawUrl.trim();
  const issues: string[] = [];

  if (!trimmed) {
    return {
      id: `url-${rowId}`,
      originalUrl: rawUrl,
      cleanedUrl: "",
      status: "invalid",
      issues: ["Empty URL string"],
      protocol: "unknown",
      hostname: "",
      pathname: "",
      search: "",
      hash: "",
      isHttps: false,
      hasPunycode: false,
      hasNonAscii: false,
      isValid: false,
      errorMessage: "Empty URL",
    };
  }

  let parsedUrl: URL;
  let hasValidSyntax = true;

  try {
    const hasProtocol = /^https?:\/\//i.test(trimmed);
    const urlStringToParse = hasProtocol ? trimmed : `https://${trimmed}`;
    parsedUrl = new URL(urlStringToParse);
  } catch (err: any) {
    hasValidSyntax = false;
    return {
      id: `url-${rowId}`,
      originalUrl: trimmed,
      cleanedUrl: trimmed,
      status: "invalid",
      issues: [`Malformed URL syntax: ${err.message || "Cannot parse"}`],
      protocol: "unknown",
      hostname: "",
      pathname: "",
      search: "",
      hash: "",
      isHttps: false,
      hasPunycode: false,
      hasNonAscii: hasNonAsciiChars(trimmed),
      isValid: false,
      errorMessage: "Invalid URL syntax",
    };
  }

  const originalProtocol = parsedUrl.protocol;
  const isHttps = originalProtocol === "https:";
  const hasPunycode = isPunycodeHostname(parsedUrl.hostname);
  const hasNonAscii = hasNonAsciiChars(trimmed);

  if (hasPunycode && options.flagPunycode) {
    issues.push(`Internationalized Punycode domain detected (${parsedUrl.hostname})`);
  }

  if (hasNonAscii && options.flagNonAscii) {
    issues.push("Non-ASCII / Unicode characters found in URL");
  }

  if (originalProtocol === "http:" && !options.forceHttps) {
    issues.push("Insecure HTTP protocol");
  }

  // Force HTTPS if option is checked
  if (options.forceHttps && originalProtocol === "http:") {
    parsedUrl.protocol = "https:";
    issues.push("Upgraded protocol to HTTPS");
  }

  // Force lowercase hostname (browsers do this, but ensure consistency)
  parsedUrl.hostname = parsedUrl.hostname.toLowerCase();

  // Audit and clean Pathname
  let path = parsedUrl.pathname;

  // Check for uppercase characters in path
  if (/[A-Z]/.test(path) && options.flagUppercase) {
    issues.push("Uppercase letters detected in URL path");
  }

  if (options.forceLowercasePath && /[A-Z]/.test(path)) {
    path = path.toLowerCase();
    issues.push("Converted path to lowercase");
  }

  // Trailing slash normalization
  const isRoot = path === "/" || path === "";
  const hasExtension = /\.[a-z0-9]{2,5}$/i.test(path);

  if (!isRoot && !hasExtension) {
    const endsWithSlash = path.endsWith("/");
    if (options.trailingSlashMode === "strip" && endsWithSlash) {
      path = path.replace(/\/+$/, "");
      issues.push("Stripped trailing slash");
    } else if (options.trailingSlashMode === "enforce" && !endsWithSlash) {
      path = `${path}/`;
      issues.push("Enforced trailing slash");
    }
  }

  parsedUrl.pathname = path;

  // Audit and clean Hash Fragment
  if (parsedUrl.hash) {
    if (options.stripHashFragment) {
      const removedHash = parsedUrl.hash;
      parsedUrl.hash = "";
      issues.push(`Removed hash anchor fragment (${removedHash})`);
    }
  }

  // Audit and clean Query Parameters
  const removedTrackingParams: string[] = [];
  const searchParams = new URLSearchParams(parsedUrl.search);

  if (options.stripAllParams && searchParams.size > 0) {
    parsedUrl.search = "";
    issues.push(`Removed all query parameters (${searchParams.size} parameters)`);
  } else if (options.stripTrackingParams) {
    const keysToDelete: string[] = [];
    searchParams.forEach((_, key) => {
      if (isTrackingParam(key)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      removedTrackingParams.push(key);
      searchParams.delete(key);
    });

    if (removedTrackingParams.length > 0) {
      issues.push(
        `Stripped ${removedTrackingParams.length} tracking parameters: ${removedTrackingParams.slice(0, 4).join(", ")}${removedTrackingParams.length > 4 ? "..." : ""}`
      );
    }

    // Sort remaining query params alphabetically
    if (options.sortQueryParams && searchParams.size > 1) {
      searchParams.sort();
      issues.push("Sorted remaining query parameters alphabetically");
    }

    parsedUrl.search = searchParams.toString() ? `?${searchParams.toString()}` : "";
  } else if (options.sortQueryParams && searchParams.size > 1) {
    searchParams.sort();
    parsedUrl.search = searchParams.toString() ? `?${searchParams.toString()}` : "";
    issues.push("Sorted query parameters alphabetically");
  }

  const cleanedUrl = parsedUrl.toString();
  const isModified = cleanedUrl !== trimmed;
  const status: UrlAuditStatus = isModified ? "modified" : "clean";

  return {
    id: `url-${rowId}`,
    originalUrl: trimmed,
    cleanedUrl,
    status,
    issues: issues.length > 0 ? issues : ["URL is canonical & clean"],
    protocol: isHttps ? "https" : originalProtocol === "http:" ? "http" : "unknown",
    hostname: parsedUrl.hostname,
    pathname: parsedUrl.pathname,
    search: parsedUrl.search,
    hash: parsedUrl.hash,
    isHttps,
    hasPunycode,
    hasNonAscii,
    isValid: true,
  };
}

/**
 * Main batch processing function for up to 10,000 URLs.
 */
export function auditAndCleanUrlsBulk(
  rawInput: string,
  options: UrlCleanerOptions = DEFAULT_CLEANER_OPTIONS
): BulkUrlAuditResult {
  const lines = rawInput
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    return {
      rows: [],
      totalCount: 0,
      cleanCount: 0,
      modifiedCount: 0,
      invalidCount: 0,
      trackingStrippedCount: 0,
      trailingSlashFixedCount: 0,
      caseNormalizedCount: 0,
      nonAsciiCount: 0,
      punycodeCount: 0,
      insecureHttpCount: 0,
    };
  }

  const rows: CleanedUrlRow[] = [];
  let cleanCount = 0;
  let modifiedCount = 0;
  let invalidCount = 0;
  let trackingStrippedCount = 0;
  let trailingSlashFixedCount = 0;
  let caseNormalizedCount = 0;
  let nonAsciiCount = 0;
  let punycodeCount = 0;
  let insecureHttpCount = 0;

  lines.forEach((line, index) => {
    const row = cleanAndAuditUrl(line, options, index + 1);
    rows.push(row);

    if (row.status === "clean") cleanCount++;
    if (row.status === "modified") modifiedCount++;
    if (row.status === "invalid") invalidCount++;

    if (row.issues.some((i) => i.includes("tracking parameters"))) trackingStrippedCount++;
    if (row.issues.some((i) => i.includes("trailing slash"))) trailingSlashFixedCount++;
    if (row.issues.some((i) => i.includes("lowercase"))) caseNormalizedCount++;
    if (row.hasNonAscii) nonAsciiCount++;
    if (row.hasPunycode) punycodeCount++;
    if (row.protocol === "http") insecureHttpCount++;
  });

  return {
    rows,
    totalCount: rows.length,
    cleanCount,
    modifiedCount,
    invalidCount,
    trackingStrippedCount,
    trailingSlashFixedCount,
    caseNormalizedCount,
    nonAsciiCount,
    punycodeCount,
    insecureHttpCount,
  };
}

export const SAMPLE_URLS_TO_CLEAN = `https://omniseotools.com/Tools/SEO/Serp-Preview/?utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_sale&fbclid=IwAR2XYZ#review-section
https://omniseotools.com/BLOG/Xml-Sitemap-Optimization-Guide-2026/
http://insecure-domain.example.com/products/shoes/?gclid=Cj0KCQjwgJ71BRD2ARIs_SAMPLE_ID&ref=adwords
https://example.com/checkout/cart?b_param=second&a_param=first&utm_term=running+shoes
https://xn--mgbh0fb.example.com/category/electronics/
https://omniseotools.com/ar/أدوات-السيو/
https://omniseotools.com/clean-canonical-page
https://omniseotools.com/legacy-feed/?ttclid=E_SAMPLE_TIKTOK_TAG&msclkid=SAMPLE_BING_TAG#comments
https://omniseotools.com/PRICING/?utm_source=newsletter&utm_medium=email&mc_cid=abc1234&mc_eid=xyz5678
malformed://invalid url string with spaces
https://omniseotools.com/blog/how-to-fix-redirect-error-gsc/`;
