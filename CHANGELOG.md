# Changelog

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