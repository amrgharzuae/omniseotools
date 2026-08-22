import { calculateTitlePixels, calculateDescPixels, analyzeCtr, truncateToPixels, SERP_LIMITS } from "./serp-utils";

export interface SerpAiVariation {
  id: string;
  styleName: string;
  badge: string;
  title: string;
  titlePx: number;
  description: string;
  descPx: number;
  slug: string;
  ctrScore: number;
  ctrGrade: string;
}

export interface GenerateOptions {
  topic: string;
  keyword?: string;
  brand?: string;
  intent?: "listicle" | "guide" | "how_to" | "commercial" | "question";
  includeYear?: boolean;
}

function cleanTopic(text: string): string {
  return text.trim().replace(/[.!?]+$/, "");
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export function generateSerpSnippetsFromTopic(options: GenerateOptions): SerpAiVariation[] {
  const rawTopic = cleanTopic(options.topic || "SEO Strategy");
  const topicTitleCase = toTitleCase(rawTopic);
  const keyword = options.keyword ? cleanTopic(options.keyword) : rawTopic.toLowerCase();
  const brand = options.brand ? cleanTopic(options.brand) : "OmniSEO";
  const year = options.includeYear !== false ? " 2026" : "";

  const variations: SerpAiVariation[] = [];

  // Style 1: Listicle & Numbered Authority (High CTR)
  const listTitle = `10 Best ${topicTitleCase} Strategies for${year} | ${brand}`;
  const listDesc = `Discover the top-rated ${keyword} techniques to drive real organic results in${year}. Includes expert comparisons, actionable steps, and free checklist.`;
  variations.push(buildVariation("listicle", "Numbered Listicle (High CTR)", "Top Rated", listTitle, listDesc, rawTopic, brand));

  // Style 2: Comprehensive / Definitive Guide
  const guideTitle = `The Complete Guide to ${topicTitleCase}${year} - ${brand}`;
  const guideDesc = `Master ${keyword} with our in-depth step-by-step guide. Learn proven methodologies, avoid common pitfalls, and scale your results today. Read now.`;
  variations.push(buildVariation("guide", "Definitive Guide", "Comprehensive", guideTitle, guideDesc, rawTopic, brand));

  // Style 3: Action-Oriented How-To / Step-by-Step
  const howToTitle = `How to Master ${topicTitleCase} in 5 Easy Steps (${brand})`;
  const howToDesc = `Looking to improve ${keyword}? Follow our proven 5-step tutorial with real-world examples and practical takeaways. Get started for free.`;
  variations.push(buildVariation("how_to", "Actionable How-To", "Action-Driven", howToTitle, howToDesc, rawTopic, brand));

  // Style 4: High-Intent Commercial / Comparison
  const commTitle = `Best ${topicTitleCase} Tested & Reviewed for${year} |${brand}`;
  const commDesc = `We tested and ranked the top ${keyword} solutions available in${year}. Compare features, pros & cons, and pricing to find the perfect fit.`;
  variations.push(buildVariation("commercial", "Commercial Review", "Buyer Intent", commTitle, commDesc, rawTopic, brand));

  return variations;
}

function buildVariation(
  id: string,
  styleName: string,
  badge: string,
  rawTitle: string,
  rawDesc: string,
  topic: string,
  brand: string
): SerpAiVariation {
  // Ensure title is within 600px
  const titleTrunc = truncateToPixels(rawTitle, SERP_LIMITS.desktopTitlePx, true);
  const descTrunc = truncateToPixels(rawDesc, SERP_LIMITS.desktopDescPx, false);

  const title = titleTrunc.text;
  const description = descTrunc.text;
  const titlePx = calculateTitlePixels(title);
  const descPx = calculateDescPixels(description);

  const ctr = analyzeCtr(title, description);

  // Suggested slug
  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "")
    .split(/[\s-_]+/)
    .filter(Boolean)
    .slice(0, 5)
    .join("-");

  return {
    id,
    styleName,
    badge,
    title,
    titlePx,
    description,
    descPx,
    slug,
    ctrScore: ctr.score,
    ctrGrade: ctr.grade,
  };
}
