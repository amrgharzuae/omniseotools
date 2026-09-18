"use client";

import React, { useState, useMemo } from "react";
import { Copy, Check, Sparkles, Terminal, Code2, Sliders, ExternalLink } from "lucide-react";
import { ToolDefinition } from "@/types/tool";
import { PlatformDefinition } from "@/types/platform";
import { cn } from "@/lib/utils";
import { formatSnippetWithAttribution } from "@/lib/snippet-attribution";
import { EmbedToolModal } from "@/components/tools/EmbedToolModal";

interface DynamicToolGeneratorProps {
  tool: ToolDefinition;
  platform?: PlatformDefinition;
  isEmbedded?: boolean;
}

export function DynamicToolGenerator({ tool, platform, isEmbedded }: DynamicToolGeneratorProps) {
  // Initialize form state from default values or preset schema
  const initialValues = useMemo(() => {
    const defaults: Record<string, any> = { ...(tool.defaultValues || {}) };
    if (tool.presetSchema) {
      for (const field of tool.presetSchema) {
        if (defaults[field.id] === undefined && field.defaultValue !== undefined) {
          defaults[field.id] = field.defaultValue;
        }
      }
    }
    return defaults;
  }, [tool]);

  const [formState, setFormState] = useState<Record<string, any>>(initialValues);
  const [activeTab, setActiveTab] = useState<"html" | "nextjs" | "platform">("html");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const applyPreset = (presetValues: Record<string, any>) => {
    setFormState((prev) => ({
      ...prev,
      ...presetValues,
    }));
  };

  // Dedicated generator logic per tool slug
  const generatedCode = useMemo(() => {
    const s = formState;

    // 1. Schema Markup Generator
    if (tool.slug === "schema-markup-generator") {
      const type = s.schemaType || "Article";
      let schemaObj: any = {
        "@context": "https://schema.org",
        "@type": type,
        name: s.name || "My Page Title",
        url: s.url || "https://example.com/page",
        description: s.description || "Page description summary",
      };

      if (type === "Article" || type === "BlogPosting") {
        schemaObj = {
          ...schemaObj,
          headline: s.name || "My Article Headline",
          image: s.imageUrl || "https://example.com/image.jpg",
          author: {
            "@type": "Person",
            name: s.authorOrBrand || "Author Name",
          },
          publisher: {
            "@type": "Organization",
            name: s.authorOrBrand || "Publisher Name",
            logo: {
              "@type": "ImageObject",
              url: s.imageUrl || "https://example.com/logo.png",
            },
          },
          datePublished: "2026-01-01T08:00:00+00:00",
        };
      } else if (type === "Organization" || type === "LocalBusiness") {
        schemaObj = {
          ...schemaObj,
          logo: s.imageUrl || "https://example.com/logo.png",
          sameAs: [
            "https://twitter.com/yourbrand",
            "https://linkedin.com/company/yourbrand",
          ],
        };
      } else if (type === "Product") {
        schemaObj = {
          ...schemaObj,
          image: s.imageUrl || "https://example.com/product.jpg",
          brand: {
            "@type": "Brand",
            name: s.authorOrBrand || "Brand Name",
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: "49.00",
            availability: "https://schema.org/InStock",
          },
        };
      }

      if (activeTab === "nextjs") {
        return `// Next.js App Router Component Injection
export default function Page() {
  const jsonLd = ${JSON.stringify(schemaObj, null, 2)};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}`;
      }

      return `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;
    }

    // 2. Canonical Tag Generator
    if (tool.slug === "canonical-tag-generator") {
      const url = s.canonicalUrl || s.url || "https://example.com/target-page";
      if (activeTab === "nextjs") {
        return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '${url}',
  },
};`;
      }
      return `<!-- Primary Canonical Link Tag -->\n<link rel="canonical" href="${url}" />`;
    }

    // 3. Meta Viewport Generator
    if (tool.slug === "meta-viewport-generator") {
      const width = s.width || "device-width";
      const initialScale = s.initialScale || "1.0";
      const viewportFit = s.viewportFit || "cover";
      const userScalable = s.userScalable ? "yes" : "no";

      const content = `width=${width}, initial-scale=${initialScale}, viewport-fit=${viewportFit}${userScalable === "no" ? ", user-scalable=no, maximum-scale=1.0" : ""}`;

      if (activeTab === "nextjs") {
        return `import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: '${width}',
  initialScale: ${initialScale},
  viewportFit: '${viewportFit}',
  ${userScalable === "no" ? "userScalable: false,\n  maximumScale: 1.0," : ""}
};`;
      }
      return `<!-- HTML5 Responsive Meta Viewport Tag -->\n<meta name="viewport" content="${content}" />`;
    }

    // 4. Hreflang Tag Generator
    if (tool.slug === "hreflang-tag-generator") {
      const defaultUrl = s.defaultUrl || "https://example.com/";
      const enUrl = s.enUrl || "https://example.com/en/";
      const esUrl = s.esUrl || "https://example.com/es/";
      const frUrl = s.frUrl || "https://example.com/fr/";

      if (activeTab === "nextjs") {
        return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '${enUrl}',
    languages: {
      'x-default': '${defaultUrl}',
      'en-US': '${enUrl}',
      'es-ES': '${esUrl}',
      'fr-FR': '${frUrl}',
    },
  },
};`;
      }

      return `<!-- Multi-Language Hreflang Annotations -->
<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
<link rel="alternate" hreflang="en" href="${enUrl}" />
<link rel="alternate" hreflang="es" href="${esUrl}" />
<link rel="alternate" hreflang="fr" href="${frUrl}" />`;
    }

    // 5. Meta Robots Builder
    if (tool.slug === "meta-robots-builder") {
      const index = s.index !== false ? "index" : "noindex";
      const follow = s.follow !== false ? "follow" : "nofollow";
      const maxSnippet = s.maxSnippet || "-1";
      const maxImage = s.maxImagePreview || "large";
      const noArchive = s.noarchive ? ", noarchive" : "";
      const noSnippet = s.nosnippet ? ", nosnippet" : "";

      const directives = `${index}, ${follow}, max-snippet:${maxSnippet}, max-image-preview:${maxImage}${noArchive}${noSnippet}`;

      if (activeTab === "nextjs") {
        return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: ${index === "index"},
    follow: ${follow === "follow"},
    nocache: ${Boolean(s.noarchive)},
    googleBot: {
      index: ${index === "index"},
      follow: ${follow === "follow"},
      'max-video-preview': -1,
      'max-image-preview': '${maxImage}',
      'max-snippet': ${maxSnippet},
    },
  },
};`;
      }

      return `<!-- Googlebot & Search Engine Directives -->\n<meta name="robots" content="${directives}" />\n<meta name="googlebot" content="${directives}" />`;
    }

    // 6. Security Headers Meta Generator
    if (tool.slug === "security-headers-meta-generator") {
      const csp = s.csp || "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-inline';";
      const referrer = s.referrerPolicy || "strict-origin-when-cross-origin";

      if (activeTab === "nextjs") {
        return `// next.config.mjs Security Headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "${csp.replace(/"/g, '\\"')}",
  },
  {
    key: 'Referrer-Policy',
    value: '${referrer}',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};`;
      }

      return `<!-- Client-Side Security Headers (HTML Head) -->
<meta http-equiv="Content-Security-Policy" content="${csp}" />
<meta name="referrer" content="${referrer}" />
<meta http-equiv="X-Content-Type-Options" content="nosniff" />`;
    }

    // 7. Social Share Link Generator
    if (tool.slug === "social-share-link-generator") {
      const shareUrl = encodeURIComponent(s.shareUrl || "https://example.com/post");
      const shareText = encodeURIComponent(s.shareText || "Check out this remarkable developer utility!");
      const twitterUser = s.twitterHandle ? `&via=${s.twitterHandle.replace("@", "")}` : "";

      const twitterLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}${twitterUser}`;
      const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
      const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      const whatsAppLink = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;

      return `<!-- 1-Click Social Share URLs & Buttons -->
