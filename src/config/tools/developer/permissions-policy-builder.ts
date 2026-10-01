import { ToolDefinition } from "@/types/tool";

export const permissionsPolicyBuilderTool: ToolDefinition = {
  id: "permissions-policy-builder",
  slug: "permissions-policy-builder",
  name: "HTTP Permissions-Policy Header Builder",
  title: "Permissions-Policy Header Generator (Feature-Policy) | OmniSEO Tools",
  metaTitle: "Permissions-Policy Header Generator (Feature-Policy) | OmniSEO Tools",
  metaDescription:
    "Generate production-ready HTTP Permissions-Policy headers to secure browser APIs (camera, microphone, geolocation, interest-cohort / FLoC, payments). Clean exports for Next.js, Cloudflare, Nginx, and Apache with zero telemetry.",
  h1: "HTTP Permissions-Policy Header Builder",
  tagline:
    "Generate, audit, and harden production-ready Permissions-Policy (Feature-Policy) headers to secure hardware sensors, disable tracking APIs, and protect user privacy with zero client telemetry.",
  shortDescription:
    "Generate and validate robust HTTP Permissions-Policy headers for Next.js, Cloudflare, Nginx, and Apache to secure camera, microphone, geolocation, and tracking APIs.",
  category: "developer",
  icon: "ShieldCheck",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "permissions-policy header generator",
    "feature-policy builder",
    "permissions-policy generator",
    "http permissions policy",
    "disable interest-cohort",
    "block floc permissions-policy",
    "next.js permissions-policy header",
    "cloudflare permissions-policy _headers",
    "nginx permissions-policy",
    "apache htaccess permissions-policy",
    "camera microphone permissions policy",
    "iframe allow attribute permissions policy",
    "browsing-topics disable header",
    "security headers linter",
    "web permissions policy syntax",
  ],
  howToSteps: [
    {
      name: "Select Security Hardening Preset or Start Custom",
      text: "Choose a battle-tested preset (Strict Lockdown for SaaS & Content, E-Commerce Standard for Stripe/Apple Pay, Media & Streaming, or PWA) or tune individual directives from scratch.",
    },
    {
      name: "Configure Privacy & Hardware API Directives",
      text: "Toggle individual browser features to Disable Everywhere (), Allow Same-Origin (self), Allow All (*), or define Custom HTTPS origins (e.g., payment gateways or analytics endpoints).",
    },
    {
      name: "Verify Real-Time Security Grade & Hardening Linter",
      text: "Review automated warnings against wildcard (*) permissions on sensitive hardware (camera, mic, geolocation, WebUSB) and ensure Google FLoC / Topics tracking is disabled.",
    },
    {
      name: "Select Target Server Deployment Tab",
      text: "Switch between Raw HTTP Header, Next.js App Router (next.config.mjs / headers()), Cloudflare Pages (_headers) or Workers, Nginx reverse proxy, Apache (.htaccess), or Vercel (vercel.json).",
    },
    {
      name: "Copy or Download Production Configurations",
      text: "Copy the formatted header string or download production configuration files with zero telemetry and 100% client-side privacy.",
    },
  ],
  guideContent: {
    title: "The Definitive Technical Guide to HTTP Permissions-Policy (and Feature-Policy Migration)",
    sections: [
      {
        heading: "What is Permissions-Policy and How Does It Replace Feature-Policy?",
        content:
          "<p><strong>Permissions-Policy</strong> (formerly standardized under the working title <em>Feature-Policy</em>) is a modern HTTP response header and declarative browser security mechanism standardized by the <strong>W3C Web Application Security Working Group</strong>. It provides web developers and security engineers with fine-grained control over which browser APIs, hardware peripherals, and browser features can be executed within a document and any embedded <code>&lt;iframe&gt;</code> elements.</p><p>In the legacy <code>Feature-Policy</code> specification, directives were separated by semicolons (e.g. <code>Feature-Policy: camera 'none'; microphone 'none'</code>). The modern <strong>Permissions-Policy Level 1 specification</strong> adopts the <strong>Structured Fields for HTTP (RFC 8941)</strong> standard, utilizing comma-separated identifier dictionaries with parenthesized allowlists (e.g. <code>Permissions-Policy: camera=(), microphone=(), geolocation=()</code>). All modern browser engines (Chromium, Gecko/Firefox, WebKit/Safari) have phased out Feature-Policy in favor of Permissions-Policy.</p>",
        keyTakeaways: [
          "Permissions-Policy supersedes the deprecated Feature-Policy header with RFC 8941 Structured Headers syntax.",
          "Comma-separated key-value pairs replace legacy semicolon syntax (e.g. camera=() instead of camera 'none').",
          "Governs both the top-level document context and cascades strict security boundaries into embedded iframes.",
        ],
      },
      {
        heading: "Core Directive Groups: Hardware Sensors, Privacy Tracking & Payments",
        content:
          "<p>Modern Permissions-Policy directives are divided into four primary functional categories:</p><ul><li><strong>Privacy &amp; Behavioral Tracking:</strong> Protects users from unauthorized telemetry and profiling. Directives include <code>interest-cohort=()</code> (disables Google FLoC tracking), <code>browsing-topics=()</code> (disables Chrome Topics ad targeting), <code>attribution-reporting=()</code> (blocks cross-site ad conversion measurement), and <code>run-ad-auction=()</code> (disables in-browser ad bidding).</li><li><strong>Device Hardware &amp; Sensors:</strong> Restricts physical device peripherals. Includes <code>camera=()</code> (webcam input), <code>microphone=()</code> (audio input), <code>geolocation=()</code> (GPS / network positioning), <code>display-capture=()</code> (screen recording), <code>accelerometer=()</code>, <code>gyroscope=()</code>, and <code>magnetometer=()</code>.</li><li><strong>Payments &amp; Identity:</strong> Controls sensitive transactional and credential APIs. Directives include <code>payment=(self \"https://js.stripe.com\")</code> (Payment Request API for Stripe, Apple Pay, Google Pay), <code>identity-credentials-get=()</code> (FedCM / WebID), <code>otp-credentials=()</code> (WebOTP SMS verification), <code>usb=()</code> (WebUSB), <code>serial=()</code> (Web Serial), and <code>bluetooth=()</code> (Web Bluetooth).</li><li><strong>Performance &amp; Rendering:</strong> Manages media playback and UI modes. Directives include <code>autoplay=(self)</code> (restricts intrusive auto-playing video/audio ads), <code>fullscreen=(self)</code> (Fullscreen API), <code>picture-in-picture=(self)</code>, <code>sync-xhr=()</code> (blocks synchronous XHR from freezing the main thread), and <code>document-domain=()</code> (blocks dangerous same-origin relaxation).</li></ul>",
        keyTakeaways: [
          "Setting interest-cohort=() and browsing-topics=() is an essential privacy standard for SaaS and content websites.",
          "Payment gateways require explicit origin delegation (e.g. payment=(self \"https://js.stripe.com\")).",
          "Blocking sync-xhr=() prevents third-party legacy scripts from degrading Google Core Web Vitals (Interaction to Next Paint - INP).",
        ],
      },
      {
        heading: "Iframe Delegation: How Top-Level Policies Control Embedded Content",
        content:
          "<p>One of the most critical security benefits of <code>Permissions-Policy</code> is its deterministic <strong>cascade hierarchy into embedded <code>&lt;iframe&gt;</code> elements</strong>:</p><ol><li><strong>Parent Header Restriction:</strong> If a top-level HTTP response header declares <code>Permissions-Policy: camera=(), microphone=()</code>, NO embedded iframe on that page can access the webcam or microphone, even if the iframe element specifies <code>&lt;iframe allow=\"camera; microphone\"&gt;</code>. The parent HTTP header serves as an unbreakable ceiling.</li><li><strong>Selective Delegation:</strong> If the parent header allows an API on same-origin (e.g. <code>Permissions-Policy: camera=(self)</code>), a cross-origin iframe (such as an embedded video provider or customer support widget) cannot use the camera UNLESS the host document explicitly delegates permission via the HTML <code>allow</code> attribute: <code>&lt;iframe src=\"https://trusted-partner.com\" allow=\"camera\"&gt;&lt;/iframe&gt;</code>.</li><li><strong>Preventing Rogue Widget Exploitation:</strong> Advertising networks, customer support chatbots, and analytics widgets frequently run inside embedded frames. A hardened Permissions-Policy ensures that a compromised third-party script cannot secretly capture user audio, request GPS coordinates, or interact with plugged-in USB security keys.</li></ol>",
        keyTakeaways: [
          "Top-level Permissions-Policy headers establish an inviolable security ceiling for all embedded iframes.",
          "Cross-origin iframes cannot access sensitive APIs unless permitted by BOTH the server header AND the iframe allow attribute.",
          "Hardening headers mitigates supply chain risks from third-party advertising, analytics, and chat widget vendors.",
        ],
      },
      {
        heading: "Server & Framework Deployment: Next.js, Cloudflare, Nginx, Apache & Vercel",
        content:
          "<p>Deploying Permissions-Policy headers varies by infrastructure architecture:</p><ul><li><strong>Next.js App Router (next.config.mjs):</strong> In Next.js, define an async <code>headers()</code> method returning the <code>Permissions-Policy</code> key mapped to <code>source: '/(.*)'</code>. This injects the header across all static and server-rendered routes with zero runtime overhead.</li><li><strong>Cloudflare Pages &amp; Workers:</strong> Place a <code>_headers</code> file in your public root directory containing <code>/*\\n  Permissions-Policy: ...</code> or use a Cloudflare Worker / Transform Rule to inject the header at the global CDN edge in &lt;1ms.</li><li><strong>Nginx Reverse Proxy:</strong> In your <code>server {}</code> or <code>location / {}</code> block, add: <code>add_header Permissions-Policy \"camera=(), microphone=(), geolocation=(), interest-cohort=()\" always;</code>. The <code>always</code> flag ensures headers are sent even on 4xx/5xx error responses.</li><li><strong>Apache (.htaccess):</strong> Wrap your directive in <code>&lt;IfModule mod_headers.c&gt;</code>: <code>Header always set Permissions-Policy \"camera=(), microphone=(), geolocation=()\"</code>.</li><li><strong>Vercel (vercel.json):</strong> Declare headers inside the <code>headers</code> array configuration for automated edge injection.</li></ul>",
        keyTakeaways: [
          "Configure headers centrally at the CDN or reverse proxy layer for maximum edge caching efficiency.",
          "In Next.js, use next.config.mjs headers() for static generation and edge deployments.",
          "Always append the 'always' directive in Nginx and Apache to protect error pages from header stripping.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between Permissions-Policy and Feature-Policy?",
      answer:
        "Feature-Policy is the deprecated predecessor to Permissions-Policy. Feature-Policy used semicolon-delimited syntax with quoted values (e.g. Feature-Policy: camera 'none'; microphone 'none'). Permissions-Policy is the active W3C standard based on RFC 8941 Structured Headers, utilizing comma-separated key-value pairs with parenthesized allowlists (e.g. Permissions-Policy: camera=(), microphone=(), geolocation=()). All modern browsers have adopted Permissions-Policy.",
    },
    {
      question: "Why should websites disable interest-cohort and browsing-topics?",
      answer:
        "Google's Privacy Sandbox introduced FLoC (Federated Learning of Cohorts) and the Topics API to categorize users into advertising interest groups based on browsing history. Setting interest-cohort=() and browsing-topics=() explicitly opts your domain out of these tracking frameworks, preventing ad networks and browser vendors from harvesting user interest telemetry without explicit consent.",
    },
    {
      question: "Does Permissions-Policy apply to embedded iframes?",
      answer:
        "Yes. Top-level site policies establish an absolute security ceiling that cascades to all embedded iframes. If the parent document disables an API (e.g. camera=()), no iframe on the page can execute that API under any circumstances. If the parent permits same-origin (self), cross-origin iframes can only access the feature if explicitly delegated through the HTML iframe allow=\"...\" attribute.",
    },
    {
      question: "How do I allow an API for specific third-party domains (like Stripe Checkout)?",
      answer:
        "To allow specific external HTTPS origins, wrap the domain in double quotes inside parentheses after the directive name. For example, to allow payment requests for your own domain and Stripe, declare: payment=(self \"https://js.stripe.com\"). Multiple origins are separated by spaces: payment=(self \"https://js.stripe.com\" \"https://apple.com\" \"https://pay.google.com\").",
    },
    {
      question: "Can Permissions-Policy be configured inside an HTML <meta> tag?",
      answer:
        "No. The W3C specification explicitly disallows setting Permissions-Policy via HTML <meta http-equiv=\"Permissions-Policy\"> tags. Browser engines require permissions policies to be established in HTTP response headers before the document HTML payload is parsed, ensuring iframe permissions and hardware boundaries are enforced prior to script execution.",
    },
    {
      question: "How does Next.js App Router handle Permissions-Policy?",
      answer:
        "In Next.js App Router, you configure Permissions-Policy inside your next.config.js or next.config.mjs file using the async headers() function. By matching source: '/(.*)' or '/:path*', Next.js injects the Permissions-Policy HTTP header into all server-rendered pages, API routes, and static assets automatically.",
    },
    {
      question: "Does this tool transmit or log my security configurations?",
      answer:
        "No. OmniSEO Tools runs 100% client-side directly in your browser JavaScript engine. Your custom origin domains, server architecture choices, and generated header configurations are never transmitted across the network, stored in databases, or logged to remote servers.",
    },
  ],
};
