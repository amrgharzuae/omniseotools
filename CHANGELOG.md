# Changelog

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