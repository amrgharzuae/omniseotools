# OmniSEOTools - Project Constitution & Architectural Guidelines

> **Project Name**: OmniSEOTools  
> **Mission**: High-performance, modular web app suite delivering free, high-utility tools for SEO specialists, marketers, developers, and creators.  
> **Monetization**: Google AdSense with high-CTR, zero-CLS pre-reserved placements and 100% compliance with Google Publisher Policies.  
> **Organic Growth**: Programmatic SEO architecture, rich technical guides (anti-thin content), dynamic JSON-LD schemas (SoftwareApplication, FAQPage, HowTo, BreadcrumbList), and fast Core Web Vitals.

---

## 1. Core Architectural Directives

1. **Strict Modularity via Tool Registry Pattern**:
   - Never create one-off, unstandardized pages for new tools.
   - Every tool must be defined as an entry in `src/config/tools/` adhering to the `ToolDefinition` TypeScript interface.
   - All tools are rendered through the universal dynamic page route `src/app/tools/[category]/[slug]/page.tsx` or specialized category hubs.

2. **No Monolithic Generations (Block-by-Block Protocol)**:
   - When building features or adding tools, develop strictly **one tool or one module per prompt**.
   - Always define types and calculation logic first, then interactive client widgets, then editorial content & FAQs.

3. **Anti-Thin Content Law (AdSense & Search Quality)**:
   - Google rejects utility tools that offer only an input box and button as "Thin Content / Low Value Inventory".
   - Every tool page MUST include the **4-Pillar Page Structure**:
     1. **Interactive Tool Hero**: Instant value above the fold with clean feedback.
     2. **AdSlot Container #1**: Pre-reserved zero-CLS ad container.
     3. **In-Depth Technical Guide**: 600–1,200 words explaining the mechanics, formulas, optimal limits, best practices, and real-world scenarios.
     4. **FAQ Accordion & JSON-LD Schema**: 4–8 targeted user questions with structured data.

4. **Zero-CLS AdSense Compliance**:
   - Ads must NEVER cause layout shifts. All ad units must be wrapped in `AdSlot` components with explicit min-height / aspect-ratio containers and subtle skeleton loading states.
   - Ads must never overlap with interactive inputs or confuse users with fake navigation buttons.

---

## 2. Tech Stack & Engineering Standards

- **Framework**: Next.js 14+ / 15 (App Router, Server Components by default, Client Components with `"use client"` only for interactive widgets).
- **Language**: TypeScript in strict mode.
- **Styling**: Tailwind CSS with clear, high-contrast dark/light modern utility theme.
- **Icons**: Lucide React.
- **State & URL Syncing**: For shareable results (e.g. SERP preview share links), tools should sync non-sensitive state into URL search params where appropriate.

---

## 3. Directory Layout

```
src/
├── app/
│   ├── layout.tsx                # Root layout with SEO meta & AdSense script loader
│   ├── page.tsx                  # High-converting homepage & tool directory
│   ├── sitemap.ts                # Dynamic XML sitemap generator
│   ├── robots.ts                 # Robots.txt configuration
│   ├── privacy/                  # AdSense-required Privacy Policy
│   ├── terms/                    # Terms of Service
│   └── tools/
│       └── [category]/
│           └── [slug]/           # Dynamic Tool Engine Page
├── components/
│   ├── ads/
│   │   └── AdSlot.tsx            # Zero-CLS Ad container (Mock in dev, live in prod)
│   ├── layout/
│   │   ├── Header.tsx            # Sticky navigation with search
│   │   └── Footer.tsx            # SEO-rich footer with internal link silos
│   ├── seo/
│   │   └── StructuredData.tsx    # Programmatic JSON-LD injector
│   ├── tool-layout/
│   │   ├── ToolHeader.tsx        # Breadcrumb, title, badges, description
│   │   ├── ToolGuide.tsx         # Educational content renderer
│   │   └── ToolFAQ.tsx           # Interactive FAQ accordion
│   └── ui/                       # Atomic UI elements (Button, Input, Card, Badge)
├── config/
│   ├── site.ts                   # Site metadata & navigation
│   ├── categories.ts             # Categories taxonomy (SEO, Marketing, Dev, etc.)
│   ├── ads.ts                    # AdSlot placement definitions & dimensions
│   └── tools/
│       ├── registry.ts           # Central manifest & query methods
│       └── [category]/           # Individual tool definitions
└── types/
    ├── tool.ts                   # ToolDefinition interface
    └── category.ts               # Category taxonomy interface
```

---

## 4. AdSlot Layout Standard

Supported Ad Types:
- `leaderboard`: `728x90` (Desktop), `320x50` (Mobile), container `min-h-[90px]`.
- `large-rectangle`: `336x280` or `300x250`, container `min-h-[280px]`.
- `in-feed`: Responsive horizontal card between content blocks, `min-h-[120px]`.
- `sidebar`: `300x600` half-page or `300x250` sticky rail.
