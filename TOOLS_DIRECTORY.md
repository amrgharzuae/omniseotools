# OmniSEO Tools Directory (Single Source of Truth)

**Total Active Tools: 29**

> This document serves as the canonical registry and single source of truth for all active tools deployed on the OmniSEO Tools platform. All routing, navigation, programmatic permutations, and sitemaps derive from these tool definitions.

---

## Active Tools Registry

| # | Tool Name | ID / Slug | Route | Category | Status |
|---|---|---|---|---|---|
| 01 | Twitter Card Previewer | `twitter-card-preview` | `/tools/twitter-card-preview` | Social Media | Live / Production |
| 02 | LinkedIn Link Previewer | `linkedin-link-preview` | `/tools/linkedin-link-preview` | Social Media | Live / Production |
| 03 | Facebook Open Graph Debugger | `facebook-open-graph-debugger` | `/tools/facebook-open-graph-debugger` | Social Media | Live / Production |
| 04 | Discord Embed Generator | `discord-embed-generator` | `/tools/discord-embed-generator` | Social Media | Live / Production |
| 05 | Meta Title Pixel Checker | `meta-title-pixel-checker` | `/tools/meta-title-pixel-checker` | SERP & Snippets | Live / Production |
| 06 | Meta Description Length Counter | `meta-description-length-counter` | `/tools/meta-description-length-counter` | SERP & Snippets | Live / Production |
| 07 | Google SERP Simulator | `google-serp-simulator` | `/tools/google-serp-simulator` | SERP & Snippets | Live / Production |
| 08 | Flesch-Kincaid Calculator | `flesch-kincaid-calculator` | `/tools/flesch-kincaid-calculator` | Content & Copy | Live / Production |
| 09 | Keyword Density Checker | `keyword-density-checker` | `/tools/keyword-density-checker` | Content & Copy | Live / Production |
| 10 | Open Graph Meta Tag Generator | `open-graph-meta-generator` | `/tools/open-graph-meta-generator` | Technical SEO | Live / Production |
| 11 | Schema Markup Generator | `schema-markup-generator` | `/tools/schema-markup-generator` | Technical SEO | Live / Production |
| 12 | Canonical URL Builder | `canonical-url-builder` | `/tools/canonical-url-builder` | Technical SEO | Live / Production |
| 13 | Meta Viewport Generator | `meta-viewport-generator` | `/tools/meta-viewport-generator` | Web & Developer | Live / Production |
| 14 | Hreflang Tag Generator | `hreflang-tag-generator` | `/tools/hreflang-tag-generator` | International SEO | Live / Production |
| 15 | Meta Robots Tag Builder | `meta-robots-builder` | `/tools/meta-robots-builder` | Technical SEO | Live / Production |
| 16 | Security Headers Meta Generator | `security-headers-meta-generator` | `/tools/security-headers-meta-generator` | Web & Developer | Live / Production |
| 17 | Social Share Link Generator | `social-share-link-generator` | `/tools/social-share-link-generator` | Social Media | Live / Production |
| 18 | Breadcrumb Schema Generator | `breadcrumb-schema-generator` | `/tools/breadcrumb-schema-generator` | Technical SEO | Live / Production |
| 19 | FAQ Schema Generator | `faq-schema-generator` | `/tools/faq-schema-generator` | Technical SEO | Live / Production |
| 20 | Favicon & App Icon Generator | `favicon-meta-generator` | `/tools/favicon-meta-generator` | Web & Developer | Live / Production |
| 21 | Social Meta & OpenGraph Card Simulator | `open-graph-preview` | `/tools/open-graph-preview` | Social Media | Live / Production |
| 22 | Campaign UTM Builder | `utm-campaign-builder` | `/tools/utm-campaign-builder` | Marketing & Growth | Live / Production |
| 23 | Arabic & UTF-8 URL Decoder | `arabic-url-decoder` | `/tools/arabic-url-decoder` | Marketing & Growth | Live / Production |
| 24 | Hreflang & Multi-Language Tag Generator | `hreflang-tags-generator` | `/tools/hreflang-tags-generator` | International SEO | Live / Production |
| 25 | Robots.txt Generator & Validator | `robots-txt-generator-validator` | `/tools/robots-txt-generator-validator` | Technical SEO | Live / Production |
| 26 | Article & BlogPosting Schema Generator | `article-schema-generator` | `/tools/article-schema-generator` | Technical SEO | Live / Production |
| 27 | Bulk Canonical URL Normalizer & Auditor | `canonical-tag-generator` | `/tools/canonical-tag-generator` | Technical SEO | Live / Production |
| 28 | XML Sitemap Generator & Validator | `xml-sitemap-generator` | `/tools/xml-sitemap-generator` | Technical SEO | Live / Production |
| 29 | Redirect Rule & Regex Mapper | `redirect-rule-generator` | `/tools/redirect-rule-generator` | Technical SEO | Live / Production |

---

## Category Distribution

| Category | Active Tools | Share |
|---|---|---|
| Technical SEO | 10 | 34.5% |
| Social Media | 5 | 17.2% |
| Web & Developer | 3 | 10.3% |
| SERP & Snippets | 3 | 10.3% |
| Marketing & Growth | 2 | 6.9% |
| International SEO | 2 | 6.9% |
| Content & Copy | 2 | 6.9% |
| **Total** | **29** | **100%** |



---

## Rules for Future Tools

- **Rule 1: Always check this file before scaffolding to avoid duplicate intents.**  
  Before creating a new tool, inspect this directory to ensure the intended functionality and keyword targeting do not duplicate or cannibalize an existing tool. For instance, single-URL generators (e.g., `#12 Canonical URL Builder`) and bulk audit utilities (e.g., `#27 Bulk Canonical URL Normalizer & Auditor`) serve distinct user intents and must maintain clear differentiation.

- **Rule 2: Increment the counter and append the new entry whenever a new tool is deployed.**  
  When a new tool is registered in `src/config/tools-registry.ts` and its route is live:
  1. Increment `Total Active Tools: <N>` in the header.
  2. Append the new row with sequential number `(N+1)`, exact name, ID/slug, route, category, and production status.
  3. Update related counters in `PROJECT_STATUS.md`, `CHANGELOG.md`, and dynamic sitemaps.
