/**
 * Bulk Meta Tag Batch Inspector Engine
 * Evaluates SEO Meta Titles, Descriptions, and Headings at scale with 100% in-browser parsing.
 */

export type MetaLengthStatus = "optimal" | "too_short" | "too_long" | "missing";
export type EntryAuditStatus = "optimal" | "warning" | "error";

export interface MetaInspectorOptions {
  titleMinChars: number;
  titleMaxChars: number;
  descMinChars: number;
  descMaxChars: number;
}

export const DEFAULT_INSPECTOR_OPTIONS: MetaInspectorOptions = {
  titleMinChars: 50,
  titleMaxChars: 60,
  descMinChars: 120,
  descMaxChars: 160,
};

export interface MetaInspectorEntry {
  id: string;
  url?: string;
  title: string;
  titleLength: number;
  titleStatus: MetaLengthStatus;
  titleTruncated: boolean;
  description: string;
  descLength: number;
  descStatus: MetaLengthStatus;
  descTruncated: boolean;
  h1?: string;
  status: EntryAuditStatus;
  issues: string[];
}

export interface BulkMetaInspectResult {
  entries: MetaInspectorEntry[];
  totalCount: number;
  optimalCount: number;
  warningCount: number;
  errorCount: number;
  optimalTitlesCount: number;
  tooLongTitlesCount: number;
  tooShortTitlesCount: number;
  missingTitlesCount: number;
  optimalDescCount: number;
  tooLongDescCount: number;
  tooShortDescCount: number;
  missingDescCount: number;
}

/**
 * Splits a CSV/TSV line respecting quoted fields.
 */
function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Detects delimiter in tabular input.
 */
function detectDelimiter(lines: string[]): string {
  const sample = lines.slice(0, 5).join("\n");
  const tabCount = (sample.match(/\t/g) || []).length;
  const commaCount = (sample.match(/,/g) || []).length;
  const pipeCount = (sample.match(/\|/g) || []).length;

  if (tabCount >= lines.length) return "\t";
  if (pipeCount >= lines.length) return "|";
  if (commaCount >= lines.length) return ",";
  return "\t";
}

/**
 * Determines whether raw text is HTML markup.
 */
function isHtmlMarkup(raw: string): boolean {
  return /<title|<meta|<h1/i.test(raw);
}

/**
 * Evaluates Title status.
 */
function evaluateTitle(
  title: string,
  options: MetaInspectorOptions
): { status: MetaLengthStatus; length: number; isTruncated: boolean; issue?: string } {
  const clean = title ? title.trim() : "";
  const length = clean.length;

  if (length === 0) {
    return { status: "missing", length: 0, isTruncated: false, issue: "Missing <title> tag" };
  }

  if (length < options.titleMinChars) {
    return {
      status: "too_short",
      length,
      isTruncated: false,
      issue: `Title is short (${length} / ${options.titleMinChars}-${options.titleMaxChars} chars)`,
    };
  }

  if (length > options.titleMaxChars) {
    return {
      status: "too_long",
      length,
      isTruncated: true,
      issue: `Title exceeds SERP limit (${length} > ${options.titleMaxChars} chars)`,
    };
  }

  return { status: "optimal", length, isTruncated: false };
}

/**
 * Evaluates Description status.
 */
function evaluateDescription(
  desc: string,
  options: MetaInspectorOptions
): { status: MetaLengthStatus; length: number; isTruncated: boolean; issue?: string } {
  const clean = desc ? desc.trim() : "";
  const length = clean.length;

  if (length === 0) {
    return { status: "missing", length: 0, isTruncated: false, issue: "Missing meta description" };
  }

  if (length < options.descMinChars) {
    return {
      status: "too_short",
      length,
      isTruncated: false,
      issue: `Description is short (${length} / ${options.descMinChars}-${options.descMaxChars} chars)`,
    };
  }

  if (length > options.descMaxChars) {
    return {
      status: "too_long",
      length,
      isTruncated: true,
      issue: `Description exceeds SERP limit (${length} > ${options.descMaxChars} chars)`,
    };
  }

  return { status: "optimal", length, isTruncated: false };
}

/**
 * Extracts and audits entries from raw HTML fragments.
 */
