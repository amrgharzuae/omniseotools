export type NetworkProfileId = "fast-4g" | "average-4g" | "slow-4g";

export interface NetworkProfile {
  id: NetworkProfileId;
  name: string;
  badge: string;
  rttMs: number; // Round-trip time in milliseconds
  bandwidthKbps: number; // Throughput in Kilobits per second
  bandwidthKBps: number; // Throughput in Kilobytes per second
  ttfbMs: number; // Typical baseline server Time To First Byte
  targetLcpMs: number;
  targetInpMs: number;
  description: string;
}

export const NETWORK_PROFILES: Record<NetworkProfileId, NetworkProfile> = {
  "fast-4g": {
    id: "fast-4g",
    name: "Fast 4G (Good Mobile)",
    badge: "9.0 Mbps • 150ms RTT",
    rttMs: 150,
    bandwidthKbps: 9000,
    bandwidthKBps: 1125,
    ttfbMs: 200,
    targetLcpMs: 2000,
    targetInpMs: 150,
    description: "High-quality mobile connection in metropolitan 4G/5G areas with low network latency.",
  },
  "average-4g": {
    id: "average-4g",
    name: "Average 4G (CrUX 75th Percentile)",
    badge: "4.0 Mbps • 170ms RTT",
    rttMs: 170,
    bandwidthKbps: 4000,
    bandwidthKBps: 500,
    ttfbMs: 350,
    targetLcpMs: 2500,
    targetInpMs: 200,
    description: "Google CrUX global 75th percentile mobile benchmark for Core Web Vitals assessment.",
  },
  "slow-4g": {
    id: "slow-4g",
    name: "Slow 4G / Fast 3G (Strict Budget)",
    badge: "1.6 Mbps • 300ms RTT",
    rttMs: 300,
    bandwidthKbps: 1600,
    bandwidthKBps: 200,
    ttfbMs: 600,
    targetLcpMs: 2500,
    targetInpMs: 200,
    description: "Throttled mobile connection typical of congested transit networks or emerging markets.",
  },
};

export interface AssetBudgets {
  htmlKb: number;
  cssKb: number;
  jsKb: number;
  imageKb: number;
  fontKb: number;
}

export interface PlatformPreset {
  id: string;
  name: string;
  cms: string;
  badge: string;
  budgets: AssetBudgets;
  architectureNote: string;
  heroImageName: string;
  fontName: string;
}

export const PLATFORM_PRESETS: PlatformPreset[] = [
  {
    id: "nextjs-optimized",
    name: "Next.js App Router",
    cms: "Next.js 14 / 15",
    badge: "Optimized Baseline",
    budgets: {
      htmlKb: 25,
      cssKb: 35,
      jsKb: 95,
      imageKb: 100,
      fontKb: 40,
    },
    architectureNote:
      "Uses `next/image` priority with WebP/AVIF compression, `next/font/google` self-hosting with zero CLS, and automatic route-based code splitting.",
    heroImageName: "/images/hero-banner.webp",
    fontName: "/fonts/inter.woff2",
  },
  {
    id: "shopify-liquid",
    name: "Shopify Liquid Theme",
    cms: "Shopify OS 2.0",
    badge: "E-Commerce Average",
    budgets: {
      htmlKb: 45,
      cssKb: 90,
      jsKb: 280,
      imageKb: 180,
      fontKb: 75,
    },
    architectureNote:
      "Includes Shopify Liquid core scripts, analytics, product media galleries, and 3-5 standard marketing app injections.",
    heroImageName: "https://cdn.shopify.com/s/files/1/0000/product-hero.jpg",
    fontName: "https://cdn.shopify.com/s/files/1/0000/custom-font.woff2",
  },
  {
    id: "wordpress-woocommerce",
    name: "WordPress + WooCommerce",
    cms: "WordPress 6.x",
    badge: "Plugin-Heavy Risk",
    budgets: {
      htmlKb: 60,
      cssKb: 120,
      jsKb: 380,
      imageKb: 250,
      fontKb: 110,
    },
    architectureNote:
      "High JavaScript payload from jQuery plugins, Cart Fragments, slider scripts, and multiple tracking pixels creating elevated INP risk.",
    heroImageName: "https://example.com/wp-content/uploads/hero-product.jpg",
    fontName: "https://example.com/wp-content/themes/theme/assets/fonts/font.woff2",
  },
  {
    id: "ultra-lean-static",
    name: "Ultra-Lean Static / Astro",
    cms: "Astro / Hugo / HTML",
    badge: "Sub-1.0s Speed",
    budgets: {
      htmlKb: 12,
      cssKb: 15,
      jsKb: 25,
      imageKb: 60,
      fontKb: 30,
    },
    architectureNote:
      "Zero-JS baseline with inlined critical CSS, preloaded system/WOFF2 font subset, and responsive AVIF hero image.",
    heroImageName: "/images/hero.avif",
    fontName: "/fonts/geist-sans.woff2",
  },
];

