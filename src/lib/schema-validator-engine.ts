/**
 * Pure Client-Side JSON-LD Schema Validator & Linter Engine
 * Conforms to W3C JSON-LD 1.1 and Google Search Central Structured Data specifications.
 */

export type IssueSeverity = "error" | "warning" | "info";

export interface SchemaValidationIssue {
  severity: IssueSeverity;
  type: string;
  property?: string;
  message: string;
  suggestion: string;
  line?: number;
}

export interface DetectedEntity {
  type: string;
  context?: string;
  name?: string;
  headline?: string;
  id?: string;
  raw: any;
  issues: SchemaValidationIssue[];
}

export interface SchemaValidationResult {
  isValidJson: boolean;
  isValidSchema: boolean;
  hasWarnings: boolean;
  parseError?: {
    message: string;
    line?: number;
    column?: number;
  };
  detectedEntities: DetectedEntity[];
  issues: SchemaValidationIssue[];
  totalErrors: number;
  totalWarnings: number;
  totalInfo: number;
  stats: {
    bytes: number;
    lines: number;
    entitiesCount: number;
  };
  formattedJson?: string;
}

/**
 * Strips HTML script tags if present
 */
export function extractJsonFromHtmlOrRaw(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  // Check if wrapped in <script type="application/ld+json">...</script>
  const scriptRegex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [...trimmed.matchAll(scriptRegex)];

  if (matches.length > 0) {
    if (matches.length === 1) {
      return matches[0][1].trim();
    }
    // If multiple script tags, wrap them in a @graph array for unified validation
    const parsedBlocks: any[] = [];
    for (const match of matches) {
      try {
        const parsed = JSON.parse(match[1].trim());
        if (Array.isArray(parsed)) {
          parsedBlocks.push(...parsed);
        } else if (parsed && parsed["@graph"] && Array.isArray(parsed["@graph"])) {
          parsedBlocks.push(...parsed["@graph"]);
        } else if (parsed) {
          parsedBlocks.push(parsed);
        }
      } catch {
        // Return raw concatenated if JSON parse fails
        return match[1].trim();
      }
    }
    return JSON.stringify({ "@context": "https://schema.org", "@graph": parsedBlocks }, null, 2);
  }

  // Also check if general <script> tag without explicit type
  const genericScriptRegex = /^<script\b[^>]*>([\s\S]*?)<\/script>$/i;
  const genericMatch = trimmed.match(genericScriptRegex);
  if (genericMatch) {
    return genericMatch[1].trim();
  }

  return trimmed;
}

/**
 * Attempts to locate approximate line/column number from JSON parse error message
 */
function findJsonParseErrorPosition(
  error: Error,
  rawText: string
): { message: string; line?: number; column?: number } {
  const msg = error.message;
  let line: number | undefined;
  let column: number | undefined;

  // e.g. "Unexpected token } in JSON at position 142" or "at line 5 column 10"
  const lineColMatch = msg.match(/line (\d+) column (\d+)/i);
  if (lineColMatch) {
    line = parseInt(lineColMatch[1], 10);
    column = parseInt(lineColMatch[2], 10);
  } else {
    const posMatch = msg.match(/position (\d+)/i);
    if (posMatch) {
      const position = parseInt(posMatch[1], 10);
      const lines = rawText.slice(0, position).split("\n");
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }
  }

  return { message: msg, line, column };
}

/**
 * Validates a single JSON-LD entity against Schema.org and Google Rich Snippet rules
 */
