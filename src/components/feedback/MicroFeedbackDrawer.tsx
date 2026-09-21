"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  MessageSquarePlus,
  Bug,
  Lightbulb,
  MessageCircle,
  X,
  Send,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Monitor,
  Globe,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FeedbackCategory = "bug" | "feature" | "general";

export interface OpenFeedbackDetail {
  category?: FeedbackCategory;
  errorStack?: string;
  toolSlug?: string;
  initialMessage?: string;
}

// Global helper to open feedback drawer programmatically
export function openFeedbackDrawer(detail?: OpenFeedbackDetail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-micro-feedback", { detail: detail || {} })
    );
  }
}

export function MicroFeedbackDrawer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<FeedbackCategory>("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [errorStack, setErrorStack] = useState<string | null>(null);
  const [customToolSlug, setCustomToolSlug] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Client-side diagnostics
  const [diagnostics, setDiagnostics] = useState<{
    userAgent: string;
    screenResolution: string;
    pageUrl: string;
    toolSlug: string;
  }>({
    userAgent: "",
    screenResolution: "",
    pageUrl: "",
    toolSlug: "",
  });

  // Extract tool slug from path
  const extractToolSlug = useCallback((path: string): string => {
    if (customToolSlug) return customToolSlug;
    if (path.startsWith("/tools/")) {
      const segments = path.split("/").filter(Boolean);
      return segments[1] || "";
    }
    return "";
  }, [customToolSlug]);

  // Update diagnostics on client mount and path change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = extractToolSlug(pathname || "");
      setDiagnostics({
        userAgent: window.navigator.userAgent,
        screenResolution: `${window.innerWidth} × ${window.innerHeight} (Screen: ${window.screen.width} × ${window.screen.height})`,
        pageUrl: window.location.href,
        toolSlug: slug,
      });
    }
  }, [pathname, extractToolSlug]);

  // Listen for programmatic open events (e.g. from ToolErrorBoundary)
  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      const customEvent = event as CustomEvent<OpenFeedbackDetail>;
      const detail = customEvent.detail || {};
      
      if (detail.category) setCategory(detail.category);
      if (detail.errorStack) setErrorStack(detail.errorStack);
      if (detail.toolSlug) setCustomToolSlug(detail.toolSlug);
      if (detail.initialMessage) setMessage(detail.initialMessage);
      
      setIsSuccess(false);
      setErrorMessage(null);
      setIsOpen(true);
    };

    window.addEventListener("open-micro-feedback", handleOpenEvent);
    return () => {
      window.removeEventListener("open-micro-feedback", handleOpenEvent);
    };
  }, []);

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpen = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after transition
    setTimeout(() => {
      if (isSuccess) {
        setMessage("");
        setErrorStack(null);
        setCustomToolSlug(null);
        setIsSuccess(false);
      }
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 5) {
      setErrorMessage("Please enter at a least 5 characters in your message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        category,
        message: message.trim(),
        email: email.trim() || undefined,
        pageUrl: typeof window !== "undefined" ? window.location.href : pathname || "/",
        timestamp: new Date().toISOString(),
        diagnostics: {
          userAgent: diagnostics.userAgent,
          screenResolution: diagnostics.screenResolution,
          toolSlug: customToolSlug || diagnostics.toolSlug || undefined,
          errorStack: errorStack || undefined,
        },
      };

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit feedback.");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMessage(errorStr);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic placeholder based on category
  const getPlaceholder = () => {
    switch (category) {
      case "bug":
        return "What went wrong? Describe what you clicked, any inputs used, or the unexpected output...";
      case "feature":
        return "What new tool or capability would you like to see? How would it improve your workflow?";
      case "general":
      default:
        return "Share your thoughts, suggestions, or general experience with OmniSEO Tools...";
    }
  };

  return (
    <>
      {/* Floating Pill Trigger Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={handleOpen}
          className="group flex items-center gap-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs font-bold shadow-xl border border-slate-700/60 dark:border-slate-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          title="Send feedback or report a bug"
          aria-label="Open feedback drawer"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 group-hover:rotate-12 transition-transform">
            <MessageSquarePlus className="h-3 w-3" />
          </div>
          <span className="hidden sm:inline">Feedback &amp; Bug Report</span>
          <span className="sm:hidden font-medium">Feedback</span>
        </button>
      </div>

      {/* Drawer Backdrop and Container */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-drawer-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <MessageSquarePlus className="h-4 w-4" />
                </div>
                <div>
                  <h2
                    id="feedback-drawer-title"
                    className="text-sm font-bold text-slate-900 dark:text-white"
                  >
                    Feedback &amp; Bug Report
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Direct line to the OmniSEO engineering team
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 space-y-5">
              {isSuccess ? (
                /* Success State */
                <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shadow-inner">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Thank You for Your Feedback!
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Our core engineering team has been notified. We constantly iterate on bug reports and tool suggestions to make OmniSEO Tools the fastest developer utility suite on the web.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleClose}
                      className="w-full rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 py-2.5 text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Feedback Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category Selector Pills */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Feedback Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCategory("bug")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                          category === "bug"
                            ? "bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-800 text-rose-700 dark:text-rose-300 shadow-xs"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        )}
                      >
                        <Bug className="h-4 w-4 text-rose-500" />
                        <span>Bug Report</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCategory("feature")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                          category === "feature"
                            ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-xs"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        )}
                      >
                        <Lightbulb className="h-4 w-4 text-indigo-500" />
                        <span>Tool Idea</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCategory("general")}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
                          category === "general"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-xs"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        )}
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-500" />
                        <span>General</span>
                      </button>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-400">
                        {message.length} / 2000
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={getPlaceholder()}
                      maxLength={2000}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Optional Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Email</span>
                      <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com (Notify me when resolved)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Diagnostics Collapsible Card */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowDiagnostics(!showDiagnostics)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <Monitor className="h-3.5 w-3.5 text-slate-400" />
                        <span>Included System Diagnostics</span>
                      </div>
                      {showDiagnostics ? (
                        <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </button>

                    {showDiagnostics && (
                      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50">
                        <div>
                          <span className="text-slate-700 dark:text-slate-300 font-semibold font-sans">URL:</span>{" "}
                          <span className="break-all">{diagnostics.pageUrl || pathname}</span>
                        </div>
                        {diagnostics.toolSlug && (
                          <div>
                            <span className="text-slate-700 dark:text-slate-300 font-semibold font-sans">Tool:</span>{" "}
                            <span>{diagnostics.toolSlug}</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-700 dark:text-slate-300 font-semibold font-sans">Resolution:</span>{" "}
                          <span>{diagnostics.screenResolution}</span>
                        </div>
                        {errorStack && (
                          <div className="pt-1">
                            <span className="text-rose-600 dark:text-rose-400 font-semibold font-sans">Error Trace:</span>
                            <pre className="mt-1 p-2 rounded bg-slate-950 text-rose-400 text-[10px] overflow-x-auto max-h-24">
                              {errorStack}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || message.trim().length < 5}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting Feedback...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    <span>No personal data collected without permission.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
