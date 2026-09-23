"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ShoppingBag,
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
  Building2,
  Image as ImageIcon,
  Code2,
  Eye,
  Terminal,
  ArrowRight,
  Info,
  Clock,
  Link2,
  Plus,
  Trash2,
  Star,
  Truck,
  Undo2,
  Barcode,
  DollarSign,
  PackageCheck,
  Tag,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmbedBadgeModal } from "@/components/tools/EmbedBadgeModal";

interface ProductSchemaGeneratorProps {
  toolSlug?: string;
  toolName?: string;
  platform?: any;
}

type ActiveTab = "jsonld" | "nextjs" | "visual";
type AvailabilityType =
  | "https://schema.org/InStock"
  | "https://schema.org/OutOfStock"
  | "https://schema.org/PreOrder"
  | "https://schema.org/BackOrder"
  | "https://schema.org/Discontinued"
  | "https://schema.org/InStoreOnly";

type ItemConditionType =
  | "https://schema.org/NewCondition"
  | "https://schema.org/RefurbishedCondition"
  | "https://schema.org/UsedCondition"
  | "https://schema.org/DamagedCondition";

type ReturnFeesType =
  | "https://schema.org/FreeReturn"
  | "https://schema.org/ReturnShippingFees"
  | "https://schema.org/OriginalShippingFees";

type ReturnMethodType =
  | "https://schema.org/ReturnByMail"
  | "https://schema.org/ReturnInStore"
  | "https://schema.org/ReturnAtKiosk";

interface ProductFormState {
  // Core
  name: string;
  description: string;
  brand: string;
  images: string[];
  sku: string;
  gtin13: string;
  gtin8: string;
  mpn: string;
  isbn: string;
  // Offer
  price: string;
  priceCurrency: string;
  priceValidUntil: string;
  availability: AvailabilityType;
  itemCondition: ItemConditionType;
  merchantUrl: string;
  sellerName: string;
  // Ratings
  enableRatings: boolean;
  ratingValue: string;
  bestRating: string;
  worstRating: string;
  ratingCount: string;
  reviewCount: string;
  // Shipping & Returns
  enableShipping: boolean;
  shippingRate: string;
  shippingCurrency: string;
  shippingCountry: string;
  handlingMinDays: string;
  handlingMaxDays: string;
  transitMinDays: string;
  transitMaxDays: string;
  enableReturns: boolean;
  returnDays: string;
  returnFees: ReturnFeesType;
  returnMethod: ReturnMethodType;
}

const PRESET_PHYSICAL_PRODUCT: ProductFormState = {
  name: "Sony WH-1000XM5 Wireless Industry Leading Noise-Canceling Headphones",
  description:
    "Premium over-ear wireless headphones with dual processors, Auto NC Optimizer, crystal clear hands-free calling, and up to 30 hours battery life.",
  brand: "Sony",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=1200&fit=crop&q=80",
  ],
  sku: "SONY-WH1000XM5-BLK",
  gtin13: "027242923508",
  gtin8: "",
  mpn: "WH1000XM5/B",
  isbn: "",
  price: "349.99",
  priceCurrency: "USD",
  priceValidUntil: "2026-12-31",
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
  merchantUrl: "https://example.com/products/sony-wh1000xm5-black",
  sellerName: "AudioGear Express",
  enableRatings: true,
  ratingValue: "4.8",
  bestRating: "5",
  worstRating: "1",
  ratingCount: "1420",
  reviewCount: "860",
  enableShipping: true,
  shippingRate: "0.00",
  shippingCurrency: "USD",
  shippingCountry: "US",
  handlingMinDays: "0",
  handlingMaxDays: "1",
  transitMinDays: "2",
  transitMaxDays: "4",
  enableReturns: true,
  returnDays: "30",
  returnFees: "https://schema.org/FreeReturn",
  returnMethod: "https://schema.org/ReturnByMail",
};

