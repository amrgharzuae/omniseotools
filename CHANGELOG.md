# Changelog

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