/**
 * Client-Side XML Sitemap Parser Engine
 * Parses standard XML Sitemaps (<urlset>) and Sitemap Indexes (<sitemapindex>)
 * with deep support for <image:loc>, <xhtml:link> (hreflangs), and metadata.
 */

export interface SitemapHreflang {
  lang: string;
  href: string;
}

export interface ParsedSitemapUrl {
  id: string;
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  images: string[];
  hreflangs: SitemapHreflang[];
  protocol: "https" | "http" | "unknown";
  pathDepth: number;
  isValidUrl: boolean;
  error?: string;
}

export interface ParsedSitemapIndexEntry {
  loc: string;
  lastmod?: string;
}

export interface SitemapParseResult {
  type: "urlset" | "sitemapindex" | "raw_urls" | "empty" | "error";
  urls: ParsedSitemapUrl[];
  sitemapIndexEntries?: ParsedSitemapIndexEntry[];
  totalCount: number;
  validCount: number;
  invalidCount: number;
  withLastmodCount: number;
  withChangefreqCount: number;
  withPriorityCount: number;
  withImagesCount: number;
  totalImagesCount: number;
  withHreflangsCount: number;
  totalHreflangsCount: number;
  httpsCount: number;
  httpCount: number;
  errorMessage?: string;
}

/**
 * Helper to get clean direct or namespaced tag text content.
 */
function getChildTagText(parent: Element, tagName: string): string | undefined {
  // 1. Direct getElementsByTagName
  const elements = parent.getElementsByTagName(tagName);
  if (elements && elements.length > 0 && elements[0].textContent) {
    return elements[0].textContent.trim();
  }

  // 2. Namespace wildcard match
  try {
    const nsElements = parent.getElementsByTagNameNS("*", tagName);
    if (nsElements && nsElements.length > 0 && nsElements[0].textContent) {
      return nsElements[0].textContent.trim();
    }
  } catch {
    // Ignore error
  }

  // 3. Child iteration fallback
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i];
    const nodeName = child.nodeName.toLowerCase();
    if (nodeName === tagName.toLowerCase() || nodeName.endsWith(`:${tagName.toLowerCase()}`)) {
      if (child.textContent) return child.textContent.trim();
    }
  }

  return undefined;
}

/**
 * Extracts all image URLs within a <url> block.
 */
function extractImagesFromUrlNode(urlNode: Element): string[] {
  const images: string[] = [];

  // Check all child nodes for image tags
  const allNodes = urlNode.getElementsByTagName("*");
  for (let i = 0; i < allNodes.length; i++) {
    const node = allNodes[i];
    const nodeName = node.nodeName.toLowerCase();

    if (
      nodeName === "image:loc" ||
      nodeName === "loc" && node.parentElement?.nodeName.toLowerCase().includes("image")
    ) {
      if (node.textContent) {
        const imgUrl = node.textContent.trim();
        if (imgUrl && !images.includes(imgUrl)) {
          images.push(imgUrl);
        }
      }
    }
  }

  return images;
}

/**
 * Extracts all hreflang alternate links within a <url> block.
 */
function extractHreflangsFromUrlNode(urlNode: Element): SitemapHreflang[] {
  const hreflangs: SitemapHreflang[] = [];

  const allNodes = urlNode.getElementsByTagName("*");
  for (let i = 0; i < allNodes.length; i++) {
    const node = allNodes[i];
    const nodeName = node.nodeName.toLowerCase();

    if (
      nodeName === "xhtml:link" ||
      nodeName === "link" ||
      nodeName.endsWith(":link")
    ) {
      const rel = (node.getAttribute("rel") || "").toLowerCase();
      if (rel === "alternate" || !rel) {
        const lang =
          node.getAttribute("hreflang") ||
          node.getAttribute("xml:lang") ||
          node.getAttribute("lang") ||
          "";
        const href = node.getAttribute("href") || "";

        if (lang && href) {
          hreflangs.push({ lang: lang.trim(), href: href.trim() });
        }
      }
    }
  }

  return hreflangs;
}

/**
 * Inspects a URL string for protocol, path depth, and basic validity.
 */
