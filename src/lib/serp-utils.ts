// Google SERP typography constants
export const SERP_LIMITS = {
  desktopTitlePx: 600,
  desktopTitleChars: 60,
  mobileTitlePx: 580,
  mobileTitleChars: 55,
  desktopDescPx: 960,
  desktopDescChars: 160,
  mobileDescPx: 680,
  mobileDescChars: 120,
} as const;

export const CHAR_WIDTH_20PX_ARIAL: Record<string, number> = {
  a: 11, b: 12, c: 11, d: 12, e: 11, f: 6, g: 12, h: 12, i: 5, j: 5, k: 11, l: 5, m: 18, n: 12, o: 12, p: 12, q: 12, r: 7, s: 11, t: 6, u: 12, v: 11, w: 16, x: 11, y: 11, z: 10,
  A: 14, B: 14, C: 15, D: 15, E: 14, F: 13, G: 16, H: 15, I: 5, J: 10, K: 14, L: 12, M: 18, N: 15, O: 16, P: 14, Q: 16, R: 15, S: 14, T: 13, U: 15, V: 14, W: 20, X: 14, Y: 14, Z: 13,
  "0": 12, "1": 12, "2": 12, "3": 12, "4": 12, "5": 12, "6": 12, "7": 12, "8": 12, "9": 12,
  " ": 6, "-": 7, "|": 6, ":": 6, ";": 6, ".": 6, ",": 6, "!": 6, "?": 11, "(": 7, ")": 7, "[": 7, "]": 7, "/": 6, "&": 15, "%": 19, "+": 12, "@": 20
};

export const CHAR_WIDTH_18PX_ARIAL: Record<string, number> = {
  a: 10, b: 11, c: 10, d: 11, e: 10, f: 5, g: 11, h: 11, i: 4.5, j: 4.5, k: 10, l: 4.5, m: 16, n: 11, o: 11, p: 11, q: 11, r: 6, s: 10, t: 5, u: 11, v: 10, w: 14.5, x: 10, y: 10, z: 9,
  A: 12.5, B: 12.5, C: 13.5, D: 13.5, E: 12.5, F: 11.5, G: 14.5, H: 13.5, I: 4.5, J: 9, K: 12.5, L: 11, M: 16, N: 13.5, O: 14.5, P: 12.5, Q: 14.5, R: 13.5, S: 12.5, T: 11.5, U: 13.5, V: 12.5, W: 18, X: 12.5, Y: 12.5, Z: 11.5,
  "0": 11, "1": 11, "2": 11, "3": 11, "4": 11, "5": 11, "6": 11, "7": 11, "8": 11, "9": 11,
  " ": 5.5, "-": 6, "|": 5.5, ":": 5.5, ";": 5.5, ".": 5.5, ",": 5.5, "!": 5.5, "?": 10, "(": 6, ")": 6, "[": 6, "]": 6, "/": 5.5, "&": 13.5, "%": 17, "+": 11, "@": 18
};

export const CHAR_WIDTH_14PX_ARIAL: Record<string, number> = {
  a: 8, b: 8, c: 7, d: 8, e: 8, f: 4, g: 8, h: 8, i: 3, j: 3, k: 7, l: 3, m: 12, n: 8, o: 8, p: 8, q: 8, r: 5, s: 7, t: 4, u: 8, v: 7, w: 11, x: 7, y: 7, z: 7,
  A: 10, B: 10, C: 10, D: 10, E: 9, F: 9, G: 11, H: 10, I: 4, J: 7, K: 9, L: 8, M: 13, N: 10, O: 11, P: 10, Q: 11, R: 10, S: 10, T: 9, U: 10, V: 9, W: 14, X: 9, Y: 9, Z: 9,
  "0": 8, "1": 8, "2": 8, "3": 8, "4": 8, "5": 8, "6": 8, "7": 8, "8": 8, "9": 8,
  " ": 4, "-": 5, "|": 4, ":": 4, ";": 4, ".": 4, ",": 4, "!": 4, "?": 8, "(": 5, ")": 5, "/": 4, "&": 10, "%": 13, "+": 8
};

