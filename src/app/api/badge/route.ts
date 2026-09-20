import { NextRequest } from "next/server";

export const runtime = "edge";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Parameter extraction with sensible defaults
    const labelRaw = searchParams.get("label")?.trim() || "OmniSEO";
    const statusRaw = searchParams.get("status")?.trim() || "Verified";
    const scoreParam = searchParams.get("score")?.trim() || "";
    const theme = (searchParams.get("theme")?.trim().toLowerCase() || "dark") as
      | "flat"
      | "emerald"
      | "dark";

    // 2. Score evaluation & value formatting
    let scoreNum: number | null = null;
    let rightText = statusRaw;
    let rightBgColor = "#10b981"; // Default emerald

    if (scoreParam !== "") {
      const parsed = parseInt(scoreParam, 10);
      if (!isNaN(parsed)) {
        scoreNum = Math.max(0, Math.min(100, parsed));
        // Format right text: e.g. "98/100" or "Passed 98/100"
        if (statusRaw && statusRaw.toLowerCase() !== "verified" && statusRaw.toLowerCase() !== "score") {
          rightText = `${statusRaw} ${scoreNum}/100`;
        } else {
          rightText = `${scoreNum}/100`;
        }

        // Color coding thresholds
        if (scoreNum >= 90) {
          rightBgColor = "#10b981"; // Emerald green
        } else if (scoreNum >= 70) {
          rightBgColor = "#f59e0b"; // Amber/yellow
        } else {
          rightBgColor = "#f43f5e"; // Rose/red
        }
      } else {
        // Non-numeric custom score string
        rightText = scoreParam;
        rightBgColor = "#10b981";
      }
    } else {
      // No numeric score provided, use status string
      rightText = statusRaw;
      if (statusRaw.toLowerCase() === "failed" || statusRaw.toLowerCase() === "error") {
        rightBgColor = "#f43f5e";
      } else if (statusRaw.toLowerCase() === "warning" || statusRaw.toLowerCase() === "pending") {
        rightBgColor = "#f59e0b";
      } else {
        rightBgColor = "#10b981";
      }
    }

    // 3. Theme styling for left pill
    let leftBgColor = "#0f172a"; // dark theme: slate-900
    if (theme === "flat") {
      leftBgColor = "#1e293b"; // slate-800
    } else if (theme === "emerald") {
      leftBgColor = "#064e3b"; // emerald-900
    }

    const labelEscaped = escapeXml(labelRaw);
    const rightTextEscaped = escapeXml(rightText);

    // 4. Geometry calculation (Shields.io standard: height = 20px)
    const height = 20;
    // Character width approximation for 11px system font
    const leftWidth = Math.max(Math.round(labelRaw.length * 6.8 + 14), 44);
    const rightWidth = Math.max(Math.round(rightText.length * 6.8 + 14), 44);
    const totalWidth = leftWidth + rightWidth;

    const leftCenter = leftWidth / 2;
    const rightCenter = leftWidth + rightWidth / 2;

    // 5. Crisp vector SVG generation
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" role="img" aria-label="${labelEscaped}: ${rightTextEscaped}">
  <title>${labelEscaped}: ${rightTextEscaped}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="${height}" rx="4" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftWidth}" height="${height}" fill="${leftBgColor}"/>
    <rect x="${leftWidth}" width="${rightWidth}" height="${height}" fill="${rightBgColor}"/>
    <rect width="${totalWidth}" height="${height}" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif" text-rendering="geometricPrecision" font-size="11" font-weight="600">
    <text aria-hidden="true" x="${leftCenter}" y="15" fill="#010101" fill-opacity=".3">${labelEscaped}</text>
    <text x="${leftCenter}" y="14">${labelEscaped}</text>
    <text aria-hidden="true" x="${rightCenter}" y="15" fill="#010101" fill-opacity=".3">${rightTextEscaped}</text>
    <text x="${rightCenter}" y="14">${rightTextEscaped}</text>
  </g>
</svg>`;

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch {
    // Graceful fallback SVG in case of any unhandled query parsing error
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="110" height="20" viewBox="0 0 110 20">
  <rect width="55" height="20" fill="#0f172a" rx="4"/>
  <rect x="55" width="55" height="20" fill="#10b981" rx="4"/>
  <g fill="#fff" text-anchor="middle" font-family="-apple-system,sans-serif" font-size="11" font-weight="600">
    <text x="27.5" y="14">OmniSEO</text>
    <text x="82.5" y="14">Verified</text>
  </g>
</svg>`;
    return new Response(fallbackSvg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
