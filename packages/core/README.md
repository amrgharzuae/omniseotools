# omniseo-core

A lightweight, zero-dependency TypeScript engine powering technical SEO audits, schema generation, and metadata validation.

[![npm version](https://img.shields.io/npm/v/omniseo-core.svg)](https://www.npmjs.com/package/omniseo-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![SEO Audit Badge](https://omniseotools.com/api/badge?score=100&label=OmniSEO&theme=dark)](https://omniseotools.com)

---

## Interactive Dynamic Badges

Embed real-time SEO audit and verification badges into your own GitHub repositories:

[![OmniSEO Score](https://omniseotools.com/api/badge?score=100&label=SEO&theme=dark)](https://omniseotools.com/tools/google-serp-simulator)
[![OpenGraph Validated](https://omniseotools.com/api/badge?score=100&label=OpenGraph&theme=emerald)](https://omniseotools.com/tools/open-graph-meta-generator)

---

## Tool and Utility Matrix

Every utility in omniseo-core corresponds to a free, zero-server client tool hosted on OmniSEO Tools (https://omniseotools.com):

| Package Utility | Web GUI Tool Equivalent | Description |
| :--- | :--- | :--- |
| calculateTitlePixels() | [Google SERP Simulator](https://omniseotools.com/tools/google-serp-simulator) | Simulates Google mobile/desktop snippet pixel truncation. |
| generateOpenGraphHtml() | [Social Meta Card Simulator](https://omniseotools.com/tools/open-graph-meta-generator) | Generates and validates standard OpenGraph and Twitter tags. |
| calculateReadability() | [Readability Checker](https://omniseotools.com/tools/flesch-kincaid-readability-calculator) | Evaluates Flesch-Kincaid ease, grade levels, and reading time. |
| generateFaqSchema() | [FAQ Schema Generator](https://omniseotools.com/tools/faq-schema-generator) | Formats clean, validated Schema.org FAQPage JSON-LD. |
| buildUtmUrl() | [Campaign UTM Builder](https://omniseotools.com/tools/campaign-utm-builder) | Constructs sanitized, standard campaign tracking URLs. |
| decodeArabicUrl() | [Arabic and UTF-8 URL Decoder](https://omniseotools.com/tools/arabic-url-decoder) | Decodes percent-encoded queries and search terms cleanly. |

---

## Installation

Run one of the following commands:

npm install omniseo-core
yarn add omniseo-core
pnpm add omniseo-core

---

## Features

- Exact Google SERP Pixel Calculation: Measure title and description widths using accurate 20px Arial and 14px Arial proportional typography matrices.
- Smart Pixel Truncation: Truncate titles and descriptions cleanly to exact pixel limits (such as 580px / 600px desktop and mobile thresholds).
- SEO and CTR Scoring Engine: Grade titles and snippets with instant heuristic recommendations for maximum search CTR.
- Flesch-Kincaid Readability: Calculate Flesch Reading Ease, Flesch-Kincaid Grade Level, syllable counts, reading time, and speaking time with zero dependencies.
- Open Graph and Twitter Card Generators: Generate standards-compliant meta tags and Next.js Metadata objects.
- Pure TypeScript and Zero Dependencies: 100% client-side compatible, runs seamlessly in Node.js, browsers, Edge workers, and React / Next.js / Vue / Svelte.

---

## Quick Start and Code Examples

### 1. SERP Pixel Measurement and Truncation

Google search results truncate titles by pixel width (around 580px–600px) rather than arbitrary character counts. omniseo-core uses Google's exact proportional letter-spacing matrix:

import {
  calculateTitlePixels,
  calculateDescPixels,
  truncateToPixels,
  SERP_LIMITS,
} from "omniseo-core";

const title = "OmniSEO Tools — Free High-Performance SEO and Marketing Utilities";
const description = "Simulate SERPs, preview social cards, and calculate readability scores with zero latency.";

const titleWidth = calculateTitlePixels(title);
console.log(`Title width: ${titleWidth}px / ${SERP_LIMITS.desktopTitlePx}px max`);

const descWidth = calculateDescPixels(description);
console.log(`Description width: ${descWidth}px / ${SERP_LIMITS.desktopDescPx}px max`);

const truncated = truncateToPixels(
  "This is an exceptionally long meta title designed to test Google SERP pixel truncation accurately",
  580,
  true
);

console.log(truncated.text);
console.log(truncated.truncated);

---

### 2. CTR Quality Analysis and Snippet Optimization

Analyze SEO titles and descriptions to get an estimated click-through score (0–100) and actionable tips:

import { analyzeCtr } from "omniseo-core";

const analysis = analyzeCtr(
  "10 Best SEO Audit Tools for 2026 (Free and Fast) | OmniSEO",
  "Discover the top free SEO audit tools to boost organic search rankings and fix technical errors. Try our instant analyzers today."
);

console.log(`CTR Score: ${analysis.score}/100 (${analysis.grade})`);

analysis.tips.forEach((tip) => {
  console.log(`[${tip.passed ? "Pass" : "Fail"}] (${tip.impact} impact) ${tip.text}`);
});

---

### 3. Flesch-Kincaid Readability and Reading Time

Compute reading ease, US school grade levels, syllable statistics, and estimated reading/speaking times:

import {
  calculateReadability,
  getFleschReadingEase,
  getFleschKincaidGrade,
  getReadabilityEaseBand,
} from "omniseo-core";

const article = "Search engine optimization helps your website rank higher on Google search results. When you optimize your web pages, more prospective customers discover your products. Focus on clear language and easy-to-read sentences to keep visitors engaged on your site.";

const metrics = calculateReadability(article);

console.log(`Words: ${metrics.wordCount}`);
console.log(`Sentences: ${metrics.sentenceCount}`);
console.log(`Flesch Reading Ease: ${metrics.fleschReadingEase}`);
console.log(`Flesch-Kincaid Grade: Grade ${metrics.fleschKincaidGrade}`);
console.log(`Reading Time: ~${metrics.readingTimeMin} min`);
console.log(`Speaking Time: ~${metrics.speakingTimeMin} min`);

const band = getReadabilityEaseBand(metrics.fleschReadingEase);
console.log(band.label);
console.log(band.target);

---

### 4. Open Graph and Social Card Tag Generation

Generate complete, production-ready HTML meta tags or Next.js App Router metadata configuration:

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

const htmlTags = generateFullMetaTagsHtml(metaConfig);
console.log(htmlTags);

const nextJsCode = generateNextJsMetadataCode(metaConfig);
console.log(nextJsCode);

---

## API Reference

### SERP Functions
- calculateTitlePixels(text: string): number
- calculateDescPixels(text: string): number
- truncateToPixels(text: string, maxPx: number, isTitle?: boolean): { text: string; truncated: boolean }
- analyzeCtr(title: string, description: string): CtrAnalysis
- generateMetaHtml(title: string, description: string, canonicalUrl: string): string
- SERP_LIMITS: Constants for desktop and mobile title and description limits.

### Readability Functions
- calculateReadability(text: string): ReadabilityMetrics
- getFleschReadingEase(text: string): number
- getFleschKincaidGrade(text: string): number
- getReadabilityEaseBand(score: number): ReadabilityEaseBand
- countWordSyllables(word: string): number
- calculateReadingTime(wordCount: number, wordsPerMinute?: number): number
- calculateSpeakingTime(wordCount: number, wordsPerMinute?: number): number

### Open Graph Functions
- generateOpenGraphHtml(options: OpenGraphMetaOptions): string
- generateTwitterCardHtml(options: OpenGraphMetaOptions): string
- generateFullMetaTagsHtml(options: OpenGraphMetaOptions): string
- generateNextJsMetadataCode(options: OpenGraphMetaOptions): string

---

## License
MIT (c) [OmniSEO Tools](https://omniseotools.com)
