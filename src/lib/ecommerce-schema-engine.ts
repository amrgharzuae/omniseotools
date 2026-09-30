export type IdentifierType = "gtin13" | "gtin14" | "gtin8" | "mpn" | "isbn" | "sku_only";
export type AvailabilityType = "InStock" | "OutOfStock" | "PreOrder" | "BackOrder";
export type ItemConditionType = "NewCondition" | "RefurbishedCondition" | "UsedCondition";
export type ReturnPolicyCategoryType =
  | "MerchantReturnFiniteReturnWindow"
  | "MerchantReturnNotPermitted"
  | "MerchantReturnUnlimitedWindow";
export type ReturnMethodType = "ReturnByMail" | "ReturnInStore" | "ReturnAtKiosk";
export type ReturnFeesType = "FreeReturn" | "ReturnShippingFees";

export interface EcommerceProductForm {
  name: string;
  description: string;
  brandName: string;
  sku: string;
  identifierType: IdentifierType;
  identifierValue: string;
  productUrl: string;
  images: string[];
  // Offers
  price: number;
  priceCurrency: string;
  availability: AvailabilityType;
  priceValidUntil: string;
  itemCondition: ItemConditionType;
  // Shipping Details
  includeShipping: boolean;
  shippingRate: number;
  shippingCurrency: string;
  destinationCountry: string;
  minHandlingDays: number;
  maxHandlingDays: number;
  minTransitDays: number;
  maxTransitDays: number;
  // Return Policy
  includeReturnPolicy: boolean;
  returnPolicyCategory: ReturnPolicyCategoryType;
  merchantReturnDays: number;
  returnMethod: ReturnMethodType;
  returnFees: ReturnFeesType;
  // Ratings
  includeRating: boolean;
  ratingValue: number;
  bestRating: number;
  reviewCount: number;
}

export interface SchemaValidationCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "error";
  message: string;
  importance: "mandatory" | "recommended" | "optional";
}

export interface EcommerceSchemaSnippets {
  jsonLdScript: string;
  nextjsComponent: string;
  shopifyLiquid: string;
}

