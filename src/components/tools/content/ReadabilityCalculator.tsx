"use client";

import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Sparkles,
  RotateCcw,
  Clock,
  Mic,
  FileText,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Copy,
  CheckCheck,
  TrendingUp,
  Layers,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SamplePreset {
  name: string;
  badge: string;
  text: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    name: "Standard Web Copy",
    badge: "Ideal for SEO",
    text: `Search engine optimization (SEO) helps your website rank higher on Google search results. When you optimize your web pages, more prospective customers discover your products. Good SEO requires high-quality content, fast page speed, and helpful answers to user queries. Focus on clear language and easy-to-read sentences to keep visitors engaged on your site.`,
  },
  {
    name: "Technical Documentation",
    badge: "Advanced Grade",
    text: `The asynchronous ingestion architecture utilizes distributed message queues to decouple computational bottlenecks from synchronous HTTP request pipelines. Microservices scale horizontally through container orchestration clusters, maintaining idempotent state transformations across replicated transactional databases.`,
  },
  {
    name: "High-Converting Landing Page",
    badge: "Conversational",
    text: `Grow your revenue with automated email sequences. Build high-converting sales funnels in minutes without writing a single line of code. Join over ten thousand modern founders who save time and close more deals every day. Start your free trial now.`,
  },
];

// Helper to count syllables in a single word
function countWordSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return 0;
  if (clean.length <= 3) return 1;

  // Replace common endings
  const formatted = clean
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");

  const matches = formatted.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

export function ReadabilityCalculator() {
  const [text, setText] = useState(SAMPLE_PRESETS[0].text);
  const [copied, setCopied] = useState(false);

  // Text analysis metrics
  const metrics = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        wordCount: 0,
        sentenceCount: 0,
        syllableCount: 0,
        characterCount: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        fleschEase: 0,
        fleschGrade: 0,
        avgWordsPerSentence: 0,
        avgSyllablesPerWord: 0,
        complexWordsCount: 0,
      };
    }

    // Split words
    const words = trimmed.match(/[\w'-]+/g) || [];
    const wordCount = words.length;

    // Split sentences
    const sentences = trimmed
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const sentenceCount = Math.max(1, sentences.length);

    // Syllables
    let totalSyllables = 0;
    let complexWordsCount = 0;

    words.forEach((w) => {
      const syl = countWordSyllables(w);
      totalSyllables += syl;
      if (syl >= 3) complexWordsCount++;
    });

    const characterCount = trimmed.length;
    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 0;

    // Flesch Reading Ease: 206.835 - (1.015 * ASL) - (84.6 * ASW)
    let fleschEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
    fleschEase = Math.max(0, Math.min(100, Math.round(fleschEase * 10) / 10));

    // Flesch-Kincaid Grade Level: (0.39 * ASL) + (11.8 * ASW) - 15.59
    let fleschGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
    fleschGrade = Math.max(0, Math.round(fleschGrade * 10) / 10);

    const readingTimeMin = Math.ceil(wordCount / 200); // 200 WPM
    const speakingTimeMin = Math.ceil(wordCount / 130); // 130 WPM

    return {
      wordCount,
      sentenceCount,
      syllableCount: totalSyllables,
      characterCount,
      readingTimeMin,
      speakingTimeMin,
      fleschEase,
      fleschGrade,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 10) / 10,
      complexWordsCount,
    };
  }, [text]);

  const easeBand = useMemo(() => {
    const score = metrics.fleschEase;
    if (score >= 90) return { label: "Very Easy", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30", target: "5th Grade Level" };
    if (score >= 80) return { label: "Easy", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30", target: "6th Grade Level" };
    if (score >= 70) return { label: "Fairly Easy", color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-950/40 border-teal-500/30", target: "7th Grade Level" };
    if (score >= 60) return { label: "Standard / Ideal SEO", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500/30", target: "8th–9th Grade (Best for Web)" };
    if (score >= 50) return { label: "Fairly Difficult", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-500/30", target: "10th–12th Grade (High School)" };
    if (score >= 30) return { label: "Difficult", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/40 border-orange-500/30", target: "College Level" };
    return { label: "Very Confusing", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-500/30", target: "Academic / Post-Graduate" };
  }, [metrics.fleschEase]);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Sample Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Samples:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setText(p.text)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setText("")}
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear Text
        </button>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Text Input */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-500" />
                Content Editor
              </h2>
              <button
                onClick={copyText}
                className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                {copied ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your article, landing page copy, or email draft here to analyze reading ease in real time..."
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed"
            />

            {/* Live Counter Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Words</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {metrics.wordCount}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Sentences</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {metrics.sentenceCount}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Reading Time</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  ~{metrics.readingTimeMin} min
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Characters</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  {metrics.characterCount}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Readability Diagnostics */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Ease Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-500" />
                Readability Scores
              </h3>
              <span className="text-[11px] font-mono text-slate-400">0–100 Scale</span>
            </div>

            {/* Score Highlight Card */}
            <div className={cn("p-5 rounded-2xl border text-center space-y-2", easeBand.bg)}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                Flesch Reading Ease
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
                {metrics.fleschEase}
              </div>
              <div className={cn("text-sm font-bold", easeBand.color)}>
                {easeBand.label} ({easeBand.target})
              </div>
            </div>

            {/* Grade Level Gauge */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Flesch-Kincaid Grade Level
                </span>
                <span className="text-[11px] text-slate-500">
                  Equivalent to US school grade
                </span>
              </div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                Grade {metrics.fleschGrade}
              </div>
            </div>

            {/* Sub-Metrics Breakdown */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Sentence Complexity
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-slate-600 dark:text-slate-400">Avg Words / Sentence</span>
                  <span className={cn("font-bold font-mono", metrics.avgWordsPerSentence > 20 ? "text-amber-500" : "text-emerald-500")}>
                    {metrics.avgWordsPerSentence} (Target: 14–18)
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-slate-600 dark:text-slate-400">Avg Syllables / Word</span>
                  <span className={cn("font-bold font-mono", metrics.avgSyllablesPerWord > 1.8 ? "text-amber-500" : "text-emerald-500")}>
                    {metrics.avgSyllablesPerWord} (Target: 1.3–1.6)
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-slate-600 dark:text-slate-400">Complex Words (3+ syl)</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {metrics.complexWordsCount} ({metrics.wordCount > 0 ? Math.round((metrics.complexWordsCount / metrics.wordCount) * 100) : 0}%)
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Actionable Recommendations */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              SEO Copywriting Recommendations
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>Aim for a Flesch Reading Ease score between <strong>60 and 70</strong> for consumer SEO articles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>Break sentences longer than 20 words into two concise thoughts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span>Replace jargon with active verbs to lower your Flesch-Kincaid grade level to 8th grade.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
