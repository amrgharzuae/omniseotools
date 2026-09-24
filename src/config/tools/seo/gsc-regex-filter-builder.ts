import { ToolDefinition } from "@/types/tool";

export const gscRegexFilterBuilderTool: ToolDefinition = {
  id: "gsc-regex-filter-builder",
  slug: "gsc-regex-filter-builder",
  name: "Google Search Console Regex Filter Builder",
  title: "Google Search Console Regex Filter Builder (RE2 Compatible) | OmniSEO",
  metaTitle: "Google Search Console Regex Filter Builder (RE2 Compatible) | OmniSEO",
  metaDescription:
    "Build and test RE2-compliant regular expressions for Google Search Console query and page filters. Cleanly segment questions, branded keywords, commercial intent, word counts, and subfolders.",
  h1: "Google Search Console Regex Filter Builder (RE2 Compatible)",
  tagline:
    "Build, validate, and test RE2-compliant regular expressions for Google Search Console queries and pages with zero syntax errors.",
  shortDescription:
    "Build and test RE2-compliant regular expressions for Google Search Console query and page filters. Cleanly segment questions, branded keywords, commercial intent, word counts, and subfolders.",
  category: "seo",
  icon: "Filter",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "google search console regex",
    "gsc regex filter builder",
    "search console regex",
    "gsc re2 regex",
    "gsc query regex",
    "gsc brand non brand filter",
    "search console question filter regex",
    "gsc word count regex",
    "google search console page regex",
    "re2 regex tester",
    "gsc custom regex",
    "search console intent regex",
  ],
  howToSteps: [
    {
      name: "Select Filter Mode & Strategy",
      text: "Choose from Question Mining, Brand vs Non-Brand segmentation, Commercial Intent modifiers, Word Count extractor, Page/Subfolder filters, or Custom RE2 mode.",
    },
    {
      name: "Configure Modifiers & Parameters",
      text: "Tune your target keywords, question stems, word counts, directory subpaths, or boundary anchors using visual controls.",
    },
    {
      name: "Validate RE2 Syntax & Inspect Diagnostics",
      text: "OmniSEO automatically enforces Google RE2 engine compliance, flagging forbidden lookaheads (?=...), lookbehinds (?<=...), and backreferences in real time.",
    },
    {
      name: "Test Against Live GSC Sample Data",
      text: "Paste sample queries or URLs from your GSC Performance export into the live sandbox to verify match accuracy and hit percentages.",
    },
    {
      name: "Copy and Apply to Google Search Console",
      text: "Copy the RE2-certified regex string, navigate to GSC Performance > + New > Query or Page > Custom (regex), and paste your filter.",
    },
  ],
  guideContent: {
    title: "The Authoritative Guide to Google Search Console Regular Expressions (RE2 Engine)",
    sections: [
      {
        heading: "Understanding the Google Search Console RE2 Engine & Critical Constraints",
        content:
          "<p>In 2021, Google upgraded the <strong>Performance Report</strong> in Google Search Console (GSC) to support regular expressions for both <strong>Query</strong> and <strong>Page</strong> dimensions. However, unlike JavaScript (ECMAScript) or PHP (PCRE), Google Search Console is powered strictly by <strong>Google's open-source RE2 regular expression engine</strong>.</p><p>The RE2 engine was engineered specifically for linear-time string matching without exponential backtracking, ensuring fast execution across billions of search query logs. Because of this architectural safety constraint, <strong>RE2 strictly disallows certain common regex constructs</strong>:</p><ul><li><strong>No Lookaheads or Lookbehinds:</strong> Constructs such as <code>(?=foo)</code>, <code>(?!bar)</code>, <code>(?&lt;=foo)</code>, and <code>(?&lt;!bar)</code> are forbidden and will cause GSC to display a generic <em>'Invalid regular expression'</em> error.</li><li><strong>No Backreferences:</strong> Patterns like <code>\\1</code> or <code>\\2</code> that refer back to previous capture groups are unsupported.</li><li><strong>No Possessive Quantifiers or Recursion:</strong> Syntax such as <code>?+</code>, <code>*+</code>, or <code>(?R)</code> will fail validation.</li><li><strong>Case-Insensitivity Handling:</strong> While GSC filters default to case-insensitive matching in modern interfaces, explicitly adding the inline <code>(?i)</code> flag ensures deterministic case folding across all export environments and BigQuery connectors.</li></ul>",
        keyTakeaways: [
          "GSC regex is powered by Google's RE2 engine designed for O(n) linear-time execution.",
          "Never use lookaheads (?=...) or lookbehinds (?<=...); they will trigger immediate syntax errors in GSC.",
          "Word boundaries (\\b), non-capturing groups (?:...), character classes, and anchors (^, $) are fully supported.",
        ],
      },
      {
        heading: "Isolating Brand vs. Non-Brand Search Traffic via GSC Regex",
        content:
          "<p>One of the most impactful applications of GSC regular expressions is isolating true organic non-branded search demand from branded navigational queries. When brand equity fluctuates due to PR campaigns or TV ads, aggregate GSC impressions can skew your SEO reporting.</p><p>To build a robust brand exclusion filter:</p><ol><li>Identify all brand variants, brand permutations, acronyms, and common typos (e.g., <code>omniseo</code>, <code>omni seo</code>, <code>omni-seo</code>, <code>omniseotools</code>).</li><li>Group them inside a word-boundary pattern with case-insensitivity: <code>(?i)\\b(omniseo|omni\\s+seo|omni-seo|omniseotools)\\b</code>.</li><li>In Google Search Console, create a new <strong>Query Filter</strong>, choose <strong>Custom (regex)</strong>, and select <strong>'Doesn't match regex'</strong>.</li></ol><p>This cleanly filters out all brand-assisted clicks, revealing your true unbranded SEO footprint and category ranking momentum.</p>",
        keyTakeaways: [
          "Include all common typos, spacing variations (\\s+), and hyphenations of your brand name.",
          "Set GSC dropdown to 'Doesn't match regex' to isolate clean non-branded organic performance.",
          "Use word boundaries (\\b) to prevent unintended substring matches (e.g., preventing 'apple' from matching 'pineapple').",
        ],
      },
      {
        heading: "Mining Question Queries & Featured Snippet Opportunities",
        content:
          "<p>Question queries represent high-intent informational demand ideal for capturing Google <strong>Featured Snippets</strong>, <strong>People Also Ask (PAA)</strong> boxes, and AI Overviews. By segmenting queries starting with interrogative pronouns, you can discover unanswered customer questions and content gap opportunities.</p><p>The standard RE2 question query filter is:</p><pre><code>^(who|what|where|when|why|how|does|can|is|are|did|do|should|could|will|would|which)\\b</code></pre><p>If you want to capture questions where the interrogative modifier appears mid-query (e.g., <em>'laptop how to fix screen'</em>), remove the start anchor <code>^</code> and wrap the expression in word boundaries: <code>\\b(who|what|where|when|why|how|can|is|should)\\b</code>.</p>",
        keyTakeaways: [
          "Use the ^ anchor to isolate queries that explicitly begin with question words.",
          "Analyze low-CTR, high-impression question queries to optimize FAQ schema and introductory paragraph definitions.",
          "Combine with position filters (Positions 2–10) in GSC to find low-hanging featured snippet capture targets.",
        ],
      },
      {
        heading: "Filtering by Word Count & Long-Tail Query Length",
        content:
          "<p>Long-tail keywords (5+ words) often boast conversion rates 2.5x higher than broad head terms because searchers have defined specific purchase criteria. Because RE2 lacks lookaheads, word counting is performed by matching whitespace-separated non-whitespace character clusters.</p><p>Standard RE2 word count formulas for GSC Query filtering:</p><ul><li><strong>4+ Word Queries (Long-Tail):</strong> <code>^(\\S+\\s+){3,}\\S+$</code> (or <code>([^\" \"]*\\s){3,}?</code>)</li><li><strong>6+ Word Queries (Ultra-Specific Questions):</strong> <code>^(\\S+\\s+){5,}\\S+$</code></li><li><strong>1-2 Word Queries (Short Head Terms):</strong> <code>^\\s*(\\S+\\s+){0,1}\\S+\\s*$</code></li><li><strong>Exact N Words (e.g., exactly 3 words):</strong> <code>^\\s*(\\S+\\s+){2}\\S+\\s*$</code></li></ul>",
        keyTakeaways: [
          "To match N or more words, specify {N-1,} repetitions of non-space followed by whitespace.",
          "Word count segmentation reveals whether your domain captures high-converting long-tail intent or high-volume short-tail head terms.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "Why does Google Search Console say 'Invalid regular expression'?",
      answer:
        "The most common reason is using PCRE or JavaScript syntax that Google's RE2 engine does not support. Specifically, lookaheads (?=...), lookbehinds (?<=...), negative lookarounds (?!...), and backreferences (\\1) are completely disallowed in RE2. OmniSEO's filter builder automatically validates your regex against RE2 rules to prevent this error.",
    },
    {
      question: "Are Google Search Console regex filters case-sensitive?",
      answer:
        "In the modern Google Search Console interface, query and page regex filters match case-insensitively by default. However, when exporting data or querying via the Search Console API and BigQuery exports, adding an explicit (?i) flag at the beginning of your expression ensures guaranteed case-insensitive matching across all environments.",
    },
    {
      question: "How do I exclude branded keywords using GSC regex?",
      answer:
        "Generate a regex matching all your brand stems, typos, and variations (e.g., (?i)\\b(mybrand|my\\s+brand|mybrandname)\\b). In Google Search Console, click '+ New' > 'Query' > select 'Custom (regex)' from the dropdown, and change the match rule from 'Matches regex' to 'Doesn't match regex'.",
    },
    {
      question: "Can I filter both Queries and Pages simultaneously with regex in GSC?",
      answer:
        "Yes! Google Search Console allows you to stack multiple filters. You can create a Query regex filter (e.g., to isolate question terms) and simultaneously create a Page regex filter (e.g., to restrict analysis to your /blog/ subfolder).",
    },
    {
      question: "What is the maximum regex length allowed in Google Search Console?",
      answer:
        "Google Search Console supports regex patterns up to approximately 4,096 characters. This provides ample room to chain hundreds of brand variations, multi-subfolder path filters, or extensive keyword modifier lists.",
    },
    {
      question: "How does the word count regex formula work in RE2?",
      answer:
        "Because RE2 cannot perform lookaheads, word counts rely on matching clusters of non-whitespace characters (\\S+) followed by whitespace (\\s+). For example, ^(\\S+\\s+){4,}\\S+$ matches at least 4 words followed by spaces plus 1 final word, equaling 5 or more total words.",
    },
  ],
};
