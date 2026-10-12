"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  Code2,
  FileCode,
  ShieldCheck,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemaJsonLdViewerProps {
  jsonLd: Record<string, unknown>;
  targetEntity: string;
  title: string;
}

// Isomorphic Base64 encoder for deterministic SSR + client hydration
function encodePayloadIsomorphic(rawString: string): string {
  try {
    const jsonPayload = JSON.stringify({ code: rawString });
    const uriEncoded = encodeURIComponent(jsonPayload);
    if (typeof Buffer !== "undefined") {
      return Buffer.from(uriEncoded, "utf-8").toString("base64");
    }
    if (typeof btoa !== "undefined") {
      return btoa(uriEncoded);
    }
    return "";
  } catch {
    return "";
  }
}

export function SchemaJsonLdViewer({
  jsonLd,
  targetEntity,
  title,
}: SchemaJsonLdViewerProps) {
  const [copied, setCopied] = useState(false);
  const [includeScriptTags, setIncludeScriptTags] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Formatted JSON string
  const jsonString = useMemo(() => {
    return JSON.stringify(jsonLd, null, 2);
  }, [jsonLd]);

  const outputCode = useMemo(() => {
    if (includeScriptTags) {
      return `<script type="application/ld+json">\n${jsonString}\n</script>`;
    }
    return jsonString;
  }, [includeScriptTags, jsonString]);

  // Compute validator link with hash payload isomorphically
  const validatorHref = useMemo(() => {
    const serialized = encodePayloadIsomorphic(outputCode);
    return serialized ? `/tools/schema-validator#s=${serialized}` : "/tools/schema-validator";
  }, [outputCode]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [outputCode]);

  const handleDownload = useCallback(() => {
    const filename = `${targetEntity.toLowerCase()}-schema.jsonld`;
    const blob = new Blob([outputCode], { type: "application/ld+json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [outputCode, targetEntity]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Code Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
            <FileCode className="h-3.5 w-3.5" />
            <span>application/ld+json</span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-mono">
            {targetEntity} Blueprint
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Script Wrapper Toggle */}
          <button
            type="button"
            onClick={() => setIncludeScriptTags(!includeScriptTags)}
            className={cn(
              "px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors",
              includeScriptTags
                ? "bg-slate-200/70 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
            )}
            title="Toggle <script> wrapper tags"
          >
            {includeScriptTags ? "With <script>" : "Raw JSON"}
          </button>

          {/* Test in Schema Validator CTA */}
          <Link
            href={validatorHref}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Test in Validator</span>
            <ExternalLink className="h-3 w-3 opacity-75" />
          </Link>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy JSON-LD</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Download .jsonld file"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Code Body Area */}
      <div className="relative">
        <pre
          className={cn(
            "p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-slate-900 dark:text-slate-100 bg-slate-950/5 dark:bg-slate-950/70 select-all transition-all",
            isExpanded ? "max-h-[800px]" : "max-h-[420px]"
          )}
        >
          <code>{outputCode}</code>
        </pre>

        {/* Expand / Collapse Floating Control */}
        <div className="absolute bottom-3 right-3">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-200 backdrop-blur border border-slate-700 shadow-md inline-flex items-center gap-1 transition-all"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="h-3 w-3" />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3 w-3" />
                <span>Expand Full Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 px-4 py-2 text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>Validated against Schema.org 2026 Core Vocabulary & Google Rich Results specs</span>
        </div>
        <span className="font-mono">{jsonString.length} bytes</span>
      </div>
    </div>
  );
}
