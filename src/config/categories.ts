import { CategoryDefinition } from "@/types/category";

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "seo",
    name: "SEO Tools",
    slug: "seo",
    description: "Optimize metadata, simulate SERP rankings, generate schema markups, and audit indexing.",
    icon: "Search",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-500",
  },
  {
    id: "marketing",
    name: "Marketing & Growth",
    slug: "marketing",
    description: "Build clean UTM links, craft high-converting ad copy, and calculate ROI metrics.",
    icon: "TrendingUp",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500",
  },
  {
    id: "developer",
    name: "Web & Developer",
    slug: "developer",
    description: "Inspect robots.txt, format JSON-LD schemas, test OpenGraph tags, and generate clean slugs.",
    icon: "Code2",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-500",
  },
  {
    id: "social",
    name: "Social Media",
    slug: "social",
    description: "Preview social cards for Twitter, Facebook, and LinkedIn before publishing.",
    icon: "Share2",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-500",
  },
  {
    id: "content",
    name: "Content & Copy",
    slug: "content",
    description: "Analyze keyword density, count characters and pixel lengths, and format clean text.",
    icon: "FileText",
    color: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-500",
  },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}
