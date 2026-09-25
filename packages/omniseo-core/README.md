# omniseo-core

[![npm version](https://img.shields.io/npm/v/omniseo-core.svg?style=flat-square)](https://www.npmjs.com/package/omniseo-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A lightweight, zero-dependency TypeScript engine powering technical SEO validation, RFC 9309 robots parsing, hreflang cluster verification, and campaign tracking utilities.

Developed for modern Node.js, Next.js, and edge computing environments. Core algorithms power the web utilities on [OmniSEO Tools](https://omniseotools.com).

---

## 🛠️ Interactive Web Playgrounds

Test rules and configurations visually without writing code using our hosted client-side utilities:

- 🎯 **[UTM Campaign Builder](https://omniseotools.com/tools/utm-campaign-builder)** — Build and validate GA4 campaign URLs with zero tracking.
- 📊 **[Bulk UTM Matrix Generator](https://omniseotools.com/tools/bulk-utm-matrix-generator)** — Generate cross-channel tracking URLs in bulk.
- 🤖 **[Robots.txt Generator & Validator](https://omniseotools.com/tools/robots-txt-generator-validator)** — Validate RFC 9309 compliance and crawl directives.
- 🌐 **[Hreflang & Language Cluster Validator](https://omniseotools.com/tools/hreflang-tag-generator)** — Verify reciprocal `rel="alternate"` links and `x-default` fallbacks.
- 🛡️ **[Content Security Policy (CSP) Builder](https://omniseotools.com/tools/csp-header-builder)** — Configure strict modern CSP headers and edge policies.
- 🔀 **[Redirect Rule & Regex Mapper](https://omniseotools.com/tools/redirect-rule-generator)** — Test 301/308 status mappings and routing regular expressions.

Explore the complete suite of 40+ web utilities at **[OmniSEOTools.com](https://omniseotools.com/tools)**.

---

## 📦 Installation

```bash
npm install omniseo-core
# or
pnpm add omniseo-core
# or
yarn add omniseo-core
```

---

## 🚀 Quick Start

### 1. Validate and Parse `robots.txt`

```typescript
import { parseRobotsTxt, validateRobotsTxt } from 'omniseo-core';

const robotsContent = `
User-agent: *
Disallow: /admin/
Allow: /admin/public/
Sitemap: [https://example.com/sitemap.xml](https://example.com/sitemap.xml)
`;

const result = parseRobotsTxt(robotsContent);
console.log(result.isAllowed({ userAgent: 'Googlebot', path: '/admin/dashboard' })); // false
console.log(result.isAllowed({ userAgent: 'Googlebot', path: '/admin/public/faq' })); // true
```

### 2. Verify Hreflang Clusters

```typescript
import { validateHreflangCluster } from 'omniseo-core';

const cluster = [
  { lang: 'en', url: '[https://example.com/en](https://example.com/en)' },
  { lang: 'es', url: '[https://example.com/es](https://example.com/es)' },
  { lang: 'x-default', url: '[https://example.com/](https://example.com/)' }
];

const report = validateHreflangCluster(cluster);
console.log(report.isValid); // true
```

---

## 📄 License

MIT © [OmniSEO Tools](https://omniseotools.com)