import { ToolDefinition } from "@/types/tool";

export const articleSchemaGeneratorTool: ToolDefinition = {
  id: "article-schema-generator",
  slug: "article-schema-generator",
  name: "Article & BlogPosting Schema Generator",
  title: "Free Article & BlogPosting Schema Generator | OmniSEO Tools",
  metaTitle: "Free Article & BlogPosting Schema Generator | OmniSEO Tools",
  metaDescription:
    "Generate Google-compliant Article, BlogPosting, and NewsArticle JSON-LD structured data with rich snippets, author E-E-A-T markup, and publisher validation.",
  h1: "Article & BlogPosting Schema Generator",
  tagline:
    "Generate Google-compliant Article, BlogPosting, and NewsArticle JSON-LD structured data with author, publisher, and image aspect ratio support.",
  shortDescription:
    "Generate Google-compliant Article, BlogPosting, and NewsArticle JSON-LD structured data with author E-E-A-T and publisher markup.",
  category: "technical",
  icon: "FileText",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "article schema generator",
    "blogposting schema generator",
    "newsarticle json-ld",
    "schema.org article",
    "google rich results article",
    "e-e-a-t author schema",
    "json-ld structured data generator",
    "next.js article schema",
    "structured data article markup",
  ],
  howToSteps: [
    {
      name: "Select Schema Subtype",
      text: "Choose between BlogPosting (for blog articles and opinion pieces), NewsArticle (for time-sensitive journalism and reports), or Article (for general web publications).",
    },
    {
      name: "Enter Article Core Details",
      text: "Input your headline (optimal 40–110 characters), canonical URL, concise summary description, and main article section category.",
    },
    {
      name: "Attach High-Resolution Images",
      text: "Provide a primary image URL, or declare multi-aspect ratio images (16:9, 4:3, 1:1) as recommended by Google Search Central.",
    },
    {
      name: "Define Author & Publisher E-E-A-T Entities",
      text: "Specify Person or Organization author typing with profile URLs and job titles, alongside complete publisher brand names and logo URLs.",
    },
    {
      name: "Copy or Validate Structured Data",
      text: "Copy the formatted JSON-LD <script> tag or Next.js TypeScript snippet directly into your codebase, or click 'Validate with Google' to test in the Rich Results Test tool.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Guide to Article, BlogPosting & NewsArticle Schema Markup",
    sections: [
      {
        heading: "Choosing the Right Subtype: Article vs. BlogPosting vs. NewsArticle",
        content:
          "<p>Schema.org provides multiple specialized subtypes under the base <code>Article</code> class. Selecting the most accurate subtype helps search engine crawlers (like Googlebot and Bingbot) understand content context and eligibility for rich SERP features:</p><ul><li><strong>BlogPosting (Recommended for Blogs):</strong> Represents a specific post published within an ongoing weblog or company blog. Ideal for technical tutorials, engineering deep dives, opinion pieces, and how-to guides. Google treats <code>BlogPosting</code> with equal rich snippet eligibility as <code>Article</code> while communicating clear blog taxonomy.</li><li><strong>NewsArticle (For Journalistic & Time-Sensitive Coverage):</strong> Reserved for formal news stories, investigative reports, and current events published by news organizations. Content using <code>NewsArticle</code> structured data is evaluated for inclusion in Google News, Google Discover, and the Top Stories SERP carousel.</li><li><strong>Article (Generic Fallback):</strong> A generic publication piece such as whitepapers, research summaries, documentation overviews, or corporate announcements that do not fit neatly into a blog or news feed structure.</li></ul>",
        keyTakeaways: [
          "Use BlogPosting for tutorials, developer guides, and content marketing articles.",
          "Use NewsArticle for timely journalistic reporting and Google Top Stories eligibility.",
          "Use Article for corporate press releases, research whitepapers, and knowledgebase guides.",
        ],
      },
      {
        heading: "Google's 2026 Structured Data Requirements & The 7 Core Properties",
        content:
          "<p>To qualify for Google Search rich features (including visual article cards, carousels, and Google Discover recommendations), Google Search Central enforces strict criteria across 7 core properties:</p><ol><li><strong>headline:</strong> The title of the article. Google recommends keeping headlines under 110 characters without clickbait truncation.</li><li><strong>image:</strong> A single high-resolution image URL or an array of URLs. Images must be at least 1200 pixels wide and contain a minimum of 50,000 total pixels to qualify for large image Google Discover cards.</li><li><strong>datePublished:</strong> The exact date and optional time the article was first made publicly available in standard ISO 8601 format (e.g., <code>2026-09-22T08:00:00+00:00</code>).</li><li><strong>dateModified:</strong> The date and time the content was significantly updated. Google requires <code>dateModified</code> to be greater than or equal to <code>datePublished</code>.</li><li><strong>author:</strong> Structured object declaring the content creator. Google strongly emphasizes explicit <code>Person</code> or <code>Organization</code> typing with an attached <code>url</code> pointing to an author bio page.</li><li><strong>publisher:</strong> The organization hosting the content, including a mandatory <code>logo</code> object containing a square or rectangular brand logo URL.</li><li><strong>description:</strong> A concise summary of the article body used for snippet generation.</li></ol>",
        keyTakeaways: [
          "Google requires headline, image, datePublished, dateModified, author, and publisher.",
          "Images must be at least 1200px wide for Google Discover large card inclusion.",
          "All dates must strictly adhere to ISO 8601 formatting.",
        ],
      },
      {
        heading: "E-E-A-T & Google's Multi-Aspect Ratio Image Guidelines (16:9, 4:3, 1:1)",
        content:
          "<p>Google Search Central guidelines explicitly recommend providing multiple aspect ratio variants for every article image. Because search results and Discover cards are rendered across diverse viewport form factors (mobile feeds, desktop sidebars, tablet cards), supplying images in <strong>16:9</strong>, <strong>4:3</strong>, and <strong>1:1</strong> aspect ratios ensures Google displays crisp, uncropped imagery without automated distortion:</p><pre><code>\"image\": [\n  \"https://example.com/photos/16x9/photo.jpg\",\n  \"https://example.com/photos/4x3/photo.jpg\",\n  \"https://example.com/photos/1x1/photo.jpg\"\n]</code></pre><p>Furthermore, establishing transparent <strong>E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)</strong> signals requires linking author entities directly to verified profiles:</p><ul><li>Use <code>\"@type\": \"Person\"</code> with an author bio URL (<code>url: \"https://example.com/authors/jane-doe\"</code>) or social profile link.</li><li>Add <code>jobTitle</code> to substantiate subject matter expertise.</li><li>Ensure the <code>publisher.logo</code> is hosted on an accessible HTTPS endpoint with valid image dimensions.</li></ul>",
        keyTakeaways: [
          "Google recommends 3 image aspect ratios: 16:9, 4:3, and 1:1 for responsive SERP cards.",
          "Linking author URLs directly to bio pages strengthens organic E-E-A-T signals.",
          "All markup is generated 100% client-side with zero data logging or server transmission.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the difference between Article, BlogPosting, and NewsArticle schema?",
      answer:
        "Article is the general parent class for any written publication. BlogPosting is specifically tailored for posts within a blog and helps search engines identify episodic or tutorial content. NewsArticle is reserved for journalistic coverage and is a prerequisite for inclusion in Google News and Top Stories carousels.",
    },
    {
      question: "Why does Google recommend 16:9, 4:3, and 1:1 image aspect ratios?",
      answer:
        "Google surfaces article images across various UI layouts including mobile Discover feeds, desktop knowledge panels, and search carousels. Providing 16:9 (1200x675 or 1920x1080), 4:3 (1200x900), and 1:1 (1200x1200) aspect ratios ensures Google uses the ideal crop without stretching or clipping key visuals.",
    },
    {
      question: "How does author schema support Google E-E-A-T guidelines?",
      answer:
        "Declaring an explicit author entity with @type: 'Person', the creator's full name, job title, and a verifiable profile URL helps Google verify author credentials and establish thematic expertise, which is a core ranking factor in Google's helpful content systems.",
    },
    {
      question: "How do I implement this JSON-LD schema in Next.js App Router?",
      answer:
        "In Next.js App Router (app/ directory), you can render a <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /> directly inside your page.tsx or layout.tsx Server Component.",
    },
    {
      question: "Does having Article schema guarantee rich snippets in Google Search?",
      answer:
        "Structured data makes your page eligible for rich results, but Google's ranking algorithms determine whether to display rich snippets based on content quality, query intent, page authority, and compliance with Google Search Essentials.",
    },
    {
      question: "Is my article content sent to any remote servers?",
      answer:
        "No. The OmniSEO Tools Article & BlogPosting Schema Generator runs 100% in-browser using client-side JavaScript. None of your headlines, draft copy, or author details are ever transmitted or stored on any server.",
    },
  ],
};

export default articleSchemaGeneratorTool;
