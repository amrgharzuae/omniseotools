/**
 * Pure Client-Side Canonical URL & Redirect Loop Audit Engine
 * Evaluates URL hygiene, trailing slash conflicts, casing anomalies, tracking bloat, and server redirect rules.
 */

export type IssueSeverity = "critical" | "warning" | "pass" | "info";

export interface CanonicalIssue {
  id: string;
  severity: IssueSeverity;
  category: "protocol" | "casing" | "trailing-slash" | "tracking-params" | "port-fragment" | "structure";
  title: string;
  description: string;
  recommendation: string;
}

export interface CanonicalAuditResult {
  isValidUrl: boolean;
  rawInput: string;
  parsedUrl?: {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
  };
  healthScore: number;
  status: "OPTIMAL" | "CANONICAL WARNINGS" | "CRITICAL DUPLICATION RISK";
  issues: CanonicalIssue[];
  cleanCanonicalUrl: string;
  cleanCanonicalTrailingSlashUrl: string;
  strippedParameters: { key: string; value: string; isTracking: boolean }[];
  retainedParameters: { key: string; value: string }[];
  codeSnippets: {
    htmlLinkTag: string;
    nextJsMetadata: string;
    nextJsConfigRedirect: string;
    nginxRedirect: string;
    apacheHtaccess: string;
  };
}

export const KNOWN_TRACKING_PARAMS = new Set([
  // Google / GA4 / UTM
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",
  "gclid",
  "wbraid",
  "gbraid",
  "dclid",
  "_ga",
  "_gl",
  // Meta / Facebook / Instagram
  "fbclid",
  "igshid",
  "fb_action_ids",
  "fb_action_types",
  "fb_source",
  // Microsoft / Bing
  "msclkid",
  // Twitter / X
  "twclid",
  // TikTok
  "ttclid",
  // LinkedIn
  "li_fat_id",
  // Mailchimp & HubSpot
  "mc_eid",
  "mc_cid",
  "_hsenc",
  "_hsmi",
  // Yandex & Baidu
  "yclid",
  "ym_debug",
  // General Tracking & Affiliates
  "ref",
  "source",
  "affiliate",
  "aff_id",
  "session_id",
  "phpsessid",
  "jsessionid",
  "sid",
  "tracking_id",
  "campaign_id",
]);

/**
 * Normalizes input string to a valid URL object
 */
export function parseRawUrl(input: string): URL | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    // If protocol missing, default to https:// for parsing
    if (!/^https?:\/\//i.test(trimmed)) {
      return new URL(`https://${trimmed}`);
    }
    return new URL(trimmed);
  } catch {
    return null;
  }
}

/**
 * Generates server redirect snippets based on audit findings
 */
export function generateRedirectSnippets(
  rawPath: string,
  cleanPath: string,
  hasTrailingSlash: boolean,
  hasUppercase: boolean
) {
  const cleanPathNoSlash = cleanPath.endsWith("/") && cleanPath !== "/" ? cleanPath.slice(0, -1) : cleanPath;
  const cleanPathWithSlash = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;

  // 1. Next.js App Router next.config.mjs
  const nextJsConfigRedirect = `// next.config.mjs (Next.js App Router Permanent 308 Redirect)
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: ${hasTrailingSlash ? "true" : "false"}, // Enforce consistent slash policy
  async redirects() {
    return [
      ${
        hasTrailingSlash
          ? `{
        source: '/:path((?!.*\\\\.json$|.*\\\\.xml$).*[^/])',
        destination: '/:path/',
        permanent: true, // 308 redirect
      },`
          : `{
        source: '/:path+/',
        destination: '/:path+',
        permanent: true, // 308 redirect
      },`
      }
    ];
  },
};

export default nextConfig;`;

  // 2. Nginx Server Block (301 Permanent Redirect)
  const nginxRedirect = `# /etc/nginx/sites-available/default (Nginx 301 Redirect)
# 1. Enforce HTTPS & Lowercase Canonical
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}

# 2. ${hasTrailingSlash ? "Enforce Trailing Slash" : "Strip Trailing Slash"}
server {
    listen 443 ssl http2;
    server_name example.com;

    ${
      hasTrailingSlash
        ? `rewrite ^([^.\\?]*[^/])$ $1/ permanent;`
        : `rewrite ^/(.*)/$ /$1 permanent;`
    }
}`;

  // 3. Apache .htaccess
  const apacheHtaccess = `# .htaccess (Apache 301 Rewrite Rules)
RewriteEngine On
RewriteBase /

# 1. Force Strict HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 2. ${hasTrailingSlash ? "Enforce Trailing Slash on Directories" : "Strip Trailing Slash from URLs"}
${
  hasTrailingSlash
    ? `RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !index\\.php$
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]`
    : `RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} (.+)/$