<!-- X / Twitter -->
<a href="${twitterLink}" target="_blank" rel="noopener noreferrer">Share on X</a>

<!-- LinkedIn -->
<a href="${linkedInLink}" target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>

<!-- Facebook -->
<a href="${facebookLink}" target="_blank" rel="noopener noreferrer">Share on Facebook</a>

<!-- WhatsApp -->
<a href="${whatsAppLink}" target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>`;
    }

    // 8. Breadcrumb Schema Generator
    if (tool.slug === "breadcrumb-schema-generator") {
      const item1Name = s.item1Name || "Home";
      const item1Url = s.item1Url || "https://example.com";
      const item2Name = s.item2Name || "Tools";
      const item2Url = s.item2Url || "https://example.com/tools";
      const item3Name = s.item3Name || "Technical SEO";
      const item3Url = s.item3Url || "https://example.com/tools/technical";

      const breadcrumbObj = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: item1Name,
            item: item1Url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: item2Name,
            item: item2Url,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item3Name,
            item: item3Url,
          },
        ],
      };

      if (activeTab === "nextjs") {
        return `// Next.js BreadcrumbList Injection
export default function Breadcrumbs() {
  const schema = ${JSON.stringify(breadcrumbObj, null, 2)};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}`;
      }

      return `<script type="application/ld+json">\n${JSON.stringify(breadcrumbObj, null, 2)}\n</script>`;
    }

    // 9. FAQ Schema Generator
    if (tool.slug === "faq-schema-generator") {
      const q1 = s.q1 || "What is Schema.org structured data?";
      const a1 = s.a1 || "Schema.org structured data is a standardized machine-readable format that helps search engines parse and display rich search snippets.";
      const q2 = s.q2 || "How does FAQ schema help my SEO rankings?";
      const a2 = s.a2 || "FAQPage schema allows your search engine listing to display expandable question-and-answer accordions directly in search results.";

      const faqObj = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: q1,
            acceptedAnswer: {
              "@type": "Answer",
              text: a1,
            },
          },
          {
            "@type": "Question",
            name: q2,
            acceptedAnswer: {
              "@type": "Answer",
              text: a2,
            },
          },
        ],
      };

      if (activeTab === "nextjs") {
        return `// Next.js FAQPage Schema