// Singleton canvas element for high-precision text metrics in browser
let measurementCanvas: HTMLCanvasElement | null = null;
let measurementContext: CanvasRenderingContext2D | null = null;

// High-performance memoization caches for zero-reflow execution
const CANVAS_PX_CACHE = new Map<string, number>();
const TRUNCATION_CACHE = new Map<string, { text: string; truncated: boolean }>();
const MAX_CACHE_ENTRIES = 2000;

/**
 * Pure client-side Canvas 2D text measurement with Google Arial font rendering.
 * Falls back to lookup table on SSR or if canvas is unavailable.
 */
export function measureTextWidth(text: string, font: string): number {
  if (!text) return 0;
  const cacheKey = `${font}::${text}`;
  const cached = CANVAS_PX_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;

  let width = 0;

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    try {
      if (!measurementCanvas) {
        measurementCanvas = document.createElement("canvas");
      }
      if (!measurementContext && measurementCanvas) {
        measurementContext = measurementCanvas.getContext("2d", { willReadFrequently: false });
      }
      if (measurementContext) {
        measurementContext.font = font;
        width = Math.round(measurementContext.measureText(text).width);
      }
    } catch {
      // Fallback below
    }
  }

  // Server-side or canvas failure fallback
  if (width === 0) {
    const isMobileTitle = font.includes("18px");
    const isTitle = font.includes("20px") || isMobileTitle;
    const dict = isTitle
      ? isMobileTitle
        ? CHAR_WIDTH_18PX_ARIAL
        : CHAR_WIDTH_20PX_ARIAL
      : CHAR_WIDTH_14PX_ARIAL;
    const defaultWidth = isTitle ? (isMobileTitle ? 10 : 11) : 7.5;

    let total = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      total += dict[char] || defaultWidth;
    }
    width = Math.round(total);
  }

  if (CANVAS_PX_CACHE.size >= MAX_CACHE_ENTRIES) {
    CANVAS_PX_CACHE.clear();
  }
  CANVAS_PX_CACHE.set(cacheKey, width);
  return width;
}

/**
 * Calculates exact pixel width of title (Desktop 20px Arial or Mobile 18px Arial).
 */
export function calculateTitlePixels(text: string, isMobile = false): number {
  const font = isMobile ? "18px Arial, sans-serif" : "20px Arial, sans-serif";
  return measureTextWidth(text, font);
}

/**
 * Calculates exact pixel width of description (Desktop 14px Arial or Mobile 13px Arial).
 */
export function calculateDescPixels(text: string, isMobile = false): number {
  const font = isMobile ? "13px Arial, sans-serif" : "14px Arial, sans-serif";
  return measureTextWidth(text, font);
}

/**
 * Truncates text to fit within a given pixel threshold, appending an ellipsis if truncated.
 */