function parseHtmlEntries(
  rawHtml: string,
  options: MetaInspectorOptions
): MetaInspectorEntry[] {
  const entries: MetaInspectorEntry[] = [];

  // Match HTML snippets or pages
  const titleMatches = [...rawHtml.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) =>
    m[1].trim()
  );

  const descMatches = [
    ...rawHtml.matchAll(
      /<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']*)["']/gi
    ),
    ...rawHtml.matchAll(
      /<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["'](?:description|og:description)["']/gi
    ),
  ].map((m) => m[1].trim());

  const h1Matches = [...rawHtml.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].trim().replace(/<[^>]*>/g, "")
  );

  const maxLen = Math.max(titleMatches.length, descMatches.length, h1Matches.length, 1);

  for (let i = 0; i < maxLen; i++) {
    const title = titleMatches[i] || "";
    const description = descMatches[i] || "";
    const h1 = h1Matches[i] || undefined;

    const tEval = evaluateTitle(title, options);
    const dEval = evaluateDescription(description, options);

    const issues: string[] = [];
    if (tEval.issue) issues.push(tEval.issue);
    if (dEval.issue) issues.push(dEval.issue);

    let status: EntryAuditStatus = "optimal";
    if (tEval.status === "missing" || dEval.status === "missing") {
      status = "error";
    } else if (
      tEval.status === "too_long" ||
      tEval.status === "too_short" ||
      dEval.status === "too_long" ||
      dEval.status === "too_short"
    ) {
      status = "warning";
    }

    entries.push({
      id: `meta-${i + 1}`,
      title,
      titleLength: tEval.length,
      titleStatus: tEval.status,
      titleTruncated: tEval.isTruncated,
      description,
      descLength: dEval.length,
      descStatus: dEval.status,
      descTruncated: dEval.isTruncated,
      h1,
      status,
      issues: issues.length > 0 ? issues : ["Optimal length & tags"],
    });
  }

  return entries;
}

/**
 * Parses tabular CSV/TSV data into audited entries.
 */
function parseTabularEntries(
  lines: string[],
  options: MetaInspectorOptions
): MetaInspectorEntry[] {
  if (lines.length === 0) return [];

  const delimiter = detectDelimiter(lines);
  const firstLineCols = parseCsvLine(lines[0], delimiter);

  // Check if first line is a header
  let urlCol = -1;
  let titleCol = -1;
  let descCol = -1;
  let h1Col = -1;

  firstLineCols.forEach((col, idx) => {
    const lower = col.toLowerCase();
    if (lower.includes("url") || lower.includes("link") || lower.includes("loc")) urlCol = idx;
    else if (lower.includes("title") || lower === "meta_title") titleCol = idx;
    else if (lower.includes("desc") || lower === "meta_description") descCol = idx;
    else if (lower.includes("h1") || lower.includes("heading")) h1Col = idx;
  });

  const hasHeader = titleCol !== -1 || descCol !== -1 || urlCol !== -1;
  const dataLines = hasHeader ? lines.slice(1) : lines;

  // Fallback column positions if no header was detected
  if (titleCol === -1 && descCol === -1) {
    if (firstLineCols.length >= 3) {
      if (/^https?:\/\//i.test(firstLineCols[0])) {
        urlCol = 0;
        titleCol = 1;
        descCol = 2;
      } else {
        titleCol = 0;
        descCol = 1;
        h1Col = 2;
      }
    } else if (firstLineCols.length === 2) {
      if (/^https?:\/\//i.test(firstLineCols[0])) {
        urlCol = 0;
        titleCol = 1;
      } else {
        titleCol = 0;
        descCol = 1;
      }
    } else {
      titleCol = 0;
    }
  }

  const entries: MetaInspectorEntry[] = [];

  dataLines.forEach((line, idx) => {
    const cols = parseCsvLine(line, delimiter);
    if (cols.length === 0 || cols.every((c) => c === "")) return;

    const url = urlCol !== -1 && cols[urlCol] ? cols[urlCol] : undefined;
    const title = titleCol !== -1 && cols[titleCol] ? cols[titleCol] : "";
    const description = descCol !== -1 && cols[descCol] ? cols[descCol] : "";
    const h1 = h1Col !== -1 && cols[h1Col] ? cols[h1Col] : undefined;

    const tEval = evaluateTitle(title, options);
    const dEval = evaluateDescription(description, options);

    const issues: string[] = [];
    if (tEval.issue) issues.push(tEval.issue);
    if (dEval.issue) issues.push(dEval.issue);

    let status: EntryAuditStatus = "optimal";
    if (tEval.status === "missing" || dEval.status === "missing") {
      status = "error";
    } else if (
      tEval.status === "too_long" ||
      tEval.status === "too_short" ||
      dEval.status === "too_long" ||
      dEval.status === "too_short"
    ) {
      status = "warning";
    }

    entries.push({
      id: `meta-${idx + 1}`,
      url,
      title,
      titleLength: tEval.length,
      titleStatus: tEval.status,
      titleTruncated: tEval.isTruncated,
      description,
      descLength: dEval.length,
      descStatus: dEval.status,
      descTruncated: dEval.isTruncated,
      h1,
      status,
      issues: issues.length > 0 ? issues : ["Optimal length & tags"],
    });
  });

  return entries;
}