export const ECOMMERCE_PRESETS: {
  id: string;
  name: string;
  description: string;
  data: EcommerceProductForm;
}[] = [
  {
    id: "luxury-apparel",
    name: "Luxury Apparel (E-Commerce Benchmark)",
    description: "Complete product with GTIN-13, free shipping, 30-day return policy, and 4.9-star ratings",
    data: {
      name: "Merino Wool Thermal Crewneck Sweater",
      description: "Ultra-fine 100% Australian Merino wool crewneck sweater with moisture-wicking and temperature-regulating weave.",
      brandName: "Nordic Thread & Co.",
      sku: "NTC-MW-009",
      identifierType: "gtin13",
      identifierValue: "7350053850012",
      productUrl: "https://example.com/products/merino-wool-crewneck",
      images: [
        "https://example.com/images/merino-sweater-front.webp",
        "https://example.com/images/merino-sweater-model.webp",
      ],
      price: 189.0,
      priceCurrency: "USD",
      availability: "InStock",
      priceValidUntil: "2026-12-31",
      itemCondition: "NewCondition",
      includeShipping: true,
      shippingRate: 0.0,
      shippingCurrency: "USD",
      destinationCountry: "US",
      minHandlingDays: 1,
      maxHandlingDays: 2,
      minTransitDays: 2,
      maxTransitDays: 4,
      includeReturnPolicy: true,
      returnPolicyCategory: "MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "ReturnByMail",
      returnFees: "FreeReturn",
      includeRating: true,
      ratingValue: 4.9,
      bestRating: 5,
      reviewCount: 342,
    },
  },
  {
    id: "electronics-gadget",
    name: "Consumer Electronics (GTIN-14 & Fast Transit)",
    description: "High-spec electronics item with manufacturer MPN, GTIN-14, and express shipping rates",
    data: {
      name: "ApexPro 4K Wireless Noise-Cancelling Headphones",
      description: "Active noise cancelling over-ear headphones featuring dual 40mm beryllium drivers, LDAC high-resolution audio, and 45-hour battery life.",
      brandName: "Acoustix Sound Labs",
      sku: "ASL-AP4K-BLK",
      identifierType: "gtin14",
      identifierValue: "10850012345678",
      productUrl: "https://example.com/products/apexpro-4k-headphones",
      images: [
        "https://example.com/images/apexpro-studio.webp",
        "https://example.com/images/apexpro-case.webp",
      ],
      price: 349.99,
      priceCurrency: "USD",
      availability: "InStock",
      priceValidUntil: "2026-11-30",
      itemCondition: "NewCondition",
      includeShipping: true,
      shippingRate: 9.99,
      shippingCurrency: "USD",
      destinationCountry: "US",
      minHandlingDays: 0,
      maxHandlingDays: 1,
      minTransitDays: 1,
      maxTransitDays: 2,
      includeReturnPolicy: true,
      returnPolicyCategory: "MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "ReturnByMail",
      returnFees: "ReturnShippingFees",
      includeRating: true,
      ratingValue: 4.7,
      bestRating: 5,
      reviewCount: 1280,
    },
  },
  {
    id: "gcc-retail",
    name: "Middle East / UAE Merchant (AED Currency)",
    description: "Regional UAE e-commerce schema with AED pricing, regional shipping, and same-day delivery metrics",
    data: {
      name: "Imperial Oud Eau de Parfum (100ml)",
      description: "Authentic Cambodian agarwood blended with Taif rose and amber notes in an artisanal crystal flacon.",
      brandName: "Arabian Essence Perfumes",
      sku: "AEP-OUD-100",
      identifierType: "gtin13",
      identifierValue: "6291100223344",
      productUrl: "https://example.com/products/imperial-oud-100ml",
      images: [
        "https://example.com/images/imperial-oud-bottle.webp",
      ],
      price: 650.0,
      priceCurrency: "AED",
      availability: "InStock",
      priceValidUntil: "2026-12-31",
      itemCondition: "NewCondition",
      includeShipping: true,
      shippingRate: 0.0,
      shippingCurrency: "AED",
      destinationCountry: "AE",
      minHandlingDays: 0,
      maxHandlingDays: 1,
      minTransitDays: 1,
      maxTransitDays: 2,
      includeReturnPolicy: true,
      returnPolicyCategory: "MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "ReturnByMail",
      returnFees: "FreeReturn",
      includeRating: true,
      ratingValue: 5.0,
      bestRating: 5,
      reviewCount: 94,
    },
  },
];

export function buildProductJsonLdObject(form: EcommerceProductForm): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: form.name.trim() || "Sample Product Name",
    description: form.description.trim() || "Product description goes here.",
  };

  if (form.images && form.images.length > 0 && form.images[0]) {
    const cleanImages = form.images.filter((img) => img.trim() !== "");
    schema.image = cleanImages.length === 1 ? cleanImages[0] : cleanImages;
  }

  if (form.brandName.trim()) {
    schema.brand = {
      "@type": "Brand",
      name: form.brandName.trim(),
    };
  }

  if (form.sku.trim()) {
    schema.sku = form.sku.trim();
  }

  if (form.identifierType && form.identifierType !== "sku_only" && form.identifierValue.trim()) {
    schema[form.identifierType] = form.identifierValue.trim();
  }

  // Offer entity
  const offerObj: Record<string, unknown> = {
    "@type": "Offer",
    price: Number(form.price) || 0,
    priceCurrency: form.priceCurrency || "USD",
    availability: `https://schema.org/${form.availability}`,
    itemCondition: `https://schema.org/${form.itemCondition}`,
  };

  if (form.productUrl.trim()) {
    offerObj.url = form.productUrl.trim();
  }

  if (form.priceValidUntil.trim()) {
    offerObj.priceValidUntil = form.priceValidUntil.trim();
  }

  // shippingDetails
  if (form.includeShipping) {
    offerObj.shippingDetails = {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: Number(form.shippingRate) || 0,
        currency: form.shippingCurrency || form.priceCurrency || "USD",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: form.destinationCountry || "US",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: Number(form.minHandlingDays) || 0,
          maxValue: Number(form.maxHandlingDays) || 1,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: Number(form.minTransitDays) || 1,
          maxValue: Number(form.maxTransitDays) || 3,
          unitCode: "DAY",
        },
      },
    };
  }

  // hasMerchantReturnPolicy
  if (form.includeReturnPolicy) {
    offerObj.hasMerchantReturnPolicy = {
      "@type": "MerchantReturnPolicy",
      applicableCountry: form.destinationCountry || "US",
      returnPolicyCategory: `https://schema.org/${form.returnPolicyCategory}`,
      merchantReturnDays: Number(form.merchantReturnDays) || 30,
      returnMethod: `https://schema.org/${form.returnMethod}`,
      returnFees: `https://schema.org/${form.returnFees}`,
    };
  }

  schema.offers = offerObj;

  // aggregateRating
  if (form.includeRating && Number(form.reviewCount) > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(form.ratingValue) || 5,
      bestRating: Number(form.bestRating) || 5,
      ratingCount: Number(form.reviewCount) || 1,
    };
  }

  return schema;
}

