"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Globe,
  Sparkles,
  Copy,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  Shield,
  ArrowRightLeft,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Layers,
  FileText,
  FileCode,
  Terminal,
  Info,
  Zap,
  HelpCircle,
  Hash,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  toASCII,
  toUnicode,
  isPunycode,
  analyzeHomographRisk,
  validateDnsCompliance,
  parseDomainOrUrl,
  SecurityAnalysis,
  DnsValidationResult,
  CharInspection,
} from "@/lib/punycode";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface IdnPunycodeConverterProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

type ConverterTab = "single" | "batch";

interface ExampleItem {
  name: string;
  tag: string;
  unicode: string;
  description: string;
  isAttack?: boolean;
}

const EXAMPLES: ExampleItem[] = [
  {
    name: "Arabic Government TLD",
    tag: "Arabic",
    unicode: "امارات.وزارة-التعليم.امارات",
    description: "Multi-level Arabic RTL domain with native .امارات top-level domain",
  },
  {
    name: "German City with Umlaut",
    tag: "German",
    unicode: "münchen.de",
    description: "Standard German European IDN with letter ü (U+00FC)",
  },
  {
    name: "Spanish Web Agency",
    tag: "Spanish",
    unicode: "diseño-web.es",
    description: "Spanish domain containing the ñ character (U+00F1)",
  },
  {
    name: "Emoji Domain Name",
    tag: "Emoji",
    unicode: "i❤️coding.ws",
    description: "Emoji domain on .ws ccTLD with variation selector",
  },
  {
    name: "Cyrillic Russian Domain",
    tag: "Cyrillic",
    unicode: "президент.рф",
    description: "Complete Cyrillic alphabet domain with .рф TLD",
  },
  {
    name: "IDN Homograph Spoof Attack",
    tag: "Phishing Test",
    unicode: "pаypal.com",
    description: "Spoofed PayPal domain using Cyrillic 'а' (U+0430) instead of Latin 'a'",
    isAttack: true,
  },
];

const DEFAULT_BATCH_INPUT = `münchen.de
دبي.امارات
diseño-web.es
i❤️coding.ws
россия.рф
pаypal.com
https://café.example.com/menu?ref=idn
user@موقع.امارات`;