export default function FAQStructuredData() {
  const faqSchema = ${JSON.stringify(faqObj, null, 2)};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}`;
      }

      return `<script type="application/ld+json">\n${JSON.stringify(faqObj, null, 2)}\n</script>`;
    }

    // 10. Favicon Meta Generator
    if (tool.slug === "favicon-meta-generator") {
      const basePath = s.basePath || "/";
      const themeColor = s.themeColor || "#4F46E5";
      const appName = s.appName || "My Web App";

      if (activeTab === "nextjs") {
        return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${appName}',
  icons: {
    icon: [
      { url: '${basePath}favicon.ico', sizes: 'any' },
      { url: '${basePath}icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '${basePath}apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '${basePath}site.webmanifest',
};`;
      }

      return `<!-- Favicon & Touch Icons -->
<link rel="icon" href="${basePath}favicon.ico" sizes="any" />
<link rel="icon" href="${basePath}icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="${basePath}apple-touch-icon.png" />
<link rel="manifest" href="${basePath}site.webmanifest" />
<meta name="theme-color" content="${themeColor}" />`;
    }

    // Fallback: Generic tag builder from preset schema
    const tags: string[] = [];
    if (tool.presetSchema) {
      for (const field of tool.presetSchema) {
        const val = s[field.id];
        if (val !== undefined && val !== "") {
          tags.push(`<meta name="${field.id}" content="${val}" />`);
        }
      }
    }
    return tags.length > 0
      ? `<!-- Generated ${tool.name} Tags -->\n` + tags.join("\n")
      : `<!-- ${tool.name} Output -->\n<!-- Configure inputs on the left to generate real-time code -->`;
  }, [tool, formState, activeTab]);

  const handleCopy = () => {
    const rawCode =
      activeTab === "platform" && platform
        ? platform.defaultSnippet
        : generatedCode;
    const codeWithAttribution = formatSnippetWithAttribution(rawCode, {
      slug: tool.slug,
      platformSlug: platform?.slug,
      language: activeTab === "platform" ? platform?.snippetLanguage || "html" : activeTab,
    });
    navigator.clipboard.writeText(codeWithAttribution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
      {/* Header & Preset Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Code2 className="h-4 w-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {tool.name} Generator
            </h2>
            {platform && (
              <span className="rounded-md bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                {platform.name}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {tool.tagline || tool.shortDescription}
          </p>
        </div>

        {/* Quick Presets */}
        {tool.samplePresets && tool.samplePresets.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              Presets:
            </span>
            {tool.samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(preset.values)}
                className="rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Form + Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            <Sliders className="h-3.5 w-3.5" />
            <span>Configuration Inputs</span>
          </div>

          {tool.presetSchema && tool.presetSchema.length > 0 ? (
            tool.presetSchema.map((field) => {
              const value = formState[field.id] ?? "";

              if (field.type === "select") {
                return (
                  <div key={field.id} className="space-y-1.5">
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {field.label}
                    </label>
                    <select
                      id={field.id}
                      value={value}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {field.description && (
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        {field.description}
                      </p>
                    )}
                  </div>
                );
              }

              if (field.type === "textarea") {
                return (
                  <div key={field.id} className="space-y-1.5">
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {field.label}
                    </label>
                    <textarea
                      id={field.id}
                      rows={3}
                      value={value}
                      placeholder={field.placeholder}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                );
              }

              if (field.type === "boolean") {
                return (
                  <div key={field.id} className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {field.label}
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(e) => handleInputChange(field.id, e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="h-5 w-9 rounded-full bg-slate-300 dark:bg-slate-700 peer-checked:bg-indigo-600 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                );
              }

              return (
                <div key={field.id} className="space-y-1.5">
                  <label
                    htmlFor={field.id}
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {field.description && (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {field.description}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-4 text-center">
              <p className="text-xs text-slate-500">
                Interactive real-time generator ready.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Code Output Box */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div>
            {/* Tab Controls & Copy Button */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("html")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    activeTab === "html"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  HTML Code
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("nextjs")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    activeTab === "nextjs"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  Next.js / TS
                </button>
                {platform && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("platform")}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                      activeTab === "platform"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {platform.name} Config
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!isEmbedded && (
                  <EmbedToolModal slug={tool.slug} toolName={tool.name} />
                )}
                <button
                  type="button"
                  onClick={handleCopy}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
                    copied
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-400"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Display Area */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 shadow-inner">
              <pre className="overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-[320px] scrollbar-thin">
                <code>
                  {activeTab === "platform" && platform
                    ? platform.defaultSnippet
                    : generatedCode}
                </code>
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-500" /> 100% Client-Side Private Generator
            </span>
            <span>2026 Standards Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
