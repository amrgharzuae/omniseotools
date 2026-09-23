"use client";

import React, { useState, useCallback } from "react";
import { Copy, Check, Download, ExternalLink, Sparkles, Terminal, FileCode, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RecipeSolutionViewerProps {
  solutionSnippet: string;
  snippetLanguage: string;
  relatedToolSlug: string;
  relatedToolName: string;
  relatedToolCta: string;
}

export function RecipeSolutionViewer({
  solutionSnippet,
  snippetLanguage,
  relatedToolSlug,
  relatedToolName,
  relatedToolCta,
}: RecipeSolutionViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(solutionSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [solutionSnippet]);

  const handleDownload = useCallback(() => {
    let ext = ".txt";
    let mime = "text/plain";
    if (snippetLanguage === "javascript") {
      ext = ".mjs";
      mime = "application/javascript";
    } else if (snippetLanguage === "html") {
      ext = ".html";
      mime = "text/html";
    }

    const blob = new Blob([solutionSnippet], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution-snippet${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [solutionSnippet, snippetLanguage]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden space-y-0">
      {/* Code Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Production Configuration ({snippetLanguage})
          </span>
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

      {/* Code Body */}
      <div className="p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre">{solutionSnippet}</pre>
      </div>

      {/* Tool Callout Bridge Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border-t border-emerald-100 dark:border-emerald-900/40">
        <div className="flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200">
          <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Need to customize or validate this configuration live?
          </span>
        </div>

        <Link
          href={`/tools/${relatedToolSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-500 transition-all"
        >
          <span>{relatedToolCta}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
