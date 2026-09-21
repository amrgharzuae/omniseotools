"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Bug } from "lucide-react";
import { openFeedbackDrawer } from "@/components/feedback/MicroFeedbackDrawer";

interface Props {
  children: ReactNode;
  toolSlug?: string;
  toolName?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetKey: number;
}

export class ToolErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    resetKey: 0,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("[ToolErrorBoundary Caught Runtime Error]:", error, errorInfo);
  }

  private handleReset = () => {
    // Increment reset key to force child re-mount
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      resetKey: prevState.resetKey + 1,
    }));
  };

  private handleReportBug = () => {
    openFeedbackDrawer({
      category: "bug",
      errorStack: this.state.error?.stack || this.state.error?.message || "Unknown error",
      toolSlug: this.props.toolSlug,
      initialMessage: `Error encountered in ${this.props.toolName || this.props.toolSlug || "tool"}: ${this.state.error?.message || "Unexpected exception"}`,
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const toolTitle = this.props.toolName || "This Utility";

      return (
        <div className="not-prose my-6 rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/40 dark:from-rose-950/30 dark:via-slate-900/90 dark:to-slate-950 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-500/30">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Something went wrong while executing {toolTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  An unexpected client-side runtime exception occurred. Your other page content and browser session remain safe.
                </p>
              </div>

              {this.state.error && (
                <div className="rounded-xl border border-rose-200/80 dark:border-rose-900/50 bg-rose-100/50 dark:bg-rose-950/50 p-3 text-xs font-mono text-rose-800 dark:text-rose-300 overflow-x-auto max-h-32">
                  <span className="font-bold">Error:</span> {this.state.error.message}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-xs font-bold shadow-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Tool State</span>
                </button>

                <button
                  type="button"
                  onClick={this.handleReportBug}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-800/80 text-rose-700 dark:text-rose-300 px-4 py-2 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
                >
                  <Bug className="h-3.5 w-3.5" />
                  <span>Report Bug to Engineers</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment key={this.state.resetKey}>
        {this.props.children}
      </React.Fragment>
    );
  }
}