function validateEntity(entity: any, parentContext?: string): { entityInfo: DetectedEntity; issues: SchemaValidationIssue[] } {
  const issues: SchemaValidationIssue[] = [];
  const entityType = entity["@type"] || "UnknownType";
  const entityContext = entity["@context"] || parentContext;

  const entityInfo: DetectedEntity = {
    type: Array.isArray(entityType) ? entityType.join(", ") : String(entityType),
    context: typeof entityContext === "string" ? entityContext : undefined,
    name: entity.name || entity.headline,
    headline: entity.headline,
    id: entity["@id"],
    raw: entity,
    issues: [],
  };

  // 1. Context validation
  if (!entityContext) {
    issues.push({
      severity: "error",
      type: "Schema Context Missing",
      property: "@context",
      message: 'Missing "@context" declaration.',
      suggestion: 'Add `"@context": "https://schema.org"` at the root of your JSON-LD object.',
    });
  } else if (
    typeof entityContext === "string" &&
    !entityContext.includes("schema.org")
  ) {
    issues.push({
      severity: "warning",
      type: "Non-standard Context",
      property: "@context",
      message: `Non-standard @context URI: "${entityContext}".`,
      suggestion: 'Google and major search engines standard is `"@context": "https://schema.org"`.',
    });
  } else if (typeof entityContext === "string" && entityContext.startsWith("http://")) {
    issues.push({
      severity: "info",
      type: "Insecure Context Protocol",
      property: "@context",
      message: 'Using HTTP rather than HTTPS in "@context".',
      suggestion: 'Upgrade to `"@context": "https://schema.org"` for modern security standards.',
    });
  }

  // 2. Type validation
  if (!entity["@type"]) {
    issues.push({
      severity: "error",
      type: "Schema Type Missing",
      property: "@type",
      message: 'Missing "@type" declaration.',
      suggestion: 'Declare an entity type like `"@type": "Article"`, `"@type": "Product"`, or `"@type": "FAQPage"`.',
    });
  }

  const primaryType = Array.isArray(entity["@type"])
    ? entity["@type"][0]
    : String(entity["@type"] || "");

  // 3. Type-specific Google Rich Result Rules
  switch (primaryType) {
    // -------------------------------------------------------------
    // Article / BlogPosting / NewsArticle / TechArticle
    // -------------------------------------------------------------
    case "Article":
    case "BlogPosting":
    case "NewsArticle":
    case "TechArticle": {
      if (!entity.headline && !entity.name) {
        issues.push({
          severity: "error",
          type: "Article Requirement",
          property: "headline",
          message: 'Missing required "headline" property.',
          suggestion: 'Provide a concise, descriptive title in `"headline": "..."` (max 110 characters recommended).',
        });
      }

      if (!entity.image) {
        issues.push({
          severity: "warning",
          type: "Rich Snippet Enhancement",
          property: "image",
          message: 'Missing "image" property.',
          suggestion: 'Google requires high-resolution images (at least 1200px wide) for Google Discover and Article carousels.',
        });
      }

      if (!entity.datePublished) {
        issues.push({
          severity: "error",
          type: "Article Requirement",
          property: "datePublished",
          message: 'Missing required "datePublished" property.',
          suggestion: 'Add an ISO 8601 timestamp, e.g. `"datePublished": "2026-09-29T12:00:00+00:00"`.',
        });
      }

      if (!entity.author) {
        issues.push({
          severity: "error",
          type: "Article Requirement",
          property: "author",
          message: 'Missing required "author" property.',
          suggestion: 'Provide author details: `"author": { "@type": "Person", "name": "Author Name" }`.',
        });
      } else if (typeof entity.author === "object" && !entity.author.name && !Array.isArray(entity.author)) {
        issues.push({
          severity: "error",
          type: "Author Schema Incomplete",
          property: "author.name",
          message: 'Author object is missing "name" property.',
          suggestion: 'Add a `"name"` attribute inside the author entity.',
        });
      }

      if (!entity.dateModified) {
        issues.push({
          severity: "info",
          type: "Article Freshness",
          property: "dateModified",
          message: 'Missing optional "dateModified" property.',
          suggestion: 'Include `"dateModified"` to signal content updates to search engine crawlers.',
        });
      }
      break;
    }

    // -------------------------------------------------------------
    // Product
    // -------------------------------------------------------------
    case "Product": {
      if (!entity.name) {
        issues.push({
          severity: "error",
          type: "Product Requirement",
          property: "name",
          message: 'Missing required "name" property.',
          suggestion: 'Provide the full commercial product title in `"name": "..."`.',
        });
      }

      if (!entity.image) {
        issues.push({
          severity: "error",
          type: "Product Requirement",
          property: "image",
          message: 'Missing required "image" property.',
          suggestion: 'Provide an image URL or array of URLs for Google Shopping and Product rich cards.',
        });
      }

      if (!entity.offers) {
        issues.push({
          severity: "error",
          type: "Product Requirement",
          property: "offers",
          message: 'Missing required "offers" property.',
          suggestion: 'Add an Offer object: `"offers": { "@type": "Offer", "price": "99.99", "priceCurrency": "USD" }`.',
        });
      } else if (typeof entity.offers === "object" && !Array.isArray(entity.offers)) {
        const offer = entity.offers;
        if (offer.price === undefined && offer.lowPrice === undefined) {
          issues.push({
            severity: "error",
            type: "Offer Requirement",
            property: "offers.price",
            message: 'Offer is missing numeric "price" or "lowPrice".',
            suggestion: 'Specify price as a numeric string (e.g. `"price": "49.99"`). Do not include currency symbols ($ or €).',
          });
        }
        if (!offer.priceCurrency) {
          issues.push({
            severity: "error",
            type: "Offer Requirement",
            property: "offers.priceCurrency",
            message: 'Offer is missing 3-letter "priceCurrency" code.',
            suggestion: 'Add a 3-letter ISO 4217 currency code like `"priceCurrency": "USD"` or `"priceCurrency": "EUR"`.',
          });
        }
        if (!offer.availability) {
          issues.push({
            severity: "warning",
            type: "Offer Enhancement",
            property: "offers.availability",
            message: 'Missing "offers.availability" status.',
            suggestion: 'Use standard Schema.org URI: `"availability": "https://schema.org/InStock"` or `"https://schema.org/OutOfStock"`.',
          });
        }
      }

      if (!entity.brand) {
        issues.push({
          severity: "warning",
          type: "Product Enhancement",
          property: "brand",
          message: 'Missing "brand" property.',
          suggestion: 'Provide brand information: `"brand": { "@type": "Brand", "name": "Brand Name" }`.',
        });
      }

      const hasIdentifier = entity.gtin || entity.gtin13 || entity.gtin8 || entity.gtin12 || entity.gtin14 || entity.mpn || entity.sku;
      if (!hasIdentifier) {
        issues.push({
          severity: "warning",
          type: "Merchant Center Warning",
          property: "sku / gtin",
          message: 'Missing global trade identifiers (gtin13, gtin8, mpn, or sku).',
          suggestion: 'Add unique product barcodes or SKUs to qualify for Google Merchant Center free shopping panels.',
        });
      }

      if (!entity.aggregateRating && !entity.review) {
        issues.push({
          severity: "info",
          type: "Star Ratings Eligibility",
          property: "aggregateRating",
          message: 'No "aggregateRating" or "review" data found.',
          suggestion: 'Add `"aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "120" }` to show gold stars in SERPs.',
        });
      }
      break;
    }

    // -------------------------------------------------------------
    // FAQPage
    // -------------------------------------------------------------
    case "FAQPage": {
      if (!entity.mainEntity || !Array.isArray(entity.mainEntity) || entity.mainEntity.length === 0) {
        issues.push({
          severity: "error",
          type: "FAQPage Requirement",
          property: "mainEntity",
          message: 'Missing or empty "mainEntity" array.',
          suggestion: 'Provide a non-empty array of Question objects under `"mainEntity": [ ... ]`.',
        });
      } else {
        entity.mainEntity.forEach((q: any, qIdx: number) => {
          if (!q["@type"] || q["@type"] !== "Question") {
            issues.push({
              severity: "warning",
              type: "FAQ Question Type",
              property: `mainEntity[${qIdx}].@type`,
              message: `FAQ item #${qIdx + 1} missing "@type": "Question".`,
              suggestion: 'Set `"@type": "Question"` for each item in the mainEntity array.',
            });
          }
          if (!q.name) {
            issues.push({
              severity: "error",
              type: "FAQ Question Text",
              property: `mainEntity[${qIdx}].name`,
              message: `FAQ item #${qIdx + 1} is missing the question text in "name".`,
              suggestion: 'Add the question string in `"name": "What is ...?"`.',
            });
          }
          if (!q.acceptedAnswer) {
            issues.push({
              severity: "error",
              type: "FAQ Answer Missing",
              property: `mainEntity[${qIdx}].acceptedAnswer`,
              message: `FAQ item #${qIdx + 1} is missing "acceptedAnswer".`,
              suggestion: 'Add `"acceptedAnswer": { "@type": "Answer", "text": "Detailed answer..." }`.',
            });
          } else if (!q.acceptedAnswer.text) {
            issues.push({
              severity: "error",
              type: "FAQ Answer Text Missing",
              property: `mainEntity[${qIdx}].acceptedAnswer.text`,
              message: `FAQ item #${qIdx + 1} acceptedAnswer is missing "text".`,
              suggestion: 'Add the response body in `"text": "..."`.',
            });
          }
        });
      }
      break;
    }

    // -------------------------------------------------------------
    // BreadcrumbList
    // -------------------------------------------------------------
    case "BreadcrumbList": {
      if (!entity.itemListElement || !Array.isArray(entity.itemListElement) || entity.itemListElement.length === 0) {
        issues.push({
          severity: "error",
          type: "BreadcrumbList Requirement",
          property: "itemListElement",
          message: 'Missing or empty "itemListElement" array.',
          suggestion: 'Provide an ordered array of ListItem objects under `"itemListElement": [ ... ]`.',
        });
      } else {
        let lastPos = 0;
        entity.itemListElement.forEach((item: any, iIdx: number) => {
          if (item.position === undefined) {
            issues.push({
              severity: "error",
              type: "Breadcrumb Position",
              property: `itemListElement[${iIdx}].position`,
              message: `Breadcrumb item #${iIdx + 1} is missing "position".`,
              suggestion: `Set "position": ${iIdx + 1} as a 1-indexed sequential integer.`,
            });
          } else if (item.position !== lastPos + 1) {
            issues.push({
              severity: "warning",
              type: "Breadcrumb Sequence",
              property: `itemListElement[${iIdx}].position`,
              message: `Breadcrumb position jump detected (expected ${lastPos + 1}, found ${item.position}).`,
              suggestion: 'Ensure positions are strictly sequential 1, 2, 3...',
            });
            lastPos = item.position;
          } else {
            lastPos = item.position;
          }

          if (!item.name) {
            issues.push({
              severity: "error",
              type: "Breadcrumb Label",
              property: `itemListElement[${iIdx}].name`,
              message: `Breadcrumb item #${iIdx + 1} is missing "name".`,
              suggestion: 'Provide the breadcrumb label in `"name": "Home"` or `"name": "Category"`.',
            });
          }

          if (!item.item && iIdx < entity.itemListElement.length - 1) {
            issues.push({
              severity: "warning",
              type: "Breadcrumb URL Missing",
              property: `itemListElement[${iIdx}].item`,
              message: `Breadcrumb item #${iIdx + 1} is missing "item" URL.`,
              suggestion: 'Intermediate breadcrumbs must contain a canonical URL in `"item": "https://..."`.',
            });
          }
        });
      }
      break;
    }

    // -------------------------------------------------------------
    // HowTo
    // -------------------------------------------------------------
    case "HowTo": {
      if (!entity.name) {
        issues.push({
          severity: "error",
          type: "HowTo Requirement",
          property: "name",
          message: 'Missing required "name" property for HowTo title.',
          suggestion: 'Add `"name": "How to ..."` describing the guide title.',
        });
      }

      if (!entity.step || !Array.isArray(entity.step) || entity.step.length === 0) {
        issues.push({
          severity: "error",
          type: "HowTo Steps Missing",
          property: "step",
          message: 'Missing or empty "step" array.',
          suggestion: 'Provide an array of HowToStep objects in `"step": [ ... ]`.',
        });
      } else {
        entity.step.forEach((stepItem: any, sIdx: number) => {
          if (!stepItem.text && !stepItem.name && !stepItem.itemListElement) {
            issues.push({
              severity: "error",
              type: "HowTo Step Content",
              property: `step[${sIdx}]`,
              message: `Step #${sIdx + 1} is missing "text" or "name" instruction.`,
              suggestion: 'Add clear actionable text to the step item.',
            });
          }
        });
      }
      break;
    }

    // -------------------------------------------------------------
    // Organization / LocalBusiness
    // -------------------------------------------------------------
    case "Organization":
    case "LocalBusiness":
    case "Corporation": {
      if (!entity.name) {
        issues.push({
          severity: "error",
          type: "Organization Requirement",
          property: "name",
          message: 'Missing required "name" property.',
          suggestion: 'Add the official organization name in `"name": "..."`.',
        });
      }
      if (!entity.url) {
        issues.push({
          severity: "warning",
          type: "Organization Requirement",
          property: "url",
          message: 'Missing "url" property.',
          suggestion: 'Include the primary homepage URL in `"url": "https://..."`.',
        });
      }
      if (!entity.logo) {
        issues.push({
          severity: "info",
          type: "Google Knowledge Panel",
          property: "logo",
          message: 'Missing "logo" property.',
          suggestion: 'Provide a square logo URL (min 112x112px) for Google Knowledge Graph integration.',
        });
      }
      break;
    }

    // -------------------------------------------------------------
    // WebSite
    // -------------------------------------------------------------
    case "WebSite": {
      if (!entity.name) {
        issues.push({
          severity: "warning",
          type: "WebSite Requirement",
          property: "name",
          message: 'Missing "name" property for Site Name snippet display.',
          suggestion: 'Specify your brand name in `"name": "..."` to control Google SERP site name headers.',
        });
      }
      if (!entity.url) {
        issues.push({
          severity: "error",
          type: "WebSite Requirement",
          property: "url",
          message: 'Missing required "url" property.',
          suggestion: 'Add the root canonical URL in `"url": "https://..."`.',
        });
      }
      break;
    }

    default: {
      if (!entity.name && !entity.headline && !entity.title) {
        issues.push({
          severity: "info",
          type: "Generic Entity Identification",
          property: "name",
          message: `Entity of type "${primaryType}" has no "name" or "headline" label.`,
          suggestion: 'Adding a `"name"` property helps search crawlers identify this entity.',
        });
      }
      break;
    }
  }

  entityInfo.issues = issues;
  return { entityInfo, issues };
}

