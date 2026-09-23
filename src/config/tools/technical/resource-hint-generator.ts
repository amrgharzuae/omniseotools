import { ToolDefinition } from "@/types/tool";

export const resourceHintGeneratorTool: ToolDefinition = {
  id: "resource-hint-generator",
  slug: "resource-hint-generator",
  name: "Resource Hint & Preconnect Generator",
  title: "Free Resource Hint & Preconnect Generator (Preload, DNS-Prefetch) | OmniSEO Tools",
  metaTitle: "Free Resource Hint & Preconnect Generator (Preload, DNS-Prefetch) | OmniSEO Tools",
  metaDescription:
    "Optimize Core Web Vitals (LCP, FCP) with browser resource hints. Generate and validate preload, preconnect, and dns-prefetch tags for Next.js, HTML, and HTTP headers.",
  h1: "Resource Hint & Preconnect Generator",
  tagline:
    "Generate and validate preload, preconnect, dns-prefetch, and prefetch hints to improve Core Web Vitals (LCP/FCP) for Next.js, HTML <head>, and HTTP headers.",
  shortDescription:
    "Generate and validate preload, preconnect, dns-prefetch, and prefetch tags for Next.js, HTML, and HTTP headers to optimize Core Web Vitals.",
  category: "technical",
  icon: "Zap",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "resource hint generator",
    "preconnect generator",
    "preload generator",
    "dns-prefetch generator",
    "core web vitals resource hints",
    "lcp image preload",
    "google fonts preconnect",
    "next.js preload link",
    "http link headers preconnect",
    "modulepreload generator",
  ],
  howToSteps: [
    {
      name: "Select Resource Hint Directive",
      text: "Choose the appropriate browser directive: preload (critical current-page assets), preconnect (early socket setup), dns-prefetch (early DNS resolution), or prefetch (future navigation).",
    },
    {
      name: "Enter Resource URL & Origin",
      text: "Input the absolute external origin (e.g., https://fonts.gstatic.com) or local asset path (e.g., /fonts/inter.woff2).",
    },
    {
      name: "Configure Attributes (as, type, crossorigin)",
      text: "Specify the 'as' destination type (font, style, script, image), MIME type (e.g., font/woff2), and set crossorigin='anonymous' for web fonts to avoid double downloads.",
    },
    {
      name: "Set Priority & Responsive Conditions",
      text: "Optionally assign fetchpriority='high' for critical hero images (LCP) and add responsive media query conditions.",
    },
    {
      name: "Export Code & HTTP Headers",
      text: "Copy the formatted HTML <link> tags, Next.js App Router metadata, or RFC 5988 HTTP Link headers directly into your server or edge CDN configuration.",
    },
  ],
  guideContent: {
    title: "The Ultimate Developer & SEO Guide to Browser Resource Hints & Core Web Vitals Optimization",
    sections: [
      {
        heading: "Understanding the 5 Resource Hint Directives: Preload vs. Preconnect vs. DNS-Prefetch vs. Prefetch",
        content:
          "<p>Browser resource hints provide declarative instructions to the browser's preload scanner and network stack, informing it about critical dependencies before the HTML parser discovers them. Choosing the correct directive is vital for maximizing Largest Contentful Paint (LCP) and First Contentful Paint (FCP):</p><ul><li><strong><code>rel=\"preload\"</code> (Mandatory for Current Page):</strong> Tells the browser to download a high-priority asset (such as critical self-hosted fonts, hero LCP images, or critical CSS bundles) immediately. Preload executes with high priority during initial render and requires the <code>as</code> attribute to ensure correct priority queuing and Content Security Policy (CSP) enforcement.</li><li><strong><code>rel=\"preconnect\"</code> (Early Socket Handshake):</strong> Performs the DNS lookup, TCP 3-way handshake, and TLS negotiation with an external origin (e.g., Google Fonts, CDN, or payment gateway) before the actual request is triggered. This saves <strong>100ms–300ms of round-trip latency (RTT)</strong> when fetching external assets.</li><li><strong><code>rel=\"dns-prefetch\"</code> (Legacy DNS Fallback):</strong> Resolves IP addresses for external domain names in the background. It consumes minimal bandwidth and serves as a backward-compatible fallback for browsers that do not support full <code>preconnect</code>.</li><li><strong><code>rel=\"prefetch\"</code> (Future Navigations):</strong> Downloads low-priority assets in browser idle time for pages the user is likely to visit next (e.g., next checkout step or article in a series).</li><li><strong><code>rel=\"modulepreload\"</code> (ES Modules):</strong> Pre-fetches and parses JavaScript ES module dependencies to flatten waterfall module dependency chains.</li></ul>",
        keyTakeaways: [
          "Use preload for critical current-page assets (LCP hero image, critical web fonts).",
          "Use preconnect for 1-2 essential third-party origins (Google Fonts, Cloudflare CDN).",
          "Always pair preconnect with dns-prefetch for older browser fallback support.",
        ],
      },
      {
        heading: "Fixing Largest Contentful Paint (LCP) & The Critical Font 'Double Download' Trap",
        content:
          "<p>Two of the most common Core Web Vitals pitfalls involve hero image discovery delays and incorrect font preload declarations:</p><ol><li><strong>LCP Hero Image Preload:</strong> Modern web designs frequently render hero images via responsive CSS background images or delayed JavaScript bundles. By adding <code>&lt;link rel=\"preload\" as=\"image\" href=\"/hero.webp\" fetchpriority=\"high\" /&gt;</code> directly in the HTML <code>&lt;head&gt;</code>, the browser network stack downloads the hero asset concurrently with the CSS stylesheet, improving LCP times by up to <strong>40%</strong>.</li><li><strong>The Font Double-Download Bug:</strong> According to the W3C Web Fonts specification, all font requests must be fetched using anonymous CORS mode even when hosted on the same domain origin. If you declare <code>&lt;link rel=\"preload\" as=\"font\" href=\"/inter.woff2\" type=\"font/woff2\"&gt;</code> without <code>crossorigin=\"anonymous\"</code>, modern browsers will discard the preloaded font and re-download the file a second time when CSS <code>@font-face</code> executes, doubling font bandwidth and degrading Cumulative Layout Shift (CLS).</li></ol>",
        keyTakeaways: [
          "Always add crossorigin='anonymous' when preloading fonts to prevent double downloading.",
          "Add fetchpriority='high' on LCP hero images to expedite render tree painting.",
          "Limit preloads to 2-4 critical resources to avoid bandwidth contention on mobile devices.",
        ],
      },
      {
        heading: "Multi-Platform Implementation: HTML <head>, Next.js App Router & Edge HTTP Link Headers",
        content:
          "<p>Resource hints can be delivered through multiple layers of modern web architecture:</p><ul><li><strong>HTML5 <code>&lt;head&gt;</code> Links:</strong> The standard implementation placed high in the document head before render-blocking stylesheets.</li><li><strong>Next.js 14/15 App Router:</strong> Implemented declaratively inside <code>app/layout.tsx</code> or <code>app/page.tsx</code> using the root <code>&lt;head&gt;</code> element or the Next.js App Router <code>metadata</code> configuration.</li><li><strong>HTTP 103 Early Hints &amp; Link Headers:</strong> Configured at the edge CDN layer (Cloudflare, Vercel, or Nginx) using <code>Link: &lt;https://fonts.gstatic.com&gt;; rel=preconnect; crossorigin</code> headers. This enables edge servers to trigger browser asset downloads before the main HTML response is even generated.</li></ul>",
        keyTakeaways: [
          "Deploy HTTP Link headers at edge CDNs to enable 103 Early Hints.",
          "Keep preload directives strictly synchronized with actual asset paths to avoid unreferenced asset warnings.",
          "All tag generation and Web Vitals audits run 100% client-side with zero data transmission.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between preload and prefetch?",
      answer:
        "Preload is a mandatory directive for critical assets needed on the CURRENT page right away (such as the LCP hero image, critical web font, or main CSS file). The browser downloads it with high priority during initial parsing. Prefetch is a suggestive directive for assets needed on SUBSEQUENT page navigations. The browser downloads prefetch assets with low priority during idle time when the current page has finished loading.",
    },
    {
      question: "Why do font preloads require the crossorigin attribute?",
      answer:
        "The W3C Web Fonts specification mandates that all web fonts must be fetched using CORS in anonymous mode, even if they are hosted on the exact same domain origin. If you omit crossorigin='anonymous' on a font preload, the browser fetches the font with standard credentials and then discards it when CSS @font-face requests it anonymously, causing the font to be downloaded twice.",
    },
    {
      question: "How many preconnect and preload tags should I use on a single page?",
      answer:
        "Best practices recommend limiting preconnect to 2–4 critical high-latency third-party domains (such as Google Fonts or your primary CDN), and limiting preload to 2–3 critical above-the-fold assets (such as your primary body font and LCP hero image). Overusing preload can saturate available network bandwidth and delay critical render-blocking CSS and JavaScript execution.",
    },
    {
      question: "Why should I pair preconnect with dns-prefetch?",
      answer:
        "While preconnect establishes a full DNS lookup, TCP handshake, and TLS negotiation, older browsers (like older Safari versions or legacy Android browsers) do not support preconnect. Adding a matching dns-prefetch tag provides a lightweight, universal fallback that still accelerates DNS resolution on older user agents.",
    },
    {
      question: "What is fetchpriority and how does it work with preload?",
      answer:
        "The fetchpriority attribute (available in modern Chromium and Safari browsers) allows developers to explicitly tell the browser whether a resource is more or less important relative to other assets of the same type. Setting fetchpriority='high' on a preload tag for your LCP hero image ensures the browser prioritizes it ahead of other images on the page.",
    },
    {
      question: "What are HTTP 103 Early Hints and how do they relate to resource hints?",
      answer:
        "HTTP 103 Early Hints allow an edge CDN or web server to return Link headers (such as preconnect and preload) immediately to the browser while the main backend application is still rendering the HTML payload. This enables the browser to start DNS lookups and asset downloads hundreds of milliseconds earlier.",
    },
  ],
};
