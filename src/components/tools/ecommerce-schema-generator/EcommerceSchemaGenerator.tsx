"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ShoppingBag,
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Info,
  Code2,
  Layers,
  Star,
  Truck,
  DollarSign,
  Tag,
  Eye,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";
import {
  EcommerceProductForm,
  ECOMMERCE_PRESETS,
  IdentifierType,
  AvailabilityType,
  ItemConditionType,
  ReturnPolicyCategoryType,
  ReturnMethodType,
  ReturnFeesType,
  validateEcommerceSchema,
  generateEcommerceSnippets,
} from "@/lib/ecommerce-schema-engine";

interface EcommerceSchemaGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  initialPresetId?: string;
}

type CodeTab = "jsonld" | "nextjs" | "shopify";

const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "AED",
  "CAD",
  "AUD",
  "JPY",
  "CHF",
  "SGD",
  "SAR",
  "INR",
  "CNY",
  "BRL",
  "MXN",
];

export function EcommerceSchemaGenerator({
  toolSlug = "ecommerce-schema-generator",
  toolName = "E-Commerce Product Schema & Merchant Rich Result Builder",
  initialPresetId = "luxury-apparel",
}: EcommerceSchemaGeneratorProps) {
  // Initialize from preset
  const defaultData = useMemo(() => {
    const found = ECOMMERCE_PRESETS.find((p) => p.id === initialPresetId) || ECOMMERCE_PRESETS[0];
    return { ...found.data };
  }, [initialPresetId]);

  const [form, setForm] = useState<EcommerceProductForm>(defaultData);
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("jsonld");
  const [copied, setCopied] = useState<boolean>(false);

  // Real-time compliance audit
  const validationChecks = useMemo(() => {
    return validateEcommerceSchema(form);
  }, [form]);

  const errorCount = validationChecks.filter((c) => c.status === "error").length;
  const warningCount = validationChecks.filter((c) => c.status === "warning").length;
  const isCompliant = errorCount === 0;

  // Real-time generated code snippets
  const snippets = useMemo(() => {
    return generateEcommerceSnippets(form);
  }, [form]);

  // Overall Health Score
  const healthScore = useMemo(() => {
    let score = 100;
    score -= errorCount * 25;
    score -= warningCount * 8;
    return Math.max(10, Math.min(100, score));
  }, [errorCount, warningCount]);

  // Form Handlers
  const handleUpdateField = useCallback(
    <K extends keyof EcommerceProductForm>(key: K, value: EcommerceProductForm[K]) => {
      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleAddImage = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, "https://example.com/images/new-angle.webp"],
    }));
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  }, []);

  const handleUpdateImage = useCallback((index: number, val: string) => {
    setForm((prev) => {
      const nextImgs = [...prev.images];
      nextImgs[index] = val;
      return {
        ...prev,
        images: nextImgs,
      };
    });
  }, []);

  const handleApplyPreset = useCallback((presetId: string) => {
    const preset = ECOMMERCE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setForm({ ...preset.data });
    }
  }, []);

  const handleReset = useCallback(() => {
    const preset = ECOMMERCE_PRESETS[0];
    setForm({ ...preset.data });
  }, []);

  const handleCopyCode = useCallback(() => {
    let code = snippets.jsonLdScript;
    if (activeCodeTab === "nextjs") code = snippets.nextjsComponent;
    if (activeCodeTab === "shopify") code = snippets.shopifyLiquid;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeCodeTab, snippets]);

  const handleDownloadCode = useCallback(() => {
    let content = snippets.jsonLdScript;
    let filename = "product-schema.jsonld";
    let mime = "application/ld+json";

    if (activeCodeTab === "nextjs") {
      content = snippets.nextjsComponent;
      filename = "ProductSchema.tsx";
      mime = "text/typescript";
    } else if (activeCodeTab === "shopify") {
      content = snippets.shopifyLiquid;
      filename = "snippets/product-schema.liquid";
      mime = "text/plain";
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [activeCodeTab, snippets]);

  return (
    <div className="space-y-8 w-full">
      {/* Top Hero Banner */}
      <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-inner">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Google Merchant &amp; E-Commerce Product Schema Builder
                </h2>
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                    healthScore >= 90
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : healthScore >= 70
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  )}
                >
                  Merchant Health: {healthScore}/100
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Construct 2026 Google Merchant Center-compliant Product JSON-LD with shippingDetails, return policies, aggregateRating, and GTIN verification.
              </p>
            </div>
          </div>

          {/* Quick Strategy Presets */}
          <div className="flex flex-wrap items-center gap-1.5 self-start lg:self-auto">
            {ECOMMERCE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/30 text-xs font-medium text-slate-300 hover:text-rose-200 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>

            <EmbedBadgeModal
              toolSlug={toolSlug}
              label="Product Schema"
              status={isCompliant ? "Pass" : "Warning"}
              score={healthScore}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column Form, Right Column Live Previews & Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Core Product Identity */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                1. Core Product Details
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Product Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleUpdateField("name", e.target.value)}
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={form.brandName}
                    onChange={(e) => handleUpdateField("brandName", e.target.value)}
                    placeholder="e.g. Sony or Apple"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Internal SKU
                  </label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => handleUpdateField("sku", e.target.value)}
                    placeholder="e.g. PROD-SKU-9901"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Identifier Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Identifier Type
                  </label>
                  <select
                    value={form.identifierType}
                    onChange={(e) =>
                      handleUpdateField("identifierType", e.target.value as IdentifierType)
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="gtin13">GTIN-13 / EAN (13 digits)</option>
                    <option value="gtin14">GTIN-14 / ITF-14 (14 digits)</option>
                    <option value="gtin8">GTIN-8 / EAN-8 (8 digits)</option>
                    <option value="mpn">MPN (Manufacturer Part #)</option>
                    <option value="isbn">ISBN (Book Identifier)</option>
                    <option value="sku_only">None (SKU Only)</option>
                  </select>
                </div>
                <div className="sm:col-span-7">
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Identifier Value (Google Merchant Match)
                  </label>
                  <input
                    type="text"
                    disabled={form.identifierType === "sku_only"}
                    value={form.identifierValue}
                    onChange={(e) => handleUpdateField("identifierValue", e.target.value)}
                    placeholder="e.g. 7350053850012"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => handleUpdateField("description", e.target.value)}
                  placeholder="Comprehensive description of materials, specifications, and features..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Product Canonical URL
                </label>
                <input
                  type="url"
                  value={form.productUrl}
                  onChange={(e) => handleUpdateField("productUrl", e.target.value)}
                  placeholder="https://example.com/products/my-item"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Multi-Image Array */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-700 dark:text-slate-300">
                    Product Image URL(s)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Angle Image</span>
                  </button>
                </div>
                {form.images.map((imgUrl, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="url"
                      value={imgUrl}
                      onChange={(e) => handleUpdateImage(idx, e.target.value)}
                      placeholder="https://example.com/images/hero.webp"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      disabled={form.images.length <= 1}
                      className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Offers & Pricing Controls */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                2. Offers &amp; Commercial Pricing
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Price Amount <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => handleUpdateField("price", parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Currency (ISO 4217)
                </label>
                <select
                  value={form.priceCurrency}
                  onChange={(e) => handleUpdateField("priceCurrency", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Stock Availability
                </label>
                <select
                  value={form.availability}
                  onChange={(e) =>
                    handleUpdateField("availability", e.target.value as AvailabilityType)
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="InStock">InStock (Available)</option>
                  <option value="OutOfStock">OutOfStock (Sold Out)</option>
                  <option value="PreOrder">PreOrder</option>
                  <option value="BackOrder">BackOrder</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Price Valid Until (Date)
                </label>
                <input
                  type="date"
                  value={form.priceValidUntil}
                  onChange={(e) => handleUpdateField("priceValidUntil", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Item Condition
                </label>
                <select
                  value={form.itemCondition}
                  onChange={(e) =>
                    handleUpdateField("itemCondition", e.target.value as ItemConditionType)
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="NewCondition">NewCondition (Brand New)</option>
                  <option value="RefurbishedCondition">RefurbishedCondition</option>
                  <option value="UsedCondition">UsedCondition</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Google Merchant Compliance (Shipping & Returns) */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  3. Shipping Details (shippingDetails)
                </h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.includeShipping}
                  onChange={(e) => handleUpdateField("includeShipping", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {form.includeShipping && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Shipping Cost
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.shippingRate}
                    onChange={(e) =>
                      handleUpdateField("shippingRate", parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Set 0 for Free Shipping</span>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Destination Country (ISO)
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={form.destinationCountry}
                    onChange={(e) =>
                      handleUpdateField("destinationCountry", e.target.value.toUpperCase())
                    }
                    placeholder="US, AE, GB, etc."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Handling (Days)
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      value={form.minHandlingDays}
                      onChange={(e) =>
                        handleUpdateField("minHandlingDays", parseInt(e.target.value) || 0)
                      }
                      className="w-1/2 px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-center font-mono"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="number"
                      min="0"
                      value={form.maxHandlingDays}
                      onChange={(e) =>
                        handleUpdateField("maxHandlingDays", parseInt(e.target.value) || 1)
                      }
                      className="w-1/2 px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-center font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Merchant Return Policy */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  4. Return Policy (hasMerchantReturnPolicy)
                </h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.includeReturnPolicy}
                  onChange={(e) => handleUpdateField("includeReturnPolicy", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {form.includeReturnPolicy && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Return Window (Days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.merchantReturnDays}
                    onChange={(e) =>
                      handleUpdateField("merchantReturnDays", parseInt(e.target.value) || 30)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Return Method
                  </label>
                  <select
                    value={form.returnMethod}
                    onChange={(e) =>
                      handleUpdateField("returnMethod", e.target.value as ReturnMethodType)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold"
                  >
                    <option value="ReturnByMail">ReturnByMail (Shipping)</option>
                    <option value="ReturnInStore">ReturnInStore (Physical)</option>
                    <option value="ReturnAtKiosk">ReturnAtKiosk</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Return Fees
                  </label>
                  <select
                    value={form.returnFees}
                    onChange={(e) =>
                      handleUpdateField("returnFees", e.target.value as ReturnFeesType)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold"
                  >
                    <option value="FreeReturn">FreeReturn (Seller Pays)</option>
                    <option value="ReturnShippingFees">ReturnShippingFees (Customer Pays)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Ratings & Reviews */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  5. Customer Reviews (aggregateRating)
                </h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.includeRating}
                  onChange={(e) => handleUpdateField("includeRating", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {form.includeRating && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Rating Score (e.g. 4.8 / 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={form.ratingValue}
                    onChange={(e) =>
                      handleUpdateField("ratingValue", parseFloat(e.target.value) || 5)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Total Review Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.reviewCount}
                    onChange={(e) =>
                      handleUpdateField("reviewCount", parseInt(e.target.value) || 1)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-bold"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Google SERP Preview & Real-Time Audit Checklist (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real-time Google Search Rich Result Preview Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Google Rich Result Simulator
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                SERP Preview
              </span>
            </div>

            {/* Google SERP Card Mockup */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950 p-4 space-y-2 text-left font-sans">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[9px] font-bold">
                  {form.brandName ? form.brandName.charAt(0) : "S"}
                </div>
                <span className="truncate max-w-[200px]">
                  {form.productUrl ? form.productUrl.replace("https://", "") : "example.com/products/item"}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                {form.name || "Sample Product Title"}
              </h4>

              {/* Rich Badges (Rating, Price, Availability, Shipping) */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {form.includeRating && form.reviewCount > 0 && (
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < Math.round(form.ratingValue)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-700"
                          )}
                        />
                      ))}
                    </div>
                    <span>{form.ratingValue}</span>
                    <span className="text-slate-400">({form.reviewCount})</span>
                  </div>
                )}

                <span className="font-bold text-slate-900 dark:text-white">
                  {form.priceCurrency} {form.price.toFixed(2)}
                </span>

                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded",
                    form.availability === "InStock"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                  )}
                >
                  {form.availability === "InStock" ? "In stock" : "Out of stock"}
                </span>
              </div>

              {/* Shipping & Return Annotation */}
              {(form.includeShipping || form.includeReturnPolicy) && (
                <div className="text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-2 flex items-center gap-3">
                  {form.includeShipping && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {form.shippingRate === 0 ? "✓ Free delivery" : `✓ ${form.shippingCurrency} ${form.shippingRate} delivery`}
                    </span>
                  )}
                  {form.includeReturnPolicy && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ {form.merchantReturnDays}-day returns
                    </span>
                  )}
                </div>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 pt-1">
                {form.description || "Product description will appear in search snippets..."}
              </p>
            </div>
          </div>

          {/* Real-time Google Search Console Audit Checklist */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Google Merchant Audit Checklist
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500">
                {validationChecks.filter((c) => c.status === "pass").length}/{validationChecks.length} Passed
              </span>
            </div>

            <div className="space-y-2.5">
              {validationChecks.map((check) => (
                <div
                  key={check.id}
                  className={cn(
                    "p-3 rounded-2xl border flex items-start gap-2.5 text-xs transition-all",
                    check.status === "pass"
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/20 text-emerald-900 dark:text-emerald-200"
                      : check.status === "error"
                      ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-500/20 text-rose-900 dark:text-rose-200"
                      : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-500/20 text-amber-900 dark:text-amber-200"
                  )}
                >
                  {check.status === "pass" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : check.status === "error" ? (
                    <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold">{check.label}</p>
                      <span className="text-[9px] uppercase font-bold opacity-75">
                        {check.importance}
                      </span>
                    </div>
                    <p className="opacity-90 leading-relaxed text-[11px]">{check.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Target Code Exporter Tabs */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Generated Structured Data Snippets
            </h3>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setActiveCodeTab("jsonld")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCodeTab === "jsonld"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              JSON-LD &lt;script&gt;
            </button>
            <button
              type="button"
              onClick={() => setActiveCodeTab("nextjs")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCodeTab === "nextjs"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              Next.js Component
            </button>
            <button
              type="button"
              onClick={() => setActiveCodeTab("shopify")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                activeCodeTab === "shopify"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              Shopify Liquid
            </button>
          </div>
        </div>

        {/* Code Output Box */}
        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 sm:p-5 font-mono text-xs text-slate-100 overflow-hidden">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2.5 mb-3">
            <span className="font-semibold text-blue-400">
              {activeCodeTab === "jsonld" && "Standard HTML5 <script type=\"application/ld+json\">"}
              {activeCodeTab === "nextjs" && "Next.js App Router (app/products/[slug]/page.tsx)"}
              {activeCodeTab === "shopify" && "Shopify Liquid Template (snippets/product-schema.liquid)"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <pre className="overflow-x-auto whitespace-pre leading-relaxed text-slate-200 py-1">
            {activeCodeTab === "jsonld" && snippets.jsonLdScript}
            {activeCodeTab === "nextjs" && snippets.nextjsComponent}
            {activeCodeTab === "shopify" && snippets.shopifyLiquid}
          </pre>
        </div>
      </div>
    </div>
  );
}
