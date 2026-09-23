"use client";

import React, { useState, useMemo, useCallback } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface CspHeaderBuilderProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

export type MainTab = "csp" | "headers";
export type OutputTab =
  | "raw"
  | "nextjs-config"
  | "nextjs-middleware"
  | "vercel"
  | "nginx"
  | "cloudflare"
  | "apache"
  | "html-meta";

export interface DirectiveConfig {
  enabled: boolean;
  keywords: string[]; // e.g. ["'self'", "'unsafe-inline'", "'none'", "data:", "https:"]
  customSources: string[]; // e.g. ["https://www.google-analytics.com", "*.stripe.com"]
}

export interface CspDirectivesState {
  "default-src": DirectiveConfig;
  "script-src": DirectiveConfig;
  "script-src-elem": DirectiveConfig;
  "style-src": DirectiveConfig;
  "style-src-elem": DirectiveConfig;
  "img-src": DirectiveConfig;
  "connect-src": DirectiveConfig;
  "font-src": DirectiveConfig;
  "frame-src": DirectiveConfig;
  "child-src": DirectiveConfig;
  "object-src": DirectiveConfig;
  "base-uri": DirectiveConfig;
  "form-action": DirectiveConfig;
  "frame-ancestors": DirectiveConfig;
  "media-src": DirectiveConfig;
  "manifest-src": DirectiveConfig;
  "worker-src": DirectiveConfig;
}

export interface SecurityHeadersState {
  hsts: {
    enabled: boolean;
    maxAge: number; // in seconds, default 63072000 (2 years)
    includeSubDomains: boolean;
    preload: boolean;
  };
  xFrameOptions: "DENY" | "SAMEORIGIN" | "disabled";
  xContentTypeOptions: boolean; // nosniff
  referrerPolicy:
    | "strict-origin-when-cross-origin"
    | "no-referrer"
    | "origin-when-cross-origin"
    | "same-origin"
    | "no-referrer-when-downgrade"
    | "origin"
    | "unsafe-url"
    | "disabled";
  permissionsPolicy: {
    enabled: boolean;
    camera: "()" | "(self)" | "*" | "disabled";
    microphone: "()" | "(self)" | "*" | "disabled";
    geolocation: "()" | "(self)" | "*" | "disabled";
    interestCohort: "()" | "disabled";
    payment: "()" | "(self)" | "*" | "disabled";
    usb: "()" | "(self)" | "disabled";
    fullscreen: "(self)" | "*" | "()" | "disabled";
    displayCapture: "()" | "(self)" | "disabled";
    accelerometer: "()" | "(self)" | "disabled";
    gyroscope: "()" | "(self)" | "disabled";
    magnetometer: "()" | "(self)" | "disabled";
  };
  crossOriginOpenerPolicy: "same-origin" | "same-origin-allow-popups" | "unsafe-none" | "disabled";
  crossOriginEmbedderPolicy: "require-corp" | "credentialless" | "unsafe-none" | "disabled";
  crossOriginResourcePolicy: "same-origin" | "same-site" | "cross-origin" | "disabled";
  xXssProtection: "0" | "1; mode=block" | "disabled";
}

interface DirectiveMeta {
  key: keyof CspDirectivesState;
  label: string;
  description: string;
  defaultKeywords: string[];
  recommendedKeywords: string[];
  popularSuggestions: { label: string; value: string }[];
  category: "core" | "scripts-styles" | "media-connect" | "framing-nav" | "advanced";
}

const DIRECTIVES_LIST: DirectiveMeta[] = [
  {
    key: "default-src",
    label: "default-src",
    description: "Fallback baseline for all unconfigured resource fetching directives.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [
      { label: "HTTPS Only", value: "https:" },
      { label: "Data URIs", value: "data:" },
      { label: "Blobs", value: "blob:" },
    ],
    category: "core",
  },
  {
    key: "script-src",
    label: "script-src",
    description: "Restricts execution origins for JavaScript code and Web Workers.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [
      { label: "Google Tag Manager", value: "https://www.googletagmanager.com" },
      { label: "Google Analytics", value: "https://www.google-analytics.com" },
      { label: "Stripe.js", value: "https://js.stripe.com" },
      { label: "Cloudflare Web Analytics", value: "https://static.cloudflareinsights.com" },
      { label: "Unpkg CDN", value: "https://unpkg.com" },
      { label: "CDNJS", value: "https://cdnjs.cloudflare.com" },
    ],
    category: "scripts-styles",
  },
  {
    key: "script-src-elem",
    label: "script-src-elem",
    description: "Applies specifically to <script> elements (overriding script-src).",
    defaultKeywords: [],
    recommendedKeywords: [],
    popularSuggestions: [
      { label: "Self Only", value: "'self'" },
      { label: "Google Tag Manager", value: "https://www.googletagmanager.com" },
    ],
    category: "scripts-styles",
  },
  {
    key: "style-src",
    label: "style-src",
    description: "Restricts valid origins for stylesheets and CSS styles.",
    defaultKeywords: ["'self'", "'unsafe-inline'"],
    recommendedKeywords: ["'self'", "'unsafe-inline'"],
    popularSuggestions: [
      { label: "Google Fonts CSS", value: "https://fonts.googleapis.com" },
      { label: "Typekit / Adobe Fonts", value: "https://use.typekit.net" },
      { label: "Bootstrap CDN", value: "https://cdn.jsdelivr.net" },
    ],
    category: "scripts-styles",
  },
  {
    key: "style-src-elem",
    label: "style-src-elem",
    description: "Applies specifically to <style> and <link rel='stylesheet'> elements.",
    defaultKeywords: [],
    recommendedKeywords: [],
    popularSuggestions: [
      { label: "Self & Inline", value: "'self' 'unsafe-inline'" },
      { label: "Google Fonts", value: "https://fonts.googleapis.com" },
    ],
    category: "scripts-styles",
  },
  {
    key: "img-src",
    label: "img-src",
    description: "Governs origins for images, favicons, and SVG media.",
    defaultKeywords: ["'self'", "data:", "https:"],
    recommendedKeywords: ["'self'", "data:", "https:"],
    popularSuggestions: [
      { label: "Unsplash", value: "https://images.unsplash.com" },
      { label: "Gravatar", value: "https://*.gravatar.com" },
      { label: "AWS S3", value: "https://*.s3.amazonaws.com" },
      { label: "Cloudinary", value: "https://res.cloudinary.com" },
      { label: "Google Analytics Pixel", value: "https://www.google-analytics.com" },
    ],
    category: "media-connect",
  },
  {
    key: "connect-src",
    label: "connect-src",
    description: "Restricts fetch(), XMLHttpRequest, WebSocket (ws://, wss://), and EventSource.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [
      { label: "Google Analytics 4", value: "https://*.google-analytics.com" },
      { label: "Stripe API", value: "https://api.stripe.com" },
      { label: "Sentry Error Monitoring", value: "https://*.ingest.sentry.io" },
      { label: "PostHog Analytics", value: "https://*.posthog.com" },
      { label: "Supabase Backend", value: "https://*.supabase.co" },
      { label: "Local WebSockets (HMR)", value: "ws://localhost:* wss://localhost:*" },
    ],
    category: "media-connect",
  },
  {
    key: "font-src",
    label: "font-src",
    description: "Governs web fonts loaded via @font-face.",
    defaultKeywords: ["'self'", "data:"],
    recommendedKeywords: ["'self'", "data:"],
    popularSuggestions: [
      { label: "Google Fonts (GStatic)", value: "https://fonts.gstatic.com" },
      { label: "Bunny Fonts CDN", value: "https://fonts.bunny.net" },
      { label: "Adobe Typekit Fonts", value: "https://use.typekit.net" },
    ],
    category: "media-connect",
  },
  {
    key: "frame-src",
    label: "frame-src",
    description: "Defines valid URLs that can be embedded in <iframe> or <frame> elements.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [
      { label: "YouTube Embeds", value: "https://www.youtube.com" },
      { label: "Vimeo Videos", value: "https://player.vimeo.com" },
      { label: "Stripe Checkout", value: "https://js.stripe.com https://checkout.stripe.com" },
      { label: "Loom Video Embeds", value: "https://www.loom.com" },
    ],
    category: "framing-nav",
  },
  {
    key: "child-src",
    label: "child-src",
    description: "Fallback for web workers and framed documents (deprecated in favor of frame-src / worker-src).",
    defaultKeywords: [],
    recommendedKeywords: [],
    popularSuggestions: [{ label: "Self Only", value: "'self'" }, { label: "Blobs", value: "blob:" }],
    category: "framing-nav",
  },
  {
    key: "object-src",
    label: "object-src",
    description: "Restricts legacy plugins (Flash, Java applets). Recommended: 'none'.",
    defaultKeywords: ["'none'"],
    recommendedKeywords: ["'none'"],
    popularSuggestions: [{ label: "Strict None (Recommended)", value: "'none'" }],
    category: "core",
  },
  {
    key: "base-uri",
    label: "base-uri",
    description: "Restricts URLs that can appear in document's <base> tag to prevent base-tag hijacking.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [{ label: "Self Only (Recommended)", value: "'self'" }],
    category: "framing-nav",
  },
  {
    key: "form-action",
    label: "form-action",
    description: "Restricts target endpoints for HTML <form> action submissions.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [
      { label: "Self Only (Recommended)", value: "'self'" },
      { label: "Stripe Form Endpoints", value: "https://*.stripe.com" },
    ],
    category: "framing-nav",
  },
  {
    key: "frame-ancestors",
    label: "frame-ancestors",
    description: "Modern replacement for X-Frame-Options: specifies valid parents embedding this site.",
    defaultKeywords: ["'none'"],
    recommendedKeywords: ["'none'"],
    popularSuggestions: [
      { label: "None (Block all framing)", value: "'none'" },
      { label: "Self (Same-origin framing)", value: "'self'" },
      { label: "Custom Partner Domain", value: "https://*.partnerapp.com" },
    ],
    category: "framing-nav",
  },
  {
    key: "media-src",
    label: "media-src",
    description: "Governs audio, video, and text tracks loaded via <audio>, <video>, or <track>.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [
      { label: "Self & Data", value: "'self' data:" },
      { label: "AWS S3 / CloudFront", value: "https://*.cloudfront.net" },
    ],
    category: "advanced",
  },
  {
    key: "manifest-src",
    label: "manifest-src",
    description: "Specifies valid URLs for Progressive Web App (PWA) manifest.json files.",
    defaultKeywords: ["'self'"],
    recommendedKeywords: ["'self'"],
    popularSuggestions: [{ label: "Self Only", value: "'self'" }],
    category: "advanced",
  },
  {
    key: "worker-src",
    label: "worker-src",
    description: "Governs valid sources for Worker, SharedWorker, or ServiceWorker scripts.",
    defaultKeywords: ["'self'", "blob:"],
    recommendedKeywords: ["'self'", "blob:"],
    popularSuggestions: [
      { label: "Self & Blob", value: "'self' blob:" },
      { label: "None", value: "'none'" },
    ],
    category: "advanced",
  },
];