const PRESET_DIGITAL_SOFTWARE: ProductFormState = {
  name: "OmniSEO Analytics Pro SaaS Suite (Annual Single-User License)",
  description:
    "Enterprise-grade technical SEO intelligence platform, automated sitemap validators, schema linters, and SERP CTR optimization toolchain.",
  brand: "OmniSEO Tools",
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80",
  ],
  sku: "OMNI-PRO-ANNUAL-2026",
  gtin13: "",
  gtin8: "",
  mpn: "OMNI-SAAS-PRO",
  isbn: "",
  price: "199.00",
  priceCurrency: "USD",
  priceValidUntil: "2026-12-31",
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
  merchantUrl: "https://omniseotools.com/pricing",
  sellerName: "OmniSEO Tools Inc.",
  enableRatings: true,
  ratingValue: "4.9",
  bestRating: "5",
  worstRating: "1",
  ratingCount: "385",
  reviewCount: "210",
  enableShipping: false,
  shippingRate: "0.00",
  shippingCurrency: "USD",
  shippingCountry: "US",
  handlingMinDays: "0",
  handlingMaxDays: "0",
  transitMinDays: "0",
  transitMaxDays: "0",
  enableReturns: true,
  returnDays: "14",
  returnFees: "https://schema.org/FreeReturn",
  returnMethod: "https://schema.org/ReturnByMail",
};

const PRESET_DISCOUNTED_SALE: ProductFormState = {
  name: "Apple MacBook Pro 16-inch M3 Max (36GB Unified Memory, 1TB SSD, Space Black)",
  description:
    "Certified refurbished powerhouse laptop featuring the 16-core CPU M3 Max chip, Liquid Retina XDR display, and 22-hour battery life.",
  brand: "Apple",
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=800&fit=crop&q=80",
  ],
  sku: "MBP16-M3MAX-36GB-1TB-REF",
  gtin13: "194252549247",
  gtin8: "",
  mpn: "MUW63LL/A",
  isbn: "",
  price: "2999.00",
  priceCurrency: "USD",
  priceValidUntil: "2026-10-31",
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/RefurbishedCondition",
  merchantUrl: "https://example.com/refurbished/macbook-pro-16-m3-max",
  sellerName: "Certified Apple Partner Refurb",
  enableRatings: true,
  ratingValue: "4.9",
  bestRating: "5",
  worstRating: "1",
  ratingCount: "640",
  reviewCount: "310",
  enableShipping: true,
  shippingRate: "15.00",
  shippingCurrency: "USD",
  shippingCountry: "US",
  handlingMinDays: "1",
  handlingMaxDays: "2",
  transitMinDays: "1",
  transitMaxDays: "3",
  enableReturns: true,
  returnDays: "30",
  returnFees: "https://schema.org/FreeReturn",
  returnMethod: "https://schema.org/ReturnByMail",
};

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD - US Dollar ($)" },
  { code: "EUR", symbol: "€", label: "EUR - Euro (€)" },
  { code: "GBP", symbol: "£", label: "GBP - British Pound (£)" },
  { code: "AED", symbol: "AED", label: "AED - UAE Dirham (د.إ)" },
  { code: "SAR", symbol: "SAR", label: "SAR - Saudi Riyal (﷼)" },
  { code: "CAD", symbol: "CA$", label: "CAD - Canadian Dollar ($)" },
  { code: "AUD", symbol: "AU$", label: "AUD - Australian Dollar ($)" },
  { code: "JPY", symbol: "¥", label: "JPY - Japanese Yen (¥)" },
  { code: "INR", symbol: "₹", label: "INR - Indian Rupee (₹)" },
  { code: "CHF", symbol: "CHF", label: "CHF - Swiss Franc" },
];

