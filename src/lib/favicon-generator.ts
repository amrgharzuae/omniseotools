/**
 * Client-Side Favicon & App Icon Generator Engine
 *
 * Uses HTML5 Canvas off-screen rendering to resize user-uploaded images into all
 * modern favicon and PWA touch icon standards. Packages generated assets into
 * a single downloadable .zip archive using JSZip.
 */

import JSZip from "jszip";

export interface FaviconAsset {
  filename: string;
  size: number;
  width: number;
  height: number;
  label: string;
  description: string;
  mimeType: string;
  blob: Blob;
  dataUrl: string;
  byteSize: number;
}

export interface FaviconConfig {
  basePath: string;
  appName: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
  paddingPercent?: number; // 0 to 20%
}

export interface FaviconGenerationResult {
  assets: FaviconAsset[];
  manifestJson: string;
}

export const FAVICON_SPECIFICATIONS = [
  {
    filename: "favicon.ico",
    size: 32,
    label: "favicon.ico",
    description: "Standard legacy browser & search engine fallback",
    mimeType: "image/x-icon",
  },
  {
    filename: "favicon-32x32.png",
    size: 32,
    label: "32×32 PNG",
    description: "Modern desktop browser tabs & bookmarks",
    mimeType: "image/png",
  },
  {
    filename: "favicon-16x16.png",
    size: 16,
    label: "16×16 PNG",
    description: "High-density standard tab favicon fallback",
    mimeType: "image/png",
  },
  {
    filename: "apple-touch-icon.png",
    size: 180,
    label: "Apple Touch Icon",
    description: "180×180 px for iOS Safari Home Screen bookmarks",
    mimeType: "image/png",
  },
  {
    filename: "android-chrome-192x192.png",
    size: 192,
    label: "Android PWA 192px",
    description: "192×192 px for Android Home Screen & PWA launchers",
    mimeType: "image/png",
  },
  {
    filename: "android-chrome-512x512.png",
    size: 512,
    label: "Android PWA 512px",
    description: "512×512 px for PWA splash screens & app stores",
    mimeType: "image/png",
  },
];

/**
 * Loads an image from a data URL or object URL into an HTMLImageElement.
 */
export function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image element from source."));
    img.src = src;
  });
}

/**
 * Resizes an image to a target square dimension preserving transparency and aspect ratio.
 */
function renderCanvasSquare(
  img: HTMLImageElement,
  targetSize: number,
  paddingPercent = 0
): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = targetSize;
      canvas.height = targetSize;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        return reject(new Error("Canvas 2D context is not available."));
      }

      ctx.clearRect(0, 0, targetSize, targetSize);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Calculate padded area
      const padding = (targetSize * paddingPercent) / 100;
      const innerSize = targetSize - padding * 2;

      // Fit image into inner square preserving aspect ratio
      const scale = Math.min(innerSize / img.naturalWidth, innerSize / img.naturalHeight);
      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;
      const x = (targetSize - drawWidth) / 2;
      const y = (targetSize - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);

      const dataUrl = canvas.toDataURL("image/png", 1.0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error(`Failed to export ${targetSize}x${targetSize} blob.`));
          }
          resolve({ blob, dataUrl });
        },
        "image/png",
        1.0
      );
    } catch (err) {
      reject(err instanceof Error ? err : new Error("Failed to render canvas square."));
    }
  });
}

/**
 * Generates all standard favicon assets and the site.webmanifest JSON.
 */
export async function generateFaviconAssets(
  imageSource: string | HTMLImageElement,
  config: FaviconConfig
): Promise<FaviconGenerationResult> {
  const img =
    typeof imageSource === "string" ? await loadImageElement(imageSource) : imageSource;

  const assets: FaviconAsset[] = [];
  const padding = config.paddingPercent || 0;

  for (const spec of FAVICON_SPECIFICATIONS) {
    const { blob, dataUrl } = await renderCanvasSquare(img, spec.size, padding);
    assets.push({
      filename: spec.filename,
      size: spec.size,
      width: spec.size,
      height: spec.size,
      label: spec.label,
      description: spec.description,
      mimeType: spec.mimeType,
      blob,
      dataUrl,
      byteSize: blob.size,
    });
  }

  // Format clean basePath (ensuring trailing slash if not empty)
  const cleanBasePath = config.basePath.endsWith("/")
    ? config.basePath
    : `${config.basePath}/`;

  const manifestObject = {
    name: config.appName || "My Web Application",
    short_name: config.shortName || config.appName || "WebApp",
    icons: [
      {
        src: `${cleanBasePath}android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${cleanBasePath}android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: config.themeColor || "#4F46E5",
    background_color: config.backgroundColor || "#0F172A",
    display: "standalone",
  };

  const manifestJson = JSON.stringify(manifestObject, null, 2);

  return {
    assets,
    manifestJson,
  };
}

/**
 * Packages generated favicon assets and site.webmanifest into a downloadable ZIP archive.
 */
export async function createFaviconZip(
  assets: FaviconAsset[],
  manifestJson: string
): Promise<Blob> {
  const zip = new JSZip();

  // Add all image files
  for (const asset of assets) {
    zip.file(asset.filename, asset.blob);
  }

  // Add site.webmanifest
  zip.file("site.webmanifest", manifestJson);

  // Add comprehensive Readme
  const readmeContent = `OmniSEO Tools — Favicon & Web App Icon Asset Bundle
======================================================
Generated at: ${new Date().toISOString()}
Generator: https://omniseotools.com/tools/favicon-meta-generator

Included Files:
------------------------------------------------------
1. favicon.ico                - 32x32 px legacy browser & feed crawler fallback
2. favicon-32x32.png          - 32x32 px standard desktop tab icon
3. favicon-16x16.png          - 16x16 px standard browser tab fallback
4. apple-touch-icon.png       - 180x180 px iOS Safari home screen bookmark
5. android-chrome-192x192.png - 192x192 px Android home screen & PWA launcher
6. android-chrome-512x512.png - 512x512 px Android splash screen & app stores
7. site.webmanifest           - PWA configuration manifest

How to Install on Standard HTML / Static Sites:
------------------------------------------------------
1. Copy all extracted files directly to your website's public root directory (e.g. /public/).
2. Add the following HTML snippet inside the <head> tags of your pages:

   <link rel="icon" href="/favicon.ico" sizes="any" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   <link rel="manifest" href="/site.webmanifest" />

How to Install on Next.js 14 / 15 App Router:
------------------------------------------------------
Option A: File-Based Convention (Recommended)
Place favicon.ico, icon.png (rename android-chrome-512x512.png to icon.png), and
apple-icon.png (rename apple-touch-icon.png) directly in your /app directory.

Option B: Metadata Object in app/layout.tsx:
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
};
`;

  zip.file("README.txt", readmeContent);

  return await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
}

/**
 * Triggers a browser file download using URL.createObjectURL.
 */
export function triggerFileDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
