export interface SerpPlatformFaq {
  question: string;
  answer: string;
}

export interface SerpPlatformHowToStep {
  name: string;
  text: string;
}

export interface SerpPlatformConfig {
  slug: "shopify" | "wordpress" | "squarespace";
  name: string;
  shortName: string;
  cmsName: string;
  title: string;
  h1: string;
  tagline: string;
  metaDescription: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultUrl: string;
  defaultSiteName: string;
  defaultQuery: string;
  separatorHint: string;
  directAnswer: string;
  educationalH2: string;
  educationalContent: string;
  howToSteps: SerpPlatformHowToStep[];
  faqs: SerpPlatformFaq[];
}

export const SERP_PLATFORMS: SerpPlatformConfig[] = [
  // 1. Shopify
  {
    slug: "shopify",
    name: "Shopify",
    shortName: "Shopify",
    cmsName: "Shopify Liquid",
    title: "Shopify SERP Simulator & Title Tag Pixel Checker | OmniSEO Tools",
    h1: "Shopify SERP Simulator & Title Tag Pixel Checker",
    tagline: "Simulate Shopify Google search snippets. Test automatic Liquid title brand appending, 600px desktop truncation, and collection page meta descriptions.",
    metaDescription: "Simulate Shopify Google search snippets. Test automatic liquid title brand appending, 600px desktop truncation, and collection page meta descriptions.",
    defaultTitle: "Organic Cotton Oversized Hoodie – EcoThreads Apparel",
    defaultDescription: "Shop the 2026 Collection of eco-friendly organic cotton hoodies. Free carbon-neutral shipping on all US orders over $75. Browse colors & sizes now.",
    defaultUrl: "https://ecothreads.myshopify.com/collections/hoodies",
    defaultSiteName: "EcoThreads Apparel",
    defaultQuery: "organic cotton hoodie",
    separatorHint: "Default Liquid formula: {{ page_title }} – {{ shop.name }}",
    directAnswer:
      "By default, Shopify themes insert {{ page_title }} – {{ shop.name }} into your store's <title> tag within theme.liquid. When store owners author a 50-character product title and Shopify automatically appends ' – Brand Store Name', the final title frequently exceeds 620px, causing Google to truncate the end with an ellipsis (...) or rewrite the title using the product's H1 tag.",
    educationalH2: "Why Shopify Truncates Meta Titles (The Liquid page_title Quirk)",
    educationalContent:
      "<p>Shopify's templating architecture utilizes Liquid code in <code>layout/theme.liquid</code> to generate SEO title tags dynamically across products, collections, blog posts, and static pages. In most standard Shopify themes (such as Dawn, Sense, and Prestige), the default title tag logic is structured as:</p><pre><code>&lt;title&gt;\n  {{ page_title }}\n  {%- if current_tags %} &amp;ndash; tagged &quot;{{ current_tags | join: ', ' }}&quot;{% endif -%}\n  {%- if current_page != 1 %} &amp;ndash; Page {{ current_page }}{% endif -%}\n  {%- unless page_title contains shop.name %} &amp;ndash; {{ shop.name }}{% endunless -%}\n&lt;/title&gt;</code></pre><p>Because Shopify automatically appends your store name whenever <code>page_title</code> does not already contain it, product titles that appear safe in Shopify Admin (e.g. 45 characters) get inflated to 65+ characters upon rendering. With wide font glyphs like 'W' and 'M', this easily pushes the physical pixel width past Google's 600px container boundary.</p>",
    howToSteps: [
      {
        name: "Audit Title Pixel Length in OmniSEO Simulator",
        text: "Input your intended Shopify product or collection title. The simulator automatically incorporates your store name suffix to test whether the final rendered title stays safely below 600px.",
      },
      {
        name: "Adjust SEO Title in Shopify Admin",
        text: "Navigate to Shopify Admin > Products (or Online Store > Pages), scroll to Search engine listing, click Edit, and refine the Page title to account for the store name suffix.",
      },
      {
        name: "Optionally Edit theme.liquid Title Formula",
        text: "For full control over brand delimiters, open Online Store > Themes > Edit code > layout/theme.liquid and customize the Liquid title logic to prevent double branding.",
      },
      {
        name: "Verify Collection & Product Schema",
        text: "Ensure Product and AggregateRating JSON-LD schema are active so Google can render star ratings and pricing beneath your Shopify search snippet.",
      },
    ],
    faqs: [
      {
        question: "How do I stop Shopify from appending the store name to my meta titles?",
        answer:
          "To stop Shopify from automatically appending your store name, open your Shopify Admin, go to Online Store > Themes > Actions > Edit code, and locate layout/theme.liquid. Find the <title> tag block and remove or adjust the `{%- unless page_title contains shop.name %} – {{ shop.name }}{% endunless -%}` condition so you can manually control brand appending in the SEO title input.",
      },
      {
        question: "Why does Shopify truncate collection and product page titles in Google?",
        answer:
          "Shopify truncates collection and product titles when the combined character length of the custom SEO title plus the auto-appended store name exceeds Google's 600-pixel desktop container width (approximately 55 to 60 characters). Front-loading your target keyword and keeping the total length under 55 characters prevents ellipsis cutoffs.",
      },
      {
        question: "How do I add star rating rich snippets to my Shopify store in Google SERPs?",
        answer:
          "To display star rating badges (e.g. ★★★★★ 4.9) on Google for Shopify products, install a Schema.org-compliant review app (such as Judge.me, Okendo, or Loox) or inject Product Schema with an AggregateRating object containing valid ratingValue and reviewCount into your product template.",
      },
    ],
  },

  // 2. WordPress
  {
    slug: "wordpress",
    name: "WordPress & Yoast / RankMath",
    shortName: "WordPress",
    cmsName: "WordPress (Yoast / RankMath)",
    title: "WordPress SERP Simulator - Yoast & RankMath Snippet Preview | OmniSEO Tools",
    h1: "WordPress SERP Simulator - Yoast & RankMath Snippet Preview",
    tagline: "Test WordPress SEO title tags and meta descriptions. Simulate Yoast and RankMath separator tokens, pixel boundaries, and WooCommerce product snippets.",
    metaDescription: "Test WordPress SEO title tags and meta descriptions. Simulate Yoast and RankMath separator tokens, pixel boundaries, and WooCommerce product snippets.",
    defaultTitle: "15 Best SEO Plugins for WordPress (2026 Tested) | WPDevHQ",
    defaultDescription: "Compare the top WordPress SEO plugins including Yoast, Rank Math, and All in One SEO. Audit performance, schema features, and indexing speed.",
    defaultUrl: "https://wpdevhq.com/best-wordpress-seo-plugins",
    defaultSiteName: "WPDevHQ",
    defaultQuery: "best wordpress seo plugins",
    separatorHint: "Variable template: %%title%% %%sep%% %%sitename%%",
    directAnswer:
      "WordPress SEO plugins like Yoast SEO, Rank Math, and All in One SEO construct title tags using variable tokens such as %%title%% %%sep%% %%sitename%%. Using wide separator characters (like em-dashes '—' which consume ~18px) alongside long site titles frequently wastes 150px+ of Google's 600px desktop title real estate, cutting off valuable post titles.",
    educationalH2: "Optimizing WordPress Meta Title Separators for 600px Boundaries",
    educationalContent:
      "<p>In the WordPress ecosystem, metadata is rarely authored as flat static strings. Instead, plugins rely on template replacement tags. For example, Yoast SEO defaults to <code>%%title%% %%sep%% %%sitename%%</code>, while Rank Math uses <code>%title% %sep% %sitename%</code>.</p><p>The choice of separator character (<code>%%sep%%</code>) directly impacts pixel consumption in Google search snippets:</p><ul><li><strong>Pipe (<code>|</code>):</strong> Consumes only <strong>6 pixels</strong> of width. Highly space-efficient and clean.</li><li><strong>Hyphen (<code>-</code>):</strong> Consumes <strong>7 pixels</strong> of width. Safe and standard.</li><li><strong>En-Dash (<code>&ndash;</code>):</strong> Consumes <strong>11 pixels</strong> of width.</li><li><strong>Em-Dash (<code>&mdash;</code>):</strong> Consumes <strong>18 pixels</strong> of width—triple the physical footprint of a pipe delimiter!</li></ul><p>By switching your global WordPress separator token to a pipe (<code>|</code>) or standard dash (<code>-</code>), you instantly reclaim up to 12 pixels of title space for high-intent search keywords.</p>",
    howToSteps: [
      {
        name: "Test Title with Separator Variables",
        text: "Type your post headline into the OmniSEO simulator and test different separator tokens (| vs - vs —) against Google's 600px canvas ruler.",
      },
      {
        name: "Configure Global Separator in Yoast or RankMath",
        text: "In WordPress Admin, navigate to Yoast SEO > Settings > Content types (or Rank Math > Titles & Meta > Global) and set the global separator to a narrow character like |.",
      },
      {
        name: "Customize Per-Post Snippet Variables",
        text: "In the WordPress Block or Classic Editor, scroll to the SEO plugin meta box and inspect the live pixel gauge before publishing.",
      },
      {
        name: "Audit WooCommerce Product Schema",
        text: "Verify that WooCommerce product variations, prices, and star review schema are correctly mapped to JSON-LD output.",
      },
    ],
    faqs: [
      {
        question: "What is the best title separator for WordPress SEO (Pipe | vs Dash - vs Em-Dash —)?",
        answer:
          "The pipe symbol (`|`) is the most space-efficient title separator for SEO, consuming only 6 pixels of container width in Google's Arial font. In contrast, an em-dash (`—`) consumes 18 pixels. Using a pipe or standard hyphen (`-`) saves valuable pixel real estate for primary keywords and brand recognition.",
      },
      {
        question: "How do I override Yoast SEO's automatic site title template on specific posts?",
        answer:
          "To override the global site title template on an individual WordPress post, scroll to the Yoast SEO meta box at the bottom of the editor, click on the 'SEO title' field, delete the `%%sitename%%` and `%%sep%%` snippet variables, and type your exact custom title string.",
      },
      {
        question: "Why does Google show my WordPress category name in the search snippet breadcrumb?",
        answer:
          "Google displays category breadcrumbs (e.g. `yoursite.com › blog › wordpress`) because modern WordPress SEO plugins output Schema.org BreadcrumbList JSON-LD structured data. This replaces raw URL strings with clean navigational hierarchy chains in SERP listings.",
      },
    ],
  },

  // 3. Squarespace
  {
    slug: "squarespace",
    name: "Squarespace",
    shortName: "Squarespace",
    cmsName: "Squarespace 7.1",
    title: "Squarespace SERP Simulator & Search Result Preview | OmniSEO Tools",
    h1: "Squarespace SERP Simulator & Search Result Preview",
    tagline: "Simulate Squarespace meta titles and descriptions in Google SERP. Fix automatic '%s — Site Title' format truncation client-side.",
    metaDescription: "Simulate Squarespace meta titles and descriptions in Google SERP. Fix automatic '%s — Site Title' format truncation client-side.",
    defaultTitle: "Handcrafted Ceramic Pottery & Tableware — Earth & Clay Studio",
    defaultDescription: "Discover artisanal ceramic mugs, dinnerware, and stoneware vases handmade in Portland. Sustainable materials, unique glazes, and nationwide shipping.",
    defaultUrl: "https://earthandclay.squarespace.com/shop/ceramics",
    defaultSiteName: "Earth & Clay Studio",
    defaultQuery: "handcrafted ceramic pottery",
    separatorHint: "Default Format: %s — Site Title (Marketing > SEO)",
    directAnswer:
      "Squarespace includes a global 'SEO Title Format' setting under Marketing > SEO that defaults to '%s — Site Title'. When Squarespace users enter their business name inside the individual page SEO Title field (e.g., 'Handmade Pots | Earth & Clay'), Squarespace appends the site title again, producing 'Handmade Pots | Earth & Clay — Earth & Clay Studio' and causing severe 700px+ truncation in Google search results.",
    educationalH2: "How to Stop Squarespace From Doubling Your Site Title in Google",
    educationalContent:
      "<p>A notorious pitfall for Squarespace site owners is the <strong>double title branding effect</strong>. Squarespace 7.1 manages title output through three distinct layers:</p><ol><li><strong>Site Title:</strong> Configured in Site Header &amp; Branding settings.</li><li><strong>SEO Title Format:</strong> Found in Marketing &gt; SEO, which contains template placeholders like <code>%s &amp;mdash; %s</code> or <code>%s &amp;mdash; Site Title</code>.</li><li><strong>Page-Level SEO Title:</strong> Found in individual Page Settings &gt; SEO.</li></ol><p>When the SEO Title Format is set to <code>%s &amp;mdash; Site Title</code>, Squarespace automatically grabs whatever you typed in the page-level SEO box (represented by <code>%s</code>) and tacks on the site title separated by an em-dash. If you manually included your brand in the page SEO box, your title gets rendered twice.</p><p><strong>The Fix:</strong> Change your Squarespace Pages SEO Title Format in Marketing &gt; SEO to simply <code>%s</code>. This gives you 100% control over exact title length and pixel width in the OmniSEO simulator without surprise brand duplications.</p>",
    howToSteps: [
      {
        name: "Test Squarespace Title Formats in Simulator",
        text: "Enter your planned page title in the simulator to verify if adding your site title exceeds the 600px desktop or 580px mobile truncation threshold.",
      },
      {
        name: "Clean Global SEO Title Format in Squarespace",
        text: "Log in to Squarespace, go to Marketing > SEO, and change the 'Pages' SEO Title Format from `%s — %s` to simply `%s`.",
      },
      {
        name: "Input Custom Page SEO Titles & Descriptions",
        text: "Open Pages, hover over any page, click the Gear icon (Settings), select SEO, and paste your pixel-validated Title and Description.",
      },
      {
        name: "Verify Clean URL Slugs",
        text: "Under Page Settings > General, ensure your URL slug is short, lowercase, and keyword-rich to keep breadcrumb displays tidy in Google SERPs.",
      },
    ],
    faqs: [
      {
        question: "How do I fix duplicated site titles in Squarespace search results?",
        answer:
          "To fix duplicated site titles, go to your Squarespace dashboard > Marketing > SEO. In the 'SEO Title Format' section, edit the 'Pages' field and change it from `%s — %s` or `%s — Site Title` to just `%s`. This prevents Squarespace from automatically appending a second site title to your pages.",
      },
      {
        question: "Does Squarespace automatically generate meta descriptions for blog posts?",
        answer:
          "Yes. If you leave the Page SEO Description empty, Squarespace may fall back to the post excerpt or the first few sentences of visible body copy. However, manually authoring a targeted 140–155 character description in the post's SEO settings yields far higher Click-Through Rates (CTR).",
      },
      {
        question: "How do I customize Squarespace URL slugs to prevent SERP truncation?",
        answer:
          "To shorten and customize a Squarespace URL slug, click the Gear icon next to any page in the Pages panel, navigate to the General tab, and edit the 'URL Slug' field. Use hyphen-separated lowercase words (e.g. `/ceramic-mugs`) instead of lengthy dates or generic IDs.",
      },
    ],
  },
];

export function getSerpPlatformBySlug(slug: string): SerpPlatformConfig | undefined {
  return SERP_PLATFORMS.find((p) => p.slug === slug);
}

export function getAllSerpPlatforms(): SerpPlatformConfig[] {
  return SERP_PLATFORMS;
}
