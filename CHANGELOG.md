# Changelog

## [2026-09-24] - Sprint 37: Build Unicode & Punycode (IDN) Domain Converter & Inspector (Tool #37)
### Added & Enhanced
- **Unicode & Punycode (IDN) Conversion Engine (`src/lib/punycode.ts`, `src/components/tools/developer/IdnPunycodeConverter.tsx`):**
  - Engineered a zero-dependency, 100% client-side RFC 3492 / RFC 5891 Punycode and Internationalized Domain Name (IDN) bidirectional encoding & decoding engine.
  - **Full Script & Format Support:** Native support for Arabic RTL domain names (`دبي.امارات`), German/Nordic umlauts (`münchen.de`), Spanish accents (`diseño-web.es`), Cyrillic (`россия.рф`), CJK characters, emoji domains (`i❤️coding.ws`), full URLs with protocols/paths/queries, and email addresses (`user@domain`).
  - **Dual Conversion Modes:**
    - *Single Domain & URL Inspector:* Live bidirectional input with automatic format detection (Punycode `xn--` vs Native Unicode) and 1-click clipboard copy.
    - *Bulk Batch Converter:* Multiline processor supporting up to 50+ domains simultaneously with 1-click "Copy All ASCII", "Copy All Unicode", and Excel-compatible UTF-8 BOM CSV export.
  - **Security & Homograph Phishing Risk Analyzer:**
    - Scans every character code point to detect multi-script spoofing attacks (e.g. replacing Latin 'a' with Cyrillic 'а' U+0430 to mimic `pаypal.com`).
    - Displays high-visibility risk level badges (*Safe*, *Medium Risk*, *High Risk Spoof Attack*) and an interactive character-by-character Unicode code point matrix.
  - **DNS RFC Octet & Length Validator:**
    - Verifies RFC 1035 physical DNS byte constraints: per-label limit (63 octets max) and total FQDN limit (253 octets max) with visual progress gauges and hyphen position checks.
- **Dedicated Route & Registry Integration:**
  - Registered `idnPunycodeConverterTool` (`#37`) in `src/config/tools-registry.ts` under "Web & Developer" category (`category: "developer"`).
  - Created dedicated App Router page at `src/app/(site)/tools/idn-punycode-converter/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Updated `TOOLS_DIRECTORY.md`, `PROJECT_STATUS.md`, and dynamic sitemap.


## [2026-09-24] - Sprint 36: Build Google Search Console RE2 Regex Filter Builder & Tester (Tool #36)
### Added & Enhanced
- **Google Search Console Regex Filter Builder Engine (`src/components/tools/seo/GscRegexFilterBuilder.tsx`):**
  - Engineered an interactive, 100% client-side RE2-compliant regular expression builder, validator, and real-time query/URL testing sandbox specifically tuned for Google Search Console's Performance reports.
  - **6 Strategy & Filter Modes:**
    - *Question & FAQ Mining:* Generates `^(who|what|where|when|why|how|does|can|is|are|did|should|could)\b` patterns with toggles for start-of-query anchor (`^`), word boundary (`\b`), and custom interrogative stems to isolate Featured Snippets and People Also Ask (PAA) opportunities.
    - *Brand vs. Non-Brand Traffic Segmentation:* Converts comma/newline brand stems and typos into `(?i)\b(brand|brand\s+typo)\b` with flexible whitespace normalizers and explicit instructions for setting GSC match type to 'Doesn't match regex' for non-branded clicks.
    - *Intent & Commercial Modifiers:* Pre-checked, categorized intent blocks for Transactional (buy, price, cost, deal, coupon, discount), Commercial Investigation (best, vs, alternative, review, top), Informational (guide, tutorial, how to, tips), and Local Proximity (near me, nearby, in city).
    - *Word Count / Long-Tail Extractor:* Visually tunes minimum, maximum, exact, or ranged word counts into standard RE2 space-separation formulas (`^(\S+\s+){4,}\S+$` or `([^" "]*\s){4,}?`) to segment short head terms vs ultra-long-tail queries.
    - *Page / Subfolder & File Filter:* Builds URL directory paths (`/blog/`, `/products/`), directory depth rules (recursive vs direct children), query parameter inclusion/exclusion (`\?.*` vs `^[^?]+$`), file extension filtering (`\.(html|pdf)$`), and trailing slash audit filters (`[^/]$`).
    - *Custom RE2 Expression & Linter:* Direct regex editor with comprehensive RE2 engine audits.
  - **Real-Time RE2 Syntax Validator & Linter:**
    - Scans regex patterns character-by-character to detect forbidden lookaheads `(?=...)`, `(?!...)`, lookbehinds `(?<=...)`, `(?<!...)`, backreferences `\1`, and possessive quantifiers `*+`, preventing generic 'Invalid regular expression' errors in Google Search Console.
  - **Live Real-Time Testing Sandbox:**
    - Interactive textarea for pasting sample queries or URLs from GSC exports with 1-click sample loaders ("Load Sample Queries", "Load Sample URLs").
    - Real-time row-by-row matching with visual emerald highlight bars, match count badges (e.g. "7 of 10 matched (70%)"), and filter views (All, Retained, Filtered Out).
  - **GSC Export & Guidance:**
    - Formatted regex output box with 1-click clipboard copy, filter dimension indicators (`Query` vs `Page`), match type settings (`Matches regex` vs `Doesn't match regex`), and an interactive 3-step Search Console application walkthrough.
- **Dedicated Route & Registry Integration:**
  - Registered `gscRegexFilterBuilderTool` (`#36`) in `src/config/tools-registry.ts` under "SEO Tools" category (`category: "seo"`).
  - Created dedicated App Router page at `src/app/(site)/tools/gsc-regex-filter-builder/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Updated `TOOLS_DIRECTORY.md`, `PROJECT_STATUS.md`, and dynamic sitemap.


## [2026-09-23] - Sprint 36: Build Programmatic Developer Recipes Engine & Seed 3 Technical Guides
### Added & Enhanced
- **Programmatic Developer Recipes Engine (`src/config/recipes-data.ts`, `src/app/(site)/recipes/page.tsx`, `src/app/(site)/recipes/[slug]/page.tsx`):**
  - Architected a scalable long-tail programmatic SEO recipe system that bridges high-volume developer error queries directly to interactive OmniSEO client tools.
  - Built interactive `<RecipeSolutionViewer />` client component with 1-click clipboard copy, config download (.mjs, .html, .txt), and contextual tool launch bridges.
  - Created responsive directory hub at `/recipes` with real-time category filtering (Next.js & React, Core Web Vitals, AI & Crawlers, Server & Nginx) and keyword search.
  - Implemented dual Schema.org `TechArticle` and `FAQPage` JSON-LD graphs across all static detail routes (`generateStaticParams`).
- **3 High-Intent Seeded Technical Recipes:**
  - *Next.js Trailing Slash Redirect (`/recipes/nextjs-trailing-slash-redirect`):* Fixes 308 redirect loops in Next.js App Router with clean `next.config.mjs` rules and middleware patterns; linked to Tool #29 (Redirect Rule & Regex Mapper).
  - *Fix Web Font Preload Double Download (`/recipes/fix-font-preload-double-download`):* Solves duplicate Chrome font requests by enforcing mandatory `crossorigin="anonymous"` and `@font-face` alignment; linked to Tool #32 (Resource Hint Generator).
  - *Configure GPTBot & CCBot in robots.txt (`/recipes/configure-gptbot-ccbot-robots-txt`):* Establishes a selective AI policy allowing citation search bots (`OAI-SearchBot`, `PerplexityBot`) while disallowing foundation model training scrapers (`GPTBot`, `CCBot`, `ByteSpider`, `Google-Extended`); linked to Tool #34 (LLMs.txt Generator).
- **Navigation & Sitemap Integration:**
  - Added "Recipes" link to desktop Header, mobile navigation drawer, and Footer policies.
  - Dynamically registered `/recipes` hub and all programmatic `/recipes/[slug]` routes in `src/app/sitemap.ts`.

## [2026-09-23] - Sprint 35: Build Content Security Policy (CSP) & Security Header Builder (Tool #35)
### Added & Enhanced
- **Content Security Policy (CSP) & Security Header Builder Engine (`src/components/tools/technical/CspHeaderBuilder.tsx`):**
  - Built an interactive, zero-latency 100% client-side visual builder and compliance linter for Content Security Policy Level 3 and modern HTTP security headers.
  - **4 Strategy Presets:**
    - *Strict Next.js / React:* Enforces restrictive `default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, 2-year HSTS with subdomains and preload, nosniff, and granular Permissions-Policy.
    - *Google Analytics & Tag Manager:* Injects required origin endpoints for `googletagmanager.com` and `google-analytics.com` across script-src, img-src, and connect-src.
    - *Stripe Checkout & Payments:* Injects `js.stripe.com`, `api.stripe.com`, and `checkout.stripe.com` across script-src, frame-src, connect-src, and Permissions-Policy.
    - *Permissive Dev / HMR Staging:* Configures relaxed localhost, WebSockets (`ws:`, `wss:`), `unsafe-eval` for Fast Refresh, and Report-Only monitoring.
  - **Dual Tab Interactive Control Center:**
    - **Tab A: CSP Directives:** Fine-grained token switches (`'self'`, `'unsafe-inline'`, `'unsafe-eval'`, `'none'`, `https:`, `data:`, `blob:`, `'strict-dynamic'`), 1-click popular service chips (Google Fonts, Unsplash, AWS S3, Cloudflare, Sentry, YouTube), custom domain input with wildcard support, and global enforcement flags (`upgrade-insecure-requests`, `block-all-mixed-content`, `report-only`, `report-uri`).
    - **Tab B: Additional Security Headers:** Strict-Transport-Security (HSTS duration selector, includeSubDomains, preload checklist), X-Content-Type-Options (`nosniff`), X-Frame-Options (`DENY`, `SAMEORIGIN`), Referrer-Policy, Permissions-Policy (camera, microphone, geolocation, interest-cohort, payment, usb, fullscreen), Cross-Origin Isolation (COOP, COEP, CORP), and X-XSS-Protection `0`.
  - **Real-Time Security Grade & Compliance Linter:**
    - Live letter grading (A+ to F) and numerical security score (0 to 100) with diagnostic checklist catching `'unsafe-inline'` XSS vectors, missing `default-src` fallbacks, `object-src` gaps, domain syntax typos, and HSTS preload eligibility.
  - **8 Multi-Target Code Exporters:**
    - Raw HTTP Headers, Next.js App Router `next.config.mjs`, Next.js App Router dynamic nonce `middleware.ts`, Vercel `vercel.json`, Nginx `add_header`, Cloudflare `_headers`, Apache `.htaccess`, and HTML `<meta>` tag with client-side capability warnings.
