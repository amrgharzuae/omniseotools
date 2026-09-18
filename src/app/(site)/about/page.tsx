import React from "react";
import { siteConfig } from "@/config/site";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "About Us & Mission",
  description: "Learn about the mission behind OmniSEOTools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-6">
        <Sparkles className="h-4 w-4 text-emerald-600" />
        <span>About OmniSEOTools</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
        Building the Fastest Free Web Utility Suite
      </h1>

      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          {siteConfig.name} was built with a simple premise: everyday tools for SEO specialists, digital marketers, developers, and copywriters should be fast, private, free, and accurate.
        </p>
        <p>
          Instead of bloated tools locked behind forced subscriptions, OmniSEOTools runs calculations directly in your browser with pixel-accurate simulation models, clean structured data output, and zero latency.
        </p>
      </div>
    </div>
  );
}
