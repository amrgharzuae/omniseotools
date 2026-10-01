"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ShieldCheck,
  Lock,
  Copy,
  Check,
  Download,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Globe,
  Plus,
  Trash2,
  Info,
  Calendar,
  Code2,
  Server,
  FileCode,
  Layers,
  HeartHandshake,
  ExternalLink,
  Briefcase,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface SecurityTxtGeneratorProps {
  toolSlug?: string;
  toolName?: string;
}

interface ContactEntry {
  id: string;
  type: "email" | "url";
  value: string;
  comment?: string;
}

interface PresetConfig {
  name: string;
  badge: string;
  description: string;
  contacts: ContactEntry[];
  expiresDays: number;
  encryption?: string;
  acknowledgments?: string;
  preferredLanguages?: string;
  canonical?: string;
  policy?: string;
  hiring?: string;
  csaf?: string;
}

const PRESETS: PresetConfig[] = [
  {
    name: "Enterprise SaaS & Cloud",
    badge: "Comprehensive",
    description: "Complete setup with bug bounty portal, PGP encryption, Safe Harbor, and Hall of Fame.",
    contacts: [
      { id: "1", type: "email", value: "security@example.com", comment: "Direct Security Response Team" },
      { id: "2", type: "url", value: "https://hackerone.com/example", comment: "Bounty Program & Triage" },
    ],
    expiresDays: 365,
    encryption: "https://example.com/pgp-key.txt",
    acknowledgments: "https://example.com/security/hall-of-fame",
    preferredLanguages: "en, de, fr",
    canonical: "https://example.com/.well-known/security.txt",
    policy: "https://example.com/security/disclosure-policy",
    hiring: "https://example.com/careers/security",
    csaf: "",
  },
  {
    name: "E-Commerce & Retail",
    badge: "Standard",
    description: "Standard disclosure channel with security inbox, policy page, and multi-language support.",
    contacts: [
      { id: "1", type: "email", value: "security@store.example.com", comment: "Security Operations Center" },
    ],
    expiresDays: 180,
    encryption: "https://store.example.com/security/pgp.asc",
    acknowledgments: "https://store.example.com/security/acknowledgments",
    preferredLanguages: "en, es, fr, ar",
    canonical: "https://store.example.com/.well-known/security.txt",
    policy: "https://store.example.com/legal/vulnerability-reporting",
    hiring: "",
    csaf: "",
  },
  {
    name: "Open Source & Developer Tools",
    badge: "Developer",
    description: "Tailored for OSS repositories with GitHub Advisory submission and PGP key.",
    contacts: [
      { id: "1", type: "email", value: "maintainers@example.org" },
      { id: "2", type: "url", value: "https://github.com/example/project/security/advisories/new" },
    ],
    expiresDays: 365,
    encryption: "https://keys.openpgp.org/vks/v1/by-fingerprint/ABCD1234EF567890",
    acknowledgments: "https://github.com/example/project/blob/main/AUTHORS.md",
    preferredLanguages: "en",
    canonical: "https://example.org/.well-known/security.txt",
    policy: "https://github.com/example/project/security/policy",
    hiring: "",
    csaf: "",
  },
  {
    name: "Minimal RFC 9116 Compliant",
    badge: "Minimal",
    description: "Fastest compliant configuration containing only the mandatory Contact and Expires fields.",
    contacts: [
      { id: "1", type: "email", value: "security@example.com" },
    ],
    expiresDays: 365,
    encryption: "",
    acknowledgments: "",
    preferredLanguages: "",
    canonical: "https://example.com/.well-known/security.txt",
    policy: "",
    hiring: "",
    csaf: "",
  },
];

