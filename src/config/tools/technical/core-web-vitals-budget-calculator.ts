import { ToolDefinition } from "@/types/tool";

export const coreWebVitalsBudgetCalculatorTool: ToolDefinition = {
  id: "core-web-vitals-budget-calculator",
  slug: "core-web-vitals-budget-calculator",
  name: "Core Web Vitals Budget & Resource Hint Calculator",
  title: "Core Web Vitals Budget & Resource Hint Calculator | OmniSEO Tools",
  metaTitle: "Core Web Vitals Budget & Resource Hint Calculator | OmniSEO Tools",
  metaDescription:
    "Calculate byte-size performance budgets for HTML, CSS, JavaScript, and WebFonts to hit <2.5s LCP and <200ms INP over 4G/3G networks. Generate optimized preload, preconnect, and fetchpriority tags with zero telemetry.",
  h1: "Core Web Vitals Budget & Resource Hint Calculator",
  tagline:
    "Calculate byte-size performance budgets for HTML, CSS, JS, images, and fonts to achieve sub-2.5s LCP and sub-200ms INP on real-world 4G mobile devices. Export production preload, preconnect, and fetchpriority tags with zero telemetry.",
  shortDescription:
    "Calculate byte-size performance budgets and generate production preload, preconnect, and fetchpriority tags to hit Google Core Web Vitals targets.",
  category: "technical",
  icon: "Zap",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "core web vitals budget calculator",
    "lcp performance budget",
    "inp budget calculator",
    "javascript payload budget",
    "resource hint generator",
    "preload hero image",
    "fetchpriority high",
    "preconnect cdn fonts",
    "webfont performance budget",
    "crux 75th percentile mobile budget",
    "tbt calculator",
    "tcp slow start calculator",
  ],
  howToSteps: [
    {
      name: "Select Target Network Profile",
      text: "Choose between Fast 4G, Average 4G (CrUX 75th Percentile Global Standard), or Slow 4G/3G to define latency and throughput constraints.",
    },
    {
      name: "Input Compressed Byte Budgets",
      text: "Adjust sliders or numerical inputs for HTML payload, Critical CSS, JavaScript execution weight, Hero/LCP image size, and WOFF2 WebFonts.",
    },
    {
      name: "Load Platform Architectural Presets",
      text: "Instantly load realistic baselines for Next.js App Router, WordPress + WooCommerce, Shopify Liquid, or Ultra-Lean static sites.",
    },
    {
      name: "Analyze Real-Time LCP & INP Gauges",
      text: "Inspect computed TCP round-trips, network transfer durations, and main-thread JavaScript parse/compile cost diagnostics.",
    },
    {
      name: "Export Production Resource Hints",
      text: "Copy high-priority image preloads, font descriptors, CDN preconnects, HTTP 103 Early Hints, or Next.js layout metadata.",
    },
  ],
  guideContent: {
    title: "The Ultimate Engineering Guide to Core Web Vitals Performance Budgets, TCP Physics & Resource Hints",
    sections: [
      {
        heading: "How Network Latency, TCP Slow-Start, and Main-Thread JavaScript Define LCP & INP",
        content:
          "<p>Core Web Vitals metrics are determined by the fundamental physics of the mobile web: <strong>Round-Trip Time (RTT)</strong>, <strong>TCP Slow-Start window doubling</strong>, and <strong>Single-Threaded JavaScript Execution</strong>.</p><p>When a browser loads a web page, the initial TCP connection starts with an Initial Congestion Window (<code>initcwnd</code>) of approximately 14 KB (~10 TCP packets). The server transmits 14 KB, waits for the client acknowledgment (ACK), and doubles the window on each round trip (14 KB &rarr; 28 KB &rarr; 56 KB &rarr; 112 KB &rarr; 224 KB). On an average 4G mobile connection with 170ms RTT, transferring a 200 KB HTML and CSS payload requires at least 4 round trips (~680ms) before the browser can even begin parsing the DOM.</p><p>For <strong>Interaction to Next Paint (INP)</strong>, JavaScript bytes have a disproportionately severe penalty compared to images. While a 200 KB image is decoded on a background thread, 200 KB of gzipped JavaScript decompresses into ~650 KB of uncompressed script. On a mid-tier mobile CPU (Snapdragon 680), parsing, compiling, and executing that script locks the browser main thread for <strong>250ms to 400ms</strong>. Any user taps or keystrokes during this window are queued, directly causing failing INP scores (> 200ms).</p>",
        keyTakeaways: [
          "TCP slow-start means initial HTML + Critical CSS must remain under 14-28 KB to render in the earliest round trips.",
          "Every 100 KB of uncompressed JavaScript incurs ~120ms of main-thread execution on typical mobile devices.",
          "JavaScript weight is the single biggest predictor of failing Interaction to Next Paint (INP) scores.",
        ],
      },
      {
        heading: "Preload vs Preconnect vs Fetchpriority: Critical Distinction Matrix",
        content:
          "<p>Browser resource hints provide hints to the preload scanner, but improper usage frequently degrades performance through bandwidth contention:</p><ul><li><strong>fetchpriority=\"high\":</strong> Instructs the browser to prioritize an in-HTML element (like a hero <code>&lt;img&gt;</code>) above standard layout images without blocking critical stylesheets.</li><li><strong>&lt;link rel=\"preload\"&gt;:</strong> Forces early network discovery of late-discovered assets (such as CSS background images or WOFF2 web fonts declared inside <code>@font-face</code>). Always use <code>crossorigin=\"anonymous\"</code> for fonts to prevent Chrome duplicate downloads.</li><li><strong>&lt;link rel=\"preconnect\"&gt;:</strong> Establishes early DNS resolution, TCP handshake, and TLS negotiation with critical third-party origins (e.g., Google Fonts or media CDNs). Limit to max 2-3 origins to avoid socket exhaustion.</li></ul>",
        keyTakeaways: [
          "Use fetchpriority='high' on the above-the-fold hero image to accelerate LCP discovery by 300-800ms.",
          "Always pair font preloads with crossorigin='anonymous' and exact type='font/woff2' attributes.",
          "Never preload more than 2-3 resources simultaneously to avoid starving the main HTML/CSS parser.",
        ],
      },
      {
        heading: "Recommended Byte Budgets for 100% CrUX Mobile Pass Rate",
        content:
          "<p>To guarantee that 75% or more of real-world mobile visitors experience a <strong>Good</strong> Core Web Vitals assessment in Google Search Console, adhere to the following mobile budget ceilings:</p><ul><li><strong>HTML Document:</strong> &le; 30 KB gzipped (delivers in first 2 TCP round trips).</li><li><strong>Critical CSS:</strong> &le; 45 KB gzipped (inlined or preloaded to avoid render-blocking delays).</li><li><strong>Total Initial JavaScript:</strong> &le; 150 KB gzipped (&le; 480 KB uncompressed) to guarantee sub-200ms INP.</li><li><strong>Hero / LCP Image:</strong> &le; 120 KB WebP/AVIF (dimension-matched for mobile viewports).</li><li><strong>WebFonts:</strong> &le; 60 KB total (max 2 WOFF2 subsetted font files).</li><li><strong>Total Critical Path Payload:</strong> &le; 405 KB transfer size.</li></ul>",
        keyTakeaways: [
          "Keep initial critical path payload under 400 KB total for guaranteed sub-2.5s LCP on 4G.",
          "Cap initial JavaScript at 150 KB gzipped to maintain sub-150ms INP response times.",
          "Use responsive srcset images to avoid serving desktop 1200px images to 390px mobile screens.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "How do I prioritize LCP images in Next.js?",
      answer:
        "In Next.js App Router, add the `priority={true}` attribute to your hero `<Image />` component. Next.js automatically injects a `<link rel='preload' as='image' fetchpriority='high'>` tag into the HTML `<head>` and disables lazy loading, allowing the browser preload scanner to fetch the image concurrently with the CSS bundle.",
    },
    {
      question: "Why does Shopify often fail INP over 200ms?",
      answer:
        "Shopify stores frequently fail INP because third-party apps (reviews, live chat, popups, currency converters, tracking pixels) inject unbundled JavaScript directly into the theme. These scripts execute simultaneously on the main thread, creating long tasks (>50ms) that delay tap/click event handlers. To resolve this, audit installed apps, defer non-critical scripts, and use web workers.",
    },
    {
      question: "What is the maximum recommended total JavaScript payload for mobile?",
      answer:
        "For optimal mobile Core Web Vitals, initial JavaScript should not exceed 150 KB gzipped (~480 KB uncompressed). Exceeding 250 KB gzipped pushes mobile JavaScript execution time past 300ms, creating significant risk of failing Google's Interaction to Next Paint (INP) threshold.",
    },
    {
      question: "What is the difference between fetchpriority='high' and <link rel='preload'>?",
      answer:
        "`<link rel='preload'>` tells the browser that a resource exists and should be downloaded immediately before it is discovered in HTML/CSS. `fetchpriority='high'` adjusts the relative priority queue of an existing resource. For maximum LCP optimization, combine both: `<link rel='preload' as='image' href='...' fetchpriority='high'>`.",
    },
  ],
};
