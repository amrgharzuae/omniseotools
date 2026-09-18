# Changelog

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