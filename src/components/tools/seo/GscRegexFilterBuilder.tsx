"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Filter,
  Sparkles,
  Copy,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Layers,
  FileCode,
  SlidersHorizontal,
  Info,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  FolderTree,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Eye,
  Hash,
  Terminal,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface GscRegexFilterBuilderProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

export type FilterMode =
  | "questions"
  | "brand"
  | "intent"
  | "word-count"
  | "page-url"
  | "custom";

export type WordCountType = "min" | "exact" | "max" | "range";

export interface Re2LintIssue {
  type: "error" | "warning";
  message: string;
  fixHint?: string;
}

export interface Re2LintResult {
  isValid: boolean;
  issues: Re2LintIssue[];
  compiledRegex: RegExp | null;
}

// Predefined question words
const DEFAULT_QUESTION_WORDS = [
  "who",
  "what",
  "where",
  "when",
  "why",
  "how",
  "does",
  "do",
  "did",
  "can",
  "could",
  "should",
  "would",
  "is",
  "are",
  "will",
  "which",
  "best way to",
];

// Predefined Intent Categories
const INTENT_PRESETS = {
  transactional: {
    label: "Transactional (Buy / Purchase)",
    description: "Queries signaling high purchase intent, pricing, or orders",
    terms: [
      "buy",
      "price",
      "pricing",
      "cost",
      "deal",
      "deals",
      "coupon",
      "cheap",
      "discount",
      "order",
      "purchase",
      "quote",
      "sale",
      "promo",
      "shop",
      "hire",
    ],
  },
  commercial: {
    label: "Commercial Investigation (Comparison / Reviews)",
    description: "Queries comparing products, reading reviews, and assessing options",
    terms: [
      "best",
      "vs",
      "versus",
      "alternative",
      "alternatives",
      "review",
      "reviews",
      "top",
      "comparison",
      "compare",
      "rated",
      "tools",
      "software",
      "agency",
    ],
  },
  informational: {
    label: "Informational (Guides / Learning)",
    description: "Queries seeking how-tos, tutorials, templates, or definitions",
    terms: [
      "guide",
      "tutorial",
      "how to",
      "tips",
      "examples",
      "template",
      "checklist",
      "learn",
      "definition",
      "ideas",
      "formula",
      "framework",
    ],
  },
  local: {
    label: "Local & Proximity (Near Me / In City)",
    description: "Queries looking for local businesses, directions, or physical proximity",
    terms: [
      "near me",
      "nearby",
      "local",
      "in city",
      "open now",
      "directions",
      "address",
      "phone number",
      "store",
      "closest",
    ],
  },
};

// Sample GSC Datasets for testing
const SAMPLE_QUERIES = `how to optimize title tags for seo
best seo tools for small business
buy enterprise schema generator
omniseo tools review
omni seo login
what is re2 regex in google search console
top 10 canonical url mistakes
website design agency near me
can googlebot execute javascript redirects
discount coupon for seo software
free robots txt generator
where to find sitemap in nextjs
compare nextjs vs remix for seo
seo pricing calculator 2026
omniseotools pricing`;

const SAMPLE_URLS = `https://example.com/blog/seo-best-practices
https://example.com/blog/how-to-fix-404-errors/
https://example.com/products/leather-jacket
https://example.com/products/shoes?color=black&size=10
https://example.com/tools/regex-builder
https://example.com/tools/schema-generator.html
https://example.com/about-us
https://example.com/contact/
https://example.com/docs/api-reference.pdf
https://blog.example.com/annual-report-2026
https://example.com/category/mens-footwear/`;

