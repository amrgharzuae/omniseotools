import { ToolDefinition } from "@/types/tool";

export const cspHeaderBuilderTool: ToolDefinition = {
  id: "csp-header-builder",
  slug: "csp-header-builder",
  name: "Content Security Policy (CSP) & Header Builder",
  title: "Free CSP & Security Header Builder (Next.js, Nginx, Vercel) | OmniSEO Tools",
  metaTitle: "Free CSP & Security Header Builder (Next.js, Nginx, Vercel) | OmniSEO Tools",
  metaDescription:
    "Visually generate and harden Content Security Policy (CSP) directives and modern security headers. Export configurations for Next.js, Nginx, Vercel, and Cloudflare.",
  h1: "Content Security Policy (CSP) & Security Header Builder",
  tagline:
    "Visually generate, test, and harden CSP directives and modern HTTP security headers. Export production configurations for Next.js, Vercel, Cloudflare, and Nginx with zero server transmission.",
  shortDescription:
    "Generate and validate robust Content Security Policies (CSP) and HTTP security headers for Next.js, Vercel, Cloudflare, and Nginx.",
  category: "technical",
  icon: "ShieldCheck",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "csp generator",
    "content security policy builder",
    "security headers generator",
    "csp header builder",
    "next.js security headers",
    "hsts header generator",
    "x-frame-options csp",
    "permissions-policy generator",
    "nginx csp header",
    "vercel security headers",
    "cloudflare csp headers",
    "content-security-policy-report-only",
    "strict-dynamic csp nextjs",
    "web security headers linter",
  ],
  howToSteps: [
    {
      name: "Select Configuration Preset or Custom Hardening",
      text: "Choose a quick starter preset (Strict Next.js / React, Google Analytics & Tag Manager, Stripe Checkout, or Permissive Dev / Staging) or start from scratch.",
    },
    {
      name: "Configure Core CSP Directives",
      text: "Define granular source origins for default-src, script-src, style-src, img-src, connect-src, font-src, object-src, frame-ancestors, base-uri, and form-action.",
    },
    {
      name: "Harden Modern HTTP Security Headers",
      text: "Tune Strict-Transport-Security (HSTS max-age, subdomains, preload), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.",
    },
    {
      name: "Inspect Real-Time Security Grade & Compliance Linter",
      text: "Review automated warnings for unsafe-inline vectors, missing default-src fallbacks, object-src weaknesses, and protocol syntax typos.",
    },
    {
      name: "Export Production-Ready Code Snippets",
      text: "Copy or download tailored configurations for Next.js (next.config.mjs / middleware.ts), Vercel (vercel.json), Cloudflare (_headers), Nginx, Apache (.htaccess), or HTML <meta> tags.",
    },
  ],
  guideContent: {
    title: "The Ultimate Architectural Guide to Content Security Policy (CSP) & Modern HTTP Security Headers",
    sections: [
      {
        heading: "What is Content Security Policy (CSP) and Why is it Critical for Modern Web Apps?",
        content:
          "<p><strong>Content Security Policy (CSP)</strong> is a standardized HTTP response header (and declarative security mechanism) that restricts the resources (such as JavaScript, CSS, Images, Fonts, Frames, and WebSockets) that the browser is allowed to load and execute for a given page. CSP represents the primary <strong>defense-in-depth</strong> mitigation layer against <strong>Cross-Site Scripting (XSS)</strong>, clickjacking, packet sniffing, malicious script injection, and unauthorized data exfiltration.</p><p>Without a strict CSP, if an attacker discovers an input sanitization flaw or a compromised third-party NPM dependency on your site, they can inject arbitrary scripts to siphon authentication tokens, session cookies, credit card credentials, or customer PII. A properly constructed CSP instructs modern browser engines to refuse executing unapproved inline scripts or fetching resources from untrusted external origins.</p>",
        keyTakeaways: [
          "CSP is the primary defense-in-depth mechanism against Cross-Site Scripting (XSS) and malicious code injection.",
          "Restricts which domains can execute scripts, load stylesheets, serve images, or initiate fetch/XHR connections.",
          "Browsers enforce CSP directives deterministically before downloading or executing remote assets.",
        ],
      },
      {
        heading: "Core CSP Directives Breakdown: From default-src to frame-ancestors",
        content:
          "<p>Modern CSP Level 3 comprises granular directives governing specific asset types:</p><ul><li><strong>default-src:</strong> The global fallback rule for all fetch directives if an explicit directive is not provided. Always establish a restrictive <code>default-src 'self'</code> base.</li><li><strong>script-src &amp; script-src-elem:</strong> Controls valid execution sources for JavaScript. Avoid <code>'unsafe-inline'</code> and <code>'unsafe-eval'</code> whenever possible in production; use cryptographic nonces or SHA-256 hashes instead.</li><li><strong>style-src &amp; style-src-elem:</strong> Restricts stylesheets and inline CSS blocks. While CSS-in-JS and Tailwind frequently require <code>'unsafe-inline'</code>, scoping external CDNs (e.g. Google Fonts) prevents stylesheet-based data exfiltration.</li><li><strong>img-src:</strong> Regulates image and icon sources. Common tokens include <code>'self' data: blob: https:</code> to support modern SVG placeholders, avatar services, and cloud storage buckets.</li><li><strong>connect-src:</strong> Restricts targets for <code>fetch()</code>, <code>XMLHttpRequest</code>, WebSocket connections (<code>ws:</code>, <code>wss:</code>), and EventSource streams. Critical for preventing stolen data exfiltration to attacker command-and-control servers.</li><li><strong>font-src:</strong> Governs web typography (e.g. Google Fonts <code>fonts.gstatic.com</code>, Typekit).</li><li><strong>object-src:</strong> Restricts legacy browser plugins (Flash, Java applets, ActiveX). <strong>Best practice:</strong> Always enforce <code>object-src 'none'</code> on modern web applications.</li><li><strong>frame-ancestors:</strong> The modern, superior replacement for <code>X-Frame-Options</code>. Dictates which domains can embed your webpage inside <code>&lt;iframe&gt;</code>, <code>&lt;frame&gt;</code>, or <code>&lt;object&gt;</code> tags, preventing UI redressing and clickjacking.</li><li><strong>base-uri:</strong> Restricts URLs that can appear in a document's <code>&lt;base&gt;</code> element, preventing base-tag injection attacks that rewrite relative URLs.</li><li><strong>form-action:</strong> Restricts valid target endpoints for HTML <code>&lt;form&gt;</code> submissions.</li></ul>",
        keyTakeaways: [
          "Always set object-src 'none' to close legacy plugin injection vectors completely.",
          "frame-ancestors replaces and supersedes legacy X-Frame-Options across modern browsers.",
          "Specify base-uri 'self' and form-action 'self' to block base tag hijacking and credential phishing forms.",
        ],
      },
      {
        heading: "Essential HTTP Security Headers: HSTS, Nosniff, Referrer & Permissions-Policy",
        content:
          "<p>A comprehensive web security posture pairs CSP with modern HTTP response headers:</p><ul><li><strong>Strict-Transport-Security (HSTS):</strong> Forces browsers to interact with your domain exclusively over encrypted HTTPS connections, mitigating man-in-the-middle (MITM) attacks and SSL stripping. Production best practice: <code>max-age=63072000; includeSubDomains; preload</code> (eligible for the global Chrome/Firefox HSTS preload list).</li><li><strong>X-Content-Type-Options (nosniff):</strong> Prevents browser MIME-type sniffing, forcing the browser to adhere strictly to the declared <code>Content-Type</code> header. Stops executable scripts disguised as innocent image or text files.</li><li><strong>X-Frame-Options:</strong> Legacy clickjacking prevention (<code>DENY</code> or <code>SAMEORIGIN</code>). Maintained alongside CSP <code>frame-ancestors</code> for backwards compatibility with legacy browsers.</li><li><strong>Referrer-Policy:</strong> Controls how much referrer metadata (origin vs full URL) is leaked to external sites when users click outbound links. Modern standard: <code>strict-origin-when-cross-origin</code>.</li><li><strong>Permissions-Policy (formerly Feature-Policy):</strong> Granularly disables sensitive browser hardware APIs (e.g. <code>camera=(), microphone=(), geolocation=(), interest-cohort=()</code>), protecting user privacy and blocking unwanted tracking scripts.</li></ul>",
        keyTakeaways: [
          "HSTS with max-age=63072000 (2 years) and includeSubDomains qualifies your domain for HSTS preload.",
          "X-Content-Type-Options: nosniff is a non-negotiable requirement for passing security audits.",
          "Permissions-Policy blocks unauthorized sensor and camera access even if third-party scripts are compromised.",
        ],
      },
      {
        heading: "Implementing CSP in Next.js App Router: next.config.mjs vs. Middleware Nonces",
        content:
          "<p>Next.js App Router applications support two primary CSP implementation strategies:</p><ol><li><strong>Static Headers in next.config.mjs:</strong> Ideal for static sites, SSG, and marketing pages. Headers are defined inside the <code>headers()</code> async function in <code>next.config.mjs</code>. For inline styles or scripts, SHA-256 hashes or <code>'unsafe-inline'</code> can be declared.</li><li><strong>Dynamic Nonce Middleware in middleware.ts:</strong> Recommended for dynamic, authenticated SSR applications. Next.js generates a unique cryptographically secure random nonce per request (<code>crypto.randomUUID()</code>), injects it into <code>script-src 'nonce-${nonce}' 'strict-dynamic'</code>, and forwards the nonce to root layout components via <code>requestHeaders.set('x-nonce', nonce)</code>.</li></ol>",
        keyTakeaways: [
          "Use next.config.mjs for high-performance static headers deployed to edge CDNs.",
          "Use middleware.ts with cryptographic nonces for strict inline script execution without unsafe-inline.",
          "Test in Report-Only mode (Content-Security-Policy-Report-Only) before hard enforcement to catch unexpected breakages.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between Content-Security-Policy and Content-Security-Policy-Report-Only?",
      answer:
        "Content-Security-Policy actively enforces rules and blocks any resource or inline script that violates the declared directives. Content-Security-Policy-Report-Only monitors violations without blocking execution, sending JSON diagnostic reports to your configured report-uri or report-to endpoint. Report-Only mode is recommended when testing new CSP rules on staging or high-traffic production apps.",
    },
    {
      question: "Why does Google Lighthouse and SecurityHeaders.com penalize 'unsafe-inline'?",
      answer:
        "'unsafe-inline' permits the execution of any inline <script> tag or inline style attribute found in the HTML. Because Cross-Site Scripting (XSS) attacks function by injecting malicious inline script elements into the DOM, allowing 'unsafe-inline' largely negates CSP's ability to stop XSS unless paired with 'strict-dynamic' and cryptographic nonces.",
    },
    {
      question: "Can I set frame-ancestors via an HTML <meta> tag?",
      answer:
        "No. The W3C CSP specification explicitly disallows frame-ancestors, report-uri, and sandbox inside HTML <meta http-equiv=\"Content-Security-Policy\"> tags. Browsers ignore these directives in meta tags because frame embedding must be evaluated before the document HTML payload is parsed. You must configure HTTP server response headers (via Next.js, Vercel, Cloudflare, Nginx, or Apache) to enforce frame-ancestors.",
    },
    {
      question: "How does HSTS Preload work and what are the requirements?",
      answer:
        "HSTS Preload is a list hardcoded into Google Chrome, Firefox, Safari, and Edge that forces connections to your domain to always use HTTPS from the very first visit. To be eligible for HSTS preload submission (hstspreload.org), you must serve an HSTS header with max-age of at least 31536000 seconds (1 year), include the includeSubDomains directive, and include the preload token.",
    },
    {
      question: "What is the difference between X-Frame-Options and CSP frame-ancestors?",
      answer:
        "X-Frame-Options is an older HTTP header supporting only DENY, SAMEORIGIN, or ALLOW-FROM. CSP frame-ancestors is the modern replacement supporting multiple allowed domains, wildcards (*.example.com), and granular protocol rules. If both headers are sent, modern browsers give precedence to frame-ancestors and ignore X-Frame-Options.",
    },
    {
      question: "Does this CSP builder upload or transmit my server configurations?",
      answer:
        "No. All parsing, validation, linter diagnostics, and code generation occur 100% client-side in your local browser JavaScript engine. Your private domains, internal API routes, and security configurations are never sent across the network.",
    },
  ],
};
