import { AssetBudgets } from "@/lib/cwv-budget-calculator";

export interface CwvBudgetPlatformFaq {
  question: string;
  answer: string;
}

export interface CwvBudgetPlatformHowToStep {
  name: string;
  text: string;
}

export interface CwvBudgetPlatformConfig {
  slug: "nextjs" | "shopify" | "wordpress";
  name: string;
  shortName: string;
  cmsName: string;
  title: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  targetArchitectureQuirk: string;
  coreH2: string;
  presetId: string;
  presetData: AssetBudgets;
  platformTip: string;
  heroImageUrl: string;
  fontUrl: string;
  defaultCodeTab: "html" | "headers" | "nextjs";
  dynamicSnippet: string;
  dynamicSnippetFilename: string;
  directAnswer: string;
  educationalContent: string;
  howToSteps: CwvBudgetPlatformHowToStep[];
  faqs: CwvBudgetPlatformFaq[];
}

export const CWV_BUDGET_PLATFORMS: CwvBudgetPlatformConfig[] = [
  // 1. Next.js App Router
  {
    slug: "nextjs",
    name: "Next.js App Router (INP Optimization & Resource Hints)",
    shortName: "Next.js App Router",
    cmsName: "Next.js 14/15",
    title: "Next.js Core Web Vitals Budget & Resource Hint Generator | OmniSEO Tools",
    metaDescription:
      "Calculate strict byte budgets for Next.js App Router applications. Optimize LCP image preloads, manage next/font bundles, and tune client-side JavaScript hydration to pass sub-200ms INP thresholds.",
    h1: "Next.js Core Web Vitals Budget & Resource Hint Generator",
    tagline:
      "Simulate payload budgets for Next.js App Router sites, balance React Server Components against client hydration overhead, and export native Next.js link metadata.",
    targetArchitectureQuirk:
      "Client Component hydration overhead. Heavy client component trees block the main thread during interaction, degrading Interaction to Next Paint (INP). Improperly prioritized <Image> tags cause LCP delays due to lazy loading defaults.",
    coreH2: "Tuning Next.js App Router: Balancing Server Components, Font Bundles, and Sub-200ms INP",
    presetId: "nextjs",
    presetData: {
      htmlKb: 25,
      cssKb: 35,
      jsKb: 95,
      imageKb: 100,
      fontKb: 40,
    },
    platformTip:
      "Use priority={true} on hero images, load fonts via next/font/google with display: 'swap', and split dynamic UI with React Suspense to isolate hydration cost.",
    heroImageUrl: "/hero-banner.webp",
    fontUrl: "/fonts/inter-latin.woff2",
    defaultCodeTab: "nextjs",
    dynamicSnippetFilename: "app/layout.tsx & components/Hero.tsx",
    dynamicSnippet: `// 1. Next.js App Router Layout Metadata Resource Hints
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'High Performance Next.js App',
  other: {
    // Edge Link Header / Resource Hints
    link: [
      { rel: 'preconnect', url: 'https://images.ctfassets.net' },
      { rel: 'dns-prefetch', url: 'https://analytics.google.com' },
    ],
  },
};

// 2. Priority Hero LCP Image in Page Component
export function HeroBanner() {
  return (
    <div className="relative w-full h-[480px]">
      <Image
        src="/hero-banner.webp"
        alt="Hero LCP Element"
        fill
        priority // Emits fetchpriority="high" and removes loading="lazy"
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />
    </div>
  );
}`,
    directAnswer:
      "In Next.js App Router applications, achieving sub-2.5s LCP and sub-200ms INP requires keeping initial client-side JavaScript under 100 KB gzipped and prioritizing above-the-fold media with next/image. By default, Next.js renders React Server Components (RSC) to fast static HTML, but importing \"use client\" at root levels causes full-tree JavaScript hydration that locks the mobile CPU main thread. Marking your primary viewport image with priority={true} generates <link rel=\"preload\" fetchpriority=\"high\">, cutting Resource Load Delay to 0ms.",
    educationalContent: `
      <p>Next.js App Router introduces zero-bundle-size React Server Components (RSC) by default, providing one of the most efficient baseline architectures for Core Web Vitals. However, high-traffic applications frequently fall into performance traps that degrade both <strong>Largest Contentful Paint (LCP)</strong> and <strong>Interaction to Next Paint (INP)</strong>.</p>

      <h3>1. The "use client" Contagion &amp; Mobile INP Breakdown</h3>
      <p>When you add <code>"use client"</code> at a parent layout or wrapper component, Next.js is forced to bundle that component and <em>all its imported children</em> into the client JavaScript bundle. On mid-tier mobile processors (like Snapdragon 600 or MediaTek Helio), every 100 KB of compressed JavaScript takes approximately <strong>120ms to 180ms</strong> to parse, compile, and hydrate.</p>
      <ul>
        <li><strong>Main Thread Congestion:</strong> If a user taps a navigation drawer, product filter, or form input while the browser is executing heavy hydration tasks, the interaction is delayed, triggering an INP spike over 200ms.</li>
        <li><strong>Remediation:</strong> Push <code>"use client"</code> boundaries down to the leaves of your component tree. Wrap non-critical interactive widgets in <code>React.lazy()</code> or Next.js <code>dynamic(() =&gt; import(...), { ssr: false })</code>.</li>
      </ul>

      <h3>2. Eliminating LCP Delays with next/image</h3>
      <p>The standard Next.js <code>&lt;Image /&gt;</code> component defaults to <code>loading="lazy"</code> and <code>decoding="async"</code>. While ideal for below-the-fold content, using default settings on a hero banner causes the browser to defer image loading until the HTML and JavaScript layout engines compute viewport intersections—introducing an artificial <strong>400ms to 900ms Resource Load Delay</strong>.</p>
      <ul>
        <li>Always set <code>priority={true}</code> on the single largest element visible in the mobile viewport.</li>
        <li>This instructs Next.js to inject <code>fetchpriority="high"</code> and a high-priority preload link tag directly into the initial HTML stream.</li>
      </ul>

      <h3>3. Zero-Layout-Shift Font Delivery with next/font</h3>
      <p>External web fonts frequently cause Cumulative Layout Shift (CLS) or render-blocking delays. With <code>next/font/google</code> or <code>next/font/local</code>, Next.js automatically downloads the font files at build time, self-hosts them alongside your static assets, and inlines critical <code>@font-face</code> CSS with <code>size-adjust</code> fallbacks to eliminate text flashing (FOIT/FOUT).</p>
    `,
    howToSteps: [
      {
        name: "Audit Client Component Boundaries",
        text: "Inspect your bundle with @next/bundle-analyzer. Remove 'use client' directives from static content wrappers and push interactive hooks (useState, useEffect) to leaf components.",
      },
      {
        name: "Mark Above-the-Fold Hero Images with priority",
        text: "Add priority={true} to your primary hero Image component. Ensure accurate sizes attributes are provided to prevent mobile devices from downloading desktop-sized 1200px images.",
      },
      {
        name: "Configure next/font with Variable Fallbacks",
        text: "Import fonts via next/font/google using display: 'swap' and preload: true. Apply the font variable to your <html> tag to prevent font download waterfalls.",
      },
      {
        name: "Isolate Heavy Third-Party Scripts with next/script",
        text: "Wrap Google Tag Manager, Hotjar, and marketing analytics in <Script strategy=\"lazyOnload\" /> to prevent third-party scripts from competing with critical hydration bandwidth.",
      },
      {
        name: "Validate Core Web Vitals over Throttled 4G",
        text: "Open Chrome DevTools Performance panel, set CPU to 4x slowdown and Network to Fast 4G, then verify that LCP occurs in under 2.0s and Total Blocking Time (TBT) remains under 150ms.",
      },
    ],
    faqs: [
      {
        question: "How does next/script strategy affect mobile INP in Next.js?",
        answer:
          "Using strategy='afterInteractive' (the default) executes scripts immediately after the page hydrates, which frequently coincides with when the user first attempts to tap or scroll. Switching non-essential analytics and marketing trackers to strategy='lazyOnload' defers script execution until browser idle time, preserving main-thread responsiveness and preventing INP degradation.",
      },
      {
        question: "Why does next/image with priority still show an LCP warning in Lighthouse?",
        answer:
          "This typically occurs if: 1) The image is hosted on an external CDN without a corresponding <link rel='preconnect'> tag; 2) The sizes attribute is omitted, causing the browser to download full desktop resolution on mobile viewports; or 3) The image is rendered inside a Client Component that depends on client-side fetch waterfalls before mounting.",
      },
      {
        question: "What is the recommended total JavaScript budget for a Next.js App Router page?",
        answer:
          "For optimal Core Web Vitals on mobile devices, aim for a First Load JS shared budget of under 90 KB to 100 KB gzipped. When uncompressed, this equals approximately 300 KB of executable JavaScript, which can be parsed and hydrated by mid-tier mobile CPUs in under 120ms.",
      },
    ],
  },

  // 2. Shopify (Liquid Themes & Apps)
  {
    slug: "shopify",
    name: "Shopify (Liquid Themes & Third-Party App Scripts)",
    shortName: "Shopify",
    cmsName: "Shopify Liquid",
    title: "Shopify Core Web Vitals Budget & Script Deferral Calculator | OmniSEO Tools",
    metaDescription:
      "Audit and optimize Shopify Liquid store performance budgets. Calculate byte allocations to counteract third-party app script bloat, optimize hero images, and secure sub-2.5s LCP.",
    h1: "Shopify Core Web Vitals Budget & Script Deferral Calculator",
    tagline:
      "Calculate realistic byte budgets for Shopify themes, diagnose third-party app injection contention, and generate optimized Liquid preload snippets.",
    targetArchitectureQuirk:
      "App injection cascade. Shopify apps inject non-critical analytics, chat widgets, and review scripts into theme.liquid, consuming >350 KB of main-thread JavaScript and crippling mobile INP.",
    coreH2: "Counteracting Shopify App Script Bloat and Optimizing CDN Asset Delivery",
    presetId: "shopify",
    presetData: {
      htmlKb: 45,
      cssKb: 90,
      jsKb: 280,
      imageKb: 180,
      fontKb: 75,
    },
    platformTip:
      "Preload product hero images using <link rel=\"preload\" as=\"image\" href=\"{{ product.featured_image | image_url: width: 1200 }}\" fetchpriority=\"high\"> and defer non-critical app scripts until user interaction.",
    heroImageUrl: "{{ product.featured_image | image_url: width: 1200 }}",
    fontUrl: "{{ 'custom-font.woff2' | asset_url }}",
    defaultCodeTab: "html",
    dynamicSnippetFilename: "snippets/hero-preload.liquid",
    dynamicSnippet: `<!-- Shopify Liquid: Critical Viewport Preload & Preconnect Snippet -->
<head>
  <!-- 1. Preconnect to Shopify CDN & Font Origin -->
  <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
  <link rel="dns-prefetch" href="https://cdn.shopify.com">

  <!-- 2. Preload Hero Product Image on Product Pages -->
  {% if template.name == 'product' and product.featured_image %}
    <link 
      rel="preload" 
      as="image" 
      href="{{ product.featured_image | image_url: width: 1200 }}"
      imagesrcset="
        {{ product.featured_image | image_url: width: 600 }} 600w,
        {{ product.featured_image | image_url: width: 900 }} 900w,
        {{ product.featured_image | image_url: width: 1200 }} 1200w
      "
      imagesizes="(max-width: 768px) 100vw, 600px"
      fetchpriority="high"
    >
  {% endif %}

  <!-- 3. Preload Primary Theme WOFF2 Font -->
  <link 
    rel="preload" 
    href="{{ 'heading-font.woff2' | asset_url }}" 
    as="font" 
    type="font/woff2" 
    crossorigin
  >
</head>`,
    directAnswer:
      "Shopify stores frequently fail mobile Core Web Vitals (LCP > 2.5s and INP > 200ms) due to the cumulative weight of third-party app scripts injected into theme.liquid and un-preloaded hero imagery on cdn.shopify.com. To pass CrUX thresholds, you must preload the featured product image with fetchpriority=\"high\", replace heavy jQuery slider plugins with native CSS scroll snap, and defer non-critical marketing widgets (reviews, live chats, loyalty popups) until user interaction.",
    educationalContent: `
      <p>While Shopify provides world-class global CDN edge caching via Cloudflare, e-commerce storefronts frequently struggle with Core Web Vitals on mobile devices due to unmanaged app ecosystems and theme rendering pipelines.</p>

      <h3>1. The Third-Party App Injection Cascade</h3>
      <p>Most Shopify stores install between 10 and 25 apps for reviews (Yotpo, Loox, Judge.me), popups (Klaviyo), live chat (Gorgias, Zendesk), and currency conversion. In standard Liquid themes:</p>
      <ul>
        <li>Apps inject <code>&lt;script src="..."&gt;</code> tags into <code>{{ content_for_header }}</code> or <code>theme.liquid</code> without <code>defer</code> or <code>async</code> attributes.</li>
        <li>These scripts contend for the browser's 6 simultaneous TCP download connections, starving the critical CSS stylesheet and hero product image.</li>
        <li>Once downloaded, they execute simultaneously on the main thread, generating <strong>300ms to 600ms of Total Blocking Time (TBT)</strong> and causing mobile button clicks or variant selections to feel sluggish (high INP).</li>
      </ul>

      <h3>2. Optimizing the Shopify LCP Hero Image</h3>
      <p>On product and collection pages, the primary product photo is almost always the LCP element. By default, theme slideshows render images via JavaScript carousels (Slick or Swiper), delaying image discovery until after JS executes.</p>
      <ul>
        <li>Implement explicit Liquid <code>image_tag</code> filters with <code>preload: true</code> and <code>fetchpriority: 'high'</code> on the first product media item.</li>
        <li>Ensure responsive <code>imagesizes</code> and <code>imagesrcset</code> attributes are configured so mobile users download a compressed 600px image (~80 KB) rather than a desktop 2000px master asset (~450 KB).</li>
      </ul>

      <h3>3. Native Liquid Preconnect Optimization</h3>
      <p>Connecting to <code>https://cdn.shopify.com</code> in the first 50 lines of <code>theme.liquid</code> saves <strong>100ms to 180ms</strong> by performing DNS resolution, TCP handshake, and TLS negotiation in parallel with HTML document parsing.</p>
    `,
    howToSteps: [
      {
        name: "Audit theme.liquid and content_for_header",
        text: "Identify obsolete or uninstalled app code left behind in theme.liquid, snippets, and assets. Remove orphaned script tags.",
      },
      {
        name: "Preload Featured Product Images in Liquid",
        text: "Add <link rel=\"preload\" as=\"image\" href=\"{{ product.featured_image | image_url: width: 1200 }}\" fetchpriority=\"high\"> inside the <head> block of theme.liquid.",
      },
      {
        name: "Defer Marketing & Chat Apps to User Interaction",
        text: "Load heavy customer service chat widgets and review carousels only after the user scrolls 200px or performs a mousemove/touchstart event.",
      },
      {
        name: "Convert Theme Sliders to CSS Scroll Snap",
        text: "Replace JavaScript-dependent carousel libraries with lightweight modern CSS scroll snap to eliminate 60 KB of render-blocking JavaScript.",
      },
      {
        name: "Monitor Real-World CrUX Metrics in Shopify Admin",
        text: "Check Shopify Admin > Analytics > Online Store Speed report alongside Google Search Console Page Experience data to verify 75th percentile mobile compliance.",
      },
    ],
    faqs: [
      {
        question: "Why does Shopify often fail INP over 200ms on mobile?",
        answer:
          "Shopify stores typically fail INP because multiple third-party marketing and review apps execute JavaScript simultaneously on the main thread. When a shopper taps 'Add to Cart', selects a product variant, or opens the hamburger menu while these scripts are evaluating, the main thread cannot respond within Google's 200ms target.",
      },
      {
        question: "How do I safely lazy-load Shopify app scripts without breaking functionality?",
        answer:
          "You can wrap non-critical app initialization scripts in an interaction observer that waits for a 'pointerdown', 'scroll', or 'touchstart' event before inserting the script DOM node. This ensures critical above-the-fold content loads and renders in under 1.5 seconds without competing with analytics or live chat widgets.",
      },
      {
        question: "Does Shopify's CDN automatically compress images to WebP/AVIF?",
        answer:
          "Yes. Shopify automatically converts images to WebP or AVIF based on the requesting browser's Accept header when using the image_url filter. However, you must still specify appropriate width parameters (e.g., width: 800) to prevent oversized pixel dimensions from inflating transfer payload.",
      },
    ],
  },

  // 3. WordPress & WooCommerce
  {
    slug: "wordpress",
    name: "WordPress & WooCommerce (Render-Blocking CSS & Plugins)",
    shortName: "WordPress & WooCommerce",
    cmsName: "WordPress / WooCommerce",
    title: "WordPress & WooCommerce Core Web Vitals Budget Calculator | OmniSEO Tools",
    metaDescription:
      "Calculate performance budgets for WordPress and WooCommerce. Eliminate render-blocking CSS cascades, manage jQuery dependencies, and audit plugin script footprints.",
    h1: "WordPress & WooCommerce Core Web Vitals Budget Calculator",
    tagline:
      "Benchmark asset budgets for WordPress and WooCommerce stores, eliminate render-blocking plugin CSS, and generate server Link headers.",
    targetArchitectureQuirk:
      "Excessive external stylesheets and unoptimized jQuery plugins enqueued by multiple plugins, causing severe First Contentful Paint (FCP) and LCP bottlenecks on shared hosting environments.",
    coreH2: "Taming WooCommerce Asset Inflation: Dequeuing Scripts and Streamlining Critical CSS",
    presetId: "wordpress",
    presetData: {
      htmlKb: 60,
      cssKb: 120,
      jsKb: 380,
      imageKb: 250,
      fontKb: 110,
    },
    platformTip:
      "Dequeue unused WooCommerce block styles on non-shop pages using wp_dequeue_style(), inline critical viewport CSS, and preconnect to Google Fonts origins.",
    heroImageUrl: "/wp-content/uploads/hero-product.webp",
    fontUrl: "/wp-content/themes/my-theme/assets/fonts/inter.woff2",
    defaultCodeTab: "headers",
    dynamicSnippetFilename: "functions.php",
    dynamicSnippet: `<?php
/**
 * WordPress & WooCommerce: Dequeue Unused Styles and Inject Resource Hints
 */

// 1. Dequeue WooCommerce block CSS & cart fragments on non-store pages
add_action( 'wp_enqueue_scripts', function() {
    if ( ! is_woocommerce() && ! is_cart() && ! is_checkout() ) {
        wp_dequeue_style( 'wc-blocks-style' );
        wp_dequeue_style( 'woocommerce-general' );
        wp_dequeue_style( 'woocommerce-layout' );
        wp_dequeue_style( 'woocommerce-smallscreen' );
        wp_dequeue_script( 'wc-cart-fragments' );
    }
}, 99 );

// 2. Inject Critical LCP Preload & Preconnect in <head>
add_action( 'wp_head', function() {
    // Preconnect to Google Fonts / CDN
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    
    // Preload Featured Image on Single Posts / Products
    if ( is_singular() && has_post_thumbnail() ) {
        $img_src = get_the_post_thumbnail_url( get_the_ID(), 'full' );
        if ( $img_src ) {
            echo '<link rel="preload" as="image" href="' . esc_url( $img_src ) . '" fetchpriority="high">' . "\n";
        }
    }
}, 1 );`,
    directAnswer:
      "WordPress and WooCommerce sites commonly suffer from poor Core Web Vitals (FCP > 1.8s, LCP > 2.5s, and INP > 200ms) because each active plugin independently enqueues separate CSS stylesheets and jQuery scripts into the page header. To achieve green CWV scores, you must dequeue unused plugin assets on irrelevant pages using functions.php, inline critical above-the-fold CSS, enable object caching (Redis/Memcached), and preload the featured post/product image with fetchpriority=\"high\".",
    educationalContent: `
      <p>WordPress powers over 40% of the web, but its modular plugin architecture frequently leads to <strong>stylesheet fragmentation</strong>, <strong>render-blocking JavaScript cascades</strong>, and <strong>database query latency</strong> that severely impair Core Web Vitals.</p>

      <h3>1. The Render-Blocking CSS Cascade in WordPress</h3>
      <p>A typical WooCommerce installation with page builders (Elementor, Divi) and plugins (form builders, social share, sliders) enqueues between <strong>15 and 35 separate CSS files</strong> in the document <code>&lt;head&gt;</code>. Because browsers halt rendering until all external CSS stylesheets are downloaded and parsed, First Contentful Paint (FCP) and LCP are delayed by several seconds on 4G networks.</p>
      <ul>
        <li><strong>Asset Cleanup:</strong> Use <code>wp_dequeue_style()</code> to unload WooCommerce block libraries on standard blog posts and landing pages.</li>
        <li><strong>Critical CSS Inlining:</strong> Extract and inline the top 20 KB of viewport CSS into <code>&lt;style&gt;</code> tags, then asynchronously load secondary stylesheets using <code>media="print" onload="this.media='all'"</code>.</li>
      </ul>

      <h3>2. The jQuery Legacy &amp; Mobile INP Latency</h3>
      <p>Many legacy WordPress plugins rely on monolithic <code>jquery.min.js</code> (30 KB gzipped / ~90 KB uncompressed) and companion plugins (jQuery UI, Fancybox, Slick). When multiple plugins trigger DOM mutations during user interactions, the browser suffers severe layout thrashing and input delay.</p>
      <ul>
        <li>Disable <code>wc-cart-fragments.js</code> on non-e-commerce pages—this script runs an uncacheable AJAX request on every page load that can lock the main thread.</li>
        <li>Audit your plugin directory and replace heavy multi-purpose plugins with lightweight modern alternatives that utilize vanilla JavaScript.</li>
      </ul>

      <h3>3. Preloading Featured Images with High Fetch Priority</h3>
      <p>In WordPress themes, post thumbnails are rendered inside the content loop via <code>the_post_thumbnail()</code>. Without explicit optimization, WordPress adds <code>loading="lazy"</code> to all images—including the hero image at the top of the viewport. Hook into <code>wp_head</code> to emit a <code>&lt;link rel="preload" as="image" fetchpriority="high"&gt;</code> tag for the primary featured image.</p>
    `,
    howToSteps: [
      {
        name: "Audit Enqueued Scripts and Styles",
        text: "Use Query Monitor or browser DevTools Network tab to list all CSS/JS files enqueued on your homepage, blog posts, and product pages.",
      },
      {
        name: "Dequeue Unnecessary Plugin Assets via functions.php",
        text: "Add conditional wp_dequeue_style() and wp_dequeue_script() calls in your child theme's functions.php to eliminate assets on pages where they are not used.",
      },
      {
        name: "Disable WooCommerce Cart Fragments on Blog Posts",
        text: "Dequeue wc-cart-fragments on non-store pages to stop synchronous AJAX calls on page load that cause main-thread contention.",
      },
      {
        name: "Inject Featured Image Preload in wp_head",
        text: "Add an action hook in wp_head that fetches get_the_post_thumbnail_url() and outputs a high-priority preload link tag.",
      },
      {
        name: "Implement Server-Side Full Page & Object Caching",
        text: "Configure Redis object caching and page caching via Nginx FastCGI cache or LiteSpeed Cache to reduce Time to First Byte (TTFB) below 200ms.",
      },
    ],
    faqs: [
      {
        question: "Can WooCommerce pass Core Web Vitals without heavy caching plugins?",
        answer:
          "Yes, if the underlying theme is built with lean semantic HTML and minimal CSS/JS dependencies. However, for dynamic WooCommerce stores with cart and checkout functionality, server-side caching (Redis object cache + Nginx FastCGI cache) and selective asset dequeuing are crucial to keep TTFB under 300ms and eliminate render-blocking CSS delays.",
      },
      {
        question: "Why does WordPress add loading='lazy' to my LCP hero image?",
        answer:
          "WordPress 5.5+ automatically appends loading='lazy' to all images output via wp_get_attachment_image() or standard post content. For above-the-fold featured images, you should disable lazy-loading on the first image using the wp_get_attachment_image_attributes filter and inject a <link rel='preload' fetchpriority='high'> tag in wp_head.",
      },
      {
        question: "How do I fix jQuery blocking the main thread in WordPress?",
        answer:
          "You can audit your active plugins to eliminate those that require jQuery for basic tasks. For remaining plugins, ensure jQuery is deferred or loaded in the footer where possible, and dequeue legacy jQuery migrate scripts using wp_default_scripts hook if your plugins do not require legacy APIs.",
      },
    ],
  },
];

export function getCwvBudgetPlatformBySlug(slug: string): CwvBudgetPlatformConfig | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return CWV_BUDGET_PLATFORMS.find((p) => p.slug === normalized);
}

export function getAllCwvBudgetPlatforms(): CwvBudgetPlatformConfig[] {
  return [...CWV_BUDGET_PLATFORMS];
}