export function IdnPunycodeConverter({
  toolSlug = "idn-punycode-converter",
  toolName = "Unicode & Punycode (IDN) Converter",
}: IdnPunycodeConverterProps) {
  // Mode selection
  const [activeTab, setActiveTab] = useState<ConverterTab>("single");

  // Single mode state
  const [singleInput, setSingleInput] = useState<string>("münchen.de");

  // Batch mode state
  const [batchInput, setBatchInput] = useState<string>(DEFAULT_BATCH_INPUT);

  // UI state
  const [copiedUnicode, setCopiedUnicode] = useState<boolean>(false);
  const [copiedAscii, setCopiedAscii] = useState<boolean>(false);
  const [copiedBatch, setCopiedBatch] = useState<boolean>(false);
  const [showCharMatrix, setShowCharMatrix] = useState<boolean>(false);

  // -------------------------------------------------------------
  // SINGLE MODE DERIVED VALUES
  // -------------------------------------------------------------
  const singleAnalysis = useMemo(() => {
    const trimmed = singleInput.trim();
    if (!trimmed) {
      return {
        unicode: "",
        ascii: "",
        parsed: parseDomainOrUrl(""),
        security: analyzeHomographRisk(""),
        dns: validateDnsCompliance(""),
        isAlreadyPunycode: false,
      };
    }

    const isInputPunycode = isPunycode(trimmed);
    const unicodeVersion = isInputPunycode ? toUnicode(trimmed) : trimmed;
    const asciiVersion = isInputPunycode ? trimmed : toASCII(trimmed);

    // Also ensure both formats are fully converted
    const finalUnicode = toUnicode(trimmed);
    const finalAscii = toASCII(trimmed);

    const parsed = parseDomainOrUrl(finalUnicode);
    const security = analyzeHomographRisk(finalUnicode);
    const dns = validateDnsCompliance(finalAscii);

    return {
      unicode: finalUnicode,
      ascii: finalAscii,
      parsed,
      security,
      dns,
      isAlreadyPunycode: isInputPunycode,
    };
  }, [singleInput]);

  // -------------------------------------------------------------
  // BATCH MODE DERIVED VALUES
  // -------------------------------------------------------------
  const batchResults = useMemo(() => {
    const lines = batchInput
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    return lines.map((line, idx) => {
      const isInputPunycode = isPunycode(line);
      const unicode = toUnicode(line);
      const ascii = toASCII(line);
      const security = analyzeHomographRisk(unicode);
      const dns = validateDnsCompliance(ascii);

      return {
        id: idx + 1,
        raw: line,
        unicode,
        ascii,
        isInputPunycode,
        security,
        dns,
      };
    });
  }, [batchInput]);

  // -------------------------------------------------------------
  // COPY HANDLERS
  // -------------------------------------------------------------
  const handleCopyUnicode = useCallback(() => {
    if (!singleAnalysis.unicode) return;
    navigator.clipboard.writeText(singleAnalysis.unicode);
    setCopiedUnicode(true);
    setTimeout(() => setCopiedUnicode(false), 2000);
  }, [singleAnalysis.unicode]);

  const handleCopyAscii = useCallback(() => {
    if (!singleAnalysis.ascii) return;
    navigator.clipboard.writeText(singleAnalysis.ascii);
    setCopiedAscii(true);
    setTimeout(() => setCopiedAscii(false), 2000);
  }, [singleAnalysis.ascii]);

  const handleCopyAllAscii = useCallback(() => {
    const asciiList = batchResults.map((r) => r.ascii).join("\n");
    navigator.clipboard.writeText(asciiList);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  }, [batchResults]);

  const handleCopyAllUnicode = useCallback(() => {
    const unicodeList = batchResults.map((r) => r.unicode).join("\n");
    navigator.clipboard.writeText(unicodeList);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  }, [batchResults]);

  const handleExportCsv = useCallback(() => {
    const header = "ID,Original Input,Unicode (Native),ASCII Punycode (ACE),Risk Level,Detected Scripts,DNS Valid\n";
    const rows = batchResults.map((r) => {
      const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;
      return [
        r.id,
        escape(r.raw),
        escape(r.unicode),
        escape(r.ascii),
        escape(r.security.riskTitle),
        escape(r.security.detectedScripts.join("; ")),
        r.dns.isValid ? "Valid" : "Invalid",
      ].join(",");
    });

    // Add UTF-8 BOM (\uFEFF) for Excel compatibility
    const csvContent = "\uFEFF" + header + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `idn_punycode_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [batchResults]);

  const handleReset = useCallback(() => {
    if (activeTab === "single") {
      setSingleInput("münchen.de");
    } else {
      setBatchInput(DEFAULT_BATCH_INPUT);
    }
  }, [activeTab]);

  return (
    <div className="space-y-8">
      {/* Top Header & Overview Ribbon */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm backdrop-blur-xl transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                <Globe className="w-3.5 h-3.5" />
                RFC 3492 / RFC 5891
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                Homograph Phishing Defense
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Unicode &amp; Punycode (IDN) Converter
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Bidirectionally encode Internationalized Domain Names (IDNs) with Arabic, Cyrillic, umlauts, or emojis into ASCII Compatible Encoding (<code className="font-mono text-xs text-indigo-600 dark:text-indigo-400">xn--</code>) and vice-versa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="IDN Punycode"
              status="RFC 3492"
              buttonVariant="compact"
            />
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 rounded-xl transition-colors"
              title="Reset to default example"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Quick Example Chips */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Real-World IDN Examples</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.name}
                onClick={() => {
                  setActiveTab("single");
                  setSingleInput(ex.unicode);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5",
                  ex.isAttack
                    ? "bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                    : "bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 border-slate-200 dark:border-slate-700/80"
                )}
                title={ex.description}
              >
                {ex.isAttack ? (
                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                ) : (
                  <Globe className="w-3 h-3 text-indigo-500" />
                )}
                <span>{ex.name}</span>
                <span className="font-mono text-[10px] opacity-75">({ex.unicode})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("single")}
          className={cn(
            "py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
            activeTab === "single"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          Single Domain &amp; URL Inspector
        </button>
        <button
          onClick={() => setActiveTab("batch")}
          className={cn(
            "py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
            activeTab === "batch"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          Batch List Converter ({batchResults.length} domains)
        </button>
      </div>

      {/* SINGLE CONVERTER MODE */}
      {activeTab === "single" && (
        <div className="space-y-6">
          {/* Dual Input/Output Conversion Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Box A: Unicode Native Script */}
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-indigo-500" />
                    Unicode Native Representation (UTF-8)
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Human Readable
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={singleInput}
                    onChange={(e) => setSingleInput(e.target.value)}
                    placeholder="e.g. münchen.de, دبي.امارات, or https://example.com"
                    className="w-full px-4 py-3 text-sm font-mono rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {singleAnalysis.unicode ? (
                    <span>
                      Length: <strong>{singleAnalysis.unicode.length}</strong> characters
                    </span>
                  ) : (
                    <span>Enter domain above</span>
                  )}
                </div>

                <button
                  onClick={handleCopyUnicode}
                  disabled={!singleAnalysis.unicode}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm",
                    copiedUnicode
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  )}
                >
                  {copiedUnicode ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Unicode
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Box B: ASCII Compatible Encoding (Punycode xn--) */}
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-500" />
                    ASCII Compatible Encoding (Punycode / ACE)
                  </label>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                    xn-- format (DNS Safe)
                  </span>
                </div>

                <div className="relative">
                  <div className="w-full p-3.5 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm break-all border border-slate-800 shadow-inner select-all min-h-[82px] flex items-center">
                    {singleAnalysis.ascii || (
                      <span className="text-slate-500 italic">Punycode will generate here...</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {singleAnalysis.ascii ? (
                    <span>
                      DNS Byte Size: <strong>{singleAnalysis.dns.totalFqdnBytes}</strong> / 253 octets
                    </span>
                  ) : (
                    <span>RFC 3492 compliant</span>
                  )}
                </div>

                <button
                  onClick={handleCopyAscii}
                  disabled={!singleAnalysis.ascii}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm",
                    copiedAscii
                      ? "bg-emerald-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"
                  )}
                >
                  {copiedAscii ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy ASCII Punycode
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Security & DNS Compliance Diagnostic Card */}
          {singleInput.trim() && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Homograph Phishing & Script Security Analyzer (7 Cols) */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    {singleAnalysis.security.riskLevel === "danger" ? (
                      <ShieldAlert className="w-5 h-5 text-rose-500" />
                    ) : singleAnalysis.security.riskLevel === "warning" ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Homograph Spoofing &amp; Script Security
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Detects mixed-alphabet characters commonly used in IDN phishing scams.
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1",
                      singleAnalysis.security.riskLevel === "danger"
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                        : singleAnalysis.security.riskLevel === "warning"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                    )}
                  >
                    {singleAnalysis.security.riskLevel === "danger" && <AlertTriangle className="w-3.5 h-3.5" />}
                    {singleAnalysis.security.riskLevel === "warning" && <AlertTriangle className="w-3.5 h-3.5" />}
                    {singleAnalysis.security.riskLevel === "safe" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {singleAnalysis.security.riskTitle}
                  </span>
                </div>

                {/* Risk Description Box */}
                <div
                  className={cn(
                    "p-3.5 rounded-2xl border text-xs space-y-1.5",
                    singleAnalysis.security.riskLevel === "danger"
                      ? "bg-rose-50/80 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 text-rose-900 dark:text-rose-200"
                      : singleAnalysis.security.riskLevel === "warning"
                      ? "bg-amber-50/80 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/60 text-amber-900 dark:text-amber-200"
                      : "bg-emerald-50/80 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200"
                  )}
                >
                  <div className="font-semibold flex items-center gap-1.5">
                    {singleAnalysis.security.riskDescription}
                  </div>
                  {singleAnalysis.security.hasConfusables && (
                    <div className="text-[11px] opacity-90">
                      ⚠️ Contains <strong>{singleAnalysis.security.confusableCount}</strong> confusable look-alike character(s) that resemble common Latin letters.
                    </div>
                  )}
                </div>

                {/* Detected Script Badges */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Detected Script Alphabets in Hostname:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {singleAnalysis.security.detectedScripts.map((script) => (
                      <span
                        key={script}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {script}
                      </span>
                    ))}
                    {singleAnalysis.security.detectedScripts.length === 0 && (
                      <span className="text-xs text-slate-400">Standard ASCII / Latin only</span>
                    )}
                  </div>
                </div>

                {/* Character Matrix Toggle Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowCharMatrix(!showCharMatrix)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
                  >
                    <span>Inspect Character-by-Character Unicode Code Points</span>
                    {showCharMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Expandable Character Table */}
                  {showCharMatrix && (
                    <div className="mt-3 max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700/80 rounded-2xl">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 text-slate-700 dark:text-slate-300 font-semibold">
                          <tr>
                            <th className="p-2.5">Glyph</th>
                            <th className="p-2.5">Code Point</th>
                            <th className="p-2.5">Script</th>
                            <th className="p-2.5">Confusable Note</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                          {singleAnalysis.security.characters.map((c, cIdx) => (
                            <tr
                              key={cIdx}
                              className={cn(
                                c.isConfusable
                                  ? "bg-rose-50/50 dark:bg-rose-950/30"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                              )}
                            >
                              <td className="p-2.5 font-bold font-mono text-sm">{c.char}</td>
                              <td className="p-2.5 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                                {c.hex}
                              </td>
                              <td className="p-2.5">
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">
                                  {c.script}
                                </span>
                              </td>
                              <td className="p-2.5 text-[11px]">
                                {c.confusableNote ? (
                                  <span className="text-rose-600 dark:text-rose-400 font-medium">
                                    ⚠️ {c.confusableNote}
                                  </span>
                                ) : (
                                  <span className="text-slate-400">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* DNS RFC Octet & Component Diagnostics (5 Cols) */}
              <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-purple-500" />
                    DNS RFC 1035 Octet Validator
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Calculates physical byte length constraints for root DNS registration.
                  </p>
                </div>

                {/* Total FQDN Gauge */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Total Fully Qualified Domain (FQDN):</span>
                    <span
                      className={cn(
                        "font-bold",
                        singleAnalysis.dns.isFqdnLengthValid
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {singleAnalysis.dns.totalFqdnBytes} / {singleAnalysis.dns.maxFqdnBytes} bytes
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-300",
                        singleAnalysis.dns.totalFqdnBytes > 253
                          ? "bg-rose-500"
                          : singleAnalysis.dns.totalFqdnBytes > 200
                          ? "bg-amber-500"
                          : "bg-indigo-500"
                      )}
                      style={{
                        width: `${Math.min(100, (singleAnalysis.dns.totalFqdnBytes / 253) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Per-Label Breakdown */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Per-Label Byte Check (Max 63 bytes/label):
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {singleAnalysis.dns.labels.map((lbl, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2",
                          lbl.isValid
                            ? "bg-slate-50/70 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/80"
                            : "bg-rose-50 border-rose-300 dark:bg-rose-950/40 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                        )}
                      >
                        <div className="truncate flex-1 font-mono">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {lbl.label}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1.5">
                            ({lbl.asciiLabel})
                          </span>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5 text-[11px]">
                          <span className="font-bold">{lbl.byteLength} B</span>
                          {lbl.isValid ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* URL Component Breakdown Pills */}
                {singleAnalysis.parsed.isUrl && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Parsed URL Components:
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                      {singleAnalysis.parsed.protocol && (
                        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                          {singleAnalysis.parsed.protocol}
                        </span>
                      )}
                      {singleAnalysis.parsed.pathname && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {singleAnalysis.parsed.pathname}
                        </span>
                      )}
                      {singleAnalysis.parsed.search && (
                        <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300">
                          {singleAnalysis.parsed.search}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* BATCH CONVERTER MODE */}
      {activeTab === "batch" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  Bulk IDN &amp; Punycode Processor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Paste up to 50 domains, URLs, or emails (one per line) for instantaneous bulk conversion.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyAllAscii}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1.5"
                >
                  {copiedBatch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy All ASCII
                </button>
                <button
                  onClick={handleCopyAllUnicode}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy All Unicode
                </button>
                <button
                  onClick={handleExportCsv}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Batch Input Textarea */}
            <textarea
              rows={6}
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              placeholder="Paste list of domains here..."
              className="w-full px-4 py-3 text-xs font-mono rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
            />

            {/* Batch Results Table */}
            <div className="border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Unicode Native (UTF-8)</th>
                    <th className="p-3">ASCII Punycode (ACE)</th>
                    <th className="p-3">Scripts</th>
                    <th className="p-3">Security &amp; DNS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                  {batchResults.map((item) => (
                    <tr
                      key={item.id}
                      className={cn(
                        item.security.riskLevel === "danger"
                          ? "bg-rose-50/40 dark:bg-rose-950/20"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/30"
                      )}
                    >
                      <td className="p-3 font-sans text-slate-400">{item.id}</td>
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">
                        {item.unicode}
                      </td>
                      <td className="p-3 text-indigo-600 dark:text-indigo-400 font-bold">
                        {item.ascii}
                      </td>
                      <td className="p-3 font-sans">
                        <div className="flex flex-wrap gap-1">
                          {item.security.detectedScripts.map((s) => (
                            <span
                              key={s}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 font-sans">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-[10px] font-bold",
                              item.security.riskLevel === "danger"
                                ? "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300"
                                : item.security.riskLevel === "warning"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300"
                                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300"
                            )}
                          >
                            {item.security.riskLevel === "danger"
                              ? "Spoof Risk"
                              : item.security.riskLevel === "warning"
                              ? "Mixed Script"
                              : "Safe"}
                          </span>
                          {item.dns.isValid ? (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                              DNS OK
                            </span>
                          ) : (
                            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                              DNS Error
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {batchResults.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400 font-sans">
                        No domains entered. Paste domains into the box above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
