import { PlatformDefinition, PlatformSlug, PlatformToolSEOData, PlatformFAQItem } from "@/types/platform";
import { getProgrammaticToolBySlug } from "./tools-registry";

export const PLATFORMS_REGISTRY: PlatformDefinition[] = [
  // 1. Next.js
  {
    slug: "nextjs",
    name: "Next.js",
    shortName: "Next.js",
    badge: "React & App Router",
    category: "Modern React Framework",
    tagline: "Native metadata export & dynamic Open Graph image generation with App Router",
    description:
      "Next.js App Router utilizes the native Metadata API (`generateMetadata` or static `metadata` export) and dynamic OpenGraph image generation (`opengraph-image.tsx`) to produce server-rendered SEO and social preview meta tags.",
    snippetLanguage: "typescript",
    snippetFilename: "app/layout.tsx",
    defaultSnippet: `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'My High-Ranking SaaS Platform',
    template: '%s | MyBrand',
  },
  description: 'Boost your digital visibility with real-time SEO validation.',
  openGraph: {
    title: 'My High-Ranking SaaS Platform',
    description: 'Boost your digital visibility with real-time SEO validation.',
    url: 'https://example.com',
    siteName: 'MyBrand',
    images: [
      {
        url: 'https://example.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Open Graph preview banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My High-Ranking SaaS Platform',
    description: 'Boost your digital visibility with real-time SEO validation.',
    creator: '@mybrand',
    images: ['https://example.com/og-image.png'],
  },
};`,
    howItWorks:
      "Next.js 13+ App Router processes metadata server-side before streaming HTML to the client. You can define static `metadata` objects in `layout.tsx` or `page.tsx`, or dynamically resolve async parameters via `generateMetadata({ params, searchParams })`. Next.js automatically injects standard `<head>` tags (Open Graph, Twitter Cards, canonical links, and viewport specifications) with zero client JavaScript overhead.",
    bestPractices: [
      "Use `metadataBase: new URL('https://example.com')` in your root `app/layout.tsx` to automatically resolve relative image and canonical URLs.",
      "Leverage Next.js `opengraph-image.tsx` with `@vercel/og` to dynamically render custom 1200x630 branded graphics on the edge.",
      "Implement dynamic `generateMetadata({ params })` on nested dynamic routes to prevent duplicate title tags across product and article pages.",
      "Specify `twitter.card: 'summary_large_image'` to command maximum timeline visibility on X / Twitter feeds.",
    ],
    setupSteps: [
      {
        name: "Define Base URL in Root Layout",
        text: "Add `metadataBase: new URL('https://yourdomain.com')` inside your root `app/layout.tsx` so all social images resolve to absolute URLs.",
      },
      {
        name: "Add Typed Metadata in Page Route",
        text: "Export a static `metadata: Metadata` object or an async `generateMetadata` function inside your `app/[slug]/page.tsx` file.",
      },
      {
        name: "Attach Social Card Image",
        text: "Place a 1200x630 PNG/JPG in your route folder as `opengraph-image.png` or configure `openGraph.images` array.",
      },
      {
        name: "Validate Output with OmniSEOTools",
        text: "Test your live or localhost preview URL in this validator to ensure zero tag truncations and proper aspect ratios.",
      },
    ],
    defaultFaqs: [
      {
        question: "How do I implement dynamic Open Graph tags in Next.js 15 App Router?",
        answer:
          "In Next.js App Router, export an async function named `generateMetadata({ params })` from your `page.tsx` file. Fetch your post or product data and return a typed `Metadata` object containing `title`, `description`, `openGraph`, and `twitter` properties.",
      },
      {
        question: "Why is my Open Graph image not showing when sharing Next.js URLs?",
        answer:
          "The most common reason is missing the `metadataBase` configuration in root `layout.tsx`. Without `metadataBase`, relative paths like `/og.png` cannot resolve to absolute HTTPS URLs required by social crawlers like Facebook, Twitterbot, and LinkedIn.",
      },
      {
        question: "Can I use @vercel/og for dynamic social share cards in Next.js?",
        answer:
          "Yes! Create an `opengraph-image.tsx` or `twitter-image.tsx` file in your route directory using Next.js ImageResponse API to generate 1200x630 dynamic SVG/JSX-based share cards on the edge.",
      },
    ],
  },

  // 2. Shopify
  {
    slug: "shopify",
    name: "Shopify",
    shortName: "Shopify",
    badge: "E-Commerce Liquid",
    category: "E-Commerce CMS",
    tagline: "Liquid theme tags & automated product social card optimization",
    description:
      "Shopify themes use Liquid templating (`theme.liquid` or `social-meta-tags.liquid`) and Shopify Admin SEO fields to output dynamic Open Graph, Twitter cards, and Google SERP tags across product, collection, and article pages.",
    snippetLanguage: "liquid",
    snippetFilename: "snippets/social-meta-tags.liquid",
    defaultSnippet: `{% comment %} Open Graph & Twitter Cards for Shopify {% endcomment %}
<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:url" content="{{ canonical_url }}">
<meta property="og:title" content="{{ page_title | default: shop.name }}">
<meta property="og:type" content="{% if template contains 'product' %}product{% elsif template contains 'article' %}article{% else %}website{% endif %}">
<meta property="og:description" content="{{ page_description | default: shop.description | escape }}">

{%- if template contains 'product' -%}
  <meta property="og:image" content="http:{{ product.featured_media | image_url: width: 1200, height: 630 }}">
  <meta property="og:image:secure_url" content="https:{{ product.featured_media | image_url: width: 1200, height: 630 }}">
  <meta property="og:price:amount" content="{{ product.price | money_without_currency | strip_html }}">
  <meta property="og:price:currency" content="{{ cart.currency.iso_code }}">
{%- elsif template contains 'article' and article.image -%}
  <meta property="og:image" content="https:{{ article.image | image_url: width: 1200, height: 630 }}">
{%- elsif settings.share_image -%}
  <meta property="og:image" content="https:{{ settings.share_image | image_url: width: 1200, height: 630 }}">
{%- endif -%}

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ page_title | default: shop.name }}">
<meta name="twitter:description" content="{{ page_description | default: shop.description | escape }}">`,
    howItWorks:
      "Shopify outputs SEO metadata through Liquid template tags in `layout/theme.liquid`. When a product or collection page is requested, Shopify renders variables like `page_title`, `page_description`, `product.featured_image`, and `canonical_url`. Store owners can customize page-specific titles and descriptions in Shopify Admin > Products/Pages > 'Search engine listing'.",
    bestPractices: [
      "Keep Shopify product SEO titles under 60 characters and descriptions between 120-155 characters to avoid Google and social truncation.",
      "Upload a high-resolution 1200x630 fallback social sharing image in Shopify Admin > Online Store > Preferences.",
      "Ensure product featured images use high resolution with the `image_url: width: 1200, height: 630` Liquid filter for crisp social card rendering.",
      "Verify `canonical_url` tag is present in `theme.liquid` to prevent duplicate product collection URL indexing.",
    ],
    setupSteps: [
      {
        name: "Upload Global Fallback Social Image",
        text: "In Shopify Admin, navigate to Online Store > Preferences > Social sharing image preview and upload a 1200x630px PNG/JPG.",
      },
      {
        name: "Edit Product / Page SEO Fields",
        text: "Scroll to 'Search engine listing' at the bottom of any product, collection, or blog post to customize your meta title and description.",
      },
      {
        name: "Include Social Meta Snippet in Theme",
        text: "In Online Store > Themes > Edit code, verify `{% render 'social-meta-tags' %}` is placed inside the `<head>` of `theme.liquid`.",
      },
      {
        name: "Verify with OmniSEOTools",
        text: "Paste your Shopify product URL into this validator to inspect title pixel widths, Open Graph cards, and Twitter tags.",
      },
    ],
    defaultFaqs: [
      {
        question: "Where do I edit meta tags and Open Graph data in Shopify?",
        answer:
          "You can edit SEO titles and meta descriptions per product, page, or article at the bottom of the editor under 'Search engine listing'. Global Open Graph fallback images are set in Online Store > Preferences.",
      },
      {
        question: "Why is Shopify showing the wrong image when shared on Facebook or Twitter?",
        answer:
          "If a page has no specific featured image, Shopify uses the fallback set in Online Store > Preferences. Also, social networks cache scraped cards; use Facebook Sharing Debugger or LinkedIn Post Inspector to purge old cached previews.",
      },
      {
        question: "How do I ensure Shopify product prices appear in social cards?",
        answer:
          "Add `og:price:amount` and `og:price:currency` Open Graph tags inside your `snippets/social-meta-tags.liquid` file using Liquid variables `{{ product.price | money_without_currency }}` and `{{ cart.currency.iso_code }}`.",
      },
    ],
  },

  // 3. WordPress
  {
    slug: "wordpress",
    name: "WordPress",
    shortName: "WordPress",
    badge: "CMS & Plugins",
    category: "Content Management System",
    tagline: "Yoast SEO, Rank Math, and custom PHP wp_head hook integration",
    description:
      "WordPress powers meta tags, SERP snippets, and social cards either via dedicated SEO plugins (Yoast SEO, Rank Math, SEOPress) or custom PHP hooks in `functions.php` using the `wp_head` action filter.",
    snippetLanguage: "php",
    snippetFilename: "functions.php",
    defaultSnippet: `<?php
/**
 * Custom Open Graph & Twitter Cards without plugins in WordPress
 */
function omni_custom_social_meta_tags() {
    global $post;
    if (is_singular()) {
        $title = get_the_title();
        $description = wp_strip_all_tags(get_the_excerpt() ? get_the_excerpt() : wp_trim_words($post->post_content, 25));
        $url = get_permalink();
        $thumb_id = get_post_thumbnail_id();
        $image = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'large') : get_site_icon_url(1200);
        
        echo '<meta property="og:type" content="article" />' . "\n";
        echo '<meta property="og:title" content="' . esc_attr($title) . '" />' . "\n";
        echo '<meta property="og:description" content="' . esc_attr($description) . '" />' . "\n";
        echo '<meta property="og:url" content="' . esc_url($url) . '" />' . "\n";
        echo '<meta property="og:site_name" content="' . esc_attr(get_bloginfo('name')) . '" />' . "\n";
        if ($image) {
            echo '<meta property="og:image" content="' . esc_url($image) . '" />' . "\n";
        }
        echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '" />' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr($description) . '" />' . "\n";
        if ($image) {
            echo '<meta name="twitter:image" content="' . esc_url($image) . '" />' . "\n";
        }
    }
}
add_action('wp_head', 'omni_custom_social_meta_tags', 5);`,
    howItWorks:
      "WordPress injects `<head>` elements during the execution of the `wp_head` action hook. SEO plugins like Yoast SEO or Rank Math filter this hook to insert automated Open Graph (`og:*`), Twitter Card (`twitter:*`), and schema.org JSON-LD scripts dynamically from custom fields and post featured images.",
    bestPractices: [
      "Always set a Featured Image (1200x630px) for every WordPress post and page to ensure high-CTR social card rendering.",
      "Configure fallback social sharing images in Yoast SEO (SEO > Social > Facebook) or Rank Math (General Settings > Social Meta).",
      "Avoid running multiple SEO plugins simultaneously to prevent duplicate `<title>` or Open Graph tag collisions.",
      "Use our Pixel Checker to verify title lengths before publishing, ensuring no Google truncation on mobile SERPs.",
    ],
    setupSteps: [
      {
        name: "Install Rank Math or Yoast SEO",
        text: "Install an industry-standard SEO plugin from WordPress Plugins > Add New, or paste our custom snippet in child theme `functions.php`.",
      },
      {
        name: "Assign Featured Image",
        text: "Upload a 1200x630px image in the 'Featured image' panel in the WordPress block or classic editor.",
      },
      {
        name: "Configure Social Share Preview",
        text: "Open the SEO plugin metabox below your post editor, switch to the 'Social' tab, and customize title, description, and image.",
      },
      {
        name: "Validate Live URL",
        text: "Test your published WordPress post link in OmniSEOTools to verify live meta tags and social preview dimensions.",
      },
    ],
    defaultFaqs: [
      {
        question: "Why is Facebook or Twitter not picking up my WordPress featured image?",
        answer:
          "Common issues include: image size being smaller than 600x315px, an active security plugin blocking social crawler user-agents, caching plugins serving stale HTML, or social networks using an outdated cached scrape.",
      },
      {
        question: "Should I use a plugin or custom functions.php code for WordPress Open Graph tags?",
        answer:
          "Plugins like Yoast or Rank Math offer intuitive UI editors for writers and non-developers. However, if you prefer a lightweight, zero-plugin setup, our PHP `wp_head` snippet delivers clean, high-performance meta tags without overhead.",
      },
      {
        question: "How do I fix duplicate Open Graph tags in WordPress?",
        answer:
          "Duplicate tags occur when both your WordPress theme and an SEO plugin output `og:*` tags. Check your theme settings or `header.php` to disable theme-level social tags, allowing your SEO plugin to handle them exclusively.",
      },
    ],
  },

  // 4. Webflow
  {
    slug: "webflow",
    name: "Webflow",
    shortName: "Webflow",
    badge: "No-Code CMS",
    category: "Visual CMS & Designer",
    tagline: "Dynamic CMS collection field binding & custom code head injection",
    description:
      "Webflow provides native Page Settings for Open Graph, SEO Title, and Meta Description, plus CMS collection field dynamic bindings and Custom Code `<head>` injection for advanced meta tags.",
    snippetLanguage: "html",
    snippetFilename: "Webflow Page Settings > Custom Code > Inside <head>",
    defaultSnippet: `<!-- Webflow Custom Code Head Injection -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@yourbrand">
<meta name="twitter:creator" content="@authorhandle">

<!-- Schema.org Microdata / JSON-LD for Webflow CMS -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{wf {"path":"name","type":"PlainText"} }}",
  "image": "{{wf {"path":"main-image","type":"ImageRef"} }}",
  "description": "{{wf {"path":"summary","type":"PlainText"} }}"
}
</script>`,
    howItWorks:
      "Webflow features dedicated SEO and Open Graph panels in each page's Settings dialog. For CMS template pages (e.g. Blog Post Template), you can dynamically connect fields like Post Name, Summary, and Main Image directly into the Open Graph Title, Description, and Image URL inputs.",
    bestPractices: [
      "In CMS Collection Page Settings, check 'Same as SEO title tag' or bind Open Graph fields dynamically to your CMS collection fields.",
      "Ensure CMS image fields used for Open Graph are uploaded with at least 1200x630 resolution.",
      "Use Webflow Site Settings > Custom Code > Head Code for global tags like `twitter:site` and `twitter:creator`.",
      "Publish your Webflow project after making meta changes, as staging changes do not reflect on production domains.",
    ],
    setupSteps: [
      {
        name: "Open Page Settings",
        text: "In Webflow Designer, click the Pages panel (P), hover over your page or CMS template, and click the Settings gear icon.",
      },
      {
        name: "Configure Open Graph Settings",
        text: "Scroll to 'Open Graph Settings', toggle 'Same as SEO title tag' or dynamically bind to CMS collection fields.",
      },
      {
        name: "Add Custom Twitter Tags",
        text: "Scroll to 'Inside <head> tag' in Page Settings or Site Settings to paste our copyable `twitter:card` snippet.",
      },
      {
        name: "Publish & Validate",
        text: "Publish your Webflow project to your custom domain and test the live URL in OmniSEOTools.",
      },
    ],
    defaultFaqs: [
      {
        question: "How do I make dynamic Open Graph images in Webflow CMS?",
        answer:
          "In Webflow Designer, open the Settings for your CMS Collection Page Template. Under Open Graph Settings, check 'Open Graph Image URL' and click 'Add Field' to bind it to your collection's image field.",
      },
      {
        question: "Why is Webflow sharing the wrong title on social media?",
        answer:
          "Webflow separates 'Title Tag' (for search engines) from 'Open Graph Title' (for social sharing). Ensure your Open Graph Title is filled out or checked to match the Title Tag in Page Settings.",
      },
      {
        question: "Does Webflow support summary_large_image Twitter cards?",
        answer:
          "Yes, but you must inject `<meta name=\"twitter:card\" content=\"summary_large_image\">` into Page Settings > Custom Code > 'Inside <head> tag' or global Project Settings > Custom Code.",
      },
    ],
  },

  // 5. Squarespace
  {
    slug: "squarespace",
    name: "Squarespace",
    shortName: "Squarespace",
    badge: "Site Builder",
    category: "Website Builder",
    tagline: "Social image settings & developer code injection header integration",
    description:
      "Squarespace manages SEO and social sharing cards through page-level Social Image and SEO settings, with Code Injection (Settings > Developer Tools > Code Injection) for custom meta tags and Twitter card properties.",
    snippetLanguage: "html",
    snippetFilename: "Settings > Developer Tools > Code Injection > Header",
    defaultSnippet: `<!-- Squarespace Global Social Meta Tags Code Injection -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@YourBrandHandle">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Canonical Link & Additional Meta -->
<meta name="theme-color" content="#4f46e5">`,
    howItWorks:
      "Squarespace automatically generates standard Open Graph tags from page titles, descriptions, and uploaded Social Sharing Images. For granular control (e.g. large Twitter cards or advanced schema), users on Business and Commerce plans can inject custom HTML tags into the global header via Code Injection.",
    bestPractices: [
      "Upload a 1200x630px image under Marketing > Social Sharing Logo for site-wide fallback social previews.",
      "Set individual page Social Images via Page Settings > Social Image tab to override the site-wide logo.",
      "Add `twitter:card content='summary_large_image'` into Code Injection to guarantee full-width Twitter card previews.",
      "Keep Squarespace page SEO descriptions under 155 characters to avoid mobile search snippet truncation.",
    ],
    setupSteps: [
      {
        name: "Upload Social Sharing Logo",
        text: "In Squarespace Home menu, go to Marketing (or Design) > Social Sharing Logo and upload a global 1200x630px image.",
      },
      {
        name: "Set Page-Level Social Image",
        text: "Hover over any page in Pages panel, click the Gear icon > Social Image tab, and upload a page-specific graphic.",
      },
      {
        name: "Inject Twitter Card Tag",
        text: "Go to Settings > Developer Tools > Code Injection and paste our copyable `<meta name=\"twitter:card\" content=\"summary_large_image\">` snippet into Header.",
      },
      {
        name: "Test Preview with OmniSEOTools",
        text: "Paste your live Squarespace link into our validator to inspect social card and SERP rendering.",
      },
    ],
    defaultFaqs: [
      {
        question: "Where do I add Open Graph and social images in Squarespace?",
        answer:
          "For site-wide defaults, go to Marketing > Social Sharing Logo. For individual pages, click the Gear icon next to the page name in the Pages panel and select the 'Social Image' tab.",
      },
      {
        question: "Why does Squarespace show a small square thumbnail on Twitter?",
        answer:
          "Squarespace defaults to standard summary cards. To enable full-width banner previews, inject `<meta name=\"twitter:card\" content=\"summary_large_image\">` into Settings > Developer Tools > Code Injection > Header.",
      },
      {
        question: "How do I fix outdated social preview images on Squarespace?",
        answer:
          "After updating your Social Image, social media crawlers retain cached versions. Use the Facebook Sharing Debugger or LinkedIn Post Inspector to force a re-scrape of your Squarespace URL.",
      },
    ],
  },

  // 6. Wix
  {
    slug: "wix",
    name: "Wix",
    shortName: "Wix",
    badge: "Wix SEO & Velo",
    category: "Website Builder",
    tagline: "Wix SEO Assistant, Social Share settings, and Velo API automation",
    description:
      "Wix handles search engine metadata and social sharing cards through the Wix SEO Tools / SEO Assistant panel, Page Settings > Social Share tab, and Wix Velo `wix-seo` API for dynamic programmatic overrides.",
    snippetLanguage: "javascript",
    snippetFilename: "page-code.js (Wix Velo)",
    defaultSnippet: `import wixSeo from 'wix-seo';

$w.onReady(function () {
  // Set dynamic SEO & Social metadata with Wix Velo
  wixSeo.setTitle("High-Ranking Page | My Wix Brand");
  wixSeo.setMetaTags([
    { name: "description", content: "Optimize your Wix website for search engines and social platforms." },
    { property: "og:title", content: "High-Ranking Page | My Wix Brand" },
    { property: "og:description", content: "Optimize your Wix website for search engines and social platforms." },
    { property: "og:image", content: "https://static.wixstatic.com/media/your-og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "High-Ranking Page | My Wix Brand" },
    { name: "twitter:image", content: "https://static.wixstatic.com/media/your-og-image.jpg" }
  ]);
});`,
    howItWorks:
      "Wix provides a visual SEO panel inside Page Settings > SEO (Google) and Social Share. For Wix Stores and Wix Blog, tags are dynamically populated from product and post fields. For custom developer requirements, Wix Velo provides the `wix-seo` module to read and write meta tags at runtime.",
    bestPractices: [
      "Set your default Social Share image in Wix Dashboard > Marketing & SEO > SEO > Social Share Image.",
      "Customize page-specific social images in Wix Editor > Pages > Page Settings > Social Share.",
      "Use Wix SEO Patterns to configure dynamic template variables (e.g. `[Product Name] - [Site Name]`) for large store catalogs.",
      "Validate character counts and pixel widths using our live tester before saving changes in Wix.",
    ],
    setupSteps: [
      {
        name: "Set Global Social Share Image",
        text: "In Wix Dashboard, navigate to Marketing & SEO > SEO > General SEO Settings and upload a default 1200x630px social image.",
      },
      {
        name: "Configure Page Social Settings",
        text: "In Wix Editor, open Pages & Menu > Page Settings (Gear) > Social Share tab to customize the title, description, and image.",
      },
      {
        name: "Apply Velo Script (Optional)",
        text: "Enable Dev Mode in Wix Editor and paste our Velo script for programmatic metadata control on dynamic pages.",
      },
      {
        name: "Verify with OmniSEOTools",
        text: "Test your published Wix URL in our live validator to confirm crisp 1.91:1 social card rendering.",
      },
    ],
    defaultFaqs: [
      {
        question: "How do I change the social share preview image on Wix?",
        answer:
          "In Wix Editor, click 'Pages & Menu', select your page, click the three dots > Settings > 'Social Share' tab, and click 'Upload Image' to set a custom 1200x630 graphic.",
      },
      {
        question: "Can I set dynamic SEO tags for Wix eCommerce products?",
        answer:
          "Yes. Go to Wix Dashboard > Marketing & SEO > SEO > SEO Patterns. Select 'Products' to customize title and description formulas using variables like `[Product Name]`, `[Product Price]`, and `[Site Name]`.",
      },
      {
        question: "Does Wix support Twitter large image cards?",
        answer:
          "Wix automatically outputs Twitter cards for images uploaded in the Social Share tab. You can also enforce `summary_large_image` via Wix Velo's `wix-seo.setMetaTags()` method.",
      },
    ],
  },

  // 7. Ghost CMS
  {
    slug: "ghost",
    name: "Ghost CMS",
    shortName: "Ghost",
    badge: "Publishing Platform",
    category: "Publishing & Newsletter CMS",
    tagline: "Native social card editors, Handlebars helpers, and Code Injection",
    description:
      "Ghost provides built-in Facebook card and Twitter card editors for every post, alongside Handlebars theme helpers (`{{ghost_head}}`, `{{meta_title}}`, `{{meta_description}}`) and Site / Post Code Injection.",
    snippetLanguage: "html",
    snippetFilename: "Ghost Admin > Settings > Code injection > Site Header",
    defaultSnippet: `<!-- Ghost Global Head Code Injection -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@yourghostbrand">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Structured Schema for Ghost Publications -->
<meta name="publisher" content="https://yourghostpublication.com">`,
    howItWorks:
      "Ghost renders SEO and social tags automatically via the `{{ghost_head}}` helper in theme templates (`default.hbs`). Authors can override the default post title, description, Twitter card, and Facebook card independently inside the Post Settings sidebar in Ghost Admin.",
    bestPractices: [
      "Fill in both Twitter card and Facebook card custom fields in the Ghost Post Settings sidebar for maximum CTR.",
      "Upload high-resolution 1200x630 Feature Images on every Ghost article.",
      "Set your Publication Social Accounts in Ghost Admin > Settings > General to enable verified Twitter author and site attribution.",
      "Use Ghost Site Header Code Injection to add custom meta tags across all publication pages.",
    ],
    setupSteps: [
      {
        name: "Open Ghost Post Settings",
        text: "In Ghost Editor, click the top-right Settings icon to open the Post Settings drawer.",
      },
      {
        name: "Configure Twitter & Facebook Cards",
        text: "Click 'Twitter card' and 'Facebook card' sections to set custom preview titles, descriptions, and separate social images.",
      },
      {
        name: "Verify Site Social Accounts",
        text: "In Ghost Admin > Settings > General, enter your publication's Twitter handle and Facebook Page URL.",
      },
      {
        name: "Audit with OmniSEOTools",
        text: "Validate your live Ghost post link in our validator to verify preview dimensions and meta tag syntax.",
      },
    ],
    defaultFaqs: [
      {
        question: "How do I customize social cards in Ghost CMS?",
        answer:
          "In the Ghost post editor, open Post Settings (gear icon in the top right), then click 'Twitter card' or 'Facebook card' to upload dedicated graphics and custom promotional copy.",
      },
      {
        question: "What does {{ghost_head}} output in Ghost themes?",
        answer:
          "`{{ghost_head}}` is a required Ghost Handlebars helper that dynamically outputs canonical URLs, meta titles, descriptions, Open Graph tags, Twitter Card tags, and JSON-LD structured data.",
      },
      {
        question: "How do I add global custom meta tags to Ghost?",
        answer:
          "Navigate to Ghost Admin > Settings > Code Injection. In the 'Site Header' textarea, paste your custom HTML `<meta>` tags and click Save.",
      },
    ],
  },

  // 8. Tailwind / HTML
  {
    slug: "tailwind",
    name: "HTML & Tailwind CSS",
    shortName: "HTML / Tailwind",
    badge: "Static HTML5",
    category: "Static HTML / Tailwind CSS",
    tagline: "Pure HTML5 <head> boilerplate with Tailwind CSS utility integration",
    description:
      "Static HTML sites styled with Tailwind CSS utilize pure HTML5 `<head>` markup for Open Graph, Twitter Cards, and search engine snippets, optimal for fast edge hosting on Cloudflare, Vercel, or Netlify.",
    snippetLanguage: "html",
    snippetFilename: "index.html (<head>)",
    defaultSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>High-Performance Tailwind Landing Page | Fast & Modern</title>
  <meta name="title" content="High-Performance Tailwind Landing Page | Fast & Modern" />
  <meta name="description" content="Discover ultra-fast web experiences built with Tailwind CSS and validated for maximum search visibility." />
  <link rel="canonical" href="https://yourdomain.com/" />

  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourdomain.com/" />
  <meta property="og:title" content="High-Performance Tailwind Landing Page | Fast & Modern" />
  <meta property="og:description" content="Discover ultra-fast web experiences built with Tailwind CSS and validated for maximum search visibility." />
  <meta property="og:image" content="https://yourdomain.com/images/og-banner-1200x630.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://yourdomain.com/" />
  <meta name="twitter:title" content="High-Performance Tailwind Landing Page | Fast & Modern" />
  <meta name="twitter:description" content="Discover ultra-fast web experiences built with Tailwind CSS and validated for maximum search visibility." />
  <meta name="twitter:image" content="https://yourdomain.com/images/og-banner-1200x630.jpg" />
  <meta name="twitter:site" content="@yourbrand" />

  <!-- Tailwind CSS Stylesheet -->
  <link href="/css/tailwind.css" rel="stylesheet" />
</head>
<body class="bg-slate-50 text-slate-900 antialiased">`,
    howItWorks:
      "Static HTML pages declare all meta tags directly inside the document `<head>`. Because there is no runtime SSR or CMS abstraction, static HTML guarantees sub-millisecond crawler parse times, zero layout shifts (CLS), and 100% predictable social card previews across every crawler user-agent.",
    bestPractices: [
      "Always use absolute HTTPS URLs (e.g. `https://yourdomain.com/og.jpg`) for `og:image` and `twitter:image` tags.",
      "Specify both `og:image:width` (1200) and `og:image:height` (630) to allow social crawlers to render the card immediately on first crawl.",
      "Keep static HTML `<title>` tags between 50-60 characters and meta descriptions between 120-155 characters.",
      "Host featured social graphics on high-speed CDNs with proper `Cache-Control: public, max-age=31536000` headers.",
    ],
    setupSteps: [
      {
        name: "Copy HTML5 Meta Boilerplate",
        text: "Copy our tailored HTML5 `<head>` snippet and paste it directly into your `index.html` or master template.",
      },
      {
        name: "Replace Placeholders",
        text: "Replace `https://yourdomain.com/`, titles, descriptions, and the 1200x630 image path with your real production assets.",
      },
      {
        name: "Deploy to Fast Edge Host",
        text: "Deploy your static Tailwind build to Vercel, Netlify, or Cloudflare Pages.",
      },
      {
        name: "Validate in OmniSEOTools",
        text: "Run your live URL through our validator to ensure 100% tag compliance and zero syntax flaws.",
      },
    ],
    defaultFaqs: [
      {
        question: "Why do Open Graph images require absolute URLs in HTML?",
        answer:
          "Social crawlers (Facebook, Twitterbot, LinkedInBot) do not resolve relative paths like `/images/og.jpg`. You must provide a full absolute URL beginning with `https://`.",
      },
      {
        question: "Can I use Tailwind CSS classes to style Open Graph previews?",
        answer:
          "Open Graph previews are rendered natively by each social media network's user interface, not by your webpage's CSS. However, tools like `@vercel/og` or Satori allow you to use Tailwind CSS utility classes to generate 1200x630 PNG images programmatically.",
      },
      {
        question: "What is the optimal image format for HTML social cards?",
        answer:
          "JPG or PNG with 1200 x 630 pixels resolution (1.91:1 ratio) and file sizes under 1MB. While WebP is supported by modern browsers, some legacy social scrapers still prefer standard JPG or PNG.",
      },
    ],
  },
];

