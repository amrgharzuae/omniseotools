"use client";

import React, { useState, useEffect } from "react";
import { Code2, Copy, Check, X, ExternalLink, Sparkles, MonitorPlay } from "lucide-react";
import { getEmbedIframeSnippet } from "@/lib/snippet-attribution";
import { cn } from "@/lib/utils";

interface EmbedToolModalProps {
  slug: string;
  toolName: string;
  buttonVariant?: "default" | "outline" | "compact";
  className?: string;
}

export function EmbedToolModal({
  slug,
  toolName,
  buttonVariant = "default",
  className,
}: EmbedToolModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [height, setHeight] = useState(600);

  const embedSnippet = getEmbedIframeSnippet(slug, toolName, height);
  const embedUrl = `https://omniseotools.com/embed/${slug}`;
  const localPreviewUrl = `/embed/${slug}`;

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = embedSnippet;
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
            "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-3 py-1.5 shadow-sm",
          buttonVariant === "outline" &&
            "border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 px-3 py-1.5",
          buttonVariant === "compact" &&
            "text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 px-2 py-1",
          className
        )}
        title="Embed this interactive tool on your website"
      >
        <Code2 className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
        <span>Embed on Your Site</span>
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="embed-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 relative flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
          >
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
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-5 pr-8">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                  <Code2 className="h-4 w-4" />
                </span>
                <h3
                  id="embed-modal-title"
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight"
                >
                  Embed {toolName}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Embed this interactive, client-side tool directly into your website, blog, or documentation. 100% free with zero configuration required.
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              {/* Tab Switcher */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5",
                    activeTab === "code"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>HTML Snippet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5",
                    activeTab === "preview"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <MonitorPlay className="h-3.5 w-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>

              {/* Height Selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Height:</span>
                {[500, 600, 700].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHeight(h)}
                    className={cn(
                      "px-2 py-1 rounded-md text-[11px] font-mono font-medium transition-colors",
                      height === h
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    )}
                  >
                    {h}px
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto mb-5">
              {activeTab === "code" ? (
                <div className="space-y-3">
                  <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 shadow-inner">
                    <pre className="overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-[220px] scrollbar-thin">
                      <code>{embedSnippet}</code>
                    </pre>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300 flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Copy and paste this HTML snippet into any WordPress post, Webflow embed, Shopify page, or Next.js app. The widget is fully responsive and isolated.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950">
                  <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{embedUrl}</span>
                    <a
                      href={localPreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Open in tab</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <iframe
                    src={localPreviewUrl}
                    width="100%"
                    height={Math.min(height, 420)}
                    className="w-full border-0"
                    title={`OmniSEO Tools - ${toolName}`}
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Responsive 100% width iframe with client-side isolation
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
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
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25"
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
                      <span>Copy Embed Code</span>
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
