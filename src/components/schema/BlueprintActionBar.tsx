"use client";

import React, { useState } from "react";
import Link from "next/link";

interface BlueprintActionBarProps {
  jsonLd: Record<string, unknown> | string;
  slug: string;
  title: string;
}

export default function BlueprintActionBar({
  jsonLd,
  slug,
  title,
}: BlueprintActionBarProps) {
  const [copied, setCopied] = useState(false);

  let parsedJson: unknown = jsonLd;
  if (typeof jsonLd === "string") {
    try {
      parsedJson = JSON.parse(jsonLd);
    } catch {
      parsedJson = jsonLd;
    }
  }
  const formattedString =
    typeof parsedJson === "string"
      ? parsedJson
      : JSON.stringify(parsedJson, null, 2);
  const scriptTagString = `<script type="application/ld+json">\n${formattedString}\n</script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptTagString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy script tag: ", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([formattedString], {
      type: "application/ld+json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug}.jsonld`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTestInValidator = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("omni_schema_preload", formattedString);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-4 bg-slate-900 border border-slate-800 rounded-lg text-sm">
      <div className="text-slate-300 font-medium truncate max-w-xs sm:max-w-md">
        {title} Blueprint Payload
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          {copied ? "✓ Copied!" : "Copy <script> Tag"}
        </button>

        <button
          onClick={handleDownload}
          type="button"
          className="inline-flex items-center px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          Download .jsonld
        </button>

        <Link
          href="/tools/schema-validator"
          onClick={handleTestInValidator}
          className="inline-flex items-center px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
        >
          Test in Validator →
        </Link>
      </div>
    </div>
  );
}
