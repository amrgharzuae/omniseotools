import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategoryBySlug } from "@/config/categories";
import { getToolsByCategory } from "@/config/tools/registry";
import { siteConfig } from "@/config/site";
import { AdSlot } from "@/components/ads/AdSlot";
import { 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight, 
  Eye, 
  Share2, 
  ShieldAlert, 
  Link2, 
  Type, 
  BarChart3,
  Layers
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Eye,
  Share2,
  ShieldAlert,
  Link2,
  Type,
  BarChart3,
};

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const url = siteConfig.url + "/tools/" + category.slug;

  return {
    title: category.name + " - Free High-Utility Web Tools | " + siteConfig.shortName,
    description: category.description + " 100% free, fast, and browser-based utility tools.",
    alternates: { canonical: url },
    openGraph: {
      title: category.name + " - " + siteConfig.name,
      description: category.description,
      url: url,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.id);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Category Hero */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50 to-slate-100/50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/#tools" className="hover:text-emerald-600 transition-colors">
              Tools
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">
              {category.name}
            </span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shadow-sm">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {category.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Collection of {tools.length} curated utilities
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {category.description}
          </p>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-10">
        
        {/* Top AdSlot */}
        <AdSlot slotType="leaderboard" className="my-6" />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {tools.map((tool) => {
            const IconComponent = ICON_MAP[tool.icon] || Sparkles;
            const isClickable = tool.status === "active";

            return (
              <div
                key={tool.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="h-5 w-5" />
                    </div>

                    {tool.badge && (
                      <span className="inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Category: {category.name}
                  </span>

                  {isClickable ? (
                    <Link
                      href={"/tools/" + tool.category + "/" + tool.slug}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>Open Tool</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs text-slate-400">Queued</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Feed AdSlot */}
        <AdSlot slotType="in-feed" className="my-10" />

        {/* Category Authority / Educational Section */}
        <article className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            About {category.name} on {siteConfig.name}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Our {category.name.toLowerCase()} suite is engineered specifically for digital professionals who need instant, accurate, and secure calculations without bloated sign-up walls or client-data transmission.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            All tools in this hub run client-side in modern browsers, ensuring your confidential keywords, URL campaign tags, and website draft snippets remain 100% private.
          </p>
        </article>

      </div>
    </div>
  );
}