/**
 * Main batch inspection entry point.
 */
export function inspectMetaTagsBulk(
  rawInput: string,
  options: MetaInspectorOptions = DEFAULT_INSPECTOR_OPTIONS
): BulkMetaInspectResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      entries: [],
      totalCount: 0,
      optimalCount: 0,
      warningCount: 0,
      errorCount: 0,
      optimalTitlesCount: 0,
      tooLongTitlesCount: 0,
      tooShortTitlesCount: 0,
      missingTitlesCount: 0,
      optimalDescCount: 0,
      tooLongDescCount: 0,
      tooShortDescCount: 0,
      missingDescCount: 0,
    };
  }

  let entries: MetaInspectorEntry[] = [];

  if (isHtmlMarkup(trimmed)) {
    entries = parseHtmlEntries(trimmed, options);
  } else {
    const rawLines = trimmed
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    entries = parseTabularEntries(rawLines, options);
  }

  let optimalCount = 0;
  let warningCount = 0;
  let errorCount = 0;

  let optimalTitlesCount = 0;
  let tooLongTitlesCount = 0;
  let tooShortTitlesCount = 0;
  let missingTitlesCount = 0;

  let optimalDescCount = 0;
  let tooLongDescCount = 0;
  let tooShortDescCount = 0;
  let missingDescCount = 0;

  entries.forEach((e) => {
    if (e.status === "optimal") optimalCount++;
    if (e.status === "warning") warningCount++;
    if (e.status === "error") errorCount++;

    if (e.titleStatus === "optimal") optimalTitlesCount++;
    if (e.titleStatus === "too_long") tooLongTitlesCount++;
    if (e.titleStatus === "too_short") tooShortTitlesCount++;
    if (e.titleStatus === "missing") missingTitlesCount++;

    if (e.descStatus === "optimal") optimalDescCount++;
    if (e.descStatus === "too_long") tooLongDescCount++;
    if (e.descStatus === "too_short") tooShortDescCount++;
    if (e.descStatus === "missing") missingDescCount++;
  });

  return {
    entries,
    totalCount: entries.length,
    optimalCount,
    warningCount,
    errorCount,
    optimalTitlesCount,
    tooLongTitlesCount,
    tooShortTitlesCount,
    missingTitlesCount,
    optimalDescCount,
    tooLongDescCount,
    tooShortDescCount,
    missingDescCount,
  };
}

export const SAMPLE_META_TABULAR = `URL\tTitle\tMeta Description\tH1
https://omniseotools.com/\tOmniSEOTools: Free SEO & Web Marketing Utilities\tDiscover 50+ free, client-side SEO and digital marketing utility tools engineered for speed, privacy, and zero server logging.\tFree SEO Tools for Marketers
https://omniseotools.com/bulk/sitemap-extractor\tBulk XML Sitemap URL Extractor | Extract URLs, Lastmod & Hreflang Tags Online\tExtract, filter, and export URLs, last modified timestamps, image tags, and hreflang alternates from XML sitemaps to CSV and Google Sheets in seconds.\tBulk Sitemap URL Extractor
https://omniseotools.com/tools/google-serp-simulator\tGoogle SERP Simulator\tPreview Google desktop & mobile search engine result pages with instant pixel truncation checks.\tSERP Simulator
https://omniseotools.com/pricing\tPricing Plans\t\tAffordable Pricing
https://omniseotools.com/blog/xml-sitemap-guide\tComplete Guide to XML Sitemaps: Best Practices, Syntax, Indexation Strategies, and Common Errors to Avoid in 2026 for Search Engines\tLearn how to properly format XML sitemaps, customize change frequencies, and prevent indexation penalties in Google Search Console.\tXML Sitemap Guide
https://omniseotools.com/contact\tContact Us\tGet in touch with our team.\tGet In Touch`;

export const SAMPLE_META_HTML = `<title>OmniSEOTools: Free SEO &amp; Web Marketing Utilities</title>
<meta name="description" content="Discover 50+ free, client-side SEO and digital marketing utility tools engineered for speed, privacy, and zero server logging." />
<h1>Free SEO Tools for Marketers</h1>

<title>Bulk XML Sitemap URL Extractor | Extract URLs, Lastmod &amp; Hreflang Tags Online</title>
<meta name="description" content="Extract, filter, and export URLs, last modified timestamps, image tags, and hreflang alternates from XML sitemaps to CSV and Google Sheets in seconds." />

<title>Short Title</title>
<meta name="description" content="Short desc." />`;
