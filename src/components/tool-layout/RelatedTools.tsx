import React from "react";
import Link from "next/link";
import { ToolDefinition } from "@/types/tool";
import { getAllTools } from "@/config/tools/registry";
import { Sparkles, ArrowRight, Eye, Share2, ShieldAlert, Link2, Type, BarChart3 } from "lucide-react";

interface RelatedToolsProps {
  currentTool: ToolDefinition;
}

const ICON_MAP: Record<string, any> = {
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
};

export function RelatedTools({ currentTool }: RelatedToolsProps) {
  const allTools = getAllTools();
  
  // Prioritize tools in the same category, then other featured tools
  const related = allTools
    .filter((t) => t.id !== currentTool.id)
    .sort((a, b) => {
      if (a.category === currentTool.category && b.category !== currentTool.category) return -1;
      if (b.category === currentTool.category && a.category !== currentTool.category) return 1;
      return 0;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Explore Related Utilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Boost your workflow with complementary SEO and marketing tools
          </p>
        </div>
        <Link
          href="/#tools"
          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>View All Tools</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((tool) => {
          const IconComponent = ICON_MAP[tool.icon] || Sparkles;
          const isClickable = tool.status === "active";

          return (
            <div
              key={tool.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 shadow-sm hover:border-emerald-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  {tool.badge && (
                    <span className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {tool.name}
                </h3>

                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium uppercase text-slate-400">
                  {tool.category}
                </span>

                {isClickable ? (
                  <Link
                    href={"/tools/" + tool.category + "/" + tool.slug}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>Use Tool</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="text-slate-400 text-[11px]">Next Release</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