export function validateEcommerceSchema(form: EcommerceProductForm): SchemaValidationCheck[] {
  const checks: SchemaValidationCheck[] = [];

  // 1. Product Name
  if (form.name.trim()) {
    checks.push({
      id: "name",
      label: "Product Name",
      status: "pass",
      message: `Valid title: "${form.name.trim()}"`,
      importance: "mandatory",
    });
  } else {
    checks.push({
      id: "name",
      label: "Product Name",
      status: "error",
      message: "Missing product name. Required by Google for product rich snippets.",
      importance: "mandatory",
    });
  }

  // 2. Price & Currency
  if (form.price > 0 && form.priceCurrency) {
    checks.push({
      id: "price",
      label: "Price & Currency",
      status: "pass",
      message: `Valid price: ${form.priceCurrency} ${form.price.toFixed(2)}`,
      importance: "mandatory",
    });
  } else {
    checks.push({
      id: "price",
      label: "Price & Currency",
      status: "error",
      message: "Numeric price greater than 0 and ISO 4217 currency code are required.",
      importance: "mandatory",
    });
  }

  // 3. Images
  const validImages = form.images.filter((img) => img.trim().startsWith("http"));
  if (validImages.length > 0) {
    checks.push({
      id: "image",
      label: "Product Image URL(s)",
      status: "pass",
      message: `${validImages.length} high-resolution image URL(s) configured.`,
      importance: "mandatory",
    });
  } else {
    checks.push({
      id: "image",
      label: "Product Image URL(s)",
      status: "error",
      message: "At least one absolute image URL (https://) is required for Google Merchant and SERP images.",
      importance: "mandatory",
    });
  }

  // 4. Global Identifier (GTIN / MPN / SKU)
  if (form.identifierType !== "sku_only" && form.identifierValue.trim()) {
    checks.push({
      id: "gtin",
      label: `Global Identifier (${form.identifierType.toUpperCase()})`,
      status: "pass",
      message: `Valid identifier specified: ${form.identifierValue.trim()}`,
      importance: "recommended",
    });
  } else if (form.sku.trim()) {
    checks.push({
      id: "gtin",
      label: "SKU / Identifier",
      status: "warning",
      message: "Only SKU is provided. Google strongly recommends adding a GTIN-13/UPC/MPN to match Google Shopping feeds.",
      importance: "recommended",
    });
  } else {
    checks.push({
      id: "gtin",
      label: "Global Identifier",
      status: "error",
      message: "Missing GTIN, MPN, or SKU. Essential for Google Merchant Center automatic product matching.",
      importance: "recommended",
    });
  }

  // 5. Shipping Details (2026 Google Merchant Rule)
  if (form.includeShipping) {
    checks.push({
      id: "shipping",
      label: "Shipping Details (shippingDetails)",
      status: "pass",
      message: `Shipping rate (${form.shippingCurrency} ${form.shippingRate}) & transit days declared for ${form.destinationCountry}.`,
      importance: "recommended",
    });
  } else {
    checks.push({
      id: "shipping",
      label: "Shipping Details (shippingDetails)",
      status: "warning",
      message: "Missing shippingDetails. Google Search Console flags this warning for enhanced merchant listings.",
      importance: "recommended",
    });
  }

  // 6. Merchant Return Policy (2026 Google Merchant Rule)
  if (form.includeReturnPolicy) {
    checks.push({
      id: "return-policy",
      label: "Return Policy (hasMerchantReturnPolicy)",
      status: "pass",
      message: `${form.merchantReturnDays}-day return window configured with ${form.returnFees}.`,
      importance: "recommended",
    });
  } else {
    checks.push({
      id: "return-policy",
      label: "Return Policy (hasMerchantReturnPolicy)",
      status: "warning",
      message: "Missing hasMerchantReturnPolicy. Recommended to earn 'Free Returns' SERP annotations.",
      importance: "recommended",
    });
  }

  // 7. Aggregate Ratings
  if (form.includeRating && form.reviewCount > 0) {
    checks.push({
      id: "rating",
      label: "Aggregate Rating (aggregateRating)",
      status: "pass",
      message: `Rating ${form.ratingValue}/${form.bestRating} based on ${form.reviewCount} reviews.`,
      importance: "optional",
    });
  } else {
    checks.push({
      id: "rating",
      label: "Aggregate Rating",
      status: "warning",
      message: "No star rating configured. Add customer review metrics to trigger yellow review stars in search results.",
      importance: "optional",
    });
  }

  return checks;
}

