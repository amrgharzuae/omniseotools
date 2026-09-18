import React from "react";
import { siteConfig } from "@/config/site";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Cookies",
  description: "Privacy Policy, Cookie Disclosure, and Google AdSense compliance for OmniSEOTools.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-6">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>User Privacy & Data Protection</span>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        Privacy Policy & Cookie Disclosure
      </h1>
      <p className="text-xs text-slate-500 mb-8">Last Updated: August 2026</p>

      <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Overview & Client-Side Privacy</h2>
          <p>
            At {siteConfig.name}, we believe in maximum user privacy. All interactive calculations performed using our SEO utilities (such as SERP previewing, keyword density analysis, and slug generation) run client-side in your browser. We do not store, harvest, or transmit your draft content or keywords to remote backend servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Google AdSense & Third-Party Cookies</h2>
          <p>
            We use Google AdSense and third-party advertising vendors to serve advertisements when you visit our website. Google uses cookies to serve ads based on your prior visits to our website or other websites on the Internet.
          </p>
          <p className="mt-2">
            You may opt out of personalized advertising by visiting Google Ad Settings (https://adssettings.google.com).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, you can reach out via our contact page or email us at support@omniseotools.com.
          </p>
        </section>
      </div>
    </div>
  );
}