- **Dedicated Route & Registry Integration:**
  - Registered `cspHeaderBuilderTool` (`#35`) in `src/config/tools-registry.ts` under Technical / Developer category.
  - Created dedicated client tool page at `src/app/(site)/tools/csp-header-builder/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Updated `TOOLS_DIRECTORY.md`, `RelatedTools.tsx`, `PROJECT_STATUS.md`, and dynamic sitemap.

## [2026-09-23] - Sprint 34: Build LLMs.txt & AI Crawler Directive Generator (Tool #34)
### Added & Enhanced
- **LLMs.txt & AI Crawler Directive Generator Engine (`src/components/tools/technical/LlmsTxtGenerator.tsx`):**
  - Built an interactive, zero-latency 100% client-side generator for `/llms.txt` and `/llms-full.txt` AI context files, paired with a granular robots.txt AI bot permissions matrix.
  - **4 Strategy Presets:**
    - *Permissive AI Access:* Allows all AI search & training agents with structured /llms.txt documentation links.
    - *Search-Only Access:* Allows search & citation bots (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`) while disallowing foundation model training scrapers (`GPTBot`, `ClaudeBot`, `CCBot`, `ByteSpider`).
    - *Strict Privacy / No AI Training:* Blocks all known AI training bots via robots.txt rules while preserving standard Googlebot/Bingbot search indexing.
    - *Developer Doc Hub:* Pre-fills structured Markdown sections (Core APIs, Developer Guides, Schema Specs, SDKs, Full Archive).
  - **Dual Tab Interactive Builder:**
    - **Tab 1: /llms.txt Markdown Builder:** Project title, mandatory blockquote overview (`>`), extended context paragraph, link to `/llms-full.txt`, and dynamic section/item manager with drag-and-drop / add / remove / edit capabilities.
    - **Tab 2: AI Bot robots.txt Permissions Matrix:** Filter chips (All, Search, Training), bulk allow/disallow actions, custom path restrictions, optional crawl-delay, and individual bot permission toggles for 11 major AI agents:
      - OpenAI: `GPTBot` (training), `ChatGPT-User` (browsing), `OAI-SearchBot` (ChatGPT Search).
      - Anthropic: `ClaudeBot` / `anthropic-ai`.
      - Perplexity: `PerplexityBot`.
      - Google: `Google-Extended` (Gemini training opt-out).
      - Common Crawl: `CCBot`.
      - ByteDance: `ByteSpider`.
      - Apple: `Applebot-Extended`.
      - Meta: `Meta-ExternalAgent` / `FacebookBot`.
      - Cohere: `cohere-ai`.
  - **Multi-Format Code Exporters:**
    - **/llms.txt:** Standard, clean Markdown syntax following the official `/llms.txt` specification.
    - **robots.txt Snippet:** Grouped User-agent blocks ready to paste directly into existing robots.txt files.
    - **Next.js App Router Route Handler:** `app/llms.txt/route.ts` TypeScript handler returning `Response` with `Content-Type: text/plain; charset=utf-8` and edge CDN caching headers.
    - **Cloudflare / Vercel / Nginx Headers:** Static hosting configuration rules.
  - **Real-Time Compliance & Best Practice Validator:**
    - Live checks for blockquote overview presence, link syntax validation, Google-Extended vs Googlebot clarity advisory, AI search engine referral traffic flow, and token/byte count estimators.
