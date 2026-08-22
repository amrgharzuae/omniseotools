import { ToolDefinition } from "@/types/tool";

export const keywordDensityAnalyzerTool: ToolDefinition = {
  "id": "keyword-density-analyzer",
  "slug": "keyword-density-analyzer",
  "name": "Live Keyword Density & TF-IDF Content Analyzer",
  "shortDescription": "Scan your copy for 1-word, 2-word, and 3-word phrase frequency, word counts, and reading time to prevent keyword stuffing penalties.",
  "category": "content",
  "icon": "BarChart3",
  "badge": "Popular",
  "featured": true,
  "status": "active",
  "keywords": [
    "keyword density checker",
    "word frequency counter",
    "seo keyword density",
    "tf-idf content analyzer",
    "avoid keyword stuffing",
    "reading time calculator"
  ],
  "metaTitle": "Live Keyword Density & TF-IDF Content Analyzer (2026 Free Tool)",
  "metaDescription": "Analyze word counts, character counts, reading time, and 1-word, 2-word, and 3-word keyword density percentages. Avoid keyword stuffing penalties with real-time feedback.",
  "howToSteps": [
    {
      "name": "Paste Your Content or Article Draft",
      "text": "Paste your blog post, product copy, or essay into the main text editor."
    },
    {
      "name": "Review High-Level Metrics",
      "text": "Check total word count, character count, sentence count, and estimated reading time (~225 words per minute)."
    },
    {
      "name": "Inspect 1-Word, 2-Word & 3-Word N-Grams",
      "text": "Switch between the 1-word, 2-word, and 3-word phrase frequency tabs to inspect your primary and secondary keyword distribution."
    },
    {
      "name": "Check Keyword Stuffing Risk Gauge",
      "text": "Ensure no single keyword exceeds the recommended 2.5% to 3.0% safety threshold to protect against search engine over-optimization penalties."
    },
    {
      "name": "Copy Keyword Density Report",
      "text": "Export the formatted keyword frequency report for your editorial or client SEO documentation."
    }
  ],
  "editorialGuide": {
    "title": "The Comprehensive Guide to Keyword Density, N-Grams & Semantic SEO",
    "sections": [
      {
        "heading": "What is Keyword Density & The Ideal Percentage for SEO in 2026",
        "content": "<p><strong>Keyword density</strong> is the percentage of times a specific keyword or phrase appears within a piece of text relative to the total word count. The standard mathematical formula is:</p><p><code>Density (%) = (Keyword Count / Total Words) * 100</code></p><p>In modern SEO, there is no single magical keyword density percentage. However, industry consensus and search engine patent analyses indicate that an optimal primary keyword density falls between <strong>1.0% and 2.0%</strong>. Densities exceeding 3.0% frequently trigger algorithmic spam filters for <em>Keyword Stuffing</em>.</p>",
        "keyTakeaways": [
          "Target an optimal primary keyword density between 1.0% and 2.0%.",
          "A density above 3.0% creates an unnatural reading experience and risks algorithmic penalties.",
          "Prioritize natural, comprehensive coverage over artificial keyword repetition."
        ]
      },
      {
        "heading": "Understanding N-Grams: 1-Word, 2-Word & 3-Word Phrase Analysis",
        "content": "<p>Search engine algorithms do not evaluate keywords in isolation; they analyze <strong>N-Grams</strong> (contiguous sequences of n words) to understand topical depth:</p><ul><li><strong>Unigrams (1-Word):</strong> Foundational terms (e.g., <code>seo</code>, <code>tools</code>, <code>analytics</code>).</li><li><strong>Bigrams (2-Word):</strong> Targeted concepts (e.g., <code>keyword research</code>, <code>search engine</code>, <code>content marketing</code>).</li><li><strong>Trigrams (3-Word):</strong> Specific long-tail intents (e.g., <code>best seo tools</code>, <code>free keyword checker</code>, <code>organic traffic growth</code>).</li></ul><p>Analyzing bigrams and trigrams ensures that your content covers natural conversational phrases that real searchers type into Google and AI search engines.</p>",
        "keyTakeaways": [
          "Unigrams represent broad core concepts; Bigrams and Trigrams capture specific search intent.",
          "Check 2-word and 3-word phrase tables to confirm key long-tail phrases appear naturally.",
          "Filter out common stop words (and, the, of) to isolate true topical phrases."
        ]
      },
      {
        "heading": "What is TF-IDF & Semantic Relevance in Modern Search",
        "content": "<p>Modern search engines have evolved beyond simple keyword frequency to evaluate <strong>Term Frequency-Inverse Document Frequency (TF-IDF)</strong> and semantic entity relationships.</p><p>TF-IDF measures how important a word is to a document in comparison to a broader collection of web pages. High-ranking content includes not only the target keyword, but also co-occurring semantic entities and related vocabulary (such as synonyms, technical terminology, and contextual subtopics).</p>",
        "keyTakeaways": [
          "TF-IDF rewards semantically related terms, not just exact keyword repetition.",
          "Include diverse synonyms, variations, and related subtopics throughout your article.",
          "Write comprehensively to naturally cover related entity terms."
        ]
      },
      {
        "heading": "How to Identify & Fix Keyword Stuffing Penalties",
        "content": "<p>Keyword stuffing occurs when content repeatedly forces target keywords in an unnatural, repetitive manner. Signs that your content is over-optimized include:</p><ol><li><strong>High Density Warnings (> 3.0%):</strong> Words repeating more than 3 times every 100 words.</li><li><strong>Awkward Grammatical Phrasing:</strong> Sentences contorted simply to insert an exact-match query.</li><li><strong>Clustered Repetition:</strong> Mentioning the keyword 5 times within a single paragraph.</li></ol><p>To fix over-optimization, replace repetitive exact-match phrases with natural pronouns, synonyms, or related concepts.</p>",
        "keyTakeaways": [
          "Spread keyword occurrences evenly throughout headings, body paragraphs, and conclusions.",
          "Use pronouns and descriptive synonyms instead of repeating exact-match phrases.",
          "Read your content aloud: if it sounds robotic or forced, rewrite the offending sentences."
        ]
      }
    ]
  },
  "faqs": [
    {
      "question": "What is a good keyword density for Google SEO in 2026?",
      "answer": "A safe and effective primary keyword density is generally between 1.0% and 2.0% (approximately 1 to 2 mentions per 100 words). Keeping your density in this range ensures search engines understand your topic while maintaining natural readability."
    },
    {
      "question": "What happens if my keyword density is too high (> 3%)?",
      "answer": "A keyword density above 3.0% risks triggering Google automated keyword stuffing and spam filters. Over-optimized content can be demoted in search rankings or omitted from search results entirely."
    },
    {
      "question": "What are 2-word and 3-word n-gram phrases?",
      "answer": "N-grams are sequences of words that appear together in your text. 2-word phrases (bigrams like \\x27keyword research\\x27) and 3-word phrases (trigrams like \\x27best seo tools\\x27) help identify long-tail keyword themes and topical depth."
    },
    {
      "question": "Does keyword density matter more than content quality?",
      "answer": "No. Content quality, depth, user satisfaction, and search intent alignment matter far more than exact keyword percentages. Keyword density tools are meant as a safety guardrail to avoid over-repetition, not a strict target to hit artificially."
    },
    {
      "question": "How is reading time calculated?",
      "answer": "Reading time is calculated based on the average adult reading speed of 225 words per minute (WPM), while speaking time is estimated at approximately 130 words per minute."
    },
    {
      "question": "Should stop words be excluded when checking keyword density?",
      "answer": "Yes, excluding common grammatical stop words (like \\x27the\\x27, \\x27is\\x27, \\x27and\\x27, \\x27of\\x27) allows you to focus on meaningful topical keywords and meaningful 2/3-word phrases."
    }
  ]
};