RewriteRule ^ %1 [R=301,L]`
}`;

  return {
    nextJsConfigRedirect,
    nginxRedirect,
    apacheHtaccess,
  };
}

/**
 * Main Canonical & Redirect Loop Audit Function
 */
export function auditCanonicalUrl(rawInput: string): CanonicalAuditResult {
  const trimmed = rawInput.trim();

  if (!trimmed) {
    return {
      isValidUrl: false,
      rawInput: "",
      healthScore: 0,
      status: "CRITICAL DUPLICATION RISK",
      issues: [
        {
          id: "empty-input",
          severity: "info",
          category: "structure",
          title: "Awaiting URL Input",
          description: "Enter a URL above or select a preset to perform a technical canonical audit.",
          recommendation: "Paste a target webpage URL to evaluate canonical tag consistency and redirect risks.",
        },
      ],
      cleanCanonicalUrl: "",
      cleanCanonicalTrailingSlashUrl: "",
      strippedParameters: [],
      retainedParameters: [],
      codeSnippets: {
        htmlLinkTag: "",
        nextJsMetadata: "",
        nextJsConfigRedirect: "",
        nginxRedirect: "",
        apacheHtaccess: "",
      },
    };
  }

  const parsed = parseRawUrl(trimmed);

  if (!parsed) {
    return {
      isValidUrl: false,
      rawInput: trimmed,
      healthScore: 0,
      status: "CRITICAL DUPLICATION RISK",
      issues: [
        {
          id: "malformed-url",
          severity: "critical",
          category: "structure",
          title: "Malformed URL Structure",
          description: "The provided string cannot be parsed as a valid RFC 3986 URI.",
          recommendation: "Ensure the URL starts with http:// or https:// and contains a valid domain name.",
        },
      ],
      cleanCanonicalUrl: "",
      cleanCanonicalTrailingSlashUrl: "",
      strippedParameters: [],
      retainedParameters: [],
      codeSnippets: {
        htmlLinkTag: "",
        nextJsMetadata: "",
        nextJsConfigRedirect: "",
        nginxRedirect: "",
        apacheHtaccess: "",
      },
    };
  }

  const issues: CanonicalIssue[] = [];
  let score = 100;

  const originalProtocol = parsed.protocol;
  const originalHostname = parsed.hostname;
  const originalPath = parsed.pathname;
  const originalSearch = parsed.search;
  const originalHash = parsed.hash;
  const originalPort = parsed.port;

  // 1. Protocol Audit
  if (originalProtocol === "http:") {
    score -= 25;
    issues.push({
      id: "insecure-http",
      severity: "critical",
      category: "protocol",
      title: "Insecure HTTP Protocol",
      description: "URL uses unencrypted 'http://'. Google requires HTTPS for secure canonical indexing.",
      recommendation: "Always declare canonical tags with the secure 'https://' scheme.",
    });
  } else {
    issues.push({
      id: "secure-https",
      severity: "pass",
      category: "protocol",
      title: "Secure HTTPS Protocol",
      description: "URL utilizes modern encrypted HTTPS scheme.",
      recommendation: "Maintain HTTPS across all internal canonical definitions.",
    });
  }

  // 2. Domain & Path Casing Audit
  const hasUppercaseHost = /[A-Z]/.test(originalHostname);
  const hasUppercasePath = /[A-Z]/.test(originalPath);

  if (hasUppercaseHost) {
    score -= 10;
    issues.push({
      id: "uppercase-host",
      severity: "warning",
      category: "casing",
      title: "Mixed-Case Hostname",
      description: `Hostname contains uppercase letters: "${originalHostname}". DNS is case-insensitive but lowercase is standard.`,
      recommendation: "Normalize hostname to lowercase in canonical tags.",
    });
  }

  if (hasUppercasePath) {
    score -= 20;
    issues.push({
      id: "uppercase-path",
      severity: "critical",
      category: "casing",
      title: "Mixed-Case URL Path (Linux Duplicate Risk)",
      description: `Path contains capital letters: "${originalPath}". On Linux/Nginx servers, "/Blog" and "/blog" are treated as distinct files.`,
      recommendation: "Enforce all-lowercase URL paths in routing middleware and canonical tags.",
    });
  } else {
    issues.push({
      id: "lowercase-path-pass",
      severity: "pass",
      category: "casing",
      title: "Normalized Lowercase Path",
      description: "Path characters are strictly lowercase, preventing case-sensitive file duplication.",
      recommendation: "Keep URL paths lowercase across all internal site links.",
    });
  }

  // 3. Development Port & Hash Fragment Audit
  if (originalPort) {
    score -= 25;
    issues.push({
      id: "dev-port-detected",
      severity: "critical",
      category: "port-fragment",
      title: `Development Port Detected (:${originalPort})`,
      description: `Port :${originalPort} is present in the URL. Canonical tags must never contain staging/local dev ports.`,
      recommendation: "Remove custom port numbers from production canonical definitions.",
    });
  }

  if (originalHash) {
    score -= 20;
    issues.push({
      id: "hash-fragment-detected",
      severity: "critical",
      category: "port-fragment",
      title: "Hash Fragment Present in Canonical Tag",
      description: `URL contains client-side fragment identifier: "${originalHash}". Search bots do not index URI fragments.`,
      recommendation: "Strip hash fragments (#section) completely from canonical declarations.",
    });
  }

  // 4. Query Parameter & Tracking Bloat Audit
  const strippedParameters: { key: string; value: string; isTracking: boolean }[] = [];
  const retainedParameters: { key: string; value: string }[] = [];

  const searchParams = new URLSearchParams(originalSearch);
  let trackingCount = 0;

  searchParams.forEach((val, key) => {
    const lowerKey = key.toLowerCase();
    if (KNOWN_TRACKING_PARAMS.has(lowerKey) || lowerKey.startsWith("utm_")) {
      trackingCount++;
      strippedParameters.push({ key, value: val, isTracking: true });
    } else {
      retainedParameters.push({ key, value: val });
    }
  });

  if (trackingCount > 0) {
    score -= Math.min(30, trackingCount * 10);
    issues.push({
      id: "tracking-params-bloat",
      severity: "critical",
      category: "tracking-params",
      title: `Marketing Tracking Parameters Bloat (${trackingCount} detected)`,
      description: `URL contains tracking parameters (${strippedParameters.map((p) => p.key).join(", ")}). Retaining these in canonical tags causes GSC indexation bloat.`,
      recommendation: "Strip non-essential query parameters from canonical tags to consolidate link equity.",
    });
  } else if (originalSearch) {
    issues.push({
      id: "functional-params-retained",
      severity: "info",
      category: "tracking-params",
      title: `Functional Parameters Present (${retainedParameters.length} query keys)`,
      description: `URL contains functional query parameters (${retainedParameters.map((p) => p.key).join(", ")}). Verify if these represent unique content states.`,
      recommendation: "Only keep query parameters that alter primary page content (e.g. pagination or filtering).",
    });
  } else {
    issues.push({
      id: "clean-query-pass",
      severity: "pass",
      category: "tracking-params",
      title: "Clean Query String (Zero Tracking Bloat)",
      description: "No advertising or analytics tracking parameters detected in the URL path.",
      recommendation: "Maintain clean, parameter-free canonical tags for standard editorial pages.",
    });
  }

  // 5. Trailing Slash Conflict Audit
  const isRoot = originalPath === "/" || originalPath === "";
  const hasTrailingSlash = !isRoot && originalPath.endsWith("/");

  if (!isRoot) {
    issues.push({
      id: "trailing-slash-evaluation",
      severity: "warning",
      category: "trailing-slash",
      title: hasTrailingSlash
        ? "Trailing Slash Present (/path/)"
        : "No Trailing Slash (/path)",
      description: hasTrailingSlash
        ? "URL has a trailing slash. If your server (e.g. Next.js App Router default) enforces no trailing slash, this creates a 308 redirect loop."
        : "URL has no trailing slash. If your server (e.g. WordPress or Nginx directory rules) enforces trailing slashes, this triggers a 301 redirect.",
      recommendation:
        "Select one uniform trailing slash policy across your site and ensure canonical tags, internal links, and sitemaps strictly match.",
    });
  }

  // Calculate Clean Canonical Paths
  const cleanHostname = originalHostname.toLowerCase();
  const cleanPathname = originalPath.toLowerCase();

  // Strip trailing slash for clean base
  const cleanPathnameNoSlash =
    cleanPathname.length > 1 && cleanPathname.endsWith("/")
      ? cleanPathname.slice(0, -1)
      : cleanPathname;

  const cleanPathnameWithSlash =
    cleanPathname.length > 1 && !cleanPathname.endsWith("/")
      ? `${cleanPathname}/`
      : cleanPathname;

  // Reconstruct query string with retained params if any
  const cleanQuery =
    retainedParameters.length > 0
      ? `?${retainedParameters.map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join("&")}`
      : "";

  const cleanCanonicalUrl = `https://${cleanHostname}${cleanPathnameNoSlash}${cleanQuery}`;
  const cleanCanonicalTrailingSlashUrl = `https://${cleanHostname}${cleanPathnameWithSlash}${cleanQuery}`;

  // Clamped health score
  const finalScore = Math.max(0, Math.min(100, score));

  let status: "OPTIMAL" | "CANONICAL WARNINGS" | "CRITICAL DUPLICATION RISK" = "OPTIMAL";
  if (finalScore < 60) {
    status = "CRITICAL DUPLICATION RISK";
  } else if (finalScore < 90) {
    status = "CANONICAL WARNINGS";
  }

  // Code exports
  const htmlLinkTag = `<link rel="canonical" href="${cleanCanonicalUrl}" />`;
  const nextJsMetadata = `// In Next.js App Router (page.tsx or layout.tsx)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '${cleanCanonicalUrl}',
  },
};`;

  const { nextJsConfigRedirect, nginxRedirect, apacheHtaccess } = generateRedirectSnippets(
    originalPath,
    cleanPathnameNoSlash,
    hasTrailingSlash,
    hasUppercasePath
  );

  return {
    isValidUrl: true,
    rawInput: trimmed,
    parsedUrl: {
      protocol: originalProtocol,
      hostname: originalHostname,
      port: originalPort,
      pathname: originalPath,
      search: originalSearch,
      hash: originalHash,
    },
    healthScore: finalScore,
    status,
    issues,
    cleanCanonicalUrl,
    cleanCanonicalTrailingSlashUrl,
    strippedParameters,
    retainedParameters,
    codeSnippets: {
      htmlLinkTag,
      nextJsMetadata,
      nextJsConfigRedirect,
      nginxRedirect,
      apacheHtaccess,
    },
  };
}