function getExpiryDateString(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export function SecurityTxtGenerator({
  toolSlug = "security-txt-generator",
  toolName = "RFC 9116 Security.txt Generator",
}: SecurityTxtGeneratorProps) {
  // Directives State
  const [contacts, setContacts] = useState<ContactEntry[]>(PRESETS[0].contacts);
  const [expiresDate, setExpiresDate] = useState<string>(() => getExpiryDateString(365));
  const [encryption, setEncryption] = useState<string>(PRESETS[0].encryption || "");
  const [acknowledgments, setAcknowledgments] = useState<string>(PRESETS[0].acknowledgments || "");
  const [preferredLanguages, setPreferredLanguages] = useState<string>(PRESETS[0].preferredLanguages || "");
  const [canonical, setCanonical] = useState<string>(PRESETS[0].canonical || "");
  const [policy, setPolicy] = useState<string>(PRESETS[0].policy || "");
  const [hiring, setHiring] = useState<string>(PRESETS[0].hiring || "");
  const [csaf, setCsaf] = useState<string>("");
  const [customComment, setCustomComment] = useState<string>(
    "# OmniSEO Security.txt - Generated in compliance with IETF RFC 9116\n# We welcome responsible disclosure from ethical security researchers."
  );

  // Active Export Tab
  const [activeTab, setActiveTab] = useState<"raw" | "nextjs" | "nginx" | "apache" | "cloudflare">("raw");
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  // Contact list helpers
  const handleAddContact = () => {
    const newId = Date.now().toString();
    setContacts((prev) => [...prev, { id: newId, type: "email", value: "" }]);
  };

  const handleRemoveContact = (id: string) => {
    if (contacts.length <= 1) return;
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateContact = (id: string, field: keyof ContactEntry, val: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  // Quick preset loader
  const handleLoadPreset = (preset: PresetConfig) => {
    setContacts(preset.contacts.map((c, i) => ({ ...c, id: `${Date.now()}-${i}` })));
    setExpiresDate(getExpiryDateString(preset.expiresDays));
    setEncryption(preset.encryption || "");
    setAcknowledgments(preset.acknowledgments || "");
    setPreferredLanguages(preset.preferredLanguages || "");
    setCanonical(preset.canonical || "");
    setPolicy(preset.policy || "");
    setHiring(preset.hiring || "");
    setCsaf(preset.csaf || "");
  };

  // Quick Expiration Buttons
  const setExpiryDays = (days: number) => {
    setExpiresDate(getExpiryDateString(days));
  };

  // Validation
  const validationResults = useMemo(() => {
    const errors: string[] = [];
    const warnings: string[] = [];
    const passes: string[] = [];

    // Check Contacts
    const validContacts = contacts.filter((c) => c.value.trim().length > 0);
    if (validContacts.length === 0) {
      errors.push("RFC 9116 Mandatory: At least one Contact directive is required.");
    } else {
      passes.push(`${validContacts.length} valid Contact directive(s) configured.`);
      validContacts.forEach((c) => {
        const val = c.value.trim();
        if (c.type === "email" && !val.startsWith("mailto:") && !val.includes("@")) {
          warnings.push(`Contact email "${val}" should be a valid email or include mailto: prefix.`);
        }
        if (c.type === "url" && !val.startsWith("https://")) {
          errors.push(`Contact URL "${val}" MUST begin with https:// (unencrypted HTTP is forbidden by RFC 9116).`);
        }
      });
    }

    // Check Expires
    if (!expiresDate) {
      errors.push("RFC 9116 Mandatory: 'Expires' directive is required.");
    } else {
      const expTime = new Date(expiresDate).getTime();
      const nowTime = Date.now();
      if (isNaN(expTime)) {
        errors.push("Expires date is not a valid ISO 8601 date.");
      } else if (expTime <= nowTime) {
        errors.push("Expires date is in the PAST! Automated security scanners will flag this file as stale/invalid.");
      } else {
        const daysLeft = Math.round((expTime - nowTime) / (1000 * 60 * 60 * 24));
        if (daysLeft > 366) {
          warnings.push(`Expires date is ${daysLeft} days in the future. RFC 9116 suggests no more than 1 year (365 days) for best security practice.`);
        } else {
          passes.push(`Expires in ${daysLeft} days (ISO 8601 compliant).`);
        }
      }
    }

    // Check HTTPS on all other URLs
    [
      { label: "Encryption", val: encryption },
      { label: "Acknowledgments", val: acknowledgments },
      { label: "Canonical", val: canonical },
      { label: "Policy", val: policy },
      { label: "Hiring", val: hiring },
      { label: "CSAF", val: csaf },
    ].forEach((item) => {
      if (item.val && item.val.trim()) {
        const trimmed = item.val.trim();
        if (!trimmed.startsWith("https://")) {
          errors.push(`${item.label} URL must use HTTPS strictly (RFC 9116 § 2.5).`);
        } else {
          passes.push(`${item.label} URL verified.`);
        }
      }
    });

    if (canonical && !canonical.endsWith("/.well-known/security.txt") && !canonical.endsWith("/security.txt")) {
      warnings.push("Canonical URL should point to the exact security.txt path (e.g., https://yourdomain.com/.well-known/security.txt).");
    }

    return { errors, warnings, passes, isCompliant: errors.length === 0 };
  }, [contacts, expiresDate, encryption, acknowledgments, preferredLanguages, canonical, policy, hiring, csaf]);

  // Formatted Output Generator
  const rawSecurityTxt = useMemo(() => {
    const lines: string[] = [];

    if (customComment.trim()) {
      lines.push(customComment.trim());
      lines.push("");
    }

    // Contact
    contacts.forEach((c) => {
      const val = c.value.trim();
      if (!val) return;
      if (c.comment && c.comment.trim()) {
        lines.push(`# ${c.comment.trim()}`);
      }
      if (c.type === "email") {
        const formatted = val.startsWith("mailto:") ? val : `mailto:${val}`;
        lines.push(`Contact: ${formatted}`);
      } else {
        lines.push(`Contact: ${val}`);
      }
    });

    // Expires
    if (expiresDate) {
      lines.push(`Expires: ${expiresDate}`);
    }

    // Encryption
    if (encryption.trim()) {
      lines.push(`Encryption: ${encryption.trim()}`);
    }

    // Acknowledgments
    if (acknowledgments.trim()) {
      lines.push(`Acknowledgments: ${acknowledgments.trim()}`);
    }

    // Preferred Languages
    if (preferredLanguages.trim()) {
      lines.push(`Preferred-Languages: ${preferredLanguages.trim()}`);
    }

    // Canonical
    if (canonical.trim()) {
      lines.push(`Canonical: ${canonical.trim()}`);
    }

    // Policy
    if (policy.trim()) {
      lines.push(`Policy: ${policy.trim()}`);
    }

    // Hiring
    if (hiring.trim()) {
      lines.push(`Hiring: ${hiring.trim()}`);
    }

    // CSAF
    if (csaf.trim()) {
      lines.push(`CSAF: ${csaf.trim()}`);
    }

    return lines.join("\n");
  }, [customComment, contacts, expiresDate, encryption, acknowledgments, preferredLanguages, canonical, policy, hiring, csaf]);

  // Next.js Route Handler Snippet
  const nextjsRouteSnippet = useMemo(() => {
    return `// src/app/.well-known/security.txt/route.ts
// Compliant with IETF RFC 9116 for Next.js App Router (14 / 15)

const SECURITY_TXT_CONTENT = \`${rawSecurityTxt.replace(/`/g, "\\`")}\`;

export async function GET() {
  return new Response(SECURITY_TXT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
`;
  }, [rawSecurityTxt]);

  // Nginx snippet
  const nginxSnippet = useMemo(() => {
    return `# Nginx Server Block Configuration for RFC 9116
# Place inside your server { ... } block

location = /.well-known/security.txt {
    default_type text/plain;
    add_header Content-Type "text/plain; charset=utf-8" always;
    add_header Cache-Control "public, max-age=86400" always;
    add_header X-Content-Type-Options "nosniff" always;
    try_files $uri =404;
}

# Optional legacy fallback redirect to /.well-known/
location = /security.txt {
    return 301 https://$host/.well-known/security.txt;
}
`;
  }, []);

  // Apache .htaccess snippet
  const apacheSnippet = useMemo(() => {
    return `# Apache .htaccess / VirtualHost configuration for RFC 9116
<IfModule mod_headers.c>
    <LocationMatch "^/\\.well-known/security\\.txt$">
        Header set Content-Type "text/plain; charset=utf-8"
        Header set Cache-Control "public, max-age=86400"
        Header set X-Content-Type-Options "nosniff"
    </LocationMatch>
</IfModule>

# Optional legacy redirect: /security.txt -> /.well-known/security.txt
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^security\\.txt$ /.well-known/security.txt [R=301,L]
</IfModule>
`;
  }, []);

  // Cloudflare _headers snippet
  const cloudflareSnippet = useMemo(() => {
    return `# Cloudflare Pages / Static Hosting _headers File
/.well-known/security.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=86400
  X-Content-Type-Options: nosniff

/security.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=86400
`;
  }, []);

  const handleCopy = useCallback((text: string, tabKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabKey);
    setTimeout(() => setCopiedTab(null), 2000);
  }, []);

  const handleDownloadFile = () => {
    const blob = new Blob([rawSecurityTxt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "security.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Top Banner & Presets */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              IETF RFC 9116 Official Standard Compliant
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              Responsible Vulnerability Disclosure Generator
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Create an authoritative <code>/.well-known/security.txt</code> file with valid ISO 8601 expiration, contact endpoints, PGP encryption keys, and multi-platform deployment templates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <EmbedBadgeModal
              score={validationResults.isCompliant ? 100 : 80}
              status="RFC 9116"
              label="Security.txt"
              toolSlug={toolSlug}
              buttonVariant="outline"
            />
            <button
              onClick={() => handleLoadPreset(PRESETS[0])}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
            Quick Templates & Profiles
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleLoadPreset(preset)}
                className="text-left p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                    {preset.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Preview & Outputs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Directives Input Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Mandatory Fields Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                  1
                </span>
                <h3 className="text-base font-semibold text-white">
                  Mandatory RFC 9116 Directives
                </h3>
              </div>
              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Required by RFC 9116
              </span>
            </div>

            {/* Contacts Builder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Contact Channels (At least 1 required)
                </label>
                <button
                  type="button"
                  onClick={handleAddContact}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Contact
                </button>
              </div>

              <div className="space-y-2.5">
                {contacts.map((contact, idx) => (
                  <div
                    key={contact.id}
                    className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <select
                        value={contact.type}
                        onChange={(e) =>
                          handleUpdateContact(contact.id, "type", e.target.value as "email" | "url")
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-emerald-500"
                      >
                        <option value="email">Email (mailto:)</option>
                        <option value="url">Web URL (https://)</option>
                      </select>

                      <input
                        type={contact.type === "email" ? "text" : "url"}
                        value={contact.value}
                        onChange={(e) =>
                          handleUpdateContact(contact.id, "value", e.target.value)
                        }
                        placeholder={
                          contact.type === "email"
                            ? "security@yourdomain.com"
                            : "https://hackerone.com/yourprogram"
                        }
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                      />

                      {contacts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveContact(contact.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                          title="Remove Contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={contact.comment || ""}
                      onChange={(e) =>
                        handleUpdateContact(contact.id, "comment", e.target.value)
                      }
                      placeholder="Optional label (e.g. Primary Security Team / Bug Bounty Platform)"
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-md px-2.5 py-1 text-[11px] text-slate-400 placeholder:text-slate-600 focus:outline-none focus:border-slate-600"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Expires Directive */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Expires Date & Time (Mandatory)
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setExpiryDays(90)}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    +90 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpiryDays(180)}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    +6 Mo
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpiryDays(365)}
                    className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 transition-colors"
                  >
                    +1 Year (Rec)
                  </button>
                </div>
              </div>

              <input
                type="text"
                value={expiresDate}
                onChange={(e) => setExpiresDate(e.target.value)}
                placeholder="2027-10-01T00:00:00+00:00"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <p className="text-[11px] text-slate-400">
                Must be an ISO 8601 string. Vulnerability scanners reject policies with expired dates.
              </p>
            </div>
          </div>

          {/* 2. Optional Recommended Directives Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-mono text-xs font-bold">
                  2
                </span>
                <h3 className="text-base font-semibold text-white">
                  Encryption, Policies & Canonical
                </h3>
              </div>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                Optional Directives
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Encryption */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  Encryption (PGP Key URL)
                </label>
                <input
                  type="url"
                  value={encryption}
                  onChange={(e) => setEncryption(e.target.value)}
                  placeholder="https://example.com/pgp-key.txt"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Policy */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Policy (Safe Harbor URL)
                </label>
                <input
                  type="url"
                  value={policy}
                  onChange={(e) => setPolicy(e.target.value)}
                  placeholder="https://example.com/security-policy"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Acknowledgments */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-blue-400" />
                  Acknowledgments (Hall of Fame)
                </label>
                <input
                  type="url"
                  value={acknowledgments}
                  onChange={(e) => setAcknowledgments(e.target.value)}
                  placeholder="https://example.com/hall-of-fame"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Canonical */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  Canonical (.well-known URL)
                </label>
                <input
                  type="url"
                  value={canonical}
                  onChange={(e) => setCanonical(e.target.value)}
                  placeholder="https://example.com/.well-known/security.txt"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Preferred Languages */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-blue-400" />
                  Preferred-Languages (ISO codes)
                </label>
                <input
                  type="text"
                  value={preferredLanguages}
                  onChange={(e) => setPreferredLanguages(e.target.value)}
                  placeholder="en, es, de, ar, fr"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              {/* Hiring */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  Hiring (Security Careers)
                </label>
                <input
                  type="url"
                  value={hiring}
                  onChange={(e) => setHiring(e.target.value)}
                  placeholder="https://example.com/careers/security"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            {/* Header Comments */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-slate-400" />
                Custom Header Comments (# Lines)
              </label>
              <textarea
                value={customComment}
                onChange={(e) => setCustomComment(e.target.value)}
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Validation & Multi-Framework Export (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live RFC 9116 Audit Badge */}
          <div
            className={cn(
              "p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300",
              validationResults.isCompliant
                ? "bg-emerald-950/20 border-emerald-500/30"
                : "bg-rose-950/20 border-rose-500/30"
            )}
          >
            <div className="flex items-center gap-3">
              {validationResults.isCompliant ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
              )}
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {validationResults.isCompliant
                    ? "RFC 9116 Compliant Policy"
                    : "Specification Violations Detected"}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {validationResults.isCompliant
                    ? "Your security.txt is 100% compliant and ready for production deployment."
                    : "Please fix the mandatory requirements highlighted below."}
                </p>
              </div>
            </div>

            {/* Error / Warning Details */}
            {(validationResults.errors.length > 0 ||
              validationResults.warnings.length > 0) && (
              <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 space-y-1.5 text-xs">
                {validationResults.errors.map((err, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-rose-400">
                    <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{err}</span>
                  </div>
                ))}
                {validationResults.warnings.map((warn, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Code Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header Tabs */}
            <div className="bg-slate-950 px-3 pt-3 border-b border-slate-800 flex flex-wrap gap-1">
              <button
                onClick={() => setActiveTab("raw")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "raw"
                    ? "bg-slate-900 text-emerald-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <FileCode className="w-3.5 h-3.5" />
                security.txt
              </button>
              <button
                onClick={() => setActiveTab("nextjs")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "nextjs"
                    ? "bg-slate-900 text-emerald-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Code2 className="w-3.5 h-3.5" />
                Next.js Route
              </button>
              <button
                onClick={() => setActiveTab("nginx")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "nginx"
                    ? "bg-slate-900 text-emerald-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Server className="w-3.5 h-3.5" />
                Nginx
              </button>
              <button
                onClick={() => setActiveTab("apache")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "apache"
                    ? "bg-slate-900 text-emerald-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                Apache
              </button>
              <button
                onClick={() => setActiveTab("cloudflare")}
                className={cn(
                  "px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5",
                  activeTab === "cloudflare"
                    ? "bg-slate-900 text-emerald-400 border-t border-x border-slate-800"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Globe className="w-3.5 h-3.5" />
                Cloudflare
              </button>
            </div>

            {/* Code Content Area */}
            <div className="relative bg-slate-950 p-4 max-h-[380px] overflow-y-auto">
              <pre className="font-mono text-xs text-emerald-300/90 whitespace-pre-wrap leading-relaxed selection:bg-emerald-500/30 selection:text-white">
                {activeTab === "raw" && rawSecurityTxt}
                {activeTab === "nextjs" && nextjsRouteSnippet}
                {activeTab === "nginx" && nginxSnippet}
                {activeTab === "apache" && apacheSnippet}
                {activeTab === "cloudflare" && cloudflareSnippet}
              </pre>
            </div>

            {/* Action Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>Zero telemetry / 100% Client-side</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const content =
                      activeTab === "raw"
                        ? rawSecurityTxt
                        : activeTab === "nextjs"
                        ? nextjsRouteSnippet
                        : activeTab === "nginx"
                        ? nginxSnippet
                        : activeTab === "apache"
                        ? apacheSnippet
                        : cloudflareSnippet;
                    handleCopy(content, activeTab);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  {copiedTab === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Code
                    </>
                  )}
                </button>

                {activeTab === "raw" && (
                  <button
                    onClick={handleDownloadFile}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
                    title="Download security.txt"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Deployment Quick Guide Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <h5 className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              Standard Deployment Location
            </h5>
            <p className="leading-relaxed">
              Upload the generated file to your web server root at{" "}
              <code className="text-emerald-300 font-mono bg-slate-800 px-1 py-0.5 rounded">
                /.well-known/security.txt
              </code>
              . Ensure your web server serves it with HTTP status 200 and Content-Type:{" "}
              <code className="text-emerald-300 font-mono bg-slate-800 px-1 py-0.5 rounded">
                text/plain
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
