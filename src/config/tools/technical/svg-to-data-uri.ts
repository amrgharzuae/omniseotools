import { ToolDefinition } from "@/types/tool";

export const svgToDataUriTool: ToolDefinition = {
  id: "svg-to-data-uri",
  slug: "svg-to-data-uri",
  name: "SVG to Base64 & Data URI Optimizer",
  title: "Free SVG to Base64 & CSS Data URI Optimizer | OmniSEO Tools",
  metaTitle: "Free SVG to Base64 & CSS Data URI Optimizer | OmniSEO Tools",
  metaDescription:
    "Convert and minify raw SVG code into URL-encoded CSS data URIs, Base64 strings, and React JSX components. Eliminate HTTP roundtrips client-side.",
  h1: "SVG to Base64 & CSS Data URI Optimizer",
  tagline:
    "Convert, sanitize, and minify raw SVG files into optimized CSS background-images, Base64 Data URIs, and Next.js JSX components with zero server roundtrips.",
  shortDescription:
    "Minify and encode SVG files into URL-encoded CSS background Data URIs, Base64 strings, and JSX components.",
  category: "technical",
  icon: "FileCode",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "svg to base64",
    "svg to data uri",
    "svg to css background",
    "svg data uri generator",
    "svg url encoder",
    "svg minifier",
    "svg to jsx",
    "css background svg generator",
    "inline svg optimizer",
    "lcp svg optimization",
  ],
  howToSteps: [
    {
      name: "Upload or Paste SVG Markup",
      text: "Drag and drop your .svg file into the dropzone or paste raw XML markup directly into the code editor.",
    },
    {
      name: "Configure Minification & Sanitization",
      text: "Toggle markup minification, dimension stripping (viewBox only), unsafe CSS character encoding, and optional color overrides.",
    },
    {
      name: "Inspect Real-Time Render Preview",
      text: "Verify transparency and vector fidelity across light and dark checkered backgrounds with dynamic zoom controls.",
    },
    {
      name: "Select Output Format",
      text: "Switch between CSS background-image url(), Base64 Data URI, HTML <img> tag, or idiomatic React/Next.js JSX component code.",
    },
    {
      name: "Copy or Download Asset",
      text: "Copy production-ready code directly to your clipboard or download the sanitized, minified .svg file for deployment.",
    },
  ],
  guideContent: {
    title: "The Ultimate Technical Guide to SVG Data URIs, CSS Inlining & Web Performance",
    sections: [
      {
        heading: "URL Encoding vs. Base64: Why Percent-Encoding Beats Base64 for SVGs",
        content:
          "<p>When inlining vector assets into CSS stylesheets or HTML attributes, developers frequently reach for <code>data:image/svg+xml;base64,...</code> out of habit. However, <strong>Base64 encoding introduces a mandatory ~33% payload size inflation</strong> because it converts 8-bit binary data into a 64-character ASCII representation (6 bits per character).</p><p>Unlike binary bitmap formats (PNG, JPEG, WebP), SVG is already a plaintext XML format. By utilizing modern <strong>UTF-8 URL percent-encoding</strong> (<code>data:image/svg+xml;utf8,...</code> or <code>data:image/svg+xml,...</code>), only a tiny subset of characters that break CSS parsing or URI syntax need escaping (specifically <code>#</code> to <code>%23</code>, <code><</code> to <code>%3C</code>, <code>></code> to <code>%3E</code>, and quotes). As a result, URL-encoded SVG Data URIs are typically <strong>25% to 35% smaller than their Base64 equivalents</strong>, while compressing significantly better over Gzip and Brotli network streams.</p>",
      },
      {
        heading: "Eliminating HTTP Requests & Optimizing Largest Contentful Paint (LCP)",
        content:
          "<p>Every external resource requested via <code><img src=\"icon.svg\"></code> or <code>background-image: url('/icons/hero.svg')</code> incurs a discrete network roundtrip (DNS resolution, TCP connection, TLS handshake, and HTTP GET request). For critical above-the-fold UI elements, button icons, and decorative hero background patterns, these network roundtrips introduce parser blocking and delay <strong>Largest Contentful Paint (LCP)</strong> and <strong>First Contentful Paint (FCP)</strong>.</p><p>Inlining small SVGs (<4KB) directly into CSS stylesheets or HTML critical paths eliminates network latency entirely. The browser parses and renders the vector graphic synchronously during initial stylesheet evaluation, rendering UI graphics in 0ms without layout shifts (CLS).</p>",
      },
      {
        heading: "The 4KB Inlining Threshold & Performance Sweet Spot",
        content:
          "<p>While inlining small icons provides substantial latency wins, excessive inlining of large complex illustrations (>10KB) produces diminishing returns by bloating CSS bundle sizes and preventing browser asset caching. Follow this rule of thumb:</p><ul><li><strong>< 2 KB (Small UI Icons, Arrows, Checkmarks):</strong> Ideal for CSS <code>background-image</code> inlining or inline JSX.</li><li><strong>2 KB – 6 KB (Complex Badges, Logos, Simple Patterns):</strong> Suitable for inlining on critical above-the-fold landing page templates.</li><li><strong>> 8 KB (Detailed Illustrations, High-Node Meshes):</strong> Keep as external <code>.svg</code> files served via CDN with <code>Cache-Control: public, max-age=31536000, immutable</code> and preloaded using <code><link rel=\"preload\" as=\"image\"></code>.</li></ul>",
      },
      {
        heading: "Content Security Policy (CSP) & CSS Quotation Rules",
        content:
          "<p>When integrating SVG Data URIs into production web applications, observe two essential engineering standards:</p><ul><li><strong>Content Security Policy (CSP):</strong> If your site enforces a strict CSP header, ensure that <code>img-src 'self' data:;</code> is enabled in your policy to permit browsers to render <code>data:image/svg+xml</code> images.</li><li><strong>CSS Quote Nesting:</strong> To avoid syntax parse errors in CSS rules, wrap the outer <code>url(\"...\")</code> in double quotes and use single quotes <code>'...'</code> inside SVG XML attributes, or use single quotes for <code>url('...')</code> with double quotes inside the SVG markup.</li></ul>",
      },
    ],
  },
  faqs: [
    {
      question: "Why does my SVG CSS background image appear broken without URL encoding?",
      answer:
        "The number sign (#) used in hex color codes (e.g., fill='#10b981') acts as an anchor/fragment identifier in URI syntax. Browsers truncate the Data URI at the first '#' character, resulting in an invalid image. Escaping '#' to '%23' ensures the full SVG markup parses correctly.",
    },
    {
      question: "Is URL-encoded SVG smaller than Base64?",
      answer:
        "Yes! Because SVG is already plaintext XML, URL-encoding only escapes necessary characters (<, >, #, quotes), resulting in a payload that is ~25% to 35% smaller than Base64. Furthermore, URL-encoded text compresses substantially better under Gzip/Brotli compression.",
    },
    {
      question: "What is the maximum recommended size for inline SVG Data URIs?",
      answer:
        "We recommend keeping inlined SVGs under 4KB to 6KB. Inlining larger graphics bloats the CSS or HTML document, delays initial DOM parsing, and prevents browser caching of repeated assets.",
    },
    {
      question: "Why should I strip hardcoded width and height attributes?",
      answer:
        "Stripping hardcoded width and height while preserving the viewBox attribute allows the SVG to scale responsively according to its CSS container, background-size, or JSX parent wrapper.",
    },
    {
      question: "Does this tool upload my SVG files to any server?",
      answer:
        "No. All parsing, minification, encoding, and React JSX conversions are executed 100% client-side in your local browser. Your graphics and proprietary designs never leave your device.",
    },
    {
      question: "How do I use the generated Next.js / React JSX component?",
      answer:
        "Copy the code from the 'React / Next.js JSX' tab into a .tsx component file (e.g., Icon.tsx). You can pass standard SVG props like className, width, height, and fill dynamically.",
    },
  ],
};
