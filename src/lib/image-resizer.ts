/**
 * Client-Side Social Image Resizer & Standard 1200x630 Cropper
 *
 * Provides zero-latency image cropping and scaling using an off-screen HTML5 canvas
 * to format social share images to the standard 1.91:1 Open Graph ratio (1200x630px).
 * Features automatic server-side image proxy fallback (/api/proxy-image) to bypass
 * remote CORS restrictions seamlessly.
 */

export interface ResizeResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

/**
 * Loads an image element from a given source URL and crops/scales it to target dimensions.
 */
function tryLoadAndCrop(
  src: string,
  targetWidth: number,
  targetHeight: number,
  fitMode: "cover" | "contain"
): Promise<ResizeResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("Unable to obtain 2D rendering context for canvas."));
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        if (fitMode === "cover") {
          const scale = Math.max(targetWidth / img.naturalWidth, targetHeight / img.naturalHeight);
          const drawWidth = img.naturalWidth * scale;
          const drawHeight = img.naturalHeight * scale;
          const x = (targetWidth - drawWidth) / 2;
          const y = (targetHeight - drawHeight) / 2;

          ctx.drawImage(img, x, y, drawWidth, drawHeight);
        } else {
          // contain mode with dark slate letterboxing
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          const scale = Math.min(targetWidth / img.naturalWidth, targetHeight / img.naturalHeight);
          const drawWidth = img.naturalWidth * scale;
          const drawHeight = img.naturalHeight * scale;
          const x = (targetWidth - drawWidth) / 2;
          const y = (targetHeight - drawHeight) / 2;

          ctx.drawImage(img, x, y, drawWidth, drawHeight);
        }

        const dataUrl = canvas.toDataURL("image/png", 0.95);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("Failed to convert canvas to blob."));
            }
            resolve({
              dataUrl,
              blob,
              width: targetWidth,
              height: targetHeight,
            });
          },
          "image/png",
          0.95
        );
      } catch (err: unknown) {
        reject(err instanceof Error ? err : new Error("Failed to crop and export image."));
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image resource (CORS/Network error)."));
    };

    img.src = src;
  });
}

/**
 * Loads an image from a URL and draws it onto an off-screen canvas at the target dimensions.
 * Attempts direct client-side load first; on CORS/tainted-canvas failure, automatically
 * retries via the server-side image proxy (/api/proxy-image).
 */
export async function cropAndScaleToSocialStandard(
  imageUrl: string,
  targetWidth = 1200,
  targetHeight = 630,
  fitMode: "cover" | "contain" = "cover"
): Promise<ResizeResult> {
  if (typeof window === "undefined") {
    throw new Error("cropAndScaleToSocialStandard can only be executed in a browser environment.");
  }

  const cleanUrl = imageUrl.trim();
  if (!cleanUrl) {
    throw new Error("Image URL is required.");
  }

  // 1. Attempt direct load first
  try {
    return await tryLoadAndCrop(cleanUrl, targetWidth, targetHeight, fitMode);
  } catch (directErr) {
    console.warn(
      "Direct canvas image crop failed (likely remote CORS restriction), falling back to /api/proxy-image...",
      directErr
    );

    // 2. If direct load fails (CORS taint, SecurityError, or network block), retry via server-side image proxy
    try {
      const proxiedUrl = `/api/proxy-image?url=${encodeURIComponent(cleanUrl)}`;
      return await tryLoadAndCrop(proxiedUrl, targetWidth, targetHeight, fitMode);
    } catch (proxyErr: unknown) {
      console.error("Proxied image crop fallback failed:", proxyErr);
      throw new Error(
        "Unable to crop image. The remote host could not be reached, or blocks image reading."
      );
    }
  }
}

/**
 * Triggers a 1-click client-side download for a Blob.
 */
export function downloadBlob(blob: Blob, filename = "og-image-1200x630.png"): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

export interface LocalImageOptimizationResult {
  dataUrl: string;
  blob: Blob;
  originalSize: number;
  optimizedSize: number;
  savingsPercent: number;
  width: number;
  height: number;
}

/**
 * Formats byte values into clean human-readable strings (e.g. 1.2 MB, 180 KB).
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Processes a locally uploaded image File: auto-crops and scales to target 1200x630
 * in cover mode, converts to high-efficiency WebP (or PNG fallback), computes size
 * savings, and returns preview data URL and downloadable Blob.
 */
export function processLocalImageFile(
  file: File,
  targetWidth = 1200,
  targetHeight = 630,
  quality = 0.85
): Promise<LocalImageOptimizationResult> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("processLocalImageFile can only be executed in a browser environment.")
    );
  }

  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      return reject(new Error("Please select a valid image file (PNG, JPG, WebP, GIF)."));
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          return reject(new Error("Unable to obtain 2D rendering context for canvas."));
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Center-crop in cover mode
        const scale = Math.max(targetWidth / img.naturalWidth, targetHeight / img.naturalHeight);
        const drawWidth = img.naturalWidth * scale;
        const drawHeight = img.naturalHeight * scale;
        const x = (targetWidth - drawWidth) / 2;
        const y = (targetHeight - drawHeight) / 2;

        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // Try WebP first, fallback to PNG if WebP is unsupported
        let dataUrl = "";
        try {
          dataUrl = canvas.toDataURL("image/webp", quality);
          if (!dataUrl.startsWith("data:image/webp") && !dataUrl.startsWith("data:image/png")) {
            dataUrl = canvas.toDataURL("image/png", 0.95);
          }
        } catch {
          dataUrl = canvas.toDataURL("image/png", 0.95);
        }

        const exportMime = dataUrl.startsWith("data:image/webp") ? "image/webp" : "image/png";

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);
            if (!blob) {
              return reject(new Error("Failed to generate optimized image blob."));
            }

            const originalSize = file.size;
            const optimizedSize = blob.size;
            const savingsPercent =
              originalSize > 0
                ? Math.max(0, Math.round(((originalSize - optimizedSize) / originalSize) * 100))
                : 0;

            resolve({
              dataUrl,
              blob,
              originalSize,
              optimizedSize,
              savingsPercent,
              width: targetWidth,
              height: targetHeight,
            });
          },
          exportMime,
          quality
        );
      } catch (err: unknown) {
        URL.revokeObjectURL(objectUrl);
        reject(err instanceof Error ? err : new Error("Failed to process local image file."));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image file. The file may be corrupt or unsupported."));
    };

    img.src = objectUrl;
  });
}
