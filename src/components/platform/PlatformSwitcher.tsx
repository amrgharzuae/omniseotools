import React from "react";
import Link from "next/link";
import { PLATFORMS_REGISTRY } from "@/config/platforms-registry";
import { PlatformSlug } from "@/types/platform";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

interface PlatformSwitcherProps {
  toolSlug: string;
  currentPlatformSlug: PlatformSlug;
}

export function PlatformSwitcher({ toolSlug, currentPlatformSlug }: PlatformSwitcherProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 p-4 mb-6 backdrop-blur-sm shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Target Platform Presets & Guides:
          </span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Switch platform to load tailored snippets & setup rules
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {PLATFORMS_REGISTRY.map((platform) => {
          const isActive = platform.slug === currentPlatformSlug;

          return (
            <Link
              key={platform.slug}
              href={`/tools/${toolSlug}/${platform.slug}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all border",
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-[1.02]"
                  : "bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60"
              )}
            >
              <span>{platform.name}</span>
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
