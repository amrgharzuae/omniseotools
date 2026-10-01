"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Sparkles,
  Copy,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Code2,
  Terminal,
  Server,
  Layers,
  Info,
  RotateCcw,
  Globe,
  FileText,
  SlidersHorizontal,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Share2,
  FileCode,
  Zap,
  EyeOff,
  Cpu,
  CreditCard,
  Gauge,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import {
  DIRECTIVE_CATEGORIES,
  DIRECTIVE_DEFINITIONS,
  POLICY_PRESETS,
  DirectiveCategory,
  DirectiveDefinition,
  DirectiveValueMode,
  PermissionsPolicyState,
  getInitialPermissionsPolicyState,
  buildPermissionsPolicyString,
  auditPermissionsPolicy,
} from "@/config/permissions-policy-data";

interface PermissionsPolicyBuilderProps {
  toolSlug?: string;
  toolName?: string;
}

export type CodeTab =
  | "raw"
  | "nextjs"
  | "cloudflare"
  | "nginx"
  | "apache"
  | "vercel"
  | "iframe"
  | "caddy";

export function PermissionsPolicyBuilder({
  toolSlug = "permissions-policy-builder",
  toolName = "HTTP Permissions-Policy Header Builder",
}: PermissionsPolicyBuilderProps) {
  // Primary builder state
  const [state, setState] = useState<PermissionsPolicyState>(getInitialPermissionsPolicyState);
  const [activeCategory, setActiveCategory] = useState<"all" | DirectiveCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("strict-lockdown");
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("raw");
  const [isMultiline, setIsMultiline] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [inspectModalDirective, setInspectModalDirective] = useState<DirectiveDefinition | null>(null);
  const [customOriginInputs, setCustomOriginInputs] = useState<Record<string, string>>({});
  const [showAuditDetails, setShowAuditDetails] = useState(true);

  // Initialize from URL hash on mount if present
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      try {
        const hash = window.location.hash.substring(1);
        if (hash.startsWith("policy=")) {
          const raw = decodeURIComponent(hash.substring(7));
          const parsed = JSON.parse(atob(raw));
          if (parsed && typeof parsed === "object") {
            setState((prev) => ({ ...prev, ...parsed }));
            setSelectedPresetId("custom");
          }
        }
      } catch (err) {
        console.warn("Could not parse Permissions-Policy state from URL hash:", err);
      }
    }
  }, []);

  // Update a directive mode
  const setDirectiveMode = useCallback(
    (directiveId: string, mode: DirectiveValueMode) => {
      setState((prev) => {
        const current = prev[directiveId] || {
          mode: "none",
          includeSelf: mode === "self",
          customOrigins: [],
        };
        return {
          ...prev,
          [directiveId]: {
            ...current,
            mode,
            includeSelf: mode === "custom" ? current.includeSelf : mode === "self",
          },
        };
      });
      setSelectedPresetId("custom");
    },
    []
  );

  // Toggle includeSelf for custom mode
  const toggleIncludeSelf = useCallback((directiveId: string) => {
    setState((prev) => {
      const current = prev[directiveId] || {
        mode: "custom",
        includeSelf: true,
        customOrigins: [],
      };
      return {
        ...prev,
        [directiveId]: {
          ...current,
          includeSelf: !current.includeSelf,
        },
      };
    });
    setSelectedPresetId("custom");
  }, []);

  // Add custom origin to directive
  const addCustomOrigin = useCallback((directiveId: string, originToAdd?: string) => {
    const valueToAdd = originToAdd || customOriginInputs[directiveId]?.trim();
    if (!valueToAdd) return;

    // Clean origin format
    let clean = valueToAdd.trim().replace(/^["']|["']$/g, "");
    if (!clean.startsWith("http://") && !clean.startsWith("https://") && !clean.startsWith("*.")) {
      clean = `https://${clean}`;
    }

    setState((prev) => {
      const current = prev[directiveId] || {
        mode: "custom",
        includeSelf: true,
        customOrigins: [],
      };
      if (current.customOrigins.includes(clean)) return prev;
      return {
        ...prev,
        [directiveId]: {
          ...current,
          mode: "custom",
          customOrigins: [...current.customOrigins, clean],
        },
      };
    });

    setCustomOriginInputs((prev) => ({ ...prev, [directiveId]: "" }));
    setSelectedPresetId("custom");
  }, [customOriginInputs]);

  // Remove custom origin
  const removeCustomOrigin = useCallback((directiveId: string, originToRemove: string) => {
    setState((prev) => {
      const current = prev[directiveId];
      if (!current) return prev;
      return {
        ...prev,
        [directiveId]: {
          ...current,
          customOrigins: current.customOrigins.filter((o) => o !== originToRemove),
        },
      };
    });
    setSelectedPresetId("custom");
  }, []);

  // Apply a preset
  const applyPreset = useCallback((presetId: string) => {
    const preset = POLICY_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setSelectedPresetId(presetId);
    setState((prev) => {
      const next: PermissionsPolicyState = { ...prev };
      for (const def of DIRECTIVE_DEFINITIONS) {
        const val = preset.state[def.id];
        if (val) {
          next[def.id] = {
            mode: val.mode,
            includeSelf: val.includeSelf ?? (val.mode === "self"),
            customOrigins: val.customOrigins || (def.sampleOrigins ? [...def.sampleOrigins] : []),
          };
        } else {
          next[def.id] = {
            mode: "omit",
            includeSelf: false,
            customOrigins: [],
          };
        }
      }
      return next;
    });
  }, []);

  // Bulk actions for current category
  const setBulkCategoryMode = useCallback(
    (category: DirectiveCategory | "all", mode: DirectiveValueMode) => {
      setState((prev) => {
        const next = { ...prev };
        for (const def of DIRECTIVE_DEFINITIONS) {
          if (category === "all" || def.category === category) {
            next[def.id] = {
              ...(next[def.id] || { includeSelf: mode === "self", customOrigins: [] }),
              mode,
              includeSelf: mode === "self",
            };
          }
        }
        return next;
      });
      setSelectedPresetId("custom");
    },
    []
  );

  // Reset all
  const resetToDefaults = useCallback(() => {
    applyPreset("strict-lockdown");
  }, [applyPreset]);

  // Filtered directives
  const filteredDirectives = useMemo(() => {
    return DIRECTIVE_DEFINITIONS.filter((def) => {
      const matchesCategory =
        activeCategory === "all" || def.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return (
        def.id.toLowerCase().includes(query) ||
        def.name.toLowerCase().includes(query) ||
        def.description.toLowerCase().includes(query) ||
        def.threatMitigation.toLowerCase().includes(query)
      );
    });
  }, [activeCategory, searchQuery]);

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: DIRECTIVE_DEFINITIONS.length };
    for (const cat of DIRECTIVE_CATEGORIES) {
      counts[cat.id] = DIRECTIVE_DEFINITIONS.filter((d) => d.category === cat.id).length;
    }
    return counts;
  }, []);

  // Security Audit Engine
  const auditResult = useMemo(() => auditPermissionsPolicy(state), [state]);

  // Build raw header string
  const rawHeaderValue = useMemo(() => {
    return buildPermissionsPolicyString(state, { multiline: isMultiline });
  }, [state, isMultiline]);

  const rawHeaderSingleLine = useMemo(() => {
    return buildPermissionsPolicyString(state, { multiline: false });
  }, [state]);

  // Generate code snippets for various targets
  const generatedCode = useMemo(() => {
    const single = rawHeaderSingleLine;
    const multi = buildPermissionsPolicyString(state, { multiline: true });

    switch (activeCodeTab) {
      case "raw":
        return `Permissions-Policy: ${isMultiline ? multi : single}`;

      case "nextjs":
        return `// next.config.mjs or next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply Permissions-Policy to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: ${JSON.stringify(single)},
          },
        ],
      },
    ];
  },
};

export default nextConfig;`;

      case "cloudflare":
        return `# Cloudflare Pages / Workers (_headers file in public root)
/*
  Permissions-Policy: ${single}

# Or in a Cloudflare Worker:
export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set(
      'Permissions-Policy',
      ${JSON.stringify(single)}
    );
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};`;

      case "nginx":
        return `# Nginx Reverse Proxy Configuration (/etc/nginx/conf.d/default.conf)
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # Harden browser hardware & privacy APIs
    add_header Permissions-Policy "${single}" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`;

      case "apache":
        return `# Apache HTTP Server (.htaccess / httpd.conf)
<IfModule mod_headers.c>
    # Inject HTTP Permissions-Policy across all responses
    Header always set Permissions-Policy "${single}"
</IfModule>`;

      case "vercel":
        return `// vercel.json (Place in project root)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Permissions-Policy",
          "value": ${JSON.stringify(single)}
        }
      ]
    }
  ]
}`;

      case "iframe": {
        // Find directives that allow self or custom origins to demonstrate iframe delegation
        const allowedDirectives: string[] = [];
        for (const def of DIRECTIVE_DEFINITIONS) {
          const item = state[def.id];
          if (item && (item.mode === "self" || item.mode === "all" || item.mode === "custom")) {
            if (item.mode === "all") {
              allowedDirectives.push(`${def.id} *`);
            } else if (item.mode === "custom" && item.customOrigins.length > 0) {
              const origins = item.includeSelf ? ["'self'", ...item.customOrigins] : item.customOrigins;
              allowedDirectives.push(`${def.id} ${origins.join(" ")}`);
            } else {
              allowedDirectives.push(def.id);
            }
          }
        }
        const allowAttribute = allowedDirectives.slice(0, 5).join("; ");
        return `<!-- Secure Iframe API Delegation Example -->
<!--
  NOTE: Top-level Permissions-Policy acts as an unbreakable ceiling.
  To permit an embedded iframe to access an API permitted on top-level,
  explicitly declare the 'allow' attribute:
-->
<iframe
  src="https://partner-service.com/embed"
  title="Embedded Content"
  allow="${allowAttribute || "payment; camera; fullscreen"}"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  loading="lazy"
  width="100%"
  height="600"
  style="border: none; border-radius: 12px;"
></iframe>`;
      }

      case "caddy":
        return `# Netlify (_headers in publish directory)
/*
  Permissions-Policy: ${single}

# Or Caddy Server (Caddyfile):
yourdomain.com {
    header Permissions-Policy "${single}"
    reverse_proxy localhost:3000
}`;

      default:
        return single;
    }
  }, [activeCodeTab, isMultiline, rawHeaderSingleLine, state]);

  // Copy code to clipboard
  const copyCodeToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  }, [generatedCode]);

  // Copy shareable state link
  const copyShareableLink = useCallback(() => {
    try {
      const base64 = btoa(JSON.stringify(state));
      const url = `${window.location.origin}${window.location.pathname}#policy=${encodeURIComponent(base64)}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    } catch (e) {
      console.error("Failed to generate share link:", e);
    }
  }, [state]);

  // Download config file
  const downloadConfigFile = useCallback(() => {
    let filename = "permissions-policy.txt";
    let mimeType = "text/plain";

    switch (activeCodeTab) {
      case "nextjs":
        filename = "next.config.mjs";
        mimeType = "application/javascript";
        break;
      case "cloudflare":
        filename = "_headers";
        mimeType = "text/plain";
        break;
      case "nginx":
        filename = "nginx-permissions-policy.conf";
        mimeType = "text/plain";
        break;
      case "apache":
        filename = ".htaccess";
        mimeType = "text/plain";
        break;
      case "vercel":
        filename = "vercel.json";
        mimeType = "application/json";
        break;
      case "iframe":
        filename = "iframe-snippet.html";
        mimeType = "text/html";
        break;
      case "caddy":
        filename = "Caddyfile";
        mimeType = "text/plain";
        break;
    }

    const blob = new Blob([generatedCode], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [activeCodeTab, generatedCode]);

  return (
    <div className="space-y-8">
      {/* 1. Top Security Scorecard & Hardening Audit Banner */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-7 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-2xl font-black text-2xl shadow-inner shrink-0",
                  auditResult.grade === "A+" || auditResult.grade === "A"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : auditResult.grade === "B"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                    : auditResult.grade === "C"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                )}
              >
                {auditResult.grade}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Security Hardening Score:
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase",
                      auditResult.badgeVariant === "emerald"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300"
                        : auditResult.badgeVariant === "blue"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300"
                        : auditResult.badgeVariant === "amber"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300"
                    )}
                  >
                    {auditResult.statusText}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {auditResult.score}/100 Security Rating
                  <span className="text-xs font-normal text-slate-500 ml-2">
                    ({auditResult.totalConfigured} of {auditResult.totalDirectives} directives declared)
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowAuditDetails(!showAuditDetails)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>{showAuditDetails ? "Hide Audit Checklist" : "Show Audit Checklist"}</span>
                {showAuditDetails ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={copyShareableLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                title="Share this configured policy via URL link"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share Policy URL</span>
                  </>
                )}
              </button>

              <EmbedBadgeModal
                score={auditResult.score}
                status={auditResult.grade}
                label="Permissions-Policy"
                toolSlug="permissions-policy-builder"
                buttonVariant="outline"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                auditResult.score >= 85
                  ? "bg-emerald-500"
                  : auditResult.score >= 70
                  ? "bg-blue-500"
                  : auditResult.score >= 50
                  ? "bg-amber-500"
                  : "bg-rose-500"
              )}
              style={{ width: `${auditResult.score}%` }}
            />
          </div>
        </div>

        {/* Expandable Audit Details */}
        {showAuditDetails && (
          <div className="p-6 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800/80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Passed Checks */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Hardened Protections ({auditResult.passedChecks.length})</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pl-5 list-disc marker:text-emerald-500">
                  {auditResult.passedChecks.map((check, i) => (
                    <li key={i}>{check}</li>
                  ))}
                  {auditResult.passedChecks.length === 0 && (
                    <li className="text-slate-400 italic list-none -ml-5">No explicit security restrictions detected.</li>
                  )}
                </ul>
              </div>

              {/* Warnings */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-500/20">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Optimization Notices ({auditResult.warnings.length})</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pl-5 list-disc marker:text-amber-500">
                  {auditResult.warnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                  {auditResult.warnings.length === 0 && (
                    <li className="text-emerald-600 dark:text-emerald-400 list-none -ml-5">Zero configuration warnings.</li>
                  )}
                </ul>
              </div>

              {/* Critical Risks */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-500/20">
                <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300">
                  <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                  <span>High Risk Vectors ({auditResult.criticalRisks.length})</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pl-5 list-disc marker:text-rose-500">
                  {auditResult.criticalRisks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                  {auditResult.criticalRisks.length === 0 && (
                    <li className="text-emerald-600 dark:text-emerald-400 list-none -ml-5">No critical wildcard leaks detected.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. One-Click Strategy Presets Bar */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              One-Click Hardening Presets:
            </h3>
          </div>
          <button
            type="button"
            onClick={resetToDefaults}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {POLICY_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className={cn(
                  "flex flex-col text-left p-3.5 rounded-2xl border transition-all text-xs relative",
                  isSelected
                    ? "border-purple-500 bg-purple-50/60 dark:bg-purple-950/40 text-purple-900 dark:text-purple-100 shadow-sm ring-2 ring-purple-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                )}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                    {preset.name}
                  </span>
                  {preset.badge && (
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0",
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      {preset.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Output Code Generators Panel (Tabbed) */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* Header Tabs */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-xs">
                <Code2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Production HTTP Header Export
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select target framework or web server syntax
                </p>
              </div>
            </div>

            {/* Target Select Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-2xl">
              {[
                { id: "raw", label: "Raw Header" },
                { id: "nextjs", label: "Next.js" },
                { id: "cloudflare", label: "Cloudflare" },
                { id: "nginx", label: "Nginx" },
                { id: "apache", label: "Apache" },
                { id: "vercel", label: "Vercel" },
                { id: "iframe", label: "<iframe> Allow" },
                { id: "caddy", label: "Caddy / Netlify" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCodeTab(tab.id as CodeTab)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                    activeCodeTab === tab.id
                      ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Code Content & Actions */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              {activeCodeTab === "raw" && (
                <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={isMultiline}
                    onChange={(e) => setIsMultiline(e.target.checked)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5"
                  />
                  <span>Format Multi-Line (Wrap Directives)</span>
                </label>
              )}
              <span className="font-mono text-[11px]">
                {rawHeaderSingleLine.length} chars | {auditResult.totalConfigured} directives
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyCodeToClipboard}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-xs transition-all"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={downloadConfigFile}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                title="Download formatted file"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner leading-relaxed">
            <pre className="whitespace-pre-wrap break-all">{generatedCode}</pre>
          </div>
        </div>
      </section>

      {/* 4. Directive Explorer & Granular Controls */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              Browser Directives &amp; Hardware Access Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure permissions for privacy tracking, device cameras, microphones, payments, and rendering APIs
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter directives (e.g. camera, FLoC, usb)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs & Bulk Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCategory === "all"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              All Directives ({categoryCounts.all})
            </button>
            {DIRECTIVE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                  activeCategory === cat.id
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <span>{cat.name}</span>
                <span className="opacity-70 text-[10px]">({categoryCounts[cat.id]})</span>
              </button>
            ))}
          </div>

          {/* Bulk Category Operations */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-semibold text-slate-400">Bulk Group:</span>
            <button
              type="button"
              onClick={() => setBulkCategoryMode(activeCategory, "none")}
              className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 text-[11px] font-bold transition-colors"
            >
              Disable All ()
            </button>
            <button
              type="button"
              onClick={() => setBulkCategoryMode(activeCategory, "self")}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 hover:bg-indigo-100 text-[11px] font-bold transition-colors"
            >
              Allow Self (self)
            </button>
          </div>
        </div>

        {/* Directives List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredDirectives.map((directive) => {
            const current = state[directive.id] || {
              mode: "none",
              includeSelf: false,
              customOrigins: [],
            };

            const isCustom = current.mode === "custom";

            return (
              <div
                key={directive.id}
                className={cn(
                  "rounded-2xl border p-4 sm:p-5 transition-all bg-white dark:bg-slate-900 shadow-xs space-y-4",
                  current.mode === "all"
                    ? "border-amber-400/50 dark:border-amber-500/30"
                    : current.mode === "none"
                    ? "border-slate-200 dark:border-slate-800"
                    : "border-purple-500/30 dark:border-purple-500/20"
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Directive Metadata */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="text-sm font-bold font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded-md">
                        {directive.id}
                      </code>

                      {/* Risk Badge */}
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          directive.riskLevel === "critical"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                            : directive.riskLevel === "high"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            : directive.riskLevel === "medium"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        )}
                      >
                        {directive.riskLevel} risk
                      </span>

                      <button
                        type="button"
                        onClick={() => setInspectModalDirective(directive)}
                        className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-0.5"
                        title="View W3C Specification & Browser Compatibility"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {directive.description}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      Threat Mitigation: {directive.threatMitigation}
                    </p>
                  </div>

                  {/* Mode Option Radios */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl shrink-0">
                    {/* 1. Disable Everywhere () */}
                    <button
                      type="button"
                      onClick={() => setDirectiveMode(directive.id, "none")}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                        current.mode === "none"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      )}
                    >
                      Disable ()
                    </button>

                    {/* 2. Allow Same-Origin Only (self) */}
                    <button
                      type="button"
                      onClick={() => setDirectiveMode(directive.id, "self")}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                        current.mode === "self"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      )}
                    >
                      Same-Origin (self)
                    </button>

                    {/* 3. Allow All (*) */}
                    <button
                      type="button"
                      onClick={() => setDirectiveMode(directive.id, "all")}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                        current.mode === "all"
                          ? "bg-amber-600 text-white shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      )}
                      title="Warning: Allows all origins including cross-origin iframes"
                    >
                      Allow All (*)
                    </button>

                    {/* 4. Custom Origins */}
                    <button
                      type="button"
                      onClick={() => setDirectiveMode(directive.id, "custom")}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                        current.mode === "custom"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      )}
                    >
                      Custom Origins
                    </button>

                    {/* 5. Omit */}
                    <button
                      type="button"
                      onClick={() => setDirectiveMode(directive.id, "omit")}
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all",
                        current.mode === "omit"
                          ? "bg-slate-600 text-white shadow-xs"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      )}
                      title="Omit this directive from the HTTP header entirely"
                    >
                      Omit
                    </button>
                  </div>
                </div>

                {/* Custom Origins Expandable Box */}
                {isCustom && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-950/40 -mx-4 -mb-4 p-4 rounded-b-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200 select-none">
                        <input
                          type="checkbox"
                          checked={current.includeSelf}
                          onChange={() => toggleIncludeSelf(directive.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                        />
                        <span>Include Same-Origin (self) in allowlist</span>
                      </label>

                      {directive.sampleOrigins && directive.sampleOrigins.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-slate-500">Quick Add:</span>
                          {directive.sampleOrigins.map((sample) => (
                            <button
                              key={sample}
                              type="button"
                              onClick={() => addCustomOrigin(directive.id, sample)}
                              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 text-[10px] font-mono transition-colors"
                            >
                              + {sample.replace("https://", "")}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Custom Origin Input Bar */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customOriginInputs[directive.id] || ""}
                        onChange={(e) =>
                          setCustomOriginInputs((prev) => ({
                            ...prev,
                            [directive.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCustomOrigin(directive.id);
                          }
                        }}
                        placeholder="https://js.stripe.com or https://trusted-partner.com"
                        className="flex-1 px-3 py-1.5 rounded-xl text-xs font-mono border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => addCustomOrigin(directive.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Origin</span>
                      </button>
                    </div>

                    {/* Active Origin Tags */}
                    {current.customOrigins.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {current.customOrigins.map((origin) => (
                          <span
                            key={origin}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono"
                          >
                            <span>{origin}</span>
                            <button
                              type="button"
                              onClick={() => removeCustomOrigin(directive.id, origin)}
                              className="text-emerald-600 hover:text-rose-600 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">
                        No external origins specified. {current.includeSelf ? "Only 'self' is currently allowed." : "Currently evaluates to () (empty / disabled)."}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredDirectives.length === 0 && (
            <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="font-semibold text-sm">No matching browser directives found.</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. Directive Details Modal */}
      {inspectModalDirective && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-xs">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                    {inspectModalDirective.id}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {inspectModalDirective.name}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectModalDirective(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Description:</span>
                <p className="text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                  {inspectModalDirective.description}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Security Risk &amp; Threat Mitigation:</span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {inspectModalDirective.threatMitigation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">W3C Status:</span>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {inspectModalDirective.w3cStatus}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Risk Tier:</span>
                  <p className="font-bold uppercase text-rose-600 dark:text-rose-400 mt-0.5">
                    {inspectModalDirective.riskLevel}
                  </p>
                </div>
              </div>

              {/* Browser Support Table */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Browser Engine Compatibility:</span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold">Chrome</div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {inspectModalDirective.browserSupport.chrome}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold">Firefox</div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {inspectModalDirective.browserSupport.firefox}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold">Safari</div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {inspectModalDirective.browserSupport.safari}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold">Edge</div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {inspectModalDirective.browserSupport.edge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Spec Link */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <a
                  href={inspectModalDirective.specUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-500 font-bold transition-colors"
                >
                  <span>Read Official W3C Spec</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setInspectModalDirective(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
