import { ToolDefinition } from "@/types/tool";

export const sitemapIndexSplitterTool: ToolDefinition = {
  id: "sitemap-index-splitter",
  slug: "sitemap-index-splitter",
  name: "XML Sitemap Index Splitter & Chunking Tool",
  title: "XML Sitemap Index Splitter & Large File Chunker | OmniSEO Tools",
  metaTitle: "XML Sitemap Index Splitter & Large File Chunker | OmniSEO Tools",
  metaDescription:
    "Split oversized XML sitemaps and bulk URL lists into standard-compliant sub-sitemaps (up to 50,000 URLs / 50MB limits). Generates parent sitemapindex.xml files automatically with zero telemetry.",
  h1: "XML Sitemap Index Splitter & Large File Chunker",
  tagline:
    "Split large XML sitemaps and bulk URL datasets into search engine-compliant sub-sitemaps and generate parent sitemapindex.xml files with instant ZIP downloads.",
  shortDescription:
    "Split oversized XML sitemaps or bulk URL lists into Google-compliant sub-sitemaps (up to 50k URLs) with automated sitemapindex.xml generation.",
  category: "technical",
  icon: "FileCode",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "sitemap index splitter",
    "xml sitemap chunker",
    "split large sitemap",
    "sitemapindex generator",
    "sitemap 50000 url limit",
    "split xml sitemap into parts",
    "google sitemap index builder",
    "bulk url to sitemap chunk",
    "sitemap splitter tool",
  ],
  howToSteps: [
    {
      name: "Input URL Dataset or Oversized XML",
      text: "Paste a raw list of URLs (one per line) or paste an existing monolithic <urlset> XML file into the processor.",
    },
    {
      name: "Configure Chunk Thresholds & Naming",
      text: "Set maximum URLs per sub-sitemap (e.g. 5,000, 10,000, or 50,000 Google limit), base sitemap filename pattern (e.g., sitemap-{index}.xml), and target canonical host.",
    },
    {
      name: "Toggle Metadata Annotations",
      text: "Optionally inject current or custom ISO 8601 <lastmod> timestamps, and enable <changefreq> and <priority> inclusion.",
    },
    {
      name: "Review Sub-Sitemap Chunks & Parent Index",
      text: "Inspect the generated parent sitemap.xml (<sitemapindex>) and preview individual chunked XML files in real time.",
    },
    {
      name: "Download All as ZIP or Copy Code",
      text: "Download all generated XML sub-sitemaps and the parent index bundled into a clean ZIP archive for immediate deployment to your server root.",
    },
  ],
  guideContent: {
    title: "The Architectural Guide to XML Sitemap Indexing, File Chunking & Crawl Budget Scaling",
    sections: [
      {
        heading: "Understanding Google & W3C XML Sitemap Physical Limits",
        content:
          "<p>Search engine sitemap protocols (jointly supported by Google, Bing, Yandex, and Baidu) enforce two strict architectural limits on a single <code>&lt;urlset&gt;</code> sitemap document:</p><ol><li><strong>Maximum 50,000 URLs:</strong> A single sitemap file cannot contain more than 50,000 individual <code>&lt;url&gt;</code> entries.</li><li><strong>Maximum 50MB Uncompressed File Size:</strong> The uncompressed XML payload cannot exceed 50 megabytes.</li></ol><p>When large e-commerce catalogs, news portals, or programmatic SEO sites exceed either limit, search engine web crawlers (such as <code>Googlebot</code>) truncate the file during parsing and fail to discover subsequent URLs. To maintain 100% crawl coverage, large sites must divide their URLs into smaller sub-sitemaps linked under a central <strong>Sitemap Index document (<code>&lt;sitemapindex&gt;</code>)</strong>.</p>",
        keyTakeaways: [
          "Single sitemaps are strictly capped at 50,000 URLs and 50MB uncompressed file size.",
          "Oversized sitemaps cause Googlebot to truncate URLs, leading to severe indexation drops.",
          "Sitemap index files (<sitemapindex>) can link up to 50,000 sub-sitemaps, scaling up to 2.5 billion URLs.",
        ],
      },
      {
        heading: "How the Parent <sitemapindex> Architecture Operates",
        content:
          "<p>A <strong>Sitemap Index</strong> functions as a master directory. Instead of listing individual page URLs with <code>&lt;url&gt;</code> elements, it contains <code>&lt;sitemap&gt;</code> nodes that point to each chunked sub-sitemap:</p><pre><code>&lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt;\n&lt;sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"&gt;\n  &lt;sitemap&gt;\n    &lt;loc&gt;https://example.com/sitemap-1.xml&lt;/loc&gt;\n    &lt;lastmod&gt;2026-10-01&lt;/lastmod&gt;\n  &lt;/sitemap&gt;\n  &lt;sitemap&gt;\n    &lt;loc&gt;https://example.com/sitemap-2.xml&lt;/loc&gt;\n    &lt;lastmod&gt;2026-10-01&lt;/lastmod&gt;\n  &lt;/sitemap&gt;\n&lt;/sitemapindex&gt;</code></pre><p>When you submit <code>https://example.com/sitemap.xml</code> to Google Search Console or reference it in your <code>robots.txt</code> file (<code>Sitemap: https://example.com/sitemap.xml</code>), search bots automatically crawl the index and schedule all referenced sub-sitemaps into their crawling queues.</p>",
        keyTakeaways: [
          "Submit only the master sitemap.xml (<sitemapindex>) to Google Search Console.",
          "Keep sub-sitemap sizes between 5,000 and 25,000 URLs for optimal bot parsing speed and lower server memory usage.",
          "Update the parent index's <lastmod> timestamp whenever sub-sitemaps receive new URLs.",
        ],
      },
      {
        heading: "Best Practices: Chunking Strategies by Content Type & Modularity",
        content:
          "<p>When partitioning URL architectures for enterprise websites, organizing sitemaps logically by content taxonomy dramatically improves Search Console indexation reporting:</p><ul><li><strong>Categorical Separation:</strong> Separate product pages (<code>sitemap-products-1.xml</code>), categories (<code>sitemap-categories.xml</code>), blog posts (<code>sitemap-posts.xml</code>), and static marketing pages (<code>sitemap-pages.xml</code>).</li><li><strong>Temporal / Date Chunking:</strong> For news and publishing sites, chunking sitemaps by publication year or month (<code>sitemap-2026-10.xml</code>) allows search engines to prioritize fresh content.</li><li><strong>Targeting Fast Crawl Schedules:</strong> Keeping chunks under 10,000 URLs reduces server gzip compression overhead and enables Googlebot to process individual files in &lt;100ms.</li></ul>",
        keyTakeaways: [
          "Logical categorization makes it easy to diagnose indexation drops for specific sections in GSC.",
          "Always ensure URLs in sub-sitemaps use absolute HTTPS paths and match the canonical domain.",
          "Gzip-compressing sub-sitemaps (.xml.gz) reduces server bandwidth consumption by up to 80%.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the maximum URL limit for a single XML sitemap?",
      answer:
        "According to the official sitemaps.org protocol adopted by Google, Bing, and major search engines, a single XML sitemap can contain a maximum of 50,000 URLs and cannot exceed 50MB uncompressed file size. If your site has more than 50,000 URLs or exceeds 50MB, you must use a sitemap index file (<sitemapindex>) to split URLs across multiple sub-sitemaps.",
    },
    {
      question: "How many sub-sitemaps can a parent sitemap index contain?",
      answer:
        "A parent sitemap index (<sitemapindex>) can list up to 50,000 individual <sitemap> entries. Because each sub-sitemap can also contain up to 50,000 URLs, a single sitemap index architecture can theoretically index up to 2.5 billion URLs.",
    },
    {
      question: "Should I submit each sub-sitemap individually to Google Search Console?",
      answer:
        "No. You only need to submit the single master sitemap index URL (e.g., https://example.com/sitemap.xml) to Google Search Console and reference it in your robots.txt file. Googlebot automatically reads the <sitemapindex> and discovers all child sub-sitemaps declared inside it.",
    },
    {
      question: "Does this sitemap splitter upload or store my URLs on a server?",
      answer:
        "No. The XML Sitemap Index Splitter runs 100% client-side in your local browser JavaScript engine. Your URLs, XML files, and generated ZIP archives are processed entirely in memory and are never transmitted across the network or stored in external databases.",
    },
  ],
};
