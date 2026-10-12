"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  Download,
  Copy,
  Check,
  Trash2,
  Zap,
  Shield,
  FileCode,
  Sparkles,
  RefreshCw,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BulkToolLayoutProps {
  title: string;
  description: string;
  badge?: string;
  category?: string;
  categoryHref?: string;
  // Input State
  inputText: string;
  onInputChange: (val: string) => void;
  onFileUpload?: (content: string, filename: string) => void;
  placeholder?: string;
  fileAcceptedExtensions?: string; // e.g. ".xml,.csv,.txt"
  sampleData?: string;
  sampleLabel?: string;
  // Status & Actions
  rowCount: number;
  maxRecommendedRows?: number;
  isProcessing?: boolean;
  onClear: () => void;
  onDownloadCsv: () => void;
  onCopyGoogleSheets: () => Promise<boolean> | void;
  // Optional extra components
  statsBar?: React.ReactNode;
  actionButtons?: React.ReactNode;
  children?: React.ReactNode;
  errorMessage?: string | null;
  className?: string;
}

export function BulkToolLayout({
  title,
  description,
  badge = "Bulk Workbench ⚡",
  category = "Bulk Tools",
  categoryHref = "/bulk",
  inputText,
  onInputChange,
  onFileUpload,
  placeholder = "Paste your data or raw input here (one item per line or formatted text)...",
  fileAcceptedExtensions = ".xml,.txt,.csv",
  sampleData,
  sampleLabel = "Load Sample Data",
  rowCount,
  maxRecommendedRows = 10000,
  isProcessing = false,
  onClear,
  onDownloadCsv,
  onCopyGoogleSheets,
  statsBar,
  actionButtons,
  children,
  errorMessage,
  className,
}: BulkToolLayoutProps) {
  const [activeInputTab, setActiveInputTab] = useState<"paste" | "upload">("paste");
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Line counter calculation (memoized or simple length check)
  const lineCount = inputText
    ? inputText.split("\n").filter((l) => l.trim().length > 0).length
    : 0;

  // Handle Drag & Drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const processFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text !== undefined) {
          setUploadedFileName(file.name);
          if (onFileUpload) {
            onFileUpload(text, file.name);
          } else {
            onInputChange(text);
          }
        }
      };
      reader.readAsText(file);
    },
    [onFileUpload, onInputChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        processFile(file);
      }
    },
    [processFile]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleCopyClick = async () => {
    if (onCopyGoogleSheets) {
      const res = await onCopyGoogleSheets();
      if (res !== false) {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
      }
    }
  };

  const handleClearClick = () => {
    setUploadedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClear();
  };

  const handleLoadSample = () => {
    if (sampleData) {
      setUploadedFileName(null);
      onInputChange(sampleData);
      setActiveInputTab("paste");
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Top Breadcrumb & Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href={categoryHref} className="hover:text-emerald-600 transition-colors">{category}</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">{title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
              {badge}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              <Shield className="h-3 w-3 text-indigo-500" />
              100% Client-Side
            </span>
          </div>
        </div>

        <div className="max-w-4xl space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Input Ingestion Box */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Input Mode Tabs & Helper Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveInputTab("paste")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all",
                activeInputTab === "paste"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <FileText className="h-3.5 w-3.5 text-emerald-600" />
              <span>Direct Paste</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveInputTab("upload")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all",
                activeInputTab === "upload"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Upload className="h-3.5 w-3.5 text-indigo-500" />
              <span>File Upload</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {sampleData && (
              <button
                type="button"
                onClick={handleLoadSample}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>{sampleLabel}</span>
              </button>
            )}

            {(inputText || uploadedFileName) && (
              <button
                type="button"
                onClick={handleClearClick}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30 transition-colors"
                title="Clear all input"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Body */}
        <div className="p-4 sm:p-6">
          {activeInputTab === "paste" ? (
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={placeholder}
                rows={9}
                className="w-full font-mono text-xs sm:text-sm p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y"
                spellCheck={false}
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-2 px-1">
                <span>
                  {lineCount > 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {lineCount.toLocaleString()} lines entered
                    </span>
                  ) : (
                    "Ready for batch text paste"
                  )}
                </span>
                <span>Max recommended: {maxRecommendedRows.toLocaleString()} rows</span>
              </div>
            </div>
          ) : (
            <div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                  isDragOver
                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-950/50 hover:border-slate-300 dark:hover:border-slate-600"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={fileAcceptedExtensions}
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {uploadedFileName ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <FileCheck className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {uploadedFileName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      File loaded into browser memory. Click or drop another to replace.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Drag and drop your file here, or <span className="text-emerald-600 dark:text-emerald-400 underline">browse</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Supported formats: {fileAcceptedExtensions.toUpperCase().replace(/\./g, " ")} (Up to 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Message if any */}
          {errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Bar if passed */}
      {statsBar}

      {/* Persistent Sticky Action Bar */}
      <div className="sticky top-16 z-30 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Output Rows:
            </span>
            <span
              className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-bold font-mono transition-colors",
                rowCount > 0
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              )}
            >
              {rowCount.toLocaleString()}
            </span>
          </div>

          {isProcessing && (
            <span className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Processing...
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {actionButtons}

          <button
            type="button"
            onClick={handleCopyClick}
            disabled={rowCount === 0 || isProcessing}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs",
              rowCount === 0 || isProcessing
                ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
                : copiedState
                ? "bg-emerald-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-500 text-white active:scale-98"
            )}
            title="Copy formatted multi-column TSV directly for Google Sheets or Airtable"
          >
            {copiedState ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied for Sheets!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy for Google Sheets</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onDownloadCsv}
            disabled={rowCount === 0 || isProcessing}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs",
              rowCount === 0 || isProcessing
                ? "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400"
                : "bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98"
            )}
            title="Download clean RFC-4180 CSV with UTF-8 BOM"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download CSV</span>
          </button>

          <button
            type="button"
            onClick={handleClearClick}
            disabled={rowCount === 0 && !inputText}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors",
              rowCount === 0 && !inputText
                ? "opacity-40 cursor-not-allowed text-slate-400"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Content / Children Table */}
      {children}
    </div>
  );
}