export interface CalculatedCwvMetrics {
  totalPayloadKb: number;
  totalUncompressedJsKb: number;
  tcpRoundTrips: number;
  htmlTransferMs: number;
  criticalCssTransferMs: number;
  jsDownloadMs: number;
  imageDownloadMs: number;
  fontDownloadMs: number;
  jsParseEvalMs: number;
  estimatedLcpMs: number;
  estimatedTbtMs: number;
  estimatedInpMs: number;
  lcpStatus: "good" | "needs-improvement" | "poor";
  inpStatus: "good" | "needs-improvement" | "poor";
  tbtStatus: "good" | "needs-improvement" | "poor";
  lcpBreakdown: {
    ttfb: number;
    resourceLoadDelay: number;
    resourceLoadDuration: number;
    elementRenderDelay: number;
  };
  recommendations: Array<{
    type: "warning" | "success" | "critical";
    title: string;
    description: string;
    action: string;
  }>;
}

/**
 * Computes TCP Slow-Start round trips based on initial congestion window (14KB).
 * Window doubles every round trip: 14KB -> 28KB -> 56KB -> 112KB -> 224KB ...
 */
export function calculateTcpRoundTrips(payloadKb: number): number {
  if (payloadKb <= 0) return 0;
  let remaining = payloadKb;
  let currentWindow = 14; // standard initcwnd (10 TCP segments * 1460 bytes)
  let roundTrips = 0;

  while (remaining > 0) {
    roundTrips++;
    remaining -= currentWindow;
    currentWindow *= 2;
  }

  return roundTrips;
}

