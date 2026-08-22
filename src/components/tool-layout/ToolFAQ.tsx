"use client";

import React, { useState } from "react";
import { ToolDefinition } from "@/types/tool";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolFAQProps {
  tool: ToolDefinition;
}

export function ToolFAQ({ tool }: ToolFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!tool.faqs || tool.faqs.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-10 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Answers to common questions about {tool.name}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {tool.faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2",
                    isOpen && "rotate-180 text-emerald-600"
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-800/50 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
