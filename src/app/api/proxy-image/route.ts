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

  return false;
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl || !targetUrl.trim()) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(targetUrl.trim());
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return NextResponse.json(
      { error: "Invalid protocol. Only HTTP and HTTPS are permitted." },
      { status: 400 }
    );
  }

  if (isPrivateHost(parsed.hostname)) {
    return NextResponse.json(
      { error: "Access to private or local network addresses is restricted." },
      { status: 403 }
    );
  }

  try {
    const response = await fetch(parsed.toString(), {
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 OmniSEOImageProxy/1.0",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch remote image (Status ${response.status})` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("image/")) {
      return NextResponse.json(
        { error: `Target URL returned non-image content type: ${contentType}` },
        { status: 422 }
      );
    }

    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType || "image/png",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching remote image";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
