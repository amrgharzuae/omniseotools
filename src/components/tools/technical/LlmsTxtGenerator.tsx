"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Bot,
  Sparkles,
  Check,
  Copy,
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
  ShieldCheck,
  RotateCcw,
  Globe,
  FileText,
  SlidersHorizontal,
  Search,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Cpu,
  Bookmark,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface LlmsTxtGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

export type BuilderTab = "llms-builder" | "ai-robots";
export type OutputTab = "llms-txt" | "robots-txt" | "nextjs-route" | "static-server";

export interface LlmsResourceItem {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface LlmsSection {
  id: string;
  title: string;
  items: LlmsResourceItem[];
}

export type BotType = "training" | "search" | "both";
export type BotPermission = "allow" | "disallow" | "custom";

export interface AiBotConfig {
  id: string;
  name: string;
  owner: string;
  type: BotType;
  permission: BotPermission;
  customPath: string;
  description: string;
  userAgentTokens: string[];
}

// Initial Standard AI Bot Registry
const DEFAULT_AI_BOTS: AiBotConfig[] = [
  {
    id: "gptbot",
    name: "GPTBot",
    owner: "OpenAI",
    type: "training",
    permission: "allow",
    customPath: "/",
    description: "OpenAI crawler for training next-generation foundational models (GPT-4o, GPT-5).",
    userAgentTokens: ["GPTBot"],
  },
  {
    id: "chatgpt-user",
    name: "ChatGPT-User",
    owner: "OpenAI",
    type: "search",
    permission: "allow",
    customPath: "/",
    description: "Real-time browsing agent when end-users ask ChatGPT to inspect a direct web link.",
    userAgentTokens: ["ChatGPT-User"],
  },
  {
    id: "oai-searchbot",
    name: "OAI-SearchBot",
    owner: "OpenAI",
    type: "search",
    permission: "allow",
    customPath: "/",
    description: "OpenAI Search crawler (ChatGPT Search / SearchGPT) that indexes web pages for citations.",
    userAgentTokens: ["OAI-SearchBot"],
  },
  {
    id: "claudebot",
    name: "ClaudeBot",
    owner: "Anthropic",
    type: "both",
    permission: "allow",
    customPath: "/",
    description: "Anthropic crawler for training Claude LLMs and powering real-time web retrieval.",
    userAgentTokens: ["ClaudeBot", "anthropic-ai"],
  },
  {
    id: "perplexitybot",
    name: "PerplexityBot",
    owner: "Perplexity AI",
    type: "search",
    permission: "allow",
    customPath: "/",
    description: "Perplexity AI search engine crawler that cites and routes organic referral traffic.",
    userAgentTokens: ["PerplexityBot"],
  },
  {
    id: "google-extended",
    name: "Google-Extended",
    owner: "Google",
    type: "training",
    permission: "allow",
    customPath: "/",
    description: "Google token to opt out of Gemini & Vertex AI training. Does NOT affect Googlebot SERP ranking.",
    userAgentTokens: ["Google-Extended"],
  },
  {
    id: "ccbot",
    name: "CCBot",
    owner: "Common Crawl",
    type: "training",
    permission: "allow",
    customPath: "/",
    description: "Open web repository crawler widely ingested into open-source AI training datasets.",
    userAgentTokens: ["CCBot"],
  },
  {
    id: "bytespider",
    name: "ByteSpider",
    owner: "ByteDance / TikTok",
    type: "training",
    permission: "allow",
    customPath: "/",
    description: "ByteDance crawler used for training Doubao and LLM architectures.",
    userAgentTokens: ["ByteSpider"],
  },
  {
    id: "applebot-extended",
    name: "Applebot-Extended",
    owner: "Apple",
    type: "training",
    permission: "allow",
    customPath: "/",
    description: "Apple Intelligence training scraper opt-out. Does not affect Siri / Spotlight web search.",
    userAgentTokens: ["Applebot-Extended"],
  },
  {
    id: "meta-externalagent",
    name: "Meta-ExternalAgent",
    owner: "Meta",
    type: "training",
    permission: "allow",
    customPath: "/",
    description: "Meta AI training crawler used for Llama models and AI features across WhatsApp & Instagram.",
    userAgentTokens: ["Meta-ExternalAgent", "FacebookBot"],
  },
  {
    id: "cohere-ai",
    name: "Cohere-ai",
    owner: "Cohere",
    type: "training",
    permission: "allow",
    customPath: "/",
    description: "Enterprise foundation model training crawler for Cohere Command & Embed.",
    userAgentTokens: ["cohere-ai"],
  },
];

// Presets for llms.txt & AI Crawler directives
const PRESET_PERMISSIVE: {
  title: string;
  summary: string;
  description: string;
  hasFullTxt: boolean;
  fullTxtUrl: string;
  sections: LlmsSection[];
  botPermissions: Record<string, BotPermission>;
} = {
  title: "OmniSEO Tools Documentation",
  summary:
    "OmniSEO Tools is a 100% free, client-side web utility platform providing 35+ high-performance tools for technical SEO, SERP simulation, and structured data generation.",
  description:
    "All tools run strictly in the browser with zero server data storage. This documentation provides structured schema references, canonical URL specifications, and programmatic API guidelines for AI agents.",
  hasFullTxt: true,
  fullTxtUrl: "/llms-full.txt",
  sections: [
    {
      id: "sec-1",
      title: "Core Technical Tools",
      items: [
        {
          id: "item-1",
          title: "XML Sitemap Generator & Validator",
          url: "/tools/xml-sitemap-generator",
          description: "Client-side sitemap XML builder with image, news, and priority tags.",
        },
        {
          id: "item-2",
          title: "Robots.txt Generator & Validator",
          url: "/tools/robots-txt-generator-validator",
          description: "Comprehensive robots.txt creator with granular bot rule validation.",
        },
        {
          id: "item-3",
          title: "Schema Markup Generator",
          url: "/tools/schema-markup-generator",
          description: "Generates Google Rich Results JSON-LD for Articles, FAQs, and Products.",
        },
      ],
    },
    {
      id: "sec-2",
      title: "Developer & Asset Optimization",
      items: [
        {
          id: "item-4",
          title: "SVG to Base64 & Data URI Optimizer",
          url: "/tools/svg-to-data-uri",
          description: "Minifies and converts SVG markup into URL-encoded CSS background Data URIs.",
        },
        {
          id: "item-5",
          title: "Resource Hint & Preconnect Generator",
          url: "/tools/resource-hint-generator",
          description: "Generates preload, preconnect, and dns-prefetch tags for Core Web Vitals.",
        },
      ],
    },
  ],
  botPermissions: {
    gptbot: "allow",
    "chatgpt-user": "allow",
    "oai-searchbot": "allow",
    claudebot: "allow",
    perplexitybot: "allow",
    "google-extended": "allow",
    ccbot: "allow",
    bytespider: "allow",
    "applebot-extended": "allow",
    "meta-externalagent": "allow",
    "cohere-ai": "allow",
  },
};

const PRESET_SEARCH_ONLY: {
  title: string;
  summary: string;
  description: string;
  hasFullTxt: boolean;
  fullTxtUrl: string;
  sections: LlmsSection[];
  botPermissions: Record<string, BotPermission>;
} = {
  title: "My Site Knowledge Base",
  summary:
    "Authoritative guide and documentation library. Permitted for real-time AI search citations and user assistance.",
  description:
    "We welcome real-time search queries and conversational citations while explicitly reserving rights against unauthorized foundation model bulk dataset scraping.",
  hasFullTxt: false,
  fullTxtUrl: "/llms-full.txt",
  sections: [
    {
      id: "sec-1",
      title: "Public Knowledge Base",
      items: [
        {
          id: "item-1",
          title: "API Documentation Index",
          url: "/docs/api.md",
          description: "Public REST endpoint references and parameter schemas.",
        },
        {
          id: "item-2",
          title: "User Guides & Tutorials",
          url: "/docs/guides.md",
          description: "Step-by-step walkthroughs and integration tutorials.",
        },
      ],
    },
  ],
  botPermissions: {
    gptbot: "disallow",
    "chatgpt-user": "allow",
    "oai-searchbot": "allow",
    claudebot: "disallow",
    perplexitybot: "allow",
    "google-extended": "disallow",
    ccbot: "disallow",
    bytespider: "disallow",
    "applebot-extended": "disallow",
    "meta-externalagent": "disallow",
    "cohere-ai": "disallow",
  },
};

const PRESET_NO_AI_TRAINING: {
  title: string;
  summary: string;
  description: string;
  hasFullTxt: boolean;
  fullTxtUrl: string;
  sections: LlmsSection[];
  botPermissions: Record<string, BotPermission>;
} = {
  title: "Proprietary Platform Portal",
  summary:
    "Proprietary technical documentation and enterprise software specifications.",
  description:
    "All rights reserved. Web scraping, automated bulk ingestion, and machine learning model training without prior written consent are strictly prohibited.",
  hasFullTxt: false,
  fullTxtUrl: "/llms-full.txt",
  sections: [
    {
      id: "sec-1",
      title: "Public Specifications",
      items: [
        {
          id: "item-1",
          title: "Platform Overview",
          url: "/overview.md",
          description: "High-level architectural summary.",
        },
      ],
    },
  ],
  botPermissions: {
    gptbot: "disallow",
    "chatgpt-user": "disallow",
    "oai-searchbot": "disallow",
    claudebot: "disallow",
    perplexitybot: "disallow",
    "google-extended": "disallow",
    ccbot: "disallow",
    bytespider: "disallow",
    "applebot-extended": "disallow",
    "meta-externalagent": "disallow",
    "cohere-ai": "disallow",
  },
};

const PRESET_DEVELOPER_DOCS: {
  title: string;
  summary: string;
  description: string;
  hasFullTxt: boolean;
  fullTxtUrl: string;
  sections: LlmsSection[];
  botPermissions: Record<string, BotPermission>;
} = {
  title: "Developer API & SDK Hub",
  summary:
    "Complete developer reference documentation, REST endpoints, TypeScript SDK types, and schema specifications.",
  description:
    "Designed for rapid LLM context injection. Include this file in coding assistant prompts (Claude Code, Cursor, Copilot) for instant codebase awareness.",
  hasFullTxt: true,
  fullTxtUrl: "/llms-full.txt",
  sections: [
    {
      id: "sec-1",
      title: "Core Endpoints & Protocols",
      items: [
        {
          id: "item-1",
          title: "Authentication & API Keys",
          url: "/docs/auth.md",
          description: "Bearer tokens, rate limits (100 req/min), and error codes.",
        },
        {
          id: "item-2",
          title: "Sitemap & Crawl Endpoints",
          url: "/docs/endpoints/sitemap.md",
          description: "POST /v1/sitemap/validate and GET /v1/sitemap/extract schemas.",
        },
      ],
    },
    {
      id: "sec-2",
      title: "SDKs & Client Libraries",
      items: [
        {
          id: "item-3",
          title: "TypeScript / Node.js SDK",
          url: "/docs/sdks/typescript.md",
          description: "npm install @omniseo/sdk usage instructions and async methods.",
        },
        {
          id: "item-4",
          title: "Python SDK Reference",
          url: "/docs/sdks/python.md",
          description: "pip install omniseo-sdk with Pydantic typing definitions.",
        },
      ],
    },
    {
      id: "sec-3",
      title: "Full Archive",
      items: [
        {
          id: "item-5",
          title: "Complete Concatenated Documentation",
          url: "/llms-full.txt",
          description: "All guides and reference tables in a single raw Markdown file.",
        },
      ],
    },
  ],
  botPermissions: {
    gptbot: "allow",
    "chatgpt-user": "allow",
    "oai-searchbot": "allow",
    claudebot: "allow",
    perplexitybot: "allow",
    "google-extended": "allow",
    ccbot: "allow",
    bytespider: "allow",
    "applebot-extended": "allow",
    "meta-externalagent": "allow",
    "cohere-ai": "allow",
  },
};

export function LlmsTxtGenerator({
  toolSlug = "llms-txt-generator",
  toolName = "LLMs.txt & AI Crawler Directive Generator",
}: LlmsTxtGeneratorProps) {
  // Navigation Tabs
  const [activeBuilderTab, setActiveBuilderTab] = useState<BuilderTab>("llms-builder");
  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>("llms-txt");
  const [botFilter, setBotFilter] = useState<"all" | "search" | "training">("all");

  // State: llms.txt configuration
  const [siteTitle, setSiteTitle] = useState(PRESET_PERMISSIVE.title);
  const [summary, setSummary] = useState(PRESET_PERMISSIVE.summary);
  const [description, setDescription] = useState(PRESET_PERMISSIVE.description);
  const [hasFullTxt, setHasFullTxt] = useState(PRESET_PERMISSIVE.hasFullTxt);
  const [fullTxtUrl, setFullTxtUrl] = useState(PRESET_PERMISSIVE.fullTxtUrl);
  const [sections, setSections] = useState<LlmsSection[]>(PRESET_PERMISSIVE.sections);

  // State: AI bot robots.txt configuration
  const [aiBots, setAiBots] = useState<AiBotConfig[]>(DEFAULT_AI_BOTS);
  const [siteUrl, setSiteUrl] = useState("https://omniseotools.com");
  const [includeLlmsComment, setIncludeLlmsComment] = useState(true);
  const [includeSitemapDirective, setIncludeSitemapDirective] = useState(true);
  const [crawlDelay, setCrawlDelay] = useState<number>(0);

  // UI state
  const [copied, setCopied] = useState(false);
  const [activePresetName, setActivePresetName] = useState<string>("Permissive AI Access");

  // Apply a preset
  const applyPreset = useCallback((presetName: string) => {
    setActivePresetName(presetName);
    let targetPreset = PRESET_PERMISSIVE;
    if (presetName === "Search-Only Access") targetPreset = PRESET_SEARCH_ONLY;
    if (presetName === "Strict Privacy / No AI Training") targetPreset = PRESET_NO_AI_TRAINING;
    if (presetName === "Developer Doc Hub") targetPreset = PRESET_DEVELOPER_DOCS;

    setSiteTitle(targetPreset.title);
    setSummary(targetPreset.summary);
    setDescription(targetPreset.description);
    setHasFullTxt(targetPreset.hasFullTxt);
    setFullTxtUrl(targetPreset.fullTxtUrl);
    setSections(targetPreset.sections);

    // Apply bot permissions
    setAiBots((prev) =>
      prev.map((bot) => ({
        ...bot,
        permission: targetPreset.botPermissions[bot.id] || "allow",
      }))
    );
  }, []);

  // Section Management
  const addSection = () => {
    const newSection: LlmsSection = {
      id: `sec-${Date.now()}`,
      title: "New Documentation Section",
      items: [
        {
          id: `item-${Date.now()}`,
          title: "Getting Started Guide",
          url: "/docs/getting-started.md",
          description: "Overview and prerequisite configuration instructions.",
        },
      ],
    };
    setSections((prev) => [...prev, newSection]);
  };

  const removeSection = (sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, title: newTitle } : s))
    );
  };

  // Item Management
  const addItemToSection = (sectionId: string) => {
    const newItem: LlmsResourceItem = {
      id: `item-${Date.now()}`,
      title: "Resource Title",
      url: "/docs/resource.md",
      description: "Concise summary of resource capabilities and data format.",
    };
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
      )
    );
  };

  const removeItem = (sectionId: string, itemId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((item) => item.id !== itemId) }
          : s
      )
    );
  };

  const updateItem = (
    sectionId: string,
    itemId: string,
    field: keyof LlmsResourceItem,
    value: string
  ) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : s
      )
    );
  };

  // Bot Permission Management
  const updateBotPermission = (botId: string, permission: BotPermission) => {
    setAiBots((prev) =>
      prev.map((b) => (b.id === botId ? { ...b, permission } : b))
    );
  };

  const updateBotCustomPath = (botId: string, customPath: string) => {
    setAiBots((prev) =>
      prev.map((b) => (b.id === botId ? { ...b, customPath } : b))
    );
  };

  const setAllBotsPermission = (permission: BotPermission) => {
    setAiBots((prev) => prev.map((b) => ({ ...b, permission })));
  };

  // Filtered Bots
  const filteredBots = useMemo(() => {
    if (botFilter === "search") return aiBots.filter((b) => b.type === "search" || b.type === "both");
    if (botFilter === "training") return aiBots.filter((b) => b.type === "training" || b.type === "both");
    return aiBots;
  }, [aiBots, botFilter]);

  // Generators

  // 1. Generate /llms.txt standard Markdown
  const generatedLlmsTxt = useMemo(() => {
    const lines: string[] = [];

    // Title
    lines.push(`# ${siteTitle.trim() || "Project Documentation"}`);
    lines.push("");

    // Blockquote Overview
    if (summary.trim()) {
      lines.push(`> ${summary.trim()}`);
      lines.push("");
    }

    // Extended description / context
    if (description.trim()) {
      lines.push(description.trim());
      lines.push("");
    }

    // Full txt link notice
    if (hasFullTxt && fullTxtUrl.trim()) {
      lines.push(`> For the complete documentation in a single concatenated stream, see [llms-full.txt](${fullTxtUrl.trim()}).`);
      lines.push("");
    }

    // Sections & Links
    sections.forEach((section) => {
      if (section.title.trim()) {
        lines.push(`## ${section.title.trim()}`);
        if (section.items.length === 0) {
          lines.push(`<!-- No links added yet -->`);
        } else {
          section.items.forEach((item) => {
            const label = item.title.trim() || "Resource";
            const target = item.url.trim() || "/";
            const desc = item.description.trim() ? `: ${item.description.trim()}` : "";
            lines.push(`- [${label}](${target})${desc}`);
          });
        }
        lines.push("");
      }
    });

    return lines.join("\n").trim() + "\n";
  }, [siteTitle, summary, description, hasFullTxt, fullTxtUrl, sections]);

  // 2. Generate robots.txt AI directives
  const generatedRobotsTxt = useMemo(() => {
    const lines: string[] = [];
    const formattedUrl = siteUrl.replace(/\/+$/, "");

    lines.push("# ========================================================");
    lines.push("# AI Crawler & LLM Ingestion Directives");
    lines.push("# Generated by OmniSEO Tools (https://omniseotools.com)");
    lines.push("# ========================================================");
    lines.push("");

    if (includeLlmsComment) {
      lines.push(`# LLMs.txt AI Inference Context Index:`);
      lines.push(`# ${formattedUrl}/llms.txt`);
      if (hasFullTxt) {
        lines.push(`# ${formattedUrl}/llms-full.txt`);
      }
      lines.push("");
    }

    // Group Bots by permission: Disallow vs Allow vs Custom
    const disallowedBots = aiBots.filter((b) => b.permission === "disallow");
    const allowedBots = aiBots.filter((b) => b.permission === "allow");
    const customBots = aiBots.filter((b) => b.permission === "custom");

    if (disallowedBots.length > 0) {
      lines.push("# --- Disallowed AI Scrapers & Training Crawlers ---");
      disallowedBots.forEach((bot) => {
        bot.userAgentTokens.forEach((token) => {
          lines.push(`User-agent: ${token}`);
        });
        lines.push("Disallow: /");
        lines.push("");
      });
    }

    if (customBots.length > 0) {
      lines.push("# --- Custom Path Restricted AI Agents ---");
      customBots.forEach((bot) => {
        bot.userAgentTokens.forEach((token) => {
          lines.push(`User-agent: ${token}`);
        });
        const path = bot.customPath.trim() || "/";
        lines.push(`Disallow: ${path}`);
        if (crawlDelay > 0) {
          lines.push(`Crawl-delay: ${crawlDelay}`);
        }
        lines.push("");
      });
    }

    if (allowedBots.length > 0) {
      lines.push("# --- Permitted AI Search & Citation Agents ---");
      allowedBots.forEach((bot) => {
        bot.userAgentTokens.forEach((token) => {
          lines.push(`User-agent: ${token}`);
        });
        lines.push("Allow: /");
        if (crawlDelay > 0) {
          lines.push(`Crawl-delay: ${crawlDelay}`);
        }
        lines.push("");
      });
    }

    if (includeSitemapDirective) {
      lines.push("# --- Standard Search Engine Sitemaps ---");
      lines.push(`Sitemap: ${formattedUrl}/sitemap.xml`);
      lines.push("");
    }

    return lines.join("\n").trim() + "\n";
  }, [
    aiBots,
    siteUrl,
    includeLlmsComment,
    hasFullTxt,
    crawlDelay,
    includeSitemapDirective,
  ]);

  // 3. Generate Next.js App Router Route Handler (app/llms.txt/route.ts)
  const generatedNextJsRoute = useMemo(() => {
    const escapedContent = generatedLlmsTxt.replace(/`/g, "\\`").replace(/\${/g, "\\${");

    return `// app/llms.txt/route.ts
// Production Next.js App Router Handler for /llms.txt
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache on edge CDN for 24 hours

export async function GET() {
  const llmsContent = \`${escapedContent}\`;

  return new NextResponse(llmsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
`;
  }, [generatedLlmsTxt]);

  // 4. Generate Static Server / Cloudflare Headers
  const generatedStaticServer = useMemo(() => {
    return `# Cloudflare Pages / Vercel / Nginx Header Rules

# 1. Cloudflare Pages (_headers file):
/llms.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=86400, stale-while-revalidate=43200
  Access-Control-Allow-Origin: *

/llms-full.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=86400, stale-while-revalidate=43200
  Access-Control-Allow-Origin: *

# 2. Nginx Server Block snippet:
location = /llms.txt {
    add_header Content-Type "text/plain; charset=utf-8";
    add_header Cache-Control "public, max-age=86400, stale-while-revalidate=43200";
    add_header Access-Control-Allow-Origin "*";
    try_files $uri =404;
}
`;
  }, []);

  // Active Output Code based on Output Tab
  const activeOutputCode = useMemo(() => {
    switch (activeOutputTab) {
      case "llms-txt":
        return generatedLlmsTxt;
      case "robots-txt":
        return generatedRobotsTxt;
      case "nextjs-route":
        return generatedNextJsRoute;
      case "static-server":
        return generatedStaticServer;
      default:
        return generatedLlmsTxt;
    }
  }, [
    activeOutputTab,
    generatedLlmsTxt,
    generatedRobotsTxt,
    generatedNextJsRoute,
    generatedStaticServer,
  ]);

  // Metrics: Estimated Token Count (~4 chars per token) & Byte Size
  const textBytes = useMemo(() => {
    return new TextEncoder().encode(generatedLlmsTxt).length;
  }, [generatedLlmsTxt]);

  const estimatedTokens = useMemo(() => {
    return Math.ceil(generatedLlmsTxt.length / 3.8);
  }, [generatedLlmsTxt]);

  // Compliance & Best Practice Validation Rules
  const validationResults = useMemo(() => {
    const list: {
      type: "pass" | "warn" | "info";
      title: string;
      message: string;
    }[] = [];

    // Rule 1: Blockquote Overview
    if (summary.trim().length > 15) {
      list.push({
        type: "pass",
        title: "Blockquote Overview Present",
        message: "Your /llms.txt includes a concise summary for AI system prompt induction.",
      });
    } else {
      list.push({
        type: "warn",
        title: "Missing Blockquote Summary",
        message: "The /llms.txt specification strongly recommends a > blockquote summary under the H1 title.",
      });
    }

    // Rule 2: Token Size Budget (< 2,000 tokens)
    if (estimatedTokens <= 2000) {
      list.push({
        type: "pass",
        title: `Optimal Token Budget (~${estimatedTokens} tokens)`,
        message: "Fits comfortably inside top-level LLM context windows without truncation.",
      });
    } else {
      list.push({
        type: "warn",
        title: `High Token Count (~${estimatedTokens} tokens)`,
        message: "Top-level /llms.txt should remain concise (<2,000 tokens). Consider moving detailed docs to /llms-full.txt.",
      });
    }

    // Rule 3: Google-Extended Advisory
    const googleExt = aiBots.find((b) => b.id === "google-extended");
    if (googleExt && googleExt.permission === "disallow") {
      list.push({
        type: "info",
        title: "Google-Extended Disallowed",
        message: "Gemini / Vertex AI model training is blocked. Note that Google Search (Googlebot) rankings remain 100% active.",
      });
    }

    // Rule 4: Search vs Training Discrepancy
    const oaiSearch = aiBots.find((b) => b.id === "oai-searchbot");
    const perpBot = aiBots.find((b) => b.id === "perplexitybot");
    if ((oaiSearch && oaiSearch.permission === "disallow") || (perpBot && perpBot.permission === "disallow")) {
      list.push({
        type: "warn",
        title: "AI Search Engines Blocked",
        message: "You have disallowed OAI-SearchBot or PerplexityBot. This will prevent ChatGPT Search & Perplexity from citing your links.",
      });
    } else {
      list.push({
        type: "pass",
        title: "AI Search Referral Flow Active",
        message: "Search citation bots are allowed to index and link directly to your pages.",
      });
    }

    return list;
  }, [summary, estimatedTokens, aiBots]);

  // Copy Output
  const handleCopy = () => {
    navigator.clipboard.writeText(activeOutputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download Output File
  const handleDownload = () => {
    let filename = "llms.txt";
    let mimeType = "text/plain;charset=utf-8";

    if (activeOutputTab === "robots-txt") {
      filename = "robots.txt";
    } else if (activeOutputTab === "nextjs-route") {
      filename = "route.ts";
      mimeType = "text/typescript;charset=utf-8";
    } else if (activeOutputTab === "static-server") {
      filename = "_headers";
    }

    const blob = new Blob([activeOutputCode], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* 1. Quick Preset Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-4 shadow-xs backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Quick Strategy Presets
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Click any strategy to configure /llms.txt &amp; robots.txt instantly
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            {
              name: "Permissive AI Access",
              desc: "Allow all AI bots with clean /llms.txt index",
              icon: Globe,
            },
            {
              name: "Search-Only Access",
              desc: "Allow search bots, block bulk training scrapers",
              icon: Search,
            },
            {
              name: "Strict Privacy / No AI Training",
              desc: "Block all AI training bots via robots.txt",
              icon: ShieldAlert,
            },
            {
              name: "Developer Doc Hub",
              desc: "Pre-fills APIs, Guides, SDKs & schema links",
              icon: Code2,
            },
          ].map((preset) => {
            const Icon = preset.icon;
            const isActive = activePresetName === preset.name;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset.name)}
                className={cn(
                  "flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150",
                  isActive
                    ? "border-emerald-500/80 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 shadow-xs ring-1 ring-emerald-500/30"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
                    )}
                  />
                  <span className="text-xs font-bold leading-tight truncate">
                    {preset.name}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                  {preset.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Dual-Pane Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Builder Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dual Tab Switcher */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setActiveBuilderTab("llms-builder")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all",
                activeBuilderTab === "llms-builder"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <FileText className="h-4 w-4 text-emerald-500" />
              <span>1. /llms.txt Markdown Builder</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveBuilderTab("ai-robots")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all",
                activeBuilderTab === "ai-robots"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Bot className="h-4 w-4 text-indigo-500" />
              <span>2. AI Bot robots.txt Matrix</span>
            </button>
          </div>

          {/* TAB A: LLMS.TXT BUILDER */}
          {activeBuilderTab === "llms-builder" && (
            <div className="space-y-6">
              {/* Site Name & Blockquote Overview */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-emerald-500" />
                    Header &amp; AI System Prompt Overview
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    H1 &gt; Blockquote
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project / Website Title (H1)
                  </label>
                  <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    placeholder="e.g. OmniSEO Tools Documentation"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Mandatory Summary / System Prompt (&gt; Blockquote)
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {summary.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Concise 2-sentence synthesis of your site's core purpose for LLM ingestion..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-3 text-xs font-mono text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    AI agents inject this blockquote directly as an authoritative system description.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Extended Context / Background (Optional Paragraph)
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Additional context on architecture, privacy guarantees, or authentication..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-3 text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Full Txt Link Toggle */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={hasFullTxt}
                      onChange={(e) => setHasFullTxt(e.target.checked)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    Include Pointer to /llms-full.txt
                  </label>
                  {hasFullTxt && (
                    <input
                      type="text"
                      value={fullTxtUrl}
                      onChange={(e) => setFullTxtUrl(e.target.value)}
                      placeholder="/llms-full.txt"
                      className="w-full sm:w-48 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  )}
                </div>
              </div>

              {/* Dynamic Sections & Link Resource Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="h-4 w-4 text-emerald-500" />
                      Curated Resource Sections
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Organize your Markdown documentation links by category.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addSection}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Section</span>
                  </button>
                </div>

                {sections.map((section, sIdx) => (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-4 shadow-xs"
                  >
                    {/* Section Header */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xs font-bold text-slate-400 font-mono">
                          H2 #{sIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) =>
                            updateSectionTitle(section.id, e.target.value)
                          }
                          placeholder="Section Title (e.g. Core APIs)"
                          className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 text-xs font-bold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => addItemToSection(section.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Link</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(section.id)}
                          disabled={sections.length <= 1}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-40 transition-colors"
                          title="Remove Section"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Section Items */}
                    <div className="space-y-3">
                      {section.items.map((item, iIdx) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/40 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                              Link #{iIdx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(section.id, item.id)}
                              className="text-slate-400 hover:text-rose-500 p-0.5 rounded transition-colors"
                              title="Delete Link"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) =>
                                  updateItem(
                                    section.id,
                                    item.id,
                                    "title",
                                    e.target.value
                                  )
                                }
                                placeholder="Link Label (e.g. Sitemap API)"
                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={item.url}
                                onChange={(e) =>
                                  updateItem(
                                    section.id,
                                    item.id,
                                    "url",
                                    e.target.value
                                  )
                                }
                                placeholder="URL (e.g. /docs/api.md)"
                                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                updateItem(
                                  section.id,
                                  item.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Description: Brief summary of the resource content..."
                              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 focus:border-emerald-500 focus:outline-hidden"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB B: AI BOT ROBOTS.TXT MATRIX */}
          {activeBuilderTab === "ai-robots" && (
            <div className="space-y-6">
              {/* Global robots.txt Settings */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
                    Global robots.txt Settings
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    User-agent Blocks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Canonical Domain Base URL
                    </label>
                    <input
                      type="text"
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      placeholder="https://omniseotools.com"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Optional Crawl-Delay (Seconds)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={60}
                      value={crawlDelay}
                      onChange={(e) => setCrawlDelay(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeLlmsComment}
                      onChange={(e) => setIncludeLlmsComment(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Link /llms.txt in Header Comments
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeSitemapDirective}
                      onChange={(e) => setIncludeSitemapDirective(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Include Sitemap.xml Directive
                  </label>
                </div>
              </div>

              {/* Bot Matrix Controls & Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Filter Chips */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setBotFilter("all")}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                      botFilter === "all"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    All ({aiBots.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setBotFilter("search")}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                      botFilter === "search"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    Search / Citations
                  </button>
                  <button
                    type="button"
                    onClick={() => setBotFilter("training")}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                      botFilter === "training"
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    Training Scrapers
                  </button>
                </div>

                {/* Bulk Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAllBotsPermission("allow")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
                  >
                    Allow All
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllBotsPermission("disallow")}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-[11px] font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors"
                  >
                    Disallow All
                  </button>
                </div>
              </div>

              {/* Individual Bot Cards Matrix */}
              <div className="space-y-3">
                {filteredBots.map((bot) => (
                  <div
                    key={bot.id}
                    className={cn(
                      "rounded-2xl border p-4 transition-all duration-150 shadow-xs",
                      bot.permission === "allow"
                        ? "border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10"
                        : bot.permission === "disallow"
                        ? "border-rose-500/30 bg-rose-50/20 dark:bg-rose-950/10"
                        : "border-amber-500/30 bg-amber-50/20 dark:bg-amber-950/10"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs",
                            bot.permission === "allow"
                              ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300"
                              : bot.permission === "disallow"
                              ? "bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300"
                              : "bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300"
                          )}
                        >
                          <Bot className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {bot.name}
                            </span>
                            <span className="text-[10px] rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-medium text-slate-600 dark:text-slate-300">
                              {bot.owner}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] rounded-md px-1.5 py-0.5 font-bold uppercase",
                                bot.type === "search"
                                  ? "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300"
                                  : bot.type === "training"
                                  ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                                  : "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
                              )}
                            >
                              {bot.type === "search"
                                ? "Search / Citations"
                                : bot.type === "training"
                                ? "Training Scraper"
                                : "Search & Training"}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            User-agent: {bot.userAgentTokens.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Permission Switcher */}
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => updateBotPermission(bot.id, "allow")}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                            bot.permission === "allow"
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          )}
                        >
                          Allow
                        </button>
                        <button
                          type="button"
                          onClick={() => updateBotPermission(bot.id, "disallow")}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                            bot.permission === "disallow"
                              ? "bg-rose-600 text-white shadow-xs"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          )}
                        >
                          Disallow
                        </button>
                        <button
                          type="button"
                          onClick={() => updateBotPermission(bot.id, "custom")}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                            bot.permission === "custom"
                              ? "bg-amber-600 text-white shadow-xs"
                              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          )}
                        >
                          Custom Path
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2">
                      {bot.description}
                    </p>

                    {/* Custom Path Input if selected */}
                    {bot.permission === "custom" && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
                        <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          Disallow Path:
                        </label>
                        <input
                          type="text"
                          value={bot.customPath}
                          onChange={(e) =>
                            updateBotCustomPath(bot.id, e.target.value)
                          }
                          placeholder="/private/ or /api/"
                          className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-white"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Output Panel & Compliance Validator (5 cols - Sticky) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          {/* Output Format Tabs & Editor */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
            {/* Header Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveOutputTab("llms-txt")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                    activeOutputTab === "llms-txt"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  llms.txt
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab("robots-txt")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                    activeOutputTab === "robots-txt"
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  robots.txt Snippet
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab("nextjs-route")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                    activeOutputTab === "nextjs-route"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Next.js Route
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab("static-server")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                    activeOutputTab === "static-server"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Headers
                </button>
              </div>

              {/* Live Metric Pill */}
              <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
                ~{estimatedTokens} tokens
              </span>
            </div>

            {/* Code Output Display Area */}
            <div className="relative">
              <pre className="p-4 bg-slate-950 text-slate-200 font-mono text-xs min-h-[300px] max-h-[460px] overflow-y-auto whitespace-pre-wrap break-all leading-relaxed scrollbar-thin">
                <code>{activeOutputCode}</code>
              </pre>

              {/* Floating Copy Confirmation Badge */}
              {copied && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold shadow-lg animate-in fade-in zoom-in-95">
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied to Clipboard!</span>
                </div>
              )}
            </div>

            {/* Output Panel Action Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono">{textBytes} bytes</span>
                <span>•</span>
                <span>UTF-8 Markdown</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Output</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Download File"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <EmbedBadgeModal toolSlug={toolSlug} label="LLMs.txt" status="AI Ready" />
              </div>
            </div>
          </div>

          {/* Compliance & Best Practice Validator Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                AI Compliance &amp; Standards Audit
              </h4>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                Active Audit
              </span>
            </div>

            <div className="space-y-2.5">
              {validationResults.map((res, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-xl border text-xs space-y-1",
                    res.type === "pass"
                      ? "border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200"
                      : res.type === "warn"
                      ? "border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20 text-amber-950 dark:text-amber-200"
                      : "border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 text-blue-950 dark:text-blue-200"
                  )}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {res.type === "pass" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : res.type === "warn" ? (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    ) : (
                      <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    )}
                    <span>{res.title}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 pl-5">
                    {res.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