export function ProductSchemaGenerator({
  toolSlug = "product-schema-generator",
  toolName = "Product & Offer Schema Generator",
}: ProductSchemaGeneratorProps) {
  const [form, setForm] = useState<ProductFormState>(PRESET_PHYSICAL_PRODUCT);
  const [activeTab, setActiveTab] = useState<ActiveTab>("jsonld");
  const [copied, setCopied] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

  const updateField = useCallback(
    <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAddImage = useCallback(() => {
    if (!newImageUrl.trim()) return;
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()],
    }));
    setNewImageUrl("");
  }, [newImageUrl]);

  const handleRemoveImage = useCallback((indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  }, []);

  const handleApplyPreset = useCallback((preset: ProductFormState) => {
    setForm(preset);
  }, []);

  // Compute Clean JSON-LD Schema Object
  const schemaJsonLd = useMemo(() => {
    const cleanImages = form.images.filter((img) => img.trim().length > 0);

    const schema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: form.name.trim() || "Product Name",
    };

    if (cleanImages.length === 1) {
      schema.image = cleanImages[0];
    } else if (cleanImages.length > 1) {
      schema.image = cleanImages;
    }

    if (form.description.trim()) {
      schema.description = form.description.trim();
    }

    if (form.sku.trim()) {
      schema.sku = form.sku.trim();
    }

    if (form.gtin13.trim()) {
      schema.gtin13 = form.gtin13.trim();
    }

    if (form.gtin8.trim()) {
      schema.gtin8 = form.gtin8.trim();
    }

    if (form.mpn.trim()) {
      schema.mpn = form.mpn.trim();
    }

    if (form.isbn.trim()) {
      schema.isbn = form.isbn.trim();
    }

    if (form.brand.trim()) {
      schema.brand = {
        "@type": "Brand",
        name: form.brand.trim(),
      };
    }

    // Offers
    const offerObj: Record<string, any> = {
      "@type": "Offer",
      price: parseFloat(form.price) ? form.price.trim() : "0.00",
      priceCurrency: form.priceCurrency || "USD",
      availability: form.availability,
      itemCondition: form.itemCondition,
    };

    if (form.merchantUrl.trim()) {
      offerObj.url = form.merchantUrl.trim();
    }

    if (form.priceValidUntil.trim()) {
      offerObj.priceValidUntil = form.priceValidUntil.trim();
    }

    if (form.sellerName.trim()) {
      offerObj.seller = {
        "@type": "Organization",
        name: form.sellerName.trim(),
      };
    }

    // Shipping
    if (form.enableShipping) {
      offerObj.shippingDetails = {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: parseFloat(form.shippingRate) ? form.shippingRate.trim() : "0.00",
          currency: form.shippingCurrency || form.priceCurrency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: form.shippingCountry.trim().toUpperCase() || "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: parseInt(form.handlingMinDays, 10) || 0,
            maxValue: parseInt(form.handlingMaxDays, 10) || 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: parseInt(form.transitMinDays, 10) || 1,
            maxValue: parseInt(form.transitMaxDays, 10) || 3,
            unitCode: "DAY",
          },
        },
      };
    }

    // Returns
    if (form.enableReturns) {
      offerObj.hasMerchantReturnPolicy = {
        "@type": "MerchantReturnPolicy",
        applicableCountry: form.shippingCountry.trim().toUpperCase() || "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: parseInt(form.returnDays, 10) || 30,
        returnMethod: form.returnMethod,
        returnFees: form.returnFees,
      };
    }

    schema.offers = offerObj;

    // Aggregate Rating
    if (
      form.enableRatings &&
      (parseFloat(form.ratingValue) > 0 || parseInt(form.ratingCount, 10) > 0)
    ) {
      const ratingObj: Record<string, any> = {
        "@type": "AggregateRating",
        ratingValue: form.ratingValue || "5",
        bestRating: form.bestRating || "5",
        worstRating: form.worstRating || "1",
      };

      if (form.ratingCount.trim()) {
        ratingObj.ratingCount = parseInt(form.ratingCount, 10) || 1;
      }
      if (form.reviewCount.trim()) {
        ratingObj.reviewCount = parseInt(form.reviewCount, 10) || 1;
      }

      schema.aggregateRating = ratingObj;
    }

    return schema;
  }, [form]);

  // Formatted Output Code Strings
  const jsonLdString = useMemo(() => {
    return JSON.stringify(schemaJsonLd, null, 2);
  }, [schemaJsonLd]);

  const scriptTagCode = useMemo(() => {
    return `<script type="application/ld+json">\n${jsonLdString}\n</script>`;
  }, [jsonLdString]);

  const nextJsSnippet = useMemo(() => {
    return `// app/products/[slug]/page.tsx (Next.js 14 / 15 App Router)
import Script from 'next/script';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const productJsonLd = ${JSON.stringify(schemaJsonLd, null, 2)};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      
      {/* Product Page Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">${form.name.replace(/"/g, '\\"')}</h1>
        <p className="text-xl font-semibold text-emerald-600 mt-2">${form.priceCurrency} $${form.price}</p>
      </main>
    </>
  );
}`;
  }, [schemaJsonLd, form.name, form.price, form.priceCurrency]);

  // Real-Time Google Rich Results Compliance Audit
  const complianceAudit = useMemo(() => {
    const checks = [
      {
        id: "name",
        label: "Product Title (name)",
        mandatory: true,
        passed: form.name.trim().length >= 3,
        detail:
          form.name.trim().length >= 3
            ? `"${form.name.slice(0, 30)}..." (${form.name.length} chars)`
            : "Product name is required for search listing.",
      },
      {
        id: "image",
        label: "Product Image URL(s)",
        mandatory: true,
        passed: form.images.some((img) => img.trim().startsWith("http")),
        detail: form.images.some((img) => img.trim().startsWith("http"))
          ? `${form.images.length} valid image URL(s) configured`
          : "At least one valid image URL is required for Rich Cards.",
      },
      {
        id: "price",
        label: "Offer Price & Currency",
        mandatory: true,
        passed:
          !isNaN(parseFloat(form.price)) &&
          parseFloat(form.price) >= 0 &&
          form.priceCurrency.length === 3,
        detail:
          !isNaN(parseFloat(form.price)) && parseFloat(form.price) >= 0
            ? `${form.priceCurrency} ${form.price}`
            : "Valid numeric price and 3-letter ISO currency code required.",
      },
      {
        id: "brand",
        label: "Brand Name (brand)",
        mandatory: false,
        passed: form.brand.trim().length > 0,
        detail: form.brand.trim()
          ? `Brand: ${form.brand}`
          : "Recommended for Google Merchant Center brand filtering.",
      },
      {
        id: "identifiers",
        label: "Global Identifiers (SKU / GTIN / MPN)",
        mandatory: false,
        passed:
          form.sku.trim().length > 0 ||
          form.gtin13.trim().length > 0 ||
          form.gtin8.trim().length > 0 ||
          form.mpn.trim().length > 0,
        detail:
          form.sku.trim() || form.gtin13.trim() || form.mpn.trim()
            ? `ID: ${form.sku || form.gtin13 || form.mpn}`
            : "Required for Google Shopping free organic matching.",
      },
      {
        id: "availability",
        label: "Stock Availability",
        mandatory: false,
        passed: !!form.availability,
        detail: form.availability.replace("https://schema.org/", ""),
      },
      {
        id: "ratings",
        label: "Aggregate Star Ratings",
        mandatory: false,
        passed:
          form.enableRatings &&
          parseFloat(form.ratingValue) > 0 &&
          (parseInt(form.ratingCount, 10) > 0 || parseInt(form.reviewCount, 10) > 0),
        detail:
          form.enableRatings && parseFloat(form.ratingValue) > 0
            ? `★ ${form.ratingValue} / ${form.bestRating} (${form.ratingCount || form.reviewCount} reviews)`
            : "Enables gold star rating display on Google SERPs.",
      },
      {
        id: "shipping",
        label: "Shipping & Return Policy",
        mandatory: false,
        passed: form.enableShipping || form.enableReturns,
        detail:
          form.enableShipping || form.enableReturns
            ? "Configured for Google Merchant Center delivery badges."
            : "Add delivery times & return windows to earn rich trust badges.",
      },
    ];

    const mandatoryPassed = checks.filter((c) => c.mandatory && c.passed).length;
    const mandatoryTotal = checks.filter((c) => c.mandatory).length;
    const optionalPassed = checks.filter((c) => !c.mandatory && c.passed).length;
    const optionalTotal = checks.filter((c) => !c.mandatory).length;

    const score = Math.round(
      (mandatoryPassed / mandatoryTotal) * 60 + (optionalPassed / optionalTotal) * 40
    );

    return {
      checks,
      score,
      isEligible: mandatoryPassed === mandatoryTotal,
    };
  }, [form]);

  const handleCopyCode = useCallback(() => {
    const textToCopy =
      activeTab === "jsonld"
        ? scriptTagCode
        : activeTab === "nextjs"
        ? nextJsSnippet
        : jsonLdString;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab, scriptTagCode, nextJsSnippet, jsonLdString]);

  const handleDownloadJson = useCallback(() => {
    const blob = new Blob([jsonLdString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const cleanSlug = (form.name || "product-schema")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    link.download = `${cleanSlug}-schema.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [jsonLdString, form.name]);

  const handleGoogleTest = useCallback(() => {
    window.open("https://search.google.com/test/rich-results", "_blank");
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* 1. Top Bar / Presets Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Quick Load E-Commerce Presets
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pre-fill standard schema templates for physical items, digital software, or sale deals.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleApplyPreset(PRESET_PHYSICAL_PRODUCT)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <PackageCheck className="w-3.5 h-3.5 text-emerald-500" />
              Physical Product (In Stock)
            </button>
            <button
              onClick={() => handleApplyPreset(PRESET_DIGITAL_SOFTWARE)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-500" />
              Digital / Software License
            </button>
            <button
              onClick={() => handleApplyPreset(PRESET_DISCOUNTED_SALE)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Percent className="w-3.5 h-3.5 text-amber-500" />
              Refurbished / Sale Deal
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Dual-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Core Product Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  1. Core Product Details
                </h3>
              </div>
              <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/40">
                Google Rich Result Required
              </span>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Product Title / Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Product Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Clear commercial description of features, materials, and benefits..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            {/* Brand & Canonical Merchant URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Brand / Manufacturer
                </label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => updateField("brand", e.target.value)}
                  placeholder="e.g. Sony, Apple, Nike"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Product Canonical URL
                </label>
                <input
                  type="url"
                  value={form.merchantUrl}
                  onChange={(e) => updateField("merchantUrl", e.target.value)}
                  placeholder="https://example.com/products/item-slug"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Multiple Product Images */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Product Image URLs (1200px+ recommended) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {form.images.length} Image{form.images.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="space-y-2">
                {form.images.map((imgUrl, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="url"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...form.images];
                          updated[idx] = e.target.value;
                          updateField("images", updated);
                        }}
                        placeholder="https://example.com/images/product.jpg"
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                      <ImageIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    {form.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 transition-colors"
                        title="Remove image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Image Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImage();
                      }
                    }}
                    placeholder="Add additional image URL..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-300 transition-all border border-slate-200 dark:border-slate-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Identifiers (SKU, GTIN, MPN, ISBN) */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Barcode className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Universal Commercial Identifiers (Google Merchant Match)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    SKU (Store Code)
                  </label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => updateField("sku", e.target.value)}
                    placeholder="SKU-1002"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    GTIN-13 / EAN / UPC
                  </label>
                  <input
                    type="text"
                    value={form.gtin13}
                    onChange={(e) => updateField("gtin13", e.target.value)}
                    placeholder="027242923508"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    MPN (Part Number)
                  </label>
                  <input
                    type="text"
                    value={form.mpn}
                    onChange={(e) => updateField("mpn", e.target.value)}
                    placeholder="WH1000XM5"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    GTIN-8 / ISBN (Books)
                  </label>
                  <input
                    type="text"
                    value={form.isbn || form.gtin8}
                    onChange={(e) => updateField("isbn", e.target.value)}
                    placeholder="978-3-16-148410-0"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Offer & Pricing Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  2. Pricing & Commercial Offer (offers)
                </h3>
              </div>
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                Mandatory for SERP Badges
              </span>
            </div>

            {/* Price & Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Price (Numeric) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    placeholder="299.99"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Currency (ISO 4217) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={form.priceCurrency}
                  onChange={(e) => updateField("priceCurrency", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Price Valid Until (Expiry)
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.priceValidUntil}
                    onChange={(e) => updateField("priceValidUntil", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Availability & Item Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Stock Availability Status
                </label>
                <select
                  value={form.availability}
                  onChange={(e) => updateField("availability", e.target.value as AvailabilityType)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="https://schema.org/InStock">🟢 InStock (Ready to ship)</option>
                  <option value="https://schema.org/OutOfStock">🔴 OutOfStock (Sold out)</option>
                  <option value="https://schema.org/PreOrder">🟡 PreOrder (Upcoming item)</option>
                  <option value="https://schema.org/BackOrder">🟠 BackOrder (Restocking soon)</option>
                  <option value="https://schema.org/InStoreOnly">🏪 InStoreOnly (Physical retail)</option>
                  <option value="https://schema.org/Discontinued">⚪ Discontinued (End of life)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Item Condition
                </label>
                <select
                  value={form.itemCondition}
                  onChange={(e) => updateField("itemCondition", e.target.value as ItemConditionType)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="https://schema.org/NewCondition">✨ NewCondition (Brand new)</option>
                  <option value="https://schema.org/RefurbishedCondition">🛠️ RefurbishedCondition (Certified)</option>
                  <option value="https://schema.org/UsedCondition">📦 UsedCondition (Pre-owned)</option>
                  <option value="https://schema.org/DamagedCondition">⚠️ DamagedCondition (As-is)</option>
                </select>
              </div>
            </div>

            {/* Seller Organization */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Seller / Store Organization Name
              </label>
              <input
                type="text"
                value={form.sellerName}
                onChange={(e) => updateField("sellerName", e.target.value)}
                placeholder="e.g. Acme Online Store"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Section 3: Aggregate Rating & Reviews */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  3. Aggregate Customer Ratings
                </h3>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableRatings}
                  onChange={(e) => updateField("enableRatings", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {form.enableRatings ? (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Average Rating Score (e.g. 4.8)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={form.ratingValue}
                      onChange={(e) => updateField("ratingValue", e.target.value)}
                      placeholder="4.8"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Total Rating Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.ratingCount}
                      onChange={(e) => updateField("ratingCount", e.target.value)}
                      placeholder="1420"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Written Review Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.reviewCount}
                      onChange={(e) => updateField("reviewCount", e.target.value)}
                      placeholder="860"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300">
                  <Info className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>
                    Google requires <strong>ratingValue</strong> and at least one of{" "}
                    <strong>ratingCount</strong> or <strong>reviewCount</strong> to render the golden stars snippet.
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Toggle ON to include review ratings and unlock Google gold star snippets.
              </p>
            )}
          </div>

          {/* Section 4: Shipping & Return Policies (Google Merchant Eligibility) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  4. Shipping & Return Policies (Merchant Center)
                </h3>
              </div>
              <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                Google Free Listings Boost
              </span>
            </div>

            {/* Shipping Config */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-500" />
                  Offer Shipping Rates & Delivery Times
                </label>
                <input
                  type="checkbox"
                  checked={form.enableShipping}
                  onChange={(e) => updateField("enableShipping", e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {form.enableShipping && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Shipping Rate (0 = Free)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.shippingRate}
                      onChange={(e) => updateField("shippingRate", e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Destination Country
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={form.shippingCountry}
                      onChange={(e) => updateField("shippingCountry", e.target.value.toUpperCase())}
                      placeholder="US, GB, AE"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono uppercase text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Handling Days (Min-Max)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        value={form.handlingMinDays}
                        onChange={(e) => updateField("handlingMinDays", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-center text-slate-900 dark:text-white"
                        placeholder="0"
                      />
                      <span className="text-slate-400">-</span>
                      <input
                        type="number"
                        min="0"
                        value={form.handlingMaxDays}
                        onChange={(e) => updateField("handlingMaxDays", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-center text-slate-900 dark:text-white"
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Transit Days (Min-Max)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        value={form.transitMinDays}
                        onChange={(e) => updateField("transitMinDays", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-center text-slate-900 dark:text-white"
                        placeholder="2"
                      />
                      <span className="text-slate-400">-</span>
                      <input
                        type="number"
                        min="0"
                        value={form.transitMaxDays}
                        onChange={(e) => updateField("transitMaxDays", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-center text-slate-900 dark:text-white"
                        placeholder="4"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Return Policy Config */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Undo2 className="w-3.5 h-3.5 text-indigo-500" />
                  Merchant Return Policy
                </label>
                <input
                  type="checkbox"
                  checked={form.enableReturns}
                  onChange={(e) => updateField("enableReturns", e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              {form.enableReturns && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Return Window (Days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.returnDays}
                      onChange={(e) => updateField("returnDays", e.target.value)}
                      placeholder="30"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs font-mono text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Return Shipping Fees
                    </label>
                    <select
                      value={form.returnFees}
                      onChange={(e) => updateField("returnFees", e.target.value as ReturnFeesType)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="https://schema.org/FreeReturn">Free Returns</option>
                      <option value="https://schema.org/ReturnShippingFees">Customer Pays Shipping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Return Method
                    </label>
                    <select
                      value={form.returnMethod}
                      onChange={(e) => updateField("returnMethod", e.target.value as ReturnMethodType)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="https://schema.org/ReturnByMail">Return by Mail</option>
                      <option value="https://schema.org/ReturnInStore">Return in Physical Store</option>
                      <option value="https://schema.org/ReturnAtKiosk">Return at Kiosk / Drop-off</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Output & Live Rich Snippet Preview (5 cols - Sticky) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          {/* Output Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {/* Header Tabs */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
              <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("jsonld")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5",
                    activeTab === "jsonld"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  JSON-LD
                </button>
                <button
                  onClick={() => setActiveTab("visual")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5",
                    activeTab === "visual"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Eye className="w-3.5 h-3.5" />
                  SERP Preview
                </button>
                <button
                  onClick={() => setActiveTab("nextjs")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5",
                    activeTab === "nextjs"
                      ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Next.js App
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all active:scale-95"
                  title="Copy formatted code to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownloadJson}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                  title="Download .json file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code Body / Visual Preview */}
            <div className="p-4 bg-slate-950 text-slate-100 min-h-[380px] max-h-[480px] overflow-auto font-mono text-xs leading-relaxed">
              {activeTab === "jsonld" ? (
                <pre className="text-emerald-400">
                  <code>{scriptTagCode}</code>
                </pre>
              ) : activeTab === "nextjs" ? (
                <pre className="text-sky-300">
                  <code>{nextJsSnippet}</code>
                </pre>
              ) : (
                /* Google Search Rich Results Simulator Card */
                <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-sans space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Globe className="w-3 h-3 text-indigo-500" />
                      Google Search Result Simulator
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Rich Snippet Active
                    </span>
                  </div>

                  {/* URL / Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-bold">
                      {form.brand ? form.brand[0] : "S"}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {form.brand || "Store Name"}
                      </span>{" "}
                      <span className="text-slate-400">› products › {form.sku || "item"}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer line-clamp-2 leading-snug">
                    {form.name || "Product Name Example"}
                  </h4>

                  {/* Google Shopping Rich Badges (Price, Stock, Rating, Shipping) */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    {/* Price */}
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>{form.priceCurrency} ${form.price || "0.00"}</span>
                    </div>

                    {/* In Stock Badge */}
                    <div className="flex items-center gap-1">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          form.availability === "https://schema.org/InStock"
                            ? "bg-emerald-500"
                            : form.availability === "https://schema.org/OutOfStock"
                            ? "bg-rose-500"
                            : "bg-amber-500"
                        )}
                      />
                      <span
                        className={cn(
                          "font-semibold",
                          form.availability === "https://schema.org/InStock"
                            ? "text-emerald-700 dark:text-emerald-400"
                            : form.availability === "https://schema.org/OutOfStock"
                            ? "text-rose-700 dark:text-rose-400"
                            : "text-amber-700 dark:text-amber-400"
                        )}
                      >
                        {form.availability === "https://schema.org/InStock"
                          ? "In stock"
                          : form.availability === "https://schema.org/OutOfStock"
                          ? "Out of stock"
                          : "Pre-order"}
                      </span>
                    </div>

                    {/* Star Ratings */}
                    {form.enableRatings && (
                      <div className="flex items-center gap-1">
                        <span className="text-amber-500 font-bold flex items-center">
                          ★ {form.ratingValue || "5.0"}
                        </span>
                        <span className="text-slate-400">
                          ({form.ratingCount || form.reviewCount || "100"})
                        </span>
                      </div>
                    )}

                    {/* Free Returns / Shipping Badge */}
                    {form.enableReturns && form.returnFees === "https://schema.org/FreeReturn" && (
                      <span className="text-slate-500 dark:text-slate-400">
                        • Free {form.returnDays}-day returns
                      </span>
                    )}

                    {form.enableShipping && parseFloat(form.shippingRate) === 0 && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        • Free delivery
                      </span>
                    )}
                  </div>

                  {/* Description Snippet */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {form.description ||
                      "Detailed product features, specifications, and warranty information indexed for Google Shopping."}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer with Google Rich Results Test Link */}
            <div className="px-4 py-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Client-Side Validated
              </span>
              <button
                onClick={handleGoogleTest}
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Test in Google Rich Results
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Real-Time Google Rich Results Compliance Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className={cn(
                    "w-5 h-5",
                    complianceAudit.isEligible ? "text-emerald-500" : "text-amber-500"
                  )}
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Google Rich Results Eligibility
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {complianceAudit.isEligible
                      ? "100% compliant with mandatory Google Search attributes"
                      : "Missing mandatory fields required for SERP Rich Snippets"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={cn(
                    "text-lg font-black",
                    complianceAudit.score >= 90
                      ? "text-emerald-600 dark:text-emerald-400"
                      : complianceAudit.score >= 60
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {complianceAudit.score}%
                </span>
              </div>
            </div>

            {/* Score Meter Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300 rounded-full",
                  complianceAudit.score >= 90
                    ? "bg-emerald-500"
                    : complianceAudit.score >= 60
                    ? "bg-amber-500"
                    : "bg-rose-500"
                )}
                style={{ width: `${complianceAudit.score}%` }}
              />
            </div>

            {/* Itemized Audit Checks */}
            <div className="space-y-2 pt-1">
              {complianceAudit.checks.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    {c.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : c.mandatory ? (
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <div>
                      <span
                        className={cn(
                          "font-semibold",
                          c.passed
                            ? "text-slate-800 dark:text-slate-200"
                            : c.mandatory
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {c.label}
                      </span>
                      {c.mandatory && (
                        <span className="ml-1 text-[10px] text-rose-500 font-bold">
                          [Required]
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 text-right truncate max-w-[150px]">
                    {c.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Backlink Badge Integration */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Share verified schema badge in documentation:
              </span>
              <EmbedBadgeModal
                toolSlug={toolSlug}
                label="Product Schema"
                status={complianceAudit.isEligible ? "Valid JSON-LD" : "Draft Schema"}
                score={complianceAudit.score}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
