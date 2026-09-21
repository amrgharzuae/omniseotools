import React from "react";
import { ShieldCheck, Crop, Eye, Layout, CheckCircle2 } from "lucide-react";

export function SafeZoneDiagram() {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 px-5 py-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-emerald-500" />
          <span>Open Graph 1200 × 630 Canvas & Safe Zone Architecture</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
            1.91:1 Aspect Ratio
          </span>
          <span className="rounded-md bg-slate-200 dark:bg-slate-800 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-400">
            1200 × 630 px
          </span>
        </div>
      </div>

      {/* Canvas Visual Diagram */}
      <div className="p-4 sm:p-6 bg-slate-100/60 dark:bg-slate-950/40">
        <div className="relative mx-auto aspect-[1.91/1] w-full max-w-2xl rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-900 text-white p-3 sm:p-5 flex flex-col justify-between shadow-inner">
          
          {/* Top 60px Safe Margin */}
          <div className="flex items-center justify-between rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-[10px] sm:text-xs text-amber-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Crop className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0" />
              <span>Top 60px Buffer Margin</span>
            </div>
            <span className="hidden sm:inline text-[10px] text-amber-400/80">
              Ignored by LinkedIn & Mobile Snippets
            </span>
          </div>

          {/* Central Critical Safe Zone */}
          <div className="my-2 flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-emerald-500/80 bg-emerald-950/40 p-3 sm:p-6 text-center shadow-lg">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-300 border border-emerald-500/40 mb-1.5 sm:mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>CRITICAL CONTENT SAFE ZONE (1080 × 510 px)</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-100 max-w-md leading-snug">
              Keep All Headlines, Brand Logos, Badges & High-Value Visuals Here
            </p>
            <p className="mt-1 text-[10px] sm:text-xs text-emerald-300/80 hidden sm:block">
              Guaranteed 100% visible on LinkedIn, Twitter Large Cards, Facebook, Discord, and Slack
            </p>
          </div>

          {/* Bottom 60px Safe Margin */}
          <div className="flex items-center justify-between rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-[10px] sm:text-xs text-amber-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Crop className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0" />
              <span>Bottom 60px Buffer Margin</span>
            </div>
            <span className="hidden sm:inline text-[10px] text-amber-400/80">
              Platform UI Overlays & URL Attribution Bar
            </span>
          </div>
        </div>
      </div>

      {/* Platform Compatibility Footer Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span><strong>LinkedIn:</strong> 1200x627 Safe</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span><strong>Twitter/X:</strong> Large Card 1.91:1</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span><strong>Facebook:</strong> 1200x630 Full</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span><strong>Discord:</strong> &gt;1.5:1 Banner</span>
        </div>
      </div>
    </div>
  );
}
