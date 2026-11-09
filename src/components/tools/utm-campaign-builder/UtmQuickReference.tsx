"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Table,
  Layers,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Zap,
} from "lucide-react";
import {
  UTM_SYNTAX_DATA,
  DYNAMIC_MACRO_PLATFORMS,
  PRIMARY_UTM_FAQS,
} from "@/config/utm-quick-reference-data";

export function UtmQuickReference() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const displayedPlatforms =
    activeTab === "all"
      ? DYNAMIC_MACRO_PLATFORMS
      : DYNAMIC_MACRO_PLATFORMS.filter((p) => p.id === activeTab);

  return (
    <div className="space-y-12 mt-12 text-slate-800 dark:text-slate-200">
      {/* ========================================================================= */}
      {/* 1. QUICK SYNTAX TABLE                                                     */}
      {/* ========================================================================= */}
      <section
        id="utm-syntax-conventions"
        className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
              <Table className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Quick UTM Syntax &amp; Taxonomy Reference
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Google Analytics 4 (GA4) parameter roles, requirements, and conventions
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 w-fit">
            GA4 Standard Spec
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Parameter</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4">Role &amp; Attribution Purpose</th>
                <th className="py-3 px-4">Conventions &amp; Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {UTM_SYNTAX_DATA.map((row) => (
                <tr
                  key={row.parameter}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {row.parameter}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        row.required === "Required"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : row.required === "Recommended"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {row.required}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                    {row.role}
                  </td>
                  <td className="py-3.5 px-4 space-y-1.5">
                    <p className="text-slate-700 dark:text-slate-300 text-xs">
                      {row.convention}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {row.examples.map((ex) => (
                        <code
                          key={ex}
                          className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                        >
                          {ex}
                        </code>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PLATFORM DYNAMIC TOKEN CHEAT SHEETS (GRID & TABBED)                    */}
      {/* ========================================================================= */}
      <section
        id="dynamic-macro-presets"
        className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Platform Dynamic Token Cheat Sheets
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                One-click copy of standard dynamic URL parameters for Google Ads, Meta, TikTok, and LinkedIn
              </p>
            </div>
          </div>

          {/* Quick Platform Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All Platforms
            </button>
            {DYNAMIC_MACRO_PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab(p.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === p.id
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {p.platform.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPlatforms.map((platform) => {
            const isFullSnippetCopied = copiedKey === `${platform.id}-full`;

            return (
              <div
                key={platform.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
              >
                <div className="space-y-4">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tools/utm-campaign-builder/${platform.platformSlug}`}
                        className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{platform.platform}</span>
                        <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                      </Link>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40">
                      {platform.badge}
                    </span>
                  </div>

                  {/* Individual Macro Token Blocks */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Standard Dynamic Parameters:
                    </span>
                    <div className="space-y-1.5">
                      {platform.macros.map((macro) => {
                        const tokenKey = `${platform.id}-${macro.role}`;
                        const isTokenCopied = copiedKey === tokenKey;

                        return (
                          <div
                            key={macro.role}
                            className="flex items-center justify-between bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-700 dark:text-slate-300 w-18">
                                {macro.role}:
                              </span>
                              <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 border border-slate-200/50 dark:border-slate-700">
                                {macro.token}
                              </code>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopy(macro.token, tokenKey)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                              title={`Copy ${macro.token}`}
                              aria-label={`Copy ${macro.token}`}
                            >
                              {isTokenCopied ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-500" />
                                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                    Copied
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ready-to-Paste Query String */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Ready-to-Paste Query String:
                    </span>
                    <div className="relative group">
                      <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto select-all whitespace-pre-wrap break-all border border-slate-800">
                        {platform.snippet}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 dark:border-slate-800">
                  <Link
                    href={`/tools/utm-campaign-builder/${platform.platformSlug}`}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open dedicated builder</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleCopy(platform.snippet, `${platform.id}-full`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
                  >
                    {isFullSnippetCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">
                          Copied All!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Query String</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CONCISE 3-QUESTION FAQ SECTION                                         */}
      {/* ========================================================================= */}
      <section
        id="frequently-asked-questions"
        className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions (UTM Architecture &amp; GA4)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Essential technical answers on case sensitivity, SEO duplicate content, and parameter ordering
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {PRIMARY_UTM_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/30 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
