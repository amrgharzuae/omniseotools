import { NextResponse } from "next/server";
import { getAllBlueprints } from "@/data/schemas-dataset";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://omniseotools.com"
).replace(/\/+$/, "").toLowerCase();

function normalizeSitemapUrl(path: string): string {
  // Enforce direct HTTPS, lowercase, no trailing slash (matching Next.js App Router default)
  const cleanPath = path.trim().toLowerCase().replace(/^\/+/, "").replace(/\/+$/, "");
  return `${BASE_URL}/${cleanPath}`;
}

export async function GET() {
  const blueprints = getAllBlueprints();
  const now = new Date().toISOString();

  const xmlEntries = [
    // 1. Schema Hub Directory Page
    `  <url>
    <loc>${normalizeSitemapUrl("schema")}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    // 2. All 300 Blueprint Detail Pages
    ...blueprints.map((bp) => {
      const cleanSlug = bp.slug.trim().toLowerCase().replace(/\/+$/, "");
      const lastmodDate = bp.lastUpdated ? new Date(bp.lastUpdated).toISOString() : now;
      return `  <url>
    <loc>${normalizeSitemapUrl(`schema/${cleanSlug}`)}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