function inspectUrl(rawUrl: string): {
  isValid: boolean;
  protocol: "https" | "http" | "unknown";
  pathDepth: number;
  error?: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { isValid: false, protocol: "unknown", pathDepth: 0, error: "Empty URL" };
  }

  try {
    const urlObj = new URL(trimmed);
    const protocol =
      urlObj.protocol === "https:"
        ? "https"
        : urlObj.protocol === "http:"
        ? "http"
        : "unknown";

    const pathSegments = urlObj.pathname.split("/").filter((s) => s.length > 0);
    return {
      isValid: true,
      protocol,
      pathDepth: pathSegments.length,
    };
  } catch {
    // If not standard absolute URL
    const hasHttps = /^https:\/\//i.test(trimmed);
    const hasHttp = /^http:\/\//i.test(trimmed);
    return {
      isValid: hasHttps || hasHttp,
      protocol: hasHttps ? "https" : hasHttp ? "http" : "unknown",
      pathDepth: trimmed.split("/").length - 1,
      error: "Malformed URL format",
    };
  }
}

/**
 * Main parsing function for XML Sitemap content.
 */
export function parseSitemapXml(rawXml: string): SitemapParseResult {
  const trimmed = rawXml.trim();
  if (!trimmed) {
    return {
      type: "empty",
      urls: [],
      totalCount: 0,
      validCount: 0,
      invalidCount: 0,
      withLastmodCount: 0,
      withChangefreqCount: 0,
      withPriorityCount: 0,
      withImagesCount: 0,
      totalImagesCount: 0,
      withHreflangsCount: 0,
      totalHreflangsCount: 0,
      httpsCount: 0,
      httpCount: 0,
    };
  }

  // Fallback: If user pasted plain URLs instead of XML
  if (!trimmed.includes("<") && (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.includes("\n"))) {
    const rawLines = trimmed
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const urls: ParsedSitemapUrl[] = [];
    let validCount = 0;
    let invalidCount = 0;
    let httpsCount = 0;
    let httpCount = 0;

    rawLines.forEach((line, idx) => {
      const { isValid, protocol, pathDepth, error } = inspectUrl(line);
      if (isValid) validCount++;
      else invalidCount++;
      if (protocol === "https") httpsCount++;
      if (protocol === "http") httpCount++;

      urls.push({
        id: `row-${idx + 1}`,
        loc: line,
        images: [],
        hreflangs: [],
        protocol,
        pathDepth,
        isValidUrl: isValid,
        error,
      });
    });

    return {
      type: "raw_urls",
      urls,
      totalCount: urls.length,
      validCount,
      invalidCount,
      withLastmodCount: 0,
      withChangefreqCount: 0,
      withPriorityCount: 0,
      withImagesCount: 0,
      totalImagesCount: 0,
      withHreflangsCount: 0,
      totalHreflangsCount: 0,
      httpsCount,
      httpCount,
    };
  }

  // Parse using browser DOMParser
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(trimmed, "text/xml");

    const parserError = xmlDoc.getElementsByTagName("parsererror");
    if (parserError.length > 0) {
      // Check if it's completely unparseable or just has minor namespace issues
      const errorMsg = parserError[0].textContent || "XML Parsing Error";
      // Try regex-based fallback if parser fails on malformed wrapper
      const fallbackUrls = extractUrlsWithRegex(trimmed);
      if (fallbackUrls.length > 0) {
        return buildResultFromUrlList(fallbackUrls);
      }
      return {
        type: "error",
        urls: [],
        totalCount: 0,
        validCount: 0,
        invalidCount: 0,
        withLastmodCount: 0,
        withChangefreqCount: 0,
        withPriorityCount: 0,
        withImagesCount: 0,
        totalImagesCount: 0,
        withHreflangsCount: 0,
        totalHreflangsCount: 0,
        httpsCount: 0,
        httpCount: 0,
        errorMessage: `XML Syntax Error: ${errorMsg.slice(0, 180)}`,
      };
    }

    // Check for Sitemap Index (<sitemapindex>)
    const sitemapNodes = xmlDoc.getElementsByTagName("sitemap");
    const isSitemapIndex = xmlDoc.documentElement.nodeName.toLowerCase().includes("sitemapindex") || sitemapNodes.length > 0 && xmlDoc.getElementsByTagName("url").length === 0;

    if (isSitemapIndex && sitemapNodes.length > 0) {
      const indexEntries: ParsedSitemapIndexEntry[] = [];
      const urls: ParsedSitemapUrl[] = [];

      let validCount = 0;
      let invalidCount = 0;
      let withLastmodCount = 0;
      let httpsCount = 0;
      let httpCount = 0;

      for (let i = 0; i < sitemapNodes.length; i++) {
        const node = sitemapNodes[i];
        const loc = getChildTagText(node, "loc") || "";
        const lastmod = getChildTagText(node, "lastmod");

        if (loc) {
          const { isValid, protocol, pathDepth, error } = inspectUrl(loc);
          if (isValid) validCount++;
          else invalidCount++;
          if (lastmod) withLastmodCount++;
          if (protocol === "https") httpsCount++;
          if (protocol === "http") httpCount++;

          indexEntries.push({ loc, lastmod });
          urls.push({
            id: `sitemap-${i + 1}`,
            loc,
            lastmod,
            images: [],
            hreflangs: [],
            protocol,
            pathDepth,
            isValidUrl: isValid,
            error,
          });
        }
      }

      return {
        type: "sitemapindex",
        urls,
        sitemapIndexEntries: indexEntries,
        totalCount: urls.length,
        validCount,
        invalidCount,
        withLastmodCount,
        withChangefreqCount: 0,
        withPriorityCount: 0,
        withImagesCount: 0,
        totalImagesCount: 0,
        withHreflangsCount: 0,
        totalHreflangsCount: 0,
        httpsCount,
        httpCount,
      };
    }

    // Standard URL set (<urlset> -> <url>)
    let urlNodes = xmlDoc.getElementsByTagName("url");
    if (urlNodes.length === 0) {
      try {
        urlNodes = xmlDoc.getElementsByTagNameNS("*", "url");
      } catch {
        // Ignore
      }
    }

    // If no <url> tags found, look for standalone <loc> tags
    if (urlNodes.length === 0) {
      const locNodes = xmlDoc.getElementsByTagName("loc");
      if (locNodes.length > 0) {
        const urls: ParsedSitemapUrl[] = [];
        for (let i = 0; i < locNodes.length; i++) {
          const loc = (locNodes[i].textContent || "").trim();
          if (loc) {
            const { isValid, protocol, pathDepth, error } = inspectUrl(loc);
            urls.push({
              id: `row-${i + 1}`,
              loc,
              images: [],
              hreflangs: [],
              protocol,
              pathDepth,
              isValidUrl: isValid,
              error,
            });
          }
        }
        return buildResultFromParsedUrls(urls, "urlset");
      }
    }

    const urls: ParsedSitemapUrl[] = [];
    let validCount = 0;
    let invalidCount = 0;
    let withLastmodCount = 0;
    let withChangefreqCount = 0;
    let withPriorityCount = 0;
    let withImagesCount = 0;
    let totalImagesCount = 0;
    let withHreflangsCount = 0;
    let totalHreflangsCount = 0;
    let httpsCount = 0;
    let httpCount = 0;

    for (let i = 0; i < urlNodes.length; i++) {
      const node = urlNodes[i];
      const loc = getChildTagText(node, "loc") || "";
      if (!loc) continue;

      const lastmod = getChildTagText(node, "lastmod");
      const changefreq = getChildTagText(node, "changefreq");
      const priority = getChildTagText(node, "priority");
      const images = extractImagesFromUrlNode(node);
      const hreflangs = extractHreflangsFromUrlNode(node);

      const { isValid, protocol, pathDepth, error } = inspectUrl(loc);
      if (isValid) validCount++;
      else invalidCount++;
      if (lastmod) withLastmodCount++;
      if (changefreq) withChangefreqCount++;
      if (priority) withPriorityCount++;
      if (images.length > 0) {
        withImagesCount++;
        totalImagesCount += images.length;
      }
      if (hreflangs.length > 0) {
        withHreflangsCount++;
        totalHreflangsCount += hreflangs.length;
      }
      if (protocol === "https") httpsCount++;
      if (protocol === "http") httpCount++;

      urls.push({
        id: `row-${i + 1}`,
        loc,
        lastmod,
        changefreq,
        priority,
        images,
        hreflangs,
        protocol,
        pathDepth,
        isValidUrl: isValid,
        error,
      });
    }

    return {
      type: "urlset",
      urls,
      totalCount: urls.length,
      validCount,
      invalidCount,
      withLastmodCount,
      withChangefreqCount,
      withPriorityCount,
      withImagesCount,
      totalImagesCount,
      withHreflangsCount,
      totalHreflangsCount,
      httpsCount,
      httpCount,
    };
  } catch (err: any) {
    // Regex fallback
    const fallbackUrls = extractUrlsWithRegex(trimmed);
    if (fallbackUrls.length > 0) {
      return buildResultFromUrlList(fallbackUrls);
    }
    return {
      type: "error",
      urls: [],
      totalCount: 0,
      validCount: 0,
      invalidCount: 0,
      withLastmodCount: 0,
      withChangefreqCount: 0,
      withPriorityCount: 0,
      withImagesCount: 0,
      totalImagesCount: 0,
      withHreflangsCount: 0,
      totalHreflangsCount: 0,
      httpsCount: 0,
      httpCount: 0,
      errorMessage: err.message || "Failed to parse XML sitemap",
    };
  }
}