export function calculateCwvMetrics(
  budgets: AssetBudgets,
  network: NetworkProfile
): CalculatedCwvMetrics {
  const { htmlKb, cssKb, jsKb, imageKb, fontKb } = budgets;
  const totalPayloadKb = htmlKb + cssKb + jsKb + imageKb + fontKb;

  // Uncompressed JavaScript estimate (Gzip/Brotli expands by ~3.2x on average)
  const totalUncompressedJsKb = Math.round(jsKb * 3.2);

  // Network Download Times (Payload / Bandwidth + TCP latency)
  const htmlRoundTrips = calculateTcpRoundTrips(htmlKb);
  const htmlTransferMs = Math.round(
    (htmlKb / network.bandwidthKBps) * 1000 + htmlRoundTrips * network.rttMs * 0.5
  );

  const cssRoundTrips = calculateTcpRoundTrips(cssKb);
  const criticalCssTransferMs = Math.round(
    (cssKb / network.bandwidthKBps) * 1000 + cssRoundTrips * network.rttMs * 0.3
  );

  const jsRoundTrips = calculateTcpRoundTrips(jsKb);
  const jsDownloadMs = Math.round(
    (jsKb / network.bandwidthKBps) * 1000 + jsRoundTrips * network.rttMs * 0.4
  );

  const imageRoundTrips = calculateTcpRoundTrips(imageKb);
  const imageDownloadMs = Math.round(
    (imageKb / network.bandwidthKBps) * 1000 + imageRoundTrips * network.rttMs * 0.3
  );

  const fontRoundTrips = calculateTcpRoundTrips(fontKb);
  const fontDownloadMs = Math.round(
    (fontKb / network.bandwidthKBps) * 1000 + fontRoundTrips * network.rttMs * 0.3
  );

  // Main-Thread JavaScript Parse, Compile & Evaluation Cost
  // Mid-tier mobile CPU (Snapdragon 680 / Moto G4 benchmark: ~120ms per 100KB uncompressed JS)
  const jsParseEvalMs = Math.round((totalUncompressedJsKb / 100) * 120);

  // Total Blocking Time (TBT) estimate
  const estimatedTbtMs = Math.max(0, Math.round((jsParseEvalMs - 50) * 1.4));

  // Interaction to Next Paint (INP) estimate
  // Baseline interaction response (~50ms) + main thread contention queue time (TBT impact * 0.4)
  const estimatedInpMs = Math.round(50 + estimatedTbtMs * 0.35 + (jsKb > 250 ? (jsKb - 250) * 0.5 : 0));

  // Largest Contentful Paint (LCP) 4-phase calculation:
  // 1. TTFB (Server response time)
  const ttfb = network.ttfbMs;
  // 2. Resource Load Delay (HTML download + CSS discovery)
  const resourceLoadDelay = htmlTransferMs + Math.round(criticalCssTransferMs * 0.3);
  // 3. Resource Load Duration (Image or Font download time)
  const resourceLoadDuration = Math.max(imageDownloadMs, Math.round(fontDownloadMs * 0.7));
  // 4. Element Render Delay (CSS parsing + JS blocking + render pipeline ~120ms)
  const elementRenderDelay = Math.round(criticalCssTransferMs * 0.5 + Math.min(jsParseEvalMs * 0.25, 250) + 80);

  const estimatedLcpMs = Math.round(ttfb + resourceLoadDelay + resourceLoadDuration + elementRenderDelay);

  // Status Evaluations
  const lcpStatus: "good" | "needs-improvement" | "poor" =
    estimatedLcpMs <= 2000 ? "good" : estimatedLcpMs <= 2500 ? "needs-improvement" : "poor";

  const inpStatus: "good" | "needs-improvement" | "poor" =
    estimatedInpMs <= 150 ? "good" : estimatedInpMs <= 200 ? "needs-improvement" : "poor";

  const tbtStatus: "good" | "needs-improvement" | "poor" =
    estimatedTbtMs <= 200 ? "good" : estimatedTbtMs <= 600 ? "needs-improvement" : "poor";

  // Dynamic Architectural Recommendations
  const recommendations: CalculatedCwvMetrics["recommendations"] = [];

  if (jsKb > 250) {
    recommendations.push({
      type: "critical",
      title: `Excessive JavaScript Payload (${jsKb} KB gzipped / ~${totalUncompressedJsKb} KB uncompressed)`,
      description: `JavaScript bundles exceeding 250 KB trigger ~${jsParseEvalMs}ms of main-thread execution on mobile CPUs, elevating INP to ${estimatedInpMs}ms.`,
      action: "Implement dynamic code splitting (import()), defer non-critical analytics/chat widgets, and strip unused npm libraries.",
    });
  } else if (jsKb > 150) {
    recommendations.push({
      type: "warning",
      title: `Moderate JavaScript Weight (${jsKb} KB gzipped)`,
      description: `Main-thread parse and evaluation takes ~${jsParseEvalMs}ms. On lower-end mobile devices, high interaction concurrency could trigger INP delays.`,
      action: "Use React Server Components or Partytown to offload tracking pixels to web workers.",
    });
  } else {
    recommendations.push({
      type: "success",
      title: `Optimal JavaScript Budget (${jsKb} KB gzipped)`,
      description: `Uncompressed JS (~${totalUncompressedJsKb} KB) parses in ~${jsParseEvalMs}ms, leaving the main thread clear for immediate sub-100ms user interaction responses.`,
      action: "Keep JS under 150 KB to ensure 100% Good INP compliance on mobile CrUX data.",
    });
  }

  if (imageKb > 150) {
    recommendations.push({
      type: "critical",
      title: `Hero / LCP Image Over Budget (${imageKb} KB)`,
      description: `LCP image download takes ${imageDownloadMs}ms on ${network.name}, pushing overall LCP to ${estimatedLcpMs}ms.`,
      action: "Compress hero image with WebP/AVIF at 80% quality, serve responsive srcset sizes (max 800px on mobile), and add fetchpriority='high'.",
    });
  } else {
    recommendations.push({
      type: "success",
      title: `Efficient LCP Image Size (${imageKb} KB)`,
      description: `Hero image loads in ${imageDownloadMs}ms, contributing to a healthy LCP time window.`,
      action: "Ensure <link rel='preload' as='image' fetchpriority='high'> is present in <head>.",
    });
  }

  if (cssKb > 75) {
    recommendations.push({
      type: "warning",
      title: `Heavy Render-Blocking CSS (${cssKb} KB)`,
      description: `CSS is render-blocking by default. ${cssKb} KB takes ~${criticalCssTransferMs}ms to transfer and parse before the browser can draw the First Contentful Paint.`,
      action: "Purge unused CSS rules, inline critical above-the-fold CSS (<15 KB), and defer supplementary styles.",
    });
  }

  if (fontKb > 80) {
    recommendations.push({
      type: "warning",
      title: `WebFont Payload Elevated (${fontKb} KB)`,
      description: `Multiple font weights or unsubsetted character ranges delay font rendering and can cause Cumulative Layout Shift (CLS) or FOIT (Flash of Invisible Text).`,
      action: "Subset fonts to Latin glyphs only (WOFF2), limit to 2 weights, and use font-display: swap.",
    });
  }

  return {
    totalPayloadKb,
    totalUncompressedJsKb,
    tcpRoundTrips: htmlRoundTrips + cssRoundTrips + jsRoundTrips + imageRoundTrips + fontRoundTrips,
    htmlTransferMs,
    criticalCssTransferMs,
    jsDownloadMs,
    imageDownloadMs,
    fontDownloadMs,
    jsParseEvalMs,
    estimatedLcpMs,
    estimatedTbtMs,
    estimatedInpMs,
    lcpStatus,
    inpStatus,
    tbtStatus,
    lcpBreakdown: {
      ttfb,
      resourceLoadDelay,
      resourceLoadDuration,
      elementRenderDelay,
    },
    recommendations,
  };
}

