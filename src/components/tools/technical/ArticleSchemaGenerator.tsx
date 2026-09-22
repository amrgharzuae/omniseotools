"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  FileText,
  Sparkles,
  Check,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Layers,
  Globe,
  Calendar,
  User,
  Building2,
  Image as ImageIcon,
  Share2,
  Code2,
  Eye,
  Terminal,
  Newspaper,
  BookOpen,
  ArrowRight,
  Info,
  Clock,
  Briefcase,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface ArticleSchemaGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

type ArticleSubtype = "BlogPosting" | "Article" | "NewsArticle";
type AuthorType = "Person" | "Organization";
type ActiveTab = "jsonld" | "nextjs" | "visual";

interface ArticleFormState {
  subtype: ArticleSubtype;
  headline: string;
  url: string;
  description: string;
  articleSection: string;
  inLanguage: string;
  // Images
  useMultiAspectImages: boolean;
  primaryImage: string;
  image16x9: string;
  image4x3: string;
  image1x1: string;
  // Dates
  datePublished: string;
  dateModified: string;
  // Author
  authorType: AuthorType;
  authorName: string;
  authorUrl: string;
  authorJobTitle: string;
  // Publisher
  publisherName: string;
  publisherUrl: string;
  publisherLogo: string;
}

const SECTION_SUGGESTIONS = [
  "Technology",
  "Engineering",
  "SEO & Marketing",
  "Web Development",
  "Artificial Intelligence",
  "Business & Growth",
  "Design",
  "Tutorials",
  "News",
];

const PRESET_TECH_BLOG: ArticleFormState = {
  subtype: "BlogPosting",
  headline: "Mastering Next.js 15 App Router & Server Actions in Production",
  url: "https://example.com/blog/nextjs-15-app-router-guide",
  description:
    "An in-depth architectural breakdown of Next.js 15 App Router, React 19 compiler optimizations, caching mechanics, and zero-latency server actions.",
  articleSection: "Web Development",
  inLanguage: "en-US",
  useMultiAspectImages: true,
  primaryImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&q=80",
  image16x9: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop&q=80",
  image4x3: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop&q=80",
  image1x1: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=1200&fit=crop&q=80",
  datePublished: "2026-09-22T08:00:00+00:00",
  dateModified: "2026-09-22T10:30:00+00:00",
  authorType: "Person",
  authorName: "Alex Mercer",
  authorUrl: "https://example.com/authors/alex-mercer",
  authorJobTitle: "Principal Frontend Architect",
  publisherName: "DevTech Insights",
  publisherUrl: "https://example.com",
  publisherLogo: "https://example.com/assets/logo.png",
};

const PRESET_NEWS_ARTICLE: ArticleFormState = {
  subtype: "NewsArticle",
  headline: "Global Tech Summit 2026 Announces Unified Open Standards for AI Safety",
  url: "https://example.com/news/global-tech-summit-2026-ai-standards",
  description:
    "International regulatory bodies and leading technology firms have ratified a breakthrough interoperability and safety framework at the 2026 Global Tech Summit.",
  articleSection: "Technology",
  inLanguage: "en-US",
  useMultiAspectImages: true,
  primaryImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=675&fit=crop&q=80",
  image16x9: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=675&fit=crop&q=80",
  image4x3: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=900&fit=crop&q=80",
  image1x1: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=1200&fit=crop&q=80",
  datePublished: "2026-09-22T06:15:00+00:00",
  dateModified: "2026-09-22T07:45:00+00:00",
  authorType: "Person",
  authorName: "Sarah Jenkins",
  authorUrl: "https://example.com/journalists/sarah-jenkins",
  authorJobTitle: "Senior Tech Policy Correspondent",
  publisherName: "Global Tech Wire",
  publisherUrl: "https://example.com",
  publisherLogo: "https://example.com/assets/news-logo.png",
};

