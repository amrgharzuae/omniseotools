"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  FileCode,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Search,
  Code2,
  Zap,
  Info,
  Download,
  Share2,
  Layers,
  Braces,
  CheckSquare,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import {
  validateJsonLd,
  extractJsonFromHtmlOrRaw,
  type SchemaValidationResult,
  type SchemaValidationIssue,
} from "@/lib/schema-validator-engine";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import Link from "next/link";

interface SchemaValidatorProps {
  toolSlug?: string;
  toolName?: string;
  initialInput?: string;
  platformName?: string;
  platformPreset?: string;
}

const SAMPLE_PRESETS = {
  validArticle: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "How to Configure Content Security Policy Headers in Next.js 15",
  "description": "Step-by-step guide to generating strict CSP nonces in edge middleware without breaking hydration.",
  "image": "https://example.com/assets/csp-guide-cover.jpg",
  "datePublished": "2026-09-29T08:00:00+00:00",
  "dateModified": "2026-09-29T11:30:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Alex Mercer",
    "url": "https://example.com/authors/alex"
  },
  "publisher": {
    "@type": "Organization",
    "name": "OmniSEO Tools",
    "url": "https://omniseotools.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://omniseotools.com/icon.png"
    }
  },
  "mainEntityOfPage": "https://example.com/blog/nextjs-csp-guide"
}
</script>`,

  validProduct: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Titanium Wireless Noise-Cancelling Headphones",
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg"
  ],
  "description": "Audiophile-grade wireless headphones with 45-hour battery life, active ANC, and lossless Bluetooth 5.4.",
  "sku": "AUD-NC-9000",
  "mpn": "NC9000-BLK",
  "gtin13": "0123456789012",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech Pro"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/audiotech-nc9000",
    "priceCurrency": "USD",
    "price": "249.99",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "OmniStore"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1840",
    "bestRating": "5",
    "worstRating": "1"
  }
}`,

  brokenJson: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Unescaped "Quotes" Inside Property String",
  "description": "Trailing comma error demonstration",
  "datePublished": "2026-09-29",
  "author": {
    "@type": "Person",
    "name": "Jane Doe",
  },
}`,

  missingFields: `{
  "@context": "https://schema.org",
  "@type": "Product",
  "description": "Sample product lacking required name, image, and offer properties."
}`,
};

export function SchemaValidator({
  toolSlug = "schema-validator",
  toolName = "JSON-LD Schema Validator & Linter",
  initialInput,
  platformName,
  platformPreset,
}: SchemaValidatorProps) {
  const [inputCode, setInputCode] = useState<string>(
    initialInput || platformPreset || SAMPLE_PRESETS.validArticle
  );
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  // Validation output computation
  const validation: SchemaValidationResult = useMemo(() => {
    return validateJsonLd(inputCode);
  }, [inputCode]);

  // Handle permalink hydration from URL hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#s=")) {
        const rawPayload = decodeURIComponent(atob(hash.slice(3)));
        const parsed = JSON.parse(rawPayload);
        if (parsed.code) setInputCode(parsed.code);
      }
    } catch {
      // Ignore hash parse errors
    }
  }, []);

  // Update hash for permalink sharing
  const handleSharePermalink = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = { code: inputCode };
      const serialized = btoa(encodeURIComponent(JSON.stringify(payload)));
      window.history.replaceState(null, "", `#s=${serialized}`);
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    } catch {
      // Fallback
    }
  }, [inputCode]);

  // Copy Clean JSON to clipboard
  const handleCopy = useCallback(() => {
    const clean = validation.formattedJson || extractJsonFromHtmlOrRaw(inputCode);
    navigator.clipboard.writeText(clean);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [inputCode, validation.formattedJson]);

  // Format / Prettify Button
  const handleBeautify = useCallback(() => {
    const clean = extractJsonFromHtmlOrRaw(inputCode);
    try {
      const parsed = JSON.parse(clean);
      const formatted = JSON.stringify(parsed, null, 2);
      setInputCode(formatted);
    } catch {
      // If parsing fails, leave as is
    }
  }, [inputCode]);

  // Minify JSON
  const handleMinify = useCallback(() => {
    const clean = extractJsonFromHtmlOrRaw(inputCode);
    try {
      const parsed = JSON.parse(clean);
      const minified = JSON.stringify(parsed);
      setInputCode(minified);
    } catch {
      // ignore
    }
  }, [inputCode]);

  // Wrap in <script type="application/ld+json">
  const handleWrapInScript = useCallback(() => {
    const clean = extractJsonFromHtmlOrRaw(inputCode);
    try {
      const parsed = JSON.parse(clean);
      const formatted = JSON.stringify(parsed, null, 2);
      setInputCode(`<script type="application/ld+json">\n${formatted}\n</script>`);
    } catch {
      setInputCode(`<script type="application/ld+json">\n${clean}\n</script>`);
    }
  }, [inputCode]);

  // Download .json or .html snippet
  const handleDownload = useCallback(() => {
    const isScript = inputCode.trim().toLowerCase().startsWith("<script");
    const filename = isScript ? "schema-snippet.html" : "structured-data.json";
    const mime = isScript ? "text/html" : "application/json";

    const blob = new Blob([inputCode], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [inputCode]);

  return (
    <div className="space-y-8">
      {/* Top Header & Presets Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-4 sm:p-6 shadow-xs backdrop-blur-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <Braces className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {platformName ? `${platformName} JSON-LD Schema Validator` : "Client-Side JSON-LD Validator & Linter"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paste raw JSON or full HTML script tags. Evaluated 100% in browser with zero telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleSharePermalink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="Copy shareable link with current configuration"
            >
              {shareFeedback ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="Schema Linter"
              status="100% Client-Side"
            />
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
            Presets:
          </span>
          {platformPreset && (
            <button
              onClick={() => setInputCode(platformPreset)}
              className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors shadow-2xs"
            >
              ⭐ {platformName || "Platform"} Preset
            </button>
          )}
          <button
            onClick={() => setInputCode(SAMPLE_PRESETS.validArticle)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Valid Article Schema
          </button>
          <button
            onClick={() => setInputCode(SAMPLE_PRESETS.validProduct)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Valid Product &amp; Offer
          </button>
          <button
            onClick={() => setInputCode(SAMPLE_PRESETS.brokenJson)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 transition-colors"
          >
            Broken JSON (Syntax Error)
          </button>
          <button
            onClick={() => setInputCode(SAMPLE_PRESETS.missingFields)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 transition-colors"
          >
            Missing Required Fields
          </button>
        </div>
      </div>

      {/* Main Two-Column Grid: Left Editor | Right Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Code Editor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs space-y-3">
            {/* Editor Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <FileCode className="h-4 w-4 text-emerald-500" />
                <span>JSON-LD / HTML Input Editor</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  onClick={handleBeautify}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Format JSON with 2-space indentation"
                >
                  Beautify
                </button>
                <button
                  onClick={handleMinify}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Minify JSON into a single line"
                >
                  Minify
                </button>
                <button
                  onClick={handleWrapInScript}
                  className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Wrap inside <script type='application/ld+json'>"
                >
                  Wrap in &lt;script&gt;
                </button>
                <button
                  onClick={() => setInputCode("")}
                  className="px-2.5 py-1 rounded-md text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Clear input"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                rows={16}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Paste JSON-LD or <script type='application/ld+json'> markup here..."
                className="w-full p-4 font-mono text-xs sm:text-sm leading-relaxed rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-950 text-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                spellCheck={false}
              />
            </div>

            {/* Bottom Editor Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
              <span>
                {validation.stats.lines} lines • {validation.stats.bytes} bytes
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Clean JSON"}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors font-medium"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Linter Output */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Status Score Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Validation Diagnostic
              </h3>

              {/* Status Badge */}
              {!validation.isValidJson ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 border border-rose-500/40 text-rose-700 dark:text-rose-300">
                  <XCircle className="h-3.5 w-3.5 text-rose-500" />
                  ERROR (Syntax Invalid)
                </span>
              ) : validation.totalErrors > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 border border-rose-500/40 text-rose-700 dark:text-rose-300">
                  <XCircle className="h-3.5 w-3.5 text-rose-500" />
                  {validation.totalErrors} Error(s) Detected
                </span>
              ) : validation.hasWarnings ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 border border-amber-500/40 text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  WARNING (Missing Fields)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  PASS (Valid Schema.org)
                </span>
              )}
            </div>

            {/* Detected Entities Badges */}
            {validation.detectedEntities.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Detected Entities ({validation.detectedEntities.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {validation.detectedEntities.map((ent, eIdx) => (
                    <span
                      key={eIdx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-semibold"
                    >
                      <span>{ent.type}</span>
                      {ent.name && <span className="opacity-70 text-[11px]">({ent.name})</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Itemized Issues List */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Audit Breakdown:
              </span>

              {validation.issues.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">All Schema.org and Google Rich Snippet criteria satisfied!</p>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                      Your JSON-LD structured data is ready to be deployed to production.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {validation.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-3 rounded-xl border text-xs space-y-1",
                        issue.severity === "error"
                          ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200"
                          : issue.severity === "warning"
                          ? "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200"
                          : "bg-blue-50/70 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-200"
                      )}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5">
                          {issue.severity === "error" ? (
                            <XCircle className="h-3.5 w-3.5 text-rose-500" />
                          ) : issue.severity === "warning" ? (
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                          ) : (
                            <Info className="h-3.5 w-3.5 text-blue-500" />
                          )}
                          <span>{issue.type}</span>
                        </span>
                        {issue.line && (
                          <span className="font-mono text-[10px] bg-rose-200/80 dark:bg-rose-900/80 px-1.5 py-0.5 rounded">
                            Line {issue.line}
                          </span>
                        )}
                      </div>

                      <p className="font-medium text-[11px] leading-relaxed">{issue.message}</p>
                      <p className="text-[11px] opacity-80 leading-relaxed">
                        <strong>Fix:</strong> {issue.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Deployment Advice Card */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <Zap className="h-3.5 w-3.5 text-emerald-500" />
              <span>Next.js &amp; HTML Deployment Tip</span>
            </div>
            <p className="leading-relaxed">
              Place the verified JSON-LD markup inside a{" "}
              <code className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                &lt;script type=&quot;application/ld+json&quot;&gt;
              </code>{" "}
              element inside your page&apos;s <code className="font-mono text-[11px]">&lt;head&gt;</code> or Next.js App Router root layout.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SchemaValidator;
