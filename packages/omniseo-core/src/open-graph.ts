export interface OpenGraphMetaOptions {
  title: string;
  description?: string;
  url?: string;
  siteName?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  ogType?: "website" | "article" | "product" | "profile" | "book" | "video.other" | string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterHandle?: string;
  robots?: string;
  canonicalUrl?: string;
}

/**
 * Generates Open Graph HTML meta tags.
 * @param options - Open Graph tag configuration.
 */
export function generateOpenGraphHtml(options: OpenGraphMetaOptions): string {
  const {
    title,
    description = "",
    url = "",
    siteName = "",
    imageUrl = "",
    imageWidth = 1200,
    imageHeight = 630,
    imageAlt = title,
    ogType = "website",
  } = options;

  const lines = [
    `<!-- Open Graph / Facebook -->`,
    `<meta property="og:type" content="${ogType}" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    title ? `<meta property="og:title" content="${title}" />` : "",
    description ? `<meta property="og:description" content="${description}" />` : "",
    imageUrl ? `<meta property="og:image" content="${imageUrl}" />` : "",
    imageUrl && imageWidth ? `<meta property="og:image:width" content="${imageWidth}" />` : "",
    imageUrl && imageHeight ? `<meta property="og:image:height" content="${imageHeight}" />` : "",
    imageUrl && imageAlt ? `<meta property="og:image:alt" content="${imageAlt}" />` : "",
    siteName ? `<meta property="og:site_name" content="${siteName}" />` : "",
  ];

  return lines.filter(Boolean).join("\n");
}

/**
 * Generates Twitter Card HTML meta tags.
 * @param options - Twitter Card configuration.
 */
export function generateTwitterCardHtml(options: OpenGraphMetaOptions): string {
  const {
    title,
    description = "",
    url = "",
    imageUrl = "",
    twitterCard = "summary_large_image",
    twitterHandle = "",
  } = options;

  const lines = [
    `<!-- Twitter -->`,
    `<meta name="twitter:card" content="${twitterCard}" />`,
    url ? `<meta name="twitter:url" content="${url}" />` : "",
    title ? `<meta name="twitter:title" content="${title}" />` : "",
    description ? `<meta name="twitter:description" content="${description}" />` : "",
    imageUrl ? `<meta name="twitter:image" content="${imageUrl}" />` : "",
    twitterHandle ? `<meta name="twitter:site" content="${twitterHandle}" />` : "",
    twitterHandle ? `<meta name="twitter:creator" content="${twitterHandle}" />` : "",
  ];

  return lines.filter(Boolean).join("\n");
}

/**
 * Generates complete SEO meta tags including primary tags, Open Graph, and Twitter Cards.
 * @param options - Full meta tag configuration.
 */
export function generateFullMetaTagsHtml(options: OpenGraphMetaOptions): string {
  const {
    title,
    description = "",
    url = "",
    robots = "index, follow",
    canonicalUrl = url,
  } = options;

  const primary = [
    `<!-- Primary Meta Tags -->`,
    title ? `<title>${title}</title>` : "",
    title ? `<meta name="title" content="${title}" />` : "",
    description ? `<meta name="description" content="${description}" />` : "",
    robots ? `<meta name="robots" content="${robots}" />` : "",
    canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}" />` : "",
  ].filter(Boolean).join("\n");

  const og = generateOpenGraphHtml(options);
  const twitter = generateTwitterCardHtml(options);

  return [primary, og, twitter].filter(Boolean).join("\n\n");
}

/**
 * Generates a Next.js App Router metadata object code snippet.
 * @param options - Full meta tag configuration.
 */
export function generateNextJsMetadataCode(options: OpenGraphMetaOptions): string {
  const {
    title,
    description = "",
    url = "",
    siteName = "",
    imageUrl = "",
    ogType = "website",
    twitterCard = "summary_large_image",
    twitterHandle = "",
    robots = "index, follow",
    canonicalUrl = url,
  } = options;

  return `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  ${canonicalUrl ? `alternates: {\n    canonical: ${JSON.stringify(canonicalUrl)},\n  },` : ""}
  ${robots ? `robots: ${JSON.stringify(robots)},` : ""}
  openGraph: {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    url: ${JSON.stringify(url)},
    siteName: ${JSON.stringify(siteName)},
    type: ${JSON.stringify(ogType)},
    ${imageUrl ? `images: [\n      {\n        url: ${JSON.stringify(imageUrl)},\n        width: 1200,\n        height: 630,\n        alt: ${JSON.stringify(title)},\n      },\n    ],` : ""}
  },
  twitter: {
    card: ${JSON.stringify(twitterCard)},
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    ${imageUrl ? `images: [${JSON.stringify(imageUrl)}],` : ""}
    ${twitterHandle ? `creator: ${JSON.stringify(twitterHandle)},\n    site: ${JSON.stringify(twitterHandle)},` : ""}
  },
};`;
}
