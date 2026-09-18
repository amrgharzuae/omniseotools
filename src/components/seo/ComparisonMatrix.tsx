import React from "react";
import {
  CheckCircle2,
  XCircle,
  Zap,
  ShieldCheck,
  Sparkles,
  Lock,
  Cpu,
  FileCode2,
  Gauge,
  UserX,
} from "lucide-react";

export interface ComparisonMatrixProps {
  toolName: string;
  category?: string;
  platformName?: string;
}

interface ComparisonRow {
  icon: React.ComponentType<{ className?: string }>;
  feature: string;
  categoryLabel: string;
  traditionalSaaS: string;
  traditionalSaaSSubtext?: string;
  omniSeoTools: string;
  omniSeoHighlight: string;
}

export function ComparisonMatrix({
  toolName,
  category,
  platformName,
}: ComparisonMatrixProps) {
  const comparisonRows: ComparisonRow[] = [
    {
      icon: Cpu,
      feature: "Execution Architecture",
      categoryLabel: "Speed & Queue Latency",
      traditionalSaaS: "Server-side queues (slow, rate-limited, 5–15s delays)",
      traditionalSaaSSubtext: "Server round-trips & cloud worker throttling",
      omniSeoTools: "100% Client-Side & Edge Engine (Instant, 0ms queue)",
      omniSeoHighlight: "0ms Queue",
    },
    {
      icon: Lock,
      feature: "Privacy & Data Storage",
      categoryLabel: "Data Governance",
      traditionalSaaS: "Logs draft URLs, keywords, and queries to remote databases",
      traditionalSaaSSubtext: "Telemetry tracking & third-party data collection",
      omniSeoTools: "100% Client-Side Private (Runs purely in your browser session)",
      omniSeoHighlight: "Zero Logging",
    },
    {
      icon: UserX,
      feature: "Account Requirements",
      categoryLabel: "Access Friction",
      traditionalSaaS: "Mandatory account creation, email paywalls & credit cards",
      traditionalSaaSSubtext: "Aggressive sales drip sequences & usage limits",
      omniSeoTools: "No Login, No Signup, Zero Paywalls (Instant Access)",
      omniSeoHighlight: "100% Frictionless",
    },
    {
      icon: FileCode2,
      feature: "Code Snippets & Tailored Export",
      categoryLabel: "Developer Ready",
      traditionalSaaS: "Generic or fragmented code recommendations",
      traditionalSaaSSubtext: "Manual formatting required for specific frameworks",
      omniSeoTools: platformName
        ? `Instant 1-click ${platformName}-tailored snippets & 2026 validation`
        : "Instant 1-click tailored exports (HTML5, Next.js, Liquid, React JSX)",
      omniSeoHighlight: platformName ? `${platformName} Ready` : "Multi-Format",
    },
    {
      icon: Gauge,
      feature: "Core Web Vitals Impact",
      categoryLabel: "Performance Footprint",
      traditionalSaaS: "Heavy dashboard bloat, tracking scripts & slow TTFB",
      traditionalSaaSSubtext: "High CPU memory footprint and layout shifts",
      omniSeoTools: "Ultra-lightweight edge delivery with zero layout shift (CLS)",
      omniSeoHighlight: "100/100 CWV",
    },
  ];

  return (
    <section
      className="my-12 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/50 p-6 sm:p-10 shadow-sm transition-all"
      aria-labelledby="comparison-matrix-heading"
    >
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6 mb-8">
        <div>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Architectural Advantage</span>
          </div>

          <h2
            id="comparison-matrix-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Why Developers & Marketers Choose OmniSEO Tools
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            See how our zero-latency, client-side {toolName} compares against traditional heavy SaaS audit suites.
          </p>
        </div>

        {platformName && (
          <div className="shrink-0 flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 px-3.5 py-2 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Zap className="h-4 w-4 text-emerald-500" />
            <span>Optimized for {platformName}</span>
          </div>
        )}
      </div>

      {/* 2. Responsive Comparison Table Container */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">
                Feature & Metric
              </th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">
                Traditional SaaS Suites
              </th>
              <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-t-2xl border-t border-x border-emerald-500/20 w-1/3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>OmniSEO Tools</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
            {comparisonRows.map((row, idx) => {
              const IconComp = row.icon;
              const isLast = idx === comparisonRows.length - 1;

              return (
                <tr
                  key={row.feature}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* Column 1: Feature */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                        <IconComp className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {row.feature}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                          {row.categoryLabel}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Traditional SaaS */}
                  <td className="py-4 px-4 align-top text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-slate-700 dark:text-slate-300 block">
                          {row.traditionalSaaS}
                        </span>
                        {row.traditionalSaaSSubtext && (
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                            {row.traditionalSaaSSubtext}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Column 3: OmniSEO Tools (Highlighted) */}
                  <td
                    className={`py-4 px-4 align-top bg-emerald-50/40 dark:bg-emerald-950/20 border-x border-emerald-500/20 ${
                      isLast ? "rounded-b-2xl border-b" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {row.omniSeoTools}
                          </span>
                          <span className="inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                            {row.omniSeoHighlight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Bottom Value Proposition Micro-Banner */}
      <div className="mt-8 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/80 dark:bg-slate-900/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>
            <strong>Zero setup required:</strong> All calculations, tag generations, and simulations execute in your browser with zero latency.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
          <span>✓ 100% Free</span>
          <span>✓ No Paywalls</span>
          <span>✓ 2026 Engine Rules</span>
        </div>
      </div>
    </section>
  );
}