export function GscRegexFilterBuilder({
  toolSlug = "gsc-regex-filter-builder",
  toolName = "Google Search Console Regex Filter Builder",
}: GscRegexFilterBuilderProps) {
  // Mode selection
  const [activeMode, setActiveMode] = useState<FilterMode>("questions");

  // Mode A: Questions State
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([
    "who",
    "what",
    "where",
    "when",
    "why",
    "how",
    "does",
    "can",
    "is",
    "are",
    "did",
    "should",
    "could",
  ]);
  const [customQuestionWord, setCustomQuestionWord] = useState<string>("");
  const [questionAnchorStart, setQuestionAnchorStart] = useState<boolean>(true);
  const [questionWordBoundary, setQuestionWordBoundary] = useState<boolean>(true);
  const [questionCaseInsensitive, setQuestionCaseInsensitive] = useState<boolean>(true);

  // Mode B: Brand vs Non-Brand State
  const [brandStemsInput, setBrandStemsInput] = useState<string>(
    "omniseo, omni seo, omniseotools, omni seo tool"
  );
  const [brandUseWordBoundary, setBrandUseWordBoundary] = useState<boolean>(true);
  const [brandNormalizeWhitespace, setBrandNormalizeWhitespace] = useState<boolean>(true);
  const [brandCaseInsensitive, setBrandCaseInsensitive] = useState<boolean>(true);
  const [brandFilterTarget, setBrandFilterTarget] = useState<"non-brand" | "brand">("non-brand");

  // Mode C: Intent Modifiers State
  const [enabledIntents, setEnabledIntents] = useState<{
    transactional: boolean;
    commercial: boolean;
    informational: boolean;
    local: boolean;
  }>({
    transactional: true,
    commercial: true,
    informational: false,
    local: false,
  });
  const [customIntentWords, setCustomIntentWords] = useState<string>("");
  const [intentCaseInsensitive, setIntentCaseInsensitive] = useState<boolean>(true);
  const [intentWordBoundary, setIntentWordBoundary] = useState<boolean>(true);

  // Mode D: Word Count State
  const [wordCountType, setWordCountType] = useState<WordCountType>("min");
  const [wordCountValue, setWordCountValue] = useState<number>(5);
  const [wordCountMaxRange, setWordCountMaxRange] = useState<number>(8);
  const [wordCountRegexFlavor, setWordCountRegexFlavor] = useState<"standard" | "compact">(
    "standard"
  );

  // Mode E: Page / URL Subfolders State
  const [subfoldersInput, setSubfoldersInput] = useState<string>("/blog/, /products/, /tools/");
  const [urlMatchTrailingSlash, setUrlMatchTrailingSlash] = useState<
    "all" | "missing-only" | "with-slash-only"
  >("all");
  const [urlMatchQueryParams, setUrlMatchQueryParams] = useState<
    "all" | "with-params" | "clean-only"
  >("all");
  const [urlFileExtensions, setUrlFileExtensions] = useState<string>("");
  const [urlSubdomain, setUrlSubdomain] = useState<string>("");
  const [urlDepthRule, setUrlDepthRule] = useState<"recursive" | "direct-only">("recursive");

  // Mode F: Custom RE2 State
  const [customRegexInput, setCustomRegexInput] = useState<string>(
    "(?i)^(who|what|where|how)\\b.*(?:seo|google)"
  );
  const [customDimension, setCustomDimension] = useState<"Query" | "Page">("Query");
  const [customMatchType, setCustomMatchType] = useState<"matches" | "does-not-match">(
    "matches"
  );

  // Live Test Sandbox State
  const [testInput, setTestInput] = useState<string>(SAMPLE_QUERIES);
  const [filterSandboxView, setFilterSandboxView] = useState<"all" | "matched" | "unmatched">(
    "all"
  );

  // Feedback State
  const [copied, setCopied] = useState<boolean>(false);
  const [showHowToGuide, setShowHowToGuide] = useState<boolean>(true);

  // -------------------------------------------------------------
  // RE2 COMPLIANCE LINTER ENGINE
  // -------------------------------------------------------------
  const validateRe2 = useCallback((pattern: string): Re2LintResult => {
    const issues: Re2LintIssue[] = [];

    if (!pattern.trim()) {
      return {
        isValid: false,
        issues: [{ type: "warning", message: "Expression is empty." }],
        compiledRegex: null,
      };
    }

    // 1. Check for Lookaheads: (?=...) or (?!...)
    if (/\(\?[=!][^)]*\)/.test(pattern) || /\(\?[=!]/.test(pattern)) {
      issues.push({
        type: "error",
        message: "Lookaheads (?=...) and (?!...) are forbidden in Google's RE2 engine.",
        fixHint: "Remove lookahead assertions and use sequential word groupings or GSC negative filter settings.",
      });
    }

    // 2. Check for Lookbehinds: (?<=...) or (?<!...)
    if (/\(\?<[=!][^)]*\)/.test(pattern) || /\(\?<[=!]/.test(pattern)) {
      issues.push({
        type: "error",
        message: "Lookbehinds (?<=...) and (?<!...) are forbidden in Google's RE2 engine.",
        fixHint: "RE2 does not support lookbehind expressions. Filter strings using anchors (^, $) or boundaries (\\b) instead.",
      });
    }

    // 3. Check for Backreferences: \1, \2, etc.
    if (/\\[1-9]/.test(pattern)) {
      issues.push({
        type: "error",
        message: "Backreferences (\\1, \\2) are not supported by RE2 in Search Console.",
        fixHint: "Repeat the literal pattern or use non-capturing groups (?:...) without referencing capture indices.",
      });
    }

    // 4. Check for Recursion / Possessive Quantifiers: (?R), *+, ++, ?+
    if (/\(\?R\)/i.test(pattern) || /[\*\+\?]\+/.test(pattern)) {
      issues.push({
        type: "error",
        message: "Possessive quantifiers (*+, ++) and recursive (?R) patterns are not supported in RE2.",
        fixHint: "Use standard greedy repetitions (+, *) or lazy quantifiers (+?, *?).",
      });
    }

    // 5. Check for JavaScript Regex Compilation Validity
    let compiledRegex: RegExp | null = null;
    let syntaxError = false;
    try {
      // If starts with (?i), JavaScript RegExp constructor will throw unless handled
      let jsPattern = pattern;
      let jsFlags = "";
      if (jsPattern.startsWith("(?i)")) {
        jsPattern = jsPattern.substring(4);
        jsFlags += "i";
      }
      compiledRegex = new RegExp(jsPattern, jsFlags);
    } catch (err: any) {
      syntaxError = true;
      issues.push({
        type: "error",
        message: `Syntax Error: ${err?.message || "Invalid regular expression syntax"}`,
      });
    }

    const hasErrors = issues.some((i) => i.type === "error");

    return {
      isValid: !hasErrors && !syntaxError,
      issues,
      compiledRegex,
    };
  }, []);

  // -------------------------------------------------------------
  // GENERATE PATTERN BASED ON CURRENT MODE
  // -------------------------------------------------------------
  const generatedConfig = useMemo(() => {
    let rawPattern = "";
    let dimension: "Query" | "Page" = "Query";
    let matchType: "Matches regex" | "Doesn't match regex" = "Matches regex";
    let explanation = "";

    switch (activeMode) {
      case "questions": {
        dimension = "Query";
        matchType = "Matches regex";
        const words = [...selectedQuestions];
        if (customQuestionWord.trim()) {
          const customSplits = customQuestionWord
            .split(/[,|\n]+/)
            .map((w) => w.trim())
            .filter(Boolean);
          words.push(...customSplits);
        }

        const uniqueWords = Array.from(new Set(words.filter(Boolean)));
        if (uniqueWords.length === 0) {
          rawPattern = "^(who|what|where|when|why|how)\\b";
        } else {
          const escaped = uniqueWords
            .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
            .join("|");
          const boundary = questionWordBoundary ? "\\b" : "";
          const anchor = questionAnchorStart ? "^" : "";
          const flag = questionCaseInsensitive ? "(?i)" : "";
          rawPattern = `${flag}${anchor}(${escaped})${boundary}`;
        }
        explanation = `Matches search queries starting with or containing ${uniqueWords.length} question interrogatives (who, what, how, why, etc.) to target Featured Snippets and PAA keywords.`;
        break;
      }

      case "brand": {
        dimension = "Query";
        matchType =
          brandFilterTarget === "non-brand"
            ? "Doesn't match regex"
            : "Matches regex";

        const stems = brandStemsInput
          .split(/[,|\n]+/)
          .map((s) => s.trim())
          .filter(Boolean);

        if (stems.length === 0) {
          rawPattern = "(?i)\\b(mybrand|my\\s+brand)\\b";
        } else {
          const formattedStems = stems.map((stem) => {
            let processed = stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            if (brandNormalizeWhitespace) {
              processed = processed.replace(/\\\s\+|\\s\+|\s+/g, "\\s+");
            }
            return processed;
          });

          const boundary = brandUseWordBoundary ? "\\b" : "";
          const flag = brandCaseInsensitive ? "(?i)" : "";
          rawPattern = `${flag}${boundary}(${formattedStems.join("|")})${boundary}`;
        }

        explanation =
          brandFilterTarget === "non-brand"
            ? `Set GSC filter to "Doesn't match regex" to exclude ${stems.length} brand variations and isolate pure non-branded organic traffic.`
            : `Matches ${stems.length} branded keyword variations to analyze brand equity and navigational search demand.`;
        break;
      }

      case "intent": {
        dimension = "Query";
        matchType = "Matches regex";
        const terms: string[] = [];

        if (enabledIntents.transactional) terms.push(...INTENT_PRESETS.transactional.terms);
        if (enabledIntents.commercial) terms.push(...INTENT_PRESETS.commercial.terms);
        if (enabledIntents.informational) terms.push(...INTENT_PRESETS.informational.terms);
        if (enabledIntents.local) terms.push(...INTENT_PRESETS.local.terms);

        if (customIntentWords.trim()) {
          const custom = customIntentWords
            .split(/[,|\n]+/)
            .map((t) => t.trim())
            .filter(Boolean);
          terms.push(...custom);
        }

        const uniqueTerms = Array.from(new Set(terms.filter(Boolean)));
        if (uniqueTerms.length === 0) {
          rawPattern = "(?i)\\b(buy|price|best|vs|review)\\b";
        } else {
          const escaped = uniqueTerms
            .map((t) =>
              t
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                .replace(/\s+/g, "\\s+")
            )
            .join("|");
          const boundary = intentWordBoundary ? "\\b" : "";
          const flag = intentCaseInsensitive ? "(?i)" : "";
          rawPattern = `${flag}${boundary}(${escaped})${boundary}`;
        }

        explanation = `Matches ${uniqueTerms.length} high-intent commercial, transactional, comparison, or local keyword modifiers across queries.`;
        break;
      }

      case "word-count": {
        dimension = "Query";
        matchType = "Matches regex";
        const val = Math.max(1, wordCountValue);

        if (wordCountType === "min") {
          const spaces = val - 1;
          if (wordCountRegexFlavor === "standard") {
            // Formula: ^(\S+\s+){N-1,}\S+$ (RE2 compliant)
            rawPattern = `^(\\S+\\s+){${spaces},}\\S+$`;
          } else {
            // Compact: ([^" "]*\s){N-1,}?
            rawPattern = `([^" "]*\\s){${spaces},}?`;
          }
          explanation = `Isolates long-tail queries containing at least ${val} words (${spaces}+ spaces between word clusters).`;
        } else if (wordCountType === "exact") {
          const spaces = val - 1;
          if (spaces === 0) {
            rawPattern = `^\\s*\\S+\\s*$`;
          } else {
            rawPattern = `^\\s*(\\S+\\s+){${spaces}}\\S+\\s*$`;
          }
          explanation = `Isolates queries containing exactly ${val} word${val > 1 ? "s" : ""}.`;
        } else if (wordCountType === "max") {
          const spaces = val - 1;
          rawPattern = `^\\s*(\\S+\\s+){0,${spaces}}\\S+\\s*$`;
          explanation = `Isolates short-tail queries containing ${val} or fewer words.`;
        } else {
          // Range
          const minSpaces = Math.max(0, val - 1);
          const maxSpaces = Math.max(minSpaces, wordCountMaxRange - 1);
          rawPattern = `^\\s*(\\S+\\s+){${minSpaces},${maxSpaces}}\\S+\\s*$`;
          explanation = `Isolates queries containing between ${val} and ${wordCountMaxRange} words.`;
        }
        break;
      }

      case "page-url": {
        dimension = "Page";
        matchType = "Matches regex";

        const paths = subfoldersInput
          .split(/[,|\n]+/)
          .map((p) => p.trim())
          .filter(Boolean);

        const pathPatterns = paths.map((p) => {
          let clean = p.startsWith("/") ? p : `/${p}`;
          // Escape regex special chars except /
          clean = clean.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          if (urlDepthRule === "direct-only") {
            // Direct child only: /blog/[^/]+/?$
            return `${clean}[^/]+/?$`;
          }
          return clean;
        });

        let basePattern = pathPatterns.length > 0 ? `(${pathPatterns.join("|")})` : "/";

        if (urlSubdomain.trim()) {
          const sub = urlSubdomain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          basePattern = `^https?://${sub}\\.[^/]+${basePattern}`;
        }

        if (urlFileExtensions.trim()) {
          const exts = urlFileExtensions
            .split(/[,|\s]+/)
            .map((e) => e.replace(/^\./, "").trim())
            .filter(Boolean);
          if (exts.length > 0) {
            basePattern = `${basePattern}.*\\.(${exts.join("|")})$`;
          }
        }

        if (urlMatchTrailingSlash === "missing-only") {
          basePattern = `${basePattern}.*[^/]$`;
        } else if (urlMatchTrailingSlash === "with-slash-only") {
          basePattern = `${basePattern}.*/$`;
        }

        if (urlMatchQueryParams === "with-params") {
          basePattern = `${basePattern}.*\\?.*`;
        } else if (urlMatchQueryParams === "clean-only") {
          basePattern = `^[^?]+${basePattern}`;
        }

        rawPattern = basePattern;
        explanation = `Filters URLs matching ${paths.length} target subfolders/directories with customized query string, extension, and trailing slash rules.`;
        break;
      }

      case "custom": {
        rawPattern = customRegexInput;
        dimension = customDimension;
        matchType = customMatchType === "matches" ? "Matches regex" : "Doesn't match regex";
        explanation = "Custom user-defined RE2 regular expression for Google Search Console.";
        break;
      }
    }

    return {
      pattern: rawPattern,
      dimension,
      matchType,
      explanation,
    };
  }, [
    activeMode,
    selectedQuestions,
    customQuestionWord,
    questionAnchorStart,
    questionWordBoundary,
    questionCaseInsensitive,
    brandStemsInput,
    brandUseWordBoundary,
    brandNormalizeWhitespace,
    brandCaseInsensitive,
    brandFilterTarget,
    enabledIntents,
    customIntentWords,
    intentCaseInsensitive,
    intentWordBoundary,
    wordCountType,
    wordCountValue,
    wordCountMaxRange,
    wordCountRegexFlavor,
    subfoldersInput,
    urlMatchTrailingSlash,
    urlMatchQueryParams,
    urlFileExtensions,
    urlSubdomain,
    urlDepthRule,
    customRegexInput,
    customDimension,
    customMatchType,
  ]);

  // Linting evaluation of current pattern
  const linterResult = useMemo(() => {
    return validateRe2(generatedConfig.pattern);
  }, [generatedConfig.pattern, validateRe2]);

  // -------------------------------------------------------------
  // LIVE SANDBOX MATCHING ENGINE
  // -------------------------------------------------------------
  const sandboxAnalysis = useMemo(() => {
    const rawLines = testInput
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (rawLines.length === 0 || !linterResult.isValid || !linterResult.compiledRegex) {
      return {
        totalRows: rawLines.length,
        matchedRows: 0,
        unmatchedRows: rawLines.length,
        matchPercentage: 0,
        results: rawLines.map((line) => ({ text: line, isMatch: false })),
      };
    }

    const reg = linterResult.compiledRegex;
    const isNegativeFilter = generatedConfig.matchType === "Doesn't match regex";

    const results = rawLines.map((line) => {
      let isRegexHit = false;
      try {
        isRegexHit = reg.test(line);
      } catch {
        isRegexHit = false;
      }

      // In GSC:
      // If "Matches regex", a line passes if isRegexHit is TRUE.
      // If "Doesn't match regex", a line passes if isRegexHit is FALSE.
      const isRetainedInGsc = isNegativeFilter ? !isRegexHit : isRegexHit;

      return {
        text: line,
        isRegexHit,
        isMatch: isRetainedInGsc,
      };
    });

    const matchedCount = results.filter((r) => r.isMatch).length;
    const percentage = rawLines.length > 0 ? (matchedCount / rawLines.length) * 100 : 0;

    return {
      totalRows: rawLines.length,
      matchedRows: matchedCount,
      unmatchedRows: rawLines.length - matchedCount,
      matchPercentage: percentage,
      results,
    };
  }, [testInput, linterResult, generatedConfig.matchType]);

  // Copy handler
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedConfig.pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedConfig.pattern]);

  // Reset helper
  const handleReset = useCallback(() => {
    if (activeMode === "questions") {
      setSelectedQuestions(DEFAULT_QUESTION_WORDS.slice(0, 13));
      setCustomQuestionWord("");
      setQuestionAnchorStart(true);
      setQuestionWordBoundary(true);
      setQuestionCaseInsensitive(true);
    } else if (activeMode === "brand") {
      setBrandStemsInput("omniseo, omni seo, omniseotools, omni seo tool");
      setBrandUseWordBoundary(true);
      setBrandNormalizeWhitespace(true);
      setBrandCaseInsensitive(true);
      setBrandFilterTarget("non-brand");
    } else if (activeMode === "intent") {
      setEnabledIntents({
        transactional: true,
        commercial: true,
        informational: false,
        local: false,
      });
      setCustomIntentWords("");
      setIntentCaseInsensitive(true);
      setIntentWordBoundary(true);
    } else if (activeMode === "word-count") {
      setWordCountType("min");
      setWordCountValue(5);
      setWordCountMaxRange(8);
      setWordCountRegexFlavor("standard");
    } else if (activeMode === "page-url") {
      setSubfoldersInput("/blog/, /products/, /tools/");
      setUrlMatchTrailingSlash("all");
      setUrlMatchQueryParams("all");
      setUrlFileExtensions("");
      setUrlSubdomain("");
      setUrlDepthRule("recursive");
    } else {
      setCustomRegexInput("(?i)^(who|what|where|how)\\b.*(?:seo|google)");
      setCustomDimension("Query");
      setCustomMatchType("matches");
    }
  }, [activeMode]);

  // Quick preset shortcuts
  const applyQuickPreset = (presetKey: string) => {
    if (presetKey === "question-all") {
      setActiveMode("questions");
      setSelectedQuestions(DEFAULT_QUESTION_WORDS);
      setQuestionAnchorStart(true);
      setTestInput(SAMPLE_QUERIES);
    } else if (presetKey === "buyer-intent") {
      setActiveMode("intent");
      setEnabledIntents({
        transactional: true,
        commercial: false,
        informational: false,
        local: false,
      });
      setTestInput(SAMPLE_QUERIES);
    } else if (presetKey === "long-tail-5") {
      setActiveMode("word-count");
      setWordCountType("min");
      setWordCountValue(5);
      setTestInput(SAMPLE_QUERIES);
    } else if (presetKey === "missing-slash") {
      setActiveMode("page-url");
      setSubfoldersInput("");
      setUrlMatchTrailingSlash("missing-only");
      setTestInput(SAMPLE_URLS);
    } else if (presetKey === "query-params") {
      setActiveMode("page-url");
      setSubfoldersInput("");
      setUrlMatchQueryParams("with-params");
      setTestInput(SAMPLE_URLS);
    } else if (presetKey === "pdf-assets") {
      setActiveMode("page-url");
      setSubfoldersInput("");
      setUrlFileExtensions("pdf");
      setTestInput(SAMPLE_URLS);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Strategy Ribbon */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                RE2 Engine Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                <Sparkles className="w-3.5 h-3.5" />
                Search Console 2026 Ready
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              RE2 Regex Filter Builder & Live Tester
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Generate error-free Google Search Console regular expressions for queries and pages. Tested against RE2 linear-time safety rules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="GSC Regex"
              status="RE2 Verified"
              buttonVariant="compact"
            />
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 rounded-xl transition-colors"
              title="Reset current tab settings"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <ZapIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>Popular SEO Filter Presets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyQuickPreset("question-all")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-3 h-3" />
              FAQ / Question Queries
            </button>
            <button
              onClick={() => applyQuickPreset("buyer-intent")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-950/50 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-300 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <Tag className="w-3 h-3" />
              High-Intent Buyer Keywords
            </button>
            <button
              onClick={() => applyQuickPreset("long-tail-5")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/50 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <Hash className="w-3 h-3" />
              Long-Tail (5+ Words)
            </button>
            <button
              onClick={() => applyQuickPreset("missing-slash")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/50 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-300 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <FolderTree className="w-3 h-3" />
              URLs Missing Trailing Slash
            </button>
            <button
              onClick={() => applyQuickPreset("query-params")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-purple-50 dark:bg-slate-800 dark:hover:bg-purple-950/50 text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <FileCode className="w-3 h-3" />
              URLs with Query Parameters
            </button>
            <button
              onClick={() => applyQuickPreset("pdf-assets")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-amber-950/50 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3 h-3" />
              PDF Indexing Hits
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Filter Builder Configuration (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Segmented Mode Selector Tabs */}
          <div className="p-1.5 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex flex-wrap gap-1">
            <button
              onClick={() => {
                setActiveMode("questions");
                setTestInput(SAMPLE_QUERIES);
              }}
              className={cn(
                "flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeMode === "questions"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Questions & FAQ
            </button>
            <button
              onClick={() => {
                setActiveMode("brand");
                setTestInput(SAMPLE_QUERIES);
              }}
              className={cn(
                "flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeMode === "brand"
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Brand vs Non-Brand
            </button>
            <button
              onClick={() => {
                setActiveMode("intent");
                setTestInput(SAMPLE_QUERIES);
              }}
              className={cn(
                "flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeMode === "intent"
                  ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Tag className="w-3.5 h-3.5" />
              Intent & Commercial
            </button>
            <button
              onClick={() => {
                setActiveMode("word-count");
                setTestInput(SAMPLE_QUERIES);
              }}
              className={cn(
                "flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeMode === "word-count"
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Hash className="w-3.5 h-3.5" />
              Word Count
            </button>
            <button
              onClick={() => {
                setActiveMode("page-url");
                setTestInput(SAMPLE_URLS);
              }}
              className={cn(
                "flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeMode === "page-url"
                  ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <FolderTree className="w-3.5 h-3.5" />
              Page / Subfolders
            </button>
            <button
              onClick={() => {
                setActiveMode("custom");
              }}
              className={cn(
                "flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                activeMode === "custom"
                  ? "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Terminal className="w-3.5 h-3.5" />
              Custom RE2
            </button>
          </div>

          {/* Mode Configuration Card */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-6">
            {/* MODE A: QUESTIONS & FAQ MINING */}
            {activeMode === "questions" && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-500" />
                    Question Interrogatives & FAQ Mining
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Isolate informational questions to uncover People Also Ask (PAA) and Featured Snippet ranking opportunities.
                  </p>
                </div>

                {/* Question Words Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Select Question Prefixes:
                    </label>
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() => setSelectedQuestions(DEFAULT_QUESTION_WORDS)}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                      >
                        Select All
                      </button>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <button
                        onClick={() => setSelectedQuestions([])}
                        className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {DEFAULT_QUESTION_WORDS.map((word) => {
                      const isSelected = selectedQuestions.includes(word);
                      return (
                        <button
                          key={word}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedQuestions(
                                selectedQuestions.filter((w) => w !== word)
                              );
                            } else {
                              setSelectedQuestions([...selectedQuestions, word]);
                            }
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border",
                            isSelected
                              ? "bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-700 dark:text-indigo-300 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800/40 dark:border-slate-700 dark:text-slate-400 hover:border-slate-300"
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Question Words Add */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Additional Custom Question Stems (comma-separated):
                  </label>
                  <input
                    type="text"
                    value={customQuestionWord}
                    onChange={(e) => setCustomQuestionWord(e.target.value)}
                    placeholder="e.g., should i, is it safe to, best way to"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>

                {/* Match Anchors & Modifiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={questionAnchorStart}
                      onChange={(e) => setQuestionAnchorStart(e.target.checked)}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Start of Query Anchor (^)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Matches only if the question word is at the beginning of the search term.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={questionWordBoundary}
                      onChange={(e) => setQuestionWordBoundary(e.target.checked)}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Word Boundary (\b)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Prevents false matches (e.g., stops "how" from matching "shower").
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* MODE B: BRAND VS NON-BRAND */}
            {activeMode === "brand" && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Brand vs. Non-Brand Traffic Segmentation
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Isolate organic non-branded SEO performance by building regex filters for brand stems and misspellings.
                  </p>
                </div>

                {/* Target Setting Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Target Segmentation Goal:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setBrandFilterTarget("non-brand")}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all",
                        brandFilterTarget === "non-brand"
                          ? "bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700"
                          : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Exclude Brand (Non-Brand Focus)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        GSC Setting: <strong>Doesn't match regex</strong>
                      </div>
                    </button>

                    <button
                      onClick={() => setBrandFilterTarget("brand")}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all",
                        brandFilterTarget === "brand"
                          ? "bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700"
                          : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700"
                      )}
                    >
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        Include Brand Only
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        GSC Setting: <strong>Matches regex</strong>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Brand Stems Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Brand Stems, Typos & Variations (comma or line separated):
                  </label>
                  <textarea
                    rows={3}
                    value={brandStemsInput}
                    onChange={(e) => setBrandStemsInput(e.target.value)}
                    placeholder="omniseo, omni seo, omniseotools, omni seo tool"
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Include common spacing variations, product sub-brands, and intentional misspellings.
                  </p>
                </div>

                {/* Brand Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={brandNormalizeWhitespace}
                      onChange={(e) => setBrandNormalizeWhitespace(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Flexible Spacing (\s+)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Automatically handles multiple spaces or tabs between multi-word brands.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={brandUseWordBoundary}
                      onChange={(e) => setBrandUseWordBoundary(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Word Boundaries (\b)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Prevents false substring matches inside longer unrelated dictionary words.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* MODE C: INTENT & COMMERCIAL MODIFIERS */}
            {activeMode === "intent" && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-500" />
                    Commercial & Search Intent Modifiers
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Group queries by purchase readiness, comparative research, how-to guides, or local store searches.
                  </p>
                </div>

                {/* Intent Category Checkboxes */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Toggle Intent Categories:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Transactional */}
                    <label className={cn(
                      "p-3 rounded-xl border transition-all cursor-pointer",
                      enabledIntents.transactional
                        ? "bg-amber-50/60 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700"
                        : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700"
                    )}>
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={enabledIntents.transactional}
                          onChange={(e) =>
                            setEnabledIntents({
                              ...enabledIntents,
                              transactional: e.target.checked,
                            })
                          }
                          className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {INTENT_PRESETS.transactional.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {INTENT_PRESETS.transactional.description}
                          </div>
                          <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1.5 line-clamp-1">
                            buy, price, cost, deal, coupon, order, discount...
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Commercial Comparison */}
                    <label className={cn(
                      "p-3 rounded-xl border transition-all cursor-pointer",
                      enabledIntents.commercial
                        ? "bg-amber-50/60 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700"
                        : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700"
                    )}>
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={enabledIntents.commercial}
                          onChange={(e) =>
                            setEnabledIntents({
                              ...enabledIntents,
                              commercial: e.target.checked,
                            })
                          }
                          className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {INTENT_PRESETS.commercial.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {INTENT_PRESETS.commercial.description}
                          </div>
                          <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1.5 line-clamp-1">
                            best, vs, alternative, review, top, comparison...
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Informational */}
                    <label className={cn(
                      "p-3 rounded-xl border transition-all cursor-pointer",
                      enabledIntents.informational
                        ? "bg-amber-50/60 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700"
                        : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700"
                    )}>
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={enabledIntents.informational}
                          onChange={(e) =>
                            setEnabledIntents({
                              ...enabledIntents,
                              informational: e.target.checked,
                            })
                          }
                          className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {INTENT_PRESETS.informational.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {INTENT_PRESETS.informational.description}
                          </div>
                          <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1.5 line-clamp-1">
                            guide, tutorial, how to, tips, template, definition...
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* Local */}
                    <label className={cn(
                      "p-3 rounded-xl border transition-all cursor-pointer",
                      enabledIntents.local
                        ? "bg-amber-50/60 border-amber-300 dark:bg-amber-950/30 dark:border-amber-700"
                        : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700"
                    )}>
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={enabledIntents.local}
                          onChange={(e) =>
                            setEnabledIntents({
                              ...enabledIntents,
                              local: e.target.checked,
                            })
                          }
                          className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {INTENT_PRESETS.local.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {INTENT_PRESETS.local.description}
                          </div>
                          <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1.5 line-clamp-1">
                            near me, nearby, local, open now, directions...
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Custom Intent Modifiers */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Additional Custom Modifiers (comma-separated):
                  </label>
                  <input
                    type="text"
                    value={customIntentWords}
                    onChange={(e) => setCustomIntentWords(e.target.value)}
                    placeholder="e.g., demo, trial, free download, agency, developer"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* MODE D: WORD COUNT / LONG-TAIL */}
            {activeMode === "word-count" && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Hash className="w-4 h-4 text-blue-500" />
                    Word Count & Long-Tail Query Extractor
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Extract long-tail queries with high purchase specificity or isolate single-word vanity search terms.
                  </p>
                </div>

                {/* Word Count Type Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Word Count Length Rule:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setWordCountType("min")}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all",
                        wordCountType === "min"
                          ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-300"
                          : "bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {wordCountValue}+ Words (Min)
                    </button>
                    <button
                      onClick={() => setWordCountType("exact")}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all",
                        wordCountType === "exact"
                          ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-300"
                          : "bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      Exact {wordCountValue} Words
                    </button>
                    <button
                      onClick={() => setWordCountType("max")}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all",
                        wordCountType === "max"
                          ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-300"
                          : "bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      ≤ {wordCountValue} Words (Max)
                    </button>
                    <button
                      onClick={() => setWordCountType("range")}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all",
                        wordCountType === "range"
                          ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-300"
                          : "bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {wordCountValue} to {wordCountMaxRange} Words
                    </button>
                  </div>
                </div>

                {/* Primary Slider */}
                <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>
                      {wordCountType === "min"
                        ? "Minimum Word Count:"
                        : wordCountType === "exact"
                        ? "Exact Target Words:"
                        : wordCountType === "max"
                        ? "Maximum Word Count:"
                        : "Minimum Words in Range:"}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                      {wordCountValue} {wordCountValue === 1 ? "word" : "words"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={12}
                    value={wordCountValue}
                    onChange={(e) => setWordCountValue(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>1 (Single word)</span>
                    <span>4 (Mid-tail)</span>
                    <span>8+ (Ultra long-tail)</span>
                    <span>12</span>
                  </div>
                </div>

                {/* Secondary Range Slider if Range selected */}
                {wordCountType === "range" && (
                  <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Maximum Words in Range:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                        {wordCountMaxRange} words
                      </span>
                    </div>
                    <input
                      type="range"
                      min={wordCountValue}
                      max={15}
                      value={wordCountMaxRange}
                      onChange={(e) => setWordCountMaxRange(parseInt(e.target.value, 10))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                )}

                {/* RE2 Regex Formula Flavor */}
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <span>Formula Syntax Style:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWordCountRegexFlavor("standard")}
                      className={cn(
                        "px-2.5 py-1 rounded text-xs font-medium",
                        wordCountRegexFlavor === "standard"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      )}
                    >
                      Standard Non-Space (\S+\s+)
                    </button>
                    <button
                      onClick={() => setWordCountRegexFlavor("compact")}
                      className={cn(
                        "px-2.5 py-1 rounded text-xs font-medium",
                        wordCountRegexFlavor === "compact"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      )}
                    >
                      Compact Space-Class ([^" "]*\s)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODE E: PAGE / URL SUBFOLDERS */}
            {activeMode === "page-url" && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FolderTree className="w-4 h-4 text-purple-500" />
                    Page / URL Directory & File Filtering
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Isolate traffic to specific website subfolders, parameters, file extensions, or trailing slash configurations.
                  </p>
                </div>

                {/* Subfolders Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Target Subfolders / Directories (comma-separated):
                  </label>
                  <input
                    type="text"
                    value={subfoldersInput}
                    onChange={(e) => setSubfoldersInput(e.target.value)}
                    placeholder="e.g., /blog/, /products/, /tools/, /docs/"
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                  />
                </div>

                {/* Directory Depth Rule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <input
                      type="radio"
                      name="depthRule"
                      checked={urlDepthRule === "recursive"}
                      onChange={() => setUrlDepthRule("recursive")}
                      className="mt-0.5 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Recursive (All Nested Subpaths)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Matches /blog/post-1, /blog/category/post-2, etc.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer">
                    <input
                      type="radio"
                      name="depthRule"
                      checked={urlDepthRule === "direct-only"}
                      onChange={() => setUrlDepthRule("direct-only")}
                      className="mt-0.5 text-purple-600 focus:ring-purple-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Direct Children Only (1 Level Deep)
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Matches /blog/post-1 only, excludes nested subdirectories.
                      </div>
                    </div>
                  </label>
                </div>

                {/* Trailing Slash & Query String Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Trailing Slash Policy:
                    </label>
                    <select
                      value={urlMatchTrailingSlash}
                      onChange={(e: any) => setUrlMatchTrailingSlash(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    >
                      <option value="all">Match All (With or Without Slash)</option>
                      <option value="missing-only">Missing Trailing Slash ([^/]$) - Audit 301s</option>
                      <option value="with-slash-only">With Trailing Slash (/$)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      URL Query Parameters:
                    </label>
                    <select
                      value={urlMatchQueryParams}
                      onChange={(e: any) => setUrlMatchQueryParams(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    >
                      <option value="all">Match All URLs (Clean & Parameters)</option>
                      <option value="with-params">Only URLs with Query Parameters (\?.*)</option>
                      <option value="clean-only">Clean Canonical URLs Only (No ? Parameters)</option>
                    </select>
                  </div>
                </div>

                {/* File Extensions & Subdomains */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      File Extensions (optional):
                    </label>
                    <input
                      type="text"
                      value={urlFileExtensions}
                      onChange={(e) => setUrlFileExtensions(e.target.value)}
                      placeholder="e.g., pdf, html, php, json"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Subdomain Isolation (optional):
                    </label>
                    <input
                      type="text"
                      value={urlSubdomain}
                      onChange={(e) => setUrlSubdomain(e.target.value)}
                      placeholder="e.g., blog, docs, shop"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MODE F: CUSTOM RE2 & LINTER */}
            {activeMode === "custom" && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-rose-500" />
                    Custom RE2 Expression & Real-Time Linter
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Write any custom regular expression. Our linter continuously checks RE2 compliance and catches unsupported lookarounds.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Custom Regular Expression:
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">RE2 Syntax Engine</span>
                  </div>
                  <textarea
                    rows={3}
                    value={customRegexInput}
                    onChange={(e) => setCustomRegexInput(e.target.value)}
                    placeholder="Enter custom regex..."
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Filter Dimension:
                    </label>
                    <select
                      value={customDimension}
                      onChange={(e: any) => setCustomDimension(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-white"
                    >
                      <option value="Query">Query (Search Term)</option>
                      <option value="Page">Page (Destination URL)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Filter Match Rule:
                    </label>
                    <select
                      value={customMatchType}
                      onChange={(e: any) => setCustomMatchType(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-white"
                    >
                      <option value="matches">Matches regex (Inclusion)</option>
                      <option value="does-not-match">Doesn't match regex (Exclusion)</option>
                    </select>
                  </div>
                </div>

                {/* Quick RE2 Tokens Reference */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-rose-500" />
                    RE2 Cheat Sheet & Allowed Tokens:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    <div><code>\b</code> : Word boundary</div>
                    <div><code>^ / $</code> : Start / End anchors</div>
                    <div><code>\S+</code> : Non-whitespace token</div>
                    <div><code>(?i)</code> : Case-insensitive flag</div>
                    <div><code>(?:...)</code> : Non-capturing group</div>
                    <div><code>[a-z0-9]</code> : Character set</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Generated Regex + Live Sandbox + GSC Instructions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Generated Regex Output Block */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Generated RE2 Regex
                </h3>
              </div>

              {/* Status Badge */}
              {linterResult.isValid ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  RE2 Valid
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  <AlertTriangle className="w-3 h-3" />
                  Syntax Error
                </span>
              )}
            </div>

            {/* GSC Target Metadata Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800/60">
                Filter Dimension: <strong>{generatedConfig.dimension}</strong>
              </div>
              <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                Match Type: <strong>{generatedConfig.matchType}</strong>
              </div>
            </div>

            {/* Regex String Code Container */}
            <div className="relative group">
              <div className="w-full p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs break-all border border-slate-800 shadow-inner select-all min-h-[72px] flex items-center">
                {generatedConfig.pattern || "(empty)"}
              </div>

              <button
                onClick={handleCopy}
                className={cn(
                  "absolute top-2.5 right-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md",
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy for GSC
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {generatedConfig.explanation}
            </p>

            {/* Linter Warning/Error Box */}
            {linterResult.issues.length > 0 && (
              <div className="space-y-2 pt-2">
                {linterResult.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-3.5 rounded-xl border text-xs space-y-1",
                      issue.type === "error"
                        ? "bg-rose-50/80 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 text-rose-800 dark:text-rose-200"
                        : "bg-amber-50/80 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/60 text-amber-800 dark:text-amber-200"
                    )}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {issue.message}
                    </div>
                    {issue.fixHint && (
                      <div className="text-[11px] opacity-90 pl-5">
                        💡 {issue.fixHint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* How to Use in GSC Accordion */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <button
                onClick={() => setShowHowToGuide(!showHowToGuide)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                  How to apply this in Google Search Console
                </span>
                {showHowToGuide ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showHowToGuide && (
                <div className="mt-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                  <div className="flex items-start gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Open <strong>Google Search Console</strong> and navigate to <strong>Performance &gt; Search results</strong>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      Click <strong>+ New</strong> at the top filter bar and choose <strong>{generatedConfig.dimension}</strong>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      Change dropdown to <strong>Custom (regex)</strong>, select <strong>{generatedConfig.matchType}</strong>, paste the regex above, and click <strong>Apply</strong>.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Real-Time Testing Sandbox */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Real-Time Regex Sandbox
                </h3>
              </div>

              {/* Match Percentage Badge */}
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                  sandboxAnalysis.matchedRows > 0
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-300 dark:border-slate-700"
                )}
              >
                {sandboxAnalysis.matchedRows} of {sandboxAnalysis.totalRows} matched ({sandboxAnalysis.matchPercentage.toFixed(0)}%)
              </span>
            </div>

            {/* Sandbox Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setTestInput(SAMPLE_QUERIES)}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                >
                  Load Sample Queries
                </button>
                <button
                  onClick={() => setTestInput(SAMPLE_URLS)}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                >
                  Load Sample URLs
                </button>
                <button
                  onClick={() => setTestInput("")}
                  className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 text-[11px]"
                >
                  Clear
                </button>
              </div>

              {/* Filter Display Mode */}
              <div className="flex gap-1 text-[11px]">
                <button
                  onClick={() => setFilterSandboxView("all")}
                  className={cn(
                    "px-2 py-0.5 rounded",
                    filterSandboxView === "all"
                      ? "bg-slate-700 text-white dark:bg-slate-300 dark:text-slate-900 font-bold"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  All ({sandboxAnalysis.totalRows})
                </button>
                <button
                  onClick={() => setFilterSandboxView("matched")}
                  className={cn(
                    "px-2 py-0.5 rounded",
                    filterSandboxView === "matched"
                      ? "bg-emerald-600 text-white font-bold"
                      : "text-slate-500 hover:text-emerald-600"
                  )}
                >
                  Retained ({sandboxAnalysis.matchedRows})
                </button>
                <button
                  onClick={() => setFilterSandboxView("unmatched")}
                  className={cn(
                    "px-2 py-0.5 rounded",
                    filterSandboxView === "unmatched"
                      ? "bg-rose-600 text-white font-bold"
                      : "text-slate-500 hover:text-rose-600"
                  )}
                >
                  Filtered Out ({sandboxAnalysis.unmatchedRows})
                </button>
              </div>
            </div>

            {/* Test Input Textarea */}
            <textarea
              rows={4}
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Paste raw queries or URLs here (one per line)..."
              className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
            />

            {/* Match Results List */}
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {sandboxAnalysis.results
                .filter((item) => {
                  if (filterSandboxView === "matched") return item.isMatch;
                  if (filterSandboxView === "unmatched") return !item.isMatch;
                  return true;
                })
                .map((item, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between gap-3 border transition-all",
                      item.isMatch
                        ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                        : "bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-75"
                    )}
                  >
                    <div className="truncate flex-1">{item.text}</div>
                    <div className="shrink-0 flex items-center gap-1 text-[11px] font-sans font-bold">
                      {item.isMatch ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Match
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          Filtered
                        </span>
                      )}
                    </div>
                  </div>
                ))}

              {sandboxAnalysis.results.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400">
                  Paste sample queries or URLs above to test your regular expression.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
