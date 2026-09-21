"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, MessageSquarePlus } from "lucide-react";
import { openFeedbackDrawer } from "@/components/feedback/MicroFeedbackDrawer";

export default function ToolError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Route Level Tool Error]:", error);
  }, [error]);

  const handleReport = () => {
    openFeedbackDrawer({
      category: "bug",
      errorStack: error.stack || error.message,
      initialMessage: `Page error encountered on tool route: ${error.message}`,
    });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shadow-inner">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Tool Failed to Load
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            An unexpected error occurred while rendering this utility. You can try refreshing the tool state or report this issue directly to our engineering team.
          </p>
        </div>

        {error.message && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left font-mono text-xs text-rose-600 dark:text-rose-400 overflow-x-auto max-h-28">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={handleReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer"
          >
            <MessageSquarePlus className="h-3.5 w-3.5 text-emerald-500" />
            <span>Report Bug</span>
          </button>

          <Link
            href="/tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>All Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
