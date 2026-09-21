import { ToolDefinition } from "@/types/tool";

export const arabicUrlDecoderTool: ToolDefinition = {
  id: "arabic-url-decoder",
  slug: "arabic-url-decoder",
  name: "Arabic & UTF-8 URL Decoder",
  title: "Arabic & UTF-8 URL Decoder | Convert Encoded URLs & Ad Query Strings",
  metaTitle: "Arabic & UTF-8 URL Decoder | Convert Encoded URLs & Ad Query Strings",
  metaDescription:
    "Free tool to convert percent-encoded Arabic URL strings (%D8%...) from Google Ads, Google Search Console, and GA4 into clean, readable Arabic text.",
  h1: "Arabic & UTF-8 URL Decoder & Parameter Extractor",
  tagline:
    "Instantly decode percent-encoded Arabic URLs, Google Ads search terms, and GA4 query parameters into readable text with automatic RTL detection.",
  shortDescription:
    "Instantly decode percent-encoded Arabic URLs, Google Ads search terms, and GA4 query parameters into readable text.",
  category: "marketing",
  icon: "Languages",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "arabic url decoder",
    "percent decode url",
    "decode arabic link",
    "google ads search term decoder",
    "utf8 url converter",
    "url percent encoding arabic",
    "decode utm arabic",
    "arabic gclid decoder",
  ],
  howToSteps: [
    {
      name: "Paste Encoded URL or Query String",
      text: "Paste your percent-encoded URL, path, or UTM tracking link (e.g., https://example.com/ar/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA) into the editor.",
    },
    {
      name: "Select Processing Mode",
      text: "Choose Single URL mode for in-depth parameter analysis or Batch mode to process hundreds of Google Ads search terms simultaneously.",
    },
    {
      name: "Inspect Decoded Output with Auto-RTL",
      text: "Review the human-readable Arabic text, path hierarchy breadcrumbs, and individual query parameters with automatic right-to-left formatting.",
    },
    {
      name: "Copy or Export CSV (Excel)",
      text: "Copy the clean URL or individual parameters to clipboard, or export batch lines to CSV with UTF-8 BOM encoding for seamless Microsoft Excel compatibility.",
    },
  ],
  guideContent: {
    title: "The Comprehensive Guide to Arabic URL Decoding, Percent-Encoding & Analytics Attribution",
    sections: [
      {
        heading: "Why Arabic URLs and Google Ads Search Terms Are Percent-Encoded",
        content:
          "<p>Under the universal Uniform Resource Identifier specification (<strong>RFC 3986</strong>), URLs are strictly limited to standard US-ASCII characters. Non-ASCII characters—including the entire Arabic alphabet (Unicode range <code>U+0600</code> to <code>U+06FF</code>), diacritics, and Persian/Urdu scripts—cannot be transmitted directly across HTTP request headers without encoding.</p><p>Web browsers and ad platforms convert non-ASCII UTF-8 characters into pairs of hexadecimal bytes prefixed by a percent sign (<code>%</code>). In Arabic:</p><ul><li>Each standard Arabic character is represented by <strong>2 UTF-8 bytes</strong> (e.g., the Arabic letter <code>خ</code> becomes <code>%D8%AE</code>, and <code>سيو</code> becomes <code>%D8%B3%D9%8A%D9%88</code>).</li><li>Special characters and diacritics may require up to <strong>3 or 4 bytes</strong> (e.g. <code>%E0%A4%...</code>).</li><li>Spaces inside query strings are typically encoded as either <code>%20</code> or <code>+</code>.</li></ul><p>When reviewing exported search term reports in Google Ads, Google Search Console, or GA4, these long strings of hexadecimal characters obscure campaign intelligence. Our decoder converts them back to natural Arabic with 0ms client-side execution.</p>",
        keyTakeaways: [
          "RFC 3986 restricts URL transmission to ASCII, requiring all Arabic characters to be percent-encoded.",
          "Arabic letters are 2-byte UTF-8 sequences starting with %D8, %D9, %D6, or %D7.",
          "Spaces in query strings are commonly encoded as %20 or + signs.",
        ],
      },
      {
        heading: "Diagnosing UTM & GA4 Arabic Parameter Corruption in Single Page Applications",
        content:
          "<p>Digital marketers and data engineers frequently encounter corrupted Arabic campaign parameters when tracking international traffic. Common failure modes include:</p><ol><li><strong>Double Percent-Encoding:</strong> When an ad network redirect or intermediate tracking link re-encodes an already encoded URL, the percent symbol itself is encoded as <code>%25</code>. For example, <code>%D8%AE</code> becomes <code>%25D8%25AE</code>. Standard single-pass decoders fail to render the Arabic character, leaving raw percent codes in GA4.</li><li><strong>Malformed UTF-8 Truncation:</strong> If a URL shortener or database column cuts off a multi-byte Arabic character mid-sequence (e.g. storing <code>%D8</code> without its trailing byte), standard JavaScript <code>decodeURIComponent()</code> throws a fatal <code>URIError: URI malformed</code> exception.</li><li><strong>Excel CSV Character Mismatch:</strong> Exporting Arabic query strings to a standard CSV without a UTF-8 Byte Order Mark (BOM <code>\\uFEFF</code>) causes Microsoft Excel on Windows to interpret the bytes as Windows-1252 or ANSI, resulting in garbled text (mojibake).</li></ol><p>The OmniSEO Tools Arabic Decoder features recursive multi-hop decoding, safe error resilience, and automated UTF-8 BOM CSV exports to prevent these data pipeline bottlenecks.</p>",
        keyTakeaways: [
          "Double-encoding converts % into %25; recursive decoding resolves multiple layers safely.",
          "Malformed UTF-8 sequences are isolated gracefully without crashing client applications.",
          "Always export Arabic CSV files with \\uFEFF BOM to ensure proper rendering in Microsoft Excel.",
        ],
      },
      {
        heading: "Best Practices for SEO-Friendly Arabic URL Slugs & CMS Routing",
        content:
          "<p>When structuring Arabic URLs for e-commerce stores (Shopify, WooCommerce, Salla, Zid) or content sites (WordPress, Next.js, Ghost):</p><ul><li><strong>Use Hyphens for Word Separation:</strong> Separate Arabic words with hyphens (<code>-</code>) rather than underscores or spaces. Search engine crawlers treat hyphens as distinct word boundaries.</li><li><strong>Maintain Consistent Canonical Tags:</strong> Always define an explicit canonical link matching the decoded or consistently encoded version across your XML sitemap and HTML <code>&lt;head&gt;</code> to prevent duplicate content flags.</li><li><strong>Avoid URL Length Overflows:</strong> Because each Arabic character expands into 6 to 9 ASCII characters when percent-encoded, an Arabic slug with 30 words can easily exceed the 2,048-character limit of older proxy servers and CDNs. Keep Arabic URL slugs concise (3 to 6 targeted keywords).</li></ul>",
        keyTakeaways: [
          "Use hyphens (-) instead of underscores for word separation in Arabic slugs.",
          "Ensure canonical tags match the sitemap format consistently.",
          "Keep slugs under 6 words to avoid 2048-character proxy length limits after percent-expansion.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Why do Arabic letters appear as %D8%... in URLs and analytics reports?",
      answer:
        "The standard URI specification (RFC 3986) only allows standard ASCII characters in URLs. All non-ASCII UTF-8 characters (including Arabic, Persian, and Cyrillic) must be percent-encoded into hexadecimal byte pairs (%XX). In Arabic, each letter is represented by two bytes starting with %D8, %D9, %D6, or %D7.",
    },
    {
      question: "How do I decode Google Ads Arabic search terms in bulk?",
      answer:
        "Switch to 'Batch Line-by-Line' mode in this tool, paste your exported list of encoded search terms or URLs from Google Ads or Google Search Console, and click 'Export as CSV'. The tool processes all lines in 0ms client-side and outputs clean Arabic text with a UTF-8 BOM for Microsoft Excel compatibility.",
    },
    {
      question: "Does this tool support recursive or double-encoded URLs?",
      answer:
        "Yes! If an ad network or redirect tracking script has double-encoded the URL (e.g. %25D8%25AE instead of %D8%AE), the tool's recursive decoder automatically resolves multiple layers of percent-encoding until clean UTF-8 text is obtained.",
    },
    {
      question: "Is my URL or campaign data sent to a remote server?",
      answer:
        "No. All decoding, parameter extraction, and file export operations occur 100% client-side in your web browser using native JavaScript engines. Your proprietary campaign URLs and customer search queries remain completely private.",
    },
    {
      question: "Why does exported Arabic CSV text look garbled in Microsoft Excel?",
      answer:
        "Microsoft Excel on Windows defaults to the system ANSI code page unless a UTF-8 Byte Order Mark (BOM) is present at the beginning of the file. Our CSV exporter automatically attaches the \\uFEFF BOM header so Excel renders Arabic characters flawlessly without configuration.",
    },
  ],
};

export default arabicUrlDecoderTool;