/**
 * Main Linter Entrypoint
 */
export function validateJsonLd(rawInput: string): SchemaValidationResult {
  const cleanInput = extractJsonFromHtmlOrRaw(rawInput);
  const bytes = new TextEncoder().encode(rawInput).length;
  const lines = rawInput.split("\n").length;

  if (!cleanInput) {
    return {
      isValidJson: false,
      isValidSchema: false,
      hasWarnings: false,
      detectedEntities: [],
      issues: [
        {
          severity: "info",
          type: "Empty Input",
          message: "Paste your JSON-LD object or HTML script tag above to begin linting.",
          suggestion: "Click any of the sample preset buttons to load verified Schema.org snippets.",
        },
      ],
      totalErrors: 0,
      totalWarnings: 0,
      totalInfo: 1,
      stats: { bytes, lines, entitiesCount: 0 },
    };
  }

  // 1. JSON Syntax Parse Check
  let parsedObject: any;
  try {
    parsedObject = JSON.parse(cleanInput);
  } catch (err: any) {
    const parsePos = findJsonParseErrorPosition(err, cleanInput);
    return {
      isValidJson: false,
      isValidSchema: false,
      hasWarnings: false,
      parseError: parsePos,
      detectedEntities: [],
      issues: [
        {
          severity: "error",
          type: "JSON Syntax Error",
          message: `Malformed JSON: ${parsePos.message}`,
          suggestion:
            parsePos.message.includes("Unexpected token }") || parsePos.message.includes("Unexpected token ,")
              ? "Check for trailing commas after the last property or unescaped quotes inside strings."
              : parsePos.message.includes("Unexpected end of JSON")
              ? "Ensure all open braces '{' and brackets '[' are properly closed."
              : "Verify that all object keys are enclosed in double quotes.",
          line: parsePos.line,
        },
      ],
      totalErrors: 1,
      totalWarnings: 0,
      totalInfo: 0,
      stats: { bytes, lines, entitiesCount: 0 },
    };
  }

  // 2. Extract Entities (Single, Array, or @graph)
  const detectedEntities: DetectedEntity[] = [];
  const allIssues: SchemaValidationIssue[] = [];

  const topLevelContext = parsedObject["@context"];

  if (Array.isArray(parsedObject)) {
    parsedObject.forEach((item) => {
      if (item && typeof item === "object") {
        const { entityInfo, issues } = validateEntity(item, topLevelContext);
        detectedEntities.push(entityInfo);
        allIssues.push(...issues);
      }
    });
  } else if (parsedObject && typeof parsedObject === "object") {
    if (parsedObject["@graph"] && Array.isArray(parsedObject["@graph"])) {
      parsedObject["@graph"].forEach((item: any) => {
        if (item && typeof item === "object") {
          const { entityInfo, issues } = validateEntity(item, topLevelContext);
          detectedEntities.push(entityInfo);
          allIssues.push(...issues);
        }
      });
    } else {
      const { entityInfo, issues } = validateEntity(parsedObject, topLevelContext);
      detectedEntities.push(entityInfo);
      allIssues.push(...issues);
    }
  } else {
    allIssues.push({
      severity: "error",
      type: "Invalid Root Object",
      message: "Root JSON-LD payload must be an object or an array of objects.",
      suggestion: 'Wrap your properties in an object: `{ "@context": "https://schema.org", ... }`.',
    });
  }

  const totalErrors = allIssues.filter((i) => i.severity === "error").length;
  const totalWarnings = allIssues.filter((i) => i.severity === "warning").length;
  const totalInfo = allIssues.filter((i) => i.severity === "info").length;

  let formattedJson: string | undefined;
  try {
    formattedJson = JSON.stringify(parsedObject, null, 2);
  } catch {
    // ignore
  }

  return {
    isValidJson: true,
    isValidSchema: totalErrors === 0,
    hasWarnings: totalWarnings > 0,
    detectedEntities,
    issues: allIssues,
    totalErrors,
    totalWarnings,
    totalInfo,
    stats: {
      bytes,
      lines,
      entitiesCount: detectedEntities.length,
    },
    formattedJson,
  };
}
