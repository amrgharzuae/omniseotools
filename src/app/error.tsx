"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, MessageSquarePlus } from "lucide-react";
import { openFeedbackDrawer } from "@/components/feedback/MicroFeedbackDrawer";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error Caught]:", error);
  }, [error]);

  const handleReport = () => {
    openFeedbackDrawer({
      category: "bug",
      errorStack: error.stack || error.message,
      initialMessage: `Unhandled global page exception: ${error.message}`,
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shadow-inner">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Unexpected Application Error
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Something went wrong while processing your request. You can attempt to reload this view or report the error.
          </p>
        </div>

        {error.message && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left font-mono text-xs text-rose-600 dark:text-rose-400 overflow-x-auto max-h-24">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={handleReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer"
          >
            <MessageSquarePlus className="h-3.5 w-3.5 text-emerald-500" />
            <span>Report Error</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-4 py-2.5 text-xs font-semibold transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
