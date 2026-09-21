import { describe, it } from "node:test";
import assert from "node:assert";
import {
  parseRobotsTxt,
  validateRobotsTxt,
  generateRobotsTxt,
  type RobotsConfig,
} from "../robots";

describe("robots.txt parser", () => {
  it("parses standard multi-agent files with comments and sitemaps", () => {
    const raw = `
# Global robots.txt
User-agent: Googlebot
# Allow everything except private for Googlebot
Allow: /public/
Disallow: /nogooglebot/
Disallow: /admin/
Crawl-delay: 2

User-agent: *
Disallow: /admin/
Disallow: /secret/
Allow: /

# Directives
Host: https://omniseotools.com
Sitemap: https://omniseotools.com/sitemap.xml
Sitemap: https://omniseotools.com/sitemap-blog.xml
    `;

    const config = parseRobotsTxt(raw);

    assert.strictEqual(config.rules.length, 2);

    // Googlebot rule
    assert.strictEqual(config.rules[0].userAgent, "Googlebot");
    assert.deepStrictEqual(config.rules[0].allow, ["/public/"]);
    assert.deepStrictEqual(config.rules[0].disallow, ["/nogooglebot/", "/admin/"]);
    assert.strictEqual(config.rules[0].crawlDelay, 2);

    // Wildcard rule
    assert.strictEqual(config.rules[1].userAgent, "*");
    assert.deepStrictEqual(config.rules[1].allow, ["/"]);
    assert.deepStrictEqual(config.rules[1].disallow, ["/admin/", "/secret/"]);

    // Sitemaps & host
    assert.strictEqual(config.host, "https://omniseotools.com");
    assert.deepStrictEqual(config.sitemaps, [
      "https://omniseotools.com/sitemap.xml",
      "https://omniseotools.com/sitemap-blog.xml",
    ]);
  });

  it("handles consecutive User-agent directives in a single block", () => {
    const raw = `
User-agent: Googlebot
User-agent: Bingbot
Disallow: /crawler-trap/
Allow: /
    `;

    const config = parseRobotsTxt(raw);
    assert.strictEqual(config.rules.length, 2);
    assert.strictEqual(config.rules[0].userAgent, "Googlebot");
    assert.deepStrictEqual(config.rules[0].disallow, ["/crawler-trap/"]);
    assert.deepStrictEqual(config.rules[0].allow, ["/"]);

    assert.strictEqual(config.rules[1].userAgent, "Bingbot");
    assert.deepStrictEqual(config.rules[1].disallow, ["/crawler-trap/"]);
    assert.deepStrictEqual(config.rules[1].allow, ["/"]);
  });
});

describe("robots.txt validator", () => {
  it("validates valid robots.txt without errors", () => {
    const raw = `
User-agent: *
Disallow: /admin/
Allow: /public/
Sitemap: https://omniseotools.com/sitemap.xml
Host: omniseotools.com
    `;

    const result = validateRobotsTxt(raw);
    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.issues.length, 0);
    assert.strictEqual(result.parsed.rules.length, 1);
    assert.strictEqual(result.parsed.sitemaps.length, 1);
  });

  it("warns when Disallow is defined before any User-agent declaration", () => {
    const raw = `
Disallow: /unclaimed/
User-agent: *
Allow: /
    `;

    const result = validateRobotsTxt(raw);
    assert.strictEqual(result.isValid, true); // No fatal errors, but contains warnings
    const missingUaWarning = result.issues.find(
      (issue) => issue.type === "warning" && issue.message.includes("User-agent")
    );
    assert.ok(missingUaWarning, "Should include a warning for missing User-agent preceding directive");
    assert.strictEqual(missingUaWarning?.line, 2);
  });

  it("catches syntax errors such as missing colon", () => {
    const raw = `
User-agent *
Disallow: /admin/
    `;

    const result = validateRobotsTxt(raw);
    assert.strictEqual(result.isValid, false);
    const syntaxErr = result.issues.find((issue) => issue.type === "error" && issue.message.includes("missing \":\""));
    assert.ok(syntaxErr, "Should detect missing colon syntax error");
  });

  it("catches malformed sitemap URLs", () => {
    const raw = `
User-agent: *
Allow: /
Sitemap: not-an-absolute-url
Sitemap: ftp://invalid-protocol.com/sitemap.xml
    `;

    const result = validateRobotsTxt(raw);
    assert.strictEqual(result.isValid, false);
    const urlErrors = result.issues.filter((issue) => issue.type === "error" && issue.message.includes("Sitemap"));
    assert.strictEqual(urlErrors.length, 2);
  });

  it("catches invalid crawl-delay values", () => {
    const raw = `
User-agent: *
Crawl-delay: fast
    `;

    const result = validateRobotsTxt(raw);
    assert.strictEqual(result.isValid, false);
    const delayErr = result.issues.find((issue) => issue.type === "error" && issue.message.includes("Crawl-delay"));
    assert.ok(delayErr);
  });
});

describe("robots.txt generator", () => {
  it("serializes clean robots.txt configuration", () => {
    const config: RobotsConfig = {
      rules: [
        {
          userAgent: "Googlebot",
          allow: ["/public/"],
          disallow: ["/nogoogle/"],
          crawlDelay: 1,
        },
        {
          userAgent: "*",
          allow: ["/"],
          disallow: ["/admin/", "/checkout/"],
        },
      ],
      host: "omniseotools.com",
      sitemaps: ["https://omniseotools.com/sitemap.xml"],
    };

    const output = generateRobotsTxt(config);

    assert.strictEqual(
      output,
      `User-agent: Googlebot
Allow: /public/
Disallow: /nogoogle/
Crawl-delay: 1

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /checkout/

Host: omniseotools.com
Sitemap: https://omniseotools.com/sitemap.xml`
    );
  });

  it("preserves round-trip parsing and generation", () => {
    const inputConfig: RobotsConfig = {
      rules: [
        {
          userAgent: "Googlebot",
          allow: ["/search/"],
          disallow: ["/private/"],
          crawlDelay: 5,
        },
        {
          userAgent: "*",
          allow: [],
          disallow: ["/admin/"],
        },
      ],
      sitemaps: ["https://omniseotools.com/sitemap.xml"],
      host: "omniseotools.com",
    };

    const generated = generateRobotsTxt(inputConfig);
    const reparsed = parseRobotsTxt(generated);

    assert.deepStrictEqual(reparsed, inputConfig);
  });
});
