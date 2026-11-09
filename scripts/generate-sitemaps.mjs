// scripts/generate-sitemaps.mjs
import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const CANONICAL_DOMAIN = "https://www.omniseotools.com";

console.log(`\n=================================================`);
console.log(`🗺️  OMNISEO SITEMAP GENERATION (CANONICAL WWW)`);
console.log(`=================================================`);
console.log(`Canonical Base Domain: ${CANONICAL_DOMAIN}`);

// 1. Locate and parse schemas-dataset.ts
const datasetPath = path.resolve(rootDir, "src/data/schemas-dataset.ts");
if (!fs.existsSync(datasetPath)) {
  console.error(`❌ Could not locate schemas-dataset.ts at ${datasetPath}`);
  process.exit(1);
}

const content = fs.readFileSync(datasetPath, "utf8");

// Extract blueprints using regex matching { slug: "...", lastUpdated: "..." }
const blueprintBlocks = [...content.matchAll(/\{\s*"slug":\s*"([^"]+)"[\s\S]*?"lastUpdated":\s*"([^"]+)"/g)];

const blueprints = blueprintBlocks.map((m) => ({
  slug: m[1].trim().toLowerCase().replace(/\/+$/, ""),
  lastUpdated: m[2].trim(),
}));

console.log(`Parsed ${blueprints.length} schema blueprints from dataset.`);

if (blueprints.length < 300) {
  console.error(`❌ Expected at least 300 blueprints, but found ${blueprints.length}`);
  process.exit(1);
}

// 2. Generate XML content for p-seo-batch-1.xml
const now = new Date().toISOString();

const xmlEntries = [
  // 1. Schema Hub Directory Page
  `  <url>
    <loc>${CANONICAL_DOMAIN}/schema</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
  // 2. All 300 Blueprint Detail Pages
  ...blueprints.map((bp) => {
    const lastmodDate = bp.lastUpdated
      ? new Date(bp.lastUpdated).toISOString()
      : now;
    return `  <url>
    <loc>${CANONICAL_DOMAIN}/schema/${bp.slug}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join("\n")}
</urlset>
`;

// 3. Ensure target directory exists and write output
const outDir = path.resolve(rootDir, "public/sitemaps");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.resolve(outDir, "p-seo-batch-1.xml");
fs.writeFileSync(outPath, xml, "utf8");

console.log(`✅ Generated static sitemap at: public/sitemaps/p-seo-batch-1.xml`);
console.log(`Total URLs written: ${xmlEntries.length}`);

// 4. Verify ZERO non-www URLs exist in output file
const writtenContent = fs.readFileSync(outPath, "utf8");
const nonWwwMatches = [...writtenContent.matchAll(/https:\/\/omniseotools\.com/g)];

if (nonWwwMatches.length > 0) {
  console.error(`❌ REGRESSION: Found ${nonWwwMatches.length} non-www URLs in generated sitemap!`);
  process.exit(1);
} else {
  console.log(`✅ Strict WWW Verification Passed: 0 non-www URLs detected.\n`);
}

