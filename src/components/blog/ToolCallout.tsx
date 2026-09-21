import React from "react";
import Link from "next/link";
import { getToolBySlug } from "@/config/tools-registry";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Share2, 
  Search, 
  Link2, 
  Code, 
  FileText, 
  ShieldCheck, 
  Globe 
} from "lucide-react";

interface ToolCalloutProps {
  toolSlug: string;
  title?: string;
  description?: string;
  badge?: string;
  actionText?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Share2,
  Search,
  Link2,
  Code,
  FileText,
  ShieldCheck,
  Globe,
  Layers,
  Sparkles,
};

function normalizeSlug(slug: string): string {
  if (slug === "twitter-card-previewer") return "twitter-card-preview";
  if (slug === "campaign-utm-builder") return "utm-campaign-builder";
  if (slug === "google-serp-simulator" || slug === "serp-simulator") return "google-serp-simulator";
  return slug;
}

export function ToolCallout({
  toolSlug,
  title,
  description,
  badge,
  actionText,
}: ToolCalloutProps) {
  const normalizedSlug = normalizeSlug(toolSlug);
  const tool = getToolBySlug(normalizedSlug) || getToolBySlug(toolSlug);

  const displayTitle = title || tool?.name || "Interactive SEO Sandbox";
  const displayDescription =
    description ||
    tool?.shortDescription ||
    tool?.tagline ||
    "Launch this utility directly in your browser with real-time feedback, zero server delay, and 1-click code export.";
  const displayBadge = badge || tool?.badge || "Live Interactive Utility";
  const displayAction = actionText || "Launch Tool in Sandbox";
  
  // Format tool href appropriately
  let toolHref = `/tools/${normalizedSlug}`;
  if (toolSlug.startsWith("/")) {
    toolHref = toolSlug;
  } else if (normalizedSlug === "utm-campaign-builder" || toolSlug === "campaign-utm-builder") {
    toolHref = "/tools/marketing/utm-campaign-builder";
  } else if (normalizedSlug === "serp-preview" || normalizedSlug === "google-serp-simulator" || toolSlug === "google-serp-simulator") {
    toolHref = "/tools/seo/serp-preview";
  }

  const IconComponent = (tool?.icon && iconMap[tool.icon]) ? iconMap[tool.icon] : Sparkles;

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-slate-900 p-6 sm:p-7 shadow-sm transition-all hover:shadow-md hover:border-emerald-500/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <IconComponent className="h-4 w-4" />
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              {displayBadge}
            </span>
          </div>

          <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {displayTitle}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {displayDescription}
          </p>
        </div>

        <div className="w-full sm:w-auto shrink-0">
          <Link
            href={toolHref}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:shadow transition-all group"
          >
            <span>{displayAction}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