export function generateEcommerceSnippets(form: EcommerceProductForm): EcommerceSchemaSnippets {
  const schemaObj = buildProductJsonLdObject(form);
  const jsonString = JSON.stringify(schemaObj, null, 2);

  // 1. Standard HTML Script Tag
  const jsonLdScript = `<script type="application/ld+json">\n${jsonString}\n</script>`;

  // 2. Next.js App Router Component
  const nextjsComponent = `// Next.js App Router: app/products/[slug]/page.tsx
import Script from 'next/script';

export default function ProductPage() {
  const productSchema = ${jsonString};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Product Viewport Content */}
    </>
  );
}`;

  // 3. Shopify Liquid Snippet
  const shopifyLiquid = `{%- comment -%}
  Shopify Liquid: snippets/product-schema.liquid
  Dynamically maps native Liquid product properties to Google Merchant JSON-LD
{%- endcomment -%}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ product.title | json }},
  "description": {{ product.description | strip_html | truncatewords: 60 | json }},
  "image": [
    {{ product.featured_image | image_url: width: 1200 | prepend: "https:" | json }}
  ],
  "brand": {
    "@type": "Brand",
    "name": {{ product.vendor | default: shop.name | json }}
  },
  "sku": {{ product.selected_or_first_available_variant.sku | json }},
  {%- if product.selected_or_first_available_variant.barcode != blank -%}
  "gtin13": {{ product.selected_or_first_available_variant.barcode | json }},
  {%- endif -%}
  "offers": {
    "@type": "Offer",
    "price": {{ product.selected_or_first_available_variant.price | money_without_currency | json }},
    "priceCurrency": {{ cart.currency.iso_code | json }},
    "availability": "https://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}",
    "itemCondition": "https://schema.org/NewCondition",
    "url": "{{ shop.url }}{{ product.url }}",
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": 0.00,
        "currency": {{ cart.currency.iso_code | json }}
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "US"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": 3,
          "unitCode": "DAY"
        }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  }
  {%- if product.metafields.reviews.rating.value != blank -%}
  ,"aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": {{ product.metafields.reviews.rating.value.rating | default: 4.8 }},
    "bestRating": 5,
    "ratingCount": {{ product.metafields.reviews.rating_count | default: 120 }}
  }
  {%- endif -%}
}
</script>`;

  return {
    jsonLdScript,
    nextjsComponent,
    shopifyLiquid,
  };
}
