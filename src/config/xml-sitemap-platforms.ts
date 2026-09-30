export interface XmlSitemapPlatformFaq {
  question: string;
  answer: string;
}

export interface XmlSitemapPlatformHowToStep {
  name: string;
  text: string;
}

export interface XmlSitemapPlatformConfig {
  slug: "shopify" | "wordpress" | "nextjs";
  name: string;
  shortName: string;
  cmsName: string;
  title: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  targetCmsQuirk: string;
  coreH2: string;
  directAnswer: string;
  educationalContent: string;
  presetUrls: string;
  presetXml: string;
  dynamicSnippet?: string;
  defaultMode?: "generator" | "validator";
  defaultTab?: "xml" | "nextjs";
  howToSteps: XmlSitemapPlatformHowToStep[];
  faqs: XmlSitemapPlatformFaq[];
}

export const XML_SITEMAP_PLATFORMS: XmlSitemapPlatformConfig[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify (Automated sitemap.xml & Sub-Sitemaps)",
    shortName: "Shopify",
    cmsName: "Shopify Liquid & OS 2.0",
    title: "Shopify XML Sitemap Validator & Clean Generator | OmniSEO Tools",
    metaDescription:
      "Inspect, debug, and generate clean Shopify XML sitemaps. Audit locked sitemap_products_1.xml files, filter out noindexed tags, and resolve sub-collection indexation bloat.",
    h1: "Shopify XML Sitemap Validator & Clean Generator",
    tagline:
      "Audit locked Shopify sub-sitemaps (products, collections, pages, blogs), eliminate crawl waste from hidden or draft items, and validate XML syntax.",
    targetCmsQuirk:
      "Shopify auto-generates root sitemap.xml pointing to locked sub-sitemaps (products, pages, collections, blogs) without allowing native exclusions for hidden or unpublished items, causing dead-URL crawl waste.",
    coreH2: "Auditing Shopify's Auto-Generated Sub-Sitemaps and Filtering Crawl Waste",
    directAnswer:
      "Shopify automatically generates and serves a root XML sitemap index at `/sitemap.xml`, which links to four dedicated sub-sitemaps: `sitemap_products_1.xml`, `sitemap_pages_1.xml`, `sitemap_collections_1.xml`, and `sitemap_blogs_1.xml`. Unlike open-source CMS platforms, Shopify does not allow direct editing or static file uploads to these sub-sitemaps. When items are hidden using metafields (`seo.hidden = 1`) or drafted, Shopify updates its sitemap index on a delayed schedule, but stale URLs, faceted tag permutations (`/collections/*/*`), and pagination bloat often linger in Google Search Console's crawl queue. To resolve this, technical SEOs use custom sitemap validators, `templates/robots.txt.liquid` exclusions, and Search Console sub-sitemap isolation to prune dead URLs and preserve crawl budget.",
    educationalContent: `
      <p>Shopify manages sitemap indexation natively via a proprietary server-rendered sitemap engine. Understanding how Shopify partitions catalog URLs is critical for preventing indexation bloat and Google Search Console coverage errors.</p>

      <h3>1. The Four-Tier Shopify Sub-Sitemap Hierarchy</h3>
      <p>When search engines query <code>https://yourstore.myshopify.com/sitemap.xml</code>, Shopify outputs an XML Sitemap Index referencing four child sitemaps:</p>
      <ul>
        <li><code>sitemap_products_1.xml</code>: Contains all active products. Large catalogs automatically paginate into <code>sitemap_products_2.xml</code> once 5,000 products are exceeded.</li>
        <li><code>sitemap_pages_1.xml</code>: Lists static pages created in Online Store &gt; Pages (e.g., About Us, Contact, Shipping Policy).</li>
        <li><code>sitemap_collections_1.xml</code>: Indexes root collection URLs (e.g., <code>/collections/mens-footwear</code>).</li>
        <li><code>sitemap_blogs_1.xml</code>: Lists active blog post articles and primary blog landing feeds.</li>
      </ul>

      <h3>2. Why Stale &amp; Draft URLs Cause Crawl Waste in Shopify</h3>
      <p>When you delete a product or change its status to <em>Draft</em>, Shopify removes the URL from <code>sitemap_products_1.xml</code> during its periodic cache refresh. However, Google Search Console retains known URLs in its discovery database. If those deleted URLs return soft 404s or redirect to homepage root without HTTP 404/410 status codes, Googlebot continues attempting to recrawl them repeatedly, draining your store's crawl budget.</p>

      <h3>3. Preventing Tag Filter Duplication</h3>
      <p>While Shopify's default sub-sitemaps only list canonical collection URLs, internal store links often expose faceted tag filters (such as <code>/collections/shoes/leather+waterproof</code>). If these parameter URLs get indexed via external backlinks, search engines can mistakenly prioritize thin tag pages over primary collection categories. Disallowing collection tag permutations inside <code>templates/robots.txt.liquid</code> ensures Googlebot focuses strictly on your verified XML sitemap entries.</p>
    `,
    presetUrls: `https://yourstore.myshopify.com/
https://yourstore.myshopify.com/collections/all
https://yourstore.myshopify.com/collections/featured-products
https://yourstore.myshopify.com/collections/summer-collection
https://yourstore.myshopify.com/products/wireless-noise-cancelling-headphones
https://yourstore.myshopify.com/products/ergonomic-mesh-office-chair
https://yourstore.myshopify.com/pages/about-us
https://yourstore.myshopify.com/pages/shipping-and-returns
https://yourstore.myshopify.com/pages/privacy-policy
https://yourstore.myshopify.com/blogs/news/ecommerce-seo-trends-2026`,
    presetXml: `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://yourstore.myshopify.com/sitemap_products_1.xml?from=1000000000&amp;to=9999999999</loc>
  </sitemap>
  <sitemap>
    <loc>https://yourstore.myshopify.com/sitemap_pages_1.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://yourstore.myshopify.com/sitemap_collections_1.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://yourstore.myshopify.com/sitemap_blogs_1.xml</loc>
  </sitemap>
</sitemapindex>`,
    dynamicSnippet: `<!-- templates/robots.txt.liquid (Shopify Custom Directives & Sitemap Preservation) -->
{% for group in robots.default_groups %}
  {{- group.user_agent -}}

  {% for rule in group.rules %}
    {{- rule -}}
  {% endfor %}

  {%- if group.sitemap != blank -%}
    {{ group.sitemap }}
  {%- endif -%}
{% endfor %}

# Disallow crawling of thin collection tag permutations
User-agent: *
Disallow: /collections/*/*
Disallow: /collections/*?filter.*`,
    defaultMode: "validator",
    defaultTab: "xml",
    howToSteps: [
      {
        name: "Audit Live Sub-Sitemaps at /sitemap.xml",
        text: "Open `https://yourstore.myshopify.com/sitemap.xml` in your browser. Copy the child URLs (e.g. `sitemap_products_1.xml`) and paste into our validator to inspect for dead URLs and formatting errors.",
      },
      {
        name: "Hide Non-Indexable Items via 'seo.hidden' Metafield",
        text: "To exclude private pages or seasonal promotional items from Shopify sitemaps, assign the `seo.hidden` integer metafield with value `1` (`custom.seo.hidden = 1`) in Shopify Admin.",
      },
      {
        name: "Block Tag Permutations in robots.txt.liquid",
        text: "Navigate to Online Store > Themes > Edit code, open `templates/robots.txt.liquid`, and append `Disallow: /collections/*/*` to prevent crawler trap bloat.",
      },
      {
        name: "Submit Sub-Sitemaps Individually in Google Search Console",
        text: "In Google Search Console under Indexing > Sitemaps, submit `sitemap_products_1.xml` and `sitemap_collections_1.xml` separately to track product-specific indexation ratios.",
      },
      {
        name: "Validate Clean Output in OmniSEO Validator",
        text: "Re-run your Shopify sub-sitemaps through our validator to ensure 100% Sitemaps.org 0.9 compliance and zero unescaped ampersand entity errors.",
      },
    ],
    faqs: [
      {
        question: "Can I edit Shopify's sitemap.xml or sitemap_products_1.xml directly?",
        answer:
          "No. Shopify's hosted architecture does not allow merchants or developers to directly edit or upload static sitemap XML files to the root directory. Shopify automatically compiles and serves `/sitemap.xml` based on active products, collections, pages, and blog posts. To exclude items, you must unpublish them, set their status to Draft, or set the `seo.hidden = 1` metafield.",
      },
      {
        question: "Why are deleted or draft Shopify products still appearing in Google Search Console?",
        answer:
          "When you delete or draft a product, Shopify immediately removes it from `sitemap_products_1.xml` on the next cache generation. However, Google Search Console retains historic crawl records in its 'Discovered – currently not indexed' or 'Crawled – currently not indexed' reports. Googlebot will continue checking those URLs until it receives persistent HTTP 404 (Not Found) or 410 (Gone) status codes.",
      },
      {
        question: "How do I prevent collection tag filters from creating duplicate indexed pages in Shopify?",
        answer:
          "While Shopify does not include filtered URLs (e.g., `/collections/all/red+large`) in its native sitemaps, internal site links can expose them to search bots. Add `Disallow: /collections/*/*` and `Disallow: /collections/*?filter.*` to your `templates/robots.txt.liquid` template to instruct crawlers not to waste crawl budget on multi-tag filter combinations.",
      },
    ],
  },

  // 2. WordPress
  {
    slug: "wordpress",
    name: "WordPress (Yoast, RankMath & Core wp-sitemap.xml)",
    shortName: "WordPress",
    cmsName: "WordPress 5.5+ & WooCommerce",
    title: "WordPress XML Sitemap Validator & Conflict Auditor | OmniSEO Tools",
    metaDescription:
      "Audit WordPress sitemap index files. Resolve conflicts between native wp-sitemap.xml, Yoast SEO, and RankMath, and validate XML namespace headers.",
    h1: "WordPress XML Sitemap Validator & Conflict Auditor",
    tagline:
      "Resolve conflicts between native wp-sitemap.xml and Yoast/RankMath sitemap_index.xml, eliminate 404 caching errors, and validate XML namespaces.",
    targetCmsQuirk:
      "Native WordPress 5.5+ wp-sitemap.xml conflicting with plugin-generated sitemap_index.xml, causing duplicate sitemap submissions and 404 caching errors on Nginx/Apache.",
    coreH2: "Resolving Duplicate XML Sitemap Index Files in WordPress and WooCommerce",
    directAnswer:
      "Starting with WordPress 5.5, the core platform automatically serves a native XML sitemap index at `/wp-sitemap.xml`. Concurrently, major SEO plugins like Yoast SEO, Rank Math, and All in One SEO serve custom, feature-rich sitemaps at `/sitemap_index.xml`. When both endpoints are exposed to crawlers or when Nginx/Apache caching plugins cache sitemaps with incorrect MIME types (`text/html` instead of `application/xml`), Google Search Console encounters duplicate index collisions, namespace validation warnings, and 404 errors. Disabling the core WordPress sitemap via `add_filter( 'wp_sitemaps_enabled', '__return_false' );` in `functions.php` eliminates duplicate submissions and lets your SEO plugin cleanly manage taxonomy exclusions, image sitemaps, and lastmod timestamps.",
    educationalContent: `
      <p>WordPress powers over 40% of all websites, and its modular plugin ecosystem means sitemap architecture often suffers from conflicting rewrite rules, duplicate indices, and caching misconfigurations.</p>

      <h3>1. Native wp-sitemap.xml vs. Plugin sitemap_index.xml</h3>
      <p>WordPress 5.5+ introduced a basic core XML sitemap at <code>/wp-sitemap.xml</code>. While helpful for sites without SEO plugins, it lacks crucial features:</p>
      <ul>
        <li>No automated image or video sitemap extensions.</li>
        <li>Does not calculate accurate <code>&lt;lastmod&gt;</code> timestamps for taxonomy archive pages.</li>
        <li>Includes author archives and tag archives by default, creating hundreds of thin, duplicate pages.</li>
      </ul>
      <p>Leading SEO plugins (Yoast SEO, Rank Math, SEOPress) generate their own optimized sitemap at <code>/sitemap_index.xml</code>. If both sitemaps are active, submitting both to Google Search Console causes duplicate URL discovery and dilutes crawler efficiency.</p>

      <h3>2. The Nginx FastCGI 404 Sitemap Bug</h3>
      <p>On high-performance Nginx hosting environments (such as Kinsta, WP Engine, or RunCloud), virtual sitemaps generated by plugins require dynamic rewrite rules. If your Nginx server block lacks the proper rewrite directive:</p>
      <pre><code># Nginx Rewrite for Yoast / Rank Math XML Sitemaps
rewrite ^/sitemap_index\\.xml$ /index.php?sitemap=1 last;
rewrite ^/([^/]+?)-sitemap([0-9]+)?\\.xml$ /index.php?sitemap=$1&amp;sitemap_n=$2 last;</code></pre>
      <p>When this directive is missing, Nginx searches for a physical static file on disk, fails, and returns an HTTP 404 error to Googlebot.</p>

      <h3>3. Pruning Thin Content from WordPress Sitemaps</h3>
      <p>Ensure that low-value post formats, author archives (for single-author blogs), attachment pages, and tag archives are toggled OFF inside your SEO plugin settings. This concentrates your sitemap URLs on high-intent posts, pages, and WooCommerce product archives.</p>
    `,
    presetUrls: `https://yourdomain.com/
https://yourdomain.com/about-us/
https://yourdomain.com/services/
https://yourdomain.com/blog/
https://yourdomain.com/blog/technical-seo-checklist/
https://yourdomain.com/blog/wordpress-sitemap-optimization/
https://yourdomain.com/shop/
https://yourdomain.com/product/premium-wireless-headphones/
https://yourdomain.com/contact/`,
    presetXml: `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://yourdomain.com/post-sitemap.xml</loc>
    <lastmod>2026-09-28T14:22:10+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://yourdomain.com/page-sitemap.xml</loc>
    <lastmod>2026-09-25T10:15:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://yourdomain.com/product-sitemap.xml</loc>
    <lastmod>2026-09-29T18:40:32+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://yourdomain.com/category-sitemap.xml</loc>
    <lastmod>2026-09-20T08:00:00+00:00</lastmod>
  </sitemap>
</sitemapindex>`,
    dynamicSnippet: `// functions.php (Disable Core WordPress wp-sitemap.xml in Favor of SEO Plugins)
add_filter( 'wp_sitemaps_enabled', '__return_false' );

// Exclude specific taxonomy (e.g. post_tag) if using native WordPress sitemaps:
add_filter( 'wp_sitemaps_taxonomies', function( $taxonomies ) {
    unset( $taxonomies['post_tag'] );
    return $taxonomies;
});`,
    defaultMode: "validator",
    defaultTab: "xml",
    howToSteps: [
      {
        name: "Check Active Sitemap Endpoints in Browser",
        text: "Visit both `https://yourdomain.com/sitemap_index.xml` and `https://yourdomain.com/wp-sitemap.xml` to identify if conflicting sitemaps are currently being served.",
      },
      {
        name: "Disable Native wp-sitemap.xml via functions.php",
        text: "Add `add_filter( 'wp_sitemaps_enabled', '__return_false' );` to your theme's `functions.php` file or a Must-Use (MU) plugin to eliminate duplicate sitemap engine conflicts.",
      },
      {
        name: "Configure Yoast SEO or Rank Math XML Sitemap Module",
        text: "In your plugin dashboard, enable XML Sitemaps, set maximum entries per sub-sitemap (e.g., 1,000 URLs), and disable author archives and tag archives.",
      },
      {
        name: "Exclude Sitemap Endpoints from Page Caching",
        text: "In WP Rocket, W3 Total Cache, or LiteSpeed Cache, add `sitemap(_index)?\\.xml` and `([^/]+?)-sitemap([0-9]+)?\\.xml` to the Never Cache URLs list.",
      },
      {
        name: "Validate Sub-Sitemaps in OmniSEO Validator",
        text: "Copy the XML output of your `post-sitemap.xml` and `product-sitemap.xml` and paste into our validator to confirm clean namespaces and ISO 8601 timestamps.",
      },
    ],
    faqs: [
      {
        question: "How do I disable the default wp-sitemap.xml in WordPress?",
        answer:
          "To disable the native WordPress 5.5+ sitemap engine, add `add_filter( 'wp_sitemaps_enabled', '__return_false' );` to your child theme's `functions.php` file or create a Must-Use (MU) plugin. Most major SEO plugins (like Yoast and Rank Math) handle this automatically upon activation.",
      },
      {
        question: "Why does Google Search Console report 'Sitemap could not be read' or 404 for WordPress sitemaps?",
        answer:
          "This error typically stems from two root causes: (1) Nginx server configurations lacking the URL rewrite rule for virtual plugin sitemaps, causing the server to return an HTTP 404, or (2) WordPress caching plugins serving the XML file with a `Content-Type: text/html` header instead of `application/xml; charset=UTF-8`.",
      },
      {
        question: "Should I include WordPress post tags and author archives in XML sitemaps?",
        answer:
          "For most websites, no. Author archives on single-author websites cause 100% duplicate content with the main blog feed. Similarly, tag archives frequently result in thin pages with 1-2 posts, diluting crawl budget. It is recommended to exclude tags and author archives from your sitemap unless they drive significant organic search volume.",
      },
    ],
  },

  // 3. Next.js
  {
    slug: "nextjs",
    name: "Next.js App Router (sitemap.ts / Route Handlers)",
    shortName: "Next.js",
    cmsName: "Next.js 14/15 App Router",
    title: "Next.js XML Sitemap Validator & Dynamic sitemap.ts Generator | OmniSEO Tools",
    metaDescription:
      "Validate dynamic Next.js App Router sitemap.ts files. Debug static generation limits, dynamic slug pagination, and edge runtime XML serialization errors.",
    h1: "Next.js XML Sitemap Validator & Dynamic sitemap.ts Generator",
    tagline:
      "Validate dynamic Next.js App Router sitemap.ts files, debug 50k URL thresholds, and generate type-safe MetadataRoute.Sitemap TypeScript handlers.",
    targetCmsQuirk:
      "Returning invalid XML MIME types from Route Handlers (text/html instead of application/xml) or exceeding the 50,000 URL / 50MB single-sitemap limit in dynamic sitemap.ts without sitemap index splitting.",
    coreH2: "Generating Dynamic, Edge-Cached sitemap.ts in Next.js App Router",
    directAnswer:
      "Next.js App Router (Next.js 13.3+, Next.js 14, and Next.js 15+) provides a built-in file-based convention for programmatic sitemaps via `app/sitemap.ts`. Exporting a default function returning `MetadataRoute.Sitemap` automatically builds a compliant XML sitemap with valid `application/xml` MIME headers, incremental static regeneration (ISR), and runtime edge caching. Common Google Search Console validation failures occur when developers author custom Route Handlers (`app/sitemap.xml/route.ts`) that return `text/html` instead of `application/xml`, when unescaped query string ampersands break XML parsers, or when dynamic catalogs exceed 50,000 URLs without using Next.js `generateSitemaps()` for automated sitemap index chunking.",
    educationalContent: `
      <p>Modern Next.js applications require programmatic sitemap generation to handle dynamic database routes, multi-locale subpaths, and headless CMS webhooks without manual file maintenance.</p>

      <h3>1. The Native app/sitemap.ts Convention</h3>
      <p>Instead of manually creating XML strings, Next.js provides the <code>MetadataRoute.Sitemap</code> TypeScript interface in <code>app/sitemap.ts</code> (or <code>src/app/sitemap.ts</code>):</p>
      <pre><code>// app/sitemap.ts (Next.js App Router)
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise&lt;MetadataRoute.Sitemap&gt; {
  const posts = await fetch('https://api.example.com/posts').then(res =&gt; res.json());

  return posts.map((post: any) =&gt; ({
    url: \`https://example.com/blog/\${post.slug}\`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}</code></pre>

      <h3>2. Scaling Past 50,000 URLs with generateSitemaps()</h3>
      <p>If your application has more than 50,000 dynamic URLs (e.g. large programmatic SEO directories or e-commerce stores), Next.js App Router supports automated sitemap index partitioning using the <code>generateSitemaps()</code> export:</p>
      <pre><code>// app/sitemap.ts (Automated Sitemap Index Partitioning)
import { MetadataRoute } from 'next';

export async function generateSitemaps() {
  // Return array of sitemap IDs based on database count
  return [{ id: 0 }, { id: 1 }, { id: 2 }];
}

export default async function sitemap({ id }: { id: number }): Promise&lt;MetadataRoute.Sitemap&gt; {
  const limit = 50000;
  const start = id * limit;
  const items = await getItemsFromDb(start, limit);

  return items.map((item) =&gt; ({
    url: \`https://example.com/product/\${item.slug}\`,
    lastModified: new Date(item.updatedAt),
  }));
}</code></pre>
      <p>Next.js automatically exposes a parent sitemap index at <code>/sitemap.xml</code> referencing <code>/sitemap/0.xml</code>, <code>/sitemap/1.xml</code>, and <code>/sitemap/2.xml</code>.</p>

      <h3>3. Edge Caching &amp; Revalidation</h3>
      <p>To prevent heavy database queries on every crawler hit, export <code>export const revalidate = 86400;</code> (24 hours) at the top of <code>app/sitemap.ts</code>. Next.js will cache the compiled XML response at the Vercel/Cloudflare edge, serving it instantly with zero server execution delay.</p>
    `,
    presetUrls: `https://yourdomain.com/
https://yourdomain.com/tools
https://yourdomain.com/tools/xml-sitemap-generator
https://yourdomain.com/tools/robots-txt-generator-validator
https://yourdomain.com/tools/canonical-redirect-auditor
https://yourdomain.com/blog
https://yourdomain.com/blog/nextjs-dynamic-sitemap-guide
https://yourdomain.com/recipes/how-to-fix-discovered-currently-not-indexed
https://yourdomain.com/about
https://yourdomain.com/contact`,
    presetXml: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <lastmod>2026-09-30T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/tools</loc>
    <lastmod>2026-09-29T00:00:00.000Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/blog</loc>
    <lastmod>2026-09-28T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/blog/nextjs-dynamic-sitemap-guide</loc>
    <lastmod>2026-09-28T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`,
    dynamicSnippet: `// app/sitemap.ts (Next.js App Router with Dynamic generateSitemaps Partitioning)
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

export const revalidate = 86400; // Cache XML at the edge for 24 hours

export async function generateSitemaps() {
  // Divide total catalog into chunks of 50,000 URLs
  return [{ id: 0 }, { id: 1 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const limit = 50000;
  const start = id * limit;
  const dynamicPosts = await fetchPostsFromDatabase(start, limit);

  const entries = dynamicPosts.map((post) => ({
    url: \`\${BASE_URL}/blog/\${post.slug}\`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  if (id === 0) {
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      ...entries,
    ];
  }

  return entries;
}`,
    defaultMode: "generator",
    defaultTab: "nextjs",
    howToSteps: [
      {
        name: "Create app/sitemap.ts in App Router",
        text: "Add a new file at `src/app/sitemap.ts` or `app/sitemap.ts` in your Next.js project.",
      },
      {
        name: "Import MetadataRoute and Type Return",
        text: "Import `import { MetadataRoute } from 'next';` and ensure your default async export returns `Promise<MetadataRoute.Sitemap>`.",
      },
      {
        name: "Fetch Dynamic Slugs from Database or CMS",
        text: "Fetch your published posts, products, or programmatic items, formatting ISO `Date` instances for `lastModified`.",
      },
      {
        name: "Configure generateSitemaps() for >50k Datasets",
        text: "If your catalog exceeds 50,000 entries, export `generateSitemaps()` alongside `sitemap({ id })` to generate automated sub-sitemaps.",
      },
      {
        name: "Set Edge Revalidation and Validate in OmniSEO",
        text: "Export `export const revalidate = 86400;` to enable edge caching, then paste your live XML endpoint into our validator to confirm compliant serialization.",
      },
    ],
    faqs: [
      {
        question: "How do I handle more than 50,000 URLs in Next.js App Router sitemap.ts?",
        answer:
          "In Next.js App Router, export an asynchronous `generateSitemaps()` function in `app/sitemap.ts` that returns an array of sitemap ID objects (e.g., `return [{ id: 0 }, { id: 1 }];`). Then update your default sitemap function to accept `{ id }: { id: number }` as props to paginate data fetching. Next.js will automatically build a sitemap index at `/sitemap.xml` pointing to `/sitemap/0.xml` and `/sitemap/1.xml`.",
      },
      {
        question: "Why does my custom Next.js Route Handler sitemap fail Google Search Console validation?",
        answer:
          "If building a custom Route Handler (`app/sitemap.xml/route.ts`), you must return a `Response` object with the header `'Content-Type': 'application/xml; charset=utf-8'`. Returning plain text or `text/html` causes Google Search Console to reject the sitemap with a MIME type mismatch error.",
      },
      {
        question: "How do I set dynamic cache headers or ISR revalidation on Next.js sitemaps?",
        answer:
          "Export `export const revalidate = 86400;` (time in seconds) or `export const dynamic = 'force-dynamic'` directly inside `app/sitemap.ts`. This controls how Vercel and Next.js cache and revalidate your XML sitemap at the network edge.",
      },
    ],
  },
];

export function getXmlSitemapPlatformBySlug(
  slug: string
): XmlSitemapPlatformConfig | undefined {
  return XML_SITEMAP_PLATFORMS.find((p) => p.slug === slug);
}

export function getAllXmlSitemapPlatforms(): XmlSitemapPlatformConfig[] {
  return XML_SITEMAP_PLATFORMS;
}
