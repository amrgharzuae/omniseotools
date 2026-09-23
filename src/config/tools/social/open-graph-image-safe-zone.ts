import { ToolDefinition } from "@/types/tool";

export const ogImageSafeZoneTool: ToolDefinition = {
  id: "open-graph-image-safe-zone",
  slug: "open-graph-image-safe-zone",
  name: "OG & Twitter Card Image Safe-Zone Previewer",
  title: "Free OG & Twitter Card Image Safe-Zone Previewer | OmniSEO Tools",
  metaTitle: "Free OG & Twitter Card Image Safe-Zone Previewer | OmniSEO Tools",
  metaDescription:
    "Preview how your social sharing images look on Facebook and Twitter. Use our safe-zone grid to ensure key content is visible and optimally cropped across platforms.",
  h1: "OG & Twitter Card Image Safe-Zone Previewer",
  tagline:
    "Upload your social sharing images and preview how they appear on Facebook, Twitter, and other networks. Use the safe-zone grid to ensure your key content isn't cropped or hidden by UI elements.",
  shortDescription:
    "Upload social images to preview cropping on Facebook and Twitter, ensuring important content remains visible with safe-zone guides.",
  category: "social",
  icon: "Crop",
  badge: "New",
  featured: true,
  status: "active",
  keywords: [
    "open graph safe zone",
    "twitter card image crop",
    "og image previewer",
    "social media image safe area",
    "1200x630 safe zone",
    "linkedin image crop tool",
    "facebook og image preview",
    "social image cropper",
    "og image dimensions checker",
    "summary_large_image preview",
  ],
  howToSteps: [
    {
      name: "Upload Image or Enter URL",
      text: "Drag and drop your social image (PNG, JPG, WebP, SVG) or load one of our pre-built high-contrast design templates.",
    },
    {
      name: "Inspect Resolution & Aspect Ratio Diagnostics",
      text: "Review automated diagnostics analyzing image dimensions, aspect ratio (1.91:1, 16:9, 1:1), and file size against platform crawler limits.",
    },
    {
      name: "Toggle Safe-Zone Grids & Mobile UI Overlays",
      text: "Enable the 60px safe-zone margin buffer and simulated mobile app UI overlays (domain badges, share icons) to ensure essential text and logos remain visible.",
    },
    {
      name: "Adjust Zoom & Pan Alignment",
      text: "Use the zoom and pan positioning sliders to center your focal subject and eliminate unwanted edge clipping.",
    },
    {
      name: "Download Optimized 1200x630 Asset",
      text: "Export a perfectly cropped 1200x630 pixel PNG or WebP graphic rendered 100% in-browser using HTML5 Canvas.",
    },
  ],
  guideContent: {
    title: "The Authoritative Guide to Open Graph & Social Image Safe Zones, Aspect Ratios & Cropping Quirks",
    sections: [
      {
        heading: "The 1200x630 Golden Standard & Cross-Platform Aspect Ratios",
        content:
          "<p>In modern social sharing, <strong>1200 x 630 pixels</strong> (a 1.91:1 aspect ratio) is the universal golden standard for Open Graph images (<code>og:image</code>). Supported natively by Facebook, LinkedIn, Twitter/X, Discord, Slack, Pinterest, and WhatsApp, a 1200x630 graphic ensures sharp rendering on retina displays without excessive bandwidth consumption.</p><p>However, each social network employs distinct viewport cropping behaviors:</p><ul><li><strong>Facebook & WhatsApp (1.91:1):</strong> Displays the full 1200x630 image horizontally without cropping on desktop and mobile feeds.</li><li><strong>Twitter / X Large Image Card (summary_large_image):</strong> Scales images to roughly 1.91:1 on web feeds, but rounds corners with an 8px border radius on iOS and Android apps.</li><li><strong>LinkedIn Feed Viewport (1.91:1 / 1200x627):</strong> Enforces an internal viewport of 1200 x 627 pixels. When publishing 16:9 graphics (1920x1080 or 1200x675), LinkedIn slices <strong>24 pixels directly off the top and bottom</strong>.</li><li><strong>Twitter / X Small Card (summary):</strong> Crops the image into a 1:1 square thumbnail (minimum 144x144px; recommended 400x400px to 600x600px) positioned to the left of the title.</li></ul>",
        keyTakeaways: [
          "Always design hero graphics at 1200x630 pixels (1.91:1 aspect ratio).",
          "Account for Twitter's rounded corner radii on mobile clients.",
          "LinkedIn automatically clips 24px off top/bottom on 16:9 banners.",
        ],
      },
      {
        heading: "The 60px Safe Zone Margin & Critical Content Area",
        content:
          "<p>When designing social media graphics containing typography, branding marks, badges, or human faces, placing elements too close to the canvas edges causes visual clipping across different mobile devices.</p><p>Follow the <strong>60px Buffer Margin Rule</strong>:</p><ul><li><strong>Canvas Dimensions:</strong> 1200 x 630 pixels.</li><li><strong>Top & Bottom Margins:</strong> 60 pixels of empty buffer padding.</li><li><strong>Left & Right Margins:</strong> 60 pixels of empty buffer padding.</li><li><strong>Central Safe Zone:</strong> <code>1080 x 510 pixels</code>. All text headlines, subtitle copy, company logos, and primary focal subjects must reside strictly within this 1080x510 central zone.</li></ul><p>By confining all critical text inside the safe zone, your message remains 100% legible whether rendered on desktop browser feeds, mobile app news streams, or square widget previews.</p>",
        keyTakeaways: [
          "Keep all typography and logos within the central 1080x510px safe zone.",
          "Maintain a minimum 60px padding buffer on all four borders.",
          "Prevent mobile app UI overlays from obscuring essential value propositions.",
        ],
      },
      {
        heading: "Crawler Payload Limits, File Formats & Cache Invalidation",
        content:
          "<p>Beyond visual dimensions, social crawlers enforce strict technical constraints when fetching remote social cards:</p><ol><li><strong>File Size Constraints:</strong> While Facebook allows images up to 8MB and Twitter up to 5MB, best practice dictates keeping social image payloads <strong>under 1MB (ideally 100–300 KB)</strong>. Social crawlers operate with strict timeout budgets (often 3–5 seconds); heavy multi-megabyte PNG files frequently cause timeout dropouts resulting in blank cards.</li><li><strong>Supported Formats:</strong> PNG, JPG, and WebP are universally supported. While SVG is standard in web development, social crawlers (Facebook External Hit, Twitterbot, LinkedInBot) <strong>do not render SVG open graph images</strong>. Always serve rasterized PNG or WebP assets.</li><li><strong>Cache Invalidation:</strong> When updating an existing social image, crawlers retain cached versions for up to 30 days. To force immediate cache invalidation across all networks, append a version query string (e.g., <code>https://example.com/og.png?v=2</code>) to your <code>og:image</code> tag.</li></ol>",
        keyTakeaways: [
          "Optimize image file sizes between 100 KB and 500 KB to avoid crawler fetch timeouts.",
          "Never declare SVG files in og:image; use PNG, WebP, or JPG.",
          "Append cache-busting query strings (?v=2) when refreshing existing social cards.",
        ],
      },
    ],
  },
  faqs: [
    {
      question: "What is the optimal image size for Open Graph and Twitter Cards?",
      answer:
        "The optimal universal resolution is 1200 x 630 pixels (a 1.91:1 aspect ratio). This resolution is supported natively by Facebook, Twitter/X (summary_large_image), LinkedIn, Discord, and Slack, ensuring high-definition clarity on retina screens.",
    },
    {
      question: "What is the Open Graph safe zone?",
      answer:
        "The safe zone is the central 1080 x 510 pixel area within a 1200 x 630 image. Because different platforms (like LinkedIn or mobile Twitter apps) apply varying aspect ratios, corner roundings, or UI overlays, keeping all important text, logos, and focal elements inside this 1080x510 area ensures nothing is cropped or obscured.",
    },
    {
      question: "Why does LinkedIn crop my 16:9 banner image?",
      answer:
        "LinkedIn's feed crawler expects a 1.91:1 ratio (1200 x 627 pixels). When you upload a standard 16:9 graphic (such as 1920x1080 or 1200x675), LinkedIn automatically slices 24 pixels directly off the top and bottom of the graphic to force it into its 1.91:1 feed container.",
    },
    {
      question: "Can I use SVG images for og:image?",
      answer:
        "No. Social media crawlers (Facebook, Twitter/X, LinkedIn, Discord) do not parse or render SVG files for Open Graph preview cards. Always use PNG, WebP, or JPG formats for og:image and twitter:image meta tags.",
    },
    {
      question: "What is the maximum file size for social sharing images?",
      answer:
        "While Twitter allows up to 5MB and Facebook allows up to 8MB, we strongly recommend keeping social images under 1MB (optimally 100–300 KB). Large files often cause crawler fetch timeouts, leading to missing preview cards.",
    },
    {
      question: "Are my uploaded images stored on external servers?",
      answer:
        "No. The OmniSEO Tools OG & Twitter Card Image Safe-Zone Previewer operates 100% in your browser using client-side HTML5 Canvas and File API. Your images never leave your device and are never uploaded to any server or database.",
    },
  ],
};

export default ogImageSafeZoneTool;
