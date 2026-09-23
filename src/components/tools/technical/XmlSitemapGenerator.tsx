"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  FileCode,
  Sparkles,
  Check,
  Copy,
  Download,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Globe,
  Layers,
  FileText,
  Code2,
  Calendar,
  Sliders,
  SlidersHorizontal,
  RefreshCw,
  Info,
  ExternalLink,
  Upload,
  ArrowRight,
  ShieldAlert,
  FileSpreadsheet,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface XmlSitemapGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
type Mode = "generator" | "validator";
type OutputTab = "xml" | "nextjs";

interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: ChangeFreq;
  priority?: string;
}

interface ValidationIssue {
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  url?: string;
  line?: number;
}

const SAMPLE_GENERATOR_URLS = `https://example.com/
https://example.com/about
https://example.com/services
https://example.com/blog
https://example.com/blog/seo-best-practices
https://example.com/contact`;

const SAMPLE_ECOMMERCE_URLS = `https://example.com/
https://example.com/products
https://example.com/products/shoes
https://example.com/products/jackets
https://example.com/categories/footwear
https://example.com/sale?discount=20&sort=newest`;

const SAMPLE_VALID_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-09-23</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2026-09-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/blog/seo-guide</loc>
    <lastmod>2026-09-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

const SAMPLE_FAULTY_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url>
    <loc>http://insecure-domain.com/page</loc>
    <lastmod>23/09/2026</lastmod>
    <changefreq>frequently</changefreq>
    <priority>1.5</priority>
  </url>
  <url>
    <loc>/relative-path/only</loc>
  </url>
  <url>
    <loc>https://example.com/search?q=shoes&category=men</loc>
    <lastmod>2026-13-45</lastmod>
  </url>
  <url>
    <loc>https://example.com/about</loc>
  </url>
  <url>
    <loc>https://example.com/about</loc>
  </url>
