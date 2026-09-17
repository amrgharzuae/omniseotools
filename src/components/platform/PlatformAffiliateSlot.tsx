"use client";

import React from "react";
import { Sparkles, ArrowUpRight, ShieldCheck } from "lucide-react";
import { PlatformAffiliateSlot as AffiliateSlotType } from "@/types/platform";
import { cn } from "@/lib/utils";

interface PlatformAffiliateSlotProps {
  affiliate?: AffiliateSlotType;
  platformName: string;
  className?: string;
  compact?: boolean;
}

export function PlatformAffiliateSlot({
  affiliate,
  platformName,
  className,
  compact = false,
}: PlatformAffiliateSlotProps) {
  if (!affiliate) return null;

  const isPlaceholder = affiliate.isPlaceholder ?? true;
  const isLinkActive = affiliate.targetUrl && affiliate.targetUrl !== "#";

  return (
    <aside
      aria-label={`${platformName} Recommended Partner Resource`}
      className={cn(
        "relative my-8 overflow-hidden rounded-2xl border border-indigo-500/20 dark:border-indigo-500/30",
        "bg-gradient-to-br from-indigo-50/70 via-white to-slate-50/70 dark:from-indigo-950/25 dark:via-slate-900/90 dark:to-slate-950/80",
        "p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {/* Decorative subtle ambient background glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Left / Main Content */}
        <div className="flex-1 space-y-2.5">
          {/* Badge & Contextual Metadata */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600/10 dark:bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
              <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              {affiliate.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Verified for {platformName}
            </span>
          </div>

          {/* Offer Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {affiliate.title}
          </h3>

          {/* Offer Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {affiliate.description}
          </p>
        </div>

        {/* Right CTA Button & Placeholder Info */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-2.5 shrink-0">
          <a
            href={affiliate.targetUrl || "#"}
            target={isLinkActive ? "_blank" : undefined}
            rel="noopener noreferrer sponsored"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm",
              "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white",
              "dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            )}
            onClick={(e) => {
              if (!isLinkActive) {
                e.preventDefault();
              }
            }}
          >
            <span>{affiliate.ctaText}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          {/* Placeholder Indicator Container (Zero-CLS Architecture) */}
          {isPlaceholder && (
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Partner Slot • Contextual Placeholder</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
