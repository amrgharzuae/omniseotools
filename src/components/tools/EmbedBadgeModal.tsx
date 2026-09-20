"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Copy, Check, X, Sparkles, Code2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmbedBadgeModalProps {
  score?: number | string;
  status?: string;
  label?: string;
  toolSlug?: string;
  hashState?: string;
  buttonVariant?: "default" | "outline" | "compact";
  className?: string;
}

export function EmbedBadgeModal({
  score = 98,
  status = "Verified",
  label = "OmniSEO",
  toolSlug = "open-graph-meta-generator",
  hashState = "",
  buttonVariant = "default",
  className,
}: EmbedBadgeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"markdown" | "html">("markdown");
  const [badgeTheme, setBadgeTheme] = useState<"dark" | "flat" | "emerald">("dark");
  const [badgeLabel, setBadgeLabel] = useState(label);
  const [badgeStatus, setBadgeStatus] = useState(status);
  const [badgeScore, setBadgeScore] = useState(score.toString());
  const [copied, setCopied] = useState(false);

  // Sync props when opening
  useEffect(() => {
    if (isOpen) {
      setBadgeLabel(label);
      setBadgeStatus(status);
      setBadgeScore(score.toString());
    }
  }, [isOpen, label, status, score]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Compute live URLs
  const baseUrl = "https://omniseotools.com";
  const targetPermalink = `${baseUrl}/tools/${toolSlug}${hashState || ""}`;

  const queryParams = new URLSearchParams();
  if (badgeLabel) queryParams.set("label", badgeLabel);
  if (badgeScore) queryParams.set("score", badgeScore);
  if (badgeStatus) queryParams.set("status", badgeStatus);
  if (badgeTheme !== "dark") queryParams.set("theme", badgeTheme);

  const badgeApiUrl = `${baseUrl}/api/badge?${queryParams.toString()}`;
  const localBadgePreviewUrl = `/api/badge?${queryParams.toString()}`;

  // Snippets
  const markdownSnippet = `[![SEO Audit](${badgeApiUrl})](${targetPermalink})`;
  const htmlSnippet = `<a href="${targetPermalink}" target="_blank" rel="noopener noreferrer">\n  <img src="${badgeApiUrl}" alt="SEO Audit Score" />\n</a>`;

  const activeSnippet = activeTab === "markdown" ? markdownSnippet : htmlSnippet;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = activeSnippet;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg text-xs font-semibold transition-all",
          buttonVariant === "default" &&
            "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 px-3 py-1.5 shadow-sm",
          buttonVariant === "outline" &&
            "border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-3 py-1.5",
          buttonVariant === "compact" &&
            "text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 px-2 py-1",
          className
        )}
        title="Embed a dynamic Shields.io-style SEO audit badge on your GitHub README or website"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
        <span>Embed Badge</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="badge-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-xl rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-7 relative flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 pr-8">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <h3
                  id="badge-modal-title"
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight"
                >
                  Embed SEO Audit Badge
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Display a dynamic, vector SVG badge in your GitHub README, docs, or footer linking back to your verified audit permalink.
              </p>
            </div>

            {/* Live SVG Badge Preview Box */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 mb-4 flex flex-col items-center justify-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Live SVG Preview
              </span>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-inner flex items-center justify-center min-h-[44px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={localBadgePreviewUrl}
                  alt="Live SEO Audit Badge Preview"
                  className="h-5 drop-shadow-sm select-none"
                />
              </div>
            </div>

            {/* Theme & Parameter Customizer */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Label Text
                </label>
                <input
                  type="text"
                  value={badgeLabel}
                  onChange={(e) => setBadgeLabel(e.target.value)}
                  placeholder="OmniSEO"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs font-mono text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Score / Value
                </label>
                <input
                  type="text"
                  value={badgeScore}
                  onChange={(e) => setBadgeScore(e.target.value)}
                  placeholder="98"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs font-mono text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Theme
                </label>
                <select
                  value={badgeTheme}
                  onChange={(e) => setBadgeTheme(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="dark">Dark Slate</option>
                  <option value="flat">Flat Navy</option>
                  <option value="emerald">Emerald Forest</option>
                </select>
              </div>
            </div>

            {/* Tab Selector: Markdown vs HTML */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-semibold mb-3">
              <button
                type="button"
                onClick={() => setActiveTab("markdown")}
                className={cn(
                  "flex-1 py-1.5 rounded-lg transition-all text-center",
                  activeTab === "markdown"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                Markdown (GitHub README)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("html")}
                className={cn(
                  "flex-1 py-1.5 rounded-lg transition-all text-center",
                  activeTab === "html"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                HTML (Footer / Docs)
              </button>
            </div>

            {/* Code Display */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs text-slate-200 shadow-inner mb-4 overflow-hidden">
              <pre className="overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-[120px] scrollbar-thin">
                <code>{activeSnippet}</code>
              </pre>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">
                Shields.io standard vector SVG • Zero latency
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md",
                    copied
                      ? "bg-emerald-600"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied Snippet!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy {activeTab === "markdown" ? "Markdown" : "HTML"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
