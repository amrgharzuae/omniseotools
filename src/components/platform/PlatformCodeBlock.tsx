"use client";

import React, { useState } from "react";
import { Copy, Check, FileCode, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatSnippetWithAttribution } from "@/lib/snippet-attribution";

interface PlatformCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  description?: string;
  toolSlug?: string;
  platformSlug?: string;
  className?: string;
}

export function PlatformCodeBlock({
  code,
  language = "typescript",
  filename,
  description,
  toolSlug,
  platformSlug,
  className,
}: PlatformCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeWithAttribution = toolSlug
      ? formatSnippetWithAttribution(code, {
          slug: toolSlug,
          platformSlug,
          language,
        })
      : code;

    try {
      await navigator.clipboard.writeText(codeWithAttribution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = codeWithAttribution;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-xl overflow-hidden font-mono text-xs sm:text-sm",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-300">
          <FileCode className="h-4 w-4 text-indigo-400" />
          <span className="font-semibold text-xs text-slate-200 truncate">
            {filename || "Configuration Snippet"}
          </span>
          <span className="rounded bg-indigo-950/80 border border-indigo-500/30 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300 uppercase tracking-wider">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all shadow-sm",
            copied
              ? "bg-emerald-600 text-white"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          )}
          title="Copy code to clipboard"
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
      </div>

      {/* Description if provided */}
      {description && (
        <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/60 text-[11px] text-slate-400 font-sans">
          {description}
        </div>
      )}

      {/* Code Container */}
      <div className="p-4 overflow-x-auto max-h-[420px] scrollbar-thin scrollbar-thumb-slate-700">
        <pre className="text-slate-200 leading-relaxed font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