</urlset>`;

function getTodayString(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function escapeXmlEntities(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isValidW3CDate(dateStr: string): boolean {
  if (!dateStr) return false;
  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  }
  // ISO 8601 with time (YYYY-MM-DDThh:mm:ss...)
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateStr)) {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
  }
  return false;
}

export function XmlSitemapGenerator({ toolSlug, toolName }: XmlSitemapGeneratorProps) {
  // Mode State: generator vs validator
  const [mode, setMode] = useState<Mode>("generator");

  // Generator State
  const [rawUrlsInput, setRawUrlsInput] = useState<string>(SAMPLE_GENERATOR_URLS);
  const [defaultChangefreq, setDefaultChangefreq] = useState<ChangeFreq>("weekly");
  const [defaultPriority, setDefaultPriority] = useState<string>("0.8");
  const [defaultLastmod, setDefaultLastmod] = useState<string>(getTodayString());
  const [includeLastmod, setIncludeLastmod] = useState<boolean>(true);
  const [includeChangefreq, setIncludeChangefreq] = useState<boolean>(true);
  const [includePriority, setIncludePriority] = useState<boolean>(true);
  const [smartRootPriority, setSmartRootPriority] = useState<boolean>(true);
  const [forceHttps, setForceHttps] = useState<boolean>(true);
  const [escapeEntities, setEscapeEntities] = useState<boolean>(true);

  // Validator State
  const [rawXmlInput, setRawXmlInput] = useState<string>(SAMPLE_VALID_XML);

  // Output Tab & Feedback
  const [activeTab, setActiveTab] = useState<OutputTab>("xml");
  const [copied, setCopied] = useState<boolean>(false);

  // Parse URLs in Generator Mode
  const generatorEntries = useMemo((): SitemapUrlEntry[] => {
    const lines = rawUrlsInput.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    const uniqueLines = Array.from(new Set(lines));

    return uniqueLines.map((line) => {
      let loc = line;
      if (!loc.startsWith("http://") && !loc.startsWith("https://")) {
        loc = `https://${loc.replace(/^\/+/, "")}`;
      }
      if (forceHttps && loc.startsWith("http://")) {
        loc = loc.replace(/^http:\/\//, "https://");
      }

      let priority = defaultPriority;
      let changefreq = defaultChangefreq;

      // Smart Root Priority weighting
      if (smartRootPriority) {
        try {
          const parsed = new URL(loc);
          if (parsed.pathname === "/" || parsed.pathname === "") {
            priority = "1.0";
            changefreq = "daily";
          } else {
            const depth = parsed.pathname.split("/").filter(Boolean).length;
            if (depth === 1) {
              priority = defaultPriority;
            } else {
              const calc = Math.max(0.3, parseFloat(defaultPriority) - (depth - 1) * 0.15).toFixed(1);
              priority = calc;
            }
          }
        } catch {
          // ignore parsing error
        }
      }

      return {
        loc: escapeEntities ? escapeXmlEntities(loc) : loc,
        lastmod: includeLastmod ? defaultLastmod : undefined,
        changefreq: includeChangefreq ? changefreq : undefined,
        priority: includePriority ? priority : undefined,
      };
    });
  }, [
    rawUrlsInput,
    forceHttps,
    escapeEntities,
    smartRootPriority,
    defaultPriority,
    defaultChangefreq,
    includeLastmod,
    defaultLastmod,
    includeChangefreq,
    includePriority,
  ]);

  // Generate Standard XML Code
  const generatedXml = useMemo(() => {
    if (mode === "validator") {
      return rawXmlInput;
    }

    const lines: string[] = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ];

    for (const entry of generatorEntries) {
      lines.push(`  <url>`);
      lines.push(`    <loc>${entry.loc}</loc>`);
      if (entry.lastmod) {
        lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      }
      if (entry.changefreq) {
        lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      }
      if (entry.priority) {
        lines.push(`    <priority>${entry.priority}</priority>`);
      }
      lines.push(`  </url>`);
    }

    lines.push(`</urlset>`);
    return lines.join("\n");
  }, [mode, rawXmlInput, generatorEntries]);

  // Generate Next.js App Router (app/sitemap.ts) snippet
  const generatedNextjsSnippet = useMemo(() => {
    const entries = generatorEntries.map((e) => {
      const parts: string[] = [`    url: '${e.loc}',`];
      if (e.lastmod) {
        parts.push(`    lastModified: new Date('${e.lastmod}'),`);
      }
      if (e.changefreq) {
        parts.push(`    changeFrequency: '${e.changefreq}',`);
      }
      if (e.priority) {
        parts.push(`    priority: ${parseFloat(e.priority)},`);
      }
      return `  {\n${parts.join("\n")}\n  }`;
    });

    return `import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
${entries.join(",\n")}
  ];
}`;
  }, [generatorEntries]);

  // Compute Stats (Size, URL count, Google Limit checks)
  const stats = useMemo(() => {
    const xmlContent = mode === "generator" ? generatedXml : rawXmlInput;
    const byteSize = new Blob([xmlContent]).size;
    const kbSize = (byteSize / 1024).toFixed(2);
    const mbSize = (byteSize / (1024 * 1024)).toFixed(3);

    let urlCount = 0;
    if (mode === "generator") {
      urlCount = generatorEntries.length;
    } else {
      const match = xmlContent.match(/<loc>/gi);
      urlCount = match ? match.length : 0;
    }

    const isUrlCountSafe = urlCount <= 50000;
    const isSizeSafe = byteSize <= 50 * 1024 * 1024; // 50MB
    const urlPercent = Math.min(100, Math.max(0.1, (urlCount / 50000) * 100));

    return {
      byteSize,
      kbSize,
      mbSize,
      urlCount,
      isUrlCountSafe,
      isSizeSafe,
      urlPercent,
    };
  }, [mode, generatedXml, rawXmlInput, generatorEntries]);

  // Client-Side Validator Engine
  const validationResults = useMemo(() => {
    const issues: ValidationIssue[] = [];
    if (!rawXmlInput.trim()) {
      return {
        isValid: false,
        score: 0,
        issues: [
          {
            type: "error" as const,
            title: "Empty Input",
            message: "Paste raw sitemap XML content into the editor to validate syntax and compliance.",
          },
        ],
        parsedUrls: 0,
      };
    }

    // 1. XML DOMParser Syntax Check
    let doc: Document | null = null;
    try {
      if (typeof window !== "undefined") {
        const parser = new DOMParser();
        doc = parser.parseFromString(rawXmlInput, "application/xml");
        const parserError = doc.querySelector("parsererror");
        if (parserError) {
          issues.push({
            type: "error",
            title: "XML Syntax Parsing Error",
            message: parserError.textContent || "Malformed XML document syntax.",
          });
        }
      }
    } catch (err: any) {
      issues.push({
        type: "error",
        title: "Parser Execution Error",
        message: err?.message || "Failed to execute DOMParser.",
      });
    }

    // Unescaped & check via Regex
    const rawAmpRegex = /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/g;
    const unescapedAmps = (rawXmlInput.match(rawAmpRegex) || []).length;
    if (unescapedAmps > 0) {
      issues.push({
        type: "error",
        title: "Unescaped Ampersand Entity",
        message: `Found ${unescapedAmps} unescaped '&' symbol(s). In XML, all ampersands must be written as '&amp;'.`,
      });
    }

    let parsedUrls = 0;

    if (doc) {
      // 2. Namespace & Root Tag Check
      const rootElement = doc.documentElement;
      const rootTag = rootElement.tagName.toLowerCase();
      const xmlns = rootElement.getAttribute("xmlns");

      if (rootTag === "urlset") {
        if (!xmlns || !xmlns.includes("sitemaps.org/schemas/sitemap/0.9")) {
          issues.push({
            type: "warning",
            title: "Missing or Non-Standard Namespace",
            message: `Root <urlset> should declare xmlns="http://www.sitemaps.org/schemas/sitemap/0.9". Found: "${xmlns || "none"}"`,
          });
        }
      } else if (rootTag === "sitemapindex") {
        if (!xmlns || !xmlns.includes("sitemaps.org/schemas/sitemap/0.9")) {
          issues.push({
            type: "warning",
            title: "Non-Standard Sitemap Index Namespace",
            message: `Root <sitemapindex> should declare xmlns="http://www.sitemaps.org/schemas/sitemap/0.9".`,
          });
        }
      } else {
        issues.push({
          type: "error",
          title: "Invalid Root Element",
          message: `Root XML element must be <urlset> (for sitemaps) or <sitemapindex> (for index files). Found: <${rootTag}>.`,
        });
      }

      // 3. Inspect individual <url> elements
      const urlNodes = doc.querySelectorAll("url");
      parsedUrls = urlNodes.length;
      const seenUrls = new Set<string>();

      urlNodes.forEach((node, idx) => {
        const locNode = node.querySelector("loc");
        const lastmodNode = node.querySelector("lastmod");
        const changefreqNode = node.querySelector("changefreq");
        const priorityNode = node.querySelector("priority");

        if (!locNode || !locNode.textContent?.trim()) {
          issues.push({
            type: "error",
            title: `Missing <loc> Tag (Entry #${idx + 1})`,
            message: `<url> block #${idx + 1} does not have a mandatory <loc> URL tag.`,
          });
          return;
        }

        const locText = locNode.textContent.trim();

        // Check duplicates
        if (seenUrls.has(locText)) {
          issues.push({
            type: "warning",
            title: "Duplicate URL Entry",
            message: `URL "${locText}" is declared multiple times in this sitemap.`,
            url: locText,
          });
        } else {
          seenUrls.add(locText);
        }

        // Check relative URL
        if (!locText.startsWith("http://") && !locText.startsWith("https://")) {
          issues.push({
            type: "error",
            title: "Relative URL Path Detected",
            message: `URL "${locText}" must be an absolute URL including protocol and domain.`,
            url: locText,
          });
        }

        // Check HTTP vs HTTPS
        if (locText.startsWith("http://")) {
          issues.push({
            type: "warning",
            title: "Insecure HTTP Protocol",
            message: `URL "${locText}" uses unencrypted http:// instead of secure https://.`,
            url: locText,
          });
        }

        // Check Lastmod Date Format
        if (lastmodNode && lastmodNode.textContent?.trim()) {
          const lText = lastmodNode.textContent.trim();
          if (!isValidW3CDate(lText)) {
            issues.push({
              type: "error",
              title: "Invalid <lastmod> Date Format",
              message: `Date "${lText}" is not in valid W3C Datetime format (YYYY-MM-DD or ISO 8601).`,
              url: locText,
            });
          }
        }

        // Check Changefreq
        if (changefreqNode && changefreqNode.textContent?.trim()) {
          const cText = changefreqNode.textContent.trim().toLowerCase();
          const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
          if (!validFreqs.includes(cText)) {
            issues.push({
              type: "warning",
              title: "Invalid <changefreq> Directive",
              message: `Value "${cText}" is not a valid sitemap changefreq. Valid options: ${validFreqs.join(", ")}.`,
              url: locText,
            });
          }
        }

        // Check Priority
        if (priorityNode && priorityNode.textContent?.trim()) {
          const pText = priorityNode.textContent.trim();
          const pNum = parseFloat(pText);
          if (isNaN(pNum) || pNum < 0.0 || pNum > 1.0) {
            issues.push({
              type: "warning",
              title: "Invalid <priority> Range",
              message: `Priority "${pText}" must be a numeric floating value between 0.0 and 1.0.`,
              url: locText,
            });
          }
        }
      });
    }

    // 4. Physical Limits Check
    if (parsedUrls > 50000) {
      issues.push({
        type: "error",
        title: "Exceeds 50,000 URL Limit",
        message: `Sitemap contains ${parsedUrls.toLocaleString()} URLs, exceeding Google's maximum threshold of 50,000 URLs per file. Split into a sitemap index.`,
      });
    }

    if (stats.byteSize > 50 * 1024 * 1024) {
      issues.push({
        type: "error",
        title: "Exceeds 50 MB Uncompressed Limit",
        message: `File size is ${stats.mbSize} MB, exceeding Google's maximum 50 MB limit.`,
      });
    }

    const errorsCount = issues.filter((i) => i.type === "error").length;
    const warningsCount = issues.filter((i) => i.type === "warning").length;

    let score = 100;
    score -= errorsCount * 25;
    score -= warningsCount * 10;
    score = Math.max(0, Math.min(100, score));

    return {
      isValid: errorsCount === 0,
      score,
      issues,
      parsedUrls,
    };
  }, [rawXmlInput, stats]);

  // Actions
  const handleCopy = useCallback(() => {
    const code = activeTab === "xml" ? generatedXml : generatedNextjsSnippet;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [activeTab, generatedXml, generatedNextjsSnippet]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([generatedXml], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sitemap.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [generatedXml]);

  const handleImportToGenerator = () => {
    if (validationResults.parsedUrls > 0) {
      const locRegex = /<loc>([^<]+)<\/loc>/gi;
      const matches: string[] = [];
      let match;
      while ((match = locRegex.exec(rawXmlInput)) !== null) {
        matches.push(match[1].trim());
      }
      if (matches.length > 0) {
        setRawUrlsInput(matches.join("\n"));
        setMode("generator");
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Controller Bar: Mode Selection & Presets */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-5 text-white shadow-xl shadow-indigo-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 p-1 bg-white/10 rounded-xl backdrop-blur-sm">
            <button
              onClick={() => setMode("generator")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200",
                mode === "generator"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              <FileCode className="h-4 w-4" />
              <span>Generator Mode</span>
            </button>
            <button
              onClick={() => setMode("validator")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200",
                mode === "validator"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Validator / Linter Mode</span>
            </button>
          </div>

          {/* Quick Presets & Badge Launcher */}
          <div className="flex flex-wrap items-center gap-2">
            {mode === "generator" ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setRawUrlsInput(SAMPLE_GENERATOR_URLS);
                    setDefaultPriority("0.8");
                    setDefaultChangefreq("monthly");
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors"
                >
                  Standard Site
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRawUrlsInput(SAMPLE_ECOMMERCE_URLS);
                    setDefaultPriority("0.8");
                    setDefaultChangefreq("daily");
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors"
                >
                  E-Commerce / Blog
                </button>
                <button
                  type="button"
                  onClick={() => setRawUrlsInput("")}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/30 text-xs font-medium text-slate-300 hover:text-rose-200 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Clear
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setRawXmlInput(SAMPLE_VALID_XML)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-medium text-emerald-300 border border-emerald-500/30 transition-colors"
                >
                  Load Valid XML
                </button>
                <button
                  type="button"
                  onClick={() => setRawXmlInput(SAMPLE_FAULTY_XML)}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs font-medium text-amber-300 border border-amber-500/30 transition-colors"
                >
                  Load Faulty XML
                </button>
              </>
            )}

            <EmbedBadgeModal
              toolSlug={toolSlug || "xml-sitemap-generator"}
              label="Sitemap 0.9"
              status={validationResults.isValid ? "Google Valid" : "Audit"}
              score={validationResults.score}
            />
          </div>

        </div>
      </div>

      {/* Main Dual-Pane Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Generator Inputs OR Validator Linter */}
        <div className="lg:col-span-7 space-y-6">
          
          {mode === "generator" ? (
            /* GENERATOR MODE PANEL */
            <div className="space-y-6">
              {/* URL Input Box */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="h-4 w-4 text-indigo-500" />
                    Bulk URL Input (1 per line)
                  </label>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {generatorEntries.length} URL{generatorEntries.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <textarea
                  value={rawUrlsInput}
                  onChange={(e) => setRawUrlsInput(e.target.value)}
                  placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/products"
                  rows={8}
                  className="w-full font-mono text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y leading-relaxed"
                />

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  Paste absolute URLs (up to 200+). Protocol will be upgraded to HTTPS automatically if enabled.
                </p>
              </div>

              {/* Global Sitemap Directives */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
                  Global Sitemap Directives & Defaults
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Change Frequency */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Default &lt;changefreq&gt;
                    </label>
                    <select
                      value={defaultChangefreq}
                      onChange={(e) => setDefaultChangefreq(e.target.value as ChangeFreq)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                      <option value="always">always</option>
                      <option value="hourly">hourly</option>
                      <option value="daily">daily</option>
                      <option value="weekly">weekly</option>
                      <option value="monthly">monthly</option>
                      <option value="yearly">yearly</option>
                      <option value="never">never</option>
                    </select>
                  </div>

                  {/* Priority Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Default &lt;priority&gt;
                      </label>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        {defaultPriority}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={defaultPriority}
                      onChange={(e) => setDefaultPriority(e.target.value)}
                      className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>0.1 (Low)</span>
                      <span>1.0 (Critical)</span>
                    </div>
                  </div>

                  {/* Lastmod Date */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        &lt;lastmod&gt; Date
                      </label>
                      <button
                        type="button"
                        onClick={() => setDefaultLastmod(getTodayString())}
                        className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                      >
                        Set Today
                      </button>
                    </div>
                    <input
                      type="date"
                      value={defaultLastmod}
                      onChange={(e) => setDefaultLastmod(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>

                {/* Advanced Toggles Grid */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLastmod}
                      onChange={(e) => setIncludeLastmod(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Include <code>&lt;lastmod&gt;</code> tags</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeChangefreq}
                      onChange={(e) => setIncludeChangefreq(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Include <code>&lt;changefreq&gt;</code> hints</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePriority}
                      onChange={(e) => setIncludePriority(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Include <code>&lt;priority&gt;</code> tags</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smartRootPriority}
                      onChange={(e) => setSmartRootPriority(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Smart Root Hierarchy (Root = 1.0)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={forceHttps}
                      onChange={(e) => setForceHttps(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Force HTTPS protocol</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={escapeEntities}
                      onChange={(e) => setEscapeEntities(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Auto-escape XML entities (&amp;, &apos;, &quot;)</span>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            /* VALIDATOR / LINTER MODE PANEL */
            <div className="space-y-6">
              {/* Raw XML Input Area */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-indigo-500" />
                    Paste Raw Sitemap XML to Lint
                  </label>
                  <span className="text-xs font-mono text-slate-500">
                    {stats.kbSize} KB
                  </span>
                </div>

                <textarea
                  value={rawXmlInput}
                  onChange={(e) => setRawXmlInput(e.target.value)}
                  placeholder="Paste <?xml version='1.0' encoding='UTF-8'?>&#10;<urlset ...>&#10;..."
                  rows={10}
                  className="w-full font-mono text-xs p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y leading-relaxed"
                />
              </div>

              {/* Live Lint Diagnostic Results Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white",
                        validationResults.isValid ? "bg-emerald-600" : "bg-rose-600"
                      )}
                    >
                      {validationResults.score}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {validationResults.isValid ? "Valid XML Sitemap" : "Syntax Issues Detected"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {validationResults.parsedUrls} URLs parsed • {validationResults.issues.length} diagnostic checks
                      </p>
                    </div>
                  </div>

                  {validationResults.parsedUrls > 0 && (
                    <button
                      type="button"
                      onClick={handleImportToGenerator}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Import into Generator</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Diagnostic Item List */}
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {validationResults.issues.length === 0 ? (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                          100% Google & Sitemaps.org Protocol Compliant
                        </h5>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400/90 mt-0.5">
                          Valid XML namespace, absolute HTTPS URLs, correct date formats, and zero syntax errors detected.
                        </p>
                      </div>
                    </div>
                  ) : (
                    validationResults.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "p-3 rounded-xl border flex items-start gap-3 text-xs",
                          issue.type === "error"
                            ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200"
                            : issue.type === "warning"
                            ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300"
                        )}
                      >
                        {issue.type === "error" ? (
                          <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold">{issue.title}</div>
                          <div className="opacity-90 mt-0.5">{issue.message}</div>
                          {issue.url && (
                            <div className="mt-1 font-mono text-[11px] truncate opacity-75">
                              {issue.url}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Code Output & Real-Time Stats */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Main Output Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md overflow-hidden">
            
            {/* Tab Header & Action Buttons */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              
              {/* Output Format Tabs */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-200 dark:bg-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("xml")}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-bold transition-colors",
                    activeTab === "xml"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  sitemap.xml
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("nextjs")}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-bold transition-colors",
                    activeTab === "nextjs"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js App Router
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  title="Download sitemap.xml file"
                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>

            {/* Code Display Area */}
            <div className="relative">
              <pre className="font-mono text-xs p-4 bg-slate-950 text-slate-100 max-h-[360px] overflow-auto leading-relaxed selection:bg-indigo-800 selection:text-white">
                <code>{activeTab === "xml" ? generatedXml : generatedNextjsSnippet}</code>
              </pre>
            </div>

            {/* Live Stats Footnote Banner */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total URLs</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    {stats.urlCount.toLocaleString()}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Payload Size</div>
                  <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    {stats.kbSize} KB
                  </div>
                </div>
              </div>

              {/* Google Limit Meter */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Google 50,000 URL Limit</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-200">
                    {stats.urlCount} / 50,000
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      stats.isUrlCountSafe ? "bg-emerald-500" : "bg-rose-500"
                    )}
                    style={{ width: `${Math.max(1, stats.urlPercent)}%` }}
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" /> 100% Client-Side Private
                </span>
                <span className="font-mono">Sitemaps.org 0.9</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default XmlSitemapGenerator;
