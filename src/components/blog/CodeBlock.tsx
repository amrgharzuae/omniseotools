"use client";

import React, { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  language?: string;
  filename?: string;
  title?: string;
  className?: string;
}

/**
 * Recursively extracts plain text content from React children nodes
 */
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (!children) return "";
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props && props.children) {
      return extractTextFromChildren(props.children);
    }
  }
  return "";
}

export function CodeBlock({
  children,
  language,
  filename,
  title,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  let lang = language;
  let codeContent = children;

  // Handle nested <code> inside <pre> when mapped from MDX
  if (React.isValidElement(children)) {
    const childProps = children.props as { className?: string; children?: React.ReactNode };
    if (childProps) {
      if (!lang && childProps.className) {
        const match = childProps.className.match(/language-(\w+)/);
        if (match) {
          lang = match[1];
        }
      }
      if (childProps.children) {
        codeContent = childProps.children;
      }
    }
  }

  if (!lang && className) {
    const match = className.match(/language-(\w+)/);
    if (match) {
      lang = match[1];
    }
  }

  const rawCode = extractTextFromChildren(codeContent).trim();

  const handleCopy = async () => {
    if (!rawCode) return;
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  const displayLabel = filename || title || (lang ? lang.toUpperCase() : "CODE");

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-mono">
          <FileCode className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-semibold">{displayLabel}</span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
        <pre className="!bg-transparent !p-0 !m-0 !border-0 font-mono">
          <code>{codeContent}</code>
        </pre>
      </div>
    </div>
  );
}
