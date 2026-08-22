import { ToolDefinition } from "@/types/tool";

export const serpPreviewTool: ToolDefinition = {
  id: "serp-preview",
  slug: "serp-preview",
  name: "Google SERP Snippet Previewer & Pixel Counter",
  shortDescription: "Simulate exact Google Desktop & Mobile search results, measure title and description pixel limits, and optimize CTR with real-time heuristic scoring.",
  category: "seo",
  icon: "Eye",
  badge: "Popular",
  featured: true,
  status: "active",
  keywords: [
    "google serp simulator",
    "meta title pixel counter",
    "serp preview tool",
    "seo snippet generator",
    "meta description length",
    "google search preview",
    "title tag pixel width 2026",
  ],
  metaTitle: "Google SERP Simulator & Meta Tag Pixel Counter (2026 Free Tool)",
  metaDescription: "Test and optimize your SEO title and description with pixel accuracy for Google Desktop & Mobile SERP previews. Free real-time simulator.",
  howToSteps: [
    {
      name: "Enter Your Target Page Title",
      text: "Type or paste your planned title tag into the title input box. Watch the live pixel gauge stay safely below the 600px desktop threshold (approx 55-60 characters) to prevent truncation.",
    },
    {
      name: "Craft a Compelling Meta Description",
      text: "Add an actionable summary between 500px and 960px (~120 to 155 characters). Include primary search intent keywords and a clear call-to-action.",
    },
    {
      name: "Configure Canonical URL & Brand Name",
      text: "Add your destination URL and site brand name to simulate Google modern breadcrumb URL hierarchy.",
    },
    {
      name: "Toggle Desktop vs. Mobile Viewports",
      text: "Switch between desktop and mobile previews to ensure your snippet reads seamlessly on smartphone screens (which cap titles at ~580px).",
    },
    {
      name: "Review CTR Score & Copy Meta HTML",
      text: "Review the automated CTR heuristic recommendations and click Copy HTML Meta Tags to paste the clean tags directly into your HTML head or CMS.",
    },
  ],
  editorialGuide: {
    title: "The Ultimate Guide to Google SERP Snippet Optimization & Pixel Limits",
    sections: [
      {
        heading: "Why Google Measures Title Length in Pixels, Not Characters",
        content: "<p>A common misconception in search engine optimization is that Google title tags are strictly limited to 60 characters. In reality, Google renders search result titles in a proportional font (20px Arial on desktop). Because proportional fonts assign varying widths to different letters—for example, an uppercase W consumes roughly 20 pixels, whereas a lowercase i takes only 5 pixels—two 55-character titles can occupy vastly different amounts of physical screen space.</p><p>Google caps the desktop title display container at <strong>600 pixels</strong> (and roughly 580 pixels on mobile). When a title exceeds this pixel barrier, Google layout engine truncates the end of the text with an ellipsis (...), potentially obscuring high-intent keywords or your brand name.</p>",
        keyTakeaways: [
          "Desktop Google titles are capped at a 600px container width.",
          "Wider characters (W, M, O, Q, &) consume up to 4x more width than narrow characters (i, l, t, j).",
          "Aim for 450px - 580px (around 50-58 characters) for maximum real estate without cutoffs.",
        ],
      },
      {
        heading: "Desktop vs. Mobile Search Result Differences in 2026",
        content: "<p>Mobile search now accounts for over 63% of global web traffic, making viewport-specific snippet optimization mandatory. Google mobile SERP layout differs from desktop in several structural ways:</p><ul><li><strong>Mobile Title Viewport:</strong> Mobile titles render around 18px and wrap across multiple lines up to approximately 580px total width before truncation.</li><li><strong>Mobile Favicons & Brand Prominence:</strong> Google places a prominent circular site favicon and full brand name above the URL breadcrumb on mobile cards.</li><li><strong>Description Truncation:</strong> Mobile descriptions are frequently truncated earlier (~120 characters / 680px) compared to desktop 155-160 characters (~960px).</li></ul>",
        keyTakeaways: [
          "Front-load your most critical primary keywords in the first 40 characters.",
          "Test both viewports to prevent awkward line breaks on mobile devices.",
          "Ensure your site favicon is sharp and 48x48px or larger for crisp mobile card rendering.",
        ],
      },
      {
        heading: "Formulas for High Click-Through Rate (CTR) Snippets",
        content: "<p>Ranking #1 on Google is only half the battle; capturing the searcher click is what drives actual organic revenue. Analysis of millions of SERP impressions shows distinct patterns in top-performing snippet copy:</p><ol><li><strong>Specific Numbers & Dates:</strong> Including current years (e.g., 2026) or specific item counts (15 Best Tools) increases CTR by an average of 36% by signaling freshness and structure.</li><li><strong>High-Intent Power Words:</strong> Words such as <em>Free, Guide, Step-by-Step, Proven, Ultimate, Fast, Review</em> establish clear emotional hooks.</li><li><strong>Clean Brand Separators:</strong> Using clean delimiters such as | or - provides visual structure and brand recognition.</li><li><strong>Actionable Meta Descriptions:</strong> Descriptions featuring active verbs (<em>Discover, Download, Calculate, Learn, Explore</em>) set clear expectations for the user upon clicking.</li></ol>",
        keyTakeaways: [
          "Use current year timestamps to prove content freshness.",
          "Include primary keywords near the start of the title.",
          "End your description with a direct benefit or call to action.",
        ],
      },
      {
        heading: "Why Google Rewrites Titles & How to Prevent It",
        content: "<p>Studies indicate that Google rewrites or modifies between 60% and 80% of page titles in actual search results. The most frequent triggers for title overwrites are:</p><ul><li><strong>Extreme Length:</strong> Titles exceeding 600px get truncated or replaced with H1 tags.</li><li><strong>Keyword Stuffing:</strong> Repetitive keyword lists without natural grammar trigger algorithmic overrides.</li><li><strong>Vague or Generic Titles:</strong> Titles like Home or Product Details get replaced with scraped page headings.</li><li><strong>Missing Brand Name:</strong> Google frequently appends your site domain or brand automatically if left off.</li></ul>",
        keyTakeaways: [
          "Keep your H1 heading and title tag closely aligned in topic.",
          "Avoid keyword stuffing and excessive repetition of boilerplate text.",
          "Write distinct, contextual titles for every single indexable page.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the optimal Google title tag pixel width in 2026?",
      answer: "The ideal Google desktop title tag width is between 400px and 580px (approximately 50 to 58 characters). The absolute cutoff is 600 pixels, at which point Google will truncate the snippet with an ellipsis.",
    },
    {
      question: "Why does Google rewrite my meta title or description in search results?",
      answer: "Google algorithms may rewrite titles or extract different snippet text from your page content if your provided meta tags are deemed too long, stuffed with keywords, missing brand context, or poorly aligned with the user search query intent.",
    },
    {
      question: "Does meta description length directly affect organic keyword rankings?",
      answer: "Meta descriptions are not a direct Google ranking factor. However, a well-optimized meta description significantly impacts Organic Click-Through Rate (CTR). Higher CTR signals positive user engagement to search algorithms, indirectly boosting organic search visibility.",
    },
    {
      question: "How does the mobile Google SERP display differ from desktop?",
      answer: "On mobile devices, Google displays a dedicated card UI with a prominent circular favicon and site name above the snippet. Mobile titles are capped around 580px and descriptions are often shortened to around 120 characters (~680px).",
    },
    {
      question: "Should I include my brand name in the SEO title tag?",
      answer: "Yes. Adding your brand name at the end of the title separated by a pipe (|) or dash (-) helps build brand authority and prevents Google from automatically appending an unformatted brand suffix.",
    },
    {
      question: "How do numbers and power words improve search click-through rates?",
      answer: "Numbers provide visual anchors that stand out in text-heavy search result lists, while power words (such as Free, Proven, Guide, 2026) address specific searcher motivations, raising CTR by up to 36% compared to generic titles.",
    },
  ],
};
