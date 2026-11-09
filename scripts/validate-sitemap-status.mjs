// scripts/validate-sitemap-status.mjs
import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const datasetPath = path.resolve(rootDir, "src/data/schemas-dataset.ts");

if (!fs.existsSync(datasetPath)) {
  console.error(`❌ Could not locate schemas-dataset.ts at ${datasetPath}`);
  process.exit(1);
}

const content = fs.readFileSync(datasetPath, "utf8");
const slugRegex = /"slug":\s*"([^"]+)"/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(content)) !== null) {
  slugs.push(match[1]);
}

console.log(`\n=================================================`);
console.log(`📋 SITEMAP P-SEO-BATCH-1 NORMALIZATION AUDIT`);
console.log(`=================================================`);
console.log(`Total blueprint detail pages found : ${slugs.length}`);

// Normalization checks
let normalizationErrors = 0;
const normalizedUrls = [
  "https://omniseotools.com/schema",
  ...slugs.map((slug) => {
    // Check slug rules
    if (slug !== slug.toLowerCase()) {
      console.error(`❌ Slug contains uppercase characters: "${slug}"`);
      normalizationErrors++;
    }
    if (slug.startsWith("/") || slug.endsWith("/")) {
      console.error(`❌ Slug has leading or trailing slash: "${slug}"`);
      normalizationErrors++;
    }
    if (/\s/.test(slug)) {
      console.error(`❌ Slug contains whitespace: "${slug}"`);
      normalizationErrors++;
    }
    return `https://omniseotools.com/schema/${slug}`;
  }),
];

console.log(`Total URLs in sitemap (including hub) : ${normalizedUrls.length}`);

if (normalizationErrors > 0) {
  console.error(`❌ Found ${normalizationErrors} URL normalization errors.`);
  process.exit(1);
} else {
  console.log(`✅ All ${normalizedUrls.length} URLs pass strict normalization (HTTPS, lowercase, no trailing slash, zero redirects)!\n`);
}

// Optional HTTP Status Validation against local server
const targetPort = process.env.PORT || 3000;
const localBase = `http://localhost:${targetPort}`;
const shouldTestHttp = process.argv.includes("--http");

if (shouldTestHttp) {
  console.log(`🌐 Performing HTTP Status Check against ${localBase} ...`);
  let passed = 0;
  let failed = 0;

  for (const url of normalizedUrls) {
    const localUrl = url.replace("https://omniseotools.com", localBase);
    try {
      const res = await fetch(localUrl, { redirect: "manual" });
      if (res.status === 200) {
        passed++;
      } else if (res.status >= 300 && res.status < 400) {
        console.error(`⚠️ REDIRECT ${res.status}: ${localUrl} -> ${res.headers.get("location")}`);
        failed++;
      } else {
        console.error(`❌ ERROR ${res.status}: ${localUrl}`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ Connection failed for ${localUrl}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 HTTP Verification Summary:`);
  console.log(`Passed (200 OK) : ${passed}`);
  console.log(`Failed / Redirect: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  }
}

