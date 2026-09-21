import { describe, it } from "node:test";
import assert from "node:assert";
import {
  formatHreflangCode,
  generateHreflangTags,
  validateHreflangEntries,
  type HreflangEntry,
} from "../hreflang";

describe("hreflang code formatter", () => {
  it("formats simple language: 'en' -> 'en'", () => {
    assert.strictEqual(formatHreflangCode("en"), "en");
    assert.strictEqual(formatHreflangCode("EN"), "en");
    assert.strictEqual(formatHreflangCode(" fr "), "fr");
  });

  it("formats language + region: 'ar', 'ae' -> 'ar-AE'", () => {
    assert.strictEqual(formatHreflangCode("ar", "ae"), "ar-AE");
    assert.strictEqual(formatHreflangCode("en", "US"), "en-US");
    assert.strictEqual(formatHreflangCode("es", "mx"), "es-MX");
  });

  it("formats language + script + region: 'zh', 'tw', 'hant' -> 'zh-Hant-TW'", () => {
    assert.strictEqual(formatHreflangCode("zh", "tw", "hant"), "zh-Hant-TW");
    assert.strictEqual(formatHreflangCode("zh", undefined, "hans"), "zh-Hans");
  });

  it("formats x-default correctly when isDefault: true", () => {
    assert.strictEqual(formatHreflangCode("en", "us", undefined, true), "x-default");
    assert.strictEqual(formatHreflangCode("", "", "", true), "x-default");
  });
});

describe("hreflang tag generator", () => {
  it("produces valid HTML <link> tags, XML <xhtml:link> lines, and HTTP Link headers", () => {
    const entries: HreflangEntry[] = [
      { lang: "en", region: "US", url: "https://omniseotools.com/en-us" },
      { lang: "en", region: "GB", url: "https://omniseotools.com/en-gb" },
      { lang: "ar", region: "AE", url: "https://omniseotools.com/ar-ae" },
      { lang: "en", url: "https://omniseotools.com/", isDefault: true },
    ];

    const result = generateHreflangTags(entries);

    // HTML Tags
    assert.strictEqual(result.htmlTags.length, 4);
    assert.strictEqual(
      result.htmlTags[0],
      '<link rel="alternate" hreflang="en-US" href="https://omniseotools.com/en-us" />'
    );
    assert.strictEqual(
      result.htmlTags[3],
      '<link rel="alternate" hreflang="x-default" href="https://omniseotools.com/" />'
    );

    // XML Sitemap Snippet
    assert.ok(result.xmlSnippet.includes('<xhtml:link rel="alternate" hreflang="en-US" href="https://omniseotools.com/en-us"/>'));
    assert.ok(result.xmlSnippet.includes('<xhtml:link rel="alternate" hreflang="x-default" href="https://omniseotools.com/"/>'));

    // HTTP Link Header
    assert.ok(result.httpHeader.startsWith("Link: "));
    assert.ok(result.httpHeader.includes('<https://omniseotools.com/en-us>; rel="alternate"; hreflang="en-US"'));
    assert.ok(result.httpHeader.includes('<https://omniseotools.com/>; rel="alternate"; hreflang="x-default"'));
  });
});

describe("hreflang validator", () => {
  it("validates a compliant multi-region setup cleanly with isValid: true", () => {
    const entries: HreflangEntry[] = [
      { lang: "en", region: "US", url: "https://omniseotools.com/en-us" },
      { lang: "en", region: "GB", url: "https://omniseotools.com/en-gb" },
      { lang: "ar", region: "AE", url: "https://omniseotools.com/ar-ae" },
      { lang: "en", url: "https://omniseotools.com/", isDefault: true },
    ];

    const validation = validateHreflangEntries(entries);
    assert.strictEqual(validation.isValid, true);
    assert.strictEqual(validation.issues.length, 0);
  });

  it("catches missing x-default as a warning", () => {
    const entries: HreflangEntry[] = [
      { lang: "en", region: "US", url: "https://omniseotools.com/en-us" },
      { lang: "ar", region: "AE", url: "https://omniseotools.com/ar-ae" },
    ];

    const validation = validateHreflangEntries(entries);
    assert.strictEqual(validation.isValid, true); // Warnings don't invalidate
    const defaultWarning = validation.issues.find(
      (i) => i.type === "warning" && i.message.includes("x-default")
    );
    assert.ok(defaultWarning, "Should produce warning for missing x-default");
  });

  it("catches duplicate locale codes pointing to different URLs as errors", () => {
    const entries: HreflangEntry[] = [
      { lang: "en", region: "US", url: "https://omniseotools.com/en-us-1" },
      { lang: "en", region: "US", url: "https://omniseotools.com/en-us-2" },
      { lang: "en", url: "https://omniseotools.com/", isDefault: true },
    ];

    const validation = validateHreflangEntries(entries);
    assert.strictEqual(validation.isValid, false);
    const duplicateError = validation.issues.find(
      (i) => i.type === "error" && i.message.includes("Duplicate hreflang code")
    );
    assert.ok(duplicateError, "Should produce error for conflicting duplicate locale code");
  });

  it("catches invalid or relative URLs as errors", () => {
    const entries: HreflangEntry[] = [
      { lang: "en", region: "US", url: "/relative-path" },
      { lang: "ar", region: "AE", url: "not-a-valid-url" },
      { lang: "es", region: "ES", url: "" },
      { lang: "en", url: "https://omniseotools.com/", isDefault: true },
    ];

    const validation = validateHreflangEntries(entries);
    assert.strictEqual(validation.isValid, false);
    const urlErrors = validation.issues.filter((i) => i.type === "error");
    assert.strictEqual(urlErrors.length, 3);
  });
});
