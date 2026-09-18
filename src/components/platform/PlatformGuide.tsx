import React from "react";
import { BookOpen, CheckCircle, Lightbulb, ArrowRight, Layers } from "lucide-react";
import { PlatformDefinition, PlatformToolSEOData } from "@/types/platform";
import { ToolDefinition } from "@/types/tool";
import { PlatformCodeBlock } from "./PlatformCodeBlock";

interface PlatformGuideProps {
  tool: ToolDefinition;
  platform: PlatformDefinition;
  content: PlatformToolSEOData;
}

export function PlatformGuide({ tool, platform, content }: PlatformGuideProps) {
  return (
    <article className="mt-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-10 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {content.guideTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Step-by-step configuration, copyable code, and optimization guidance for {platform.name}
          </p>
        </div>
      </div>

      <div className="space-y-10 text-slate-700 dark:text-slate-300">
        {/* Section 1: How it Works */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              1
            </span>
            How {platform.name} Renders & Handles Metadata
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {content.howItWorks}
          </p>
        </section>

        {/* Section 2: Copyable Configuration Snippet */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              2
            </span>
            Copy-Ready {platform.name} Code Configuration
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Paste the following verified snippet directly into your {platform.name} codebase or admin settings:
          </p>
          <PlatformCodeBlock
            code={content.snippet.code}
            language={content.snippet.language}
            filename={content.snippet.filename}
            description={content.snippet.description}
            toolSlug={tool.slug}
            platformSlug={platform.slug}
          />
        </section>

        {/* Section 3: Implementation Steps */}
        <section className="space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              3
            </span>
            Step-by-Step Implementation Guide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/30 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-600 text-[11px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {step.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Key Optimization Takeaways */}
        {content.bestPractices && content.bestPractices.length > 0 && (
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-3">
              <Lightbulb className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Pro Tips for {platform.name} Performance</span>
            </div>
            <ul className="space-y-2 text-xs text-indigo-950 dark:text-indigo-200">
              {content.bestPractices.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5">
                  <CheckCircle className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
