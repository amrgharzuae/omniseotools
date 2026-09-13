# omniseo-core 🚀

> **Lightweight, zero-dependency client-side utility for SERP pixel measurements, Open Graph tag generation, and Flesch-Kincaid readability scoring.**

[![npm version](https://img.shields.io/npm/v/omniseo-core.svg?style=flat-square)](https://www.npmjs.com/package/omniseo-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success?style=flat-square)]()

---

> Try the live browser tool: [OmniSEO Tools](https://omniseotools.com)  
> Test social cards: [Twitter Card Previewer](https://omniseotools.com/tools/twitter-card-preview)  
> Test SERP widths: [Google SERP Pixel Ruler](https://omniseotools.com/tools/meta-title-pixel-checker)

---

## 📦 Installation

```bash
npm install omniseo-core
```

Or with yarn / pnpm:

```bash
yarn add omniseo-core
# or
pnpm add omniseo-core
```

---

## ✨ Features

- 📏 **Exact Google SERP Pixel Calculation**: Measure title and description widths using accurate 20px Arial and 14px Arial proportional typography matrices.
- ✂️ **Smart Pixel Truncation**: Truncate titles and descriptions cleanly to exact pixel limits (e.g., 580px / 600px desktop & mobile thresholds).
- 🎯 **SEO & CTR Scoring Engine**: Grade titles and snippets with instant heuristic recommendations for maximum search CTR.
- 📖 **Flesch-Kincaid Readability**: Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, syllable counts, reading time, and speaking time with zero dependencies.
- 🏷️ **Open Graph & Twitter Card Generators**: Generate standards-compliant `<meta>` tags and Next.js `Metadata` objects.
- ⚡ **Pure TypeScript & Zero Dependencies**: 100% client-side compatible, runs seamlessly in Node.js, browsers, Edge workers, and React / Next.js / Vue / Svelte.

---

## 🚀 Quick Start & Code Examples

### 1. SERP Pixel Measurement & Truncation

Google search results truncate titles by **pixel width** (around 580px–600px) rather than arbitrary character counts. `omniseo-core` uses Google's exact proportional letter-spacing matrix:

```typescript
import {
  calculateTitlePixels,
  calculateDescPixels,
  truncateToPixels,
  SERP_LIMITS,
} from "omniseo-core";

const title = "OmniSEO Tools — Free High-Performance SEO & Marketing Utilities";
const description = "Simulate SERPs, preview social cards, and calculate readability scores with zero latency.";

// 1. Calculate pixel widths
const titleWidth = calculateTitlePixels(title);
console.log(`Title width: ${titleWidth}px / ${SERP_LIMITS.desktopTitlePx}px max`);
// Output: Title width: 564px / 600px max

const descWidth = calculateDescPixels(description);
console.log(`Description width: ${descWidth}px / ${SERP_LIMITS.desktopDescPx}px max`);
// Output: Description width: 624px / 960px max

// 2. Truncate cleanly to custom or standard pixel limits
const truncated = truncateToPixels(
  "This is an exceptionally long meta title designed to test Google SERP pixel truncation accurately",
  580, // Target max width in pixels
  true // isTitle (uses 20px Arial font metrics)
);

console.log(truncated.text);
// "This is an exceptionally long meta title designed to test Google SERP ..."
console.log(truncated.truncated);
// true
```

---

### 2. CTR Quality Analysis & Snippet Optimization

Analyze SEO titles and descriptions to get an estimated click-through score (0–100) and actionable tips:

```typescript
import { analyzeCtr } from "omniseo-core";

const analysis = analyzeCtr(
  "10 Best SEO Audit Tools for 2026 (Free & Fast) | OmniSEO",
  "Discover the top free SEO audit tools to boost organic search rankings and fix technical errors. Try our instant analyzers today."
);

console.log(`CTR Score: ${analysis.score}/100 (${analysis.grade})`);
// CTR Score: 100/100 (Excellent)

analysis.tips.forEach((tip) => {
  console.log(`[${tip.passed ? "✓" : "✗"}] (${tip.impact} impact) ${tip.text}`);
});
```

---

### 3. Flesch-Kincaid Readability & Reading Time

Compute reading ease, US school grade levels, syllable statistics, and estimated reading/speaking times:

```typescript
import {
  calculateReadability,
  getFleschReadingEase,
  getFleschKincaidGrade,
  getReadabilityEaseBand,
} from "omniseo-core";

const article = `Search engine optimization helps your website rank higher on Google search results. When you optimize your web pages, more prospective customers discover your products. Focus on clear language and easy-to-read sentences to keep visitors engaged on your site.`;

// Full analysis
const metrics = calculateReadability(article);

console.log(`Words: ${metrics.wordCount}`);
console.log(`Sentences: ${metrics.sentenceCount}`);
console.log(`Flesch Reading Ease: ${metrics.fleschReadingEase}`); // e.g. 64.2
console.log(`Flesch-Kincaid Grade: Grade ${metrics.fleschKincaidGrade}`); // e.g. Grade 8.1
console.log(`Reading Time: ~${metrics.readingTimeMin} min`);
console.log(`Speaking Time: ~${metrics.speakingTimeMin} min`);

// Get human-friendly grade bands
const band = getReadabilityEaseBand(metrics.fleschReadingEase);
console.log(band.label); // "Standard / Ideal SEO"
console.log(band.target); // "8th–9th Grade (Best for Web)"
```

---

### 4. Open Graph & Social Card Tag Generation

Generate complete, production-ready HTML meta tags or Next.js App Router metadata configuration:

```typescript
import {
  generateOpenGraphHtml,
  generateTwitterCardHtml,
  generateFullMetaTagsHtml,
  generateNextJsMetadataCode,
} from "omniseo-core";

const metaConfig = {
  title: "OmniSEO Tools — Developer-Grade SEO Utilities",
  description: "Free client-side SERP simulators, meta tag generators, and readability checkers.",
  url: "https://omniseotools.com",
  siteName: "OmniSEO Tools",
  imageUrl: "https://omniseotools.com/og-image.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterHandle: "@omniseotools",
  robots: "index, follow",
};

// 1. Generate full HTML tags
const htmlTags = generateFullMetaTagsHtml(metaConfig);
console.log(htmlTags);

// 2. Generate Next.js App Router metadata snippet
const nextJsCode = generateNextJsMetadataCode(metaConfig);
console.log(nextJsCode);
```

---

## 📚 API Reference

### SERP Functions
- `calculateTitlePixels(text: string): number`
- `calculateDescPixels(text: string): number`
- `truncateToPixels(text: string, maxPx: number, isTitle?: boolean): { text: string; truncated: boolean }`
- `analyzeCtr(title: string, description: string): CtrAnalysis`
- `generateMetaHtml(title: string, description: string, canonicalUrl: string): string`
- `SERP_LIMITS`: Constants for desktop/mobile title and description limits.

### Readability Functions
- `calculateReadability(text: string): ReadabilityMetrics`
- `getFleschReadingEase(text: string): number`
- `getFleschKincaidGrade(text: string): number`
- `getReadabilityEaseBand(score: number): ReadabilityEaseBand`
- `countWordSyllables(word: string): number`
- `calculateReadingTime(wordCount: number, wordsPerMinute?: number): number`
- `calculateSpeakingTime(wordCount: number, wordsPerMinute?: number): number`

### Open Graph Functions
- `generateOpenGraphHtml(options: OpenGraphMetaOptions): string`
- `generateTwitterCardHtml(options: OpenGraphMetaOptions): string`
- `generateFullMetaTagsHtml(options: OpenGraphMetaOptions): string`
- `generateNextJsMetadataCode(options: OpenGraphMetaOptions): string`

---

## 🔗 Useful Links & Interactive Tools

> Try the live browser tool: [OmniSEO Tools](https://omniseotools.com)  
> Test social cards: [Twitter Card Previewer](https://omniseotools.com/tools/twitter-card-preview)  
> Test SERP widths: [Google SERP Pixel Ruler](https://omniseotools.com/tools/meta-title-pixel-checker)

---

## 📄 License

[MIT](LICENSE) © [OmniSEO Tools](https://omniseotools.com)
