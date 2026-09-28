import { ToolDefinition } from "@/types/tool";

export const serpPreviewTool: ToolDefinition = {
  id: "google-serp-simulator",
  slug: "google-serp-simulator",
  name: "Google SERP Simulator",
  title: "Google SERP Simulator - Search Result Snippet Preview Tool | OmniSEO Tools",
  metaTitle: "Google SERP Simulator - Search Result Snippet Preview Tool | OmniSEO Tools",
  metaDescription:
    "Preview how your meta title, description, and URL appear on Google Search. Features real-time pixel truncation checking for Desktop (600px) and Mobile (960px).",
  h1: "Google SERP Simulator & Snippet Optimizer",
  tagline: "Simulate authentic Google desktop and mobile search snippets in real time. Validate exact pixel boundaries client-side.",
  shortDescription:
    "Preview how your meta title, description, and URL appear on Google Search. Features real-time pixel truncation checking for Desktop (600px) and Mobile (960px).",
  category: "serp",
  icon: "Eye",
  badge: "Popular",
  featured: true,
  status: "active",
  keywords: [
    "google serp simulator",
    "google search snippet preview",
    "meta title pixel counter",
    "serp simulator",
    "serp preview tool",
    "search snippet preview",
    "meta description pixel counter",
    "google title truncation tool",
  ],
  howToSteps: [
    {
      name: "Enter Your Target Page Title",
      text: "Type or paste your planned title tag into the title input box. Watch the canvas pixel gauge stay safely below the 600px desktop threshold (approx 55-60 characters) to prevent truncation.",
    },
    {
      name: "Craft an Intent-Driven Meta Description",
      text: "Add an actionable summary between 500px and 960px (~120 to 155 characters). Include primary search intent keywords and a clear call-to-action.",
    },
    {
      name: "Configure Canonical URL, Brand & Rich Elements",
      text: "Add your destination URL, site name, and toggle rich snippet additions like star ratings, publish date stamps, and mobile favicons.",
    },
    {
      name: "Toggle Desktop vs. Mobile Viewports",
      text: "Switch between Desktop Preview (600px container) and Mobile Preview (card UI with 24px favicon) to verify responsive truncation boundaries.",
    },
    {
      name: "Audit CTR Score & Copy Meta HTML / Schema",
      text: "Review automated CTR heuristic recommendations and click Copy Full HTML Meta to export clean meta tags and JSON-LD schema directly.",
    },
  ],
  editorialGuide: {
    title: "The Ultimate Guide to Google SERP Snippet Optimization & Pixel Limits",
    sections: [
      {
        heading: "Why Google Measures Title Length in Pixels, Not Characters",
        content: "<p>A common misconception in search engine optimization is that Google title tags are strictly limited to 60 characters. In reality, Google renders search result titles in a proportional font (20px Arial on desktop). Because proportional fonts assign varying widths to different letters—for example, an uppercase W consumes roughly 20 pixels, whereas a lowercase i takes only 5 pixels—two 55-character titles can occupy vastly different amounts of physical screen space.</p><p>Google caps the desktop title display container at <strong>600 pixels</strong> (and roughly 580 pixels on mobile). When a title exceeds this pixel barrier, Google's layout engine truncates the end of the text with an ellipsis (...), potentially obscuring high-intent keywords or your brand name.</p>",
        keyTakeaways: [
          "Desktop Google titles are capped at a 600px container width.",
          "Wider characters (W, M, O, Q, &) consume up to 4x more width than narrow characters (i, l, t, j).",
          "Aim for 450px - 580px (around 50-58 characters) for maximum real estate without cutoffs.",
        ],
      },
      {
        heading: "Desktop vs. Mobile Search Result Differences in 2026",
        content: "<p>Mobile search accounts for the majority of global web traffic, making viewport-specific snippet optimization mandatory. Google's mobile SERP layout differs from desktop in several structural ways:</p><ul><li><strong>Mobile Title Viewport:</strong> Mobile titles render around 18px Arial and wrap across up to two lines before hitting truncation boundaries.</li><li><strong>Mobile Favicons & Brand Prominence:</strong> Google places a prominent circular site favicon and full brand name above the URL breadcrumb on mobile cards.</li><li><strong>Description Truncation:</strong> Mobile descriptions are frequently truncated earlier (~120 characters / 680px) compared to desktop's 155-160 characters (~960px).</li></ul>",
        keyTakeaways: [
          "Front-load your most critical primary keywords in the first 40 characters.",
          "Test both viewports to prevent awkward line breaks on mobile devices.",
          "Ensure your site favicon is sharp and 48x48px or larger for crisp mobile card rendering.",
        ],
      },
      {
        heading: "Formulas for High Click-Through Rate (CTR) Snippets",
        content: "<p>Ranking #1 on Google is only half the battle; capturing the searcher's click is what drives actual organic revenue. Analysis of millions of SERP impressions shows distinct patterns in top-performing snippet copy:</p><ol><li><strong>Specific Numbers & Dates:</strong> Including current years (e.g., 2026) or specific item counts (15 Best Tools) increases CTR by an average of 36% by signaling freshness and structure.</li><li><strong>High-Intent Power Words:</strong> Words such as <em>Free, Guide, Step-by-Step, Proven, Ultimate, Fast, Review</em> establish clear emotional hooks.</li><li><strong>Clean Brand Separators:</strong> Using clean delimiters such as | or - provides visual structure and brand recognition.</li><li><strong>Actionable Meta Descriptions:</strong> Descriptions featuring active verbs (<em>Discover, Download, Calculate, Learn, Explore</em>) set clear expectations for the user upon clicking.</li></ol>",
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
      question: "Why does Google rewrite my meta title in search results?",
      answer: "Google algorithms rewrite meta titles when the provided title tag exceeds 600px, contains repetitive keyword stuffing, lacks brand context, or fails to closely match the specific search intent of the user query. Google may append your site name, substitute your page's H1 heading, or pull anchor text from inbound links.",
    },
    {
      question: "What is the maximum pixel width for Google meta descriptions?",
      answer: "Google's maximum desktop meta description width is approximately 960 pixels (around 155 to 160 characters). On mobile screens, Google truncates meta descriptions earlier at approximately 680 pixels (around 120 to 130 characters). Keeping descriptions between 500px and 920px ensures maximum readability across all devices.",
    },
    {
      question: "Does having star ratings guarantee rich snippets in Google?",
      answer: "No. Adding AggregateRating Schema.org structured data makes your page eligible for star ratings in Google search results, but Google's algorithmic systems evaluate your domain authority, topical relevancy, and schema compliance before choosing to display rich snippet stars.",
    },
    {
      question: "What is the optimal Google title tag pixel width in 2026?",
      answer: "The ideal Google desktop title tag width is between 400px and 580px (approximately 50 to 58 characters). The absolute container cutoff is 600 pixels, at which point Google will truncate the snippet with an ellipsis (...).",
    },
    {
      question: "How does the mobile Google SERP display differ from desktop?",
      answer: "On mobile devices, Google displays a dedicated card UI with a prominent circular favicon and site name above the snippet. Mobile titles are capped around 580px across up to two lines and descriptions are often shortened to around 120 characters (~680px).",
    },
    {
      question: "Should I include my brand name in the SEO title tag?",
      answer: "Yes. Adding your brand name at the end of the title separated by a pipe (|) or dash (-) helps build brand authority and prevents Google from automatically appending an unformatted brand suffix.",
    },
  ],
};
