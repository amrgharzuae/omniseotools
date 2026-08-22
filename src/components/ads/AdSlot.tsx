"use client";

import React, { useEffect } from "react";
import { AD_PLACEMENTS, AdSlotType } from "@/config/ads";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  slotType: AdSlotType;
  slotId?: string;
  className?: string;
  labelPosition?: "top" | "bottom" | "none";
}

export function AdSlot({
  slotType,
  slotId,
  className,
  labelPosition = "top",
}: AdSlotProps) {
  const placement = AD_PLACEMENTS[slotType] || AD_PLACEMENTS.responsive;
  const isProduction = siteConfig.adsense.enabled;

  useEffect(() => {
    if (isProduction && typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, [isProduction]);

  return (
    <div
      className={cn(
        "my-6 flex flex-col items-center justify-center overflow-hidden rounded-xl transition-all",
        placement.minHeight,
        className
      )}
      aria-label="Advertisement"
    >
      {labelPosition === "top" && (
        <span className="mb-1 text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
      )}

      {isProduction ? (
        <div className={cn("flex items-center justify-center overflow-hidden", placement.width, placement.minHeight)}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={siteConfig.adsense.publisherId}
            data-ad-slot={slotId || "0000000000"}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        /* Development & Staging Mock Placeholder with Zero-CLS container */
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700/80 bg-slate-100/70 dark:bg-slate-900/60 p-4 text-center select-none backdrop-blur-sm",
            placement.width,
            placement.minHeight
          )}
        >
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>AdSense Placeholder: {placement.label}</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 max-w-sm">
            {placement.description} • Zero CLS Container
          </p>
        </div>
      )}

      {labelPosition === "bottom" && (
        <span className="mt-1 text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
      )}
    </div>
  );
}
