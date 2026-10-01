import { ToolDefinition } from "@/types/tool";

export const breadcrumbPathVisualizerTool: ToolDefinition = {
  id: "breadcrumb-path-visualizer",
  slug: "breadcrumb-path-visualizer",
  name: "Breadcrumb Path Visualizer & Schema Builder",
  title: "Breadcrumb Path Visualizer & Schema Builder | OmniSEO Tools",
  metaTitle: "Breadcrumb Path Visualizer & Schema Builder | OmniSEO Tools",
  metaDescription:
    "Visualize hierarchical URL site taxonomy, auto-extract deep breadcrumb trees, and generate valid BreadcrumbList JSON-LD structured data with zero telemetry.",
  h1: "Breadcrumb Path Visualizer & Schema Builder",
  tagline:
    "Dissect deep URL structures into clean navigation hierarchies, preview Google SERP snippet trails, and export standard JSON-LD and HTML5 microdata.",
  shortDescription:
    "Auto-parse URL paths into structured breadcrumb hierarchies, test Google SERP breadcrumb previews, and generate valid Schema.org BreadcrumbList markup.",
  category: "technical",
  icon: "Route",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "breadcrumb visualizer",
    "breadcrumblist schema generator",
    "breadcrumb json ld generator",
    "google serp breadcrumb preview",
    "schema org breadcrumbs",
    "breadcrumb microdata generator",
    "url path parser breadcrumb",
    "seo breadcrumb navigation",
    "hierarchical url builder",
  ],
  howToSteps: [
    {
      name: "Paste URL or Define Path Hierarchy",
      text: "Enter any target web page URL (e.g. https://example.com/shop/electronics/headphones/noise-cancelling) to auto-dissect its path segments, or build steps manually.",
    },
    {
      name: "Refine Step Labels & Target URLs",
      text: "Customize anchor text labels, reorder breadcrumb steps, or add root homepage and category links.",
    },
    {
      name: "Preview Live SERP & UI Renderings",
      text: "Switch between Google SERP mobile/desktop rich snippet previews and on-page UI navigation trails with custom separators.",
    },
    {
      name: "Validate Schema Compliance",
      text: "Review automated position indexing (1-based), schema.org validation checks, and absolute URL protocols.",
    },
    {
      name: "Export Code (JSON-LD, HTML Microdata, React)",
      text: "Copy the standard BreadcrumbList JSON-LD script, semantic HTML5 Microdata <nav>, or Next.js React component.",
    },
  ],
  guideContent: {
    title: "The Ultimate Guide to Breadcrumb SEO, Schema.org BreadcrumbList & Deep Linking",
    sections: [
      {
        heading: "What are Breadcrumbs and Why Do They Matter for Technical SEO?",
        content:
          "<p><strong>Breadcrumb navigation</strong> is a secondary navigational scheme that reveals the user's current location within the site's structural taxonomy. Instead of viewing isolated landing pages, both human visitors and search engine bots understand how a specific page fits into the broader site hierarchy (e.g. <code>Home &gt; Shoes &gt; Men's &gt; Running &gt; Trail Runners</code>).</p><p>For search engines like Google, breadcrumbs provide two massive SEO advantages:</p><ol><li><strong>SERP Snippet Enhancement:</strong> When marked up with Schema.org <code>BreadcrumbList</code>, Google replaces raw ugly URLs in search results with clean, clickable category hierarchies. This significantly improves search snippet readability and increases click-through rates (CTR).</li><li><strong>Internal PageRank Distribution:</strong> Breadcrumbs establish contextual internal links that distribute PageRank and thematic relevance upstream from deep product pages back to mid-level category hubs.</li></ol>",
        keyTakeaways: [
          "Breadcrumbs clarify site architecture for both Googlebot and human visitors.",
          "BreadcrumbList structured data replaces raw URLs with clean navigation trails in Google SERP results.",
          "Strengthens internal link equity distribution across multi-tiered product and content catalogs.",
        ],
      },
      {
        heading: "Schema.org BreadcrumbList: JSON-LD vs. Microdata",
        content:
          "<p>Google explicitly recommends using <strong>JSON-LD</strong> for structured data implementation, though semantic HTML5 <strong>Microdata</strong> is also supported:</p><ul><li><strong>JSON-LD (Recommended):</strong> Encapsulated inside a single <code>&lt;script type=\"application/ld+json\"&gt;</code> block. It is decoupled from page layout and styling, making it immune to CSS rendering breakage.</li><li><strong>HTML5 Microdata:</strong> Embedded directly in HTML tags using <code>itemscope</code>, <code>itemtype=\"https://schema.org/BreadcrumbList\"</code>, and <code>itemprop=\"itemListElement\"</code> attributes.</li></ul><p>Under the Schema.org specification, each <code>ListItem</code> element must have an accurate <code>position</code> (1-indexed starting at 1 for the root homepage), a <code>name</code> (the human-readable anchor text), and an <code>item</code> (the absolute canonical URL of that tier).</p>",
        keyTakeaways: [
          "Always start position indexing at 1 (1-based index) rather than 0.",
          "The final item in the breadcrumb list usually represents the current page.",
          "Always use absolute URLs (https://...) rather than relative paths in Schema.org markup.",
        ],
      },
      {
        heading: "Common Breadcrumb SEO Mistakes to Avoid",
        content:
          "<p>Ensure your breadcrumb architecture avoids these frequent technical pitfalls:</p><ul><li><strong>Skipping Hierarchy Levels:</strong> Jumping from Home directly to a deep child page without intermediate category levels creates disjointed signals.</li><li><strong>Unlinked Leaf Nodes:</strong> Google accepts omitting the <code>item</code> property on the current page leaf node or including it with the self-canonical URL. However, intermediate nodes must always be clickable and link to valid 200 OK indexable pages.</li><li><strong>Mismatch Between Visual Breadcrumbs and JSON-LD:</strong> Google's Structured Data Guidelines require that structured data accurately represents what is visible on the webpage. Never inject phantom schema breadcrumbs that do not exist visually for users.</li></ul>",
        keyTakeaways: [
          "Ensure visual on-page breadcrumbs match the JSON-LD BreadcrumbList structured data identically.",
          "Never link to 404s, redirects, or canonicalized non-indexable intermediate pages.",
          "Use clear, concise anchor text rather than keyword-stuffed strings.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "How does BreadcrumbList Schema improve Google SERP appearance?",
      answer:
        "When Google parses valid BreadcrumbList structured data, it renders a clean navigation path in mobile and desktop search snippets (e.g. example.com > Blog > Technical SEO > Breadcrumbs) instead of displaying the raw URL string. This enhances snippet clarity, reinforces site authority, and increases organic CTR.",
    },
    {
      question: "Should the final (current) breadcrumb item be a clickable link?",
      answer:
        "In visual UI design, the final breadcrumb represents the current page and is typically rendered as non-clickable plain text (often bolded) to indicate the active state. In Schema.org JSON-LD, you can either include the current page URL in the 'item' field or omit the 'item' property for the final position.",
    },
    {
      question: "Can I generate breadcrumbs from arbitrary URLs?",
      answer:
        "Yes! Our tool automatically parses any URL path into human-readable segments (converting slugs like 'noise-cancelling-headphones' into 'Noise Cancelling Headphones'), while allowing full manual customization, reordering, and step editing.",
    },
    {
      question: "Is this Breadcrumb Visualizer running client-side?",
      answer:
        "Yes. All URL parsing, path hierarchy manipulation, live SERP simulations, and code exports execute 100% in your local browser with zero external telemetry.",
    },
  ],
};
