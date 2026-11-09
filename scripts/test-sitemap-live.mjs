// scripts/test-sitemap-live.mjs
import { spawn } from "child_process";

const PORT = 3456;
const BASE = `http://127.0.0.1:${PORT}`;

console.log(`🚀 Starting production Next.js server on port ${PORT}...`);

const serverProcess = spawn(
  "node",
  ["./node_modules/next/dist/bin/next", "start", "-p", String(PORT), "-H", "127.0.0.1"],
  {
    stdio: ["ignore", "pipe", "pipe"],
  }
);

serverProcess.stdout.on("data", (data) => {
  console.log(`[Next.js stdout]: ${data.toString().trim()}`);
});
serverProcess.stderr.on("data", (data) => {
  console.error(`[Next.js stderr]: ${data.toString().trim()}`);
});

function cleanup() {
  if (serverProcess && !serverProcess.killed) {
    if (process.platform === "win32") {
      try {
        spawn("taskkill", ["/pid", String(serverProcess.pid), "/f", "/t"]);
      } catch (e) {}
    } else {
      serverProcess.kill("SIGTERM");
    }
  }
}

process.on("exit", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

// Wait for server ready
async function waitForServer(retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.status === 200) {
        console.log(`✅ Server ready on ${BASE}!\n`);
        return true;
      } else {
        console.log(`Probe returned ${res.status}`);
      }
    } catch (e) {
      console.log(`Probe failed: ${e.message}`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("Server failed to start in time");
}

async function runTests() {
  try {
    await waitForServer();

    console.log(`=================================================`);
    console.log(`1. TESTING 301/308 REDIRECT ARCHITECTURE`);
    console.log(`=================================================`);

    const redirectsToTest = [
      {
        path: "/tools/marketing/utm-campaign-builder",
        expectedDest: "/tools/utm-campaign-builder",
      },
      {
        path: "/tools/marketing/utm-campaign-builder/meta-ads",
        expectedDest: "/tools/utm-campaign-builder/meta-ads",
      },
      {
        path: "/tools/utm-builder",
        expectedDest: "/tools/utm-campaign-builder",
      },
      {
        path: "/tools/campaign-utm-builder",
        expectedDest: "/tools/utm-campaign-builder",
      },
    ];

    let redirectErrors = 0;
    for (const item of redirectsToTest) {
      const res = await fetch(`${BASE}${item.path}`, { redirect: "manual" });
      const location = res.headers.get("location");
      const isRedirect = res.status === 301 || res.status === 308;
      if (isRedirect && location === item.expectedDest) {
        console.log(`✅ ${res.status} Redirect OK: ${item.path} -> ${location}`);
      } else {
        console.error(
          `❌ Failed: ${item.path} returned status ${res.status}, location: "${location}", expected: "${item.expectedDest}"`
        );
        redirectErrors++;
      }
    }

    if (redirectErrors > 0) {
      throw new Error(`${redirectErrors} redirect tests failed`);
    }

    console.log(`\n=================================================`);
    console.log(`2. TESTING SITEMAP GENERATOR: p-seo-batch-1.xml`);
    console.log(`=================================================`);

    const sitemapRes = await fetch(`${BASE}/sitemaps/p-seo-batch-1.xml`);
    if (sitemapRes.status !== 200) {
      throw new Error(`Sitemap returned status ${sitemapRes.status}`);
    }

    const xml = await sitemapRes.text();
    const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1]
    );

    console.log(`Fetched sitemap successfully.`);
    console.log(`Total <loc> URLs inside sitemap : ${locMatches.length}`);

    // Verify all 300 detail pages + 1 hub = 301 URLs
    if (locMatches.length < 301) {
      throw new Error(
        `Expected at least 301 URLs, but found ${locMatches.length}`
      );
    }

    // Verify zero non-www URLs
    const nonWwwMatches = locMatches.filter((u) => !u.startsWith("https://www.omniseotools.com"));
    if (nonWwwMatches.length > 0) {
      throw new Error(
        `Found ${nonWwwMatches.length} URLs without www prefix! First few: ${nonWwwMatches.slice(0, 3).join(", ")}`
      );
    }
    console.log(`✅ All ${locMatches.length} URLs strictly use https://www.omniseotools.com (0 non-www URLs)!`);

    console.log(`\n=================================================`);
    console.log(`3. VERIFYING 200 OK STATUS FOR ALL SITEMAP URLS`);
    console.log(`=================================================`);

    let passed200 = 0;
    let failedUrls = [];

    // Verify in concurrent chunks of 15
    const CHUNK_SIZE = 15;
    for (let i = 0; i < locMatches.length; i += CHUNK_SIZE) {
      const chunk = locMatches.slice(i, i + CHUNK_SIZE);
      await Promise.all(
        chunk.map(async (rawUrl) => {
          const pathOnly = new URL(rawUrl).pathname;
          const localUrl = `${BASE}${pathOnly}`;

          const res = await fetch(localUrl, { redirect: "manual" });
          if (res.status === 200) {
            passed200++;
          } else {
            failedUrls.push({
              url: rawUrl,
              localUrl,
              status: res.status,
              location: res.headers.get("location"),
            });
          }
        })
      );
      process.stdout.write(`Checked ${Math.min(i + CHUNK_SIZE, locMatches.length)}/${locMatches.length} URLs...\r`);
    }

    console.log(`\n\n📊 Sitemap URL Verification Results:`);
    console.log(`Total Checked    : ${locMatches.length}`);
    console.log(`200 OK (Clean)   : ${passed200}`);
    console.log(`Redirects/Errors : ${failedUrls.length}`);

    if (failedUrls.length > 0) {
      console.error(`\n❌ Failed URLs:`, failedUrls);
      throw new Error(`${failedUrls.length} URLs failed 200 OK validation`);
    }

    console.log(`\n=================================================`);
    console.log(`4. VERIFYING PRIMARY UTM BUILDER PAGE`);
    console.log(`=================================================`);

    const utmRes = await fetch(`${BASE}/tools/utm-campaign-builder`);
    if (utmRes.status !== 200) {
      throw new Error(`/tools/utm-campaign-builder returned ${utmRes.status}`);
    }
    const utmHtml = await utmRes.text();

    // Check title
    const titleMatch = utmHtml.match(/<title>([^<]+)<\/title>/);
    const expectedTitle = "Free UTM Campaign Builder &amp; URL Tracker (No Sign-Up) | OmniSEOTools";
    const actualTitle = titleMatch ? titleMatch[1] : "";
    console.log(`Title tag: "${actualTitle}"`);
    if (!actualTitle.includes("Free UTM Campaign Builder &amp; URL Tracker (No Sign-Up) | OmniSEOTools")) {
      throw new Error(`Title tag did not match expected! Got: "${actualTitle}"`);
    }

    // Check description
    const descMatch = utmHtml.match(/<meta name="description" content="([^"]+)"/);
    const expectedDesc = "Generate clean, error-free UTM campaign tracking links for Google Ads, Meta/Facebook, TikTok, and email campaigns in seconds. Zero sign-up required.";
    const actualDesc = descMatch ? descMatch[1] : "";
    console.log(`Description tag: "${actualDesc}"`);
    if (actualDesc !== expectedDesc) {
      throw new Error(`Description tag mismatch! Got: "${actualDesc}"`);
    }

    // Check canonical
    const canonicalMatch = utmHtml.match(/<link rel="canonical" href="([^"]+)"/);
    console.log(`Canonical tag: "${canonicalMatch ? canonicalMatch[1] : "NOT FOUND"}"`);
    if (!canonicalMatch || canonicalMatch[1] !== "https://www.omniseotools.com/tools/utm-campaign-builder") {
      throw new Error(`Canonical tag mismatch! Got: ${canonicalMatch ? canonicalMatch[1] : "none"}`);
    }

    // Check Bulk Matrix bridge callout banner
    const hasBulkBridge = utmHtml.includes("/bulk/utm-matrix");
    const hasBulkHeadline = utmHtml.includes("Managing multi-channel campaigns?");
    const hasBulkBody = utmHtml.includes("Tag hundreds of landing pages across Google, Meta, and TikTok simultaneously with zero server uploads.");
    const hasBulkButton = utmHtml.includes("Open Bulk UTM Matrix");
    console.log(`Bulk UTM Matrix bridge link present: ${hasBulkBridge ? "✅ YES" : "❌ NO"}`);
    console.log(`Bulk Banner headline present: ${hasBulkHeadline ? "✅ YES" : "❌ NO"}`);
    console.log(`Bulk Banner body copy present: ${hasBulkBody ? "✅ YES" : "❌ NO"}`);
    console.log(`Bulk Banner action button present: ${hasBulkButton ? "✅ YES" : "❌ NO"}`);

    if (!hasBulkBridge || !hasBulkHeadline || !hasBulkBody || !hasBulkButton) {
      throw new Error("Bulk Matrix bridge banner missing required copy or button!");
    }

    // Check Platform Dynamic Token Cheat Sheets
    const hasGoogleTokens = utmHtml.includes("{campaignid}") && utmHtml.includes("{adgroupid}") && utmHtml.includes("{keyword}");
    const hasMetaTokens = utmHtml.includes("{{campaign.name}}") && utmHtml.includes("{{ad.name}}") && utmHtml.includes("{{adset.name}}");
    const hasTikTokTokens = utmHtml.includes("__CAMPAIGN_NAME__") && utmHtml.includes("__AID_NAME__") && utmHtml.includes("__CID_NAME__");
    const hasLinkedInTokens = utmHtml.includes("{{campaignName}}") && utmHtml.includes("{{creativeId}}");

    console.log(`Google Ads dynamic tokens: ${hasGoogleTokens ? "✅ PRESENT" : "❌ MISSING"}`);
    console.log(`Meta Ads dynamic tokens: ${hasMetaTokens ? "✅ PRESENT" : "❌ MISSING"}`);
    console.log(`TikTok Ads dynamic tokens: ${hasTikTokTokens ? "✅ PRESENT" : "❌ MISSING"}`);
    console.log(`LinkedIn Ads dynamic tokens: ${hasLinkedInTokens ? "✅ PRESENT" : "❌ MISSING"}`);

    if (!hasGoogleTokens || !hasMetaTokens || !hasTikTokTokens || !hasLinkedInTokens) {
      throw new Error("One or more platform dynamic token cheat sheet blocks are missing!");
    }

    // Check FAQ & SoftwareApplication Schema
    const hasSoftwareApp = utmHtml.includes('"@type":"SoftwareApplication"');
    const hasFaqPage = utmHtml.includes('"@type":"FAQPage"');
    const hasFaq1 = utmHtml.includes("Are UTM parameters case-sensitive?");
    const hasFaq2 = utmHtml.includes("Do UTM parameters hurt my SEO or create duplicate content?");
    const hasFaq3 = utmHtml.includes("What is the proper order of UTM tags in a URL?");

    console.log(`SoftwareApplication JSON-LD schema: ${hasSoftwareApp ? "✅ VALID" : "❌ MISSING"}`);
    console.log(`FAQPage JSON-LD schema: ${hasFaqPage ? "✅ VALID" : "❌ MISSING"}`);
    console.log(`FAQ 1 present: ${hasFaq1 ? "✅ YES" : "❌ NO"}`);
    console.log(`FAQ 2 present: ${hasFaq2 ? "✅ YES" : "❌ NO"}`);
    console.log(`FAQ 3 present: ${hasFaq3 ? "✅ YES" : "❌ NO"}`);

    if (!hasSoftwareApp || !hasFaqPage || !hasFaq1 || !hasFaq2 || !hasFaq3) {
      throw new Error("FAQ schema or FAQ accordion items are incomplete!");
    }

    console.log(`\n🎉 ALL AUTOMATED VERIFICATION CHECKS PASSED!\n`);
  } finally {
    cleanup();
  }
}

runTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(`\n❌ Test failed: ${err.message}`);
    process.exit(1);
  });