- **Dedicated Route & Registry Integration:**
  - Registered `llmsTxtGeneratorTool` (`#34`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/llms-txt-generator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/llms-txt-generator`) and programmatic platform permutations.
  - Updated `RelatedTools.tsx` workflow clusters and incremented global tool counter to 34 tools.

## [2026-09-23] - Sprint 33: Build SVG to Base64 & CSS Data URI Optimizer (Tool #33)
### Added & Enhanced
- **SVG to Base64 & CSS Data URI Optimizer Engine (`src/components/tools/technical/SvgToDataUriOptimizer.tsx`):**
  - Built an interactive, zero-latency 100% client-side SVG minifier, sanitizer, and multi-target code converter.
  - **Interactive Inputs & Optimization Pipeline:**
    - Dual drag-and-drop file upload zone (accepts `.svg` files) and raw SVG XML textarea with live byte/character counters.
    - 3 one-click sample presets: Clean Checkmark Icon, Warning Badge, and Hero Geometric Background Pattern.
    - Minification pipeline: Strips XML declarations (`<?xml ...?>`), DOCTYPE headers, XML/HTML comments, and editor metadata (Inkscape, Sodipodi, Adobe Illustrator, Sketch, Serif namespaces).
    - Responsive dimension normalizer: Strips hardcoded `width`/`height` while preserving or auto-synthesizing `viewBox` coordinates.
    - CSS-safe encoding engine: Escapes `#` to `%23`, handles quote nesting, and percent-encodes `<`, `>`, and `%` characters.
    - Dynamic color override: Color picker and hex input to replace fill and stroke colors before encoding.
  - **Live Render Preview & Quality Inspection:**
    - Real-time SVG rendering with 4 checkered background patterns (Light Grid, Dark Grid, Solid White, Solid Dark) to verify alpha transparency.
    - Interactive zoom controls (50% to 250%) and responsive container scaling.
  - **Multi-Format Code Exporters:**
    - **CSS (background-image):** `background-image: url("data:image/svg+xml,...");` (URL-encoded format ~30% smaller than Base64).
    - **Base64 Data URI:** `data:image/svg+xml;base64,...` format.
    - **HTML <img> Tag:** `<img src="data:image/svg+xml,..." alt="..." />`.
    - **React / Next.js JSX:** Clean, typed TSX component with camelCase attributes (`viewBox`, `fillRule`, `clipRule`, `strokeWidth`, `strokeLinecap`, `strokeLinejoin`, etc.) and props spreading.
    - **Minified SVG:** Clean raw XML ready for 1-click clipboard copy or `.svg` file download.
  - **Core Web Vitals & Inlining Performance Auditor:**
    - Analyzes payload size against the 2KB / 4KB inlining sweet spot for optimal LCP and zero-CLS page rendering.
    - Warns developers when SVGs exceed 8KB, recommending external CDN caching with immutable headers.
- **Dedicated Route & Registry Integration:**
  - Registered `svgToDataUriTool` (`#33`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/svg-to-data-uri/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/svg-to-data-uri`) and programmatic platform permutations.
  - Incremented global tool counter badges, sitemaps, and directories to 33 tools.

## [2026-09-23] - Sprint 32: Build Resource Hint & Preconnect Generator (Tool #32)
### Added & Enhanced
- **Resource Hint & Preconnect Generator Engine (`src/components/tools/technical/ResourceHintGenerator.tsx`):**
  - Built an interactive, zero-latency 100% client-side resource hint tag generator and Core Web Vitals optimization linter.
  - **Interactive Resource Hint Configuration:**
    - **Supported Directive Types:** `preload` (high-priority critical assets), `preconnect` (early origin socket/TLS handshake), `dns-prefetch` (early DNS resolution fallback), `prefetch` (low-priority speculative future navigation), and `modulepreload` (ES module scripts).
    - **Dynamic Resource Rows:** Multi-row asset builder with add, duplicate, remove, and clear actions.
    - **Granular Link Attributes:**
      - Direct resource path / external origin input with validation.
      - Contextual `as` attribute selector (`font`, `style`, `script`, `image`, `fetch`, `document`) with auto-enable on `preload` and `prefetch`.
      - Optional MIME type helper (`font/woff2`, `image/webp`, `image/avif`, `text/css`, etc.).
      - Crossorigin policy manager (`none`, `anonymous`, `use-credentials`) with auto-selection and tooltip guidance for web fonts.
      - Modern `fetchpriority` selector (`high`, `low`, `auto`) for LCP priority tuning.
      - Media query attribute input (e.g. `(max-width: 768px)`) for responsive image and stylesheet preloads.
    - **1-Click High-Impact Presets:**
      - *Google Fonts Optimization:* Dual preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` with `crossorigin`.
      - *Critical Web Font Preload:* Inter WOFF2 preload with `as="font" type="font/woff2" crossorigin="anonymous"`.
      - *Hero Image (LCP) Preload:* High-priority hero image preload with `as="image"` and `fetchpriority="high"`.
      - *Third-Party CDN Preconnect:* Paired `dns-prefetch` and `preconnect` hints for high-latency external CDNs.
  - **Output Panel & Multi-Framework Exporters:**
    - **HTML (`<head>`):** Formatted, indented `<link rel="..." href="..." />` tags ready for copy/download.
    - **Next.js 14/15 (App Router / Metadata):** Complete `Metadata` TypeScript export with `other` / `archives` link descriptors.
    - **HTTP Link Headers (RFC 5988):** Standard `Link:` header snippets ready for Nginx `add_header`, Apache, or `vercel.json` custom headers.
    - 1-click **"Copy Snippet"** with visual feedback, **"Download HTML Snippet"**, and integrated `EmbedBadgeModal`.
  - **Real-Time Core Web Vitals Safety Analyzer:**
    - Visual Core Web Vitals score meter (0%–100%) and itemized linter checks:
      - Double-download bug prevention: Flags missing `crossorigin="anonymous"` on preloaded web fonts.
      - Network bandwidth contention warning: Warns if more than 3-4 critical preloads compete for initial render bandwidth.
      - Origin protocol check: Verifies `https://` on preconnect origins.
      - DNS fallback recommendation: Prompts pairing `dns-prefetch` with `preconnect` for legacy browser support.
- **Dedicated Route & Registry Integration:**
  - Registered `resourceHintGeneratorTool` (`#32`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/resource-hint-generator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/resource-hint-generator`) and programmatic platform permutations.
  - Incremented global tool counter badges, sitemaps, and directories to 32 tools.

## [2026-09-23] - Sprint 31: Build Product & Offer Schema Generator (Tool #31)
### Added & Enhanced
- **Product & Offer Schema Generator Engine (`src/components/tools/technical/ProductSchemaGenerator.tsx`):**
  - Built an interactive, zero-latency 100% client-side structured data generator and Google Rich Results compliance auditor for e-commerce stores, SaaS licenses, and online merchants.
  - **Interactive Product & Offer Form Controls:**
    - **Core Product Information:** Product title, rich commercial description, multi-image URL manager with dynamic list insertion/removal, and brand entity declaration.
    - **Universal Commercial Identifiers:** Direct input and formatting for SKU, GTIN-13 (EAN), GTIN-8, UPC, MPN, and ISBN (for publications) for Google Merchant Center matching.
    - **Pricing & Offer Terms:** Decimal price formatting, 10+ ISO 4217 currencies (USD, EUR, GBP, AED, SAR, CAD, AUD, JPY, INR, CHF), price expiration date picker, stock availability selector (`InStock`, `OutOfStock`, `PreOrder`, `BackOrder`, `InStoreOnly`, `Discontinued`), item condition (`NewCondition`, `RefurbishedCondition`, `UsedCondition`, `DamagedCondition`), and seller organization name.
    - **Aggregate Rating & Reviews:** Toggleable customer rating builder with average score, best/worst rating bounds, total rating count, and written review count.
    - **Shipping & Return Policies (Google 2026 Merchant Free Listings):** Monetary shipping rates, destination countries, delivery handling and transit day ranges, return policy windows (e.g. 30 days), fee rules (`FreeReturn`), and return methods (`ReturnByMail`, `ReturnInStore`).
    - **1-Click E-Commerce Presets:** Physical Product (Sony Headphones In Stock), Digital Software License (OmniSEO Analytics Pro), and Refurbished/Sale Deal (Apple MacBook Pro M3 Max).
  - **Output Panel & Live Google Rich Snippet Simulator:**
    - **Google Search Rich Results Preview Card:** Real-time visual mockup rendering gold star ratings (★★★★★ 4.8), dynamic price badge, stock indicator pills (green In Stock / red Out of Stock), free delivery tags, and breadcrumb hierarchies.
    - **Multi-Format Code Exporters:** Formatted `<script type="application/ld+json">` snippet with syntax styling and Next.js 14/15 App Router TypeScript export.
    - **Google Rich Results Compliance Checklist:** Real-time percentage meter (0%–100%) and itemized attribute audit flagging missing mandatory properties (`name`, `image`, `price`, `priceCurrency`) and recommended merchant enhancements (`sku`/`gtin`, `brand`, `aggregateRating`, `availability`, `shipping`).
    - **Action Buttons & Badges:** 1-click **"Copy Code"**, 1-click **"Download .json"**, direct link to Google's Rich Results Test tool, and integrated `EmbedBadgeModal`.
- **Dedicated Route & Registry Integration:**
  - Registered `productSchemaGeneratorTool` (`#31`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/product-schema-generator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/product-schema-generator`) and programmatic platform permutations.
  - Incremented global tool counter badges, sitemaps, and directories to 31 tools.

## [2026-09-23] - Sprint 30: Build OG & Twitter Card Image Safe-Zone Previewer (Tool #30)
### Added & Enhanced
- **OG & Twitter Card Image Safe-Zone Previewer Engine (`src/components/tools/social/OgImageSafeZonePreviewer.tsx`):**
  - Built an interactive, zero-latency 100% client-side image safe-zone simulator, aspect ratio validator, and multi-platform card previewer.
  - **Interactive Image Ingestion & Resolution Diagnostics:**
    - Drag-and-drop file upload zone, local file picker (PNG, JPEG, WebP, SVG, AVIF, GIF), sample image preset loader, and remote URL loader via CORS image proxy fallback.
    - Real-time resolution, aspect ratio (1.91:1, 2:1, 1:1, etc.), and file size analyzers with visual status badges (Green / Amber / Red warnings for low-res < 1200x630 or heavy payloads > 5MB).
    - Image transform controls: Zoom slider (50%–250%), horizontal/vertical pan offset adjustments (-50% to +50%), and fit mode toggles (Cover vs. Contain).
  - **Safe-Zone Overlay & Grid Guides:**
    - 60px safe margin buffer overlay highlighting the critical 1080x510 central safe zone to prevent text truncation across mobile cards.
    - Rule of Thirds alignment grid toggle for visual balance and focal point composition.
    - Simulated mobile app UI overlays (close buttons, share pills, bottom navigation chrome, author avatars) across iOS and Android client viewports.
    - Desktop vs. Mobile viewport toggles.
  - **Multi-Platform Preview Suite:**
    - **Facebook Post:** 1.91:1 banner (1200x630) with simulated link card title, snippet, and domain footer.
    - **Twitter / X Card Large:** `summary_large_image` (1200x600 / 2:1 and 1200x630 / 1.91:1) card with headline overlay and rounded corners.
    - **Twitter / X Card Small:** `summary` (1:1 / 600x600) square thumbnail layout with side-by-side title and metadata.
    - **LinkedIn Feed:** 1200x627 layout highlighting LinkedIn's subtle top/bottom vertical crop behavior.
    - **WhatsApp / Messenger:** Chat bubble link attachment mockup with compressed thumbnail preview.
  - **Export & Download Suite:**
    - 1-click **"Download 1200x630 (PNG)"** and **"Download 1200x630 (WebP)"** canvas renderers with center cropping, zoom/pan transforms, and high-DPI scaling.
    - Integrated `EmbedBadgeModal` for developer distribution and organic backlinks.
- **Dedicated Route & Registry Integration:**
  - Registered `ogImageSafeZoneTool` (`#30`) in `src/config/tools-registry.ts` under Social Media.
  - Created dedicated client tool page at `src/app/(site)/tools/open-graph-image-safe-zone/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/open-graph-image-safe-zone`) and programmatic platform permutations.
  - Incremented global tool counter badges, sitemaps, and directories to 30 tools.

## [2026-09-23] - Sprint 29: Build Redirect Rule & Regex Mapper (Tool #29)
### Added & Enhanced
- **Redirect Rule & Regex Mapper Engine (`src/components/tools/technical/RedirectRuleGenerator.tsx`):**
  - Built an interactive, zero-latency 100% client-side redirect generator and real-time path match evaluator for SEO migrations and server configuration management.
  - **Interactive Rule Builder & Configuration:**
    - HTTP Status Code selector: `301 Moved Permanently` (SEO equity consolidation), `308 Permanent Redirect` (HTTP method preservation), `302 Found` (temporary), and `307 Temporary Redirect`.
    - Match Mode selector:
      - **Simple Exact Path:** Direct 1-to-1 path mapping (`/old-page` &rarr; `/new-page`).
      - **Wildcard / Parameter Mode:** Next.js route parameter syntax (`/blog/:slug*` &rarr; `/articles/:slug*`).
      - **RegEx Pattern Mode:** Full regular expressions with capture groups (`^/products/([0-9]+)$` &rarr; `/items/$1`).
    - Directives toggles: Case-insensitive matching (`[NC]` / `(?i)`) and Query String Preservation (`[QSA]` / `$is_args$args`).
    - 1-click preset templates: "Folder Migration", "Remove Trailing Slash", "Strip .html Extension", "Product ID Pattern", and "HTTP to HTTPS & WWW Canonical".
  - **Live Path Simulation Engine (0ms):**
    - Evaluates arbitrary sample URLs in real time with client-side regex evaluation and parameter substitution.
    - Status indicators: Green (Matched with computed destination URL preview), Amber (No Match with explanatory diagnostics), and Red (RegEx syntax error alerts with line details).
    - Diagnostic lint checks: Infinite loop prevention (source === destination), unescaped regex dot alerts, and temporary 302/307 link equity warnings.
  - **Sticky Multi-Server Output & Code Generation Panel:**
    - Multi-server export tabs: Next.js (`next.config.mjs` `redirects()`), Nginx (`rewrite ... permanent;`), Apache (`.htaccess` `RewriteRule`), and Cloudflare (Bulk Redirects CSV / Page Rules).
    - 1-click **"Copy Config Snippet"** with visual checkmark feedback and 1-click **"Download Config File"** (.htaccess, nginx-redirects.conf, next.config.mjs, cloudflare-bulk-redirects.csv).
    - Integrated `EmbedBadgeModal` for developer distribution and organic backlinks.
- **Dedicated Route & Registry Integration:**
  - Registered `redirectRuleGeneratorTool` (`#29`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/redirect-rule-generator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/redirect-rule-generator`) and programmatic platform permutations.
  - Incremented global tool counter badges, sitemaps, and directories to 29 tools.

## [2026-09-23] - Sprint 28: Build XML Sitemap Generator & Validator (Tool #28)
### Added & Enhanced
- **XML Sitemap Generator & Live Syntax Validator Engine (`src/components/tools/technical/XmlSitemapGenerator.tsx`):**
  - Built an interactive, zero-latency 100% client-side XML Sitemap Generator and DOMParser-powered Syntax Validator/Linter compliant with Sitemaps.org Protocol 0.9 and Google search requirements.
  - **Generator Mode (Bulk URL Processor):**
    - Multi-line textarea supporting bulk URL batch inputs (up to 200+ URLs) with real-time URL counters and line cleaners.
    - Global directives configurator: `<changefreq>` selector (always, hourly, daily, weekly, monthly, yearly, never), `<priority>` slider (0.1 to 1.0), and `<lastmod>` date picker with 1-click "Set Today" shortcut.
    - 1-click preset templates: "Standard Site" (root 1.0, subpages 0.8, monthly changefreq), "E-Commerce / Blog" (daily changefreq, category weighting).
    - Advanced formatting switches: Smart Root Hierarchy (root gets 1.0 priority), Force HTTPS Protocol upgrade, Automated XML Entity Escaping (`&` &rarr; `&amp;`, `'` &rarr; `&apos;`, `"` &rarr; `&quot;`), and individual tag inclusion toggles.
  - **Validator / Linter Mode (DOMParser Engine):**
    - Raw XML input parser utilizing native browser `DOMParser` with 0ms execution time and zero server data transmission.
    - Itemized compliance audits: XML syntax errors (`parsererror`), namespace validation (`http://www.sitemaps.org/schemas/sitemap/0.9`), root element validation (`<urlset>` / `<sitemapindex>`), insecure `http://` detection, relative URL path alerts, unescaped ampersand checkers, W3C Datetime / ISO 8601 `<lastmod>` validation, duplicate URL detection, and Google 50,000 URL / 50MB limits monitoring.
    - 1-click "Import into Generator" feature deserializing parsed XML into builder state.
    - Sample loaders for valid XML, faulty XML with errors, and sitemap index files.
  - **Sticky Output & Code Generation Panel:**
    - Dual code viewer tabs: Standard formatted `sitemap.xml` and Next.js 14/15 App Router `app/sitemap.ts` dynamic TypeScript export implementing `MetadataRoute.Sitemap`.
    - 1-click **"Copy Code"** with visual feedback animation and 1-click **"Download sitemap.xml"** blob file download.
    - Live physical limits meter tracking URL count and payload size against Google's 50k / 50MB thresholds.
    - Integrated `EmbedBadgeModal` for developer distribution and organic backlinks.
- **Dedicated Route & Registry Integration:**
  - Registered `xmlSitemapGeneratorTool` (`#28`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/xml-sitemap-generator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/xml-sitemap-generator`) and programmatic platform permutations.
  - Incremented global tool counter badges, sitemaps, and directories to 28 tools.

## [2026-09-23] - Sprint 27: Build & Reposition Bulk Canonical Normalizer & Auditor (Tool #27)
### Added & Enhanced
- **Bulk Canonical Normalizer & Auditor Engine (`src/components/tools/technical/CanonicalTagGenerator.tsx`):**
  - Built and repositioned an interactive, zero-latency 100% client-side bulk canonical URL normalizer and hygiene audit engine targeting distinct bulk SEO search intents without cannibalizing `/tools/canonical-url-builder`.
  - **Batch-First Processing & Live Normalization Engine:**
    - Default **Batch Mode** supporting bulk input for up to 25 URLs simultaneously with interactive audit table, row-level status diagnostics, 1-click **"Copy All Canonicals"**, and **"Export CSV (Excel BOM)"** download.
    - Single URL mode with live normalization, modification diff summary, and hygiene score meter.
  - **Comprehensive Normalization & SEO Hygiene Rules:**
    - Automated Tracking Parameter Stripping removing 35+ marketing/ad keys (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid`, `twclid`, `yclid`, `mc_eid`, `ref`, `source`, `sessionid`, etc.).
    - Enforce Lowercase Path rule normalising uppercase directory and file paths to prevent duplicate content variations.
    - Configurable Trailing Slash Policy (Enforce Trailing Slash, Remove Trailing Slash, or Keep Original) ignoring file extensions.
    - Force HTTPS Protocol upgrade and optional WWW subdomain policy.
    - Automated URL Hash / Fragment (`#section`) stripping.
    - Root Pagination cleaner (`?p=1`, `?page=1`, `/page/1/` &rarr; canonical root).
  - **Sticky Output & Real-Time Preview Panel:**
    - Multi-format code generation: HTML5 `<link rel="canonical" href="..." />`, RFC 5988 HTTP `Link` response header (for PDF whitepapers and documents), Next.js 14/15 App Router `Metadata.alternates.canonical` TypeScript export, and Nginx / Apache server header configs.
    - Prominent Live Hygiene Audit Banner evaluating batch-wide and single URL completeness scores (0–100), flagging relative URLs, non-HTTPS protocols, remaining query strings, and listing all automated transformations applied.
    - 1-click **"Copy Snippet"** with animated feedback tooltip, 1-click **"Download Text"**, and direct link to Google Rich Results test.
- **Dedicated Route & Registry Integration:**
  - Registered `canonicalTagGeneratorTool` (`#27`) in `src/config/tools-registry.ts` under Technical SEO as "Bulk Canonical Normalizer & Auditor".
  - Created dedicated client tool page at `src/app/(site)/tools/canonical-tag-generator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/canonical-tag-generator`) and programmatic platform permutations.
  - Incremented global tool counter badges, sitemaps, and directories to 27 tools.

## [2026-09-23] - Sprint 26: Build Article & BlogPosting Schema Generator (Tool #26)
### Added & Enhanced
- **Article & BlogPosting Schema Generator Engine (`src/components/tools/technical/ArticleSchemaGenerator.tsx`):**
  - Built a 100% client-side, zero-latency Schema.org structured data generator for Google-compliant `Article`, `BlogPosting`, and `NewsArticle` JSON-LD markup.
  - **Interactive Visual Builder & Configuration:**
    - Subtype selector toggling between `BlogPosting` (tutorials, essays & blog posts), `Article` (general publications), and `NewsArticle` (journalism, top stories eligibility).
    - Core metadata manager: Headline with real-time character counter and 40–110 optimal character indicators, Canonical URL with HTTPS assertion, description excerpt, section taxonomy, and ISO 639-1 language tags.
    - Google-recommended multi-aspect ratio image manager (16:9 banner, 4:3 card, 1:1 square) with 1-click auto-fill from primary hero image.
    - ISO 8601 date controller with "Set to Today" and "Sync with Published" shortcut actions.
    - E-E-A-T Author entity builder supporting `Person` and `Organization` typing, author bio/profile URLs, and job title expertise signals.
    - Publisher entity manager asserting publisher name, website URL, and logo ImageObject requirements for Google Discover and Top Stories eligibility.
    - Quick-start 1-click presets: "Tech Blog Post", "News Publication", and "Company Announcement".
  - **Sticky Output & Real-Time Preview Panel:**
    - Real-time formatted code outputs: Raw HTML `<script type="application/ld+json">`, Next.js App Router TypeScript component (`dangerouslySetInnerHTML`), and interactive SERP rich snippet simulation card with thumbnail previews and author byline.
    - Live validation status banner computing a 0–100 completeness score with itemized diagnostics checklist (green/amber/red indicators).
    - 1-click **"Copy Snippet"** with animated feedback tooltip, 1-click **"Download JSON"**, and direct **"Validate with Google"** action opening the Rich Results Test tool.
- **Dedicated Route & Registry Integration:**
  - Registered `articleSchemaGeneratorTool` (`#26`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/article-schema-generator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/article-schema-generator`) and programmatic platform permutations.
  - Updated global tool counter badges, sitemaps, and directories to 26 tools.

## [2026-09-23] - Sprint 25: Build Robots.txt Generator & Validator Web Interface (Tool #25)
### Added & Enhanced
- **Robots.txt Generator & Live Syntax Validator Engine (`src/components/tools/technical/RobotsTxtGeneratorValidator.tsx`):**
  - Built an interactive, zero-latency dual-mode REP / RFC 9309 generator and syntax validator powered by `omniseo-core` (`parseRobotsTxt`, `validateRobotsTxt`, `generateRobotsTxt`).
  - **Mode A (Visual Rule Builder):**
    - Multi-Rule User-agent block builder with add/remove rule block controls.
    - Quick user-agent chip suggestions (`*`, `Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `AhrefsBot`, `SemrushBot`, `Applebot-Extended`, `Bytespider`).
    - Granular Disallow and Allow path managers with instant add/remove controls and preset chips (`/admin/`, `/private/`, `/api/`, `/checkout/`, `/cart/`, `/*.pdf$`).
    - Numeric Crawl-Delay input with crawler compatibility tooltips.
    - Full XML Sitemap and canonical Host directive managers.
    - 1-click preset templates: "Allow All", "Disallow All (Staging Lock)", "Block Bad Bots", "Allow Googlebot Only", "Standard Web", "Block AI Scrapers".
  - **Mode B (Syntax Validator & Tester):**
    - Raw robots.txt editor with sample template loaders and live linting against RFC 9309 standards.
    - Live multi-tier status badge: Green (Valid), Amber (Warnings/Non-standard directives), Red (Errors).
    - Line-by-line diagnostic feedback panel displaying exact line numbers and actionable fix suggestions.
    - "Import into Visual Builder" action to seamlessly deserialize raw text into builder state.
    - **Interactive Live Path Tester:** 0ms simulation testing whether target URLs are permitted or blocked for specific user-agents with matching directive explanations.
  - **Sticky Output & Preview Panel:**
    - Real-time syntax-highlighted code output with line numbering.
    - 1-click **"Copy Code"** with animated feedback tooltip.
    - 1-click **"Download .txt"** file export triggering standard `robots.txt` download.
    - Integrated `EmbedBadgeModal` and URL state permalink sharing.
- **Dedicated Route & Registry Integration:**
  - Registered `robotsTxtGeneratorValidatorTool` (`#25`) in `src/config/tools-registry.ts` under Technical SEO.
  - Created dedicated client tool page at `src/app/(site)/tools/robots-txt-generator-validator/page.tsx` with Schema.org `WebApplication` + `FAQPage` + `BreadcrumbList` JSON-LD graph.
  - Wired dynamic routing across standalone (`/tools/robots-txt-generator-validator`) and all 8 programmatic platform permutations (`/tools/robots-txt-generator-validator/[platformSlug]`).
  - Updated global tool counter badges and directories to 25 tools.

## [2026-09-23] - Sprint 24: Build Arabic & UTF-8 URL Decoder & Parameter Extractor
### Added & Enhanced
- **Arabic & UTF-8 URL Decoder Engine (`src/components/tools/ArabicUrlDecoder.tsx`):**
  - Built a high-performance, client-side interactive tool to decode percent-encoded URLs, Google Ads search terms, and GA4 query parameters (%D8%...) into human-readable Arabic and UTF-8 text with 0ms server latency.
  - Implemented dual operation modes:
    - **Single URL / Parameter Mode:** Decomposes complex links into clean decoded URLs, path hierarchy breadcrumbs, and structured query parameter tables with role categorization (UTM Source, UTM Campaign, Search Query, GCLID, etc.).
    - **Batch Line-by-Line Mode:** Processes hundreds of raw search query logs or campaign links simultaneously with real-time line counters and Arabic character diagnostics.
  - Added automatic Arabic character range detection (`/[\u0600-\u06FF]/`) with dynamic `dir="rtl"` styling and manual direction override controls (Auto, RTL, LTR).
  - Built robust recursive multi-hop decoding capable of resolving double-encoded tokens (`%25D8...` &rarr; `%D8...` &rarr; Arabic) with safe error fallback guards.
  - Added 1-click **"Export as CSV (Excel)"** embedding a UTF-8 Byte Order Mark (`\uFEFF`) to prevent character corruption (mojibake) in Microsoft Excel on Windows.
  - Integrated `EmbedBadgeModal` and `EmbedToolModal` for developer distribution and organic backlinks.
- **Global Tools Registry & Programmatic Platform Permutations:**
  - Registered `arabicUrlDecoderTool` (`#23`) in `src/config/tools-registry.ts` under the Marketing & Growth category.
  - Wired dedicated UI routing across standalone (`/tools/arabic-url-decoder`) and 8 programmatic platform permutations (`/tools/arabic-url-decoder/[platformSlug]`).
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 269 production routes via `npm run build`.

## [2026-09-23] - Sprint 23.1: Offload gtag & Analytics to lazyOnload Strategy
### Optimized & Enhanced
- **Asynchronous Analytics Execution Strategy (`src/app/layout.tsx`):**
  - Replaced synchronous/interactive analytics injection with Next.js `next/script` using `strategy="lazyOnload"` for both Google Tag Manager script (`gtag/js`) and inline `google-analytics` dataLayer bootstrap.
  - Offloaded the 171 KB `gtag.js` library evaluation to browser idle time (`requestIdleCallback` / window load event), completely eliminating main-thread contention during initial page and tool component hydration.
  - Added environment guard (`isProduction = process.env.NODE_ENV === 'production'`) preventing analytics script execution and tracking pollution during local development and testing.
  - Updated Google AdSense loader script to use `strategy="lazyOnload"` when enabled.
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 260 production routes via `npm run build`.

## [2026-09-23] - Sprint 23: Performance Optimization - Fix Forced Reflow & Reduce Blocking Time
### Optimized & Enhanced
- **SERP Simulator Zero-Reflow & Memoization Engine (`src/lib/serp-utils.ts`):**
  - Eliminated synchronous DOM layout reads (`offsetWidth`, `clientWidth`, `getComputedStyle`) and wrapped text pixel calculations inside high-efficiency hash map memoization caches (`TITLE_PX_CACHE`, `DESC_PX_CACHE`, `TRUNCATION_CACHE`).
  - Cached string-to-pixel results with LRU-style eviction bounds (`MAX_CACHE_ENTRIES = 1000`) preventing redundant character iterations during typing and initial render cycles.
  - Ensured all SERP calculations run in 0ms on the main thread, eliminating layout thrashing and forced reflow warnings in Lighthouse performance audits.
- **Dynamic Lazy-Loading for Heavy Client Overlays (`src/components/feedback/DynamicFeedbackDrawer.tsx`):**
  - Wrapped `MicroFeedbackDrawer` in a dedicated client boundary using Next.js `next/dynamic` with `ssr: false` and `loading: () => null`.
  - Deferred the feedback drawer bundle, diagnostic listeners, and form controllers outside the critical initial SSR HTML payload, significantly reducing Total Blocking Time (TBT < 200ms) on tool routes.
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 260 production routes via `npm run build`.

## [2026-09-23] - Sprint 22: Upgrade Favicon Tool to All-in-One Asset & Code Generator
### Added & Enhanced
- **Favicon & App Icon Generator Engine (`src/lib/favicon-generator.ts`):**
  - Integrated `jszip` client-side library for automated ZIP archive bundling.
  - Implemented high-precision HTML5 Canvas offscreen resizer scaling uploaded images (PNG, JPG, SVG, WebP) into all modern web standards:
    - `favicon.ico` (32×32 px legacy browser & feed crawler fallback)
    - `favicon-32x32.png` (32×32 px standard desktop tab icon)
    - `favicon-16x16.png` (16×16 px standard browser tab fallback)
    - `apple-touch-icon.png` (180×180 px iOS Safari home screen bookmark)
    - `android-chrome-192x192.png` (192×192 px Android home screen & PWA launcher)
    - `android-chrome-512x512.png` (512×512 px Android splash screen & app stores)
    - `site.webmanifest` (Standardized JSON PWA manifest referencing generated icons, theme color, background color, and display mode)
  - Added 1-click **"Download Asset Bundle (.zip)"** generating `favicon-package.zip` containing all resized PNG/ICO icons, `site.webmanifest`, and an installation `README.txt`.
- **Dedicated Interactive UI Component (`src/components/tools/developer/FaviconGeneratorTool.tsx`):**
  - Drag-and-drop / file upload dropzone with instant client-side resolution & file-size metadata detection.
  - Quick-start sample logo presets (Emerald Rocket, Indigo Lightning, Violet Spark) for immediate testing.
  - Real-time device and browser preview mockups (Chrome Desktop Tab, iOS Bookmark, Android PWA Launcher).
  - Safe padding buffer slider (0% to 20%) to prevent brand icons from touching tab borders.
  - Individual 1-click asset download buttons for each generated image format.
  - Multi-framework code output tabs with live synchronization:
    - **HTML5 `<head>`:** Clean `<link rel="icon" ...>` tags and meta theme colors.
    - **Next.js 14 / 15 App Router:** Folder-based file convention guides (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`) and `export const metadata: Metadata` TypeScript code snippets.
    - **`site.webmanifest`:** Formatted JSON manifest.
    - **Astro & SvelteKit:** Framework-specific layout templates.
  - Integrated `EmbedToolModal` and `EmbedBadgeModal` for developer distribution and organic backlinks.
- **Tool Registry Configuration (`src/config/tools-registry.ts`):**
  - Updated tool `#20` name and metadata: *"Favicon & App Icon Generator"* preserving canonical slug `/tools/favicon-meta-generator`.
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 260 production routes via `npm run build`.

## [2026-09-23] - Sprint 21.1: Fix Discord Webhook Payload Formatting & Enhance Form Validation
### Fixed & Enhanced
- **Discord-Compliant Webhook Embed Dispatcher (`src/app/api/feedback/route.ts`):**
  - Added auto-detection for Discord webhook endpoints (`FEEDBACK_WEBHOOK_URL` containing `discord.com/api/webhooks`).
  - Structured rich Discord embeds with category-coded hex colors (`bug: 15680324 (#ef4444)`, `feature: 3899126 (#3b82f6)`, `general: 1096065 (#10b981)`).
  - Included detailed diagnostic fields: Page URL, Reporter Email, Tool Slug, Screen Resolution, and truncated Error Stack Trace (up to 1,000 chars) with bot username and avatar branding.
  - Added error response logging (`console.error("Discord Webhook dispatch failed:", res.status, await res.text())`) on non-200 webhook status codes.
  - Maintained raw JSON payload forwarding fallback for generic non-Discord endpoints.
- **Micro-Feedback Drawer Character Count & Validation UI (`src/components/feedback/MicroFeedbackDrawer.tsx`):**
  - Integrated real-time character validation state: `trimmedLength = message.trim().length` and `isValid = trimmedLength >= 5 && trimmedLength <= 2000`.
  - Added visual text helper indicator beneath the message textarea:
    - `0/5`: `"Minimum 5 characters required (0/5)"` (`text-zinc-500 text-xs`).
    - `1-4/5`: `"Minimum 5 characters required (N/5)"` (`text-amber-500 text-xs font-medium`).
    - `5-2000`: `"N/2000 characters"` (`text-zinc-400 text-xs`).
  - Enforced button disable state (`disabled={!isValid || isSubmitting}`) with `disabled:opacity-50 disabled:cursor-not-allowed transition-opacity` styling and client-side guard in `handleSubmit`.
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 260 production routes via `npm run build`.

## [2026-09-23] - Sprint 21: Platform Health, Component Error Boundaries & Micro-Feedback System
### Added & Enhanced
- **Resilient Component-Level Error Boundaries (`src/components/common/ToolErrorBoundary.tsx`):**
  - Implemented React error boundary component wrapping all interactive tool widgets across dynamic (`/tools/[slug]`, `/tools/[slug]/[platformSlug]`) and standalone routes (`/tools/social/open-graph-preview`, `/tools/marketing/utm-campaign-builder`, `/tools/seo/url-slug-generator`, `/tools/seo/serp-preview`, `/tools/developer/robots-txt-generator`, `/tools/content/keyword-density-analyzer`).
  - Isolated failure boundaries prevent widget-level runtime exceptions from crashing the parent page shell (header, navigation, editorial guides, FAQs, comparison matrix, and footer remain 100% intact).
  - Fallback UI provides sanitized error previews, a 1-click **"Reset Tool"** action (clearing local state / localStorage and re-mounting the component via key increments), and a **"Report This Bug"** button that pre-populates diagnostics into the feedback drawer.
- **Route-Level Next.js App Router Error Handlers (`src/app/(site)/tools/[slug]/error.tsx` & `src/app/error.tsx`):**
  - Styled branded fallback templates with automatic diagnostic error reporting triggers and navigation recovery shortcuts.
- **Floating Micro-Feedback System (`src/components/feedback/MicroFeedbackDrawer.tsx`):**
  - Client component rendered globally in `src/app/(site)/layout.tsx` with a non-intrusive floating pill trigger (`[Feedback & Bug Report]`) in the bottom-right corner.
  - Automatically collapses into an icon-only button on mobile viewports to prevent obstruction of primary tool action buttons.
  - Category selector tabs: **[Bug Report]**, **[Tool Suggestion]**, **[General Feedback]** with dynamic contextual placeholders.
  - Collapsible auto-captured diagnostics inspector displaying current URL, tool slug, viewport screen resolution, user agent, and error stack trace (if triggered via error boundary).
  - Global event listener (`open-micro-feedback`) and helper (`openFeedbackDrawer`) for programmatic activation from error boundaries or interactive widgets.
- **Dedicated Backend Feedback Route (`src/app/api/feedback/route.ts`):**
  - Rate-limited API route (5 submissions/min/IP) with strict input validation (5–2000 characters).
  - Multi-channel dispatch engine supporting Resend Email API (`RESEND_API_KEY`), custom Webhooks (`FEEDBACK_WEBHOOK_URL`), and graceful structured console logging in development environments.
  - Strict security and CORS headers returning `{ success: true, message: 'Feedback received' }`.
- **System Operational Status Pill & Diagnostic Monitor (`src/components/common/SystemStatusPill.tsx`):**
  - Real-time status pill with pulsing green indicator embedded directly into `src/components/layout/Footer.tsx`.
  - Interactive status drawer / modal performing real-time health checks on:
    - *Open Graph Scraper & Proxy Engine*
    - *Dynamic Vector SVG Badge API*
    - *Static MDX Blog Engine*
    - *Client-Side Image Resizer & Canvas Engine*
    - *Client Route Latency & Edge Connectivity*
- **Build Verification:**
  - Confirmed 0 TypeScript errors and 100% clean SSG generation across all 260 production routes via `npm run build`.

## [2026-09-22] - Sprint 20: Blog Post #2 - Why GA4 Strips UTM Parameters on SPA Route Transitions
### Added & Enhanced
- **Second Production Technical Blog Post (`src/content/blog/why-ga4-strips-utm-parameters-spa.mdx`):**
  - Published comprehensive technical tracking guide: *"Why GA4 Strips UTM Parameters on SPA Route Transitions (And How to Fix It)"*.
  - Frontmatter configured with type-safe metadata (`title`, `description`, `date: "2026-09-22"`, `author`, `tags`, `readingTime: "7 min read"`, `featuredTool: "campaign-utm-builder"`).
  - Diagnostic breakdown explaining the client-side navigation race condition between premature `router.replace()` URL sanitization and asynchronous GA4 Enhanced Measurement `page_view` dispatch.
  - Comparative vulnerability matrix evaluating Next.js App Router, Astro View Transitions, Remix/React Router v7, and Nuxt 3.
  - Battle-tested TypeScript Client Component (`UtmSessionPersister.tsx`) capturing inbound UTM keys into `sessionStorage` and pushing attribution to Google Tag Manager / `dataLayer`.
  - GA4 / GTM configuration recipes showing how to construct session-aware `page_location` overrides.
  - Embedded primary `<ToolCallout />` for Campaign UTM Builder and lateral bridges for Open Graph Meta Generator and Google SERP Simulator.
  - Interactive FAQ Accordion (`<FaqAccordion />`) explaining session-scoped attribution persistence, `router.replace()` mechanics, and `sessionStorage` vs cookie trade-offs.
- **Bidirectional Reverse Conversion Feedback Loop:**
  - **Campaign UTM Builder (`src/app/(site)/tools/marketing/utm-campaign-builder/components/ToolContent.tsx` & `src/config/tools/marketing/utm-campaign-builder.ts`):**
    - Added prominent SPA client routing attribution alert box in the Best Practices section: *"Running a Next.js or React SPA? Avoid attribution loss caused by client-side navigation. Read our engineering breakdown: [Why GA4 Strips UTM Parameters on SPA Route Transitions](/blog/why-ga4-strips-utm-parameters-spa)."*
    - Added dedicated Engineering Deep Dive card in the related utilities grid.
    - Updated tool registry `editorialGuide` and `faqs` linking directly to the new guide.
- **Sitemap & Build Verification:**
  - Prerendered SSG route `/blog/why-ga4-strips-utm-parameters-spa` automatically indexed in `src/app/sitemap.ts` (`priority: 0.8`).
  - Confirmed 0 TypeScript errors and 100% clean SSG generation across all 259 production routes via `npm run build`.

## [2026-09-21] - Sprint 19.2: Seed Pilot Blog Post & Establish Tool Feedback Loop
### Added & Enhanced
- **First Production Technical Blog Post (`src/content/blog/fixing-linkedin-discord-og-image-cropping.mdx`):**
  - Published in-depth technical post: *"Why Your Open Graph Image Crops on LinkedIn & Discord (And How to Fix It in Next.js)"* targeting diagnostic queries.
  - Features exact frontmatter (`title`, `description`, `date`, `author`, `tags`, `readingTime: "6 min read"`, `featuredTool: "open-graph-meta-generator"`).
  - Embedded primary `<ToolCallout />` widget for live Open Graph sandbox testing.
  - Multi-platform aspect ratio comparison matrix (LinkedIn, Twitter/X, Facebook, Discord, Slack) and visual `<SafeZoneDiagram />` explaining 10% / 60px buffer margin and 960x504 critical content area.
  - Production TypeScript Next.js 15 App Router `generateMetadata` implementation with explicit pixel bounds (`width: 1200`, `height: 630`).
  - Edge route `@vercel/og` ImageResponse code snippet with explicit binary MIME types (`image/png`) and immutable `Cache-Control` headers.
  - Lateral tool bridges embedding `<ToolCallout />` widgets for Twitter Card Previewer (`twitter-card-previewer`) and Campaign UTM Builder (`campaign-utm-builder`).
  - FAQ Accordion with Schema.org `FAQPage` compliance addressing LinkedIn grey fallback boxes, SVG limitations, and cache-busting query versioning.
- **Bidirectional Reverse Conversion Feedback Loop (Tools -> Blog):**
  - **Open Graph Meta Generator (`src/components/tools/developer/MetaTagGenerator.tsx`, `src/config/tools-registry.ts`, `src/config/tools/social/open-graph-preview.ts`, `ToolContent.tsx`):**
    - Added contextual "Deep Dive Guide" card beneath image inputs and in tool registry FAQs: *"Facing aspect ratio clipping on social feeds? Read our guide: [Why Your Open Graph Image Crops on LinkedIn & Discord (And How to Fix It)](/blog/fixing-linkedin-discord-og-image-cropping)."*
  - **Twitter Card Previewer (`src/config/tools-registry.ts`):**
    - Added contextual reference link in cache-busting FAQ: *"Learn how edge response times and aspect ratios impact social scrapers in our [Open Graph & Twitter Card Debugging Guide](/blog/fixing-linkedin-discord-og-image-cropping)."*
- **Sitemap & Build Verification:**
  - Automated SSG registration of `/blog/fixing-linkedin-discord-og-image-cropping` in `src/app/sitemap.ts`.
  - Confirmed 0 TypeScript errors and 100% clean SSG generation across all 258 production routes via `npm run build`.

## [2026-09-21] - Sprint 19.1: Fix MDX Prose Typography & Safe Zone Diagram Architecture
### Fixed & Enhanced
- **Safe Zone Interactive Visual Diagram (`src/components/blog/SafeZoneDiagram.tsx`):**
  - Replaced ASCII text diagram with a responsive, high-contrast visual canvas component showcasing the 1200x630 pixel canvas, 1.91:1 aspect ratio, 60px top/bottom buffer margins, and the central 1080x510 critical content safe zone.
  - Added platform compatibility indicators (LinkedIn 1200x627, Twitter Large Card 1.91:1, Facebook 1200x630, Discord >1.5:1).
- **MDX Prose Typography & Layout Engine (`src/components/blog/MDXComponents.tsx`):**
  - Created centralized `MDXComponents` mapping for continuous, unbroken typography flow inside `@tailwindcss/typography` (`prose prose-slate dark:prose-invert max-w-none`).
  - Standardized code fences so `<pre>` containers are exclusively utilized for genuine code snippets (with copy actions and language badges), preventing markdown text boxes from being misrendered as code blocks.
  - Styled semantic elements: responsive table wrappers with horizontal scroll safety (`table`, `thead`, `th`, `td`) and styled blockquotes (`blockquote`).
- **Pilot Editorial Content Refinement (`src/content/blog/fixing-linkedin-discord-og-image-cropping.mdx`):**
  - Updated pilot article to embed `<SafeZoneDiagram />` and standard TypeScript code blocks for fluid reading experience.
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 258 production routes via `npm run build`.

## [2026-09-21] - Sprint 19: Zero-Maintenance Static MDX Blog Infrastructure & TechArticle Schema
### Added
- **Static MDX Content Engine (`src/lib/blog.ts`):**
  - Zero-database, statically generated (SSG) developer blog layer utilizing `gray-matter` for type-safe frontmatter extraction, `reading-time` for automated reading length calculation, and Next.js App Router dynamic route compilation.
  - Implemented `getAllPosts()`, `getPostBySlug()`, and `getAllPostSlugs()` with chronological sorting and defensive frontmatter fallbacks.
- **Interactive Embedded MDX Components:**
  - `src/components/blog/ToolCallout.tsx`: High-converting sandbox launcher card embedded in technical guides with direct 1-click links to `/tools/[slug]`.
  - `src/components/blog/CodeBlock.tsx`: Syntax-styled pre/code block with filename indicator, language badges, and 1-click clipboard copy feedback.
  - `src/components/blog/FaqAccordion.tsx`: Accessible interactive Q&A accordion automatically injecting valid Schema.org `FAQPage` JSON-LD structured data.
- **Route & Layout Implementation:**
  - **Blog Index Directory (`src/app/(site)/blog/page.tsx`):** Developer-focused index listing published articles with reading time badges, author metadata, topic tags, and XML sitemap link.
  - **Single Article Route (`src/app/(site)/blog/[slug]/page.tsx`):** Prerendered SSG page with `@tailwindcss/typography` styling (`prose prose-slate dark:prose-invert`), author bio card, and contextual programmatic tool CTAs.
  - **Dynamic Edge Social Cards (`src/app/(site)/blog/[slug]/opengraph-image.tsx`):** Edge-rendered `ImageResponse` (`@vercel/og`) dynamically generating 1200x630 branded social cards for article sharing.
- **Structured Data Automation (`src/lib/schema-generator.ts`):**
  - Added `generateTechArticleSchema()` producing valid Schema.org `TechArticle` structured data (`headline`, `description`, `datePublished`, `dateModified`, `author`, `publisher`, `mainEntityOfPage`, `keywords`).
  - Integrated composite `TechArticle` + `BreadcrumbList` schemas across all article routes.
- **Initial Pilot Article (`src/content/blog/fixing-linkedin-discord-og-image-cropping.mdx`):**
  - Published comprehensive technical guide: *"Why Your Open Graph Image Crops on LinkedIn & Discord (And How to Fix It in Next.js)"* covering aspect ratio thresholds (1.91:1 vs 1:1), 60px safe margin rules, Next.js 15 App Router `ImageResponse` code examples, cache invalidation workflows, and embedded interactive tool callouts.
- **Sitemap & Navigation Integration:**
  - Updated `src/app/sitemap.ts` to automatically index `/blog` (`priority: 0.8`) and all static `/blog/[slug]` articles (`priority: 0.8, changeFrequency: 'weekly'`).
  - Added direct links to "Blog" in desktop navigation, mobile drawer (`Header.tsx`), and global directory grid (`Footer.tsx`).
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 258 production routes via `npm run build`.

## [2026-09-20] - Sprint 18: Dynamic SVG Audit Badge Endpoint & Markdown/HTML Embed Drawer
### Added
- **Dynamic Vector SVG Badge API Endpoint (`src/app/api/badge/route.ts`):**
  - High-performance Edge route handler accepting `label`, `status`, `score`, and `theme` (`dark`, `flat`, `emerald`).
  - Crisp Shields.io-style vector SVG badge generation with system font stack, rounded rect clipping, and XML entity escaping.
  - Automatic 3-tier score color-coding: Emerald Green (`#10b981` for scores 90–100), Amber Yellow (`#f59e0b` for 70–89), and Rose Red (`#f43f5e` for <70).
  - Dynamic character-width geometry calculation preventing text clipping across varying label lengths.
  - Edge caching (`Cache-Control: public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200`) and open CORS headers.
- **Embed Badge Modal Component (`src/components/tools/EmbedBadgeModal.tsx`):**
  - Clean modal/drawer dialog featuring live SVG badge rendering, theme selector, score customization, and dual snippet export tabs:
    1. **Markdown (for GitHub READMEs):** `[![SEO Audit](https://omniseotools.com/api/badge?score=...&status=Verified)](https://omniseotools.com/tools/...#s=...)`
    2. **HTML (for Website Footers & Docs):** `<a href="..." target="_blank" rel="noopener noreferrer"><img src="..." alt="SEO Audit Score" /></a>`
  - 1-click clipboard copy buttons with instant "Copied!" feedback and checkmark animations.
- **Tool UI Integration:**
  - Integrated "Embed Badge" trigger buttons beside "Share Preview" and "Export Code" across:
    - `src/components/tools/social/SocialPreviewer.tsx`
    - `src/components/tools/developer/MetaTagGenerator.tsx`
    - `src/components/tools/serp/SERPPreviewer.tsx`
  - Dynamically calculates real-time audit completeness scores based on title length, description optimization, image resolution, canonical URLs, and brand handles.
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 256 production routes via `npm run build`.

## [2026-09-20] - Sprint 17.1: Registered Campaign UTM Builder into Central Tool Directory Catalog
### Added
- **Central Tools Registry Synchronization:**
  - Directly registered `utmCampaignBuilderTool` (Campaign UTM Builder) and `openGraphPreviewTool` into the primary `TOOLS_REGISTRY` array in `src/config/tools-registry.ts`.
  - Updated tool metadata: `name: "Campaign UTM Builder"`, `category: "marketing"`, `icon: "Link2"`, `badge: "Popular"`, `shortDescription: "Generate custom campaign URLs with GA4 UTM tracking parameters, instant validation, and 1-click clipboard copying."`.
  - Synchronized `getAllTools()`, `getAllProgrammaticTools()`, `getToolsByCategory()`, and `getFeaturedTools()` to return all 22 active utilities.
- **Tool Hub Directory & Category Grid Pages:**
  - Created dedicated `/tools` page (`src/app/(site)/tools/page.tsx`) rendering the complete 22+ tool hub catalog with live search, category filtering, responsive breadcrumbs, and ad slots.
  - Verified homepage (`src/app/(site)/page.tsx`) displays all 22 tools in "All Utilities (22)" as well as within the "Marketing & Growth" category filter.
  - Updated dynamic sitemap (`src/app/sitemap.ts`) to include `/tools` directory index and all 22 tool routes.
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 256 production routes via `npm run build`.

## [2026-09-20] - Sprint 17: SEO Title Re-Alignment, GA4 UTM Guide, Twitter Card FAQs & Internal PageRank Mesh
### Added
- **Metadata & Heading Re-Alignment:**
  - Updated Campaign UTM Builder (`/tools/marketing/utm-campaign-builder` & `/tools/utm-campaign-builder`):
    - `title`: `"Campaign UTM Builder & Google Analytics URL Generator | OmniSEO"`
    - `description`: `"Free zero-latency Campaign URL builder for Google Analytics 4 (GA4). Generate trackable campaign links with utm_source, utm_medium, utm_campaign, and custom parameters."`
    - `keywords`: `["utm builder", "campaign url builder", "google analytics campaign url builder", "ga4 url builder", "campaign utm builder", "utm link generator"]`
    - `H1`: `"Campaign UTM Builder & Google Analytics URL Generator"`
  - Updated Twitter Card Previewer (`/tools/twitter-card-preview`):
    - `title`: `"Twitter Card Preview & Validator (Summary & Large Image) | OmniSEO"`
    - `description`: `"Test, validate, and preview your Twitter Card tags in real time. Inspect summary, summary_large_image, image aspect ratios, and export clean framework metadata."`
    - `keywords`: `["twitter card preview", "twitter preview card", "twitter card validator", "twitter card generator", "twitter meta tags"]`
    - `H1`: `"Twitter Card Preview & Validator"`
  - Updated Google SERP Simulator (`/tools/google-serp-simulator` & `/tools/seo/serp-preview`):
    - `title`: `"Google SERP Simulator & Snippet Optimizer Tool | OmniSEO"`
    - `description`: `"Simulate Google Search desktop and mobile SERP results. Test pixel widths, title cutoffs, and meta descriptions before deploying."`
    - `keywords`: `["serp simulator", "google serp simulator", "serp preview tool", "search snippet preview"]`
    - `H1`: `"Google SERP Simulator & Snippet Optimizer Tool"`
- **High-Intent Technical Editorial Content & Schema.org FAQPage:**
  - Expanded UTM Builder with GA4 campaign parameter breakdowns (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `utm_source_platform`), GA4 Default Channel Grouping matrices, and best practice rules.
  - Added Schema.org `FAQPage` structured data scripts and interactive FAQ accordions answering core user search queries (campaign URL builder definition, GA4 recording mechanics, safe link shortening).
  - Added Twitter Card deep dive guide explaining `summary` vs `summary_large_image` aspect ratios and Twitter crawler cache-busting mechanics with Schema.org `FAQPage` structured data.
- **Lateral Internal Link Mesh & PageRank Flow:**
  - Injected contextual cross-linking callout banners below output links in UTM Builder linking to Twitter Card Previewer (`/tools/twitter-card-preview`) and Google SERP Simulator (`/tools/google-serp-simulator`).
  - Added subtle attribution helpers linking to Campaign UTM Builder (`/tools/marketing/utm-campaign-builder`) below Canonical URL fields in `SocialPreviewer.tsx` and `MetaTagGenerator.tsx`.
  - Injected cross-linking cards linking to Meta Tag Generator (`/tools/open-graph-meta-generator`) and Twitter Card Previewer (`/tools/twitter-card-preview`) inside SERP Simulator.
  - Added explicit, direct anchor links for "Campaign UTM Builder", "Twitter Card Preview", and "SERP Simulator" across global Footer directory and Header Quick Tools navigation.
  - Configured permanent 301 redirects in `next.config.mjs` for alias routes (`/tools/utm-builder`, `/tools/campaign-utm-builder`, `/tools/twitter-card-previewer`, `/tools/serp-simulator`).
- **Build Verification:**
  - Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 255 production routes via `npm run build`.

## [2026-09-20] - Sprint 16: Local Image Upload Dropzone & Client-Side 1200x630 WebP Converter
### Added
- Extended `src/lib/image-resizer.ts`:
  - Implemented `processLocalImageFile`: Processes locally selected image files (PNG, JPG, WebP) 100% in-browser using HTML5 Canvas, centering and scaling to standard 1200x630 in `cover` mode.
  - Implemented client-side WebP encoding with PNG fallback and size reduction calculations (`savingsPercent`, `originalSize`, `optimizedSize`).
  - Added `formatBytes` utility for human-readable file size formatting (e.g. 1.8 MB → 142 KB).
- Injected Local Image Upload Dropzone across:
  - `src/components/tools/social/SocialPreviewer.tsx`
  - `src/components/tools/developer/MetaTagGenerator.tsx`
- Added intuitive `[ Enter URL ]` / `[ 📁 Upload File ]` segmented tab toggles.
- Implemented drag-and-drop file dropzone with active dragging indicators, file picker triggers, and real-time preview updates across Twitter, Facebook, LinkedIn, and Discord mockups.
- Added optimization metrics badges displaying size reduction savings and 1-click **Download WebP (1200x630)** actions with zero server storage overhead.
- Cleanly mapped code export tabs (HTML, Next.js, Astro, SvelteKit, Shopify Liquid) to `/assets/og-image.webp` for local image assets.
- Verified 0 TypeScript compilation errors and clean static generation across all 245 production routes via `npm run build`.

## [2026-09-20] - Sprint 15.1: CORS-Bypassing Social Image Cropper with Edge Proxy Fallback
### Added
- Created `src/app/api/proxy-image/route.ts`:
  - Secure Edge/Node image proxy route handler accepting `GET /api/proxy-image?url=<target_url>`.
  - Comprehensive SSRF protection blocking localhost, cloud metadata addresses (`169.254.169.254`), and private IPv4/IPv6 CIDR ranges.
  - Strict 8-second fetch timeout (`AbortSignal.timeout(8000)`), content-type verification (`image/*`), and binary arrayBuffer streaming.
  - Returns open CORS headers (`Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, OPTIONS`) and 1-hour cache control.
- Updated `src/lib/image-resizer.ts`:
  - Implemented 2-tier resilient image loading in `cropAndScaleToSocialStandard`: attempts direct client-side load first, and automatically falls back to `/api/proxy-image` whenever remote CORS policies prevent direct canvas pixel reading or trigger `SecurityError` canvas tainting.
  - Guarantees 100% crop success for external social images hosted on WordPress, Squarespace, and private CDNs without open CORS headers.
- Verified 0 TypeScript compilation errors and clean static generation across all 245 production routes via `npm run build`.

## [2026-09-20] - Sprint 15: Client-Side Social Image Resizer & Standard 1200x630 Cropper
### Added
- Created `src/lib/image-resizer.ts`:
  - Zero-latency, 100% client-side image cropping and scaling utility using an off-screen HTML5 canvas (`targetWidth = 1200`, `targetHeight = 630`).
  - Implemented `cropAndScaleToSocialStandard`: Computes center crop aspect ratio scaling in `cover` mode, enables high-quality smoothing (`imageSmoothingQuality = 'high'`), exports PNG data URLs, and creates downloadable Blobs.
  - Implemented `downloadBlob`: Provides clean 1-click client-side file downloads with automated object URL revocation.
  - Added robust SSR safety guards and graceful CORS / `SecurityError` exception handling with user-friendly error guidance.
- Integrated Inline 1200x630 Fixer Action into:
  - `src/components/tools/social/SocialPreviewer.tsx`
  - `src/components/tools/developer/MetaTagGenerator.tsx`
- Injected compact **⚡ Fix to 1200x630 (Cover)** action buttons directly beside aspect ratio warning feedback badges (`Non-standard ratio`, `Low resolution`, `Suboptimal`).
- Provided automatic 1-click retina standard PNG downloads (`og-image-1200x630.png`), loading spinner feedback (`Cropping...`), and non-intrusive status toasts.
- Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 245 production routes via `npm run build`.

## [2026-09-20] - Sprint 14: Client-Side URL Permalinks & Preview Sharing
### Added
- Created `src/lib/url-state.ts`:
  - Zero-latency client-side state serialization library compressing active metadata form inputs into URL hash fragments (`#s=...`).
  - Implemented `ShareableMetaState` interface covering `title`, `description`, `url`, `image`, `siteName`, `twitterHandle`, `cardType`, and `theme`.
  - Built `encodeStateToHash`: Strips empty fields, trims values, and encodes JSON payloads with UTF-8 safe base64 (`btoa(encodeURIComponent(json))`) ensuring non-ASCII characters, emojis, quotes, and international text never cause DOMException errors.
  - Built `decodeStateFromHash`: Safely extracts and decodes `#s=...` payloads (`decodeURIComponent(atob(payload))`) with full SSR safety and corrupted hash fallbacks.
- Integrated URL state hydration and permalink sharing into:
  - `src/components/tools/social/SocialPreviewer.tsx`
  - `src/components/tools/developer/MetaTagGenerator.tsx`
- Added **Share Preview** action buttons beside "Clear Fields" in tool preset bars with 1-click clipboard URL copying, instant visual feedback (`Link Copied!`), and seamless address bar hash updates via `window.history.replaceState` (0 page reloads, 0 layout shifts, 0 database storage).
- Verified full automatic state restoration on page load, updating live social card previews and multi-framework code export tabs (HTML, Next.js, Astro, SvelteKit, Shopify Liquid).
- Verified 0 TypeScript compilation errors and 100% clean SSG generation across all 245 production routes.

## [2026-09-20] - Sprint 13: 1-Click Social Mockup PNG Export
### Added
- Integrated `html-to-image` for high-resolution client-side PNG exports of live social card previews.
- Added `mockupRef` and 1-click **Download Mockup (PNG)** action button beside the platform selector tabs in `src/components/tools/social/SocialPreviewer.tsx`.
- Implemented crisp `@2x` retina scaling (`pixelRatio: 2`, `quality: 0.95`, `cacheBust: true`) exporting cleanly formatted filenames (`${platform}-preview-${Date.now()}.png`).
- Included dynamic SSR-safe import, interactive spinner state (`Loader2`), and automatic toast confirmation.
- Verified 0 TypeScript errors and full SSG compilation across all 245 production routes via `npm run build`.

## [2026-09-20] - Sprint 12: Live URL Metadata Fetcher & Auto-Fill
### Added
- Created `src/app/api/scrape-meta/route.ts`:
  - Secure Edge/Serverless Route Handler accepting `GET /api/scrape-meta?url=<target_url>`.
  - Comprehensive SSRF protection blocking localhost, link-local metadata addresses (`169.254.169.254`), and private IPv4/IPv6 CIDR ranges.
  - Strict 5-second fetch timeout budget via `AbortSignal.timeout(5000)` and 500KB response truncation guard.
  - Robust regex HTML entity decoder and metadata extractor resolving `<title>`, `og:title`, `og:description`, `og:image`, `og:site_name`, `canonical`, and `twitter:*` tags with relative URL normalization.
- Injected Live URL Inspection & Auto-Fill input bars across:
  - `src/components/tools/developer/MetaTagGenerator.tsx`
  - `src/components/tools/social/SocialPreviewer.tsx`
- Added responsive loading states (`Loader2`), inline error toasts, and success notices with automatic form state population.
- Verified clean build and full static generation across all 245 production routes with 0 errors.

## [2026-09-20] - Sprint 11: Astro & SvelteKit Code Export Expansion
### Added
- Expanded `src/lib/formatters/metaFormatters.ts` with dedicated Astro and SvelteKit formatters:
  1. `toAstroSnippet(data, options)`: Generates Astro component head meta snippets using `{JSON.stringify(...)}` expression wrappers to eliminate quoting collisions and JSX syntax errors.
  2. `toSvelteKitSnippet(data, options)`: Formats meta and social card tags wrapped within `<svelte:head>` blocks with HTML entity escaping.
- Updated `src/lib/snippet-attribution.ts` to include `astro`, `svelte`, and `sveltekit` in language attribution types.
- Upgraded responsive tab selectors across `MetaTagGenerator.tsx` and `SocialPreviewer.tsx` to `[ HTML ] [ Next.js ] [ Astro ] [ SvelteKit ] [ Shopify Liquid ]` with horizontal scroll wrappers (`overflow-x-auto no-scrollbar`).
- Verified zero TypeScript compilation errors and successful SSG prerendering across all 245 routes.

## [2026-09-19] - Sprint 10: Multi-Framework Code Export Tab (HTML / Next.js / Shopify Liquid)
### Added
- Created `src/lib/formatters/metaFormatters.ts`: Pure formatter utility functions transforming form state data into:
  1. `toHtml(data, options)`: Standard HTML5 meta, OG, Twitter, and canonical tags with full entity escaping and deprecated `<meta name="title">` removal.
  2. `toNextJsMetadata(data, options)`: Type-safe, idiomatic Next.js App Router `Metadata` object exports with strict string literal escaping and clean syntax.
  3. `toLiquidSnippet(data, options)`: Shopify theme-ready Liquid snippets utilizing native `{{ page_title }}`, `{{ page_description }}`, `{{ canonical_url }}`, `{{ shop.name }}`, and strictly enforced `https:` image assets without dead elsif branches.
  - Automatically attaches framework-appropriate attribution comments (`<!-- -->`, `//`, `{% comment %}`) on clipboard copy while keeping in-app UI code boxes clean.
- Added segmented framework export toggles `[ HTML ] [ Next.js App Router ] [ Shopify Liquid ]` across:
  - `src/components/tools/developer/MetaTagGenerator.tsx`
  - `src/components/tools/social/SocialPreviewer.tsx`
- Verified dynamic code generation, reactive state synchronization, and clean SSG compilation across all 245 production routes.

## [2026-09-18] - Sprint 9: Automated Code Snippet Attribution & Embed Widget Engine
### Added
- Created `src/lib/snippet-attribution.ts`: Centralized attribution and embed helper appending developer-standard attribution headers (`<!-- Generated by OmniSEO Tools (https://omniseotools.com/tools/[slug]) -->`) across copied HTML, Next.js, Liquid, and JSX snippets. Automatically maps to exact canonical permutation URLs (`/tools/[slug]/[platformSlug]`).
- Created `src/components/tools/EmbedToolModal.tsx`: High-converting, responsive modal widget with 1-click iframe code copying, custom height controls (500px/600px/700px), and live interactive preview mode.
- Injected "Embed on Your Site" action buttons across:
  - `DynamicToolGenerator.tsx` (all programmatic utilities)
  - `SocialPreviewer.tsx` (Twitter, LinkedIn, Facebook, Discord card previewers)
  - `SERPPreviewer.tsx` (SERP simulators & pixel checkers)
  - `MetaTagGenerator.tsx` (Open Graph & Meta Tag Generator)
  - `PlatformCodeBlock.tsx` (Platform integration guides)
- Created dedicated minimal embed route `src/app/embed/[slug]/page.tsx`:
  - SSG prerendered across all 20 active programmatic tools.
  - Isolated from site header, footer, navigation, and comparison matrix via Next.js App Router `(site)` route group architecture.
  - Integrated unobtrusive backlink badge ("Free utility powered by OmniSEO Tools") to drive viral organic developer distribution and SEO backlinks.

## [2026-09-18] - Sprint 8: High-Converting Feature Comparison Matrix
### Added
- Created `src/components/seo/ComparisonMatrix.tsx`: High-converting, responsive comparison table benchmarking OmniSEO Tools against traditional heavy SaaS audit suites across 5 key dimensions:
  1. Execution Architecture: Server-side queues (5–15s delay) vs. 100% Client-Side / Edge (0ms queue).
  2. Privacy & Data Storage: Database logging of queries/drafts vs. 100% in-browser client-side privacy.
  3. Account Requirements: Mandatory paywalls & email capture vs. zero login, 100% free access.
  4. Code Snippets & Export: Generic code suggestions vs. instant 1-click platform-tailored exports (HTML5, Next.js, Liquid, JSX).
  5. Core Web Vitals Impact: Heavy dashboard tracking bloat vs. ultra-lightweight edge performance with 0 layout shift.
- Injected `<ComparisonMatrix />` across:
  - Standalone tool pages (`/tools/[slug]`)
  - Programmatic platform permutations (`/tools/[slug]/[platformSlug]`) with platform-specific export highlights.

## [2026-09-18] - Sprint 7: Dynamic Social Share Images (Edge ImageResponse / @vercel/og)
### Added
- Created `src/app/tools/[slug]/opengraph-image.tsx`: Dynamic Edge runtime `ImageResponse` generator rendering high-contrast 1200x630 branded developer cards with tool titles, resolved category pills, status badges, and value proposition tags.
- Created `src/app/tools/[slug]/[platformSlug]/opengraph-image.tsx`: Edge-rendered programmatic permutation share cards featuring dual-badge layouts, platform pills (Shopify, WordPress, Next.js, Webflow, etc.), tailored taglines, and copyable snippet hints.
- Enabled automatic Open Graph and Twitter Card image metadata resolution across all 20 standalone tools and 160 platform permutations without hardcoded URL conflicts.

### Fixed
- Resolved 404 routing error on homepage tool directory: replaced legacy category-nested links (`/tools/${tool.category}/${tool.slug}`) with canonical `/tools/${tool.slug}` routes matching `src/app/tools/[slug]/page.tsx`.
- Updated desktop and mobile Header CTA links to canonical `/tools/google-serp-simulator`.
- Fixed 500 runtime errors in Satori / `@vercel/og` Edge ImageResponse: eliminated `width: "fit-content"` and unit-based `zIndex` styles in favor of strict Satori inline CSS flex layouts (`alignSelf: 'flex-start'`, integer padding, and linear gradients).
- Verified `generateMetadata` across `/tools/[slug]` and `/tools/[slug]/[platformSlug]` leaves image metadata open for automatic colocated `opengraph-image.tsx` inheritance.

## [2026-09-17] - Sprint 6: Programmatic Rich Snippets (Schema.org JSON-LD Structured Data)
### Added
- Created `src/components/seo/JsonLd.tsx`: Server component for clean `<script type="application/ld+json">` injection with composite array support.
- Built `src/lib/schema-generator.ts` with typed schema generation helpers:
  - `generateToolSchema`: Produces Schema.org `WebApplication` rich snippets with category, pricing offer ($0 USD), and operating system metadata.
  - `generateBreadcrumbSchema`: Generates valid `BreadcrumbList` schemas with 1-based indexing for hierarchical navigational paths.
  - `generateFAQSchema`: Generates `FAQPage` schemas from dynamic platform FAQs for expanded search SERP real estate.
- Injected composite structured data across:
  - Standalone tool pages (`/tools/[slug]`): `WebApplication` + `BreadcrumbList` + `FAQPage`
  - Programmatic tool permutations (`/tools/[slug]/[platformSlug]`): `WebApplication` (platform-customized) + `BreadcrumbList` + `FAQPage`
  - Platform hubs (`/platforms/[platformSlug]`): `BreadcrumbList` + `FAQPage`

## [2026-09-17] - Sprint 5: Programmatic Expansion (20 Core Utilities & 160 Permutations)
### Added
- Scaled `TOOLS_REGISTRY` in `src/config/tools-registry.ts` from 10 to 20 active developer & SEO utilities:
  - `schema-markup-generator` (Technical SEO)
  - `canonical-tag-generator` (Technical SEO)
  - `meta-viewport-generator` (Web & Developer)
  - `hreflang-tag-generator` (International SEO)
  - `meta-robots-builder` (Technical SEO)
  - `security-headers-meta-generator` (Web & Developer)
  - `social-share-link-generator` (Social Media)
  - `breadcrumb-schema-generator` (Technical SEO)
  - `faq-schema-generator` (Technical SEO)
  - `favicon-meta-generator` (Web & Developer)
- Created `DynamicToolGenerator.tsx` with dynamic form state management, preset switchers, live HTML/Next.js/Platform code generation, and 1-click clipboard copying.
- Extended `CATEGORIES` and `ToolCategoryId` to natively support `international`, `technical`, and `serp` categories.
- Scaled dynamic sitemap (`src/app/sitemap.ts`) to index 193+ canonical URLs (20 standalone tools + 160 programmatic tool x platform permutations + 9 platform hubs + legal pages).

## [2026-09-17] - Sprint 4: Monetization Scaffolding & Topical Clusters
### Added
- Created `src/components/platform/PlatformAffiliateCard.tsx` with sponsor badge and safety tags (`rel="nofollow sponsored"`).
- Extended `Platform` interface with `affiliateSlot` for zero-CLS monetization placeholders.
- Created `/platforms` directory index and dedicated `/platforms/[platformSlug]` topical hubs.
- Added 8 platform hubs to dynamic sitemap (total indexed: 103 URLs).

### Fixed
- Restored Tailwind CSS cache issue after route restructuring.
- Connected broken `/platforms` breadcrumbs across all tool child views.