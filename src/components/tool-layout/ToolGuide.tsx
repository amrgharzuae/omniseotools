import React from "react";
import { ToolDefinition } from "@/types/tool";
import { BookOpen, CheckCircle, Lightbulb } from "lucide-react";

interface ToolGuideProps {
  tool: ToolDefinition;
}

export function ToolGuide({ tool }: ToolGuideProps) {
  const guide = tool.guideContent || tool.editorialGuide;
  if (!guide) return null;

  return (
    <article className="mt-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 p-6 sm:p-10 shadow-sm">
      
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {guide.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comprehensive Technical Guide & Best Practices
          </p>
        </div>
      </div>

      <div className="space-y-10 text-slate-700 dark:text-slate-300">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {idx + 1}
              </span>
              {section.heading}
            </h3>
            
            <div 
              className="text-sm leading-relaxed space-y-3 prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />

            {section.keyTakeaways && section.keyTakeaways.length > 0 && (
              <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 mb-2">
                  <Lightbulb className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Key Optimization Takeaways</span>
                </div>
                <ul className="space-y-1.5 text-xs text-indigo-900 dark:text-indigo-200">
                  {section.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>

    </article>
  );
}

