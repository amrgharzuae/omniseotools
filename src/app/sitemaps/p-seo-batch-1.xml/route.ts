import { NextResponse } from "next/server";
import { getAllBlueprints } from "@/data/schemas-dataset";

const BASE_URL = "https://omniseotools.com";

export async function GET() {
  const blueprints = getAllBlueprints();
  const now = new Date().toISOString();

  const xmlEntries = [
    // 1. Schema Hub Directory Page
    `  <url>
    <loc>${BASE_URL}/schema</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    // 2. All 90 Blueprint Detail Pages
    ...blueprints.map(
      (bp) => `  <url>
    <loc>${BASE_URL}/schema/${bp.slug}</loc>
    <lastmod>${new Date(bp.lastUpdated).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
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