const STANDARD_KEYWORDS = [
  { token: "'self'", label: "'self'", desc: "Same origin" },
  { token: "'unsafe-inline'", label: "'unsafe-inline'", desc: "Inline code / styles" },
  { token: "'unsafe-eval'", label: "'unsafe-eval'", desc: "eval() / dynamic execution" },
  { token: "'none'", label: "'none'", desc: "Block all sources" },
  { token: "https:", label: "https:", desc: "Any HTTPS host" },
  { token: "data:", label: "data:", desc: "Data URIs (base64)" },
  { token: "blob:", label: "blob:", desc: "Blob URLs" },
  { token: "'strict-dynamic'", label: "'strict-dynamic'", desc: "Trust child scripts" },
  { token: "'wasm-unsafe-eval'", label: "'wasm-unsafe-eval'", desc: "WebAssembly" },
  { token: "http:", label: "http:", desc: "HTTP (Dev only)" },
  { token: "ws:", label: "ws:", desc: "WebSockets (Dev)" },
  { token: "wss:", label: "wss:", desc: "Secure WebSockets" },
];

// Initial default state
const INITIAL_DIRECTIVES: CspDirectivesState = {
  "default-src": { enabled: true, keywords: ["'self'"], customSources: [] },
  "script-src": { enabled: true, keywords: ["'self'"], customSources: [] },
  "script-src-elem": { enabled: false, keywords: [], customSources: [] },
  "style-src": { enabled: true, keywords: ["'self'", "'unsafe-inline'"], customSources: [] },
  "style-src-elem": { enabled: false, keywords: [], customSources: [] },
  "img-src": { enabled: true, keywords: ["'self'", "data:", "https:"], customSources: [] },
  "connect-src": { enabled: true, keywords: ["'self'"], customSources: [] },
  "font-src": { enabled: true, keywords: ["'self'", "data:"], customSources: [] },
  "frame-src": { enabled: true, keywords: ["'self'"], customSources: [] },
  "child-src": { enabled: false, keywords: [], customSources: [] },
  "object-src": { enabled: true, keywords: ["'none'"], customSources: [] },
  "base-uri": { enabled: true, keywords: ["'self'"], customSources: [] },
  "form-action": { enabled: true, keywords: ["'self'"], customSources: [] },
  "frame-ancestors": { enabled: true, keywords: ["'none'"], customSources: [] },
  "media-src": { enabled: false, keywords: ["'self'"], customSources: [] },
  "manifest-src": { enabled: true, keywords: ["'self'"], customSources: [] },
  "worker-src": { enabled: false, keywords: ["'self'", "blob:"], customSources: [] },
};

