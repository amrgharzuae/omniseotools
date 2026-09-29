import type { RobotsConfig } from "omniseo-core";

export interface RobotsPlatformFaq {
  question: string;
  answer: string;
}

export interface RobotsPlatformHowToStep {
  name: string;
  text: string;
}

export interface RobotsPlatformConfig {
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
  presetRobotsConfig: RobotsConfig;
  presetRobotsTxt: string;
  dynamicTsSnippet?: string;
  howToSteps: RobotsPlatformHowToStep[];
  faqs: RobotsPlatformFaq[];
}

export const ROBOTS_PLATFORMS: RobotsPlatformConfig[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify",
    shortName: "Shopify",
    cmsName: "Shopify Liquid",
    title: "Shopify Robots.txt Generator & Liquid Validator | OmniSEO Tools",
    metaDescription:
      "Generate and validate Shopify robots.txt.liquid directives. Fix default /checkout and /cart disallow rules, unblock collection filters, and manage AI scrapers safely.",
    h1: "Shopify Robots.txt Generator & Liquid Validator",
    tagline:
      "Generate, test, and validate Shopify robots.txt.liquid rules. Prevent /checkout and /cart disallow conflicts, unblock collection filters, and manage AI crawlers safely.",
    targetCmsQuirk:
      "Editing templates/robots.txt.liquid without breaking Shopify's robots.default_groups liquid loop.",
    coreH2: "How to Safely Customize Shopify's robots.txt.liquid Without De-indexing Collections",
    directAnswer:
      "By default, Shopify automatically serves a server-generated robots.txt file that blocks crawlers from accessing checkout paths (/checkout, /checkouts/, /cart, /orders), internal search queries (/search), and localized currency switchers. To customize these rules, you must create a templates/robots.txt.liquid file in your theme. Crucially, your Liquid template must iterate through `for group in robots.default_groups` to preserve Shopify's core security rules while appending your custom Disallow, Allow, or AI crawler directives.",
    educationalContent: `
      <p>Shopify manages crawler indexation through a native templating system introduced in Online Store 2.0. Rather than uploading a static <code>robots.txt</code> file to the server root (which Shopify's hosted architecture does not allow), Shopify renders the file dynamically via <code>templates/robots.txt.liquid</code>.</p>
      
      <h3>The Native Liquid robots.default_groups Architecture</h3>
      <p>In standard Shopify themes (such as Dawn, Sense, Spotlight, and Prestige), the default <code>templates/robots.txt.liquid</code> file contains the following core Liquid loop:</p>
      <pre><code># robots.txt.liquid
{% for group in robots.default_groups %}
  {{- group.user_agent -}}

  {% for rule in group.rules %}
    {{- rule -}}
  {% endfor %}

  {%- if group.sitemap != blank -%}
    {{ group.sitemap }}
  {%- endif -%}
{% endfor %}</code></pre>

      <p>This loop pulls Shopify's platform-managed disallow rules, protecting critical checkout infrastructure:</p>
      <ul>
        <li><strong>Protected Checkout Endpoints:</strong> <code>/cart</code>, <code>/orders</code>, <code>/checkouts/</code>, and <code>/checkout</code> are automatically disallowed to prevent search bots from indexing abandoned carts and private user checkouts.</li>
        <li><strong>Internal Search & Policies:</strong> <code>/search</code> and <code>/policies/</code> are excluded to prevent crawl budget waste on thin search parameter URLs.</li>
        <li><strong>Faceted Collection Filters:</strong> Shopify by default adds directives preventing indexation of multi-tag collection permutations (e.g., <code>/collections/*/*</code> or URL parameters containing <code>filter.</code>).</li>
      </ul>

      <h3>How to Safely Append Custom Rules in Shopify</h3>
      <p>When customizing your Shopify robots directives, never delete the <code>for group in robots.default_groups</code> loop entirely. Instead, inject your custom rules directly below or within conditional blocks:</p>
      <pre><code># Appending Custom AI Restrictions in Shopify robots.txt.liquid
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Bytespider
Disallow: /

# Retain Shopify Platform Core Rules
{% for group in robots.default_groups %}
  {{- group.user_agent -}}
  {% for rule in group.rules %}
    {{- rule -}}
  {% endfor %}
  {%- if group.sitemap != blank -%}
    {{ group.sitemap }}
  {%- endif -%}
{% endfor %}</code></pre>
    `,
    presetRobotsConfig: {
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: [
            "/admin",
            "/cart",
            "/orders",
            "/checkouts/",
            "/checkout",
            "/*design_theme_id*",
            "/*preview_theme_id*",
            "/*preview_script_id*",
            "/policies/",
            "/search",
            "/apple-app-site-association",
          ],
        },
        {
          userAgent: "GPTBot",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "ClaudeBot",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "Bytespider",
          allow: [],
          disallow: ["/"],
        },
      ],
      sitemaps: ["https://yourstore.myshopify.com/sitemap.xml"],
      host: "https://yourstore.myshopify.com",
    },
    presetRobotsTxt: `# =========================================================================
# Shopify Production Directives (templates/robots.txt.liquid)
# Generated via OmniSEO Tools (/tools/robots-txt-generator-validator/shopify)
# =========================================================================

User-agent: *
Allow: /
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /*design_theme_id*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*
Disallow: /policies/
Disallow: /search
Disallow: /apple-app-site-association

# Block AI Model Training & Bulk Scrapers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Bytespider
Disallow: /

# Primary Shopify XML Sitemap Index
Sitemap: https://yourstore.myshopify.com/sitemap.xml`,
    howToSteps: [
      {
        name: "Open Shopify Theme Code Editor",
        text: "Log in to your Shopify Admin, navigate to Online Store > Themes, click the three dots (...) next to your active theme, and select 'Edit code'.",
      },
      {
        name: "Create templates/robots.txt.liquid Template",
        text: "In the left sidebar, click 'Add a new template', choose 'robots.txt' from the dropdown list, and name the file `robots.txt.liquid`.",
      },
      {
        name: "Insert Custom Directives Inside Liquid Loop",
        text: "Paste your customized directives into `robots.txt.liquid`, making sure to preserve the `for group in robots.default_groups` loop for core platform checkout protection.",
      },
      {
        name: "Validate Syntax in OmniSEO Validator",
        text: "Visit `https://yourstore.myshopify.com/robots.txt` in your browser, copy the rendered output, and paste it into our validator to confirm 100% RFC 9309 compliance.",
      },
    ],
    faqs: [
      {
        question: "What happens if I delete robots.txt.liquid in Shopify?",
        answer:
          "Deleting `templates/robots.txt.liquid` from your Shopify theme does not leave your store without a robots.txt file. Instead, Shopify automatically reverts to serving its default, platform-managed robots.txt output, which safely blocks `/checkout`, `/cart`, `/orders`, and admin endpoints.",
      },
      {
        question: "Why does Shopify disallow /checkout and /cart by default?",
        answer:
          "Shopify disallows `/checkout`, `/checkouts/`, `/cart`, and `/orders` to prevent search engine crawlers from wasting crawl budget on dynamic, non-indexable user cart sessions and private customer checkout pages that could trigger duplicate content flags.",
      },
      {
        question: "How do I unblock collection filter parameters in Shopify robots.txt?",
        answer:
          "To unblock faceted collection filter URLs, locate the default disallow filter in `robots.txt.liquid` and add an explicit `Allow: /collections/*?filter.*` or customize the Liquid loop conditions to allow search engines to crawl specific indexing-friendly filter facets.",
      },
    ],
  },

  // 2. WordPress
  {
    slug: "wordpress",
    name: "WordPress (Yoast, RankMath & WooCommerce)",
    shortName: "WordPress",
    cmsName: "WordPress & WooCommerce",
    title: "WordPress Robots.txt Generator & Validator (Yoast & RankMath) | OmniSEO Tools",
    metaDescription:
      "Create and validate WordPress robots.txt files. Prevent Yoast and RankMath virtual file conflicts, protect /wp-admin/ while keeping admin-ajax.php accessible.",
    h1: "WordPress Robots.txt Generator & Validator",
    tagline:
      "Create and validate WordPress robots.txt files. Prevent Yoast and RankMath virtual file conflicts, protect /wp-admin/ while keeping admin-ajax.php accessible.",
    targetCmsQuirk:
      "Physical robots.txt vs dynamically served virtual robots.txt, and preventing crawl blockage of /wp-admin/admin-ajax.php.",
    coreH2: "Resolving WordPress Virtual Robots.txt Conflicts & Admin-Ajax Crawl Errors",
    directAnswer:
      "WordPress automatically generates a dynamic 'virtual' robots.txt file via rewrite rules if no physical robots.txt file exists in the web root. Plugins like Yoast SEO and Rank Math intercept this virtual file to inject sitemap URLs. However, placing an empty or misconfigured physical robots.txt on your server completely overrides your SEO plugins. Furthermore, blocking /wp-admin/ without an explicit Allow: /wp-admin/admin-ajax.php directive breaks Googlebot's ability to render dynamic AJAX elements and structured data.",
    educationalContent: `
      <p>WordPress handles robots directives through a dual architecture: <strong>virtual dynamic files</strong> generated by WordPress core / SEO plugins, and <strong>physical server files</strong> located in the root web directory (<code>public_html/robots.txt</code>).</p>

      <h3>Virtual vs. Physical Robots.txt Files in WordPress</h3>
      <p>When a crawler requests <code>https://yourdomain.com/robots.txt</code>, the web server (Nginx or Apache) first checks if a physical file exists on disk:</p>
      <ul>
        <li><strong>Physical File Present:</strong> The server returns the physical file directly, completely bypassing WordPress PHP execution, Yoast SEO, and Rank Math filters.</li>
        <li><strong>No Physical File (Default):</strong> The server passes the request to <code>index.php</code>, where WordPress invokes <code>do_robots()</code> and SEO plugins dynamically output virtual directives and XML sitemap pointers.</li>
      </ul>

      <h3>The Critical admin-ajax.php Allow Directive</h3>
      <p>A classic technical SEO mistake on WordPress sites is authoring:</p>
      <pre><code># BAD PRACTICE (Breaks rendering):
User-agent: *
Disallow: /wp-admin/</code></pre>
      <p>Because Googlebot executes JavaScript and CSS to render pages visually, blocking the entire <code>/wp-admin/</code> directory prevents Googlebot from accessing <code>/wp-admin/admin-ajax.php</code>. This triggers 'Blocked Resource' errors in Google Search Console. The production-certified standard is:</p>
      <pre><code># PRODUCTION STANDARD:
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php</code></pre>

      <h3>WooCommerce Crawl Budget Optimization</h3>
      <p>For eCommerce stores running WooCommerce, add dedicated disallow rules for dynamic cart sessions and add-to-cart query strings to conserve crawl budget:</p>
      <pre><code># WooCommerce Endpoints:
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /*?add-to-cart=*</code></pre>
    `,
    presetRobotsConfig: {
      rules: [
        {
          userAgent: "*",
          allow: ["/wp-admin/admin-ajax.php"],
          disallow: [
            "/wp-admin/",
            "/wp-includes/",
            "/cart/",
            "/checkout/",
            "/my-account/",
            "/*?add-to-cart=*",
          ],
        },
        {
          userAgent: "GPTBot",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "ClaudeBot",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "CCBot",
          allow: [],
          disallow: ["/"],
        },
      ],
      sitemaps: ["https://yourdomain.com/sitemap_index.xml"],
      host: "https://yourdomain.com",
    },
    presetRobotsTxt: `# =========================================================================
# WordPress & WooCommerce Production Directives
# Generated via OmniSEO Tools (/tools/robots-txt-generator-validator/wordpress)
# =========================================================================

User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-includes/
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /*?add-to-cart=*

# Block AI Model Training & Bulk Scrapers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

# XML Sitemaps (Yoast / RankMath Standard)
Sitemap: https://yourdomain.com/sitemap_index.xml`,
    howToSteps: [
      {
        name: "Check for Physical robots.txt File in Root",
        text: "Use FTP, SSH, or cPanel File Manager to check if a physical `robots.txt` exists in your `public_html` root directory. If present, it will override all plugin settings.",
      },
      {
        name: "Edit via Yoast SEO or Rank Math Editor",
        text: "If using SEO plugins, navigate to Yoast SEO > Tools > File editor (or Rank Math > General Settings > Edit robots.txt) to configure virtual directives safely.",
      },
      {
        name: "Enforce Allow: /wp-admin/admin-ajax.php",
        text: "Verify that `Allow: /wp-admin/admin-ajax.php` is placed immediately after `Disallow: /wp-admin/` so Googlebot can execute theme JavaScript and AJAX queries.",
      },
      {
        name: "Verify Server Headers & Live Response",
        text: "Open `https://yourdomain.com/robots.txt` in your browser or run `curl -IL` to confirm it returns `HTTP 200 OK` with `Content-Type: text/plain`.",
      },
    ],
    faqs: [
      {
        question: "Why is Allow: /wp-admin/admin-ajax.php critical in WordPress?",
        answer:
          "Many modern WordPress themes and plugins use `admin-ajax.php` to fetch dynamic content, load reviews, and render page components. If Googlebot is blocked from `admin-ajax.php`, it cannot render the full page accurately, triggering 'Page resources cannot be loaded' warnings in Google Search Console.",
      },
      {
        question: "Why does Google say my robots.txt is unreachable on WP Engine or Kinsta?",
        answer:
          "Managed WordPress hosts often implement edge caching and security firewalls. If your server returns an HTTP 403 Forbidden, 500 Internal Server Error, or unexpected redirect for `/robots.txt`, search engines treat your entire domain as unreachable and halt crawling. Ensure your caching layer bypasses `/robots.txt` and returns `HTTP 200 OK` with `Content-Type: text/plain`.",
      },
      {
        question: "Does a physical robots.txt file override Yoast or RankMath virtual rules?",
        answer:
          "Yes. If a physical `robots.txt` file exists in your server's root directory (`public_html/robots.txt`), WordPress and your SEO plugins (Yoast, Rank Math, AIOSEO) completely stop generating the dynamic virtual robots.txt file. Any changes made in the plugin UI will have no effect until the physical file is updated or deleted.",
      },
    ],
  },

  // 3. Next.js
  {
    slug: "nextjs",
    name: "Next.js App Router",
    shortName: "Next.js",
    cmsName: "Next.js 15+ App Router",
    title: "Next.js Robots.txt Generator & app/robots.ts Validator | OmniSEO Tools",
    metaDescription:
      "Validate and generate type-safe robots directives for Next.js App Router. Export MetadataRoute.Robots objects with dynamic sitemap arrays and AI crawler rules.",
    h1: "Next.js Robots.txt Generator & app/robots.ts Validator",
    tagline:
      "Generate and validate type-safe robots directives for Next.js App Router. Export MetadataRoute.Robots TypeScript objects with dynamic sitemap arrays and AI crawler controls.",
    targetCmsQuirk:
      "Transitioning from legacy public/robots.txt to the dynamic app/robots.ts convention using TypeScript MetadataRoute.Robots.",
    coreH2: "Configuring Dynamic MetadataRoute.Robots in Next.js App Router",
    directAnswer:
      "Next.js App Router provides a dedicated convention for generating robots.txt via `app/robots.ts` (or `app/robots.js`). Instead of hosting a static `public/robots.txt` file, creating an `app/robots.ts` file allows you to export a default function returning `MetadataRoute.Robots`. This unlocks dynamic runtime environment checks (e.g., blocking staging deployments with Disallow: / while allowing production) and dynamically populated multi-sitemap arrays, compiled automatically to standard text/plain at build or request time.",
    educationalContent: `
      <p>Modern Next.js applications (Next.js 13.3+, Next.js 14, and Next.js 15+) replace legacy static <code>public/robots.txt</code> files with special <strong>Metadata Route Handlers</strong> (<code>app/robots.ts</code> or <code>app/robots.js</code>).</p>

      <h3>Why Use app/robots.ts Over public/robots.txt?</h3>
      <p>Static files in the <code>public/</code> folder cannot react to environment variables or dynamic deployment URLs. In contrast, <code>app/robots.ts</code> gives you full programmatic control:</p>
      <ul>
        <li><strong>Environment Branch Protection:</strong> Automatically disallow search engines on Vercel Preview or staging branches (<code>VERCEL_ENV !== 'production'</code>) while keeping production crawlable.</li>
        <li><strong>Dynamic Sitemaps:</strong> Automatically concatenate multi-language or multi-section sitemap URLs based on runtime configuration.</li>
        <li><strong>Strict Type Safety:</strong> TypeScript validates that your rules, user agents, allow paths, and crawl delays match Next.js <code>MetadataRoute.Robots</code> specifications.</li>
      </ul>

      <h3>Production Next.js app/robots.ts Code Structure</h3>
      <p>Below is the recommended production implementation for Next.js App Router:</p>
      <pre><code>// app/robots.ts (Next.js App Router)
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  // Disallow all crawlers on Staging / Preview deployments
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production: Allow standard search engines + block AI model scrapers
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot', 'Bytespider'],
        disallow: '/',
      },
    ],
    sitemap: \`\${baseUrl}/sitemap.xml\`,
    host: baseUrl,
  };
}</code></pre>
    `,
    presetRobotsConfig: {
      rules: [
        {
          userAgent: "*",
          allow: ["/"],
          disallow: ["/api/", "/admin/", "/private/", "/_next/"],
        },
        {
          userAgent: "GPTBot",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "ClaudeBot",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "Google-Extended",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "CCBot",
          allow: [],
          disallow: ["/"],
        },
        {
          userAgent: "Bytespider",
          allow: [],
          disallow: ["/"],
        },
      ],
      sitemaps: ["https://yourdomain.com/sitemap.xml"],
      host: "https://yourdomain.com",
    },
    presetRobotsTxt: `# =========================================================================
# Next.js App Router (app/robots.ts output)
# Generated via OmniSEO Tools (/tools/robots-txt-generator-validator/nextjs)
# =========================================================================

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /_next/

# Disallow AI Training Scrapers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

# XML Sitemap
Sitemap: https://yourdomain.com/sitemap.xml`,
    dynamicTsSnippet: `// app/robots.ts (Next.js App Router)
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot', 'Bytespider'],
        disallow: '/',
      },
    ],
    sitemap: \`\${baseUrl}/sitemap.xml\`,
    host: baseUrl,
  };
}`,
    howToSteps: [
      {
        name: "Create app/robots.ts in App Router",
        text: "Add a new file at `src/app/robots.ts` or `app/robots.ts` in your Next.js project.",
      },
      {
        name: "Import MetadataRoute Type Definition",
        text: "Import `import type { MetadataRoute } from 'next';` for strict TypeScript autocomplete and schema validation.",
      },
      {
        name: "Implement Dynamic Environment Logic",
        text: "Return `disallow: '/'` if on preview or staging branches, and your full production crawler permissions when `NODE_ENV === 'production'`.",
      },
      {
        name: "Remove Legacy public/robots.txt",
        text: "Delete any existing `public/robots.txt` file to avoid build warnings and ensure Next.js serves the dynamic route handler.",
      },
    ],
    faqs: [
      {
        question: "Does app/robots.ts override public/robots.txt in Next.js?",
        answer:
          "In Next.js App Router, if both `app/robots.ts` and `public/robots.txt` exist in your project, Next.js triggers a build warning and `public/robots.txt` takes static file serving precedence over the dynamic TypeScript route. You should always delete `public/robots.txt` when using `app/robots.ts`.",
      },
      {
        question: "How do I handle environment-specific robots rules in Next.js (staging vs production)?",
        answer:
          "Inside `app/robots.ts`, inspect environment variables such as `process.env.VERCEL_ENV` or `process.env.NODE_ENV`. If the environment is 'preview' or 'staging', return `{ rules: { userAgent: '*', disallow: '/' } }` to prevent pre-production environments from being indexed in search engines.",
      },
      {
        question: "How do I add dynamic multi-sitemap arrays in Next.js robots.ts?",
        answer:
          "The `sitemap` property in Next.js `MetadataRoute.Robots` supports either a single string or an array of strings: `sitemap: ['https://example.com/sitemap.xml', 'https://example.com/sitemap-blog.xml']`. Next.js automatically outputs individual `Sitemap:` lines for each entry in the compiled `/robots.txt`.",
      },
    ],
  },
];

export function getRobotsPlatformBySlug(slug: string): RobotsPlatformConfig | undefined {
  return ROBOTS_PLATFORMS.find((p) => p.slug === slug);
}

export function getAllRobotsPlatforms(): RobotsPlatformConfig[] {
  return ROBOTS_PLATFORMS;
}
