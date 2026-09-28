export interface ArabicDecoderFaqItem {
  question: string;
  answer: string;
}

export interface ArabicDecoderStep {
  title: string;
  description: string;
  codeSnippet?: string;
}

export interface ArabicDecoderSamplePreset {
  name: string;
  description: string;
  url: string;
}

export interface ArabicDecoderPlatform {
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
  samplePresets: ArabicDecoderSamplePreset[];
  initialUrl: string;
  actionableSteps: ArabicDecoderStep[];
  faqItems: ArabicDecoderFaqItem[];
}

export const ARABIC_DECODER_PLATFORMS: ArabicDecoderPlatform[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify",
    shortName: "Shopify",
    title: "Shopify Arabic URL Decoder & Handle Cleaner | OmniSEO Tools",
    metaDescription:
      "Decode percent-encoded Arabic URLs in Shopify. Fix messy %D8%B9%D8%B1%D8%A8%D9%8A collection handles, product permalinks, and social share links.",
    badge: "Shopify E-Commerce",
    h1: "Shopify Arabic URL Decoder & Handle Cleaner",
    subtitle:
      "Instantly decode percent-encoded Shopify product handles, collection permalinks, and Arabic search queries into clean UTF-8 text.",
    uniqueContext:
      "Shopify automatically percent-encodes Arabic product handles and collection slugs into multi-byte hexadecimal sequences (%D8%...) to adhere to standard web URIs. When copying links from your Shopify admin, browser address bars, or marketing feeds, URLs can appear distorted and unreadable. This tool converts them back to natural Arabic client-side in 0ms.",
    coreH2: "Why Shopify Converts Arabic URLs into Percent-Encoded Strings",
    directAnswerSummary:
      "Shopify stores and routes Arabic product handles using UTF-8 percent-encoding because standard web protocols (RFC 3986) restrict URL paths to ASCII characters. When you create an Arabic product title like 'عطر عود فاخر', Shopify generates the handle '%D8%B9%D8%B7%D8%B1-%D8%B9%D9%88%D8%AF-%D9%81%D8%A7%D8%AE%D8%B1'. While web browsers display Arabic in the address bar, copying the link or checking Google Analytics reveals the raw percent-encoded byte pairs.",
    directAnswerDetails:
      "Under RFC 3986, non-ASCII characters cannot be transmitted directly across HTTP requests without encoding. Each Arabic character is transformed into a 2-byte hexadecimal representation prefixed with percent signs (e.g. %D8%AE). Shopify routes these seamlessly on the server, but client-side analytics, marketing spreadsheets, and social sharing links often display raw percent codes.",
    educationalContent: {
      heading: "Managing Arabic Handles, Liquid Breadcrumbs & Social Links in Shopify",
      paragraphs: [
        "In modern e-commerce stores serving MENA regions (Saudi Arabia, UAE, Egypt, Kuwait), clean Arabic URLs establish higher brand trust and local keyword relevancy. However, Shopify's handle generation algorithm converts spaces into hyphens and percent-encodes every Arabic character.",
        "When customers share Shopify links on WhatsApp, Facebook, or Instagram, raw percent-encoded URLs (e.g., store.com/products/%D8%B9%D8%B7%D8%B1) can look like spam or malware to buyers, reducing social click-through rates by up to 35%.",
        "By utilizing our client-side decoder, marketing and analytics teams can quickly audit UTM parameters, translate catalog handles, and verify that theme Liquid tags output clean metadata.",
      ],
      calloutBox: {
        title: "Liquid Handle Tip in Shopify theme.liquid",
        text: "When rendering breadcrumbs or schema structured data in Shopify, use the decoded object title rather than the raw URL handle to avoid percent-encoded text appearing on Google SERPs.",
        codeExample: `<!-- Recommended: Use product.title for readable schema breadcrumbs -->
<meta property="og:title" content="{{ product.title | escape }}" />
<meta property="og:url" content="{{ canonical_url }}" />`,
      },
    },
    samplePresets: [
      {
        name: "Shopify Arabic Product",
        description: "Standard Shopify product handle with variant ID",
        url: "https://store.myshopify.com/products/%D8%B9%D8%B7%D8%B1-%D8%B9%D9%88%D8%AF-%D9%81%D8%A7%D8%AE%D8%B1?variant=401239102",
      },
      {
        name: "Shopify Arabic Collection",
        description: "Collection handle with sort filter parameters",
        url: "https://store.myshopify.com/collections/%D8%B9%D8%A8%D8%A7%D9%8A%D8%A7%D8%AA-%D8%AE%D9%84%D9%8A%D8%AC%D9%8A%D8%A9?sort_by=best-selling",
      },
      {
        name: "Shopify Arabic Search & Campaign",
        description: "Search query with Arabic term and Snapchat UTM tags",
        url: "https://store.myshopify.com/search?q=%D8%AF%D9%87%D9%86+%D8%B9%D9%88%D8%AF&utm_source=snapchat&utm_campaign=%D8%B9%D8%B1%D9%88%D8%B6_%D8%B1%D9%85%D8%B6%D8%A7%D9%86",
      },
    ],
    initialUrl:
      "https://store.myshopify.com/products/%D8%B9%D8%B7%D8%B1-%D8%B9%D9%88%D8%AF-%D9%81%D8%A7%D8%AE%D8%B1?variant=401239102",
    actionableSteps: [
      {
        title: "1. Edit the Search Engine Listing in Shopify Admin",
        description:
          "Navigate to Products or Collections in your Shopify Admin, scroll down to 'Search engine listing preview', and click 'Edit website SEO'.",
      },
      {
        title: "2. Format Clean Arabic URL Handles with Hyphens",
        description:
          "Type concise Arabic keywords separated by standard hyphens (-). Avoid emojis, parentheses, and excessive punctuation that trigger complex 3-byte percent encoding.",
      },
      {
        title: "3. Enable Automated 301 URL Redirects",
        description:
          "When modifying existing product or collection handles, ensure the 'Create a redirect for [old URL]' checkbox is enabled to preserve existing organic SEO rankings and backlinks.",
      },
      {
        title: "4. Verify Open Graph and Canonical Tags in Theme Code",
        description:
          "Confirm that your theme.liquid layout references {{ canonical_url }} and does not double-encode URL parameters in Open Graph metadata tags.",
      },
    ],
    faqItems: [
      {
        question: "Will percent-encoded Arabic URLs hurt my Shopify store's Google rankings?",
        answer:
          "No. Google's search crawlers fully understand percent-encoded UTF-8 Arabic URLs and treat them identically to Unicode Arabic characters. However, clean and concise handles improve user readability, click-through rates (CTR), and social sharing engagement.",
      },
      {
        question: "How can I fix messy Arabic Shopify links when sharing on WhatsApp or Instagram?",
        answer:
          "When copying links directly from desktop browsers, browsers copy the raw percent-encoded string (%D8%...). Use this decoder to obtain the clean Unicode Arabic URL, or use a branded short link service that supports UTF-8 link previews.",
      },
      {
        question: "Why does my Shopify theme display %D8 codes in breadcrumbs?",
        answer:
          "This occurs when custom Liquid theme code uses {{ product.handle }} or {{ collection.handle }} instead of {{ product.title }} or {{ collection.title }} in the breadcrumb navigation template.",
      },
    ],
  },

  // 2. WooCommerce
  {
    slug: "woocommerce",
    name: "WooCommerce",
    shortName: "WooCommerce",
    title: "WooCommerce Arabic URL Decoder & Permalink Converter | OmniSEO Tools",
    metaDescription:
      "Clean and decode percent-encoded Arabic permalinks in WooCommerce. Fix Arabic product slugs, category URLs, and broken canonical tags.",
    badge: "WooCommerce & WordPress",
    h1: "WooCommerce Arabic URL Decoder & Permalink Converter",
    subtitle:
      "Decode and sanitize percent-encoded WooCommerce product slugs, category permalinks, and Arabic checkout parameters with zero server latency.",
    uniqueContext:
      "WordPress and WooCommerce natively support Arabic UTF-8 permalinks, storing them in the wp_posts.post_name database field. However, Nginx/Apache rewrite rules, caching plugins, and social scrapers frequently encounter percent-encoded %D8%... strings. This tool isolates parameters and converts messy links into clean Arabic text.",
    coreH2: "How to Handle Arabic Permalinks in WooCommerce Without Breaking Redirects",
    directAnswerSummary:
      "WooCommerce stores Arabic product slugs as URL-encoded UTF-8 strings in the WordPress database table wp_posts (post_name column). When browsers request 'myshop.com/product/عطر-عود', the HTTP request transmits 'myshop.com/product/%D8%B9%D8%B7%D8%B1-%D8%B9%D9%88%D8%AF'. If your web server (Nginx/Apache) or WordPress permalink settings lack proper UTF-8 rewrite rules, visitors may encounter 404 errors or redirect loops.",
    directAnswerDetails:
      "WordPress uses sanitize_title() with non-ASCII support to format Arabic post and product slugs. In Nginx and Apache configurations, ensure the web server preserves multi-byte UTF-8 query strings and passes raw unescaped URIs to PHP-FPM to avoid 404 page-not-found errors on Arabic product categories.",
    educationalContent: {
      heading: "Optimizing WooCommerce Arabic Permalinks for Search Engines & Nginx",
      paragraphs: [
        "WooCommerce powers thousands of high-traffic online stores across the Middle East. Setting up Arabic permalinks requires careful coordination between WordPress core settings, SEO plugins (RankMath, Yoast SEO), and web server rewrite rules.",
        "One common issue occurs when Nginx or Cloudflare edge servers double-encode incoming requests (turning % into %25), leading to 404 errors on valid Arabic product pages.",
        "Another pitfall is using Arabic diacritics (tashkeel: fat-ha, damma, kasra) in slugs, which generates excessively long 3-byte percent sequences. Slugs should always use stripped, plain Arabic characters.",
      ],
      calloutBox: {
        title: "Nginx UTF-8 Rewrite Configuration Snippet",
        text: "Ensure your Nginx server block uses $request_uri and charset utf-8 to prevent Arabic permalink 404s.",
        codeExample: `server {
    listen 443 ssl http2;
    server_name myshop.com;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }
}`,
      },
    },
    samplePresets: [
      {
        name: "WooCommerce Arabic Product Slug",
        description: "Product permalink with Arabic title and volume suffix",
        url: "https://myshop.com/product/%D8%B2%D9%8A%D8%AA-%D8%A3%D8%B1%D8%AC%D8%A7%D9%86-%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A-100%D9%85%D9%84",
      },
      {
        name: "WooCommerce Arabic Category & Filter",
        description: "Category hierarchy with Arabic brand filter",
        url: "https://myshop.com/product-category/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%A8%D8%B4%D8%B1%D8%A9?filter_brand=%D9%84%D9%88%D8%B1%D9%8A%D8%A7%D9%84",
      },
      {
        name: "WooCommerce Arabic Checkout Parameters",
        description: "Order received page with Arabic payment method",
        url: "https://myshop.com/checkout/order-received/12948/?key=wc_order_abc123&payment_method=%D8%A7%D9%84%D8%AF%D9%81%D8%B9-%D8%B9%D9%86%D8%AF-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%84%D8%A7%D9%85",
      },
    ],
    initialUrl:
      "https://myshop.com/product/%D8%B2%D9%8A%D8%AA-%D8%A3%D8%B1%D8%AC%D8%A7%D9%86-%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A-100%D9%85%D9%84",
    actionableSteps: [
      {
        title: "1. Configure WordPress Permalinks for UTF-8 Slugs",
        description:
          "In WordPress Admin > Settings > Permalinks, select 'Post name' (/%postname%/) or a clean custom product permalink structure (e.g. /product/%postname%/).",
      },
      {
        title: "2. Verify Nginx/Apache UTF-8 Charset Configuration",
        description:
          "Ensure your web server configuration includes 'charset utf-8;' and passes unescaped URIs ($request_uri) to PHP-FPM to prevent 404 routing errors on non-ASCII requests.",
      },
      {
        title: "3. Sanitize Arabic Product Slugs with Yoast or RankMath",
        description:
          "Use SEO plugins to standardize canonical tags between encoded and decoded formats and remove stop words from Arabic URLs.",
      },
      {
        title: "4. Test 301 Redirect Rules for Arabic Slugs",
        description:
          "When creating redirects for renamed Arabic products, use regex with UTF-8 flag (u) or dedicated redirect plugins like Redirection to avoid broken redirect chains.",
      },
    ],
    faqItems: [
      {
        question: "Why does WooCommerce return a 404 error on Arabic product links?",
        answer:
          "This is almost always caused by web server configuration issues in Nginx or Apache. If Nginx decodes or double-encodes the URL before passing it to index.php, WordPress cannot match the post_name in the database. Adding 'try_files $uri $uri/ /index.php?$args;' in your Nginx block resolves the issue.",
      },
      {
        question: "Should I use Arabic or English slugs for WooCommerce SEO in the Middle East?",
        answer:
          "Arabic slugs provide strong localized keyword relevance in Google Arabic search queries and match user search intent. However, English slugs are shorter when shared in raw ASCII environments. For optimal SEO, descriptive Arabic slugs with hyphens are recommended.",
      },
      {
        question: "How does WooCommerce handle Arabic category filtering in URLs?",
        answer:
          "WooCommerce passes Arabic taxonomy terms through URL query parameters (e.g. ?filter_color=%D8%A3%D8%AD%D9%85%D8%B1). WordPress automatically parses these parameters in the main query loop as long as the database collation is utf8mb4_unicode_ci.",
      },
    ],
  },

  // 3. WordPress
  {
    slug: "wordpress",
    name: "WordPress",
    shortName: "WordPress",
    title: "WordPress Arabic URL Decoder & Permalink Cleaner | OmniSEO Tools",
    metaDescription:
      "Decode percent-encoded Arabic URLs and permalinks in WordPress. Convert %D8%... strings from posts, categories, and tags into readable Arabic text.",
    badge: "WordPress Core",
    h1: "WordPress Arabic URL Decoder & Permalink Cleaner",
    subtitle:
      "Clean, decode, and inspect percent-encoded WordPress blog post slugs, taxonomy permalinks, and search queries.",
    uniqueContext:
      "WordPress supports native Arabic permalinks across posts, pages, and categories. When links are copied or indexed, percent-encoding can complicate data analysis. This tool restores readability in real-time.",
    coreH2: "Understanding WordPress Arabic Permalinks and UTF-8 Slug Sanitization",
    directAnswerSummary:
      "WordPress natively supports UTF-8 characters in post slugs via sanitize_title_with_dashes(). When published, non-ASCII characters are percent-encoded in HTTP headers according to RFC 3986, creating %D8%... strings in raw logs while displaying as Arabic in modern browsers.",
    directAnswerDetails:
      "When configuring WordPress for multilingual or Arabic content, WordPress converts spaces to hyphens and preserves valid Arabic Unicode characters. Search engines index these cleanly, but server logs and analytics reports output percent-encoded strings.",
    educationalContent: {
      heading: "Best Practices for Arabic Slugs in WordPress & SEO Plugins",
      paragraphs: [
        "Arabic permalinks in WordPress enhance search snippet relevancy for Arabic queries. Ensure your database uses utf8mb4 encoding to store Arabic titles and slugs without corruption.",
        "Always strip Arabic diacritics (harakat/tashkeel) from post slugs before publishing to avoid oversized percent-encoded strings in URLs.",
      ],
      calloutBox: {
        title: "WordPress UTF-8 Permalink Setting",
        text: "Use Settings > Permalinks > Post Name for clean Arabic permalinks.",
      },
    },
    samplePresets: [
      {
        name: "WordPress Arabic Post",
        description: "Blog post permalink with Arabic keywords",
        url: "https://myblog.com/%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B3%D9%8A%D9%88-%D9%84%D9%84%D9%85%D8%A8%D8%AA%D8%AF%D8%A6%D9%8A%D9%86-2026",
      },
      {
        name: "WordPress Arabic Category",
        description: "Category archive URL with Arabic slug",
        url: "https://myblog.com/category/%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A",
      },
    ],
    initialUrl:
      "https://myblog.com/%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B3%D9%8A%D9%88-%D9%84%D9%84%D9%85%D8%A8%D8%AA%D8%AF%D8%A6%D9%8A%D9%86-2026",
    actionableSteps: [
      {
        title: "1. Set UTF-8 Friendly Permalinks",
        description: "Navigate to Settings > Permalinks and select 'Post name' (/%postname%/).",
      },
      {
        title: "2. Avoid Special Punctuation in Slugs",
        description: "Strip Arabic commas (،) and question marks (؟) from permalink slugs.",
      },
      {
        title: "3. Inspect Canonical Link Tags",
        description: "Verify that your SEO plugin outputs consistent canonical tags.",
      },
    ],
    faqItems: [
      {
        question: "Does Google prefer English or Arabic slugs for WordPress sites?",
        answer:
          "Google handles both equally well. Arabic slugs provide a visual relevance signal to Arabic-speaking searchers.",
      },
      {
        question: "How do I prevent double-encoded %25D8 URLs in WordPress?",
        answer:
          "Avoid running duplicate encodeURI() functions in theme scripts or redirect rules.",
      },
      {
        question: "Why does my WordPress sitemap display percent-encoded links?",
        answer:
          "XML sitemaps must adhere to the XML standard, which requires non-ASCII characters to be percent-encoded.",
      },
    ],
  },
];

export function getAllArabicDecoderPlatforms(): ArabicDecoderPlatform[] {
  return ARABIC_DECODER_PLATFORMS;
}

export function getArabicDecoderPlatformBySlug(slug: string): ArabicDecoderPlatform | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return ARABIC_DECODER_PLATFORMS.find((p) => p.slug.toLowerCase() === normalized);
}
