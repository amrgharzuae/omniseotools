import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Checks if a hostname or IP is a private/local address to protect against SSRF.
 */
function isPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim().replace(/^\[|\]$/g, ""); // handle IPv6 brackets

  // Localhost & common internal hostnames
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".lan") ||
    host.endsWith(".home")
  ) {
    return true;
  }

  // IPv4 Loopback & Special ranges
  if (
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host.startsWith("127.") ||
    host.startsWith("0.")
  ) {
    return true;
  }

  // IPv4 Private ranges
  // 10.0.0.0 - 10.255.255.255
  if (host.startsWith("10.")) return true;

  // 172.16.0.0 - 172.31.255.255
  const match172 = host.match(/^172\.(\d+)\./);
  if (match172) {
    const octet = parseInt(match172[1], 10);
    if (octet >= 16 && octet <= 31) return true;
  }

  // 192.168.0.0 - 192.168.255.255
  if (host.startsWith("192.168.")) return true;

  // 169.254.0.0 - 169.254.255.255 (Link-local / Cloud metadata AWS/GCP/Azure)
  if (host.startsWith("169.254.")) return true;

  // IPv6 loopback and private ranges
  if (
    host === "::1" ||
    host === "::" ||
    host.startsWith("fe80:") ||
    host.startsWith("fc00:") ||
    host.startsWith("fd00:")
  ) {
    return true;
  }

  // Numeric decimal / hex representation (e.g. 2130706433 or 0x7f000001)
  if (/^\d+$/.test(host) || /^0x[0-9a-f]+$/i.test(host)) {
    return true;
  }

  return false;
}

/**
 * Decodes standard HTML and numeric entities into plain unicode strings.
 */
function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, dec) => {
      try {
        return String.fromCharCode(parseInt(dec, 10));
      } catch {
        return "";
      }
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      try {
        return String.fromCharCode(parseInt(hex, 16));
      } catch {
        return "";
      }
    })
    .trim();
}

/**
 * Resolves relative URLs (e.g. "/og.png") against a base URL.
 */
function resolveUrl(urlStr: string | undefined, baseUrl: string): string {
  if (!urlStr || !urlStr.trim()) return "";
  try {
    return new URL(urlStr.trim(), baseUrl).href;
  } catch {
    return urlStr.trim();
  }
}

/**
 * Extracts meta and link tag attributes from raw HTML string.
 */
function extractHtmlMetadata(html: string, targetUrl: string) {
  // Title tag extraction
  let title = "";
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    title = decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, "").trim());
  }

  // Map of extracted meta properties and names
  const metaMap = new Map<string, string>();
  const linkMap = new Map<string, string>();

  // Regex to extract all <meta ...> tags
  const metaTagRegex = /<meta\s+([^>]+)>/gi;
  let metaTagMatch: RegExpExecArray | null;

  while ((metaTagMatch = metaTagRegex.exec(html)) !== null) {
    const tagContent = metaTagMatch[1];
    
    // Extract name or property
    const nameMatch = tagContent.match(/(?:name|property|http-equiv)\s*=\s*["']([^"']+)["']/i);
    // Extract content
    const contentMatch = tagContent.match(/content\s*=\s*["']([\s\S]*?)["']/i);

    if (nameMatch && contentMatch) {
      const key = nameMatch[1].toLowerCase().trim();
      const val = decodeHtmlEntities(contentMatch[1].trim());
      if (val && !metaMap.has(key)) {
        metaMap.set(key, val);
      }
    }
  }

  // Regex to extract all <link ...> tags
  const linkTagRegex = /<link\s+([^>]+)>/gi;
  let linkTagMatch: RegExpExecArray | null;

  while ((linkTagMatch = linkTagRegex.exec(html)) !== null) {
    const tagContent = linkTagMatch[1];
    const relMatch = tagContent.match(/rel\s*=\s*["']([^"']+)["']/i);
    const hrefMatch = tagContent.match(/href\s*=\s*["']([^"']+)["']/i);

    if (relMatch && hrefMatch) {
      const rel = relMatch[1].toLowerCase().trim();
      const href = decodeHtmlEntities(hrefMatch[1].trim());
      if (href && !linkMap.has(rel)) {
        linkMap.set(rel, href);
      }
    }
  }

  // Resolve prioritized fields
  const ogTitle = metaMap.get("og:title");
  const twitterTitle = metaMap.get("twitter:title");
  const resolvedTitle = ogTitle || twitterTitle || title || "";

  const metaDesc = metaMap.get("description");
  const ogDesc = metaMap.get("og:description");
  const twitterDesc = metaMap.get("twitter:description");
  const resolvedDescription = ogDesc || metaDesc || twitterDesc || "";

  const ogImage = metaMap.get("og:image") || metaMap.get("og:image:url") || metaMap.get("og:image:secure_url");
  const twitterImage = metaMap.get("twitter:image") || metaMap.get("twitter:image:src");
  const rawImage = ogImage || twitterImage || "";
  const resolvedImage = resolveUrl(rawImage, targetUrl);

  const siteName = metaMap.get("og:site_name") || "";

  const canonicalLink = linkMap.get("canonical");
  const ogUrl = metaMap.get("og:url");
  const resolvedUrl = resolveUrl(canonicalLink || ogUrl || targetUrl, targetUrl);

  const twitterSite = metaMap.get("twitter:site") || metaMap.get("twitter:creator") || "";
  const twitterHandle = twitterSite ? (twitterSite.startsWith("@") ? twitterSite : `@${twitterSite}`) : "";

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    image: resolvedImage,
    url: resolvedUrl,
    siteName,
    twitterHandle,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const urlParam = searchParams.get("url")?.trim();

    if (!urlParam) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid URL to inspect." },
        { status: 400 }
      );
    }

    // Format URL with http/https prefix if omitted
    let formattedUrl = urlParam;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(formattedUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "The provided URL is malformed or invalid." },
        { status: 400 }
      );
    }

    // Protocol validation
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return NextResponse.json(
        { success: false, error: "Only HTTP and HTTPS protocols are supported." },
        { status: 400 }
      );
    }

    // SSRF & Private host protection
    if (isPrivateHost(parsedUrl.hostname)) {
      return NextResponse.json(
        { success: false, error: "Fetching localhost and private network addresses is not allowed." },
        { status: 400 }
      );
    }

    // Fetch live website HTML with strict 5-second timeout
    let response: Response;
    try {
      response = await fetch(parsedUrl.href, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 (compatible; OmniSEOBot/1.0; +https://omniseotools.com)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(5000),
        redirect: "follow",
      });
    } catch (err: unknown) {
      const isTimeout = err instanceof Error && err.name === "TimeoutError";
      return NextResponse.json(
        {
          success: false,
          error: isTimeout
            ? "Request timed out after 5 seconds while reaching the target website."
            : "Could not reach target website. Check the URL and server accessibility.",
        },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Target server returned HTTP status ${response.status} (${response.statusText || "Error"}).`,
        },
        { status: 502 }
      );
    }

    // Read only up to 500KB of HTML to ensure memory safety
    const htmlText = await response.text();
    const truncatedHtml = htmlText.slice(0, 500000);

    const extractedData = extractHtmlMetadata(truncatedHtml, response.url || parsedUrl.href);

    return NextResponse.json({
      success: true,
      data: extractedData,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