export function getAllPlatforms(): PlatformDefinition[] {
  return PLATFORMS_REGISTRY;
}

export function getPlatformBySlug(slug: string): PlatformDefinition | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  const direct = PLATFORMS_REGISTRY.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.name.toLowerCase() === normalized ||
      (p.shortName && p.shortName.toLowerCase() === normalized)
  );
  if (direct) return direct;

  if (normalized === "next.js" || normalized === "next-js" || normalized === "next") {
    return PLATFORMS_REGISTRY.find((p) => p.slug === "nextjs");
  }
  if (normalized === "html" || normalized === "html5" || normalized === "tailwind-css") {
    return PLATFORMS_REGISTRY.find((p) => p.slug === "tailwind");
  }
  if (normalized === "ghost-cms") {
    return PLATFORMS_REGISTRY.find((p) => p.slug === "ghost");
  }
  return undefined;
}

/**
 * Generate platform-tailored SEO metadata, guides, snippets, and FAQs for any tool x platform permutation
 */
export function getPlatformToolContent(
  toolSlug: string,
  platformSlug: string
): PlatformToolSEOData {
  const platform = getPlatformBySlug(platformSlug) || PLATFORMS_REGISTRY[0];
  const tool = getProgrammaticToolBySlug(toolSlug);

  const toolName = tool ? tool.name : "SEO & Social Tool";
  const platformName = platform.name;

  // Tailored titles & meta
  const title = `${toolName} for ${platformName} - Live Preview & Validator`;
  const h1 = `${toolName} for ${platformName}`;
  const metaTitle = `${toolName} for ${platformName} (Live 2026 Tester & Validator)`;
  const metaDescription = `Free live ${toolName} for ${platformName}. Validate meta tags, inspect social card dimensions, and generate copy-ready ${platformName} code.`.slice(
    0,
    155
  );
  const tagline = `Test, preview, and generate exact ${platformName}-optimized tags and snippets with real-time 2026 validation.`;

  // Tailored Snippet
  let snippetCode = platform.defaultSnippet;
  let snippetFilename = platform.snippetFilename;
  let snippetLanguage = platform.snippetLanguage;
  let snippetDescription = `Copyable ${platformName} implementation configuration for ${toolName}.`;

  if (toolSlug.includes("twitter")) {
    if (platformSlug === "nextjs") {
      snippetFilename = "app/page.tsx or layout.tsx";
      snippetLanguage = "typescript";
      snippetCode = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'High-Converting Headline | Next.js',
    description: 'Engaging summary designed for high CTR on the X / Twitter timeline.',
    site: '@YourBrand',
    creator: '@AuthorHandle',
    images: ['https://example.com/twitter-card-1200x675.png'],
  },
};`;
    } else if (platformSlug === "shopify") {
      snippetFilename = "snippets/twitter-card.liquid";
      snippetLanguage = "liquid";
      snippetCode = `<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="{{ settings.social_twitter_link | split: 'twitter.com/' | last | prepend: '@' }}">
<meta name="twitter:title" content="{{ page_title | default: shop.name | escape }}">
<meta name="twitter:description" content="{{ page_description | default: shop.description | escape }}">
{%- if template contains 'product' -%}
  <meta name="twitter:image" content="https:{{ product.featured_media | image_url: width: 1200, height: 675 }}">
{%- elsif settings.share_image -%}
  <meta name="twitter:image" content="https:{{ settings.share_image | image_url: width: 1200, height: 675 }}">
{%- endif -%}`;
    } else if (platformSlug === "wordpress") {
      snippetFilename = "functions.php";
      snippetLanguage = "php";
      snippetCode = `function omni_wp_twitter_cards() {
    if (is_singular()) {
        global $post;
        $title = get_the_title();
        $desc = wp_strip_all_tags(get_the_excerpt() ?: wp_trim_words($post->post_content, 25));
        $img = get_the_post_thumbnail_url($post->ID, 'large') ?: 'https://example.com/default-card.jpg';
        
        echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '">' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr($desc) . '">' . "\n";
        echo '<meta name="twitter:image" content="' . esc_url($img) . '">' . "\n";
    }
}
add_action('wp_head', 'omni_wp_twitter_cards');`;
    }
  } else if (toolSlug.includes("pixel") || toolSlug.includes("serp") || toolSlug.includes("description")) {
    if (platformSlug === "nextjs") {
      snippetFilename = "app/page.tsx";
      snippetLanguage = "typescript";
      snippetCode = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google-Optimized Title (50-60 Chars / Under 580px)',
  description: 'Actionable meta description between 120-155 characters that drives maximum search clicks.',
  alternates: {
    canonical: 'https://example.com/my-page',
  },
};`;
    } else if (platformSlug === "shopify") {
      snippetFilename = "layout/theme.liquid (<head>)";
      snippetLanguage = "liquid";
      snippetCode = `<title>
  {{ page_title }}{% unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless %}
</title>
{% if page_description %}
  <meta name="description" content="{{ page_description | escape }}">
{% endif %}
<link rel="canonical" href="{{ canonical_url }}">`;
    } else if (platformSlug === "wordpress") {
      snippetFilename = "functions.php or SEO Plugin";
      snippetLanguage = "php";
      snippetCode = `// WordPress Document Title Support
add_theme_support('title-tag');

// Customize Title Tag Separator
add_filter('document_title_separator', function() {
    return ' | ';
});`;
    }
  }

  // Tailored Guide Content
  const guideTitle = `How ${platformName} Handles ${toolName} & Metadata Optimization`;
  const howItWorks = `When publishing on ${platformName}, optimizing ${toolName.toLowerCase()} settings ensures search engines and social platforms parse your content accurately. ${platform.howItWorks}`;

  // Tailored FAQs (2-3 items)
  const faqs: PlatformFAQItem[] = [
    {
      question: `How do I configure ${toolName} settings on ${platformName}?`,
      answer: `On ${platformName}, ${toolName.toLowerCase()} can be configured using ${
        platform.category.includes("Framework") ? "native metadata exports and configuration files" : "the page SEO settings and code injection panel"
      }. Follow the 4-step implementation guide above and paste our tested code snippet.`,
    },
    {
      question: `Why is ${platformName} not displaying updated ${toolName} data on social media or Google?`,
      answer: `Social networks and search crawlers cache metadata for days. On ${platformName}, ensure you have published your latest changes, then use platform debuggers (like Facebook Sharing Debugger or Google Search Console URL Inspection) to purge stale cache.`,
    },
    {
      question: `What are the recommended dimensions and limits for ${platformName}?`,
      answer: `For social cards on ${platformName}, use 1200 x 630 pixels (1.91:1 ratio) for large images or 400 x 400 pixels for square thumbnails. Keep titles under 60 characters and descriptions under 155 characters to prevent truncation.`,
    },
  ];

  return {
    title,
    h1,
    metaTitle,
    metaDescription,
    tagline,
    snippet: {
      code: snippetCode,
      language: snippetLanguage,
      filename: snippetFilename,
      description: snippetDescription,
    },
    guideTitle,
    howItWorks,
    steps: platform.setupSteps,
    bestPractices: platform.bestPractices,
    faqs,
  };
}