export function generateResourceHintTags(
  budgets: AssetBudgets,
  heroImageUrl: string,
  fontUrl: string
): {
  htmlSnippet: string;
  httpHeadersSnippet: string;
  nextjsSnippet: string;
} {
  const cleanImage = heroImageUrl.trim() || "/images/hero-lcp.webp";
  const cleanFont = fontUrl.trim() || "/fonts/inter.woff2";
  const isExternalImage = cleanImage.startsWith("http://") || cleanImage.startsWith("https://");
  const isExternalFont = cleanFont.startsWith("http://") || cleanFont.startsWith("https://");

  let externalOrigins: string[] = [];
  if (isExternalImage) {
    try {
      externalOrigins.push(new URL(cleanImage).origin);
    } catch {}
  }
  if (isExternalFont) {
    try {
      externalOrigins.push(new URL(cleanFont).origin);
    } catch {}
  }
  externalOrigins = Array.from(new Set(externalOrigins));

  // 1. HTML <head> Snippet
  const htmlLines: string[] = [
    `<!-- ========================================================================= -->`,
    `<!-- Critical Core Web Vitals Resource Hints (Generated via OmniSEO Tools)     -->`,
    `<!-- ========================================================================= -->`,
  ];

  if (externalOrigins.length > 0) {
    externalOrigins.forEach((origin) => {
      htmlLines.push(`<!-- Early Socket Handshake for Critical Third-Party CDN -->`);
      htmlLines.push(`<link rel="preconnect" href="${origin}" crossorigin />`);
      htmlLines.push(`<link rel="dns-prefetch" href="${origin}" />`);
    });
    htmlLines.push("");
  }

  htmlLines.push(`<!-- 1. High-Priority LCP Hero Image Preload (Boosts LCP by ~300-800ms) -->`);
  htmlLines.push(`<link`);
  htmlLines.push(`  rel="preload"`);
  htmlLines.push(`  as="image"`);
  htmlLines.push(`  href="${cleanImage}"`);
  htmlLines.push(`  fetchpriority="high"`);
  htmlLines.push(`/>`);
  htmlLines.push("");

  htmlLines.push(`<!-- 2. Critical WebFont Preload (Eliminates FOIT & Prevents Double Download) -->`);
  htmlLines.push(`<link`);
  htmlLines.push(`  rel="preload"`);
  htmlLines.push(`  as="font"`);
  htmlLines.push(`  type="font/woff2"`);
  htmlLines.push(`  href="${cleanFont}"`);
  htmlLines.push(`  crossorigin="anonymous"`);
  htmlLines.push(`/>`);

  const htmlSnippet = htmlLines.join("\n");

  // 2. HTTP Link Headers (103 Early Hints / Nginx / Vercel)
  const headerLines: string[] = [
    `# RFC 5988 HTTP Link Headers (Deploy in Nginx, Cloudflare, or Vercel Headers)`,
  ];
  if (externalOrigins.length > 0) {
    externalOrigins.forEach((origin) => {
      headerLines.push(`Link: <${origin}>; rel="preconnect"; crossorigin`);
    });
  }
  headerLines.push(`Link: <${cleanImage}>; rel="preload"; as="image"; fetchpriority="high"`);
  headerLines.push(`Link: <${cleanFont}>; rel="preload"; as="font"; type="font/woff2"; crossorigin`);

  const httpHeadersSnippet = headerLines.join("\n");

  // 3. Next.js App Router metadata layout snippet
  const nextjsLines: string[] = [
    `// app/layout.tsx (Next.js App Router Resource Hints & Font Optimization)`,
    `import type { Metadata } from 'next';`,
    `import { Inter } from 'next/font/google';`,
    `import Image from 'next/image';`,
    ``,
    `// 1. Next.js automatic font self-hosting with zero CLS`,
    `const inter = Inter({`,
    `  subsets: ['latin'],`,
    `  display: 'swap',`,
    `  preload: true,`,
    `});`,
    ``,
    `export const metadata: Metadata = {`,
    `  // Resource hint descriptors across external origins`,
    `  other: {`,
  ];
  if (externalOrigins.length > 0) {
    nextjsLines.push(`    preconnect: '${externalOrigins.join(", ")}',`);
  }
  nextjsLines.push(
    `  },`,
    `};`,
    ``,
    `export default function RootLayout({ children }: { children: React.ReactNode }) {`,
    `  return (`,
    `    <html lang="en" className={inter.className}>`,
    `      <head>`,
    `        {/* Direct LCP Preload tag for immediate browser discovery */}`,
    `        <link rel="preload" as="image" href="${cleanImage}" fetchPriority="high" />`,
    `      </head>`,
    `      <body>`,
    `        {/* Hero image with priority flag for instant LCP optimization */}`,
    `        <header>`,
    `          <Image`,
    `            src="${cleanImage}"`,
    `            alt="Hero Header"`,
    `            width={1200}`,
    `            height={600}`,
    `            priority={true} // Injects high-priority preload automatically`,
    `            className="w-full h-auto"`,
    `          />`,
    `        </header>`,
    `        <main>{children}</main>`,
    `      </body>`,
    `    </html>`,
    `  );`,
    `}`
  );

  const nextjsSnippet = nextjsLines.join("\n");

  return {
    htmlSnippet,
    httpHeadersSnippet,
    nextjsSnippet,
  };
}