const INITIAL_HEADERS: SecurityHeadersState = {
  hsts: {
    enabled: true,
    maxAge: 63072000, // 2 years
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: "DENY",
  xContentTypeOptions: true,
  referrerPolicy: "strict-origin-when-cross-origin",
  permissionsPolicy: {
    enabled: true,
    camera: "()",
    microphone: "()",
    geolocation: "()",
    interestCohort: "()",
    payment: "()",
    usb: "()",
    fullscreen: "(self)",
    displayCapture: "()",
    accelerometer: "()",
    gyroscope: "()",
    magnetometer: "()",
  },
  crossOriginOpenerPolicy: "same-origin",
  crossOriginEmbedderPolicy: "disabled",
  crossOriginResourcePolicy: "same-origin",
  xXssProtection: "0",
};

export function CspHeaderBuilder({ toolSlug = "csp-header-builder", toolName = "Content Security Policy (CSP) & Header Builder" }: CspHeaderBuilderProps) {
  // State
  const [activeTab, setActiveTab] = useState<MainTab>("csp");
  const [outputTab, setOutputTab] = useState<OutputTab>("raw");
  const [directives, setDirectives] = useState<CspDirectivesState>(INITIAL_DIRECTIVES);
  const [headers, setHeaders] = useState<SecurityHeadersState>(INITIAL_HEADERS);

  // Global CSP Flags
  const [upgradeInsecureRequests, setUpgradeInsecureRequests] = useState<boolean>(true);
  const [blockAllMixedContent, setBlockAllMixedContent] = useState<boolean>(true);
  const [reportOnly, setReportOnly] = useState<boolean>(false);
  const [reportUri, setReportUri] = useState<string>("");

  // Input states for custom domain tags
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
  const [expandedDirectives, setExpandedDirectives] = useState<Record<string, boolean>>({
    "default-src": true,
    "script-src": true,
    "style-src": true,
    "img-src": true,
    "connect-src": true,
    "font-src": true,
    "object-src": true,
    "frame-ancestors": true,
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [presetAppliedMessage, setPresetAppliedMessage] = useState<string | null>(null);

  // Toggle accordion expand
  const toggleExpand = useCallback((key: string) => {
    setExpandedDirectives((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Preset Handlers
  const applyStrictNextJsPreset = useCallback(() => {
    setDirectives({
      "default-src": { enabled: true, keywords: ["'self'"], customSources: [] },
      "script-src": { enabled: true, keywords: ["'self'"], customSources: [] },
      "script-src-elem": { enabled: false, keywords: [], customSources: [] },
      "style-src": { enabled: true, keywords: ["'self'", "'unsafe-inline'"], customSources: [] },
      "style-src-elem": { enabled: false, keywords: [], customSources: [] },
      "img-src": { enabled: true, keywords: ["'self'", "data:", "https:"], customSources: [] },
      "connect-src": { enabled: true, keywords: ["'self'"], customSources: [] },
      "font-src": { enabled: true, keywords: ["'self'", "data:"], customSources: [] },
      "frame-src": { enabled: true, keywords: ["'self'"], customSources: [] },
      "child-src": { enabled: false, keywords: [], customSources: [] },
      "object-src": { enabled: true, keywords: ["'none'"], customSources: [] },
      "base-uri": { enabled: true, keywords: ["'self'"], customSources: [] },
      "form-action": { enabled: true, keywords: ["'self'"], customSources: [] },
      "frame-ancestors": { enabled: true, keywords: ["'none'"], customSources: [] },
      "media-src": { enabled: false, keywords: ["'self'"], customSources: [] },
      "manifest-src": { enabled: true, keywords: ["'self'"], customSources: [] },
      "worker-src": { enabled: false, keywords: ["'self'", "blob:"], customSources: [] },
    });
    setHeaders({
      hsts: { enabled: true, maxAge: 63072000, includeSubDomains: true, preload: true },
      xFrameOptions: "DENY",
      xContentTypeOptions: true,
      referrerPolicy: "strict-origin-when-cross-origin",
      permissionsPolicy: {
        enabled: true,
        camera: "()",
        microphone: "()",
        geolocation: "()",
        interestCohort: "()",
        payment: "()",
        usb: "()",
        fullscreen: "(self)",
        displayCapture: "()",
        accelerometer: "()",
        gyroscope: "()",
        magnetometer: "()",
      },
      crossOriginOpenerPolicy: "same-origin",
      crossOriginEmbedderPolicy: "disabled",
      crossOriginResourcePolicy: "same-origin",
      xXssProtection: "0",
    });
    setUpgradeInsecureRequests(true);
    setBlockAllMixedContent(true);
    setReportOnly(false);
    setPresetAppliedMessage("Strict Next.js & React Preset applied successfully!");
    setTimeout(() => setPresetAppliedMessage(null), 3000);
  }, []);

  const applyGoogleAnalyticsPreset = useCallback(() => {
    setDirectives((prev) => ({
      ...prev,
      "default-src": { enabled: true, keywords: ["'self'"], customSources: [] },
      "script-src": {
        enabled: true,
        keywords: ["'self'", "'unsafe-inline'"],
        customSources: [
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://*.googletagmanager.com",
        ],
      },
      "img-src": {
        enabled: true,
        keywords: ["'self'", "data:", "https:"],
        customSources: [
          "https://www.google-analytics.com",
          "https://www.googletagmanager.com",
          "https://*.google-analytics.com",
          "https://*.analytics.google.com",
        ],
      },
      "connect-src": {
        enabled: true,
        keywords: ["'self'"],
        customSources: [
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://*.analytics.google.com",
          "https://region1.google-analytics.com",
        ],
      },
      "style-src": {
        enabled: true,
        keywords: ["'self'", "'unsafe-inline'"],
        customSources: ["https://fonts.googleapis.com"],
      },
      "font-src": {
        enabled: true,
        keywords: ["'self'", "data:"],
        customSources: ["https://fonts.gstatic.com"],
      },
      "object-src": { enabled: true, keywords: ["'none'"], customSources: [] },
    }));
    setPresetAppliedMessage("Google Analytics & GTM Origins injected into CSP!");
    setTimeout(() => setPresetAppliedMessage(null), 3000);
  }, []);

  const applyStripePreset = useCallback(() => {
    setDirectives((prev) => ({
      ...prev,
      "script-src": {
        enabled: true,
        keywords: Array.from(new Set([...prev["script-src"].keywords, "'self'"])),
        customSources: Array.from(
          new Set([...prev["script-src"].customSources, "https://js.stripe.com", "https://checkout.stripe.com"])
        ),
      },
      "frame-src": {
        enabled: true,
        keywords: Array.from(new Set([...prev["frame-src"].keywords, "'self'"])),
        customSources: Array.from(
          new Set([
            ...prev["frame-src"].customSources,
            "https://js.stripe.com",
            "https://hooks.stripe.com",
            "https://checkout.stripe.com",
          ])
        ),
      },
      "connect-src": {
        enabled: true,
        keywords: Array.from(new Set([...prev["connect-src"].keywords, "'self'"])),
        customSources: Array.from(
          new Set([
            ...prev["connect-src"].customSources,
            "https://api.stripe.com",
            "https://checkout.stripe.com",
            "https://m.stripe.network",
          ])
        ),
      },
      "img-src": {
        enabled: true,
        keywords: Array.from(new Set([...prev["img-src"].keywords, "'self'", "data:", "https:"])),
        customSources: Array.from(new Set([...prev["img-src"].customSources, "https://*.stripe.com"])),
      },
      "frame-ancestors": {
        enabled: true,
        keywords: ["'self'"],
        customSources: [],
      },
    }));
    setHeaders((prev) => ({
      ...prev,
      permissionsPolicy: {
        ...prev.permissionsPolicy,
        enabled: true,
        payment: "(self)",
      },
    }));
    setPresetAppliedMessage("Stripe Checkout & Payment origins configured!");
    setTimeout(() => setPresetAppliedMessage(null), 3000);
  }, []);

  const applyDevPreset = useCallback(() => {
    setDirectives({
      "default-src": { enabled: true, keywords: ["'self'", "http:", "https:", "data:", "blob:"], customSources: [] },
      "script-src": {
        enabled: true,
        keywords: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "http:", "https:"],
        customSources: ["localhost:*", "ws://localhost:*", "wss://localhost:*"],
      },
      "script-src-elem": { enabled: false, keywords: [], customSources: [] },
      "style-src": { enabled: true, keywords: ["'self'", "'unsafe-inline'", "http:", "https:"], customSources: [] },
      "style-src-elem": { enabled: false, keywords: [], customSources: [] },
      "img-src": { enabled: true, keywords: ["'self'", "data:", "blob:", "http:", "https:"], customSources: [] },
      "connect-src": {
        enabled: true,
        keywords: ["'self'", "http:", "https:", "ws:", "wss:"],
        customSources: ["localhost:*", "http://localhost:*", "ws://localhost:*"],
      },
      "font-src": { enabled: true, keywords: ["'self'", "data:", "http:", "https:"], customSources: [] },
      "frame-src": { enabled: true, keywords: ["'self'", "http:", "https:"], customSources: [] },
      "child-src": { enabled: false, keywords: [], customSources: [] },
      "object-src": { enabled: true, keywords: ["'none'"], customSources: [] },
      "base-uri": { enabled: true, keywords: ["'self'"], customSources: [] },
      "form-action": { enabled: true, keywords: ["'self'"], customSources: [] },
      "frame-ancestors": { enabled: true, keywords: ["'self'"], customSources: [] },
      "media-src": { enabled: false, keywords: ["'self'"], customSources: [] },
      "manifest-src": { enabled: true, keywords: ["'self'"], customSources: [] },
      "worker-src": { enabled: false, keywords: ["'self'", "blob:"], customSources: [] },
    });
    setHeaders((prev) => ({
      ...prev,
      hsts: { ...prev.hsts, enabled: false },
      xFrameOptions: "SAMEORIGIN",
    }));
    setUpgradeInsecureRequests(false);
    setBlockAllMixedContent(false);
    setReportOnly(true);
    setPresetAppliedMessage("Permissive Dev & HMR Staging Preset applied!");
    setTimeout(() => setPresetAppliedMessage(null), 3000);
  }, []);

  const resetToDefault = useCallback(() => {
    setDirectives(INITIAL_DIRECTIVES);
    setHeaders(INITIAL_HEADERS);
    setUpgradeInsecureRequests(true);
    setBlockAllMixedContent(true);
    setReportOnly(false);
    setReportUri("");
    setPresetAppliedMessage("Reset all directives and headers to defaults.");
    setTimeout(() => setPresetAppliedMessage(null), 3000);
  }, []);

  // Keyword token toggle
  const toggleKeyword = useCallback((directiveKey: keyof CspDirectivesState, token: string) => {
    setDirectives((prev) => {
      const current = prev[directiveKey];
      const hasToken = current.keywords.includes(token);

      // Mutually exclusive handling: 'none' clears other keywords
      let nextKeywords: string[];
      if (token === "'none'") {
        nextKeywords = hasToken ? [] : ["'none'"];
      } else {
        const withoutNone = current.keywords.filter((k) => k !== "'none'");
        nextKeywords = hasToken ? withoutNone.filter((k) => k !== token) : [...withoutNone, token];
      }

      return {
        ...prev,
        [directiveKey]: {
          ...current,
          enabled: true,
          keywords: nextKeywords,
        },
      };
    });
  }, []);

  // Custom domain addition
  const addCustomSource = useCallback((directiveKey: keyof CspDirectivesState, rawValue: string) => {
    const trimmed = rawValue.trim();
    if (!trimmed) return;

    // Handle space-separated tokens pasted together
    const tokens = trimmed.split(/\s+/).filter(Boolean);

    setDirectives((prev) => {
      const current = prev[directiveKey];
      const existing = new Set(current.customSources);
      tokens.forEach((t) => existing.add(t));

      // Remove 'none' keyword if present
      const cleanedKeywords = current.keywords.filter((k) => k !== "'none'");

      return {
        ...prev,
        [directiveKey]: {
          ...current,
          enabled: true,
          keywords: cleanedKeywords,
          customSources: Array.from(existing),
        },
      };
    });

    setCustomInputs((prev) => ({ ...prev, [directiveKey]: "" }));
  }, []);

  const removeCustomSource = useCallback((directiveKey: keyof CspDirectivesState, source: string) => {
    setDirectives((prev) => {
      const current = prev[directiveKey];
      return {
        ...prev,
        [directiveKey]: {
          ...current,
          customSources: current.customSources.filter((s) => s !== source),
        },
      };
    });
  }, []);

  const toggleDirectiveEnabled = useCallback((directiveKey: keyof CspDirectivesState) => {
    setDirectives((prev) => ({
      ...prev,
      [directiveKey]: {
        ...prev[directiveKey],
        enabled: !prev[directiveKey].enabled,
      },
    }));
  }, []);

  // Generate Raw CSP Header String
  const cspHeaderString = useMemo(() => {
    const parts: string[] = [];

    // Directives
    DIRECTIVES_LIST.forEach(({ key }) => {
      const dir = directives[key];
      if (!dir.enabled) return;

      const sources = [...dir.keywords, ...dir.customSources];
      if (sources.length > 0) {
        parts.push(`${key} ${sources.join(" ")}`);
      }
    });

    if (upgradeInsecureRequests) {
      parts.push("upgrade-insecure-requests");
    }
    if (blockAllMixedContent) {
      parts.push("block-all-mixed-content");
    }
    if (reportUri.trim()) {
      parts.push(`report-uri ${reportUri.trim()}`);
    }

    return parts.join("; ");
  }, [directives, upgradeInsecureRequests, blockAllMixedContent, reportUri]);

  const cspHeaderName = reportOnly ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy";

  // Generate Additional Headers String / Array
  const additionalHeadersList = useMemo(() => {
    const list: { key: string; value: string }[] = [];

    // HSTS
    if (headers.hsts.enabled) {
      let val = `max-age=${headers.hsts.maxAge}`;
      if (headers.hsts.includeSubDomains) val += "; includeSubDomains";
      if (headers.hsts.preload) val += "; preload";
      list.push({ key: "Strict-Transport-Security", value: val });
    }

    // X-Content-Type-Options
    if (headers.xContentTypeOptions) {
      list.push({ key: "X-Content-Type-Options", value: "nosniff" });
    }

    // X-Frame-Options
    if (headers.xFrameOptions !== "disabled") {
      list.push({ key: "X-Frame-Options", value: headers.xFrameOptions });
    }

    // Referrer-Policy
    if (headers.referrerPolicy !== "disabled") {
      list.push({ key: "Referrer-Policy", value: headers.referrerPolicy });
    }

    // Permissions-Policy
    if (headers.permissionsPolicy.enabled) {
      const p = headers.permissionsPolicy;
      const permParts: string[] = [];
      if (p.camera !== "disabled") permParts.push(`camera=${p.camera}`);
      if (p.microphone !== "disabled") permParts.push(`microphone=${p.microphone}`);
      if (p.geolocation !== "disabled") permParts.push(`geolocation=${p.geolocation}`);
      if (p.interestCohort !== "disabled") permParts.push(`interest-cohort=${p.interestCohort}`);
      if (p.payment !== "disabled") permParts.push(`payment=${p.payment}`);
      if (p.usb !== "disabled") permParts.push(`usb=${p.usb}`);
      if (p.fullscreen !== "disabled") permParts.push(`fullscreen=${p.fullscreen}`);
      if (p.displayCapture !== "disabled") permParts.push(`display-capture=${p.displayCapture}`);
      if (p.accelerometer !== "disabled") permParts.push(`accelerometer=${p.accelerometer}`);
      if (p.gyroscope !== "disabled") permParts.push(`gyroscope=${p.gyroscope}`);
      if (p.magnetometer !== "disabled") permParts.push(`magnetometer=${p.magnetometer}`);

      if (permParts.length > 0) {
        list.push({ key: "Permissions-Policy", value: permParts.join(", ") });
      }
    }

    // COOP
    if (headers.crossOriginOpenerPolicy !== "disabled") {
      list.push({ key: "Cross-Origin-Opener-Policy", value: headers.crossOriginOpenerPolicy });
    }

    // COEP
    if (headers.crossOriginEmbedderPolicy !== "disabled") {
      list.push({ key: "Cross-Origin-Embedder-Policy", value: headers.crossOriginEmbedderPolicy });
    }

    // CORP
    if (headers.crossOriginResourcePolicy !== "disabled") {
      list.push({ key: "Cross-Origin-Resource-Policy", value: headers.crossOriginResourcePolicy });
    }

    // X-XSS-Protection
    if (headers.xXssProtection !== "disabled") {
      list.push({ key: "X-XSS-Protection", value: headers.xXssProtection });
    }

    return list;
  }, [headers]);

  // Combined Headers List (CSP + Security Headers)
  const allHeadersList = useMemo(() => {
    return [{ key: cspHeaderName, value: cspHeaderString }, ...additionalHeadersList];
  }, [cspHeaderName, cspHeaderString, additionalHeadersList]);

  // Real-Time Security Linter & Audits
  const linterDiagnostics = useMemo(() => {
    const issues: {
      type: "critical" | "warning" | "passed";
      title: string;
      desc: string;
    }[] = [];

    let score = 100;

    // 1. Check default-src
    const defaultSrc = directives["default-src"];
    if (!defaultSrc.enabled || (defaultSrc.keywords.length === 0 && defaultSrc.customSources.length === 0)) {
      issues.push({
        type: "critical",
        title: "Missing default-src Fallback",
        desc: "Without default-src, any unconfigured directive (e.g. connect-src, worker-src) falls back to unrestricted loading.",
      });
      score -= 20;
    } else {
      issues.push({
        type: "passed",
        title: "default-src Defined",
        desc: "Fallback baseline origin is active.",
      });
    }

    // 2. Check script-src for unsafe-inline and unsafe-eval
    const scriptSrc = directives["script-src"];
    if (scriptSrc.enabled && scriptSrc.keywords.includes("'unsafe-inline'")) {
      issues.push({
        type: "critical",
        title: "'unsafe-inline' in script-src",
        desc: "Permits execution of inline <script> tags, creating high vulnerability to Cross-Site Scripting (XSS) attacks. Consider using nonces or hashes.",
      });
      score -= 25;
    }
    if (scriptSrc.enabled && scriptSrc.keywords.includes("'unsafe-eval'")) {
      issues.push({
        type: "warning",
        title: "'unsafe-eval' in script-src",
        desc: "Allows string-to-code execution (eval, Function constructor). Restrict to local dev environments only.",
      });
      score -= 10;
    }
    if (scriptSrc.enabled && !scriptSrc.keywords.includes("'unsafe-inline'") && !scriptSrc.keywords.includes("'unsafe-eval'")) {
      issues.push({
        type: "passed",
        title: "Strict JavaScript Execution Policy",
        desc: "script-src disallows unsafe inline script execution and dynamic eval.",
      });
    }

    // 3. Check object-src
    const objectSrc = directives["object-src"];
    if (!objectSrc.enabled || !objectSrc.keywords.includes("'none'")) {
      issues.push({
        type: "critical",
        title: "object-src Not Set to 'none'",
        desc: "Allows browser plugins (Flash, Java Applets). Enforcing object-src 'none' is standard modern hardening.",
      });
      score -= 15;
    } else {
      issues.push({
        type: "passed",
        title: "object-src 'none' Active",
        desc: "Plugin execution vectors are completely blocked.",
      });
    }

    // 4. Check frame-ancestors & X-Frame-Options
    const frameAncestors = directives["frame-ancestors"];
    if (!frameAncestors.enabled || frameAncestors.keywords.length === 0) {
      if (headers.xFrameOptions === "disabled") {
        issues.push({
          type: "warning",
          title: "Clickjacking Protection Incomplete",
          desc: "Neither frame-ancestors nor X-Frame-Options is active. Other sites can embed your page inside <iframe> elements.",
        });
        score -= 15;
      }
    } else {
      issues.push({
        type: "passed",
        title: "Clickjacking Protection Configured",
        desc: `frame-ancestors restricts parent framing to [${frameAncestors.keywords.join(" ")}].`,
      });
    }

    // 5. Check HSTS
    if (!headers.hsts.enabled) {
      issues.push({
        type: "warning",
        title: "HSTS Header Disabled",
        desc: "Strict-Transport-Security prevents SSL-stripping and man-in-the-middle downgrade attacks.",
      });
      score -= 10;
    } else {
      if (headers.hsts.maxAge >= 31536000 && headers.hsts.includeSubDomains && headers.hsts.preload) {
        issues.push({
          type: "passed",
          title: "HSTS Preload Ready",
          desc: "Meets all criteria for Google Chrome & Firefox HSTS Preload list (>= 1 year + subdomains + preload).",
        });
      } else {
        issues.push({
          type: "warning",
          title: "HSTS Suboptimal for Preload",
          desc: "For official hstspreload.org submission, set max-age to at least 31536000 (1 year), enable subdomains, and enable preload.",
        });
        score -= 5;
      }
    }

    // 6. Check nosniff
    if (!headers.xContentTypeOptions) {
      issues.push({
        type: "warning",
        title: "X-Content-Type-Options Missing",
        desc: "Without nosniff, browsers may execute text files containing malicious script payloads as JavaScript.",
      });
      score -= 5;
    } else {
      issues.push({
        type: "passed",
        title: "MIME-Sniffing Blocked (nosniff)",
        desc: "X-Content-Type-Options nosniff is actively enforced.",
      });
    }

    // 7. Domain syntax check
    let hasDomainSyntaxIssue = false;
    Object.entries(directives).forEach(([key, dir]) => {
      (dir.customSources as string[]).forEach((src: string) => {
        if (src.startsWith("http//") || src.startsWith("https//")) {
          hasDomainSyntaxIssue = true;
          issues.push({
            type: "warning",
            title: `Syntax Typo in ${key}`,
            desc: `Invalid protocol syntax "${src}". Did you mean "https://${src.replace(/^(http|https)\/\//, "")}"?`,
          });
          score -= 5;
        }
      });
    });

    // 8. Permissions Policy
    if (headers.permissionsPolicy.enabled) {
      issues.push({
        type: "passed",
        title: "Permissions-Policy Active",
        desc: "Hardware API sensor permissions (camera, mic, geolocation) are locked down.",
      });
    }

    const finalScore = Math.max(0, Math.min(100, score));
    let grade = "A+";
    let gradeColor = "text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
    if (finalScore >= 90) {
      grade = "A+";
    } else if (finalScore >= 80) {
      grade = "A";
      gradeColor = "text-emerald-500 border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40";
    } else if (finalScore >= 70) {
      grade = "B";
      gradeColor = "text-blue-500 border-blue-400 bg-blue-50 dark:bg-blue-950/40";
    } else if (finalScore >= 55) {
      grade = "C";
      gradeColor = "text-amber-500 border-amber-400 bg-amber-50 dark:bg-amber-950/40";
    } else {
      grade = "F";
      gradeColor = "text-rose-500 border-rose-400 bg-rose-50 dark:bg-rose-950/40";
    }

    return {
      score: finalScore,
      grade,
      gradeColor,
      issues,
    };
  }, [directives, headers]);

  // Multi-Format Code Generation
  const generatedCode = useMemo(() => {
    switch (outputTab) {
      case "raw": {
        return allHeadersList.map((h) => `${h.key}: ${h.value}`).join("\n");
      }
      case "nextjs-config": {
        const headerEntries = allHeadersList
          .map(
            (h) => `          {
            key: '${h.key}',
            value: ${JSON.stringify(h.value)},
          },`
          )
          .join("\n");

        return `// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/:path*',
        headers: [
${headerEntries}
        ],
      },
    ];
  },
};

export default nextConfig;`;
      }
      case "nextjs-middleware": {
        return `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Generate a cryptographically secure random nonce per request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  // Dynamic CSP with Nonce Support
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-\${nonce}';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  \`.replace(/\\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('${cspHeaderName}', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Attach Security Headers to Response
  response.headers.set('${cspHeaderName}', cspHeader);
${additionalHeadersList.map((h) => `  response.headers.set('${h.key}', ${JSON.stringify(h.value)});`).join("\n")}

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files, _next, favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`;
      }
      case "vercel": {
        const vercelObj = {
          headers: [
            {
              source: "/(.*)",
              headers: allHeadersList.map((h) => ({
                key: h.key,
                value: h.value,
              })),
            },
          ],
        };
        return JSON.stringify(vercelObj, null, 2);
      }
      case "nginx": {
        const lines = ["# HTTP Security Headers & CSP Configuration", "# Place inside your server { ... } block"];
        allHeadersList.forEach((h) => {
          // Escape quotes in header value for Nginx
          const escaped = h.value.replace(/"/g, '\\"');
          lines.push(`add_header ${h.key} "${escaped}" always;`);
        });
        return lines.join("\n");
      }
      case "cloudflare": {
        const lines = ["# Cloudflare Pages / Workers _headers file", "/*"];
        allHeadersList.forEach((h) => {
          lines.push(`  ${h.key}: ${h.value}`);
        });
        return lines.join("\n");
      }
      case "apache": {
        const lines = [
          "# Apache .htaccess Security Headers Configuration",
          "<IfModule mod_headers.c>",
        ];
        allHeadersList.forEach((h) => {
          const escaped = h.value.replace(/"/g, '\\"');
          lines.push(`  Header always set ${h.key} "${escaped}"`);
        });
        lines.push("</IfModule>");
        return lines.join("\n");
      }
      case "html-meta": {
        const metaTag = `<meta http-equiv="${cspHeaderName}" content="${cspHeaderString.replace(/"/g, "&quot;")}" />`;
        const note = `<!-- 
  NOTE: Directives like frame-ancestors, report-uri, and sandbox cannot 
  be enforced via HTML <meta> tags. For complete security, set HTTP headers on your web server.
-->\n`;
        return note + metaTag;
      }
      default:
        return "";
    }
  }, [outputTab, allHeadersList, cspHeaderName, cspHeaderString, additionalHeadersList]);

  // Copy Snippet
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedCode]);

  // Download Config File
  const handleDownload = useCallback(() => {
    let filename = "security-headers.txt";
    let mimeType = "text/plain";

    switch (outputTab) {
      case "nextjs-config":
        filename = "next.config.mjs";
        mimeType = "application/javascript";
        break;
      case "nextjs-middleware":
        filename = "middleware.ts";
        mimeType = "application/typescript";
        break;
      case "vercel":
        filename = "vercel.json";
        mimeType = "application/json";
        break;
      case "nginx":
        filename = "security-headers.conf";
        mimeType = "text/plain";
        break;
      case "cloudflare":
        filename = "_headers";
        mimeType = "text/plain";
        break;
      case "apache":
        filename = ".htaccess";
        mimeType = "text/plain";
        break;
      case "html-meta":
        filename = "csp-meta.html";
        mimeType = "text/html";
        break;
      default:
        filename = "csp-headers.txt";
        mimeType = "text/plain";
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
  }, [outputTab, generatedCode]);

  return (
    <div className="space-y-8">
      {/* Top Presets Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                One-Click Quick Presets
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Apply production-tested policies for Next.js, Google Analytics, Stripe, or local dev environments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={applyStrictNextJsPreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Strict Next.js / React
            </button>
            <button
              onClick={applyGoogleAnalyticsPreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              Google Analytics & GTM
            </button>
            <button
              onClick={applyStripePreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              <Lock className="h-3.5 w-3.5 text-indigo-500" />
              Stripe Payments
            </button>
            <button
              onClick={applyDevPreset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              <Terminal className="h-3.5 w-3.5 text-sky-500" />
              Permissive Dev / HMR
            </button>
            <button
              onClick={resetToDefault}
              title="Reset all settings to default"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {presetAppliedMessage && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 px-3 py-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{presetAppliedMessage}</span>
          </div>
        )}
      </div>

      {/* Main Dual-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Tab Switcher */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("csp")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors border-b-2",
                activeTab === "csp"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <ShieldCheck className="h-4 w-4" />
              CSP Directives
              <span className="ml-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Level 3
              </span>
            </button>

            <button
              onClick={() => setActiveTab("headers")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors border-b-2",
                activeTab === "headers"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <Lock className="h-4 w-4" />
              Additional Security Headers
              <span className="ml-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                HSTS / Nosniff
              </span>
            </button>
          </div>

          {/* TAB A: CSP DIRECTIVES */}
          {activeTab === "csp" && (
            <div className="space-y-6">
              {/* Global CSP Options Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-500" />
                  Global Enforcement & Reporting Flags
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={upgradeInsecureRequests}
                      onChange={(e) => setUpgradeInsecureRequests(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <div className="text-xs space-y-0.5">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        upgrade-insecure-requests
                      </span>
                      <p className="text-slate-500 dark:text-slate-400 leading-snug">
                        Automatically rewrites insecure HTTP assets to HTTPS before fetching.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={blockAllMixedContent}
                      onChange={(e) => setBlockAllMixedContent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <div className="text-xs space-y-0.5">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        block-all-mixed-content
                      </span>
                      <p className="text-slate-500 dark:text-slate-400 leading-snug">
                        Prevents loading mixed active or passive HTTP content on HTTPS pages.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={reportOnly}
                      onChange={(e) => setReportOnly(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span>Report-Only Mode (Content-Security-Policy-Report-Only)</span>
                  </label>

                  {reportOnly && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                      <Info className="h-3 w-3" /> Violations monitored without blocking
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    report-uri / report-to endpoint URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={reportUri}
                    onChange={(e) => setReportUri(e.target.value)}
                    placeholder="https://endpoint.report-uri.com/r/d/csp/enforce"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Directives Accordion List */}
              <div className="space-y-4">
                {DIRECTIVES_LIST.map((meta) => {
                  const dirState = directives[meta.key];
                  const isExpanded = expandedDirectives[meta.key] ?? false;
                  const currentInput = customInputs[meta.key] || "";

                  return (
                    <div
                      key={meta.key}
                      className={cn(
                        "rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900/60 shadow-sm overflow-hidden",
                        dirState.enabled
                          ? "border-slate-200 dark:border-slate-800"
                          : "border-dashed border-slate-200 dark:border-slate-800 opacity-60"
                      )}
                    >
                      {/* Directive Header */}
                      <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={dirState.enabled}
                            onChange={() => toggleDirectiveEnabled(meta.key)}
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                            id={`toggle-${meta.key}`}
                          />
                          <label
                            htmlFor={`toggle-${meta.key}`}
                            className="text-sm font-bold text-slate-900 dark:text-white font-mono cursor-pointer"
                          >
                            {meta.label}
                          </label>
                          {meta.key === "object-src" && dirState.keywords.includes("'none'") && (
                            <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5">
                              Hardened
                            </span>
                          )}
                          {meta.key === "script-src" && dirState.keywords.includes("'unsafe-inline'") && (
                            <span className="rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[10px] font-bold px-1.5 py-0.5 flex items-center gap-1">
                              <AlertTriangle className="h-2.5 w-2.5" /> unsafe-inline
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => toggleExpand(meta.key)}
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                        >
                          <span className="font-mono text-[11px]">
                            {dirState.enabled
                              ? `${dirState.keywords.length + dirState.customSources.length} source${
                                  dirState.keywords.length + dirState.customSources.length === 1 ? "" : "s"
                                }`
                              : "Disabled"}
                          </span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>

                      {/* Directive Expanded Body */}
                      {isExpanded && (
                        <div className="p-4 space-y-4">
                          <p className="text-xs text-slate-600 dark:text-slate-400">{meta.description}</p>

                          {/* Standard Keyword Chips */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                              Standard Source Tokens
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {STANDARD_KEYWORDS.map((kw) => {
                                const isSelected = dirState.keywords.includes(kw.token);
                                return (
                                  <button
                                    key={kw.token}
                                    type="button"
                                    onClick={() => toggleKeyword(meta.key, kw.token)}
                                    title={kw.desc}
                                    className={cn(
                                      "px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all",
                                      isSelected
                                        ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600"
                                        : "bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    )}
                                  >
                                    {kw.token}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 1-Click Popular CDN / Service Suggestions */}
                          {meta.popularSuggestions.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                Popular Service Presets
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {meta.popularSuggestions.map((sug) => {
                                  return (
                                    <button
                                      key={sug.label}
                                      type="button"
                                      onClick={() => addCustomSource(meta.key, sug.value)}
                                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                      <Plus className="h-3 w-3 text-emerald-500" />
                                      {sug.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Custom Tag Input */}
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                              Custom Domains & Origin Wildcards
                            </span>

                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={currentInput}
                                onChange={(e) =>
                                  setCustomInputs((prev) => ({ ...prev, [meta.key]: e.target.value }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addCustomSource(meta.key, currentInput);
                                  }
                                }}
                                placeholder="e.g. https://api.example.com or *.cdn.com"
                                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => addCustomSource(meta.key, currentInput)}
                                className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-colors"
                              >
                                Add Origin
                              </button>
                            </div>

                            {/* Active Custom Source Chips */}
                            {dirState.customSources.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {dirState.customSources.map((src) => (
                                  <span
                                    key={src}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-900 dark:text-emerald-200"
                                  >
                                    <span>{src}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeCustomSource(meta.key, src)}
                                      className="text-emerald-600 hover:text-rose-600 dark:text-emerald-400 dark:hover:text-rose-400 transition-colors"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB B: ADDITIONAL SECURITY HEADERS */}
          {activeTab === "headers" && (
            <div className="space-y-6">
              {/* 1. Strict-Transport-Security (HSTS) */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={headers.hsts.enabled}
                      onChange={(e) =>
                        setHeaders((prev) => ({
                          ...prev,
                          hsts: { ...prev.hsts, enabled: e.target.checked },
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                      id="toggle-hsts"
                    />
                    <label
                      htmlFor="toggle-hsts"
                      className="text-sm font-bold text-slate-900 dark:text-white cursor-pointer"
                    >
                      Strict-Transport-Security (HSTS)
                    </label>
                  </div>
                  {headers.hsts.enabled && headers.hsts.maxAge >= 31536000 && headers.hsts.preload && (
                    <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> HSTS Preload Eligible
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Forces browsers to connect exclusively over HTTPS, preventing SSL stripping and MITM attacks.
                </p>

                {headers.hsts.enabled && (
                  <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Max-Age Duration
                        </label>
                        <select
                          value={headers.hsts.maxAge}
                          onChange={(e) =>
                            setHeaders((prev) => ({
                              ...prev,
                              hsts: { ...prev.hsts, maxAge: parseInt(e.target.value, 10) },
                            }))
                          }
                          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="63072000">2 Years (63,072,000s) - Recommended</option>
                          <option value="31536000">1 Year (31,536,000s) - Preload Minimum</option>
                          <option value="15552000">6 Months (15,552,000s)</option>
                          <option value="2592000">30 Days (2,592,000s - Testing)</option>
                        </select>
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={headers.hsts.includeSubDomains}
                            onChange={(e) =>
                              setHeaders((prev) => ({
                                ...prev,
                                hsts: { ...prev.hsts, includeSubDomains: e.target.checked },
                              }))
                            }
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                          />
                          <span>includeSubDomains</span>
                        </label>
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={headers.hsts.preload}
                            onChange={(e) =>
                              setHeaders((prev) => ({
                                ...prev,
                                hsts: { ...prev.hsts, preload: e.target.checked },
                              }))
                            }
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                          />
                          <span>preload (hstspreload.org)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. X-Frame-Options & X-Content-Type-Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">X-Frame-Options</span>
                    <span className="text-[10px] text-slate-400">Legacy Clickjacking</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Legacy header for older browsers without CSP frame-ancestors support.
                  </p>
                  <select
                    value={headers.xFrameOptions}
                    onChange={(e) =>
                      setHeaders((prev) => ({ ...prev, xFrameOptions: e.target.value as any }))
                    }
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="DENY">DENY (Block all framing)</option>
                    <option value="SAMEORIGIN">SAMEORIGIN (Same origin only)</option>
                    <option value="disabled">Disabled (Rely on CSP frame-ancestors)</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">X-Content-Type-Options</span>
                    <span className="text-[10px] text-slate-400">MIME Protection</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Blocks MIME-sniffing and forces declared Content-Type execution.
                  </p>
                  <label className="flex items-center gap-2 pt-1 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={headers.xContentTypeOptions}
                      onChange={(e) => setHeaders((prev) => ({ ...prev, xContentTypeOptions: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <span>nosniff (Recommended Active)</span>
                  </label>
                </div>
              </div>

              {/* 3. Referrer-Policy */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Referrer-Policy</span>
                  <span className="text-[10px] text-slate-400">Privacy & Referrer Leakage</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Controls how much origin and URL path metadata is passed in the Referer header on outbound clicks.
                </p>
                <select
                  value={headers.referrerPolicy}
                  onChange={(e) => setHeaders((prev) => ({ ...prev, referrerPolicy: e.target.value as any }))}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin (Modern Standard)</option>
                  <option value="no-referrer">no-referrer (Maximum Privacy)</option>
                  <option value="origin-when-cross-origin">origin-when-cross-origin</option>
                  <option value="same-origin">same-origin</option>
                  <option value="no-referrer-when-downgrade">no-referrer-when-downgrade</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              {/* 4. Permissions-Policy (Feature-Policy) */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={headers.permissionsPolicy.enabled}
                      onChange={(e) =>
                        setHeaders((prev) => ({
                          ...prev,
                          permissionsPolicy: { ...prev.permissionsPolicy, enabled: e.target.checked },
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
                      id="toggle-perm"
                    />
                    <label
                      htmlFor="toggle-perm"
                      className="text-sm font-bold text-slate-900 dark:text-white cursor-pointer"
                    >
                      Permissions-Policy (Hardware & Sensor API Lock)
                    </label>
                  </div>
                  <span className="text-[10px] text-slate-400">Feature Policy</span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Granularly disable or restrict browser APIs like camera, microphone, geolocation, and FLoC tracking.
                </p>

                {headers.permissionsPolicy.enabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">camera</label>
                      <select
                        value={headers.permissionsPolicy.camera}
                        onChange={(e) =>
                          setHeaders((prev) => ({
                            ...prev,
                            permissionsPolicy: { ...prev.permissionsPolicy, camera: e.target.value as any },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                      >
                        <option value="()">() - Blocked</option>
                        <option value="(self)">(self) - Allowed</option>
                        <option value="*">* - Any Origin</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">microphone</label>
                      <select
                        value={headers.permissionsPolicy.microphone}
                        onChange={(e) =>
                          setHeaders((prev) => ({
                            ...prev,
                            permissionsPolicy: { ...prev.permissionsPolicy, microphone: e.target.value as any },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                      >
                        <option value="()">() - Blocked</option>
                        <option value="(self)">(self) - Allowed</option>
                        <option value="*">* - Any Origin</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">geolocation</label>
                      <select
                        value={headers.permissionsPolicy.geolocation}
                        onChange={(e) =>
                          setHeaders((prev) => ({
                            ...prev,
                            permissionsPolicy: { ...prev.permissionsPolicy, geolocation: e.target.value as any },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                      >
                        <option value="()">() - Blocked</option>
                        <option value="(self)">(self) - Allowed</option>
                        <option value="*">* - Any Origin</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">interest-cohort</label>
                      <select
                        value={headers.permissionsPolicy.interestCohort}
                        onChange={(e) =>
                          setHeaders((prev) => ({
                            ...prev,
                            permissionsPolicy: { ...prev.permissionsPolicy, interestCohort: e.target.value as any },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                      >
                        <option value="()">() - Opt Out of FLoC</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">payment</label>
                      <select
                        value={headers.permissionsPolicy.payment}
                        onChange={(e) =>
                          setHeaders((prev) => ({
                            ...prev,
                            permissionsPolicy: { ...prev.permissionsPolicy, payment: e.target.value as any },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                      >
                        <option value="()">() - Blocked</option>
                        <option value="(self)">(self) - Allowed</option>
                        <option value="*">* - Any Origin</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">fullscreen</label>
                      <select
                        value={headers.permissionsPolicy.fullscreen}
                        onChange={(e) =>
                          setHeaders((prev) => ({
                            ...prev,
                            permissionsPolicy: { ...prev.permissionsPolicy, fullscreen: e.target.value as any },
                          }))
                        }
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                      >
                        <option value="(self)">(self) - Allowed</option>
                        <option value="*">* - Any Origin</option>
                        <option value="()">() - Blocked</option>
                        <option value="disabled">Disabled</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Cross-Origin Isolation & Modern Hardening */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                  Cross-Origin Isolation & Modern Hardening (COOP / COEP / CORP)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">
                      Cross-Origin-Opener-Policy (COOP)
                    </label>
                    <select
                      value={headers.crossOriginOpenerPolicy}
                      onChange={(e) => setHeaders((prev) => ({ ...prev, crossOriginOpenerPolicy: e.target.value as any }))}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                    >
                      <option value="same-origin">same-origin</option>
                      <option value="same-origin-allow-popups">same-origin-allow-popups</option>
                      <option value="unsafe-none">unsafe-none</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">
                      Cross-Origin-Resource-Policy (CORP)
                    </label>
                    <select
                      value={headers.crossOriginResourcePolicy}
                      onChange={(e) => setHeaders((prev) => ({ ...prev, crossOriginResourcePolicy: e.target.value as any }))}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                    >
                      <option value="same-origin">same-origin</option>
                      <option value="same-site">same-site</option>
                      <option value="cross-origin">cross-origin</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1 font-mono">
                      X-XSS-Protection
                    </label>
                    <select
                      value={headers.xXssProtection}
                      onChange={(e) => setHeaders((prev) => ({ ...prev, xXssProtection: e.target.value as any }))}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:text-white"
                    >
                      <option value="0">0 (Modern standard - Disables buggy auditors)</option>
                      <option value="1; mode=block">1; mode=block (Legacy)</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Code Exporter & Linter (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          {/* Security Linter Grade Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Security & Compliance Linter
                </h3>
              </div>

              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-xl border text-xl font-extrabold shadow-sm",
                  linterDiagnostics.gradeColor
                )}
              >
                {linterDiagnostics.grade}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Security Hardening Score
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {linterDiagnostics.score}/100
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500 rounded-full",
                    linterDiagnostics.score >= 80
                      ? "bg-emerald-500"
                      : linterDiagnostics.score >= 60
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  )}
                  style={{ width: `${linterDiagnostics.score}%` }}
                />
              </div>
            </div>

            {/* Diagnostic Items */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {linterDiagnostics.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-2.5 rounded-xl border flex items-start gap-2",
                    issue.type === "critical"
                      ? "bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200"
                      : issue.type === "warning"
                      ? "bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200"
                      : "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200"
                  )}
                >
                  {issue.type === "critical" ? (
                    <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  ) : issue.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <span className="font-bold">{issue.title}</span>
                    <p className="text-[11px] leading-snug opacity-90">{issue.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Format Output Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
            {/* Exporter Tabs Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 p-2">
              <div className="flex flex-wrap gap-1">
                {[
                  { id: "raw", label: "Raw Headers" },
                  { id: "nextjs-config", label: "next.config.mjs" },
                  { id: "nextjs-middleware", label: "middleware.ts" },
                  { id: "vercel", label: "vercel.json" },
                  { id: "nginx", label: "Nginx" },
                  { id: "cloudflare", label: "Cloudflare" },
                  { id: "apache", label: "Apache" },
                  { id: "html-meta", label: "HTML <meta>" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setOutputTab(tab.id as OutputTab)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors",
                      outputTab === tab.id
                        ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Display Box */}
            <div className="relative p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed min-h-[300px] max-h-[460px] overflow-auto">
              <pre className="whitespace-pre-wrap break-words">{generatedCode}</pre>
            </div>

            {/* Exporter Footer Actions */}
            <div className="p-3 bg-slate-50/80 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied to Clipboard!" : "Copy Snippet"}
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Config
                </button>
              </div>

              <EmbedBadgeModal
                score={linterDiagnostics.score}
                status={linterDiagnostics.grade === "A+" || linterDiagnostics.grade === "A" ? "Hardened" : "Verified"}
                label="CSP Policy"
                toolSlug="csp-header-builder"
                buttonVariant="compact"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
