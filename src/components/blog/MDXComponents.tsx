import React from "react";
import { ToolCallout } from "@/components/blog/ToolCallout";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { FaqAccordion } from "@/components/blog/FaqAccordion";
import { SafeZoneDiagram } from "@/components/blog/SafeZoneDiagram";

export function MDXTable(props: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-collapse" {...props} />
    </div>
  );
}

export function MDXBlockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className="not-prose my-6 border-l-4 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20 px-5 py-4 rounded-r-xl text-slate-700 dark:text-slate-300 text-sm shadow-sm" {...props} />
  );
}

export const mdxComponents = {
  ToolCallout,
  CodeBlock,
  FaqAccordion,
  SafeZoneDiagram,
  pre: CodeBlock,
  table: MDXTable,
  blockquote: MDXBlockquote,
};
