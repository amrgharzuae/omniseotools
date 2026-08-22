import { ToolDefinition } from "@/types/tool";

export const openGraphPreviewTool: ToolDefinition = {
  "id": "open-graph-preview",
  "slug": "open-graph-preview",
  "name": "Social Meta & OpenGraph Card Simulator",
  "shortDescription": "Preview and validate how your link previews look when shared on Twitter (X), Facebook, LinkedIn, and Discord before publishing.",
  "category": "social",
  "icon": "Share2",
  "badge": "Popular",
  "featured": true,
  "status": "active",
  "keywords": [
    "open graph preview",
    "social card simulator",
    "twitter card generator",
    "facebook link preview",
    "linkedin post preview",
    "discord embed preview",
    "og image 1200x630"
  ],
  "metaTitle": "OpenGraph & Social Meta Card Preview Tool (Twitter, Facebook, LinkedIn)",
  "metaDescription": "Test and preview OpenGraph and Twitter card meta tags in real-time. Verify og:image dimensions, card formats, and generate ready-to-use HTML tags.",
  "howToSteps": [
    {
      "name": "Enter Page URL & Site Name",
      "text": "Provide your canonical URL and brand name to simulate the domain attribution badge across social networks."
    },
    {
      "name": "Provide Social Title & Description",
      "text": "Craft a high-engagement title (40-70 characters) and summary tailored for social click-through rates."
    },
    {
      "name": "Add 1200x630 OG Image URL",
      "text": "Paste a direct link to your featured OpenGraph image. Ensure it follows the recommended 1.91:1 ratio to prevent cropping."
    },
    {
      "name": "Switch Between Platform Previews",
      "text": "Toggle Twitter (X), Facebook, LinkedIn, and Discord tabs to inspect platform-specific rendering differences."
    },
    {
      "name": "Copy Ready Meta Tags",
      "text": "Click Copy HTML Meta Tags to export both OpenGraph and Twitter Card tags directly into your page head."
    }
  ],
  "editorialGuide": {
    "title": "Mastering OpenGraph & Social Card Optimization for Maximum Virality",
    "sections": [
      {
        "heading": "Why Social Meta Tags Drive Over 40% of Referral Traffic",
        "content": "<p>When users share links across social media channels like Twitter (X), Facebook, LinkedIn, and Discord, crawlers parse your HTML head looking for <strong>OpenGraph (og:*)</strong> and <strong>Twitter Card (twitter:*)</strong> tags. If these tags are missing or misconfigured, platforms fall back to generic page text and random images—or render an unclickable text URL with zero visual engagement.</p><p>Links with rich social preview cards achieve up to <strong>300% higher click-through rates (CTR)</strong> compared to plain text links. Investing in crisp, dimensionally accurate social cards transforms every shared link into an eye-catching visual billboard.</p>",
        "keyTakeaways": [
          "OpenGraph tags (og:title, og:image, og:description) are supported universally by Facebook, LinkedIn, Pinterest, and Discord.",
          "Twitter uses its own proprietary namespace (twitter:card, twitter:title, twitter:image) while falling back to OG tags.",
          "Rich cards increase social share engagement and referral traffic significantly."
        ]
      },
      {
        "heading": "The Golden Image Standard: 1200x630 Pixels (1.91:1 Aspect Ratio)",
        "content": "<p>The single most important technical requirement for social cards is image sizing. All major platforms optimize for a <strong>1.91:1 aspect ratio</strong>:</p><ul><li><strong>Recommended Resolution:</strong> <code>1200 x 630 pixels</code> (Minimum <code>600 x 315 pixels</code>).</li><li><strong>File Size Limit:</strong> Keep images under 5MB (under 1MB recommended for fast crawler response).</li><li><strong>Supported Formats:</strong> PNG, JPG, WebP, and static GIF.</li><li><strong>Safety Padding:</strong> Keep essential text and logos centered within the inner 1000x500px safe zone to prevent edge cropping on mobile feeds.</li></ul>",
        "keyTakeaways": [
          "Always design featured social graphics at 1200x630px.",
          "Avoid placing logos or crucial text near the outer 10% edges.",
          "Use high-contrast visuals with bold typography that remains legible on small mobile screens."
        ]
      },
      {
        "heading": "Platform-Specific Differences & Quirks in 2026",
        "content": "<p>Each social platform handles link previews with subtle layout variations:</p><ol><li><strong>Twitter (X):</strong> Supports <code>summary_large_image</code> (full-width banner) and <code>summary</code> (small square thumbnail). Twitter displays the domain name in a small badge over the bottom-left of the image.</li><li><strong>Facebook:</strong> Renders a large rectangular image header followed by the domain, bold title, and a 1-2 line description snippet.</li><li><strong>LinkedIn:</strong> Focuses on professional content, displaying a clean rectangular card with the page title and publisher domain.</li><li><strong>Discord:</strong> Uses embedded cards with a colored side-rail, displaying the site name, title, description, and large image preview.</li></ol>",
        "keyTakeaways": [
          "Default to twitter:card content='summary_large_image' for maximum screen presence.",
          "Keep og:title under 60 characters to prevent truncation on Facebook and mobile feeds.",
          "Test Discord embeds if your audience frequents developer or gaming communities."
        ]
      },
      {
        "heading": "How to Debug & Clear Social Cache After Updating Tags",
        "content": "<p>Social platforms cache your OpenGraph metadata aggressively. When you update an og:image or title on your website, social networks will continue showing the old version for days unless you manually purge their cache:</p><ul><li><strong>Facebook:</strong> Use the official <a href='https://developers.facebook.com/tools/debug/' target='_blank' rel='noopener noreferrer' class='text-emerald-600 underline'>Facebook Sharing Debugger</a> and click 'Scrape Again'.</li><li><strong>LinkedIn:</strong> Use the <a href='https://www.linkedin.com/post-inspector/' target='_blank' rel='noopener noreferrer' class='text-emerald-600 underline'>LinkedIn Post Inspector</a> to re-fetch tags.</li><li><strong>Twitter (X):</strong> Paste the URL into the Tweet composer or append a cache-busting parameter (e.g., <code>?v=2</code>) to force an immediate refresh.</li></ul>",
        "keyTakeaways": [
          "Social crawlers cache data for up to 30 days unless forced to re-scrape.",
          "Always use absolute URLs (https://example.com/og.png) for og:image, not relative paths (/og.png).",
          "Ensure your server does not block crawler user-agents (facebookexternalhit, Twitterbot, LinkedInBot)."
        ]
      }
    ]
  },
  "faqs": [
    {
      "question": "What is the best image size for OpenGraph and Twitter cards in 2026?",
      "answer": "The recommended image resolution is 1200 x 630 pixels (1.91:1 aspect ratio). This standard resolution displays crisply across Twitter (X), Facebook, LinkedIn, Discord, and iMessage without clipping."
    },
    {
      "question": "What is the difference between summary and summary_large_image for Twitter?",
      "answer": "The summary_large_image card type displays a prominent full-width 1200x630 image header above the title, capturing significantly more screen real estate. The standard summary card displays only a small 1:1 square thumbnail to the left of the text."
    },
    {
      "question": "Why does my og:image not appear when I share a link?",
      "answer": "The most common causes are using a relative URL instead of an absolute HTTPS URL (e.g., /image.png instead of https://site.com/image.png), image file sizes exceeding 5MB, crawler user-agents being blocked by a firewall, or stale platform cache."
    },
    {
      "question": "How do I force Facebook and LinkedIn to refresh my preview card?",
      "answer": "You can force a cache purge by submitting your URL to the Facebook Sharing Debugger and LinkedIn Post Inspector, which triggers their crawlers to fetch the latest HTML metadata immediately."
    },
    {
      "question": "Can I use WebP or SVG format for og:image?",
      "answer": "While modern browsers support WebP and SVG, some older social crawlers and messaging apps only support JPG and PNG. For maximum universal compatibility, JPG or PNG is strongly recommended for og:image files."
    },
    {
      "question": "Do OpenGraph tags directly impact Google SEO rankings?",
      "answer": "OpenGraph tags are not a direct Google search ranking factor. However, they significantly boost social click-through rates and referral traffic, which generates higher brand awareness, social signals, and backlinks that indirectly enhance SEO performance."
    }
  ]
};