export function truncateToPixels(
  text: string,
  maxPx: number,
  isTitle = true,
  isMobile = false
): { text: string; truncated: boolean } {
  if (!text) return { text: "", truncated: false };

  const cacheKey = `${isTitle ? "t" : "d"}:${isMobile ? "m" : "d"}:${maxPx}:${text}`;
  const cached = TRUNCATION_CACHE.get(cacheKey);
  if (cached) return cached;

  const font = isTitle
    ? isMobile
      ? "18px Arial, sans-serif"
      : "20px Arial, sans-serif"
    : isMobile
    ? "13px Arial, sans-serif"
    : "14px Arial, sans-serif";

  const totalWidth = measureTextWidth(text, font);
  if (totalWidth <= maxPx) {
    const res = { text, truncated: false };
    if (TRUNCATION_CACHE.size >= MAX_CACHE_ENTRIES) TRUNCATION_CACHE.clear();
    TRUNCATION_CACHE.set(cacheKey, res);
    return res;
  }

  let low = 0;
  let high = text.length;
  let bestFit = "";

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const candidate = text.slice(0, mid).trim() + " ...";
    const width = measureTextWidth(candidate, font);

    if (width <= maxPx) {
      bestFit = candidate;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  const res = { text: bestFit || text.slice(0, 10) + " ...", truncated: true };
  if (TRUNCATION_CACHE.size >= MAX_CACHE_ENTRIES) TRUNCATION_CACHE.clear();
  TRUNCATION_CACHE.set(cacheKey, res);
  return res;
}

export interface CtrTip {
  id: string;
  text: string;
  passed: boolean;
  impact: "High" | "Medium" | "Low";
}

export interface CtrAnalysis {
  score: number;
  grade: "Excellent" | "Good" | "Needs Improvement" | "Poor";
  tips: CtrTip[];
}

export function analyzeCtr(title: string, description: string): CtrAnalysis {
  const tips: CtrTip[] = [];
  let score = 0;

  const titlePx = calculateTitlePixels(title, false);
  const titleOptimal = titlePx >= 350 && titlePx <= 580;
  tips.push({
    id: "title-length",
    text: "Title width is optimal (350px - 580px) to prevent cutoffs while maximizing visibility",
    passed: titleOptimal,
    impact: "High",
  });
  if (titleOptimal) score += 25;
  else if (titlePx > 0 && titlePx < 350) score += 10;

  const hasNumbers = /\d+/.test(title);
  tips.push({
    id: "numbers",
    text: "Title contains specific numbers or a year (e.g. 2026, 10 Tips)",
    passed: hasNumbers,
    impact: "Medium",
  });
  if (hasNumbers) score += 15;

  const powerWords = [
    "best", "guide", "free", "easy", "step", "fast", "top", "ultimate", "review",
    "how", "why", "proven", "instant", "tool", "checklist", "simulator", "online"
  ];
  const hasPowerWord = powerWords.some((w) => new RegExp("\\b" + w + "\\b", "i").test(title));
  tips.push({
    id: "power-word",
    text: "Title includes high-CTR power words (e.g. Best, Free, Guide, Fast, Ultimate)",
    passed: hasPowerWord,
    impact: "High",
  });
  if (hasPowerWord) score += 20;

  const hasSeparator = /[-|–—:]/.test(title);
  tips.push({
    id: "separator",
    text: "Title uses a brand separator like | or - for professional formatting",
    passed: hasSeparator,
    impact: "Low",
  });
  if (hasSeparator) score += 10;

  const descPx = calculateDescPixels(description, false);
  const descOptimal = descPx >= 500 && descPx <= 920;
  tips.push({
    id: "desc-length",
    text: "Description is between 500px and 920px (approx 120-155 characters)",
    passed: descOptimal,
    impact: "High",
  });
  if (descOptimal) score += 20;
  else if (descPx > 0 && descPx < 500) score += 10;

  const ctaWords = ["learn", "discover", "get", "try", "download", "find", "check", "calculate", "preview", "explore", "start", "simulate"];
  const hasCta = ctaWords.some((w) => new RegExp("\\b" + w + "\\b", "i").test(description));
  tips.push({
    id: "cta",
    text: "Description contains a clear Call to Action (e.g. Discover, Try, Get, Explore)",
    passed: hasCta,
    impact: "Medium",
  });
  if (hasCta) score += 10;

  let grade: CtrAnalysis["grade"] = "Poor";
  if (score >= 80) grade = "Excellent";
  else if (score >= 60) grade = "Good";
  else if (score >= 40) grade = "Needs Improvement";

  return { score, grade, tips };
}

export interface RichSnippetConfig {
  includeRating?: boolean;
  ratingValue?: string;
  ratingCount?: string;
  includeDate?: boolean;
  publishDate?: string;
  includeFavicon?: boolean;
}

export function generateMetaHtml(
  title: string,
  description: string,
  canonicalUrl: string,
  richSnippet?: RichSnippetConfig
): string {
  let html = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<link rel="canonical" href="${canonicalUrl}">`;

  if (richSnippet?.includeRating) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: title,
      description: description,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: richSnippet.ratingValue || "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: richSnippet.ratingCount?.replace(/[^0-9]/g, "") || "124",
      },
    };
    html += `\n\n<!-- Schema.org Rich Snippet Structured Data -->\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

  return html;
}
