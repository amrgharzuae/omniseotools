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
};

const CHAR_WIDTH_20PX_ARIAL = {
  a: 11, b: 12, c: 11, d: 12, e: 11, f: 6, g: 12, h: 12, i: 5, j: 5, k: 11, l: 5, m: 18, n: 12, o: 12, p: 12, q: 12, r: 7, s: 11, t: 6, u: 12, v: 11, w: 16, x: 11, y: 11, z: 10,
  A: 14, B: 14, C: 15, D: 15, E: 14, F: 13, G: 16, H: 15, I: 5, J: 10, K: 14, L: 12, M: 18, N: 15, O: 16, P: 14, Q: 16, R: 15, S: 14, T: 13, U: 15, V: 14, W: 20, X: 14, Y: 14, Z: 13,
  "0": 12, "1": 12, "2": 12, "3": 12, "4": 12, "5": 12, "6": 12, "7": 12, "8": 12, "9": 12,
  " ": 6, "-": 7, "|": 6, ":": 6, ";": 6, ".": 6, ",": 6, "!": 6, "?": 11, "(": 7, ")": 7, "[": 7, "]": 7, "/": 6, "&": 15, "%": 19, "+": 12, "@": 20
};

const CHAR_WIDTH_14PX_ARIAL = {
  a: 8, b: 8, c: 7, d: 8, e: 8, f: 4, g: 8, h: 8, i: 3, j: 3, k: 7, l: 3, m: 12, n: 8, o: 8, p: 8, q: 8, r: 5, s: 7, t: 4, u: 8, v: 7, w: 11, x: 7, y: 7, z: 7,
  A: 10, B: 10, C: 10, D: 10, E: 9, F: 9, G: 11, H: 10, I: 4, J: 7, K: 9, L: 8, M: 13, N: 10, O: 11, P: 10, Q: 11, R: 10, S: 10, T: 9, U: 10, V: 9, W: 14, X: 9, Y: 9, Z: 9,
  "0": 8, "1": 8, "2": 8, "3": 8, "4": 8, "5": 8, "6": 8, "7": 8, "8": 8, "9": 8,
  " ": 4, "-": 5, "|": 4, ":": 4, ";": 4, ".": 4, ",": 4, "!": 4, "?": 8, "(": 5, ")": 5, "/": 4, "&": 10, "%": 13, "+": 8
};

export function calculateTitlePixels(text: string): number {
  if (!text) return 0;
  let total = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    total += (CHAR_WIDTH_20PX_ARIAL as any)[char] || 11;
  }
  return total;
}

export function calculateDescPixels(text: string): number {
  if (!text) return 0;
  let total = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    total += (CHAR_WIDTH_14PX_ARIAL as any)[char] || 7.5;
  }
  return Math.round(total);
}

export function truncateToPixels(text: string, maxPx: number, isTitle = true): { text: string; truncated: boolean } {
  const calc = isTitle ? calculateTitlePixels : calculateDescPixels;
  if (calc(text) <= maxPx) {
    return { text, truncated: false };
  }
  let current = "";
  for (let i = 0; i < text.length; i++) {
    const next = current + text[i];
    if (calc(next + " ...") > maxPx) {
      return { text: current.trim() + " ...", truncated: true };
    }
    current = next;
  }
  return { text: current.trim() + " ...", truncated: true };
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

  const titlePx = calculateTitlePixels(title);
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

  const powerWords = ["best", "guide", "free", "easy", "step", "fast", "top", "ultimate", "review", "how", "why", "proven", "instant", "tool"];
  const hasPowerWord = powerWords.some((w) => new RegExp("\\b" + w + "\\b", "i").test(title));
  tips.push({
    id: "power-word",
    text: "Title includes high-CTR power words (e.g. Best, Free, Guide, Fast, Ultimate)",
    passed: hasPowerWord,
    impact: "High",
  });
  if (hasPowerWord) score += 20;

  const hasSeparator = /[-|–—]/.test(title);
  tips.push({
    id: "separator",
    text: "Title uses a brand separator like | or - for professional formatting",
    passed: hasSeparator,
    impact: "Low",
  });
  if (hasSeparator) score += 10;

  const descPx = calculateDescPixels(description);
  const descOptimal = descPx >= 500 && descPx <= 920;
  tips.push({
    id: "desc-length",
    text: "Description is between 500px and 920px (approx 120-155 characters)",
    passed: descOptimal,
    impact: "High",
  });
  if (descOptimal) score += 20;
  else if (descPx > 0 && descPx < 500) score += 10;

  const ctaWords = ["learn", "discover", "get", "try", "download", "find", "check", "calculate", "preview", "explore", "start"];
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

export function generateMetaHtml(title: string, description: string, canonicalUrl: string): string {
  return `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<link rel="canonical" href="${canonicalUrl}">`;
}
