import React from "react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service",
  description: "Terms and conditions of using OmniSEOTools web utility suite.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Terms of Service
      </h1>
      <p className="text-xs text-slate-500 mb-8">Last Updated: August 2026</p>

      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          By accessing and using {siteConfig.name}, you agree to abide by these terms of service and all applicable laws and regulations.
        </p>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Use License & Disclaimer</h2>
        <p>
          Permission is granted to use our web tools for personal, educational, and commercial SEO evaluation purposes free of charge. The tools and calculations are provided on an "as is" basis without warranties of any kind.
        </p>
      </div>
    </div>
  );
}
