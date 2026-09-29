export interface OgValidatorPlatformFaq {
  question: string;
  answer: string;
}

export interface OgValidatorPlatformHowToStep {
  name: string;
  text: string;
}

export interface OgValidatorPlatformConfig {
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
  preset: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    imageUrl: string;
  };
  dynamicSnippet?: string;
  howToSteps: OgValidatorPlatformHowToStep[];
  faqs: OgValidatorPlatformFaq[];
}

export const OG_VALIDATOR_PLATFORMS: OgValidatorPlatformConfig[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify (Liquid Social Meta Tags)",
    shortName: "Shopify",
    cmsName: "Shopify Liquid & OS 2.0",
    title: "Shopify Open Graph & Social Card Validator | OmniSEO Tools",
    metaDescription:
      "Inspect and debug Shopify Open Graph tags. Resolve product image crop issues, collection share cards, and duplicate og:title tags generated across conflicting theme Liquid files.",
    h1: "Shopify Open Graph & Social Card Validator",
    tagline:
      "Inspect and debug Shopify Open Graph tags, resolve product image cropping on social feeds, and eliminate duplicate social declarations across Liquid themes.",
    targetCmsQuirk:
      "Shopify themes often hardcode fallback social images or inject conflicting OG tags from third-party review apps, breaking Facebook and Twitter card rendering.",
    coreH2: "Resolving Duplicate Open Graph Tags and Image Sizing in Shopify Themes",
    directAnswer:
      "In Shopify themes (such as Dawn or Online Store 2.0 templates), Open Graph meta tags are generated dynamically inside snippets/social-meta-tags.liquid or layout/theme.liquid using Liquid object properties ({{ page_title }}, {{ page_description }}, and {{ product.featured_image | image_url: width: 1200, height: 630 }}). Common social card failures in Shopify occur when third-party apps (product review widgets, page builders, or social share apps) inject competing <meta property='og:image'> tags into theme.liquid alongside the native theme output, or when themes output square product images without the 1200x630 (1.91:1) aspect ratio filter, resulting in aggressive cropping on Facebook and Twitter/X. Consolidating all Open Graph declarations into a single, clean Liquid snippet and using Shopify's image_url filter with explicit 1200x630 dimensions fixes social card previews permanently.",
    educationalContent: `
      <p>Shopify's e-commerce architecture relies on social sharing cards to drive viral referral traffic and social commerce sales across Instagram, Facebook, Twitter/X, and WhatsApp.</p>

      <h3>1. The Square Product Image Cropping Problem</h3>
      <p>By default, e-commerce product photos are shot in square (1:1) or vertical (3:4 / 4:5) aspect ratios for storefront gallery display. When shared on social networks, platforms expect a <strong>1.91:1 aspect ratio (1200x630px)</strong>.</p>
      <p>If a Liquid template outputs a raw product image URL without center-cropping, social crawlers crop the top and bottom of the image, cutting off product packaging, model heads, or logos:</p>
      <pre><code>&lt;!-- UNOPTIMIZED SHOPIFY LIQUID (Causes aggressive edge cropping) --&gt;
&lt;meta property="og:image" content="https:{{ product.featured_image | img_url: 'master' }}"&gt;

&lt;!-- OPTIMIZED SHOPIFY LIQUID (1200x630 1.91:1 Standard) --&gt;
&lt;meta property="og:image" content="https:{{ product.featured_image | image_url: width: 1200, height: 630, crop: 'center' }}"&gt;
&lt;meta property="og:image:width" content="1200"&gt;
&lt;meta property="og:image:height" content="630"&gt;</code></pre>

      <h3>2. Resolving App Collisions & Duplicate OG Tags</h3>
      <p>When Shopify store owners install review apps (Judge.me, Loox, Yotpo) or page builder apps (Shogun, PageFly), these apps often inject their own social meta tags into <code>layout/theme.liquid</code>. Crawlers that parse multiple <code>og:title</code> or <code>og:image</code> tags may choose an outdated fallback image or fail to render the card entirely.</p>
      <p>Ensure that your <code>layout/theme.liquid</code> renders a single, centralized <code>{% render 'social-meta-tags' %}</code> snippet and that installed apps do not duplicate head meta tags.</p>

      <h3>3. Protocol Prefixing on Shopify CDN URLs</h3>
      <p>Shopify Liquid filters like <code>image_url</code> return protocol-relative URLs starting with <code>//cdn.shopify.com/...</code>. Social media crawlers (especially Twitterbot and LinkedInBot) strictly require absolute URLs with the <code>https:</code> protocol. Always prepend <code>https:</code> before the Liquid tag.</p>
    `,
    preset: {
      title: "Merino Wool Thermal Crewneck ($128) | Alpine Goods Co.",
      description:
        "100% ultrafine Australian Merino wool crewneck sweater with moisture-wicking temperature regulation. Free shipping over $100.",
      url: "https://yourstore.myshopify.com/products/merino-wool-crewneck",
      siteName: "Alpine Goods Co.",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0000/0001/products/merino-crewneck_1200x630.jpg",
    },
    dynamicSnippet: `<!-- snippets/social-meta-tags.liquid (Shopify Online Store 2.0) -->
<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:title" content="{{ page_title | default: shop.name }}">
<meta property="og:type" content="{% if template contains 'product' %}product{% else %}website{% endif %}">
<meta property="og:description" content="{{ page_description | default: shop.description | strip_html | truncatewords: 30 | escape }}">

{%- if template contains 'product' and product.featured_image -%}
  <meta property="og:image" content="https:{{ product.featured_image | image_url: width: 1200, height: 630, crop: 'center' }}">
  <meta property="og:image:secure_url" content="https:{{ product.featured_image | image_url: width: 1200, height: 630, crop: 'center' }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
{%- elsif template contains 'article' and article.image -%}
  <meta property="og:image" content="https:{{ article.image | image_url: width: 1200, height: 630, crop: 'center' }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
{%- elsif settings.share_image -%}
  <meta property="og:image" content="https:{{ settings.share_image | image_url: width: 1200, height: 630, crop: 'center' }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
{%- endif -%}

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ page_title | default: shop.name }}">
<meta name="twitter:description" content="{{ page_description | default: shop.description | strip_html | truncatewords: 30 | escape }}">`,
    howToSteps: [
      {
        name: "Check layout/theme.liquid for Duplicate Meta Tags",
        text: "Scan `layout/theme.liquid` in your Shopify code editor to ensure only a single `{% render 'social-meta-tags' %}` tag is invoked inside `<head>`.",
      },
      {
        name: "Update snippets/social-meta-tags.liquid",
        text: "Ensure product and article images use `| image_url: width: 1200, height: 630, crop: 'center'` with an explicit `https:` prefix.",
      },
      {
        name: "Define Default Storefront Share Image",
        text: "Navigate to `Online Store > Themes > Customize > Theme Settings > Social Media` and upload a default 1200x630px social fallback graphic.",
      },
      {
        name: "Declare og:image:width & og:image:height",
        text: "Explicitly declare `<meta property='og:image:width' content='1200'>` and `<meta property='og:image:height' content='630'>` to speed up initial crawler rendering.",
      },
      {
        name: "Validate in OmniSEO Social Previewer",
        text: "Paste your live Shopify store URL or test inputs into our validator to inspect timeline previews for Twitter, LinkedIn, Facebook, and Discord.",
      },
    ],
    faqs: [
      {
        question: "Why do Shopify product images get cropped weirdly on Facebook and Twitter?",
        answer:
          "Shopify product photos are typically uploaded in square (1:1) or vertical (3:4) formats. When shared on social networks expecting a 1.91:1 (1200x630) banner, platforms automatically crop the center, often cutting off product details. Using Shopify Liquid's `image_url: width: 1200, height: 630, crop: 'center'` filter generates an optimized rectangular banner specifically for social crawlers.",
      },
      {
        question: "Why is Twitter / X showing a blank preview for my Shopify store?",
        answer:
          "Twitter requires absolute URLs starting with `https://`. In Shopify Liquid, filters like `image_url` output protocol-relative URLs (`//cdn.shopify.com/...`). If your theme does not prepend `https:`, Twitterbot will fail to fetch the image asset. Additionally, ensure `twitter:card` is set to `summary_large_image`.",
      },
      {
        question: "How do I clear Facebook's cached preview for an updated Shopify product?",
        answer:
          "Facebook caches OpenGraph metadata for up to 30 days. To force an immediate refresh, paste your Shopify product URL into the official Facebook Sharing Debugger and click 'Scrape Again'. This updates Facebook's cache across Messenger, Instagram, and Facebook feeds instantly.",
      },
    ],
  },

  // 2. WordPress
  {
    slug: "wordpress",
    name: "WordPress (Yoast, RankMath & Social Sharing)",
    shortName: "WordPress",
    cmsName: "WordPress & WooCommerce",
    title: "WordPress Open Graph & Twitter Card Validator | OmniSEO Tools",
    metaDescription:
      "Audit WordPress social meta cards. Debug conflicts between Yoast SEO, RankMath, and Jetpack outputting duplicate og:image tags, and inspect CDN image protocols.",
    h1: "WordPress Open Graph & Twitter Card Validator",
    tagline:
      "Audit WordPress social meta cards, resolve duplicate og:image tags between Yoast SEO and Rank Math, and verify 1200x630 social preview rendering.",
    targetCmsQuirk:
      "Multiple plugins declaring conflicting og:image dimensions or missing og:image:width/height hints, leading to delayed card rendering on LinkedIn and Twitter.",
    coreH2: "Fixing Duplicate og:image Declarations in WordPress Plugins",
    directAnswer:
      "WordPress outputs Open Graph tags through the wp_head hook, typically managed by SEO plugins like Yoast SEO, Rank Math, All in One SEO, or Jetpack. When multiple plugins or active themes attempt to inject social meta tags simultaneously, search and social crawlers (Facebook External Hit, Twitterbot, LinkedInBot) encounter duplicate og:title, og:description, and og:image tags with conflicting image dimensions. Furthermore, if the server or security plugins block crawlers or omit og:image:width (1200) and og:image:height (630) headers, platforms like WhatsApp, LinkedIn, and Twitter fallback to small square thumbnails or fail to render the image entirely. Disabling redundant theme social outputs and standardizing on a single SEO plugin with explicit 1200x630 featured images resolves social preview bugs.",
    educationalContent: `
      <p>WordPress provides extensive social sharing plugins, but running multiple SEO and sharing tools simultaneously frequently results in corrupted HTML header metadata.</p>

      <h3>1. The Multi-Plugin Open Graph Tag Collision</h3>
      <p>A frequent error identified in WordPress audits is having two or more plugins active that both inject Open Graph tags:</p>
      <ul>
        <li><strong>Yoast SEO + Jetpack:</strong> Both plugins output <code>og:image</code>, resulting in 2 different images declared in <code>wp_head</code>.</li>
        <li><strong>Rank Math + Custom Theme:</strong> Themes with built-in social features outputting basic meta tags alongside Rank Math's comprehensive social graph.</li>
      </ul>
      <p>When multiple images are declared, Facebook and LinkedIn often select the first (often smaller or unoptimized) image found in the HTML stream.</p>

      <h3>2. Why og:image:width & og:image:height Are Critical</h3>
      <p>When a link is shared for the very first time on platforms like Facebook or LinkedIn, their crawlers fetch the URL synchronously. If the HTML does not specify <code>og:image:width</code> and <code>og:image:height</code>, the platform cannot know the image aspect ratio in advance and will render a small square thumbnail instead of a full-width large banner. Including explicit dimension tags ensures full-width cards on the very first share.</p>

      <h3>3. Fixing CDN & Hotlink Protection Blocks</h3>
      <p>If you use Cloudflare, Sucuri, or Wordfence, ensure your security firewalls do not block crawler user-agents (<code>facebookexternalhit/1.1</code>, <code>Twitterbot/1.0</code>, <code>LinkedInBot/1.0</code>) or hotlink-protect image assets in <code>/wp-content/uploads/</code>.</p>
    `,
    preset: {
      title: "10 Essential WordPress Security Best Practices for 2026 | WP Tech Journal",
      description:
        "Step-by-step developer guide to hardening WordPress against brute-force attacks, XML-RPC exploits, and plugin vulnerabilities.",
      url: "https://example.com/blog/wordpress-security-best-practices/",
      siteName: "WP Tech Journal",
      imageUrl:
        "https://example.com/wp-content/uploads/2026/01/wp-security-guide-1200x630.jpg",
    },
    dynamicSnippet: `// Add to child theme functions.php to force 1200x630 OpenGraph dimensions in Rank Math
add_filter( 'rank_math/opengraph/facebook/image_sizes', function( $sizes ) {
    return [ 'width' => 1200, 'height' => 630 ];
});

// Disable Jetpack OpenGraph tags if Yoast SEO or Rank Math is active
add_filter( 'jetpack_enable_open_graph', '__return_false' );`,
    howToSteps: [
      {
        name: "Audit wp_head for Duplicate OG Tags",
        text: "View your WordPress page source and search for `og:image` to confirm only one SEO plugin (Yoast or Rank Math) is outputting social meta tags.",
      },
      {
        name: "Disable Theme & Secondary Plugin Social Outputs",
        text: "Turn off built-in theme social tags and add `add_filter('jetpack_enable_open_graph', '__return_false');` if Jetpack is installed.",
      },
      {
        name: "Upload 1200x630 Featured Images",
        text: "Ensure your post featured images or dedicated social share images are uploaded at exactly 1200 x 630 pixels in PNG, JPG, or WebP.",
      },
      {
        name: "Set Default Social Fallback in SEO Plugin",
        text: "Configure a high-resolution default Open Graph fallback image in `Rank Math > Titles & Meta > Global Meta` or `Yoast > Settings > Social`.",
      },
      {
        name: "Validate in OmniSEO Social Previewer",
        text: "Paste your WordPress post URL into our previewer to inspect live Twitter large banners, LinkedIn cards, and Facebook snippets.",
      },
    ],
    faqs: [
      {
        question: "Why does LinkedIn show a tiny square image instead of a large banner for WordPress posts?",
        answer:
          "LinkedIn requires explicit `<meta property='og:image:width' content='1200'>` and `<meta property='og:image:height' content='630'>` tags in your HTML. Without these dimensions, LinkedIn's crawler cannot verify the aspect ratio on the first share and defaults to a small square thumbnail. Ensuring your SEO plugin (Rank Math or Yoast) outputs image dimension tags fixes this issue.",
      },
      {
        question: "How do I disable Jetpack Open Graph tags when using Yoast or Rank Math?",
        answer:
          "Add `add_filter( 'jetpack_enable_open_graph', '__return_false' );` to your child theme's `functions.php` file or a code snippets plugin. This disables Jetpack's duplicate Open Graph tags completely.",
      },
      {
        question: "Why are my WordPress social images not updating after publishing changes?",
        answer:
          "Social platforms cache Open Graph tags aggressively for 7 to 30 days. To force an update, submit your post URL to the Facebook Sharing Debugger and LinkedIn Post Inspector, or append a versioning parameter (e.g. `?v=2`) when testing in Twitter/X.",
      },
    ],
  },

  // 3. Next.js
  {
    slug: "nextjs",
    name: "Next.js App Router (opengraph-image.tsx)",
    shortName: "Next.js",
    cmsName: "Next.js 14/15 App Router",
    title: "Next.js Open Graph Validator & Dynamic Social Card Inspector | OmniSEO Tools",
    metaDescription:
      "Validate dynamic social cards in Next.js App Router. Debug opengraph-image.tsx rendering, edge runtime dimension mismatches, and layout metadata inheritance.",
    h1: "Next.js Open Graph Validator & Dynamic Social Card Inspector",
    tagline:
      "Validate dynamic social cards in Next.js App Router, debug opengraph-image.tsx Edge rendering, and verify 1200x630 metadata inheritance.",
    targetCmsQuirk:
      "Dynamic Edge ImageResponse routes generating unsupported dimensions or missing required content-type headers, causing crawler fallbacks.",
    coreH2: "Validating Dynamic opengraph-image.tsx and Server Component Metadata",
    directAnswer:
      "In Next.js 14 and 15 App Router, Open Graph and Twitter Card tags can be declared statically via the Metadata API (openGraph: { images: [...] }) or generated dynamically on the Edge using convention-based opengraph-image.tsx files powered by @vercel/og and ImageResponse. Common failure modes in Next.js include forgetting to export explicit size = { width: 1200, height: 630 } dimensions, layout metadata inheritance overwriting page-level social cards, relative image URLs causing crawlers to fail image downloads (due to missing metadataBase in root layout), and Edge runtime timeout bails when fetching remote fonts. Setting metadataBase in layout.tsx and defining standard 1200x630 ImageResponse templates ensures reliable social cards across all social platforms.",
    educationalContent: `
      <p>Next.js App Router provides two distinct, powerful methods for managing Open Graph and Twitter Card images: static metadata objects and dynamic Edge image generators.</p>

      <h3>1. Static Metadata vs Dynamic opengraph-image.tsx</h3>
      <p>Next.js supports two primary approaches:</p>
      <ul>
        <li><strong>Static Metadata API (<code>page.tsx</code>):</strong> Return an <code>openGraph</code> object inside <code>generateMetadata()</code> with an array of images.</li>
        <li><strong>File-Based Dynamic OG (<code>opengraph-image.tsx</code>):</strong> An Edge-rendered JSX component returning a <code>new ImageResponse()</code> with custom dynamic typography, badges, and avatars.</li>
      </ul>

      <h3>2. The metadataBase Absolute URL Requirement</h3>
      <p>Next.js requires defining <code>metadataBase</code> in your root <code>app/layout.tsx</code>. If omitted, Next.js warns about relative Open Graph URLs. Social crawlers (like Facebook External Hit or Twitterbot) cannot resolve relative paths (<code>/og-image.png</code>) and will fail to display any image.</p>
      <pre><code>// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://omniseotools.com'),
  openGraph: {
    type: 'website',
    siteName: 'OmniSEO Tools',
  },
};</code></pre>

      <h3>3. Standard 1200x630 ImageResponse Export</h3>
      <p>When building dynamic <code>opengraph-image.tsx</code> files, always export <code>size</code> and <code>contentType</code> alongside your default handler:</p>
      <pre><code>// app/blog/[slug]/opengraph-image.tsx
export const runtime = 'edge';
export const alt = 'Article Social Banner';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';</code></pre>
    `,
    preset: {
      title: "Building Edge-Rendered Dynamic Open Graph Cards in Next.js 15",
      description:
        "Generate high-performance 1200x630 social banners on the Edge with @vercel/og and Next.js ImageResponse.",
      url: "https://omniseotools.com/blog/nextjs-dynamic-og-cards",
      siteName: "OmniSEO Tools",
      imageUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
    },
    dynamicSnippet: `// app/blog/[slug]/opengraph-image.tsx (Next.js 14/15 App Router Edge OG Generator)
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Article Featured Image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 60,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#38bdf8' }}>OmniSEO Tools</span>
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.15 }}>
          Dynamic Social Banner
        </div>
        <div style={{ fontSize: 20, color: '#94a3b8' }}>
          Edge-rendered 1200x630 OpenGraph Image
        </div>
      </div>
    ),
    { ...size }
  );
}`,
    howToSteps: [
      {
        name: "Define metadataBase in Root layout.tsx",
        text: "Add `metadataBase: new URL('https://yourdomain.com')` in `app/layout.tsx` to ensure all relative OG image paths resolve to absolute URLs.",
      },
      {
        name: "Create app/opengraph-image.tsx or use generateMetadata",
        text: "Deploy a file-based `opengraph-image.tsx` using `ImageResponse` or return an `openGraph.images` array in `generateMetadata()`.",
      },
      {
        name: "Export Exact 1200x630 Dimensions",
        text: "Export `export const size = { width: 1200, height: 630 };` to instruct Next.js and crawlers on the exact image aspect ratio.",
      },
      {
        name: "Set twitter:card to summary_large_image",
        text: "Declare `twitter: { card: 'summary_large_image' }` to ensure full-width banner display on Twitter/X feeds.",
      },
      {
        name: "Validate in OmniSEO Social Previewer",
        text: "Test your Next.js route in our previewer to inspect live rendering for Twitter, LinkedIn, Facebook, and Discord.",
      },
    ],
    faqs: [
      {
        question: "Why does Next.js warn about missing metadataBase for OpenGraph images?",
        answer:
          "Open Graph and Twitter Card protocols strictly require absolute URLs (e.g. `https://example.com/og-image.png`). If you use relative paths (`/og-image.png`) without declaring `metadataBase: new URL('https://example.com')` in your root `app/layout.tsx`, Next.js logs a build warning and social crawlers fail to load the image.",
      },
      {
        question: "What is the difference between opengraph-image.tsx and metadata.openGraph.images in Next.js?",
        answer:
          "`opengraph-image.tsx` is an automated, Edge-rendered dynamic image generator using `@vercel/og` that renders JSX directly to PNG on demand. `metadata.openGraph.images` in `page.tsx` is a configuration property that references existing static image URLs.",
      },
      {
        question: "How do I prevent root layout metadata from overriding child page OG tags in Next.js?",
        answer:
          "In Next.js App Router, page-level metadata overrides layout metadata shallowly for specified properties. When defining `openGraph` in a child `page.tsx`, provide all desired fields (`title`, `description`, `images`) to avoid partial inheritance from parent layouts.",
      },
    ],
  },
];

export function getOgValidatorPlatformBySlug(slug: string): OgValidatorPlatformConfig | undefined {
  return OG_VALIDATOR_PLATFORMS.find((p) => p.slug === slug);
}

export function getAllOgValidatorPlatforms(): OgValidatorPlatformConfig[] {
  return OG_VALIDATOR_PLATFORMS;
}