const PRESET_COMPANY_ANNOUNCEMENT: ArticleFormState = {
  subtype: "Article",
  headline: "OmniCorp Reaches 100% Carbon-Neutral Cloud Operations Ahead of Schedule",
  url: "https://example.com/press/carbon-neutral-cloud-milestone",
  description:
    "OmniCorp announces the complete transition of its global data center and edge infrastructure to renewable energy sources, reaching sustainability targets two years early.",
  articleSection: "Corporate News",
  inLanguage: "en-US",
  useMultiAspectImages: false,
  primaryImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop&q=80",
  image16x9: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=675&fit=crop&q=80",
  image4x3: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop&q=80",
  image1x1: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=1200&fit=crop&q=80",
  datePublished: "2026-09-22T09:00:00+00:00",
  dateModified: "2026-09-22T09:00:00+00:00",
  authorType: "Organization",
  authorName: "OmniCorp Corporate Communications",
  authorUrl: "https://example.com/press",
  authorJobTitle: "",
  publisherName: "OmniCorp Global",
  publisherUrl: "https://example.com",
  publisherLogo: "https://example.com/assets/omnicorp-logo.png",
};

function getTodayIsoString(): string {
  const d = new Date();
  return d.toISOString().split(".")[0] + "+00:00";
}

export function ArticleSchemaGenerator({
  toolSlug = "article-schema-generator",
  toolName = "Article & BlogPosting Schema Generator",
}: ArticleSchemaGeneratorProps) {
  const [formState, setFormState] = useState<ArticleFormState>(PRESET_TECH_BLOG);
  const [activeTab, setActiveTab] = useState<ActiveTab>("jsonld");
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("tech-blog");

  // Handle field change
  const handleChange = (field: keyof ArticleFormState, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setActivePreset("custom");
  };

  // Preset handlers
  const handleApplyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    if (presetKey === "tech-blog") setFormState(PRESET_TECH_BLOG);
    if (presetKey === "news") setFormState(PRESET_NEWS_ARTICLE);
    if (presetKey === "announcement") setFormState(PRESET_COMPANY_ANNOUNCEMENT);
  };

  const handleReset = () => {
    const today = getTodayIsoString();
    setFormState({
      subtype: "BlogPosting",
      headline: "",
      url: "https://example.com/blog/my-post",
      description: "",
      articleSection: "Technology",
      inLanguage: "en-US",
      useMultiAspectImages: false,
      primaryImage: "",
      image16x9: "",
      image4x3: "",
      image1x1: "",
      datePublished: today,
      dateModified: today,
      authorType: "Person",
      authorName: "",
      authorUrl: "",
      authorJobTitle: "",
      publisherName: "",
      publisherUrl: "",
      publisherLogo: "",
    });
    setActivePreset("custom");
  };

  // Date helpers
  const handleSetPublishedToNow = () => {
    const now = getTodayIsoString();
    setFormState((prev) => ({ ...prev, datePublished: now, dateModified: now }));
  };

  const handleSyncModifiedWithPublished = () => {
    setFormState((prev) => ({ ...prev, dateModified: prev.datePublished }));
  };

  // Image helpers
  const handleAutoFillImagesFromPrimary = () => {
    if (!formState.primaryImage) return;
    const cleanUrl = formState.primaryImage.split("?")[0];
    setFormState((prev) => ({
      ...prev,
      image16x9: `${cleanUrl}?w=1200&h=675&fit=crop&q=80`,
      image4x3: `${cleanUrl}?w=1200&h=900&fit=crop&q=80`,
      image1x1: `${cleanUrl}?w=1200&h=1200&fit=crop&q=80`,
    }));
  };

  // Construct JSON-LD Object
  const schemaObject = useMemo(() => {
    const s = formState;

    // Image resolution
    let imageValue: string | string[] = s.primaryImage || "https://example.com/image.jpg";
    if (s.useMultiAspectImages) {
      const images: string[] = [];
      if (s.image16x9) images.push(s.image16x9);
      if (s.image4x3) images.push(s.image4x3);
      if (s.image1x1) images.push(s.image1x1);
      if (images.length > 0) {
        imageValue = images.length === 1 ? images[0] : images;
      } else if (s.primaryImage) {
        imageValue = s.primaryImage;
      }
    }

    // Author construction
    const authorObj: Record<string, any> = {
      "@type": s.authorType,
      name: s.authorName || "Author Name",
    };
    if (s.authorUrl) {
      authorObj.url = s.authorUrl;
    }
    if (s.authorType === "Person" && s.authorJobTitle) {
      authorObj.jobTitle = s.authorJobTitle;
    }

    // Publisher construction
    const publisherObj: Record<string, any> = {
      "@type": "Organization",
      name: s.publisherName || "Publisher Name",
    };
    if (s.publisherUrl) {
      publisherObj.url = s.publisherUrl;
    }
    if (s.publisherLogo) {
      publisherObj.logo = {
        "@type": "ImageObject",
        url: s.publisherLogo,
      };
    }

    // Base Article Schema
    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": s.subtype,
      headline: s.headline || "Article Headline",
      image: imageValue,
      datePublished: s.datePublished || getTodayIsoString(),
      dateModified: s.dateModified || s.datePublished || getTodayIsoString(),
      author: [authorObj],
      publisher: publisherObj,
      description: s.description || "Article summary and overview.",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": s.url || "https://example.com/article",
      },
    };

    if (s.articleSection) {
      schema.articleSection = s.articleSection;
    }
    if (s.inLanguage) {
      schema.inLanguage = s.inLanguage;
    }

    return schema;
  }, [formState]);

  // Formatted Code Strings
  const jsonLdString = useMemo(() => {
    return JSON.stringify(schemaObject, null, 2);
  }, [schemaObject]);

  const rawHtmlScriptTag = useMemo(() => {
    return `<!-- Article Structured Data (JSON-LD) -->\n<script type="application/ld+json">\n${jsonLdString}\n</script>`;
  }, [jsonLdString]);

  const nextJsTypeScriptSnippet = useMemo(() => {
    return `// app/blog/[slug]/page.tsx (Next.js App Router)
import type { Metadata } from "next";

const articleSchema = ${jsonLdString};

export default function ArticlePage() {
  return (
    <>
      {/* Injected Schema.org Structured Data */}
      <script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article>
          <h1 className="text-3xl font-bold">${formState.headline || "Article Headline"}</h1>
          <p className="text-slate-600">${formState.description || "Article excerpt..."}</p>
        </article>
      </main>
    </>
  );
}`;
  }, [jsonLdString, formState.headline, formState.description]);

  // Real-Time Validation Diagnostics & Score
  const validationDiagnostics = useMemo(() => {
    const s = formState;
    const items: Array<{ id: string; label: string; valid: boolean; severity: "error" | "warning" | "success"; tip: string }> = [];

    // 1. Headline
    const headlineLen = s.headline.trim().length;
    if (headlineLen === 0) {
      items.push({
        id: "headline",
        label: "Headline is required",
        valid: false,
        severity: "error",
        tip: "Add a descriptive headline (recommended 40–110 characters).",
      });
    } else if (headlineLen < 20) {
      items.push({
        id: "headline",
        label: "Headline is very short",
        valid: false,
        severity: "warning",
        tip: "Longer headlines (40+ chars) give Google better context for indexing.",
      });
    } else if (headlineLen > 110) {
      items.push({
        id: "headline",
        label: `Headline is ${headlineLen} chars (over 110 char limit)`,
        valid: false,
        severity: "warning",
        tip: "Google may truncate headlines longer than 110 characters in mobile SERPs.",
      });
    } else {
      items.push({
        id: "headline",
        label: `Optimal Headline Length (${headlineLen} chars)`,
        valid: true,
        severity: "success",
        tip: "Headline is clear and well-proportioned for Google SERP cards.",
      });
    }

    // 2. Canonical URL
    const hasValidUrl = s.url.startsWith("http://") || s.url.startsWith("https://");
    if (!s.url.trim() || !hasValidUrl) {
      items.push({
        id: "url",
        label: "Valid Canonical URL required",
        valid: false,
        severity: "error",
        tip: "Provide an absolute HTTPS URL for mainEntityOfPage.",
      });
    } else {
      items.push({
        id: "url",
        label: "Valid Canonical URL declared",
        valid: true,
        severity: "success",
        tip: "Canonical target properly binds structured data to the web page.",
      });
    }

    // 3. Image
    const hasImage = s.useMultiAspectImages
      ? !!(s.image16x9 || s.image4x3 || s.image1x1)
      : !!s.primaryImage.trim();
    if (!hasImage) {
      items.push({
        id: "image",
        label: "Missing Image URL (Required for Discover & Carousels)",
        valid: false,
        severity: "error",
        tip: "Google requires an image URL with minimum 1200px width for rich results.",
      });
    } else if (s.useMultiAspectImages && (!s.image16x9 || !s.image4x3 || !s.image1x1)) {
      items.push({
        id: "image",
        label: "Incomplete multi-aspect images",
        valid: false,
        severity: "warning",
        tip: "Provide all 3 ratios (16:9, 4:3, 1:1) to fulfill Google's ideal recommendation.",
      });
    } else {
      items.push({
        id: "image",
        label: s.useMultiAspectImages ? "16:9, 4:3 & 1:1 Images Configured" : "Primary Image URL Configured",
        valid: true,
        severity: "success",
        tip: "High-resolution imagery qualifies article for Google Discover large cards.",
      });
    }

    // 4. Dates
    if (!s.datePublished.trim()) {
      items.push({
        id: "datePublished",
        label: "Date Published is required",
        valid: false,
        severity: "error",
        tip: "Declare ISO 8601 date (e.g. 2026-09-22T08:00:00+00:00).",
      });
    } else {
      items.push({
        id: "datePublished",
        label: "Date Published declared in ISO 8601",
        valid: true,
        severity: "success",
        tip: "Allows Google to calculate freshness and display bylines.",
      });
    }

    // 5. Author
    if (!s.authorName.trim()) {
      items.push({
        id: "author",
        label: "Author Name is required",
        valid: false,
        severity: "error",
        tip: "Specify author name for transparent E-E-A-T attribution.",
      });
    } else if (!s.authorUrl.trim()) {
      items.push({
        id: "author",
        label: "Author Profile URL recommended (E-E-A-T)",
        valid: false,
        severity: "warning",
        tip: "Linking author to a bio page or social profile validates author expertise.",
      });
    } else {
      items.push({
        id: "author",
        label: `Author (${s.authorType}) with Verified Profile Link`,
        valid: true,
        severity: "success",
        tip: "Strong E-E-A-T signal for Google helpful content algorithms.",
      });
    }

    // 6. Publisher & Logo
    if (!s.publisherName.trim()) {
      items.push({
        id: "publisher",
        label: "Publisher Name is required",
        valid: false,
        severity: "error",
        tip: "Declare the hosting organization or brand name.",
      });
    } else if (!s.publisherLogo.trim()) {
      items.push({
        id: "publisher",
        label: "Publisher Logo URL recommended",
        valid: false,
        severity: "warning",
        tip: "A publisher logo is required for Google Top Stories and AMP carousel display.",
      });
    } else {
      items.push({
        id: "publisher",
        label: "Publisher Entity with Logo Configured",
        valid: true,
        severity: "success",
        tip: "Meets Google Search Central publisher entity requirements.",
      });
    }

    // Score calculation
    let score = 0;
    const errors = items.filter((i) => i.severity === "error");
    const warnings = items.filter((i) => i.severity === "warning");

    if (errors.length === 0) {
      score = 70;
      if (warnings.length === 0) {
        score = 100;
      } else if (warnings.length === 1) {
        score = 85;
      } else {
        score = 75;
      }
    } else if (errors.length === 1) {
      score = 45;
    } else {
      score = 25;
    }

    return { items, score, errorCount: errors.length, warningCount: warnings.length };
  }, [formState]);

  // Copy to clipboard
  const handleCopy = useCallback(() => {
    let textToCopy = "";
    if (activeTab === "jsonld") {
      textToCopy = rawHtmlScriptTag;
    } else if (activeTab === "nextjs") {
      textToCopy = nextJsTypeScriptSnippet;
    } else {
      textToCopy = jsonLdString;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [activeTab, rawHtmlScriptTag, nextJsTypeScriptSnippet, jsonLdString]);

  // Download JSON
  const handleDownload = () => {
    const blob = new Blob([jsonLdString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `article-schema-${formState.subtype.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Google Test URL
  const googleTestUrl = "https://search.google.com/test/rich-results";
  const schemaOrgTestUrl = "https://validator.schema.org/";

  return (
    <div className="space-y-6">
      {/* 1. Presets Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Quick-Start Presets:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleApplyPreset("tech-blog")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm",
              activePreset === "tech-blog"
                ? "bg-emerald-600 text-white shadow-emerald-500/25"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Tech Blog Post</span>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset("news")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm",
              activePreset === "news"
                ? "bg-indigo-600 text-white shadow-indigo-500/25"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Newspaper className="h-3.5 w-3.5" />
            <span>News Publication</span>
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset("announcement")}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm",
              activePreset === "announcement"
                ? "bg-purple-600 text-white shadow-purple-500/25"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Company Announcement</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset Form to Defaults"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Interactive Tool Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Inputs) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Subtype Selector */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-emerald-500" />
                <span>1. Schema Article Subtype</span>
              </label>
              <span className="text-[11px] text-slate-500">Schema.org @type</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "BlogPosting", label: "BlogPosting", desc: "Tutorials, essays & blogs" },
                  { id: "Article", label: "Article", desc: "General publications & guides" },
                  { id: "NewsArticle", label: "NewsArticle", desc: "Journalism & top stories" },
                ] as const
              ).map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleChange("subtype", type.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all",
                    formState.subtype === type.id
                      ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <span className="text-xs font-bold">{type.label}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{type.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card: Core Article Details */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-indigo-500" />
                <span>2. Article Metadata & Content</span>
              </label>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Google Required Properties
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="headline" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Headline</span>
                  <span className="text-rose-500">*</span>
                </label>
                <span
                  className={cn(
                    "text-[11px] font-mono",
                    formState.headline.length > 110
                      ? "text-amber-500 font-bold"
                      : formState.headline.length >= 40
                      ? "text-emerald-500"
                      : "text-slate-400"
                  )}
                >
                  {formState.headline.length} / 110 optimal chars
                </span>
              </div>
              <input
                id="headline"
                type="text"
                value={formState.headline}
                onChange={(e) => handleChange("headline", e.target.value)}
                placeholder="e.g., Mastering Next.js 15 App Router & Server Actions in Production"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
              />
            </div>

            {/* Canonical URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="article-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Canonical URL (mainEntityOfPage)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Must include https://</span>
              </div>
              <input
                id="article-url"
                type="url"
                value={formState.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://example.com/blog/my-article-slug"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
              />
            </div>

            {/* Summary / Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Description / Excerpt Summary
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {formState.description.length} chars
                </span>
              </div>
              <textarea
                id="description"
                rows={3}
                value={formState.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="A concise summary of the article key takeaways and findings..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Section & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="article-section" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Article Section / Category
                </label>
                <input
                  id="article-section"
                  type="text"
                  value={formState.articleSection}
                  onChange={(e) => handleChange("articleSection", e.target.value)}
                  placeholder="e.g. Technology, SEO, Guides"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="in-language" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Language Tag (ISO 639-1)
                </label>
                <input
                  id="in-language"
                  type="text"
                  value={formState.inLanguage}
                  onChange={(e) => handleChange("inLanguage", e.target.value)}
                  placeholder="en-US, ar, es, fr"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Quick Section Chips */}
            <div className="pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Suggested Sections:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SECTION_SUGGESTIONS.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => handleChange("articleSection", sec)}
                    className="px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                  >
                    + {sec}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Card: Images & Aspect Ratios */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-teal-500" />
                <span>3. Article Visuals & Aspect Ratios</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Multi-Aspect (16:9, 4:3, 1:1)</span>
                <button
                  type="button"
                  onClick={() => handleChange("useMultiAspectImages", !formState.useMultiAspectImages)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    formState.useMultiAspectImages ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                  )}
                  role="switch"
                  aria-checked={formState.useMultiAspectImages}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      formState.useMultiAspectImages ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>

            {!formState.useMultiAspectImages ? (
              <div className="space-y-1.5">
                <label htmlFor="primary-image" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Primary Article Image URL</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="primary-image"
                  type="url"
                  value={formState.primaryImage}
                  onChange={(e) => handleChange("primaryImage", e.target.value)}
                  placeholder="https://example.com/images/hero-1200x675.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono"
                />
                <p className="text-[11px] text-slate-500">
                  Google recommendation: Minimum 1200px width with 50,000+ total pixels for Google Discover eligibility.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Google Recommended Multi-Aspect Suite:
                  </span>
                  <button
                    type="button"
                    onClick={handleAutoFillImagesFromPrimary}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    Auto-fill from Primary Image
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <span className="font-bold text-emerald-600">16:9 Banner</span> (1200x675 / 1920x1080)
                    </label>
                    <input
                      type="url"
                      value={formState.image16x9}
                      onChange={(e) => handleChange("image16x9", e.target.value)}
                      placeholder="https://example.com/photos/16x9/photo.jpg"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <span className="font-bold text-indigo-600">4:3 Card</span> (1200x900)
                    </label>
                    <input
                      type="url"
                      value={formState.image4x3}
                      onChange={(e) => handleChange("image4x3", e.target.value)}
                      placeholder="https://example.com/photos/4x3/photo.jpg"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <span className="font-bold text-purple-600">1:1 Square</span> (1200x1200)
                    </label>
                    <input
                      type="url"
                      value={formState.image1x1}
                      onChange={(e) => handleChange("image1x1", e.target.value)}
                      placeholder="https://example.com/photos/1x1/photo.jpg"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card: ISO 8601 Dates */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-500" />
                <span>4. Publication & Modification Dates</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSetPublishedToNow}
                  className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  ⚡ Set to Today
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="date-published" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>datePublished (ISO 8601)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="date-published"
                  type="text"
                  value={formState.datePublished}
                  onChange={(e) => handleChange("datePublished", e.target.value)}
                  placeholder="2026-09-22T08:00:00+00:00"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="date-modified" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    dateModified (ISO 8601)
                  </label>
                  <button
                    type="button"
                    onClick={handleSyncModifiedWithPublished}
                    className="text-[10px] text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    Sync with Published
                  </button>
                </div>
                <input
                  id="date-modified"
                  type="text"
                  value={formState.dateModified}
                  onChange={(e) => handleChange("dateModified", e.target.value)}
                  placeholder="2026-09-22T10:30:00+00:00"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Card: Author E-E-A-T Entity */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <User className="h-4 w-4 text-blue-500" />
                <span>5. Author Entity (E-E-A-T Signals)</span>
              </label>
              
              {/* Person vs Organization Toggle */}
              <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleChange("authorType", "Person")}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-semibold transition-colors",
                    formState.authorType === "Person"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  )}
                >
                  Person
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("authorType", "Organization")}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-semibold transition-colors",
                    formState.authorType === "Organization"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  )}
                >
                  Organization
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="author-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Author Name</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="author-name"
                  type="text"
                  value={formState.authorName}
                  onChange={(e) => handleChange("authorName", e.target.value)}
                  placeholder={formState.authorType === "Person" ? "Alex Mercer" : "Editorial Board"}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="author-job-title" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Job Title / Expertise Role (Optional)
                </label>
                <input
                  id="author-job-title"
                  type="text"
                  value={formState.authorJobTitle}
                  onChange={(e) => handleChange("authorJobTitle", e.target.value)}
                  placeholder="Staff Software Engineer"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="author-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <span>Author Profile / Bio URL (Google E-E-A-T)</span>
              </label>
              <input
                id="author-url"
                type="url"
                value={formState.authorUrl}
                onChange={(e) => handleChange("authorUrl", e.target.value)}
                placeholder="https://example.com/authors/alex-mercer or LinkedIn URL"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono"
              />
              <p className="text-[11px] text-slate-500">
                Google uses author URLs to associate content with trusted industry experts across the Knowledge Graph.
              </p>
            </div>
          </div>

          {/* Card: Publisher Entity */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-purple-500" />
                <span>6. Publisher Brand & Logo</span>
              </label>
              <span className="text-[11px] text-slate-400">AMP & Discover prerequisite</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="publisher-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Publisher Name</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="publisher-name"
                  type="text"
                  value={formState.publisherName}
                  onChange={(e) => handleChange("publisherName", e.target.value)}
                  placeholder="DevTech Insights"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="publisher-url" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Publisher Homepage URL
                </label>
                <input
                  id="publisher-url"
                  type="url"
                  value={formState.publisherUrl}
                  onChange={(e) => handleChange("publisherUrl", e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="publisher-logo" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <span>Publisher Logo URL</span>
              </label>
              <input
                id="publisher-logo"
                type="url"
                value={formState.publisherLogo}
                onChange={(e) => handleChange("publisherLogo", e.target.value)}
                placeholder="https://example.com/assets/logo.png"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono"
              />
              <p className="text-[11px] text-slate-500">
                Logo should be in JPG, PNG, or WebP format, ideally formatted with a 600x60 maximum bounding box.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column (Sticky Output, Validation & Preview) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            
            {/* Live Validation Status Banner */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-all shadow-sm space-y-3",
                validationDiagnostics.errorCount === 0 && validationDiagnostics.warningCount === 0
                  ? "border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100"
                  : validationDiagnostics.errorCount === 0
                  ? "border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100"
                  : "border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {validationDiagnostics.errorCount === 0 && validationDiagnostics.warningCount === 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : validationDiagnostics.errorCount === 0 ? (
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold leading-tight">
                      {validationDiagnostics.errorCount === 0 && validationDiagnostics.warningCount === 0
                        ? "100% Google Rich Results Compliant"
                        : validationDiagnostics.errorCount === 0
                        ? "Valid Schema with Optimization Warnings"
                        : `${validationDiagnostics.errorCount} Required Property Errors`}
                    </h4>
                    <span className="text-[11px] opacity-80">
                      Completeness Score: {validationDiagnostics.score}/100
                    </span>
                  </div>
                </div>

                {/* Score badge */}
                <div className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-current/20 text-xs font-black font-mono">
                  {validationDiagnostics.score}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    validationDiagnostics.score >= 90
                      ? "bg-emerald-500"
                      : validationDiagnostics.score >= 70
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  )}
                  style={{ width: `${validationDiagnostics.score}%` }}
                />
              </div>

              {/* Diagnostics Checklist */}
              <div className="space-y-1.5 pt-1 border-t border-current/10">
                {validationDiagnostics.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-2 text-[11px]">
                    {item.valid ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : item.severity === "warning" ? (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <span className="font-semibold">{item.label}</span>
                      {!item.valid && <p className="opacity-80 mt-0.5">{item.tip}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Panel with Tab Switcher */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
              
              {/* Tab Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("jsonld")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      activeTab === "jsonld"
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    JSON-LD Script
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("nextjs")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      activeTab === "nextjs"
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    Next.js / TS
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("visual")}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                      activeTab === "visual"
                        ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-slate-200/80 dark:border-slate-700"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    Visual Summary
                  </button>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {activeTab === "jsonld" ? "HTML5" : activeTab === "nextjs" ? "TSX" : "SERP Preview"}
                </span>
              </div>

              {/* Tab Content Box */}
              <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs min-h-[320px] max-h-[460px] overflow-y-auto">
                {activeTab === "jsonld" && (
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    <code>{rawHtmlScriptTag}</code>
                  </pre>
                )}

                {activeTab === "nextjs" && (
                  <pre className="whitespace-pre-wrap leading-relaxed text-indigo-300">
                    <code>{nextJsTypeScriptSnippet}</code>
                  </pre>
                )}

                {activeTab === "visual" && (
                  <div className="font-sans space-y-4 text-slate-900 dark:text-white p-2">
                    
                    {/* Visual Card 1: Google SERP Snippet Preview */}
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Google Search Rich Snippet Card
                      </span>

                      {/* SERP Breadcrumb */}
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 truncate">
                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                          {formState.publisherName ? formState.publisherName.charAt(0) : "W"}
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {formState.publisherName || "Publisher"}
                        </span>
                        <span>›</span>
                        <span className="truncate">{formState.url || "https://example.com/article"}</span>
                      </div>

                      {/* SERP Headline Link */}
                      <h3 className="text-base font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug">
                        {formState.headline || "Article Headline Goes Here"}
                      </h3>

                      {/* Byline & Date */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          By {formState.authorName || "Author Name"}
                        </span>
                        <span>•</span>
                        <span>{formState.datePublished.split("T")[0] || "2026-09-22"}</span>
                      </div>

                      {/* Excerpt + Thumbnail Grid */}
                      <div className="flex items-start gap-3 pt-1">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                          {formState.description || "Article excerpt preview explaining the key insights..."}
                        </p>
                        {(formState.primaryImage || formState.image16x9 || formState.image1x1) && (
                          <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={formState.image16x9 || formState.primaryImage || formState.image1x1}
                              alt="Thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Visual Card 2: Extracted Entity Table */}
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Schema.org Extracted Graph
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Subtype:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{formState.subtype}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Author:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {formState.authorName} ({formState.authorType})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Publisher:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{formState.publisherName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Section:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">{formState.articleSection || "—"}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm",
                      copied
                        ? "bg-emerald-600 text-white shadow-emerald-500/25"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
                    )}
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied Snippet!" : "Copy Snippet"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    title="Download JSON-LD File"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download JSON</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={googleTestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                  >
                    <span>Validate with Google</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Client-Side Privacy Guarantee */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>100% In-Browser Privacy Guarantee</span>
              </div>
              <span className="text-[10px] text-slate-400">Zero Server Data Logging</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ArticleSchemaGenerator;
