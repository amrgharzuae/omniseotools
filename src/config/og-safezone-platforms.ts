export interface OgSafeZoneFaqItem {
  question: string;
  answer: string;
}

export interface OgSafeZoneStep {
  title: string;
  description: string;
  codeSnippet?: string;
}

export interface OgSafeZoneTemplate {
  name: string;
  label: string;
  url: string;
}

export interface OgSafeZonePlatform {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1: string;
  subtitle: string;
  uniqueContext: string;
  coreH2: string;
  directAnswerSummary: string;
  directAnswerDetails: string;
  educationalContent: {
    heading: string;
    paragraphs: string[];
    calloutBox?: {
      title: string;
      text: string;
      codeExample?: string;
    };
  };
  sampleTemplates: OgSafeZoneTemplate[];
  initialImageUrl: string;
  initialTitle: string;
  initialDescription: string;
  initialDomain: string;
  actionableSteps: OgSafeZoneStep[];
  faqItems: OgSafeZoneFaqItem[];
}

export const OG_SAFEZONE_PLATFORMS: OgSafeZonePlatform[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify",
    shortName: "Shopify",
    title: "Shopify Open Graph Image Previewer & Safe Zone Checker | OmniSEO Tools",
    metaDescription:
      "Preview and fix Shopify social sharing images. Test automatic 1200x630 safe zones, 1:1 product thumbnail cropping, and Twitter card layouts.",
    badge: "Shopify E-Commerce",
    h1: "Shopify Open Graph Image Previewer & Safe Zone Checker",
    subtitle:
      "Simulate how Shopify product photos, collection banners, and default store social sharing images crop across Facebook, Twitter/X, and WhatsApp.",
    uniqueContext:
      "Resolving the 1:1 square product image vs 1.91:1 og:image ratio conflict in theme.liquid.",
    coreH2: "Why Shopify Shares Show Broken Crops on WhatsApp & Facebook",
    directAnswerSummary:
      "Shopify themes default to extracting product.featured_image for social meta tags. Because e-commerce product photos are almost always square (1:1 / 1080x1080px) or vertical (3:4), horizontal social sharing crawlers like Facebook, Twitter, and LinkedIn forcibly crop the top and bottom 35% of the image to fit a 1.91:1 (1200x630px) container. This cuts off product logos, models' faces, and promotion badges.",
    directAnswerDetails:
      "To prevent clipped thumbnails, stores should maintain 60px safe-zone padding on all sides of social cards or inject dedicated 1200x630 landscape banners via Shopify metafields (product.metafields.custom.og_image) in theme.liquid.",
    educationalContent: {
      heading: "Fixing 1:1 vs 1.91:1 Aspect Ratio Conflicts in Shopify Themes",
      paragraphs: [
        "In modern e-commerce merchandising, product photography is captured in 1:1 square or 4:5 vertical aspect ratios to maximize mobile catalog conversions. However, Open Graph protocol specifications expect a landscape 1.91:1 (1200x630px) ratio.",
        "When an untuned theme outputs `<meta property='og:image' content='{{ product.featured_image | image_url }}'>`, Facebook and WhatsApp center-crop the square image horizontally. The top and bottom 200px are instantly discarded.",
        "By previewing your social assets inside our safe-zone simulator, you can verify that all essential brand elements fall inside the central 1080x560px visible box.",
      ],
      calloutBox: {
        title: "Recommended theme.liquid Open Graph Snippet",
        text: "Check for custom 1200x630 social metafields first before falling back to product.featured_image:",
        codeExample: `{% if product.metafields.custom.og_image %}
  <meta property="og:image" content="{{ product.metafields.custom.og_image | image_url: width: 1200, height: 630, crop: 'center' }}" />
{% elsif product.featured_image %}
  <meta property="og:image" content="{{ product.featured_image | image_url: width: 1200, height: 630, crop: 'center' }}" />
{% else %}
  <meta property="og:image" content="{{ settings.share_image | image_url: width: 1200, height: 630 }}" />
{% endif %}
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`,
      },
    },
    sampleTemplates: [
      {
        name: "Shopify Product Square (1:1)",
        label: "Product 1:1 (1080x1080)",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1080&h=1080&fit=crop&q=80",
      },
      {
        name: "Shopify Social Banner (1.91:1)",
        label: "Store Banner (1200x630)",
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop&q=80",
      },
      {
        name: "Shopify Collection (16:9)",
        label: "Collection (1200x675)",
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=675&fit=crop&q=80",
      },
    ],
    initialImageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1080&h=1080&fit=crop&q=80",
    initialTitle: "Handcrafted Minimalist Timepiece — Limited Artisan Edition",
    initialDescription:
      "Engineered with aerospace-grade steel and Swiss movement. Explore our limited summer collection with complimentary global shipping.",
    initialDomain: "myshop.com",
    actionableSteps: [
      {
        title: "1. Upload a Storewide Fallback Image",
        description:
          "In Shopify Admin, go to Online Store > Preferences > Social sharing image preview. Upload a 1200x630px landscape graphic with your store logo centered inside the safe zone.",
      },
      {
        title: "2. Define a Dedicated 1200x630 Product Metafield",
        description:
          "Go to Settings > Custom data > Products > Add definition. Name it 'Social Share Image' (key: custom.og_image) and select 'File (Image)'.",
      },
      {
        title: "3. Update theme.liquid to Reference the Metafield",
        description:
          "Edit your theme layout to check for product.metafields.custom.og_image with explicit og:image:width and og:image:height tags.",
      },
      {
        title: "4. Clear Social Crawler Caches",
        description:
          "Use the Facebook Sharing Debugger and LinkedIn Post Inspector to scrape your Shopify URL and clear old cached thumbnails.",
      },
    ],
    faqItems: [
      {
        question: "How do I prevent Shopify from cropping product images on Facebook and Twitter?",
        answer:
          "By default, Shopify shares the product's primary image, which is usually a 1:1 square. Because Facebook and Twitter use a 1.91:1 horizontal container (1200x630px), the top and bottom are cropped. You can resolve this by adding a dedicated 1200x630px image metafield in Shopify or ensuring product subjects are centered with generous margins.",
      },
      {
        question: "Where do I upload a default social share image in Shopify?",
        answer:
          "In your Shopify Admin, navigate to Online Store > Preferences. Under the 'Social sharing image preview' section, click 'Add image' and upload a 1200x630px PNG or JPG image under 8MB.",
      },
      {
        question: "How long does Facebook take to update a changed Shopify product image?",
        answer:
          "Facebook caches Open Graph data for up to 30 days. To force Facebook to re-crawl your updated Shopify product card immediately, enter the product URL into the Facebook Sharing Debugger and click 'Scrape Again'.",
      },
    ],
  },

  // 2. WordPress
  {
    slug: "wordpress",
    name: "WordPress & Yoast / RankMath",
    shortName: "WordPress",
    title: "WordPress Open Graph Previewer - Yoast & RankMath Safe Zone Tool | OmniSEO Tools",
    metaDescription:
      "Inspect WordPress social preview cards. Test Yoast, RankMath, and WooCommerce featured image aspect ratios against Facebook and Twitter card standards.",
    badge: "WordPress & SEO Plugins",
    h1: "WordPress Open Graph Previewer & Safe Zone Checker",
    subtitle:
      "Test how WordPress featured images, Yoast SEO social cards, and RankMath Open Graph tags render across major social networks.",
    uniqueContext:
      "Featured image cropping vs default sitewide social fallback images in WordPress.",
    coreH2: "Fixing Missing or Cropped Open Graph Images in WordPress",
    directAnswerSummary:
      "WordPress SEO plugins (Yoast SEO, RankMath, SEOPress) automatically generate og:image tags from your post featured image. If your featured image is sized for a vertical blog header or lacks explicit 1200x630 dimensions, social platforms may downgrade the share to a small square thumbnail card or crop out essential text overlays.",
    directAnswerDetails:
      "Both Yoast and RankMath provide dedicated 'Social' metabox tabs on every post to upload platform-optimized 1200x630px images separate from the on-page featured image. Ensuring og:image:width and og:image:height are declared prevents social crawler timeouts on first-time shares.",
    educationalContent: {
      heading: "Optimizing Featured Images vs Custom Social Banners in WordPress",
      paragraphs: [
        "In WordPress publishing workflows, content creators frequently upload 16:9 (1920x1080) or custom banner images as the 'Featured Image'. While this looks great in themes, social networks require exact 1.91:1 aspect ratios.",
        "Furthermore, Twitter's crawler enforces a 5MB image limit, while Facebook requires minimum dimensions of 200x200px (with 1200x630px recommended for high-DPI Retina feeds).",
        "Using this tool, you can check whether your text overlays and call-to-actions sit safely inside the mobile overlay safe boundary.",
      ],
      calloutBox: {
        title: "WordPress functions.php Open Graph Fallback Filter",
        text: "Add a filter to guarantee all posts output explicit image dimension tags for instant social caching:",
        codeExample: `add_filter('wpseo_opengraph_image_size', function() {
    return array(1200, 630);
});`,
      },
    },
    sampleTemplates: [
      {
        name: "WordPress Blog Post (1200x630)",
        label: "Blog Post (1200x630)",
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&q=80",
      },
      {
        name: "WooCommerce Product (800x800)",
        label: "WooCommerce (800x800)",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80",
      },
      {
        name: "WordPress Header Hero (1920x1080)",
        label: "Hero (1920x1080)",
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1920&h=1080&fit=crop&q=80",
      },
    ],
    initialImageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop&q=80",
    initialTitle: "The Complete 2026 Guide to WordPress Performance & Core Web Vitals",
    initialDescription:
      "Master edge caching, database optimization, and Next-Gen image formats in WordPress to achieve 100% PageSpeed scores.",
    initialDomain: "mywordpressblog.com",
    actionableSteps: [
      {
        title: "1. Set Custom Facebook & Twitter Images in Yoast / RankMath",
        description:
          "In the WordPress post editor, scroll to the Yoast / RankMath metabox, click the 'Social' tab, and upload a dedicated 1200x630px image.",
      },
      {
        title: "2. Configure the Global Social Fallback Image",
        description:
          "Navigate to Yoast > Settings > Site representation > Social sharing, and upload a default 1200x630 image used whenever a post lacks a featured image.",
      },
      {
        title: "3. Verify og:image:width and og:image:height Tags",
        description:
          "Check your HTML source code to confirm your SEO plugin outputs width: 1200 and height: 630. This ensures Facebook renders large landscape cards on the very first share.",
      },
      {
        title: "4. Test Social Card Previews in Live Crawlers",
        description:
          "Use Twitter Card Validator and Facebook Sharing Debugger to confirm correct card rendering before publishing to social channels.",
      },
    ],
    faqItems: [
      {
        question: "Why is Yoast SEO not outputting the featured image in Open Graph tags?",
        answer:
          "This typically occurs if the featured image is under 200x200px (which Facebook rejects) or if another social plugin (like Jetpack or theme built-in tags) is creating duplicate conflicting og:image tags.",
      },
      {
        question: "How do I fix the 'The provided og:image properties are not yet available' error?",
        answer:
          "When Facebook crawls an image for the first time, it has to download and inspect it asynchronously, causing the first share to lack an image. You can fix this by explicitly declaring og:image:width (1200) and og:image:height (630) tags in WordPress.",
      },
      {
        question: "What is the difference between summary and summary_large_image in WordPress?",
        answer:
          "summary displays a small 1:1 square thumbnail next to the title (ideal for square product photos), while summary_large_image displays a prominent 1.91:1 full-width horizontal banner above the title.",
      },
    ],
  },

  // 3. Next.js
  {
    slug: "nextjs",
    name: "Next.js App Router",
    shortName: "Next.js",
    title: "Next.js Open Graph Image Previewer | opengraph-image.tsx Validator | OmniSEO Tools",
    metaDescription:
      "Preview dynamic Next.js opengraph-image.tsx layouts. Validate 1200x630 safe zone boundaries, edge runtime rendering, and crawler cache invalidation.",
    badge: "Next.js App Router",
    h1: "Next.js Open Graph Image Previewer & opengraph-image.tsx Validator",
    subtitle:
      "Preview dynamically generated @vercel/og images, static metadata exports, and safe-zone boundaries for Next.js 14 and 15 applications.",
    uniqueContext:
      "Edge-generated JSX social images using @vercel/og and metadata export standards.",
    coreH2: "Debugging Dynamic Open Graph Images in Next.js App Router",
    directAnswerSummary:
      "Next.js App Router provides built-in dynamic image generation via opengraph-image.tsx and twitter-image.tsx using the ImageResponse API (@vercel/og). Because social crawlers do not execute JavaScript and require fast response times under 3 seconds, dynamic images must execute on the Edge runtime with strict 1200x630 dimensions and standard CSS flexbox layouts.",
    directAnswerDetails:
      "In Next.js, social images can be declared either statically via export const metadata = { openGraph: { images: [...] } } or dynamically by placing an opengraph-image.tsx file inside any route directory segment.",
    educationalContent: {
      heading: "Building Pixel-Perfect opengraph-image.tsx Layouts with @vercel/og",
      paragraphs: [
        "Dynamic Open Graph generation in Next.js allows modern web apps to render personalized, data-rich social cards for every dynamic blog post, product, or user profile automatically.",
        "However, @vercel/og uses Satori under the hood, which only supports a subset of HTML and CSS (primarily Flexbox, no CSS Grid, limited absolute positioning).",
        "By simulating your layouts inside our safe-zone previewer, you can ensure text headers, author avatars, and brand logos do not get clipped by mobile feed overlays.",
      ],
      calloutBox: {
        title: "Next.js 15 opengraph-image.tsx Edge Route Example",
        text: "Standard template for 1200x630 dynamic social cards in Next.js App Router:",
        codeExample: `import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Article Social Preview';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b)',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 'bold' }}>{params.slug}</div>
        <div style={{ fontSize: 24, color: '#38bdf8' }}>omniseotools.com</div>
      </div>
    ),
    { ...size }
  );
}`,
      },
    },
    sampleTemplates: [
      {
        name: "Next.js Edge Dynamic Card (1200x630)",
        label: "Dynamic 1200x630",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
      },
      {
        name: "Next.js Dark Dev Card (1200x630)",
        label: "Developer Dark Card",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop&q=80",
      },
      {
        name: "Next.js Minimalist Layout (1200x630)",
        label: "Gradient Minimalist",
        url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=630&fit=crop&q=80",
      },
    ],
    initialImageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop&q=80",
    initialTitle: "Building Scalable Edge Architectures with Next.js 15 App Router",
    initialDescription:
      "Learn how to leverage Server Actions, Partial Prerendering (PPR), and dynamic edge Open Graph image generation.",
    initialDomain: "nextjs-app.dev",
    actionableSteps: [
      {
        title: "1. Create opengraph-image.tsx in Your Route Segment",
        description:
          "Add an opengraph-image.tsx file inside your app/[slug]/ directory. Export runtime = 'edge' and size = { width: 1200, height: 630 }.",
      },
      {
        title: "2. Structure Layout with 60px Padding Safe Zones",
        description:
          "Use standard Flexbox styling with at least 60px padding on all sides to prevent text truncation in mobile app webviews.",
      },
      {
        title: "3. Configure Static Metadata Fallbacks in layout.tsx",
        description:
          "In your root layout.tsx, define default openGraph and twitter card metadata properties with canonical absolute URLs.",
      },
      {
        title: "4. Verify Crawler Cache Headers",
        description:
          "Ensure your image route sets public, max-age=31536000, immutable cache-control headers on static assets.",
      },
    ],
    faqItems: [
      {
        question: "How do I generate dynamic Open Graph images per blog post in Next.js 15?",
        answer:
          "Create a file named opengraph-image.tsx inside app/blog/[slug]/. Inside, export an async function Image({ params }) that queries your CMS data and returns a new ImageResponse(<div>...</div>, { width: 1200, height: 630 }). Next.js automatically creates the corresponding <meta property='og:image'> tag.",
      },
      {
        question: "Why does my opengraph-image.tsx render a blank box on Twitter?",
        answer:
          "Twitter requires absolute URLs (e.g. https://yourdomain.com/blog/slug/opengraph-image) and enforces strict 5MB limits. Ensure you set metadataBase in your root layout.tsx so Next.js can resolve relative image URLs to absolute ones.",
      },
      {
        question: "How do I invalidate cached Open Graph images on Vercel deployments?",
        answer:
          "Social platforms like Facebook and Twitter cache OG images aggressively. When deploying updates, append a cache-busting query parameter (e.g. ?v=2) to the image URL or trigger a manual refresh using the Facebook Sharing Debugger.",
      },
    ],
  },
];

export function getAllOgSafeZonePlatforms(): OgSafeZonePlatform[] {
  return OG_SAFEZONE_PLATFORMS;
}

export function getOgSafeZonePlatformBySlug(slug: string): OgSafeZonePlatform | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return OG_SAFEZONE_PLATFORMS.find((p) => p.slug.toLowerCase() === normalized);
}
