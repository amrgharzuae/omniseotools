"use client";

import React, { useState, useCallback } from "react";
import { Copy, Check, Download, FileCode, Sparkles, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SnippetTab {
  id: string;
  name: string;
  language: string;
  filename: string;
  description: string;
  code: string;
}

const SNIPPETS: SnippetTab[] = [
  {
    id: "client-ts",
    name: "Client-Side TypeScript Sanitizer",
    language: "typescript",
    filename: "sanitizeUtmUrl.ts",
    description: "5-line pure TypeScript function to normalize UTM parameters to lowercase and replace spaces with hyphens before link sharing.",
    code: `export function sanitizeUtmUrl(rawUrl: string): string {
  const url = new URL(rawUrl);
  const keys = Array.from(url.searchParams.keys());
  keys.forEach((k) => {
    if (k.toLowerCase().startsWith("utm_")) {
      const v = url.searchParams.get(k) || "";
      url.searchParams.delete(k);
      url.searchParams.set(k.toLowerCase(), v.toLowerCase().trim().replace(/\\s+/g, "-"));
    }
  });
  return url.toString();
}`,
  },
  {
    id: "nextjs-middleware",
    name: "Next.js Edge Middleware (301 Redirect)",
    language: "typescript",
    filename: "middleware.ts",
    description: "Next.js App Router Edge Middleware that intercepts incoming requests with uppercase UTM tags and permanently redirects to clean lowercase URLs.",
    code: `// middleware.ts (Next.js App Router Edge Middleware)
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let hasUppercaseUtm = false;

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    if (key.toLowerCase().startsWith("utm_")) {
      const lowerKey = key.toLowerCase();
      const lowerVal = value.toLowerCase().trim().replace(/\\s+/g, "-");

      if (key !== lowerKey || value !== lowerVal) {
        url.searchParams.delete(key);
        url.searchParams.set(lowerKey, lowerVal);
        hasUppercaseUtm = true;
      }
    }
  }

  // Issue 301 Permanent Redirect to prevent GA4 attribution fragmentation
  if (hasUppercaseUtm) {
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};`,
  },
  {
    id: "cloudflare-worker",
    name: "Cloudflare Worker Edge Rewriter",
    language: "javascript",
    filename: "worker.js",
    description: "Cloudflare Edge Worker that normalizes UTM parameter casing at the CDN layer before analytics scripts fire.",
    code: `// worker.js (Cloudflare Edge Worker)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let mutated = false;
    const cleanParams = new URLSearchParams();

    for (const [key, value] of url.searchParams.entries()) {
      if (key.toLowerCase().startsWith("utm_")) {
        const cleanKey = key.toLowerCase();
        const cleanVal = value.toLowerCase().trim().replace(/\\s+/g, "-");
        if (key !== cleanKey || value !== cleanVal) {
          mutated = true;
        }
        cleanParams.append(cleanKey, cleanVal);
      } else {
        cleanParams.append(key, value);
      }
    }

    if (mutated) {
      url.search = cleanParams.toString();
      return Response.redirect(url.toString(), 301);
    }

    return fetch(request);
  },
};`,
  },
];

export function UtmSnippetTabs() {
  const [activeTab, setActiveTab] = useState<string>("client-ts");
  const [copied, setCopied] = useState(false);

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentSnippet]);

  const handleDownload = useCallback(() => {
    const ext = currentSnippet.filename.endsWith(".ts")
      ? ".ts"
      : currentSnippet.filename.endsWith(".js")
      ? ".js"
      : ".txt";
    const blob = new Blob([currentSnippet.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = currentSnippet.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [currentSnippet]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden space-y-0">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/80 px-4 py-2 gap-2">
        <div className="flex flex-wrap gap-1.5">
          {SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => setActiveTab(snippet.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                activeTab === snippet.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600"
              )}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>{snippet.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Snippet"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Snippet Description */}
      <div className="px-4 py-2.5 bg-slate-100/60 dark:bg-slate-800/40 border-b border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
        <span>{currentSnippet.description}</span>
        <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          {currentSnippet.filename}
        </span>
      </div>

      {/* Code Editor Display */}
      <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre">{currentSnippet.code}</pre>
      </div>

      {/* Tool Callout Bridge Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border-t border-emerald-100 dark:border-emerald-900/40">
        <div className="flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200">
          <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Test and bulk-normalize your URLs before deploying code:
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tools/marketing/utm-campaign-builder"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500 transition-all"
          >
            <span>Single Builder</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          <span className="text-slate-400">•</span>
          <Link
            href="/tools/bulk-utm-matrix-generator"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500 transition-all"
          >
            <span>Bulk Matrix Generator</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
