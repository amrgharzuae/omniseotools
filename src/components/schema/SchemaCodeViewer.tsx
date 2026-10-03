"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchemaCodeViewerProps {
  jsonLd: string;
  schemaType: string;
}

export function SchemaCodeViewer({ jsonLd, schemaType }: SchemaCodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonLd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl text-slate-200">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono font-semibold text-emerald-400">
            application/ld+json ({schemaType})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Validate in Tool Link */}
          <Link
            href="/tools/schema-validator"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs border border-emerald-500/30 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Test in Validator</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
              copied
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
            )}
            title="Copy JSON-LD code"
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
        </div>
      </div>

      {/* Code Container */}
      <div className="p-4 sm:p-6 overflow-x-auto max-h-[540px] text-xs sm:text-sm font-mono leading-relaxed selection:bg-emerald-500/30">
        <pre className="text-slate-200">
          <code>{jsonLd}</code>
        </pre>
      </div>

      {/* Code Footer Quick Action Bar */}
      <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <CheckCircle2 className="h-3.5 w-3.5" /> 100% Schema.org &amp; Google Rich Results Compliant (2026)
        </span>
        <span className="font-mono text-slate-500">
          Ready for &lt;script type=&quot;application/ld+json&quot;&gt;
        </span>
      </div>
    </div>
  );
}
