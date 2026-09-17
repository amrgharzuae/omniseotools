# OmniSEO Tools — Architecture & System Status

## 1. Core Architecture
- **Framework:** Next.js (App Router), Tailwind CSS, TypeScript.
- **Hosting:** Vercel (Canonical Apex: `https://omniseotools.com`).
- **Target URL Structure:**
  - Standard Tools: `/tools/[slug]`
  - Programmatic Permutations: `/tools/[slug]/[platformSlug]`
  - Platform Hubs: `/platforms/[platformSlug]`
  - Directory Index: `/platforms`
- **Structured Data (JSON-LD):** Programmatic injection of Schema.org `WebApplication`, `BreadcrumbList`, and `FAQPage` via `src/lib/schema-generator.ts` and `src/components/seo/JsonLd.tsx` across standalone tools, platform permutations, and hub routes.
- **Sitemap:** Dynamic (`src/app/sitemap.ts`) generating 193+ canonical apex URLs with proper priorities (20 core tools + 160 programmatic permutations + 9 platform hubs + legal pages).

## 2. Shared Libraries & Engine
- **Open-Source Engine:** Uses `@omniseo-core` (or `src/lib/core`) for underlying calculation logic (keyword density, SERP length calculators, meta tag validators, diacritic transliteration).
- **Dynamic Tool Generator Engine:** `DynamicToolGenerator.tsx` renders real-time interactive form controls, preset switchers, and platform snippet integrations for all programmatic tool utilities.
- **Analytics & Tracking:** `@next/third-parties` for GA4 integration. Zero layout shift tracking implementation.

## 3. Active Registries & Taxonomy
- `src/config/tools-registry.ts`: Single source of truth for 20 active SEO/Web utilities (Twitter Card Previewer, Open Graph Generator, Keyword Density Checker, SERP Previewer, Schema Markup Generator, Canonical Tag Generator, Meta Viewport Generator, Hreflang Tag Generator, Meta Robots Builder, Security Headers Generator, Social Share Link Generator, Breadcrumb Schema Generator, FAQ Schema Generator, Favicon Meta Generator, etc.). Defines slug, categories, sample presets, and metadata.
- `src/config/platforms-registry.ts`: 8 platform definitions (Shopify, WordPress, Next.js, Webflow, Squarespace, Wix, Ghost CMS, HTML/Tailwind) with Liquid/JS/HTML presets, code snippets, FAQs, and monetization slots.
- `src/types/platform.ts`: Strict TypeScript interfaces for platforms and affiliate slots.

## 4. Monetization Infrastructure
- **Display Ad Slots:** Responsive zero-CLS placeholder containers for top leaderboard ads (`728x90` / `320x50`).
- **Affiliate Engine:** Structured `affiliateSlot` components on programmatic pages with `isPlaceholder: true` and strict `rel="nofollow sponsored noopener noreferrer"` attributes.

## 5. Immutable Engineering Rules
- Always preserve `generateStaticParams()` and dynamic `generateMetadata()` on dynamic routes.
- Never hardcode affiliate destination links directly in UI components; always source through `platforms-registry.ts`.
- Maintain the bidirectional linking cluster: `Home` -> `Platforms` -> `[Platform Hub]` <-> `[Tool Permutation]`.
- All text processing tools must support bulk inputs and preserve diacritic transliteration handling.