/**
 * Regex extraction fallback for malformed XML fragments.
 */
function extractUrlsWithRegex(raw: string): string[] {
  const locMatches = [...raw.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
  return [...new Set(locMatches)];
}

function buildResultFromUrlList(rawUrls: string[]): SitemapParseResult {
  const urls: ParsedSitemapUrl[] = [];
  let validCount = 0;
  let invalidCount = 0;
  let httpsCount = 0;
  let httpCount = 0;

  rawUrls.forEach((loc, idx) => {
    const { isValid, protocol, pathDepth, error } = inspectUrl(loc);
    if (isValid) validCount++;
    else invalidCount++;
    if (protocol === "https") httpsCount++;
    if (protocol === "http") httpCount++;

    urls.push({
      id: `row-${idx + 1}`,
      loc,
      images: [],
      hreflangs: [],
      protocol,
      pathDepth,
      isValidUrl: isValid,
      error,
    });
  });

  return {
    type: "urlset",
    urls,
    totalCount: urls.length,
    validCount,
    invalidCount,
    withLastmodCount: 0,
    withChangefreqCount: 0,
    withPriorityCount: 0,
    withImagesCount: 0,
    totalImagesCount: 0,
    withHreflangsCount: 0,
    totalHreflangsCount: 0,
    httpsCount,
    httpCount,
  };
}

function buildResultFromParsedUrls(
  urls: ParsedSitemapUrl[],
  type: "urlset" | "sitemapindex"
): SitemapParseResult {
  let validCount = 0;
  let invalidCount = 0;
  let withLastmodCount = 0;
  let withChangefreqCount = 0;
  let withPriorityCount = 0;
  let withImagesCount = 0;
  let totalImagesCount = 0;
  let withHreflangsCount = 0;
  let totalHreflangsCount = 0;
  let httpsCount = 0;
  let httpCount = 0;

  urls.forEach((u) => {
    if (u.isValidUrl) validCount++;
    else invalidCount++;
    if (u.lastmod) withLastmodCount++;
    if (u.changefreq) withChangefreqCount++;
    if (u.priority) withPriorityCount++;
    if (u.images.length > 0) {
      withImagesCount++;
      totalImagesCount += u.images.length;
    }
    if (u.hreflangs.length > 0) {
      withHreflangsCount++;
      totalHreflangsCount += u.hreflangs.length;
    }
    if (u.protocol === "https") httpsCount++;
    if (u.protocol === "http") httpCount++;
  });

  return {
    type,
    urls,
    totalCount: urls.length,
    validCount,
    invalidCount,
    withLastmodCount,
    withChangefreqCount,
    withPriorityCount,
    withImagesCount,
    totalImagesCount,
    withHreflangsCount,
    totalHreflangsCount,
    httpsCount,
    httpCount,
  };
}

export const SAMPLE_SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://omniseotools.com/</loc>
    <lastmod>2026-09-28T09:00:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://omniseotools.com/og.png</image:loc>
    </image:image>
    <xhtml:link rel="alternate" hreflang="en" href="https://omniseotools.com/" />
    <xhtml:link rel="alternate" hreflang="ar" href="https://omniseotools.com/ar" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://omniseotools.com/" />
  </url>
  <url>
    <loc>https://omniseotools.com/tools</loc>
    <lastmod>2026-09-27T14:30:00+00:00</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://omniseotools.com/bulk/sitemap-extractor</loc>
    <lastmod>2026-10-02T12:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://omniseotools.com/images/sitemap-extractor-preview.png</image:loc>
    </image:image>
  </url>
  <url>
    <loc>https://omniseotools.com/tools/google-serp-simulator</loc>
    <lastmod>2026-09-20T11:15:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://omniseotools.com/tools/google-serp-simulator" />
    <xhtml:link rel="alternate" hreflang="es" href="https://omniseotools.com/es/tools/google-serp-simulator" />
  </url>
  <url>
    <loc>https://omniseotools.com/tools/marketing/utm-campaign-builder</loc>
    <lastmod>2026-09-18T16:45:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://omniseotools.com/tools/xml-sitemap-generator</loc>
    <lastmod>2026-09-15T08:20:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://omniseotools.com/blog/xml-sitemap-optimization-guide-2026</loc>
    <lastmod>2026-09-25T10:00:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://omniseotools.com/blog-assets/sitemap-header.webp</image:loc>
    </image:image>
  </url>
  <url>
    <loc>https://omniseotools.com/recipes/how-to-fix-redirect-error-gsc</loc>
    <lastmod>2026-08-30T13:10:00+00:00</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>http://insecure.example.com/legacy-landing-page</loc>
    <lastmod>2024-01-15T00:00:00+00:00</lastmod>
    <changefreq>never</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
