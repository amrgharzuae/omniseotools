import { ToolDefinition } from "@/types/tool";

export const urlSlugGeneratorTool: ToolDefinition = {
  "id": "url-slug-generator",
  "slug": "url-slug-generator",
  "name": "Clean SEO URL Slug & Permalinks Generator",
  "shortDescription": "Convert article titles and product names into clean, lowercase, hyphenated, stop-word-free URL slugs optimized for organic rankings.",
  "category": "seo",
  "icon": "Type",
  "badge": "New",
  "featured": true,
  "status": "active",
  "keywords": [
    "seo slug generator",
    "url permalink cleaner",
    "remove stop words url",
    "slugifier tool",
    "clean url generator",
    "url friendly slug"
  ],
  "metaTitle": "SEO URL Slug Generator - Clean & Optimized Permalinks (2026 Free Tool)",
  "metaDescription": "Transform article titles into clean, lowercase, hyphenated URL slugs. Strip stop words, normalize accented characters, and optimize for Google rankings.",
  "howToSteps": [
    {
      "name": "Enter Article or Product Title",
      "text": "Type or paste your full page title, heading, or article name into the input field."
    },
    {
      "name": "Choose Delimiter (Hyphen vs. Underscore)",
      "text": "Select hyphens (-) for Google-recommended readability or underscores (_) based on your CMS conventions."
    },
    {
      "name": "Toggle Stop-Word & Number Filters",
      "text": "Optionally filter out filler words (e.g., and, the, of, in) to create shorter, keyword-dense permalinks."
    },
    {
      "name": "Set Base Domain Prefix",
      "text": "Add your website domain and folder structure (e.g., https://yourdomain.com/blog/) to preview the complete permalink."
    },
    {
      "name": "Copy Slug or Full Permalink",
      "text": "Click one-click copy to export the clean slug directly into your CMS or markdown frontmatter."
    }
  ],
  "editorialGuide": {
    "title": "The Comprehensive Guide to SEO URL Structure & Permalink Best Practices",
    "sections": [
      {
        "heading": "Why URL Slugs Directly Influence SEO Rankings & Click-Through Rates",
        "content": "<p>A <strong>URL slug</strong> is the human-readable text at the end of a web address that identifies a specific page (for example, <code>/seo-slug-generator</code>). Search engine algorithms (including Googlebot and Bingbot) evaluate the words in your URL slug as a relevance signal for search queries.</p><p>Furthermore, human searchers evaluate URLs before clicking. A clean, descriptive slug like <code>https://example.com/blog/best-seo-tools</code> communicates immediate context and trustworthiness, generating up to <strong>25% higher CTR</strong> than messy, parameter-laden URLs like <code>https://example.com/?p=4981&cat=12</code>.</p>",
        "keyTakeaways": [
          "URLs are a verified ranking factor and a critical visual trust signal in SERP snippets.",
          "Clean URLs improve usability when links are copied and shared across social platforms.",
          "Keep target primary keywords as close to the root domain as possible."
        ]
      },
      {
        "heading": "The Golden Rules of SEO Permalinks: Hyphens, Length & Stop Words",
        "content": "<p>To build search-engine-friendly URLs that stand the test of time, adhere to these four core rules:</p><ol><li><strong>Use Hyphens Instead of Underscores:</strong> Google officially treats hyphens (<code>-</code>) as word separators. In contrast, Google treats underscores (<code>_</code>) as word joiners (e.g., <code>seo_tools</code> is indexed as <code>seotools</code>).</li><li><strong>Keep Slugs Under 5 Words:</strong> Research shows that short slugs (3 to 5 words / 30 to 60 characters) rank higher on average and prevent truncation in mobile search results.</li><li><strong>Strip Unnecessary Stop Words:</strong> Removing common filler words (<em>a, an, the, and, of, for, with, in</em>) keeps URLs concise and keyword-dense.</li><li><strong>Enforce Lowercase Normalization:</strong> Web servers (especially Linux/Apache/Nginx) treat uppercase and lowercase URLs as distinct pages, risking duplicate content penalties if capitalization varies.</li></ol>",
        "keyTakeaways": [
          "Always separate words with hyphens (-), not underscores or spaces.",
          "Enforce lowercase letters exclusively.",
          "Remove stop words unless they are essential to user understanding."
        ]
      },
      {
        "heading": "Handling Accents, Diacritics & Non-Latin Characters",
        "content": "<p>When generating slugs from non-English or accented words (such as French, Spanish, or German), browsers often encode special characters into ugly percent-encoded strings (e.g., <code>café</code> becomes <code>caf%C3%A9</code>).</p><p>Best practice is to <strong>transliterate accented characters</strong> into their basic Latin equivalents (<code>é</code> → <code>e</code>, <code>ü</code> → <code>u</code>, <code>ñ</code> → <code>n</code>, <code>ç</code> → <code>c</code>, <code>ß</code> → <code>ss</code>). This ensures clean, readable URLs that display attractively across all browsers and chat applications.</p>",
        "keyTakeaways": [
          "Transliterate accented characters to avoid messy percent-encoded URLs (%20, %C3).",
          "Strip special symbols, currency signs ($ € £), and punctuation (! ? @ #).",
          "Preserve numbers when they represent important models, years, or counts."
        ]
      },
      {
        "heading": "Changing Existing URL Slugs: When & How to Implement 301 Redirects",
        "content": "<p>While optimizing slugs on new pages is easy, changing the URL of an established, ranking page must be handled with extreme caution. If you change a URL without a redirect, all existing backlinks and Google search rankings pointing to the old URL will break, returning 404 errors.</p><p>If you must update an established URL slug, immediately create a <strong>301 Permanent Redirect</strong> from the old URL to the new URL to pass 99% of the link equity (PageRank) to the new destination.</p>",
        "keyTakeaways": [
          "Never change an established, ranking URL without a 301 Permanent Redirect.",
          "Update internal links across your website to point directly to the new URL slug.",
          "Resubmit the updated XML sitemap in Google Search Console after restructuring URLs."
        ]
      }
    ]
  },
  "faqs": [
    {
      "question": "Should I use hyphens (-) or underscores (_) in URL slugs?",
      "answer": "Always use hyphens (-). Google explicitly recommends hyphens as word separators. Google treats underscores as word connectors, meaning seo_tools is interpreted as seotools rather than two distinct search keywords."
    },
    {
      "question": "What are stop words and should I remove them from slugs?",
      "answer": "Stop words are common filler words such as the, and, a, in, of, and for. Removing non-essential stop words makes URLs shorter, cleaner, and more keyword-focused, which helps both search engine crawlers and users."
    },
    {
      "question": "What is the ideal character length for an SEO URL slug?",
      "answer": "The ideal URL slug length is between 3 and 5 words (approximately 30 to 60 characters). Shorter URLs are easier to remember, copy, and share, and are less likely to be truncated on mobile SERP displays."
    },
    {
      "question": "How does the tool handle accented characters like é, ü, or ñ?",
      "answer": "Our engine automatically transliterates accented characters into standard Latin equivalents (e.g. é becomes e, ü becomes u, ñ becomes n) to prevent ugly percent-encoded URLs like %C3%A9."
    },
    {
      "question": "Should I include numbers or the current year in my URL slugs?",
      "answer": "For time-sensitive content that you plan to update every year, it is often better to omit the specific year from the URL (e.g., use /best-seo-tools rather than /best-seo-tools-2026) so you can update the page annually without changing the permalink."
    },
    {
      "question": "Will changing a URL slug hurt my existing Google rankings?",
      "answer": "Changing an established URL will cause temporary ranking fluctuations. However, if you implement a permanent 301 redirect from the old URL to the new slug, Google will transfer the ranking authority (PageRank) to the new address."
    }
  ]
};
