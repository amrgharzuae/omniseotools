export interface LanguageOption {
  code: string;
  name: string;
  nativeName?: string;
}

export interface CountryOption {
  code: string;
  name: string;
}

export interface HreflangRow {
  id: string;
  url: string;
  language: string;
  region: string;
  isDefault: boolean;
}

export interface HreflangValidationFinding {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  description: string;
  affectedRowIds?: string[];
}

export interface HreflangGeneratedSnippets {
  htmlHeadSnippet: string;
  xmlSitemapSnippet: string;
  nextjsSnippet: string;
  httpHeaderSnippet: string;
}

export interface HreflangPreset {
  id: string;
  name: string;
  description: string;
  rows: Omit<HreflangRow, "id">[];
}

export const ISO_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "sv", name: "Swedish", nativeName: "Svenska" },
  { code: "da", name: "Danish", nativeName: "Dansk" },
  { code: "fi", name: "Finnish", nativeName: "Suomi" },
  { code: "no", name: "Norwegian", nativeName: "Norsk" },
  { code: "he", name: "Hebrew", nativeName: "עברית" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "cs", name: "Czech", nativeName: "Čeština" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά" },
  { code: "ro", name: "Romanian", nativeName: "Română" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu" },
  { code: "fil", name: "Filipino", nativeName: "Filipino" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
];

export const ISO_COUNTRIES: CountryOption[] = [
  { code: "", name: "Any Region (Language-Wide)" },
  { code: "US", name: "United States (US)" },
  { code: "GB", name: "United Kingdom (GB - Not UK)" },
  { code: "CA", name: "Canada (CA)" },
  { code: "AU", name: "Australia (AU)" },
  { code: "AE", name: "United Arab Emirates (AE)" },
  { code: "SA", name: "Saudi Arabia (SA)" },
  { code: "EG", name: "Egypt (EG)" },
  { code: "DE", name: "Germany (DE)" },
  { code: "FR", name: "France (FR)" },
  { code: "ES", name: "Spain (ES)" },
  { code: "IT", name: "Italy (IT)" },
  { code: "NL", name: "Netherlands (NL)" },
  { code: "BE", name: "Belgium (BE)" },
  { code: "CH", name: "Switzerland (CH)" },
  { code: "AT", name: "Austria (AT)" },
  { code: "SE", name: "Sweden (SE)" },
  { code: "NO", name: "Norway (NO)" },
  { code: "DK", name: "Denmark (DK)" },
  { code: "FI", name: "Finland (FI)" },
  { code: "PL", name: "Poland (PL)" },
  { code: "IE", name: "Ireland (IE)" },
  { code: "NZ", name: "New Zealand (NZ)" },
  { code: "SG", name: "Singapore (SG)" },
  { code: "JP", name: "Japan (JP)" },
  { code: "CN", name: "China (CN)" },
  { code: "IN", name: "India (IN)" },
  { code: "BR", name: "Brazil (BR)" },
  { code: "MX", name: "Mexico (MX)" },
  { code: "AR", name: "Argentina (AR)" },
  { code: "CL", name: "Chile (CL)" },
  { code: "CO", name: "Colombia (CO)" },
  { code: "ZA", name: "South Africa (ZA)" },
  { code: "TR", name: "Turkey (TR)" },
  { code: "QA", name: "Qatar (QA)" },
  { code: "KW", name: "Kuwait (KW)" },
  { code: "OM", name: "Oman (OM)" },
  { code: "BH", name: "Bahrain (BH)" },
];

export const HREFLANG_PRESETS: HreflangPreset[] = [
  {
    id: "global-ecommerce",
    name: "Global E-Commerce (US, UK, UAE, Global)",
    description: "Multi-country English targeting with UAE Arabic and x-default root fallback",
    rows: [
      { url: "https://example.com/", language: "en", region: "", isDefault: true },
      { url: "https://example.com/en-us/", language: "en", region: "US", isDefault: false },
      { url: "https://example.com/en-gb/", language: "en", region: "GB", isDefault: false },
      { url: "https://example.com/ar-ae/", language: "ar", region: "AE", isDefault: false },
    ],
  },
  {
    id: "multilingual-domestic-ca",
    name: "Canada Multilingual (EN-CA / FR-CA)",
    description: "Bilingual English and French targeting for Canadian consumers",
    rows: [
      { url: "https://example.com/", language: "en", region: "", isDefault: true },
      { url: "https://example.com/en-ca/", language: "en", region: "CA", isDefault: false },
      { url: "https://example.com/fr-ca/", language: "fr", region: "CA", isDefault: false },
    ],
  },
  {
    id: "european-multilingual",
    name: "Pan-European Store (DE, FR, ES, IT)",
    description: "Major Western European regional languages with English root",
    rows: [
      { url: "https://example.com/", language: "en", region: "", isDefault: true },
      { url: "https://example.com/de/", language: "de", region: "DE", isDefault: false },
      { url: "https://example.com/fr/", language: "fr", region: "FR", isDefault: false },
      { url: "https://example.com/es/", language: "es", region: "ES", isDefault: false },
      { url: "https://example.com/it/", language: "it", region: "IT", isDefault: false },
    ],
  },
  {
    id: "middle-east-gcc",
    name: "Middle East & GCC (UAE, Saudi Arabia, Egypt)",
    description: "Regional Arabic dialects and UAE English with global default",
    rows: [
      { url: "https://example.com/", language: "en", region: "", isDefault: true },
      { url: "https://example.com/ar-ae/", language: "ar", region: "AE", isDefault: false },
      { url: "https://example.com/en-ae/", language: "en", region: "AE", isDefault: false },
      { url: "https://example.com/ar-sa/", language: "ar", region: "SA", isDefault: false },
      { url: "https://example.com/ar-eg/", language: "ar", region: "EG", isDefault: false },
    ],
  },
  {
    id: "latam-spanish",
    name: "Latin America Regional Spanish",
    description: "Targeted Spanish variations across Mexico, Colombia, Argentina, and Spain",
    rows: [
      { url: "https://example.com/", language: "es", region: "", isDefault: true },
      { url: "https://example.com/es-mx/", language: "es", region: "MX", isDefault: false },
      { url: "https://example.com/es-co/", language: "es", region: "CO", isDefault: false },
      { url: "https://example.com/es-ar/", language: "es", region: "AR", isDefault: false },
      { url: "https://example.com/es-es/", language: "es", region: "ES", isDefault: false },
    ],
  },
];

export function getHreflangCode(row: HreflangRow): string {
  if (row.isDefault) return "x-default";
  const lang = row.language.toLowerCase().trim();
  const reg = row.region ? row.region.toUpperCase().trim() : "";
  if (!lang) return "x-default";
  return reg ? `${lang}-${reg}` : lang;
}

export function validateHreflangMatrix(rows: HreflangRow[]): HreflangValidationFinding[] {
  const findings: HreflangValidationFinding[] = [];

  if (rows.length === 0) {
    findings.push({
      id: "no-rows",
      type: "error",
      title: "Hreflang Cluster is Empty",
      description: "Add at least two URL variants to create a valid international hreflang cluster.",
    });
    return findings;
  }

  // 1. Check for x-default
  const defaultRows = rows.filter((r) => r.isDefault);
  if (defaultRows.length === 0) {
    findings.push({
      id: "missing-x-default",
      type: "warning",
      title: "Missing 'x-default' Fallback Tag",
      description:
        "Google strongly recommends specifying an 'x-default' URL to serve unmatched international searchers and language-selector landing pages.",
    });
  } else if (defaultRows.length > 1) {
    findings.push({
      id: "multiple-x-default",
      type: "error",
      title: "Multiple 'x-default' Fallbacks Declared",
      description: "Only one URL can be designated as the x-default global fallback in a single hreflang cluster.",
      affectedRowIds: defaultRows.map((r) => r.id),
    });
  }

  // 2. Check for duplicate hreflang codes
  const codeCounts: Record<string, string[]> = {};
  for (const row of rows) {
    const code = getHreflangCode(row);
    if (!codeCounts[code]) codeCounts[code] = [];
    codeCounts[code].push(row.id);
  }

  for (const [code, ids] of Object.entries(codeCounts)) {
    if (ids.length > 1 && code !== "x-default") {
      findings.push({
        id: `duplicate-code-${code}`,
        type: "error",
        title: `Duplicate Locale Code Detected: "${code}"`,
        description: `Multiple URLs claim the same locale '${code}'. Each hreflang attribute must map to a single unique URL.`,
        affectedRowIds: ids,
      });
    }
  }

  // 3. Check for URL syntax and absolute FQDN
  const invalidUrlRowIds: string[] = [];
  const duplicateUrls: Record<string, string[]> = {};

  for (const row of rows) {
    const trimmed = row.url.trim();
    if (!trimmed) {
      invalidUrlRowIds.push(row.id);
      continue;
    }

    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      invalidUrlRowIds.push(row.id);
    }

    if (!duplicateUrls[trimmed]) duplicateUrls[trimmed] = [];
    duplicateUrls[trimmed].push(row.id);
  }

  if (invalidUrlRowIds.length > 0) {
    findings.push({
      id: "invalid-urls",
      type: "error",
      title: "Relative or Non-HTTP URL Format",
      description:
        "Hreflang URLs must be fully qualified absolute URLs including protocol (e.g. 'https://example.com/en-us/'). Relative paths are ignored by Googlebot.",
      affectedRowIds: invalidUrlRowIds,
    });
  }

  for (const [url, ids] of Object.entries(duplicateUrls)) {
    if (ids.length > 1 && url) {
      findings.push({
        id: `duplicate-url-${url}`,
        type: "warning",
        title: "Same URL Mapped Multiple Times",
        description: `The URL '${url}' appears ${ids.length} times in the cluster with different locale assignments.`,
        affectedRowIds: ids,
      });
    }
  }

  // 4. ISO Code Validation Checks
  const invalidCodeRowIds: string[] = [];
  for (const row of rows) {
    if (row.isDefault) continue;
    // Check if region contains common mistakes like UK instead of GB
    if (row.region.toUpperCase() === "UK") {
      findings.push({
        id: `uk-instead-of-gb-${row.id}`,
        type: "error",
        title: "Invalid Country Code: 'UK' (Use 'GB')",
        description:
          "ISO 3166-1 alpha-2 specifies 'GB' for Great Britain / United Kingdom. 'UK' is technically reserved and rejected by search engine hreflang parsers.",
        affectedRowIds: [row.id],
      });
    } else if (row.region.toUpperCase() === "EU") {
      findings.push({
        id: `eu-region-${row.id}`,
        type: "error",
        title: "Invalid Country Code: 'EU'",
        description:
          "The European Union ('EU') is not an individual country code in ISO 3166-1. Use language-only 'en' or target specific member nations (e.g. 'de', 'fr', 'es').",
        affectedRowIds: [row.id],
      });
    }

    if (!row.language) {
      invalidCodeRowIds.push(row.id);
    }
  }

  if (invalidCodeRowIds.length > 0) {
    findings.push({
      id: "missing-language",
      type: "error",
      title: "Missing Language Code in Locale Row",
      description: "A language code in ISO 639-1 format is strictly required when declaring regional targeting.",
      affectedRowIds: invalidCodeRowIds,
    });
  }

  // 5. Reciprocal Confirmation Advisory
  if (rows.length > 1 && findings.filter((f) => f.type === "error").length === 0) {
    findings.push({
      id: "reciprocal-check-passed",
      type: "info",
      title: "Reciprocal Implementation Reminder",
      description:
        "Ensure this exact set of tags is copied into EVERY page in the cluster. Google Search Console will flag 'No Return-Tag' errors if any page omits its sister URLs.",
    });
  }

  return findings;
}

export function generateHreflangSnippets(
  rows: HreflangRow[],
  activeUrl?: string
): HreflangGeneratedSnippets {
  if (rows.length === 0) {
    return {
      htmlHeadSnippet: "<!-- Add URL entries to generate hreflang tags -->",
      xmlSitemapSnippet: "<!-- Add URL entries to generate XML Sitemap annotations -->",
      nextjsSnippet: "// Add URL entries to generate Next.js metadata alternates",
      httpHeaderSnippet: "# Add URL entries to generate HTTP Link headers",
    };
  }

  // 1. HTML <head> Tags
  const htmlLines = [
    "<!-- Hreflang Multi-Regional Cluster Meta Tags -->",
    "<!-- Place inside the <head> of every localized page in the cluster -->",
  ];

  for (const row of rows) {
    const code = getHreflangCode(row);
    const cleanUrl = row.url.trim() || "https://example.com/";
    htmlLines.push(`<link rel="alternate" hreflang="${code}" href="${cleanUrl}" />`);
  }

  // 2. XML Sitemap <xhtml:link> Block
  const sitemapLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const pageRow of rows) {
    const pageUrl = pageRow.url.trim() || "https://example.com/";
    sitemapLines.push("  <url>");
    sitemapLines.push(`    <loc>${pageUrl}</loc>`);
    for (const altRow of rows) {
      const altCode = getHreflangCode(altRow);
      const altUrl = altRow.url.trim() || "https://example.com/";
      sitemapLines.push(`    <xhtml:link rel="alternate" hreflang="${altCode}" href="${altUrl}" />`);
    }
    sitemapLines.push("  </url>");
  }
  sitemapLines.push("</urlset>");

  // 3. Next.js App Router Metadata
  const canonicalCandidate = activeUrl || rows[0]?.url || "https://example.com/";
  const nextjsLines = [
    "// Next.js App Router: app/[locale]/layout.tsx or page.tsx",
    "import type { Metadata } from 'next';",
    "",
    "export const metadata: Metadata = {",
    `  title: 'Localized International Page',`,
    "  alternates: {",
    `    canonical: '${canonicalCandidate}',`,
    "    languages: {",
  ];

  for (const row of rows) {
    const code = getHreflangCode(row);
    const cleanUrl = row.url.trim() || "https://example.com/";
    nextjsLines.push(`      '${code}': '${cleanUrl}',`);
  }

  nextjsLines.push("    },");
  nextjsLines.push("  },");
  nextjsLines.push("};");

  // 4. HTTP Link Header (RFC 5988 / 8288)
  const headerLinks: string[] = [];
  for (const row of rows) {
    const code = getHreflangCode(row);
    const cleanUrl = row.url.trim() || "https://example.com/";
    headerLinks.push(`<${cleanUrl}>; rel="alternate"; hreflang="${code}"`);
  }
  const httpHeaderSnippet = `Link: ${headerLinks.join(", ")}`;

  return {
    htmlHeadSnippet: htmlLines.join("\n"),
    xmlSitemapSnippet: sitemapLines.join("\n"),
    nextjsSnippet: nextjsLines.join("\n"),
    httpHeaderSnippet,
  };
}
