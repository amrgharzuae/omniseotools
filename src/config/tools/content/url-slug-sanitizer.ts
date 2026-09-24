import { ToolDefinition } from "@/types/tool";

export const urlSlugSanitizerTool: ToolDefinition = {
  id: "url-slug-sanitizer",
  slug: "url-slug-sanitizer",
  name: "Bulk URL Slug & Anchor Text Sanitizer",
  title: "Bulk URL Slug & Anchor Text Sanitizer | OmniSEO",
  metaTitle: "Bulk URL Slug & Anchor Text Sanitizer | OmniSEO",
  metaDescription:
    "Transform messy article titles, product names, and headline lists into clean, SEO-friendly URL slugs and anchor text with automated stop-word removal, diacritic transliteration, and length caps.",
  h1: "Bulk URL Slug & Anchor Text Sanitizer",
  tagline:
    "Clean, transliterate, and format bulk article titles, product names, and headlines into SEO-friendly URL slugs, Markdown links, and HTML anchor tags.",
  shortDescription:
    "Transform messy article titles, product names, and headline lists into clean, SEO-friendly URL slugs and anchor text with automated stop-word removal, diacritic transliteration, and length caps.",
  category: "content",
  icon: "Link2",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "bulk url slug generator",
    "url slug sanitizer",
    "seo friendly slug maker",
    "anchor text generator",
    "diacritic transliterator slug",
    "remove stop words from url",
    "clean url generator",
    "markdown link builder",
    "html anchor tag generator",
    "product title to url slug",
  ],
  howToSteps: [
    {
      name: "Paste Raw Titles or Load Presets",
      text: "Paste your raw article headlines, product names, or keyword lists line-by-line into the input area, or click one of the preset chips (E-Commerce Products, Blog & SEO, International & Accents).",
    },
    {
      name: "Select Output Mode & Prefix",
      text: "Choose between Clean URL Slugs, Full URL Paths, Markdown Anchor Links, or HTML Anchor Tags. Enter an optional domain prefix (e.g., https://example.com/blog/) to generate absolute canonical URLs.",
    },
    {
      name: "Customize Sanitization & Formatting Rules",
      text: "Configure your slug separator (hyphens, underscores, subfolders), toggle stop-word removal, diacritic transliteration (ä -> ae, é -> e), lowercase enforcement, and file extension stripping.",
    },
    {
      name: "Set Max Character Cap with Smart Truncation",
      text: "Adjust the character length cap (default: 60 characters). The tool applies smart word-boundary truncation so words are never cut awkwardly in half.",
    },
    {
      name: "Export Clean Slugs or Multi-Column CSV",
      text: "Copy the formatted slugs directly to your clipboard, download as a clean .TXT file, or export a 5-column CSV with original titles, clean slugs, full URLs, Markdown links, and HTML tags.",
    },
  ],
  editorialGuide: {
    title: "The Definitive Guide to URL Slug Optimization & Internal Anchor Text for SEO",
    sections: [
      {
        heading: "What is a URL Slug and Why Does It Matter for Search Rankings?",
        content:
          "<p>A <strong>URL slug</strong> is the final, human-readable part of a web address that identifies a specific page (e.g., in <code>https://omniseotools.com/tools/url-slug-sanitizer</code>, the slug is <code>url-slug-sanitizer</code>). Search engines (including Googlebot and Bingbot) evaluate the keywords in your URL slug as an on-page relevance signal.</p><p>Furthermore, human searchers review the URL in Google Search results and social media cards before deciding whether to click. Clean, concise, keyword-rich slugs generate up to <strong>25% higher Click-Through Rates (CTR)</strong> than messy, parameter-laden URLs containing session IDs or cryptic database numbers.</p>",
        keyTakeaways: [
          "URL slugs serve as direct on-page keyword signals for search engines.",
          "Clean, readable URLs improve user trust and elevate SERP Click-Through Rates.",
          "Keep slugs concise, descriptive, and tightly aligned with the primary page topic.",
        ],
      },
      {
        heading: "Hyphens vs. Underscores: Google's Official Stance",
        content:
          "<p>Google's official Search Essentials documentation recommends using <strong>hyphens (<code>-</code>)</strong> rather than underscores (<code>_</code>) or spaces to separate words in URL slugs. Google treats hyphens as standard word separators (interpreting <code>running-shoes</code> as two distinct words: 'running' and 'shoes').</p><p>In contrast, search engine crawlers historically treated underscores as word joiners (interpreting <code>running_shoes</code> as a single compound token: 'runningshoes'). While modern search algorithms have become more sophisticated, hyphens remain the universal standard across web frameworks, Next.js routing, and search engine guidelines.</p>",
        keyTakeaways: [
          "Always use hyphens (-) as word separators in production URL slugs.",
          "Avoid underscores (_), spaces, or plus signs (+) in public web addresses.",
          "Hyphens allow search engines to parse individual semantic keyword tokens accurately.",
        ],
      },
      {
        heading: "Handling Stop Words: Balance Brevity with Semantic Clarity",
        content:
          "<p><strong>Stop words</strong> are common grammatical helper words like <em>a, the, in, on, of, for, with, is, and, to</em>. While search engines easily process stop words in content, including them in URLs often creates unnecessarily long, cluttered addresses:</p><table class=\"w-full text-xs text-left border border-slate-200 dark:border-slate-800 my-4\"><thead><tr class=\"bg-slate-100 dark:bg-slate-800\"><th class=\"p-2.5\">Original Headline</th><th class=\"p-2.5\">Default Raw Slug</th><th class=\"p-2.5\">Sanitized SEO Slug</th><th class=\"p-2.5\">Improvement</th></tr></thead><tbody><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 text-slate-700 dark:text-slate-300\">What is Hreflang? A Beginner's Complete Guide for 2026</td><td class=\"p-2.5 font-mono text-rose-500\">what-is-hreflang-a-beginners-complete-guide-for-2026</td><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">hreflang-beginners-complete-guide-2026</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">27% shorter, focused on core keywords</td></tr><tr class=\"border-t border-slate-200 dark:border-slate-800\"><td class=\"p-2.5 text-slate-700 dark:text-slate-300\">The Ultimate Guide to Google Analytics 4 (GA4) UTM Tracking</td><td class=\"p-2.5 font-mono text-rose-500\">the-ultimate-guide-to-google-analytics-4-ga4-utm-tracking</td><td class=\"p-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400\">ga4-utm-campaign-tracking-guide</td><td class=\"p-2.5 text-slate-600 dark:text-slate-300\">Eliminates filler words while keeping high intent</td></tr></tbody></table><p><strong>Pro Tip:</strong> Strip stop words automatically, but ensure the remaining slug retains clear grammatical sense for human visitors.</p>",
        keyTakeaways: [
          "Stripping stop words shortens URL character length without losing topical authority.",
          "Shorter URLs are easier to share on social media, in emails, and in SMS marketing.",
          "Our tool includes a fallback to prevent accidental empty slugs when all words are stop words.",
        ],
      },
      {
        heading: "Diacritic Transliteration & International Unicode Safety",
        content:
          "<p>When creating URLs from international titles containing accents or umlauts (such as French <em>café</em>, German <em>münchen</em>, or Spanish <em>diseño</em>), web servers often percent-encode non-ASCII characters into messy URL strings (e.g., <code>/caf%C3%A9</code> or <code>/m%C3%BCnchen</code>).</p><p>Transliterating diacritics into their standard ASCII equivalents (e.g., <code>/cafe</code>, <code>/muenchen</code>, or <code>/diseno</code>) ensures universal compatibility across all browser address bars, command-line cURL scripts, CMS routing engines, and server access logs.</p>",
        keyTakeaways: [
          "Transliterate accents (é -> e, ü -> ue, ñ -> n) to prevent messy %-encoded ASCII strings.",
          "Preserves visual readability across global sharing platforms and messaging apps.",
          "Guarantees seamless routing compatibility with Apache, Nginx, Vercel, and Next.js App Router.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Why should I sanitize and optimize URL slugs before publishing?",
      answer:
        "Optimized URL slugs improve search rankings by placing primary keywords directly in the URL path. They also increase Click-Through Rates (CTR) in search engine result pages by clearly signaling page topic and trustworthiness to users while eliminating messy tracking symbols, special characters, and excessive filler words.",
    },
    {
      question: "Should I use hyphens or underscores to separate words in URL slugs?",
      answer:
        "Always use hyphens (-). Google explicitly recommends hyphens over underscores because search algorithms treat hyphens as standard word delimiters (interpreting 'seo-tools' as two words: 'seo' and 'tools'), whereas underscores can be interpreted as word joiners ('seotools').",
    },
    {
      question: "What is the recommended maximum character length for a URL slug?",
      answer:
        "We recommend keeping URL slugs between 40 and 60 characters (approximately 3 to 6 words). Shorter URLs are easier to remember, fit cleanly in SERP snippet displays without truncation, and receive higher click-through rates across mobile devices and social networks.",
    },
    {
      question: "How does smart word-boundary truncation work in this tool?",
      answer:
        "When you configure a maximum character cap (e.g., 60 characters), our algorithm checks the cutoff point. If the limit falls in the middle of a word, it truncates the slug at the preceding hyphen separator rather than cutting a word in half, ensuring all generated slugs remain clean and grammatically complete.",
    },
    {
      question: "Can I generate Markdown links and HTML anchor tags in bulk?",
      answer:
        "Yes. The tool automatically pairs your original headlines with the generated slugs to create ready-to-copy Markdown anchor links ([Title](/slug)) and HTML anchor tags (<a href='/slug'>Title</a>). You can copy them directly or export a multi-column CSV containing all variations.",
    },
    {
      question: "Is this Bulk URL Slug Sanitizer secure and private?",
      answer:
        "Yes, 100%. All diacritic transliteration, stop-word filtering, length truncation, and link formatting execute entirely client-side in your web browser. No headline data or proprietary content titles are sent to any remote server or stored in any database.",
    },
  ],
};
