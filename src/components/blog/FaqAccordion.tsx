"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { generateFAQSchema, FAQItem } from "@/lib/schema-generator";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items?: FAQItem[];
  title?: string;
  renderSchema?: boolean;
}

export function FaqAccordion({
  items = [],
  title = "Frequently Asked Questions",
  renderSchema = true,
}: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First open by default

  const safeItems: FAQItem[] = Array.isArray(items) ? items : [];

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const schema = renderSchema && safeItems.length > 0 ? generateFAQSchema(safeItems) : null;

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <div className="not-prose my-10 space-y-4">
      {schema && <JsonLd schema={schema} />}

      {title && (
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <HelpCircle className="h-4 w-4" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}

      <div className="space-y-3">
        {safeItems.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={index}
              className={cn(
                "rounded-xl border transition-all duration-200",
                isOpen
                  ? "border-emerald-500/40 bg-slate-50/80 dark:bg-slate-900/60 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-semibold text-slate-900 dark:text-white"
              >
                <span className="text-sm sm:text-base">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200",
                    isOpen && "rotate-180 text-emerald-600 dark:text-emerald-400"
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
